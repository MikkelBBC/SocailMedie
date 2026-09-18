// CS:GO-inspirerede cases. Kun XP, streak-frys og samleobjekter – ingen rigtige penge.
// Sandsynlighederne er de officielt oplyste CS:GO-odds.
// Belønningen udløses kun af læring (combos, dagens mål, missioner, level, perfekte sammenligninger og simuleringer).

import { sfx } from './sfx.js';

export const RARITIES = [
  { id: 'milspec', navn: 'Mil-Spec', farve: '#4b69ff', p: 0.7992 },
  { id: 'restricted', navn: 'Restricted', farve: '#8847ff', p: 0.1598 },
  { id: 'classified', navn: 'Classified', farve: '#d32ce6', p: 0.032 },
  { id: 'covert', navn: 'Covert', farve: '#eb4b4b', p: 0.0064 },
  { id: 'gold', navn: '★ Rare Special', farve: '#e4ae39', p: 0.0026 },
];
const RARITY = Object.fromEntries(RARITIES.map((r) => [r.id, r]));

const SKINS = {
  milspec: [
    ['🔫', 'P250 | Race Condition'], ['🔫', 'Glock-18 | Null Pointer'], ['🔫', 'MP9 | Segfault'],
    ['🔫', 'Nova | Off-by-One'], ['🔫', 'UMP-45 | Busy Wait'], ['🔫', 'FAMAS | Stack Overflow'],
    ['🔫', 'Tec-9 | Dangling Reference'], ['🔫', 'MAC-10 | Short Read'],
  ],
  restricted: [
    ['🎯', 'M4A1-S | Mutex'], ['🎯', 'AK-47 | Page Fault'], ['🎯', 'USP-S | Copy-on-Write'],
    ['🎯', 'Galil AR | Spurious Wakeup'], ['🎯', 'P90 | Round Robin'],
  ],
  classified: [
    ['🐉', 'AWP | Deadlock Dragon'], ['🦅', 'Desert Eagle | Kernel Panic'], ['⚡', 'M4A4 | Dijkstra'],
    ['🧠', 'SSG 08 | Hypercorrection'],
  ],
  covert: [
    ['🔥', 'AWP | Dopamin Lore'], ['💀', "AK-47 | Amdahl's Law"], ['🌌', 'M4A1-S | Prediction Error'],
  ],
  gold: [
    ['🔪', '★ Karambit | RAII'], ['🦋', '★ Butterfly Knife | FSRS'], ['🗡️', '★ M9 Bayonet | Successive Relearning'],
  ],
};

const WEAR = [
  [0.07, 'Factory New'], [0.15, 'Minimal Wear'], [0.38, 'Field-Tested'], [0.45, 'Well-Worn'], [1, 'Battle-Scarred'],
];

// Odds fra og med minRarity (fx bonus-casen fra missioner), normaliseret så de summer til 1.
function oddsFor(minRarity = null) {
  const pool = RARITIES.slice(Math.max(0, RARITIES.findIndex((r) => r.id === minRarity)));
  const sum = pool.reduce((a, r) => a + r.p, 0);
  return pool.map((r) => ({ ...r, p: r.p / sum }));
}

