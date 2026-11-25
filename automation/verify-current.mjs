import zlib from 'node:zlib';
import encoded from '../data-base64.mjs';
import {buildModel,analysisRows,audit} from '../analysis.mjs';
import {scenarioReviewAudit} from '../scenario-review.mjs';
import {extendedAudit} from '../extended.mjs';
import {contributionAudit} from '../contribution.mjs';
const model=await buildModel(JSON.parse(zlib.gunzipSync(Buffer.from(encoded,'base64'))));
const checks=['reported','confirmed'].flatMap(basis=>{const rows=analysisRows(model,{basis});return [...audit(model,rows),...scenarioReviewAudit(rows),...extendedAudit(model,rows,rows),...contributionAudit(model,rows)].map(c=>({...c,basis}));});
const failed=checks.filter(c=>!c.ok);if(failed.length){console.error(JSON.stringify(failed));process.exitCode=1;}else console.log(JSON.stringify({checks:checks.length,status:'passed',reported:model.ads.length,confirmed:model.impact.length,pending:model.pending.length}));
