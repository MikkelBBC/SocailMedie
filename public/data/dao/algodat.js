// Algoritmer og datastrukturer – kompleksitet i praksis.
export default {
  "spor": {
    "id": "algodat",
    "titel": "Når O(1) ikke holder",
    "kort": "AlgoDat",
    "emoji": "🧮",
    "farve": "#405DE6",
    "gradient": "linear-gradient(135deg, #00C6FF 0%, #405DE6 50%, #833AB4 100%)",
    "nr": 0
  },
  "kort": [
    {
      "id": "a1",
      "type": "koncept",
      "orden": 1,
      "hook": "En O(n²)-algoritme slår en O(n log n). Hver eneste dag.",
      "body": "Store-O fortæller, hvordan tiden **vokser**, når n bliver stor. Konstanter og små input smider den bevidst væk.\n\nDet betyder, at en »dårlig« algoritme med lille konstant kan vinde, så længe n er lille. Insertion sort er O(n²), men den laver næsten ingenting pr. skridt: ingen rekursion, ingen ekstra hukommelse, og den læser data i rækkefølge, som CPU-cachen elsker.\n\nDerfor snyder rigtige sorteringsbiblioteker. Pythons Timsort og mange quicksort-implementeringer skifter til insertion sort, når et delarray er under ca. 32-64 elementer.\n\nLektien: Store-O er et værktøj til at sammenligne **vækst**, ikke en stopur. Når nogen siger »den her er hurtigere«, er det rigtige modspørgsmål: for hvilken størrelse n?"
    },
    {
      "id": "a1q",
      "type": "quiz",
      "om": "a1",
      "sporgsmal": "Hvorfor skifter mange sorteringsbiblioteker til insertion sort for små delarrays?",
      "svar": [
        "Lille konstant og cache-venlig læsning slår bedre vækst, når n er lille",
        "Insertion sort er O(n log n), når n er lille",
        "Store-O gælder ikke under 100 elementer",
        "Quicksort kan ikke sortere under 64 elementer"
      ],
      "rigtigt": 0,
      "forklaring": "Store-O skjuler konstanter. For små n dominerer konstanten, og insertion sort har en meget lille én. Store-O ›gælder‹ stadig, den siger bare intet om små n."
    },
    {
      "id": "a2",
      "type": "koncept",
      "orden": 2,
      "hook": "En hashtabel er O(1). Indtil den er O(n).",
      "body": "En hashtabel regner nøglen om til et tal og bruger det som indeks i et array af »buckets«. Rammer to nøgler samme bucket, er det en **kollision**, og de ender i en lille liste.\n\nI gennemsnit er listerne korte, så opslag er O(1). Men i **værste tilfælde** lander alle nøgler i samme bucket, og hvert opslag bliver en lineær søgning: O(n).\n\nDet er ikke teori. I 2011 viste forskere »hash flooding«: send en webserver tusindvis af parametre, der kolliderer, og én request kan æde minutters CPU. Svaret var tilfældigt seedede hashfunktioner (Python og Rust bruger SipHash), og Java 8 laver lange bucket-lister om til balancerede træer, så værste tilfælde bliver O(log n).\n\nGennemsnit er et løfte om typisk data. Værste tilfælde er det, en angriber vælger."
    },
    {
      "id": "a2q",
      "type": "quiz",
      "om": "a2",
      "sporgsmal": "En angriber sender n nøgler, der alle hasher til samme bucket (chaining med lister). Hvad koster ét opslag?",
      "svar": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      "rigtigt": 2,
      "forklaring": "Alle nøgler ligger i én lang liste, så opslag er lineær søgning: O(n). At indsætte alle n koster O(n²) i alt. Java 8 laver lange buckets om til træer og får O(log n)."
    },
    {
      "id": "a3",
      "type": "koncept",
      "orden": 3,
      "hook": "Nogle gange tager append en evighed. I gennemsnit tager det ingenting.",
      "body": "Et dynamisk array (Pythons list, C++'s vector, Javas ArrayList) har en fast kapacitet. Når det er fuldt, allokeres et nyt og **større** array, og alt kopieres over. Den ene append koster O(n).\n\nTricket er at **fordoble** kapaciteten. Så sker kopieringen sjældnere og sjældnere. Over n appends kopieres der højst 1 + 2 + 4 + ... < 2n elementer, så den samlede pris er O(n) og hver append koster **amortiseret** O(1).\n\nVokser arrayet i stedet med et fast antal pladser, fx +10, bliver den samlede pris O(n²). Det er en af de mest almindelige skjulte ydelsesfejl.\n\nOg en fælde: amortiseret O(1) er ikke det samme som O(1) hver gang. I et spil eller et realtidssystem kan den ene dyre kopiering stadig give et hak."
    },
    {
      "id": "a3q",
      "type": "quiz",
      "om": "a3",
      "sporgsmal": "Et dynamisk array vokser med +10 pladser, hver gang det er fuldt. Hvad koster n appends i alt?",
      "svar": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(1) amortiseret"
      ],
      "rigtigt": 2,
      "forklaring": "Der kopieres 10 + 20 + 30 + ... ≈ n²/20 elementer, altså O(n²). Kun vækst med en faktor (fx ×2 eller ×1,5) giver amortiseret O(1)."
    },
    {
      "id": "a4",
      "type": "koncept",
      "orden": 4,
      "hook": "Indsæt i midten: linked list vinder på papiret og taber i virkeligheden.",
      "body": "Lærebogen: at indsætte i en linked list er O(1), i et array O(n), fordi elementer skal flyttes.\n\nMen for at indsætte i **midten** af en liste skal du først **finde** stedet, og det er O(n) pointer-hop. Hvert hop lander et tilfældigt sted i hukommelsen og giver ofte et cache-miss, der er omkring 100 gange langsommere end at læse fra CPU-cachen.\n\nArrayet ligger derimod samlet. At finde stedet og flytte resten med memmove er lineært, men det er lineært på den måde, hardwaren er bygget til. Bjarne Stroustrup har vist, at vector slår list selv ved tilfældige indsættelser, langt op i store n.\n\nListen vinder, når du **allerede har en pointer** til noden, fx i en LRU-cache (hashmap + dobbeltkædet liste), eller når elementer ikke må flytte sig i hukommelsen."
    },
    {
      "id": "a4q",
      "type": "quiz",
      "om": "a4",
      "sporgsmal": "Hvornår er en linked list reelt det bedste valg?",
      "svar": [
        "Når du ofte indsætter elementer et tilfældigt sted",
        "Når du allerede har en pointer til noden og skal flytte eller fjerne den i O(1)",
        "Når du skal iterere hurtigt over alle elementer",
        "Når data er små tal"
      ],
      "rigtigt": 1,
      "forklaring": "Uden pointeren skal du søge O(n) med cache-misses. Med pointeren (som i en LRU-cache) får du ægte O(1). Iteration og små elementer er netop dér, hvor arrays vinder mest."
    },
    {
      "id": "a5",
      "type": "koncept",
      "orden": 5,
      "hook": "Quicksort er den hurtigste sortering. Giv den sorteret input, og den kollapser.",
      "body": "Quicksort vælger en pivot, deler arrayet i »mindre end« og »større end« og sorterer delene rekursivt. Deler pivoten nogenlunde på midten, får du O(n log n) med små konstanter og god cache-adfærd.\n\nDen naive udgave bruger **første element** som pivot. Er input allerede sorteret, er pivoten altid det mindste element. Delingen bliver 0 og n-1 hver gang, arbejdet bliver n + (n-1) + ... = **O(n²)**, og rekursionsdybden bliver n, hvilket kan sprænge stakken.\n\nSorteret input er ikke et sjældent hjørne. Det er noget af det mest almindelige input, der findes.\n\nDerfor bruger rigtige implementeringer tilfældig pivot, median-af-tre, eller introsort/pdqsort, som opdager dårlige delinger og skifter til heapsort. Så er værste tilfælde garanteret O(n log n)."
    },
    {
      "id": "a5q",
      "type": "quiz",
      "om": "a5",
      "sporgsmal": "Naiv quicksort (første element er pivot) får et allerede sorteret array med n elementer. Hvad sker der?",
      "svar": [
        "O(n) – den opdager, at det er sorteret",
        "O(n log n) som altid",
        "O(n²) og rekursionsdybde n",
        "Den giver et forkert resultat"
      ],
      "rigtigt": 2,
      "forklaring": "Pivoten er altid minimum, så hver deling fjerner kun ét element. n + (n-1) + ... = O(n²), og stakken bliver n dyb."
    },
    {
      "id": "am1",
      "type": "myte",
      "efter": "a1",
      "hook": "Myte eller fakta?",
      "pastand": "Binær søgning er altid hurtigere end lineær søgning i et sorteret array.",
      "svar": [
        "Myte",
        "Fakta"
      ],
      "rigtigt": 0,
      "forklaring": "Myte. For små arrays (typisk op til et par dusin elementer) er lineær søgning ofte hurtigere. Den kører i rækkefølge, som CPU'en kan forudsige og cache, mens binær søgning hopper rundt og rammer fejlforudsagte branches."
    },
    {
      "id": "ac1",
      "type": "case",
      "efter": "a2",
      "hook": "Case",
      "scenarie": "Din webserver lægger alle query-parametre i en hashmap. Hashfunktionen er fast og offentligt kendt. En dag bruger én enkelt request med 50.000 parametre 40 sekunders CPU.",
      "sporgsmal": "Hvad er den mest sandsynlige årsag?",
      "svar": [
        "Garbage collection",
        "Hash flooding: parametrene er valgt til at kollidere",
        "Netværket er langsomt",
        "En hukommelseslæk"
      ],
      "rigtigt": 1,
      "forklaring": "Kendt hashfunktion + brugerstyrede nøgler = angriberen kan vælge nøgler, der kolliderer. Hver indsættelse bliver O(n) og det hele O(n²). Løsning: tilfældigt seedet hash og et loft over antal parametre."
    }
  ]
};
