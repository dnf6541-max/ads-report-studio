/* Editable PowerPoint export. Native charts include their Excel workbooks. */
import {aggregate,filtered,pct,SEVERITY,CAR,VRU,countBy} from './analysis.mjs';
import {figureCatalog,figureDataRows,transitionSummary,surfaceSummary} from './supplement.mjs';

const C={navy:'193D50',teal:'148B82',blue:'277EAE',sky:'5AAAC8',amber:'D58A3B',muted:'637D8B',line:'D7E2E8',wash:'F3F7F9',grey:'83949E',white:'FFFFFF'};
const palette=[C.teal,C.blue,C.sky,C.amber,C.grey,'B3C1C8'];
const sevColor={none:C.teal,minor:'358EBC',moderate:'DF9F44',serious:'CB6A40',fatal:'AD4357',unknown:'B4BFC8'};
const names={overview:'ADS 사고유형 및 충돌특성',cases:'ADS 중상·사망 사고 사례',status:'ADS 운행상태별 사고 특성',vru:'보행자·자전거·이륜차 등 사고',domestic:'국내 자율주행차 사고현황 및 운행 특성'};
const tabs=Object.keys(names),font='Malgun Gothic';
const fmt=n=>Number(n).toLocaleString('ko-KR');
const period=f=>`${f.from||f.to?`${f.from||'자료 시작'} ~ ${f.to||'자료 종료'}`:'전체 기간'} · ${f.company||'전체 보고 회사'}`;

