const KEY = 'leths-super-app:sw3sys:v1';

const fresh = () => ({
  items: {},          // kort-id -> FSRS-tilstand
  seen: {},           // kort-id -> tidspunkt første gang vist
  saved: {},          // kort-id -> true
  interest: {},       // spor-id -> vægt (1 = neutral)
  explanations: {},   // kort-id -> brugerens egen forklaring
  examDate: null,     // 'YYYY-MM-DD'
  simHistory: [],     // [{ spor, dag, disposition, svar }]
  log: {},            // 'YYYY-MM-DD' -> { n, ok, xp, typer: {type: {n, ok}}, pakker: {...} }
  readyHist: {},      // 'YYYY-MM-DD' -> SW3SYS-parathed (0-1)
  inventory: [],      // skins fra cases
  cases: 0,           // gemte, uåbnede cases
  boost: null,        // { mult, until }
  xp: 0,
  combo: 0,
  bestCombo: 0,
  goal: 10,
  streak: { count: 0, lastDay: null, freezes: 0 },
  daily: { day: null, answered: 0, goalShown: false },
  missions: null,     // { day, list: [{ id, n, have, arg? }], bonus, shown }
  lyd: true,
});

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch {}
  return fresh();
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

export function reset() {
  try { localStorage.removeItem(KEY); } catch {}
}

export const dayKey = (d = new Date()) => d.toLocaleDateString('sv-SE');

export function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86_400_000);
}
