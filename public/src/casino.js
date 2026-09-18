// Gambling i feedet: Leth-mønter, jackpot-spørgsmål, lykkehjul, skrabelod, indsats og dobbelt-eller-intet.
// Mønter kan KUN tjenes ved at lære og kan ikke købes. Alle odds vises, og huset har en
// ægte fordel: i det lange løb taber man mønter på at spille (ligesom i et rigtigt casino).
// Hjul og skrabelod er widgets, så de kan ligge direkte i et feed-kort og på mønt-siden.

import { RARITIES } from './cases.js';
import { sfx, tone } from './sfx.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const coin = (n) => `<span class="coins-amt"><i class="coin"></i>${Number(n).toLocaleString('da-DK')}</span>`;
const pct = (x, d = 0) => `${(x * 100).toFixed(d).replace('.', ',')} %`;
const weighted = (list, key = 'w') => {
  let r = Math.random() * list.reduce((a, x) => a + x[key], 0);
  return list.find((x) => (r -= x[key]) < 0) ?? list[0];
};

export const PRISER = { case: 60, premium: 400, skrab: 25, spin: 40 };

// ---------- Salg og trade-up ----------

const BASIS = { milspec: 10, restricted: 40, classified: 150, covert: 500, gold: 2000 };
const SLID = { 'Factory New': 1.2, 'Minimal Wear': 1.1, 'Field-Tested': 1, 'Well-Worn': 0.9, 'Battle-Scarred': 0.8 };

export const sellValue = (item) => Math.round(BASIS[item.rarity] * (SLID[item.wear] ?? 1) * (item.stattrak ? 1.5 : 1));
const nextRarity = (id) => RARITIES[RARITIES.findIndex((r) => r.id === id) + 1]?.id ?? null;

// ---------- Jackpot-spørgsmål ----------

export const JACKPOT_BASIS = 10;
const JACKPOT = [{ mult: 2, w: 50 }, { mult: 3, w: 28 }, { mult: 5, w: 16 }, { mult: 10, w: 6 }];
export const rollJackpotMult = () => weighted(JACKPOT).mult;

// Banner øverst på et quizkort. Hjulet ruller først, når kortet bliver vist (se rollJackpot).
export function decorateJackpot(node, mult) {
  node.classList.add('jackpot-card');
  const banner = document.createElement('div');
  banner.className = 'jackpot';
  banner.dataset.mult = mult;
  banner.innerHTML = `<span class="jp-label">Jackpot-spørgsmål</span><span class="jp-reel"><b>×?</b></span><span class="jp-sub">Svar rigtigt: ${coin(JACKPOT_BASIS)} × <i>?</i></span>`;
  const meta = node.querySelector('.meta');
  (meta ?? node.querySelector('.card-inner')).after(banner);
}

export function rollJackpot(node) {
  const banner = node.querySelector('.jackpot:not(.rolled)');
  if (!banner) return;
  banner.classList.add('rolled');
  const mult = Number(banner.dataset.mult);
  const b = banner.querySelector('.jp-reel b');
  const seq = [2, 3, 5, 10];
  let i = 0;
  let delay = 50;
  const step = () => {
    if (delay < 260) {
      b.textContent = `×${seq[i++ % seq.length]}`;
      sfx.tick(1 + (i % 4) * 0.08);
      delay *= 1.18;
      setTimeout(step, delay);
    } else {
      b.textContent = `×${mult}`;
      banner.querySelector('.jp-sub i').textContent = mult;
      banner.classList.add(mult >= 5 ? 'big' : 'landed');
      mult >= 5 ? sfx.fanfare() : sfx.correct(4);
    }
  };
  step();
}

// ---------- Skrabelod ----------

export const SKRAB = [
  { sym: '💎', coins: 500, p: 0.01 },
  { sym: '7️⃣', coins: 150, p: 0.03 },
  { sym: '🔔', coins: 60, p: 0.08 },
  { sym: '🍋', coins: 35, p: 0.14 },
  { sym: '🍒', coins: 15, p: 0.22 },
];
const skrabRtp = SKRAB.reduce((a, s) => a + s.p * s.coins, 0) / PRISER.skrab;

