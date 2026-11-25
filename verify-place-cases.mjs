import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import zlib from 'node:zlib';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import encoded from './data-base64.mjs?v=20261124.10';
import {buildModel,analysisRows} from './analysis.mjs?v=20261125.24';
import {placeSummary,placeAnnual,placeGroup,placeKey,placeStatus} from './environment.mjs?v=20261125.24';
import {figureCatalog,figureDataRows} from './supplement.mjs?v=20261125.24';
import {sceneFor,sceneSVG,caseSceneIds} from './scenes.mjs?v=20261125.24';
import {caseGalleryMarkup} from './case-gallery.mjs?v=20261125.24';
import {buildPptx} from './export-pptx.mjs?v=20261125.24';
const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64'))),m=await buildModel(pkg);
test('Roadway Type is present in both source schemas; only 2 reviewed records actually report Unknown',()=>{
 assert.ok(pkg.sources.every(s=>s.headers.includes('Roadway Type')));
 for(const [basis,expected]of [['reported',{Street:1928,Intersection:779,'Parking Lot':228,'Highway / Freeway':85,'Traffic Circle':7,'Parking Garage':1,'Unpaved Road':1,Unknown:2}],['confirmed',{Street:1783,Intersection:697,'Parking Lot':217,'Highway / Freeway':48,'Traffic Circle':5,Unknown:2}]]){
  const rows=analysisRows(m,{basis}),raw={};for(const r of rows){const key=r.raw['Roadway Type'];raw[key]=(raw[key]||0)+1;}
  assert.deepEqual(raw,expected);const p=placeSummary(rows);assert.deepEqual(Object.fromEntries(p.counts.map(x=>[x.key,x.count])),expected);
  assert.equal(p.unknown,2);assert.equal(p.blank,0);assert.equal(p.absent,0);assert.equal(p.known,rows.length-2);
  assert.equal(p.compact.reduce((s,x)=>s+x.count,0),rows.length);assert.equal(p.compact.find(x=>x.key==='Unknown').count,2);
  const annual=placeAnnual(rows);assert.equal(annual.reduce((s,x)=>s+x[7],0),2);assert.equal(annual.at(-1)[7],1);
  for(const y of annual)assert.equal(y.slice(2).reduce((s,n)=>s+n,0),y[1]);
 }
});
test('known places, Unknown, blank and absent fields remain separate including future place labels',()=>{
 const r=v=>({raw:{'Roadway Type':v},sourceFields:['Roadway Type']});
 for(const key of ['Street','Parking Lot','Parking Garage','Traffic Circle','Unpaved Road','Rural Road','New Road Label']){assert.equal(placeStatus(r(key)),'reported');assert.equal(placeGroup(r(key)),'other_known');}
 assert.equal(placeGroup(r('Intersection')),'intersection');assert.equal(placeStatus(r('Unknown')),'unknown');assert.equal(placeStatus(r('')),'blank');
 assert.equal(placeStatus({raw:{},sourceFields:['City']}),'not_collected');assert.equal(placeKey({raw:{},sourceFields:['City']}),'__absent');
});
test('place charts and VRU tables reconcile without folding known places into missing',()=>{
 for(const basis of ['reported','confirmed']){
  const fs=figureCatalog(m,{basis}),place=fs.find(f=>f.id==='roadway');assert.equal(place.items.find(x=>x.key==='Unknown').count,2);
  assert.ok(!JSON.stringify(place).includes('그 외·불명'));assert.ok(figureDataRows(place).some(x=>x.항목==='일반도로'));
  const env=fs.find(f=>f.id==='vru-environment'),vru=fs.find(f=>f.id==='vru-types');assert.equal(env.rows.reduce((s,r)=>s+r[1]+r[2]+r[3],0),vru.denominator);
  const night=fs.find(f=>f.id==='vru-night-severity');assert.equal(night.rows.reduce((s,r)=>s+r[1],0),vru.denominator);
 }
});
test('all 14 serious/fatal and 6 priority cases have visible, case-specific drawings',()=>{
 const fs=figureCatalog(m,{contribution:'priority'}),cases=fs.filter(f=>f.kind==='case');assert.equal(cases.length,20);assert.equal(new Set(cases.map(f=>f.record.id)).size,19);
 assert.equal(caseSceneIds.length,19);
 for(const [tab,n]of [['cases',14],['contribution',6]]){
  const figs=cases.filter(f=>f.tab===tab),html=caseGalleryMarkup(figs);assert.equal(figs.length,n);assert.equal((html.match(/data-case-id=/g)||[]).length,n);assert.equal((html.match(/<svg /g)||[]).length,n);assert.ok(!html.includes('<details><summary>개략도'));
  for(const f of figs){assert.ok(html.includes(f.record.id));const sc=sceneFor(f.record);assert.ok(sc.paths.length>0||sc.sequence?.length===3);assert.ok(sc.hits.length>0||sc.sequence?.length===3);assert.ok(!sc.context.includes('진로가 충분히'));assert.ok(!sceneSVG(f.record).includes('url(#arrow)'));}
 }
 assert.ok(sceneFor(m.ads.find(r=>r.id==='30413-13249')).objects.some(x=>x.label.includes('옹벽')));
 assert.equal(sceneFor(m.ads.find(r=>r.id==='30413-9958')).sequence[2].title,'이후 수동운행');
});
test('dedicated case PPTX exports every selected case as editable native geometry',async()=>{
 fs.mkdirSync(new URL('./qa/',import.meta.url),{recursive:true});
 for(const [tab,n]of [['cases',14],['contribution',6]]){
  const p=buildPptx(PptxGenJS,m,{contribution:'priority'}, {scope:'cases',tab}),z=await JSZip.loadAsync(await p.write({outputType:'uint8array',compression:true}));
  const files=Object.keys(z.files).filter(x=>/^ppt\/slides\/slide\d+\.xml$/.test(x));assert.equal(files.length,tab==='contribution'?n*2:n);
  const xml=(await Promise.all(files.map(x=>z.file(x).async('string')))).join('\n');assert.ok(!xml.includes('<p:pic>'));assert.ok(!xml.includes('그 외·불명'));
  for(const f of figureCatalog(m,{contribution:'priority'}).filter(f=>f.tab===tab&&f.kind==='case'))assert.ok(xml.includes(f.record.id),f.record.id);
  await p.writeFile({fileName:new URL(`./qa/all-${tab}.pptx`,import.meta.url).pathname,compression:true});
 }
 const p=buildPptx(PptxGenJS,m,{from:'2026-01'}, {scope:'cases',tab:'cases'}),z=await JSZip.loadAsync(await p.write({outputType:'uint8array',compression:true}));assert.equal(Object.keys(z.files).filter(x=>/^ppt\/slides\/slide\d+\.xml$/.test(x)).length,5);
 assert.throws(()=>buildPptx(PptxGenJS,m,{from:'2030-01'},{scope:'cases',tab:'cases'}));
});
