import { Feed, REVIEWABLE } from './feed.js';
import { load, save, reset, dayKey, daysBetween } from './store.js';
import { review, retrievability } from './fsrs.js';
import { renderCard, md, confetti, syncSaved, forklarWidget, gradeFromRatio } from './render.js';
import seed from '../data/index.js';
import { milepaelKort, kalibrering, indsigtFor, XP_FOR } from './milepael.js';
import { renderStats } from './stats.js';
import { sfx, setMuted } from './sfx.js';
import { icon, hydrateIcons } from './icons.js';
import { ensureMissions, bump, missionEmoji, missionText, isDone, allMissionsDone } from './missions.js';
import { guideHtml, GUIDE_VERSION } from './guide.js';

const DAY = 86_400_000;
const state = load();
const tracks = Object.fromEntries(seed.spor.map((s) => [s.id, s]));
tracks.kobling = { id: 'kobling', kort: 'Kobling', emoji: '🔗', farve: '#E1306C', gradient: 'var(--ig)' };

const feed = new Feed(seed, state);
const app = document.getElementById('app');
const feedEl = document.getElementById('feed');
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

let activeIndex = 0;
let activeSince = performance.now();
const readKoncepter = new Set();
setMuted(!state.lyd);

// ---------- Eksamensparathed ----------

const examTime = () => (state.examDate ? new Date(`${state.examDate}T09:00`).getTime() : Date.now() + 7 * DAY);
const daysToExam = () => (state.examDate ? Math.ceil((examTime() - Date.now()) / DAY) : null);
const reviewables = (trackId) => seed.kort.filter((k) => k.spor === trackId && REVIEWABLE.has(k.type));

// Forventet sandsynlighed (FSRS) for at huske emnets kort på eksamensdagen,
// hvis man ikke øver mere. Kort, man aldrig har besvaret, tæller som 0.
function readiness(trackId) {
  const items = reviewables(trackId);
  if (!items.length) return 0;
  const t = Math.max(Date.now(), examTime());
  return items.reduce((sum, k) => sum + (state.items[k.id] ? retrievability(state.items[k.id], t) : 0), 0) / items.length;
}

const sw3sysTracks = () => seed.spor.filter((s) => s.pakke === 'sw3sys');
const examTracks = () => sw3sysTracks().filter((s) => s.nr > 0);
const overallReadiness = () => {
  const all = sw3sysTracks().map((s) => readiness(s.id) * (s.nr === 0 ? 0.5 : 1));
  return all.reduce((a, b) => a + b, 0) / (all.length - 0.5);
};
const mastered = (trackId) => reviewables(trackId).filter((k) => (state.items[k.id]?.okDays?.length ?? 0) >= 3).length;

// Svage emner får mere plads i feedet, og tæt på eksamen kommer der flere gentagelser.
feed.trackWeight = (id) => (tracks[id]?.pakke === 'sw3sys' ? 0.6 + (1 - readiness(id)) * 1.2 : 1);
feed.reviewBias = () => {
  const d = daysToExam();
  return d === null ? 0 : d <= 3 ? 0.35 : d <= 14 ? 0.2 : 0;
};

// ---------- XP og level ----------

function levelInfo(xp) {
  let L = 1;
  while (xp >= 50 * L * (L + 1)) L++;
  const prev = 50 * (L - 1) * L;
  const next = 50 * L * (L + 1);
  return { level: L, pct: (xp - prev) / (next - prev), toNext: next - xp };
}

const TITLER = ['Nybegynder', 'Syscall-spotter', 'Fork-forsker', 'Mutex-mester', 'Pointer-pilot', 'Kernel-kriger', 'Deadlock-detektiv', 'Scheduler-sensei', 'RAII-ridder', 'Eksamens-legende'];
const levelTitle = (L) => TITLER[Math.min(Math.floor((L - 1) / 2), TITLER.length - 1)];

const boostActive = () => state.boost && state.boost.until > Date.now();

// learning = XP fra svar; kun den ganges med en aktiv boost, og kun den kan udløse en level-milepæl
// (ellers kunne XP fra en milepæl udløse en ny milepæl i en uendelig kæde).
function addXp(n, { learning = false } = {}) {
  if (learning && boostActive()) n = Math.round(n * state.boost.mult);
  const before = levelInfo(state.xp).level;
  state.xp += n;
  if (state.log && state.daily.day) {
    const d = (state.log[state.daily.day] ??= { n: 0, ok: 0, xp: 0, typer: {}, pakker: {} });
    d.xp += n;
  }
  const after = levelInfo(state.xp).level;
  if (after > before) {
    confetti(app, 120);
    sfx.fanfare();
    const nyTitel = levelTitle(after) !== levelTitle(before);
    toast(`🎉 Level ${after}${nyTitel ? ` · ny titel: ${levelTitle(after)}` : ''}!`);
    if (learning) queueMilepael('level');
  }
}

// ---------- Dagens missioner ----------

function setupMissions() {
  const weakest = examTracks().map((t) => ({ id: t.id, r: readiness(t.id) })).sort((a, b) => a.r - b.r)[0]?.id;
  const freshLeft = seed.kort.filter((k) => k.type === 'koncept' && !state.seen[k.id]).length;
  return ensureMissions(state, dayKey(), { weakest, dueCount: feed.dueCount(null), freshLeft });
}

// Fremdrift på missioner. En klaret mission giver en milepæl i feedet.
// Returnerer en teaser-tekst, hvis en mission rykkede sig uden at blive klaret.
function missionEvent(ev, inFeed = true) {
  if (!state.missions) return null;
  const { done, moved } = bump(state, ev);
  const give = (kilde) => { if (inFeed) queueMilepael(kilde); else addXp(XP_FOR[kilde] ?? 30); };
  done.forEach((m, i) => {
    give('mission');
    setTimeout(() => {
      sfx.fanfare();
      toast(`${missionEmoji(m)} Mission klaret!`);
      $('#goal-ring').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], 500);
    }, 1500 + i * 2600);
  });
  if (done.length && allMissionsDone(state) && !state.missions.bonus) {
    state.missions.bonus = true;
    give('bonus');
    setTimeout(() => { confetti(app, 160); toast('💎 Alle 3 missioner klaret!'); }, 1500 + done.length * 2600);
  }
  return moved ? `${missionEmoji(moved)} Mission ${moved.have}/${moved.n}` : null;
}

const hoursToMidnight = () => {
  const end = new Date();
  end.setHours(24, 0, 0, 0);
  const min = Math.ceil((end - Date.now()) / 60_000);
  return min >= 60 ? `${Math.floor(min / 60)} t ${min % 60} min` : `${min} min`;
};

// Missionslisten + bonus-case. Bruges i arket (mobil) og i sidepanelet (desktop).
function missionsHtml() {
  const ms = state.missions;
  if (!ms) return '';
  const label = (id) => (tracks[id] ? `${tracks[id].emoji} ${tracks[id].kort}` : 'dit svageste emne');
  const doneN = ms.list.filter(isDone).length;
  return `
    ${ms.list.map((m) => `
      <div class="mission ${isDone(m) ? 'done' : ''}">
        <span class="m-emoji">${isDone(m) ? '✅' : missionEmoji(m)}</span>
        <div><b>${esc(missionText(m, label))}</b><div class="bar"><div style="width:${(m.have / m.n) * 100}%"></div></div></div>
        <small>${m.have}/${m.n}</small>
      </div>`).join('')}
    <div class="mission-chest ${ms.bonus ? 'open' : ''}">
      <span>💎</span><b>${ms.bonus ? 'Alle tre klaret' : `Dagens sæt · ${doneN}/3`}</b>
      <div class="chest-dots">${ms.list.map((m) => `<i class="${isDone(m) ? 'on' : ''}"></i>`).join('')}</div>
    </div>`;
}

