/* Additional evidence-based summaries. The original dataset/reviews are unchanged. */
import {value,countBy,contactCounts,CAR,VRU,MOVEMENT,movementGroup,SEVERITY,DRIVER,LIGHTING,SCENARIOS,aggregate,filtered,pct} from './analysis.mjs';

// Each item was checked against the reviewed Narrative version. Approximate
// reported times retain that qualification. Bounds are never made exact.
export const TIMING_REVIEW = [
 ['30530-16297','약 2초',2,'approx','The vehicle operator performed a disengagement approximately 2 seconds before the collision'],
 ['35021-16268','약 9초',9,'approx','Approximately nine seconds after the disengagement'],
 ['30413-16218','28초 이후',28,'lower','Twenty-eight seconds after the disengagement, the manually operated AV, which had queued behind a van at a red light, rolled forward'],
 ['30530-15781','약 12초',12,'approx','approximately 12 seconds before the collision'],
 ['30413-13083','3초',3,'exact','The Ego made contact with the curb 3 seconds after switching into manual'],
 ['30490-11693','7.5초',7.5,'exact','the operator disengaged the automated driving system 7.5 seconds prior to the vehicle mounting the curb'],
 ['30270-10596','약 2초',2,'approx',"The Waymo AV's Level 4 ADS was engaged until approximately two seconds before the collision"],
 ['30391-10295','약 10초',10,'approx','operating in manual mode for approximately 10 seconds prior to the incident'],
 ['30291-9651','15초',15,'exact','Fifteen seconds prior to the incident, the operator disengaged autonomy'],
 ['30413-9109','25초',25,'exact','This impact occurs 25 seconds after last being in autonomous mode'],
 ['988-9101','약 5초',5,'approx','This minor crash occurred approximately 5 seconds after the Kodiak Safety Driver disengaged the self-driving system'],
 ['988-6565','약 5초',5,'approx','transitioned the vehicle from autonomous to manual mode approximately 5 seconds prior to impact'],
 ['30610-5224','약 11초 이후',11,'lower','Approximately eleven seconds after disengaging, the driver proceeded in manual mode making a right turn and struck the curb'],
 ['30391-5009','약 21.5초',21.5,'approx','disengaged the system from autonomous mode approximately 21.5 seconds prior to impact'],
 ['30410-4799','1초 미만',1,'upper','The safety operator disengaged autonomous mode less than one second before the collision'],
 ['502-4131','21초',21,'exact','While in Manual mode for 21 seconds, the Test Specialist made a right turn'],
 ['30270-31','약 1초',1,'approx','transitioned the vehicle from autonomous to manual mode approximately 1 second before the impact occurred'],
 ['30413-1130','7초',7,'timestamps','16:17:37 By means of an accelerator pedal push the vehicle is moved into manual mode'],
 ['30610-1091','10초',10,'exact','transitioned out of its ODD into manual mode 10 seconds before the contact'],
].map(([id,label,seconds,kind,evidence])=>({id,version:id==='30270-10596'?'2':'1',label,seconds,kind,evidence,
  secondEvidence:id==='30413-1130'?'16:17:44 Safety operator manually continues straight':''}));

const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
export function timingEvidence(r) {
 const t=TIMING_REVIEW.find(x=>x.id===r.id);
 if(!t||r.decision!=='non_ads'||String(r.narrativeVersion)!==t.version||!norm(r.narrative).includes(norm(t.evidence))||(t.secondEvidence&&!norm(r.narrative).includes(norm(t.secondEvidence))))return null;
 return {...t,bucket:t.kind==='lower'?(t.seconds>5?'over5':'unknown'):(t.seconds<=5?'within5':'over5')};
}
export function transitionSummary(rows) {
 const base=rows.filter(r=>r.decision==='non_ads');
 const details=base.map(r=>({r,t:timingEvidence(r)})).filter(x=>x.t);
 const known=details.filter(x=>x.t.bucket!=='unknown');
 const counts=[{key:'within5',label:'5초 이내 · 약 표현 포함',count:known.filter(x=>x.t.bucket==='within5').length},
 {key:'over5',label:'5초 초과 · 하한 포함',count:known.filter(x=>x.t.bucket==='over5').length},
 {key:'unknown',label:'시차 구분 미확인',count:base.length-known.length}];
 return {base,details,known,counts};
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
 if(model.baseline){const a=surfaceSummary(model.impact),b=transitionSummary(model.ads);check('기준 노면 정보 기재',a.available.length,1296);check('기준 건조 노면',a.counts.find(x=>x.key==='Dry').count,1224);check('기준 전환 시차 확인',b.known.length,19);check('기준 보고값 5초 이내',b.counts[0].count,7);}
 return checks;
}

