// Statistik og grafer. Ren SVG, ingen biblioteker.
// Farver fra den validerede reference-palette: ét blåt hue til mængder
// (sekventiel), to trin af samme hue til »lært/mestret« (ordinal, valideret).

const C = {
  series: '#2a78d6',
  light: '#86b6ef',
  grid: '#e1e0d9',
  axis: '#c3c2b7',
  muted: '#898781',
  ink: '#0b0b0b',
  ink2: '#52514e',
  seq: ['#eef2f7', '#cde2fb', '#86b6ef', '#3987e5', '#1c5cab', '#0d366b'],
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const DAY = 86_400_000;
const dayKey = (d) => d.toLocaleDateString('sv-SE');
const shortDate = (key) => new Date(`${key}T12:00`).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' });
const weekday = (key) => new Date(`${key}T12:00`).toLocaleDateString('da-DK', { weekday: 'short' }).replace('.', '');
const pct = (x) => `${Math.round(x * 100)}%`;

function lastDays(n, end = new Date()) {
  return Array.from({ length: n }, (_, i) => dayKey(new Date(end.getTime() - (n - 1 - i) * DAY)));
}

function niceMax(v) {
  if (v <= 5) return 5;
  const p = 10 ** Math.floor(Math.log10(v));
  return Math.ceil(v / (p / 2)) * (p / 2);
}

// Rounded data-end, square baseline (4px radius).
function colPath(x, y, w, h) {
  const r = Math.min(4, w / 2, h);
  if (h <= 0) return '';
  return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`;
}
function barPath(x, y, w, h) {
  const r = Math.min(4, h / 2, w);
  if (w <= 0) return '';
  return `M${x},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x} Z`;
}

// Fælles tooltip for et chart. Elementer med data-tip får hover/tap.
function wireTooltip(root) {
  const tip = root.querySelector('.viz-tip');
  const show = (target, ev) => {
    tip.innerHTML = target.dataset.tip;
    tip.hidden = false;
    const box = root.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const x = (ev?.clientX ?? t.left + t.width / 2) - box.left;
    const left = Math.max(4, Math.min(box.width - tip.offsetWidth - 4, x - tip.offsetWidth / 2));
    tip.style.left = `${left}px`;
    tip.style.top = `${Math.max(0, t.top - box.top - tip.offsetHeight - 8)}px`;
    root.querySelectorAll('.hot').forEach((h) => h.classList.remove('hot'));
    target.classList.add('hot');
  };
  root.querySelectorAll('[data-tip]').forEach((n) => {
    n.addEventListener('pointerenter', (e) => show(n, e));
    n.addEventListener('pointermove', (e) => show(n, e));
    n.addEventListener('click', (e) => show(n, e));
  });
  root.addEventListener('pointerleave', () => {
    tip.hidden = true;
    root.querySelectorAll('.hot').forEach((h) => h.classList.remove('hot'));
  });
}

function card(title, sub, body, extra = '') {
  return `<section class="viz-card">
    <header><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}</header>
    <div class="viz-root">${body}<div class="viz-tip" hidden></div></div>${extra}
  </section>`;
}

// ---------- Former ----------

function columns(data, { height = 150, unit = '', highlightLast = true } = {}) {
  const W = 340;
  const pad = { l: 28, r: 6, t: 14, b: 22 };
  const max = niceMax(Math.max(1, ...data.map((d) => d.v)));
  const iw = W - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  const slot = iw / data.length;
  const bw = Math.min(18, slot - 2);
  const y = (v) => pad.t + ih - (v / max) * ih;
  const ticks = [0, max / 2, max];
  let svg = `<svg viewBox="0 0 ${W} ${height}" class="viz" role="img">`;
  for (const t of ticks) svg += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}" stroke="${t === 0 ? C.axis : C.grid}" stroke-width="1"/><text x="${pad.l - 6}" y="${y(t) + 3}" text-anchor="end" class="tick">${Math.round(t)}</text>`;
  data.forEach((d, i) => {
    const x = pad.l + i * slot + (slot - bw) / 2;
    const h = (d.v / max) * ih;
    const isLast = highlightLast && i === data.length - 1;
    svg += `<path d="${colPath(x, y(d.v), bw, h)}" fill="${isLast ? C.series : C.light}"/>`;
    if (d.label && (i % Math.ceil(data.length / 7) === 0 || i === data.length - 1)) svg += `<text x="${x + bw / 2}" y="${height - 6}" text-anchor="middle" class="tick">${esc(d.label)}</text>`;
    svg += `<rect x="${pad.l + i * slot}" y="${pad.t}" width="${slot}" height="${ih}" fill="transparent" data-tip="${esc(d.tip ?? `${d.v}${unit}`)}"/>`;
  });
  const last = data.at(-1);
  if (last && last.v > 0) {
    const x = pad.l + (data.length - 1) * slot + slot / 2;
    svg += `<text x="${x}" y="${y(last.v) - 5}" text-anchor="middle" class="val">${last.v}</text>`;
  }
  return `${svg}</svg>`;
}