function openMissions() {
  rollDay();
  const left = Math.max(0, state.goal - state.daily.answered);
  openSheet(`
    <div class="missions">
      <h2>Dagens missioner</h2>
      <p class="hint">Hver klaret mission giver en milepæl med dine egne tal. Klar alle tre, og du får dagens store opgørelse.</p>
      ${missionsHtml()}
      <div class="goal-line">
        <span>🔥 ${state.streak.count} ${state.streak.count === 1 ? 'dag' : 'dage'} i træk${state.streak.freezes ? ` · 🧊 ${state.streak.freezes}` : ''}</span>
        <span>${left ? `${left} svar til dagens mål` : '✓ Dagens mål nået'}</span>
      </div>
      <p class="hint center">Nye missioner om ${hoursToMidnight()}</p>
      <div class="sheet-actions">
        <button class="ghost" data-act="lyd">${state.lyd ? '🔊 Lyd og vibration til' : '🔇 Lyd og vibration fra'}</button>
        <button class="ghost" data-act="guide">📖 Sådan virker appen</button>
      </div>
    </div>`);
  $('#sheet [data-act="lyd"]').addEventListener('click', (e) => {
    state.lyd = !state.lyd;
    setMuted(!state.lyd);
    save(state);
    e.currentTarget.textContent = state.lyd ? '🔊 Lyd og vibration til' : '🔇 Lyd og vibration fra';
    sfx.correct(3);
  });
  $('#sheet [data-act="guide"]').addEventListener('click', aabnGuide);
}

// Kobling, som dette kort er en af forudsætningerne for, og som man ikke har set endnu.
function koblingTeaser(id) {
  const k = seed.kort.find((c) => c.type === 'kobling' && c.kraever.includes(id) && !state.seen[c.id]);
  if (!k) return null;
  const left = k.kraever.filter((r) => (state.items[r]?.lastGrade ?? 1) <= 1).length;
  return left === 0 ? '🔗 Kobling låst op – den dukker op snart' : `🔗 ${left} kort fra en ny kobling`;
}

// ---------- Dag og streak ----------

function rollDay() {
  const today = dayKey();
  if (state.missions?.day !== today && setupMissions()) save(state);
  if (state.daily.day === today) return;
  state.daily = { day: today, answered: 0, goalShown: false };
  const { lastDay } = state.streak;
  if (lastDay && daysBetween(lastDay, today) > 1) {
    if (state.streak.freezes > 0 && daysBetween(lastDay, today) === 2) {
      state.streak.freezes--;
      state.streak.lastDay = dayKey(new Date(Date.now() - DAY));
      toast('🧊 Et streak-frys reddede din streak');
    } else {
      state.streak.count = 0;
    }
  }
  save(state);
}

function bumpStreak() {
  const today = dayKey();
  const { lastDay } = state.streak;
  if (lastDay === today) return;
  state.streak.count = lastDay && daysBetween(lastDay, today) === 1 ? state.streak.count + 1 : 1;
  state.streak.lastDay = today;
  if (state.streak.count % 7 === 0) state.streak.freezes = Math.min(2, state.streak.freezes + 1);
}

// ---------- Bedømmelse ----------

// Fælles for alle korttyper. grade: 1 glemt, 2 svært, 3 godt, 4 let.
function gradeCard(card, mode, grade, { xp: baseXp = 10, hyper = false, confidence = null } = {}) {
  rollDay();
  const firstToday = state.daily.answered === 0;
  const prev = state.items[card.id];
  const next = review(prev, grade);
  // Successive relearning: et kort er »mestret« efter korrekt genkaldelse på 3 forskellige dage.
  const okDays = new Set(prev?.okDays ?? []);
  if (grade > 1) okDays.add(dayKey());
  next.okDays = [...okDays];
  state.items[card.id] = next;
  logAnswer(card, grade > 1, confidence);
  if (grade > 1 && okDays.size === 3 && !prev?.okDays?.includes(dayKey())) toast('⭐ Kort mestret – 3 dage i træk rigtigt');

  let xp = 1;
  let crit = false;
  if (grade > 1) {
    state.combo++;
    state.bestCombo = Math.max(state.bestCombo, state.combo);
    xp = Math.round(baseXp * (1 + Math.min(state.combo - 1, 10) * 0.1));
    if (Math.random() < 0.12) { xp *= 3; crit = true; }
    const milepael = state.combo % 5 === 0;
    if (milepael && mode !== 'sim') queueMilepael('combo');
    milepael ? sfx.milepael() : sfx.correct(state.combo);
    if (crit) sfx.crit();
  } else {
    state.combo = 0;
    if (mode !== 'sim') feed.scheduleRetry(card.id, activeIndex);
    sfx.wrong();
  }
  // Belønner at komme igen hver dag (spacing): dagens første svar starter en kort XP-boost.
  if (firstToday && mode !== 'sim' && !boostActive()) {
    state.boost = { mult: 2, until: Date.now() + 10 * 60_000 };
    setTimeout(() => toast('☀️ Dagens første svar: XP ×2 i 10 min'), 1300);
  }
  addXp(xp, { learning: true });
  if (boostActive()) xp = Math.round(xp * state.boost.mult);
  state.daily.answered++;

  const left = state.goal - state.daily.answered;
  let goalReached = false;
  if (left <= 0 && !state.daily.goalShown) {
    state.daily.goalShown = true;
    goalReached = true;
    bumpStreak();
    const ring = $('#goal-ring');
    ring?.classList.add('fyldt');
    setTimeout(() => ring?.classList.remove('fyldt'), 500);
    if (mode !== 'sim') { feed.queueGoal(); queueMilepael('maal'); }
    toast('🔥 Dagens mål er nået!');
  } else if (left === 3 || left === 1) {
    setTimeout(() => toast(left === 1 ? '🔥 Ét svar mere til dagens mål!' : '🔥 Kun 3 svar til dagens mål'), 900);
  }

  // »Tæt på«-teasers: højst to, vigtigste først.
  const teasers = [];
  if (grade > 1 && mode !== 'sim') {
    const toMil = 5 - (state.combo % 5);
    if (toMil <= 2) teasers.push(`🔥 ${toMil} ${toMil === 1 ? 'rigtigt' : 'rigtige'} mere til næste milepæl`);
  }
  if (grade > 1) {
    const kob = koblingTeaser(card.id);
    if (kob) teasers.push(kob);
  }
  const mission = missionEvent({ kind: 'svar', grade, confidence, type: card.type, spor: card.spor, mode, combo: state.combo }, mode !== 'sim');
  if (mission) teasers.push(mission);
  const lvl = levelInfo(state.xp);
  if (lvl.toNext <= 40) teasers.push(`⭐ ${lvl.toNext} XP til level ${lvl.level + 1}`);

  state.readyHist[dayKey()] = overallReadiness();
  save(state);
  updateHud();
  if (mode !== 'sim') ensureBuffer();
  return { xp, crit, combo: state.combo, hyper, goalReached, teasers: teasers.slice(0, 2) };
}

