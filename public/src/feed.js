import { retrievability } from './fsrs.js';

// Feed-mixeren bestemmer hvilket kort, der kommer næst. Den blander:
//  - nyt stof (koncepter i rækkefølge, myter/cases/sammenlign når deres koncept er set)
//  - gentagelser, som FSRS siger er forfaldne
//  - quiz på et koncept få kort efter man har læst det (hentning med kort forsinkelse)
//  - »gæt først«-quiz før et nyt koncept (pretesting / nysgerrighedskløft)
//  - koblingskort, som låses op når begge sider er lært (variabel belønning)
//
// Blandingen er MENINGSFULD, ikke tilfældig: interleaving virker bedst mellem lignende
// kategorier (Brunmair & Richter 2019), fordi man ser forskellene, når de står side om side
// (Kang & Pashler 2012). Derfor foretrækker mixeren et kort fra et ANDET spor, der deler
// tema med de seneste kort – og fortæller brugeren om broen.

export const REVIEWABLE = new Set(['quiz', 'myte', 'case', 'forklar', 'raekkefolge', 'sammenlign']);
const PRETEST_CHANCE = 0.3;
const RECENT_WINDOW = 8;
const THEME_WINDOW = 3;

export class Feed {
  constructor(seed, state) {
    this.seed = seed;
    this.state = state;
    this.byId = Object.fromEntries(seed.kort.map((k) => [k.id, k]));
    this.quizFor = {};
    for (const k of seed.kort) if (k.type === 'quiz' && k.om) this.quizFor[k.om] = k.id;
    this.temaById = Object.fromEntries((seed.temaer ?? []).map((t) => [t.id, t]));
    this.themes = this.buildThemes(seed);
    this.filter = null;
    // Kan sættes udefra: vægt pr. spor (fx lav eksamensparathed = højere vægt) og
    // andel gentagelser (stiger tæt på eksamen).
    this.trackWeight = () => 1;
    this.reviewBias = () => 0;
    this.reset();
  }

  // kort-id → Set af tema-id'er. Afledte kort arver fra deres koncept.
  buildThemes(seed) {
    const byKoncept = {};
    for (const t of seed.temaer ?? []) for (const k of t.koncepter) (byKoncept[k] ??= new Set()).add(t.id);
    const map = {};
    for (const c of seed.kort) {
      const set = new Set([...(byKoncept[c.id] ?? []), ...(byKoncept[c.om] ?? []), ...(byKoncept[c.efter] ?? [])]);
      if (c.type === 'kobling') for (const r of c.kraever) {
        const req = this.byId[r];
        for (const id of [r, req?.om, req?.efter]) for (const t of byKoncept[id] ?? []) set.add(t);
      }
      map[c.id] = set;
    }
    return map;
  }

  themesOf(id) {
    return this.themes[id] ?? new Set();
  }

  reset() {
    this.generated = [];   // [{id, mode, bro?}]
    this.pending = [];     // [{id, mode, at}]
    this.emptyShown = false;
    this.introduced = new Set(); // vist eller lagt i bufferen i denne session
  }

  // filter: null (alt), { spor }, { pakke } eller { tema }
  setFilter(filter) {
    this.filter = filter;
    this.reset();
  }

  get count() { return this.generated.length; }

  matches(card, filter = this.filter) {
    if (!filter) return true;
    if (filter.tema) return this.themesOf(card.id).has(filter.tema);
    // En kobling hører til filteret, hvis en af de kort, den kræver, gør.
    if (card.type === 'kobling') return card.kraever.some((id) => this.byId[id] && this.matches(this.byId[id], filter));
    return filter.spor ? card.spor === filter.spor : card.pakke === filter.pakke;
  }

  matchesFilter(card) {
    return this.matches(card);
  }

  insert(id, mode, at) {
    this.pending.push({ id, mode, at });
  }

  // Et forkert svar kommer igen om ca. fire kort.
  scheduleRetry(id, activeIndex) {
    if (this.pending.some((p) => p.id === id)) return;
    this.insert(id, 'retry', Math.max(this.count, activeIndex + 4));
  }

  queueGoal() {
    this.insert('__maal', 'maal', this.count);
  }

  queueMilepael(kilde = 'combo') {
    this.queueReward('__milepael', `milepael:${kilde}`);
  }

  // Milepælskort spredes ud med mindst to
  // almindelige kort imellem, så de ikke kommer i klump.
  queueReward(id, mode) {
    const REWARD = new Set(['__milepael']);
    if (this.pending.some((p) => p.mode === mode)) return;
    const lastShown = this.generated.findLastIndex((g) => REWARD.has(g.id));
    const taken = [...this.pending.filter((p) => REWARD.has(p.id)).map((p) => p.at), ...(lastShown >= 0 ? [lastShown] : [])];
    this.insert(id, mode, Math.max(this.count, ...taken.map((at) => at + 3)));
  }