function line(data, { height = 150, max = 1, fmt = pct } = {}) {
  const W = 340;
  const pad = { l: 34, r: 14, t: 16, b: 22 };
  const iw = W - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  const x = (i) => pad.l + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
  const y = (v) => pad.t + ih - (v / max) * ih;
  let svg = `<svg viewBox="0 0 ${W} ${height}" class="viz" role="img">`;
  for (const t of [0, max / 2, max]) svg += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}" stroke="${t === 0 ? C.axis : C.grid}"/><text x="${pad.l - 6}" y="${y(t) + 3}" text-anchor="end" class="tick">${fmt(t)}</text>`;
  const pts = data.map((d, i) => (d.v == null ? null : [x(i), y(d.v)]));
  // Linjen brydes ved dage uden data.
  let path = '';
  let pen = false;
  pts.forEach((p) => {
    if (!p) { pen = false; return; }
    path += `${pen ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)} `;
    pen = true;
  });
  const area = pts.filter(Boolean);
  if (area.length > 1) svg += `<path d="M${area[0][0]},${y(0)} ${area.map((p) => `L${p[0]},${p[1]}`).join(' ')} L${area.at(-1)[0]},${y(0)} Z" fill="${C.series}" opacity="0.1"/>`;
  svg += `<path d="${path}" fill="none" stroke="${C.series}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
  data.forEach((d, i) => {
    if (d.label && (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1)) svg += `<text x="${x(i)}" y="${height - 6}" text-anchor="middle" class="tick">${esc(d.label)}</text>`;
    const slot = iw / Math.max(1, data.length - 1);
    svg += `<rect x="${x(i) - slot / 2}" y="${pad.t}" width="${slot}" height="${ih}" fill="transparent" data-tip="${esc(d.tip ?? (d.v == null ? 'Ingen data' : fmt(d.v)))}"/>`;
  });
  const lastIdx = pts.map((p, i) => (p ? i : -1)).filter((i) => i >= 0).at(-1);
  if (lastIdx != null) {
    const [lx, ly] = pts[lastIdx];
    svg += `<circle cx="${lx}" cy="${ly}" r="4.5" fill="${C.series}" stroke="#fff" stroke-width="2"/><text x="${Math.min(lx, W - pad.r - 2)}" y="${ly - 9}" text-anchor="end" class="val">${fmt(data[lastIdx].v)}</text>`;
  }
  return `${svg}</svg>`;
}

function hbars(rows, { fmt = pct, max = 1, stacked = false } = {}) {
  const W = 340;
  const rowH = 26;
  const labelW = 104;
  const valueW = 40;
  const H = rows.length * rowH + 4;
  const iw = W - labelW - valueW;
  let svg = `<svg viewBox="0 0 ${W} ${H}" class="viz" role="img">`;
  rows.forEach((r, i) => {
    const yy = i * rowH + 6;
    const bh = 14;
    svg += `<text x="0" y="${yy + 11}" class="lbl">${esc(r.label)}</text>`;
    svg += `<rect x="${labelW}" y="${yy}" width="${iw}" height="${bh}" rx="4" fill="#f1f0ec"/>`;
    if (stacked) {
      const wl = (r.v / max) * iw;
      const wm = (r.v2 / max) * iw;
      if (wl > 0) svg += `<path d="${barPath(labelW, yy, wl, bh)}" fill="${C.light}"/>`;
      if (wm > 0) svg += `<path d="${barPath(labelW, yy, wm, bh)}" fill="${C.series}"/>`;
    } else if (r.v > 0) {
      svg += `<path d="${barPath(labelW, yy, (r.v / max) * iw, bh)}" fill="${C.series}"/>`;
    }
    svg += `<text x="${W}" y="${yy + 11}" text-anchor="end" class="val">${r.valueText ?? fmt(r.v)}</text>`;
    svg += `<rect x="0" y="${yy - 5}" width="${W}" height="${rowH}" fill="transparent" data-tip="${esc(r.tip ?? r.label)}"/>`;
  });
  return `${svg}</svg>`;
}

function heatmap(log, weeks = 12) {
  const today = new Date();
  const dow = (today.getDay() + 6) % 7; // mandag = 0
  const start = new Date(today.getTime() - (weeks * 7 - 1 - (6 - dow)) * DAY);
  const cell = 20;
  const gap = 4;
  const left = 22;
  const W = left + weeks * (cell + gap);
  const H = 7 * (cell + gap) + 16;
  const level = (n) => (n === 0 ? 0 : n < 5 ? 1 : n < 10 ? 2 : n < 20 ? 3 : n < 40 ? 4 : 5);
  let svg = `<svg viewBox="0 0 ${W} ${H}" class="viz" role="img">`;
  ['M', '', 'O', '', 'F', '', 'S'].forEach((d, i) => { if (d) svg += `<text x="0" y="${16 + i * (cell + gap) + 13}" class="tick">${d}</text>`; });
  let lastMonth = -1;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * DAY);
      if (date > today) continue;
      const key = dayKey(date);
      const n = log[key]?.n ?? 0;
      const ok = log[key]?.ok ?? 0;
      const x = left + w * (cell + gap);
      const y = 16 + d * (cell + gap);
      if (d === 0 && date.getMonth() !== lastMonth) {
        lastMonth = date.getMonth();
        svg += `<text x="${x}" y="10" class="tick">${date.toLocaleDateString('da-DK', { month: 'short' }).replace('.', '')}</text>`;
      }
      const isToday = key === dayKey(today);
      svg += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="4" fill="${C.seq[level(n)]}" ${isToday ? `stroke="${C.ink}" stroke-width="1.5"` : ''} data-tip="${esc(`${shortDate(key)}: ${n} svar${n ? ` · ${pct(ok / n)} rigtige` : ''}`)}"/>`;
    }
  }
  return `${svg}</svg>`;
}