function skrabelod() {
  let r = Math.random();
  const win = SKRAB.find((s) => (r -= s.p) < 0) ?? null;
  // 9 felter: vindersymbolet præcis 3 gange, alle andre højst 2 gange.
  const cells = win ? [win.sym, win.sym, win.sym] : [];
  const pool = SKRAB.map((s) => s.sym).filter((s) => s !== win?.sym);
  const count = {};
  while (cells.length < 9) {
    const s = pool[Math.floor(Math.random() * pool.length)];
    if ((count[s] ?? 0) >= 2) continue;
    count[s] = (count[s] ?? 0) + 1;
    cells.push(s);
  }
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return { win, cells };
}

// Et allerede betalt lod. onDone(win) kaldes, når det er skrabet.
export function skrabWidget(api, { onDone } = {}) {
  const { win, cells } = skrabelod();
  const root = document.createElement('div');
  root.className = 'skrab-widget';
  root.innerHTML = `
    <div class="skrab-card">
      <div class="skrab-grid">${cells.map((s) => `<span>${s}</span>`).join('')}</div>
      <canvas class="skrab-cover"></canvas>
    </div>
    <div class="skrab-prizes">${SKRAB.map((s) => `<span>${s.sym}×3 = ${s.coins}</span>`).join('')}</div>
    <div class="skrab-result" hidden></div>
    <button class="ghost-light" data-act="reveal">Afslør alt</button>`;

  const canvas = root.querySelector('canvas');
  const card = root.querySelector('.skrab-card');
  let g = null;
  let done = false;

  // Tegn sølvlaget, når kortet har fået en størrelse (det kan være bygget, før det kom i DOM'en).
  const paint = () => {
    const { width, height } = card.getBoundingClientRect();
    if (!width || g) return !!g;
    const dpr = devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    g = canvas.getContext('2d');
    g.scale(dpr, dpr);
    const grad = g.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#cfcfdb');
    grad.addColorStop(0.5, '#f5f5fa');
    grad.addColorStop(1, '#b0b0c2');
    g.fillStyle = grad;
    g.fillRect(0, 0, width, height);
    g.fillStyle = '#8a8799';
    g.font = '800 18px "Plus Jakarta Sans", system-ui, sans-serif';
    g.textAlign = 'center';
    g.fillText('SKRAB HER', width / 2, height / 2 + 6);
    g.globalCompositeOperation = 'destination-out';
    return true;
  };
  const ro = new ResizeObserver(() => { if (paint()) ro.disconnect(); });
  ro.observe(card);

  let strokes = 0;
  let lastSound = 0;
  const scratch = (e) => {
    if (done || !paint()) return;
    const r = canvas.getBoundingClientRect();
    g.beginPath();
    g.arc(e.clientX - r.left, e.clientY - r.top, 22, 0, Math.PI * 2);
    g.fill();
    const now = performance.now();
    if (now - lastSound > 60) { lastSound = now; tone(2200 + Math.random() * 800, { type: 'triangle', dur: 0.03, vol: 0.015 }); }
    if (++strokes % 10 === 0 && cleared() > 0.5) finish();
  };
  const cleared = () => {
    const data = g.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let n = 0;
    for (let i = 3; i < data.length; i += 4 * 32) { n++; if (data[i] === 0) clear++; }
    return clear / n;
  };
  let down = false;
  canvas.addEventListener('pointerdown', (e) => { down = true; canvas.setPointerCapture(e.pointerId); scratch(e); });
  canvas.addEventListener('pointermove', (e) => { if (down) scratch(e); });
  canvas.addEventListener('pointerup', () => { down = false; });
  canvas.addEventListener('pointercancel', () => { down = false; });

  const finish = () => {
    if (done) return;
    done = true;
    canvas.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' }).onfinish = () => (canvas.hidden = true);
    root.querySelector('[data-act="reveal"]').remove();
    const res = root.querySelector('.skrab-result');
    res.hidden = false;
    if (win) {
      root.querySelectorAll('.skrab-grid span').forEach((s) => s.textContent === win.sym && s.classList.add('hit'));
      api.grantCoins(win.coins, 'skrab');
      res.innerHTML = `<b class="win">${win.sym} Tre ens! +${win.coins} mønter</b>`;
      if (win.coins >= 150) { api.confetti(api.host, 180); sfx.fanfare(); } else sfx.correct(6);
      res.append(doubleOrNothing(api, win.coins));
    } else {
      res.innerHTML = '<b class="lose">Ingen gevinst denne gang</b>';
      sfx.wrong();
    }
    api.updateHud();
    onDone?.(win);
  };
  root.querySelector('[data-act="reveal"]').addEventListener('click', finish);
  return root;
}

