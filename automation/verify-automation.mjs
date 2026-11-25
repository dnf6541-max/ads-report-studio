import test from 'node:test';
import assert from 'node:assert/strict';
import {diffLatest,eligibleSingleton,reservationAvailable,requestUpperBound} from './monthly-update.mjs';
import {validateDraft,toReview} from './review-contract.mjs';
import {buildModel,canonical,sha256,selectFields} from '../analysis.mjs';
import {scenarioEvidence} from '../scenario-review.mjs';
import {caseAnalysis,reportCases} from '../case-analysis.mjs';
import {controlEvidence} from '../extended.mjs';
const raw={'Report ID':'TEST-1','Report Version':'1','Report Type':'Monthly','Automation System Engaged?':'ADS','Incident Date':'OCT-2026','Reporting Entity':'Test','Crash With':'Passenger Car','SV Pre-Crash Movement':'Stopped','CP Pre-Crash Movement':'Proceeding Straight','SV Contact Area - Rear':'Y','CP Contact Area - Front':'Y','Roadway Type':'Street',Narrative:'The ADS was stopped. Another car struck its rear. ADS remained engaged at impact.'};
const quote=raw.Narrative;
const draft=()=>({decision:'include',reason:'원문 확인',evidence:[quote],scenario:{status:'confirmed',code:'01',reasonKo:'직접 추돌',evidence:[quote]},control:{controlCategory:'unreviewed',controlDetail:'other',controlEvidence:[],reasonCategories:['not_specified']},contribution:{tier:'none',typeLabelKo:'',summaryKo:'',evidence:[],uncertaintyKo:''},detail:{evidence:[quote],facts:['정지 중 후부에 접촉했다.'],vehicleHypotheses:['정차 이유는 무엇인가?'],environmentHypotheses:['시야는 확보되었는가?'],dataNeeded:[{question:'간격은?',material:'영상'}],improvements:{vehicle:['정지 상태 안내 검토'],environment:['시야 확보 검토'],operation:['사고 로그 확보']},limits:'원인 미확정',scene:{setting:'road',motion:'stopped',targetKind:'vehicle',targetLabel:'후행 차량',relation:'behind',stages:['정지','접근','접촉'],caption:'후미 접촉',geometryUnknown:['차로 폭'],evidence:[quote],roadConfirmed:true,waterFilled:false}}});
const verify={accepted:true,issues:[],evidence:[quote]};
test('source delta detects added, changed same version and removed records',()=>{
 const d=diffLatest({latest:new Map([['a',{x:1}],['c',{}]])},{latest:new Map([['a',{x:2}],['b',{}]])});assert.deepEqual(d,{added:['b'],changed:['a'],removed:['c']});
});
test('source row order is not a substantive change',()=>assert.deepEqual(diffLatest({latest:new Map([['a',{a:1,b:2}]])},{latest:new Map([['a',{b:2,a:1}]])}),{added:[],changed:[],removed:[]}));
test('newly linked same accident and vehicle is held for review',()=>{
 const a={...raw,'Same Incident ID':'I','Same Vehicle ID':'V'};
 assert.equal(eligibleSingleton(a,{reviews:[]},new Map([['TEST-1',a],['OTHER',{...a,'Report ID':'OTHER'}]])),false);
 assert.equal(eligibleSingleton(a,{reviews:[{members:['TEST-1','OLD']}]},new Map([['TEST-1',a]])),false);
});
test('reserved budgets survive interrupted runs',()=>{
 const c={runBudgetUSD:20,rollingBudgetUSD:80,budgetWindowDays:32};
 const rows=[{createdAt:new Date().toISOString(),settled:false,reservedUSD:75}];
 assert.equal(reservationAvailable({reservations:rows},c),5);
 rows[0].settled=true;rows[0].actualUSD=2;assert.equal(reservationAvailable({reservations:rows},c),20);
});
test('maximum reasoning output is included in cost reservation',()=>{
 const c={standardInputPerMillionUSD:10,standardOutputPerMillionUSD:50};
 assert.ok(requestUpperBound({input:'한국어',instructions:'x',text:{},max_output_tokens:24000},c)>1.2);
 assert.throws(()=>requestUpperBound({input:'x'.repeat(300000),text:{},max_output_tokens:100},c));
});
test('fabricated evidence cannot enter the report',()=>{const d=draft();d.evidence=['not in source'];assert.ok(validateDraft(d,raw).length);});
test('confirmed scenario requires both participants contact fields',()=>{const r={...raw};delete r['CP Contact Area - Front'];assert.ok(validateDraft(draft(),r).some(x=>x.includes('bilateral')));});
test('water-filled scene needs explicit supporting source',()=>{const d=draft();d.detail.scene.waterFilled=true;assert.ok(validateDraft(d,raw).some(x=>x.includes('water')));});
test('rejected second pass cannot be promoted',async()=>await assert.rejects(toReview(draft(),raw,{...verify,accepted:false},'test','run')));
test('validated new review integrates into counts, scenario and scene, then expires on source changes',async()=>{
 const g=await toReview(draft(),raw,verify,'test','run');assert.deepEqual(validateDraft(draft(),raw),[]);
 const pkg={reviews:[g],sources:[{era:'current',name:'test',sha256:'new',headers:Object.keys(raw),rows:[raw]}],baselineHashes:{current:'old'},cases:[]};
 const model=await buildModel(pkg);assert.equal(model.ads.length,1);assert.equal(model.impact.length,1);assert.equal(model.impact[0].scenario,'01');assert.equal(scenarioEvidence(model.impact[0]).reviewMethod,'two_pass_llm_full_narrative_contact_review');assert.ok(caseAnalysis(model.impact[0]));
 const changed={...pkg,sources:[{...pkg.sources[0],rows:[{...raw,'Roadway Type':'Intersection'}]}]};const m2=await buildModel(changed);assert.equal(m2.impact.length,0);assert.equal(m2.pending.length,1);
});
test('manual transition and remote operation retain distinct categories',async()=>{
 for(const category of ['on_board_transition','remote_direct']){
  const d=draft();d.decision='non_ads';d.control={controlCategory:category,controlDetail:category==='remote_direct'?'remote_human_driving':'other',controlEvidence:[quote],reasonCategories:['not_specified']};
  const g=await toReview(d,raw,verify,'test','run');const pkg={reviews:[g],sources:[{name:'test',era:'current',headers:Object.keys(raw),rows:[raw]}],baselineHashes:{current:'old'},cases:[]};const m=await buildModel(pkg);assert.equal(controlEvidence(m.ads[0]).controlCategory,category);assert.equal(m.impact.length,0);
 }
});
test('new severe reports join case galleries even when the baseline list has no case entry',async()=>{
 const r={...raw,'Highest Injury Severity Alleged':'Serious W/ Hospitalization'};
 const g=await toReview(draft(),r,verify,'test','run');
 const m=await buildModel({reviews:[g],sources:[{name:'test',era:'current',headers:Object.keys(r),rows:[r]}],baselineHashes:{current:'old'},cases:[]});
 assert.equal(reportCases(m.ads,[]).length,1);assert.equal(reportCases(m.ads,[])[0].id,r['Report ID']);assert.ok(reportCases(m.ads,[])[0].summary.includes('후부'));
 const nonAds=structuredClone(m.ads[0]);nonAds.decision='non_ads';assert.ok(caseAnalysis(nonAds));assert.equal(reportCases([nonAds],[]).length,1);
});
