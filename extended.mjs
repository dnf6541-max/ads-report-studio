import {placeGroup} from './environment.mjs?v=20261124.30';
import {analysisRows,analysisBasis} from './analysis.mjs?v=20261124.30';
/* Shared insight and evidence calculations for HTML, CSV and native PPTX. */
import {CAR,VRU,COUNTERPART,SEVERITY,SCENARIOS,value,countBy,pct,aggregate,filtered} from './analysis.mjs?v=20261124.30';
import {environmentSummary,environmentAudit,ROADWAY,COVERAGE} from './environment.mjs?v=20261124.30';
import {CONTROL_REVIEW,CASE_REVIEW,COLLISION_REVIEW} from './review-data.mjs?v=20261124.10';
export const CONTROL={on_board_transition:'차내 수동전환 확인',remote_direct:'원격 직접 제어 확인',manual_ongoing:'수동운행 · 전환 시점 불명',disengaged_stationary:'ADS 해제 후 정지',control_unclear:'해제·개입만 확인',unreviewed:'세부 검토 필요'};
export const REASONS={external_traffic_hazard:'다른 이용자·장애물 대응',ads_behavior_system_issue:'ADS 행동·시스템 관련',odd_boundary:'ODD 이탈',planned_operational_manual_maneuver:'계획된 수동 조작',other_stated:'그 외 명시된 사유',not_specified:'전환 사유 미명시'};
export const FORMS={rear_end:'후미추돌',side_impact:'측면충돌',sideswipe_scrape:'측면 스침·접촉',other_insufficient:'기타·복합·정보부족',unreviewed:'충돌 형태 미검토'};
const controlMap=new Map((CONTROL_REVIEW.records||[]).map(x=>[x.id,x]));
const collisionMap=new Map(Object.entries(COLLISION_REVIEW.records||{}).map(([id,x])=>[id,{id,...x}]));
export const isHigh=r=>['serious','fatal'].includes(r.severity);
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const includes=(r,s)=>!!s&&norm(r.narrative).includes(norm(s));
export function controlEvidence(r){const c=controlMap.get(r.id);return c&&r.decision==='non_ads'&&String(c.narrativeVersion)===r.narrativeVersion&&(c.controlEvidence||c.evidence).every(s=>includes(r,s))?c:null;}
export function collisionEvidence(r){const c=collisionMap.get(r.id);if(!c||r.decision!=='include'||!CAR.has(r.counterpart)||String(c.narrativeVersion)!==r.narrativeVersion)return null;return c.evidence&&!(Array.isArray(c.evidence)?c.evidence:[c.evidence]).every(s=>includes(r,s))?null:c;}
export function caseEvidence(r){const c=CASE_REVIEW.cases?.[r.id];return c&&r.decision==='include'&&String(c.narrativeVersion)===r.narrativeVersion?c:null;}
export function controlSummary(ads){
 const base=ads.filter(r=>r.decision==='non_ads'),details=base.map(r=>({r,c:controlEvidence(r)}));
 const counts=countBy(details,x=>x.c?.controlCategory||'unreviewed',Object.keys(CONTROL)).map(x=>({...x,label:CONTROL[x.key]}));
 const manual=details.filter(x=>x.c?.controlCategory==='on_board_transition').map(x=>x.r),remote=details.filter(x=>x.c?.controlCategory==='remote_direct').map(x=>x.r);
 const reasons=Object.keys(REASONS).map(key=>({key,label:REASONS[key],count:details.filter(x=>x.c?.controlCategory==='on_board_transition'&&x.c.reasonCategories.includes(key)).length}));
 return {base,details,counts,manual,remote,reasons,remoteDriving:details.filter(x=>x.c?.controlDetail==='remote_human_driving').length,remoteGear:details.filter(x=>x.c?.controlDetail==='remote_gear_actuation_only').length};
}
export function severeSummary(rows){const high=rows.filter(isHigh);return {rows:high,serious:high.filter(r=>r.severity==='serious').length,fatal:high.filter(r=>r.severity==='fatal').length,types:countBy(high,'counterpart').sort((a,b)=>b.count-a.count||a.key.localeCompare(b.key)).map(x=>({...x,label:COUNTERPART[x.key]||x.key,serious:high.filter(r=>r.counterpart===x.key&&r.severity==='serious').length,fatal:high.filter(r=>r.counterpart===x.key&&r.severity==='fatal').length}))};}
export function insightSummary(model,filter={},tab='overview'){
 const rows=analysisRows(model,filter),ads=rows,a=aggregate(rows),n=rows.length,high=severeSummary(rows),c=controlSummary(ads),e=environmentSummary(rows),num=n=>Number(n).toLocaleString('ko-KR');
 const share=(n,d)=>d?`${num(n)}건 (${pct(n,d)}%)`:'해당 자료 없음';
 const types=high.types.map(x=>`${x.label} ${x.count}건`).join(' · ');
 const note='보고된 사고의 구성과 경위입니다. 운행거리·노출량을 보정한 사고위험이나 법적 과실을 뜻하지 않습니다.';
 if(tab==='overview'){
  const rear=a.scenarios.filter(x=>['01','02'].includes(x.key)).reduce((s,x)=>s+x.count,0),back=a.scenarios.find(x=>x.key==='03')?.count||0;
  return {title:'사고에서 드러난 특징',note,items:[['자동차 상대 사고 중심',`전체 ${num(n)}건 중 자동차 상대 ${share(a.cars.length,n)}. 고정물·비자동차 상대는 별도 구성으로 확인합니다.`],['후미추돌과 상대차 후진',`자동차 상대 중 정지·직진·감속 후미추돌 ${share(rear,a.cars.length)}, 상대차 후진 ${share(back,a.cars.length)}입니다.${a.scenarios.some(x=>x.key==='U')?` 상황 분류 미검토 ${a.scenarios.find(x=>x.key==='U').count}건을 분모에 포함합니다.`:''}`],['중상·사망은 누구와 충돌했나',high.rows.length?`${high.serious}건 중상 · ${high.fatal}건 사망. 신고된 상대는 ${types}입니다. 아래 상세표에서 접촉 순서와 피해자를 확인합니다.`:'선택 범위에 중상·사망 보고가 없습니다.']]};
 }
 if(tab==='status')return {title:'운행상태에서 본 특징',note,items:[['사고 당시 ADS 운행',`${ads.length}건 중 ${share(rows.filter(r=>r.decision==='include').length,ads.length)}에서 사고 당시 ADS 운행이 확인됩니다.`],['수동전환과 원격 제어 분리',`차내 수동전환 ${c.manual.length}건. 원격 직접 제어 ${c.remote.length}건 중 원격 운전 ${c.remoteDriving}건, 기어 조작만 확인 ${c.remoteGear}건입니다.`],['전환 계기가 명시된 경우',`차내 전환 ${c.manual.length}건 중 사유 미명시 ${c.reasons.find(x=>x.key==='not_specified').count}건. 다른 이용자·장애물 대응 ${c.reasons.find(x=>x.key==='external_traffic_hazard').count}건이 명시됩니다. 사유는 복수 가능.`]]};
 if(tab==='vru'){
  const vr=a.vru,vh=severeSummary(vr),types=countBy(vr,'counterpart').sort((a,b)=>b.count-a.count),top=types[0],ni=vr.filter(r=>r.time==='night'&&r.roadway==='Intersection');
  return {title:'취약도로이용자 사고 특징',note,items:[[top?`${COUNTERPART[top.key]} 상대가 가장 많음`:'선택 범위 자료 없음',top?`총 ${vr.length}건 중 ${share(top.count,vr.length)}. 보행자·자전거·이륜차·스쿠터를 원자료대로 구분합니다.`:'선택 범위에 해당 사고가 없습니다.'],['야간 교차로에서 발생한 사고',`${ni.length}건이며, 이 중 중상·사망 ${share(ni.filter(isHigh).length,ni.length)}입니다. 시간과 장소가 모두 확인된 조건으로 계산합니다.`],['중상·사망 사고 상대 구성',vh.rows.length?`총 ${vh.rows.length}건: ${vh.types.map(x=>`${x.label} ${x.count}건`).join(', ')}. 상대 유형별 전체 건수와 피해수준을 아래에서 함께 비교합니다.`:'선택 범위에 중상·사망 보고가 없습니다.']]};
 }
 if(tab==='cases')return {title:'중상·사망 사고의 구성',note,items:[['보고된 피해수준',`중상 ${high.serious}건, 사망 ${high.fatal}건. 선택한 ${analysisBasis(filter).label} ${n}건 중 ${share(high.rows.length,n)}입니다.`],['신고된 충돌 상대',types?`${types}. 상대 유형은 Crash With 원값입니다.`:'해당 보고가 없습니다.'],['접촉 순서와 피해자는 별도',`다른 차량과 먼저 충돌한 뒤 ADS에 접촉하는 경우도 있어, 각 사건의 첫 충돌·후속 접촉·피해 당사자를 원문과 함께 제공합니다.`]]};
 return {title:'국내 사고특성',note:'2025년은 1–9월 집계입니다. 운행대수·주행거리 정보가 없어 사고율 증가로 해석할 수 없습니다.',items:[['신고 건수의 변화','2022년 7건에서 2024년 31건. 2025년 1–9월에는 47건이 신고되어 누적 112건입니다.'],['자율주행모드 약 35%','전체 신고 사고에는 다른 운행모드도 포함됩니다. 약 35%가 자율주행모드 운행 중 발생했습니다.'],['저속 구간에서도 사고 발생','공식 발표는 주로 30 km/h 이하에서 사고가 발생했다고 설명합니다. 저속 운행 중 접촉 상황도 살펴볼 필요가 있습니다.']]};
}
const bar=(id,tab,title,items,denominator,note='',extra={})=>({id,tab,title,kind:'bar',items,denominator,note,...extra});
const table=(id,tab,title,columns,rows,note='',extra={})=>({id,tab,title,kind:'table',columns,rows,note,...extra});
export function extendedFigures(model,filter={}){
 const rows=analysisRows(model,filter),ads=rows,a=aggregate(rows),c=controlSummary(ads),e=environmentSummary(rows),h=severeSummary(rows),v=a.vru;
 const sev=rs=>countBy(rs,'severity',Object.keys(SEVERITY)).map(x=>({...x,label:SEVERITY[x.key]}));
 const vtable=[...VRU].map(([key,label])=>{const rs=v.filter(r=>r.counterpart===key);return [label,rs.length,rs.filter(r=>r.severity==='serious').length,rs.filter(r=>r.severity==='fatal').length,rs.filter(isHigh).length,`${pct(rs.filter(isHigh).length,rs.length)}%`];});
 const ni=[['주간·교차로',r=>r.time==='day'&&r.roadway==='Intersection'],['야간·교차로',r=>r.time==='night'&&r.roadway==='Intersection'],['주간·그 외 장소',r=>r.time==='day'&&placeGroup(r)==='other_known'],['야간·그 외 장소',r=>r.time==='night'&&placeGroup(r)==='other_known'],['주간·장소 미상·미기재',r=>r.time==='day'&&placeGroup(r)==='unavailable'],['야간·장소 미상·미기재',r=>r.time==='night'&&placeGroup(r)==='unavailable'],['시간 불명',r=>r.time==='unknown']].map(([label,fn])=>{const rs=v.filter(fn);return [label,rs.length,rs.filter(isHigh).length,`${pct(rs.filter(isHigh).length,rs.length)}%`];});
 const confirmed=rows.filter(r=>r.decision==='include'),proxy=confirmed.filter(r=>r.driver==='None');
 return [
 bar('collision-form','overview','경위에서 확인한 자동차 충돌 형태',Object.keys(FORMS).map(key=>({key,label:FORMS[key],count:a.cars.filter(r=>(collisionEvidence(r)?.form||'unreviewed')===key).length})),a.cars.length,'사고 경위의 상대 진로·접촉 순서로 보수적으로 분류. 접촉부위나 8가지 상황을 그대로 치환하지 않음. 기타에는 복합충돌·규칙 미일치·정보부족 포함. 추가된 보고 중 검토 기록이 없는 것은 충돌 형태 미검토로 구분.'),
 bar('weather','overview','기상 조건 · 복수 신고',e.weather.filter(x=>x.count),rows.length,'양식별 Weather 항목을 연결. 한 사고에 여러 기상 조건이 신고되면 합계가 100%를 넘을 수 있음. 공란을 맑음으로 채우지 않음.'),
 bar('road-conditions','overview','도로조건 · 복수 신고',e.road.filter(x=>x.count),rows.length,'이전 Roadway Description과 최신 Roadway- 체크 항목. 특이조건 없음이 건조 노면을 뜻하지 않음. 젖은 노면의 신·구 양식 통합 건수는 별도 제공.'),
 bar('weather-overview','overview','기상 조건 요약',e.weatherPattern,rows.length,'단일 요약: 맑음만 / 흐림·부분흐림만 / 비·눈 포함 / 나머지 복합·기타 / 미상 / 미기재. 상세 기상은 복수 신고 그래프로 확인.'),
 bar('road-overview','overview','도로조건 요약',e.roadPattern,rows.length,'특이조건 없음만 신고했는지, 다른 조건이 신고되었는지 구분. 미상·미기재를 별도 보존.'),
 table('environment-coverage','overview','연도별 발생환경 항목 기재 여부',['연도','선택 대상','기상 기재','조명 기재','조명 열 없음','노면 기재','노면 열 없음'],e.years.map(x=>[x.year,x.n,x.weather,x.lighting,x.lightingNotCollected,x.surface,x.surfaceNotCollected]),'최신 양식에는 Lighting·Roadway Surface 열이 없음. 실제 미상·공란과 구분. 노면은 기존 단일 선택 항목의 기재 건수.',{dense:true}),
 bar('severe-counterparts','cases','중상·사망 사고는 누구와 충돌했나',h.types,h.rows.length,'Serious·Fatality의 차량별 보고. Crash With는 신고된 사고 상대이며 부상 당사자와 같지 않을 수 있음.'),
 table('severe-composition','cases','상대 유형별 중상·사망 구성',['사고 상대','중상','사망','합계','중상·사망 내 비율'],h.types.map(x=>[x.label,x.serious,x.fatal,x.count,`${pct(x.count,h.rows.length)}%`]),'분모는 선택 범위의 중상·사망 보고. 개별 상대의 사고율이나 부상자 수와 구분.'),
 bar('control-detail','status','수동·원격·해제 상태의 세부 구분',c.counts,c.base.length,'사고 당시 ADS 미운행으로 분리한 보고의 경위를 검토. 원격 운영자 존재는 원격 운전의 증거가 아님. 기어 조작만 확인된 사례는 상세표에서 구분.'),
 bar('takeover-reasons','status','차내 수동전환 계기 · 원문 명시 기준',c.reasons,c.manual.length,'차내 수동전환이 명시된 사고가 분모. 원문에 전환 이유가 연결된 경우만 분류. 복수 사유 가능하며, 사고의 원인·결함 판정과 다름.'),
 {id:'operator-severity',tab:'status',kind:'grouped',title:'ADS·운영 형태·전환별 피해수준',groups:[['사고 당시 ADS 운행',confirmed],['ADS 운행 + DDT 담당자 None',proxy],['차내 수동전환 확인',c.manual],['원격 직접 제어 확인',c.remote]].map(([label,rs])=>({label,total:rs.length,items:sev(rs)})),note:'None은 운전업무 담당자 없음이며 물리적 무인·승객 없음의 확정값 아님. 두 번째 집단은 첫 번째에 포함. 각 집단의 보고 구성비이며 위험도 비교가 아님.'},
 table('vru-high-severity','vru','취약도로이용자 유형별 중상·사망',['상대','전체','중상','사망','중상·사망','해당 유형 내 비율'],vtable,'최고 피해수준 기준. 사고 상대와 실제 최고 피해자가 같은지 원문으로 별도 확인.',{dense:true}),
 table('vru-night-severity','vru','주·야간 × 교차로 × 중상·사망',['시간·장소','전체','중상·사망','해당 조건 내 비율'],ni,'주간 06:00–17:59. 그 외 장소는 교차로 이외의 명시된 장소만 포함. 장소 미상·미기재는 별도 표시. 야간은 시간 구분으로 실제 조명 상태와 다름.'),
 ];
}
export function extendedAudit(model,rows=model.impact,ads=model.ads){
 const checks=[...environmentAudit(model,rows)],check=(name,actual,expected)=>checks.push({name,actual,expected,ok:actual===expected}),c=controlSummary(ads),h=severeSummary(rows),cars=rows.filter(r=>CAR.has(r.counterpart));
 check('수동·원격 세부 구분 합계',c.counts.reduce((s,x)=>s+x.count,0),c.base.length);
 check('세부 운행상태 경위 근거 일치',c.details.filter(x=>x.c).length,c.base.length);
 check('중상·사망 상대 구성 합계',h.types.reduce((s,x)=>s+x.count,0),h.rows.length);
 check('충돌 형태 단일분류 합계',Object.keys(FORMS).reduce((s,k)=>s+cars.filter(r=>(collisionEvidence(r)?.form||'unreviewed')===k).length,0),cars.length);
 if(model.baseline){const b=controlSummary(model.ads),hs=severeSummary(model.impact);check('기준 차내 수동전환 확인',b.manual.length,176);check('기준 원격 직접 제어 확인',b.remote.length,5);check('기준 중상·사망',hs.rows.length,14);}
 return checks;
}
