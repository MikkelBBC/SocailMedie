import { icon } from './icons.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function md(text = '') {
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${esc(p)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')}</p>`)
    .join('');
}

// Små »du er tæt på«-chips under et svar: næste case, kobling, mission, level.
export const teaserHtml = (res) => (res?.teasers?.length
  ? `<div class="teasers">${res.teasers.map((t) => `<span>${esc(t)}</span>`).join('')}</div>`
  : '');

const el = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

const CONFETTI_COLORS = ['#FCAF45', '#F77737', '#FD1D1D', '#E1306C', '#C13584', '#833AB4', '#5851DB', '#00C6FF', '#43E97B', '#FEE140'];

export function confetti(container, amount = 70) {
  const { width, height } = container.getBoundingClientRect();
  for (let i = 0; i < amount; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = `${Math.random() * width}px`;
    c.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    if (Math.random() < 0.3) c.style.borderRadius = '50%';
    container.append(c);
    const drift = (Math.random() - 0.5) * 160;
    c.animate(
      [
        { transform: `translate(0, -20px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${drift}px, ${height * (0.7 + Math.random() * 0.4)}px) rotate(${Math.random() * 720}deg)`, opacity: 0.9 },
      ],
      { duration: 1400 + Math.random() * 1200, easing: 'cubic-bezier(.2,.6,.4,1)', delay: Math.random() * 200 },
    ).onfinish = () => c.remove();
  }
}

const MODE_LABEL = {
  pretest: 'Gæt før du lærer det',
  check: 'Kan du huske det?',
  review: 'Gentagelse',
  retry: 'En gang til',
  bonus: 'Bonusrunde',
};

const TYPE_LABEL = {
  koncept: 'Koncept', quiz: 'Quiz', myte: 'Myte eller fakta', case: 'Case',
  forklar: 'Forklar højt', raekkefolge: 'Rækkefølge', kobling: 'Kobling låst op', sammenlign: 'Sammenlign',
};

const CONFIDENCE = [
  ['gaet', '🎲', 'Gætter', '5 XP'],
  ['tror', '🤔', 'Tror det', '10 XP'],
  ['sikker', '🎯', 'Sikker', '20 XP'],
];

// Enkelttryk og dobbelttryk på samme flade (som Instagram): dobbelttryk gemmer.
function taps(node, { onSingle, onDouble }) {
  let timer = null;
  let lastTap = 0;
  node.addEventListener('click', (e) => {
    if (e.target.closest('button, textarea, input, a, .rail')) return;
    if (!onDouble) return onSingle?.(e);
    const now = performance.now();
    if (now - lastTap < 280) {
      clearTimeout(timer);
      lastTap = 0;
      onDouble(e);
      return;
    }
    lastTap = now;
    if (onSingle) timer = setTimeout(() => onSingle(e), 280);
  });
}

// Vandret swipe på et kort. Lodret swipe lades i fred, så feedet stadig kan scrolles.
function swipe(node, { onLeft, onRight }) {
  let x0 = null;
  let y0 = null;
  node.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || e.target.closest('button, textarea, input, a, canvas')) return;
    x0 = e.clientX;
    y0 = e.clientY;
  });
  node.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    const dy = e.clientY - y0;
    x0 = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    navigator.vibrate?.(6);
    (dx < 0 ? onLeft : onRight)();
  });
  node.addEventListener('pointercancel', () => { x0 = null; });
}

function heartBurst(node, e) {
  const r = node.getBoundingClientRect();
  const h = el('<div class="heart-burst">💖</div>');
  h.style.left = `${e.clientX - r.left}px`;
  h.style.top = `${e.clientY - r.top}px`;
  node.append(h);
  setTimeout(() => h.remove(), 800);
}

function rail(card, ctx) {
  const node = el(`
    <aside class="rail">
      <button class="rail-btn" data-act="save" aria-label="Gem"><span>${icon('heart', 24)}</span><small>Gem</small></button>
      <button class="rail-btn" data-act="more" aria-label="Mere af dette"><span>${icon('trend', 24)}</span><small>Mere</small></button>
      <button class="rail-btn" data-act="uddyb" aria-label="Uddyb"><span>${icon('sparkles', 24)}</span><small>Uddyb</small></button>
    </aside>`);
  node.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'save') {
      ctx.setSaved(card.id, !ctx.isSaved(card.id));
      btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], 260);
    }
    if (act === 'more') ctx.onMore(card.spor);
    if (act === 'uddyb') ctx.onUddyb(card);
  });
  return node;
}

