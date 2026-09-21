// AI: hvad der faktisk sker inde i en sprogmodel.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'sprogmodeller', nr: 0, titel: 'Sprogmodeller indefra', kort: 'LLM', emoji: '💬',
    farve: '#11998E', gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'En sprogmodel gør kun én ting: gætter det næste stykke tekst. Igen og igen.',
      body: 'En stor sprogmodel (LLM) har ét job: givet teksten indtil nu, hvad er det mest sandsynlige **næste token**?\n\nEt **token** er ikke et ord. Det er et stykke tekst, typisk 3-4 bogstaver på dansk. »København« kan blive til »Køben« + »havn«. Derfor er modeller dårlige til at tælle bogstaver: de ser slet ikke bogstaverne.\n\nNår du får et svar, er det ikke skrevet på forhånd. Modellen vælger ét token, sætter det ind i teksten, og spørger sig selv igen. Sådan, hele vejen.\n\nDet forklarer flere mærkelige ting:\n• Den kan begynde en sætning, den ikke kan afslutte godt.\n• Den bliver bedre, hvis den får lov at »tænke højt« først, fordi mellemregningerne bliver en del af den tekst, den kigger på.\n• Den har ingen plan for hele svaret på forhånd.\n\nAt det kan blive til noget, der ligner forståelse, er netop det overraskende resultat.',
      analogi: 'Som en, der skriver en sms med autofuldførelse og altid trykker på det ord, telefonen foreslår. Bare med en autofuldførelse, der har læst det meste af internettet.',
      figur: {
        titel: 'Ét token ad gangen',
        svg: svg(190, `
          ${box(14, 20, 292, 28, 'Katten sad på', { ...HVID, size: 12 })}
          ${pil(160, 52, 160, 68)}
          ${box(40, 72, 240, 22, 'måtten      62 %', { ...GROEN, size: 10 })}
          ${box(40, 98, 240, 22, 'bordet      21 %', { ...BLAA, size: 10 })}
          ${box(40, 124, 240, 22, 'taget        9 %', { ...BLAA, size: 10 })}
          ${box(40, 150, 240, 22, 'trampolinen  0,1 %', { ...ROSA, size: 10 })}
          ${txt(160, 184, 'Vælg ét, sæt det ind, spørg igen', { size: 11, farve: INK })}`),
        tekst: 'Modellen laver en sandsynlighed for hvert muligt token. Temperatur bestemmer, hvor tit den vælger noget andet end det mest sandsynlige.',
      },
      hvorfor: 'Det er hele grunden til, at »skriv dine mellemregninger« gør svar på matematik markant bedre.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvorfor har sprogmodeller svært ved at tælle bogstaver i et ord?',
      svar: [
        'De ser tokens, ikke enkelte bogstaver',
        'Fordi de er trænet på engelsk',
        'De har for lidt hukommelse',
        'De kan ikke tælle overhovedet'
      ],
      rigtigt: 0,
      forklaring: 'Teksten deles i tokens på flere bogstaver. Bogstaverne er ikke en enhed, modellen ser direkte.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Ord bliver til koordinater. Og så kan man regne med betydning.',
      body: 'Modellen kan ikke regne på bogstaver, så hvert token laves om til et **embedding**: en lang liste af tal, altså et punkt i et rum med mange hundrede dimensioner.\n\nDet smarte er, at **afstand bliver til betydning**. Ord, der bruges i samme sammenhænge, ender tæt på hinanden. »Hund« ligger tæt på »kat« og langt fra »skattefradrag«.\n\nEndnu mærkeligere: **retninger** får betydning. Det klassiske eksempel fra word2vec er, at hvis man tager vektoren for »konge«, trækker »mand« fra og lægger »kvinde« til, lander man tæt på »dronning«.\n\nDet er også det, der driver moderne søgning. I stedet for at lede efter de samme bogstaver, leder man efter det nærmeste punkt. Derfor kan en søgning på »hvordan får jeg min computer til at køre hurtigere« finde en tekst om RAM og baggrundsprocesser, selvom ingen af ordene er ens.',
      analogi: 'Et landkort. Aalborg og Aarhus ligger tæt, ikke fordi navnene ligner hinanden, men fordi de hører til samme egn. Embeddings er et landkort over betydninger.',
      figur: {
        titel: 'Ord som punkter i et rum',
        svg: svg(180, `
          <line x1="30" y1="150" x2="300" y2="150" stroke="${LINE}" stroke-width="1.5"/>
          <line x1="30" y1="150" x2="30" y2="20" stroke="${LINE}" stroke-width="1.5"/>
          <circle cx="90" cy="60" r="7" fill="#E1306C"/>${txt(112, 56, 'hund', { farve: INK, size: 11, anchor: 'start' })}
          <circle cx="112" cy="84" r="7" fill="#E1306C"/>${txt(134, 84, 'kat', { farve: INK, size: 11, anchor: 'start' })}
          <circle cx="78" cy="96" r="7" fill="#E1306C"/>${txt(46, 112, 'hvalp', { farve: INK, size: 11, anchor: 'start' })}
          <circle cx="252" cy="42" r="7" fill="#5851DB"/>${txt(246, 62, 'skat', { farve: INK, size: 11, anchor: 'end' })}
          <circle cx="268" cy="70" r="7" fill="#5851DB"/>${txt(262, 90, 'moms', { farve: INK, size: 11, anchor: 'end' })}
          ${txt(160, 170, 'Tæt sammen = bruges i samme sammenhænge', { size: 10 })}`),
        tekst: 'I virkeligheden er der flere hundrede dimensioner. Her er de presset ned til to.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad betyder det, at to embeddings ligger tæt på hinanden?',
      svar: [
        'At ordene har præcis samme antal bogstaver',
        'At ordene bruges i lignende sammenhænge',
        'At ordene stammer fra det samme sprog',
        'At ordene staves næsten ens bogstav for bogstav'
      ],
      rigtigt: 1,
      forklaring: 'Afstand i embedding-rummet afspejler brug og betydning, ikke stavemåde. Det er grundlaget for moderne semantisk søgning.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Attention er modellens evne til at bestemme, hvilke ord der skal kigge på hinanden.',
      body: 'Sætningen »Bilen kunne ikke komme over broen, fordi **den** var for høj« kræver, at man ved, hvad »den« henviser til. For et menneske er det nemt. For en computer er det svært.\n\n**Attention** løser det. For hvert token regner modellen ud, hvor meget hvert andet token i teksten skal tælle med, når netop dette token skal forstås. »Den« får høj attention på »bilen« eller »broen« afhængigt af resten af sætningen.\n\nDet er kernen i en **transformer**, arkitekturen fra artiklen »Attention Is All You Need« (2017), som stort set alle moderne sprogmodeller bygger på.\n\nTo vigtige konsekvenser:\n• Alle tokens kan behandles **samtidig** i stedet for ét ad gangen. Det er derfor, træning kan skaleres til enorme mængder tekst på GPU\'er.\n• Arbejdet vokser med **kvadratet** på tekstlængden. Dobbelt så lang tekst giver fire gange så meget arbejde. Derfor er lange kontekstvinduer dyre.',
      analogi: 'Som når du læser en lang aftale og hele tiden bladrer tilbage til definitionerne. Attention er en model, der bladrer tilbage til præcis de steder, der betyder noget for det ord, den er i gang med.',
      figur: {
        titel: 'Hvad kigger »den« på?',
        svg: svg(170, `
          ${box(14, 30, 62, 26, 'Bilen', { ...GROEN, size: 11 })}
          ${box(84, 30, 76, 26, 'over broen', { ...BLAA, size: 11 })}
          ${box(168, 30, 62, 26, 'fordi', { ...HVID, size: 11 })}
          ${box(238, 30, 62, 26, 'den', { ...ROSA, size: 11 })}
          <path d="M262,60 C240,100 120,100 50,60" fill="none" stroke="#11998E" stroke-width="3" opacity=".8"/>
          <path d="M266,60 C250,92 180,92 130,60" fill="none" stroke="#5851DB" stroke-width="1.6" stroke-dasharray="4 4"/>
          ${txt(70, 112, 'stærk attention', { size: 10, farve: '#11998E' })}
          ${txt(200, 112, 'svagere', { size: 10, farve: '#3b3f9e' })}
          ${txt(160, 146, 'Modellen lærer selv, hvem der skal kigge på hvem', { size: 10, farve: INK })}`),
        tekst: 'Hvert token får en vægt for hvert andet token. Det er derfor arbejdet vokser med kvadratet på længden.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvordan vokser arbejdet i attention, når teksten bliver dobbelt så lang?',
      svar: [
        'Det halveres',
        'Det firedobles',
        'Det fordobles',
        'Det er det samme'
      ],
      rigtigt: 1,
      forklaring: 'Hvert token kigger på alle andre tokens, så arbejdet er O(n²). Derfor er meget lange kontekstvinduer dyre.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Modellen husker ingenting. Den får hele samtalen med hver eneste gang.',
      body: 'Det føles som en samtale, men modellen har ingen hukommelse mellem svar. Hver gang du sender en besked, sendes **hele samtalen** afsted igen som ren tekst. Modellen læser det hele og gætter næste token.\n\nDet, der kan være med, hedder **kontekstvinduet** og måles i tokens. Bliver samtalen længere end vinduet, må noget skæres væk, typisk det ældste.\n\nDerfor sker det her:\n• Den »glemmer«, hvad du sagde for længe siden i en lang samtale.\n• Den kender ikke noget til din forrige samtale i et nyt vindue.\n• Den ved ikke, hvad der er sket efter dens **træningsdata** stopper, medmindre nogen giver den det i teksten.\n\nDet er også derfor, gode svar starter med god kontekst: alt det, der ikke står i vinduet, findes ikke for modellen.',
      analogi: 'Som en vikar, der får hele sagsmappen udleveret hver morgen og afleverer den igen om aftenen. Utrolig dygtig, men husker intet fra i går.',
      hvorfor: 'Det afgør, hvordan du skal skrive til den: giv konteksten hver gang, i stedet for at regne med at den kan huske.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad sker der, når en samtale bliver længere end kontekstvinduet?',
      svar: [
        'Den ældste tekst falder ud og findes ikke længere',
        'Samtalen stopper, og man må starte en ny',
        'Modellen komprimerer det hele automatisk uden tab',
        'Modellen gemmer resten i en database til senere'
      ],
      rigtigt: 0,
      forklaring: 'Det, der ikke er i vinduet, eksisterer ikke for modellen. Derfor skal vigtig kontekst gentages eller opsummeres.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'Den lyver ikke. Den gætter – og gætter lige så flydende, når den ikke ved noget.',
      body: 'En **hallucination** er, når modellen skriver noget forkert med samme sikre tonefald som alt andet: en kilde, der ikke findes, et citat, der aldrig er sagt, en funktion, der ikke er i biblioteket.\n\nGrunden ligger i opgaven. Modellen vælger sandsynlige tokens. »Jeg ved det ikke« er sjældent det mest sandsynlige svar i træningsdata, når spørgsmålet ligner noget, der plejer at have et svar.\n\nDer er ingen indbygget forskel mellem »det her ved jeg« og »det her lyder rigtigt«.\n\nDet, der faktisk hjælper:\n• Giv kilderne med i teksten (se RAG i næste spor).\n• Bed om usikkerhed: »skriv, hvis du ikke er sikker«.\n• Bed om mellemregninger, så fejlen bliver synlig undervejs.\n• Tjek alt, der kan tjekkes: tal, navne, referencer, kode der kan køres.\n\nEn god tommelfingerregel: brug den til det, du selv kan kontrollere.',
      analogi: 'En meget veltalende eksamensbesvarelse fra en, der ikke har læst kapitlet. Den lyder præcis lige så sikker som den, der har.',
      hvorfor: 'Det er den vigtigste vane at have med AI: sikkerhed i tonen er ikke et mål for, om det passer.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvad er hovedgrunden til, at modeller hallucinerer?',
      svar: [
        'De er indstillet med alt for lav temperatur',
        'De prøver bevidst at narre den, der spørger',
        'De vælger sandsynlig tekst, ikke kendt sandhed',
        'Der er programmeringsfejl i selve modellen'
      ],
      rigtigt: 2,
      forklaring: 'Modellen optimerer for sandsynlig tekst, ikke for sandhed. Derfor lyder et gæt lige så sikkert som en viden.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'En sprogmodel slår svarene op på nettet, mens den svarer.',
      rigtigt: 0,
      forklaring: 'Myte. En ren sprogmodel har kun sin træning og det, der står i kontekstvinduet. Den kan kun søge, hvis den har fået et værktøj til det og bruger det.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k1',
      pastand: 'Modellen planlægger hele svaret, før den begynder at skrive.',
      rigtigt: 0,
      forklaring: 'Myte. Den vælger ét token ad gangen ud fra teksten indtil nu. Derfor hjælper det at bede den tænke højt: mellemregningerne bliver en del af det, den kigger på.',
    },
    {
      id: 'case1', type: 'case', efter: 'k5',
      scenarie: 'Du beder en model om kilder til din opgave. Den svarer med fem referencer i perfekt APA-format, med årstal, tidsskrift og sidetal.',
      sporgsmal: 'Hvad er det klogeste næste skridt?',
      svar: [
        'Bruge dem, hvis mindst tre af dem lyder bekendt',
        'Bede modellen bekræfte, at de er ægte',
        'Slå hver eneste reference op og tjekke, at den findes',
        'Indsætte dem direkte, formatet er jo korrekt'
      ],
      rigtigt: 2,
      forklaring: 'Korrekt format er præcis det, en sprogmodel er god til at efterligne. At bede den bekræfte hjælper ikke: den har ingen måde at vide det på. Kun et opslag i virkeligheden tæller.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan en sprogmodel producerer et svar.',
      punkter: [
        { tekst: 'Teksten deles i tokens', ord: ['token', 'stykke'] },
        { tekst: 'Tokens bliver til embeddings (punkter i et rum)', ord: ['embedding', 'vektor', 'punkt'] },
        { tekst: 'Attention vægter, hvilke tokens der betyder noget for hinanden', ord: ['attention', 'vægt', 'kigger'] },
        { tekst: 'Modellen giver sandsynligheder for næste token', ord: ['sandsynlig', 'næste token'] },
        { tekst: 'Ét token vælges, og det hele gentages', ord: ['gentag', 'ét ad gangen', 'løkke'] },
        { tekst: 'Alt, den kender til samtalen, står i kontekstvinduet', ord: ['kontekst', 'vindue', 'hukommelse'] },
      ],
    },
  ],
};
