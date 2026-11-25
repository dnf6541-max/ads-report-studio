import {scenarioEvidence,scenarioReviewAudit} from './scenario-review.mjs?v=20261125.24';
import test from 'node:test';
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import encoded from './data-base64.mjs?v=20261124.10';
import {buildModel,analysisRows,analysisBasis,aggregate,audit,sample,CAR,VRU,scenarioKey,csvExport,parseCSV} from './analysis.mjs?v=20261125.24';
import {figureCatalog,figureDataRows,extraAudit} from './supplement.mjs?v=20261125.24';
import {extendedAudit,insightSummary,controlSummary} from './extended.mjs?v=20261125.24';
import {contributionAudit,contributionSummary} from './contribution.mjs?v=20261125.24';
import {buildPptx} from './export-pptx.mjs?v=20261125.24';
const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64'))),m=await buildModel(pkg);
const catalog=basis=>figureCatalog(m,{basis});
const fig=(list,id)=>list.find(f=>f.id===id);

test('default uses 3031 reviewed ADS-system reports; confirmed is an explicit 2752 subset',()=>{
 assert.equal(analysisBasis().key,'reported');assert.equal(analysisRows(m).length,3031);
 assert.deepEqual(analysisRows(m).map(r=>r.id),m.ads.map(r=>r.id));
 assert.deepEqual(analysisRows(m,{basis:'confirmed'}).map(r=>r.id),m.impact.map(r=>r.id));
 assert.equal(m.records.length,3060);assert.equal(m.latest.size,3450);
 const decisions={};for(const r of analysisRows(m))decisions[r.decision]=(decisions[r.decision]||0)+1;
 assert.deepEqual(decisions,{include:2752,non_ads:234,insufficient:44,conflict:1});
 assert.throws(()=>analysisRows(m,{basis:'typo'}));
});
test('annual and company intersections preserve both analysis populations',()=>{
 const counts={reported:[67,158,277,531,1020,978],confirmed:[34,104,243,492,963,916]};
 for(const basis of Object.keys(counts)){
  const rows=analysisRows(m,{basis});assert.deepEqual(aggregate(rows).years.map(x=>x.count),counts[basis]);
  for(let year=2021;year<=2026;year++)assert.equal(analysisRows(m,{basis,from:`${year}-01`,to:`${year}-12`}).length,counts[basis][year-2021]);
  const source=basis==='reported'?m.ads:m.impact,company=source.find(r=>r.month.startsWith('2026')).company;
  assert.deepEqual(analysisRows(m,{basis,from:'2026-01',to:'2026-12',company}).map(r=>r.id),source.filter(r=>r.month>='2026-01'&&r.month<='2026-12'&&r.company===company).map(r=>r.id));
  assert.equal(analysisRows(m,{basis,from:'2030-01'}).length,0);
 }
});
test('the additional 202 car reports are now reviewed with explicit unresolved states',()=>{
 const all=analysisRows(m),confirmed=analysisRows(m,{basis:'confirmed'}),ids=new Set(confirmed.map(r=>r.id));
 const extra=all.filter(r=>!ids.has(r.id));assert.equal(extra.length,279);assert.equal(extra.filter(r=>CAR.has(r.counterpart)).length,202);
 assert.equal(all.filter(r=>CAR.has(r.counterpart)).length,2489);assert.equal(all.filter(r=>VRU.has(r.counterpart)).length,103);
 assert.equal(confirmed.filter(r=>VRU.has(r.counterpart)).length,87);
 const a=aggregate(all),b=aggregate(confirmed);assert.equal(a.scenarios.find(x=>x.key==='U').count,0);
 assert.ok(a.scenarios.find(x=>x.key==='R').count>=b.scenarios.find(x=>x.key==='R').count);
 for(const r of extra.filter(r=>CAR.has(r.counterpart)))assert.ok(scenarioEvidence(r),r.id);
 for(const year of a.years){const cars=all.filter(r=>r.month.slice(0,4)===year.key&&CAR.has(r.counterpart));assert.equal(aggregate(cars).scenarios.reduce((s,x)=>s+x.count,0),cars.length);}
 const collision=fig(catalog('reported'),'collision-form');assert.equal(collision.items.find(x=>x.key==='unreviewed').count,202);assert.equal(collision.items.find(x=>x.key==='other_insufficient').count,1404);
});
test('all figures, status comparisons, insights and CSV metadata follow the selected basis',()=>{
 for(const [basis,n,cars,vru,surface]of [['reported',3031,2489,103,1480],['confirmed',2752,2287,87,1296]]){
  const fs=catalog(basis),rows=analysisRows(m,{basis});assert.equal(fs.length,204);
  for(const [id,total]of [['counterparts',n],['car-situations',cars],['collision-form',cars],['day-night',n],['operating-state',n],['operator',n],['road-surface',surface],['vru-types',vru]]){
   const f=fig(fs,id);assert.equal(f.denominator,total,id);assert.equal(f.items.reduce((s,x)=>s+x.count,0),total,id);
   const csv=parseCSV(csvExport(figureDataRows(f)));assert.ok(csv.rows.every(x=>x['분석기준']===analysisBasis({basis}).label));
  }
  const states=fig(fs,'state-severity');assert.deepEqual(states.groups.map(g=>g.total),basis==='reported'?[2752,176,5,53,45]:[2752,0,0,0,0]);
  assert.equal(fig(fs,'transition-time').denominator,basis==='reported'?176:0);
  assert.equal(controlSummary(rows).remote.length,basis==='reported'?5:0);
  assert.equal(fig(fs,'severe-counterparts').denominator,14);
  assert.ok(insightSummary(m,{basis},'cases').items[0][1].includes(`${n}건`));
  assert.ok(fs.every(f=>f.insight&&f.basis===(f.tab==='domestic'?'domestic':basis)));
  const checks=[...audit(m,rows),...extraAudit(m,rows,rows),...extendedAudit(m,rows,rows),...contributionAudit(m,rows),...scenarioReviewAudit(rows)];
  assert.equal(checks.length,69);assert.ok(checks.every(x=>x.ok),JSON.stringify(checks.filter(x=>!x.ok)));
  assert.ok(sample(rows,20).every(r=>rows.includes(r)));assert.equal(contributionSummary(rows).details.length,134);
 }
 const a=catalog('reported'),b=catalog('confirmed');assert.deepEqual(a.filter(f=>f.tab==='domestic'),b.filter(f=>f.tab==='domestic'));
 assert.equal(m.ads.length,3031);assert.equal(m.impact.length,2752);
});
test('native PPTX notes and chart data preserve the chosen basis and do not leak excluded status groups',async()=>{
 for(const [basis,n,passenger,manual]of [['reported',3031,1753,176],['confirmed',2752,1605,0]]){
  const p=buildPptx(PptxGenJS,m,{basis}),z=await JSZip.loadAsync(await p.write({outputType:'uint8array',compression:true}));
  const slide=await z.file('ppt/slides/slide1.xml').async('string'),notes=await z.file('ppt/notesSlides/notesSlide1.xml').async('string'),chart=await z.file(Object.keys(z.files).find(x=>/^ppt\/charts\/chart\d+\.xml$/.test(x))).async('string');
  assert.ok(slide.includes(analysisBasis({basis}).label));assert.ok(notes.includes(`선택 분석대상: ${n}건`));assert.ok(chart.includes(`<c:v>${passenger}</c:v>`));
  const status=await z.file('ppt/notesSlides/notesSlide3.xml').async('string');assert.ok(status.includes(`&quot;분모&quot;:${manual}`));
 }
});
