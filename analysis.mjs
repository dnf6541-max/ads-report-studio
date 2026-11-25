import {DOMESTIC} from './domestic-data.mjs?v=20261125.27';
import restorations from './review-restorations.mjs?v=20261125.27';
import {scenarioClassification,SCENARIO_PENDING_LABELS} from './scenario-review.mjs?v=20261125.27';
/* Deterministic SGO aggregation. Shared by the browser and Node verification. */
export const STATUS = {include:'사고 당시 ADS 운행 확인',non_ads:'사고 당시 수동·원격·해제 상태',insufficient:'사고 당시 상태 확인 부족',conflict:'운행상태 자료 불일치',outside:'ADS 시스템 분석 밖',pending:'재검토 필요'};
export const SEVERITY = {none:'부상 보고 없음',minor:'경상 (Minor)',moderate:'중등도 (Moderate)',serious:'중상 (Serious)',fatal:'사망 (Fatality)',unknown:'불명'};
export const SCENARIOS = {'01':'정지 중 후미추돌','02':'주행·감속 중 후미추돌','03':'상대차 후진','04':'상대차 통과·추월','05':'상대차 회전','06':'상대차 진로변경·합류','07':'반대차로 진입·역주행','08':'상대차 도로 진입','R':'그 외 자동차 사고'};
export const CAR = new Set(['Passenger Car','SUV','Pickup Truck','Heavy Truck','Van','Bus','First Responder Vehicle']);
export const VRU = new Map([['Non-Motorist: Pedestrian','보행자'],['Non-Motorist: Cyclist','자전거'],['Motorcycle','이륜차'],['Non-Motorist: Scooter - Skateboard','스쿠터·스케이트보드']]);
export const COUNTERPART = {'Passenger Car':'승용차','SUV':'SUV','Pickup Truck':'픽업트럭','Heavy Truck':'대형 화물차','Van':'밴','Bus':'버스','First Responder Vehicle':'긴급차량','Other, see Narrative':'기타 상대 (경위 참고)','Other Fixed Object':'기타 고정물','Pole / Tree':'기둥·나무','Non-Motorist: Cyclist':'자전거','Motorcycle':'이륜차','Animal':'동물','Non-Motorist: Pedestrian':'보행자','Non-Motorist: Other':'기타 비자동차 이용자','Non-Motorist: Scooter - Skateboard':'스쿠터·스케이트보드','Unknown':'불명'};
export const MOVEMENT = {'Stopped':'정지','Parked':'주차','Proceeding Straight':'직진','Making Left Turn':'좌회전','Making Right Turn':'우회전','Making U-Turn':'유턴','Changing Lanes':'차로변경','Merging':'합류','Passing':'통과·추월','Backing':'후진','Entering Traffic':'도로 진입','Crossing into Opposing Lane':'반대차로 진입','Traveling Wrong Way':'역주행','Parking Maneuver':'주차 조작','Lane / Road Departure':'차로·도로 이탈','Other, see Narrative':'기타 (경위 참고)','Unknown':'불명','NM Crossing Roadway':'도로 횡단','NM Moving Alongside Roadway':'도로 옆 이동','NM Moving on Sidewalk':'보도 이동','NM in Roadway - Other':'도로 내 기타','NM Waiting to Cross Roadway':'횡단 대기'};
export const DRIVER = {'None':'운전업무 담당자 없음','In-Vehicle (Commercial / Test)':'차내 담당자','Remote (Commercial / Test)':'원격 담당자','In-Vehicle and Remote (Commercial / Test)':'차내＋원격 담당자','Consumer':'소비자 운전자','Other, see Narrative':'기타','Unknown':'불명','':'미기재'};
export const LIGHTING = {'Daylight':'주광','Dawn / Dusk':'새벽·황혼','Dark - Lighted':'어두움·조명 있음','Dark - Not Lighted':'어두움·조명 없음','Dark - Unknown Lighting':'어두움·조명 불명','Other, see Narrative':'기타 조명'};
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
export const value = (r,k) => String(r?.[k] ?? '').trim();
export const pct = (n,d) => d ? (100*n/d).toFixed(1) : '—';
export function parseMonth(s) {
  const match = String(s||'').trim().toUpperCase().match(/^([A-Z]{3})-(\d{4})$/);
  if(match && MONTHS.includes(match[1])) return `${match[2]}-${String(MONTHS.indexOf(match[1])+1).padStart(2,'0')}`;
  const iso=String(s||'').match(/^(\d{4})[-/](\d{1,2})(?:[-/]\d{1,2})?$/);
  return iso && +iso[2]>=1 && +iso[2]<=12 ? `${iso[1]}-${iso[2].padStart(2,'0')}` : '';
}
export function dayNight(raw) {
  if(['Y','YES','TRUE','1'].includes(value(raw,'Incident Time - Unknown').toUpperCase())) return 'unknown';
  const m=value(raw,'Incident Time (24:00)').match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if(!m || +m[1]>23 || +m[2]>59) return 'unknown';
  const t=+m[1]*60 + +m[2]; return t>=360 && t<1080 ? 'day':'night';
}
export function severity(s) {
  s=String(s||'').trim();
  if(/^Fatality/.test(s)) return 'fatal';
  if(/^Serious/.test(s)) return 'serious';
  if(/^Moderate/.test(s)) return 'moderate';
  if(/^Minor/.test(s)) return 'minor';
  if(/^(No Injuries Reported|No Injured Reported|Property Damage\. No Injured Reported)$/.test(s)) return 'none';
  return 'unknown';
}
export function parseCSV(text) {
  text=String(text).replace(/^\uFEFF/,'');
  const records=[];let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++) {
    const c=text[i];
    if(c==='"') { if(quoted && text[i+1]==='"'){cell+='"';i++;} else if(quoted || cell==='') quoted=!quoted; else cell+=c; }
    else if(c===','&&!quoted){row.push(cell);cell='';}
    else if((c==='\n'||c==='\r')&&!quoted){ if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x!==''))records.push(row);row=[];cell=''; }
    else cell+=c;
  }
  if(quoted) throw new Error('따옴표가 닫히지 않은 CSV입니다. 원본 파일을 확인하세요.');
  if(cell!==''||row.length){row.push(cell);records.push(row);}
  if(!records.length)throw new Error('빈 CSV입니다.');
  const headers=records.shift();
  if(new Set(headers).size!==headers.length)throw new Error('중복된 열 이름이 있습니다.');
  const rows=records.map((r,i)=>{if(r.length!==headers.length)throw new Error(`${i+2}번째 CSV 레코드의 열 수가 다릅니다.`);return Object.fromEntries(headers.map((h,j)=>[h,r[j]]));});
  return {headers,rows};
}
export function selectFields(raw,fields) {
  return Object.fromEntries(fields.map(k=>[k,k==='Narrative'?String(raw[k]??'').replace(/\b[A-HJ-NPR-Z0-9]{17}\b/g,'[VIN 비식별]'):String(raw[k]??'')]));
}
export function canonical(raw){return JSON.stringify(Object.fromEntries(Object.keys(raw).sort().map(k=>[k,raw[k]])));}
export async function sha256(s){const b=typeof s==='string'?new TextEncoder().encode(s):s;const h=await crypto.subtle.digest('SHA-256',b);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('');}
const relation = raw => {const a=value(raw,'Same Incident ID'),b=value(raw,'Same Vehicle ID');return a&&b&&!/unknown|none|^n\/?a$/i.test(a+b)?`${a}|${b}`:'';};
export async function buildModel(pkg,sources=pkg.sources) {
  pkg={...pkg,domestic:DOMESTIC,reviews:pkg.reviews.map(g=>restorations.find(x=>x.id===g.id&&String(g.narrativeVersion)==='1'&&!g.userApproval)||g)};
  const latest=new Map(), versions=new Map(), rawSource=new Map(), sourceMeta=new Map(), duplicates=[];let rawCount=0,compliance=0;
  for(const s of sources)for(const raw of s.rows){
    rawCount++;
    if(value(raw,'Report Type')==='No New or Updated Incident Reports'){compliance++;continue;}
    const id=value(raw,'Report ID'),v=value(raw,'Report Version');
    if(!id || !/^\d+$/.test(v))throw new Error('보고번호 또는 버전이 없는 사고 기록이 있습니다.');
    const key=`${id}|${v}`,prev=versions.get(key);
    if(prev && canonical(prev)!==canonical(raw))duplicates.push(key);
    versions.set(key,raw);rawSource.set(key,s.name);sourceMeta.set(key,{era:s.era,headers:s.headers||[]});
    if(!latest.has(id)||+v>+latest.get(id)['Report Version']) latest.set(id,raw);
  }
  if(duplicates.length)throw new Error(`같은 보고번호·버전에 서로 다른 값이 있습니다 (${duplicates.slice(0,5).join(', ')}). 충돌을 해결한 뒤 불러오세요.`);
  const hashes=new Map(await Promise.all([...versions].map(async([k,r])=>[k,await sha256(canonical(r))])));
  const knownMembers=new Set(pkg.reviews.flatMap(g=>g.members));
  const newRows=[...latest].filter(([id])=>!knownMembers.has(id));
  const newRelations=new Set(newRows.map(([,r])=>relation(r)).filter(Boolean));
  const records=[],pending=[],covered=new Set(),invalidReviews=[];
  for(const g of pkg.reviews) {
    const reasons=[];
    for(const id of g.members){
      const r=latest.get(id);
      if(!r){reasons.push(`연결 보고 ${id} 없음`);continue;}
      covered.add(id);
      if(hashes.get(`${id}|${r['Report Version']}`)!==g.fingerprints[id])reasons.push(`${id} 값 또는 버전 변경`);
      if(newRelations.has(relation(r)))reasons.push('같은 사고·차량 식별자의 신규 보고 발견');
    }
    if(hashes.get(`${g.id}|${g.narrativeVersion}`)!==g.narrativeFingerprint)reasons.push('검수에 사용한 사고 경위 버전 변경 또는 누락');
    if(reasons.length){invalidReviews.push({id:g.id,reasons});for(const id of g.members){const raw=latest.get(id);if(raw)pending.push(normalize(raw,{...g,decision:'pending',reason:reasons.join('; ')},raw,rawSource,sourceMeta));}continue;}
    const raw=latest.get(g.id),evidence=versions.get(`${g.id}|${g.narrativeVersion}`);
    records.push(normalize(raw,g,evidence,rawSource,sourceMeta));
  }
  for(const [id,raw] of newRows){covered.add(id);pending.push(normalize(raw,{id,members:[id],decision:'pending',reason:'기존 검수표에 없는 신규 보고',narrativeVersion:raw['Report Version']},raw,rawSource,sourceMeta));}
  const ads=records.filter(r=>r.system==='ADS'),impact=ads.filter(r=>r.decision==='include');
  const model={pkg,sources,latest,versions,records,ads,impact,pending,invalidReviews,covered,rawCount,compliance,rawSource,sourceMeta};
  const baselineHashes=pkg.baselineHashes||Object.fromEntries(pkg.sources.map(s=>[s.era,s.sha256]));
  model.baseline=sources.length===Object.keys(baselineHashes).length && sources.every(s=>baselineHashes[s.era]===s.sha256) && pending.length===0;
  return model;
}
function normalize(raw,g,evidence,sourceNames,sourceMeta){
  const id=value(raw,'Report ID'),meta=sourceMeta?.get(`${id}|${raw['Report Version']}`);
  const r={id,raw,schema:meta?.era||'',sourceFields:meta?.headers||[],evidenceRaw:evidence,narrative:value(evidence,'Narrative'),members:g.members,
    version:value(raw,'Report Version'),narrativeVersion:String(g.narrativeVersion),autoReview:g.autoReview||null,
    source:sourceNames.get(`${id}|${raw['Report Version']}`),system:value(raw,'Automation System Engaged?').split(',')[0],
    decision:g.decision,reason:g.reason,method:g.method||'',scenarioLegacy:g.scenario||'',reviewRawFingerprint:g.fingerprints?.[id]||'',reviewNarrativeFingerprint:g.narrativeFingerprint||'',month:parseMonth(raw['Incident Date']),
    company:value(raw,'Reporting Entity'),counterpart:value(raw,'Crash With'),severity:severity(raw['Highest Injury Severity Alleged']),
    time:dayNight(raw),lighting:Object.hasOwn(LIGHTING,value(raw,'Lighting'))?value(raw,'Lighting'):'',
    roadway:value(raw,'Roadway Type'),driver:value(raw,'Driver / Operator Type')};
  r.scenarioReviewApplicable=CAR.has(r.counterpart);r.scenario=r.scenarioReviewApplicable?scenarioClassification(r):'';return r;
}
export function filtered(rows,{from='',to='',company=''}={}){return rows.filter(r=>(!from||r.month&&r.month>=from)&&(!to||r.month&&r.month<=to)&&(!company||r.company===company));}
export const ANALYSIS_BASES={reported:{label:'보고된 검수 대상',short:'검수 대상',description:'ADS 시스템으로 보고된 운행상태 비교 대상. 수동·원격·상태 확인 부족·자료 불일치 포함.',source:'ads'},confirmed:{label:'사고 당시 ADS 운행 확인',short:'ADS 운행 확인',description:'검수 대상 중 사고 당시 ADS 운행이 확인된 보고만 포함.',source:'impact'}};
export function analysisBasis(filter={}){const key=filter.basis??'reported';if(!Object.hasOwn(ANALYSIS_BASES,key))throw new Error('유효하지 않은 분석 기준입니다.');return {key,...ANALYSIS_BASES[key]};}
export function analysisRows(model,filter={}){return filtered(model[analysisBasis(filter).source],filter);}
export const scenarioKey=r=>Object.hasOwn({...SCENARIOS,...SCENARIO_PENDING_LABELS},r.scenario)?r.scenario:'U';
export const scenarioLabel=r=>CAR.has(r.counterpart)?(SCENARIOS[scenarioKey(r)]||SCENARIO_PENDING_LABELS[scenarioKey(r)]):'자동차 대표 유형 대상 밖';
export function countBy(rows,key,order=[]){const counts=new Map(order.map(k=>[k,0]));for(const r of rows){const k=typeof key==='function'?key(r):r[key];counts.set(k,(counts.get(k)||0)+1);}return [...counts].map(([key,count])=>({key,count}));}
export function counterpartGroup(r){
  const c=r.counterpart;
  if(['Passenger Car','SUV'].includes(c))return '승용차·SUV';
  if(['Pickup Truck','Heavy Truck','Van'].includes(c))return '화물차·밴';
  if(['Bus','First Responder Vehicle'].includes(c))return '버스·긴급차량';
  if(['Other Fixed Object','Pole / Tree'].includes(c))return '고정물';
  if(VRU.has(c))return '보행자·자전거·이륜차 등';
  if(c==='Animal')return '동물';
  if(c==='Non-Motorist: Other')return '기타 비자동차 이용자';
  return '기타·불명';
}
export function movementGroup(r){const m=value(r.raw,'SV Pre-Crash Movement');if(m==='Proceeding Straight')return '직진';if(['Making Right Turn','Making Left Turn','Making U-Turn'].includes(m))return '회전';if(['Changing Lanes','Merging'].includes(m))return '변경·합류';if(['Stopped','Parked'].includes(m))return '정지·주차';return '기타·불명';}
export function contactCounts(rows){const areas={전면:['Front Left','Front','Front Right'],측면:['Left','Right'],후면:['Rear Left','Rear','Rear Right'],상하부:['Top','Bottom']};const out=Object.entries(areas).map(([key,parts])=>({key,count:rows.filter(r=>parts.some(p=>value(r.raw,`SV Contact Area - ${p}`)==='Y')).length}));out.push({key:'미기재·불명',count:rows.filter(r=>!Object.values(areas).flat().some(p=>value(r.raw,`SV Contact Area - ${p}`)==='Y')).length});return out;}
export function aggregate(rows){
  const cars=rows.filter(r=>CAR.has(r.counterpart)),vru=rows.filter(r=>VRU.has(r.counterpart));
  const scenarios=countBy(cars,scenarioKey,[...Object.keys(SCENARIOS),...Object.keys(SCENARIO_PENDING_LABELS)]);
  return {n:rows.length,cars,vru,counterparts:countBy(rows,counterpartGroup).sort((a,b)=>b.count-a.count),
    scenarios:scenarios.map(x=>({...x,label:SCENARIOS[x.key]||SCENARIO_PENDING_LABELS[x.key]})),
    time:countBy(rows,'time',['day','night','unknown']),lighting:countBy(rows.filter(r=>r.lighting),'lighting'),
    severity:countBy(rows,'severity',Object.keys(SEVERITY)),roadway:countBy(rows,'roadway'),
    years:countBy(rows,r=>r.month.slice(0,4)).sort((a,b)=>a.key.localeCompare(b.key)),contact:contactCounts(rows)};
}
export function sample(rows,n=8,seed=20261124){let s=seed>>>0;const out=[...rows];for(let i=out.length-1;i>0;i--){s=(Math.imul(s,1664525)+1013904223)>>>0;const j=Math.floor(s/4294967296*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out.slice(0,n);}
export function audit(model,rows=model.impact){
  const a=aggregate(rows),checks=[];const check=(name,actual,expected,detail='')=>checks.push({name,actual,expected,ok:actual===expected,detail});
  check('원본 = 비사고 보고 + 사고 보고 버전',model.rawCount,model.compliance+[...model.sources].reduce((n,s)=>n+s.rows.filter(r=>value(r,'Report Type')!=='No New or Updated Incident Reports').length,0));
  check('최신 보고의 검수·재검토 추적',model.covered.size,model.latest.size);
  check('ADS 상태별 건수 합계',countBy(model.ads,'decision').reduce((n,x)=>n+x.count,0),model.ads.length);
  check('사고 상대 분류 합계',a.counterparts.reduce((n,x)=>n+x.count,0),rows.length);
  check('주·야간·시간 불명 합계',a.time.reduce((n,x)=>n+x.count,0),rows.length);
  check('피해수준 분류 합계',a.severity.reduce((n,x)=>n+x.count,0),rows.length);
  check('자동차 확정 유형 + 자료 상충 + 근거 부족 + 미검토',a.scenarios.reduce((n,x)=>n+x.count,0),a.cars.length);
  check('보고번호 중복 없음',new Set(rows.map(r=>r.id)).size,rows.length);
  const selectedIds=new Map(model.impact.map(r=>[r.id,r]));
  const cited=model.pkg.cases.filter(c=>selectedIds.has(c.id));
  check('사례 인용문과 사용 경위 일치',cited.filter(c=>selectedIds.get(c.id).narrative.replace(/\s+/g,' ').includes(c.evidence.replace(/\s+/g,' ').trim())).length,cited.length);
  if(model.baseline){const e=model.pkg.expected;for(const [name,actual,expected]of[
    ['기준 원본 기록',model.rawCount,e.raw],['기준 비사고 보고',model.compliance,e.compliance],['기준 최신 보고',model.latest.size,e.latest],
    ['기준 검수 대표 기록',model.records.length,e.reviewedGroups],['기준 ADS 시스템',model.ads.length,e.adsSystem],['기준 사고 당시 ADS',model.impact.length,e.impact],
    ['기준 충돌 전 수동·원격 등',model.ads.filter(r=>r.decision==='non_ads').length,e.transition],['기준 상태 불충분',model.ads.filter(r=>r.decision==='insufficient').length,e.unclear],['기준 상태 불일치',model.ads.filter(r=>r.decision==='conflict').length,e.conflict],
    ['기준 중상·사망',model.impact.filter(r=>['serious','fatal'].includes(r.severity)).length,e.seriousOrFatal],['기준 시간 기준 주간',model.impact.filter(r=>r.time==='day').length,e.day],['기준 시간 기준 야간',model.impact.filter(r=>r.time==='night').length,e.night],['기준 조명 정보 기재',model.impact.filter(r=>r.lighting).length,e.lightingAvailable],['기준 자동차 상대',model.impact.filter(r=>CAR.has(r.counterpart)).length,e.car]
  ])check(name,actual,expected);}
  return checks;
}
export function csvExport(rows){if(!rows.length)return '\uFEFF';const keys=Object.keys(rows[0]);const cell=s=>'"'+String(s??'').replaceAll('"','""')+'"';return '\uFEFF'+[keys,...rows.map(r=>keys.map(k=>r[k]))].map(r=>r.map(cell).join(',')).join('\r\n');}
