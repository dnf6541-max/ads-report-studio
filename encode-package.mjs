// Convert a reviewed gzip package to the two text modules used by this app.
// Usage: node encode-package.mjs /path/to/data.json.gz
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const file=process.argv[2];
if(!file)throw new Error('Usage: node encode-package.mjs /path/to/data.json.gz');
const bytes=fs.readFileSync(file);const pkg=JSON.parse(zlib.gunzipSync(bytes));
if(!pkg.sources||!pkg.reviews||!pkg.baselineHashes)throw new Error('Not a validated report data package.');
const data=bytes.toString('base64'),mid=Math.ceil(data.length/2);
for(const [i,s]of [data.slice(0,mid),data.slice(mid)].entries())fs.writeFileSync(path.join(root,`data-part${i+1}.mjs`),'export default '+JSON.stringify(s)+';\n');
fs.writeFileSync(path.join(root,'data-base64.mjs'),"import a from './data-part1.mjs?v=20261124.10';\nimport b from './data-part2.mjs?v=20261124.10';\nexport default a+b;\n");
console.log(`Encoded ${bytes.length} gzip bytes; original data and review fingerprints unchanged.`);
