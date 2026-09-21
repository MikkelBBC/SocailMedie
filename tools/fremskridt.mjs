// Læser eksporterne i fremskridt/ og oversætter dem til noget, et menneske kan læse:
//   node tools/fremskridt.mjs                  (nyeste fil)
//   node tools/fremskridt.mjs --alle           (udvikling over tid)
//   node tools/fremskridt.mjs <sti til fil>
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import pack from '../public/data/index.js';

const MAPPE = 'fremskridt';
const byId = Object.fromEntries(pack.kort.map((k) => [k.id, k]));
const spor = Object.fromEntries(pack.spor.map((s) => [s.id, s]));

const titel = (k) => k?.sporgsmal ?? k?.hook ?? k?.pastand ?? (k?.a ? `${k.a.navn} vs ${k.b.navn}` : '(ukendt kort)');
const kort = (t, n = 72) => (t.length > n ? `${t.slice(0, n - 1)}…` : t);

function filer() {
  if (!existsSync(MAPPE)) return [];
  return readdirSync(MAPPE).filter((f) => f.endsWith('.json')).sort().map((f) => join(MAPPE, f));
}

function laes(sti) {
  try {
    return { sti, data: JSON.parse(readFileSync(sti, 'utf8')) };
  } catch (e) {
    console.error(`Kunne ikke læse ${sti}: ${e.message}`);
    return null;
  }
}

function vis(sti, data) {
  const k = data.kort ?? {};
  const ids = Object.keys(k);
  console.log(`\n=== ${sti} · eksporteret ${data.dato} ===`);
  console.log(`Level ${data.level} · ${data.xp} XP · streak ${data.streak} dage · aktiv på ${data.dage_med_aktivitet ?? '?'} dage`);
  console.log(`Svar i alt: ${data.svar?.i_alt ?? 0}, heraf ${data.svar?.procent ?? 0} % rigtige`);
  console.log(`Kort med historik: ${ids.length} · aldrig besvaret: ${data.aldrig_besvaret ?? '?'}`);

  if (data.rigtige_pr_korttype) {
    const rk = Object.entries(data.rigtige_pr_korttype)
      .map(([t, v]) => {
        const [ok, n] = v.split('/').map(Number);
        return { t, n, pct: n ? Math.round((ok / n) * 100) : null };
      })
      .filter((x) => x.n >= 3)
      .sort((a, b) => a.pct - b.pct);
    if (rk.length) {
      console.log('\nTræfsikkerhed pr. korttype (svagest først):');
      for (const x of rk) console.log(`  ${x.t.padEnd(14)} ${String(x.pct).padStart(3)} %   (${x.n} svar)`);
    }
  }

  if (data.parathed_pr_emne?.length) {
    const emner = data.parathed_pr_emne
      .map((s) => { const [id, p] = s.split(':'); return { id, p: parseInt(p, 10) }; })
      .sort((a, b) => a.p - b.p);
    console.log('\nSvageste eksamensemner:');
    for (const e of emner.slice(0, 6)) {
      console.log(`  ${String(e.p).padStart(3)} %  ${e.id}  ${spor[e.id]?.titel ?? ''}`);
    }
  }

  // De kort, der faktisk driller: glemt mindst én gang, sorteret efter antal og hvor dårligt de huskes nu.
  const driller = ids
    .map((id) => ({ id, reps: k[id][0], lapses: k[id][1], sidste: k[id][2], husker: k[id][3] }))
    .filter((x) => x.lapses > 0 || x.sidste === 1)
    .sort((a, b) => b.lapses - a.lapses || a.husker - b.husker)
    .slice(0, 15);
  if (driller.length) {
    console.log('\nKort, der driller (id · glemt · husker nu · spørgsmål):');
    for (const x of driller) {
      const c = byId[x.id];
      console.log(`  ${x.id.padEnd(18)} ${String(x.lapses)}×  ${String(x.husker).padStart(3)} %  ${kort(titel(c))}`);
      if (c?.spor) console.log(`${' '.repeat(22)}↳ ${spor[c.spor]?.titel ?? c.spor} · type: ${c.type}`);
    }
  } else if (ids.length) {
    console.log('\nIngen kort er glemt endnu.');
  }

  const svage = ids
    .map((id) => ({ id, husker: k[id][3] }))
    .filter((x) => x.husker < 60)
    .sort((a, b) => a.husker - b.husker)
    .slice(0, 10);
  if (svage.length) {
    console.log('\nHusker dårligst lige nu (klar til gentagelse):');
    for (const x of svage) console.log(`  ${String(x.husker).padStart(3)} %  ${x.id.padEnd(18)} ${kort(titel(byId[x.id]), 60)}`);
  }
}

function udvikling(alle) {
  console.log('\n=== Udvikling ===');
  console.log('dato        svar   rigtige   kort   level');
  for (const { data } of alle) {
    console.log(
      `${String(data.dato).padEnd(12)}${String(data.svar?.i_alt ?? 0).padStart(4)}   ${String(data.svar?.procent ?? 0).padStart(5)} %   ${String(Object.keys(data.kort ?? {}).length).padStart(4)}   ${data.level}`,
    );
  }
}

const arg = process.argv[2];
if (arg && arg !== '--alle') {
  const r = laes(arg);
  if (r) vis(r.sti, r.data);
} else {
  const fundet = filer();
  if (!fundet.length) {
    console.log(`Ingen eksporter i ${MAPPE}/ endnu.\n\nÅbn appen → Statistik → »Del dine data med Claude« → Hent som fil,\nog læg filen i ${MAPPE}/. Se ${MAPPE}/LÆS-MIG.md.`);
    process.exit(0);
  }
  const alle = fundet.map(laes).filter(Boolean);
  if (arg === '--alle') {
    for (const { sti, data } of alle) vis(sti, data);
    if (alle.length > 1) udvikling(alle);
  } else {
    const sidste = alle.at(-1);
    vis(sidste.sti, sidste.data);
    if (alle.length > 1) udvikling(alle);
    console.log(`\n(${alle.length} eksporter i alt. Brug --alle for at se dem alle.)`);
  }
}
