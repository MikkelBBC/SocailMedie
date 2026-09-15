// Simulerer 120 kort i feedet med 75 % rigtige svar og viser mixet: node tools/simuler-feed.mjs
import { Feed, REVIEWABLE } from '../public/src/feed.js';
import { review } from '../public/src/fsrs.js';
import seed from '../public/data/index.js';

const N = Number(process.argv[2] ?? 120);
const state = { items: {}, seen: {}, saved: {}, interest: {} };
const feed = new Feed(seed, state);
const byType = {};
const line = [];
let broer = 0;
let maxRun = 0;
let run = 0;
for (let i = 0; i < N; i++) {
  const p = feed.next();
  if (!p) { line.push('SLUT'); break; }
  const c = feed.byId[p.id];
  state.seen[p.id] = Date.now();
  if (c) byType[c.type] = (byType[c.type] ?? 0) + 1;
  run = c?.type === 'koncept' ? run + 1 : 0;
  maxRun = Math.max(maxRun, run);
  let mark = '';
  if (c && REVIEWABLE.has(c.type) && p.mode !== 'pretest') {
    const ok = Math.random() < 0.75;
    state.items[p.id] = review(state.items[p.id], ok ? 3 : 1);
    if (!ok) { feed.scheduleRetry(p.id, i); mark = '✗'; }
  }
  if (p.bro) broer++;
  line.push(`${p.id}${p.mode === 'new' ? '' : ':' + p.mode}${mark}${p.bro ? ` 🔀${p.bro.tema}` : ''}`);
}
console.log(line.join('\n'));
console.log('\nTyper:', byType);
console.log('Længste række koncepter i træk:', maxRun);
console.log(`Tema-broer: ${broer} af ${line.length} kort (${Math.round((broer / line.length) * 100)} %)`);
