// AI: sådan bruger man den uden at blive snydt.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'aibrug', nr: 0, titel: 'Brug AI uden at blive snydt', kort: 'AI i praksis', emoji: '🛠️',
    farve: '#F77737', gradient: 'linear-gradient(135deg, #FCAF45 0%, #F77737 50%, #E1306C 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Den største forskel på et dårligt og et godt AI-svar er ikke modellen. Det er det, du sendte ind.',
      body: 'En prompt, der virker, har som regel fire dele:\n\n**Rolle og kontekst**: hvem skriver til hvem, og hvad er situationen. »Jeg er på 3. semester og skal til mundtlig eksamen i operativsystemer.«\n\n**Opgaven**: hvad der skal ske, i bydeform. »Forklar forskellen på proces og tråd.«\n\n**Formatet**: hvordan svaret skal se ud. »Maks 150 ord, og slut med et modspørgsmål til mig.«\n\n**Eksempler**: en eller to, hvis du har en bestemt stil i hovedet. Det kaldes few-shot, og det virker ofte bedre end lange forklaringer af stilen.\n\nTo ting mere, der flytter meget:\n• **Bed om mellemregninger** ved noget, der skal tænkes igennem. Modellen bliver bedre, når den får lov at skrive tankerne, fordi de bliver en del af teksten, den kigger på.\n• **Giv materialet med**. Skal den rette din tekst, så indsæt din tekst. Gæt er værre end kilder.',
      analogi: 'Det er som at bede en dygtig vikar om hjælp. »Lav noget med matematik« giver noget tilfældigt. »Her er kapitlet, klassen er 8. klasse, lav fem opgaver med facit« giver noget, du kan bruge.',
      hvorfor: 'Det er den billigste forbedring, der findes: samme model, bedre svar, ingen ekstra omkostning.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad hjælper typisk mest, når en opgave kræver flere tankeskridt?',
      svar: [
        'At skrive »vær sikker« i prompten',
        'At bede modellen skrive mellemregningerne, før den svarer',
        'At bruge store bogstaver',
        'At stille spørgsmålet flere gange',
      ],
      rigtigt: 1,
      forklaring: 'Mellemregningerne bliver en del af teksten, modellen kigger på, når den vælger næste token. Det giver målbart bedre svar på ræsonnement.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Vil du have svar om DIN tekst, så giv den teksten. Det er hele idéen i RAG.',
      body: '**RAG** står for Retrieval-Augmented Generation: hent først, generér bagefter.\n\nI stedet for at håbe på, at modellen har læst dit pensum, gør man sådan:\n\n1. Del dine dokumenter i små stykker.\n2. Lav et **embedding** for hvert stykke og gem dem i en vektordatabase.\n3. Når brugeren spørger, laves spørgsmålet også om til et embedding.\n4. Find de stykker, der ligger **tættest** på spørgsmålet.\n5. Sæt dem ind i prompten sammen med spørgsmålet: »Svar kun ud fra dette materiale.«\n\nGevinsten er stor: svarene kan pege på kilder, de kan bygge på materiale, modellen aldrig er trænet på, og man kan opdatere viden ved at skifte dokumenter i stedet for at træne en model.\n\nFælderne er også værd at kende: hvis søgningen finder de forkerte stykker, svarer modellen forkert med fuld overbevisning. Og hvis stykkerne er klippet midt i en sætning, bliver alting dårligere.',
      analogi: 'Forskellen på en åben og en lukket bogs eksamen. RAG er den åbne: du behøver ikke huske alt, men du skal kunne slå det rigtige op.',
      figur: {
        titel: 'RAG: find først, svar bagefter',
        svg: svg(200, `
          ${box(14, 16, 110, 26, 'Spørgsmål', { ...HVID, size: 11 })}
          ${pil(70, 46, 70, 62)}
          ${box(14, 64, 110, 30, 'embedding', { ...BLAA, size: 10 })}
          ${pil(128, 79, 152, 79)}
          ${box(156, 50, 150, 58, '', { fill: BG })}
          ${txt(231, 66, 'Vektordatabase', { size: 10 })}
          ${txt(231, 88, 'find de nærmeste stykker', { size: 9 })}
          ${pil(231, 112, 231, 128)}
          ${box(60, 130, 246, 30, 'Prompt: spørgsmål + de fundne stykker', { ...GROEN, size: 10 })}
          ${pil(183, 164, 183, 178)}
          ${box(60, 176, 246, 24, 'Svar med kilder', { ...ROSA, size: 11 })}`),
        tekst: 'Modellen får materialet med ind i konteksten. Den gætter ikke, den læser.',
      },
      hvordan: [
        'Del dokumenterne i stykker, gerne med overlap.',
        'Lav embeddings og gem dem.',
        'Lav embedding af spørgsmålet.',
        'Find de nærmeste stykker.',
        'Send stykkerne med i prompten og bed om svar kun ud fra dem.',
      ],
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er den typiske grund til, at et RAG-system svarer forkert?',
      svar: [
        'Modellen er for lille',
        'Søgningen fandt de forkerte stykker tekst',
        'Prompten var for kort',
        'Vektordatabasen er for hurtig',
      ],
      rigtigt: 1,
      forklaring: 'Kvaliteten af svaret kan aldrig blive bedre end kvaliteten af det, der blev fundet. Derfor bruges der meget arbejde på at dele tekst og søge godt.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Prompt, RAG eller fine-tuning? Vælg i den rækkefølge – og stop, når det virker.',
      body: 'De tre måder at gøre en model bedre til din opgave løser forskellige problemer:\n\n**Prompting** ændrer, hvordan du spørger. Gratis, øjeblikkeligt, og løser overraskende meget. Start altid her.\n\n**RAG** giver modellen **viden**, den ikke har: dine noter, din virksomheds dokumenter, nyheder fra i går. Løser »den kender ikke mit stof«.\n\n**Fine-tuning** træner videre på en eksisterende model med dine egne eksempler. Det ændrer **stil og form**, ikke viden. Løser »den skriver ikke som os« eller »den skal altid svare i dette format«. Det koster data, tid og penge, og skal laves om, når modellen opdateres.\n\nDen klassiske fejl er at fine-tune for at lære modellen fakta. Det er dyrt, upræcist og svært at opdatere. Fakta hører til i konteksten.\n\nTommelfingerregel: **prompt først, RAG når den mangler viden, fine-tuning når den mangler form.**',
      analogi: 'Prompting er at stille spørgsmålet ordentligt. RAG er at give personen bogen. Fine-tuning er at sende personen på kursus i at skrive i jeres stil.',
      figur: {
        titel: 'Hvad løser hvad?',
        svg: svg(190, `
          ${box(14, 20, 292, 44, '', GROEN)}
          ${txt(70, 34, 'PROMPTING', { farve: '#11998E', size: 11 })}
          ${txt(70, 52, 'Gratis · med det samme', { size: 10 })}
          ${txt(230, 42, 'Bedre spørgsmål = bedre svar', { size: 10, farve: INK })}
          ${box(14, 72, 292, 44, '', BLAA)}
          ${txt(70, 86, 'RAG', { farve: '#3b3f9e', size: 11 })}
          ${txt(70, 104, 'Middel indsats', { size: 10 })}
          ${txt(230, 94, 'Giver den viden, den mangler', { size: 10, farve: INK })}
          ${box(14, 124, 292, 44, '', ROSA)}
          ${txt(70, 138, 'FINE-TUNING', { farve: '#a3123f', size: 11 })}
          ${txt(70, 156, 'Dyrt · tager tid', { size: 10 })}
          ${txt(230, 146, 'Giver den en bestemt form og stil', { size: 10, farve: INK })}`),
        tekst: 'Gå oppefra og ned, og stop så snart resultatet er godt nok.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Du vil have en model til at kende din virksomheds nyeste produktkatalog. Hvad vælger du?',
      svar: ['Fine-tuning', 'RAG', 'Højere temperatur', 'Et større kontekstvindue alene'],
      rigtigt: 1,
      forklaring: 'Fakta, der ændrer sig, hører til i konteksten. RAG henter det nyeste katalog. Fine-tuning ville skulle laves om ved hver ændring.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'En agent er en sprogmodel, der har fået lov at trykke på knapper – i en løkke.',
      body: 'En model alene kan kun skrive tekst. En **agent** er en model, der har fået **værktøjer**: søg på nettet, læs en fil, kør noget kode, send en besked.\n\nLøkken er enkel:\n1. Modellen får opgaven og listen over værktøjer.\n2. Den skriver, hvilket værktøj den vil bruge og med hvilke argumenter.\n3. Programmet kører værktøjet og sender **resultatet** tilbage som tekst.\n4. Modellen læser resultatet og vælger næste skridt. Sådan, indtil den er færdig.\n\nDet er derfor en agent kan noget, en ren model ikke kan: den kan tjekke sit eget arbejde mod virkeligheden. Kører testen? Fandtes filen? Hvad sagde serveren?\n\nMen det gør også fejlene dyrere. En model, der skriver noget forkert, er irriterende. En agent, der sletter den forkerte mappe, er et problem. Derfor skal handlinger, der ikke kan fortrydes, altid bekræftes af et menneske.',
      analogi: 'Forskellen på en rådgiver, der skriver et råd på et stykke papir, og en assistent med nøgler til kontoret. Den ene kan tage fejl. Den anden kan tage fejl og nå at gøre noget ved det.',
      figur: {
        titel: 'Agent-løkken',
        svg: svg(180, `
          ${box(96, 16, 128, 30, 'Model tænker', { ...BLAA, size: 11 })}
          ${pil(224, 31, 268, 60)}
          ${box(212, 62, 96, 30, 'Vælger værktøj', { ...ROSA, size: 10 })}
          ${pil(260, 94, 220, 122)}
          ${box(92, 122, 136, 30, 'Værktøj kører', { ...GROEN, size: 10 })}
          ${pil(92, 122, 52, 94)}
          ${box(12, 62, 96, 30, 'Resultat ind', { ...HVID, size: 10 })}
          ${pil(52, 60, 96, 33)}
          ${txt(160, 170, 'Løkken kører, indtil opgaven er løst', { size: 10, farve: INK })}`),
        tekst: 'Resultatet fra værktøjet bliver til ny tekst i konteksten. Derfor kan agenten reagere på virkeligheden.',
      },
      hvorfor: 'Det er forskellen mellem »AI der skriver om kode« og »AI der kan køre testen og se, at den fejler«.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad gør en agent i stand til at rette sine egne fejl?',
      svar: [
        'Den har en større model',
        'Den får resultatet af sine handlinger tilbage og kan reagere på det',
        'Den har højere temperatur',
        'Den gemmer alt i en database',
      ],
      rigtigt: 1,
      forklaring: 'Feedback fra værktøjerne kommer ind i konteksten. Uden den feedback ville agenten bare gætte videre.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: '»Det lød rigtigt« er ikke en måling. Evals er.',
      body: 'Når man bygger noget med AI, er den farligste fase, hvor det virker på de fem eksempler, man selv prøvede.\n\nEn **eval** er et fast sæt opgaver med facit, man kører hver gang, man ændrer noget: ny model, ny prompt, ny måde at dele dokumenter. Så kan man se, om ændringen gjorde det bedre eller værre, i stedet for at synes det.\n\nEn brugbar eval har:\n• **Rigtige eksempler** fra virkeligheden, inklusive de svære og de sjældne.\n• Et **facit** eller i det mindste en klar regel for, hvad der er godt nok.\n• Nok eksempler til, at tilfældigheder ikke afgør resultatet.\n\nEn model kan også bruges som dommer over en anden models svar, men så skal dommeren selv testes: er den enig med mennesker?\n\nDet vigtigste er det, der gælder al måling: hold testsættet **adskilt** fra det, du bruger til at justere med. Ellers er du tilbage ved overfitting, bare med prompts i stedet for vægte.',
      analogi: 'At rette sin egen stil og give sig selv 12. Evals er at have en fast rettevejledning og en bunke besvarelser, man ikke selv har skrevet.',
      hvorfor: 'Det er den eneste måde at vide, om AI-delen af et projekt faktisk blev bedre, eller om du bare blev bedre til at kigge på de eksempler, du huskede.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvorfor skal eval-sættet holdes adskilt fra de eksempler, man justerer prompten efter?',
      svar: [
        'For at spare tokens',
        'Ellers ender man med at optimere til netop de eksempler – overfitting med prompts',
        'Fordi modellen husker eksemplerne',
        'Det behøver man ikke',
      ],
      rigtigt: 1,
      forklaring: 'Præcis samme fælde som i maskinlæring: justerer man efter testen, måler testen ikke længere noget ærligt.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Skriver man »vær helt sikker og lyv ikke« i prompten, bliver svarene pålidelige.',
      rigtigt: 0,
      forklaring: 'Myte. Modellen har ingen indbygget måde at kende forskel på viden og gæt. Det, der hjælper, er kilder i konteksten, mellemregninger og kontrol bagefter.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'Fine-tuning er den bedste måde at give en model ny viden om fakta.',
      rigtigt: 0,
      forklaring: 'Myte. Fine-tuning former stil og format. Fakta, der kan ændre sig, hører hjemme i konteksten, typisk gennem RAG.',
    },
    {
      id: 'case1', type: 'case', efter: 'k4',
      scenarie: 'Du bygger en studieassistent, der kan læse dine noter og svare. Den svarer flot, men finder af og til på ting, der ikke står i noterne.',
      sporgsmal: 'Hvad er det mest effektive første skridt?',
      svar: [
        'Fine-tune modellen på dine noter',
        'Tjek, om søgningen faktisk finder de rigtige stykker, og bed om svar kun ud fra dem med kildehenvisning',
        'Skru temperaturen helt ned til 0',
        'Skift til en større model',
      ],
      rigtigt: 1,
      forklaring: 'Når RAG opfinder ting, er årsagen næsten altid, at de rigtige stykker ikke blev fundet. Kildehenvisning gør det desuden synligt, når svaret ikke står i materialet.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k5',
      sporgsmal: 'Forklar, hvordan du ville bygge en pålidelig AI-hjælper til dit eget pensum.',
      punkter: [
        { tekst: 'Start med prompting: rolle, opgave, format', ord: ['prompt', 'rolle', 'format'] },
        { tekst: 'RAG: del noter i stykker, lav embeddings, find de nærmeste', ord: ['rag', 'embedding', 'stykker', 'vektor'] },
        { tekst: 'Bed om svar kun ud fra materialet, med kilder', ord: ['kilde', 'kun ud fra', 'materiale'] },
        { tekst: 'Fine-tuning kun til form og stil, ikke til fakta', ord: ['fine-tun', 'stil', 'form'] },
        { tekst: 'Evals: fast testsæt med facit, holdt adskilt', ord: ['eval', 'test', 'facit', 'måle'] },
        { tekst: 'Menneske godkender handlinger, der ikke kan fortrydes', ord: ['godkend', 'bekræft', 'menneske'] },
      ],
    },
  ],
};
