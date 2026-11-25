import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {parseCSV,selectFields,buildModel,canonical,sha256,audit,analysisRows,sample} from '../analysis.mjs';
import {schema,reviewSchema,instructions,validateDraft,toReview,PROMPT_VERSION,norm} from './review-contract.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=async(p,fallback)=>{try{return JSON.parse(await fs.readFile(path.join(root,p),'utf8'));}catch(e){if(e.code==='ENOENT'&&fallback!==undefined)return fallback;throw e;}};
const save=async(p,v)=>{const f=path.join(root,p);await fs.mkdir(path.dirname(f),{recursive:true});await fs.writeFile(f,JSON.stringify(v,null,2)+'\n');};
export function diffLatest(oldModel,newModel){
 const out={added:[],changed:[],removed:[]};
 for(const [id,r]of newModel.latest){const old=oldModel.latest.get(id);if(!old)out.added.push(id);else if(canonical(old)!==canonical(r))out.changed.push(id);}
 for(const id of oldModel.latest.keys())if(!newModel.latest.has(id))out.removed.push(id);
 return out;
}
export function eligibleSingleton(raw,pkg,latest){
 const id=raw['Report ID'],groups=pkg.reviews.filter(g=>g.members.includes(id));
 if(groups.some(g=>g.members.length!==1))return false;
 const a=norm(raw['Same Incident ID']),b=norm(raw['Same Vehicle ID']);
 if(!a||!b||/unknown|none|^n\/?a$/i.test(a+b))return true;
 return ![...latest].some(([other,r])=>other!==id&&norm(r['Same Incident ID'])===a&&norm(r['Same Vehicle ID'])===b);
}
export function reservationAvailable(ledger,config,now=Date.now()){
 const recent=ledger.reservations.filter(r=>now-Date.parse(r.createdAt)<config.budgetWindowDays*86400000);
 const used=recent.reduce((n,r)=>n+(r.settled?r.actualUSD:r.reservedUSD),0);
 return Math.max(0,Math.min(config.runBudgetUSD,config.rollingBudgetUSD-used));
}
export function requestUpperBound(body,config){
 // UTF-8 byte count is a conservative upper bound on text input token count.
 const inputBytes=Buffer.byteLength(JSON.stringify(body.input)+String(body.instructions)+JSON.stringify(body.text),'utf8')+4096;
 if(inputBytes>250000)throw new Error('Input too large for the configured standard pricing budget');
 return (inputBytes*config.standardInputPerMillionUSD+body.max_output_tokens*config.standardOutputPerMillionUSD)/1e6;
}
export async function publicCSV(source,pkg){
 const u=new URL(source.url);if(u.protocol!=='https:'||u.hostname!=='static.nhtsa.gov'||!u.pathname.endsWith('Incident_Reports_ADS.csv'))throw new Error('Only official ADS CSV URLs are allowed');
 const response=await fetch(u,{signal:AbortSignal.timeout(90000),redirect:'error',headers:{'User-Agent':'ADS-report-studio monthly public-data update'}});
 if(!response.ok)throw new Error(`NHTSA download failed: ${source.era} HTTP ${response.status}`);
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length>40*1024*1024)throw new Error('CSV exceeds 40 MB');
 const parsed=parseCSV(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 for(const k of ['Report ID','Report Version','Report Type','Automation System Engaged?','Incident Date','Narrative','Crash With','Roadway Type','SV Pre-Crash Movement','CP Pre-Crash Movement'])if(!parsed.headers.includes(k))throw new Error('Missing required source field: '+k);
 const actualEra=parsed.headers.includes('Engagement Status')?'current':'archive';if(actualEra!==source.era)throw new Error('Source schema era changed; manual mapping review required');
 const previous=pkg.sources.find(s=>s.era===source.era);
 const missing=previous.headers.filter(k=>!parsed.headers.includes(k)),added=parsed.headers.filter(k=>!previous.headers.includes(k));
 if(missing.length||added.length)throw new Error(`Source schema changed (${source.era}); review missing/new columns before publishing`);
 return {era:source.era,url:source.url,name:`ADS_${source.era}.csv`,snapshot:new Date().toISOString().slice(0,10)+' 다운로드',sha256:createHash('sha256').update(bytes).digest('hex'),rowCount:parsed.rows.length,headers:parsed.headers,rows:parsed.rows.map(r=>selectFields(r,pkg.fields))};
}
async function encodePackage(pkg){
 const data=zlib.gzipSync(Buffer.from(JSON.stringify(pkg))).toString('base64'),mid=Math.ceil(data.length/2),tag=createHash('sha256').update(data).digest('hex').slice(0,16);
 for(const [i,body]of [data.slice(0,mid),data.slice(mid)].entries())await fs.writeFile(path.join(root,`data-part${i+1}.mjs`),'export default '+JSON.stringify(body)+';\n');
 await fs.writeFile(path.join(root,'data-base64.mjs'),`import a from './data-part1.mjs?v=${tag}';\nimport b from './data-part2.mjs?v=${tag}';\nexport default a+b;\n`);
 const app=path.join(root,'app.mjs');await fs.writeFile(app,(await fs.readFile(app,'utf8')).replace(/data-base64\.mjs\?v=[\w.]+/g,`data-base64.mjs?v=${tag}`));
 const index=path.join(root,'index.html');await fs.writeFile(index,(await fs.readFile(index,'utf8')).replace(/app\.mjs\?v=[\w.]+/g,`app.mjs?v=${tag}`));
}
async function main(){
 const mode=process.argv[2]||'connection',config=await read('automation/config.json');
 if(mode==='inspect'){
  const {default:enc}=await import('../data-base64.mjs');const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(enc,'base64')));
  const old=await buildModel(pkg),sources=await Promise.all(config.sources.map(s=>publicCSV(s,pkg))),next=await buildModel({...pkg,sources}),delta=diffLatest(old,next);
  console.log(JSON.stringify({status:'source_inspection_only',sources:sources.map(s=>({era:s.era,rows:s.rowCount,sha256:s.sha256})),added:delta.added.length,changed:delta.changed.length,removed:delta.removed.length,pending:next.pending.length,apiCalls:0}));return;
 }
 const runId=process.env.GITHUB_RUN_ID||'local-'+Date.now();
 const ledger=await read('.github/sgo-budget.json',{schemaVersion:1,reservations:[]});
 if(mode==='reserve'){
  if(!process.env.OPENAI_API_KEY)throw new Error('OPENAI_API_KEY is not configured. Add it under repository Actions secrets.');
  if(ledger.reservations.some(r=>r.runId===runId))throw new Error('This run already has a budget reservation; do not rerun a paid job in place.');
  const reservedUSD=reservationAvailable(ledger,config);if(reservedUSD<1)throw new Error('Rolling API budget exhausted; no paid request was made.');
  ledger.reservations.push({runId,createdAt:new Date().toISOString(),reservedUSD,settled:false});await save('.github/sgo-budget.json',ledger);console.log('Budget reserved before API work.');return;
 }
 const reservation=ledger.reservations.find(r=>r.runId===runId&&!r.settled);
 if(!reservation||!process.env.OPENAI_API_KEY)throw new Error('A persisted budget reservation and OPENAI_API_KEY are required.');
 let chargedUSD=0,calls=0,unknownCharge=false;const usage=[];
 const report={schemaVersion:1,runId,mode,startedAt:new Date().toISOString(),model:config.model,reasoningEffort:config.reasoningEffort,promptVersion:PROMPT_VERSION,status:'running',accepted:[],held:[],usage};
 async function callLLM(input,outputSchema,instructionText,maxOutput=config.maxOutputTokens){
  const body={model:config.model,reasoning:{effort:config.reasoningEffort},store:false,max_output_tokens:maxOutput,instructions:instructionText,input:JSON.stringify(input),text:{format:{type:'json_schema',name:'sgo_review',strict:true,schema:outputSchema}}};
  const upper=requestUpperBound(body,config);if(chargedUSD+upper>reservation.reservedUSD)throw new Error('RUN_BUDGET_REACHED');
  calls++;let response,json;
  try{response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify(body),signal:AbortSignal.timeout(600000)});json=await response.json();}
  catch{chargedUSD+=upper;unknownCharge=true;throw new Error('API response unavailable; reserved maximum retained, no automatic retry');}
  if(!response.ok){const code=String(json.error?.code||json.error?.type||'unknown').replace(/[^a-zA-Z0-9_.-]/g,'').slice(0,80);throw new Error(`OpenAI HTTP ${response.status} (${code}); check project balance/model access in the API dashboard`);}
  if(!Number.isFinite(json.usage?.input_tokens)||!Number.isFinite(json.usage?.output_tokens)){chargedUSD+=upper;unknownCharge=true;throw new Error('Missing API usage; maximum retained');}
  // Count cached input at full input price, conservatively; includes all reasoning output.
  const cost=(json.usage.input_tokens*config.standardInputPerMillionUSD+json.usage.output_tokens*config.standardOutputPerMillionUSD)/1e6;
  chargedUSD+=cost;usage.push({responseId:json.id,inputTokens:json.usage.input_tokens,outputTokens:json.usage.output_tokens,reasoningTokens:json.usage.output_tokens_details?.reasoning_tokens??null,conservativeUSD:cost});
  console.log(JSON.stringify({event:'api_response',call:calls,inputTokens:json.usage.input_tokens,outputTokens:json.usage.output_tokens,conservativeUSD:Number(chargedUSD.toFixed(6))}));
  if(json.status!=='completed')throw new Error('API output incomplete; do not publish partial analysis');
  const text=(json.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('');
  return JSON.parse(text);
 }
 try{
  if(mode==='connection'){
   await callLLM({task:'Return {"ok":true}.'},{type:'object',properties:{ok:{type:'boolean'}},required:['ok'],additionalProperties:false},'Connection test only. No crash analysis.',1024);
   report.status='connection_verified';report.note='API project, selected model and structured output responded. No source data changed.';
  }else if(mode==='refresh'||mode==='pilot'){
   const {default:enc}=await import('../data-base64.mjs');
   const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(enc,'base64'))),old=await buildModel(pkg);
   const sources=await Promise.all(config.sources.map(s=>publicCSV(s,pkg)));
   const next={...pkg,sources},model=await buildModel(next),delta=diffLatest(old,model);report.delta=delta;report.sourceHashes=Object.fromEntries(sources.map(s=>[s.era,s.sha256]));
   if(delta.removed.length)throw new Error('Reports disappeared from official source; publication held for withdrawal/source review');
   const queue=[...new Map(model.pending.map(r=>[r.id,r])).values()].sort((a,b)=>Number(['fatal','serious'].includes(b.severity))-Number(['fatal','serious'].includes(a.severity))||a.id.localeCompare(b.id));
   const requested=new Set([...delta.added,...delta.changed,...queue.map(r=>r.id)]);
   for(const r of queue.slice(0,mode==='pilot'?10:config.maxRecordsPerRun)){
    console.log(JSON.stringify({event:'review_start',id:r.id,mode}));
    if(!eligibleSingleton(r.raw,pkg,model.latest)){report.held.push({id:r.id,reason:'Multiple related reports: preserve linkage for explicit review'});continue;}
    if(!norm(r.raw.Narrative)||/^\[?redacted|^confidential|^\[?cbi\]?$/i.test(norm(r.raw.Narrative))){report.held.push({id:r.id,reason:'No usable Narrative'});continue;}
    try{
     const d=await callLLM({report:r.raw,sourceEra:r.schema,sourceFields:r.sourceFields},schema,instructions);
     const errors=validateDraft(d,r.raw);if(errors.length){const diagnosticPath=`automation/runs/${runId}-${r.id}-rejected.json`;await save(diagnosticPath,{status:'rejected_unpublished_draft',id:r.id,raw:r.raw,draft:d,errors});report.held.push({id:r.id,reason:errors.join('; '),diagnosticPath});continue;}
     const check=await callLLM({report:r.raw,proposed:d},reviewSchema,instructions+'\nPerform a separate critical verification of the proposed analysis against the complete source. Accept only if EVERY factual assertion, control chronology, scenario/contact comparison, candidate tier, and diagram is supported or explicitly uncertain. An exact quote alone is not enough if interpretation is wrong. Return accepted false with issues when unsupported. Quote source evidence. Do not rewrite the draft.');
     if(!check.accepted||check.issues.length){report.held.push({id:r.id,reason:'Second-pass issues',issues:check.issues});continue;}
     const g=await toReview(d,r.raw,check,config.model,runId);next.reviews=next.reviews.filter(x=>!x.members.includes(r.id));next.reviews.push(g);report.accepted.push(r.id);
     console.log(JSON.stringify({event:'review_accepted',id:r.id,accepted:report.accepted.length,held:report.held.length}));
    }catch(e){report.held.push({id:r.id,reason:e.message});if(e.message==='RUN_BUDGET_REACHED'||unknownCharge||/^OpenAI HTTP/.test(e.message))break;}
   }
   const final=await buildModel(next);const checks=['reported','confirmed'].flatMap(basis=>audit(final,analysisRows(final,{basis})).map(c=>({...c,basis})));
   if(checks.some(c=>!c.ok))throw new Error('Final aggregation verification failed; original package preserved');
   const acceptedRows=final.records.filter(r=>report.accepted.includes(r.id));
   const random=sample(acceptedRows,Math.min(8,acceptedRows.length),Number(new Date().toISOString().slice(0,10).replaceAll('-','')));
   report.sampleChecks=random.map(r=>({id:r.id,version:r.version,narrativeVersion:r.narrativeVersion,narrative:r.narrative,raw:r.raw,decision:r.decision,scenario:r.scenario,analysis:r.autoReview,check:'Two-pass AI review and exact-source validation; not an independent human audit'}));
   report.checks=checks;report.remaining=final.pending.map(r=>r.id);report.counts={raw:final.rawCount,latest:final.latest.size,reported:final.ads.length,confirmed:final.impact.length,pending:final.pending.length};
   report.status=requested.size?'updated':'no_change';next.lastAutomaticUpdate={...report,usage:undefined,sampleChecks:undefined,checks:undefined};
   // Actual content/version changes, not source download timestamps, determine API and package updates.
   if(requested.size){next.prepared=new Date().toISOString();next.sourceSnapshot='공식 CSV 확인 '+new Date().toISOString().slice(0,10);await encodePackage(next);}
  }else throw new Error('Unknown mode');
 }catch(e){report.status='failed';report.error=e.message;process.exitCode=1;}
 finally{
  reservation.settled=true;reservation.actualUSD=Number(chargedUSD.toFixed(6));reservation.calls=calls;reservation.unknownCharge=unknownCharge;reservation.finishedAt=new Date().toISOString();
  report.finishedAt=reservation.finishedAt;report.conservativeUSD=reservation.actualUSD;report.apiCalls=calls;
  await save('.github/sgo-budget.json',ledger);await save('automation/latest-run.json',report);
  await save(`automation/runs/${runId}.json`,report);
  console.log(JSON.stringify({status:report.status,accepted:report.accepted.length,held:report.held.length,calls,conservativeUSD:report.conservativeUSD,error:report.error}));
 }
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
