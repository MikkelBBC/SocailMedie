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
import ailaering from './ai/laering.js';
import sprogmodeller from './ai/sprogmodeller.js';
import aibrug from './ai/brug.js';
import internet from './tek/internet.js';
import krypto from './tek/krypto.js';
import angreb from './sikkerhed/angreb.js';
import forsvar from './sikkerhed/forsvar.js';
import firma from './business/firma.js';
import forretning from './business/forretning.js';
import invbasis from './invest/basis.js';
import invdk from './invest/danskskat.js';
import design from './arkitektur/design.js';
import test from './arkitektur/test.js';
import skalering from './drift/skalering.js';
import fejl from './drift/fejl.js';
import relation from './db/relation.js';
import ydelse from './db/ydelse.js';
import git from './vaerktoj/git.js';
import sammenlign from './sammenlign.js';
import videoer from './videoer.js';
import forklaringer from './forklaringer.js';
import forklaringerMere from './forklaringer-mere.js';
import forklaringerTek from './forklaringer-tek.js';
import forklaringerMenneske from './forklaringer-menneske.js';
import temaer from './temaer.js';

const prefix = (t, id) => (id ? `${t}-${id}` : id);

// ---------------------------------------------------------------------------
// FAGENE. Vil du tilføje et fag eller et spor, skal du kun to steder hen:
//   1. import modulet øverst i filen
//   2. skriv det ind her
// Resten (pakker, spor, kort, id-præfikser) følger af sig selv.
// `node tools/nyt-fag.mjs <id> "<Navn>" <emoji>` laver skabelonen og skriver
// de to linjer ud, du skal indsætte.
// ---------------------------------------------------------------------------
export const FAG = [
  { id: 'sw3sys', gruppe: 'kode', navn: 'SW3SYS', emoji: '🎓', gradient: 'linear-gradient(135deg, #5851DB, #833AB4 45%, #E1306C)', farve: '#833AB4', eksamen: true, samlet: sw3sys },
  { id: 'dao', gruppe: 'kode', navn: 'AlgoDat', emoji: '🧮', gradient: 'linear-gradient(135deg, #00C6FF, #405DE6 50%, #833AB4)', farve: '#405DE6', moduler: [algodat, traeer, grafer, dp] },
  { id: 'psykologi', gruppe: 'menneske', navn: 'Psykologi', emoji: '🧠', gradient: 'linear-gradient(135deg, #FCAF45, #F77737 45%, #E1306C)', farve: '#F77737', moduler: [biases, hukommelse, afhaengighed, vaner, social, stress] },
  { id: 'psykiatri', gruppe: 'menneske', navn: 'Psykiatri', emoji: '🩺', gradient: 'linear-gradient(135deg, #11998E, #4776E6 55%, #8E54E9)', farve: '#4776E6', moduler: [diagnoser, angst, psykose] },
  { id: 'filosofi', gruppe: 'menneske', navn: 'Filosofi', emoji: '🏛️', gradient: 'linear-gradient(135deg, #A18CD1, #FF6A88 60%, #FF99AC)', farve: '#A18CD1', moduler: [stoicisme, ragekniv, eksistens] },
  { id: 'ai', gruppe: 'kode', navn: 'AI', emoji: '🤖', gradient: 'linear-gradient(135deg, #11998E, #4776E6 55%, #8E54E9)', farve: '#4776E6', moduler: [ailaering, sprogmodeller, aibrug] },
  { id: 'tek', gruppe: 'kode', navn: 'Teknologi', emoji: '🌐', gradient: 'linear-gradient(135deg, #00C6FF, #0072FF 55%, #8E54E9)', farve: '#0072FF', moduler: [internet, krypto] },
  { id: 'sikkerhed', gruppe: 'kode', navn: 'Cybersikkerhed', emoji: '🔐', gradient: 'linear-gradient(135deg, #FF512F, #DD2476 60%, #8E54E9)', farve: '#DD2476', moduler: [angreb, forsvar] },
  { id: 'business', gruppe: 'penge', navn: 'Business', emoji: '🏗️', gradient: 'linear-gradient(135deg, #F7971E, #FFD200 55%, #F77737)', farve: '#F7971E', moduler: [firma, forretning] },
  { id: 'invest', gruppe: 'penge', navn: 'Investering', emoji: '📈', gradient: 'linear-gradient(135deg, #11998E, #38EF7D 60%, #5EEAD4)', farve: '#11998E', moduler: [invbasis, invdk] },
  { id: 'db', gruppe: 'kode', navn: 'Databaser', emoji: '🗄️', gradient: 'linear-gradient(135deg, #2563EB, #7C3AED 55%, #F472B6)', farve: '#2563EB', moduler: [relation, ydelse] },
  { id: 'vaerktoj', gruppe: 'kode', navn: 'Værktøj', emoji: '🛠️', gradient: 'linear-gradient(135deg, #F05133, #FCAF45 60%, #FFD200)', farve: '#F05133', moduler: [git] },
  { id: 'arkitektur', gruppe: 'kode', navn: 'Arkitektur', emoji: '🧱', gradient: 'linear-gradient(135deg, #4338CA, #A5B4FC 55%, #BEF264)', farve: '#4338CA', moduler: [design, test] },
  { id: 'drift', gruppe: 'kode', navn: 'Drift', emoji: '📶', gradient: 'linear-gradient(135deg, #0EA5E9, #A78BFA 55%, #FB923C)', farve: '#0EA5E9', moduler: [skalering, fejl] },
];