function logAnswer(card, ok, confidence = null) {
  const d = (state.log[dayKey()] ??= { n: 0, ok: 0, xp: 0, typer: {}, pakker: {} });
  d.n++;
  if (ok) d.ok++;
  if (confidence) {
    const c = ((d.konf ??= {})[confidence] ??= { n: 0, ok: 0 });
    c.n++;
    if (ok) c.ok++;
  }
  const t = (d.typer[card.type] ??= { n: 0, ok: 0 });
  t.n++;
  if (ok) t.ok++;
  const pk = (d.pakker[card.pakke] ??= { n: 0, ok: 0 });
  pk.n++;
  if (ok) pk.ok++;
}

function handleAnswer(card, mode, correct, confidence) {
  if (mode === 'pretest') {
    rollDay();
    addXp(2);
    save(state);
    updateHud();
    return { xp: 2, pretest: true };
  }
  const grade = !correct ? 1 : { gaet: 2, tror: 3, sikker: 4 }[confidence];
  const res = gradeCard(card, mode, grade, { xp: { gaet: 5, tror: 10, sikker: 20 }[confidence] ?? 1, hyper: !correct && confidence === 'sikker', confidence });
  res.explainPrompt = correct && confidence !== 'gaet' && !state.explanations[card.id] && Math.random() < 0.4;
  return res;
}

// ---------- Feed ----------

const ctx = {
  track: (id) => tracks[id] ?? tracks.kobling,
  isSaved: (id) => !!state.saved[id],
  setSaved(id, on) {
    if (on) state.saved[id] = true;
    else delete state.saved[id];
    save(state);
    document.querySelectorAll(`[data-id="${id}"]`).forEach((n) => syncSaved(n, on));
  },
  onAnswer: handleAnswer,
  onGrade: gradeCard,
  getExplanation: (id) => state.explanations[id],
  onExplain(id, text) {
    state.explanations[id] = text;
    addXp(15);
    save(state);
    updateHud();
    return 15;
  },
  milepael: (kilde) => byggMilepael(kilde),
  claimMilepael(kilde) {
    const xp = XP_FOR[kilde] ?? 30;
    addXp(xp);
    if ((kilde === 'bonus' || kilde === 'level') && state.streak.freezes < 2) {
      state.streak.freezes++;
      toast('🧊 +1 streak-frys: én glemt dag vælter ikke din stime');
    }
    if (kilde === 'bonus' || kilde === 'sim') confetti(app, 140);
    save(state);
    updateHud();
    return xp;
  },
  onPerfect() {
    queueMilepael('perfekt');
  },
  tema: (id) => feed.temaById[id],
  onBridge(bro) {
    const tema = feed.temaById[bro.tema];
    const fra = feed.byId[bro.fra];
    const titel = (k) => k?.hook ?? k?.sporgsmal ?? k?.pastand ?? (k?.a ? `${k.a.navn} vs ${k.b.navn}` : '');
    const fraSpor = fra && tracks[fra.spor];
    openSheet(`
      <div class="topic-sheet" style="--grad:${tema.gradient}">
        <div class="topic-sheet-head"><span>${tema.emoji}</span><div><small>Tema på tværs af fag</small><h2>${esc(tema.navn)}</h2></div></div>
        <p><b>Grundidéen:</b> ${esc(tema.ide)}</p>
        ${fra ? `<p class="hint">Dette kort deler tema med et kort, du lige har set fra ${fraSpor ? `${fraSpor.emoji} ${esc(fraSpor.kort)}` : 'et andet spor'}:</p><blockquote class="bro-quote">${esc(titel(fra))}</blockquote>` : ''}
        <p class="hint">💡 Spørg dig selv: hvad er <b>ens</b>, og hvad er <b>forskelligt</b>? Sammenligning gør begge dele lettere at huske og bruge.</p>
        <div class="sheet-actions"><button class="primary" data-act="tema">Træn hele temaet</button></div>
      </div>`);
    $('#sheet [data-act="tema"]').addEventListener('click', () => { closeSheet(); restartFeed({ tema: tema.id }); });
  },
  onMore(trackId) {
    if (!tracks[trackId] || trackId === 'kobling') return;
    state.interest[trackId] = Math.min(3, (state.interest[trackId] ?? 1) + 0.3);
    save(state);
    toast(`${tracks[trackId].emoji} Mere ${tracks[trackId].kort} i dit feed`);
  },
  async onUddyb(card) {
    try {
      const r = await fetch('/api/uddyb', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: card.id }) });
      const data = await r.json();
      if (!r.ok) return toast(data.error ?? 'Kunne ikke uddybe');
      openSheet(`<h2>${esc(card.hook ?? card.sporgsmal ?? '')}</h2>${md(data.tekst)}`);
    } catch {
      toast('Serveren svarer ikke');
    }
  },
  onShowKoncept(id) {
    const k = feed.byId[id];
    if (k) openSheet(`<h2>${esc(k.hook)}</h2>${md(k.body)}`);
  },
  // Et koncept tæller som læst, når sidste slide vises (én gang pr. kort pr. session).
  onStoryProgress(card, i, total) {
    if (total < 2 || i !== total - 1 || readKoncepter.has(card.id)) return;
    readKoncepter.add(card.id);
    const teaser = missionEvent({ kind: 'koncept' });
    save(state);
    updateHud();
    if (teaser) toast(teaser);
  },
  trackProgress: (spor) => trackProgress(spor),
  stats: () => ({ streak: state.streak.count, answered: state.daily.answered, level: levelInfo(state.xp).level, freezes: state.streak.freezes }),
  scrollNext: () => feedEl.scrollBy({ top: feedEl.clientHeight, behavior: 'smooth' }),
};

const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = e.target.dataset.id;
      if (id && !state.seen[id]) state.seen[id] = Date.now();
      setActive(Number(e.target.dataset.index));
    }
  },
  { root: feedEl, threshold: 0.6 },
);

function setActive(index) {
  app.classList.toggle('compact', index > 0);
  if (index === activeIndex) return;
  const prev = feedEl.querySelector(`[data-index="${activeIndex}"]`);
  const dwell = performance.now() - activeSince;
  const prevTrack = prev?.dataset.spor;
  if (prev?.dataset.type === 'koncept' && tracks[prevTrack]) {
    const w = state.interest[prevTrack] ?? 1;
    if (dwell < 1500) state.interest[prevTrack] = Math.max(0.4, w - 0.05);
    else if (dwell > 8000) state.interest[prevTrack] = Math.min(3, w + 0.03);
  }
  activeIndex = index;
  activeSince = performance.now();
  save(state);
  ensureBuffer();
}

function ensureBuffer() {
  while (feed.count < activeIndex + 3) {
    const pick = feed.next();
    if (!pick) break;
    const card = feed.byId[pick.id] ?? { id: pick.id, type: pick.mode };
    const node = renderCard(card, pick.mode, ctx, pick.bro);
    node.dataset.index = feed.count - 1;
    node.dataset.id = feed.byId[pick.id] ? pick.id : '';
    node.dataset.type = card.type;
    node.dataset.spor = card.spor ?? '';
    feedEl.append(node);
    observer.observe(node);
  }
  save(state);
}

