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

Fagene samles i `public/data/index.js`. Der ligger også koblinger på tværs af
fagene. I story-ringene trykker du på et fag for at se dets spor. **Alle**
blander det hele.

## Faner

- **Feed**: blandet træning på tværs af emner. Tryk på en story-ring for at
  træne ét emne.
- **Eksamen**: eksamensdato, parathed pr. emne, modeldispositioner og
  🎲 simulatoren.
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
tools/valider.mjs            tjekker indholdet for fejl
tools/simuler-feed.mjs       viser feed-mixet
DESIGN.md                    forskningen bag hvert valg
```

## Tilføj eller ret indhold

Rediger `public/data/sw3sys/tNN-*.js` og kør:

```bash
node tools/valider.mjs
```

Korttyper: `koncept`, `quiz` (evt. med `kode`), `case`, `myte`, `forklar`
(med `punkter` og nøgle`ord`), `raekkefolge` (med `trin`) og `kobling`.
