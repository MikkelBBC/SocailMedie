// Kognitive biases og beslutninger.
export default {
  "spor": {
    "id": "biases",
    "titel": "Hjernens genveje",
    "kort": "Biases",
    "emoji": "🎭",
    "farve": "#F77737",
    "gradient": "linear-gradient(135deg, #FCAF45 0%, #F77737 45%, #E1306C 100%)",
    "nr": 0
  },
  "kort": [
    {
      "id": "b1",
      "type": "koncept",
      "orden": 1,
      "hook": "Dine biases er ikke bugs. De er features i den forkerte kontekst.",
      "body": "I 1970'erne viste Kahneman og Tversky, at folk bruger **heuristikker**, altså mentale genveje, når de vurderer sandsynligheder. Genvejene giver systematiske fejl, og dem kalder vi biases.\n\nGerd Gigerenzer har vist den anden side: simple tommelfingerregler klarer sig ofte **bedre** end avancerede modeller, når der er stor usikkerhed og lidt data. En kompleks model tilpasser sig støjen (overfitting), mens reglen ikke har nok frihed til at tage fejl på den måde.\n\nSå det interessante spørgsmål er ikke »har jeg en bias?«, for det har du. Det er: **passer miljøet til genvejen?** En heuristik fejler, når omgivelserne er anderledes end dem, den er formet til: medier, der forstærker sjældne hændelser, eller tal, der er valgt for at manipulere dig.\n\nDet er den ramme, resten af sporet bygger på."
    },
    {
      "id": "b1q",
      "type": "quiz",
      "om": "b1",
      "sporgsmal": "Hvornår klarer en simpel tommelfingerregel sig ofte BEDRE end en detaljeret model?",
      "svar": [
        "Når der er meget data og lav støj",
        "Når der er stor usikkerhed og lidt data",
        "Aldrig, modellen vinder altid med nok tid",
        "Kun når beslutningen er uvigtig"
      ],
      "rigtigt": 1,
      "forklaring": "Med lidt, støjfyldt data overfitter en kompleks model. En simpel regel har for få frihedsgrader til at lære støjen og generaliserer derfor bedre. Det er Gigerenzers pointe om ›less is more‹."
    },
    {
      "id": "b2",
      "type": "koncept",
      "orden": 2,
      "hook": "Et tilfældigt tal flytter dit skøn. Også når du ved, det er tilfældigt.",
      "body": "I Tversky og Kahnemans klassiske forsøg fra 1974 drejede deltagerne et lykkehjul, der var fikset til at stoppe på 10 eller 65. Derefter skulle de skønne, hvor mange procent af FN's medlemslande der ligger i Afrika.\n\nDe, der havde fået 10, svarede i median 25 %. De, der havde fået 65, svarede 45 %. Tallet var **åbenlyst** tilfældigt, og det virkede alligevel.\n\nDet kaldes **anchoring**: vi starter i et tal og justerer for lidt væk fra det. Effekten er en af dem, der har klaret sig godt i store replikationsprojekter.\n\nDu møder den overalt: det første bud i en lønforhandling, »førpris« på et tilbud, estimater i et softwareprojekt.\n\nAt blive advaret hjælper overraskende lidt. Det, der har bedre støtte, er **consider-the-opposite**: aktivt at formulere grunde til, at ankeret kan være forkert."
    },
    {
      "id": "b2q",
      "type": "quiz",
      "om": "b2",
      "sporgsmal": "Hvilken strategi har bedst dokumentation for at dæmpe anchoring?",
      "svar": [
        "At få at vide, at anchoring findes",
        "At tænke længere over tallet",
        "Aktivt at argumentere for, hvorfor ankeret kan være forkert",
        "At vælge et andet anker selv"
      ],
      "rigtigt": 2,
      "forklaring": "Consider-the-opposite tvinger dig til at hente information, der peger væk fra ankeret. Advarsler alene virker svagt, og at tænke længere justerer ofte stadig ud fra samme startpunkt."
    },
    {
      "id": "b3",
      "type": "koncept",
      "orden": 3,
      "hook": "Du vurderer, hvor ofte noget sker, ud fra hvor let du kommer i tanke om det.",
      "body": "Er der flest engelske ord, hvor K er **første** bogstav, eller hvor K er **tredje**? De fleste siger første. Det er forkert: der er cirka dobbelt så mange med K på tredjepladsen.\n\nMen det er meget lettere at finde på ord, der **starter** med K. Tversky og Kahneman kaldte det **availability-heuristikken** (1973): vi bruger den lethed, eksempler dukker op med, som et mål for hyppighed.\n\nDet er ofte et fint signal, for ting du har set mange gange, er typisk almindelige. Men dramatiske, nylige og mediedækkede hændelser er lette at huske, uden at de er hyppige.\n\nEfter 11. september valgte mange amerikanere bilen i stedet for flyet. Gigerenzer har anslået, at det gav omkring 1.600 ekstra trafikdødsfald i året efter. Det er flere, end der døde i de fire fly."
    },
    {
      "id": "b3q",
      "type": "quiz",
      "om": "b3",
      "sporgsmal": "Er der flest engelske ord med K som første eller som tredje bogstav?",
      "svar": [
        "Første bogstav",
        "Tredje bogstav",
        "Nogenlunde lige mange"
      ],
      "rigtigt": 1,
      "forklaring": "Tredje bogstav, cirka dobbelt så mange. Ord, der starter med K, er bare lettere at hente frem, og den lethed forveksles med hyppighed."
    },
    {
      "id": "b4",
      "type": "koncept",
      "orden": 4,
      "hook": "Det mest lærerige spørgsmål er det, du ikke har lyst til at stille.",
      "body": "Peter Wason gav i 1960 folk tallene **2-4-6** og sagde: de følger en regel. Find reglen ved at foreslå nye talrækker, og jeg siger ja eller nej.\n\nDe fleste gætter »stiger med 2« og tester 8-10-12. Ja. 20-22-24. Ja. Så er de sikre. Men reglen var bare »tre stigende tal«, og under hver fjerde fandt den ved første forsøg.\n\nFejlen: de testede kun rækker, der **passede** med deres egen hypotese. Svaret blev ja hver gang, men et ja kunne ikke skelne mellem deres regel og den rigtige. Det er **confirmation bias**.\n\nDen informative test er den, der kunne **modbevise** dig: 1-2-3 eller 3-2-1.\n\nDet samme sker ved debugging. Du kører den test, du forventer virker, og kalder koden fejlfri."
    },
    {
      "id": "b4q",
      "type": "quiz",
      "om": "b4",
      "sporgsmal": "Du tror, reglen er »tal, der stiger med 2«. Hvilken test giver dig MEST information?",
      "svar": [
        "10-12-14",
        "1-2-3",
        "100-102-104",
        "2-4-6 igen"
      ],
      "rigtigt": 1,
      "forklaring": "1-2-3 bryder din hypotese. Et ja afslører, at reglen er bredere end du troede. De andre giver ja under både din og den rigtige regel og lærer dig intet."
    },
    {
      "id": "b5",
      "type": "koncept",
      "orden": 5,
      "hook": "Nogle af psykologiens mest berømte fund holdt ikke.",
      "body": "I 2015 forsøgte Open Science Collaboration at gentage 100 publicerede psykologistudier. 97 % af originalerne havde signifikante resultater. I gentagelserne var det omkring **36 %**.\n\nEnkelte kendte eksempler:\n\n**Ego depletion** (viljestyrke som et batteri): et stort samarbejde mellem 23 laboratorier i 2016 fandt en effekt tæt på nul.\n\n**Power posing**: den påståede effekt på hormoner kunne ikke gentages.\n\n**Priming** med ord om alderdom, der skulle få folk til at gå langsommere, fejlede også.\n\nMen det er ikke kaos. Mange klassiske kognitive effekter som anchoring har klaret sig fint.\n\nMønstret for det, der fejlede: små stikprøver, overraskende og »for gode« resultater, og mange måder at analysere data på. Brug det som filter, næste gang en populærbog lover en livshack."
    },
    {
      "id": "b5q",
      "type": "quiz",
      "om": "b5",
      "sporgsmal": "Hvilket af disse fund har klaret sig BEDST i store replikationer?",
      "svar": [
        "Ego depletion",
        "Power posing og hormoner",
        "Anchoring",
        "Alderdoms-priming og gangtempo"
      ],
      "rigtigt": 2,
      "forklaring": "Anchoring replikerer robust. De tre andre er blandt de mest kendte eksempler, der ikke kunne gentages i større studier."
    },
    {
      "id": "bm1",
      "type": "myte",
      "efter": "b2",
      "hook": "Myte eller fakta?",
      "pastand": "Når du ved, at du har en bestemt bias, holder den op med at påvirke dig.",
      "svar": [
        "Myte",
        "Fakta"
      ],
      "rigtigt": 0,
      "forklaring": "Myte. Folk ser biases tydeligt hos andre og undervurderer dem hos sig selv (Pronins ›bias blind spot‹). Viden hjælper lidt. Procedurer som tjeklister, pre-mortems og consider-the-opposite hjælper mere."
    },
    {
      "id": "bc1",
      "type": "case",
      "efter": "b1",
      "hook": "Case",
      "scenarie": "Din projektgruppe har brugt tre uger på en løsning, der halter. En ny tilgang ville tage én uge og blive bedre. En i gruppen siger: »Vi kan ikke smide tre ugers arbejde ud nu.«",
      "sporgsmal": "Hvad er fejlen, og hvilket spørgsmål bør gruppen stille?",
      "svar": [
        "Anchoring – hvad var vores første estimat?",
        "Sunk cost – hvad giver det bedste resultat herfra og frem?",
        "Availability – hvad husker vi bedst?",
        "Confirmation bias – hvem havde ret?"
      ],
      "rigtigt": 1,
      "forklaring": "De tre uger er brugt uanset hvad I vælger. Det relevante er kun fremtidig pris og gevinst: én uge til en bedre løsning mod fortsat at slås med en dårlig."
    }
  ]
};
