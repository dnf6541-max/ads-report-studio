// Development test: npm packages pptxgenjs 4.0.1 and jszip 3.10.1.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import zlib from 'node:zlib';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import vm from 'node:vm';
import {buildModel} from './analysis.mjs?v=20261125.25';
import {buildPptx} from './export-pptx.mjs?v=20261125.25';
const encoded=(await import('./data-base64.mjs?v=20261124.10')).default;
const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64')));
const model=await buildModel(pkg);
const zip=async p=>JSZip.loadAsync(await p.write({outputType:'uint8array',compression:true}));
const slides=z=>Object.keys(z.files).filter(x=>/^ppt\/slides\/slide\d+\.xml$/.test(x));
test('six native editable pages with charts, Excel data, tables, text, shapes and notes',async()=>{
  const p=buildPptx(PptxGenJS,model),z=await zip(p);assert.equal(slides(z).length,6);
  const charts=Object.keys(z.files).filter(x=>/^ppt\/charts\/chart\d+\.xml$/.test(x));assert.ok(charts.length>=15);
  assert.equal(Object.keys(z.files).filter(x=>/^ppt\/embeddings\/.*\.xlsx$/.test(x)).length,charts.length);
  const xml=await Promise.all(slides(z).map(x=>z.file(x).async('string')));
  assert.ok(xml.every(s=>!s.includes('<p:pic>')),'No screenshot-backed slides');
  assert.ok(xml.every(s=>s.includes('<a:t>')));assert.ok(xml[3].includes('<a:tbl>'));
  assert.ok(xml[1].includes('30412-6144'));assert.ok(xml[1].includes('30270-11713'));assert.ok(xml[2].includes('차내 전환 시차 16건'));
  assert.ok(xml.every(s=>!/<a:ext [^>]*(?:cx|cy)="-/.test(s)),'No negative shape extents');
  const first=await z.file(charts[0]).async('string');assert.ok(first.includes('1753'));assert.ok(first.includes('642'));assert.ok(first.includes('maxMin'));
  assert.ok((await z.file('ppt/notesSlides/notesSlide1.xml').async('string')).includes('선택 분석대상: 3031건'));
  fs.mkdirSync(new URL('./qa/',import.meta.url),{recursive:true});await p.writeFile({fileName:new URL('./qa/native-main.pptx',import.meta.url).pathname,compression:true});
});
test('204 figures plus 134 case-analysis detail pages retain exact source data',async()=>{
  const p=buildPptx(PptxGenJS,model,{}, {scope:'figures'}),z=await zip(p);assert.equal(slides(z).length,338);
  const surface=await z.file('ppt/notesSlides/notesSlide7.xml').async('string');assert.ok(surface.includes('1400'));assert.ok(surface.includes('1480'));
  const timing=await z.file('ppt/notesSlides/notesSlide10.xml').async('string');assert.ok(timing.includes('160'));assert.ok(timing.includes('176'));
  await p.writeFile({fileName:new URL('./qa/native-figures.pptx',import.meta.url).pathname,compression:true});
});
test('single page/figure export and empty selection do not invent US values',async()=>{
  const single=await zip(buildPptx(PptxGenJS,model,{}, {scope:'pages',tab:'vru'}));assert.equal(slides(single).length,1);
  const figure=await zip(buildPptx(PptxGenJS,model,{}, {scope:'figures',figureId:'road-surface'}));assert.equal(slides(figure).length,1);
  const empty=await zip(buildPptx(PptxGenJS,model,{from:'2028-01'}));assert.equal(slides(empty).length,6);
  const first=await empty.file('ppt/slides/slide1.xml').async('string');assert.ok(first.includes('선택 범위에 확인된 사고가 없습니다'));assert.ok(!first.includes('2752'));
  assert.ok((await empty.file('ppt/slides/slide5.xml').async('string')).includes('112건'));
  assert.throws(()=>buildPptx(PptxGenJS,model,{}, {scope:'figures',figureId:'no-such-figure'}));
});

test('vendored browser bundle exposes the constructor used by the app',()=>{
 const context={setTimeout,clearTimeout,Buffer};context.window=context;context.self=context;
 vm.runInNewContext(fs.readFileSync(new URL('./pptxgen.bundle.js',import.meta.url),'utf8'),context);
 assert.equal(typeof context.PptxGenJS,'function');assert.equal(typeof context.JSZip,'function');
 const app=fs.readFileSync(new URL('./app.mjs?v=20261125.25',import.meta.url),'utf8');assert.ok(app.includes('buildPptx(window.PptxGenJS,'));
});

test('domestic figure and slide notes retain their separate Korean official source',async()=>{
 const z=await zip(buildPptx(PptxGenJS,model,{}, {scope:'figures',figureId:'domestic-years'}));
 const slide=await z.file('ppt/slides/slide1.xml').async('string');const notes=await z.file('ppt/notesSlides/notesSlide1.xml').async('string');
 assert.ok(slide.includes('한국교통안전공단'));assert.ok(!slide.includes('NHTSA'));
 assert.ok(notes.includes('한국교통안전공단'));assert.ok(!notes.includes('NHTSA'));
});
