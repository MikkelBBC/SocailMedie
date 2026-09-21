export default {
  spor: {
    id: 't07', nr: 7, titel: 'Message Passing & Queues', kort: 'Queues', emoji: '📬',
    farve: '#6A5AE0', gradient: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
    lektion: 'Lektion 8.1 + 9.1 + 10.1',
    kerne: [
      'Producer-consumer med en kø udjævner forskelle i tempo. Kø fuld: producer venter. Kø tom: consumer venter.',
      'Message passing deler kun køen, så trådens egen tilstand behøver ingen låse.',
      'En trådsikker kø bruger en mutex plus en condition variable for »ikke tom« og »ikke fuld«.',
      'std::variant er en sum type: værdien er præcis ét af alternativerne, og std::visit håndterer dem alle.',
      'std::move flytter ingenting – den giver lov til at stjæle indholdet. Bagefter er kilden gyldig, men tom.',
      'Publish-subscribe via en broker gør afsender og modtager løst koblet: de kender ikke hinanden.',
    ],
    disposition: [
      'Producer-consumer og bounded buffer',
      'Message passing mellem tråde i stedet for delt tilstand',
      'Delt message queue: send/receive med mutex + condition variable',
      'Algebraiske datatyper: product vs sum type',
      'std::variant og std::visit (overloaded-mønstret)',
      'Move semantics og std::unique_ptr til beskeder',
      'Message broker og publish-subscribe',
    ],
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Én laver data hurtigere, end den anden kan spise dem. Køen redder jer begge.',
      body: '**Producer-consumer**: én eller flere producenter laver data, én eller flere forbrugere behandler dem. De kobles sammen med en **buffer**, der udjævner forskellen i tempo.\n\nMed en **bounded buffer** (fast størrelse):\n• Producenten **blokerer, når bufferen er fuld**.\n• Forbrugeren **blokerer, når den er tom**.\n\nKlassisk implementering: **én mutex** om bufferen og **to condition variables**, `notFull` og `notEmpty`, eller semaforerne `empty` og `full`.\n\nProducenten låser, venter på `notFull`, lægger ind, kalder `notEmpty.notify_one()`. Forbrugeren låser, venter på `notEmpty`, tager ud, kalder `notFull.notify_one()`.\n\nGrænsen er vigtig. Uden den kan en hurtig producent æde al hukommelse (**backpressure**).',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'I en bounded buffer: hvad skal forbrugeren gøre, efter den har taget et element ud?',
      svar: [
        'Låse bufferen igen',
        'Kalde notFull.notify_one()',
        'Ingenting',
        'Kalde notEmpty.notify_one()'
      ],
      rigtigt: 1,
      forklaring: 'Der er nu plads, så en producent, der venter på notFull, skal vækkes.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Del ikke hukommelse for at kommunikere. Kommunikér for at dele.',
      body: 'I stedet for at flere tråde låser om de samme data, ejer **hver tråd sin egen tilstand**. De taler kun sammen via **beskeder**. Det eneste delte er **køen**, og den er synkroniseret ét sted.\n\nEn typisk **message queue**-klasse:\n\n`void send(unsigned long id, Message* msg);` låser, lægger i kø og notifier.\n`Message* receive(unsigned long& id);` låser og venter, til køen ikke er tom. Tager ud og returnerer.\n\nHver aktiv tråd har sin egen kø og kører en **event loop**:\n`for (;;) { auto msg = mq.receive(id); handle(id, msg); }`\n\n`id` fortæller, hvilken slags besked det er, og `handle` switcher på den.\n\nFordelen er, at trådens logik bliver en simpel tilstandsmaskine uden låse, og at deadlocks på applikationsdata forsvinder.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er den største fordel ved message passing mellem tråde frem for delte variabler med låse?',
      svar: [
        'Det er altid hurtigere end at dele hukommelse',
        'Kun køen er delt – trådens egen tilstand er fri',
        'Beskeder kan under ingen omstændigheder gå tabt',
        'Man behøver slet ingen synkronisering nogen steder'
      ],
      rigtigt: 1,
      forklaring: 'Synkroniseringen samles ét sted (køen), så resten af koden bliver lettere at ræsonnere om. Køen skal selv stadig have mutex + condition variable.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'En besked er Start ELLER Stop ELLER Data. Det har C++ en type til.',
      body: '**Algebraiske datatyper**:\n**Product type**: A **og** B, fx en `struct { int x; double y; }`.\n**Sum type**: A **eller** B. Værdien er præcis én af alternativerne.\n\nI C++17 er sum typen `std::variant`:\n\n`using Msg = std::variant<Start, Stop, Temp>;`\n\nDen ved altid, hvilket alternativ den holder. `std::holds_alternative<Temp>(m)` og `std::get_if<Temp>(&m)` tjekker og henter.\n\n`std::visit(visitor, m)` kalder den overload, der matcher det aktuelle alternativ. Med **overloaded-mønstret** skriver man en lambda pr. type:\n\n`template<class... Ts> struct overloaded : Ts... { using Ts::operator()...; };`\n\nFordelen frem for arv + message-id\'er er, at **mangler du en overload, får du en kompileringsfejl**. Man kan ikke glemme en beskedtype.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er en sum type?',
      svar: [
        'En template med et variabelt antal argumenter',
        'En type, der indeholder A og B på samme tid',
        'En type, der bruges til at lægge tal sammen',
        'En type, hvis værdi er præcis ét af flere alternativer'
      ],
      rigtigt: 3,
      forklaring: 'Product = og (struct/tuple). Sum = eller (variant). Antallet af mulige værdier er summen af alternativernes værdier.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'std::move flytter ingenting. Den giver bare lov.',
      body: 'En **rvalue reference** `T&&` binder til midlertidige objekter. `std::move(x)` er blot et **cast** til `T&&`, der siger »jeg er færdig med x«.\n\nSå vælges **move-konstruktøren** i stedet for copy-konstruktøren. Den **stjæler** ressourcen, typisk en pointer, og efterlader kilden i en **gyldig, men uspecificeret** tilstand. For en `std::string` er det typisk tom.\n\nTil beskeder er det guld. En stor besked kopieres ikke. Kun ejerskabet flyttes:\n\n`auto msg = std::make_unique<Temp>(21.5);`\n`queue.send(std::move(msg)); // msg er nu nullptr`\n\n`std::unique_ptr` kan **kun flyttes**, ikke kopieres. Så garanterer typesystemet, at præcis én tråd ejer beskeden ad gangen.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad gælder for `a` efter `std::string b = std::move(a);`?',
      svar: [
        'Det er udefineret opførsel overhovedet at røre a',
        'a og b indeholder nu begge den samme tekst',
        'a er gyldig, men uspecificeret – typisk tom',
        'a er slettet og må ikke bruges til noget'
      ],
      rigtigt: 2,
      forklaring: 'Moved-from objekter er gyldige. Du må destruere dem eller tildele nye værdier, men ikke stole på indholdet.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'Afsenderen ved ikke, hvem der lytter. Det er hele pointen.',
      body: 'En **message broker** sidder i midten mellem afsendere og modtagere.\n\n**Publish-subscribe**:\n• Modtagere **subscriber** på et **topic**, fx `"temperatur"`.\n• Afsendere **publisher** en besked på topic\'et til brokeren.\n• Brokeren slår op, hvem der abonnerer, og lægger beskeden i **hver subscribers kø**.\n\nDet giver **løs kobling**. Afsendere og modtagere kender ikke hinanden, mange-til-mange er gratis, og nye modtagere kan tilføjes uden at ændre afsenderen.\n\nPrisen er, at brokeren bliver et centralt punkt, der skal være trådsikkert, og at fejlfinding bliver sværere, fordi flowet er indirekte.\n\nSamme idé skaleret op mellem maskiner: MQTT, RabbitMQ, Kafka.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvad er den vigtigste egenskab ved publish-subscribe via en broker?',
      svar: [
        'Afsender og modtager kender ikke hinanden',
        'Man har ikke brug for køer nogen steder i systemet',
        'Beskeder leveres hurtigere end ved direkte kald',
        'Der kan kun være én modtager pr. topic ad gangen'
      ],
      rigtigt: 0,
      forklaring: 'Afkobling er pointen. Brokeren kender relationerne, ikke afsenderen.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k3',
      sporgsmal: 'Hvad sker der?',
      kode: 'using Msg = std::variant<Start, Stop, Temp>;\n\nvoid handle(const Msg& m) {\n  std::visit(overloaded{\n    [](const Start&) { std::cout << "start"; },\n    [](const Temp& t) { std::cout << t.celsius; }\n  }, m);\n}',
      svar: [
        'Stop-beskeder bliver stille og roligt ignoreret',
        'Der kastes en exception, når en Stop bliver modtaget',
        'Kompileringsfejl: der mangler en overload for Stop',
        'Stop bliver håndteret af den første lambda i listen'
      ],
      rigtigt: 2,
      forklaring: 'std::visit kræver, at visitoren kan kaldes med alle alternativer. Det er netop fordelen: glemte beskedtyper fanges ved compile time.',
    },
    {
      id: 'kode2', type: 'quiz', efter: 'k4',
      sporgsmal: 'Hvad sker der?',
      kode: 'auto msg = std::make_unique<Temp>(21.5);\nqueue.send(msg);',
      svar: [
        'msg bliver sat til nullptr efter indsættelsen',
        'Kompileringsfejl: unique_ptr kan ikke kopieres',
        'Beskeden bliver kopieret ind i køen som den er',
        'Der opstår en memory leak, når køen bliver tømt'
      ],
      rigtigt: 1,
      forklaring: 'Hvis send tager unique_ptr by value, skal ejerskabet flyttes eksplicit med std::move. Det gør ejerskabsoverdragelsen synlig i koden.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'std::move flytter data fra ét objekt til et andet.',
      rigtigt: 0,
      forklaring: 'Myte. std::move er kun et cast til rvalue reference. Selve flytningen sker i move-konstruktøren eller move-assignment, hvis typen har en.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k5',
      sporgsmal: 'Sæt forløbet i publish-subscribe via en broker i rækkefølge',
      trin: [
        'Subscriber registrerer sig på topic "temp" hos brokeren',
        'Publisher sender en besked på "temp" til brokeren',
        'Brokeren slår subscribers op for "temp"',
        'Brokeren lægger beskeden i hver subscribers kø',
        'Subscriberens tråd modtager fra sin kø og håndterer den',
      ],
      forklaring: 'Publisheren er færdig efter trin 2. Den ved hverken hvor mange eller hvem der modtager.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k1',
      sporgsmal: 'Forklar producer-consumer-problemet og en løsning med mutex og condition variables.',
      punkter: [
        { tekst: 'Producent og forbruger i forskelligt tempo, bundet af en buffer', ord: ['producent', 'producer', 'consumer', 'forbruger', 'buffer'] },
        { tekst: 'Bounded buffer: bloker ved fuld / tom', ord: ['bounded', 'fuld', 'tom'] },
        { tekst: 'Én mutex om bufferen', ord: ['mutex', 'lås'] },
        { tekst: 'Condition variables notFull og notEmpty', ord: ['condition', 'notfull', 'notempty'] },
        { tekst: 'notify efter indsættelse/udtagning, wait med prædikat', ord: ['notify', 'wait', 'prædikat'] },
      ],
    },
    {
      id: 'f2', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar std::variant og std::visit, og hvorfor de er gode til beskeder.',
      punkter: [
        { tekst: 'Sum type vs product type', ord: ['sum type', 'product', 'algebraisk'] },
        { tekst: 'std::variant holder præcis ét alternativ og ved hvilket', ord: ['variant', 'alternativ'] },
        { tekst: 'std::visit kalder den matchende overload', ord: ['visit', 'overload', 'visitor'] },
        { tekst: 'overloaded-mønstret med lambdas', ord: ['overloaded', 'lambda'] },
        { tekst: 'Compile-time tjek: manglende beskedtype giver fejl', ord: ['compile', 'kompiler', 'glemme', 'fejl'] },
      ],
    },
    {
      id: 'f3', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar move semantics, og hvordan unique_ptr bruges til at sende beskeder mellem tråde.',
      punkter: [
        { tekst: 'rvalue reference T&& og std::move som cast', ord: ['rvalue', '&&', 'std::move', 'cast'] },
        { tekst: 'Move-konstruktør stjæler ressourcen i stedet for at kopiere', ord: ['move-konstruktør', 'move constructor', 'stjæl', 'kopi'] },
        { tekst: 'Moved-from objekt er gyldigt men uspecificeret', ord: ['gyldig', 'uspecificeret', 'valid'] },
        { tekst: 'unique_ptr er move-only – én ejer ad gangen', ord: ['unique_ptr', 'ejer', 'ownership'] },
        { tekst: 'send(std::move(msg)) overdrager ejerskab til modtageren', ord: ['send', 'overdrag', 'modtager'] },
      ],
    },
  ],
};
