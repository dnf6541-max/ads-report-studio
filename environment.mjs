/* Preserve schema differences: a field absent from the form is not Unknown. */
import {value,countBy} from './analysis.mjs?v=20261125.24';
export const ENV_SOURCES={current:'https://static.nhtsa.gov/odi/ffdd/sgo-2021-01/SGO-2021-01_Data_Element_Definitions.pdf',archive:'https://static.nhtsa.gov/odi/ffdd/sgo-2021-01/Archive-2021-2025/SGO-2021-01_Data_Element_Definitions.pdf'};
export const ROAD={normal:'특이조건 없음',wet:'젖은 노면 신고',degraded:'노면 손상',marking:'차선 표시 손상·누락',work:'공사구간',traffic:'선행 교통사고·장애',other:'기타 도로조건',unknown:'미상 신고'};
const ROAD_FIELDS={normal:'Roadway-No Unusual Conditions',wet:'Roadway-Wet Surface Condition',degraded:'Roadway-Degraded Surface',marking:'Roadway-Missing/Degraded Marking',work:'Roadway-Work Zone',traffic:'Roadway-Traffic Incident',other:'Roadway-Other-See Narrative',unknown:'Roadway-Unknown'};
const ROAD_OLD={'No Unusual Conditions':'normal','Work Zone':'work','Traffic Incident':'traffic','Missing / Degraded Markings':'marking','Other, see Narrative':'other',Unknown:'unknown'};
export const WEATHER={clear:'맑음',cloudy:'흐림',partly:'부분 흐림',rain:'비',snow:'눈',fog:'안개·연무',wind:'강풍',dust:'모래폭풍',hurricane:'허리케인',indoor:'실내·지붕 아래',other:'기타 기상',unknown:'미상 신고'};
const WEATHER_FIELDS={clear:['Weather - Clear'],cloudy:['Weather - Cloudy'],partly:['Weather - Partly Cloudy'],rain:['Weather - Rain'],snow:['Weather - Snow'],fog:['Weather - Fog/Smoke','Weather - Fog/Smoke/Haze'],wind:['Weather - Severe Wind'],dust:['Weather - Dust Storm'],hurricane:['Weather - Severe Hurricane'],indoor:['Weather - Structure-Indoor'],other:['Weather - Other'],unknown:['Weather - Unknown','Weather - Unk - See Narrative']};
export const COVERAGE={reported:'기재값 있음',unknown:'미상으로 신고',blank:'열은 있으나 미기재',not_collected:'해당 양식에 열 없음'};
export const ROADWAY={Street:'일반도로',Intersection:'교차로','Parking Lot':'주차장','Highway / Freeway':'고속도로','Traffic Circle':'회전교차로','Parking Garage':'주차건물','Unpaved Road':'비포장도로','Rural Road':'지방도로',Unknown:'미상','':'미기재'};
export function placeKey(r){return !hasField(r,'Roadway Type')?'__absent':value(r.raw,'Roadway Type')||'__blank';}
export function placeStatus(r){const key=placeKey(r);return key==='__absent'?'not_collected':key==='__blank'?'blank':key==='Unknown'?'unknown':'reported';}
export function placeGroup(r){const key=placeKey(r);return key==='Intersection'?'intersection':placeStatus(r)==='reported'?'other_known':'unavailable';}
export function placeSummary(rows){
 const labels={...ROADWAY,Unknown:'미상으로 신고',__blank:'미기재',__absent:'양식에 항목 없음'};
 const counts=countBy(rows,placeKey).sort((a,b)=>b.count-a.count||a.key.localeCompare(b.key)).map(x=>({...x,label:labels[x.key]||x.key}));
 const major=['Street','Intersection','Parking Lot','Highway / Freeway'];
 const compact=countBy(rows,r=>placeStatus(r)==='reported'&&!major.includes(placeKey(r))?'other_known':placeKey(r),[...major,'other_known','Unknown','__blank','__absent']).map(x=>({...x,label:x.key==='other_known'?'기타 명시 장소':labels[x.key]||x.key}));
 const known=rows.filter(r=>placeStatus(r)==='reported').length;
 return {counts,compact:compact.filter(x=>x.count),known,unknown:rows.filter(r=>placeStatus(r)==='unknown').length,blank:rows.filter(r=>placeStatus(r)==='blank').length,absent:rows.filter(r=>placeStatus(r)==='not_collected').length};
}
export function placeAnnual(rows){return [...new Set(rows.map(r=>r.month.slice(0,4)))].sort().map(year=>{const rs=rows.filter(r=>r.month.startsWith(year)),p=placeSummary(rs),n=k=>p.compact.find(x=>x.key===k)?.count||0;return [year,rs.length,...['Street','Intersection','Parking Lot','Highway / Freeway','other_known','Unknown','__blank','__absent'].map(n)];});}
const isY=(r,k)=>value(r.raw,k)==='Y';
export function hasField(r,k){
 if(r.sourceFields?.length)return r.sourceFields.includes(k);
 if(r.schema==='current')return !['Lighting','Roadway Surface','Roadway Description'].includes(k);
 if(r.schema==='archive')return !k.startsWith('Roadway-')&&!['Weather - Partly Cloudy','Weather - Structure-Indoor','Weather - Dust Storm','Weather - Severe Hurricane','Weather - Fog/Smoke/Haze','Weather - Unk - See Narrative'].includes(k);
 return Object.hasOwn(r.raw||{},k);
}
export function weatherTags(r){return Object.entries(WEATHER_FIELDS).filter(([,fields])=>fields.some(k=>hasField(r,k)&&isY(r,k))).map(([k])=>k);}
export function roadTags(r){
 if(hasField(r,'Roadway Description')){const k=ROAD_OLD[value(r.raw,'Roadway Description')];return k?[k]:value(r.raw,'Roadway Description')?['other']:[];}
 return Object.entries(ROAD_FIELDS).filter(([,f])=>hasField(r,f)&&isY(r,f)).map(([k])=>k);
}
export function environmentEvidence(r){
 const selected=Object.keys(r.raw).filter(k=>/^(Roadway|Weather - |Lighting$|Incident Time)/.test(k));
 return selected.map(field=>({field,value:value(r.raw,field),inSchema:hasField(r,field)}));
}
export function coverage(r,metric){
 if(metric==='lighting'||metric==='surface'||metric==='place'){
  if(metric==='place')return placeStatus(r);
  const field={lighting:'Lighting',surface:'Roadway Surface'}[metric];
  if(!hasField(r,field))return 'not_collected';const v=value(r.raw,field);return !v?'blank':/^Unknown$/i.test(v)?'unknown':'reported';
 }
 const tags=metric==='weather'?weatherTags(r):roadTags(r);
 const has=metric==='weather'?Object.values(WEATHER_FIELDS).flat().some(f=>hasField(r,f)):hasField(r,'Roadway Description')||Object.values(ROAD_FIELDS).some(f=>hasField(r,f));
 if(!has)return 'not_collected';return tags.some(k=>k!=='unknown')?'reported':tags.includes('unknown')?'unknown':'blank';
}
const coverageCounts=(rows,key)=>countBy(rows,r=>coverage(r,key),Object.keys(COVERAGE)).map(x=>({...x,label:COVERAGE[x.key]}));
export function weatherPattern(r){const t=weatherTags(r).filter(k=>k!=='unknown');if(!t.length)return coverage(r,'weather')==='unknown'?'unknown':'blank';if(t.length===1&&t[0]==='clear')return 'clear';if(t.every(k=>['cloudy','partly'].includes(k)))return 'cloud';if(t.some(k=>['rain','snow'].includes(k)))return 'precip';return 'other';}
export function roadPattern(r){const t=roadTags(r).filter(k=>k!=='unknown');if(!t.length)return coverage(r,'road')==='unknown'?'unknown':'blank';if(t.length===1&&t[0]==='normal')return 'normal';return 'condition';}
export function environmentSummary(rows){
 const n=rows.length,current=rows.filter(r=>r.schema==='current'),archive=rows.filter(r=>r.schema==='archive');
 const weather=countBy([],()=>'',Object.keys(WEATHER)).map(x=>({...x,label:WEATHER[x.key],count:rows.filter(r=>weatherTags(r).includes(x.key)).length}));
 const road=countBy([],()=>'',Object.keys(ROAD)).map(x=>({...x,label:ROAD[x.key],count:rows.filter(r=>roadTags(r).includes(x.key)).length}));
 // Wet Surface is an old single choice and a new checkbox. Only positive reports are unified.
 const wet=rows.filter(r=>hasField(r,'Roadway Surface')?value(r.raw,'Roadway Surface')==='Wet':isY(r,'Roadway-Wet Surface Condition'));
 const wp={clear:'맑음만 신고',cloud:'흐림·부분흐림만',precip:'비·눈 포함',other:'그 외·복합 기상',unknown:'미상 신고',blank:'미기재'};
 const rp={normal:'특이조건 없음만',condition:'특이조건 신고',unknown:'미상 신고',blank:'미기재'};
 return {n,current,archive,weather,road,wet,weatherPattern:countBy(rows,weatherPattern,Object.keys(wp)).map(x=>({...x,label:wp[x.key]})),roadPattern:countBy(rows,roadPattern,Object.keys(rp)).map(x=>({...x,label:rp[x.key]})),
  coverage:Object.fromEntries(['place','weather','road','lighting','surface'].map(k=>[k,coverageCounts(rows,k)])),
  years:[...new Set(rows.map(r=>r.month.slice(0,4)))].sort().map(year=>{const rs=rows.filter(r=>r.month.startsWith(year));return {year,n:rs.length,current:rs.filter(r=>r.schema==='current').length,weather:rs.filter(r=>coverage(r,'weather')==='reported').length,lighting:rs.filter(r=>coverage(r,'lighting')==='reported').length,lightingNotCollected:rs.filter(r=>coverage(r,'lighting')==='not_collected').length,surface:rs.filter(r=>coverage(r,'surface')==='reported').length,surfaceNotCollected:rs.filter(r=>coverage(r,'surface')==='not_collected').length,roadUnknown:rs.filter(r=>coverage(r,'road')==='unknown').length,placeUnknown:rs.filter(r=>coverage(r,'place')!=='reported').length};})};
}
export function environmentAudit(model,rows=model.impact){
 const e=environmentSummary(rows),out=[];const check=(name,actual,expected)=>out.push({name,actual,expected,ok:actual===expected});
 for(const key of Object.keys(e.coverage))check(`${key} 기재·미상·미기재·양식 없음 합계`,e.coverage[key].reduce((n,x)=>n+x.count,0),rows.length);
 check('기상 단일 요약범주 합계',e.weatherPattern.reduce((n,x)=>n+x.count,0),rows.length);check('도로조건 단일 요약범주 합계',e.roadPattern.reduce((n,x)=>n+x.count,0),rows.length);
 const p=placeSummary(rows);check('장소 상세 유형 합계',p.counts.reduce((n,x)=>n+x.count,0),rows.length);check('장소 요약 유형 합계',p.compact.reduce((n,x)=>n+x.count,0),rows.length);check('장소 미상은 원자료 Unknown만 집계',p.unknown,rows.filter(r=>hasField(r,'Roadway Type')&&value(r.raw,'Roadway Type')==='Unknown').length);
 check('기상 복수 항목의 사고별 중복 방지',rows.filter(r=>new Set(weatherTags(r)).size===weatherTags(r).length).length,rows.length);
 if(model.baseline){const y=model.impact.filter(r=>r.month.startsWith('2026')),a=environmentSummary(y);check('2026 분석대상',y.length,916);check('2026 조명 열 없음',a.coverage.lighting.find(x=>x.key==='not_collected').count,916);check('2026 도로 유형 실제 미상',a.coverage.place.find(x=>x.key==='unknown').count,1);check('2026 젖은 노면 체크',a.wet.length,19);check('2026 비 신고',a.weather.find(x=>x.key==='rain').count,37);}
 return out;
}