export function buildPptx(PptxGenJS,model,filter={},options={}) {
 const pptx=new PptxGenJS();pptx.defineLayout({name:'REPORT_16_9',width:16,height:9});pptx.layout='REPORT_16_9';
 pptx.author='ADS Report Studio';pptx.subject='NHTSA SGO ADS 실제 보고자료와 검수 기록';pptx.title='ADS 사고분석 리포트';pptx.company='ADS Report Studio';pptx.lang='ko-KR';pptx.theme={headFontFace:font,bodyFontFace:font,lang:'ko-KR'};
 const figures=figureCatalog(model,filter),byId=new Map(figures.map(f=>[f.id,f])),rows=filtered(model.impact,filter),ads=filtered(model.ads,filter),a=aggregate(rows);
 const S=pptx.ShapeType;
 const txt=(s,t,x,y,w,h,fs=16,extra={})=>s.addText(String(t??''),{x,y,w,h,fontFace:font,fontSize:fs,color:C.navy,margin:0,breakLine:false,vertAnchor:'top',paraSpaceAfterPt:0,...extra});
 const rect=(s,x,y,w,h,fill=C.wash,line=fill,extra={})=>s.addShape(S.rect,{x,y,w,h,fill:{color:fill},line:{color:line,width:.5},...extra});
 const line=(s,x1,y1,x2,y2,color=C.line,width=.8,extra={})=>s.addShape(S.line,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),flipH:x2<x1,flipV:y2<y1,line:{color,width,...extra}});
 const section=(s,n,title,x,y,w)=>{txt(s,n,x,y,.43,.32,20,{bold:true,color:C.blue});txt(s,title,x+.48,y,w-.48,.34,18,{bold:true});line(s,x,y+.43,x+w,y+.43);};
 const footer=(s,text,page)=>{line(s,.5,8.5,15.5,8.5);txt(s,text,.5,8.58,14.2,.3,9.5,{color:C.muted});txt(s,String(page).padStart(2,'0'),15,8.57,.5,.26,12,{bold:true,align:'right'});};
 const base=(title,sub,page,chip='')=>{const s=pptx.addSlide();s.background={color:C.white};rect(s,.5,.25,15,.055,C.navy);txt(s,title,.5,.47,13.1,.49,28,{bold:true});txt(s,sub,.5,1.04,14.5,.29,14,{color:C.muted});if(chip)txt(s,chip,12.25,.53,3.2,.3,11,{color:C.muted,align:'right'});footer(s,title===names.domestic?'출처: 한국교통안전공단 · 2025.11.28 발표 · 2025년 9월까지 · 미국 SGO와 별도':`자료: NHTSA SGO ADS 제공 자료 · ${period(filter)} · 차량별 사고보고 기준 · 사고율·법적 과실과 구분`,page);return s;};
 const empty=(s,x=.6,y=2,w=10.3,h=4)=>{txt(s,'선택 범위에 확인된 사고가 없습니다',x,y,w,.5,24,{bold:true});txt(s,'기간·회사를 변경해 주세요. 자료가 없을 때 예시 수치를 채우지 않습니다.',x,y+.8,w,h-.8,16,{color:C.muted});};
 function bar(s,f,x,y,w,h,fs=13) {
   if(!f||!f.items.length||!f.items.some(v=>v.count)){txt(s,'해당 자료 없음',x,y+.2,w,.4,fs,{color:C.muted});return;}
   const labels=f.items.map(d=>`${d.label||d.key}${f.denominator!=null?` (${pct(d.count,f.denominator)}%)`:''}`);
   s.addChart(pptx.ChartType.bar,[{name:'보고 건수',labels,values:f.items.map(d=>d.count)}],{x,y,w,h,barDir:'bar',barGrouping:'clustered',barGapWidthPct:48,catAxisLabelFontFace:font,catAxisLabelFontSize:fs,catAxisLabelColor:C.navy,catAxisLineShow:false,catAxisMajorTickMark:'none',catAxisMinorTickMark:'none',catAxisLabelPos:'low',catAxisOrientation:'maxMin',valAxisHidden:true,valAxisLineShow:false,valGridLine:{style:'none'},catGridLine:{style:'none'},showLegend:false,showValue:true,dataLabelPosition:'outEnd',dataLabelFormatCode:'0"건"',dataLabelFontSize:fs-1,dataLabelColor:C.navy,showTitle:false,chartColors:palette,chartArea:{fill:{color:C.white},border:{color:C.white,pt:0}},plotArea:{fill:{color:C.white},border:{color:C.white,pt:0}},showBorder:false,showCatName:false,lang:'ko-KR',showMarker:false});
 }
 function stack(s,items,total,x,y,w,h=.32,fs=10) {
   if(!total){txt(s,'자료 없음',x,y,w,h,fs,{color:C.muted});return;}
   s.addChart(pptx.ChartType.bar,items.map(d=>({name:d.label||d.key,labels:[''],values:[d.count]})),{x,y,w,h,barDir:'bar',barGrouping:'stacked',barOverlapPct:100,barGapWidthPct:0,catAxisHidden:true,valAxisHidden:true,catAxisLineShow:false,valAxisLineShow:false,valAxisMinVal:0,valAxisMaxVal:total,valGridLine:{style:'none'},catGridLine:{style:'none'},showLegend:false,showValue:false,chartColors:items.map((d,i)=>d.color||sevColor[d.key]||palette[i%palette.length]),chartArea:{fill:{color:C.white},border:{color:C.white,pt:0}},plotArea:{fill:{color:C.white},border:{color:C.white,pt:0}},layout:{x:0,y:0,w:1,h:1},lang:'ko-KR'});
 }
 function table(s,f,x,y,w,h,fs=13) {
   const data=[f.columns.map(t=>({text:String(t),options:{bold:true,color:C.navy,fill:C.wash}})),...f.rows.map(r=>r.map(t=>({text:String(t),options:{color:C.navy}})))];
   s.addTable(data,{x,y,w,h,fontFace:font,fontSize:fs,border:{type:'solid',pt:.55,color:C.line},margin:[4,6,4,6],rowH:h/data.length,color:C.navy,fill:C.white,autoPage:false,breakLine:false,vertAnchor:'middle',bold:false});
 }
 function insights(s,title,items,note) {
   line(s,11.35,1.5,11.35,8.25);txt(s,title,11.63,1.62,3.85,.43,23,{bold:true});
   items.forEach(([head,body],i)=>{const y=2.37+i*1.42;txt(s,String(i+1).padStart(2,'0'),11.63,y,.36,.3,14,{bold:true,color:C.teal});txt(s,head,12.02,y,3.45,.37,17,{bold:true});txt(s,body,11.63,y+.45,3.85,.76,14,{color:C.muted,breakLine:false});line(s,11.63,y+1.25,15.5,y+1.25);});
   rect(s,11.63,7.25,3.87,.95,'EAF5F2');rect(s,11.63,7.25,.04,.95,C.teal);txt(s,note,11.8,7.38,3.5,.65,12.5,{color:C.muted});
 }
 function notes(s,used,extra='') {s.addNotes(`자료: NHTSA SGO ADS 제공 CSV와 기존 검수 기록\n범위: ${period(filter)}\n사고 당시 ADS 확인: ${rows.length}건 / 운행상태 비교: ${ads.length}건\n단위: 차량별 사고보고. 사고율·과실·감소율을 의미하지 않음.\n${extra}\n${used.map(f=>JSON.stringify({id:f.id,title:f.title,note:f.note,data:figureDataRows(f)})).join('\n')}`);}
 // Requested accident diagrams use editable native PowerPoint objects.
 function diagram(s,type,x,y,w,h) {
   const X=v=>x+v/300*w,Y=v=>y+v/230*h;
   const box=(a,b,c,d,fill)=>rect(s,X(a),Y(b),c/300*w,d/230*h,fill);
   const label=(a,b,t,ww=120)=>txt(s,t,X(a),Y(b),ww/300*w,.3,10,{color:C.muted});
   const arrow=(a,b,c,d)=>line(s,X(a),Y(b),X(c),Y(d),C.teal,1.8,{endArrowType:'triangle'});
   const car=(a,b,angle=0,color=C.teal,l='ADS')=>{const rw=(angle===90||angle===270?64:37),rh=(angle===90||angle===270?37:64);s.addShape(S.roundRect,{x:X(a-rw/2),y:Y(b-rh/2),w:rw/300*w,h:rh/230*h,rectRadius:.03,fill:{color},line:{color,width:.5},radius:.04});txt(s,l,X(a-rw/2+2),Y(b-6),(rw-4)/300*w,.18,9,{bold:true,color:C.white,align:'center'});box(a-rw/2+5,b-rh/2+6,rw-10,8,'C7DEE7');};
   const hit=(a,b)=>s.addShape(S.diamond,{x:X(a-6),y:Y(b-6),w:12/300*w,h:12/230*h,fill:{color:C.amber},line:{color:C.white,width:.7}});
   box(0,0,300,230,'EEF3F5');
   if(type==='crossing'){box(0,83,300,86,'D7E0E5');box(111,0,87,230,'D7E0E5');car(205,143,270);car(137,54,180,C.grey,'소방');arrow(282,143,250,143);arrow(137,3,137,20);hit(168,123);label(13,15,'남쪽 진입');label(13,38,'긴급등 작동');label(201,193,'서쪽 진행');}
   else if(type==='rear'){box(35,0,230,230,'D7E0E5');line(s,X(150),Y(0),X(150),Y(230),C.white,1,{dashType:'dash'});car(195,73);car(205,172,0,C.grey,'SUV');arrow(205,225,205,208);hit(200,113);label(38,37,'적색 신호');label(38,60,'ADS 정지');label(38,170,'뒤차 접근');}
   else if(type==='bicycle-rear'){box(75,0,150,230,'D7E0E5');car(155,160,180);s.addShape(S.ellipse,{x:X(146),y:Y(53),w:18/300*w,h:31/230*h,fill:{color:C.grey},line:{color:C.grey}});line(s,X(155),Y(35),X(155),Y(105),C.grey,2);arrow(155,5,155,28);hit(155,119);label(5,45,'자전거 뒤따름');label(5,190,'제동 후 접촉');}
   else if(type==='motorcycle-secondary'){box(30,0,240,230,'D7E0E5');line(s,X(141),Y(0),X(141),Y(230),C.white,1,{dashType:'dash'});car(206,67);car(91,150,0,C.grey,'승용');s.addShape(S.ellipse,{x:X(173),y:Y(129),w:18/300*w,h:32/230*h,fill:{color:C.grey},line:{color:C.grey}});arrow(182,195,182,169);arrow(206,18,262,18);hit(193,108);hit(126,133);label(5,6,'우회전 감속');label(15,204,'① 후부 접촉  ② 후속 충격',285);}
   else {box(25,30,250,48,'DCEEEA');label(44,44,'보고된 사고 상황',220);arrow(150,85,150,110);box(25,122,250,48,'E1EAF0');label(44,136,'접촉 순서·피해 확인',220);label(23,195,'상세 진로는 원문 참고',250);}
 }
 function casePanel(s,f,x,y,w,h) {
   rect(s,x,y,w,h,C.white,C.line);rect(s,x,y,w,.45,C.wash);txt(s,`${f.record.id} · ${SEVERITY[f.record.severity]}`,x+.16,y+.1,w-.3,.23,14,{bold:true});
   diagram(s,f.case.diagram,x+.15,y+.65,2.25,1.86);const tx=x+2.62,tw=w-2.82;
   txt(s,`${f.record.company} · ${f.record.month}`,tx,y+.63,tw,.3,10,{color:C.muted});txt(s,'사고 상황',tx,y+.98,tw,.27,13,{bold:true,color:C.blue});txt(s,f.case.summary,tx,y+1.31,tw,.9,14);txt(s,'확인할 점',tx,y+2.25,tw,.24,12,{bold:true,color:C.blue});txt(s,f.case.caution,tx,y+2.53,tw,h-2.65,10.5,{color:C.muted});
 }
 function mainPage(tab,index) {
   const s=base(names[tab],tab==='domestic'?'국내 공식 발표 · 미국 분석과 별도':'실제 보고자료의 집계와 사고 경위 분석',index,tab==='domestic'?'집계 기준 2025.9':`N=${fmt(tab==='status'?ads.length:tab==='vru'?a.vru.length:rows.length)}`);
   if(tab!=='domestic'&&(tab==='status'?!ads.length:!rows.length)){empty(s);notes(s,[]);return;}
   if(tab==='overview'){
     section(s,'01','충돌대상별 사고 구성',.55,1.47,10.5);bar(s,byId.get('counterparts'),.55,1.97,10.55,2.75,13);
     section(s,'02','자동차 상대 대표 상황',.55,4.95,4.95);
     const rear=a.scenarios.filter(x=>['01','02'].includes(x.key)).reduce((n,x)=>n+x.count,0),lead=[{label:'정지·직진·감속 후미추돌',count:rear},...['03','04','05'].map(k=>a.scenarios.find(x=>x.key===k))];lead.push({label:'나머지 유형',count:a.cars.length-lead.reduce((n,x)=>n+x.count,0)});
     bar(s,{items:lead,denominator:a.cars.length},.5,5.47,5.1,2.12,10);txt(s,`분모: 자동차 상대 ${fmt(a.cars.length)}건\n세부 8유형은 개별 그림과 CSV에서 확인`,.6,7.75,4.9,.43,10,{color:C.muted});
     section(s,'03','발생환경',5.85,4.95,5.2);
     const place=[{label:'교차로',count:rows.filter(r=>r.roadway==='Intersection').length},{label:'그 외·불명',count:rows.filter(r=>r.roadway!=='Intersection').length}];
     const env=[['장소',place,rows.length],['주·야간',byId.get('day-night').items,rows.length],['조명',byId.get('lighting').items,byId.get('lighting').denominator],['노면',byId.get('road-surface').items,byId.get('road-surface').denominator]];
     env.forEach(([label,items,total],i)=>{const y=5.51+i*.63;txt(s,`${label} · 기재 ${fmt(total)}건`,5.9,y,5,.2,10.5,{bold:true});stack(s,items,total,5.9,y+.22,5.1,.23);txt(s,items.filter(x=>x.count).map(d=>`${d.label} ${fmt(d.count)}`).join(' / '),5.9,y+.45,5.1,.17,8.5,{color:C.muted});});
     insights(s,'사고특성 분석',[
       ['자동차 상대 중심',`${fmt(a.cars.length)}건 (${pct(a.cars.length,rows.length)}%). 상대 차량 종류와 사고 직전 움직임을 함께 확인합니다.`],
       ['접촉부위와 형태 구분','접촉부위만으로 추돌·긁힘·과실을 단정하지 않습니다. 경위 분류와 부위별 그림을 별도로 제공합니다.'],
       ['결측치를 보존','주야간은 시각으로 구분합니다. 조명·노면은 값이 있는 사고만 분모로 사용합니다.']
     ],'분포와 구성비를 제시합니다. 운행거리 정보가 없어 회사별 사고율을 비교하지 않습니다.');
     notes(s,figures.filter(f=>f.tab===tab));
   }else if(tab==='cases'){
     const priority=['30412-6144','30270-15547','30412-2588','30270-11713'];const available=figures.filter(f=>f.tab==='cases');const selected=[...priority.map(id=>byId.get('case-'+id)).filter(Boolean),...available.filter(f=>!priority.includes(f.record.id))].slice(0,4);
     selected.forEach((f,i)=>casePanel(s,f,.55+(i%2)*7.7,1.55+Math.floor(i/2)*3.4,7.2,3.2));
     if(!selected.length)empty(s);notes(s,selected,'그림은 원문에 기초한 개략도. 모든 사고의 자동 진로 복원 기능이 아님.');
   }else if(tab==='status'){
     section(s,'01','사고 당시 작동상태',.55,1.47,10.5);bar(s,byId.get('operating-state'),.55,1.98,10.5,2.08,14);
     section(s,'02','운전자·운영자 유형',.55,4.42,5.0);bar(s,byId.get('operator'),.5,4.95,5.1,2.2,10.5);
     const timing=transitionSummary(ads);rect(s,.6,7.36,4.9,.77,'EAF5F2');txt(s,`시차 확인 ${timing.known.length}건 중 보고값 5초 이내 ${timing.counts[0].count}건`,.72,7.47,4.65,.25,12,{bold:true,color:C.teal});txt(s,'약 표현 포함. 전체 수동·원격 보고와 분모 구분.',.72,7.85,4.65,.18,9.5,{color:C.muted});
     section(s,'03','운행상태별 피해수준',5.9,4.42,5.15);const g=byId.get('state-severity');g.groups.forEach((r,i)=>{const y=5.04+i*.86;txt(s,`${r.label} · ${fmt(r.total)}건`,5.95,y,5,.23,12,{bold:true});stack(s,r.items,r.total,5.95,y+.3,5,.28);const high=r.items.filter(x=>['serious','fatal'].includes(x.key)).reduce((n,x)=>n+x.count,0);txt(s,`중상·사망 ${high}건 (${pct(high,r.total)}%)`,5.95,y+.62,5,.2,10,{color:C.muted});});txt(s,'부상 보고 없음 / 경상 / 중등도 / 중상 / 사망 / 불명',5.95,7.82,5,.25,9,{color:C.muted});
     insights(s,'운행상태 분석',[
       ['분모를 구분',`운행상태 비교 ${fmt(ads.length)}건. 사고 당시 ADS 확인 ${fmt(rows.length)}건으로 유형·환경을 분석합니다.`],
       ['전환 시차의 근거','명시된 초 단위 표현과 사건 시각을 확인했습니다. ‘몇 초 전’이 불명확하면 구분 미확인으로 남깁니다.'],
       ['상태와 탑승형태 구분','운전자·운영자 없음은 승객 없음과 다릅니다. 차내·원격 운영 유형을 원자료대로 유지합니다.']
     ],'상태별 피해수준은 보고된 분포입니다. 운행거리·조건이 다른 집단의 위험도를 비교하지 않습니다.');notes(s,figures.filter(f=>f.tab===tab));
   }else if(tab==='vru'){
     if(!a.vru.length){empty(s);notes(s,[]);return;}
     section(s,'01','취약도로이용자 유형별 구성',.55,1.47,10.5);bar(s,byId.get('vru-types'),.55,1.97,10.5,1.92,14);
     const high=a.vru.filter(r=>['serious','fatal'].includes(r.severity)).length;rect(s,.6,4.03,10.4,.37,'FFF4E4');txt(s,`중상·사망 ${high}건 (${pct(high,a.vru.length)}%) · 피해 인원이 아닌 차량별 사고보고`,.74,4.11,10.0,.22,12,{color:'996328'});
     section(s,'02','ADS 행동·발생환경',.55,4.62,5.1);table(s,byId.get('vru-movement'),.55,5.16,5.1,1.38,9.3);table(s,byId.get('vru-environment'),.55,6.85,5.1,1.12,10.5);txt(s,'주간 06:00–17:59 / 야간 18:00–05:59',.6,8.08,5,.2,9.5,{color:C.muted});
     section(s,'03','접촉부위·피해수준',5.95,4.62,5.1);bar(s,byId.get('vru-contact'),5.9,5.13,5.2,1.88,10.5);txt(s,'복수 접촉부위 가능. 합계가 사고 건수보다 클 수 있음.',5.98,7.09,5,.22,9.5,{color:C.muted});stack(s,byId.get('vru-severity').items,a.vru.length,5.98,7.51,5,.32);txt(s,byId.get('vru-severity').items.filter(x=>x.count).map(x=>`${x.label} ${x.count}`).join(' / '),5.98,7.94,5,.27,9,{color:C.muted});
     insights(s,'취약도로이용자 분석',[
       ['유형을 원자료대로',`${a.vru.length}건. 이륜차와 스쿠터·스케이트보드를 구분하며 기타 비자동차 이용자는 별도입니다.`],
       ['시간과 장소를 확인',`야간 ${a.vru.filter(r=>r.time==='night').length}건 중 교차로 ${a.vru.filter(r=>r.time==='night'&&r.roadway==='Intersection').length}건. 실제 조도와 구분합니다.`],
       ['피해수준 정의 유지','Moderate를 중상으로 올리지 않습니다. 후속 충격이 있는 경우 원문에서 접촉 순서를 확인합니다.']
     ],'원문에 기재된 행동·부위·피해수준을 연결합니다. 과실이나 예방 가능한 사고 건수로 해석하지 않습니다.');notes(s,figures.filter(f=>f.tab===tab));
   }else {
     section(s,'01','사고 신고 추이',.55,1.47,10.5);bar(s,byId.get('domestic-years'),.55,1.99,8.2,2.5,16);txt(s,'누적',9.05,2.45,1.75,.35,16,{color:C.muted,align:'center'});txt(s,'112건',8.87,2.95,2.1,.75,42,{bold:true,align:'center'});txt(s,'2022 ~ 2025.9',8.9,3.85,2.1,.3,12,{color:C.muted,align:'center'});txt(s,'2025년은 1–9월 집계. 전년도 연간 건수와 직접 비교 시 기간 차이에 유의.',.65,4.55,10.1,.35,12,{color:C.muted});
     section(s,'02','자율주행모드 사고',.55,5.02,5.0);section(s,'03','사고 발생 속도',5.93,5.02,5.12);txt(s,'약 35%',.75,5.88,4.55,.7,44,{bold:true,color:C.teal,align:'center'});txt(s,'전체 신고 사고 중\n자율주행모드 운행 중 사고 비중',.85,6.8,4.4,.65,17,{align:'center'});txt(s,'30 km/h 이하',6.05,5.88,4.75,.75,32,{bold:true,color:C.teal,align:'center'});txt(s,'사고가 주로 발생한\n저속 구간에 대한 공식 발표 요약',6.12,6.8,4.65,.65,17,{align:'center'});
     insights(s,'국내 사고특성',[
       ['별도 공식 통계','2022년 7건, 2023년 27건, 2024년 31건, 2025년 1–9월 47건입니다.'],
       ['미국 SGO와 분리','미국의 기간·회사 필터를 바꾸어도 국내 공식 발표값은 변경되지 않습니다.'],
       ['발표 시점 표시','2025년 11월 28일 발표 자료입니다. 새로운 공식 발표가 있을 때 출처와 함께 갱신합니다.']
     ],'약 35%를 정확한 건수로 환산하거나 속도 구간별 미공개 건수를 채워 넣지 않습니다.');notes(s,figures.filter(f=>f.tab===tab),model.pkg.domestic.sourceUrl);
   }
 }
 function figurePage(f,index) {
   const s=base(f.title,f.tab==='domestic'?'국내 공식 발표자료':'선택한 분석대상에서 계산한 개별 그림',index,f.denominator!=null?`분모 ${fmt(f.denominator)}건`:'');
   if(f.kind==='bar')bar(s,f,.65,1.65,14.7,5.92,20);
   else if(f.kind==='table')table(s,f,.65,1.95,14.7,Math.min(4.9,Math.max(2.4,(f.rows.length+1)*.55)),19);
   else if(f.kind==='grouped'){f.groups.forEach((g,i)=>{const y=1.9+i*1.55;txt(s,`${g.label} · ${fmt(g.total)}건`,.8,y,14,.45,22,{bold:true});stack(s,g.items,g.total,.8,y+.6,14.2,.5);txt(s,g.items.filter(x=>x.count).map(x=>`${x.label} ${x.count}건 (${pct(x.count,g.total)}%)`).join(' / '),.85,y+1.16,14.1,.3,12,{color:C.muted});});}
   else if(f.kind==='stat'){txt(s,f.value,1,2.1,14,1.5,66,{bold:true,color:C.teal,align:'center'});txt(s,f.description,2,4.1,12,1.3,29,{align:'center'});}
   else if(f.kind==='case'){diagram(s,f.case.diagram,.8,2.0,6.15,4.8);txt(s,`${f.record.company} · ${f.record.month} · 보고 ${f.record.id}`,7.5,1.95,7.4,.55,18,{bold:true});txt(s,'사고 상황',7.5,2.83,7.2,.4,22,{bold:true,color:C.blue});txt(s,f.case.summary,7.5,3.45,7.2,1.5,22);txt(s,'확인할 점',7.5,5.35,7.2,.4,21,{bold:true,color:C.blue});txt(s,f.case.caution,7.5,5.95,7.2,1.25,18,{color:C.muted});}
   txt(s,f.note||'',.8,7.95,14.4,.4,12,{color:C.muted});notes(s,[f]);
 }
 const scope=options.scope||'pages';
 if(scope==='figures'){const chosen=options.figureId?figures.filter(f=>f.id===options.figureId):options.tab?figures.filter(f=>f.tab===options.tab):figures;if(!chosen.length)throw new Error('내보낼 그림이 없습니다.');chosen.forEach((f,i)=>figurePage(f,i+1));}
 else {const selectedTabs=options.tab?[options.tab]:tabs;if(selectedTabs.some(t=>!tabs.includes(t)))throw new Error('분석 페이지에서 PPTX를 저장해 주세요.');selectedTabs.forEach((t,i)=>mainPage(t,i+1));}
 return pptx;
}
