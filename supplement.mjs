import {caseAnalysisDataRow,reportCases} from './case-analysis.mjs?v=20261125.25';
import {scenarioFigures} from './scenario-viz.mjs?v=20261125.25';
import {placeSummary,placeGroup,placeAnnual} from './environment.mjs?v=20261125.25';
import {analysisRows,analysisBasis} from './analysis.mjs?v=20261125.25';
import {figureInsight} from './figure-insights.mjs?v=20261125.25';
import {contributionFigures} from './contribution.mjs?v=20261125.25';
/* Additional evidence-based summaries. The original dataset/reviews are unchanged. */
import {value,countBy,contactCounts,CAR,VRU,MOVEMENT,movementGroup,SEVERITY,DRIVER,LIGHTING,SCENARIOS,aggregate,filtered,pct} from './analysis.mjs?v=20261125.25';

import {extendedFigures,controlSummary,controlEvidence,operatingStateSummary,OPERATING_NOTE} from './extended.mjs?v=20261125.25';
import {TIMING_CONTROL} from './review-data.mjs?v=20261124.10';
import {environmentSummary,ROADWAY} from './environment.mjs?v=20261125.25';
export const TIMING_REVIEW=TIMING_CONTROL.records;
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
export function timingEvidence(r){
 const t=TIMING_REVIEW.find(x=>x.id===r.id),c=controlEvidence(r);
 if(!t||!t.eligibleForConfirmedOnBoardTiming||c?.controlCategory!=='on_board_transition'||String(t.narrativeVersion)!==r.narrativeVersion||!t.evidence.every(s=>norm(r.narrative).includes(norm(s))))return null;
 return {...t,version:String(t.narrativeVersion),seconds:t.reportedSeconds,label:`${t.kind==='approx'?'약 ':''}${t.reportedSeconds}초${t.kind==='lower'?' 이후':''}`,bucket:t.fiveSecondBucket,evidence:t.evidence.join('\n'),secondEvidence:'',note:t.timingNote};
}
export function transitionSummary(rows){
 const base=controlSummary(rows).manual,details=base.map(r=>({r,t:timingEvidence(r)})).filter(x=>x.t),known=details.filter(x=>['within5','over5'].includes(x.t.bucket));
 return {base,details,known,counts:[{key:'within5',label:'수동전환 후 5초 이내 충돌 · 보고값',count:known.filter(x=>x.t.bucket==='within5').length},{key:'over5',label:'수동전환 후 5초 초과 충돌 · 하한 포함',count:known.filter(x=>x.t.bucket==='over5').length},{key:'unknown',label:'시차 구분 미확인',count:base.length-known.length}]};
}
export const SURFACE={Dry:'건조',Wet:'젖음','Snow / Slush / Ice':'눈·진창·얼음','Other, see Narrative':'기타 노면'};
export function surfaceSummary(rows) {
 const available=rows.filter(r=>Object.hasOwn(SURFACE,value(r.raw,'Roadway Surface')));
 return {available,missing:rows.length-available.length,counts:countBy(available,r=>value(r.raw,'Roadway Surface'),Object.keys(SURFACE)).map(x=>({...x,label:SURFACE[x.key]})),
   wetFlagOnly:rows.filter(r=>!Object.hasOwn(SURFACE,value(r.raw,'Roadway Surface'))&&value(r.raw,'Roadway-Wet Surface Condition')==='Y').length};
}
export function contactPattern(r) {
 const area={front:['Front Left','Front','Front Right'],side:['Left','Right'],rear:['Rear Left','Rear','Rear Right'],other:['Top','Bottom']};
 const hits=Object.entries(area).filter(([,keys])=>keys.some(k=>value(r.raw,`SV Contact Area - ${k}`)==='Y')).map(([k])=>k);
 if(!hits.length)return 'unknown';
 if(hits.length>1||hits[0]==='other')return 'multiple';
 return hits[0];
}
export const CONTACT_PATTERN={front:'전면만 기재',side:'측면만 기재',rear:'후면만 기재',multiple:'복합·상하부',unknown:'미기재·불명'};
export function extraAudit(model,rows=model.impact,ads=model.ads) {
 const s=surfaceSummary(rows),t=transitionSummary(ads),checks=[];
 const check=(name,actual,expected)=>checks.push({name,actual,expected,ok:actual===expected});
 check('노면 기재 + 미기재 합계',s.available.length+s.missing,rows.length);
 check('노면 분류 합계',s.counts.reduce((n,x)=>n+x.count,0),s.available.length);
 check('단일·복합 접촉부위 분류 합계',countBy(rows,contactPattern).reduce((n,x)=>n+x.count,0),rows.length);
 check('전환 시차 구분 합계',t.counts.reduce((n,x)=>n+x.count,0),t.base.length);
 check('전환 시차 근거와 사용 경위 일치',t.details.filter(x=>timingEvidence(x.r)).length,t.details.length);
 if(model.baseline){const a=surfaceSummary(model.impact),b=transitionSummary(model.ads);check('기준 노면 정보 기재',a.available.length,1296);check('기준 건조 노면',a.counts.find(x=>x.key==='Dry').count,1224);check('기준 전환 시차 확인',b.known.length,16);check('기준 보고값 5초 이내',b.counts[0].count,7);}
 return checks;
}

