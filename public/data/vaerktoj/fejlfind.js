// Fejlfinding: den metode, ingen underviser i, og som alligevel afgør mest.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'fejlfind', nr: 1, titel: 'Sådan finder du fejlen', kort: 'Fejlfinding', emoji: '🔍',
    farve: '#EA580C', gradient: 'linear-gradient(135deg, #EA580C 0%, #FDBA74 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Fejlfinding er hypotesetest. Det er derfor, de fleste gør det forkert.',
      body: 'De fleste fejlsøger ved at **kigge**: læse koden igennem, til noget ser forkert ud. Det virker på små fejl og slet ikke på svære.\n\nMetoden, der virker, er den videnskabelige:\n\n**1. Gengiv fejlen.** Kan du ikke få den til at ske med vilje, kan du heller ikke vide, hvornår den er væk. Det er det vigtigste og mest sprungne trin.\n**2. Skriv hypotesen ned.** »Den fejler, fordi listen er tom.« En hypotese, der ikke er formuleret, kan ikke afkræftes.\n**3. Find den test, der kan **vælte** hypotesen.** Ikke den, der bekræfter den.\n**4. Kør testen, og opdatér.**\n\nTrin 3 er dét, folk springer over. Du tror, det er en race condition, så du kører programmet ti gange, og det crasher – hvilket ville ske under **enhver** hypotese. Den informative test er den, hvor de to forklaringer giver **forskellige** resultater.\n\nOg det allervigtigste princip: **ændr én ting ad gangen**. Retter du tre ting og fejlen forsvinder, ved du stadig ikke hvad der var galt – og de to andre ændringer er nu en del af koden for altid.',
      analogi: 'En læge, der stiller diagnose. Ikke ved at kigge længe på patienten, men ved at spørge: hvilken prøve ville give forskelligt svar, alt efter om det er A eller B? Den prøve tager man. En prøve, der ser ens ud i begge tilfælde, er spild af tid.',
      figur: {
        titel: 'Den test, der kan vælte dig',
        svg: svg(180, `
          ${box(14, 20, 292, 24, 'Hypotese: »det er en race condition«', { ...BLAA, size: 11 })}
          ${txt(80, 62, 'Bekræftende test', { farve: ROED, size: 11 })}
          ${box(14, 72, 132, 44, 'kør 10 gange:\\ncrasher stadig', { ...ROSA, size: 9 })}
          ${txt(80, 136, 'ville ske uanset hvad', { size: 10, farve: ROED })}
          ${txt(240, 62, 'Informativ test', { farve: '#11998E', size: 11 })}
          ${box(174, 72, 132, 44, 'kør med én tråd:\\ncrasher den stadig?', { ...GROEN, size: 9 })}
          ${txt(240, 136, 'nej → race. ja → noget andet', { size: 10, farve: '#11998E' })}
          ${txt(160, 166, 'En test, der giver samme svar uanset hypotesen, siger ingenting', { size: 10 })}`),
        tekst: 'Det er præcis Wasons 2-4-6-opgave med en debugger i hånden.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad kendetegner en informativ test under fejlfinding?',
      svar: [
        'At den giver forskelligt svar, alt efter om hypotesen holder',
        'At den bekræfter, at fejlen stadig sker som forventet',
        'At den kan køres hurtigt og helt uden opsætning først',
        'At den dækker så meget af den berørte kode som muligt',
      ],
      rigtigt: 0,
      forklaring: 'En test, der ville give samme resultat uanset hvilken forklaring der er rigtig, fjerner ingen muligheder. Det er confirmation bias med en debugger i hånden.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Halvér søgeområdet. 1.000 mulige linjer bliver til 10 spørgsmål.',
      body: '**Bisektion** er den stærkeste enkeltteknik, der findes: del søgeområdet i to, afgør hvilken halvdel fejlen er i, gentag. Logaritmisk i stedet for lineært.\n\nDen bruges på tre niveauer:\n\n• **I tiden**: `git bisect`. Du fortæller, hvilken commit der var god, og hvilken der er dårlig, og Git springer frem og tilbage. Ved 1.000 commits er du færdig på cirka 10 skridt. `git bisect run ./test.sh` gør det helt automatisk.\n• **I koden**: kommentér halvdelen ud, eller læg en udskrift midtvejs. Er værdien rigtig der, er fejlen nedenunder.\n• **I data**: fejler den på 10.000 rækker? Prøv med 5.000. Så 2.500. Ofte ender man med den ene række, der har et komma i navnet.\n\nDen forudsætning, folk overser: **du skal have en pålidelig test**. Er svaret på »er det galt her?« et gæt, fører bisektion dig et forkert sted hen med stor selvtillid.\n\nDet er i øvrigt samme idé som binær søgning fra AlgoDat. Forskellen er kun, at det sorterede array her er din commit-historik.',
      analogi: 'Gæt et tal mellem 1 og 1.000. Spørger du »er det 1? er det 2?«, tager det evigheder. Spørger du »er det over 500?«, er du færdig efter ti spørgsmål. Fejlfinding er det samme spil – folk spiller det bare tit på den første måde.',
      hvorfor: 'Det forklarer også, hvorfor små commits er værd at lave: jo mindre hver commit er, jo mere præcist peger bisect på den linje, der gjorde det.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er forudsætningen for, at git bisect virker?',
      svar: [
        'At du pålideligt kan afgøre, om en commit er god eller dårlig',
        'At alle commits i historikken er små og velskrevne',
        'At historikken er en lige linje helt uden merge-commits',
        'At fejlen kan gengives på under et sekund hver gang',
      ],
      rigtigt: 0,
      forklaring: 'Bisektion halverer kun søgeområdet, hvis svaret er rigtigt hver gang. Er testen et gæt, fører den dig hurtigt og sikkert det forkerte sted hen.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Læs stack tracen nedefra. Den øverste linje er sjældent den, du skal rette.',
      body: 'En stack trace er kaldstakken i det øjeblik, det gik galt: nederst det, der startede, øverst det, der fejlede.\n\nSådan læses den:\n\n• **Fejltypen og beskeden** først. `NullPointerException` og `ECONNREFUSED` er to helt forskellige historier.\n• **Find den øverste linje, der er din egen kode.** Toppen er typisk inde i et bibliotek, og det er sjældent biblioteket, der er galt – det er det, du sendte ind.\n• **Følg kæden nedad** for at forstå, hvordan du havnede der.\n• **»Caused by«** nederst er den oprindelige fejl. Den er som regel den vigtige, og den står længst væk fra toppen.\n\nTo ting, der er værd at gøre til en vane:\n• **Læs hele beskeden.** Rigtig mange fejl står der ordret, og man har bare scrollet forbi.\n• **Søg på den præcise fejltekst**, men fjern dine egne stinavne og id-numre først – ellers finder du ingenting.\n\nOg det, der gør stack traces mindre værd: at fange en exception og smide en ny uden `cause`. Så er den oprindelige historie væk, og du står med et spor, der starter midt i det hele.',
      analogi: 'Som en kæde af togskift. Det sidste skift er der, hvor du opdagede, at du var forkert. Fejlen skete på det tidligere skift – eller da du købte billetten. Kigger du kun på det sidste tog, retter du det forkerte.',
      figur: {
        titel: 'Hvor skal du kigge?',
        svg: svg(180, `
          ${box(14, 18, 292, 22, 'TypeError: cannot read length of undefined', { ...ROSA, size: 9 })}
          ${box(14, 44, 292, 20, 'at lib/parser.js:812', { ...HVID, size: 9 })}
          ${box(14, 66, 292, 20, 'at lib/index.js:40', { ...HVID, size: 9 })}
          ${box(14, 88, 292, 20, 'at min/kode.js:57   ← her', { ...GROEN, size: 9 })}
          ${box(14, 110, 292, 20, 'at min/main.js:12', { ...HVID, size: 9 })}
          ${txt(160, 148, 'Toppen er bibliotekets kode. Din øverste linje er startstedet.', { size: 10 })}
          ${txt(160, 168, '»Caused by« nederst er den oprindelige fejl', { size: 10, farve: '#11998E' })}`),
        tekst: 'Biblioteket fejler, fordi du gav det noget uventet. Fejlen skal som regel rettes, hvor værdien blev til.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvor i en stack trace begynder du som regel at lede?',
      svar: [
        'På den allerøverste linje, hvor det fejlede',
        'På den nederste linje, hvor programmet startede',
        'På den øverste linje, der er din egen kode',
        'På den linje, der nævnes flest gange i sporet',
      ],
      rigtigt: 2,
      forklaring: 'Toppen er typisk inde i et bibliotek, og biblioteket fejler, fordi det fik noget uventet. Det uventede kom fra din kode – og »Caused by« nederst er tit den egentlige historie.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Hvis den ikke kan gengives, er den ikke rettet. Den er bare ikke sket i dag.',
      body: 'Den sværeste klasse af fejl er dem, der **ikke sker hver gang**. Og reaktionen »jeg kan ikke reproducere det« er ikke en konklusion – det er en beskrivelse af, at du endnu ikke har fundet forskellen.\n\nLeder du efter, hvad der er anderledes, er listen kortere, end man tror:\n\n• **Timing**: to ting sker samtidig. Kører det med én tråd, forsvinder fejlen?\n• **Tilstand**: en tom cache, en gammel række i databasen, en session fra i går.\n• **Rækkefølge**: fejlen kræver, at A skete før B.\n• **Miljø**: anden tidszone, anden locale, andre filrettigheder, andet netværk.\n• **Data**: netop den ene række med æ i navnet eller et negativt beløb.\n\nTeknikker, der virker:\n• **Log mere, inden du gætter.** Med et correlation id og struktureret logging kan du se, hvad der faktisk skete, næste gang det sker.\n• **Gør det mere sandsynligt**: kør det 1.000 gange, med tilfældige forsinkelser, på en langsommere maskine, under belastning.\n• **Skriv en test, der fejler.** Når du har den, er resten mekanik.\n\nOg husk den ubehagelige mulighed: at fejlen stadig er der, og at du bare har gjort den sjældnere.',
      analogi: 'En mislyd i bilen, der aldrig kommer, når mekanikeren lytter. Man finder den ikke ved at lytte mere. Man finder den ved at spørge: hvad var anderledes? Koldt vejr, fuld bil, over 80 km/t.',
      hvorfor: 'Det er derfor, en flaky test ikke skal slettes. Den er måske den eneste, der har opdaget fejlen – bare med en sandsynlighed på ti procent.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad betyder det, at en fejl ikke kan reproduceres?',
      svar: [
        'At fejlen sandsynligvis var et engangstilfælde',
        'At den blev rettet af en anden ændring undervejs',
        'At du endnu ikke har fundet den betingelse, der udløser den',
        'At fejlen må ligge i et bibliotek uden for din kode',
      ],
      rigtigt: 2,
      forklaring: 'Computere er deterministiske nok til, at en fejl har en årsag. Timing, tilstand, rækkefølge, miljø eller data er anderledes – og at finde forskellen er selve arbejdet.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Den hurtigste måde at finde en fejl på er at læse koden grundigt igennem.',
      rigtigt: 0,
      forklaring: 'Myte. Det virker på små fejl og slet ikke på svære, fordi man læser det, man forventer at se. Bisektion og en informativ test slår læsning hver gang.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k1',
      pastand: 'At forklare problemet højt for en kollega eller en gummiand hjælper, selvom de intet svarer.',
      rigtigt: 1,
      forklaring: 'Fakta. At formulere det tvinger dig til at gøre antagelserne eksplicitte, og det er som regel dér, fejlen sidder. Det er den samme mekanisme som selvforklaring.',
    },
    {
      id: 'case1', type: 'case', efter: 'k4',
      scenarie: 'En test fejler kun på CI, aldrig lokalt. På CI køres den klokken 23.40 dansk tid; serveren kører i UTC.',
      sporgsmal: 'Hvilken hypotese ville du teste først?',
      svar: [
        'At testene kører i en anden rækkefølge på CI',
        'At testen afhænger af datoen, som skifter i UTC',
        'At CI-maskinen er langsommere end din egen',
        'At et bibliotek har en anden version på CI',
      ],
      rigtigt: 1,
      forklaring: 'Alle fire er rimelige, men tidspunktet er et gratis vink: klokken 23.40 dansk er det allerede i morgen i UTC. Det er også den billigste at afkræfte – sæt uret frem lokalt og kør.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k2',
      sporgsmal: 'Sæt fejlfindingen i rækkefølge',
      trin: [
        'Gengiv fejlen, så du kan fremkalde den med vilje',
        'Skriv hypotesen ned i én sætning',
        'Find den test, der kan afkræfte hypotesen',
        'Ændr én ting, og kør testen igen',
        'Ret årsagen, og behold en test, der fanger den',
      ],
      forklaring: 'Rækkefølgen er selve pointen. Springer man over at gengive, kan man ikke vide, om rettelsen virkede – kun at fejlen ikke er sket endnu.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan du går systematisk til en fejl, du ikke forstår.',
      punkter: [
        { tekst: 'Gengiv den først – ellers kan du ikke vide, hvornår den er væk', ord: ['gengiv', 'reproduc', 'fremkald'] },
        { tekst: 'Formulér en hypotese, og find testen der kan vælte den', ord: ['hypotese', 'afkræft', 'informativ'] },
        { tekst: 'Ændr én ting ad gangen', ord: ['én ting', 'en ad gangen', 'isoler'] },
        { tekst: 'Bisektion: halvér i tid, kode eller data', ord: ['bisect', 'halver', 'binær'] },
        { tekst: 'Læs stack tracen nedefra og find din egen kode', ord: ['stack', 'trace', 'caused by'] },
        { tekst: 'Kan den ikke gengives: hvad er anderledes?', ord: ['timing', 'tilstand', 'miljø', 'data'] },
      ],
    },
  ],
};