export function syncSaved(node, saved) {
  node.querySelector('[data-act="save"]')?.classList.toggle('on', saved);
}

// Myter, cases og gæt-først får deres egen farve, så feedet skifter look hele tiden.
const TYPE_STYLE = {
  myte: ['#FA709A', 'var(--g6)'],
  case: ['#7F7FD5', 'var(--g7)'],
  pretest: ['#FF4E50', 'var(--g3)'],
};

function shell(card, mode, ctx, inner, extraClass = '') {
  const track = ctx.track(card.spor);
  const label = MODE_LABEL[mode] ?? TYPE_LABEL[card.type];
  const [accent, grad] = TYPE_STYLE[mode] ?? TYPE_STYLE[card.type] ?? [track.farve, track.gradient];
  const node = el(`
    <section class="card type-${card.type} mode-${mode} ${extraClass}" style="--accent:${accent}; --grad:${grad}; --track:${track.gradient}">
      <div class="card-inner">
        <div class="meta"><span class="chip">${track.emoji ?? ''} ${esc(track.kort)}</span><span class="kind">${label}</span></div>
      </div>
    </section>`);
  node.querySelector('.card-inner').append(...inner);
  if (card.id && card.spor) {
    node.append(rail(card, ctx));
    syncSaved(node, ctx.isSaved(card.id));
    const p = ctx.trackProgress?.(card.spor);
    if (p?.total) {
      node.append(el(`
        <div class="card-foot">
          <span>${esc(track.titel ?? track.kort)}</span>
          <div class="foot-bar"><i style="width:${(p.learned / p.total) * 100}%"></i></div>
          <small>${p.learned}/${p.total}</small>
        </div>`));
    }
  }
  return node;
}

// ---------- Koncept som story ----------

function slidesFrom(body) {
  const slides = [];
  let cur = [];
  let words = 0;
  for (const p of body.split(/\n\n+/)) {
    const w = p.split(/\s+/).length;
    if (cur.length && words + w > 48) {
      slides.push(cur.join('\n\n'));
      cur = [];
      words = 0;
    }
    cur.push(p);
    words += w;
  }
  if (cur.length) slides.push(cur.join('\n\n'));
  return slides;
}

// Rækkefølgen er bevidst: først en analogi at hænge det nye op på, så en tegning,
// så detaljerne, så trinnene og til sidst hvorfor det overhovedet betyder noget.
function konceptSlides(card) {
  const slides = [el(`<div class="slide cover"><h2 class="hook">${esc(card.hook)}</h2><div class="tap-hint">Tryk for at læse ›</div></div>`)];
  if (card.analogi) {
    slides.push(el(`<div class="slide" hidden><div class="analogi">
      <small>Tænk på det som</small><p>${esc(card.analogi)}</p></div></div>`));
  }
  if (card.figur) {
    slides.push(el(`<div class="slide" hidden><figure class="figur">
      <figcaption>${esc(card.figur.titel)}</figcaption>
      <div class="figur-svg">${card.figur.svg}</div>
      ${card.figur.tekst ? `<p>${esc(card.figur.tekst)}</p>` : ''}</figure></div>`));
  }
  for (const t of slidesFrom(card.body)) slides.push(el(`<div class="slide" hidden><div class="body">${md(t)}</div></div>`));
  if (card.hvordan) {
    slides.push(el(`<div class="slide" hidden><div class="body hvordan">
      <h3>Sådan sker det, skridt for skridt</h3>
      <ol>${card.hvordan.map((t) => `<li>${esc(t)}</li>`).join('')}</ol></div></div>`));
  }
  if (card.hvorfor) {
    slides.push(el(`<div class="slide" hidden><div class="hvorfor">
      <small>Hvorfor det betyder noget</small><p>${esc(card.hvorfor)}</p></div></div>`));
  }
  return slides;
}

