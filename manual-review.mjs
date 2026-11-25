import {buildModel,canonical,sha256} from './analysis.mjs?v=20261125.25';
export const APPROVAL_KEY='ads-user-approvals-v1';
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
export async function createApproval(pkg,sources,id,input){
 return approvalFromModel(await buildModel(pkg,sources),id,input);
}
async function approvalFromModel(m,id,input){
 const r=m.pending.find(r=>r.id===id);if(!r)throw Error('현재 재검토 대상만 승인할 수 있습니다.');
 if(r.system!=='ADS')throw Error('ADS 보고만 승인할 수 있습니다.');
 const rel=x=>[x['Same Incident ID'],x['Same Vehicle ID'],x['Incident Date'],x.State].map(v=>String(v||'').trim()).join('|');
 const linked=r.raw['Same Incident ID']?.trim()&&r.raw['Same Vehicle ID']?.trim()&&[...m.latest.values()].filter(x=>rel(x)===rel(r.raw)).length>1;
 if(linked||r.members.length!==1||/신규 보고 발견/.test(r.reason))throw Error('연결된 사고·차량 보고는 중복 관계를 먼저 검토해야 합니다.');
 if(!['insufficient','include'].includes(input.decision)||!norm(input.reviewer)||!norm(input.reason)||!input.checked)throw Error('승인자·검토 의견·확인 항목을 입력하세요.');
 const quote=norm(input.quote);
 if(input.decision==='include'&&(!quote||!norm(r.raw.Narrative).includes(quote)))throw Error('최신 사고 경위에서 ADS 운행 근거 문장을 그대로 복사하세요.');
 return {id,version:r.version,fingerprint:await sha256(canonical(r.raw)),decision:input.decision,reviewer:norm(input.reviewer),reason:norm(input.reason),quote,checked:true,approvedAt:new Date().toISOString(),revoked:false};
}
export async function applyApprovals(pkg,sources,history=[]){
 const base=await buildModel(pkg,sources),reviews=[...pkg.reviews],active=[],stale=[];
 const last=new Map(history.filter(x=>x&&typeof x.id==='string').map(x=>[x.id,x]));
 for(const a of last.values()){
  if(a.revoked)continue;const r=base.pending.find(r=>r.id===a.id);
  if(!r){stale.push(a.id);continue;}
  try{
   const checked=await approvalFromModel(base,a.id,a);
   if(checked.fingerprint!==a.fingerprint||checked.version!==a.version)throw Error('source changed');
   const g={id:a.id,members:[a.id],fingerprints:{[a.id]:a.fingerprint},narrativeVersion:a.version,narrativeFingerprint:a.fingerprint,decision:a.decision,reason:a.reason+(a.quote?' · 원문: '+a.quote:''),method:`사용자 포함 승인 · ${a.reviewer} · ${a.approvedAt}`,scenario:'',userApproval:a};
   const i=reviews.findIndex(g=>g.members.includes(a.id));if(i>=0)reviews.splice(i,1,g);else reviews.push(g);active.push(a);
  }catch{stale.push(a.id);}
 }
 const effective={...pkg,reviews,approvalHistory:history};const model=await buildModel(effective,sources);if(active.length)model.baseline=false;
 return {pkg:effective,model,active,stale};
}