  dueCount(filter, now = Date.now()) {
    return this.seed.kort.filter((k) => REVIEWABLE.has(k.type) && this.matches(k, filter) && this.state.items[k.id]?.due <= now).length;
  }

  // Alle badge-tal i ét gennemløb i stedet for ét gennemløb pr. story-ring.
  // Nøglerne matcher filterKey i app.js: 'spor:t04', 'pakke:dao', 'tema:...'.
  dueCounts(now = Date.now()) {
    const tal = { __alle: 0 };
    const tael = (nøgle) => { tal[nøgle] = (tal[nøgle] ?? 0) + 1; };
    for (const k of this.seed.kort) {
      if (!REVIEWABLE.has(k.type) || !(this.state.items[k.id]?.due <= now)) continue;
      tal.__alle++;
      // En kobling tæller med i de spor og fag, dens for-kort kommer fra.
      const kilder = k.type === 'kobling'
        ? (k.kraever ?? []).map((id) => this.byId[id]).filter(Boolean)
        : [k];
      for (const spor of new Set(kilder.map((x) => x.spor))) tael(`spor:${spor}`);
      for (const pakke of new Set(kilder.map((x) => x.pakke))) tael(`pakke:${pakke}`);
      for (const tema of this.themesOf(k.id)) tael(`tema:${tema}`);
    }
    return tal;
  }

  next() {
    const pick = this.pickNext();
    if (pick) {
      this.introduced.add(pick.id);
      this.generated.push(pick);
    }
    return pick;
  }

  // ---------- Meningsfuld blanding ----------

  // Hvilke temaer deler kandidaten med de seneste kort – og fra hvilket spor kom det?
  bridge(card) {
    const recent = this.generated.slice(-THEME_WINDOW).map((g) => this.byId[g.id]).filter(Boolean).reverse();
    const mine = this.themesOf(card.id);
    if (!mine.size) return null;
    for (const prev of recent) {
      if (prev.spor === card.spor || prev.type === 'kobling') continue;
      for (const t of this.themesOf(prev.id)) if (mine.has(t)) return { tema: t, fra: prev.id };
    }
    return null;
  }

  relatedBonus(card) {
    return this.bridge(card) ? 1 : 0;
  }

  withBridge(pick) {
    const card = this.byId[pick.id];
    const bro = card && this.bridge(card);
    return bro ? { ...pick, bro } : pick;
  }

  pickNext() {
    const now = Date.now();
    const recent = new Set(this.generated.slice(-RECENT_WINDOW).map((g) => g.id));

    // 1. Planlagte indsættelser. Efter to koncepter i træk trækkes næste quiz frem,
    //    så man aldrig får mere end to nye ting uden at skulle hente noget frem.
    const lastTwo = this.generated.slice(-2).map((g) => this.byId[g.id]?.type);
    const forceQuiz = lastTwo.length === 2 && lastTwo.every((t) => t === 'koncept');
    const usable = (p) => p.id.startsWith('__') || this.matchesFilter(this.byId[p.id]);
    let idx = this.pending.findIndex((p) => p.at <= this.count && usable(p));
    if (idx < 0 && forceQuiz) {
      const quizzes = this.pending.filter((p) => usable(p) && p.mode === 'check').sort((x, y) => x.at - y.at);
      if (quizzes.length) idx = this.pending.indexOf(quizzes[0]);
    }
    if (idx >= 0) {
      const [p] = this.pending.splice(idx, 1);
      return this.withBridge({ id: p.id, mode: p.mode });
    }

    // 2. Oplåst kobling (sjælden overraskelse).
    if (this.count >= 3) {
      const kobling = this.unlockedKoblinger().find((k) => !this.known(k.id) && this.matchesFilter(k));
      if (kobling && Math.random() < 0.5) return { id: kobling.id, mode: 'kobling' };
    }

    const pendingIds = new Set(this.pending.map((p) => p.id));
    const cards = this.seed.kort.filter((k) => this.matchesFilter(k));

    const due = cards
      .filter((k) => REVIEWABLE.has(k.type))
      .filter((k) => this.state.items[k.id] && this.state.items[k.id].due <= now)
      .filter((k) => !recent.has(k.id) && !pendingIds.has(k.id));

    const fresh = this.newCandidates(cards, pendingIds);

    const last = this.generated.slice(-2).map((g) => this.byId[g.id]);
    const lastTrack = last.at(-1)?.spor;
    const twoKoncepter = last.length === 2 && last.every((c) => c?.type === 'koncept');

    const pDue = Math.min(0.85, 0.3 + due.length * 0.05 + this.reviewBias());
    const wantDue = due.length > 0 && (fresh.length === 0 || twoKoncepter || Math.random() < pDue);

    if (wantDue) return this.withBridge({ id: this.pickDue(due, lastTrack, now).id, mode: 'review' });

    if (fresh.length > 0) {
      const card = this.pickByInterest(fresh, lastTrack);
      if (card.type === 'koncept') return this.withBridge(this.introduceKoncept(card));
      if (card.type === 'quiz') return this.withBridge({ id: card.id, mode: 'check' });
      return this.withBridge({ id: card.id, mode: 'new' });
    }

    // 3. Intet forfaldent og intet nyt: bonusrunde med det der er svagest husket.
    const bonus = cards
      .filter((k) => REVIEWABLE.has(k.type) && this.state.items[k.id] && !recent.has(k.id) && !pendingIds.has(k.id));
    if (bonus.length > 0) return this.withBridge({ id: this.pickDue(bonus, lastTrack, now).id, mode: 'bonus' });

    if (!this.emptyShown) {
      this.emptyShown = true;
      return { id: '__tom', mode: 'tom' };
    }
    return null;
  }

