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
| 🔐 Cybersikkerhed | Sådan bliver man hacket, og sikker kode | `public/data/sikkerhed/` |
| 🏗️ Business | Start et firma i Danmark, og er der en forretning i det? | `public/data/business/` |
| 📈 Investering | Renters rente og risiko, skat og konti i Danmark | `public/data/invest/` |
| 🗄️ Databaser | Tabeller, nøgler og joins · indeks, planer og transaktioner | `public/data/db/` |
| 🛠️ Værktøj | Sådan tænker Git | `public/data/vaerktoj/` |
| 🧱 Arkitektur | Kobling og abstraktion · test der fanger noget | `public/data/arkitektur/` |
| 📶 Drift | Cache, køer og CAP · når systemet fejler | `public/data/drift/` |

Fagene samles i `public/data/index.js`. Der ligger også koblinger på tværs af
fagene. Ringene i toppen har tre niveauer: **gruppe** (Kode, Mennesker, Penge)
→ **fag** → **spor**. **Alle** blander det hele.

## Offline og på hjemskærmen

Appen er en PWA. En service worker cacher alt undtagen videoerne, så den
virker i bussen uden net – videoer gemmes efterhånden, som du ser dem.
På telefonen kan du lægge den på hjemskærmen fra browserens menu, og så
åbner den uden adresselinje.

Filerne genereres, så listen ikke kan blive forældet:

```bash
node tools/sw.mjs
```

`node tools/sw.mjs --tjek` fejler, hvis `public/sw.js` ikke er opdateret.
Ikonerne laves med `node tools/ikon.mjs` (ingen afhængigheder – PNG'erne
skrives i hånden).

## Faner

- **Feed**: blandet træning på tværs af emner. Tryk på en story-ring for at
  træne ét emne.
- **Eksamen**: din plan (hvad der giver mest lige nu), eksamensdato,
  parathed pr. emne, modeldispositioner og 🎲 simulatoren.
- **Statistik**: grafer, kalibrering (rammer du, når du siger »Sikker«?) og en
  knap, der samler dine data (hvilke kort du svarer rigtigt og forkert) til deling.
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

### Nyt spor eller nyt fag

```bash
node tools/nyt-fag.mjs db/normalisering "Normalisering fra 1NF til 3NF" 🧩
```

Værktøjet skriver skabelonen med kommentarer om, hvad hvert felt skal indeholde,
og printer de **to linjer**, du skal sætte ind i `public/data/index.js`: en import
og en plads i `FAG`-tabellen. Resten – pakker, spor, kort og id-præfikser – følger
af sig selv. Et nyt fag kan få `gruppe: 'kode' | 'menneske' | 'penge'`; uden
gruppe havner det i »Andet«.

Tre ting, der er lette at glemme:
- **Spor-id'er skal være globalt unikke** (`kobling` er reserveret til tværfaglige kort).
- Lad ikke det rigtige svar stå samme sted hver gang – validatoren fejler over 40 %.
- Alle fire svarmuligheder skal være nogenlunde lige lange.

### Ret eksisterende kort

Rediger filen under `public/data/` og kør:

```bash
node tools/valider.mjs
```

Validatoren er porten: den fanger tomme felter, for lange koncepter, ugyldige
referencer, svar der kan gættes på længden, og at facit altid står samme sted.
`node tools/svarlaengde.mjs --liste` viser detaljerne om længde.

Korttyper: `koncept`, `quiz` (evt. med `kode`), `case`, `myte`, `forklar`
(med `punkter` og nøgle`ord`), `raekkefolge` (med `trin`), `sammenlign`
(med `udsagn`), `video` og `kobling`.

Analogier, tegninger og »hvorfor«-afsnit til et koncept ligger i
`public/data/forklaringer*.js` og lægges oven på kortet ud fra dets id.