function renderKoncept(card, mode, ctx) {
  const slides = konceptSlides(card);
  const total = slides.length;
  const node = shell(card, mode, ctx, slides, 'story on-cover');
  const bars = el(`<div class="story-bars">${'<i><b></b></i>'.repeat(total)}</div>`);
  node.append(bars);

  let i = 0;
  const show = (n, retning = 1) => {
    const forrige = i;
    i = Math.max(0, Math.min(total - 1, n));
    node.classList.toggle('tilbage', retning < 0);
    slides.forEach((s, k) => (s.hidden = k !== i));
    if (i !== forrige) slides[i].animate(
      [{ opacity: 0, transform: `translateX(${retning * 22}px)` }, { opacity: 1, transform: 'none' }],
      { duration: 260, easing: 'cubic-bezier(.2,.8,.3,1)' },
    );
    bars.querySelectorAll('i').forEach((b, k) => b.classList.toggle('done', k <= i));
    node.classList.toggle('on-cover', i === 0);
    node.querySelector('.card-inner').scrollTop = 0;
    ctx.onStoryProgress?.(card, i, total);
  };
  show(0);

  const frem = () => (i === total - 1 ? ctx.scrollNext() : show(i + 1, 1));
  const tilbage = () => show(i - 1, -1);

  taps(node, {
    onSingle(e) {
      const r = node.getBoundingClientRect();
      // Venstre tredjedel = tilbage, som i Instagram-stories.
      (e.clientX - r.left < r.width * 0.3 ? tilbage : frem)();
    },
  });
  swipe(node, { onLeft: frem, onRight: tilbage });
  return node;
}

// ---------- Spørgsmål ----------

export const codeBlock = (code) => el(`<pre class="code"><code>${esc(code)}</code></pre>`);

// FSRS-karakter ud fra hvor stor en andel af nøglepunkterne man fik med.
export const gradeFromRatio = (r) => (r >= 0.85 ? 4 : r >= 0.6 ? 3 : r >= 0.3 ? 2 : 1);

