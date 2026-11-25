/* Version-bound, full narrative × movement × contact-area recheck. */
import reviewData from './scenario-data.mjs?v=20261125.24';
export const SCENARIO_REVIEW_STATUS={confirmed:'대조 확인',conflict:'자료 상충',insufficient:'근거 부족',unreviewed:'미검토·재검토'};
export const SCENARIO_PENDING_LABELS={C:'자료 상충 · 미확정',I:'근거 부족 · 미확정',U:'미검토·재검토'};
const index=new Map(reviewData.records.map(r=>[r.id,r]));
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
export const contactAreas=(r,who='SV')=>Object.keys(r.raw||{}).filter(k=>k.startsWith(who+' Contact Area - ')&&String(r.raw[k]).trim()==='Y').map(k=>k.slice((who+' Contact Area - ').length));
const same=(a,b)=>JSON.stringify([...(a||[])].sort())===JSON.stringify([...(b||[])].sort());
export function scenarioEvidence(r){
 const c=r.autoReview?.scenario||index.get(r.id);if(!c||r.decision==='pending')return null;
 if(String(c.version)!==r.version||String(c.narrativeVersion)!==r.narrativeVersion||c.rawFingerprint!==r.reviewRawFingerprint||c.narrativeFingerprint!==r.reviewNarrativeFingerprint)return null;
 if(!same(c.svContact,contactAreas(r,'SV'))||!same(c.cpContact,contactAreas(r,'CP'))||!c.evidence.length||!c.evidence.every(e=>norm(r.narrative).includes(norm(e))))return null;
 return c;
}
export function scenarioClassification(r){const c=scenarioEvidence(r);return c?.status==='confirmed'?c.code:c?.status==='conflict'?'C':c?.status==='insufficient'?'I':'U';}
export function scenarioReviewAudit(rows){const cars=rows.filter(r=>r.scenarioReviewApplicable),checks=[];const check=(name,actual,expected)=>checks.push({name,actual,expected,ok:actual===expected});
 const records=cars.map(scenarioEvidence).filter(Boolean),confirmed=records.filter(c=>c.status==='confirmed');
 check('대표 상황 확정·상충·부족·미검토 합계',cars.filter(r=>/^(0[1-8]|R|C|I|U)$/.test(r.scenario)).length,cars.length);
 check('확정 상황의 양쪽 접촉부위 근거',confirmed.filter(c=>[c.svContact,c.cpContact].every(a=>a.some(x=>!/^unknown|other/i.test(x)))).length,confirmed.length);
 check('확정 상황 원문 인용·버전 연결',cars.filter(r=>/^(0[1-8]|R)$/.test(r.scenario)&&scenarioEvidence(r)?.status==='confirmed').length,confirmed.length);
 return checks;
}
export const scenarioReviewMeta=reviewData.meta;
