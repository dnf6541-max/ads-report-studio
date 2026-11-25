/* Shared 800 x 450 scene primitives for SVG and editable PowerPoint.
 * Geometry is explanatory, not a reconstruction of measured positions. */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const settingLabels={parking:'주차장·출입구',intersection:'교차로 구간',road:'도로 구간',unknown:'도로 형태 미확인'};
const motionLabels={straight:'직진',left:'좌회전',right:'우회전',reverse:'후진',stopped:'정지',curve:'곡선 주행',unknown:'진행 방향 미확인'};
function wrap(text,max=24){const out=[];for(const line of String(text||'').split('\n')){let s=line;while([...s].length>max){let part=[...s].slice(0,max).join('');const pos=part.lastIndexOf(' ');if(pos>max*.55)part=part.slice(0,pos);out.push(part);s=s.slice(part.length).trim();}out.push(s);}return out.join('\n');}
export function reconstructionPrimitives(scene){
 const p=[],color={ink:'#193d50',ads:'#147e79',target:'#607886',hit:'#d0893b',muted:'#637d8b'},add=(type,o)=>p.push({type,...o});
 const rect=(x,y,w,h,fill,stroke=fill)=>add('rect',{x,y,w,h,fill,stroke});
 const line=(x,y,x2,y2,stroke,width=3)=>add('line',{x,y,x2,y2,stroke,width});
 const ellipse=(x,y,w,h,fill,stroke=fill)=>add('ellipse',{x,y,w,h,fill,stroke});
 const text=(t,x,y,w,h,fontSize=16,fill=color.ink,bold=false,align='left')=>add('text',{text:t,x,y,w,h,fontSize,fill,bold,align});
 const arrow=(points)=>{for(let i=1;i<points.length;i++)line(...points[i-1],...points[i],color.hit,4);const a=points.at(-2),b=points.at(-1),t=Math.atan2(b[1]-a[1],b[0]-a[0]);for(const k of [-.55,.55])line(b[0],b[1],b[0]-13*Math.cos(t+k),b[1]-13*Math.sin(t+k),color.hit,4);};
 const vehicle=(x,y,vertical=false,fill=color.ads,label='ADS',reverse=false)=>{rect(x-(vertical?27:48),y-(vertical?48:27),vertical?54:96,vertical?96:54,fill);if(vertical){rect(x-20,y+(reverse?24:-35),40,12,'#d8e7ed');}else rect(x+(reverse?-35:24),y-20,12,40,'#d8e7ed');text(label,x-42,y-11,84,24,16,'#ffffff',true,'center');};
 rect(0,0,800,450,'#f4f7f9');
 text(settingLabels[scene.setting]||settingLabels.unknown,22,15,330,25,18,color.ink,true);
 text('원문 기반 상황도 · 위치·간격은 설명용',360,18,418,22,13,color.muted,false,'right');
 rect(26,70,748,223,'#e3eaee');
 // No lane counts, traffic signs or signal state inferred from generic backdrop.
 if(scene.setting==='parking'){rect(26,70,748,33,'#d3dfe3');text('주차장 통행 공간 · 구획 배치는 미확인',44,77,710,21,13,color.muted);}
 else if(scene.setting==='intersection'){rect(327,54,145,251,'#e3eaee');text('교차 구간 · 차로 수·신호 상태는 미확인',44,77,710,21,13,color.muted);}
 else text(scene.setting==='unknown'?'공간 관계만 표시 · 실제 도로 모양 미확인':'주행 공간 · 차로 수·폭은 미확인',44,77,710,21,13,color.muted);
 let adsX=225,adsY=193,tx=537,ty=193,vertical=false,known=scene.relation!=='unknown';
 if(scene.motion==='left'){adsX=390;adsY=200;vertical=true;if(known){tx=390;ty=133;}}
 if(scene.motion==='right'){adsX=390;adsY=171;vertical=true;if(known){tx=390;ty=237;}}
 if(scene.motion==='reverse'){adsX=520;tx=300;}
 if(scene.relation==='left'){if(scene.motion==='left'){tx=adsX-130;ty=adsY;}else if(scene.motion==='right'){tx=adsX+130;ty=adsY;}else{tx=450;ty=143;}}
 if(scene.relation==='right'){if(scene.motion==='left'){tx=adsX+130;ty=adsY;}else if(scene.motion==='right'){tx=adsX-130;ty=adsY;}else{tx=450;ty=239;}}
 if(scene.relation==='behind'&&scene.motion!=='reverse'){adsX=525;tx=265;}
 if(scene.relation==='under'){adsX=315;adsY=193;tx=425;ty=193;}
 if(scene.relation==='above'){adsX=350;tx=455;ty=126;}
 if(!known){tx=657;ty=190;rect(559,113,201,165,'#f5f8f9','#beced6');text('相대 위치 미확인'.replace('相','상'),569,121,181,23,13,color.muted,false,'center');}
 if(scene.motion==='straight')arrow(scene.relation==='behind'?[[450,193],[480,193]]:[[90,adsY],[adsX-62,adsY]]);
 else if(scene.motion==='reverse')arrow([[460,adsY],[350,adsY]]);
 else if(scene.motion==='left')arrow([[180,239],[310,239],[347,207],[347,143]]);
 else if(scene.motion==='right')arrow([[180,139],[310,139],[347,174],[347,240]]);
 else if(scene.motion==='curve')arrow([[95,237],[140,218],[178,193]]);
 if(scene.motion==='straight'&&['ahead','under'].includes(scene.relation)&&tx-adsX>110)arrow([[adsX+55,adsY],[tx-60,adsY]]);
 vehicle(adsX,adsY,vertical,color.ads,'ADS',scene.motion==='right');
 text(motionLabels[scene.motion]||motionLabels.unknown,scene.relation==='under'?70:adsX-85,scene.relation==='under'?250:adsY+(vertical?53:35),170,23,14,color.ads,true,'center');
 const kind=scene.targetKind,label=scene.targetLabel||'접촉 대상';
 if(kind==='pothole'){ellipse(tx-54,ty-22,108,44,'#a6bbc2','#637d8b');ellipse(tx-43,ty-15,86,30,scene.waterFilled?'#6bb8cb':'#687b83');if(scene.waterFilled)line(tx-24,ty-2,tx+20,ty-2,'#d4eff4',2);}
 else if(kind==='vehicle'){rect(tx-45,ty-27,90,54,'#ffffff',color.target);text('상대 차량',tx-43,ty-20,86,22,15,color.target,true,'center');text('방향 미확인',tx-43,ty+3,86,20,11,color.muted,false,'center');}
 else if(kind==='curb'){rect(tx-12,ty-30,24,60,'#9dabb2');line(tx-8,ty-24,tx-8,ty+25,'#eaf1f5',3);}
 else if(kind==='barrier'){rect(tx-60,ty-12,120,16,'#a6b7bf');rect(tx-56,ty-24,9,57,color.target);rect(tx+47,ty-24,9,57,color.target);}
 else if(kind==='wheel'){ellipse(tx-23,ty-23,46,46,'#52636c');ellipse(tx-12,ty-12,24,24,'#b9c9d0');}
 else {rect(tx-48,ty-23,96,46,'#ffffff',color.target);text(({animal:'동물',pedestrian:'보행자',bicycle:'자전거',object:'접촉 대상'})[kind]||'접촉 대상',tx-46,ty-10,92,23,15,color.target,true,'center');}
 text(wrap(label,17),tx-110,ty+31,220,47,14,color.target,true,'center');
 // The recorded side is stated as text, never assigned an invented crash coordinate.
 text('배치 기준: '+({ahead:'ADS 진행 방향 앞',left:'ADS 왼쪽',right:'ADS 오른쪽',behind:'ADS 뒤쪽',under:'하부 접촉 관계',above:'상부 접촉 관계',crossing:'진로 교차',unknown:'상대 위치 미확인'}[scene.relation]||'관계 미확인'),30,298,740,23,13,color.muted);
 (scene.stages||[]).slice(0,3).forEach((t,i)=>{const x=26+i*254;rect(x,330,240,63,'#ffffff','#d4e0e5');text(String(i+1),x+9,341,22,26,19,color.ads,true);text(wrap(t,16),x+37,340,195,46,15,color.ink);});
 text(wrap(scene.caption,56),26,401,748,40,14,color.ink);
 return p;
}
export function reconstructionSVG(scene){const primitives=reconstructionPrimitives(scene);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="${esc(scene.caption)}">${primitives.map(p=>{if(p.type==='line')return `<line x1="${p.x}" y1="${p.y}" x2="${p.x2}" y2="${p.y2}" stroke="${p.stroke}" stroke-width="${p.width}"/>`;if(p.type==='text'){const anchor=p.align==='center'?'middle':p.align==='right'?'end':'start',x=p.align==='center'?p.x+p.w/2:p.align==='right'?p.x+p.w:p.x;return `<text x="${x}" y="${p.y+p.fontSize}" fill="${p.fill}" font-size="${p.fontSize}" font-family="Arial, Noto Sans CJK KR, sans-serif" font-weight="${p.bold?'700':'400'}" text-anchor="${anchor}">${String(p.text).split('\n').map((t,i)=>`<tspan x="${x}" dy="${i?p.fontSize*1.25:0}">${esc(t)}</tspan>`).join('')}</text>`;}return p.type==='ellipse'?`<ellipse cx="${p.x+p.w/2}" cy="${p.y+p.h/2}" rx="${p.w/2}" ry="${p.h/2}" fill="${p.fill}" stroke="${p.stroke}"/>`:`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="3" fill="${p.fill}" stroke="${p.stroke}"/>`;}).join('')}</svg>`;}