function renderQuestion(card, mode, ctx) {
  const parts = [];
  if (card.type === 'case') parts.push(el(`<div class="scenario">${md(card.scenarie)}</div>`));
  if (card.type === 'myte') parts.push(el(`<blockquote class="claim">»${esc(card.pastand)}«</blockquote>`));
  if (card.sporgsmal) parts.push(el(`<h2 class="question">${esc(card.sporgsmal)}</h2>`));
  if (card.kode) parts.push(codeBlock(card.kode));

  const svar = card.svar ?? ['Myte', 'Fakta'];
  const options = el(`<div class="options ${card.type === 'myte' ? 'binary' : ''}"></div>`);
  svar.forEach((s, i) => options.append(el(`<button class="opt" data-i="${i}" data-l="${'ABCDEF'[i]}">${esc(s)}</button>`)));
  parts.push(options);

  const conf = el(`<div class="confidence" hidden><p>Hvor sikker er du? Sats højt for mere XP</p><div class="conf-row"></div></div>`);
  for (const [key, icon, text, xp] of CONFIDENCE) {
    conf.querySelector('.conf-row').append(el(`<button class="conf" data-c="${key}"><span>${icon}</span>${text}<small>${xp}</small></button>`));
  }

  const reveal = el(`<div class="reveal" hidden></div>`);
  parts.push(reveal);

  const node = shell(card, mode, ctx, parts);
  node.append(conf); // uden for .card-inner, så det ligger over side-knapperne
  let chosen = null;
  let done = false;

  const finish = (confidence) => {
    done = true;
    const correct = chosen === card.rigtigt;
    options.querySelectorAll('.opt').forEach((b, i) => {
      b.disabled = true;
      if (i === card.rigtigt) b.classList.add('correct');
      else if (i === chosen) b.classList.add('wrong');
    });
    conf.hidden = true;

    const previous = ctx.getExplanation(card.id);
    const res = ctx.onAnswer(card, mode, correct, confidence);

    let headline;
    if (res.pretest) headline = correct ? '😮 Godt gæt!' : '👀 Helt forventet. Svaret kommer nu';
    else if (correct) headline = res.crit ? '💎 BONUS! ×3 XP' : res.combo >= 3 ? `🔥 ${res.combo} i træk!` : '✅ Rigtigt!';
    else if (res.hyper) headline = '🤯 Du var sikker, men tog fejl';
    else headline = '❌ Ikke helt';

    const extra = res.pretest
      ? '<p class="hint">Når man gætter først, husker man bedre svaret bagefter. Læs næste kort.</p>'
      : res.hyper
        ? '<p class="hint">Fejl, man var sikker på, er dem hjernen husker bedst, når man ser svaret. Den kommer igen om lidt.</p>'
        : !correct ? '<p class="hint">Den kommer igen om lidt.</p>' : '';

    reveal.innerHTML = `
      <div class="headline ${correct ? 'good' : 'bad'}">${headline}</div>
      ${teaserHtml(res)}
      <div class="explain">${md(card.forklaring)}</div>
      ${previous ? `<div class="past-explain">💬 Din forklaring sidst: »${esc(previous)}«</div>` : ''}
      ${extra}
      ${!correct && card.om && !res.pretest ? '<button class="ghost" data-act="koncept">📖 Se kortet igen</button>' : ''}
      <button class="next-btn" data-act="next">Næste kort ↓</button>
      ${res.explainPrompt ? '<div class="explain-box"><button class="ghost" data-act="forklar">💬 Forklar hvorfor med dine egne ord · +15 XP</button></div>' : ''}`;
    reveal.hidden = false;
    const inner = node.querySelector('.card-inner');
    requestAnimationFrame(() => inner.scrollTo({ top: Math.max(0, reveal.offsetTop - inner.clientHeight * 0.35), behavior: 'smooth' }));
    reveal.querySelector('[data-act="koncept"]')?.addEventListener('click', () => ctx.onShowKoncept(card.om));
    reveal.querySelector('[data-act="next"]').addEventListener('click', () => ctx.scrollNext());
    reveal.querySelector('[data-act="forklar"]')?.addEventListener('click', () => {
      const box = reveal.querySelector('.explain-box');
      box.innerHTML = `<textarea placeholder="Svaret er rigtigt, fordi …" maxlength="280"></textarea><div class="row"><button class="primary small">Gem</button></div>`;
      const ta = box.querySelector('textarea');
      ta.focus();
      box.querySelector('button').addEventListener('click', () => {
        if (ta.value.trim().length < 5) return ta.focus();
        const gained = ctx.onExplain(card.id, ta.value.trim());
        box.innerHTML = `<p class="hint">✓ Gemt (+${gained} XP). Du ser den igen, næste gang kortet dukker op.</p>`;
      });
    });

    const pop = el(`<div class="xp-pop">+${res.xp} XP</div>`);
    node.append(pop);
    setTimeout(() => pop.remove(), 1200);
    if (correct && (res.crit || res.combo >= 5)) confetti(node, 50);
    if (!correct) node.querySelector('.card-inner').animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-9px)' }, { transform: 'translateX(9px)' }, { transform: 'translateX(0)' }],
      { duration: 280 },
    );
  };

  options.addEventListener('click', (e) => {
    const btn = e.target.closest('.opt');
    if (!btn || done) return;
    chosen = Number(btn.dataset.i);
    options.querySelectorAll('.opt').forEach((b) => b.classList.toggle('picked', b === btn));
    if (mode === 'pretest') return finish(null);
    conf.hidden = false;
  });
  conf.addEventListener('click', (e) => {
    const btn = e.target.closest('.conf');
    if (btn && !done && chosen !== null) finish(btn.dataset.c);
  });
  taps(node, { onDouble: (e) => { heartBurst(node, e); ctx.setSaved(card.id, true); } });

  return node;
}

// ---------- Forklar højt (fri genkaldelse + selvbedømt tjekliste) ----------

const SpeechRec = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

