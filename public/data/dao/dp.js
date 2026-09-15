// Del og hersk, grådighed og dynamisk programmering.
export default {
  spor: {
    id: 'dp', nr: 0, titel: 'Del og hersk, grådighed og DP', kort: 'DP', emoji: '🧗',
    farve: '#8E2DE2', gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Del problemet, løs delene, sæt dem sammen. Master-sætningen fortæller prisen.',
      body: '**Del og hersk**: del problemet i **uafhængige** delproblemer, løs dem rekursivt og kombinér.\n\nKøretiden beskrives med en **rekursionsligning** T(n) = a · T(n/b) + f(n): a delproblemer af størrelse n/b og f(n) arbejde med at dele og samle.\n\n**Master-sætningen** sammenligner f(n) med n^(log_b a):\n• f vokser **langsommere** → T(n) = Θ(n^(log_b a))\n• **lige** hurtigt → T(n) = Θ(n^(log_b a) · log n)\n• f vokser **hurtigere** (og opfylder regularitetsbetingelsen) → T(n) = Θ(f(n))\n\nEksempler:\n**Merge sort**: T(n) = 2T(n/2) + n. log₂2 = 1, f = n: lige → **Θ(n log n)**.\n**Binær søgning**: T(n) = T(n/2) + 1. log₂1 = 0, f = 1 = n⁰: lige → **Θ(log n)**.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad giver master-sætningen for T(n) = 2T(n/2) + n?',
      svar: ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(log n)'],
      rigtigt: 1,
      forklaring: 'n^(log₂2) = n, og f(n) = n vokser lige så hurtigt. Midter-tilfældet giver Θ(n log n), som merge sort.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Naiv rekursiv Fibonacci regner fib(2) over 46.000 gange for at finde fib(25). DP gør det én gang.',
      body: '**Dynamisk programmering (DP)** virker, når et problem har:\n**1. Optimal delstruktur**: en optimal løsning er bygget af optimale løsninger til delproblemer.\n**2. Overlappende delproblemer**: de samme delproblemer dukker op igen og igen.\n\nDet er forskellen fra del og hersk, hvor delproblemerne er **uafhængige**.\n\nNaiv `fib(n) = fib(n−1) + fib(n−2)` løser de samme delproblemer eksponentielt mange gange: ~φⁿ kald.\n\nTo måder at undgå det:\n**Memoization (top-down)**: rekursion + cache. Første gang et delproblem løses, gemmes svaret.\n**Tabulation (bottom-up)**: fyld en tabel fra de mindste delproblemer og op. Ingen rekursion, ofte mindre overhead.\n\nBegge gør Fibonacci til **O(n)**. Og da kun de to seneste værdier skal bruges, kan pladsen reduceres til O(1).',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvilken egenskab adskiller et DP-problem fra et typisk del og hersk-problem?',
      svar: ['Rekursion', 'Overlappende delproblemer', 'At input er sorteret', 'At det kører i O(n log n)'],
      rigtigt: 1,
      forklaring: 'Merge sort deler i uafhængige halvdele. I DP-problemer går de samme delproblemer igen, så det betaler sig at huske svarene.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Rygsæk, redigeringsafstand, længste fælles delsekvens: samme opskrift, forskellig tabel.',
      body: 'DP-opskriften:\n**1.** Definér delproblemet: hvad betyder en celle i tabellen?\n**2.** Find **rekursionen**: hvordan følger en celle af mindre celler?\n**3.** Basistilfælde.\n**4.** Fyldningsrækkefølge, og hvor svaret står.\n\n**0/1-knapsack**: n genstande med vægt wᵢ og værdi vᵢ, kapacitet W.\n`K[i][c]` = bedste værdi med de første i genstande og kapacitet c.\n`K[i][c] = max(K[i−1][c], vᵢ + K[i−1][c − wᵢ])` (hvis wᵢ ≤ c). Tid **O(n · W)**.\n\nBemærk: O(n · W) er **pseudo-polynomiel**. W er et tal, og dets størrelse i bits er log W. Knapsack er NP-hårdt, men DP\'en er hurtig, når W er lille.\n\n**LCS** (længste fælles delsekvens) af strenge med længde n og m: O(n · m) tabel. Bruges i `diff` og git.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvorfor kaldes knapsack-DP\'en O(n·W) for pseudo-polynomiel?',
      svar: [
        'Fordi den kun virker for små n',
        'Fordi W er en talværdi, og køretiden er eksponentiel i antallet af bits, der skal til for at skrive W',
        'Fordi den bruger rekursion',
        'Fordi den giver et omtrentligt svar',
      ],
      rigtigt: 1,
      forklaring: 'Input-størrelsen for W er log W bits. O(W) = O(2^(bits)). Derfor er knapsack stadig NP-hårdt.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Grådighed er at tage det bedste lige nu. Nogle gange er det perfekt. Nogle gange er det dumt.',
      body: 'En **grådig algoritme** træffer det lokalt bedste valg i hvert skridt og fortryder aldrig.\n\nDen er korrekt, når problemet har **greedy choice property**: der findes en optimal løsning, der starter med det grådige valg. Eksempler, hvor det holder: **Dijkstra**, **Kruskal**, **Prim**, **Huffman**, **activity selection** (vælg altid den aktivitet, der slutter først).\n\nEksempel, hvor det fejler: **byttepenge** med mønterne {1, 3, 4} og beløbet 6.\nGrådigt: 4 + 1 + 1 = **3 mønter**.\nOptimalt: 3 + 3 = **2 mønter**.\n\nDP løser byttepenge korrekt: `C[x] = 1 + min over mønter m ≤ x af C[x − m]`.\n\nTommelfingerregel: grådighed er hurtig og simpel, men **bevis** den (fx med et exchange-argument), eller brug DP.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Mønter {1, 3, 4}, beløb 6. Hvor mange mønter bruger den grådige algoritme, og hvad er optimum?',
      svar: ['Grådig 2, optimum 2', 'Grådig 3, optimum 2', 'Grådig 3, optimum 3', 'Grådig 2, optimum 3'],
      rigtigt: 1,
      forklaring: 'Grådig tager 4, derefter 1 + 1. Optimum er 3 + 3. Grådighed virker for danske mønter, men ikke for alle møntsystemer.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k2',
      sporgsmal: 'Hvad er køretiden?',
      kode: 'std::unordered_map<int, long> memo;\nlong fib(int n) {\n  if (n < 2) return n;\n  if (memo.count(n)) return memo[n];\n  return memo[n] = fib(n - 1) + fib(n - 2);\n}',
      svar: ['O(2ⁿ)', 'O(n) (forventet)', 'O(n log n)', 'O(1)'],
      rigtigt: 1,
      forklaring: 'Hvert n beregnes kun én gang og derefter slås op (forventet O(1) i hashmap). Uden memo ville det være eksponentielt.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'Hvis en grådig algoritme giver det rigtige svar på alle dine testeksempler, er den korrekt.',
      rigtigt: 0,
      forklaring: 'Myte. Byttepenge med {1, 3, 4} virker på mange beløb, men fejler på 6. Grådighed skal bevises, fx med et exchange-argument.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k3',
      sporgsmal: 'Sæt trinene i at designe en DP-løsning i rækkefølge',
      trin: [
        'Tjek for optimal delstruktur og overlappende delproblemer',
        'Definér hvad en tabelcelle betyder',
        'Opstil rekursionen mellem celler',
        'Fastlæg basistilfælde',
        'Vælg fyldningsrækkefølge og find svaret i tabellen',
      ],
      forklaring: 'Den svære del er trin 2. Når delproblemet er defineret rigtigt, følger rekursionen ofte naturligt.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k4',
      sporgsmal: 'Sammenlign del og hersk, grådige algoritmer og dynamisk programmering.',
      punkter: [
        { tekst: 'Del og hersk: uafhængige delproblemer, fx merge sort', ord: ['del og hersk', 'uafhængig', 'merge sort'] },
        { tekst: 'Master-sætningen til køretid', ord: ['master', 'rekursionsligning'] },
        { tekst: 'DP: optimal delstruktur + overlappende delproblemer', ord: ['overlap', 'delstruktur', 'dp', 'dynamisk'] },
        { tekst: 'Memoization vs tabulation', ord: ['memo', 'tabul', 'bottom-up', 'top-down'] },
        { tekst: 'Grådig: lokalt bedste valg, skal bevises', ord: ['grådig', 'greedy', 'lokal', 'bevis'] },
        { tekst: 'Eksempel hvor grådig fejler (byttepenge)', ord: ['byttepenge', 'mønt', 'coin'] },
      ],
    },
  ],
};