// ---------- Lykkehjul (feltets størrelse = den ægte sandsynlighed) ----------

export const HJUL = [
  { label: '10', coins: 10, w: 22, farve: '#5851DB' },
  { label: '💀', w: 14, farve: '#2b2540' },
  { label: '25', coins: 25, w: 18, farve: '#833AB4' },
  { label: '🧊', frys: 1, w: 8, farve: '#36D1DC' },
  { label: '50', coins: 50, w: 12, farve: '#C13584' },
  { label: '⚡×2', boost: { mult: 2, min: 15 }, w: 8, farve: '#F77737' },
  { label: '100', coins: 100, w: 8, farve: '#E1306C' },
  { label: '📦', case: true, w: 6, farve: '#e4ae39' },
  { label: '250', coins: 250, w: 3, farve: '#FD1D1D' },
  { label: '1000', coins: 1000, w: 1, farve: '#ffd66b' },
];
const HJUL_SUM = HJUL.reduce((a, s) => a + s.w, 0);
const hjulRtp = HJUL.reduce((a, s) => a + (s.coins ?? 0) * s.w, 0) / HJUL_SUM / PRISER.spin;
{
  let a = 0;
  for (const s of HJUL) { s.a0 = a; a += (s.w / HJUL_SUM) * 360; s.a1 = a; }
}

function wheelSvg(size = 240) {
  const c = size / 2;
  const r = c - 6;
  const rad = (d) => ((d - 90) * Math.PI) / 180;
  const parts = HJUL.map((s) => {
    const [x0, y0] = [c + r * Math.cos(rad(s.a0)), c + r * Math.sin(rad(s.a0))];
    const [x1, y1] = [c + r * Math.cos(rad(s.a1)), c + r * Math.sin(rad(s.a1))];
    const mid = (s.a0 + s.a1) / 2;
    const big = s.a1 - s.a0 > 180 ? 1 : 0;
    const [tx, ty] = [c + r * 0.7 * Math.cos(rad(mid)), c + r * 0.7 * Math.sin(rad(mid))];
    return `<path d="M${c},${c} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${big} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z" fill="${s.farve}" stroke="#140f24" stroke-width="1.5"/>
      <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" font-size="${s.w >= 6 ? 14 : 8}" font-weight="800" fill="${s.label === '1000' ? '#1b1405' : '#fff'}" text-anchor="middle" dominant-baseline="central" transform="rotate(${mid.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)})">${s.label}</text>`;
  });
  return `<svg class="wheel-svg" viewBox="0 0 ${size} ${size}">
    <circle cx="${c}" cy="${c}" r="${r + 4}" fill="#140f24"/>
    <g class="wheel-rot" style="transform-origin:${c}px ${c}px">${parts.join('')}</g>
    <circle cx="${c}" cy="${c}" r="22" fill="#140f24" stroke="#e4ae39" stroke-width="3"/>
    <text x="${c}" y="${c}" font-size="18" text-anchor="middle" dominant-baseline="central">🎰</text>
  </svg>`;
}

// free: () => boolean (tjekkes ved klik). onSpin() kaldes, når et gratis spin bruges. onDone(seg) efter resultatet.
export function wheelWidget(api, { free = () => false, onSpin, onDone, videre = 'Videre' } = {}) {
  const root = document.createElement('div');
  root.className = 'wheel-widget';
  const label = () => (free() ? 'Spin gratis' : `Spin · ${coin(PRISER.spin)}`);
  root.innerHTML = `
    <div class="wheel-wrap"><div class="wheel-pointer"></div>${wheelSvg()}</div>
    <div class="wheel-result" hidden></div>
    <button class="case-btn wide" data-act="spin">${label()}</button>
    <p class="cas-fine">Feltets størrelse er den ægte chance · jackpot ${pct(1 / HJUL_SUM)} · tilbagebetaling ~${pct(hjulRtp)}</p>`;
  const btn = root.querySelector('[data-act="spin"]');
  let state = 'klar';
  btn.addEventListener('click', () => {
    if (state === 'færdig') return onDone?.(null, true);
    if (state !== 'klar') return;
    const gratis = free();
    if (!gratis && !api.spend(PRISER.spin)) return;
    if (gratis) onSpin?.();
    state = 'drejer';
    btn.disabled = true;
    btn.textContent = 'Hjulet drejer …';
    spin(root, api, (seg) => {
      state = 'færdig';
      btn.disabled = false;
      btn.textContent = videre;
      onDone?.(seg, false);
    });
  });
  return root;
}