// Bruges både i feedet og i eksamenssimulatoren.
export function forklarWidget(card, { onDone, compact = false }) {
  const root = el(`
    <div class="forklar">
      <h2 class="question">${esc(card.sporgsmal)}</h2>
      ${compact ? '' : '<p class="hint">Sig det højt, som om du stod til eksamen. Punkterne vises først bagefter.</p>'}
      <div class="say-row">
        ${SpeechRec ? '<button class="primary small" data-act="mic">🎤 Optag</button>' : ''}
        <button class="ghost" data-act="skriv">✍️ Skriv i stedet</button>
      </div>
      <div class="transcript" hidden></div>
      <textarea class="answer" hidden placeholder="Skriv din forklaring …"></textarea>
      <button class="primary wide" data-act="vis">Jeg har forklaret det → vis punkter</button>
      <div class="checklist" hidden></div>
    </div>`);

  const transcript = root.querySelector('.transcript');
  const textarea = root.querySelector('.answer');
  let finalText = '';
  let rec = null;

  const stopRec = () => {
    if (rec) { rec.onend = null; rec.stop(); rec = null; }
    const b = root.querySelector('[data-act="mic"]');
    if (b) { b.textContent = '🎤 Optag'; b.classList.remove('rec'); }
  };

  root.querySelector('[data-act="mic"]')?.addEventListener('click', (e) => {
    if (rec) return stopRec();
    rec = new SpeechRec();
    rec.lang = 'da-DK';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (ev) => {
      let interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        if (ev.results[i].isFinal) finalText += ev.results[i][0].transcript + ' ';
        else interim += ev.results[i][0].transcript;
      }
      transcript.hidden = false;
      transcript.innerHTML = `${esc(finalText)}<span class="interim">${esc(interim)}</span>`;
    };
    rec.onerror = () => {
      transcript.hidden = false;
      transcript.textContent = 'Mikrofonen er ikke tilgængelig. Sig det højt for dig selv, eller skriv.';
      stopRec();
    };
    rec.onend = () => stopRec();
    rec.start();
    e.currentTarget.textContent = '⏹ Stop';
    e.currentTarget.classList.add('rec');
  });

  root.querySelector('[data-act="skriv"]').addEventListener('click', () => {
    textarea.hidden = false;
    textarea.focus();
  });

  root.querySelector('[data-act="vis"]').addEventListener('click', (e) => {
    stopRec();
    e.currentTarget.remove();
    root.querySelector('.say-row').remove();
    textarea.readOnly = true;
    const said = `${finalText} ${textarea.value}`.toLowerCase();
    const list = root.querySelector('.checklist');
    list.hidden = false;
    list.innerHTML = `
      <p class="hint">${said.trim() ? 'Punkter, hvor du brugte nøgleordene, er sat af. Vær ærlig og ret til.' : 'Sæt flueben ved det, du faktisk nåede at sige.'}</p>
      ${card.punkter.map((p, i) => {
        const hit = said.trim() && p.ord?.some((o) => said.includes(o.toLowerCase()));
        return `<label class="point"><input type="checkbox" data-i="${i}" ${hit ? 'checked' : ''}><span>${esc(p.tekst)}</span></label>`;
      }).join('')}
      <button class="primary wide" data-act="bedom">Bedøm mig</button>`;
    list.querySelector('[data-act="bedom"]').addEventListener('click', (ev) => {
      const boxes = [...list.querySelectorAll('input')];
      const got = boxes.filter((b) => b.checked).length;
      const ratio = got / boxes.length;
      boxes.forEach((b) => {
        b.disabled = true;
        b.closest('.point').classList.add(b.checked ? 'got' : 'missed');
      });
      ev.currentTarget.remove();
      const res = onDone(ratio, said.trim());
      const pct = Math.round(ratio * 100);
      const head = pct >= 85 ? '🏆 Eksamensklar!' : pct >= 60 ? '💪 Godt, der mangler lidt' : pct >= 30 ? '🧩 Halvvejs' : '📖 Skal øves igen';
      list.append(el(`<div class="score ${pct >= 60 ? 'good' : 'bad'}"><b>${got}/${boxes.length}</b> punkter · ${head}${res?.xp ? ` · +${res.xp} XP` : ''}</div>`));
      if (res?.teasers?.length) list.append(el(teaserHtml(res)));
      if (got < boxes.length) list.append(el('<p class="hint">De røde punkter er dem, eksaminator ville savne. Sig dem højt én gang nu.</p>'));
    });
  });

  return root;
}

function renderForklar(card, mode, ctx) {
  const node = shell(card, mode, ctx, []);
  node.querySelector('.card-inner').append(forklarWidget(card, {
    onDone: (ratio) => {
      const res = ctx.onGrade(card, mode, gradeFromRatio(ratio), { xp: Math.round(5 + 30 * ratio) });
      popXp(node, res);
      return res;
    },
  }));
  return node;
}