// Grupper samler fagene, så ringene i toppen ikke vokser i det uendelige.
// Et nyt fag uden gruppe havner automatisk i »Andet«.
export const grupper = [
  { id: 'kode', navn: 'Kode', emoji: '💻', gradient: 'linear-gradient(135deg, #5851DB, #405DE6 45%, #00C6FF)', farve: '#405DE6' },
  { id: 'menneske', navn: 'Mennesker', emoji: '🧠', gradient: 'linear-gradient(135deg, #FCAF45, #F77737 45%, #E1306C)', farve: '#F77737' },
  { id: 'penge', navn: 'Penge', emoji: '💰', gradient: 'linear-gradient(135deg, #F7971E, #FFD200 50%, #38EF7D)', farve: '#F7971E' },
  { id: 'andet', navn: 'Andet', emoji: '📦', gradient: 'linear-gradient(135deg, #8E54E9, #4776E6)', farve: '#8E54E9' },
];

// Et spor giver sine kort sit eget id som præfiks, så lokale id'er må gerne gentages.
function samlSpor(pakke, moduler) {
  return {
    spor: moduler.map((m) => ({ ...m.spor, pakke })),
    kort: moduler.flatMap(({ spor, kort }) =>
      kort.map((k) => ({ ...k, id: prefix(spor.id, k.id), om: prefix(spor.id, k.om), efter: prefix(spor.id, k.efter), spor: spor.id, pakke })),
    ),
  };
}

// Et fag, der allerede er samlet (sw3sys), skal kun have pakke-navnet på.
const samlFag = (f) => (f.samlet
  ? { spor: f.samlet.spor.map((x) => ({ ...x, pakke: f.id })), kort: f.samlet.kort.map((k) => ({ ...k, pakke: f.id })) }
  : samlSpor(f.id, f.moduler));

