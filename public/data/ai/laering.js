// AI: hvordan en model overhovedet lærer noget.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'ailaering', nr: 0, titel: 'Sådan lærer en model', kort: 'ML-basis', emoji: '🧩',
    farve: '#4776E6', gradient: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Almindelig kode er regler, du skriver. Maskinlæring er regler, computeren finder selv.',
      body: 'Skal du kende en kat fra en hund, kan du prøve at skrive reglerne: spidse ører, knurhår, snudeform. Det bliver hurtigt håbløst.\n\n**Maskinlæring** vender det om. Du giver programmet **eksempler** med facit: tusindvis af billeder, der er mærket »kat« eller »hund«. Programmet justerer sig selv, indtil det rammer rigtigt på eksemplerne.\n\nResultatet kaldes en **model**. Den indeholder ikke dine regler. Den indeholder en masse tal, der tilsammen opfører sig som en regel.\n\nDer er tre hovedtyper:\n• **Supervised**: eksempler med facit (kat/hund, pris på hus).\n• **Unsupervised**: ingen facit, find selv grupper i data.\n• **Reinforcement**: prøv dig frem, få point for godt og skidt.\n\nDen vigtigste forskel fra almindelig kode: du kan ikke læse en model og se, hvorfor den gør, som den gør.',
      analogi: 'Du lærte ikke at cykle af en manual. Du prøvede, væltede, justerede lidt og prøvede igen. En model lærer på præcis samme måde: gæt, fejl, juster.',
      hvorfor: 'Derfor bruges AI til det, der er let at genkende, men svært at beskrive: ansigter, tale, tekst og billeder.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er den største forskel på maskinlæring og almindelig programmering?',
      svar: [
        'At maskinlæring ikke kræver en computer',
        'Der er ingen forskel, det er bare et nyere ord',
        'At reglerne findes ud fra eksempler i stedet for kode',
        'At maskinlæring altid er hurtigere end kode'
      ],
      rigtigt: 2,
      forklaring: 'Du giver data med facit, og modellen justerer sig selv, til den rammer. Reglerne ender som tal, ikke som kode, du kan læse.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'En kunstig neuron er ikke en hjerne. Det er en vægtet sum og et knæk.',
      body: 'En **neuron** gør tre ting:\n1. Gange hvert input med en **vægt**.\n2. Lægge det hele sammen (plus et **bias**-tal).\n3. Sende resultatet gennem en **aktiveringsfunktion**, typisk ReLU: »negativt bliver til nul, resten går uændret igennem«.\n\nDet er alt. Én neuron kan næsten ingenting.\n\nStyrken kommer af **lag**: hundredvis af neuroner ved siden af hinanden, og lag efter lag. Første lag opdager kanter i et billede. Næste lag sætter kanter sammen til former. Næste igen til øjne og snuder.\n\nKnækket i aktiveringsfunktionen er afgørende. Uden det ville alle lagene tilsammen bare være én stor gangestykke, og netværket kunne kun lære lige linjer.\n\nDe tal, modellen lærer, er vægtene. En stor sprogmodel har hundredvis af milliarder af dem.',
      analogi: 'Tænk på et bedømmelsespanel. Hver dommer vægter noget forskelligt: smag tæller 3, udseende tæller 1. Til sidst lægges pointene sammen. Træning er at finde ud af, hvor meget hver dommer skal tælle.',
      figur: {
        titel: 'Én neuron',
        svg: svg(180, `
          ${box(10, 20, 74, 24, 'x₁ = 0,5', { ...HVID, size: 10 })}
          ${box(10, 54, 74, 24, 'x₂ = 2,0', { ...HVID, size: 10 })}
          ${box(10, 88, 74, 24, 'x₃ = 1,0', { ...HVID, size: 10 })}
          ${pil(88, 32, 128, 60)}
          ${pil(88, 66, 128, 66)}
          ${pil(88, 100, 128, 72)}
          ${txt(108, 24, '×w₁', { size: 9 })}
          ${txt(108, 56, '×w₂', { size: 9 })}
          ${txt(108, 108, '×w₃', { size: 9 })}
          ${box(132, 44, 76, 44, 'Σ + bias', { ...BLAA, size: 11 })}
          ${pil(212, 66, 236, 66)}
          ${box(240, 44, 70, 44, 'ReLU', { ...GROEN, size: 11 })}
          ${txt(160, 140, 'Vægtene er det, modellen lærer', { size: 11, farve: INK })}
          ${txt(160, 160, 'ReLU: alt under nul bliver til nul', { size: 10 })}`),
        tekst: 'Input gange vægt, lagt sammen, gennem et knæk. Et helt netværk er millioner af de her ved siden af hinanden.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor skal der være en aktiveringsfunktion som ReLU mellem lagene?',
      svar: [
        'For at spare hukommelse under træningen',
        'Uden den svarer mange lag til ét enkelt lag',
        'For at gøre selve træningen hurtigere',
        'Den er der kun af historiske grunde'
      ],
      rigtigt: 1,
      forklaring: 'Uden et knæk er flere lag matematisk det samme som ét lag. Ikke-lineariteten er det, der gør dybe netværk stærke.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Træning er at gætte, måle hvor galt det gik, og skubbe alle knapper en lille smule.',
      body: 'Træningsløkken er den samme, uanset om modellen genkender katte eller skriver tekst:\n\n1. Modellen **gætter** på et eksempel.\n2. En **tabsfunktion** (loss) måler, hvor forkert gættet var. Ét tal.\n3. **Backpropagation** regner ud, hvilken vej hver vægt skal skubbes for at gøre tabet mindre.\n4. Vægtene justeres en lille smule. Hvor lille, bestemmer **learning rate**.\n5. Forfra med næste bunke data.\n\nDet kaldes **gradient descent**: du står i tåge på en bakke og vil ned. Du kan ikke se dalen, men du kan mærke, hvilken vej der går nedad, og tage et skridt.\n\nFor stort et skridt, og du hopper over dalen og frem og tilbage. For lille, og du er der aldrig.\n\nEn **epoke** er én tur gennem hele træningsdata. Store modeller bruger tusindvis af GPU-timer på det her.',
      analogi: 'Du justerer en bruser med to haner. Lidt for koldt? Drej den varme en anelse op. Nu for varmt? Lidt tilbage. Du ved ikke den perfekte indstilling på forhånd, men hvert skridt gør det mindre forkert.',
      figur: {
        titel: 'Gradient descent: ned ad bakken',
        svg: svg(180, `
          <path d="M20,30 C90,180 200,180 300,50" fill="none" stroke="${LINE}" stroke-width="3"/>
          <circle cx="48" cy="72" r="9" fill="#E1306C"/>
          <circle cx="92" cy="122" r="9" fill="#E1306C" opacity=".7"/>
          <circle cx="140" cy="148" r="9" fill="#E1306C" opacity=".5"/>
          <circle cx="185" cy="152" r="9" fill="#11998E"/>
          ${pil(58, 82, 84, 114, { farve: '#a3123f' })}
          ${pil(102, 130, 132, 144, { farve: '#a3123f' })}
          ${txt(185, 176, 'lavest tab', { size: 10, farve: '#11998E' })}
          ${txt(40, 40, 'start', { size: 10 })}
          ${txt(288, 30, 'tab (loss)', { size: 10, anchor: 'end' })}`),
        tekst: 'Hvert skridt gør fejlen lidt mindre. Skridtets størrelse er learning rate.',
      },
      hvordan: [
        'Modellen gætter på en bunke eksempler.',
        'Tabsfunktionen giver ét tal for, hvor forkert det var.',
        'Backpropagation finder retningen for hver eneste vægt.',
        'Alle vægte justeres en lille smule den vej.',
        'Gentag tusindvis af gange.',
      ],
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad sker der, hvis learning rate er alt for stor?',
      svar: [
        'Modellen springer over målet og lærer aldrig',
        'Ingenting, det er kun et navn for skridtet',
        'Modellen lærer bare tilsvarende hurtigere',
        'Der bruges mindre strøm på træningen'
      ],
      rigtigt: 0,
      forklaring: 'For store skridt hopper over dalen. For små skridt tager evigheder. Derfor justeres learning rate typisk undervejs.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'En model, der er perfekt på træningsdata, kan være ubrugelig på alt andet.',
      body: '**Overfitting** er, når modellen lærer træningsdata udenad, inklusive tilfældig støj, i stedet for det mønster, der gælder generelt.\n\nEn elev, der har lært facitlisten til sidste års eksamen udenad, scorer 100 % på den prøve og dumper den nye.\n\nDerfor deler man altid data i tre:\n• **Træning**: modellen justerer sig på dem.\n• **Validering**: bruges undervejs til at vælge indstillinger.\n• **Test**: røres først til sidst, én gang. Det er den ærlige karakter.\n\nTegnene på overfitting er tydelige: fejlen på træningsdata bliver ved med at falde, mens fejlen på valideringsdata begynder at stige.\n\nModgift: mere data, enklere model, **regularisering** (straf for store vægte), **dropout** (sluk tilfældige neuroner under træning) og **early stopping** (stop, når valideringen vender).\n\nDet modsatte findes også: **underfitting**, hvor modellen er for simpel til overhovedet at fange mønstret.',
      analogi: 'At lære en rute udenad efter skiltene i én bestemt by er overfitting. At lære at læse kort virker i alle byer.',
      figur: {
        titel: 'Når validering vender opad',
        svg: svg(170, `
          <line x1="34" y1="140" x2="300" y2="140" stroke="${LINE}" stroke-width="1.5"/>
          <line x1="34" y1="140" x2="34" y2="20" stroke="${LINE}" stroke-width="1.5"/>
          ${txt(170, 160, 'træningstid', { size: 10 })}
          ${txt(18, 80, 'fejl', { size: 10 })}
          <path d="M34,40 C110,120 200,132 298,136" fill="none" stroke="#11998E" stroke-width="2.5"/>
          <path d="M34,44 C110,110 170,100 298,40" fill="none" stroke="#c0392b" stroke-width="2.5"/>
          <line x1="168" y1="24" x2="168" y2="140" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4 4"/>
          ${txt(168, 16, 'stop her', { size: 10, farve: INK })}
          ${txt(292, 128, 'træning', { size: 10, farve: '#11998E', anchor: 'end' })}
          ${txt(292, 30, 'validering', { size: 10, farve: ROED, anchor: 'end' })}`),
        tekst: 'Så længe begge kurver falder, lærer modellen. Når den røde vender opad, er den begyndt at lære udenad.',
      },
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er det tydeligste tegn på overfitting?',
      svar: [
        'Fejlen falder på træning, men stiger på validering',
        'Modellen bruger meget mere strøm end forventet',
        'Fejlen stiger på både trænings- og valideringsdata',
        'Træningen går langsommere for hver epoke'
      ],
      rigtigt: 0,
      forklaring: 'Modellen bliver bedre og bedre til de eksempler, den har set, og dårligere til alt andet. Derfor findes early stopping.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'En model kan kun være så god som de data, den har set. Og data er aldrig neutrale.',
      body: '»Garbage in, garbage out« er ældre end AI, men det har aldrig været mere sandt.\n\nEt kendt eksempel: Amazon byggede et værktøj, der skulle screene ansøgninger. Det lærte af ti års tidligere ansættelser, hvor de fleste ansatte var mænd. Modellen lærte derfor at nedvurdere ansøgninger, der nævnte ord som »women\'s«. Værktøjet blev skrottet.\n\nModellen gjorde ikke noget forkert. Den fandt et mønster, der faktisk var i data. Problemet var, at mønstret afspejlede fortidens skævhed.\n\nTre fælder, der går igen:\n• **Historisk bias**: data afspejler, hvordan verden var, ikke hvordan den bør være.\n• **Skæv stikprøve**: ansigtsgenkendelse trænet mest på lyse ansigter virker dårligere på mørke.\n• **Proxy-variable**: postnummer kan i praksis være en stedfortræder for etnicitet eller indkomst.\n\nDerfor er det sjældent nok at spørge »hvor præcis er modellen?«. Man skal spørge **for hvem**.',
      analogi: 'Spørger du kun gæsterne i én café, om byens kaffe er god, får du et meget sikkert svar. Det er bare ikke et svar om byen.',
      hvorfor: 'Det er en af de vigtigste ting at kunne sige højt, hvis du skal bruge AI i et projekt eller til en eksamen.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvorfor lærte Amazons rekrutteringsmodel at nedvurdere kvindelige ansøgere?',
      svar: [
        'Fordi den lærte af data, hvor de fleste var mænd',
        'Fordi modellen var alt for lille til opgaven',
        'Fordi den blev programmeret til at gøre det',
        'Fordi den blev trænet med for lav learning rate'
      ],
      rigtigt: 0,
      forklaring: 'Modellen fandt et ægte mønster i fortidens data. Skævheden lå i data, ikke i koden.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Et neuralt netværk virker, fordi nogen har programmeret reglerne ind i det.',
      rigtigt: 0,
      forklaring: 'Myte. Reglerne findes af modellen selv som vægte under træning. Derfor kan man heller ikke bare læse koden og se, hvorfor den svarer, som den gør.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k4',
      pastand: 'En model, der rammer 100 % rigtigt på træningsdata, er den bedste model.',
      rigtigt: 0,
      forklaring: 'Myte. Det er typisk tegn på overfitting. Det eneste tal, der tæller, er hvor godt den klarer data, den aldrig har set.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k3',
      sporgsmal: 'Sæt træningsløkken i rækkefølge',
      trin: [
        'Modellen gætter på en bunke eksempler',
        'Tabsfunktionen måler, hvor forkert gættet var',
        'Backpropagation finder retningen for hver vægt',
        'Vægtene justeres med learning rate',
        'Valideringsdata tjekker, om det stadig går fremad',
      ],
      forklaring: 'Gæt, mål fejlen, find retningen, tag et lille skridt, tjek på data modellen ikke træner på.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar, hvordan et neuralt netværk trænes, og hvad der kan gå galt.',
      punkter: [
        { tekst: 'Neuron: vægtet sum + aktiveringsfunktion', ord: ['vægt', 'sum', 'relu', 'aktiver'] },
        { tekst: 'Tabsfunktion måler fejlen i ét tal', ord: ['tab', 'loss', 'fejl'] },
        { tekst: 'Backpropagation + gradient descent justerer vægtene', ord: ['backprop', 'gradient', 'juster'] },
        { tekst: 'Learning rate bestemmer skridtets størrelse', ord: ['learning rate', 'skridt'] },
        { tekst: 'Overfitting: god på træning, dårlig på nyt', ord: ['overfit', 'udenad', 'validering'] },
        { tekst: 'Data afgør resultatet, inklusive skævheder', ord: ['data', 'bias', 'skæv'] },
      ],
    },
  ],
};