const legendSeq = () => `<div class="viz-legend seq"><span>Mindre</span>${C.seq.map((c) => `<i style="background:${c}"></i>`).join('')}<span>Mere</span></div>`;
const legend = (items) => `<div class="viz-legend">${items.map(([c, t]) => `<span><i style="background:${c}"></i>${esc(t)}</span>`).join('')}</div>`;

// ---------- Siden ----------

export function renderStats(el, d) {
  const { state, seed, readiness, mastered, reviewables, levelInfo, retrievability, RARITIES, openCasino, reset } = d;
  const log = state.log ?? {};
  const days14 = lastDays(14);
  const sum = (keys, f) => keys.reduce((a, k) => a + (log[k]?.[f] ?? 0), 0);
  const prev14 = lastDays(14, new Date(Date.now() - 7 * DAY));
  const last7 = days14.slice(7);
  const before7 = prev14.slice(0, 7);
  const acc7 = sum(last7, 'n') ? sum(last7, 'ok') / sum(last7, 'n') : null;
  const accPrev = sum(before7, 'n') ? sum(before7, 'ok') / sum(before7, 'n') : null;
  const delta = acc7 != null && accPrev != null ? Math.round((acc7 - accPrev) * 100) : null;
  const totalN = Object.values(log).reduce((a, x) => a + x.n, 0);
  const allItems = seed.kort.filter((k) => state.items[k.id]);
  const masteredAll = allItems.filter((k) => (state.items[k.id]?.okDays?.length ?? 0) >= 3).length;
  const lvl = levelInfo(state.xp);
  const now = Date.now();

  // Aktivitet
  const activity = days14.map((k) => ({
    v: log[k]?.n ?? 0,
    label: weekday(k),
    tip: `<b>${shortDate(k)}</b><br>${log[k]?.n ?? 0} svar${log[k]?.n ? ` · ${pct(log[k].ok / log[k].n)} rigtige` : ''}`,
  }));

  // Træfsikkerhed pr. dag (kun dage med mindst 3 svar)
  const accuracy = days14.map((k) => {
    const x = log[k];
    const v = x && x.n >= 3 ? x.ok / x.n : null;
    return { v, label: shortDate(k), tip: v == null ? `${shortDate(k)}: for få svar` : `<b>${shortDate(k)}</b><br>${pct(v)} rigtige (${x.n} svar)` };
  });

  // Parathed over tid
  const hist = state.readyHist ?? {};
  const days30 = lastDays(30);
  const ready = days30.map((k) => ({ v: hist[k] ?? null, label: shortDate(k), tip: hist[k] == null ? `${shortDate(k)}: ikke målt` : `<b>${shortDate(k)}</b><br>${pct(hist[k])} SW3SYS-parat` }));

  // Kommende gentagelser
  const dueDays = Array.from({ length: 14 }, (_, i) => {
    const startT = i === 0 ? -Infinity : new Date(new Date().setHours(0, 0, 0, 0) + i * DAY).getTime();
    const endT = new Date(new Date().setHours(0, 0, 0, 0) + (i + 1) * DAY).getTime();
    const n = allItems.filter((k) => state.items[k.id].due >= startT && state.items[k.id].due < endT).length;
    const key = dayKey(new Date(now + i * DAY));
    return { v: n, label: i === 0 ? 'I dag' : weekday(key), tip: `<b>${i === 0 ? 'I dag (inkl. forfaldne)' : shortDate(key)}</b><br>${n} kort til gentagelse` };
  });

  // Mestring pr. fag
  const packRows = seed.pakker.map((p) => {
    const items = seed.kort.filter((k) => k.pakke === p.id && ['quiz', 'myte', 'case', 'forklar', 'raekkefolge', 'sammenlign'].includes(k.type));
    const learned = items.filter((k) => (state.items[k.id]?.lastGrade ?? 1) > 1).length;
    const m = items.filter((k) => (state.items[k.id]?.okDays?.length ?? 0) >= 3).length;
    return { label: `${p.emoji} ${p.navn}`, v: learned / items.length, v2: m / items.length, valueText: pct(learned / items.length), tip: `<b>${esc(p.navn)}</b><br>${learned}/${items.length} lært · ${m} mestret` };
  });

  // Træfsikkerhed pr. korttype (alle dage)
  const typeNames = { quiz: 'Quiz', myte: 'Myte', case: 'Case', forklar: 'Forklar højt', raekkefolge: 'Rækkefølge', sammenlign: 'Sammenlign' };
  const typeAgg = {};
  for (const x of Object.values(log)) for (const [t, v] of Object.entries(x.typer ?? {})) {
    typeAgg[t] ??= { n: 0, ok: 0 };
    typeAgg[t].n += v.n;
    typeAgg[t].ok += v.ok;
  }
  const typeRows = Object.entries(typeNames).filter(([t]) => typeAgg[t]?.n).map(([t, name]) => ({
    label: name, v: typeAgg[t].ok / typeAgg[t].n, tip: `<b>${name}</b><br>${typeAgg[t].ok}/${typeAgg[t].n} rigtige`,
  }));

  // SW3SYS-emner
  const topicRows = seed.spor.filter((s) => s.pakke === 'sw3sys').map((t) => ({
    label: `${t.emoji} ${t.nr ? `${t.nr}. ` : ''}${t.kort}`, v: readiness(t.id),
    tip: `<b>${esc(t.titel)}</b><br>${pct(readiness(t.id))} parat · ⭐ ${mastered(t.id)}/${reviewables(t.id).length} mestret`,
  }));

  // Svageste kort lige nu
  const weakest = allItems
    .filter((k) => k.type !== 'kobling')
    .map((k) => ({ k, r: retrievability(state.items[k.id], now), lapses: state.items[k.id].lapses ?? 0 }))
    .sort((a, b) => b.lapses - a.lapses || a.r - b.r)
    .slice(0, 5);

  const inv = state.inventory ?? [];
  const invCounts = Object.fromEntries(RARITIES.map((r) => [r.id, inv.filter((x) => x.rarity === r.id).length]));

  el.innerHTML = `
    <div class="stat-tiles">
      <div class="tile"><small>Svar i alt</small><b>${totalN.toLocaleString('da-DK')}</b></div>
      <div class="tile"><small>Rigtige, 7 dage</small><b>${acc7 == null ? '–' : pct(acc7)}</b>${delta != null ? `<em class="${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta)} pt. vs ugen før</em>` : ''}</div>
      <div class="tile"><small>Streak</small><b>🔥 ${state.streak.count}</b></div>
      <div class="tile"><small>Mestrede kort</small><b>⭐ ${masteredAll}</b></div>
    </div>

    <div class="level-card">
      <div class="track-head"><strong style="font-size:20px">Level ${lvl.level}</strong><span style="color:#fff">${lvl.toNext} XP til næste · ${state.xp.toLocaleString('da-DK')} XP i alt</span></div>
      <div class="bar"><div style="width:${lvl.pct * 100}%"></div></div>
    </div>

    ${totalN === 0 ? '<p class="empty">Graferne fyldes op, efterhånden som du svarer på kort.</p>' : ''}

    ${card('Aktivitet', 'Svar pr. dag, sidste 14 dage', columns(activity))}
    ${card('Træfsikkerhed', 'Andel rigtige pr. dag (dage med mindst 3 svar)', line(accuracy))}
    ${card('Kalender', 'Svar pr. dag, sidste 12 uger', heatmap(log), legendSeq())}
    ${card('SW3SYS-parathed over tid', 'Forventet hukommelse på eksamensdagen, målt dagligt', line(ready))}
    ${card('Kommende gentagelser', 'Kort, FSRS planlægger de næste 14 dage', columns(dueDays, { highlightLast: false }))}
    ${card('Fremskridt pr. fag', 'Andel af kortene, der er lært og mestret', hbars(packRows, { stacked: true }), legend([[C.light, 'Lært'], [C.series, 'Mestret (3 dage rigtigt)']]))}
    ${typeRows.length ? card('Træfsikkerhed pr. korttype', 'Hvor sidder det bedst?', hbars(typeRows)) : ''}
    ${card('SW3SYS-emner', 'Parathed pr. eksamensemne', hbars(topicRows))}

    ${weakest.length ? `<section class="viz-card"><header><h3>Dine sværeste kort</h3><p>Flest glemt – de kommer oftere i feedet</p></header>
      <ol class="weak-list">${weakest.map(({ k, r, lapses }) => `<li><span>${esc(k.hook ?? k.sporgsmal ?? k.pastand ?? `${k.a?.navn} vs ${k.b?.navn}`)}</span><small>${lapses}× glemt · husker ~${pct(r)}</small></li>`).join('')}</ol></section>` : ''}

    <section class="viz-card inventory">
      <header><h3>Inventar</h3><p>${inv.length} skins · ${(state.coins ?? 0).toLocaleString('da-DK')} mønter${state.cases ? ` · ${state.cases} uåbnede cases` : ''}</p></header>
      <div class="rarity-row">${RARITIES.map((r) => `<span style="--r:${r.farve}"><b>${invCounts[r.id]}</b>${r.navn}</span>`).join('')}</div>
      <button class="case-btn" id="goto-casino">Åbn casinoet</button>
    </section>

    <button class="ghost danger" id="reset">Nulstil fremskridt</button>`;

  el.querySelectorAll('.viz-root').forEach(wireTooltip);
  el.querySelector('#goto-casino').addEventListener('click', openCasino);
  el.querySelector('#reset').addEventListener('click', reset);
}