const samlede = FAG.map(samlFag);

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
    id: 'kob-tredemolle-penge', type: 'kobling', kraever: ['eksistens-k5q', 'invbasis-k4q'],
    hook: 'Hedonisk tilpasning forklarer, hvorfor investorer køber dyrest muligt.',
    body: '**Hedonisk tilpasning** (eksistenssporet): glæden ved en gevinst falder hurtigt tilbage mod udgangspunktet. Derfor skal der mere til næste gang for at mærke det samme.\n\n**Adfærdsgabet** (investeringssporet): den gennemsnitlige investor får mindre ud af en fond, end fonden selv giver, fordi han køber efter en optur og sælger efter en nedtur.\n\nDe to ting er den samme motor. En portefølje, der er steget 8 %, føles efter kort tid som det normale. Så kigger man på noget, der er steget 40 %, og flytter derover. Altså køber man det, der er dyrest, og sælger det, der er billigst.\n\nModtrækket er strukturelt, ikke mentalt: fast månedlig opsparing og en plan, du har skrevet ned i forvejen, fjerner beslutningen fra det øjeblik, hvor følelsen er stærkest.\n\nSamme mekanik ligger bag »én gevinst mere« på en spilleautomat. Forskellen er kun, hvor lang tid der går mellem trykkene.',
  },
  {
    id: 'kob-prompt-sql', type: 'kobling', kraever: ['forsvar-k2q', 'sprogmodeller-k4q'],
    hook: 'Prompt injection er SQL injection igen. Samme fejl, ny indpakning.',
    body: '**SQL injection** sker, fordi databasen ikke kan se forskel på din forespørgsel og brugerens tekst, når de er klistret sammen til én streng.\n\n**Prompt injection** sker, fordi sprogmodellen ikke kan se forskel på dine instruktioner og indholdet af den hjemmeside, den fik med i **kontekstvinduet**. Alt er tekst i samme vindue.\n\nGrundfejlen er identisk: **data bliver behandlet som instruktion.**\n\nForskellen er, at SQL har en ren løsning. Parameteriserede forespørgsler holder kode og data i to adskilte kanaler, som ingen tekst kan hoppe imellem.\n\nDen løsning findes ikke for sprogmodeller endnu. Derfor må man i stedet begrænse, hvad modellen **må** gøre: least privilege på dens værktøjer, og et menneske til at godkende det, der ikke kan fortrydes.\n\nDet er den samme konklusion som i forsvarssporet: når du ikke kan stole på input, begrænser du konsekvensen.',
  },
  {
    id: 'kob-phishing-autoritet', type: 'kobling', kraever: ['angreb-k1q', 'social-k3q'],
    hook: 'Phishing er ikke et teknisk angreb. Det er socialpsykologi brugt som våben.',
    body: 'I socialsporet lærte du, hvad der får mennesker til at gøre ting: **autoritet**, **social proof** og lydighed under pres.\n\nEn phishingmail bruger alle tre på fire linjer:\n• Afsenderen er **banken** eller **chefen** (autoritet).\n• »Alle medarbejdere skal bekræfte inden fredag« (social proof).\n• »Kontoen lukkes om 24 timer« (tidspres, der slår eftertanken fra).\n\nDerfor er det ikke de dummeste, der falder i. Det er de travleste. Presset er designet til at ramme det system, der handler hurtigt, før det system, der tænker langsomt, når frem.\n\nOg derfor virker tekniske løsninger kun halvt. Modtrækket må være en **vane**, der ikke kræver, at du gennemskuer beskeden: gå selv ind på siden, hver gang, også når den ser ægte ud.',
  },
  {
    id: 'kob-likviditet-lager', type: 'kobling', kraever: ['firma-k4q', 'invdk-k1q'],
    hook: 'Papirgevinst er ikke penge i kassen. Det gælder både firmaet og depotet.',
    body: 'I firmasporet: du kan have solgt for 500.000 kr og alligevel gå konkurs, fordi kunderne betaler om 90 dage, mens lønnen skal ud på fredag. **Overskud er ikke likviditet.**\n\nI skattesporet: et **lagerbeskattet** produkt udløser skat af årets værdistigning, også selvom du ikke har solgt noget. Gevinsten er på papiret. Regningen er i kroner.\n\nSamme fejl i to forklædninger: man planlægger efter **værdien** og bliver fanget af **tidspunktet for betalingen**.\n\nModtrækket er også det samme begge steder: læg pengene til den kommende regning væk, **før** du disponerer over resten. I firmaet er det moms og skat på en separat konto. I depotet er det kontanter nok til at betale lagerskatten uden at skulle sælge på et dårligt tidspunkt.',
  },
  {
    id: 'kob-validering-2-4-6', type: 'kobling', kraever: ['forretning-k1q', 'biases-b4q'],
    hook: 'Iværksættere validerer, som folk løser 2-4-6-opgaven: de leder efter ja.',
    body: 'I Wasons 2-4-6-opgave testede folk næsten kun tal, der **passede** med deres hypotese. Det er **confirmation bias**.\n\nDen hyppigste dødsårsag for startups er, at ingen havde brug for produktet. Og grunden til, at ingen opdagede det i tide, er nøjagtig den samme fejl:\n\n• Man spørger sine venner, som gerne vil være søde.\n• Man spørger »ville du bruge det her?«, altså et spørgsmål, hvor høflighed giver et ja.\n• Man tæller de begejstrede og glemmer de ligeglade.\n\nDen informative test er den, der kan **vælte** dig, altså 1-2-3-testen for en forretningsidé:\n• Spørg, hvad de gør i dag, ikke hvad de ville gøre i morgen.\n• Bed om en forudbetaling eller en underskrift. Penge lyver sjældent.\n• Spørg de kunder, der sagde nej, hvorfor.\n\nValidering er hypotesetest. Og et ja, der ikke kunne have været et nej, er ingen information.',
  },
  {
    id: 'kob-neuron-perceptron', type: 'kobling', kraever: ['ailaering-k2q', 'hukommelse-k1q'],
    hook: 'En kunstig neuron er opkaldt efter hjernen. Ligheden stopper hurtigt.',
    body: 'Begge steder: mange små enheder, der hver især gør noget banalt, og som tilsammen kan noget svært.\n\nMen forskellene er store.\n\n**Hjernen** sender spidse elektriske pulser i tid, bruger cirka 20 watt, lærer af få eksempler og ændrer selv sine forbindelser.\n\n**Et netværk** sender tal, træner på millioner af eksempler, bruger enorme mængder strøm og har en fast struktur, hvor kun vægtene ændrer sig.\n\nMetaforen »kunstige neuroner« er nyttig som billede og misvisende som forklaring. Når nogen siger, at en model »tænker som en hjerne«, er det billedsprog, ikke biologi.',
  },
  {
    id: 'kob-overfit-udenad', type: 'kobling', kraever: ['ailaering-k4q', 'hukommelse-k2q'],
    hook: 'Overfitting er maskinens udgave af at læse til eksamen ved at lære facit udenad.',
    body: 'I hukommelsessporet: at genlæse føles som læring, men man lærer kun **netop de sider**. Til eksamen skal man bruge noget andet, og så falder det fra hinanden.\n\nI AI: en model, der trænes for længe, rammer perfekt på træningsdata og dumper på nye data.\n\nLøsningen er også den samme:\n• Mennesket skal **testes** på nyt materiale (retrieval practice), ikke genlæse det gamle.\n• Modellen skal **valideres** på data, den ikke har trænet på.\n\nOg begge steder gælder: den, der måler sig selv på det, han allerede har set, måler ingenting.',
  },
  {
    id: 'kob-attention-opmaerksomhed', type: 'kobling', kraever: ['sprogmodeller-k3q', 'biases-b3q'],
    hook: 'Attention og availability er det samme problem: hvad får lov at tælle med?',
    body: 'En sprogmodels **attention** afgør, hvilke dele af teksten der vægter, når næste ord skal vælges.\n\nDin **availability-heuristik** afgør, hvilke eksempler der dukker op, når du skal vurdere noget.\n\nBegge er nødvendige. Ingen af dem kan kigge på alt.\n\nOg begge kan tage fejl på samme måde: det, der fylder mest i konteksten, kommer til at tælle mest, uanset om det er det mest relevante.\n\nDerfor virker de samme modtræk. For modellen: giv den de rigtige stykker med (RAG). For dig: spørg »hvad er det, jeg ikke har set?«',
  },
  {
    id: 'kob-hash-cache', type: 'kobling', kraever: ['krypto-k2q', 'algodat-a2q'],
    hook: 'Samme hashfunktion, to modsatte ønsker.',
    body: 'I en **hashtabel** vil du have en hurtig hashfunktion, der spreder nøglerne jævnt. Kollisioner er en irritation, der koster opslagstid.\n\nI **kodeordshashing** vil du have det stik modsatte: en funktion, der er **langsom** med vilje, og som bruger hukommelse.\n\nHvorfor? Fordi modstanderen er en anden.\n\nI tabellen er modstanderen et uheldigt datasæt. I kodeord er modstanderen en person med et grafikkort, der gætter milliarder af gange i sekundet.\n\nDet er et godt eksempel på, at »hurtigst muligt« ikke altid er målet. Kravet kommer af trusselsmodellen, ikke af algoritmen.',
  },
  {
    id: 'kob-rag-hukommelse', type: 'kobling', kraever: ['aibrug-k2q', 'sprogmodeller-k4q'],
    hook: 'En model uden RAG er en eksamen uden bøger. Med RAG er det en åben bogs eksamen.',
    body: 'Sprogmodellen husker intet mellem samtaler. Alt, den ved om din situation, står i **kontekstvinduet**.\n\n**RAG** er derfor ikke hukommelse. Det er at slå op i bogen og lægge den rigtige side ind i vinduet, hver eneste gang.\n\nDet forklarer også de to typiske fejl:\n• Finder søgningen den forkerte side, svarer modellen sikkert og forkert.\n• Er siden ikke med, findes den ikke. Modellen gætter i stedet.\n\nPointen: kvaliteten af et AI-svar afgøres oftere af **hvad der kom ind i konteksten** end af hvilken model, der svarede.',
  },
  {
    id: 'kob-indeks-hash', type: 'kobling', kraever: ['ydelse-k1q', 'algodat-a2q'],
    hook: 'Et databaseindeks og en hashtabel løser det samme problem med to forskellige træer.',
    body: 'Begge steder er problemet det samme: du må ikke lede alle data igennem for at finde én ting.\n\nEn **hashtabel** regner sig frem til pladsen på ét hug. O(1), men kun til opslag på **præcis** den nøgle, du hashede.\n\nEt **B-træ** er sorteret og bruger O(log n). Langsommere per opslag – men det kan noget, hashen ikke kan:\n• finde alt mellem to værdier (`WHERE pris BETWEEN 100 AND 300`)\n• levere rækkerne i sorteret orden gratis\n• bruges forfra på et sammensat indeks\n\nDerfor er standardindekset i en database et B-træ, ikke en hash, selvom hashen er hurtigere på papiret.\n\nDet er den samme lektie som med quicksort og linked lists: den hurtigste operation i teorien er ikke altid den rigtige datastruktur. Kravene afgør det – her: at man også vil søge i intervaller.',
  },
  {
    id: 'kob-transaktion-race', type: 'kobling', kraever: ['ydelse-k4q', 't04-k1q'],
    hook: '»Tjek om der er plads, og indsæt så« er en race condition – bare med rækker i stedet for variabler.',
    body: 'I synkroniseringssporet: to tråde læser `i`, lægger 1 til og skriver tilbage. Resultatet blev 1 i stedet for 2, fordi der ikke var **gensidig udelukkelse** mellem læsning og skrivning.\n\nI databasesporet: to transaktioner tæller pladserne, ser 9 ud af 10, og indsætter hver sin. Resultatet er 11 pladser brugt.\n\nDet er nøjagtig samme fejl. Der er et hul mellem **tjek** og **handling**, hvor verden kan nå at ændre sig.\n\nOg løsningerne svarer også til hinanden:\n• En **mutex** om tråden ↔ en **lås på rækken** (`SELECT … FOR UPDATE`).\n• En **atomisk operation** ↔ en **constraint i databasen**, som gør reglen umulig at bryde.\n• **Serializable** isolation ↔ at køre det hele i én kritisk sektion.\n\nDen fælles lektie: en regel, der kun findes i din kode mellem to kald, er ikke en regel. Den er et håb om timing.',
  },
  {
    id: 'kob-git-immutable', type: 'kobling', kraever: ['git-k1q', 't10-k3q'],
    hook: 'Gits objekter og en unique_ptr bygger på hver sin halvdel af den samme idé om ejerskab.',
    body: '**Git**: et objekt navngives efter hashen af sit indhold. Ændrer indholdet sig, er det et **andet objekt**. Derfor kan en commit aldrig ændre sig – man kan kun lave en ny.\n\n**unique_ptr**: der findes præcis **én** ejer. Kopiering er slettet, så to kan aldrig tro, de bestemmer over det samme.\n\nBegge dele fjerner en hel klasse af fejl ved at gøre den umulig i stedet for at advare mod den.\n\n• Fordi Git-objekter er uforanderlige, kan to personer arbejde på den samme historie uden at overskrive hinandens fortid. Det værste, der kan ske, er en konflikt, du kan se.\n• Fordi der kun er én ejer, kan der ikke ske double free. Compileren siger fra, før programmet kører.\n\nDet er det samme designgreb, som ligger bag parameteriserede forespørgsler og bag RAII: gør den forkerte tilstand **urepræsentabel**, i stedet for at bede folk om at huske reglen.',
  },
  {
    id: 'kob-flaky-race', type: 'kobling', kraever: ['test-k3q', 't04-k1q'],
    hook: 'En flaky test er ofte ikke en dårlig test. Det er en race condition, der melder sig.',
    body: 'I synkroniseringssporet: en race condition rammer kun ved uheldig timing. Den kan være der i månedsvis, uden at nogen ser den.\n\nI testsporet: en flaky test fejler nogle gange på uændret kode.\n\nSæt de to ved siden af hinanden, og det springer i øjnene: **en fejl, der afhænger af timing, kan kun vise sig som noget, der fejler nogle gange**. Det er præcis den signatur, en race condition har.\n\nDerfor er »kør den igen« den farligste reaktion, der findes. Den er confirmation bias sat i system: du bliver ved, indtil du får det svar, du gerne vil have – og undervejs sletter du den eneste melding, du fik.\n\nDen rigtige rækkefølge:\n• Tag testen i karantæne, så den ikke lærer folk at ignorere rødt.\n• Kig efter delt tilstand, `sleep` i stedet for at vente på en betingelse, og rækkefølgeafhængighed.\n• Kør med ThreadSanitizer, hvis det er tråde.\n\nSpørg til sidst: hvis den her fejler én ud af ti gange i CI, hvor tit sker det så i produktion med tusind brugere?',
  },
  {
    id: 'kob-cascading-deadlock', type: 'kobling', kraever: ['fejl-k1q', 't05-k1q'],
    hook: 'Et deadlock og et cascading failure er den samme situation i to størrelser.',
    body: '**Deadlock** (SW3SYS): to tråde venter på hinanden i en ring, og ingen af dem kan komme videre. Ingen af dem har fejlet – de venter bare for altid.\n\n**Cascading failure** (drift): dine tråde venter alle sammen på en langsom tjeneste, og imens kan din egen tjeneste ikke svare nogen. Heller ikke dem, der slet ikke havde brug for den langsomme.\n\nI begge tilfælde er problemet ikke en fejl, men **ubegrænset venten**.\n\nDerfor ligner modtrækkene hinanden:\n• **Timeout** er `pthread_mutex_timedlock`: giv op i stedet for at vente for evigt.\n• **Circuit breaker** er en variant af »frigiv alt, hvis du ikke kan få resten«: hold op med at prøve, når det åbenlyst ikke går.\n• **Bulkhead** er adskilte ressourcepuljer, ligesom man deler låse op, så to opgaver ikke konkurrerer om det samme.\n\nDen fælles lektie: alt, der venter, skal have en øvre grænse. Et kald uden timeout er en tråd, der kan blive væk for altid.',
  },
  {
    id: 'kob-blameless-hanlon', type: 'kobling', kraever: ['fejl-k4q', 'ragekniv-k2q'],
    hook: 'En blameless postmortem er Hanlons ragekniv gjort til en arbejdsgang.',
    body: '**Hanlons ragekniv**: tilskriv ikke ondskab det, der kan forklares med travlhed eller uvidenhed.\n\n**Blameless postmortem**: led efter, hvad der gjorde fejlen mulig, ikke efter hvem der trykkede.\n\nDet er den samme regel. Forskellen er, at den ene er et personligt tankeværktøj, og den anden er skrevet ind i, hvordan en organisation arbejder.\n\nOg begrundelsen er praktisk, ikke moralsk. Er der en skyldig at finde, bliver forklaringerne forsigtige – og så forsvinder netop de detaljer, der skulle bruges. Den, der trykkede på knappen, er også den eneste, der ved, hvorfor det lige dér så ud som det rigtige at gøre.\n\nLuftfarten er det store eksempel. Havarikommissioner leder ikke efter en pilot at fyre, men efter hvorfor systemet tillod det: to kontakter, der sad for tæt, en advarsel der druknede i støj.\n\nDet er også hele grunden til, at gode handlingspunkter handler om **rækværk** frem for om at være mere omhyggelig næste gang. »Vær mere forsigtig« har aldrig forhindret noget.',
  },
  {
    id: 'kob-abstraktion-chunk', type: 'kobling', kraever: ['design-k2q', 'hukommelse-k4q'],
    hook: 'En god abstraktion er chunking for din arbejdshukommelse.',
    body: '**Arbejdshukommelsen** har plads til omkring fire ting ad gangen. **Chunking** er at pakke flere ting i én: »1-9-8-9« fylder fire pladser, »1989« fylder én.\n\nEn **abstraktion** gør nøjagtig det samme med kode. `gemBruger(bruger)` er én ting at holde i hovedet. De tyve linjer, den dækker over, er tyve.\n\nDet forklarer, hvorfor en **lækkende** abstraktion er så dyr. Skal du forstå både abstraktionen og det, den skjuler, har du ikke pakket fire ting sammen til én – du har fået fem.\n\nOg det forklarer noget andet: hvorfor koden, du selv skrev for et halvt år siden, føles uoverskuelig. Dine chunks er gået i opløsning. En erfaren udvikler er ikke klogere; hun har større chunks for netop det område.\n\nDen praktiske test af en abstraktion er derfor: **kan jeg bruge den uden at have det nedenunder i hovedet samtidig?** Kan du ikke det, er det et lag og ikke en abstraktion.',
  },
  {
    id: 'kob-cap-isolation', type: 'kobling', kraever: ['skalering-k3q', 'ydelse-k4q'],
    hook: 'CAP og isolationsniveauer stiller det samme spørgsmål: hvad vil du give afkald på?',
    body: '**Isolationsniveauer** i en database er en skala. Serializable giver den stærkeste garanti og koster mest. Read committed giver mindre og koster mindre. Man vælger bevidst, hvor meget rigtighed man betaler for.\n\n**CAP** er samme slags valg, bare når netværket er knækket: konsistens eller tilgængelighed.\n\nI begge tilfælde er den store fejl at tro, at man har fået den stærke garanti gratis. »Tjek om der er plads, og indsæt så« er usikkert på standardniveauet, og »læs fra en replika« giver forældede data i et distribueret system. Begge dele ser fuldstændig rigtige ud i koden.\n\nDen fælles lektie: **garantien er ikke en egenskab ved koden, men ved den konfiguration, den kører under.** To systemer med identisk kode kan opføre sig forskelligt, fordi isolationsniveauet eller replikeringsindstillingen er en anden.\n\nOg begge steder gælder det samme praktiske råd: vælg pr. operation. En overførsel skal have den stærke garanti. Et antal likes skal ikke.',
  },
];