// filter: null, { spor } eller { pakke }
function restartFeed(filter) {
  feed.setFilter(filter);
  feedEl.querySelectorAll('.card').forEach((n) => observer.unobserve(n));
  feedEl.innerHTML = '';
  feedEl.scrollTop = 0;
  activeIndex = 0;
  activeSince = performance.now();
  app.classList.remove('compact');
  if (filter?.spor) hlPakke = tracks[filter.spor]?.pakke ?? null;
  if (filter?.pakke) hlPakke = filter.pakke;
  if (filter?.tema) hlPakke = 'temaer';
  currentFilter = filter;
  buildHighlights();
  ensureBuffer();
}

// ---------- HUD og story-ringe ----------

function updateHud() {
  // Tålmodig over for manglende elementer: HUD'en må aldrig kunne vælte resten.
  const sæt = (sel, v) => { const n = $(sel); if (n) n.textContent = v; };
  sæt('#streak', state.streak.count);
  const lvl = levelInfo(state.xp);
  sæt('#level', lvl.level);
  if ($('#level-fg')) $('#level-fg').style.width = `${Math.round(lvl.pct * 100)}%`;
  const pct = Math.min(1, state.daily.answered / state.goal);
  if ($('#goal-fg')) $('#goal-fg').style.strokeDashoffset = String(100 - pct * 100);
  // Ringen er nået: et hak siger mere end »10/10«, og teksten får plads igen.
  const naaet = state.daily.answered >= state.goal;
  sæt('#goal-label', naaet ? '✓' : `${state.daily.answered}/${state.goal}`);
  $('#goal-ring')?.classList.toggle('naaet', naaet);
  if ($('#level')) $('#level').parentElement.title = `Level ${lvl.level} · ${levelTitle(lvl.level)} · ${lvl.toNext} XP til næste`;
  // Boosten er midlertidig, så den får sin egen smalle linje i stedet for at skubbe til resten.
  const boost = $('#boost');
  if (boost) {
    boost.hidden = !boostActive();
    if (boostActive()) boost.innerHTML = `<span>⚡ XP ×${state.boost.mult}</span><small>${Math.ceil((state.boost.until - Date.now()) / 60_000)} min tilbage</small>`;
  }
  const missionsLeft = state.missions?.list.filter((m) => !isDone(m)).length ?? 0;
  const badge = $('#mission-badge');
  if (badge) {
    badge.hidden = missionsLeft === 0;
    badge.textContent = missionsLeft;
  }
  updateCombo();
  updateHighlightBadges();
  renderSides();
}

// ---------- Sidepaneler (desktop) ----------

const desktop = matchMedia('(min-width: 900px)');
const wide = matchMedia('(min-width: 1180px)');
const cardsBySpor = {};
for (const k of seed.kort) (cardsBySpor[k.spor] ??= []).push(k);

// Hvor meget af et spor man har været igennem (set eller besvaret).
function trackProgress(spor) {
  const list = cardsBySpor[spor] ?? [];
  return { learned: list.filter((k) => state.seen[k.id] || state.items[k.id]).length, total: list.length };
}

function renderSides() {
  if (!desktop.matches) return;
  const lvl = levelInfo(state.xp);
  const done = Math.min(state.daily.answered, state.goal);
  $('#side-profile').innerHTML = `
    <div class="side-card profile">
      <div class="profile-top">
        <div class="profile-ring">${ring(lvl.pct, 58, 6)}<b>${lvl.level}</b></div>
        <div><small>Level ${lvl.level}</small><strong>${esc(levelTitle(lvl.level))}</strong><em>${lvl.toNext} XP til næste</em></div>
      </div>
      <div class="profile-stats">
        <div><span class="fire">${icon('flame', 18)}</span><b>${state.streak.count}</b><small>dage i træk</small></div>
        <div><span class="ice">${icon('snow', 18)}</span><b>${state.streak.freezes}</b><small>streak-frys</small></div>
        <div><span class="xp">${icon('bolt', 18)}</span><b>${state.xp}</b><small>XP i alt</small></div>
      </div>
      ${boostActive() ? `<div class="side-boost">${icon('bolt', 16)} XP ×${state.boost.mult} · ${Math.ceil((state.boost.until - Date.now()) / 60_000)} min tilbage</div>` : ''}
    </div>
    <div class="side-card">
      <div class="side-head"><h3>Dagens mål</h3><span>${done}/${state.goal}</span></div>
      <div class="bar"><div style="width:${(done / state.goal) * 100}%"></div></div>
      <p class="side-note left">${state.daily.answered >= state.goal ? 'Nået. Det sidder bedst, hvis du stopper her og kommer igen i morgen.' : `${state.goal - done} svar mere, så holder din streak.`}</p>
    </div>`;

  if (!wide.matches) return;
  const d = daysToExam();
  const overall = overallReadiness();
  const weakest = examTracks().map((t) => ({ t, r: readiness(t.id) })).sort((a, b) => a.r - b.r)[0];
  const due = feed.dueCount(null);
  $('#side-right').innerHTML = `
    <div class="side-card">
      <div class="side-head"><h3>Dagens missioner</h3><span>${state.missions?.list.filter(isDone).length ?? 0}/3</span></div>
      <div class="side-missions">${missionsHtml()}</div>
      <p class="side-note">Nye missioner om ${hoursToMidnight()}</p>
    </div>
    <div class="side-card">
      <div class="side-head"><h3>Eksamensparathed</h3><span>${d === null ? 'ingen dato' : d > 0 ? `${d} dage` : 'i dag'}</span></div>
      <div class="ready-row">
        <div class="profile-ring big">${ring(overall, 72, 7)}<b>${pctText(overall)}</b></div>
        <p>${d === null ? 'Sæt din eksamensdato under Eksamen, så regnes parathed ud til den dag.' : 'Forventet sandsynlighed for at huske kortene på eksamensdagen.'}</p>
      </div>
      ${weakest ? `<button class="side-action" data-act="weakest" style="--grad:${weakest.t.gradient}">
        <span class="sa-emoji">${weakest.t.emoji}</span>
        <span><small>Svageste emne · ${pctText(weakest.r)}</small><b>${esc(weakest.t.titel)}</b></span>${icon('arrow', 18)}
      </button>` : ''}
    </div>
    <div class="side-card">
      <div class="side-head"><h3>Klar til gentagelse</h3><span>${due}</span></div>
      <p class="side-note left">${due ? `${due} kort er klar til at blive hentet frem igen. De blandes ind i feedet.` : 'Ingen kort er forfaldne lige nu. Lær noget nyt i feedet.'}</p>
      <button class="side-action plain" data-act="sim">${icon('exam', 18)}<span><b>Træk et eksamensemne</b></span>${icon('arrow', 18)}</button>
    </div>`;
  $('#side-right [data-act="weakest"]')?.addEventListener('click', () => { showView('feed'); restartFeed({ spor: weakest.t.id }); });
  $('#side-right [data-act="sim"]').addEventListener('click', () => startSim());
}

// Combo-meteret: ringen fyldes mod næste case (hver 5. i træk), og flammen vokser.
let shownCombo = 0;
function updateCombo() {
  const meter = $('#combo');
  if (!meter) return;
  const c = state.combo;
  if (c < 2) {
    if (shownCombo >= 3 && c === 0 && !meter.hidden) {
      meter.classList.add('broke');
      meter.querySelector('span').textContent = '💔';
      setTimeout(() => { meter.hidden = true; meter.classList.remove('broke'); }, 900);
    } else if (!meter.classList.contains('broke')) {
      meter.hidden = true;
    }
  } else {
    meter.hidden = false;
    meter.classList.remove('broke');
    meter.classList.toggle('hot', c >= 5);
    meter.classList.toggle('inferno', c >= 10);
    meter.style.setProperty('--p', (c % 5 || 5) / 5);
    meter.querySelector('span').textContent = c >= 10 ? '☄️' : '🔥';
    meter.querySelector('b').textContent = `×${c}`;
    if (c > shownCombo) meter.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'ease-out' });
  }
  shownCombo = c;
}

