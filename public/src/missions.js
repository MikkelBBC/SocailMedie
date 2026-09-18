// Dagens missioner: tre små mål, der skifter hver dag (samme dag = samme missioner).
// Én fra hver pulje, så dagen både har kvalitet, eksamensformat og mængde.
// Hver mission peger på noget med stor læringseffekt, og hver klaret mission giver en case.
// Klares alle tre, er bonus-casen mindst Restricted.

const POOLS = [
  ['sikker', 'combo', 'perfekt'], // kvalitet
  ['forklar', 'svag', 'sim'],     // eksamensformat
  ['gentag', 'koncept'],          // mængde
];

const DEF = {
  sikker: { emoji: '🎯', n: 5, tekst: (m) => `Svar rigtigt ${m.n} gange med »Sikker«` },
  combo: { emoji: '🔥', n: 7, tekst: (m) => `Nå en combo på ${m.n}` },
  perfekt: { emoji: '🧱', n: 1, tekst: () => 'Løs en rækkefølge eller sammenligning perfekt' },
  forklar: { emoji: '🎤', n: 2, tekst: (m) => `Klar ${m.n} Forklar højt-kort med mindst 60 %` },
  svag: { emoji: '📉', n: 3, tekst: (m, label) => `Svar rigtigt ${m.n} gange i ${label(m.arg)}` },
  sim: { emoji: '🎲', n: 1, tekst: () => 'Gennemfør en eksamenssimulering' },
  gentag: { emoji: '🔁', n: 5, tekst: (m) => `Klar ${m.n} gentagelser` },
  koncept: { emoji: '📖', n: 3, tekst: (m) => `Læs ${m.n} nye koncepter til ende` },
};

function rng(seed) {
  let h = 1779033703 ^ seed.length;
  for (const c of seed) {
    h = Math.imul(h ^ c.charCodeAt(0), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// info: { weakest: spor-id, dueCount, freshLeft }. Returnerer true, hvis der blev lavet nye.
export function ensureMissions(state, day, { weakest, dueCount, freshLeft }) {
  if (state.missions?.day === day) return false;
  const rand = rng(day);
  const possible = (id) => (id !== 'svag' || weakest) && (id !== 'gentag' || dueCount >= 2) && (id !== 'koncept' || freshLeft >= 3);
  const chosen = [];
  for (const pool of POOLS) {
    let options = pool.filter(possible);
    if (!options.length) options = POOLS[0].filter((id) => !chosen.includes(id));
    chosen.push(options[Math.floor(rand() * options.length)]);
  }
  state.missions = {
    day,
    bonus: false,
    shown: false,
    list: chosen.map((id) => ({
      id,
      n: id === 'gentag' ? Math.min(DEF.gentag.n, dueCount) : DEF[id].n,
      have: 0,
      ...(id === 'svag' ? { arg: weakest } : {}),
    })),
  };
  return true;
}

export const missionEmoji = (m) => DEF[m.id].emoji;
export const missionText = (m, label) => DEF[m.id].tekst(m, label);
export const isDone = (m) => m.have >= m.n;
export const allMissionsDone = (state) => !!state.missions?.list.every(isDone);

function advance(m, ev) {
  const svar = ev.kind === 'svar';
  const ok = svar && ev.grade > 1;
  switch (m.id) {
    case 'sikker': return m.have + Number(ok && ev.confidence === 'sikker');
    case 'combo': return svar ? Math.max(m.have, ev.combo) : m.have;
    case 'perfekt': return m.have + Number(svar && ev.grade === 4 && ['raekkefolge', 'sammenlign'].includes(ev.type));
    case 'forklar': return m.have + Number(svar && ev.type === 'forklar' && ev.grade >= 3);
    case 'svag': return m.have + Number(ok && ev.spor === m.arg);
    case 'sim': return m.have + Number(ev.kind === 'sim');
    case 'gentag': return m.have + Number(ok && ['review', 'retry', 'bonus'].includes(ev.mode));
    case 'koncept': return m.have + Number(ev.kind === 'koncept');
    default: return m.have;
  }
}

// ev: { kind: 'svar', grade, confidence, type, spor, mode, combo } | { kind: 'koncept' } | { kind: 'sim' }
// Returnerer { done: [klarede missioner], moved: mission der rykkede sig uden at blive klaret }.
export function bump(state, ev) {
  const done = [];
  let moved = null;
  for (const m of state.missions?.list ?? []) {
    if (isDone(m)) continue;
    const before = m.have;
    m.have = Math.min(m.n, advance(m, ev));
    if (isDone(m)) done.push(m);
    else if (m.have > before) moved ??= m;
  }
  return { done, moved };
}
