// Alle fag samlet. Hvert fag er en pakke med ét eller flere spor.
// Lokale kort-id'er får sporets id som præfiks (fx algodat-a1), så de er unikke.
import sw3sys from './sw3sys/index.js';
import algodat from './dao/algodat.js';
import biases from './psykologi/biases.js';
import hukommelse from './psykologi/hukommelse.js';
import afhaengighed from './psykologi/afhaengighed.js';
import vaner from './psykologi/vaner.js';
import social from './psykologi/social.js';
import stress from './psykologi/stress.js';
import grafer from './dao/grafer.js';
import traeer from './dao/traeer.js';
import dp from './dao/dp.js';
import sammenlign from './sammenlign.js';
import temaer from './temaer.js';

const prefix = (t, id) => (id ? `${t}-${id}` : id);

function samlSpor(pakke, moduler) {
  return {
    spor: moduler.map((m) => ({ ...m.spor, pakke })),
    kort: moduler.flatMap(({ spor, kort }) =>
      kort.map((k) => ({ ...k, id: prefix(spor.id, k.id), om: prefix(spor.id, k.om), efter: prefix(spor.id, k.efter), spor: spor.id, pakke })),
    ),
  };
}

const dao = samlSpor('dao', [algodat, traeer, grafer, dp]);
const psyk = samlSpor('psykologi', [biases, hukommelse, afhaengighed, vaner, social, stress]);

