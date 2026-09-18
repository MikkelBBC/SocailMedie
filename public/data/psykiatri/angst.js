// Psykiatri: angst og depression – mekanismer og behandling.
export default {
  spor: {
    id: 'angst', nr: 0, titel: 'Angst og depression', kort: 'Angst', emoji: '🌧️',
    farve: '#4776E6', gradient: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Angst er en røgalarm. Problemet er, når den går af, hver gang du rister brød.',
      body: 'Angst er et **alarmsystem**. Det gør kroppen klar til at håndtere fare: pulsen stiger, musklerne spændes, opmærksomheden skærpes. Uden angst ville vi ikke overleve.\n\nVed en **angstlidelse** går alarmen af i situationer, der ikke er farlige, eller den er ude af proportioner og bliver ved.\n\nDet, der holder angsten i live, er ofte det, man gør for at slippe for den:\n• **Undgåelse**: man går ikke til festen, tager ikke bussen.\n• **Sikkerhedsadfærd**: man sidder tæt på døren, har vand med, tjekker pulsen.\n\nDet føles som en løsning, fordi angsten falder med det samme. Men hjernen lærer: »Det var farligt, og jeg klarede det kun, fordi jeg flygtede.« Så når man aldrig at opdage, at katastrofen ikke sker.\n\nKortsigtet lettelse, langsigtet fastholdelse. Det er angstens onde cirkel.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvorfor kan undgåelse fastholde angst?',
      svar: [
        'Fordi man bliver fysisk svagere',
        'Fordi man aldrig får erfaringen af, at det frygtede ikke sker',
        'Fordi undgåelse øger serotonin',
        'Det gør den ikke, undgåelse kurerer angst',
      ],
      rigtigt: 1,
      forklaring: 'Lettelsen belønner flugten, og frygten bliver aldrig testet mod virkeligheden. Derfor er undgåelse et centralt mål i behandlingen.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Den mest effektive behandling mod angst er at gøre præcis det, man frygter. Langsomt.',
      body: '**Eksponering** er kernen i kognitiv adfærdsterapi (KAT) for angst og har stærk evidens for bl.a. fobier, panikangst, OCD og PTSD.\n\nMan laver en **angsttrappe** fra let til svært og går op ad den trin for trin. Den, der er bange for elevatorer, starter måske med at se på en elevator og ender med at køre til toppen alene.\n\nFørhen forklarede man det med **habituering**: kroppen vænner sig til det, og angsten falder. Nyere forskning (fx Michelle Craske) peger på **inhibitorisk læring**: hjernen lærer en ny, konkurrerende erfaring, »elevator = sikker«, oven på den gamle.\n\nDet har praktiske konsekvenser:\n• Det vigtige er at få forventningen **overrasket**, ikke at angsten skal falde helt i hver øvelse.\n• Sikkerhedsadfærd under eksponering kan ødelægge læringen, fordi man tilskriver det gode udfald til den.\n• Varier situationer, så læringen generaliserer.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er ifølge inhibitorisk læring det vigtigste i en eksponeringsøvelse?',
      svar: [
        'At angsten falder helt til nul hver gang',
        'At forventningen om katastrofe bliver modbevist',
        'At man har sin sikkerhedsgenstand med',
        'At man undgår ubehag',
      ],
      rigtigt: 1,
      forklaring: 'Hjernen lærer mest, når der er en forskel mellem det forventede og det, der sker. Sikkerhedsadfærd kan tage æren og blokere læringen.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Depression er ikke bare at være ked af det. Ofte er det at kunne føle for lidt.',
      body: 'Alle kan være triste. En **depression** er noget andet: en tilstand, der varer mindst **to uger** og påvirker næsten alt.\n\nKernesymptomerne er:\n• **Nedtrykthed** det meste af tiden.\n• **Nedsat lyst og interesse**, også kaldet **anhedoni**: det, der plejede at være rart, giver ingenting.\n• **Nedsat energi** og træthed.\n\nDertil kommer ofte søvnproblemer, ændret appetit, koncentrationsbesvær, skyldfølelse, lavt selvværd og i nogle tilfælde tanker om død.\n\nDepression rammer også **tænkningen**. Hukommelsen bliver skæv mod det negative, og grubleri kører i ring. Det føles som at se sandheden, men det er et symptom.\n\nDepression er en af de hyppigste årsager til sygdomsbyrde i verden. Den er også **behandlelig**, og de fleste kommer sig.\n\nHar du selv tanker om at gøre skade på dig selv, så kontakt læge, vagtlæge eller Livslinien (70 201 201).',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad betyder anhedoni?',
      svar: ['Angst for sociale situationer', 'Nedsat evne til at føle lyst og glæde ved ting', 'Søvnløshed', 'Overdreven glæde'],
      rigtigt: 1,
      forklaring: 'Anhedoni er et af kernesymptomerne ved depression: det, der plejede at være rart, giver ikke længere noget.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Terapi eller piller? Ved moderat depression virker de omtrent lige godt.',
      body: 'Store metaanalyser (bl.a. Cuijpers og kolleger) finder, at **psykoterapi**, især kognitiv adfærdsterapi, og **antidepressiv medicin** har omtrent samme effekt ved let til moderat depression. Ved **svær** depression anbefales ofte medicin, og **kombinationen** virker typisk bedre end hver for sig.\n\nForskellene ligger andre steder:\n• Medicin kan virke hurtigere for nogle, men har bivirkninger, og tilbagefald er hyppigere, hvis man stopper.\n• Terapi lærer færdigheder, der kan beskytte mod **tilbagefald** efter behandlingen.\n\nEn simpel og veldokumenteret metode er **adfærdsaktivering**. Depression gør, at man trækker sig, og tilbagetrækning gør depressionen værre. Adfærdsaktivering vender det om: man planlægger små, meningsfulde aktiviteter **før** lysten kommer. Motivation følger ofte handling, ikke omvendt.\n\nMotion har også dokumenteret effekt som supplement.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er idéen i adfærdsaktivering?',
      svar: [
        'At vente med aktiviteter, til man har lyst igen',
        'At planlægge små meningsfulde aktiviteter, før lysten kommer',
        'At tage mere medicin',
        'At tale om barndommen',
      ],
      rigtigt: 1,
      forklaring: 'Depression trækker en ud af livet, og tilbagetrækning forstærker depressionen. Handling kommer først, lysten følger ofte bagefter.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'Depression skyldes simpelthen mangel på serotonin i hjernen.',
      rigtigt: 0,
      forklaring: 'Myte. »Kemisk ubalance« er en stærk forenkling uden solid støtte som forklaring (bl.a. Moncrieff m.fl. 2022). Depression har mange årsager. Antidepressiva kan stadig hjælpe mange, selv om mekanismen ikke er så simpel.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k2',
      pastand: 'Ved angst er det bedst at undgå det, man er bange for, indtil angsten er gået over af sig selv.',
      rigtigt: 0,
      forklaring: 'Myte. Undgåelse giver kortvarig lettelse, men fastholder angsten. Gradvis eksponering er en af de bedst dokumenterede behandlinger.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k1',
      sporgsmal: 'Sæt panikkens onde cirkel i rækkefølge (Clarks model)',
      trin: [
        'En udløser, fx en varm og fyldt bus',
        'En kropsfornemmelse: hjertet banker hurtigere',
        'Katastrofetolkning: »Jeg får et hjerteanfald«',
        'Mere angst giver endnu stærkere kropssymptomer',
        'Sikkerhedsadfærd eller flugt – og troen på faren bliver bekræftet',
      ],
      forklaring: 'Kernen er tolkningen. Ufarlige kropssignaler tolkes som fare, og det skruer op for de samme signaler. Behandling går bl.a. på at teste tolkningen.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar, hvad der fastholder angst, og hvordan eksponering virker.',
      punkter: [
        { tekst: 'Angst er et alarmsystem, der går af uden reel fare', ord: ['alarm', 'fare'] },
        { tekst: 'Undgåelse giver lettelse på kort sigt', ord: ['undgå', 'lettelse', 'flugt'] },
        { tekst: 'Sikkerhedsadfærd forhindrer ny læring', ord: ['sikkerhed', 'adfærd'] },
        { tekst: 'Eksponering trin for trin (angsttrappe)', ord: ['eksponering', 'trappe', 'gradvis'] },
        { tekst: 'Inhibitorisk læring: forventningen skal modbevises', ord: ['inhibitorisk', 'forvent', 'modbevis', 'overrask'] },
      ],
    },
  ],
};