// ---------- Rækkefølge (Parsons-opgave) ----------

function shuffledIndices(n) {
  const a = [...Array(n).keys()];
  do {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } while (a.every((v, i) => v === i));
  return a;
}

function renderRaekkefolge(card, mode, ctx) {
  const answer = el('<ol class="seq-answer"></ol>');
  const pool = el('<div class="seq-pool"></div>');
  const check = el('<button class="primary wide" disabled>Tjek rækkefølgen</button>');
  const reveal = el('<div class="reveal" hidden></div>');
  const node = shell(card, mode, ctx, [
    el(`<h2 class="question">${esc(card.sporgsmal)}</h2>`),
    el('<p class="hint">Tryk på trinene i rigtig rækkefølge. Tryk på et placeret trin for at fortryde.</p>'),
    answer, pool, check, reveal,
  ]);

  const placed = [];
  let done = false;
  const renderLists = () => {
    answer.innerHTML = placed.map((i, n) => `<li data-i="${i}"><span class="n">${n + 1}</span>${esc(card.trin[i])}</li>`).join('');
    pool.querySelectorAll('button').forEach((b) => (b.hidden = placed.includes(Number(b.dataset.i))));
    check.disabled = placed.length !== card.trin.length;
  };
  for (const i of shuffledIndices(card.trin.length)) {
    pool.append(el(`<button class="seq-item" data-i="${i}">${esc(card.trin[i])}</button>`));
  }
  pool.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || done) return;
    placed.push(Number(b.dataset.i));
    renderLists();
  });
  answer.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li || done) return;
    placed.splice(placed.indexOf(Number(li.dataset.i)), 1);
    renderLists();
  });
  check.addEventListener('click', () => {
    done = true;
    check.remove();
    const wrong = placed.filter((v, pos) => v !== pos).length;
    answer.querySelectorAll('li').forEach((li, pos) => li.classList.add(Number(li.dataset.i) === pos ? 'correct' : 'wrong'));
    const grade = wrong === 0 ? 4 : wrong <= 2 ? 2 : 1;
    const res = ctx.onGrade(card, mode, grade, { xp: wrong === 0 ? 20 : wrong <= 2 ? 8 : 1 });
    reveal.hidden = false;
    reveal.innerHTML = `
      <div class="headline ${wrong === 0 ? 'good' : 'bad'}">${wrong === 0 ? '✅ Perfekt rækkefølge!' : `❌ ${wrong} trin på forkert plads`}</div>
      ${teaserHtml(res)}
      ${wrong ? `<ol class="seq-correct">${card.trin.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>` : ''}
      <div class="explain">${md(card.forklaring)}</div>`;
    popXp(node, res);
    const inner = node.querySelector('.card-inner');
    requestAnimationFrame(() => inner.scrollTo({ top: Math.max(0, reveal.offsetTop - inner.clientHeight * 0.3), behavior: 'smooth' }));
  });
  return node;
}

function popXp(node, res) {
  if (!res?.xp) return;
  const pop = el(`<div class="xp-pop">+${res.xp} XP</div>`);
  node.append(pop);
  setTimeout(() => pop.remove(), 1200);
  if (res.crit || res.combo >= 5) confetti(node, 50);
}

function renderKobling(card, mode, ctx) {
  const node = shell(card, 'kobling', ctx, [
    el(`<div class="spark">✦</div>`),
    el(`<h2 class="hook">${esc(card.hook)}</h2>`),
    el(`<div class="body">${md(card.body)}</div>`),
  ]);
  taps(node, { onDouble: (e) => { heartBurst(node, e); ctx.setSaved(card.id, true); } });
  setTimeout(() => confetti(node, 40), 300);
  return node;
}


// ---------- Sammenlign (discriminative contrast) ----------

const SVAR_LABEL = { begge: 'Begge', ingen: 'Ingen' };

