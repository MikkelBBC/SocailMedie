// Skalering: hvad der sker, når der kommer flere brugere, end maskinen kan nå.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'skalering', nr: 0, titel: 'Cache, køer og CAP', kort: 'Skalering', emoji: '📶',
    farve: '#0EA5E9', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #A78BFA 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Op eller ud? Den ene er nemmest. Den anden er den eneste, der holder i længden.',
      body: '**Lodret skalering** (scale up) er en større maskine: flere kerner, mere RAM. Det kræver ingen ændringer i koden, og det er derfor altid det rigtige første skridt.\n\nMen der findes en største maskine. Og der er kun én af den, så den er også et **single point of failure**.\n\n**Vandret skalering** (scale out) er flere maskiner bag en **load balancer**. Det skalerer principielt uendeligt og overlever, at én maskine dør. Prisen er, at koden skal kunne tåle det, og det betyder først og fremmest ét krav:\n\n**Ingen tilstand i processen.** Gemmer server A brugerens session i hukommelsen, får brugeren en fejl, så snart load balanceren sender næste kald til server B. Tilstand skal ud i noget delt – en database, en cache, en session-store.\n\nEn tjeneste, der opfylder det, kaldes **stateless**, og det er dét ene ord, der afgør, om vandret skalering er en konfigurationsændring eller en omskrivning.\n\nDerfor er rækkefølgen næsten altid: mål først, køb en større maskine, og gør tjenesten stateless, **inden** du får brug for det.',
      analogi: 'En kasse i et supermarked kan blive hurtigere (lodret). Men der er en grænse for, hvor hurtigt ét menneske kan scanne. Flere kasser (vandret) virker kun, hvis kunden kan gå til en hvilken som helst af dem – og det kan hun ikke, hvis halvdelen af hendes varer ligger bag den første kasse.',
      figur: {
        titel: 'Tilstand er det, der spænder ben',
        svg: svg(180, `
          ${box(120, 18, 84, 24, 'Load balancer', { ...BLAA, size: 10 })}
          ${pil(150, 44, 110, 62)}
          ${pil(174, 44, 214, 62)}
          ${box(56, 64, 100, 28, 'Server A', { ...HVID, size: 10 })}
          ${box(168, 64, 100, 28, 'Server B', { ...HVID, size: 10 })}
          ${box(56, 96, 100, 24, 'session i RAM', { ...ROSA, size: 9 })}
          ${box(168, 96, 100, 24, 'kender intet', { ...ROSA, size: 9 })}
          ${txt(160, 138, 'Bruger rammer B → logget ud', { size: 10, farve: ROED })}
          ${box(56, 148, 212, 22, 'Løsning: læg tilstanden i noget delt', { ...GROEN, size: 10 })}`),
        tekst: 'Stateless betyder ikke »uden data«. Det betyder, at data ikke ligger i netop den proces.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er den vigtigste forudsætning for vandret skalering?',
      svar: [
        'At databasen kører på en større maskine end før',
        'At alle servere har præcis samme hardware',
        'At load balanceren fordeler kaldene helt jævnt',
        'At tjenesten ikke gemmer tilstand i sin egen proces',
      ],
      rigtigt: 3,
      forklaring: 'Er tjenesten stateless, kan et hvilket som helst kald gå til en hvilken som helst server. Ligger sessionen i RAM på én maskine, bryder alting sammen, så snart der er to.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Cache er den billigste ydelsesgevinst, der findes. Og kilden til de mærkeligste fejl.',
      body: 'En **cache** gemmer et svar, så det ikke skal regnes ud igen. Den virker, fordi adgangen er **skæv**: en lille del af data læses langt oftere end resten.\n\nDe vigtigste tal at kende for sit eget system:\n• **Hit rate**: hvor ofte svaret allerede lå der. Under ca. 80 % er gevinsten tit lille.\n• **TTL**: hvor længe et svar må være gammelt. Det er i virkeligheden spørgsmålet »hvor forældede data kan vi leve med?«, og det er en **forretningsbeslutning**, ikke en teknisk.\n\nDe klassiske problemer har navne:\n• **Stale data**: nogen ændrede kilden, cachen ved det ikke.\n• **Cache stampede**: mange kopier udløber samtidig, og tusind kald rammer databasen på én gang. Modtræk: spred udløbstiden tilfældigt (jitter).\n• **Invalidering**: at vide, hvornår et svar ikke længere er sandt. Phil Karlton: de to sværeste ting i datalogi er cache-invalidering og at navngive ting.\n\nEn cache ændrer ikke, hvad systemet **kan**. Den ændrer, hvor hurtigt det svarer – og hvor sandt svaret er.',
      analogi: 'En seddel på køleskabet med naboens telefonnummer. Meget hurtigere end at slå op. Lige indtil naboen skifter nummer – og nu har du et svar, der er hurtigt og forkert.',
      hvorfor: 'Det er samme afvejning som CPU-cachen fra AlgoDat: du bytter friskhed for hastighed. Forskellen er, at her bestemmer du selv, hvor meget friskhed du sælger.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er en cache stampede?',
      svar: [
        'At hit rate falder, fordi data læses mere jævnt',
        'At to servere gemmer forskellige svar på samme nøgle',
        'At mange poster udløber samtidig og rammer kilden på én gang',
        'At cachen fyldes hurtigere op, end den kan tømmes',
      ],
      rigtigt: 2,
      forklaring: 'Alle kald bliver til cache-misses i samme sekund, og databasen får hele belastningen på én gang. Modtrækket er at sprede udløbstiden tilfældigt, så de ikke udløber i kor.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Er netværket nede, må du vælge: svar forkert, eller lad være med at svare.',
      body: '**CAP-sætningen** (Brewer, bevist af Gilbert og Lynch) handler om distribuerede systemer:\n\n• **C** – consistency: alle ser de samme data.\n• **A** – availability: alle kald får et svar.\n• **P** – partition tolerance: systemet virker, selvom netværket mellem noderne knækker.\n\nDen almindelige udlægning – »vælg to af tre« – er upræcis. I et rigtigt distribueret system **kan du ikke fravælge P**: netværk fejler, og det skal systemet forholde sig til. Valget står altså mellem **C og A, når en partition er i gang**.\n\nTo noder kan ikke tale sammen. Et skrivekald kommer ind:\n• Vælger du **C**: afvis kaldet. Data forbliver korrekte, men systemet er nede for den bruger.\n• Vælger du **A**: tag imod. Brugeren får svar, men de to sider af nettet er nu uenige, og nogen skal rydde op bagefter.\n\nOg vigtigst: valget er ikke pr. system, men **pr. operation**. En bankoverførsel vælger C. »Antal likes« vælger A – hvis tallet er et sekund bagud, sker der ingenting.\n\n**Eventual consistency** er A-vejen med et løfte: uden nye skrivninger bliver alle enige til sidst.',
      analogi: 'To kasseapparater i hver sin butik, hvor telefonlinjen imellem er gået ned. Enten nægter I at sælge den sidste vare, før I kan ringe sammen (C) – eller også sælger I begge to den samme vare og finder ud af det bagefter (A). Der findes ikke en tredje mulighed.',
      figur: {
        titel: 'Valget opstår kun under en partition',
        svg: svg(180, `
          ${box(24, 24, 112, 30, 'Node A', { ...HVID, size: 11 })}
          ${box(184, 24, 112, 30, 'Node B', { ...HVID, size: 11 })}
          <line x1="140" y1="39" x2="180" y2="39" stroke="${ROED}" stroke-width="3" stroke-dasharray="5 4"/>
          ${txt(160, 68, 'netværket er knækket', { size: 10, farve: ROED })}
          ${box(24, 82, 112, 44, 'Vælg C:\\nafvis skrivningen', { ...BLAA, size: 9 })}
          ${box(184, 82, 112, 44, 'Vælg A:\\ntag imod, ryd op senere', { ...GROEN, size: 9 })}
          ${txt(160, 148, 'Valget træffes pr. operation, ikke pr. system', { size: 10, farve: INK })}
          ${txt(160, 168, 'Bankoverførsel: C  ·  antal likes: A', { size: 10 })}`),
        tekst: 'Når nettet virker, får du både C og A. Det er kun under partitionen, at sætningen tvinger dig til at vælge.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvornår tvinger CAP dig faktisk til at vælge?',
      svar: [
        'Kun når databasen kører på mere end tre noder',
        'Hele tiden, da man kun kan få to af tre egenskaber',
        'Kun mens netværket mellem noderne er knækket',
        'Når skrivninger og læsninger sker på samme tid',
      ],
      rigtigt: 2,
      forklaring: 'Uden partition får du både C og A. Sætningen siger noget om, hvad systemet gør, **når** nettet svigter – og det valg kan træffes forskelligt for forskellige operationer.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'En kø gør ikke systemet hurtigere. Den gør ventetiden til nogen andens problem.',
      body: 'En **message queue** lægger sig mellem afsender og modtager. Afsenderen lægger en besked og går videre; en **worker** tager den, når den kan.\n\nDet giver tre ting:\n• **Udjævning** af spidsbelastning. Kommer der 10.000 ordrer på et minut, vokser køen – i stedet for at systemet falder om.\n• **Afkobling**: afsenderen behøver ikke at vide, hvem der behandler, eller om de kører lige nu.\n• **Robusthed**: dør en worker, ligger beskeden der stadig.\n\nMen svaret kommer **senere**, og det ændrer hele brugeroplevelsen: »din ordre er modtaget« i stedet for »din ordre er gennemført«.\n\nTo ting, der altid kommer:\n• **At-least-once**: de fleste køer garanterer, at en besked leveres mindst én gang – altså kan den komme **to** gange. Derfor skal behandlingen være **idempotent**: at køre den to gange skal give samme resultat som at køre den én gang. Det klares typisk med en forretningsnøgle, man tjekker, før der handles.\n• **Dead letter queue**: beskeder, der fejler igen og igen, skal et sted hen. Uden den kan én giftig besked blokere hele køen.\n\nEn voksende kø er i øvrigt det tidligste og tydeligste signal om, at der er for lidt kapacitet.',
      analogi: 'Køen i en bagerbutik. Den gør ikke ekspedienten hurtigere. Den sørger bare for, at folk ikke går igen, og at de bliver taget i rækkefølge – og hvis køen bliver ved med at vokse, er der ikke brug for flere numre, men for en ekspedient mere.',
      hvorfor: 'Idempotens er den vigtigste vane at tage med: i alt distribueret arbejde skal du antage, at din besked kan komme to gange.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvorfor skal en køs modtager være idempotent?',
      svar: [
        'Fordi køen ellers ikke kan skalere vandret',
        'Fordi beskederne kan nå at udløbe undervejs',
        'Fordi de fleste køer kan levere samme besked to gange',
        'Fordi beskederne kan komme i forkert rækkefølge',
      ],
      rigtigt: 2,
      forklaring: 'At-least-once er den almindelige garanti. Dubletter er derfor ikke en fejl, men normal drift – og behandlingen skal give samme resultat, uanset hvor mange gange den kører.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'En cache gør altid systemet hurtigere.',
      rigtigt: 0,
      forklaring: 'Myte. Med lav hit rate betaler du et ekstra opslag hver gang uden gevinst – og du har fået et nyt sted, hvor data kan være forkerte.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'CAP betyder, at man frit kan vælge to af de tre egenskaber.',
      rigtigt: 0,
      forklaring: 'Myte. Partition tolerance kan man ikke fravælge i et rigtigt distribueret system. Valget står mellem konsistens og tilgængelighed, og kun mens netværket er knækket.',
    },
    {
      id: 'case1', type: 'case', efter: 'k1',
      scenarie: 'Efter at I gik fra én til tre servere, bliver brugerne tilfældigt logget ud. Det sker cirka to ud af tre gange, de klikker rundt.',
      sporgsmal: 'Hvad er den mest sandsynlige årsag?',
      svar: [
        'Load balanceren fordeler trafikken for ujævnt',
        'Cookien udløber hurtigere end den plejede at gøre',
        'De tre servere har forskellig systemtid indstillet',
        'Sessionen ligger i hukommelsen på én af serverne',
      ],
      rigtigt: 3,
      forklaring: 'To ud af tre kald rammer en server, der ikke kender sessionen. Tallet er selve beviset. Løsningen er at flytte sessionen til en delt store – ikke at binde brugeren til én server.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan man får et system til at holde til flere brugere.',
      punkter: [
        { tekst: 'Mål først: hvor er flaskehalsen?', ord: ['mål', 'flaskehals', 'profil'] },
        { tekst: 'Lodret først, derefter vandret', ord: ['lodret', 'vandret', 'scale'] },
        { tekst: 'Stateless er forudsætningen for flere maskiner', ord: ['stateless', 'session', 'tilstand'] },
        { tekst: 'Cache: hit rate, TTL og invalidering', ord: ['cache', 'ttl', 'invalider', 'stale'] },
        { tekst: 'CAP: C eller A under en partition', ord: ['cap', 'partition', 'konsistens'] },
        { tekst: 'Køer udjævner spidser og kræver idempotens', ord: ['kø', 'queue', 'idempot'] },
      ],
    },
  ],
};
