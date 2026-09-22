// Git: den model, de fleste aldrig får fortalt – og som gør alle kommandoerne indlysende.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'git', nr: 0, titel: 'Sådan tænker Git', kort: 'Git', emoji: '🌿',
    farve: '#F05133', gradient: 'linear-gradient(135deg, #F05133 0%, #FCAF45 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Git gemmer ikke ændringer. Git gemmer hele mappen, hver gang.',
      body: 'I en rundspørge blandt erfarne udviklere svarede omkring **halvdelen**, at Git gemmer forskellene mellem versioner. Det gør den ikke.\n\nHver commit er et **snapshot**: en komplet optegnelse over, hvordan alle filer så ud i det øjeblik. Filer, der ikke er ændret, gemmes ikke igen – der peges bare på den samme indholdsblok som før.\n\nDet er muligt, fordi Git er et **content-addressable** lager: alt navngives efter hashen af sit eget indhold. To identiske filer har samme hash og fylder derfor én gang, uanset hvor mange commits de optræder i.\n\nEn commit indeholder:\n• et **tree** (mappen, med hashes på filerne)\n• en eller flere **parents** (den forrige commit)\n• forfatter, tidspunkt og besked\n\nDe diffs, du ser i `git diff` og `git log -p`, **regnes ud i farten** ved at sammenligne to snapshots. De ligger ikke gemt nogen steder.\n\nNår du har den model, giver resten sig selv: historikken er en graf af snapshots, og kommandoerne flytter rundt på pile.',
      analogi: 'Ikke en logbog over, hvad du har lavet om – men et fotoalbum, hvor der er taget et billede af hele værelset hver gang. Ændrede du kun stolen, genbruges billedet af sengen fra i går.',
      figur: {
        titel: 'Snapshots, ikke diffs',
        svg: svg(180, `
          ${box(14, 30, 84, 46, 'commit A', { ...BLAA, size: 11 })}
          ${box(118, 30, 84, 46, 'commit B', { ...BLAA, size: 11 })}
          ${box(222, 30, 84, 46, 'commit C', { ...BLAA, size: 11 })}
          ${pil(118, 53, 100, 53)}
          ${pil(222, 53, 204, 53)}
          ${txt(160, 92, 'hver pil peger på sin forælder', { size: 10 })}
          ${box(14, 104, 84, 22, 'hele mappen', { ...GROEN, size: 9 })}
          ${box(118, 104, 84, 22, 'hele mappen', { ...GROEN, size: 9 })}
          ${box(222, 104, 84, 22, 'hele mappen', { ...GROEN, size: 9 })}
          ${txt(160, 146, 'Uændrede filer peger på samme indhold – de fylder ikke igen', { size: 10 })}
          ${txt(160, 166, 'git diff regner forskellen ud, når du spørger', { size: 10, farve: '#F05133' })}`),
        tekst: 'Derfor kan du hente en hvilken som helst commit frem direkte, uden at spille en kæde af ændringer igennem.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad gemmer en Git-commit?',
      svar: [
        'Forskellen fra den forrige commit i projektet',
        'Kun de filer, du udtrykkeligt har markeret',
        'En liste over de kommandoer, du har kørt',
        'Et komplet snapshot af alle filer på det tidspunkt',
      ],
      rigtigt: 3,
      forklaring: 'Snapshot. Uændrede filer genbruger den samme indholdsblok, så det fylder ikke mere – men modellen er hele mappen, ikke en ændring.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'En branch er en fil på 41 bytes. Det er hele implementeringen.',
      body: 'En branch lyder tungt: »lad mig lave en gren«. I virkeligheden er `.git/refs/heads/main` en tekstfil med **40 tegn hash og et linjeskift**.\n\nDerfor er branches gratis. At oprette en er at skrive en lille fil. At slette en er at fjerne den – **commit\'erne forsvinder ikke**, de mister bare navnet.\n\n**HEAD** er endnu en lille fil, som siger, hvor du står. Normalt indeholder den `ref: refs/heads/main`, altså »jeg følger main«. Peger HEAD direkte på en hash i stedet, er du i **detached HEAD**: du står på en commit uden navn, og nye commits får intet navn med.\n\nMed den model bliver kommandoerne til tre slags handlinger:\n• Lav en ny commit → grafen vokser.\n• Flyt en pil → `git reset`, `git branch -f`.\n• Flyt HEAD → `git checkout`, `git switch`.\n\nOg fordi commits ikke slettes med det samme, kan næsten alt fortrydes. `git reflog` viser, hvor HEAD har været, så du kan finde en commit tilbage, som du troede var væk.',
      analogi: 'En branch er ikke en kopi af hele projektet. Det er et bogmærke. At lave et nyt bogmærke koster ingenting – og river du bogmærket ud, står siderne der stadig.',
      figur: {
        titel: 'Tre pile, én graf',
        svg: svg(180, `
          ${box(24, 60, 66, 34, 'A', { ...HVID, size: 12 })}
          ${box(112, 60, 66, 34, 'B', { ...HVID, size: 12 })}
          ${box(200, 60, 66, 34, 'C', { ...HVID, size: 12 })}
          ${pil(112, 77, 92, 77)}
          ${pil(200, 77, 180, 77)}
          ${box(190, 18, 86, 24, 'main', { ...GROEN, size: 11 })}
          ${pil(233, 44, 233, 58, { farve: '#11998E' })}
          ${box(92, 112, 86, 24, 'feature', { ...BLAA, size: 11 })}
          ${pil(135, 110, 135, 96, { farve: '#2563EB' })}
          ${box(276, 104, 30, 24, 'HEAD', { ...GUL, size: 8 })}
          ${pil(280, 102, 258, 46, { farve: '#c9a227' })}
          ${txt(160, 166, 'En branch er et navn på en commit – ikke en kopi af koden', { size: 10 })}`),
        tekst: 'At skifte branch flytter HEAD og opdaterer filerne i din mappe. Selve grafen rører man ikke.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad sker der med commits, når du sletter en branch?',
      svar: [
        'De flyttes automatisk over på projektets main-branch',
        'De bliver liggende, men mister navnet, der pegede på dem',
        'De pakkes sammen til én enkelt commit på main',
        'De slettes sammen med branchen med det samme, uden varsel',
      ],
      rigtigt: 1,
      forklaring: 'Branchen var kun et navn. Commit\'erne ligger der stadig og kan findes igen med `git reflog`, indtil oprydningen (gc) fjerner det, intet peger på.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Merge bevarer historien. Rebase skriver en pænere en. Begge dele er et valg.',
      body: '**Merge** laver en ny commit med **to forældre**. Grafen viser præcis, hvad der skete: to spor, der mødtes.\n\n**Rebase** tager dine commits og **laver dem om** oven på en anden commit. Resultatet er en lige linje, som om du havde arbejdet forfra hele tiden.\n\nDet vigtige: rebase laver **nye commits med nye hashes**. De gamle bliver liggende, indtil de ryddes op, men dine er ikke længere de samme objekter.\n\nDeraf den ene regel, der betyder noget: **rebase aldrig noget, andre har hentet ned.** Har de dine gamle commits, og du erstatter dem med nye, får de to udgaver af den samme historie – og nu er det dem, der skal rydde op.\n\nPå dine egne, ikke-delte commits er rebase helt ufarlig og faktisk det pæne valg: du kan rette en commit-besked, slå småting sammen og fjerne »fix typo«, før nogen ser det.\n\nEn konflikt er i øvrigt ikke en fejl. Det er Git, der siger: to snapshots ændrer de samme linjer, og jeg gætter ikke på, hvem der har ret.',
      analogi: 'Merge er at hæfte to versioner af rapporten sammen med en forside, der forklarer, at de blev slået sammen. Rebase er at skrive dine afsnit ind i den nye udgave, så det ser ud, som om de altid har stået der.',
      hvorfor: 'Det forklarer også, hvorfor `git push --force` er farligt: du beder serveren om at glemme den historie, alle andre allerede har.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvornår er rebase et dårligt valg?',
      svar: [
        'Når branchen er ældre end et par dage',
        'Når der er mere end tre commits at flytte',
        'Når commit\'erne allerede er delt med andre',
        'Når der kan opstå konflikter undervejs',
      ],
      rigtigt: 2,
      forklaring: 'Rebase laver nye commits med nye hashes. Har andre de gamle, findes historien nu i to udgaver. På dine egne, ikke-pushede commits er rebase helt sikker.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Tre områder, og alle Git-kommandoer flytter noget mellem dem.',
      body: 'Filerne findes tre steder på én gang:\n\n• **Working directory**: dine filer, som de er lige nu.\n• **Staging area** (index): det, der kommer med i næste commit.\n• **Repository**: de commits, der allerede er lavet.\n\nKommandoerne er bare flytninger:\n\n`git add` → working → staging\n`git commit` → staging → repository\n`git restore --staged` → staging → working (tag det ud af næste commit igen)\n`git restore <fil>` → repository → working (smid dine ændringer væk)\n\nDe tre `reset`-varianter er den samme forskel:\n• `--soft`: flyt kun branch-pilen. Alt ligger stadig i staging.\n• `--mixed` (standard): flyt pilen, og ryd staging. Filerne er urørte.\n• `--hard`: flyt pilen, ryd staging, **og** overskriv dine filer. Det er den eneste af dem, der kan smide arbejde væk for altid, fordi ændringer, der aldrig er committet, ikke findes i reflog.\n\nStaging virker som et unødigt ekstra trin, indtil den dag, du vil dele én fils ændringer op i to commits, der hver giver mening.',
      analogi: 'Working directory er skrivebordet. Staging er den bunke, du har lagt til side og skal aflevere. Repository er arkivskabet. Man kan lægge noget i bunken, fortryde og tage det op igen – arkivskabet mærker ingenting.',
      figur: {
        titel: 'De tre områder',
        svg: svg(180, `
          ${box(14, 40, 86, 44, 'Working', { ...ROSA, size: 11 })}
          ${box(117, 40, 86, 44, 'Staging', { ...GUL, size: 11 })}
          ${box(220, 40, 86, 44, 'Repository', { ...GROEN, size: 10 })}
          ${pil(102, 54, 115, 54, { farve: '#c9a227' })}
          ${pil(205, 54, 218, 54, { farve: '#11998E' })}
          ${txt(108, 30, 'add', { size: 10, farve: '#c9a227' })}
          ${txt(211, 30, 'commit', { size: 10, farve: '#11998E' })}
          ${pil(218, 74, 205, 74, { farve: '#999' })}
          ${pil(115, 74, 102, 74, { farve: '#999' })}
          ${txt(160, 100, 'restore går den anden vej', { size: 10 })}
          ${box(14, 116, 292, 22, 'reset --soft: kun pilen · --mixed: + staging', { ...BLAA, size: 10 })}
          ${box(14, 142, 292, 22, 'reset --hard: + dine filer. Den kan smide arbejde væk', { ...ROSA, size: 10 })}`),
        tekst: 'Alt, der er committet, kan findes igen med reflog. Det, der aldrig blev committet, kan ikke.',
      },
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvilken reset-variant kan smide ikke-committet arbejde væk for altid?',
      svar: [
        'git reset --mixed, som rydder staging-området',
        'git reset --hard, som også overskriver filerne',
        'Ingen af dem, alt kan findes igen med reflog',
        'git reset --soft, som flytter branch-pilen',
      ],
      rigtigt: 1,
      forklaring: '`--hard` overskriver dine filer. Reflog kan finde commits tilbage, men ændringer, der aldrig blev committet, findes ikke noget sted.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'At oprette en branch kopierer hele projektet.',
      rigtigt: 0,
      forklaring: 'Myte. Det skriver en fil med 40 tegn. Det er derfor, branches i Git er gratis, hvor de i ældre systemer var noget, man tænkte sig om to gange over.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'En merge-konflikt betyder, at Git har lavet en fejl.',
      rigtigt: 0,
      forklaring: 'Myte. Det betyder, at to snapshots ændrer de samme linjer, og at Git nægter at gætte på, hvem der har ret. Det er den rigtige opførsel.',
    },
    {
      id: 'case1', type: 'case', efter: 'k4',
      scenarie: 'Du har lavet tre commits på din feature-branch, men opdager, at du stod på main hele tiden. Intet er pushet endnu.',
      sporgsmal: 'Hvad er den rigtige redning?',
      svar: [
        'Kør git reset --hard, og skriv de tre commits om igen',
        'Lav en branch her, og flyt main tilbage til origin/main',
        'Push med --force, så serveren accepterer historien',
        'Slet mappen, og klon projektet forfra fra serveren',
      ],
      rigtigt: 1,
      forklaring: 'Commits er allerede lavet og ligger i grafen. `git branch feature` giver dem et navn, hvorefter `git reset --hard origin/main` flytter main tilbage. Intet arbejde går tabt, fordi navnet blev sat først.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k4',
      sporgsmal: 'Sæt vejen fra ændret fil til delt commit i rækkefølge',
      trin: [
        'Du retter en fil i working directory',
        'git add lægger ændringen i staging',
        'git commit laver et snapshot i dit eget repository',
        'git pull --rebase henter andres commits ind under dine',
        'git push flytter branchens pil på serveren',
      ],
      forklaring: 'Bemærk, at commit\'en findes i dit eget repository længe før push. Det er derfor, Git virker uden net – og derfor »committed« ikke er det samme som »delt«.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar Gits datamodel, og hvorfor kommandoerne giver mening ud fra den.',
      punkter: [
        { tekst: 'Commits er snapshots, ikke diffs', ord: ['snapshot', 'diff', 'tree'] },
        { tekst: 'Alt navngives efter hashen af sit indhold', ord: ['hash', 'sha', 'content'] },
        { tekst: 'En branch er et navn på en commit', ord: ['branch', 'pointer', 'navn'] },
        { tekst: 'HEAD siger, hvor du står', ord: ['head', 'detached', 'checkout'] },
        { tekst: 'Merge bevarer grafen, rebase skriver nye commits', ord: ['merge', 'rebase', 'forælder'] },
        { tekst: 'Tre områder: working, staging, repository', ord: ['staging', 'working', 'index'] },
      ],
    },
  ],
};
