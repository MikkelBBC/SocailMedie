// Teknologi: kryptering, kodeord og hvorfor svindel virker.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'krypto', nr: 0, titel: 'Kryptering og sikkerhed', kort: 'Kryptering', emoji: '🔐',
    farve: '#8E54E9', gradient: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Hvordan aftaler man en hemmelig nøgle, når alle kan høre samtalen?',
      body: 'Der findes to slags kryptering.\n\n**Symmetrisk**: samme nøgle låser og låser op. Det er hurtigt, og det er det, der bruges til selve dataene (fx AES). Problemet er, hvordan begge parter får nøglen uden at sende den forbi nogen, der lytter.\n\n**Asymmetrisk**: to nøgler, der hører sammen. Din **offentlige** nøgle må alle se. Din **private** nøgle må ingen se. Det, den ene låser, kan kun den anden låse op.\n\nDet løser to problemer på én gang:\n• **Hemmelighed**: alle kan kryptere en besked til dig med din offentlige nøgle. Kun du kan åbne den.\n• **Underskrift**: krypterer du noget med din private nøgle, kan alle tjekke med din offentlige, at det faktisk kom fra dig. Det er det, certifikater bygger på.\n\nI praksis bruges begge: asymmetrisk til at aftale en nøgle, symmetrisk til resten, fordi det er meget hurtigere.',
      analogi: 'Din offentlige nøgle er en postkasse med en sprække: alle kan lægge noget i. Den private nøgle er den eneste, der kan lukke lågen op.',
      figur: {
        titel: 'To nøgler, der hører sammen',
        svg: svg(180, `
          ${box(12, 24, 90, 34, 'Afsender', { ...HVID, size: 11 })}
          ${pil(106, 41, 132, 41)}
          ${box(136, 20, 60, 42, '🔒', { ...ROSA, size: 18 })}
          ${txt(166, 74, 'din offentlige', { size: 9 })}
          ${pil(200, 41, 226, 41)}
          ${box(230, 24, 78, 34, 'Beskeden', { ...BLAA, size: 10 })}
          ${pil(268, 62, 268, 92, { farve: '#11998E' })}
          ${box(230, 94, 78, 34, 'Kun du', { ...GROEN, size: 10 })}
          ${box(136, 94, 60, 42, '🔑', { ...GROEN, size: 18 })}
          ${txt(166, 148, 'din private', { size: 9, farve: '#11998E' })}
          ${pil(200, 112, 226, 112, { farve: '#11998E' })}
          ${txt(70, 112, 'Alle må kende', { size: 10 })}
          ${txt(70, 128, 'den offentlige', { size: 10 })}`),
        tekst: 'Det, den offentlige nøgle låser, kan kun den private åbne. Og omvendt, hvilket giver digitale underskrifter.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad bruges den private nøgle til?',
      svar: [
      'Til at kryptere beskeder til andre modtagere',
      'Til at dele med dem, man stoler allermest på',
      'Til at åbne det, der er sendt til dig, og underskrive',
      'Til at lave hashes af kodeord og filer',
    ],
      rigtigt: 2,
      forklaring: 'Den private nøgle skal aldrig deles. Den låser op for det, andre har krypteret til dig, og den kan bruges til at underskrive.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'En hjemmeside bør ikke kende dit kodeord. Heller ikke den, du selv har lavet.',
      body: 'Et **hash** er en envejsfunktion: samme input giver altid samme output, men fra outputtet kan man ikke regne baglæns.\n\nDerfor gemmer man ikke kodeord. Man gemmer hashet. Ved login hashes det indtastede, og de to hashes sammenlignes.\n\nMen et hash alene er ikke nok. Angribere har enorme lister med færdigberegnede hashes for almindelige kodeord. Er dit kodeord »sommer2024«, findes hashet allerede på en liste.\n\nLøsningen er **salt**: en tilfældig streng, der gemmes sammen med kodeordet og blandes ind, før der hashes. To brugere med samme kodeord får forskellige hashes, og færdiglavede lister bliver ubrugelige.\n\nDertil skal hashet være **langsomt** med vilje. Almindelige hashfunktioner som SHA-256 er lavet til at være hurtige, og hastighed hjælper angriberen. Derfor bruger man bcrypt, scrypt eller Argon2, der er designet til at tage tid og hukommelse.\n\nDerfor kan en ordentlig tjeneste aldrig sende dig dit gamle kodeord. Kun et link til at lave et nyt.',
      analogi: 'En kødhakker. Kød ind, fars ud. Samme kød giver samme fars, men ingen kan lave farsen om til en bøf igen.',
      figur: {
        titel: 'Kodeord, salt og hash',
        svg: svg(170, `
          ${box(14, 24, 110, 26, 'sommer2024', { ...ROSA, size: 10 })}
          ${box(14, 58, 110, 26, '+ salt: x9#2b', { ...BLAA, size: 10 })}
          ${pil(128, 50, 156, 50)}
          ${box(160, 30, 68, 40, 'bcrypt', { ...GROEN, size: 10 })}
          ${pil(232, 50, 256, 50)}
          ${box(246, 30, 62, 40, '$2b$…', { fill: BG, size: 9 })}
          ${txt(160, 104, 'Kun hashet gemmes – aldrig kodeordet', { size: 11, farve: INK })}
          ${txt(160, 130, 'Samme kodeord + andet salt = helt andet hash', { size: 10 })}
          ${txt(160, 150, 'Langsom med vilje: det gør gætteri dyrt', { size: 10, farve: '#a3123f' })}`),
        tekst: 'Salt gør færdiglavede lister ubrugelige. Langsomhed gør gætteri i stor skala urealistisk.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor bruger man bcrypt eller Argon2 i stedet for SHA-256 til kodeord?',
      svar: [
        'Fordi de er matematisk mere sikre funktioner',
        'Fordi de fylder mindre i databasen',
        'Fordi de kan regnes baglæns ved behov',
        'Fordi de er langsomme med vilje'
      ],
      rigtigt: 3,
      forklaring: 'Hastighed er en fordel for angriberen. Kodeordshashing er designet til at koste tid og hukommelse.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'To personer kan blande sig frem til en fælles hemmelighed, mens alle kigger med.',
      body: '**Diffie-Hellman** løser det, der lyder umuligt: at aftale en fælles nøgle over en linje, alle kan lytte på.\n\nMalings-analogien forklarer det bedst:\n1. Alle bliver enige om en **fælles gul maling**. Det er offentligt.\n2. Du vælger en **hemmelig farve** og blander den i din gule. Din ven gør det samme med sin egen hemmelige farve.\n3. I bytter de blandede spande. Lytteren ser dem begge.\n4. Du blander din hemmelige farve i den spand, du fik. Din ven gør det samme.\n\nI ender med præcis den samme farve. Lytteren har set den gule og de to blandinger, men kan ikke skille en blanding ad igen.\n\nI virkeligheden er »maling« store tal og potensopløftning modulo et primtal. At blande er let, at skille ad er praktisk talt umuligt.\n\nModerne TLS bruger en variant, der laver en **ny** nøgle til hver forbindelse. Det kaldes forward secrecy: bliver serverens private nøgle stjålet i morgen, kan gamle optagede samtaler stadig ikke låses op.',
      analogi: 'Se ovenfor: det er malingen. Den er ikke en forenkling af noget andet, det er præcis den samme idé med tal.',
      figur: {
        titel: 'Fælles hemmelighed i fuld offentlighed',
        svg: svg(190, `
          ${box(14, 20, 100, 26, 'Fælles gul', { fill: '#fff6c2', stroke: '#e4ae39', size: 10 })}
          ${box(206, 20, 100, 26, 'Fælles gul', { fill: '#fff6c2', stroke: '#e4ae39', size: 10 })}
          ${box(14, 56, 100, 26, '+ din hemmelige', { ...ROSA, size: 9 })}
          ${box(206, 56, 100, 26, '+ hans hemmelige', { ...BLAA, size: 9 })}
          ${pil(120, 100, 200, 100)}
          ${pil(200, 122, 120, 122, { farve: '#3b3f9e' })}
          ${txt(160, 88, 'byt blandinger (alle ser dem)', { size: 9 })}
          ${box(14, 140, 100, 30, 'Samme farve', { ...GROEN, size: 10 })}
          ${box(206, 140, 100, 30, 'Samme farve', { ...GROEN, size: 10 })}
          ${txt(160, 155, '🔑', { size: 20 })}
          ${txt(160, 182, 'Lytteren kan ikke skille en blanding ad', { size: 9, farve: ROED })}`),
        tekst: 'At blande er let. At skille ad er umuligt i praksis. Det er hele grundlaget.',
      },
      hvorfor: 'Det er derfor caféens wifi kan se alt, hvad der bliver sendt, uden at kunne læse noget af det.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er forward secrecy?',
      svar: [
        'At beskeder videresendes automatisk til modtager',
        'At selve nøglen er gjort ekstra lang',
        'At hver forbindelse får sin egen nye nøgle',
        'At serveren gemmer alle nøgler forsvarligt'
      ],
      rigtigt: 2,
      forklaring: 'Hver session får sin egen midlertidige nøgle. Derfor giver en stjålet servernøgle ikke adgang til fortiden.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'De fleste indbrud sker ikke gennem krypteringen. De sker gennem mennesket foran skærmen.',
      body: 'Kryptering er i praksis umulig at bryde. Derfor går angribere udenom.\n\n**Phishing** er en mail eller sms, der ser ud til at komme fra et sted, du kender, og som skaber travlhed: »din pakke kan ikke leveres«, »din konto lukkes om 24 timer«. Presset er ikke tilfældigt. Det er designet til at få dig til at handle, før du tænker.\n\nTo-faktor (**2FA**) hjælper meget, men ikke alt er lige stærkt:\n• **SMS-koder**: bedre end ingenting, men kan snydes ved SIM-swap, og koden kan videregives til en falsk side.\n• **Authenticator-app**: bedre. Koden findes kun på din telefon.\n• **Passkeys og sikkerhedsnøgler**: bedst. Nøglen er bundet til det rigtige domæne og virker derfor slet ikke på en falsk side, uanset hvor godt den ligner.\n\nDet vigtigste ene råd: **klik ikke på linket i beskeden**. Gå selv ind på siden, som du plejer. Så er domænet rigtigt, og halvdelen af alle angreb er ligegyldige.',
      analogi: 'En tyv bryder sjældent ind gennem en pansret dør. Han ringer på og siger, at han er fra elselskabet og skal tjekke måleren.',
      hvorfor: 'Det er det mest praktisk anvendelige i hele sporet: teknikken er stærk, det er tilliden, der bliver angrebet.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvorfor er passkeys stærkere end en SMS-kode mod phishing?',
      svar: [
        'Fordi de er bundet til det rigtige domæne',
        'Fordi de skifter værdi hvert eneste sekund',
        'Fordi de består af flere tegn end en SMS-kode',
        'Fordi de bliver sendt over en krypteret linje'
      ],
      rigtigt: 0,
      forklaring: 'En kode kan du narres til at skrive ind et forkert sted. En passkey virker kun på det domæne, den hører til.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Hvis en tjeneste kan sende dig dit gamle kodeord, er deres sikkerhed i orden.',
      rigtigt: 0,
      forklaring: 'Myte, og et alvorligt advarselstegn. Kan de sende det, gemmer de det læsbart. En ordentlig tjeneste kender kun hashet.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k4',
      pastand: 'To-faktor med SMS er bedre end slet ingen to-faktor.',
      rigtigt: 1,
      forklaring: 'Fakta. SMS kan snydes med SIM-swap og phishing, men det stopper stadig de mange angreb, der kun bygger på et lækket kodeord. En app eller passkey er dog markant bedre.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan to computere kan få en fælles hemmelig nøgle over en åben linje.',
      punkter: [
        { tekst: 'Symmetrisk: samme nøgle begge veje, hurtig', ord: ['symmetrisk', 'samme nøgle', 'aes'] },
        { tekst: 'Asymmetrisk: offentlig og privat nøgle', ord: ['asymmetrisk', 'offentlig', 'privat'] },
        { tekst: 'Diffie-Hellman: bland, byt, bland igen', ord: ['diffie', 'bland', 'byt'] },
        { tekst: 'At blande er let, at skille ad er praktisk umuligt', ord: ['envejs', 'skille', 'umulig'] },
        { tekst: 'Ny nøgle pr. session giver forward secrecy', ord: ['forward secrecy', 'session', 'ny nøgle'] },
      ],
    },
  ],
};
