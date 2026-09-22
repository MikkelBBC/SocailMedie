// Drift: hvad man gør, når noget går galt – og hvordan man opdager det først.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'fejl', nr: 1, titel: 'Når systemet fejler', kort: 'Drift', emoji: '🚨',
    farve: '#DC2626', gradient: 'linear-gradient(135deg, #DC2626 0%, #FB923C 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Et kald uden timeout er ikke tålmodigt. Det er en langsom måde at tage hele systemet ned på.',
      body: 'Kalder du en anden tjeneste uden **timeout**, venter din tråd, indtil netværksstakken giver op – og det kan være minutter.\n\nUnder belastning bliver det til en kædereaktion. Hver ventende tråd holder på hukommelse og en forbindelse. Når alle tråde venter på den langsomme tjeneste, kan din egen tjeneste ikke svare nogen – heller ikke dem, der slet ikke skulle bruge den. Det kaldes **cascading failure**.\n\nDe tre greb, der altid hører sammen:\n\n• **Timeout**: giv op efter et sagligt tidsrum. »Hvor længe giver det mening at vente for en bruger, der kigger på en skærm?«\n• **Retry med eksponentiel backoff og jitter**: prøv igen efter 1, 2, 4 sekunder – med et tilfældigt tillæg. Uden jitter prøver alle klienter igen på nøjagtig samme tidspunkt og giver den nødstedte tjeneste dødsstødet.\n• **Circuit breaker**: når fejlraten er høj nok, så **hold op med at prøve** i et stykke tid. Fejl med det samme, slip trådene fri, og lad en enkelt prøvekald teste, om den anden side er kommet sig.\n\nOg husk reglen ved siden af: **retry kun det, der er sikkert at gentage**. Det forudsætter idempotens.',
      analogi: 'At ringe til en, der ikke tager den. Du lægger på efter tredive sekunder (timeout), venter lidt længere for hver gang (backoff) og holder op med at ringe efter femte forsøg (circuit breaker) i stedet for at holde din egen telefon optaget hele dagen.',
      figur: {
        titel: 'Uden timeout breder fejlen sig',
        svg: svg(180, `
          ${box(14, 22, 88, 26, 'Brugere', { ...HVID, size: 10 })}
          ${pil(104, 35, 122, 35)}
          ${box(124, 22, 88, 26, 'Din tjeneste', { ...GUL, size: 10 })}
          ${pil(214, 35, 232, 35)}
          ${box(234, 22, 72, 26, 'Langsom', { ...ROSA, size: 10 })}
          ${box(124, 58, 88, 22, 'alle tråde venter', { ...ROSA, size: 9 })}
          ${box(14, 58, 88, 22, 'får intet svar', { ...ROSA, size: 9 })}
          ${txt(160, 100, 'Én langsom afhængighed tager alle med', { size: 10, farve: ROED })}
          ${box(14, 112, 292, 22, 'Timeout: giv op, og svar de andre', { ...GROEN, size: 10 })}
          ${box(14, 138, 292, 22, 'Circuit breaker: hold op med at prøve et stykke tid', { ...GROEN, size: 10 })}`),
        tekst: 'Pointen er ikke at undgå fejlen i den langsomme tjeneste. Det er at forhindre, at den bliver din.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvorfor skal retries have tilfældigt tillæg (jitter)?',
      svar: [
        'For at klienterne ikke prøver igen på samme tidspunkt',
        'For at timeouten ikke udløber, mens svaret er på vej',
        'For at fordele belastningen jævnt over alle servere',
        'For at undgå at den samme besked bliver sendt to gange',
      ],
      rigtigt: 0,
      forklaring: 'Uden jitter venter alle præcis 1, 2 og 4 sekunder og rammer i kor. Den nødstedte tjeneste får dermed synkroniserede bølger, netop mens den prøver at komme sig.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Logs, metrikker og traces svarer på tre forskellige spørgsmål. Du skal bruge alle tre.',
      body: '**Observability** er evnen til at svare på, hvad der foregår inde i systemet, uden at skulle udgive ny kode først. De tre søjler:\n\n• **Metrikker**: tal over tid. Svarer på **»er der noget galt?«** Billige at gemme, gode til alarmer og grafer.\n• **Logs**: hændelser med detaljer. Svarer på **»hvad skete der præcis?«** Dyre i mængde.\n• **Traces**: én forespørgsels rejse gennem alle tjenester. Svarer på **»hvor gik tiden hen?«**\n\nTre ting, der gør forskellen i praksis:\n\n**Struktureret logging.** `log.info("ordre oprettet", {ordreId, brugerId, ms})` i stedet for en sammensat sætning. Så kan man søge og aggregere i stedet for at læse.\n\n**Correlation id.** Et id, der følger forespørgslen gennem alle tjenester. Uden det kan du ikke samle historien om ét kald på tværs af fem logfiler.\n\n**Percentiler frem for gennemsnit.** Gennemsnittet skjuler det, brugerne mærker. Er p50 på 80 ms og **p99 på 4 sekunder**, har hver hundrede kald en elendig oplevelse – og gennemsnittet ser fint ud.\n\nOg husk, hvad der **ikke** hører til i en log: kodeord, tokens og personoplysninger. Logfiler er et af de hyppigste steder, hemmeligheder lækker.',
      analogi: 'Metrikker er instrumentbrættet: temperaturen stiger. Logs er værkstedets rapport: hvad der konkret skete klokken 14.32. Traces er GPS-sporet: hvor på ruten stod bilen stille. Du kan ikke fejlfinde med kun ét af dem.',
      figur: {
        titel: 'Gennemsnit skjuler det, brugerne mærker',
        svg: svg(170, `
          <line x1="34" y1="120" x2="300" y2="120" stroke="${LINE}" stroke-width="1.5"/>
          ${[40, 32, 36, 30, 34, 38, 31, 35, 33].map((h, i) => box(44 + i * 20, 120 - h, 14, h, '', GROEN)).join('')}
          ${box(232, 30, 14, 90, '', ROSA)}
          ${txt(239, 20, 'p99', { size: 10, farve: ROED })}
          ${txt(120, 136, 'de fleste kald', { size: 10 })}
          ${txt(250, 136, '4 sek', { size: 10, farve: ROED })}
          ${txt(160, 158, 'Gennemsnittet: 120 ms. Hver hundrede bruger: 4 sekunder.', { size: 10 })}`),
        tekst: 'Derfor sættes servicemål på percentiler. »p99 under 500 ms« er et løfte til alle, ikke bare til flertallet.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor måler man svartider på percentiler frem for gennemsnit?',
      svar: [
        'Fordi percentiler er billigere at gemme over tid',
        'Fordi gennemsnittet skjuler de værste oplevelser',
        'Fordi gennemsnit ikke kan beregnes på tværs af servere',
        'Fordi percentiler reagerer hurtigere på ændringer',
      ],
      rigtigt: 1,
      forklaring: 'Et pænt gennemsnit kan sagtens rumme, at hver hundrede kald tager fire sekunder. p99 er præcis det tal, der fortæller, hvor slemt det er for dem, det går værst for.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Systemet skal ikke være ufejlbarligt. Det skal fejle på en måde, nogen kan leve med.',
      body: '**Graceful degradation** betyder, at systemet mister funktioner i stedet for at falde om.\n\nEt eksempel. En webshop har anbefalinger, lager og betaling. Går anbefalingerne ned:\n• **Uden degradation**: hele siden fejler. Ingen kan købe noget.\n• **Med degradation**: anbefalingerne vises ikke. Alle kan stadig købe.\n\nForskellen er en beslutning, der er truffet på forhånd: **hvilke afhængigheder er kritiske, og hvilke er pynt?** Er de ikke delt op, er alting kritisk – og så er systemets oppetid produktet af alle delenes oppetid.\n\nRelaterede greb:\n• **Bulkhead**: adskilte ressourcepuljer, så én langsom afhængighed ikke kan bruge alle tråde.\n• **Feature flag**: en kontakt, der slår en funktion fra uden en ny udgivelse.\n• **Fallback**: et gammelt cachet svar eller en tom liste i stedet for en fejl.\n\nOg det, der er værd at tage med: **fejl er normal drift**, ikke en undtagelse. Ved tilstrækkelig mange maskiner går der altid noget i stykker lige nu. Spørgsmålet er ikke, om noget fejler, men hvor meget der går ned, når det gør.',
      analogi: 'En bil, hvor radioen går i stykker. Du kan stadig køre hjem. Var radioen koblet til tændingen, ville en defekt højttaler efterlade dig i vejkanten – og ingen ville synes, det var et rimeligt design.',
      hvorfor: 'Det er også det bedste argument for at kigge på sine afhængigheder: hver ny afhængighed, du ikke kan undvære, ganger sig ind i din egen oppetid.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er graceful degradation?',
      svar: [
        'At systemet genstarter automatisk, når noget fejler',
        'At systemet mister funktioner i stedet for at gå helt ned',
        'At fejl bliver logget i stedet for at blive vist',
        'At trafikken flyttes til en anden datacenter-region',
      ],
      rigtigt: 1,
      forklaring: 'Kernen er, at man på forhånd har besluttet, hvad der er kritisk. Uden den beslutning er alt kritisk, og så tager den mindst vigtige afhængighed hele systemet med sig.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Efter nedbruddet er det vigtigste spørgsmål ikke hvem. Det er hvorfor det kunne lade sig gøre.',
      body: 'En **postmortem** er den skriftlige gennemgang efter en hændelse. Den skal være **blameless**: den leder efter, hvad der gjorde fejlen mulig, ikke efter hvem der trykkede.\n\nDet er ikke venlighed for venlighedens skyld. Det er den eneste måde at få den præcise historie. Er der en skyldig at finde, bliver forklaringer forsigtige, og så mister man netop de detaljer, man skulle bruge.\n\nEn brugbar postmortem indeholder:\n• **Tidslinje**: hvad skete hvornår, i klokkeslæt.\n• **Påvirkning**: hvor mange brugere, hvor længe, hvad kunne de ikke.\n• **Udløsende årsag** og de **medvirkende faktorer**. Der er sjældent kun én.\n• **Hvad der gjorde det svært** at opdage eller rette.\n• **Handlinger** med en ejer og en dato. Uden ejer sker der ingenting.\n\nTo tal, der ofte bruges: **MTTD** (tid til at opdage) og **MTTR** (tid til at rette). I praksis er MTTD det sted, der er mest at hente – de fleste hændelser er lange, fordi ingen opdagede dem, ikke fordi rettelsen var svær.\n\nOg det mest almindelige fund: fejlen var mulig, fordi der ikke var noget, der stoppede den. Derfor handler de gode handlingspunkter om **rækværk**, ikke om at være mere omhyggelig næste gang.',
      analogi: 'En flyhavarikommission. Den leder ikke efter en pilot at fyre, men efter hvorfor systemet tillod det: en kontakt, der sad tæt på en anden, en advarsel, der druknede i støj. Luftfarten er blevet sikker, fordi de spørger sådan.',
      figur: {
        titel: 'Hvor tiden faktisk går',
        svg: svg(170, `
          <line x1="20" y1="70" x2="300" y2="70" stroke="${LINE}" stroke-width="2"/>
          ${box(20, 46, 150, 24, 'Ingen opdager det', { ...ROSA, size: 10 })}
          ${box(174, 46, 60, 24, 'Alarm', { ...GUL, size: 10 })}
          ${box(238, 46, 68, 24, 'Rettet', { ...GROEN, size: 10 })}
          ${txt(95, 96, 'MTTD', { size: 11, farve: ROED })}
          ${txt(272, 96, 'MTTR', { size: 11, farve: '#11998E' })}
          ${txt(160, 130, 'De fleste lange nedbrud er lange, fordi', { size: 10 })}
          ${txt(160, 148, 'ingen opdagede dem – ikke fordi de var svære at rette', { size: 10 })}`),
        tekst: 'Derfor er en alarm på det rigtige tal ofte mere værd end endnu en rettelse i koden.',
      },
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvorfor skal en postmortem være blameless?',
      svar: [
        'Fordi fejl sjældent skyldes et menneske i praksis',
        'Fordi man ellers ikke får den præcise historie frem',
        'Fordi ledelsen ellers kan bruge den imod teamet',
        'Fordi det er mere behageligt for den, der lavede fejlen',
      ],
      rigtigt: 1,
      forklaring: 'Er der en skyldig at finde, bliver forklaringerne forsigtige – og så forsvinder netop de detaljer, der skulle bruges for at forstå, hvorfor fejlen var mulig.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Retries gør altid systemet mere robust.',
      rigtigt: 0,
      forklaring: 'Myte. Retries uden backoff, jitter og en øvre grænse ganger belastningen på en tjeneste, der i forvejen har det svært. Det er en klassisk måde at forlænge et nedbrud på.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'Ved tilstrækkelig mange maskiner er der altid noget, der er i stykker lige nu.',
      rigtigt: 1,
      forklaring: 'Fakta. Derfor designes store systemer ud fra, at fejl er normal drift. Målet er ikke at undgå fejl, men at begrænse, hvad der følger med ned.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k4',
      sporgsmal: 'Sæt håndteringen af et produktionsnedbrud i rækkefølge',
      trin: [
        'Alarmen går på en metrik, brugerne faktisk mærker',
        'Stop blødningen: rul tilbage eller slå funktionen fra',
        'Find årsagen, nu hvor der ikke er tidspres',
        'Ret årsagen, og læg et rækværk, der fanger den igen',
        'Skriv en blameless postmortem med ejer og dato',
      ],
      forklaring: 'Rækkefølgen er vigtig: at stoppe blødningen kommer før at forstå. Mange forlænger nedbruddet, fordi de fejlsøger, mens brugerne stadig er ramt.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar, hvordan man bygger et system, der tåler at fejle.',
      punkter: [
        { tekst: 'Timeout på alle kald ud af processen', ord: ['timeout', 'kald', 'venter'] },
        { tekst: 'Retry med backoff og jitter, og kun hvis det er sikkert', ord: ['retry', 'backoff', 'jitter', 'idempot'] },
        { tekst: 'Circuit breaker stopper kædereaktionen', ord: ['circuit', 'breaker', 'cascading'] },
        { tekst: 'Observability: metrikker, logs og traces', ord: ['metrik', 'log', 'trace', 'correlation'] },
        { tekst: 'Percentiler frem for gennemsnit', ord: ['percentil', 'p99', 'gennemsnit'] },
        { tekst: 'Graceful degradation: mist en funktion, ikke systemet', ord: ['degradation', 'kritisk', 'fallback'] },
        { tekst: 'Blameless postmortem med ejer og dato', ord: ['postmortem', 'blameless', 'mttd'] },
      ],
    },
  ],
};
