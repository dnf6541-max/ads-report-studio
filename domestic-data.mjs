import raw from './domestic-values.mjs?v=20261125.27';
export const DOMESTIC={title:'국내 자율주행차 사고현황 및 운행 특성',source:'자율주행자동차 사고조사위원회 · 사고통계',sourceUrl:'https://avaib.katri.or.kr/web/cntnts/selectContents.do?cntnts_id=CNTS000040',checked:'2026-11-25',period:'2022~2025년 9월 (페이지 표기)',total:99,annual:raw.yearsInfo.map((year,i)=>({year,count:raw.accInfo[i]})),raw};
const sum=a=>a.reduce((s,n)=>s+Number(n),0),pc=(a,b)=>(a/b*100).toFixed(1)+'%';
export function domesticInsights(){return {title:'국내 공식 통계에서 읽을 점',note:'연도·운행·환경 표 99건, 인명피해 표 122건으로 합계가 다릅니다. 원인·과실·모드별 위험도와 구분합니다.',items:[['모드별 분모 구분','연도별 표 합계 99건 중 자율주행모드 36건(36.4%), 일반주행모드 63건. 자율주행모드 사고만 별도로 살펴볼 수 있습니다.'],['자율모드 저속·주간 사례','자율주행모드 36건 중 30 km/h 이하 31건(86.1%), 09–15시 26건(72.2%). 해당 운행조건의 노출량이 없어 위험도가 높다는 뜻은 아닙니다.'],['맑은 날에도 발생','자율주행모드 36건 중 맑음 27건(75.0%). 검토 방향: 악천후뿐 아니라 일상 운행 중 진로·정차 장면을 추가 확인할 필요가 있습니다.']]};}
export function domesticFigures(){
 const bar=(id,title,items,denominator,note,insight)=>({id,tab:'domestic',kind:'bar',title,items,denominator,note,insight});
 const table=(id,title,columns,rows,note,insight)=>({id,tab:'domestic',kind:'table',title,columns,rows,note,insight});
 const pair=(id,title,labels,a,b,note,insight)=>table(id,title,['구분','자율모드','일반모드','합계'],labels.map((x,i)=>[x,a[i],b[i],a[i]+b[i]]),note,insight);
 const n='공식 페이지 2025년 9월까지 표기 · 2026-11-25 확인 · 미국 필터와 별도';
 return [bar('domestic-years','국내 연도별 사고건수',DOMESTIC.annual.map(x=>({label:String(x.year),count:x.count})),null,n,'연도별 표 합계 99건. 2025년 34건은 1–9월 집계로 전년도 연간 건수와 기간이 다릅니다.'),
 bar('domestic-ads','국내 운행모드별 사고 구성',[{label:'자율주행모드',count:36},{label:'일반주행모드',count:63}],99,n,'자율주행모드 36/99건(36.4%). 모드별 주행거리 조건을 보정한 사고율이 아닙니다.'),
 bar('domestic-speed','자율주행모드 사고 속도',[...['30 이하','30 초과–50 이하','50 초과–70 이하','70 초과–90 이하','90 초과']].map((x,i)=>({label:x+' km/h',count:raw.s24Info[i]})),36,n,'30 km/h 이하 31/36건(86.1%). 저속에서 안전하다는 가정 대신 해당 사고 경위를 추가 확인할 필요가 있습니다.'),
 pair('domestic-mode-years','연도별 운행모드',raw.yearsInfo,raw.modeVInfo,raw.modeV2Info,n,'연도별 자율·일반모드 합계가 연도별 사고건수와 모두 일치합니다.'),
 pair('domestic-hours','시간대별 사고건수',['00–03','03–06','06–09','09–12','12–15','15–18','18–21','21–24'],raw.hourV2Info,raw.hourVInfo,n,'자율모드 09–15시 26/36건(72.2%). 시간대별 운행량 차이를 보정하지 않은 분포입니다.'),
 pair('domestic-months','월별 사고건수',Array.from({length:12},(_,i)=>(i+1)+'월'),raw.monthV2Info,raw.monthVInfo,n,'여러 연도의 같은 달을 합친 표입니다. 2025년 10–12월이 포함되지 않는 등 월별 관측기간이 같지 않습니다.'),
 pair('domestic-seasons','계절별 사고건수',['봄','여름','가을','겨울'],raw.seasonVInfo,raw.seasonV2Info,n,'자율모드 여름 16/36건. 계절별 운행량과 집계기간 차이로 계절의 위험도를 판단할 수 없습니다.'),
 pair('domestic-weather','날씨별 사고건수',raw.weatherLInfo,raw.weatherVInfo,raw.weatherV2Info,n,'자율모드 맑음 27/36건(75.0%). 기상 외의 사고 경위 검토도 필요합니다.'),
 pair('domestic-speed-modes','속도대별 운행모드',['≤30','30–50','50–70','70–90','>90'],raw.s24Info,raw.s23Info,n+' · km/h · 상한 포함','자율모드 저속 31/36건과 일반모드 58/63건은 각각 다른 분모의 구성비입니다.'),
 table('domestic-damage','파손정도별 집계',['파손정도','자율차','상대차'],raw.lossLInfo.map((x,i)=>[x,raw.lossVInfo[i],raw.lossV2Info[i]]),n+' · 자율차 합계 99 / 상대차 합계 88','상대차 표의 합계는 88건으로 자율차 99건과 다릅니다. 차이를 무피해 또는 미상으로 임의 보충하지 않습니다.'),
 pair('domestic-injuries','인명피해 유무 · 별도 집계',['피해 없음','피해 있음'],raw.trafV2Info,raw.trafVInfo,n+' · 이 표만 합계 122건','자율모드 피해 있음 5/38건(13.2%), 일반모드 8/84건(9.5%). 99건 표와 분모가 달라 결합하거나 부상 인원·중상 건수로 해석하지 않습니다.'),
 table('domestic-exposure','운행대수·거리당 사고값 · 원문 별도 표시',['연도','운행대수','자율모드 값','일반모드 값'],raw.yearsInfo.map((y,i)=>[y,raw.fleetInfo[i],raw.per10kInfoV1[i],raw.per10kInfoV2[i]]),n+' · 2025년 거리 6월 기준','페이지 표제는 100,000km, 차트 코드 주석은 10,000km로 단위 표기가 다릅니다. 원문 표시값만 보존하고 사고율 비교·단위 환산을 보류합니다.')];
}
export function domesticAudit(){return ['mode','hour','month','season','weather','speed'].map((k,i)=>{const pairs=[[raw.modeVInfo,raw.modeV2Info],[raw.hourV2Info,raw.hourVInfo],[raw.monthV2Info,raw.monthVInfo],[raw.seasonVInfo,raw.seasonV2Info],[raw.weatherVInfo,raw.weatherV2Info],[raw.s24Info,raw.s23Info]][i];return {name:k,ads:sum(pairs[0]),general:sum(pairs[1]),ok:sum(pairs[0])===36&&sum(pairs[1])===63};});}