function renderSammenlign(card, mode, ctx) {
  const { a, b } = card;
  const harIngen = card.udsagn.some((u) => u.svar === 'ingen');
  const valg = [['a', `${a.emoji} ${a.navn}`], ['b', `${b.emoji} ${b.navn}`], ['begge', 'Begge'], ...(harIngen ? [['ingen', 'Ingen']] : [])];
  const labelFor = (svar) => (svar === 'a' ? a.navn : svar === 'b' ? b.navn : SVAR_LABEL[svar]);

  const versus = el(`<div class="versus"><span class="vs-a">${a.emoji}<b>${esc(a.navn)}</b></span><i>vs</i><span class="vs-b">${b.emoji}<b>${esc(b.navn)}</b></span></div>`);
  const dots = el(`<div class="vs-dots">${card.udsagn.map(() => '<i></i>').join('')}</div>`);
  const stage = el('<div class="vs-stage"></div>');
  const buttons = el(`<div class="vs-buttons ${valg.length === 4 ? 'four' : ''}">${valg.map(([k, t]) => `<button data-k="${k}" class="vs-${k}">${esc(t)}</button>`).join('')}</div>`);
  const reveal = el('<div class="reveal" hidden></div>');
  const node = shell(card, mode, ctx, [
    el(`<h2 class="question">Hvilket passer – ${esc(a.navn)} eller ${esc(b.navn)}?</h2>`),
    versus, dots, stage, buttons, reveal,
  ]);

  const order = shuffledIndices(card.udsagn.length);
  const svar = [];
  let i = 0;
  let locked = false;
  const show = () => {
    const u = card.udsagn[order[i]];
    stage.innerHTML = `<div class="vs-statement">${esc(u.tekst)}</div>`;
  };
  show();

  buttons.addEventListener('click', (e) => {
    const btnEl = e.target.closest('button');
    if (!btnEl || locked) return;
    locked = true;
    const u = card.udsagn[order[i]];
    const ok = btnEl.dataset.k === u.svar;
    svar.push({ u, valgt: btnEl.dataset.k, ok });
    dots.children[i].className = ok ? 'ok' : 'bad';
    btnEl.classList.add(ok ? 'right' : 'wrong');
    if (!ok) buttons.querySelector(`[data-k="${u.svar}"]`)?.classList.add('right');
    stage.firstElementChild.classList.add(ok ? 'ok' : 'bad');
    stage.firstElementChild.insertAdjacentHTML('beforeend', `<small>${ok ? '✓' : '✗'} ${esc(labelFor(u.svar))}</small>`);
    navigator.vibrate?.(ok ? 8 : [20, 40, 20]);
    setTimeout(() => {
      buttons.querySelectorAll('button').forEach((x) => x.classList.remove('right', 'wrong'));
      i++;
      locked = false;
      if (i < card.udsagn.length) return show();
      finish();
    }, ok ? 550 : 1100);
  });

  const finish = () => {
    stage.remove();
    buttons.remove();
    const got = svar.filter((x) => x.ok).length;
    const ratio = got / svar.length;
    const res = ctx.onGrade(card, mode, gradeFromRatio(ratio), { xp: Math.round(5 + 30 * ratio) });
    if (ratio === 1) ctx.onPerfect?.();
    reveal.hidden = false;
    reveal.innerHTML = `
      <div class="headline ${ratio >= 0.6 ? 'good' : 'bad'}">${ratio === 1 ? '🎯 Perfekt adskilt!' : `${got}/${svar.length} rigtige`}</div>
      ${teaserHtml(res)}
      <ul class="vs-summary">${svar.map((x) => `<li class="${x.ok ? 'ok' : 'bad'}"><span>${x.ok ? '✓' : '✗'}</span>${esc(x.u.tekst)} <b>${esc(labelFor(x.u.svar))}</b></li>`).join('')}</ul>
      <div class="explain">${md(card.forklaring)}</div>`;
    popXp(node, res);
  };
  return node;
}

// ---------- Case-kort (CS:GO-style) ----------

