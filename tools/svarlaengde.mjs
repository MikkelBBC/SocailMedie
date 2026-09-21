// Tjekker, om det rigtige svar kan gættes på længden alene: node tools/svarlaengde.mjs
// Et klassisk testfejl-mønster er, at det rigtige svar er det mest udførlige,
// fordi forfatteren pakker forbeholdene ind i det. Så måler prøven læsning, ikke viden.
import pack from '../public/data/index.js';

const quizzer = pack.kort.filter((k) => ['quiz', 'case'].includes(k.type) && Array.isArray(k.svar));

const maal = (k) => {
  const L = k.svar.map((s) => s.length);
  const rigtig = L[k.rigtigt];
  const andre = L.filter((_, i) => i !== k.rigtigt);
  const snit = andre.reduce((a, b) => a + b, 0) / andre.length;
  return {
    id: k.id,
    rigtig,
    snit: Math.round(snit),
    laengst: rigtig === Math.max(...L),
    pct: Math.round(((rigtig - snit) / snit) * 100),
    // Kun en reel afsløring, hvis forskellen også er stor nok til at se med det blotte øje.
    diff: Math.round(rigtig - snit),
  };
};

const rows = quizzer.map(maal);
const laengst = rows.filter((r) => r.laengst);
const grove = rows.filter((r) => r.laengst && r.pct >= 25 && r.diff >= 12).sort((a, b) => b.diff - a.diff);

console.log(`Spørgsmål i alt: ${rows.length}`);
console.log(`Rigtigt svar er det længste: ${laengst.length} (${Math.round((laengst.length / rows.length) * 100)} %) – tilfældigt ville være ca. ${Math.round(100 / (quizzer[0].svar.length || 4))} %`);
console.log(`Kan afsløres på længden (mindst 25 % og 12 tegn længere): ${grove.length}`);
console.log(`Gennemsnitlig forskel: ${Math.round(rows.reduce((a, r) => a + r.pct, 0) / rows.length)} %\n`);

if (process.argv.includes('--liste')) {
  for (const r of grove) console.log(`${r.id.padEnd(28)} ${String(r.rigtig).padStart(3)} tegn mod ${String(r.snit).padStart(3)} i snit  (+${r.pct} %, ${r.diff} tegn)`);
}