// Story-ringe: forsiden viser fagene; tryk på et fag for at se dets spor.
let hlPakke = null;
let currentFilter = null;
const filterKey = (f) => (f ? `${Object.keys(f)[0]}:${Object.values(f)[0]}` : null);
const sameFilter = (a, b) => filterKey(a) === filterKey(b);

function buildHighlights() {
  const bar = $('#highlights');
  bar.innerHTML = '';
  const add = ({ emoji, label, gradient, farve, filter, onClick, back }) => {
    const b = document.createElement('button');
    b.className = 'hl' + (!back && sameFilter(filter, currentFilter) ? ' on' : '') + (back ? ' back' : '');
    b.style.setProperty('--grad', gradient);
    b.style.setProperty('--accent', farve);
    b.filter = filter;
    b.innerHTML = `<div class="hl-ring"><span>${emoji}</span><i class="badge" hidden></i></div>${esc(label)}`;
    b.addEventListener('click', onClick ?? (() => restartFeed(filter)));
    bar.append(b);
    return b;
  };

  const tilbage = (til) => ({
    emoji: '‹', label: 'Tilbage', gradient: 'linear-gradient(#d9d9e3, #d9d9e3)', farve: '#999', back: true,
    onClick: () => { hlPakke = til; til === null ? restartFeed(null) : buildHighlights(); },
  });

  if (!hlPakke) {
    // Forsiden: Alle, grupperne og Temaer. Med 14 fag bliver en flad liste ubrugelig.
    add({ emoji: '✨', label: 'Alle', gradient: 'var(--ig)', farve: '#E1306C', filter: null });
    for (const g of seed.grupper) {
      if (!seed.pakker.some((p) => p.gruppe === g.id)) continue;
      const ring = add({
        emoji: g.emoji, label: g.navn, gradient: g.gradient, farve: g.farve,
        onClick: () => { hlPakke = `gruppe:${g.id}`; buildHighlights(); },
      });
      // Gruppens badge er summen af dens fag, ikke alle kort i appen.
      ring.gruppe = g.id;
    }
    add({
      emoji: '🔀', label: 'Temaer', gradient: 'linear-gradient(135deg, #36D1DC, #8E2DE2 50%, #F857A6)', farve: '#8E2DE2', back: false,
      filter: { tema: '__alle' }, onClick: () => { hlPakke = 'temaer'; buildHighlights(); },
    });
  } else if (hlPakke.startsWith('gruppe:')) {
    const g = seed.grupper.find((x) => x.id === hlPakke.slice(7));
    add(tilbage(null));
    for (const p of seed.pakker.filter((x) => x.gruppe === g.id)) {
      add({
        emoji: p.emoji, label: p.navn, gradient: p.gradient, farve: p.farve, filter: { pakke: p.id },
        onClick: () => { hlPakke = p.id; restartFeed({ pakke: p.id }); },
      });
    }
  } else if (hlPakke === 'temaer') {
    add(tilbage(null));
    for (const t of seed.temaer) add({ emoji: t.emoji, label: t.navn.split(' ')[0], gradient: t.gradient, farve: '#8E2DE2', filter: { tema: t.id } });
  } else {
    const p = seed.pakker.find((x) => x.id === hlPakke);
    add(tilbage(`gruppe:${p.gruppe}`));
    add({ emoji: p.emoji, label: `Hele ${p.navn}`, gradient: p.gradient, farve: p.farve, filter: { pakke: p.id } });
    for (const t of seed.spor.filter((x) => x.pakke === hlPakke)) {
      add({ emoji: t.emoji, label: `${t.nr ? `${t.nr}. ` : ''}${t.kort}`, gradient: t.gradient, farve: t.farve, filter: { spor: t.id } });
    }
  }
  updateHighlightBadges();
  bar.querySelector('.hl.on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
}

// Guiden: hvad knapperne gør, med et eksempel og en grund til hver.
function aabnGuide() {
  openSheet(guideHtml(), (node) => {
    node.querySelector('[data-act="guide-luk"]')?.addEventListener('click', closeSheet);
  });
  if (state.guideSet !== GUIDE_VERSION) {
    state.guideSet = GUIDE_VERSION;
    save(state);
  }
}

function initLogo() {
  $('#logo').addEventListener('click', () => {
    feedEl.scrollTo({ top: 0, behavior: 'smooth' });
    app.classList.remove('compact');
  });
}

function updateHighlightBadges() {
  const ringe = document.querySelectorAll('.hl');
  if (!ringe.length) return;
  // Ét gennemløb af kortene i stedet for ét pr. ring: det her kører efter hvert svar.
  const tal = feed.dueCounts();
  ringe.forEach((b) => {
    const badge = b.querySelector('.badge');
    if (!badge || b.classList.contains('back') || b.filter?.tema === '__alle') return;
    const n = b.gruppe
      ? seed.pakker.filter((p) => p.gruppe === b.gruppe).reduce((sum, p) => sum + (tal[`pakke:${p.id}`] ?? 0), 0)
      : b.filter ? (tal[filterKey(b.filter)] ?? 0) : tal.__alle;
    badge.hidden = n === 0;
    badge.textContent = n > 99 ? '99+' : n;
  });
}

// ---------- Visninger ----------

function showView(name) {
  for (const v of ['feed', 'eksamen', 'gemt', 'fremskridt']) $(`#view-${v}`).hidden = v !== name;
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('on', b.dataset.view === name));
  $('#hud').hidden = name !== 'feed';
  if (name === 'eksamen') renderExam();
  if (name === 'gemt') renderSaved();
  if (name === 'fremskridt') renderProgress();
  if (name !== 'feed') $(`#view-${name}`).scrollTop = 0;
}

const pctText = (x) => `${Math.round(x * 100)}%`;

function ring(pct, size = 64, stroke = 7) {
  const r = (size - stroke) / 2;
  return `<svg class="pring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" pathLength="100" class="bg" stroke-width="${stroke}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" pathLength="100" class="fg" stroke-width="${stroke}" style="stroke-dashoffset:${100 - pct * 100}"/>
  </svg>`;
}