function renderCase(mode, ctx) {
  const kilde = mode.split(':')[1] ?? 'combo';
  const titel = {
    combo: '5 rigtige i træk!', maal: 'Dagens mål er nået!', perfekt: 'Perfekt runde!', sim: 'Stærk simulering!',
    mission: 'Mission klaret!', bonus: 'Alle dagens missioner klaret!', level: 'Level up!',
  }[kilde] ?? 'Du har fået en case';
  const sub = kilde === 'bonus' ? 'Bonus-case: mindst Restricted – måske en ★ kniv?' : 'Mil-Spec, Restricted, Classified, Covert – eller en sjælden ★ kniv?';
  const node = el(`
    <section class="card type-case-drop">
      <div class="card-inner center">
        <div class="case-box">📦</div>
        <p class="case-kicker">${titel}</p>
        <h2 class="hook">Leths Case</h2>
        <p class="sub">${sub}</p>
        <button class="case-btn" data-act="open">Åbn case</button>
        ${kilde === 'bonus' ? '' : '<button class="ghost-light" data-act="gem">Gem til senere</button>'}
      </div>
    </section>`);
  const done = (txt) => {
    node.querySelector('.card-inner').innerHTML = `<div class="case-box opened">✅</div><h2 class="hook">${txt}</h2><button class="case-btn" data-act="next">Videre ↓</button>`;
    node.querySelector('[data-act="next"]').addEventListener('click', () => ctx.scrollNext());
  };
  node.querySelector('[data-act="open"]').addEventListener('click', () => ctx.openCase(kilde, () => done('Case åbnet')));
  node.querySelector('[data-act="gem"]')?.addEventListener('click', () => { ctx.saveCase(); done('Gemt i dit inventar 🎒'); });
  return node;
}

// ---------- Belønningskort ----------

function renderMaal(ctx) {
  const s = ctx.stats();
  const node = el(`
    <section class="card type-maal">
      <div class="card-inner center">
        <div class="flame">🔥</div>
        <h2 class="hook">Dagens mål er nået!</h2>
        <p class="big">${s.streak} ${s.streak === 1 ? 'dag' : 'dage'} i træk</p>
        <p class="sub">${s.answered} svar i dag · level ${s.level}${s.freezes ? ` · 🧊 ${s.freezes} streak-frys` : ''}</p>
        <p class="sub">Det sidder bedst, hvis du stopper nu og kommer igen i morgen. Vil du fortsætte, venter der en bonusrunde.</p>
        <button class="case-btn" data-act="case">📦 Åbn din daglige case</button>
        <button class="primary light" data-act="next">Bonusrunde ↓</button>
      </div>
    </section>`);
  node.querySelector('[data-act="next"]').addEventListener('click', () => ctx.scrollNext());
  const caseBtn = node.querySelector('[data-act="case"]');
  caseBtn.addEventListener('click', () => ctx.openCase('maal', () => caseBtn.remove()), { once: true });
  setTimeout(() => confetti(node, 90), 200);
  return node;
}

function renderTom() {
  return el(`
    <section class="card type-tom">
      <div class="card-inner center">
        <div class="flame">🌱</div>
        <h2 class="hook">Du har været alt igennem</h2>
        <p class="sub">Kom igen senere, når kortene skal gentages. Når API-nøglen er sat op, laver appen nye kort her.</p>
      </div>
    </section>`);
}

function renderInner(card, mode, ctx) {
  if (mode === 'maal') return renderMaal(ctx);
  if (mode.startsWith('case')) return renderCase(mode, ctx);
  if (mode === 'tom') return renderTom();
  if (card.type === 'koncept') return renderKoncept(card, mode, ctx);
  if (card.type === 'kobling') return renderKobling(card, mode, ctx);
  if (card.type === 'forklar') return renderForklar(card, mode, ctx);
  if (card.type === 'raekkefolge') return renderRaekkefolge(card, mode, ctx);
  if (card.type === 'sammenlign') return renderSammenlign(card, mode, ctx);
  return renderQuestion(card, mode, ctx);
}

// bro = { tema, fra }: kortet deler tema med et nyligt kort fra et andet spor.
// Forbindelsen gøres synlig, så man aktivt sammenligner (analogical encoding).
export function renderCard(card, mode, ctx, bro = null) {
  const node = renderInner(card, mode, ctx);
  const tema = bro && ctx.tema(bro.tema);
  const meta = node.querySelector('.meta');
  if (tema && meta) {
    const chip = el(`<button class="bro" title="Samme grundidé som et kort fra et andet spor">🔀 ${tema.emoji} ${esc(tema.navn)}</button>`);
    chip.addEventListener('click', (e) => { e.stopPropagation(); ctx.onBridge(bro); });
    meta.append(chip);
  }
  return node;
}
