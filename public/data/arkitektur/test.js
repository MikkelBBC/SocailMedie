// Test: hvad tests faktisk kan bevise, og hvad de ikke kan.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'test', nr: 1, titel: 'Test, der faktisk fanger noget', kort: 'Test', emoji: '🧪',
    farve: '#65A30D', gradient: 'linear-gradient(135deg, #65A30D 0%, #BEF264 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'En test kan kun vise, at fejl er til stede – aldrig at de ikke er.',
      body: 'Sætningen er Dijkstras, og den er ikke pessimisme. Den er en præcis beskrivelse af, hvad en test er: et **eksperiment med ét sæt input**.\n\nGrønne tests betyder: for præcis de tilfælde, nogen har tænkt på, opfører koden sig som forventet. Intet mere.\n\nDet har tre praktiske konsekvenser:\n• **Dækningsgrad** måler, hvor meget kode der blev **kørt** – ikke om noget blev **tjekket**. En test uden assertions kan give 100 %.\n• De interessante fejl sidder i **kanterne**: tom liste, nul, negativt tal, æøå, sommertid, to ting samtidig.\n• En test, der aldrig har været rød, har aldrig bevist noget. Prøv at ødelægge koden med vilje og se, om testen fanger det.\n\nDerfor er det bedre spørgsmål ikke »hvor høj er dækningen?«, men: **hvilken fejl ville den her test have fanget?** Kan du ikke svare, tester den formentlig implementeringen frem for opførslen.',
      analogi: 'Som en brandalarm. At den ikke har hylet i to år, beviser ikke, at der ikke er brandfare – kun at den ikke har hylet. Derfor findes der en testknap: én gang imellem skal man tjekke, at den overhovedet kan gå af.',
      hvorfor: 'Det er også grunden til, at TDD virker: skriver du testen først, har du set den være rød, og du ved dermed, at den kan fejle.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad måler dækningsgrad (code coverage)?',
      svar: [
        'Hvor meget af koden der blev kørt under testene',
        'Hvor mange linjer test der er per linje kode',
        'Hvor stor en andel af fejlene testene finder',
        'Hvor mange af kravene der er dækket af en test',
      ],
      rigtigt: 0,
      forklaring: 'Kun at koden blev udført. Uden assertions kan man have 100 % dækning og nul viden om, hvorvidt resultatet var rigtigt.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Mange hurtige tests i bunden, få langsomme i toppen. Ellers vender pyramiden på hovedet.',
      body: '**Testpyramiden** (Mike Cohn) siger noget om fordelingen:\n\n• **Unit tests** nederst: mange, hurtige, isolerede. De kører på millisekunder og peger direkte på den funktion, der fejlede.\n• **Integrationstests** i midten: færre, langsommere. De tester, at delene taler sammen – og det er dér, mange fejl faktisk sidder.\n• **End-to-end** øverst: få, langsomme, skrøbelige. De tester rejsen gennem hele systemet, som brugeren oplever den.\n\nHvorfor den form? Fordi **feedbacktid** er det, der afgør, om tests bliver brugt. En suite, der tager 40 minutter, bliver kørt én gang om dagen, og så har du mistet hele pointen.\n\nDen omvendte pyramide – »testis-kegle« – er, når der er få unit tests og mange e2e. Symptomerne er tydelige: builds tager en time, tests fejler tilfældigt, og ingen kan sige, **hvor** fejlen er, når de fejler.\n\nEn ærlig tilføjelse: pyramiden er en tommelfingerregel, ikke en lov. Et system, hvor næsten al logikken sidder i samspillet mellem services, har med rette flere integrationstests.',
      analogi: 'Som kontrol i en fabrik. Man vejer hver enkelt del undervejs, fordi det er billigt og siger præcis hvad der er galt. Og man kører kun få komplette testkørsler til sidst, fordi de tager en hel dag – og kun fortæller, at »noget« ikke virkede.',
      figur: {
        titel: 'Feedbacktid bestemmer formen',
        svg: svg(180, `
          ${box(120, 20, 84, 26, 'E2E', { ...ROSA, size: 11 })}
          ${box(86, 50, 152, 26, 'Integration', { ...GUL, size: 11 })}
          ${box(40, 80, 244, 30, 'Unit', { ...GROEN, size: 12 })}
          ${txt(266, 33, 'minutter', { size: 9, farve: ROED })}
          ${txt(266, 63, 'sekunder', { size: 9 })}
          ${txt(300, 95, 'ms', { size: 9, farve: '#11998E' })}
          ${txt(160, 132, 'Jo hurtigere feedback, jo flere af dem', { size: 10 })}
          ${txt(160, 156, 'En suite på 40 min bliver ikke kørt – og så tester den intet', { size: 10, farve: ROED })}`),
        tekst: 'Antallet følger af hastigheden, ikke omvendt. Kan en integrationstest køre på 50 ms, må der gerne være mange.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor skal der være flest unit tests i bunden af pyramiden?',
      svar: [
        'Fordi de er hurtige nok til at blive kørt hele tiden',
        'Fordi de fanger flere fejl end de andre typer',
        'Fordi de er lettere at skrive end integrationstests',
        'Fordi de kan køres uden at starte hele systemet op',
      ],
      rigtigt: 0,
      forklaring: 'Feedbacktiden afgør, om suiten bliver brugt. En test, man kun kører om natten, fanger fejlen en dag for sent – og peger sjældent præcist på, hvor den er.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'En test, der fejler hver tiende gang, er værre end ingen test.',
      body: 'En **flaky test** giver forskelligt resultat på samme kode. Den er farlig, fordi den ødelægger det eneste, en testsuite har: **tillid**. Når folk begynder at køre den igen »for at se, om det var tilfældigt«, er suiten holdt op med at betyde noget.\n\nDe typiske årsager er få og genkendelige:\n• **Tid**: `sleep(100)` i stedet for at vente på en betingelse. Virker på din maskine, ikke på en travl CI-server.\n• **Rækkefølge**: testene deler tilstand, så test B kun består, hvis A kørte først.\n• **Samtidighed**: en race condition i selve koden. Her er den flaky test faktisk en **ægte fejlmelding**.\n• **Omverden**: rigtige netværkskald, rigtig systemtid, en rigtig database med data fra i går.\n\nHåndteringen er kontant: **karantæne straks** – tag den ud af den blokerende suite, så den ikke lærer folk at ignorere rødt – og **ret årsagen** bagefter. Det farlige er ikke den ene test, men den vane, den skaber.\n\nOg husk muligheden for, at den har ret. En test, der fejler hver tiende gang, kan meget vel være den eneste, der har opdaget din race condition.',
      analogi: 'En røgalarm, der piver tilfældigt om natten. Efter en uge tager man batteriet ud. Problemet er ikke den enkelte falske alarm – det er, at alarmen nu er slukket, også den dag det brænder.',
      hvorfor: 'Det er direkte koblet til confirmation bias: når en test er rød, og man ikke tror på den, kører man den igen, indtil man får det svar, man gerne vil have.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvorfor er en flaky test værre end slet ingen test?',
      svar: [
        'Fordi den altid dækker over en race condition',
        'Fordi den giver et forkert billede af dækningsgraden',
        'Fordi den lærer folk at ignorere et rødt resultat',
        'Fordi den gør den samlede testkørsel langsommere',
      ],
      rigtigt: 2,
      forklaring: 'Den koster tillid. Når rødt ikke længere betyder »stop«, er hele suitens værdi væk – også for alle de tests, der virker.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Test opførsel, ikke implementering. Ellers fejler dine tests, hver gang du rydder op.',
      body: 'En test, der kender koden indefra, knækker ved enhver refaktorering – også dem, der ikke ændrer noget for brugeren. Det er den hyppigste grund til, at folk holder op med at skrive tests: de føles som en straf for at forbedre noget.\n\nTegnene på en implementeringstest:\n• Den tjekker, at en bestemt metode blev **kaldt**, frem for at resultatet blev rigtigt.\n• Den mocker klasser inde i din egen kode.\n• Den går i stykker, når du flytter en funktion.\n\nDet gode mønster er **arrangér – handl – tjek** (arrange, act, assert), hvor »handl« kun rører den offentlige grænseflade.\n\nOm test-dobbelter: **stub** giver et fast svar, **mock** tjekker at noget blev kaldt, og **fake** er en simpel, rigtig implementering (fx en database i hukommelsen). Brug dem primært på systemets **kanter** – netværk, ur, filsystem, betalinger – ikke internt.\n\nOg det mest undervurderede greb: når du finder en fejl, så **skriv først en test, der fejler af netop den grund**. Så ved du, at du har forstået fejlen, og at den ikke kommer tilbage.',
      analogi: 'Kontrollér, at maden smager rigtigt – ikke at kokken brugte netop den gryde. Skifter han gryde og retten smager ens, skal kontrollen ikke gå af.',
      figur: {
        titel: 'Hvad testen holder fast i',
        svg: svg(170, `
          ${txt(80, 14, 'Tester indmaden', { farve: ROED, size: 11 })}
          ${box(14, 26, 132, 24, 'test', { ...ROSA, size: 10 })}
          ${pil(80, 52, 80, 68, { farve: ROED })}
          ${box(14, 70, 132, 24, 'privat metode', { ...ROSA, size: 10 })}
          ${txt(80, 114, 'refaktorering → rød test', { size: 10, farve: ROED })}
          ${txt(80, 134, 'uden at noget blev værre', { size: 10, farve: ROED })}
          ${txt(240, 14, 'Tester opførsel', { farve: '#11998E', size: 11 })}
          ${box(174, 26, 132, 24, 'test', { ...GROEN, size: 10 })}
          ${pil(240, 52, 240, 68, { farve: '#11998E' })}
          ${box(174, 70, 132, 24, 'offentlig API', { ...GROEN, size: 10 })}
          ${txt(240, 114, 'indmaden må ændre sig frit', { size: 10, farve: '#11998E' })}`),
        tekst: 'Den offentlige grænseflade er kontrakten. Testen skal holde fast i kontrakten, ikke i vejen derhen.',
      },
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er problemet med en test, der tjekker, at en bestemt intern metode blev kaldt?',
      svar: [
        'Den kører langsommere end en almindelig assertion',
        'Den kan ikke bruges sammen med test-dobbelter',
        'Den kræver adgang til private felter i klassen',
        'Den fejler ved refaktorering, selvom intet blev værre',
      ],
      rigtigt: 3,
      forklaring: 'Den holder fast i vejen frem for i resultatet. Så bliver hver oprydning straffet med røde tests, og det er præcis dér, folk begynder at slette dem.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: '100 % dækningsgrad betyder, at koden er testet ordentligt.',
      rigtigt: 0,
      forklaring: 'Myte. Dækning måler udført kode, ikke kontrollerede resultater. En suite uden en eneste assertion kan ramme 100 %.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'En test, der fejler tilfældigt, kan være den eneste, der har fundet en rigtig race condition.',
      rigtigt: 1,
      forklaring: 'Fakta. Derfor skal en flaky test undersøges, ikke bare slettes. Timing-afhængige fejl viser sig netop som noget, der kun fejler nogle gange.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k4',
      sporgsmal: 'Sæt håndteringen af en fejlmelding fra en bruger i rækkefølge',
      trin: [
        'Genskab fejlen, så du kan se den selv',
        'Skriv en test, der fejler af præcis den grund',
        'Ret koden, til testen bliver grøn',
        'Kør hele suiten for at se, om noget andet knækkede',
        'Behold testen, så fejlen ikke kan komme tilbage',
      ],
      forklaring: 'Testen før rettelsen er pointen: den beviser, at du har forstået fejlen, og den bliver bagefter til et værn mod den samme fejl igen.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvad der kendetegner en testsuite, man kan stole på.',
      punkter: [
        { tekst: 'Tests kan vise fejl, aldrig fravær af fejl', ord: ['dijkstra', 'fravær', 'bevise'] },
        { tekst: 'Dækning måler udført kode, ikke kontrol', ord: ['dækning', 'coverage', 'assertion'] },
        { tekst: 'Pyramiden følger af feedbacktid', ord: ['pyramide', 'unit', 'e2e', 'hurtig'] },
        { tekst: 'Flaky tests koster tillid og skal i karantæne', ord: ['flaky', 'tillid', 'karantæne'] },
        { tekst: 'Test opførsel gennem den offentlige grænseflade', ord: ['opførsel', 'implementering', 'api'] },
        { tekst: 'Ny fejl: skriv først en test, der fejler', ord: ['regression', 'først', 'rød'] },
      ],
    },
  ],
};
