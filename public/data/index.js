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
import diagnoser from './psykiatri/diagnoser.js';
import angst from './psykiatri/angst.js';
import psykose from './psykiatri/psykose.js';
import stoicisme from './filosofi/stoicisme.js';
import ragekniv from './filosofi/ragekniv.js';
import eksistens from './filosofi/eksistens.js';
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
const psykiatri = samlSpor('psykiatri', [diagnoser, angst, psykose]);
const filosofi = samlSpor('filosofi', [stoicisme, ragekniv, eksistens]);

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
  {
    id: 'kob-stoa-kat', type: 'kobling', kraever: ['stoicisme-k3q', 'angst-k2q'],
    hook: 'Kognitiv terapi er stoicisme med et randomiseret forsøg ovenpå.',
    body: '**Epiktet**, omkring år 100: »Det er ikke tingene, der plager os, men vores domme om dem.«\n\n**Aaron Beck**, 1970\'erne: hændelse → automatisk tanke → følelse. Ændr tanken, og følelsen ændrer sig.\n\nBeck og Albert Ellis nævnte begge stoikerne som inspiration. Forskellen er, at kognitiv adfærdsterapi har testet idéen i hundredvis af kontrollerede forsøg.\n\nOg der er en ting mere, stoikerne også vidste: tanker ændres ikke kun ved at tænke. Seneca øvede sig i det, han frygtede, ved at leve simpelt i nogle dage. Det minder om **eksponering**: at teste forventningen mod virkeligheden.\n\nSå når du lærer om angstbehandling, lærer du også 2.000 år gammel filosofi. Og omvendt.',
  },
  {
    id: 'kob-stoa-reappraisal', type: 'kobling', kraever: ['stoicisme-k3q', 'stress-k3q'],
    hook: '»Min krop gør mig klar« er Epiktet i en eksamenssal.',
    body: 'I stress-sporet lærte du om **reappraisal**: studerende, der fik at vide, at nervøsitet kan hjælpe, klarede sig bedre (Jamieson m.fl. 2010).\n\nDet er præcis Epiktets pointe. Hjertebanken er tingen. »Jeg er ved at bryde sammen« er dommen. »Jeg er klar« er en anden dom om den samme ting.\n\nStoikerne ville sige: du vælger ikke, om hjertet banker. Men dommen er **op til dig**.\n\nForskellen fra at undertrykke er vigtig for begge. Stoikerne ville ikke fjerne følelsen, men give den en klogere tolkning. Forskningen viser, at undertrykkelse virker dårligt, mens omtolkning virker.',
  },
  {
    id: 'kob-occam-overfitting', type: 'kobling', kraever: ['ragekniv-k1q', 'biases-b1q'],
    hook: 'Occam fra 1300-tallet og Gigerenzers tommelfingerregler er den samme idé: frie parametre koster.',
    body: 'Gigerenzer viste, at simple regler ofte slår komplekse modeller, når data er få og støjfyldte. Grunden er **overfitting**: en model med mange frihedsgrader lærer støjen.\n\nOccams ragekniv siger: foretræk forklaringen med færrest ekstra antagelser, når to passer lige godt.\n\nHver ekstra antagelse er en **fri parameter**. Den gør det lettere at forklare de data, du har, og sværere at forudsige de data, du ikke har set.\n\nMaskinlæring har gjort det matematisk: regularisering, der straffer komplekse modeller, er Occam i formler.\n\nMen husk myten fra begge spor: det enkle er ikke automatisk sandt. Det er bare det sikreste bud, indtil data siger andet.',
  },
  {
    id: 'kob-salience-dopamin', type: 'kobling', kraever: ['psykose-k2q', 'afhaengighed-k2q'],
    hook: 'Det samme dopaminsystem, der gør en case uimodståelig, kan få en nummerplade til at føles som et budskab.',
    body: 'I afhængighedssporet: dopamin koder **prediction error** og markerer, hvad der er vigtigt, især ved uforudsigelige belønninger.\n\nI psykosesporet: Kapurs **aberrant salience**. Når det samme markeringssystem fyrer forkert, bliver ligegyldige ting ladet med betydning, og hjernen bygger en forklaring.\n\nFælles kerne: dopamin siger ikke »det her er rart«, men **»læg mærke til det her«**.\n\n• Ved en spilleautomat er markeringen kunstigt stærk, fordi belønningen er uforudsigelig.\n• Ved psykose er markeringen tilfældig, og verden føles fuld af skjulte mønstre.\n\nDet er også en af grundene til, at rusmidler, der øger dopamin, som amfetamin, kan udløse psykose hos nogle.',
  },
  {
    id: 'kob-tredemolle-casino', type: 'kobling', kraever: ['eksistens-k5q', 'afhaengighed-k2q'],
    hook: 'Casinoet i denne app er bygget på to fund. Nu kender du begge.',
    body: '**Variabel belønning** (afhængighedssporet): du ved ikke, hvornår gevinsten kommer, så hjernen bliver ved med at trykke.\n\n**Hedonisk tilpasning** (eksistenssporet): glæden ved en gevinst falder hurtigt tilbage mod udgangspunktet. Så du vil have **næste** gevinst for at mærke det igen.\n\nSammen er de motoren i spilleautomater, loot boxes og skrabelodder: kort top, hurtig tilpasning, ny indsats.\n\nForskellen her er, at mønterne kun kan tjenes ved at **lære**, og de kan ikke købes for rigtige penge. Oddsene står altid synligt, og husets fordel er ægte: i det lange løb taber du mønter på at spille. Ligesom i et rigtigt casino.\n\nNæste gang et spil føles »lige ved«: det er tredemøllen, der kører.',
  },
];

export const pakker = [
  { id: 'sw3sys', navn: 'SW3SYS', emoji: '🎓', gradient: 'linear-gradient(135deg, #5851DB, #833AB4 45%, #E1306C)', farve: '#833AB4', eksamen: true },
  { id: 'dao', navn: 'AlgoDat', emoji: '🧮', gradient: 'linear-gradient(135deg, #00C6FF, #405DE6 50%, #833AB4)', farve: '#405DE6' },
  { id: 'psykologi', navn: 'Psykologi', emoji: '🧠', gradient: 'linear-gradient(135deg, #FCAF45, #F77737 45%, #E1306C)', farve: '#F77737' },
  { id: 'psykiatri', navn: 'Psykiatri', emoji: '🩺', gradient: 'linear-gradient(135deg, #11998E, #4776E6 55%, #8E54E9)', farve: '#4776E6' },
  { id: 'filosofi', navn: 'Filosofi', emoji: '🏛️', gradient: 'linear-gradient(135deg, #A18CD1, #FF6A88 60%, #FF99AC)', farve: '#A18CD1' },
];

const spor = [...sw3sys.spor.map((s) => ({ ...s, pakke: 'sw3sys' })), ...dao.spor, ...psyk.spor, ...psykiatri.spor, ...filosofi.spor];
const sporPakke = Object.fromEntries(spor.map((s) => [s.id, s.pakke]));

export default {
  pakker,
  temaer,
  spor,
  kort: [
    ...sw3sys.kort.map((k) => ({ ...k, pakke: 'sw3sys' })),
    ...dao.kort,
    ...psyk.kort,
    ...psykiatri.kort,
    ...filosofi.kort,
    ...sammenlign.map((k) => ({ ...k, type: 'sammenlign', pakke: sporPakke[k.spor] })),
    ...tvaerfaglige.map((k) => ({ ...k, spor: 'kobling', pakke: 'tvaerfag' })),
  ],
};
