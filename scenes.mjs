/* Editable scenario geometry. Coordinates describe the drawing, never GPS. */
import {value,COUNTERPART} from './analysis.mjs?v=20261124.10';
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
 const base=CASE_SCENES[r.id]||{layout:r.roadway==='Intersection'?'intersection':'street',ads:[480,170,0],cp:[340,285,0],paths:[],hits:[],context:'진로가 충분히 공개되지 않아 상대 배치만 표시 · 원문으로 보완'};
 const labels={'30270-16196':['SUV','보행자'],'30270-16028':['상대 승용차','보행자'],'30270-15830':['유턴 차량','자전거'],'30412-6395':['선행 충격 차량','보행자'],'30270-6579':['상대 승용차','관련 대상'],'30270-15896':['SUV','시설물'],'30270-9724':['SUV','대기 차량'],'30270-8968':['중앙선 침범차','SUV'],'30270-11713':['이륜차','승용차']};const names=labels[r.id];const scene={...base,...(names?{cpLabel:names[0],thirdLabel:names[1]}:{}),...override};
 if(!['street','intersection','parking'].includes(scene.layout))scene.layout=base.layout;
 const pos=(p,def)=>Array.isArray(p)&&p.length===3&&p.every(x=>Number.isFinite(+x))?[Math.max(50,Math.min(750,+p[0])),Math.max(60,Math.min(380,+p[1])),+p[2]%360]:def;
 scene.ads=pos(scene.ads,base.ads);scene.cp=pos(scene.cp,base.cp);scene.third=scene.third?pos(scene.third,base.third||[300,300,0]):null;
 scene.cpLabel=scene.cpLabel||COUNTERPART[r.counterpart]||r.counterpart||'상대';
 scene.basis=Object.keys(override).length?'편집된 개략도 · 실측 아님':'보고 경위 기반 배치 · 방향·간격은 실측 아님';
 return scene;
}
export function sceneSVG(r,override={}){
 const s=sceneFor(r,override),l=locationInfo(r,override);
 const line=(a,b,c,d,col='#fff',width=3,dash='')=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${col}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const actor=(p,label,color)=>{const [x,y,angle]=p;if(/보행자|자전거|이륜차|시설물|관련 대상/.test(label))return `<circle cx="${x}" cy="${y}" r="30" fill="white" stroke="${color}" stroke-width="4"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="14" font-weight="700" fill="${color}">${esc(label)}</text>`;return `<g transform="translate(${x} ${y}) rotate(${angle})"><rect x="-28" y="-48" width="56" height="96" rx="13" fill="${color}"/><rect x="-21" y="-33" width="42" height="20" rx="5" fill="#d8e7ed"/><rect x="-21" y="26" width="42" height="12" rx="4" fill="#bcced5"/></g><rect x="${x-62}" y="${y-13}" width="124" height="26" rx="8" fill="white" opacity=".95"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="700" fill="${color}">${esc(label)}</text>`;};
 const road=s.layout==='intersection'?`<rect x="235" y="25" width="330" height="365" fill="#dce5e9"/><rect x="70" y="160" width="660" height="155" fill="#dce5e9"/>${line(400,25,400,154,'#bdac65',4)}${line(400,320,400,390,'#bdac65',4)}${line(70,238,228,238,'#bdac65',4)}${line(570,238,730,238,'#bdac65',4)}`:`<rect x="235" y="25" width="330" height="365" fill="#dce5e9"/>${line(400,25,400,390,'#bdac65',4)}${line(245,25,245,390)}${line(555,25,555,390)}${s.layout==='parking'?'<rect x="565" y="80" width="150" height="110" fill="none" stroke="#8fa4ae" stroke-width="3"/>':''}`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="${esc(s.context)}"><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#c8863c"/></marker></defs><rect width="800" height="450" fill="#f4f7f9"/>${road}${s.paths.map(p=>`<path d="M${p[0]} ${p[1]} L${p[2]} ${p[3]}" stroke="#c8863c" fill="none" stroke-width="4" marker-end="url(#arrow)"/>`).join('')}${actor(s.ads,'ADS','#147e79')}${actor(s.cp,s.cpLabel,'#607886')}${s.third?actor(s.third,s.thirdLabel||'관련 대상','#8899a2'):''}${s.hits.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="13" fill="#d0893b" stroke="white" stroke-width="3"/><text x="${p[0]}" y="${p[1]+5}" text-anchor="middle" font-size="15" font-weight="bold" fill="white">${i+1}</text>`).join('')}<text x="20" y="420" font-size="16" fill="#244959">${esc(s.context)}</text><text x="20" y="443" font-size="13" fill="#68818b">${esc(s.basis)} | ${esc(l.city+' '+l.state)} · ${esc(l.level)}</text></svg>`;
}
export const caseSceneIds=Object.keys(CASE_SCENES);
