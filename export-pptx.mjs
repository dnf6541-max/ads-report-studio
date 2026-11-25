import {CONTACT_POINTS,CONTACT_LABELS} from './contact-diagram.mjs?v=20261125.20';
import {SCENARIO_SCHEMES} from './scenario-viz.mjs?v=20261125.20';
import {placeSummary} from './environment.mjs?v=20261125.20';
import {analysisRows,analysisBasis} from './analysis.mjs?v=20261125.20';
import {contributionSummary,contributionInsights,compactContributionItems} from './contribution.mjs?v=20261125.20';
import {sceneFor,locationInfo} from './scenes.mjs?v=20261125.20';
/* Editable PowerPoint export. Native charts include their Excel workbooks. */
import {aggregate,filtered,pct,SEVERITY,CAR,VRU,countBy} from './analysis.mjs?v=20261125.20';
import {figureCatalog,figureDataRows,transitionSummary,surfaceSummary} from './supplement.mjs?v=20261125.20';

import {insightSummary} from './extended.mjs?v=20261125.20';
const C={navy:'193D50',teal:'148B82',blue:'277EAE',sky:'5AAAC8',amber:'D58A3B',muted:'637D8B',line:'D7E2E8',wash:'F3F7F9',grey:'83949E',white:'FFFFFF'};
const palette=[C.teal,C.blue,C.sky,C.amber,C.grey,'B3C1C8'];
const sevColor={none:C.teal,minor:'358EBC',moderate:'DF9F44',serious:'CB6A40',fatal:'AD4357',unknown:'B4BFC8'};
const names={overview:'ADS 사고유형 및 충돌특성',cases:'ADS 중상·사망 사고 사례',status:'ADS 운행상태별 사고 특성',vru:'보행자·자전거·이륜차 등 사고',domestic:'국내 자율주행차 사고현황 및 운행 특성',contribution:'자율차 기여 가능성 검토'};
const tabs=Object.keys(names),font='Malgun Gothic';
const fmt=n=>Number(n).toLocaleString('ko-KR');
const period=f=>`${analysisBasis(f).label} · ${f.from||f.to?`${f.from||'자료 시작'} ~ ${f.to||'자료 종료'}`:'전체 기간'} · ${f.company||'전체 보고 회사'}`;