// Koblinger på tværs af fag.
const tvaerfaglige = [
  {
    id: 'kob-availability-cache', type: 'kobling', kraever: ['biases-b3q', 'algodat-a4q'],
    hook: 'Availability-heuristikken er en cache.',
    body: 'Din hjerne kan ikke tælle, hvor ofte noget sker i verden. Den gør det, systemer gør, når det rigtige opslag er for dyrt: den kigger i **cachen**.\n\nHvad der ligger i cachen, bestemmes af det samme som i en CPU: **recency** (det var for nylig) og **frekvens** (det sker ofte). Plus én ting mere: **salience**, dvs. hvor voldsomt det var.\n\nSå »hvor let kommer jeg i tanke om det?« bliver et proxy-mål for »hvor almindeligt er det?«. Det virker fint, når cachen afspejler verden. Men medier fungerer som en proces, der konstant skriver dramatiske, sjældne hændelser ind i cachen. Estimatet bliver skævt, fordi **cachen ikke er repræsentativ** for den data, den skal spejle.',
  },
  {
    id: 'kob-confirmation-race', type: 'kobling', kraever: ['biases-b4q', 't04-k1q'],
    hook: 'Du finder ikke dine race conditions, fordi du tester som i 2-4-6.',
    body: 'Når du har skrevet samtidig kode, har du en hypotese: »den virker«. Du kører den. Den virker. Du kører den igen. Den virker.\n\nDet er 8-10-12 og 20-22-24 igen. Hvert grønt resultat **passer** med din hypotese, men det ville også passe med »den har en race, der kun rammer ved uheldig timing«.\n\nDen informative test er den, der **aktivt prøver at vælte dig**, altså 1-2-3-testen for tråde:\n\n• Kør med ThreadSanitizer.\n• Stresstest med mange tråde og tilfældige `sleep`-kald.\n• Kør på en maskine med flere kerner end din egen.\n\nDebugging er hypotesetest. Confirmation bias er den fejl, der gør det let at stoppe for tidligt.',
  },
  {
    id: 'kob-glemsel-fsrs', type: 'kobling', kraever: ['hukommelse-k1q', 't09-k3q'],
    hook: 'Glemsel er cache eviction – og FSRS er din page replacement-algoritme.',
    body: 'Et OS med paging må hele tiden vælge, hvilke sider der skal smides ud af RAM. Gode algoritmer gætter på, hvilke sider der **ikke** skal bruges snart (LRU er et klassisk bud).\n\nHjernen gør noget lignende. Ting, du ikke har hentet frem længe, bliver sværere at finde, som en side, der er swappet ud. At hente noget frem svarer til en **page fault**: dyrt, men bagefter ligger det »varmt« igen.\n\nFSRS, algoritmen i denne app, modellerer for hvert kort hvor stabilt sporet er, og planlægger gentagelsen lige før sandsynligheden for at huske falder under 90 %. Den gør altså bevidst det, et OS gør automatisk: holder de vigtige sider varme med mindst muligt arbejde.',
  },
  {
    id: 'kob-stress-retrieval', type: 'kobling', kraever: ['stress-k2q', 'hukommelse-k2q'],
    hook: 'Derfor tester appen dig i stedet for at lade dig læse: det er din forsikring mod eksamensnerver.',
    body: 'To fund fra to forskellige spor passer sammen som hånd i handske.\n\n**Hukommelse**: at hente frem (retrieval practice) slår genlæsning, fordi det træner præcis den handling, du skal bruge til eksamen.\n\n**Stress**: akut stress kan blokere genkaldelse. Men i Smith m.fl. (2016) var materiale lært ved retrieval practice **beskyttet** mod stress-effekten.\n\nSammen betyder det, at hver quiz, hvert »forklar højt« og hver simulering ikke kun gør dig bedre. De gør også din viden **robust**, når hjertet hamrer foran censor.\n\nGenlæsning føles tryggere aftenen før. Det er det modsatte, der virker.',
  },
  {
    id: 'kob-dopamin-kiste', type: 'kobling', kraever: ['afhaengighed-k2q', 'vaner-k2q'],
    hook: 'Cases i denne app er en spilleautomat. Med vilje – og med en sikkerhedssele.',
    body: 'Cases og ×3-bonussen bruger **variabel forstærkning**, præcis den mekanik, der gør spilleautomater og feeds så svære at slippe. Uforudsigelige belønninger giver en dopamin-prediction error hver gang.\n\nForskellen er, **hvad** belønningen kobles til. Du får kun cases for rigtige svar i træk, altså for at hente viden frem. Og overraskelsen i sig selv styrker hukommelsen for det, der skete lige omkring den.\n\nSikkerhedsselen er, at **»Dagens mål«** siger stop. Streak-frys betyder, at én glemt dag ikke vælter vanen (Lally-studiet: smuttere er OK).\n\nKend mekanikken, så bruger du den, i stedet for at den bruger dig.',
  },
  {
    id: 'kob-socialproof-availability', type: 'kobling', kraever: ['social-k3q', 'biases-b3q'],
    hook: 'Trending-listen er social proof og availability-heuristik i én skærm.',
    body: '**Social proof**: når vi er usikre, gør vi, som andre gør. Og likes og visninger fortæller dig, hvad »alle« synes.\n\n**Availability**: det, der er let at komme i tanke om, virker hyppigt og vigtigt.\n\nEn algoritmisk feed kombinerer dem. Det mest delte bliver vist mest, det bliver lettest at huske, føles derfor mest almindeligt, og bliver så delt endnu mere.\n\nResultatet kan være et billede af verden, hvor det dramatiske og det virale virker langt mere udbredt, end det er.\n\nModgift: spørg »hvor mange ud af hvor mange?« og »hvem ser jeg ikke?«',
  },
];

export const pakker = [
  { id: 'sw3sys', navn: 'SW3SYS', emoji: '🎓', gradient: 'linear-gradient(135deg, #5851DB, #833AB4 45%, #E1306C)', farve: '#833AB4', eksamen: true },
  { id: 'dao', navn: 'AlgoDat', emoji: '🧮', gradient: 'linear-gradient(135deg, #00C6FF, #405DE6 50%, #833AB4)', farve: '#405DE6' },
  { id: 'psykologi', navn: 'Psykologi', emoji: '🧠', gradient: 'linear-gradient(135deg, #FCAF45, #F77737 45%, #E1306C)', farve: '#F77737' },
];

const spor = [...sw3sys.spor.map((s) => ({ ...s, pakke: 'sw3sys' })), ...dao.spor, ...psyk.spor];
const sporPakke = Object.fromEntries(spor.map((s) => [s.id, s.pakke]));

export default {
  pakker,
  temaer,
  spor,
  kort: [
    ...sw3sys.kort.map((k) => ({ ...k, pakke: 'sw3sys' })),
    ...dao.kort,
    ...psyk.kort,
    ...sammenlign.map((k) => ({ ...k, type: 'sammenlign', pakke: sporPakke[k.spor] })),
    ...tvaerfaglige.map((k) => ({ ...k, spor: 'kobling', pakke: 'tvaerfag' })),
  ],
};
