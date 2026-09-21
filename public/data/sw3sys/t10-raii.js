export default {
  spor: {
    id: 't10', nr: 10, titel: 'Automated Resource Management in C++', kort: 'RAII', emoji: '♻️',
    farve: '#185A9D', gradient: 'linear-gradient(135deg, #43CEA2 0%, #185A9D 100%)',
    lektion: 'Lektion 11.1',
    kerne: [
      'RAII: ressourcen hentes i konstruktoren og frigives i destruktoren, som altid kører, når scopet forlades.',
      'Derfor er RAII exception-safe: stack unwinding kalder destruktorerne på vej ud.',
      'unique_ptr har præcis én ejer, kan ikke kopieres og koster ikke noget ekstra.',
      'shared_ptr tæller ejere. To, der peger på hinanden, giver en cyklus, som weak_ptr bryder.',
      'make_unique og make_shared er at foretrække: undtagelsessikre og én allokering ved make_shared.',
      'Signaturen fortæller ejerskabet: unique_ptr som parameter = jeg overtager, reference = jeg låner.',
    ],
    disposition: [
      'Problemer: leaks, double free, dangling pointers, exceptions, uklart ejerskab',
      'RAII: erhverv i konstruktør, frigiv i destruktør – stack unwinding',
      'std::unique_ptr: eneejerskab, move-only, make_unique, custom deleter',
      'std::shared_ptr: reference counting, control block, make_shared',
      'std::weak_ptr: bryd cykler, lock()',
      'Ejerskab i funktionsparametre',
      'Messaging-eksempel: send(std::unique_ptr<Message>)',
    ],
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Hvert new er et løfte om et delete. Exceptions bryder løfter.',
      body: 'Manuel ressourcestyring giver fire klassiske fejl:\n\n**Memory leak**: `delete` glemmes, eller en tidlig `return`/exception springer det over.\n**Double free**: den samme pointer frigives to gange.\n**Dangling pointer**: der bruges hukommelse, som allerede er frigivet.\n**Uklart ejerskab**: hvem skal frigive denne pointer? Kalderen eller funktionen?\n\nOg det er ikke kun hukommelse. **Filhåndtag, mutexer, sockets, GPIO-pins** er alle ressourcer, der skal frigives præcis én gang.\n\n`int* p = new int[100]; process(p); delete[] p;` ser korrekt ud. Men kaster `process` en exception, nås `delete[]` aldrig.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er en dangling pointer?',
      svar: [
        'En pointer med værdien nullptr efter en delete',
        'En pointer, der peger på et objekt på stakken',
        'En pointer til hukommelse, der er frigivet',
        'En pointer, der aldrig er blevet initialiseret'
      ],
      rigtigt: 2,
      forklaring: 'At bruge den er udefineret opførsel. Hukommelsen kan være genbrugt til noget helt andet.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Destruktorer kører altid. Byg din oprydning på det.',
      body: '**RAII** (Resource Acquisition Is Initialization): bind ressourcens levetid til et **objekts levetid**.\n\n• **Konstruktøren** erhverver ressourcen (åbner filen, låser mutexen, allokerer).\n• **Destruktøren** frigiver den.\n\nC++ garanterer, at destruktoren for et lokalt objekt kører, når scopet forlades, **uanset hvordan**: normal return, break eller exception (**stack unwinding**).\n\nDu kender det allerede: `std::lock_guard` (mutex), `std::fstream` (fil), `std::vector` og `std::string` (hukommelse), smart pointers.\n\n**Rule of zero**: brug RAII-typer som medlemmer, så behøver din klasse ingen egen destruktor, copy eller move. **Rule of five**: skriver du én af destruktør, copy/move-konstruktør eller copy/move-assignment, så tænk over alle fem.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor er RAII exception-safe?',
      svar: [
        'Fordi RAII-objekter fanger exceptions undervejs',
        'Fordi destruktorer kører under stack unwinding',
        'Fordi en garbage collector rydder op bagefter',
        'Fordi RAII forhindrer, at der kastes exceptions'
      ],
      rigtigt: 1,
      forklaring: 'Stack unwinding destruerer alle fuldt konstruerede lokale objekter, så oprydningen sker automatisk.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'unique_ptr: præcis én ejer, nul overhead, ingen undskyldninger.',
      body: '`std::unique_ptr<T>` **ejer** et objekt alene og sletter det i destruktoren.\n\n`auto w = std::make_unique<Widget>(42);`\n\nDen er **move-only**: kopiering er slettet, så der kan aldrig være to ejere. Ejerskab overdrages eksplicit med `std::move`:\n\n`auto w2 = std::move(w); // w er nu nullptr`\n\nDen har **samme størrelse og hastighed som en rå pointer** (med standard-deleter).\n\n**Custom deleter** til ikke-hukommelsesressourcer:\n`std::unique_ptr<FILE, decltype(&fclose)> f(fopen("x", "r"), &fclose);`\n\n`reset()` sletter det nuværende objekt. `release()` opgiver ejerskabet uden at slette, så nu er det dit ansvar. `get()` giver den rå pointer uden at overdrage ejerskab.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad sker der ved `auto a = std::make_unique<Msg>(); auto b = a;`?',
      svar: [
        'Kompileringsfejl: unique_ptr kan ikke kopieres',
        'a og b kommer til at dele objektet',
        'a bliver sat til nullptr efter kopien',
        'b bliver en kopi af hele beskeden'
      ],
      rigtigt: 0,
      forklaring: 'Copy-konstruktøren er slettet. Brug auto b = std::move(a); for at overdrage ejerskabet.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'shared_ptr tæller ejere. Peger to på hinanden, når tælleren aldrig nul.',
      body: '`std::shared_ptr<T>` giver **delt ejerskab**. En **control block** holder en **reference count**. Hver kopi tæller op, hver destruktion tæller ned, og ved **0** slettes objektet.\n\n`auto s = std::make_shared<Sensor>();` laver objekt og control block i **én allokering**.\n\nPrisen: to pointere i størrelse, og tælleren opdateres **atomisk** (trådsikkert), så kopier koster.\n\n**Cykler lækker**: A har en shared_ptr til B, og B har en til A. Tællerne når aldrig 0.\n\n`std::weak_ptr<T>` **observerer** uden at eje. Den tæller ikke med i strong count. For at bruge objektet: `if (auto sp = weak.lock()) { ... }`. lock() giver en tom shared_ptr, hvis objektet er væk.\n\nBrug weak_ptr til tilbage-pointere (child → parent), observers og caches.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvordan bryder du en reference-cyklus mellem parent og child, der begge bruger shared_ptr?',
      svar: [
        'Ved at bruge to unique_ptr i stedet for shared',
        'Lad child pege tilbage med en std::weak_ptr',
        'Ved at kalde delete manuelt på den ene ende',
        'Ved at kalde std::move på begge pointere først'
      ],
      rigtigt: 1,
      forklaring: 'Ejerskab går én vej (parent ejer child). Tilbage-referencen er ikke-ejende (weak_ptr), så parent kan nå count 0.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'Funktionens signatur fortæller, hvem der ejer. Hvis du lytter.',
      body: 'Typen på en parameter er en **kontrakt om ejerskab**:\n\n`void f(Widget&)` / `const Widget&`: **bruger** objektet og ejer det ikke. Det er standardvalget.\n`void f(Widget*)`: bruger, må være nullptr, **ejer ikke**.\n`void f(std::unique_ptr<Widget>)` **by value**: **tager ejerskabet**. Kalderen skal skrive `f(std::move(w))`.\n`void f(std::unique_ptr<Widget>&)`: må **ændre** hvad kalderens pointer peger på (reseat).\n`void f(std::shared_ptr<Widget>)` **by value**: **deler ejerskabet**, fx gemmer en kopi.\n\n**Messaging-eksempel**: `void send(std::unique_ptr<Message> msg)`. Afsenderen giver beskeden fra sig, køen ejer den, og modtagerens `receive` returnerer `std::unique_ptr<Message>`. Når modtageren er færdig, slettes den automatisk. Ingen glemte `delete`, og ingen tråd kan røre en besked, den har afleveret.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvad kommunikerer signaturen `void store(std::unique_ptr<Config> cfg)`?',
      svar: [
        'At store kan ændre kalderens egen pointer-variabel',
        'At store overtager ejerskabet: kald med std::move',
        'At store læser config uden at overtage den',
        'At store deler ejerskabet med kalderen bagefter'
      ],
      rigtigt: 1,
      forklaring: 'unique_ptr by value = »giv mig den«. Kalderens pointer er nullptr bagefter.',
    },
    {
      id: 'case1', type: 'case', efter: 'k2',
      scenarie: 'En funktion allokerer en buffer, behandler den og frigiver den.',
      kode: 'void f() {\n  int* p = new int[100];\n  process(p);   // kan kaste exception\n  delete[] p;\n}',
      sporgsmal: 'Hvad er fejlen, og hvad er den bedste løsning?',
      svar: [
        'Brug try/catch og kald delete i begge grene',
        'Ingen fejl, koden rydder op som den skal',
        'Leak ved exception – brug std::vector<int>(100)',
        'delete[] skal skrives som et almindeligt delete'
      ],
      rigtigt: 2,
      forklaring: 'try/catch virker, men er fejlbehæftet og skalerer dårligt. RAII-typen frigiver automatisk på alle veje ud af funktionen.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k4',
      sporgsmal: 'Hvad sker der, når x og y går ud af scope?',
      kode: 'struct Node {\n  std::shared_ptr<Node> next;\n};\nauto x = std::make_shared<Node>();\nauto y = std::make_shared<Node>();\nx->next = y;\ny->next = x;',
      svar: [
        'Begge noder bliver slettet helt korrekt',
        'Memory leak: cyklussen holder begge tællere på 1',
        'Double free, fordi begge ender sletter noden',
        'Kompileringsfejl på grund af den cirkulære type'
      ],
      rigtigt: 1,
      forklaring: 'Når x og y forsvinder, falder hver count fra 2 til 1, men aldrig til 0. Gør den ene retning til weak_ptr.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'En shared_ptr er gratis at kopiere.',
      rigtigt: 0,
      forklaring: 'Myte. Hver kopi opdaterer reference count atomisk, hvilket kan koste mærkbart i varme løkker og mellem tråde. Send som const& eller brug unique_ptr, når ejerskabet ikke skal deles.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar RAII, og hvorfor det løser ressourcestyringsproblemerne.',
      punkter: [
        { tekst: 'Problemer: leaks, double free, dangling, exceptions', ord: ['leak', 'double free', 'dangling', 'exception'] },
        { tekst: 'Erhverv i konstruktør, frigiv i destruktør', ord: ['konstruktør', 'destruktør', 'constructor', 'destructor'] },
        { tekst: 'Destruktor kører altid ved scope-exit, også stack unwinding', ord: ['scope', 'stack unwinding', 'altid'] },
        { tekst: 'Eksempler: lock_guard, fstream, vector, smart pointers', ord: ['lock_guard', 'fstream', 'vector', 'smart pointer'] },
        { tekst: 'Gælder alle ressourcer, ikke kun hukommelse', ord: ['fil', 'mutex', 'socket', 'ressource'] },
      ],
    },
    {
      id: 'f2', type: 'forklar', efter: 'k4',
      sporgsmal: 'Sammenlign unique_ptr, shared_ptr og weak_ptr.',
      punkter: [
        { tekst: 'unique_ptr: eneejerskab, move-only, nul overhead', ord: ['unique_ptr', 'move-only', 'eneejer', 'overhead'] },
        { tekst: 'shared_ptr: delt ejerskab, reference count i control block', ord: ['shared_ptr', 'reference count', 'control block'] },
        { tekst: 'make_unique / make_shared', ord: ['make_unique', 'make_shared'] },
        { tekst: 'Cykler med shared_ptr lækker', ord: ['cykl', 'leak'] },
        { tekst: 'weak_ptr: ikke-ejende, lock() for at bruge', ord: ['weak_ptr', 'lock()', 'lock'] },
      ],
    },
    {
      id: 'f3', type: 'forklar', efter: 'k5',
      sporgsmal: 'Hvordan udtrykker du ejerskab i funktionsparametre? Brug messaging-systemet som eksempel.',
      punkter: [
        { tekst: 'T& / T*: bruger uden ejerskab', ord: ['reference', 'rå pointer', 'raw', 'bruger'] },
        { tekst: 'unique_ptr by value: tager ejerskab (std::move ved kald)', ord: ['unique_ptr', 'by value', 'std::move'] },
        { tekst: 'unique_ptr&: kan ændre kalderens pointer', ord: ['reseat', 'unique_ptr&'] },
        { tekst: 'shared_ptr by value: deler ejerskab', ord: ['shared_ptr', 'deler'] },
        { tekst: 'send(unique_ptr<Message>) – modtageren ejer og frigiver automatisk', ord: ['send', 'message', 'receive', 'modtager'] },
      ],
    },
  ],
};
