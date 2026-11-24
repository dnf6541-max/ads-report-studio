// Development test: npm packages pptxgenjs 4.0.1 and jszip 3.10.1.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import zlib from 'node:zlib';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import {buildModel} from './analysis.mjs';
import {buildPptx} from './export-pptx.mjs';
const encoded=(await import('./data-base64.mjs')).default;
const pkg=JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64')));
const model=await buildModel(pkg);
const zip=async p=>JSZip.loadAsync(await p.write({outputType:'uint8array',compression:true}));
const slides=z=>Object.keys(z.files).filter(x=>/^ppt\/slides\/slide\d+\.xml$/.test(x));
test('five native editable pages with charts, Excel data, tables, text, shapes and notes',async()=>{
  const p=buildPptx(PptxGenJS,model),z=await zip(p);assert.equal(slides(z).length,5);
  const charts=Object.keys(z.files).filter(x=>/^ppt\/charts\/chart\d+\.xml$/.test(x));assert.ok(charts.length>=15);
  assert.equal(Object.keys(z.files).filter(x=>/^ppt\/embeddings\/.*\.xlsx$/.test(x)).length,charts.length);
  const xml=await Promise.all(slides(z).map(x=>z.file(x).async('string')));
  assert.ok(xml.every(s=>!s.includes('<p:pic>')),'No screenshot-backed slides');
  assert.ok(xml.every(s=>s.includes('<a:t>')));assert.ok(xml[3].includes('<a:tbl>'));
  assert.ok(xml[1].includes('30412-6144'));assert.ok(xml[1].includes('30270-11713'));assert.ok(xml[2].includes('시차 확인 19건'));
  assert.ok(xml.every(s=>!/<a:ext [^>]*(?:cx|cy)="-/.test(s)),'No negative shape extents');
  const first=await z.file(charts[0]).async('string');assert.ok(first.includes('1605'));assert.ok(first.includes('593'));assert.ok(first.includes('maxMin'));
  assert.ok((await z.file('ppt/notesSlides/notesSlide1.xml').async('string')).includes('2752'));
  fs.mkdirSync(new URL('./qa/',import.meta.url),{recursive:true});await p.writeFile({fileName:new URL('./qa/native-main.pptx',import.meta.url).pathname,compression:true});
});
test('33 individual figures and reviewed cases, including exact surface and transition data',async()=>{
  const p=buildPptx(PptxGenJS,model,{}, {scope:'figures'}),z=await zip(p);assert.equal(slides(z).length,33);
  const surface=await z.file('ppt/notesSlides/notesSlide7.xml').async('string');assert.ok(surface.includes('1224'));assert.ok(surface.includes('1296'));
  const timing=await z.file('ppt/notesSlides/notesSlide10.xml').async('string');assert.ok(timing.includes('215'));assert.ok(timing.includes('234'));
  await p.writeFile({fileName:new URL('./qa/native-figures.pptx',import.meta.url).pathname,compression:true});
});
test('single page/figure export and empty selection do not invent US values',async()=>{
  const single=await zip(buildPptx(PptxGenJS,model,{}, {scope:'pages',tab:'vru'}));assert.equal(slides(single).length,1);
  const figure=await zip(buildPptx(PptxGenJS,model,{}, {scope:'figures',figureId:'road-surface'}));assert.equal(slides(figure).length,1);
  const empty=await zip(buildPptx(PptxGenJS,model,{from:'2028-01'}));assert.equal(slides(empty).length,5);
  const first=await empty.file('ppt/slides/slide1.xml').async('string');assert.ok(first.includes('선택 범위에 확인된 사고가 없습니다'));assert.ok(!first.includes('2752'));
  assert.ok((await empty.file('ppt/slides/slide5.xml').async('string')).includes('112건'));
  assert.throws(()=>buildPptx(PptxGenJS,model,{}, {scope:'figures',figureId:'no-such-figure'}));
});
