export default {
  spor: {
    id: 't05', nr: 5, titel: 'Deadlocks', kort: 'Deadlock', emoji: '🍝',
    farve: '#FF416C', gradient: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
    lektion: 'Lektion 5.1',
    kerne: [
      'Deadlock kræver fire ting samtidig: mutual exclusion, hold og vent, ingen fratagelse og cirkulær venten.',
      'Bryder man bare én af de fire betingelser, kan deadlock ikke opstå.',
      'I en ressourcegraf med én instans pr. type betyder en cyklus deadlock. Med flere instanser er en cyklus kun en mulighed.',
      'Prevention bryder en betingelse strukturelt, fx ved altid at tage låse i samme rækkefølge.',
      'Avoidance (bankers algoritme) tjekker hver tildeling mod en safe state og kræver kendskab til maksimale behov.',
      'De spisende filosoffer: løs det ved højst fire ved bordet, én der tager modsat, eller alt-eller-intet.',
    ],
    disposition: [
      'Definition og eksempel med to tråde og to låse',
      'De fire nødvendige betingelser (Coffman)',
      'Resource Allocation Graph: kanter, cykler, single vs multiple instances',
      'Prevention: bryd én betingelse (fx låserækkefølge)',
      'Avoidance: safe state og Banker\'s algorithm',
      'Detection & recovery – og »ignore« (strudsemetoden)',
      'Dining philosophers og løsninger, std::scoped_lock',
    ],
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'A har X og venter på Y. B har Y og venter på X. De venter for evigt.',
      body: 'En **deadlock** er, når en mængde tråde hver venter på en ressource, som en anden i mængden holder. Den kræver, at **alle fire** betingelser er opfyldt samtidig:\n\n**1. Mutual exclusion**: ressourcen kan kun holdes af én ad gangen.\n**2. Hold and wait**: man holder mindst én ressource, mens man venter på flere.\n**3. No preemption**: ressourcer kan ikke tages fra en tråd, kun frigives frivilligt.\n**4. Circular wait**: der findes en cyklus T₀ → T₁ → … → T₀ af ventende tråde.\n\nDe er **nødvendige**, så fjerner du én, er deadlock umulig. Det er hele grundlaget for **prevention**.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvilken betingelse brydes ved altid at tage låse i samme globale rækkefølge?',
      svar: [
        'Hold and wait',
        'Circular wait',
        'Mutual exclusion',
        'No preemption'
      ],
      rigtigt: 1,
      forklaring: 'Med en global rækkefølge venter man kun på låse »højere oppe« end dem, man holder. En cyklus ville kræve, at nogen venter »nedad«.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Tegn grafen. Er der ingen cyklus, er der ingen deadlock.',
      body: 'En **Resource Allocation Graph (RAG)** har to slags knuder: **tråde/processer** (cirkler) og **ressourcetyper** (firkanter med én prik pr. instans).\n\nKanterne:\n**Request edge** T → R: T venter på R.\n**Assignment edge** R → T: en instans af R er tildelt T.\n\nReglerne:\n• **Ingen cyklus → ingen deadlock.**\n• Cyklus og **én instans** af hver ressourcetype i cyklussen → **deadlock**.\n• Cyklus og **flere instanser** → **muligvis** deadlock. En anden tråd kan frigive en instans og bryde den.\n\nMed kun single-instance-ressourcer kan man forenkle til en **wait-for graph** med kun tråde. Den bruges til **detection**.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'En RAG har en cyklus, men ressourcetyperne har flere instanser. Hvad kan du konkludere?',
      svar: [
        'Der er muligvis deadlock',
        'Grafen er ugyldig',
        'Der er ikke deadlock',
        'Der er deadlock'
      ],
      rigtigt: 0,
      forklaring: 'Med flere instanser er en cyklus nødvendig, men ikke tilstrækkelig. En tråd uden for cyklussen kan frigive en instans.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Forhindre, undgå, opdage – eller lade som ingenting.',
      body: '**Prevention**: design systemet, så én betingelse aldrig kan opstå. Fx **låserækkefølge** (circular wait), **tag alle låse på én gang** (hold and wait) eller **frigiv alt, hvis du ikke kan få resten** (no preemption).\n\n**Avoidance**: OS\'et kender hver tråds **maksimale behov** på forhånd og giver kun ressourcer, hvis systemet forbliver i en **safe state**. Det gør **Banker\'s algorithm**: der skal findes en rækkefølge, hvor alle kan køre færdig.\n\n**Detection & recovery**: tillad deadlocks og kør periodisk en algoritme, der leder efter cykler. Recovery sker ved at **afbryde** processer eller **preempte** ressourcer med rollback.\n\n**Ignore**: den såkaldte strudsemetode. De fleste OS\'er, inkl. Linux, lader applikationen håndtere det.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er forskellen på deadlock prevention og deadlock avoidance?',
      svar: [
        'Prevention kræver kendskab til maksimale behov',
        'Der er ingen forskel, det er to ord for det samme',
        'Prevention bryder en af de fire betingelser strukturelt',
        'Avoidance afbryder processer, prevention genstarter'
      ],
      rigtigt: 2,
      forklaring: 'Avoidance (Banker\'s) kræver, at maksimale behov kendes på forhånd, og beslutter dynamisk. Prevention er en designregel.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Fem filosoffer, fem pinde og en middag, der aldrig bliver spist.',
      body: '**Dining philosophers**: fem filosoffer sidder om et rundt bord med én pind mellem hver. For at spise skal man have **begge** pinde.\n\nNaiv løsning: tag venstre pind, så højre. Tager alle venstre samtidig, venter alle på højre. Det er **deadlock**, fordi alle fire betingelser er opfyldt.\n\nLøsninger:\n• **Maks fire ved bordet**, fx med en semafor initialiseret til 4. Så kan cyklussen ikke lukkes.\n• **Asymmetri**: ulige filosoffer tager venstre først, lige tager højre først. Det er en låserækkefølge.\n• **Tag begge atomisk** eller slet ingen.\n\nI C++17: `std::scoped_lock lk(venstre, højre);` låser begge med en deadlock-undgående algoritme (som `std::lock`).\n\nPas på med **livelock** og **starvation**: nogle løsninger kan lade en filosof sulte.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvorfor fjerner »højst fire filosoffer ved bordet« deadlock?',
      svar: [
        'Fordi der så er flere pinde tilbage end filosoffer',
        'Fordi mindst én altid kan få begge pinde',
        'Fordi mutual exclusion på pindene forsvinder',
        'Fordi filosofferne så skiftes til at spise i rækkefølge'
      ],
      rigtigt: 1,
      forklaring: 'Med 4 filosoffer og 5 pinde siger dueslagsprincippet, at mindst én får to pinde. Cyklussen af fem ventende kan ikke opstå.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k4',
      sporgsmal: 'Hvad er den mindste ændring, der fjerner deadlock-risikoen?',
      kode: 'void eat(std::mutex& left, std::mutex& right) {\n  std::lock_guard<std::mutex> a(left);\n  std::lock_guard<std::mutex> b(right);\n  // spis\n}',
      svar: [
        'std::scoped_lock lk(left, right);',
        'Brug std::unique_lock i stedet for lock_guard',
        'Tilføj en sleep mellem de to låse',
        'Byt de to linjer om'
      ],
      rigtigt: 0,
      forklaring: 'scoped_lock tager begge låse med en deadlock-undgående algoritme. At bytte linjerne hjælper ikke, fordi naboen så gør det samme omvendt.',
    },
    {
      id: 'case1', type: 'case', efter: 'k1',
      scenarie: 'transfer(a, b) låser først a.lock og derefter b.lock. Tråd 1 kalder transfer(konto1, konto2). Samtidig kalder tråd 2 transfer(konto2, konto1). Programmet fryser en sjælden gang.',
      sporgsmal: 'Hvad sker der, og hvad er en god løsning?',
      svar: [
        'Race condition – tilføj en global lås omkring alt',
        'Intet – hver konto har sin egen lås',
        'Deadlock – lås altid kontoen med lavest id først',
        'Starvation – giv tråd 1 højere prioritet'
      ],
      rigtigt: 2,
      forklaring: 'Circular wait mellem de to tråde. Sortering efter id giver en global låserækkefølge. En global lås virker også, men gør alle overførsler serielle.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'En cyklus i en resource allocation graph betyder altid deadlock.',
      rigtigt: 0,
      forklaring: 'Myte. Det gælder kun, når hver ressourcetype i cyklussen har én instans. Med flere instanser er det kun muligvis deadlock.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k1',
      sporgsmal: 'Sæt forløbet mod en deadlock i rækkefølge',
      trin: [
        'Tråd A låser mutex X',
        'Tråd B låser mutex Y',
        'Tråd A forsøger at låse Y og blokerer',
        'Tråd B forsøger at låse X og blokerer',
        'Ingen kan fortsætte: circular wait',
      ],
      forklaring: 'Bemærk, at begge tråde når at tage deres første lås, før nogen tager sin anden. Timing bestemmer, om det sker.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k1',
      sporgsmal: 'Forklar de fire betingelser for deadlock, og hvordan hver kan brydes.',
      punkter: [
        { tekst: 'Mutual exclusion – svær at bryde (fx read-only data)', ord: ['mutual exclusion', 'gensidig'] },
        { tekst: 'Hold and wait – tag alle ressourcer på én gang', ord: ['hold and wait', 'alle på én gang', 'på en gang'] },
        { tekst: 'No preemption – frigiv, hvis resten ikke kan fås (trylock)', ord: ['preemption', 'trylock', 'frigiv'] },
        { tekst: 'Circular wait – global låserækkefølge', ord: ['circular', 'cirkulær', 'rækkefølge', 'ordering'] },
        { tekst: 'Alle fire skal være opfyldt samtidig', ord: ['alle fire', 'samtidig', 'nødvendig'] },
      ],
    },
    {
      id: 'f2', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar en resource allocation graph, og hvad en cyklus betyder.',
      punkter: [
        { tekst: 'Knuder: tråde/processer og ressourcetyper med instanser', ord: ['knude', 'proces', 'ressource', 'instans'] },
        { tekst: 'Request edge T → R og assignment edge R → T', ord: ['request', 'assignment', 'kant'] },
        { tekst: 'Ingen cyklus → ingen deadlock', ord: ['ingen cyklus'] },
        { tekst: 'Cyklus + single instance → deadlock', ord: ['single', 'én instans', 'en instans'] },
        { tekst: 'Cyklus + multiple instances → muligvis deadlock', ord: ['multiple', 'flere instanser', 'muligvis'] },
        { tekst: 'Wait-for graph bruges til detection', ord: ['wait-for', 'detection'] },
      ],
    },
    {
      id: 'f3', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar dining philosophers-problemet og mindst to løsninger.',
      punkter: [
        { tekst: 'Fem filosoffer, fem pinde, skal have to for at spise', ord: ['fem', 'filosof', 'pind', 'gaffel'] },
        { tekst: 'Naiv løsning giver deadlock, når alle tager venstre', ord: ['venstre', 'deadlock', 'naiv'] },
        { tekst: 'Maks fire ved bordet (semafor)', ord: ['fire', 'semafor'] },
        { tekst: 'Asymmetrisk rækkefølge (ulige/lige)', ord: ['asymmetri', 'ulige', 'lige', 'rækkefølge'] },
        { tekst: 'Tag begge atomisk / std::scoped_lock', ord: ['atomisk', 'scoped_lock', 'std::lock', 'begge'] },
        { tekst: 'Risiko for starvation', ord: ['starvation', 'sulte'] },
      ],
    },
  ],
};