const chart=(id,tab,title,items,denominator,note='',extra={})=>({id,tab,title,kind:'bar',items,denominator,note,...extra});
const table=(id,tab,title,columns,rows,note='')=>({id,tab,title,kind:'table',columns,rows,note});
export function figureCatalog(model,filter={}) {
 const rows=analysisRows(model,filter),ads=rows,a=aggregate(rows),vru=a.vru,n=rows.length;
 const operating=operatingStateSummary(rows),surf=surfaceSummary(rows),timing=transitionSummary(ads),env=environmentSummary(rows),cols=['직진','회전','변경·합류','정지·주차','기타·불명'];
 const sev=rs=>countBy(rs,'severity',Object.keys(SEVERITY)).map(x=>({...x,label:SEVERITY[x.key]}));
 const figs=[
 chart('counterparts','overview','충돌대상별 사고 구성',a.counterparts,n,`분모: ${analysisBasis(filter).label}. 차량별 사고보고 기준.`),
 chart('car-situations','overview','자동차 상대 8가지 대표 상황',a.scenarios,a.cars.length,'전체 경위·양쪽 행동·접촉부위의 대조 확인 사례만 대표 상황에 포함. 자료 상충·근거 부족·미검토를 별도 표시. 분모는 선택 자동차 상대 전체.'),
 chart('contact-pattern','overview','ADS 차량의 접촉부위 구성',countBy(rows,contactPattern,Object.keys(CONTACT_PATTERN)).map(x=>({...x,label:CONTACT_PATTERN[x.key]})),n,'한 사고를 한 범주에 분류. 접촉부위는 충돌 방향·가해 여부와 다름. 접촉·긁힘은 별도 사고형태로 자동 추정하지 않음.'),
 chart('roadway','overview','사고 발생 장소',placeSummary(rows).counts,n,'Roadway Type의 실제 유형별 집계. 미상 신고·미기재·양식에 항목 없음은 일반도로·주차장 등 기재된 장소와 분리.'),
 chart('day-night','overview','신고 시각에 따른 주·야간',a.time.map(x=>({...x,label:({day:'주간',night:'야간',unknown:'시간 불명'})[x.key]})),n,'주간 06:00–17:59 / 야간 18:00–05:59. 실제 밝기·일출·일몰 기준과 구분.'),
 chart('lighting','overview','기재된 조명 상태',a.lighting.map(x=>({...x,label:LIGHTING[x.key]})),a.lighting.reduce((s,x)=>s+x.count,0),'Lighting 기재·유효값만 분모. 주야간으로 결측치를 채우지 않음.'),
 chart('road-surface','overview','기재된 노면 상태',surf.counts,surf.available.length,`Roadway Surface 값이 있는 사고만 집계. 양식에 열 없음 ${env.coverage.surface.find(x=>x.key==='not_collected').count}건. 다른 양식의 습윤 체크 ${surf.wetFlagOnly}건은 이 분모에 합산하지 않음.`),
 chart('operating-state','status','사고 당시 제어 방식',operating.groups.map(g=>({key:g.key,label:g.label,count:g.total})),ads.length,OPERATING_NOTE),
 chart('operator','status','보고된 운전·운영인력 유형',countBy(ads,'driver').sort((a,b)=>b.count-a.count).map(x=>({...x,label:DRIVER[x.key]||x.key})),ads.length,'Driver / Operator Type의 인력 위치·구성 신고값. 실제 제어 주체와 별도이며 차내 담당자를 운전자·안전관리자로 나눌 수 없음.'),
 chart('transition-time','status','수동전환 후 충돌까지의 보고 시차',timing.counts,timing.base.length,`차내 수동전환 확인 ${timing.base.length}건 중 시차 구분 ${timing.known.length}건. 단순 ADS 해제와 수동 지속시간은 제외. 약 표현·하한을 보존.`),
 {id:'state-severity',tab:'status',title:'제어 방식별 사고 심각도',kind:'grouped',groups:operating.groups.map(({rows,...g})=>g),note:OPERATING_NOTE+` 원격 제어 ${controlSummary(rows).remote.length}건 = 원격 운전 ${controlSummary(rows).remoteDriving}건 + 기어 조작만 확인 ${controlSummary(rows).remoteGear}건.`},
 chart('vru-types','vru','취약도로이용자 유형별 사고',countBy(vru,r=>VRU.get(r.counterpart),[...VRU.values()]),vru.length,'이륜차와 스쿠터·스케이트보드를 구분. 기타 비자동차 이용자는 별도.'),
 table('vru-movement','vru','취약도로이용자 유형과 ADS 행동',['상대',...cols],[...VRU.values()].map(v=>[v,...cols.map(m=>vru.filter(r=>VRU.get(r.counterpart)===v&&movementGroup(r)===m).length)]),'SV Pre-Crash Movement 기준. 정지·주차를 정지 시작 행동으로 해석하지 않음.'),
 table('vru-environment','vru','취약도로이용자 사고의 시간·장소',['시간','교차로','그 외 명시 장소','장소 미상·미기재'],[['day','주간'],['night','야간'],['unknown','시간 불명']].map(([k,label])=>[label,vru.filter(r=>r.time===k&&r.roadway==='Intersection').length,vru.filter(r=>r.time===k&&placeGroup(r)==='other_known').length,vru.filter(r=>r.time===k&&placeGroup(r)==='unavailable').length]),'주간 06:00–17:59 / 야간 18:00–05:59.'),
 chart('vru-contact','vru','취약도로이용자 사고의 ADS 접촉부위',contactCounts(vru),vru.length,'복수 부위 기재 가능. 합계가 사고 건수를 초과할 수 있음.'),
 chart('vru-severity','vru','취약도로이용자 사고의 피해수준',sev(vru),vru.length,'최고 피해수준 기준. Moderate를 중상에 포함하지 않음.'),
 chart('domestic-years','domestic','국내 자율주행차 사고 신고 추이',model.pkg.domestic.annual.map(x=>({label:x.year,count:x.count})),null,'한국교통안전공단 공식 발표. 2025년은 1–9월이며 이전 연도는 연간 집계.'),
 {id:'domestic-ads',tab:'domestic',title:'국내 자율주행모드 사고 비중',kind:'stat',value:'약 35%',description:'전체 신고 사고 중 자율주행모드 운행 중 사고의 비중',note:'공식 발표의 근삿값. 미국 SGO와 별도이며 정확한 건수로 환산하지 않음.'},
 {id:'domestic-speed',tab:'domestic',title:'국내 사고 발생 속도',kind:'stat',value:'30 km/h 이하',description:'사고가 주로 발생한 저속 구간에 대한 공식 발표 요약',note:'속도대별 상세 건수 미제공. 임의의 속도 분포를 만들지 않음.'},
 ];
 const byId=new Map(rows.map(r=>[r.id,r]));
 for(const c of reportCases(rows,model.pkg.cases))if(byId.has(c.id)){const r=byId.get(c.id);figs.push({id:'case-'+r.id,tab:'cases',kind:'case',title:c.category,record:r,case:c,note:`보고 ${r.id} / 경위 v${r.narrativeVersion}. 원문을 요약한 개략도이며 법적 과실 판정이 아님.`});}
 return [...figs,...scenarioFigures(rows),table('place-by-year','overview','연도별 사고 발생 장소',['연도','전체','일반도로','교차로','주차장','고속도로','기타 명시','미상 신고','미기재','양식 없음'],placeAnnual(rows),'Roadway Type 기준. 기타 명시 장소는 회전교차로·주차건물·비포장도로 등이며 미상과 구분.'),...extendedFigures(model,filter),...contributionFigures(rows,filter)].map(f=>({...f,dense:f.dense||f.id==='place-by-year',basis:f.tab==='domestic'?'domestic':analysisBasis(filter).key,basisLabel:f.tab==='domestic'?'국내 공식 발표자료':analysisBasis(filter).label,insight:f.insight||figureInsight(f)}));
}
function figureDataRowsCore(f) {
 if(f.kind==='scenario')return [{유형:f.title,대조확인건수:f.count,분모:f.denominator,구성비:pct(f.count,f.denominator),설명:f.description,기준:f.note}];
 if(f.kind==='bar')return f.items.map(x=>({항목:x.label||x.key,건수:x.count,분모:f.denominator??'',구성비:f.denominator==null?'':pct(x.count,f.denominator),기준:f.note}));
 if(f.kind==='table')return f.rows.map(r=>Object.fromEntries(f.columns.map((c,i)=>[c,r[i]])));
 if(f.kind==='grouped')return f.groups.flatMap(g=>g.items.map(x=>({운행상태:g.label,피해수준:x.label,건수:x.count,분모:g.total,구성비:pct(x.count,g.total)})));
 if(f.kind==='case')return [{...caseAnalysisDataRow(f.record),보고번호:f.record.id,발생월:f.record.month,경위버전:f.record.narrativeVersion,설명:f.case.summary,근거:f.case.evidence,확인할점:f.case.caution}];
 return [{항목:f.title,값:f.value,설명:f.description,기준:f.note}];
}

export function figureDataRows(f){return figureDataRowsCore(f).map(row=>({분석기준:f.basisLabel||'기준 미지정',...row}));}
