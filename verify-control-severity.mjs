import test from 'node:test';
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import encoded from './data-base64.mjs?v=20261124.10';
import {buildModel,analysisRows,SEVERITY,pct} from './analysis.mjs?v=20261125.25';
import {operatingStateSummary,controlEvidence} from './extended.mjs?v=20261125.25';
import {figureCatalog,figureDataRows} from './supplement.mjs?v=20261125.25';
import {buildPptx} from './export-pptx.mjs?v=20261125.25';

const model=await buildModel(JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64'))));
const keys=['ads_maintained','on_board_transition','remote_direct','other_non_ads','unresolved'];
const groups=rows=>operatingStateSummary(rows).groups;
const counts=rows=>groups(rows).map(g=>g.total);
const severityVector=g=>Object.keys(SEVERITY).map(k=>g.items.find(x=>x.key===k)?.count??0);

test('operating states partition all reports and preserve independently tallied severity cells',()=>{
 const gs=groups(model.ads);
 assert.deepEqual(gs.map(g=>g.key),keys);
 assert.deepEqual(gs.map(g=>g.total),[2752,176,5,53,45]);
 assert.deepEqual(gs.map(severityVector),[
  [2451,214,29,11,3,44],
  [145,20,5,0,0,6],
  [4,1,0,0,0,0],
  [43,8,1,0,0,1],
  [40,4,1,0,0,0],
 ]);
 const ids=gs.flatMap(g=>g.rows.map(r=>r.id));
 assert.equal(ids.length,3031);assert.equal(new Set(ids).size,3031);
 assert.deepEqual(new Set(ids),new Set(model.ads.map(r=>r.id)));
 for(const g of gs)assert.equal(g.items.reduce((s,x)=>s+x.count,0),g.total);
 for(const k of Object.keys(SEVERITY))assert.equal(gs.reduce((s,g)=>s+g.items.find(x=>x.key===k).count,0),model.ads.filter(r=>r.severity===k).length);
});

test('remote driving is four reports and gear-only actuation is one, not an onboard takeover',()=>{
 const rs=groups(model.ads).find(g=>g.key==='remote_direct').rows;
 assert.deepEqual(rs.map(r=>r.id).sort(),['13781-11459','13781-14043','13781-16678','13781-16679','30412-6179']);
 assert.equal(rs.filter(r=>controlEvidence(r)?.controlDetail==='remote_human_driving').length,4);
 assert.equal(rs.filter(r=>controlEvidence(r)?.controlDetail==='remote_gear_actuation_only').length,1);
 assert.equal(rs.filter(r=>r.severity==='minor').map(r=>r.id).join(','),'13781-11459');
 assert.ok(!groups(model.ads).find(g=>g.key==='on_board_transition').rows.some(r=>rs.includes(r)));
});

test('changed or missing evidence cannot keep a remote or manual classification',()=>{
 for(const key of ['remote_direct','on_board_transition']){
  const r=groups(model.ads).find(g=>g.key===key).rows[0];
  for(const changed of [{...r,narrativeVersion:'999'},{...r,narrative:'Updated narrative without prior evidence.'}]){
   assert.equal(controlEvidence(changed),null);
   const gs=groups([changed]);assert.equal(gs.find(g=>g.key===key).total,0);assert.equal(gs.find(g=>g.key==='other_non_ads').total,1);
  }
 }
 const unreviewed={...model.ads[0],id:'new-unreviewed-control',decision:'non_ads',driver:'In-Vehicle and Remote (Commercial / Test)'};
 assert.equal(groups([unreviewed]).find(g=>g.key==='remote_direct').total,0);
 assert.equal(groups([unreviewed]).find(g=>g.key==='other_non_ads').total,1);
 const confirmed={...unreviewed,decision:'include'};
 assert.equal(groups([confirmed]).find(g=>g.key==='ads_maintained').total,1);
 assert.equal(groups([confirmed]).find(g=>g.key==='remote_direct').total,0);
});

test('year, company and population selections also govern state severity without hidden denominator expansion',()=>{
 assert.deepEqual(counts(analysisRows(model,{from:'2026-01',to:'2026-12'})),[916,49,3,6,4]);
 assert.deepEqual(counts(analysisRows(model,{basis:'confirmed',from:'2026-01',to:'2026-12'})),[916,0,0,0,0]);
 assert.deepEqual(counts(analysisRows(model,{basis:'confirmed'})),[2752,0,0,0,0]);
 assert.deepEqual(counts(analysisRows(model,{from:'2030-01'})),[0,0,0,0,0]);
 for(const company of new Set(model.ads.map(r=>r.company))){
  const rows=analysisRows(model,{company}),gs=groups(rows);
  assert.equal(gs.reduce((s,g)=>s+g.total,0),rows.length);
  assert.ok(gs.flatMap(g=>g.rows).every(r=>r.company===company));
  const expectedRemote=rows.filter(r=>['13781-11459','13781-14043','13781-16678','13781-16679','30412-6179'].includes(r.id));
  assert.equal(gs.find(g=>g.key==='remote_direct').total,expectedRemote.length);
 }
});

test('exported severity chart and CSV use the same five groups, totals and per-state percentages',()=>{
 for(const filter of [{},{from:'2026-01'},{basis:'confirmed'},{company:'Tesla, Inc.'},{from:'2030-01'}]){
  const expected=groups(analysisRows(model,filter));
  const figure=figureCatalog(model,filter).find(f=>f.id==='state-severity');
  assert.deepEqual(figure.groups.map(g=>[g.label,g.total,severityVector(g)]),expected.map(g=>[g.label,g.total,severityVector(g)]));
  const data=figureDataRows(figure);assert.equal(data.length,keys.length*Object.keys(SEVERITY).length);
  for(const g of expected)for(const item of g.items){
   const row=data.find(x=>x.운행상태===g.label&&x.피해수준===item.label);
   assert.ok(row);assert.equal(row.건수,item.count);assert.equal(row.분모,g.total);assert.equal(row.구성비,pct(item.count,g.total));
  }
 }
});

test('native status PPTX and individual severity export carry separate state labels and evidence counts',async()=>{
 for(const options of [{scope:'pages',tab:'status'},{scope:'figures',figureId:'state-severity'}]){
  const pptx=buildPptx(PptxGenJS,model,{},options);
  const zip=await JSZip.loadAsync(await pptx.write({outputType:'uint8array',compression:true}));
  const slide=await zip.file('ppt/slides/slide1.xml').async('string');
  const notes=await zip.file('ppt/notesSlides/notesSlide1.xml').async('string');
  for(const g of groups(model.ads))assert.ok(slide.includes(g.label),g.label);
  assert.ok(!slide.includes('<p:pic>'),'Editable shapes/charts, not a screenshot');
  assert.ok(notes.includes('state-severity'));
  assert.ok(notes.includes('176'));assert.ok(notes.includes('2752'));
  assert.ok(!/<a:ext [^>]*(?:cx|cy)="-/.test(slide));
 }
});
