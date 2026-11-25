import legacySceneSources from './scene-source-data.mjs?v=20261125.25';
import {caseAnalysis,sourceFingerprint} from './case-analysis.mjs?v=20261125.25';
import {reconstructionSVG} from './reconstruction-diagram.mjs?v=20261125.25';
import {contactScene,contactDiagramSVG} from './contact-diagram.mjs?v=20261125.25';
/* Editable scenario geometry. Coordinates describe the drawing, never GPS. */
import {value,COUNTERPART} from './analysis.mjs?v=20261125.25';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const redacted=s=>!s||/\[|unknown|redact|personally|^n\/?a$/i.test(s);
export function locationInfo(r,override={}){
 const raw=r.raw||{},lat=value(raw,'Latitude'),lon=value(raw,'Longitude'),address=value(raw,'Address');
 const valid=(a,b)=>a!==''&&b!==''&&Number.isFinite(+a)&&Number.isFinite(+b)&&Math.abs(+a)<=90&&Math.abs(+b)<=180;
 const manual=valid(override.latitude??'',override.longitude??'')&&/^https:\/\//.test(override.locationSource||'');
 const exact=!redacted(lat)&&!redacted(lon)&&valid(lat,lon)&&value(raw,'Latitude - Unknown')!=='Y'&&value(raw,'Longitude - Unknown')!=='Y';
 return {city:value(raw,'City'),state:value(raw,'State'),address:redacted(address)?'':address,latitude:manual?String(override.latitude):exact?lat:'',longitude:manual?String(override.longitude):exact?lon:'',level:manual?'사용자가 출처와 함께 확인한 위치':exact?'SGO 신고 좌표':!redacted(address)?'SGO 신고 주소':'도시만 공개 · 정확한 지점 미확인',source:manual?override.locationSource:'NHTSA SGO 제공 CSV',exact:manual||exact};
}
const CASE_SCENES={
 '30413-13249':{layout:'parking',ads:[508,245,0],cp:[602,205,0],cpLabel:'옹벽',objects:[{x:555,y:45,w:20,h:330,label:'우측 옹벽'},{x:255,y:65,w:70,h:95,label:'주차차량'},{x:255,y:215,w:70,h:95,label:'주차차량'}],paths:[[508,365,508,295],[508,185,508,105]],hits:[[538,225]],context:'주차 차량과 옹벽 사이 통과 중 우측 옹벽에 접근·접촉'},
 '30270-11003':{layout:'street',ads:[480,240,0],cp:[350,160,0],cpLabel:'분리 바퀴',third:[480,340,0],thirdLabel:'노면 접촉',paths:[[445,205,375,175],[480,145,480,95]],hits:[[480,255]],context:'좌전륜 분리 → ADS 차체 하부가 노면에 접촉'},
 '30413-9958':{layout:'sequence',ads:[480,170,0],cp:[340,285,0],paths:[],hits:[],sequence:[{title:'주차장 출구',note:'첫 번째 연석 접촉',kind:'curb'},{title:'본도로 진입',note:'추가 연석·타이어 접촉',kind:'curb'},{title:'이후 수동운행',note:'우후륜 타이어 손상·파손',kind:'tire'}],context:'지도 파일 불일치 → 연석 반복 접촉 → 수동운행 중 타이어 파손'},
 '30270-9806':{layout:'street',ads:[480,180,0],cp:[402,265,0],cpLabel:'분리 바퀴',third:[285,265,0],thirdLabel:'주차 승용차',objects:[{x:250,y:335,w:95,h:35,label:'주차 이륜차'}],paths:[[445,215,405,250],[380,265,323,265],[395,290,325,345]],hits:[[325,265],[325,345]],context:'좌후륜 분리 → 떨어진 바퀴가 주차 승용차·이륜차에 접촉'},
 '30690-4793':{layout:'street',ads:[520,245,0],cp:[650,170,0],cpLabel:'우측 연석',objects:[{x:555,y:45,w:18,h:330,label:'우측 연석'}],paths:[[480,360,515,295]],hits:[[548,205]],context:'지도 통신·조향 보정 문제 보고 · ADS 우측 앞부분과 연석 접촉'},
 '30412-6144':{layout:'intersection',ads:[520,270,270],cp:[400,110,180],paths:[[650,270,560,270],[400,35,400,200]],hits:[[440,270]],context:'교차로 직진 ADS와 교차 진입 소방차'},
 '30270-15547':{layout:'street',ads:[470,155,0],cp:[465,310,0],paths:[[465,390,465,210]],hits:[[470,212]],context:'신호 대기 ADS 뒤로 SUV 접근'},
 '30412-2588':{layout:'street',ads:[470,165,0],cp:[470,315,0],paths:[[470,390,470,215]],hits:[[470,222]],context:'ADS 제동 뒤, 뒤따르던 자전거 후부 접촉'},
 '30270-11713':{layout:'street',ads:[485,140,0],cp:[480,285,0],third:[325,285,0],paths:[[480,385,480,205],[455,250,362,270]],hits:[[480,205],[365,270]],context:'① 이륜차 후부 접촉 → ② 낙차 후 옆 차로 승용차 충격'},
 '30270-16196':{layout:'street',ads:[480,155,0],cp:[320,230,180],third:[415,280,0],paths:[[320,65,320,190],[350,250,450,215]],hits:[[340,245],[455,205]],context:'① 반대편 SUV가 보행자 충격 → ② 보행자가 ADS 좌후부 접촉'},
 '30270-16028':{layout:'street',ads:[480,310,0],cp:[320,120,180],third:[350,215,0],paths:[[320,55,320,180],[345,220,455,260]],hits:[[330,210],[470,253]],context:'① 상대차가 보행자 충격 → ② 중앙선 넘어 ADS 전면 접촉'},
 '30270-15830':{layout:'intersection',ads:[530,270,270],cp:[350,145,180],third:[420,245,0],paths:[[350,70,350,210],[390,235,470,270]],hits:[[370,225],[475,270]],context:'① 유턴 상대차가 자전거 충격 → ② 자전거가 정지 ADS 접촉'},
 '30412-6395':{layout:'intersection',ads:[490,275,270],cp:[300,215,270],third:[385,275,0],paths:[[220,215,345,215],[360,245,440,275],[490,275,570,275]],hits:[[365,225],[440,275]],context:'① 다른 차량의 보행자 충격 → ② ADS 접촉 → ③ 사고 후 이동'},
 '30270-6579':{layout:'intersection',ads:[520,270,270],cp:[400,100,180],third:[290,335,0],paths:[[400,35,400,210],[380,285,300,330]],hits:[[440,270],[310,325]],context:'교차 진입 상대차 충돌 이후 다른 차량·보행자 관련 후속 접촉'},
 '30270-10112':{layout:'street',ads:[480,270,0],cp:[640,150,180],paths:[[640,60,640,205],[640,205,525,265]],hits:[[535,265]],context:'상대차가 도로 밖 시설 접촉 뒤 ADS 진행 경로로 복귀'},
 '30270-15896':{layout:'street',ads:[480,170,0],cp:[480,310,0],third:[610,240,0],paths:[[480,390,480,225],[510,215,600,240],[600,240,525,170]],hits:[[480,225],[600,240],[530,170]],context:'후부 접촉 → 상대 SUV의 시설물 접촉 → ADS와 재접촉'},
 '30270-9724':{layout:'street',ads:[480,140,0],cp:[480,300,0],third:[480,220,0],paths:[[480,390,480,350],[480,270,480,195]],hits:[[480,270],[480,195]],context:'뒤에서 접근한 SUV가 대기 차량들을 밀어 ADS까지 연쇄 접촉'},
 '30270-8968':{layout:'street',ads:[480,310,0],cp:[300,135,180],third:[480,185,0],paths:[[300,55,420,190],[480,230,480,255]],hits:[[445,190],[480,255]],context:'중앙선 침범 차량이 SUV 충격 → SUV가 신호 대기 ADS에 접촉'},
 '30270-7681':{layout:'street',ads:[480,160,0],cp:[445,310,0],paths:[[445,390,450,215],[440,205,380,140]],hits:[[450,210]],context:'뒤차가 ADS 좌후부 접촉 뒤 중앙분리대 쪽으로 이동'},
};
export function sceneFor(r,override={}){
 const analysis=caseAnalysis(r);const custom=legacySceneSources[r.id]===sourceFingerprint(r)?CASE_SCENES[r.id]:null;if(Object.keys(override).length&&override.narrativeVersion&&(String(override.narrativeVersion)!==String(r.narrativeVersion)||override.sourceFingerprint!==sourceFingerprint(r)))override={};const base=custom||(analysis?{...contactScene(r),layout:'reconstruction',reconstruction:analysis.scene,context:analysis.scene.caption}:contactScene(r));
 const labels={'30270-16196':['SUV','보행자'],'30270-16028':['상대 승용차','보행자'],'30270-15830':['유턴 차량','자전거'],'30412-6395':['선행 충격 차량','보행자'],'30270-6579':['상대 승용차','관련 대상'],'30270-15896':['SUV','시설물'],'30270-9724':['SUV','대기 차량'],'30270-8968':['중앙선 침범차','SUV'],'30270-11713':['이륜차','승용차']};const names=labels[r.id];const scene={...contactScene(r),...base,...(names?{cpLabel:names[0],thirdLabel:names[1]}:{}),...override};
 if(custom&&analysis&&scene.layout!=='sequence'&&!override.layout)scene.layout=({parking:'parking',intersection:'intersection',road:'street',unknown:'street'})[analysis.scene.setting];
 if(!['street','intersection','parking','sequence','contact','reconstruction'].includes(scene.layout)||scene.layout==='sequence'&&!base.sequence)scene.layout=base.layout;
 const pos=(p,def)=>Array.isArray(p)&&p.length===3&&p.every(x=>Number.isFinite(+x))?[Math.max(50,Math.min(750,+p[0])),Math.max(60,Math.min(380,+p[1])),+p[2]%360]:def;
 scene.ads=pos(scene.ads,base.ads);scene.cp=pos(scene.cp,base.cp);scene.third=scene.third?pos(scene.third,base.third||[300,300,0]):null;
 scene.cpLabel=scene.cpLabel||COUNTERPART[r.counterpart]||r.counterpart||'상대';
 scene.basis=Object.keys(override).length?'편집된 개략도 · 실측 아님':'보고 경위 기반 배치 · 방향·간격은 실측 아님';
 return scene;
}
export function sceneSVG(r,override={}){
 const s=sceneFor(r,override),l=locationInfo(r,override);
 if(s.layout==='reconstruction'&&s.reconstruction)return reconstructionSVG({...s.reconstruction,caption:s.context});
 if(s.layout==='contact')return contactDiagramSVG(r,s);
 if(s.layout==='sequence')return sequenceSVG(r,s,l);
 const line=(a,b,c,d,col='#fff',width=3,dash='')=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${col}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const actor=(p,label,color)=>{const [x,y,angle]=p;if(/보행자|자전거|이륜차|시설물|관련 대상|옹벽|연석|바퀴|노면/.test(label))return `<circle cx="${x}" cy="${y}" r="30" fill="white" stroke="${color}" stroke-width="4"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="14" font-weight="700" fill="${color}">${esc(label)}</text>`;return `<g transform="translate(${x} ${y}) rotate(${angle})"><rect x="-28" y="-48" width="56" height="96" rx="13" fill="${color}"/><rect x="-21" y="-33" width="42" height="20" rx="5" fill="#d8e7ed"/><rect x="-21" y="26" width="42" height="12" rx="4" fill="#bcced5"/></g><rect x="${x-62}" y="${y-13}" width="124" height="26" rx="8" fill="white" opacity=".95"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="700" fill="${color}">${esc(label)}</text>`;};
 const road=s.layout==='intersection'?`<rect x="235" y="25" width="330" height="365" fill="#dce5e9"/><rect x="70" y="160" width="660" height="155" fill="#dce5e9"/>`:`<rect x="235" y="25" width="330" height="365" fill="#dce5e9"/>${s.layout==='parking'?'<rect x="565" y="80" width="150" height="110" fill="none" stroke="#8fa4ae" stroke-width="3"/>':''}`;
 const arrows=s.paths.map(([a,b,c,d])=>{const t=Math.atan2(d-b,c-a),u=c-13*Math.cos(t),v=d-13*Math.sin(t),dx=6*Math.sin(t),dy=6*Math.cos(t);return `${line(a,b,c,d,'#c8863c',4)}<polygon points="${c},${d} ${u+dx},${v-dy} ${u-dx},${v+dy}" fill="#c8863c"/>`;}).join('');
 const objects=(s.objects||[]).map(o=>`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="5" fill="#adbcc5"/><text x="${o.x+o.w/2}" y="${o.y-8}" text-anchor="middle" font-size="14" fill="#526d7c">${esc(o.label)}</text>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="${esc(s.context)}"><rect width="800" height="450" fill="#f4f7f9"/>${road}${objects}${arrows}${actor(s.ads,'ADS','#147e79')}${actor(s.cp,s.cpLabel,'#607886')}${s.third?actor(s.third,s.thirdLabel||'관련 대상','#8899a2'):''}${s.hits.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="13" fill="#d0893b" stroke="white" stroke-width="3"/><text x="${p[0]}" y="${p[1]+5}" text-anchor="middle" font-size="15" font-weight="bold" fill="white">${i+1}</text>`).join('')}<text x="20" y="416" font-size="14" fill="#244959">${esc(s.context)}</text><text x="20" y="441" font-size="12" fill="#68818b">${esc(s.basis)} | ${esc(l.city+' '+l.state)} · ${esc(l.level)}</text></svg>`;
}
function sequenceSVG(r,s,l){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="${esc(s.context)}"><rect width="800" height="450" fill="#f4f7f9"/>${s.sequence.map((step,i)=>{const x=20+i*260;return `<g transform="translate(${x} 40)"><rect width="240" height="320" rx="10" fill="white" stroke="#cfdee4"/><text x="120" y="35" text-anchor="middle" font-size="19" font-weight="bold" fill="#244959">${i+1}. ${esc(step.title)}</text><rect x="25" y="65" width="190" height="180" fill="#dce5e9"/>${step.kind==='tire'?'':'<rect x="145" y="65" width="12" height="180" fill="#a9b8c0"/>'}<rect x="91" y="100" width="60" height="110" rx="12" fill="#147e79"/><rect x="98" y="114" width="46" height="20" rx="4" fill="#d8e7ed"/><text x="121" y="165" text-anchor="middle" font-size="18" fill="white">${step.kind==='tire'?'수동':'ADS'}</text><circle cx="151" cy="${step.kind==='tire'?196:115}" r="14" fill="#d0893b" stroke="white" stroke-width="3"/><text x="120" y="284" text-anchor="middle" font-size="16" fill="#244959">${esc(step.note)}</text></g>`;}).join('')}<text x="20" y="409" font-size="14" fill="#244959">${esc(s.context)}</text><text x="20" y="440" font-size="12" fill="#68818b">사고의 선후관계 개략도 · 회전 방향·위치·간격 미확정 | ${esc(l.city+' '+l.state)}</text></svg>`;}
export const caseSceneIds=Object.keys(CASE_SCENES);
