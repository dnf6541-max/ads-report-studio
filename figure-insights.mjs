import {pct} from './analysis.mjs?v=20261125.27';
export function figureInsight(f){
 const item=k=>f.items?.find(x=>x.key===k),n=f.denominator||0;
 if(f.kind==='case'&&f.analysis)return `${f.record.id}: ${f.analysis.scene.stages.join(' → ')} · 원문 기반 검토 초안`;
 if(f.kind==='case')return `${f.record.id}: ${f.case.summary}`;
 if(f.kind==='bar'){
  const sorted=[...f.items].filter(x=>x.count).sort((a,b)=>b.count-a.count),top=sorted[0];if(!top)return '선택 범위에서 이 항목에 해당하는 신고가 없습니다.';
  const lead=`${top.label||top.key} ${top.count}건${f.denominator!=null?` (${pct(top.count,n)}%)`:''}`;
  const tail={counterparts:'차량 간 사고뿐 아니라 비자동차 상대를 별도로 살펴볼 필요가 있습니다.','car-situations':'후미추돌은 정지와 주행 상태를 함께 보고, 상대차 후진·회전 경로도 구분합니다.','contact-pattern':'접촉한 위치와 충돌에 이르는 진로는 원문에서 연결해야 합니다.',roadway:'같은 장소 유형 안에서도 교차 진입·정지·출차 장면은 다를 수 있습니다.','day-night':'야간에도 발생한 사고를 따로 살펴보고 실제 조명값이 있는 보고와 연결할 수 있습니다.',lighting:'유효한 조명값이 있는 보고의 분포입니다. 양식에 항목이 없는 보고와 분모를 구분합니다.','road-surface':'젖은 노면 체크만 있는 새 양식 보고도 별도 항목으로 함께 확인해야 합니다.','collision-form':'경위에서 분류 근거가 확보된 형태만 셉니다. 기타·정보부족이 많아 실제 형태별 발생률로 읽지 않습니다.',weather:'맑은 조건에서도 발생한 사고가 있어 악천후 외의 진로·정차·다른 이용자 행동도 살펴봅니다.','road-conditions':'특이조건이 없다고 신고한 도로에서도 사고가 발생했습니다. 도로조건만으로 사고 원인을 설명하지 않습니다.','weather-overview':'기상 외에도 접촉 순서와 다른 이용자의 움직임을 함께 살펴봅니다.','road-overview':'도로조건의 신고 여부와 실제 사고 원인은 구분해 검토합니다.','operating-state':'사고 시점의 제어 주체를 구분해야 같은 ADS 관련 보고 안에서도 비교 범위가 분명해집니다.',operator:'운영자 유형은 사고 순간의 직접 운전 여부와 다르므로 경위의 제어권 전환을 연결합니다.','transition-time':'초 단위 근거가 없는 보고도 남아 있어, 모든 수동전환을 충돌 직전 개입으로 볼 수 없습니다.','control-detail':'원격 지원·원격 운전·기어 조작을 구분하면 사람이 맡은 역할을 더 구체적으로 확인할 수 있습니다.','takeover-reasons':'전환 사유를 명시하지 않은 보고가 있어 주변 상황만으로 이유를 채우지 않습니다.','vru-types':'유형별 통행 방식이 다르므로 ADS의 회전·진행·정지 상태와 함께 살펴봅니다.','vru-contact':'같은 사고에서 전면·측면 등 복수 부위에 접촉할 수 있습니다.','vru-severity':'전체의 최고 피해수준이며 해당 상대의 부상인지 원문으로 구분합니다.','severe-counterparts':'연쇄 충돌에서는 신고된 상대와 처음 충돌한 대상, 실제 피해자가 서로 다를 수 있습니다.','contribution-types':'시스템·사고 후 대응과 차량 정비 문제를 분리해 예방 검토사항을 정리합니다.','contribution-severity':'선택한 후보의 피해수준 분포이며 유형별 과실이나 위험도는 뜻하지 않습니다.','domestic-years':'2025년은 9개월 집계이므로 연간 건수의 증감률로 비교하지 않습니다.'}[f.id]||'건수와 구성비는 해당 선택 범위의 보고에서 계산했습니다.';
  return `${lead}. ${tail}`;
 }
 if(f.id==='state-severity')return f.groups.slice(0,3).map(g=>{const h=g.items.filter(x=>['serious','fatal'].includes(x.key)).reduce((s,x)=>s+x.count,0);return `${g.label}: 중상·사망 ${h}/${g.total}건${g.total?` (${pct(h,g.total)}%)`:' · 해당 자료 없음'}`;}).join(' · ')+'. 각 상태 내 구성비이며 운행조건·노출량을 보정한 위험도 비교가 아닙니다.';
 if(f.kind==='grouped')return f.groups.map(g=>{const h=g.items.filter(x=>['serious','fatal'].includes(x.key)).reduce((s,x)=>s+x.count,0);return `${g.label}: 중상·사망 ${h}/${g.total}건`;}).join(' · ')+'. 집단 간 운행조건 차이를 보정한 위험도 비교는 아닙니다.';
 if(f.id==='vru-high-severity'){const sum=f.rows.reduce((s,r)=>s+Number(r[4]),0);return `중상·사망 ${sum}건의 상대 유형을 분리했습니다. 유형별 전체 건수가 작아 한두 건이 비율에 크게 영향을 줄 수 있습니다.`;}
 if(f.id==='vru-night-severity'){const r=f.rows.find(x=>x[0]==='야간·교차로');return `야간·교차로 ${r[1]}건 중 중상·사망 ${r[2]}건 (${r[3]}). 같은 시간·장소 조건에서 어떤 상대와 충돌했는지 사례 경위로 확인합니다.`;}
 if(f.id==='place-by-year'){const last=f.rows.at(-1);return last?`${last[0]}년 ${last[1]}건 중 장소 미상 신고 ${last[7]}건, 미기재 ${last[8]}건, 양식에 항목 없음 ${last[9]}건입니다. 기재된 일반도로·주차장 등을 미상으로 묶지 않습니다.`:'선택 범위 자료가 없습니다.';}
 if(f.id==='environment-coverage'){const r=f.rows.at(-1);return r?`${r[0]}년 조명값 기재 ${r[3]}건, 양식에 열 없음 ${r[4]}건. 조명 항목의 부재를 실제 미상으로 집계하면 발생환경을 잘못 읽게 됩니다.`:'선택 범위 자료가 없습니다.';}
 if(f.id==='severe-composition')return `선택 범위의 중상·사망 ${f.rows.reduce((s,r)=>s+Number(r[3]),0)}건을 상대별로 확인합니다. 최초 충돌과 후속 접촉, 실제 부상 당사자는 별도 원문 검토로 구분했습니다.`;
 if(f.id==='vru-movement')return '같은 취약도로이용자라도 ADS가 직진할 때와 회전·정지할 때 접촉 장면이 다릅니다. 아래 교차표는 어떤 행동 조합을 사례로 살펴볼지 보여줍니다.';
 if(f.id==='vru-environment')return '교차로 여부와 주야간을 함께 보면 횡단·회전 경로와 시간대가 겹치는 사례를 따로 검토할 수 있습니다.';
 if(f.id==='contribution-cases')return '지도 일관성·인지와 조향·부품 유지관리·충돌 후 대응은 서로 다른 문제입니다. 각 사례의 근거와 예방 가설을 별도로 연결했습니다.';
 if(f.id==='domestic-ads')return '전체 신고 사고에는 수동 등 다른 운행모드도 포함됩니다. 자율주행모드 36/99건(36.4%)이라는 구성비와 해당 모드의 사고율은 다릅니다.';
 if(f.id==='domestic-speed')return '저속 구간에서도 사고가 신고됐습니다. 정지·재출발·승하차와 같은 저속 운행 장면도 검토 대상이 됩니다.';
 return '보고된 항목을 함께 살펴보면서 개별 사고의 경위와 연결할 수 있습니다.';
}