export function buildPptx(PptxGenJS,model,filter={},options={}) {
 const pptx=new PptxGenJS();pptx.defineLayout({name:'REPORT_16_9',width:16,height:9});pptx.layout='REPORT_16_9';
 pptx.author='ADS Report Studio';pptx.subject='NHTSA SGO ADS 실제 보고자료와 검수 기록';pptx.title='ADS 사고분석 리포트';pptx.company='ADS Report Studio';pptx.lang='ko-KR';pptx.theme={headFontFace:font,bodyFontFace:font,lang:'ko-KR'};
 const figures=figureCatalog(model,filter),byId=new Map(figures.map(f=>[f.id,f])),rows=analysisRows(model,filter),ads=rows,a=aggregate(rows);
 const S=pptx.ShapeType;
 const txt=(s,t,x,y,w,h,fs=16,extra={})=>s.addText(String(t??''),{x,y,w,h,fontFace:font,fontSize:fs,color:C.navy,margin:0,breakLine:false,vertAnchor:'top',paraSpaceAfterPt:0,...extra});
 const rect=(s,x,y,w,h,fill=C.wash,line=fill,extra={})=>s.addShape(S.rect,{x,y,w,h,fill:{color:fill},line:{color:line,width:.5},...extra});
 const line=(s,x1,y1,x2,y2,color=C.line,width=.8,extra={})=>s.addShape(S.line,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),flipH:x2<x1,flipV:y2<y1,line:{color,width,...extra}});
 const section=(s,n,title,x,y,w)=>{txt(s,n,x,y,.43,.32,20,{bold:true,color:C.blue});txt(s,title,x+.48,y,w-.48,.34,18,{bold:true});line(s,x,y+.43,x+w,y+.43);};
 const footer=(s,text,page)=>{line(s,.5,8.5,15.5,8.5);txt(s,text,.5,8.58,14.2,.3,9.5,{color:C.muted});txt(s,String(page).padStart(2,'0'),15,8.57,.5,.26,12,{bold:true,align:'right'});};
 const base=(title,sub,page,chip='',domestic=false)=>{const s=pptx.addSlide();s.background={color:C.white};rect(s,.5,.25,15,.055,C.navy);txt(s,title,.5,.47,13.1,.49,28,{bold:true});txt(s,sub,.5,1.04,14.5,.29,14,{color:C.muted});if(chip)txt(s,chip,12.25,.53,3.2,.3,11,{color:C.muted,align:'right'});footer(s,(domestic||title===names.domestic)?'출처: 한국교통안전공단 · 2025.11.28 발표 · 2025년 9월까지 · 미국 SGO와 별도':`자료: NHTSA SGO ADS 제공 자료 · ${period(filter)} · 차량별 사고보고 기준 · 사고율·법적 과실과 구분`,page);return s;};
 const empty=(s,x=.6,y=2,w=10.3,h=4)=>{txt(s,'선택 범위에 확인된 사고가 없습니다',x,y,w,.5,24,{bold:true});txt(s,'기간·회사를 변경해 주세요. 자료가 없을 때 예시 수치를 채우지 않습니다.',x,y+.8,w,h-.8,16,{color:C.muted});};
 function bar(s,f,x,y,w,h,fs=13) {
   if(!f||!f.items.length||!f.items.some(v=>v.count)){txt(s,'해당 자료 없음',x,y+.2,w,.4,fs,{color:C.muted});return;}
   const labels=f.items.map(d=>`${d.label||d.key}${f.denominator!=null?` (${pct(d.count,f.denominator)}%)`:''}`);
   s.addChart(pptx.ChartType.bar,[{name:'보고 건수',labels,values:f.items.map(d=>d.count)}],{x,y,w,h,barDir:'bar',barGrouping:'clustered',barGapWidthPct:48,catAxisLabelFontFace:font,catAxisLabelFontSize:fs,catAxisLabelColor:C.navy,catAxisLineShow:false,catAxisMajorTickMark:'none',catAxisMinorTickMark:'none',catAxisLabelPos:'low',catAxisLabelFrequency:'1',catAxisOrientation:'maxMin',valAxisHidden:true,valAxisLineShow:false,valGridLine:{style:'none'},catGridLine:{style:'none'},showLegend:false,showValue:true,dataLabelPosition:'outEnd',dataLabelFormatCode:'0"건"',dataLabelFontSize:fs-1,dataLabelColor:C.navy,showTitle:false,chartColors:palette,chartArea:{fill:{color:C.white},border:{color:C.white,pt:0}},plotArea:{fill:{color:C.white},border:{color:C.white,pt:0}},showBorder:false,showCatName:false,lang:'ko-KR',showMarker:false});
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
   items.forEach(([head,body],i)=>{const y=2.37+i*1.42;txt(s,String(i+1).padStart(2,'0'),11.63,y,.36,.3,14,{bold:true,color:C.teal});txt(s,head,12.02,y,3.45,.37,17,{bold:true});txt(s,body,11.63,y+.45,3.85,.83,12.7,{color:C.muted,breakLine:false});line(s,11.63,y+1.25,15.5,y+1.25);});
   rect(s,11.63,7.25,3.87,.95,'EAF5F2');rect(s,11.63,7.25,.04,.95,C.teal);txt(s,note,11.8,7.38,3.5,.65,12.5,{color:C.muted});
 }
 function notes(s,used,extra='') {if(used.length&&used.every(f=>f.tab==='domestic')){s.addNotes(`자료: 한국교통안전공단 · 2025.11.28 발표\n범위: 2022~2025년 9월 공식 발표 스냅샷. 미국 필터와 별도.\n출처: ${model.pkg.domestic.sourceUrl}\n${used.map(f=>JSON.stringify({id:f.id,title:f.title,insight:f.insight,note:f.note,data:figureDataRows(f)})).join('\n')}`);return;}s.addNotes(`자료: NHTSA SGO ADS 제공 CSV와 기존 검수 기록\n범위: ${period(filter)}\n선택 분석대상: ${rows.length}건 / 이 중 ADS 운행 확인: ${rows.filter(r=>r.decision==='include').length}건\n단위: 차량별 사고보고. 사고율·과실·감소율을 의미하지 않음.\n${extra}\n${used.map(f=>JSON.stringify({id:f.id,title:f.title,insight:f.insight,note:f.note,data:figureDataRows(f)})).join('\n')}`);}
 // Requested accident diagrams use editable native PowerPoint objects.
 function nativeScene(s,r,x,y,w,h){
  h=Math.min(h,w*450/800);
  const sc=sceneFor(r,model.pkg.sceneOverrides?.[r.id]),loc=locationInfo(r,model.pkg.sceneOverrides?.[r.id]);const X=v=>x+v/800*w,Y=v=>y+v/450*h;
  const box=(a,b,c,d,fill)=>rect(s,X(a),Y(b),c/800*w,d/450*h,fill);
  box(0,0,800,450,'F3F7F9');
  if(sc.layout==='contact'){
   [ [225,sc.svAreas,'보고 차량',C.teal,sc.svMovement],[575,sc.cpAreas,sc.cpLabel,C.grey,sc.cpMovement] ].forEach(([cx,areas,label,color,movement])=>{
    txt(s,label,X(cx-140),Y(35),280/800*w,30/450*h,Math.max(7,w*2.1),{bold:true,align:'center',color});txt(s,'신고 행동: '+movement,X(cx-150),Y(75),300/800*w,25/450*h,Math.max(5.5,w*1.4),{align:'center',color:C.muted});
    if(cx===225||/승용|SUV|픽업|화물|밴|버스|차량/.test(label)){s.addShape(S.roundRect,{x:X(cx-34),y:Y(145),w:68/800*w,h:130/450*h,fill:{color},line:{color,width:.5}});box(cx-26,160,52,25,'DCE8EB');box(cx-26,245,52,15,'B9CBD1');}else{rect(s,X(cx-75),Y(150),150/800*w,120/450*h,'E6EDF0',color);txt(s,'신고 상대',X(cx-70),Y(198),140/800*w,30/450*h,Math.max(6,w*1.5),{color,align:'center'});}
    areas.filter(a=>CONTACT_POINTS[a]).forEach(a=>{const [dx,dy]=CONTACT_POINTS[a];s.addShape(S.ellipse,{x:X(cx+dx-10),y:Y(210+dy-10),w:20/800*w,h:20/450*h,fill:{color:C.amber},line:{color:C.white,width:1}});});
    txt(s,areas.map(a=>CONTACT_LABELS[a]||a).join(' · ')||'접촉부위 미기재',X(cx-165),Y(305),330/800*w,40/450*h,Math.max(5.5,w*1.4),{align:'center'});
   });txt(s,'주황: 신고 접촉부위 · 위쪽: 차량 전면',X(30),Y(365),740/800*w,30/450*h,Math.max(5,w*1.4),{color:C.muted});txt(s,sc.context,X(30),Y(405),740/800*w,28/450*h,Math.max(5,w*1.3));return;
  }
  if(sc.layout==='sequence'){sc.sequence.forEach((step,i)=>{const a=20+i*260;box(a,40,240,320,'FFFFFF');txt(s,`${i+1}. ${step.title}`,X(a+10),Y(58),220/800*w,30/450*h,Math.max(6,w*1.8),{bold:true,align:'center'});box(a+25,105,190,180,'DCE5E9');if(step.kind!=='tire')box(a+145,105,12,180,'A9B8C0');box(a+91,140,60,110,C.teal);box(a+98,154,46,20,'D8E7ED');txt(s,step.kind==='tire'?'수동':'ADS',X(a+91),Y(188),60/800*w,25/450*h,Math.max(5,w*1.5),{color:C.white,align:'center'});s.addShape(S.ellipse,{x:X(a+137),y:Y(step.kind==='tire'?222:141),w:28/800*w,h:28/450*h,fill:{color:C.amber},line:{color:C.white,width:1}});txt(s,step.note,X(a+5),Y(302),230/800*w,38/450*h,Math.max(5,w*1.5),{align:'center'});});txt(s,sc.context,X(20),Y(398),760/800*w,30/450*h,Math.max(5,w*1.15));txt(s,'사고의 선후관계 · 회전 방향·위치·간격 미확정',X(20),Y(433),760/800*w,17/450*h,Math.max(4.5,w),{color:C.muted});return;}
  box(235,25,330,365,'DCE5E9');if(sc.layout==='intersection')box(70,160,660,155,'DCE5E9');
  const ln=(a,b,c,d,color='FFFFFF',width=1,extra={})=>line(s,X(a),Y(b),X(c),Y(d),color,width,extra);
  if(sc.layout==='intersection'){ln(400,25,400,150,'BDAC65',1.3);ln(400,320,400,390,'BDAC65',1.3);ln(70,238,225,238,'BDAC65',1.3);ln(570,238,730,238,'BDAC65',1.3);}else ln(400,25,400,390,'BDAC65',1.3);
  (sc.objects||[]).forEach(o=>{box(o.x,o.y,o.w,o.h,'ADBCC5');txt(s,o.label,X(o.x-30),Y(o.y-25),(o.w+60)/800*w,22/450*h,Math.max(5,w*1.3),{align:'center',color:C.muted});});
  sc.paths.forEach(p=>ln(...p,C.amber,1.6,{endArrowType:'triangle'}));
  const actor=(p,label,color)=>{const [a,b,rot]=p,noncar=/보행자|자전거|이륜차|시설물|관련 대상|옹벽|연석|바퀴|노면/.test(label);s.addShape(noncar?S.ellipse:S.roundRect,{x:X(a-28),y:Y(b-(noncar?28:48)),w:56/800*w,h:(noncar?56:96)/450*h,rotate:noncar?0:rot,fill:{color:noncar?C.white:color},line:{color,width:1}});txt(s,label,X(a-70),Y(b-10),140/800*w,22/450*h,Math.max(5,w*1.4),{color:noncar?color:C.white,bold:true,align:'center',fill:{color:noncar?C.white:color}});};
  actor(sc.ads,'ADS',C.teal);actor(sc.cp,sc.cpLabel,C.grey);if(sc.third)actor(sc.third,sc.thirdLabel||'관련 대상','8899A2');sc.hits.forEach((p,i)=>{s.addShape(S.ellipse,{x:X(p[0]-12),y:Y(p[1]-12),w:24/800*w,h:24/450*h,fill:{color:C.amber},line:{color:C.white,width:.7}});});
  txt(s,sc.context,X(12),Y(400),776/800*w,35/450*h,Math.max(5,w*1.15),{color:C.navy});txt(s,`${loc.city} ${loc.state} · ${loc.level}`,X(12),Y(433),776/800*w,18/450*h,Math.max(4.5,w),{color:C.muted});
 }
 function casePanel(s,f,x,y,w,h) {
   rect(s,x,y,w,h,C.white,C.line);rect(s,x,y,w,.45,C.wash);txt(s,`${f.record.id} · ${SEVERITY[f.record.severity]}`,x+.16,y+.1,w-.3,.23,14,{bold:true});
   nativeScene(s,f.record,x+.15,y+.65,2.25,1.86);const tx=x+2.62,tw=w-2.82;
   txt(s,`${f.record.company} · ${f.record.month}`,tx,y+.63,tw,.3,10,{color:C.muted});txt(s,'사고 상황',tx,y+.98,tw,.27,13,{bold:true,color:C.blue});txt(s,f.case.summary,tx,y+1.31,tw,.9,14);txt(s,'확인할 점',tx,y+2.25,tw,.24,12,{bold:true,color:C.blue});txt(s,f.case.caution,tx,y+2.53,tw,h-2.65,10.5,{color:C.muted});
 }
 function mainPage(tab,index) {
   const s=base(names[tab],tab==='domestic'?'국내 공식 발표 · 미국 분석과 별도':'실제 보고자료의 집계와 사고 경위 분석',index,tab==='domestic'?'집계 기준 2025.9':`N=${fmt(tab==='contribution'?contributionSummary(rows,filter).n:tab==='status'?ads.length:tab==='vru'?a.vru.length:tab==='cases'?rows.filter(r=>['serious','fatal'].includes(r.severity)).length:rows.length)}`);
   if(tab!=='domestic'&&(tab==='status'?!ads.length:!rows.length)){empty(s);notes(s,[]);return;}
   if(tab==='overview'){
     section(s,'01','충돌대상별 사고 구성',.55,1.47,10.5);bar(s,byId.get('counterparts'),.55,1.97,10.55,2.75,13);
     section(s,'02','자동차 상대 대표 상황',.55,4.95,4.95);
     const rear=a.scenarios.filter(x=>['01','02'].includes(x.key)).reduce((n,x)=>n+x.count,0),lead=[{label:'정지·주행·감속 후미추돌',count:rear},...['03','04','05'].map(k=>a.scenarios.find(x=>x.key===k))];lead.push({label:'그 외 대조 확인',count:a.scenarios.filter(x=>['06','07','08','R'].includes(x.key)).reduce((n,x)=>n+x.count,0)},{label:'미확정·미검토',count:a.scenarios.filter(x=>['C','I','U'].includes(x.key)).reduce((n,x)=>n+x.count,0)});
     bar(s,{items:lead,denominator:a.cars.length},.5,5.47,5.1,2.12,10);txt(s,`분모: 자동차 상대 ${fmt(a.cars.length)}건\n세부 8유형은 개별 그림과 CSV에서 확인`,.6,7.75,4.9,.43,10,{color:C.muted});
     section(s,'03','발생환경',5.85,4.95,5.2);
     const place=placeSummary(rows).compact;
     const env=[['장소',place,rows.length],['주·야간',byId.get('day-night').items,rows.length],['기상',byId.get('weather-overview').items,rows.length],['도로조건',byId.get('road-overview').items,rows.length]];
     env.forEach(([label,items,total],i)=>{const y=i===0?5.43:6.25+(i-1)*.63;txt(s,`${label} · 전체 ${fmt(total)}건`,5.9,y,5,.2,10.5,{bold:true});stack(s,items,total,5.9,y+.22,5.1,.21);const parts=items.filter(x=>x.count).map(d=>`${d.label} ${fmt(d.count)}`),legend=i===0?[parts.slice(0,3).join(' / '),parts.slice(3).join(' / ')].filter(Boolean).join('\n'):parts.join(' / ');txt(s,legend,5.9,y+.45,5.1,i===0?.35:.18,8.3,{color:C.muted});});
     {const i=insightSummary(model,filter,'overview');insights(s,i.title,i.items,i.note);}
     notes(s,figures.filter(f=>f.tab===tab));
   }else if(tab==='cases'){
     const priority=['30412-6144','30270-15547','30412-2588','30270-11713'];const available=figures.filter(f=>f.tab==='cases'&&f.kind==='case');const selected=[...priority.map(id=>byId.get('case-'+id)).filter(Boolean),...available.filter(f=>!priority.includes(f.record.id))].slice(0,4);
     selected.forEach((f,i)=>casePanel(s,f,.55+(i%2)*7.7,1.55+Math.floor(i/2)*3.4,7.2,3.2));
     if(!selected.length)empty(s);notes(s,selected,'그림은 원문에 기초한 개략도. 모든 사고의 자동 진로 복원 기능이 아님.');
   }else if(tab==='status'){
     section(s,'01','사고 당시 제어 방식',.55,1.47,10.5);bar(s,byId.get('operating-state'),.55,1.98,10.5,2.08,14);
     section(s,'02','보고된 운전·운영인력 유형',.55,4.42,5.0);bar(s,byId.get('operator'),.5,4.95,5.1,2.2,10.5);
     const timing=transitionSummary(ads);rect(s,.6,7.36,4.9,.77,'EAF5F2');txt(s,`차내 전환 시차 ${timing.known.length}건 중 5초 이내 ${timing.counts[0].count}건`,.72,7.47,4.65,.25,12,{bold:true,color:C.teal});txt(s,'약 표현·하한 포함. 차내 수동전환 확인이 분모.',.72,7.85,4.65,.18,9.5,{color:C.muted});
     section(s,'03','제어 방식별 사고 심각도',5.9,4.42,5.15);const g=byId.get('state-severity');g.groups.forEach((r,i)=>{const y=4.99+i*.55;txt(s,`${r.label} · ${fmt(r.total)}건`,5.95,y,5,.19,10.5,{bold:true});stack(s,r.items,r.total,5.95,y+.21,5,.16);const high=r.items.filter(x=>['serious','fatal'].includes(x.key)).reduce((n,x)=>n+x.count,0);txt(s,`중상·사망 ${high}건 · ${r.total?pct(high,r.total)+'%':'해당 자료 없음'}`,5.95,y+.38,5,.14,8.5,{color:C.muted});});txt(s,'부상 보고 없음 / 경상 / 중등도 / 중상 / 사망 / 불명',5.95,7.81,5,.19,8.5,{color:C.muted});txt(s,'각 상태 내 구성비 · 원격은 운전·기어 조작 포함',5.95,8.07,5,.18,8.5,{color:C.muted});
     {const i=insightSummary(model,filter,'status');insights(s,i.title,i.items,i.note);}notes(s,figures.filter(f=>f.tab===tab));
   }else if(tab==='vru'){
     if(!a.vru.length){empty(s);notes(s,[]);return;}
     section(s,'01','취약도로이용자 유형별 구성',.55,1.47,10.5);bar(s,byId.get('vru-types'),.55,1.97,10.5,1.92,14);
     const high=a.vru.filter(r=>['serious','fatal'].includes(r.severity)).length;rect(s,.6,4.03,10.4,.37,'FFF4E4');txt(s,`중상·사망 ${high}건 (${pct(high,a.vru.length)}%) · 피해 인원이 아닌 차량별 사고보고`,.74,4.11,10.0,.22,12,{color:'996328'});
     section(s,'02','ADS 행동·발생환경',.55,4.62,5.1);table(s,byId.get('vru-movement'),.55,5.16,5.1,1.38,9.3);table(s,byId.get('vru-environment'),.55,6.85,5.1,1.12,10.5);txt(s,'주간 06:00–17:59 / 야간 18:00–05:59',.6,8.08,5,.2,9.5,{color:C.muted});
     section(s,'03','접촉부위·피해수준',5.95,4.62,5.1);bar(s,byId.get('vru-contact'),5.9,5.13,5.2,1.88,10.5);txt(s,'복수 접촉부위 가능. 합계가 사고 건수보다 클 수 있음.',5.98,7.09,5,.22,9.5,{color:C.muted});stack(s,byId.get('vru-severity').items,a.vru.length,5.98,7.51,5,.32);txt(s,byId.get('vru-severity').items.filter(x=>x.count).map(x=>`${x.label} ${x.count}`).join(' / '),5.98,7.94,5,.27,9,{color:C.muted});
     {const i=insightSummary(model,filter,'vru');insights(s,i.title,i.items,i.note);}notes(s,figures.filter(f=>f.tab===tab));
   }else if(tab==='contribution'){
     const cs=contributionSummary(rows,filter),ii=contributionInsights(rows,filter);section(s,'01',cs.label+' · 상황 유형',.55,1.47,10.5);bar(s,{...byId.get('contribution-types'),items:compactContributionItems(cs.types)},.55,2,10.5,2.45,13);section(s,'02','최고 피해수준',.55,4.85,5.1);bar(s,byId.get('contribution-severity'),.55,5.4,5.1,2.6,11);section(s,'03','신고된 사고 상대',6,4.85,5.1);bar(s,{...byId.get('contribution-counterparts'),items:compactContributionItems(cs.counterparts,4)},6,5.4,5.1,2.6,10);txt(s,`${cs.label} ${cs.n}건 · 우선 ${cs.priority.length} / 확장 ${cs.broad.length}`,6.1,8.05,5,.25,10,{color:C.muted});insights(s,ii.title,ii.items,ii.note);notes(s,figures.filter(f=>f.tab===tab));
   }else {
     section(s,'01','사고 신고 추이',.55,1.47,10.5);bar(s,byId.get('domestic-years'),.55,1.99,8.2,2.5,16);txt(s,'누적',9.05,2.45,1.75,.35,16,{color:C.muted,align:'center'});txt(s,'112건',8.87,2.95,2.1,.75,42,{bold:true,align:'center'});txt(s,'2022 ~ 2025.9',8.9,3.85,2.1,.3,12,{color:C.muted,align:'center'});txt(s,'2025년은 1–9월 집계. 전년도 연간 건수와 직접 비교 시 기간 차이에 유의.',.65,4.55,10.1,.35,12,{color:C.muted});
     section(s,'02','자율주행모드 사고',.55,5.02,5.0);section(s,'03','사고 발생 속도',5.93,5.02,5.12);txt(s,'약 35%',.75,5.88,4.55,.7,44,{bold:true,color:C.teal,align:'center'});txt(s,'전체 신고 사고 중\n자율주행모드 운행 중 사고 비중',.85,6.8,4.4,.65,17,{align:'center'});txt(s,'30 km/h 이하',6.05,5.88,4.75,.75,32,{bold:true,color:C.teal,align:'center'});txt(s,'사고가 주로 발생한\n저속 구간에 대한 공식 발표 요약',6.12,6.8,4.65,.65,17,{align:'center'});
     {const i=insightSummary(model,filter,'domestic');insights(s,i.title,i.items,i.note);}notes(s,figures.filter(f=>f.tab===tab),model.pkg.domestic.sourceUrl);
   }
 }
 function figurePage(f,index) {
   const s=base(f.title,f.tab==='domestic'?'국내 공식 발표자료':'선택한 분석대상에서 계산한 개별 그림',index,f.denominator!=null?`분모 ${fmt(f.denominator)}건`:'',f.tab==='domestic');
   rect(s,.65,1.48,14.7,.61,'EAF5F2');txt(s,f.insight||'',.8,1.58,14.35,.43,12.5,{color:C.teal});
   if(f.kind==='bar')bar(s,f,.65,2.24,14.7,5.37,f.items.length>9?14:19);
   else if(f.kind==='table')table(s,f,.65,2.3,14.7,Math.min(4.9,Math.max(2.4,(f.rows.length+1)*.55)),f.dense?14:18);
   else if(f.kind==='grouped'){f.groups.forEach((g,i)=>{const dense=f.groups.length>4,gap=dense?1.06:f.groups.length>3?1.28:1.55,y=2.25+i*gap;txt(s,`${g.label} · ${fmt(g.total)}건`,.8,y,14,dense?.32:.45,dense?18:22,{bold:true});stack(s,g.items,g.total,.8,y+(dense?.39:.6),14.2,dense?.3:.5);txt(s,g.total?g.items.filter(x=>x.count).map(x=>`${x.label} ${x.count}건 (${pct(x.count,g.total)}%)`).join(' / '):'선택 범위에 해당 자료 없음',.85,y+(dense?.74:1.05),14.1,.23,11,{color:C.muted});});}
   else if(f.kind==='scenario'){
    const sc=SCENARIO_SCHEMES[f.code],X=v=>1.8+v/800*12.4,Y=v=>2.3+v/340*5.27;rect(s,1.8,2.3,12.4,5.27,C.wash);rect(s,X(250),Y(0),250/800*12.4,285/340*5.27,'E0E9ED');line(s,X(375),Y(0),X(375),Y(285),'FFFFFF',2,{dash:'dash'});
    [[sc.sv,C.teal,'보고차'],[sc.cp,C.grey,'상대차']].forEach(([p,color,label])=>{s.addShape(S.roundRect,{x:X(p[0]-29),y:Y(p[1]-43),w:58/800*12.4,h:86/340*5.27,rotate:p[2],fill:{color},line:{color}});txt(s,label,X(p[0]-45),Y(p[1]-10),90/800*12.4,24/340*5.27,15,{color:C.white,bold:true,align:'center'});});
    sc.arrows.forEach(([x1,y1,x2,y2])=>line(s,X(x1),Y(y1),X(x2),Y(y2),C.amber,2.5,{endArrowType:'triangle'}));s.addShape(S.ellipse,{x:X(sc.hit[0]-9),y:Y(sc.hit[1]-9),w:18/800*12.4,h:18/340*5.27,fill:{color:C.amber},line:{color:C.white,width:1.5}});txt(s,sc.caption,X(20),Y(300),760/800*12.4,30/340*5.27,20,{align:'center'});txt(s,`대조 확인 ${f.count}건 (${pct(f.count,f.denominator)}%)`,1,7.55,14,.35,18,{align:'center',bold:true,color:C.teal});}

   else if(f.kind==='stat'){txt(s,f.value,1,2.1,14,1.5,66,{bold:true,color:C.teal,align:'center'});txt(s,f.description,2,4.1,12,1.3,29,{align:'center'});}
   else if(f.kind==='case'){nativeScene(s,f.record,.8,2.55,6.4,4.5);txt(s,`${f.record.company} · ${f.record.month} · 보고 ${f.record.id}`,7.5,1.95,7.4,.55,18,{bold:true});txt(s,'사고 상황',7.5,2.83,7.2,.4,22,{bold:true,color:C.blue});txt(s,f.case.summary,7.5,3.45,7.2,1.65,f.case.summary.length>110?18:21);txt(s,'확인할 점',7.5,5.35,7.2,.4,21,{bold:true,color:C.blue});txt(s,f.case.caution,7.5,5.95,7.2,1.25,18,{color:C.muted});}
   txt(s,f.note||'',.8,7.88,14.4,.52,f.id==='state-severity'?10.5:12,{color:C.muted});notes(s,[f]);
 }
 const scope=options.scope||'pages';
 if(scope==='figures'||scope==='cases'){const pool=scope==='cases'?figures.filter(f=>f.kind==='case'):figures;const chosen=options.figureId?pool.filter(f=>f.id===options.figureId):options.tab?pool.filter(f=>f.tab===options.tab):pool;if(!chosen.length)throw new Error('내보낼 그림이 없습니다.');chosen.forEach((f,i)=>figurePage(f,i+1));}
 else {const selectedTabs=options.tab?[options.tab]:tabs;if(selectedTabs.some(t=>!tabs.includes(t)))throw new Error('분석 페이지에서 PPTX를 저장해 주세요.');selectedTabs.forEach((t,i)=>mainPage(t,i+1));}
 return pptx;
}
