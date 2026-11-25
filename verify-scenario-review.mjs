import test from 'node:test';import assert from 'node:assert/strict';import zlib from 'node:zlib';import JSZip from 'jszip';import PptxGenJS from 'pptxgenjs';
import encoded from './data-base64.mjs';import review from './scenario-data.mjs?v=20261125.24';
import {buildModel,analysisRows,aggregate,scenarioKey,CAR,sample,DRIVER,canonical,sha256} from './analysis.mjs?v=20261125.24';
import {scenarioEvidence,scenarioClassification,scenarioReviewAudit,contactAreas} from './scenario-review.mjs?v=20261125.24';
import {contributionSummary,contributionFigures,contributionAudit,compactContributionItems} from './contribution.mjs?v=20261125.24';
import {figureCatalog} from './supplement.mjs?v=20261125.24';import {sceneFor,sceneSVG} from './scenes.mjs?v=20261125.24';import{buildPptx}from'./export-pptx.mjs?v=20261125.24';
const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64'))),m=await buildModel(pkg),cars=m.ads.filter(r=>CAR.has(r.counterpart));
const zip=async p=>JSZip.loadAsync(await p.write({outputType:'uint8array',compression:true}));const slides=z=>Object.keys(z.files).filter(k=>/^ppt\/slides\/slide\d+\.xml$/.test(k));
test('all 2489 automobile narratives are version-bound reviewed, including202 non-impact-confirmed reports',()=>{
 assert.equal(review.records.length,2489);assert.equal(new Set(review.records.map(r=>r.id)).size,2489);assert.equal(review.meta.status,'complete');
 for(const r of cars){const c=scenarioEvidence(r);assert.ok(c,r.id);assert.equal(c.reviewMethod,'full_narrative_contact_review');assert.ok(c.evidence.length);for(const q of c.evidence)assert.ok(r.narrative.replace(/\s+/g,' ').includes(q.replace(/\s+/g,' ').trim()),r.id);assert.deepEqual(c.svContact,contactAreas(r,'SV'));assert.deepEqual(c.cpContact,contactAreas(r,'CP'));assert.equal(c.version,r.version);assert.equal(c.narrativeVersion,r.narrativeVersion);assert.ok(c.reasonKo);if(c.status==='confirmed'){assert.equal(scenarioKey(r),c.code);assert.ok(c.svContact.some(a=>a!=='Unknown')&&c.cpContact.some(a=>a!=='Unknown'));}else assert.ok(['C','I'].includes(scenarioKey(r)));}
 assert.equal(cars.filter(r=>r.decision!=='include').length,202);assert.equal(cars.filter(r=>r.scenario==='U').length,0);assert.ok(scenarioReviewAudit(m.ads).every(x=>x.ok));
});
test('annual and basis partitions include unresolved reports in original automobile denominator',()=>{
 for(const basis of ['reported','confirmed'])for(let year=2021;year<=2026;year++){const rows=analysisRows(m,{basis,from:year+'-01',to:year+'-12'}),a=aggregate(rows);assert.equal(a.scenarios.reduce((n,x)=>n+x.count,0),a.cars.length);assert.ok(a.scenarios.every(x=>x.count===a.cars.filter(r=>scenarioKey(r)===x.key).length));}
});
test('changed report fingerprints, evidence versions or contact flags invalidate scenario reuse',async()=>{
 const r=cars.find(r=>scenarioEvidence(r).status==='confirmed');for(const patch of [{version:String(+r.version+1)},{narrativeVersion:'999'},{reviewRawFingerprint:'changed'},{reviewNarrativeFingerprint:'changed'},{narrative:'new unreviewed text'},{decision:'pending'}])assert.equal(scenarioClassification({...r,...patch}),'U');
 const raw={...r.raw};const k=Object.keys(raw).find(k=>k.startsWith('SV Contact Area')&&raw[k]==='Y');raw[k]='N';assert.equal(scenarioClassification({...r,raw}),'U');
 const sources=structuredClone(pkg.sources),source=sources.find(s=>s.rows.some(x=>x['Report ID']===r.id&&String(x['Report Version'])===r.version));source.rows.find(x=>x['Report ID']===r.id&&String(x['Report Version'])===r.version)['SV Pre-Crash Movement']='Changed';source.sha256='changed';const fresh=await buildModel(pkg,sources);assert.ok(fresh.pending.some(x=>x.id===r.id));assert.equal(fresh.pending.find(x=>x.id===r.id).scenario,'U');
});
test('2026 all/priority/broad scopes yield54/0/54 and all chart sums and cases agree',()=>{
 const rows=analysisRows(m,{from:'2026-01',to:'2026-12',basis:'confirmed'});assert.equal(rows.length,916);
 for(const [contribution,n]of [['all',54],['priority',0],['broad',54]]){const f={from:'2026-01',to:'2026-12',basis:'confirmed',contribution},s=contributionSummary(rows,f),figs=figureCatalog(m,f);assert.equal(s.n,n);for(const xs of [s.types,s.severity,s.counterparts])assert.equal(xs.reduce((sum,x)=>sum+x.count,0),n);assert.equal(figs.filter(x=>x.tab==='contribution'&&x.kind==='case').length,n);assert.ok(contributionAudit(m,rows,f).every(x=>x.ok));}
 const all=contributionSummary(m.ads),priority=contributionSummary(m.ads,'priority'),broad=contributionSummary(m.ads,'broad');assert.equal(all.n,134);assert.equal(priority.n,6);assert.equal(broad.n,128);assert.equal(new Set([...priority.selected,...broad.selected].map(x=>x.r.id)).size,134);assert.throws(()=>contributionSummary(m.ads,'bad'));
 for(const a of [all.types,all.counterparts])assert.equal(compactContributionItems(a).reduce((n,x)=>n+x.count,0),134);
});
test('all broad candidates have source-linked situation diagrams and retain raw contact flags',()=>{
 for(const {r}of contributionSummary(m.ads,'broad').selected){const sc=sceneFor(r);assert.equal(sc.layout,'reconstruction',r.id);assert.deepEqual(sc.svAreas,contactAreas(r));assert.deepEqual(sc.cpAreas,contactAreas(r,'CP'));assert.equal(sc.paths.length,0);assert.ok(sceneSVG(r).includes('위치·간격은 설명용'));}
 const r=m.ads.find(r=>r.id==='30412-6144');assert.ok(sceneSVG(r,{layout:'contact'}).includes('접촉부위'));assert.equal(sceneFor(r,{layout:'contact'}).svAreas.length>0,true);
});
test('2026 operator raw mappings distinguish location composition from actual control',()=>{
 const rows=analysisRows(m,{basis:'confirmed',from:'2026-01'});assert.equal(rows.filter(r=>r.driver==='In-Vehicle (Commercial / Test)').length,113);assert.equal(rows.filter(r=>r.driver==='In-Vehicle and Remote (Commercial / Test)').length,6);assert.equal(DRIVER['In-Vehicle (Commercial / Test)'],'차내 담당자');assert.equal(DRIVER['In-Vehicle and Remote (Commercial / Test)'],'차내＋원격 담당자');
});
test('selected candidate cases and all8 type diagrams export as editable native PPTX shapes',async()=>{
 for(const contribution of ['all','broad']){const f={basis:'confirmed',from:'2026-01',contribution},z=await zip(buildPptx(PptxGenJS,m,f,{scope:'cases',tab:'contribution'}));assert.equal(slides(z).length,108);const xml=(await Promise.all(slides(z).map(k=>z.file(k).async('string')))).join('');assert.ok(!xml.includes('<p:pic>'));assert.ok(xml.includes('보고된 사고 순서'));for(const {r}of contributionSummary(analysisRows(m,f),f).selected)assert.ok(xml.includes(r.id));}
 for(const code of ['01','02','03','04','05','06','07','08']){const z=await zip(buildPptx(PptxGenJS,m,{}, {scope:'figures',figureId:'scenario-diagram-'+code}));assert.equal(slides(z).length,1);const xml=await z.file(slides(z)[0]).async('string');assert.ok(!xml.includes('<p:pic>'));assert.ok(xml.includes('보고차'));assert.ok(xml.includes('대조 확인'));}
 assert.throws(()=>buildPptx(PptxGenJS,m,{from:'2026-01',contribution:'priority'},{scope:'cases',tab:'contribution'}));
});
