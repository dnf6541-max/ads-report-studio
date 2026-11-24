// Run: node --test verify.mjs (Node 22+). All tests are offline and read-only.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import zlib from 'node:zlib';
import {buildModel,audit,aggregate,dayNight,parseCSV,parseMonth,severity,filtered,sample,pct,contactCounts,selectFields,sha256,canonical,VRU} from './analysis.mjs';
const encoded=(await import('./data-base64.mjs')).default;
const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64')));
const model=await buildModel(pkg);
const freshSources=()=>structuredClone(pkg.sources);
test('基準: immutable reviewed totals and all audit checks',()=>{
  assert.equal(model.rawCount,3890);assert.equal(model.latest.size,3450);assert.equal(model.records.length,3060);
  assert.equal(model.ads.length,3031);assert.equal(model.impact.length,2752);assert.equal(model.pending.length,0);
  assert.ok(audit(model).every(x=>x.ok));assert.ok(model.baseline);
});
test('independently reviewed annual, scenario and severity totals',()=>{
  assert.deepEqual(Object.fromEntries(aggregate(model.impact).years.map(x=>[x.key,x.count])),{'2021':34,'2022':104,'2023':243,'2024':492,'2025':963,'2026':916});
  assert.deepEqual(Object.fromEntries(aggregate(model.impact).scenarios.map(x=>[x.key,x.count])),{'01':439,'02':157,'03':322,'04':259,'05':245,'06':161,'07':69,'08':55,'R':580});
  assert.deepEqual(Object.fromEntries(aggregate(model.impact).severity.map(x=>[x.key,x.count])),{none:2451,minor:214,moderate:29,serious:11,fatal:3,unknown:44});
});
test('time boundary, unknown flag, invalid times and month parsing',()=>{
  for(const [s,want]of [['05:59','night'],['06:00','day'],['17:59','day'],['18:00','night'],['00:00','night'],['24:00','unknown'],['12:60','unknown'],['','unknown'],['8:02','day']])assert.equal(dayNight({'Incident Time (24:00)':s}),want,s);
  assert.equal(dayNight({'Incident Time (24:00)':'12:00','Incident Time - Unknown':'Y'}),'unknown');
  assert.equal(parseMonth('JUN-2026'),'2026-06');assert.equal(parseMonth('invalid'),'');assert.equal(parseMonth('2026-13'),'');
});
test('reported lighting denominator is separate from time',()=>{
  const a=aggregate(model.impact);assert.equal(a.lighting.reduce((n,x)=>n+x.count,0),1296);
  assert.deepEqual(Object.fromEntries(a.time.map(x=>[x.key,x.count])),{day:1578,night:1174,unknown:0});
  assert.equal(model.impact.filter(r=>!r.lighting).length,1456);
});
test('VRU categories preserve motorcycle vs scooter and exclude other non-motorist',()=>{
  const r=model.impact.filter(r=>VRU.has(r.counterpart));assert.equal(r.length,87);
  assert.equal(r.filter(x=>x.counterpart==='Motorcycle').length,33);
  assert.equal(r.filter(x=>x.counterpart==='Non-Motorist: Scooter - Skateboard').length,5);
  assert.equal(model.impact.filter(x=>x.counterpart==='Non-Motorist: Other').length,12);
});
test('injury vocabulary does not promote Moderate to Serious',()=>{
  assert.equal(severity('Moderate W/ Hospitalization'),'moderate');assert.equal(severity('Minor W/ Hospitalization'),'minor');
  assert.equal(severity('Serious W/ Hospitalization'),'serious');assert.equal(severity('Property Damage. No Injured Reported'),'none');assert.equal(severity(''),'unknown');
});
test('multiline, quoted commas, escaped quotes and BOM in CSV',()=>{
  const r=parseCSV('\uFEFFid,quote\r\n1,"first, line\nsecond ""quoted"""\r\n');assert.deepEqual(r.rows,[{id:'1',quote:'first, line\nsecond "quoted"'}]);
  assert.throws(()=>parseCSV('a,b\n1,"unclosed'));assert.throws(()=>parseCSV('a,a\n1,2'));assert.throws(()=>parseCSV('a,b\n1,2,3'));
});
test('fingerprints exactly match Python preparation',async()=>{
  const g=pkg.reviews.find(g=>g.members.length===1);const r=model.latest.get(g.id);
  assert.equal(await sha256(canonical(r)),g.fingerprints[g.id]);
  assert.deepEqual(selectFields(r,pkg.fields),r);
});
test('changed latest narrative invalidates an old review',async()=>{
  const sources=freshSources(),g=pkg.reviews.find(g=>g.decision==='include'&&g.members.length===1);
  for(const s of sources)for(const r of s.rows)if(r['Report ID']===g.id&&r['Report Version']===model.latest.get(g.id)['Report Version'])r.Narrative+=' Changed evidence.';
  sources[0].sha256='changed';const m=await buildModel(pkg,sources);
  assert.equal(m.impact.length,2751);assert.ok(m.pending.some(r=>r.id===g.id));assert.equal(m.baseline,false);
});
test('new report with same incident and vehicle invalidates existing link',async()=>{
  const sources=freshSources(),g=pkg.reviews.find(g=>g.decision==='include'&&g.members.length===1&&model.latest.get(g.id)['Same Incident ID'].trim()&&model.latest.get(g.id)['Same Vehicle ID'].trim());
  const row={...model.latest.get(g.id),'Report ID':'TEST-NEW','Report Version':'1'};sources[0].rows.push(row);sources[0].sha256='changed';
  const m=await buildModel(pkg,sources);assert.equal(m.impact.length,2751);assert.ok(m.pending.some(r=>r.id===g.id));assert.ok(m.pending.some(r=>r.id==='TEST-NEW'));
});
test('new highest version is pending; no silent carry-over',async()=>{
  const sources=freshSources(),g=pkg.reviews.find(g=>g.decision==='include'&&g.members.length===1),r=model.latest.get(g.id);
  sources[0].rows.push({...r,'Report Version':String(+r['Report Version']+1)});sources[0].sha256='changed';
  const m=await buildModel(pkg,sources);assert.equal(m.impact.length,2751);assert.ok(m.pending.some(r=>r.id===g.id));
});
test('conflicting identical ID/version blocks replacement',async()=>{
  const sources=freshSources();sources[0].rows.push({...sources[0].rows[0],Narrative:'Conflicting narrative'});
  await assert.rejects(buildModel(pkg,sources),/같은 보고번호/);
});
test('missing member and missing evidence version require review',async()=>{
  const sources=freshSources(),g=pkg.reviews.find(g=>g.decision==='include'&&g.members.length>1);const remove=g.members.find(id=>id!==g.id);
  for(const s of sources)s.rows=s.rows.filter(r=>r['Report ID']!==remove);
  const m=await buildModel(pkg,sources);assert.ok(m.invalidReviews.some(x=>x.id===g.id));assert.ok(!m.impact.some(x=>x.id===g.id));
});
test('filtered counts, deterministic sampling and empty fractions',()=>{
  const y=filtered(model.impact,{from:'2021-01',to:'2021-12'});assert.equal(y.length,34);
  assert.equal(filtered(model.impact,{from:'2028-01'}).length,0);
  assert.deepEqual(sample(y,8,42).map(r=>r.id),sample(y,8,42).map(r=>r.id));assert.equal(new Set(sample(y,8,42).map(r=>r.id)).size,8);
  assert.notDeepEqual(sample(y,8,42).map(r=>r.id),sample(y,8,43).map(r=>r.id));assert.equal(pct(0,0),'—');
});
test('contact flags allow multiple areas without double counting a single area',()=>{
  const a=contactCounts([{raw:{'SV Contact Area - Front':'Y','SV Contact Area - Front Left':'Y','SV Contact Area - Rear':'Y'}}]);
  assert.equal(a.find(x=>x.key==='전면').count,1);assert.equal(a.find(x=>x.key==='후면').count,1);assert.equal(a.reduce((n,x)=>n+x.count,0),2);
});
test('all 14 serious/fatal case quotations occur in the version actually reviewed',()=>{
  assert.equal(pkg.cases.length,14);for(const c of pkg.cases){const r=model.impact.find(r=>r.id===c.id);assert.ok(r);assert.ok(['serious','fatal'].includes(r.severity));assert.ok(r.narrative.replace(/\s+/g,' ').includes(c.evidence.replace(/\s+/g,' ').trim()),c.id);}
});
test('domestic official snapshot sum and published approximations',()=>{
  assert.equal(pkg.domestic.annual.reduce((n,x)=>n+x.count,0),112);assert.equal(pkg.domestic.adsShareApprox,35);assert.equal(pkg.domestic.lowSpeedKph,30);
});