function renderExam() {
  const d = daysToExam();
  const overall = overallReadiness();
  const topics = examTracks().map((t) => ({ t, r: readiness(t.id) })).sort((a, b) => a.t.nr - b.t.nr);
  const weakest = [...topics].sort((a, b) => a.r - b.r)[0];
  const hist = state.simHistory.slice(-5).reverse();

  $('#exam').innerHTML = `
    <div class="exam-hero">
      <div class="exam-top">
        <div>
          <div class="exam-count">${d === null ? 'Sæt din eksamensdato' : d > 0 ? `${d} ${d === 1 ? 'dag' : 'dage'} til eksamen` : d === 0 ? 'Eksamen i dag – du kan det! 💪' : 'Eksamen er overstået'}</div>
          <label class="exam-date">📅 <input type="date" id="exam-date" value="${state.examDate ?? ''}"></label>
        </div>
        <div class="big-ring">${ring(overall, 96, 10)}<div><b>${pctText(overall)}</b><small>parat</small></div></div>
      </div>
      <p class="exam-note">Parathed = den sandsynlighed, FSRS forudsiger for at du husker kortene ${d === null ? 'om 7 dage' : 'på eksamensdagen'}, hvis du ikke øver mere. Kort, du ikke har besvaret, tæller som 0.</p>
    </div>

    <button class="primary big" id="draw">🎲 Træk et eksamensemne</button>
    <button class="ghost wide weakest" id="weakest" style="--grad:${weakest.t.gradient}">
      <span>Træn dit svageste emne</span><b>${weakest.t.emoji} ${weakest.t.nr}. ${esc(weakest.t.titel)} · ${pctText(weakest.r)}</b>
    </button>

    <h3>Emner</h3>
    <div class="topic-grid">
      ${topics.map(({ t, r }) => `
        <button class="topic" data-track="${t.id}" style="--grad:${t.gradient}">
          <span class="topic-nr">${t.nr}</span>
          <span class="topic-emoji">${t.emoji}</span>
          <strong>${esc(t.titel)}</strong>
          <span class="topic-bar"><i style="width:${r * 100}%"></i></span>
          <small>${pctText(r)} parat · ⭐ ${mastered(t.id)}/${reviewables(t.id).length}</small>
        </button>`).join('')}
    </div>
    <button class="ghost wide" data-track="t00" id="basics">🖥️ Basics (forudsætning) · ${pctText(readiness('t00'))} parat</button>

    ${hist.length ? `<h3>Seneste simuleringer</h3><div class="sim-hist">${hist.map((h) => {
      const t = tracks[h.spor];
      return `<div class="sim-row" style="--grad:${t.gradient}"><span>${t.emoji}</span><div><b>${t.nr}. ${esc(t.titel)}</b><small>${h.dag} · disposition ${pctText(h.disposition)} · svar ${pctText(h.svar)}</small></div></div>`;
    }).join('')}</div>` : ''}

    <div class="method">
      <h3>Sådan virker træningen</h3>
      <p>🎤 <b>Forklar højt</b>: til mundtlig eksamen skal du kunne <i>producere</i> svaret, ikke genkende det. Øv i samme format som testen.</p>
      <p>⭐ <b>Mestret</b>: rigtigt på 3 forskellige dage (successive relearning, Rawson & Dunlosky).</p>
      <p>🎲 <b>Simulatoren</b> trækker et tilfældigt emne som til eksamen: disposition, derefter eksaminators spørgsmål.</p>
      <p>📉 <b>Svage emner</b> får automatisk mere plads i feedet, og tæt på eksamen kommer der flere gentagelser.</p>
    </div>`;

  $('#exam-date').addEventListener('change', (e) => {
    state.examDate = e.target.value || null;
    save(state);
    renderExam();
  });
  $('#draw').addEventListener('click', () => startSim());
  $('#weakest').addEventListener('click', () => { showView('feed'); restartFeed({ spor: weakest.t.id }); });
  $('#basics').addEventListener('click', () => { showView('feed'); restartFeed({ spor: 't00' }); });
  document.querySelectorAll('.topic').forEach((b) => b.addEventListener('click', () => openTopicSheet(b.dataset.track)));
}

