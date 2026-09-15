// Tjekker indholdspakken for strukturelle fejl: node tools/valider.mjs
import pack from '../public/data/index.js';

const fejl = [];
const ids = new Set();
const typer = {};
for (const k of pack.kort) {
  if (ids.has(k.id)) fejl.push(`Dublet-id: ${k.id}`);
  ids.add(k.id);
  typer[k.type] = (typer[k.type] ?? 0) + 1;
}
const has = (id) => ids.has(id);

for (const k of pack.kort) {
  const t = `${k.id} (${k.type})`;
  if (k.om && !has(k.om)) fejl.push(`${t}: om peger på ukendt ${k.om}`);
  if (k.efter && !has(k.efter)) fejl.push(`${t}: efter peger på ukendt ${k.efter}`);
  if (k.kraever) for (const r of k.kraever) if (!has(r)) fejl.push(`${t}: kraever ukendt ${r}`);
  if (['quiz', 'case'].includes(k.type)) {
    if (!Array.isArray(k.svar) || k.svar.length < 2) fejl.push(`${t}: mangler svar`);
    if (!(k.rigtigt >= 0 && k.rigtigt < k.svar.length)) fejl.push(`${t}: rigtigt uden for svar`);
    if (!k.forklaring) fejl.push(`${t}: mangler forklaring`);
    if (!k.om && !k.efter) fejl.push(`${t}: hverken om eller efter`);
  }
  if (k.type === 'myte' && ![0, 1].includes(k.rigtigt)) fejl.push(`${t}: rigtigt skal være 0 (myte) eller 1 (fakta)`);
  if (k.type === 'raekkefolge' && !(k.trin?.length >= 3)) fejl.push(`${t}: for få trin`);
  if (k.type === 'forklar' && !(k.punkter?.length >= 3)) fejl.push(`${t}: for få punkter`);
  if (['myte', 'raekkefolge', 'forklar', 'sammenlign'].includes(k.type) && !k.efter) fejl.push(`${t}: mangler efter`);
  if (k.type === 'sammenlign') {
    if (!k.a?.navn || !k.b?.navn) fejl.push(`${t}: mangler a/b`);
    if (!(k.udsagn?.length >= 4)) fejl.push(`${t}: for få udsagn`);
    for (const u of k.udsagn ?? []) if (!['a', 'b', 'begge', 'ingen'].includes(u.svar)) fejl.push(`${t}: ugyldigt svar »${u.svar}«`);
    if (!k.pakke) fejl.push(`${t}: spor ${k.spor} findes ikke`);
  }
  if (k.type === 'koncept') {
    const ord = k.body.split(/\s+/).length;
    if (ord > 260) fejl.push(`${t}: body er ${ord} ord (for lang)`);
  }
}
for (const tema of pack.temaer ?? []) {
  for (const id of tema.koncepter) if (!has(id)) fejl.push(`tema ${tema.id}: ukendt koncept ${id}`);
  const spor = new Set(tema.koncepter.map((id) => pack.kort.find((k) => k.id === id)?.pakke));
  if (spor.size < 2) console.warn(`  ⚠ tema ${tema.id} går kun på tværs af ét fag`);
}
for (const s of pack.spor) {
  const kort = pack.kort.filter((k) => k.spor === s.id);
  const koncepter = kort.filter((k) => k.type === 'koncept');
  for (const k of koncepter) if (!kort.some((q) => q.om === k.id)) fejl.push(`${k.id}: koncept uden quiz`);
  if (s.pakke === 'sw3sys' && !s.disposition?.length) fejl.push(`${s.id}: mangler disposition`);
  if (s.pakke === 'sw3sys' && s.nr > 0 && kort.filter((k) => k.type === 'forklar').length < 2) fejl.push(`${s.id}: for få forklar-kort til simulatoren`);
  console.log(`${s.id} ${s.kort.padEnd(9)} ${String(kort.length).padStart(3)} kort · ${koncepter.length} koncepter · ${kort.filter((k) => k.type === 'forklar').length} forklar`);
}
console.log('\nTyper:', typer, '\nI alt:', pack.kort.length);
if (fejl.length) { console.error('\nFEJL:\n' + fejl.join('\n')); process.exit(1); }
console.log('\n✓ Ingen fejl');