const chart=(id,tab,title,items,denominator,note='',extra={})=>({id,tab,title,kind:'bar',items,denominator,note,...extra});
const table=(id,tab,title,columns,rows,note='')=>({id,tab,title,kind:'table',columns,rows,note});
export function figureCatalog(model,filter={}) {
 const rows=filtered(model.impact,filter),ads=filtered(model.ads,filter),a=aggregate(rows),vru=a.vru,n=rows.length;
 const surf=surfaceSummary(rows),timing=transitionSummary(ads),cols=['직진','회전','변경·합류','정지·주차','기타·불명'];
 const sev=rs=>countBy(rs,'severity',Object.keys(SEVERITY)).map(x=>({...x,label:SEVERITY[x.key]}));
 const figs=[
 chart('counterparts','overview','충돌대상별 사고 구성',a.counterparts,n,'분모: 사고 당시 ADS 운행 확인 대상. 차량별 사고보고 기준.'),
 chart('car-situations','overview','자동차 상대 8가지 대표 상황',a.scenarios,a.cars.length,'정지 중 후미추돌과 직진·감속 중 후미추돌을 구분. 그 외를 포함한 합계가 분모와 일치.'),
 chart('contact-pattern','overview','ADS 차량의 접촉부위 구성',countBy(rows,contactPattern,Object.keys(CONTACT_PATTERN)).map(x=>({...x,label:CONTACT_PATTERN[x.key]})),n,'한 사고를 한 범주에 분류. 접촉부위는 충돌 방향·가해 여부와 다름. 접촉·긁힘은 별도 사고형태로 자동 추정하지 않음.'),
 chart('roadway','overview','사고 발생 장소',a.roadway.map(x=>({...x,label:({Street:'일반도로',Intersection:'교차로','Parking Lot':'주차장',Highway:'고속도로','Traffic Circle':'회전교차로',Unknown:'불명'})[x.key]||x.key||'미기재'})),n),
 chart('day-night','overview','신고 시각에 따른 주·야간',a.time.map(x=>({...x,label:({day:'주간',night:'야간',unknown:'시간 불명'})[x.key]})),n,'주간 06:00–17:59 / 야간 18:00–05:59. 실제 밝기·일출·일몰 기준과 구분.'),
 chart('lighting','overview','기재된 조명 상태',a.lighting.map(x=>({...x,label:LIGHTING[x.key]})),a.lighting.reduce((s,x)=>s+x.count,0),'Lighting 기재·유효값만 분모. 주야간으로 결측치를 채우지 않음.'),
 chart('road-surface','overview','기재된 노면 상태',surf.counts,surf.available.length,`Roadway Surface 값이 있는 사고만 집계. 미기재·불명 ${surf.missing}건. 다른 양식의 습윤 체크 ${surf.wetFlagOnly}건은 이 분모에 합산하지 않음.`),
 chart('operating-state','status','사고 당시 ADS 작동상태',countBy(ads,'decision',['include','non_ads','insufficient','conflict']).map(x=>({...x,label:({include:'ADS 운행 확인',non_ads:'수동·원격 운행 등',insufficient:'상태 확인 부족',conflict:'자료 불일치'})[x.key]})),ads.length,'시스템 변수·운행상태 변수·사고 경위의 선후관계를 검수한 결과.'),
 chart('operator','status','운전자·운영자 유형',countBy(ads,'driver').sort((a,b)=>b.count-a.count).map(x=>({...x,label:DRIVER[x.key]||x.key})),ads.length,'Driver / Operator Type 기준. None은 운전자·운영자 없음이며 승객 없음이 아님.'),
 chart('transition-time','status','수동전환 후 충돌까지의 보고 시차',timing.counts,timing.base.length,`구분 가능한 원문 ${timing.known.length}건. ‘약 5초’는 보고값 기준 5초 이내에 포함. 나머지를 모두 충돌 직전 전환으로 보지 않음.`),
 {id:'state-severity',tab:'status',title:'운행상태별 피해수준',kind:'grouped',groups:[['ADS 운행 확인',ads.filter(r=>r.decision==='include')],['수동·원격 운행 등',ads.filter(r=>r.decision==='non_ads')],['상태 불충분·불일치',ads.filter(r=>['insufficient','conflict'].includes(r.decision))]].map(([label,rs])=>({label,total:rs.length,items:sev(rs)})),note:'각 상태 안에서의 구성비. 운행거리·노출량을 보정한 위험도 비교가 아님.'},
 chart('vru-types','vru','취약도로이용자 유형별 사고',countBy(vru,r=>VRU.get(r.counterpart),[...VRU.values()]),vru.length,'이륜차와 스쿠터·스케이트보드를 구분. 기타 비자동차 이용자는 별도.'),
 table('vru-movement','vru','취약도로이용자 유형과 ADS 행동',['상대',...cols],[...VRU.values()].map(v=>[v,...cols.map(m=>vru.filter(r=>VRU.get(r.counterpart)===v&&movementGroup(r)===m).length)]),'SV Pre-Crash Movement 기준. 정지·주차를 정지 시작 행동으로 해석하지 않음.'),
 table('vru-environment','vru','취약도로이용자 사고의 시간·장소',['시간','교차로','그 외·불명'],[['day','주간'],['night','야간'],['unknown','시간 불명']].map(([k,label])=>[label,vru.filter(r=>r.time===k&&r.roadway==='Intersection').length,vru.filter(r=>r.time===k&&r.roadway!=='Intersection').length]),'주간 06:00–17:59 / 야간 18:00–05:59.'),
 chart('vru-contact','vru','취약도로이용자 사고의 ADS 접촉부위',contactCounts(vru),vru.length,'복수 부위 기재 가능. 합계가 사고 건수를 초과할 수 있음.'),
 chart('vru-severity','vru','취약도로이용자 사고의 피해수준',sev(vru),vru.length,'최고 피해수준 기준. Moderate를 중상에 포함하지 않음.'),
 chart('domestic-years','domestic','국내 자율주행차 사고 신고 추이',model.pkg.domestic.annual.map(x=>({label:x.year,count:x.count})),null,'한국교통안전공단 공식 발표. 2025년은 1–9월이며 이전 연도는 연간 집계.'),
 {id:'domestic-ads',tab:'domestic',title:'국내 자율주행모드 사고 비중',kind:'stat',value:'약 35%',description:'전체 신고 사고 중 자율주행모드 운행 중 사고의 비중',note:'공식 발표의 근삿값. 미국 SGO와 별도이며 정확한 건수로 환산하지 않음.'},
 {id:'domestic-speed',tab:'domestic',title:'국내 사고 발생 속도',kind:'stat',value:'30 km/h 이하',description:'사고가 주로 발생한 저속 구간에 대한 공식 발표 요약',note:'속도대별 상세 건수 미제공. 임의의 속도 분포를 만들지 않음.'},
 ];
 const byId=new Map(rows.map(r=>[r.id,r]));
 for(const c of model.pkg.cases)if(byId.has(c.id)){const r=byId.get(c.id);figs.push({id:'case-'+r.id,tab:'cases',kind:'case',title:c.category,record:r,case:c,note:`보고 ${r.id} / 경위 v${r.narrativeVersion}. 원문을 요약한 개략도이며 법적 과실 판정이 아님.`});}
 return figs;
}
export function figureDataRows(f) {
 if(f.kind==='bar')return f.items.map(x=>({항목:x.label||x.key,건수:x.count,분모:f.denominator??'',구성비:f.denominator==null?'':pct(x.count,f.denominator),기준:f.note}));
 if(f.kind==='table')return f.rows.map(r=>Object.fromEntries(f.columns.map((c,i)=>[c,r[i]])));
 if(f.kind==='grouped')return f.groups.flatMap(g=>g.items.map(x=>({운행상태:g.label,피해수준:x.label,건수:x.count,분모:g.total,구성비:pct(x.count,g.total)})));
 if(f.kind==='case')return [{보고번호:f.record.id,발생월:f.record.month,경위버전:f.record.narrativeVersion,설명:f.case.summary,근거:f.case.evidence,확인할점:f.case.caution}];
 return [{항목:f.title,값:f.value,설명:f.description,기준:f.note}];
}
