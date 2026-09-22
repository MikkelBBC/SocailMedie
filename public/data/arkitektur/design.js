// Arkitektur: hvorfor noget kode er let at ændre, og andet ikke er.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'design', nr: 0, titel: 'Kobling, samhørighed og abstraktion', kort: 'Design', emoji: '🧱',
    farve: '#4338CA', gradient: 'linear-gradient(135deg, #4338CA 0%, #A5B4FC 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Al god arkitektur handler om det samme: hvor meget skal ændre sig, når noget ændrer sig?',
      body: 'To begreber bærer stort set hele faget.\n\n**Kobling** er, hvor meget et modul afhænger af et andet. Høj kobling betyder, at en ændring ét sted tvinger ændringer mange steder.\n\n**Samhørighed** (cohesion) er, hvor godt tingene i ét modul hører sammen. Høj samhørighed betyder, at modulet har ét ansvar, og at man kan beskrive det uden at sige »og«.\n\nMålet er **løs kobling og høj samhørighed**, og det er ikke to mål, men ét: samler du det, der ændrer sig sammen, bliver koblingen udadtil automatisk løsere.\n\nDet gode spørgsmål er derfor ikke »er det pænt?«, men: **hvis kravet ændrer sig her, hvor mange filer skal jeg så røre?** Er svaret én, er designet rigtigt. Er svaret elleve, er der noget, der ligger det forkerte sted.\n\nOg bemærk, at det er et spørgsmål om **fremtidige ændringer**. Derfor kan det samme design være rigtigt i ét projekt og forkert i et andet: det afhænger af, hvad der faktisk kommer til at ændre sig.',
      analogi: 'Et køkken, hvor alt til kaffe står i ét skab: bønner, filter, kopper. Skal du skifte til en anden kaffemaskine, åbner du ét skab. Ligger filtrene i bryggerset og kopperne i stuen, bliver samme lille ændring til en rundtur i hele huset.',
      figur: {
        titel: 'Hvor mange filer skal jeg røre?',
        svg: svg(180, `
          ${txt(80, 14, 'Høj kobling', { farve: ROED, size: 11 })}
          ${box(50, 26, 60, 26, 'A', { ...ROSA, size: 11 })}
          ${box(14, 68, 60, 26, 'B', { ...ROSA, size: 11 })}
          ${box(86, 68, 60, 26, 'C', { ...ROSA, size: 11 })}
          ${box(50, 110, 60, 26, 'D', { ...ROSA, size: 11 })}
          ${pil(70, 54, 46, 66, { farve: ROED })}
          ${pil(92, 54, 112, 66, { farve: ROED })}
          ${pil(44, 96, 68, 108, { farve: ROED })}
          ${pil(116, 96, 94, 108, { farve: ROED })}
          ${txt(80, 158, 'én ændring rører alle fire', { size: 10, farve: ROED })}
          ${txt(240, 14, 'Løs kobling', { farve: '#11998E', size: 11 })}
          ${box(180, 26, 126, 26, 'Grænseflade', { ...GROEN, size: 10 })}
          ${box(180, 68, 58, 26, 'B', { ...HVID, size: 11 })}
          ${box(248, 68, 58, 26, 'C', { ...HVID, size: 11 })}
          ${pil(209, 54, 209, 66, { farve: '#11998E' })}
          ${pil(277, 54, 277, 66, { farve: '#11998E' })}
          ${txt(240, 158, 'ændringen stopper ved grænsefladen', { size: 10, farve: '#11998E' })}`),
        tekst: 'Grænsefladen er en kontrakt. Så længe den holder, må indmaden ændre sig frit.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er det bedste praktiske mål for, om koblingen er for høj?',
      svar: [
        'Hvor dybt nedarvningshierarkiet går i den samlede kode',
        'Hvor mange klasser og interfaces der findes i projektet',
        'Hvor mange filer én kravændring tvinger dig til at røre',
        'Hvor mange linjer kode der er i hver enkelt fil',
      ],
      rigtigt: 2,
      forklaring: 'Kobling er ikke et æstetisk spørgsmål. Det er en forudsigelse om, hvad en ændring kommer til at koste – og det kan du måle ved at prøve.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'En abstraktion er ikke et lag mere. Det er et løfte om, at du ikke behøver at kigge nedenunder.',
      body: 'En god abstraktion lader dig bruge noget uden at kende dets indmad. `sort()` virker, uden at du ved, om den bruger quicksort eller timsort.\n\nEn **lækkende abstraktion** er en, hvor indmaden alligevel tvinger sig igennem. Et ORM, der skjuler SQL – indtil forespørgslen bliver langsom, og du er nødt til at forstå både ORM\'et **og** SQL. Nu har du to ting at kunne i stedet for én.\n\nDerfor er den vigtigste test af en abstraktion: **reducerer den den samlede mængde, jeg skal vide?** Gør den ikke det, er den et lag, ikke en abstraktion.\n\nTo modsatte fejl, der begge koster:\n• **For tidlig abstraktion**: du bygger et fleksibelt plugin-system til det ene tilfælde, der findes. Reglen »tre gange, så abstrahér« findes, fordi man først efter tredje tilfælde kan se, hvad der faktisk varierer.\n• **Ingen abstraktion**: den samme logik står ni steder, og den ottende bliver glemt, når reglen ændrer sig.\n\nDuplikeret kode er billigere at rette end den forkerte abstraktion. Derfor er »vent lidt« ofte det rigtige svar.',
      analogi: 'En bilkabine er en god abstraktion: rat, speeder, bremse. Du kan køre uden at kende forbrændingsmotoren. Den lækker først, når der lyder en mærkelig lyd – og så er du pludselig nødt til at vide noget om motoren alligevel.',
      hvorfor: 'Det er også svaret på, hvornår man skal lave en hjælpefunktion: når den fjerner noget, læseren ellers skulle forstå. Ikke bare fordi linjerne ligner hinanden.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad kendetegner en lækkende abstraktion?',
      svar: [
        'Den bruger flere lag end nødvendigt i designet',
        'Den er skrevet af nogen uden for dit eget team',
        'Du er nødt til at forstå både den og det, den skjuler',
        'Den er langsommere end at skrive koden direkte',
      ],
      rigtigt: 2,
      forklaring: 'Så har den ikke reduceret det, du skal vide – den har lagt noget oveni. Alle abstraktioner lækker lidt; spørgsmålet er, hvor tit det rammer dig.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'SOLID er fem regler. To af dem bruger du hver dag, tre hører du mest om til eksamen.',
      body: 'De fem, kort:\n\n• **S – Single responsibility**: et modul bør have én grund til at ændre sig. Den mest brugbare af dem alle.\n• **O – Open/closed**: åben for udvidelse, lukket for ændring. Du skal kunne tilføje en ny betalingsmetode uden at redigere de eksisterende.\n• **L – Liskov substitution**: en subtype skal kunne bruges, hvor basistypen forventes, **uden at overraske**. Den klassiske modeksempel: `Kvadrat extends Rektangel` går galt, fordi `sætBredde` pludselig også ændrer højden.\n• **I – Interface segregation**: flere små grænseflader slår én stor. Ingen skal implementere metoder, de ikke bruger.\n• **D – Dependency inversion**: afhæng af abstraktioner, ikke af konkrete klasser. Det er dét, der gør det muligt at teste uden en rigtig database.\n\nDet vigtige til en mundtlig eksamen er ikke at remse dem op, men at kunne sige, **hvilket problem hver enkelt løser**. Alle fem er varianter af den samme pointe fra det første kort: gør det billigt at ændre noget.\n\nOg husk modvægten: SOLID anvendt uden anledning giver ti interfaces med én implementation hver. Det er også dyrt – bare på en anden måde.',
      analogi: 'Som byggeregler. De findes, fordi nogen har set huse falde ned. Men den, der følger hver enkelt regel til punkt og prikke uden at kigge på grunden, bygger et hus, hvor alt er tilladt og ingenting er rart at bo i.',
      hvorfor: 'Dependency inversion er den, der oftest giver et konkret aha: det er grunden til, at din forretningslogik kan testes uden at starte en database.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvilket problem løser dependency inversion i praksis?',
      svar: [
        'Det reducerer antallet af klasser i projektet',
        'Det fjerner behovet for at skrive grænseflader',
        'Det gør koden hurtigere at køre i produktion',
        'Det lader dig udskifte databasen med en test-dobbelt',
      ],
      rigtigt: 3,
      forklaring: 'Afhænger din logik af en abstraktion i stedet for en konkret klasse, kan du give den hvad som helst, der opfylder kontrakten – også noget, der kun findes i testen.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Teknisk gæld er ikke dårlig kode. Det er et lån, nogen har taget – og som nogen betaler renter af.',
      body: 'Ward Cunningham brugte ordet om noget meget bestemt: at man **bevidst** vælger en hurtig løsning nu og rydder op senere. Ligesom et lån: du får noget før tid og betaler renter, indtil det er tilbagebetalt.\n\nRenterne er reelle. De betales i hver eneste ændring, der bliver lidt langsommere, hver fejl der er lidt sværere at finde.\n\nDet nyttige er at skelne:\n• **Bevidst gæld**: »vi hardcoder det til demoen på fredag og gør det ordentligt bagefter.« Fint – hvis »bagefter« står et sted.\n• **Utilsigtet gæld**: man vidste det ikke bedre. Det er ikke gæld, det er læring.\n• **Forfald**: koden blev ikke dårligere, men verden ændrede sig omkring den.\n\nDet praktiske greb er **spejderreglen**: efterlad koden lidt pænere, end du fandt den. Ikke en stor oprydning, men den ene variabel, der fik et rigtigt navn, mens du alligevel var der.\n\nEn stor omskrivning er sjældent svaret. Den koster hele tiden, mens den står på, og værdien kommer først til sidst – hvis den kommer.',
      analogi: 'Et lån, ikke et rod. Renten er, at hver ny funktion tager lidt længere tid. Det farlige er ikke lånet, men ikke at vide, at man har det – for så undrer man sig bare over, at alt går langsommere og langsommere.',
      figur: {
        titel: 'Renten betales i hver ændring',
        svg: svg(170, `
          <line x1="34" y1="126" x2="300" y2="126" stroke="${LINE}" stroke-width="1.5"/>
          <path d="M34,112 C120,108 210,96 300,40" fill="none" stroke="${ROED}" stroke-width="3"/>
          <path d="M34,112 C120,110 210,106 300,100" fill="none" stroke="#11998E" stroke-width="3"/>
          ${txt(246, 30, 'med gæld', { size: 10, farve: ROED })}
          ${txt(250, 116, 'ryddet op undervejs', { size: 10, farve: '#11998E' })}
          ${txt(24, 66, 'tid pr.', { size: 9 })}
          ${txt(24, 78, 'ændring', { size: 9 })}
          ${txt(160, 146, 'Det er ikke koden, der koster. Det er ændringerne i den.', { size: 10 })}`),
        tekst: 'Derfor er det mest præcise spørgsmål ikke »er koden pæn?«, men »går det langsommere end for et halvt år siden?«',
      },
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad menes der oprindeligt med teknisk gæld?',
      svar: [
        'En bevidst genvej, man planlægger at rydde op efter',
        'Alle de fejl, der endnu ikke er rettet i systemet',
        'Kode skrevet af folk, der ikke kunne bedre',
        'Kode, som ingen på holdet tør røre ved længere',
      ],
      rigtigt: 0,
      forklaring: 'Metaforen kommer fra Ward Cunningham, og pointen er beslutningen: man låner tid nu og betaler renter, til gælden er afviklet. Kode, hvor man bare ikke vidste bedre, er læring, ikke gæld.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Duplikeret kode skal altid fjernes med det samme.',
      rigtigt: 0,
      forklaring: 'Myte. Den forkerte abstraktion er dyrere end duplikering, fordi alle bagefter bøjer den for at få deres tilfælde til at passe. Vent, til du kan se, hvad der faktisk varierer.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k4',
      pastand: 'En stor omskrivning fra bunden er som regel den hurtigste vej ud af teknisk gæld.',
      rigtigt: 0,
      forklaring: 'Myte. Under omskrivningen skal to systemer vedligeholdes, og al den viden, der sidder i de mærkelige hjørner af den gamle kode, skal genopdages. Gradvis udskiftning vinder næsten altid.',
    },
    {
      id: 'case1', type: 'case', efter: 'k1',
      scenarie: 'Der skal tilføjes en ny betalingsmetode. Det viser sig at kræve ændringer i 11 filer, fordi hver af dem har en `if (type == "kort") … else if (type == "mobilepay")`.',
      sporgsmal: 'Hvilket princip er brudt her?',
      svar: [
        'Open/closed: udvidelse kræver ændring af eksisterende kode',
        'Single responsibility: filerne gør for mange ting',
        'Interface segregation: grænsefladerne er for store',
        'Liskov: subtyperne opfører sig ikke som basistypen',
      ],
      rigtigt: 0,
      forklaring: 'Systemet er ikke lukket for ændring. Løsningen er at gøre betalingsmetoden til en abstraktion, så en ny metode er en ny implementering i stedet for en ny gren elleve steder.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvad der gør kode let eller svær at ændre.',
      punkter: [
        { tekst: 'Kobling: hvor meget skal ændres, når noget ændres', ord: ['kobling', 'afhæng', 'coupling'] },
        { tekst: 'Samhørighed: ét modul, ét ansvar', ord: ['samhørighed', 'cohesion', 'ansvar'] },
        { tekst: 'Abstraktion skal fjerne noget, man ellers skal vide', ord: ['abstraktion', 'lækker', 'skjuler'] },
        { tekst: 'Open/closed: udvid uden at ændre det eksisterende', ord: ['open', 'closed', 'udvid'] },
        { tekst: 'Dependency inversion gør det testbart', ord: ['dependency', 'inversion', 'test'] },
        { tekst: 'Teknisk gæld er et lån med renter i hver ændring', ord: ['gæld', 'debt', 'rente'] },
      ],
    },
  ],
};