function rollRarity(odds, rnd = Math.random()) {
  let acc = 0;
  for (const r of odds) {
    acc += r.p;
    if (rnd < acc) return r.id;
  }
  return odds[0].id;
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Hvad skinnet giver. freezes = antal streak-frys man har nu.
function rewardFor(rarity, freezes) {
  switch (rarity) {
    case 'milspec': return { xp: 20 + Math.floor(Math.random() * 6) * 5 };
    case 'restricted': return freezes < 2 && Math.random() < 0.4 ? { xp: 40, frys: 1 } : { xp: 90 };
    case 'classified': return { xp: 175, boost: { mult: 2, min: 15 } };
    case 'covert': return { xp: 400, boost: { mult: 2, min: 30 } };
    default: return { xp: 1000, boost: { mult: 3, min: 60 } };
  }
}

export function rollItem(freezes = 0, minRarity = null) {
  const rarity = rollRarity(oddsFor(minRarity));
  const [emoji, navn] = pick(SKINS[rarity]);
  const float = Math.random();
  const wear = WEAR.find(([max]) => float <= max)[1];
  return {
    rarity, emoji, navn, wear,
    float: Number(float.toFixed(4)),
    stattrak: Math.random() < 0.1,
    reward: rewardFor(rarity, freezes),
  };
}

export const rewardText = (r) => [
  `+${r.xp} XP`,
  r.frys ? '🧊 +1 streak-frys' : '',
  r.boost ? `⚡ XP ×${r.boost.mult} i ${r.boost.min} min` : '',
].filter(Boolean).join(' · ');

// ---------- Åbningsanimation ----------

export const CASE_KILDER = {
  combo: '5 rigtige i træk', maal: 'Dagens mål nået', perfekt: 'Perfekt runde', sim: 'Stærk eksamenssimulering',
  mission: 'Mission klaret', bonus: 'Alle dagens missioner · mindst Restricted', level: 'Level up',
  butik: 'Købt i casinoet', premium: 'Premium Case · mindst Classified', tradeup: 'Trade-up kontrakt', gemt: 'Gemt case',
};

const TILE = 112;
const GAP = 6;
const WIN_INDEX = 52;

const tileHtml = (it) => {
  const r = RARITY[it.rarity];
  return `<div class="reel-tile" style="--r:${r.farve}"><span>${it.emoji}</span><small>${it.navn.split(' | ')[1] ?? it.navn}</small></div>`;
};

/**
 * Viser case-overlayet i `host`. Kalder onWin(item), når hjulet står stille,
 * så belønningen gives præcis når brugeren ser den.
 */
export function openCase(host, { kilde = 'combo', freezes = 0, minRarity = null, onWin, onClose }) {
  const win = rollItem(freezes, minRarity);
  const strip = Array.from({ length: WIN_INDEX + 8 }, (_, i) => (i === WIN_INDEX ? win : rollItem(freezes)));
  const kildeTekst = CASE_KILDER[kilde] ?? 'Belønning';

  const overlay = document.createElement('div');
  overlay.className = 'case-overlay';
  overlay.innerHTML = `
    <div class="case-head">
      <small>${kildeTekst}</small>
      <h2>📦 Leths Case</h2>
    </div>
    <div class="odds">${oddsFor(minRarity).map((r) => `<span style="--r:${r.farve}">${r.navn} ${(r.p * 100).toFixed(2).replace('.', ',')}%</span>`).join('')}</div>
    <div class="reel-window">
      <div class="reel-marker"></div>
      <div class="reel-strip">${strip.map(tileHtml).join('')}</div>
    </div>
    <div class="case-result" hidden></div>
    <button class="case-btn" data-act="spin">Åbn case</button>`;
  host.append(overlay);

  const stripEl = overlay.querySelector('.reel-strip');
  const btn = overlay.querySelector('[data-act="spin"]');

  btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.textContent = 'Ruller …';
    const windowW = overlay.querySelector('.reel-window').clientWidth;
    const jitter = (Math.random() - 0.5) * (TILE * 0.7);
    const target = -(WIN_INDEX * (TILE + GAP) + TILE / 2 - windowW / 2 + jitter);
    const anim = stripEl.animate(
      [{ transform: 'translateX(0px)' }, { transform: `translateX(${target}px)` }],
      { duration: 6000, easing: 'cubic-bezier(0.08, 0.75, 0.12, 1)', fill: 'forwards' },
    );

    // Tik-lyd og let vibration, hver gang en ny tile passerer markøren.
    let lastTile = -1;
    const loop = () => {
      const m = new DOMMatrixReadOnly(getComputedStyle(stripEl).transform);
      const tileIdx = Math.floor((-m.m41 + windowW / 2) / (TILE + GAP));
      if (tileIdx !== lastTile) {
        lastTile = tileIdx;
        sfx.tick(1 + (tileIdx % 3) * 0.05);
      }
      if (anim.playState === 'running') requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    anim.onfinish = () => {
      const r = RARITY[win.rarity];
      stripEl.children[WIN_INDEX].classList.add('winner');
      onWin?.(win);
      const res = overlay.querySelector('.case-result');
      res.style.setProperty('--r', r.farve);
      res.innerHTML = `
        <div class="loot-glow"><span>${win.emoji}</span></div>
        <div class="loot-rarity">${r.navn}</div>
        <div class="loot-name">${win.stattrak ? 'StatTrak™ ' : ''}${win.navn}</div>
        <div class="loot-wear">${win.wear} · float ${win.float.toFixed(4).replace('.', ',')}</div>
        <div class="loot-reward">${rewardText(win.reward)}</div>`;
      res.hidden = false;
      btn.disabled = false;
      btn.textContent = 'Saml op';
      btn.onclick = () => { overlay.remove(); onClose?.(win); };
      if (['classified', 'covert', 'gold'].includes(win.rarity)) sfx.fanfare();
    };
  }, { once: true });

  return overlay;
}
