export default {
  spor: {
    id: 't02', nr: 2, titel: 'Higher-Order Functions & Lambdas', kort: 'Lambda', emoji: '🧩',
    farve: '#FF512F', gradient: 'linear-gradient(135deg, #FF512F 0%, #F09819 100%)',
    lektion: 'Lektion 3.1',
    kerne: [
      'En højereordens funktion tager en funktion som argument eller returnerer en funktion.',
      'En functor er et objekt med operator(). Compileren kender typen og kan inline kaldet – derfor er det hurtigere end en funktionspointer.',
      'En lambda er en functor, compileren skriver for dig. Capture-listen bliver til medlemsvariabler.',
      '[=] fanger by value (const uden mutable), [&] fanger by reference – og reference til en lokal variabel kan dangle.',
      'std::function kan holde hvad som helst kaldbart, men koster en indirekte kald og måske en allokering.',
    ],
    disposition: [
      'Higher-order functions: tager eller returnerer funktioner',
      'Funktionspointere i C (fx qsort-comparator)',
      'Function objects (functors) med operator() og tilstand',
      'Lambda-syntaks: capture, parametre, (mutable), body',
      'Closure-type vs closure-objekt – hvad compileren genererer',
      'Capture by value vs by reference – dangling references',
      'std::function og brug som callback / i tråde',
    ],
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'En funktion, der tager en funktion som argument, er ikke magi. Den er overalt.',
      body: 'En **higher-order function** tager en funktion som parameter og/eller returnerer en funktion. `std::sort` med en comparator, `std::for_each` og `std::thread` er alle eksempler.\n\nI C bruger man **funktionspointere**:\n\n`int (*op)(int, int) = add;`\n`int r = op(2, 3);`\n\nC\'s `qsort` tager en comparator af typen `int (*)(const void*, const void*)`. Det er klassisk higher-order i C.\n\nFordelen er, at algoritmen (sortering) adskilles fra politikken (hvordan man sammenligner). Det samme mønster bruges til **callbacks**, fx »kald denne funktion, når knappen trykkes«.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvilken erklæring er en pointer til en funktion, der tager to int og returnerer int?',
      svar: [
        'int *fp(int, int);',
        '(int*) fp(int, int);',
        'int (*fp)(int, int);',
        'int fp*(int, int);'
      ],
      rigtigt: 2,
      forklaring: 'Parentesen omkring *fp er afgørende. Uden den er det en funktion, der returnerer int*.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Et objekt, der opfører sig som en funktion, kan huske ting.',
      body: 'En **function object** (functor) er en klasse med `operator()`:\n\n`struct Større { int grænse; bool operator()(int x) const { return x > grænse; } };`\n\nForskellen fra en funktionspointer: functoren kan have **tilstand** (her `grænse`).\n\nDen er ofte også **hurtigere**. Når `std::sort` får en functor, kender compileren den præcise type og kan **inline** kaldet. En funktionspointer er en runtime-værdi, som compileren sjældnere kan se igennem.\n\n`std::function<bool(int)>` kan holde **en hvilken som helst callable** med den signatur: funktionspointer, functor eller lambda. Prisen er **type erasure**: et indirekte kald og muligvis en heap-allokering.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor kan std::sort være hurtigere med en functor end med en funktionspointer?',
      svar: [
        'Functoren kører sammenligningen i sin egen separate tråd',
        'Funktionspointere kopierer hele datasættet ved hvert kald',
        'Compileren kender functorens type og kan inline kaldet',
        'Functors bruger heapen i stedet for stakken til kaldet'
      ],
      rigtigt: 2,
      forklaring: 'Hver functor-type giver sin egen template-instans, hvor operator() kan inlines. En pointer er en værdi, der først kendes ved runtime.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'En lambda er en functor, som compileren skriver for dig.',
      body: 'Syntaksen er `[capture](parametre) mutable -> returtype { body }`. Kun `[]` og `{}` er påkrævet.\n\n`auto kvadrat = [](int x) { return x * x; };`\n\nCompileren genererer en **unik, unavngiven klasse**, **closure-typen**, med en `operator()`. Variabler i capture-listen bliver **medlemsvariabler**. Objektet, der oprettes ved runtime, er **closure-objektet**.\n\n`operator()` er som standard **const**. Du kan derfor ikke ændre en by-value capture, medmindre du skriver `mutable`.\n\nEn lambda **uden captures** kan konverteres til en almindelig funktionspointer og kan derfor gives direkte til C-API\'er som `qsort`.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad sker der med `int x = 0; auto f = [x]() { x++; };`?',
      svar: [
        'x i main bliver 1, første gang f() kaldes i programmet',
        'Kompileringsfejl: by-value capture er const uden mutable',
        'Udefineret opførsel, fordi x fanges uden at være static',
        'Den kopierede x bliver 1, mens x i main forbliver 0'
      ],
      rigtigt: 1,
      forklaring: 'operator() er const som standard. Med `mutable` kompilerer den, og så ændres kun closure-objektets egen kopi.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'En closure husker omgivelserne. Nogle gange husker den noget, der ikke findes længere.',
      body: 'Capture-listen bestemmer, hvordan lambdaen får adgang til omgivende variabler:\n\n`[x]` kopi af x · `[&x]` reference til x\n`[=]` kopi af alt brugt · `[&]` reference til alt brugt\n`[this]` adgang til objektets medlemmer\n`[p = std::move(ptr)]` **init capture** (C++14), fx til at flytte en unique_ptr ind\n\nBy value tages kopien **når lambdaen oprettes**, ikke når den kaldes.\n\nDen farlige fælde er en **dangling reference**. Captures du en lokal variabel by reference og gemmer lambdaen, returnerer den eller giver den til en tråd, kan variablen være død, når lambdaen kører. Det er udefineret opførsel.\n\nTommelfingerregel: lever lambdaen længere end scopet, så capture by value.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er problemet med denne funktion?\n\nstd::function<int()> lav() { int n = 5; return [&n]() { return n; }; }',
      svar: [
        'n er død, når lambdaen kaldes – dangling reference',
        'std::function kan ikke gemme en lambda med captures',
        'En lambda kan slet ikke returneres fra en funktion i C++',
        'Intet er galt: lambdaen returnerer altid værdien 5'
      ],
      rigtigt: 0,
      forklaring: 'n lever kun i lav(). Brug [n] i stedet, så closure-objektet har sin egen kopi.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k4',
      sporgsmal: 'Hvad udskrives?',
      kode: 'int n = 1;\nauto f = [n]() { return n * 10; };\nn = 5;\nstd::cout << f();',
      svar: [
        '50',
        '0',
        'Kompileringsfejl',
        '10'
      ],
      rigtigt: 3,
      forklaring: 'By-value capture kopierer n, da lambdaen oprettes (n = 1). Senere ændringer af n påvirker ikke kopien.',
    },
    {
      id: 'kode2', type: 'quiz', efter: 'k3',
      sporgsmal: 'Hvad udskrives? (C++17)',
      kode: 'int c = 0;\nauto g = [c]() mutable { return ++c; };\ng();\ng();\nstd::cout << c << " " << g();',
      svar: [
        '3 3',
        '2 3',
        '0 1',
        '0 3'
      ],
      rigtigt: 3,
      forklaring: 'mutable ændrer closure-objektets egen kopi, som bliver 1, 2 og så 3. Den ydre c er stadig 0.',
    },
    {
      id: 'case1', type: 'case', efter: 'k4',
      scenarie: 'En funktion starter en baggrundstråd og returnerer med det samme.',
      kode: 'void start() {\n  int x = 42;\n  std::thread t([&] {\n    std::this_thread::sleep_for(1s);\n    std::cout << x;\n  });\n  t.detach();\n}',
      sporgsmal: 'Hvad er fejlen?',
      svar: [
        'sleep_for blokerer hele programmet og ikke kun tråden',
        'x er død, når tråden læser den – fang med [x] i stedet',
        'cout er ikke trådsikker, så der udskrives aldrig noget',
        'detach() er ikke tilladt på en tråd, der kører en lambda'
      ],
      rigtigt: 1,
      forklaring: 'start() returnerer, og x forsvinder fra stakken, mens tråden stadig sover. [&] giver en dangling reference. [x] kopierer værdien ind i closure-objektet.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k3',
      pastand: 'En lambda uden captures kan konverteres til en almindelig funktionspointer.',
      rigtigt: 1,
      forklaring: 'Fakta. Uden captures har closure-typen ingen tilstand og har en implicit konvertering til funktionspointer. Derfor kan den gives til C-funktioner som qsort eller pthread_create.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar en lambdas dele, og hvad compileren gør med den.',
      punkter: [
        { tekst: 'Capture-liste, parametre, body (og evt. mutable/returtype)', ord: ['capture', 'parameter', 'body', 'krop'] },
        { tekst: 'Compileren genererer en unik closure-klasse med operator()', ord: ['klasse', 'closure', 'operator()', 'functor'] },
        { tekst: 'Captures bliver medlemsvariabler', ord: ['medlem', 'member'] },
        { tekst: 'operator() er const – mutable for at ændre kopier', ord: ['const', 'mutable'] },
        { tekst: 'Closure-objektet oprettes ved runtime med capturet tilstand', ord: ['objekt', 'runtime', 'tilstand'] },
        { tekst: 'Uden captures kan den blive en funktionspointer', ord: ['funktionspointer', 'function pointer'] },
      ],
    },
    {
      id: 'f2', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar forskellen på capture by value og by reference, og hvornår det går galt.',
      punkter: [
        { tekst: 'By value kopierer, når lambdaen oprettes', ord: ['kopi', 'value', 'værdi', 'oprettes'] },
        { tekst: 'By reference ser ændringer i den oprindelige variabel', ord: ['reference', 'ændring'] },
        { tekst: '[=], [&], [x, &y], [this], init capture', ord: ['[=]', '[&]', 'this', 'init capture'] },
        { tekst: 'Dangling reference, når lambdaen lever længere end variablen', ord: ['dangling', 'scope', 'lever', 'død'] },
        { tekst: 'Eksempel: tråde eller returnerede lambdas', ord: ['tråd', 'thread', 'return'] },
      ],
    },
    {
      id: 'f3', type: 'forklar', efter: 'k2',
      sporgsmal: 'Sammenlign funktionspointere, functors, lambdas og std::function.',
      punkter: [
        { tekst: 'Funktionspointer: ingen tilstand, C-kompatibel, svær at inline', ord: ['funktionspointer', 'pointer', 'inline'] },
        { tekst: 'Functor: klasse med operator(), kan have tilstand', ord: ['functor', 'operator()', 'tilstand', 'klasse'] },
        { tekst: 'Lambda: kort syntaks for en functor, genereret af compileren', ord: ['lambda', 'syntaks', 'compiler'] },
        { tekst: 'std::function: holder enhver callable via type erasure', ord: ['std::function', 'type erasure', 'callable'] },
        { tekst: 'std::function koster indirekte kald / mulig heap-allokering', ord: ['overhead', 'heap', 'indirekte', 'pris'] },
      ],
    },
  ],
};
