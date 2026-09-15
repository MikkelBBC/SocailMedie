// Stress og præstation – med fokus på eksamen.
export default {
  spor: {
    id: 'stress', nr: 0, titel: 'Stress og præstation', kort: 'Stress', emoji: '😰',
    farve: '#F2994A', gradient: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Hjertet hamrer før eksamen. Kroppen gør dig klar – ikke svag.',
      body: 'Stressresponsen har to hastigheder.\n\n**Hurtig (sekunder)**: det sympatiske nervesystem udløser **adrenalin**. Pulsen stiger, vejrtrækningen bliver hurtigere, og der kommer blod og sukker ud til musklerne. Det er »kamp eller flugt«.\n\n**Langsom (minutter)**: **HPA-aksen** (hypothalamus → hypofyse → binyrer) frigiver **kortisol**. Det topper typisk 20-30 minutter efter stressoren og mobiliserer energi i længere tid.\n\nKortvarig stress er **adaptiv**. Den skærper opmærksomheden og gør kroppen parat til at præstere.\n\nProblemerne opstår især, når stress bliver **langvarig** uden restitution, eller når man **tolker** kroppens signaler som tegn på, at det går galt. Og det er netop tolkningen, man kan påvirke.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvilket stresshormon virker hurtigst?',
      svar: ['Kortisol', 'Adrenalin', 'Melatonin', 'Insulin'],
      rigtigt: 1,
      forklaring: 'Adrenalin (sympatisk nervesystem) virker på sekunder. Kortisol via HPA-aksen topper først efter 20-30 minutter.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Du kunne det i går. Under eksamen er det væk. Det er stress, der blokerer adgangen.',
      body: 'Forskning af bl.a. Lars Schwabe og Oliver Wolf viser, at akut stress **lige før** man skal huske noget, kan **forringe genkaldelsen**. Informationen er lagret, men adgangen er blokeret. Det er især forbundet med forhøjet kortisol.\n\nMen der er gode nyheder. I et studie i Science (Smith, Floerke & Thomas 2016) lærte deltagerne materiale enten ved at **genlæse** eller ved **retrieval practice** (at teste sig selv). Derefter blev halvdelen udsat for stress før testen.\n\nGenlæserne klarede sig dårligere under stress. Dem, der havde lært ved at **hente frem**, var **beskyttet**: stress påvirkede ikke deres resultater mærkbart.\n\nForklaringen er, at hentning skaber flere og stærkere veje til hukommelsen. Når én vej blokeres af stress, er der andre.\n\nDet er præcis grunden til, at du øver med quizzer og »forklar højt« i stedet for at genlæse.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad beskyttede hukommelsen mod stress i Smith m.fl. (2016)?',
      svar: ['At genlæse materialet flere gange', 'At lære ved retrieval practice (teste sig selv)', 'At sove mindre', 'At drikke kaffe'],
      rigtigt: 1,
      forklaring: 'Materiale lært ved hentning var robust over for stress. Genlæst materiale var ikke.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: '»Jeg er ikke nervøs, jeg er klar.« Det lyder fjollet. Det virker.',
      body: '**Stress reappraisal**: at omtolke kroppens stresssignaler som **nyttige** frem for farlige.\n\nJeremy Jamieson m.fl. (2010) gav studerende, der skulle tage GRE-testen (optagelsesprøve), en kort besked før en øveprøve: »Øget ophidselse før en test kan hjælpe din præstation.« Den gruppe klarede sig bedre i matematikdelen, både på øveprøven og senere på den **rigtige** GRE, end en kontrolgruppe.\n\nFysiologisk ser det ud til, at omtolkningen skifter responsen i retning af et **udfordringsmønster** (hjertet pumper effektivt, blodkarrene udvider sig) i stedet for et **trusselsmønster**.\n\nBemærk forskellen: at **undertrykke** nervøsiteten (»slap af!«) virker dårligt, fordi kroppen allerede er aktiveret. At **omtolke** den (»det her er energi, jeg kan bruge«) virker bedre.\n\nPraktisk før eksamen: mærk hjertet hamre, og sig til dig selv: »Min krop gør mig klar.«',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er bedst at gøre med nervøsitet lige før eksamen ifølge forskningen i stress reappraisal?',
      svar: [
        'Prøve at undertrykke den helt',
        'Omtolke kroppens signaler som energi, der hjælper præstationen',
        'Tænke på alt, der kan gå galt, så man er forberedt',
        'Ignorere eksamen til sidste øjeblik',
      ],
      rigtigt: 1,
      forklaring: 'Kroppen er allerede aktiveret. Omtolkning skifter mod et udfordringsmønster. Undertrykkelse modarbejder kroppen.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Den omvendte U-kurve, du har set 100 gange, er baseret på mus og elektriske stød.',
      body: '**Yerkes-Dodson-loven** siges at vise, at præstation stiger med ophidselse op til et punkt og derefter falder, som en omvendt U.\n\nDet originale studie (1908) handlede om **mus**, der skulle lære at skelne mellem lyse og mørke kasser under forskellige styrker af elektrisk stød. Det sagde intet om menneskers eksamen, og kurven er senere blevet generaliseret langt ud over, hvad data kan bære.\n\nDer er noget om det: **meget** høj og især **langvarig** stress skader præstation og helbred. Men »perfekt mængde stress« er ikke et præcist punkt, og **tolkningen** af stressen (se reappraisal) og **hvor godt man har øvet** betyder meget.\n\nDet, der beviseligt hjælper til en mundtlig eksamen:\n• Øv i **eksamenslignende situationer** (simulatoren!).\n• **Sov** ordentligt natten før. Tjapperi ødelægger konsolidering.\n• Lav en **disposition**, så du har en rygrad at vende tilbage til, hvis du går i stå.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad handlede det originale Yerkes-Dodson-studie (1908) om?',
      svar: ['Studerendes eksamensresultater', 'Mus, der lærte at skelne kasser under forskellige stødstyrker', 'Soldater i krig', 'Sportsudøveres præstation'],
      rigtigt: 1,
      forklaring: 'Kurven er blevet generaliseret langt ud over det oprindelige dyreforsøg. Brug den som løs idé, ikke som præcis lov.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Al stress er skadelig for præstationen.',
      rigtigt: 0,
      forklaring: 'Myte. Kortvarig stress mobiliserer krop og opmærksomhed, og omtolket som energi kan den forbedre præstationen. Det er især langvarig stress uden restitution, der skader.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k3',
      sporgsmal: 'Sæt en god plan for de sidste 24 timer før mundtlig eksamen i rækkefølge',
      trin: [
        'Dagen før: kort gentagelse med quiz og forklar højt – ingen nyt stof',
        'Aften: kig dispositionerne igennem én gang og stop i god tid',
        'Nat: sov (konsolidering)',
        'Morgen: morgenmad og en enkelt simulering af et emne',
        'Lige før: omtolk nervøsiteten – »min krop gør mig klar«',
      ],
      forklaring: 'Hentning frem for genlæsning, søvn frem for tjapperi, og omtolkning frem for undertrykkelse.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan stress påvirker hukommelsen til eksamen, og hvad du kan gøre ved det.',
      punkter: [
        { tekst: 'Adrenalin hurtigt, kortisol langsommere (HPA-aksen)', ord: ['adrenalin', 'kortisol', 'hpa'] },
        { tekst: 'Akut stress kan blokere genkaldelse', ord: ['blokere', 'genkald', 'huske', 'glemme'] },
        { tekst: 'Retrieval practice beskytter mod stress-effekten', ord: ['retrieval', 'teste', 'hente', 'quiz', 'beskytte'] },
        { tekst: 'Omtolk nervøsitet som energi (reappraisal)', ord: ['omtolk', 'reappraisal', 'energi', 'klar'] },
        { tekst: 'Undertrykkelse virker dårligt', ord: ['undertryk', 'slap af'] },
        { tekst: 'Søvn og eksamenslignende øvelse', ord: ['søvn', 'sove', 'simul', 'øve'] },
      ],
    },
  ],
};