function openTopicSheet(trackId) {
  const t = tracks[trackId];
  openSheet(`
    <div class="topic-sheet" style="--grad:${t.gradient}">
      <div class="topic-sheet-head"><span>${t.emoji}</span><div><small>Emne ${t.nr} · ${esc(t.lektion)}</small><h2>${esc(t.titel)}</h2></div></div>
      ${t.kerne ? `<div class="kerne">
        <h3>Kernen: det du skal kunne sige</h3>
        <ul>${t.kerne.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
      </div>` : ''}
      <p class="hint">Modeldisposition – brug den som rygrad i din fremlæggelse:</p>
      <ol class="dispo">${t.disposition.map((d) => `<li>${esc(d)}</li>`).join('')}</ol>
      <div class="sheet-actions">
        <button class="primary" data-act="sim">🎲 Simulér emnet</button>
        <button class="ghost" data-act="feed">Øv i feedet</button>
      </div>
    </div>`);
  $('#sheet [data-act="sim"]').addEventListener('click', () => { closeSheet(); startSim(trackId); });
  $('#sheet [data-act="feed"]').addEventListener('click', () => { closeSheet(); showView('feed'); restartFeed({ spor: trackId }); });
}

// ---------- Eksamenssimulator ----------

const PREP_SECONDS = 120;
let sim = null;

function startSim(fixedTrack = null) {
  clearInterval(sim?.timer);
  const pool = examTracks();
  sim = { track: fixedTrack ? tracks[fixedTrack] : pool[Math.floor(Math.random() * pool.length)], before: 0, dispo: 0, scores: [] };
  sim.before = readiness(sim.track.id);
  $('#sim').hidden = false;
  fixedTrack ? simPrep() : simDraw(pool);
}

function closeSim() {
  clearInterval(sim?.timer);
  sim = null;
  $('#sim').hidden = true;
  if (!$('#view-eksamen').hidden) renderExam();
}

function simScreen(html) {
  const body = $('#sim-body');
  body.innerHTML = html;
  body.scrollTop = 0;
  $('#sim').style.setProperty('--grad', sim.track.gradient);
  return body;
}

function simDraw(pool) {
  const body = simScreen(`
    <div class="sim-center">
      <p class="sim-kicker">Eksaminator trækker et emne …</p>
      <div class="slot"><span id="slot-emoji">🎲</span><b id="slot-name"></b></div>
    </div>`);
  let i = 0;
  let delay = 60;
  const spin = () => {
    const t = i < 18 ? pool[i % pool.length] : sim.track;
    body.querySelector('#slot-emoji').textContent = t.emoji;
    body.querySelector('#slot-name').textContent = `${t.nr}. ${t.titel}`;
    if (i++ < 18) {
      delay *= 1.1;
      setTimeout(spin, delay);
    } else {
      body.querySelector('.slot').classList.add('landed');
      confetti($('#sim'), 60);
      setTimeout(simPrep, 1100);
    }
  };
  spin();
}

function simPrep() {
  const t = sim.track;
  const body = simScreen(`
    <div class="sim-head"><span>${t.emoji}</span><div><small>Emne ${t.nr} · ${esc(t.lektion)}</small><h2>${esc(t.titel)}</h2></div></div>
    <div class="timer"><b id="timer">2:00</b><small>forberedelse</small></div>
    <p class="hint">Skriv stikord til din disposition: hvad vil du fremlægge, og i hvilken rækkefølge? Tænk også på øvelser og hand-ins, der passer til emnet.</p>
    <textarea id="dispo-notes" placeholder="1. …&#10;2. …&#10;3. …"></textarea>
    <button class="primary wide" id="dispo-done">Færdig → sammenlign med modeldisposition</button>`);
  let left = PREP_SECONDS;
  sim.timer = setInterval(() => {
    left--;
    const el = body.querySelector('#timer');
    if (!el) return clearInterval(sim.timer);
    el.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
    if (left <= 10) el.classList.add('urgent');
    if (left <= 0) { clearInterval(sim.timer); simDispo(); }
  }, 1000);
  body.querySelector('#dispo-done').addEventListener('click', simDispo);
}

function simDispo() {
  clearInterval(sim.timer);
  const notes = $('#dispo-notes')?.value ?? '';
  const t = sim.track;
  const body = simScreen(`
    <div class="sim-head small"><span>${t.emoji}</span><h2>${esc(t.titel)}</h2></div>
    <h3>Modeldisposition</h3>
    <p class="hint">Sæt flueben ved de punkter, din disposition dækkede.</p>
    ${notes.trim() ? `<div class="notes"><small>Dine stikord</small>${esc(notes).replace(/\n/g, '<br>')}</div>` : ''}
    <div class="checklist">${t.disposition.map((d, i) => `<label class="point"><input type="checkbox" data-i="${i}"><span>${esc(d)}</span></label>`).join('')}</div>
    <button class="primary wide" id="dispo-next">Videre → eksaminator spørger</button>`);
  body.querySelector('#dispo-next').addEventListener('click', () => {
    const boxes = [...body.querySelectorAll('input')];
    sim.dispo = boxes.filter((b) => b.checked).length / boxes.length;
    // Tre spørgsmål – helst dem, man husker dårligst.
    const now = Date.now();
    const weakFirst = (list) => list
      .map((k) => ({ k, r: state.items[k.id] ? retrievability(state.items[k.id], now) : 0, rnd: Math.random() }))
      .sort((a, b) => a.r - b.r || a.rnd - b.rnd)
      .map((x) => x.k);
    const own = weakFirst(seed.kort.filter((k) => k.spor === t.id && k.type === 'forklar')).slice(0, 2);
    // Tredje spørgsmål: et relateret emne, der deler tema – som når eksaminator »spørger ind til emner, der relaterer sig«.
    const myThemes = new Set(seed.kort.filter((k) => k.spor === t.id).flatMap((k) => [...feed.themesOf(k.id)]));
    const related = weakFirst(seed.kort.filter((k) => k.pakke === 'sw3sys' && k.spor !== t.id && k.type === 'forklar'
      && [...feed.themesOf(k.id)].some((th) => myThemes.has(th))));
    sim.related = related[0] ?? null;
    sim.questions = [...own, ...(sim.related ? [sim.related] : weakFirst(seed.kort.filter((k) => k.spor === t.id && k.type === 'forklar')).slice(2, 3))];
    simQuestion(0);
  });
}

function simQuestion(i) {
  const t = sim.track;
  const card = sim.questions[i];
  const body = simScreen(`
    <div class="sim-head small"><span>${t.emoji}</span><h2>${esc(t.titel)}</h2></div>
    <p class="sim-kicker">👩‍🏫 ${card === sim.related ? `Eksaminator spørger ind til et relateret emne: ${tracks[card.spor].emoji} ${esc(tracks[card.spor].titel)}` : 'Eksaminator spørger'} (${i + 1}/${sim.questions.length})</p>
    <div id="q"></div>
    <button class="primary wide" id="q-next" hidden>${i + 1 < sim.questions.length ? 'Næste spørgsmål →' : 'Se resultat →'}</button>`);
  body.querySelector('#q').append(forklarWidget(card, {
    compact: true,
    onDone: (ratio) => {
      sim.scores.push(ratio);
      const res = gradeCard(card, 'sim', gradeFromRatio(ratio), { xp: Math.round(10 + 40 * ratio) });
      body.querySelector('#q-next').hidden = false;
      return res;
    },
  }));
  body.querySelector('#q-next').addEventListener('click', () => (i + 1 < sim.questions.length ? simQuestion(i + 1) : simResult()));
}

function simResult() {
  const t = sim.track;
  const svar = sim.scores.reduce((a, b) => a + b, 0) / Math.max(1, sim.scores.length);
  const total = sim.dispo * 0.4 + svar * 0.6;
  const after = readiness(t.id);
  state.simHistory.push({ spor: t.id, dag: dayKey(), disposition: sim.dispo, svar });
  addXp(25);
  missionEvent({ kind: 'sim' }, false);
  if (total >= 0.75) { addXp(XP_FOR.sim); toast(`🎓 Stærk simulering · +${XP_FOR.sim} XP`); }
  save(state);
  updateHud();
  const verdict = total >= 0.85 ? ['🏆', 'Du er klar til det her emne'] : total >= 0.6 ? ['💪', 'Solidt – finpuds de røde punkter'] : total >= 0.35 ? ['🧩', 'Rygraden er der, detaljerne mangler'] : ['📖', 'Emnet skal have mere træning'];
  const body = simScreen(`
    <div class="sim-center">
      <div class="result-emoji">${verdict[0]}</div>
      <h2>${verdict[1]}</h2>
      <div class="result-grid">
        <div><b>${pctText(sim.dispo)}</b><small>disposition</small></div>
        <div><b>${pctText(svar)}</b><small>svar</small></div>
        <div><b>${pctText(sim.before)} → ${pctText(after)}</b><small>parathed</small></div>
      </div>
      ${t.kerne ? `<div class="kerne">
        <h3>Kernen i ${esc(t.kort)}</h3>
        <ul>${t.kerne.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
      </div>` : ''}
      <p class="hint">+25 XP for simuleringen. De spørgsmål, du manglede, er planlagt til gentagelse i feedet.</p>
      <button class="primary wide" id="sim-again">🎲 Træk nyt emne</button>
      <button class="ghost wide" id="sim-train">Træn ${esc(t.kort)} i feedet</button>
    </div>`);
  confetti($('#sim'), total >= 0.6 ? 120 : 40);
  body.querySelector('#sim-again').addEventListener('click', () => startSim());
  body.querySelector('#sim-train').addEventListener('click', () => { closeSim(); showView('feed'); restartFeed({ spor: t.id }); });
}

$('#sim-close').addEventListener('click', closeSim);

// ---------- Gemt og fremskridt ----------

function renderSaved() {
  const list = $('#saved-list');
  const cards = Object.keys(state.saved).map((id) => feed.byId[id]).filter(Boolean);
  if (cards.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${icon('heart', 30)}</div>
        <h3>Ingen gemte kort endnu</h3>
        <p>Dobbelttryk på et kort, eller tryk på hjertet i siden. Så samles de her til hurtig repetition før eksamen.</p>
        <button class="primary small" id="empty-feed">Gå til feedet</button>
      </div>`;
    $('#empty-feed').addEventListener('click', () => showView('feed'));
    return;
  }
  list.innerHTML = '<div class="saved-grid"></div>';
  const grid = list.firstElementChild;
  cards.forEach((c) => {
    const t = ctx.track(c.spor);
    const title = c.type === 'sammenlign' ? `${c.a.navn} vs ${c.b.navn}` : c.hook && !['koncept', 'kobling'].includes(c.type) ? c.sporgsmal : c.hook ?? c.sporgsmal ?? c.pastand;
    const item = document.createElement('button');
    item.className = 'saved-item';
    item.style.setProperty('--grad', t.gradient);
    item.innerHTML = `<span class="chip">${t.emoji} ${esc(t.kort)}</span><strong></strong>`;
    item.querySelector('strong').textContent = title;
    item.addEventListener('click', () => {
      let body;
      if (c.body) body = md(c.body);
      else if (c.type === 'forklar') body = `<ul>${c.punkter.map((p) => `<li>${esc(p.tekst)}</li>`).join('')}</ul>`;
      else if (c.type === 'raekkefolge') body = `<ol>${c.trin.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>${md(c.forklaring)}`;
      else if (c.type === 'sammenlign') body = `<ul>${c.udsagn.map((u) => `<li>${esc(u.tekst)} → <b>${esc(u.svar === 'a' ? c.a.navn : u.svar === 'b' ? c.b.navn : u.svar)}</b></li>`).join('')}</ul>${md(c.forklaring)}`;
      else {
        const svar = c.svar ?? ['Myte', 'Fakta'];
        body = `${c.scenarie ? md(c.scenarie) : ''}${c.pastand ? `<p>»${esc(c.pastand)}«</p>` : ''}${c.kode ? `<pre class="code"><code>${esc(c.kode)}</code></pre>` : ''}<p>Svar: <strong>${esc(svar[c.rigtigt])}</strong></p>${md(c.forklaring)}`;
      }
      openSheet(`<h2>${esc(title)}</h2>${body}`);
    });
    grid.append(item);
  });
}

function renderProgress() {
  renderStats($('#progress'), {
    state, seed, readiness, mastered, reviewables, levelInfo, retrievability, kalibrering,
    exportData: buildExport,
    openGuide: aabnGuide,
    reset() {
      if (confirm('Slet al fremskridt på denne enhed?')) { reset(); location.reload(); }
    },
  });
}

// ---------- Eksport af egne data ----------

// En kompakt opsummering, man kan dele i chatten: hvilke kort driller, og hvor godt det går.
// Kort-id'erne er de samme som i public/data/, så indholdet kan forbedres netop der.
function buildExport() {
  const log = Object.entries(state.log ?? {});
  const n = log.reduce((a, [, d]) => a + d.n, 0);
  const ok = log.reduce((a, [, d]) => a + d.ok, 0);
  const kort = {};
  for (const [id, it] of Object.entries(state.items)) {
    kort[id] = [it.reps ?? 0, it.lapses ?? 0, it.lastGrade ?? 0, Math.round(retrievability(it) * 100)];
  }
  const svaere = Object.entries(state.items)
    .filter(([, it]) => (it.lapses ?? 0) > 0)
    .sort((a, b) => (b[1].lapses ?? 0) - (a[1].lapses ?? 0))
    .slice(0, 15)
    .map(([id, it]) => `${id} (${it.lapses}× glemt)`);
  const emner = examTracks().map((t) => `${t.id}:${Math.round(readiness(t.id) * 100)}%`);
  // Træfsikkerhed pr. korttype og pr. fag, lagt sammen på tværs af dage.
  const saml = (vaelger) => {
    const ud = {};
    for (const [, d] of log) {
      for (const [k, v] of Object.entries(d[vaelger] ?? {})) {
        ud[k] ??= { n: 0, ok: 0 };
        ud[k].n += v.n;
        ud[k].ok += v.ok;
      }
    }
    return Object.fromEntries(Object.entries(ud).map(([k, v]) => [k, `${v.ok}/${v.n}`]));
  };
  const roert = new Set(Object.keys(state.items));
  const uberoert = seed.kort.filter((k) => REVIEWABLE.has(k.type) && !roert.has(k.id));
  return JSON.stringify({
    format: 'leths-app-data v1',
    forklaring: 'kort = { id: [antal svar, antal gange glemt, sidste karakter 1-4, husker nu i %] }',
    dato: dayKey(),
    level: levelInfo(state.xp).level,
    xp: state.xp,
    streak: state.streak.count,
    svar: { i_alt: n, rigtige: ok, procent: n ? Math.round((ok / n) * 100) : null },
    parathed_pr_emne: emner,
    rigtige_pr_korttype: saml('typer'),
    rigtige_pr_fag: saml('pakker'),
    kalibrering: saml('konf'),
    dage_med_aktivitet: log.length,
    aldrig_besvaret: uberoert.length,
    svaereste_kort: svaere,
    kort,
  }, null, 1);
}

// ---------- Milepæle ----------

// En milepæl, der kommer hvert andet kort, er ikke en milepæl. Der skal gå mindst
// otte svar imellem, ellers falder den senere hændelse bare bort.
let sidsteMilepael = -99;
function queueMilepael(kilde) {
  // Tælleren nulstilles ved døgnskift, så afstanden måles forfra på en ny dag.
  if (state.daily.answered < sidsteMilepael) sidsteMilepael = -99;
  if (state.daily.answered - sidsteMilepael < 8) return false;
  sidsteMilepael = state.daily.answered;
  feed.queueMilepael(kilde);
  return true;
}

// Tallene på et milepælskort er hentet fra din egen FSRS-tilstand, ikke fundet på.
function byggMilepael(kilde) {
  const om7 = Date.now() + 7 * DAY;
  const om7dage = seed.kort.filter(
    (k) => k.type === 'koncept' && state.items[k.id] && retrievability(state.items[k.id], om7) >= 0.9,
  ).length;
  const mestret = Object.values(state.items).filter((it) => (it.okDays?.length ?? 0) >= 3).length;
  const nyeIdag = seed.kort.filter((k) => state.seen[k.id] && dayKey(new Date(state.seen[k.id])) === dayKey()).length;

  const dage = Object.keys(state.readyHist ?? {}).sort();
  const foer = dage.length ? state.readyHist[dage[0]] : null;
  const nu = overallReadiness();

  const kort = milepaelKort(kilde, {
    om7dage,
    mestret,
    nyeIdag,
    svarIdag: state.daily.answered,
    parathed: nu,
    parathedDelta: foer != null && dage.length > 1 ? nu - foer : null,
    spor: null,
    kalibrering: kalibrering(state.log),
  });
  return { ...kort, indsigt: indsigtFor(state.daily.answered + state.streak.count) };
}

// ---------- Sheet og toast ----------

function openSheet(html, then) {
  $('#sheet-content').innerHTML = html;
  $('#sheet').hidden = false;
  then?.($('#sheet-content'));
}
function closeSheet() {
  $('#sheet').hidden = true;
}
$('#sheet').addEventListener('click', (e) => {
  if (e.target.id === 'sheet' || e.target.closest('#sheet-close')) closeSheet();
});

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 2400);
}

hydrateIcons();
document.querySelectorAll('.nav-btn').forEach((b) => b.addEventListener('click', () => showView(b.dataset.view)));
desktop.addEventListener('change', updateHud);
wide.addEventListener('change', updateHud);

rollDay();
initLogo();
buildHighlights();
updateHud();
ensureBuffer();
$('#goal-ring').addEventListener('click', openMissions);

// Første gang – og når guiden har fået nyt indhold – vises den af sig selv.
// En funktion, ingen kan finde, er det samme som ingen funktion.
if (state.guideSet !== GUIDE_VERSION) setTimeout(aabnGuide, 1200);

// Nye missioner: vis dem automatisk første gang i dag for brugere, der er i gang; nye brugere får et puf på ringen.
else if (state.missions && !state.missions.shown) {
  state.missions.shown = true;
  save(state);
  if (state.xp > 0) setTimeout(openMissions, 600);
  else $('#goal-ring').classList.add('nudge');
}
setInterval(() => { updateHighlightBadges(); updateHud(); }, 30_000);

if (state.streak.count > 0 && !state.daily.goalShown && new Date().getHours() >= 18) {
  setTimeout(() => toast(`🔥 Din streak på ${state.streak.count} dage er i fare`), 1200);
}