export const pakker = FAG.map(({ moduler, samlet, ...p }) => ({ gruppe: 'andet', ...p }));

// En quiz til en video arver videoens spor.
const videoSpor = (id) => videoer.find((v) => v.id === id)?.spor;

const spor = samlede.flatMap((f) => f.spor);
const sporPakke = Object.fromEntries(spor.map((s) => [s.id, s.pakke]));

// Koncepter kan have ekstra forklaring (analogi, tegning, trin) i forklaringer.js.
const alleForklaringer = { ...forklaringer, ...forklaringerMere, ...forklaringerTek, ...forklaringerMenneske };
const medForklaring = (kort) => kort.map((k) => (alleForklaringer[k.id] ? { ...k, ...alleForklaringer[k.id] } : k));

export default {
  pakker,
  grupper,
  temaer,
  spor,
  kort: medForklaring([
    ...samlede.flatMap((f) => f.kort),
    ...sammenlign.map((k) => ({ ...k, type: 'sammenlign', pakke: sporPakke[k.spor] })),
    ...videoer.map((k) => ({ ...k, spor: k.spor ?? videoSpor(k.om), pakke: sporPakke[k.spor ?? videoSpor(k.om)] })),
    ...tvaerfaglige.map((k) => ({ ...k, spor: 'kobling', pakke: 'tvaerfag' })),
  ]),
};