function spin(root, api, after) {
  const { state } = api;
  const seg = weighted(HJUL);
  const inside = seg.a0 + (0.15 + Math.random() * 0.7) * (seg.a1 - seg.a0);
  const rot = root.querySelector('.wheel-rot');
  const anim = rot.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${360 * 6 + (360 - inside)}deg)` }], { duration: 5000, easing: 'cubic-bezier(0.12, 0.7, 0.1, 1)', fill: 'forwards' });

  let last = -1;
  const loop = () => {
    const m = new DOMMatrixReadOnly(getComputedStyle(rot).transform);
    const under = (360 - (((Math.atan2(m.b, m.a) * 180) / Math.PI + 360) % 360)) % 360;
    const idx = HJUL.findIndex((s) => under >= s.a0 && under < s.a1);
    if (idx !== last) { last = idx; sfx.tick(1 + (idx % 3) * 0.06); }
    if (anim.playState === 'running') requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  anim.onfinish = () => {
    const box = root.querySelector('.wheel-result');
    let text = 'Ingenting denne gang';
    if (seg.coins) { api.grantCoins(seg.coins, 'hjul'); text = `+${seg.coins} mønter`; }
    if (seg.frys) { state.streak.freezes = Math.min(2, state.streak.freezes + 1); text = '+1 streak-frys'; }
    if (seg.boost) {
      const active = state.boost?.until > Date.now();
      state.boost = { mult: Math.max(seg.boost.mult, active ? state.boost.mult : 1), until: Math.max(Date.now(), active ? state.boost.until : 0) + seg.boost.min * 60_000 };
      text = `XP ×${seg.boost.mult} i ${seg.boost.min} min`;
    }
    if (seg.case) { state.cases = (state.cases ?? 0) + 1; text = 'En gratis case i inventaret'; }
    api.save();
    api.updateHud();
    if (seg.coins >= 250) { api.confetti(api.host, 200); sfx.fanfare(); } else if (seg.w < 14) sfx.correct(5); else if (seg.coins) sfx.correct(2); else sfx.wrong();
    box.hidden = false;
    box.innerHTML = `<b>${text}</b>`;
    if (seg.coins) box.append(doubleOrNothing(api, seg.coins));
    after(seg);
  };
}

// ---------- Dobbelt eller intet ----------

function doubleOrNothing(api, amount) {
  const wrap = document.createElement('div');
  wrap.className = 'don';
  wrap.innerHTML = `
    <p>Dobbelt eller intet? Gæt kortets farve</p>
    <div class="don-row">
      <button class="don-btn red" data-c="r">♥ Rød</button>
      <button class="don-btn black" data-c="s">♠ Sort</button>
    </div>
    <button class="ghost-light" data-c="nej">Behold ${amount}</button>`;
  wrap.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    e.stopPropagation();
    if (b.dataset.c === 'nej') return wrap.remove();
    const card = Math.random() < 0.5 ? 'r' : 's';
    const won = card === b.dataset.c;
    if (won) api.grantCoins(amount, 'dobbelt');
    else api.spend(Math.min(amount, api.state.coins), true);
    wrap.innerHTML = `<div class="don-card ${card === 'r' ? 'red' : 'black'}">${card === 'r' ? '♥' : '♠'}</div>
      <p class="don-res ${won ? 'good' : 'bad'}">${won ? `Fordoblet! +${amount}` : `Væk. −${amount}`}</p>`;
    won ? sfx.fanfare() : sfx.wrong();
    api.updateHud();
  });
  return wrap;
}

// ---------- Feed-kort ----------

function casinoCard(cls, html) {
  const node = document.createElement('section');
  node.className = `card type-casino ${cls}`;
  node.innerHTML = `<div class="card-inner center">${html}</div>`;
  return node;
}

const saldo = (api) => `<p class="bet-balance">Saldo ${coin(api.state.coins)}</p>`;

// kind: 'combo' | 'maal' (gratis) eller 'tilbud' (koster mønter)
export function renderSkrabCard(api, kind, scrollNext) {
  const titel = { combo: '5 rigtige i træk!', maal: 'Dagens mål er nået!' }[kind];
  const node = casinoCard('type-skrab', `
    <p class="case-kicker">${titel ?? 'Tilbud i feedet'}</p>
    <h2 class="hook">${titel ? 'Et gratis skrabelod' : 'Skrabelod'}</h2>
    <p class="sub">Tre ens symboler vinder. Op til ${coin(500)}.</p>
    <div class="cas-slot" data-slot></div>
    ${titel ? '' : `${saldo(api)}<button class="case-btn" data-act="buy">Køb lod · ${coin(PRISER.skrab)}</button>`}
    <button class="ghost-light" data-act="skip">${titel ? 'Gem det ikke – videre' : 'Nej tak, videre'}</button>`);
  const slot = node.querySelector('[data-slot]');
  const mount = () => {
    node.querySelector('[data-act="buy"]')?.remove();
    node.querySelector('.bet-balance')?.remove();
    const skip = node.querySelector('[data-act="skip"]');
    skip.hidden = true;
    slot.replaceChildren(skrabWidget(api, { onDone: () => { skip.hidden = false; skip.textContent = 'Videre ↓'; } }));
  };
  if (titel) mount();
  node.querySelector('[data-act="buy"]')?.addEventListener('click', () => api.spend(PRISER.skrab) && mount());
  node.querySelector('[data-act="skip"]').addEventListener('click', scrollNext);
  return node;
}

// kind: 'combo' (gratis), 'maal' (dagens gratis spin) eller 'tilbud' (koster mønter)
export function renderWheelCard(api, kind, scrollNext) {
  const titel = { combo: '5 rigtige i træk!', maal: 'Dagens mål er nået!' }[kind];
  let used = false;
  const node = casinoCard('type-hjul', `
    <p class="case-kicker">${titel ?? 'Tilbud i feedet'}</p>
    <h2 class="hook">${titel ? 'Gratis spin på lykkehjulet' : 'Prøv lykkehjulet'}</h2>
    <div data-slot></div>
    <button class="ghost-light" data-act="skip">Nej tak, videre</button>`);
  const skip = node.querySelector('[data-act="skip"]');
  node.querySelector('[data-slot]').append(wheelWidget(api, {
    free: () => !used && (kind === 'combo' || (kind === 'maal' && api.freeSpinReady())),
    onSpin: () => { used = true; if (kind === 'maal') api.useFreeSpin(); },
    videre: 'Videre ↓',
    onDone: (seg, klik) => { skip.hidden = true; if (klik) scrollNext(); },
  }));
  skip.addEventListener('click', scrollNext);
  return node;
}

export function renderBetCard(api, scrollNext) {
  const { state } = api;
  const stakes = [10, 25, 50, Math.min(state.coins, 200)].filter((s, i, a) => s <= state.coins && a.indexOf(s) === i);
  const node = casinoCard('type-bet', `
    <div class="bet-chips">🎰</div>
    <p class="case-kicker">Dobbelt eller intet</p>
    <h2 class="hook">Sats på dit næste svar</h2>
    <p class="sub">Rigtigt på næste spørgsmål: indsatsen dobbelt tilbage. Forkert: den er væk.</p>
    ${saldo(api)}
    <div class="bet-row">${stakes.map((s, i) => {
      const allIn = i === stakes.length - 1 && s > 50;
      return `<button class="bet-btn ${allIn ? 'allin' : ''}" data-s="${s}">${allIn ? `All in ${s}` : s}</button>`;
    }).join('')}</div>
    <button class="ghost-light" data-act="skip">Nej tak, videre</button>`);
  const inner = node.querySelector('.card-inner');
  node.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.act === 'skip' || b.dataset.act === 'go') return scrollNext();
    const stake = Number(b.dataset.s);
    if (!stake || state.bet || !api.spend(stake, true)) return;
    state.bet = { stake };
    api.save();
    api.updateHud();
    sfx.tick(1.4);
    inner.innerHTML = `<div class="bet-chips locked">🎲</div><h2 class="hook">Indsats på ${coin(stake)} er låst</h2>
      <p class="sub">Næste spørgsmål afgør det. Gevinst: ${coin(stake * 2)}</p><button class="case-btn" data-act="go">Kom an ↓</button>`;
  });
  return node;
}

// ---------- Mønt-siden (åbnes fra mønt-pillen): saldo, inventar, salg og trade-up ----------

export function renderCasino(el, api) {
  const { state } = api;
  const inv = state.inventory ?? [];
  const today = state.coinLog?.[new Date().toLocaleDateString('sv-SE')] ?? { ind: 0, ud: 0 };
  const counts = Object.fromEntries(RARITIES.map((r) => [r.id, inv.filter((x) => x.rarity === r.id).length]));

  el.innerHTML = `
    <section class="cas-hero">
      <small>Din saldo</small>
      <div class="cas-balance">${coin(state.coins)}</div>
      <div class="cas-today"><span>I dag optjent <b>+${today.ind}</b></span><span>I dag spillet <b>−${today.ud}</b></span></div>
      <p>Mønter tjenes ved at lære. Lykkehjul, skrabelodder, indsatser og jackpot-spørgsmål dukker op i feedet.</p>
    </section>

    <section class="cas-card wheel-card">
      <header><h3>Lykkehjulet</h3><span>${api.freeSpinReady() ? 'Dagens gratis spin er klar' : 'Gratis spin, når dagens mål er nået'}</span></header>
      <div data-wheel></div>
    </section>

    <div class="cas-grid">
      <button class="cas-tile skrab" data-act="skrab"><span class="t-emoji">🎟️</span><b>Skrabelod</b><small>3 ens vinder</small><em>${coin(PRISER.skrab)}</em></button>
      <button class="cas-tile" data-act="case"><span class="t-emoji">📦</span><b>Leths Case</b><small>Skins, XP, boost, frys</small><em>${coin(PRISER.case)}</em></button>
      <button class="cas-tile premium" data-act="premium"><span class="t-emoji">💼</span><b>Premium Case</b><small>Mindst Classified</small><em>${coin(PRISER.premium)}</em></button>
      <button class="cas-tile saved" data-act="saved" ${state.cases ? '' : 'disabled'}><span class="t-emoji">🎒</span><b>Gemte cases</b><small>${state.cases ? `${state.cases} klar` : 'Ingen lige nu'}</small><em>Gratis</em></button>
    </div>

    <section class="cas-card inventory">
      <header><h3>Inventar</h3><span>${inv.length} skins · værdi ${coin(inv.reduce((a, x) => a + sellValue(x), 0))}</span></header>
      <div class="rarity-row">${RARITIES.map((r) => `<span style="--r:${r.farve}"><b>${counts[r.id]}</b>${r.navn}</span>`).join('')}</div>
      <div class="tradeups">${RARITIES.slice(0, -1).map((r) => {
        const next = RARITIES.find((x) => x.id === nextRarity(r.id));
        return `<button class="tradeup" data-trade="${r.id}" ${counts[r.id] >= 5 ? '' : 'disabled'} style="--r:${r.farve};--n:${next.farve}"><span>5 × ${r.navn}</span><i>→</i><span>1 × ${next.navn}</span></button>`;
      }).join('')}</div>
      ${counts.milspec ? `<button class="ghost-light wide" data-act="sell-milspec">Sælg alle Mil-Spec for ${coin(inv.filter((x) => x.rarity === 'milspec').reduce((a, x) => a + sellValue(x), 0))}</button>` : ''}
      <div class="skins">${inv.map((x, i) => ({ x, i })).reverse().slice(0, 30).map(({ x, i }) => {
        const r = RARITIES.find((y) => y.id === x.rarity);
        return `<button class="skin" data-i="${i}" style="--r:${r.farve}"><span>${x.emoji}</span><b>${x.stattrak ? 'ST™ ' : ''}${esc(x.navn)}</b><small>${coin(sellValue(x))}</small></button>`;
      }).join('') || '<p class="empty">Åbn en case for dit første skin.</p>'}</div>
    </section>

    <section class="cas-card fair">
      <h3>Fair play</h3>
      <p>Skrabelod: ${SKRAB.map((s) => `${s.sym} ${pct(s.p)}`).join(' · ')} · tilbagebetaling ~${pct(skrabRtp)}.</p>
      <p>Jackpot-spørgsmål: ×2 ${pct(0.5)} · ×3 ${pct(0.28)} · ×5 ${pct(0.16)} · ×10 ${pct(0.06)}. Forkert svar koster intet.</p>
      <p>Huset vinder i det lange løb – derfor kan mønter aldrig købes for rigtige penge.</p>
    </section>`;

  const rerender = () => renderCasino(el, api);
  const on = (sel, fn) => el.querySelector(sel)?.addEventListener('click', fn);

  el.querySelector('[data-wheel]').append(wheelWidget(api, {
    free: () => api.freeSpinReady(),
    onSpin: () => api.useFreeSpin(),
    onDone: (seg, klik) => klik && rerender(),
  }));

  on('[data-act="skrab"]', () => {
    if (!api.spend(PRISER.skrab)) return;
    const overlay = document.createElement('div');
    overlay.className = 'case-overlay skrab-overlay';
    overlay.innerHTML = '<div class="case-head"><small>Skrab 3 ens</small><h2>🎟️ Skrabelod</h2></div><div data-slot></div><button class="case-btn" data-act="luk" hidden>Luk</button>';
    const luk = overlay.querySelector('[data-act="luk"]');
    overlay.querySelector('[data-slot]').append(skrabWidget(api, { onDone: () => (luk.hidden = false) }));
    luk.addEventListener('click', () => { overlay.remove(); rerender(); });
    api.host.append(overlay);
  });
  on('[data-act="case"]', () => { if (api.spend(PRISER.case)) api.openCase('butik', null, rerender); });
  on('[data-act="premium"]', () => { if (api.spend(PRISER.premium)) api.openCase('premium', 'classified', rerender); });
  on('[data-act="saved"]', () => {
    if (!state.cases) return;
    state.cases--;
    api.save();
    api.openCase('gemt', null, rerender);
  });
  on('[data-act="sell-milspec"]', () => {
    const sold = inv.filter((x) => x.rarity === 'milspec');
    const sum = sold.reduce((a, x) => a + sellValue(x), 0);
    state.inventory = inv.filter((x) => x.rarity !== 'milspec');
    api.grantCoins(sum, 'salg');
    api.toast(`Solgt ${sold.length} skins for ${sum} mønter`);
    rerender();
  });
  el.querySelectorAll('[data-trade]').forEach((b) => b.addEventListener('click', () => {
    const from = b.dataset.trade;
    const picks = inv.map((x, i) => ({ x, i })).filter(({ x }) => x.rarity === from)
      .sort((a, c) => Number(a.x.stattrak) - Number(c.x.stattrak) || sellValue(a.x) - sellValue(c.x)).slice(0, 5);
    if (picks.length < 5) return;
    const drop = new Set(picks.map((p) => p.i));
    state.inventory = inv.filter((_, i) => !drop.has(i));
    api.save();
    api.openCase('tradeup', nextRarity(from), rerender);
  }));
  el.querySelectorAll('.skin[data-i]').forEach((b) => b.addEventListener('click', () => {
    const x = inv[Number(b.dataset.i)];
    const r = RARITIES.find((y) => y.id === x.rarity);
    api.openSheet(`
      <div class="skin-sheet" style="--r:${r.farve}">
        <div class="loot-glow"><span>${x.emoji}</span></div>
        <div class="loot-rarity">${r.navn}</div>
        <h2>${x.stattrak ? 'StatTrak™ ' : ''}${esc(x.navn)}</h2>
        <p class="hint">${esc(x.wear)} · float ${x.float.toFixed(4).replace('.', ',')} · fået ${esc(x.dag ?? '')}</p>
        <div class="sheet-actions"><button class="case-btn" data-sell>Sælg for ${coin(sellValue(x))}</button></div>
      </div>`, (root) => root.querySelector('[data-sell]').addEventListener('click', () => {
      const idx = state.inventory.indexOf(x);
      if (idx < 0) return;
      state.inventory.splice(idx, 1);
      api.grantCoins(sellValue(x), 'salg');
      api.closeSheet();
      sfx.correct(4);
      rerender();
    }));
  }));
}
