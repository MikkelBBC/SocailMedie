export default {
  spor: {
    id: 't03', nr: 3, titel: 'Threads & Concurrency', kort: 'Tråde', emoji: '🧵',
    farve: '#C13584', gradient: 'linear-gradient(135deg, #E1306C 0%, #C13584 45%, #5851DB 100%)',
    lektion: 'Lektion 3.2',
    kerne: [
      'Tråde i samme proces deler kode, globale data og heap, men har hver sin stak og sine egne registre.',
      'Tråde er billigere at oprette og skifte mellem end processer, men en fejl i én tråd kan vælte hele processen.',
      'Amdahls lov: den serielle del sætter loftet. Er 20 % seriel, er maks. speedup 5× uanset antal kerner.',
      'Brugertråde skal mappes til kernetråde. Kun én-til-én giver ægte parallelitet på flere kerner.',
      'Scheduling: round robin er fair, SJF giver laveste ventetid, og real-time bruger SCHED_FIFO med fast prioritet.',
      'std::thread skal join\'es eller detach\'es, ellers kalder destruktoren std::terminate.',
    ],
    disposition: [
      'Threaded process: hvad tråde deler og ikke deler',
      'Concurrency vs parallelism og multicore programming',
      'Amdahl\'s law med regneeksempel',
      'Threading models (many-to-one, one-to-one, many-to-many) og fork-join',
      'thread_local vs delte variabler – std::thread, join/detach',
      'Scheduling-kriterier og -algoritmer (FCFS, SJF, RR, priority)',
      'Linux: CFS/nice og real-time SCHED_FIFO/SCHED_RR fra C++',
    ],
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'En tråd er en proces, der deler hukommelse med sine søskende.',
      body: 'Tråde i samme proces **deler** code, data, heap og åbne filer. Hver tråd har kun sin **egen stak**, sine **egne registre** (inkl. program counter) og sit eget thread ID.\n\nFordele: **responsiveness** (UI kan køre, mens arbejde sker i baggrunden), **resource sharing**, **economy** (billigere at oprette og skifte end processer) og **scalability** på multicore.\n\nI C++: `std::thread t(funktion, arg1, arg2);`. Senere skal du enten `t.join()` (vente) eller `t.detach()` (slippe den).\n\nDestrueres et `std::thread`, der stadig er **joinable**, kaldes `std::terminate`, og programmet dør. (C++20\'s `std::jthread` joiner automatisk i destruktoren.)',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad sker der, hvis et std::thread-objekt går ud af scope uden join() eller detach()?',
      svar: [
        'Tråden bliver detached og kører videre i baggrunden',
        'std::terminate kaldes, og programmet afbrydes',
        'Main venter automatisk på, at tråden bliver færdig',
        'Tråden stoppes pænt, og ressourcerne ryddes op'
      ],
      rigtigt: 1,
      forklaring: 'En joinable std::thread i destruktoren kalder std::terminate. std::jthread (C++20) løser det ved at joine automatisk.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Otte kerner gør ikke dit program otte gange hurtigere. Amdahl ved hvorfor.',
      body: '**Concurrency** betyder, at flere opgaver gør fremskridt i samme periode, evt. skiftevis på én kerne. **Parallelism** betyder, at de kører **samtidig** på flere kerner.\n\n**Amdahl\'s law**: hvis S er den andel af programmet, der **skal** køre serielt, og N er antal kerner, er\n\n**speedup ≤ 1 / (S + (1 − S) / N)**\n\nEksempel: S = 25 %, N = 2 → 1 / (0,25 + 0,375) = **1,6×**. Med uendeligt mange kerner: 1 / 0,25 = **4×**. Mere kan man aldrig få.\n\nI praksis er det værre: oprettelse af tråde, synkronisering og lock contention koster også. Udfordringerne ved multicore-programmering er at dele opgaven op, dele data, afhængigheder mellem data samt test og debugging.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Et program har 10 % seriel kode. Hvad er den maksimale speedup med uendeligt mange kerner?',
      svar: [
        'Uendelig',
        '1,1×',
        '90×',
        '10×'
      ],
      rigtigt: 3,
      forklaring: 'Når N → ∞, går (1 − S)/N mod 0, og speedup → 1/S = 1/0,1 = 10.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Brugertråde skal mappes til kernetråde. Hvordan de mappes, afgør alt.',
      body: '**Many-to-one**: mange brugertråde på én kernetråd. Blokerer én tråd i et system call, blokerer alle, og der er ingen ægte parallelitet.\n\n**One-to-one**: hver brugertråd er en kernetråd. Det er ægte parallelt og bruges af **Linux** (NPTL) og Windows. Prisen er kerneressourcer pr. tråd.\n\n**Many-to-many**: M brugertråde fordeles på N kernetråde.\n\n**Fork-join**: hovedtråden deler opgaven op, starter tråde (fork), venter på dem (join) og samler resultatet. Fx at summere et stort array med 4 tråde, hver med sin del.\n\n**thread_local**: `thread_local int x;` giver hver tråd sin egen kopi. Globale og statiske variabler er **delte** og kræver synkronisering. Lokale variabler ligger på trådens egen stak.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvilken threading model bruger Linux?',
      svar: [
        'Two-level',
        'Many-to-many',
        'Many-to-one',
        'One-to-one'
      ],
      rigtigt: 3,
      forklaring: 'Linux\' NPTL mapper hver pthread/std::thread til én kernetråd (en task, oprettet med clone).',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Den korteste opgave først giver den laveste ventetid. Men ingen kender fremtiden.',
      body: '**Kriterier**: CPU utilization og throughput (maksimeres). Turnaround time, waiting time og response time (minimeres).\n\n**FCFS**: først til mølle. Simpel, men giver **convoy effect**: korte jobs venter bag et langt.\n\n**SJF**: korteste CPU-burst først. Giver **optimal** gennemsnitlig ventetid, men burst-længden skal forudsiges (eksponentielt gennemsnit).\n\n**Round Robin**: hver proces får et **time quantum**, derefter bagerst i køen. God response time. Er quantum for lille, bliver context switch-overhead stor. Er det for stort, bliver det FCFS.\n\n**Priority**: højeste prioritet først. Risiko for **starvation**, som løses med **aging** (prioriteten stiger med ventetid).\n\n**Multilevel queue**: separate køer, fx interaktiv og batch.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad sker der med Round Robin, hvis time quantum er meget stort?',
      svar: [
        'Den bliver til SJF',
        'Context switch-overhead eksploderer',
        'Den bliver til FCFS',
        'Den giver starvation'
      ],
      rigtigt: 2,
      forklaring: 'Når ingen proces bruger hele sit quantum, kører alle færdig i ankomstrækkefølge, altså FCFS. For lille quantum giver derimod meget overhead.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'nice 19 er høflig. SCHED_FIFO 99 er diktator.',
      body: 'Linux har to slags scheduling-politikker.\n\n**Normal** (`SCHED_OTHER`): håndteres af **CFS**, i nyere kerner **EEVDF**. Den fordeler CPU-tid retfærdigt efter **nice-værdi** fra **-20** (meget CPU) til **19** (lidt CPU). Lavere nice betyder højere prioritet.\n\n**Real-time**: `SCHED_FIFO` og `SCHED_RR` med **statisk prioritet 1-99**. En klar real-time-tråd kører **altid** før normale tråde. FIFO kører, indtil den blokerer eller giver op. RR har et time quantum mellem tråde med samme prioritet.\n\nFra C++ bruger man den underliggende pthread:\n\n`sched_param p; p.sched_priority = 50;`\n`pthread_setschedparam(t.native_handle(), SCHED_FIFO, &p);`\n\nDet kræver typisk root eller CAP_SYS_NICE. En runaway FIFO-tråd kan fastlåse en kerne.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvordan giver du en std::thread real-time-prioritet på Linux?',
      svar: [
        'Ved at kalde nice(-20) som det første inde i tråden',
        'pthread_setschedparam på trådens native_handle()',
        'Det kan slet ikke lade sig gøre fra C++ på Linux',
        'Med medlemsfunktionen std::thread::set_priority(99)'
      ],
      rigtigt: 1,
      forklaring: 'std::thread har intet prioritets-API, men native_handle() giver pthread_t. nice påvirker kun normal (CFS) scheduling, ikke real-time.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k1',
      sporgsmal: 'Hvad udskrives?',
      kode: 'int counter = 0;\nvoid work() {\n  for (int i = 0; i < 100000; ++i) ++counter;\n}\nint main() {\n  std::thread a(work), b(work);\n  a.join(); b.join();\n  std::cout << counter;\n}',
      svar: [
        'Altid 200000, fordi begge tråde tæller færdig',
        'Programmet crasher altid med en segmentation fault',
        'Altid 100000, fordi den ene tråd overskriver',
        'Et tal ≤ 200000, der varierer fra kørsel til kørsel'
      ],
      rigtigt: 3,
      forklaring: '++counter er læs-læg til-skriv. Uden lås kan opdateringer gå tabt. Formelt er det en data race og dermed udefineret opførsel. Løsning: std::mutex eller std::atomic<int>.',
    },
    {
      id: 'kode2', type: 'quiz', efter: 'k3',
      sporgsmal: 'To tråde kører f(1) og f(2) samtidig. Kan tråden med v = 1 udskrive 2?',
      kode: 'thread_local int id = 0;\nvoid f(int v) {\n  id = v;\n  std::this_thread::sleep_for(10ms);\n  std::cout << id;\n}',
      svar: [
        'Kompileringsfejl',
        'Kun hvis tråden kører på samme kerne',
        'Ja, id er global',
        'Nej, hver tråd har sin egen id'
      ],
      rigtigt: 3,
      forklaring: 'thread_local giver én instans pr. tråd. Uden thread_local ville det være en race.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Flere tråde gør altid et program hurtigere på en multicore-CPU.',
      rigtigt: 0,
      forklaring: 'Myte. Amdahl begrænser gevinsten via den serielle andel. Trådoprettelse, context switches, lock contention og cache-effekter kan gøre et program med flere tråde langsommere.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar Amdahl\'s law med et regneeksempel.',
      punkter: [
        { tekst: 'Formel: speedup ≤ 1 / (S + (1−S)/N)', ord: ['1/', 's +', 'formel', 'speedup'] },
        { tekst: 'S er den serielle andel, N antal kerner', ord: ['seriel', 'kerner', 'cores'] },
        { tekst: 'Regneeksempel, fx S = 25 %, N = 2 → 1,6×', ord: ['eksempel', '1,6', '25'] },
        { tekst: 'Grænse 1/S når N går mod uendelig', ord: ['uendelig', '1/s', 'grænse'] },
        { tekst: 'Overhead og synkronisering gør det værre i praksis', ord: ['overhead', 'synkronis', 'praksis'] },
      ],
    },
    {
      id: 'f2', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar scheduling-kriterierne, og sammenlign FCFS, SJF og Round Robin.',
      punkter: [
        { tekst: 'Kriterier: utilization, throughput, turnaround, waiting og response time', ord: ['throughput', 'turnaround', 'waiting', 'response', 'utilization'] },
        { tekst: 'FCFS: simpel, convoy effect', ord: ['fcfs', 'convoy', 'først'] },
        { tekst: 'SJF: optimal gennemsnitlig ventetid, kræver forudsigelse af burst', ord: ['sjf', 'shortest', 'optimal', 'burst'] },
        { tekst: 'Round Robin: time quantum, god response time', ord: ['round robin', 'quantum', 'rr'] },
        { tekst: 'Priority scheduling: starvation og aging', ord: ['priority', 'starvation', 'aging'] },
      ],
    },
    {
      id: 'f3', type: 'forklar', efter: 'k5',
      sporgsmal: 'Hvordan prioriteres tråde i Linux, og hvordan sætter du prioriteten fra C++?',
      punkter: [
        { tekst: 'Normale tråde: CFS/EEVDF med nice -20 til 19', ord: ['cfs', 'nice', 'sched_other', 'eevdf'] },
        { tekst: 'Real-time: SCHED_FIFO og SCHED_RR med prioritet 1-99', ord: ['sched_fifo', 'sched_rr', 'real-time', '99'] },
        { tekst: 'Real-time kører altid før normale tråde', ord: ['altid', 'før', 'preempt'] },
        { tekst: 'native_handle() + pthread_setschedparam', ord: ['native_handle', 'pthread_setschedparam'] },
        { tekst: 'Kræver rettigheder (root/CAP_SYS_NICE)', ord: ['root', 'rettighed', 'cap_sys_nice', 'sudo'] },
      ],
    },
  ],
};
