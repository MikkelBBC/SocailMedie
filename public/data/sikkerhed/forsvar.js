// Cybersikkerhed: huller i kode og hvordan man forsvarer sig.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'forsvar', nr: 1, titel: 'Sikker kode og forsvar', kort: 'Forsvar', emoji: '🛡️',
    farve: '#11998E', gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Al sikkerhed koger ned til tre ord: fortrolighed, integritet, tilgængelighed.',
      body: '**CIA-triaden** er den ramme, næsten alt sikkerhedsarbejde hænges op på:\n\n• **Fortrolighed** (Confidentiality): kun de rette kan læse det. Brydes af et læk.\n• **Integritet** (Integrity): data er ikke ændret undervejs. Brydes, hvis nogen kan rette i din journal eller dit beløb.\n• **Tilgængelighed** (Availability): systemet er der, når man skal bruge det. Brydes af ransomware eller et DDoS-angreb.\n\nDe tre trækker i hver sin retning. Den mest fortrolige server er slukket og støbt ind i beton, men så er tilgængeligheden nul. **Sikkerhed er altid en afvejning**, ikke en tilstand man »opnår«.\n\nDerfor starter godt sikkerhedsarbejde med et spørgsmål, ikke med et produkt: **hvad skal beskyttes, mod hvem, og hvad koster det, hvis det går galt?** Det kaldes en trusselsmodel.',
      analogi: 'Et bankbokssystem: ingen må kigge (fortrolighed), ingen må bytte indholdet (integritet), og du skal selv kunne komme til det i åbningstiden (tilgængelighed).',
      figur: {
        titel: 'CIA-triaden',
        svg: svg(190, `
          ${box(96, 14, 128, 34, 'Fortrolighed', { ...BLAA, size: 11 })}
          ${txt(160, 58, 'ingen uvedkommende læser med', { size: 9 })}
          ${box(14, 84, 128, 34, 'Integritet', { ...GROEN, size: 11 })}
          ${txt(78, 128, 'intet er ændret', { size: 9 })}
          ${box(178, 84, 128, 34, 'Tilgængelighed', { ...ROSA, size: 11 })}
          ${txt(242, 128, 'der, når du skal bruge det', { size: 9 })}
          ${txt(160, 162, 'Skru op for én, og en anden får det sværere', { size: 11, farve: INK })}`),
        tekst: 'Hver beslutning om sikkerhed flytter noget mellem de tre.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Et ransomware-angreb låser hospitalets journaler. Hvilken del af CIA-triaden rammes hårdest?',
      svar: ['Fortrolighed', 'Tilgængelighed', 'Integritet', 'Ingen af dem'],
      rigtigt: 1,
      forklaring: 'Data findes stadig og er ikke ændret, men ingen kan komme til dem. Moderne ransomware kopierer ofte data ud først, og så rammes fortroligheden også.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'SQL injection sker, fordi data og kommandoer blandes i samme streng.',
      body: 'Hvis din kode bygger en forespørgsel ved at klistre brugerens input ind i teksten, kan brugeren skrive noget, der ikke længere læses som data, men som **kommando**:\n\n`"SELECT * FROM brugere WHERE navn = \'" + input + "\'"`\n\nSkriver brugeren `\' OR \'1\'=\'1`, bliver betingelsen altid sand.\n\nLøsningen er ikke at lede efter farlige tegn. Det er at **holde data og kode adskilt** med parameteriserede forespørgsler (prepared statements), hvor databasen får forespørgslen og værdierne hver for sig og aldrig blander dem.\n\nSamme mønster går igen andre steder:\n• **XSS**: brugerens tekst havner i en side og bliver kørt som JavaScript. Løsning: escape output.\n• **Command injection**: input havner i et shell-kald.\n\nReglen bag dem alle: **behandl alt input som data, aldrig som instruktioner.**',
      analogi: 'Det er forskellen på at diktere en ordre til en medarbejder og at lade en fremmed råbe ind i lokalet midt i sætningen. Med parametre får medarbejderen ordren først og navnene bagefter.',
      figur: {
        titel: 'Blandet mod adskilt',
        svg: svg(180, `
          ${txt(80, 12, 'Blandet (farligt)', { farve: ROED, size: 11 })}
          ${box(14, 26, 132, 46, "… navn = ' + input", { ...ROSA, size: 9 })}
          ${txt(80, 88, "input: ' OR '1'='1", { size: 10, farve: ROED })}
          ${txt(80, 108, 'Betingelsen er altid sand', { size: 10, farve: ROED })}
          ${txt(240, 12, 'Adskilt (sikkert)', { farve: '#11998E', size: 11 })}
          ${box(174, 26, 132, 22, '… navn = ?', { ...GROEN, size: 10 })}
          ${box(174, 52, 132, 20, 'værdi: input', { ...GROEN, size: 10 })}
          ${txt(240, 88, 'Databasen ser input', { size: 10, farve: '#11998E' })}
          ${txt(240, 106, 'som ren tekst', { size: 10, farve: '#11998E' })}
          ${txt(160, 150, 'Alt input er data – aldrig instruktioner', { size: 11, farve: INK })}`),
        tekst: 'Parameteriserede forespørgsler fjerner hele klassen af fejl, i stedet for at filtrere tegn fra.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er den rigtige løsning på SQL injection?',
      svar: [
        'At filtrere farlige tegn som apostrof fra',
        'Parameteriserede forespørgsler (prepared statements)',
        'At kryptere hele databasen med en stærk nøgle',
        'At skjule databasens fejlbeskeder for brugeren',
      ],
      rigtigt: 1,
      forklaring: 'Filtrering kan altid omgås. Med parametre får databasen kommandoen og værdierne hver for sig, og værdien kan ikke blive til kode.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Giv hver del af systemet præcis de rettigheder, den skal bruge. Ikke én mere.',
      body: '**Least privilege** betyder: mindst mulige rettigheder til at løse opgaven.\n\nWebserveren, der kun skal læse produkter, skal ikke have lov at slette tabeller. Praktikanten skal ikke være domæneadministrator. Appen på din telefon skal ikke have adgang til kontakter for at kunne vise vejret.\n\nPointen er at **begrænse skaden**, når noget alligevel går galt. Og det gør det.\n\nDen anden halvdel hedder **defense in depth**: flere lag, så ét brud ikke er nok. Firewall, adgangskontrol, kryptering, logning og backup. Ingen af dem er perfekte, men en angriber skal igennem dem alle.\n\nEt tredje princip er **fail secure**: når noget går galt, skal systemet lukke i stedet for at åbne. En dør, der springer op, når strømmen går, er nem at angribe: sluk strømmen.',
      analogi: 'En middelalderborg havde ikke én mur. Den havde voldgrav, ringmur, port, indre gård og tårn. Angriberen skulle igennem hver eneste.',
      hvorfor: 'Til en eksamen eller jobsamtale er det her svaret på »hvordan ville du sikre systemet?«: ikke ét produkt, men lag og mindst mulige rettigheder.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er formålet med least privilege?',
      svar: [
        'At gøre systemet hurtigere at arbejde med til daglig',
        'At begrænse skaden, når noget bliver kompromitteret',
        'At slippe for at skulle bruge to-faktor på konti',
        'At spare penge på licenser og antallet af konti',
      ],
      rigtigt: 1,
      forklaring: 'Princippet antager, at noget før eller siden går galt. Har den kompromitterede konto få rettigheder, bliver skaden lille.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Logning er kedeligt, indtil den dag du skal svare på, hvad der skete.',
      body: 'Når angrebet er sket, er spørgsmålene altid de samme: **hvornår kom de ind, hvad rørte de, og er de ude nu?** Uden logning kan ingen svare.\n\nDerfor:\n• **Log** login, fejlslagne login, rettighedsændringer og adgang til følsomme data.\n• Gem loggen et sted, **angriberen ikke kan rette i**. Ellers rydder han op efter sig.\n• **Overvåg** for mønstre: 500 fejlslagne login i minuttet er ikke en glemsom bruger.\n\nHav også en **beredskabsplan**, før uheldet sker: hvem ringer man til, hvem må lukke systemet ned, og hvordan orienteres de berørte? I EU skal alvorlige brud på persondata anmeldes til Datatilsynet inden for **72 timer**.\n\nOg husk: en backup, der aldrig er blevet **prøvet gendannet**, er ikke en backup. Det er et håb.',
      analogi: 'Et overvågningskamera, der optager til en harddisk i det uaflåste rum, kameraet hænger i. Det er første sted, indbrudstyven går hen.',
      hvordan: [
        'Opdag: overvågning eller en bruger siger, at noget er galt.',
        'Inddæm: afskær den ramte maskine, men sluk den ikke nødvendigvis (beviser).',
        'Fjern årsagen: luk hullet og fjern adgangene.',
        'Gendan fra en backup, du har testet.',
        'Lær: skriv ned, hvad der skete, og hvad der skal ændres.',
      ],
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvorfor skal logs gemmes et sted, angriberen ikke kan skrive til?',
      svar: [
        'For at spare plads på serveren',
        'Så sporene ikke kan slettes eller ændres bagefter',
        'Fordi loven kræver kryptering af alle logs',
        'For at gøre systemet hurtigere under angreb',
      ],
      rigtigt: 1,
      forklaring: 'Det første en erfaren angriber gør, er at rydde op efter sig. En log, han kan redigere, er ubrugelig som bevis.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k3',
      pastand: 'Et system er enten sikkert eller usikkert.',
      rigtigt: 0,
      forklaring: 'Myte. Sikkerhed er en afvejning mod brugbarhed og pris, og den gælder kun over for bestemte trusler. Derfor starter arbejdet med at beskrive, hvad man beskytter mod hvem.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k4',
      pastand: 'En backup, der aldrig er testet ved en gendannelse, kan man regne med.',
      rigtigt: 0,
      forklaring: 'Myte. Halvt ødelagte backups, manglende nøgler og glemte databaser opdages typisk først den dag, de skal bruges.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k4',
      sporgsmal: 'Sæt håndteringen af et sikkerhedsbrud i rækkefølge',
      trin: [
        'Opdag bruddet gennem overvågning eller en henvendelse',
        'Inddæm: afskær de ramte systemer fra netværket',
        'Find og luk hullet, og fjern angriberens adgange',
        'Gendan fra en backup, der er testet',
        'Skriv forløbet ned, og ret det, der gjorde det muligt',
      ],
      forklaring: 'Inddæmning kommer før oprydning: lukker man hullet uden at afskære adgangen, er angriberen der stadig.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan du ville sikre en webapplikation.',
      punkter: [
        { tekst: 'Start med en trusselsmodel: hvad, mod hvem, hvad koster det', ord: ['trussel', 'model', 'beskytte'] },
        { tekst: 'CIA: fortrolighed, integritet, tilgængelighed', ord: ['fortrolig', 'integritet', 'tilgængelig', 'cia'] },
        { tekst: 'Alt input er data: parameteriserede forespørgsler og escaping', ord: ['input', 'parameter', 'prepared', 'escape'] },
        { tekst: 'Least privilege for brugere og services', ord: ['least privilege', 'rettighed', 'mindst'] },
        { tekst: 'Flere lag (defense in depth) og fail secure', ord: ['lag', 'depth', 'fail secure'] },
        { tekst: 'Logning, overvågning, testet backup og en beredskabsplan', ord: ['log', 'overvåg', 'backup', 'beredskab'] },
      ],
    },
  ],
};