  // Blandt de 8 svagest huskede: foretræk et andet spor med fælles tema.
  pickDue(list, lastTrack, now) {
    const weakest = [...list]
      .sort((a, b) => retrievability(this.state.items[a.id], now) - retrievability(this.state.items[b.id], now))
      .slice(0, 8);
    let best = weakest[0];
    let bestScore = -Infinity;
    for (const c of weakest) {
      const score = (1 - retrievability(this.state.items[c.id], now))
        + 0.5 * this.relatedBonus(c)
        - (c.spor === lastTrack ? 0.6 : 0)
        + Math.random() * 0.15;
      if (score > bestScore) { bestScore = score; best = c; }
    }
    return best;
  }

  known(id) {
    return !!this.state.seen[id] || this.introduced.has(id);
  }

  // Næste koncept pr. spor + afledte kort, hvis deres koncept er set.
  newCandidates(cards, pendingIds) {
    const known = (id) => this.known(id);
    const out = [];
    const tracks = new Set(cards.map((c) => c.spor));
    for (const t of tracks) {
      const nextKoncept = cards
        .filter((c) => c.spor === t && c.type === 'koncept' && !known(c.id))
        .sort((a, b) => a.orden - b.orden)[0];
      if (nextKoncept) out.push(nextKoncept);
    }
    for (const c of cards) {
      // Myter, cases, kode-quizzer, sammenlign-, forklar- og rækkefølge-kort låses op af deres koncept.
      if (c.efter && !c.om && !known(c.id) && known(c.efter) && !pendingIds.has(c.id)) out.push(c);
      // Quiz til et set koncept, der aldrig blev besvaret (fx efter filterskift eller genindlæsning).
      if (c.type === 'quiz' && this.state.seen[c.om] && !this.state.items[c.id] && !this.introduced.has(c.id) && !pendingIds.has(c.id)) out.push(c);
    }
    return out;
  }

  pickByInterest(candidates, lastTrack) {
    const pool = candidates.some((c) => c.spor !== lastTrack) ? candidates.filter((c) => c.spor !== lastTrack) : candidates;
    // Relaterede kort (fælles tema med de seneste kort fra et andet spor) får 2,5× vægt.
    const weights = pool.map((c) => (this.state.interest[c.spor] ?? 1) * this.trackWeight(c.spor) * (1 + 1.5 * this.relatedBonus(c)));
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r <= 0) return pool[i];
    }
    return pool.at(-1);
  }

  introduceKoncept(card) {
    const quizId = this.quizFor[card.id];
    this.introduced.add(card.id);
    if (!quizId) return { id: card.id, mode: 'new' };

    if (Math.random() < PRETEST_CHANCE) {
      // Gæt først → koncept → rigtig quiz lidt senere.
      this.insert(card.id, 'new', this.count + 1);
      this.insert(quizId, 'check', this.count + 4 + Math.floor(Math.random() * 2));
      return { id: quizId, mode: 'pretest' };
    }
    this.insert(quizId, 'check', this.count + 3 + Math.floor(Math.random() * 3));
    return { id: card.id, mode: 'new' };
  }

  unlockedKoblinger() {
    return this.seed.kort.filter(
      (k) => k.type === 'kobling' && k.kraever.every((id) => (this.state.items[id]?.lastGrade ?? 1) > 1),
    );
  }
}
