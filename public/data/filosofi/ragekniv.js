// Lommefilosofi: tankeværktøjer – ragekniver og gode argumenter.
export default {
  spor: {
    id: 'ragekniv', nr: 0, titel: 'Tankeværktøjer', kort: 'Ragekniv', emoji: '🔪',
    farve: '#FF6A88', gradient: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Occams ragekniv siger IKKE, at den enkleste forklaring er den rigtige.',
      body: '**Occams ragekniv** er opkaldt efter munken **William af Ockham** (1300-tallet). Den bliver ofte citeret som »entiteter må ikke mangfoldiggøres uden nødvendighed«.\n\nDen præcise version: **Når to forklaringer passer lige godt til data, så foretræk den, der kræver færrest ekstra antagelser.**\n\nDet er et princip for, hvilken hypotese man skal **teste først**, ikke et bevis for, hvad der er sandt. Verden er tit kompliceret: kvantemekanik er ikke »simpel«, men den forklarer data, som simplere teorier ikke kan.\n\nHvorfor virker den så? En forklaring med mange antagelser har flere steder, hvor den kan være forkert. Og en model med mange frie parametre kan tilpasse sig **alt**, også støj. Det er det, maskinlæring kalder **overfitting**.\n\nNår din kode fejler: er det en bug i compileren eller en tastefejl i din for-løkke? Begge forklarer fejlen. Den ene kræver meget mere.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad siger Occams ragekniv mest præcist?',
      svar: [
        'Foretræk den med færrest ekstra antagelser',
        'At man skal vælge den første forklaring, man får',
        'At den enkleste forklaring altid er den sande',
        'At komplicerede teorier næsten altid er forkerte'
      ],
      rigtigt: 0,
      forklaring: 'Kniven er en tommelfingerregel for valg mellem ligeværdige forklaringer. Den garanterer ikke sandhed.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Tilskriv aldrig ondskab det, der kan forklares med dumhed. Eller travlhed.',
      body: '**Hanlons ragekniv** lyder: »Never attribute to malice that which is adequately explained by stupidity.« Den er opkaldt efter Robert Hanlon, men lignende idéer findes hos bl.a. Goethe.\n\nDin makker svarer ikke på beskeden om projektet. Hypotese A: han er ligeglad og vil lade dig lave det hele. Hypotese B: han har ikke set den, har travlt eller har glemt det.\n\nB er langt mere almindeligt. Og at vælge A gør dig vred, ødelægger samarbejdet og bliver ofte selvopfyldende.\n\nKniven hænger sammen med en velkendt bias: **den fundamentale attributionsfejl**. Når andre fejler, forklarer vi det med deres **person** (»han er doven«). Når vi selv fejler, forklarer vi det med **situationen** (»jeg havde travlt«).\n\nEn god moderne version er: **»Antag uvidenhed, misforståelse eller travlhed, før du antager ondskab.«**\n\nDen skal ikke gøre dig naiv. Hvis mønstret gentager sig, og nogen gavner af det, er det tid til at opdatere.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvilken bias modvirker Hanlons ragekniv?',
      svar: [
        'Sunk cost, altså at holde fast i det brugte',
        'Anchoring, altså at hænge fast i et tal',
        'Den fundamentale attributionsfejl',
        'Survivorship bias, altså kun at se vinderne'
      ],
      rigtigt: 2,
      forklaring: 'Vi forklarer andres fejl med deres karakter og vores egne med situationen. Hanlons ragekniv minder dig om de situationelle forklaringer.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Du finder et hegn midt på en vej. Riv det ikke ned, før du ved, hvorfor det står der.',
      body: 'Forfatteren **G. K. Chesterton** beskrev i 1929 en reformator, der finder et hegn på tværs af en vej og siger: »Jeg kan ikke se nogen grund til det her. Lad os fjerne det.«\n\nEn klogere reformator svarer: »Hvis du ikke kan se grunden, så lader jeg dig **ikke** fjerne det. Gå hen og find ud af, hvorfor det blev sat op. **Så** kan du fjerne det.«\n\nDet er **Chestertons hegn**. Regler, traditioner og mærkelige kodelinjer er ofte sat op af nogen med en grund, som ikke længere er synlig.\n\nDu kender det fra kode: en `sleep(1);` uden kommentar. Du fjerner den, og tre uger senere dukker en race condition op i produktion.\n\nChesterton siger ikke, at alt gammelt skal bevares. Mange hegn er faktisk ubrugelige. Han siger, at **bevisbyrden** ligger hos den, der vil rive ned: forstå først, fjern bagefter.\n\nI praksis: `git blame`, spørg en kollega, eller skriv en test, før du sletter.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er pointen med Chestertons hegn?',
      svar: [
        'At gamle regler næsten altid viser sig nyttige',
        'Forstå hvorfor noget blev indført, før du fjerner det',
        'At man aldrig må ændre på noget gammelt',
        'At man altid skal fjerne det, man ikke forstår'
      ],
      rigtigt: 1,
      forklaring: 'Bevisbyrden ligger hos den, der vil fjerne noget. Forstå grunden først, og beslut så.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Den stærkeste måde at vinde en diskussion på er først at gøre modstanderens argument bedre.',
      body: 'En **stråmand** er at angribe en svagere, forvrænget udgave af det, den anden siger. Det er let og føles godt, men man lærer ingenting.\n\nDet modsatte kaldes **steelmanning**: at formulere den anden sides argument i dets **stærkeste** form, gerne så godt, at de selv siger »ja, præcis«. Først derefter svarer man.\n\nFilosoffen Daniel Dennett foreslog, med henvisning til spilteoretikeren Anatol Rapoport, en opskrift for at kritisere nogen:\n1. Gengiv deres holdning så klart, at de ønsker, de selv havde sagt det.\n2. Nævn, hvad I er enige om.\n3. Nævn, hvad du har lært af dem.\n4. Først **da** må du kritisere.\n\nDet hænger sammen med **Sokrates**, der i Platons dialoger stillede spørgsmål i stedet for at holde foredrag. I Apologien siger Sokrates, at han er klogere end andre i én ting: han tror ikke, at han ved det, han ikke ved.\n\nTil mundtlig eksamen er det samme en superkraft: »Et modargument kunne være … og det svarer jeg sådan på.«',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er steelmanning?',
      svar: [
        'At give op, når diskussionen bliver for svær',
        'At gengive modpartens argument i stærkeste form',
        'At angribe en svag udgave af modpartens argument',
        'At bruge så mange kilder som overhovedet muligt'
      ],
      rigtigt: 1,
      forklaring: 'Steelmanning er stråmandens modsætning. Man lærer mere, og ens kritik bliver stærkere, når den rammer den bedste version.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Occams ragekniv beviser, at den enkleste forklaring er sand.',
      rigtigt: 0,
      forklaring: 'Myte. Kniven er et heuristisk princip for, hvilke forklaringer man bør foretrække og teste først, når de forklarer data lige godt. Den beviser intet.',
    },
    {
      id: 'case1', type: 'case', efter: 'k3',
      scenarie: 'Du overtager et gammelt projekt. I en driver står der `usleep(500);` lige efter en skrivning til en I2C-enhed, uden kommentar. Det ser overflødigt ud og gør koden langsommere.',
      sporgsmal: 'Hvad siger Chestertons hegn, at du skal gøre?',
      svar: [
        'Gøre ventetiden dobbelt så lang for en sikkerheds skyld',
        'Finde grunden (git blame, datablad) før du fjerner',
        'Slette linjen med det samme og køre videre',
        'Lade den stå for evigt uden at undersøge noget'
      ],
      rigtigt: 1,
      forklaring: 'Mange enheder kræver en ventetid efter en skrivning. Undersøg grunden, og fjern den kun, hvis den faktisk er overflødig.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar tre tankeværktøjer, og giv et eksempel fra studiet eller programmering på hvert.',
      punkter: [
        { tekst: 'Occams ragekniv: færrest ekstra antagelser, når data forklares lige godt', ord: ['occam', 'antagelse', 'enkel'] },
        { tekst: 'Ikke et bevis for sandhed', ord: ['bevis', 'sand', 'heuristik'] },
        { tekst: 'Hanlons ragekniv: antag ikke ondskab først', ord: ['hanlon', 'ondskab', 'dumhed', 'travl'] },
        { tekst: 'Chestertons hegn: forstå før du fjerner', ord: ['chesterton', 'hegn', 'forstå'] },
        { tekst: 'Steelmanning: gør modargumentet stærkest muligt', ord: ['steelman', 'stråmand', 'modargument'] },
      ],
    },
  ],
};
