# Leths super App

Scroll som på TikTok, men hvert kort gør dig klar til **mundtlig eksamen i
SW3SYS**. Appen har stories, quiz, kode-opgaver, forklar-højt-kort og en
eksamenssimulator, og gentagelserne styres af FSRS.

## Kør

```bash
npm start
```

Åbn http://localhost:3000. På telefonen (samme wifi) bruges computerens IP,
fx `http://192.168.0.12:3000`. Der er ingen afhængigheder, kun Node 20.12+.

## Fag

| Pakke | Indhold | Mappe |
|---|---|---|
| 🎓 SW3SYS | 12 eksamensemner + basics, simulator og parathed | `public/data/sw3sys/` |
| 🧮 AlgoDat | Kompleksitet i praksis | `public/data/dao/` |
| 🧠 Psykologi | Biases og hukommelse & indlæring | `public/data/psykologi/` |
| 🩺 Psykiatri | Diagnoser, angst og depression, psykose | `public/data/psykiatri/` |
| 🏛️ Filosofi | Stoicisme, tankeværktøjer, eksistens | `public/data/filosofi/` |
| 🤖 AI | Sådan lærer en model, sprogmodeller indefra, AI i praksis | `public/data/ai/` |
| 🌐 Teknologi | Internettet bag skærmen, kryptering og sikkerhed | `public/data/tek/` |

Fagene samles i `public/data/index.js`. Der ligger også koblinger på tværs af
fagene. I story-ringene trykker du på et fag for at se dets spor. **Alle**
blander det hele.

## Faner

- **Feed**: blandet træning på tværs af emner. Tryk på en story-ring for at
  træne ét emne.
- **Eksamen**: eksamensdato, parathed pr. emne, modeldispositioner og
  🎲 simulatoren.
- **Statistik**: grafer, inventar og en knap, der samler dine data (hvilke kort du svarer rigtigt og forkert) til deling.
- **Gemt**: kort du har dobbelttrykket på.
- **Fremskridt**: level, streak og mestring pr. emne.

## Struktur

```
server.js                    statiske filer + /api/* (klar til API-nøgle)
public/
  index.html, styles.css, exam.css
  data/sw3sys/               ét modul pr. eksamensemne + koblinger.js
  src/app.js                 UI, XP, streak, parathed, eksamenssimulator
  src/feed.js                feed-algoritmen
  src/fsrs.js                FSRS-5 spaced repetition
  src/render.js              korttyper
  src/store.js               localStorage
tools/valider.mjs            tjekker indholdet for fejl (også skæve svarmuligheder)
tools/svarlaengde.mjs        måler, om det rigtige svar kan gættes på længden
tools/fremskridt.mjs         læser dine eksporter i fremskridt/
fremskridt/                  dine gemte eksporter (ligger uden for public/)
tools/simuler-feed.mjs       viser feed-mixet
DESIGN.md                    forskningen bag hvert valg
```

## Gem dit fremskridt

Appen gemmer kun i browserens egen hukommelse. Vil du have dine data med videre,
så de kan læses igen senere:

1. **Statistik** → nederst: **Del dine data med Claude** → **Hent som fil**
   (på telefonen: **Del …** og send den til dig selv).
2. Læg filen i mappen `fremskridt/`.
3. Læs den med:

```bash
node tools/fremskridt.mjs
```

Den skriver, hvilke kort der driller, hvilke emner der er svagest, og
udviklingen, hvis der ligger flere filer. Se `fremskridt/LÆS-MIG.md`.

## Tilføj eller ret indhold

Rediger `public/data/sw3sys/tNN-*.js` og kør:

```bash
node tools/valider.mjs
```

Korttyper: `koncept`, `quiz` (evt. med `kode`), `case`, `myte`, `forklar`
(med `punkter` og nøgle`ord`), `raekkefolge` (med `trin`) og `kobling`.
