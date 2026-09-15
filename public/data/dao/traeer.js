// Træer, heaps og union-find.
export default {
  spor: {
    id: 'traeer', nr: 0, titel: 'Træer, heaps og prioritetskøer', kort: 'Træer', emoji: '🌲',
    farve: '#56AB2F', gradient: 'linear-gradient(135deg, #56AB2F 0%, #A8E063 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Et binært søgetræ er O(log n). Giv det sorteret input, og det bliver en linked list.',
      body: 'I et **binært søgetræ (BST)** gælder for hver knude: alt i venstre undertræ er **mindre**, alt i højre er **større**.\n\nSøgning, indsættelse og sletning koster **O(h)**, hvor h er træets **højde**.\n\nEr træet pænt afbalanceret, er h ≈ log n. Men indsæt 1, 2, 3, …, n i et naivt BST, og hver ny knude bliver højre barn af den forrige. Træet degenererer til en **kæde**: h = n, og alt koster **O(n)**.\n\nDet er præcis samme fælde som quicksort med sorteret input.\n\n**Selvbalancerende træer** retter det op med **rotationer** efter indsættelse og sletning:\n• **AVL**: højdeforskel mellem undertræer højst 1.\n• **Rød-sort træ**: løsere regler, færre rotationer. Bruges i `std::map` og Linux\' CFS-scheduler.\n\nBegge garanterer **O(log n)**.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Du indsætter tallene 1 til 1000 i rækkefølge i et naivt binært søgetræ. Hvad bliver højden?',
      svar: ['Ca. 10', '1000', '500', 'Ca. 32'],
      rigtigt: 1,
      forklaring: 'Hvert tal er større end alle tidligere, så det lander som højre barn af det forrige. Træet bliver en kæde med højde n.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'En heap er et træ, der gemmer sig i et array – uden en eneste pointer.',
      body: 'En **binær min-heap** er et **komplet** binært træ, hvor hver knude er **≤ sine børn**. Det mindste element ligger altid i roden.\n\nFordi træet er komplet, kan det gemmes i et **array**: for index i er børnene **2i + 1** og **2i + 2**, og forælderen **(i − 1) / 2**. Ingen pointere og god cache-lokalitet.\n\n**insert**: læg nederst og **sift up** (byt med forælder, så længe den er større). **O(log n)**.\n**extract-min**: tag roden, flyt sidste element op og **sift down**. **O(log n)**.\n**peek**: O(1).\n\n**build-heap** fra et usorteret array kan gøres i **O(n)**, ikke O(n log n), ved at sifte ned nedefra og op.\n\n**Heapsort**: build-heap + n × extract giver O(n log n) in-place, men ikke stabil.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'I en array-baseret binær heap: hvor er børnene af elementet på index 3?',
      svar: ['Index 4 og 5', 'Index 6 og 7', 'Index 7 og 8', 'Index 1 og 2'],
      rigtigt: 2,
      forklaring: '2·3 + 1 = 7 og 2·3 + 2 = 8 (0-indekseret).',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Den vigtigste først. Samme abstraktion i Dijkstra, en OS-scheduler og din to-do-liste.',
      body: 'En **prioritetskø** er en abstrakt datatype: `insert(x, prioritet)` og `extract-max`/`extract-min`. Heapen er den typiske implementering.\n\nDen dukker op overalt:\n• **Dijkstra** og **Prim**: næste knude med mindst afstand.\n• **Scheduling**: priority scheduling og SJF i et OS vælger den mest presserende proces.\n• **Event-simulering**: næste hændelse i tid.\n• **Huffman-kodning**: kombinér de to mindst hyppige.\n• **Top-k**: find de k største af en strøm med en heap af størrelse k, O(n log k).\n\nI C++: `std::priority_queue<T>` er en **max**-heap som standard. Til min-heap: `std::priority_queue<T, std::vector<T>, std::greater<T>>`.\n\n`decrease-key` (at gøre et element vigtigere) understøttes ikke direkte af std::priority_queue. I Dijkstra indsætter man derfor ofte bare igen og ignorerer forældede elementer.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad giver `std::priority_queue<int>` som standard ved top()?',
      svar: ['Det mindste element', 'Det største element', 'Det først indsatte element', 'Et tilfældigt element'],
      rigtigt: 1,
      forklaring: 'Standard er std::less, hvilket giver en max-heap. Brug std::greater<int> for en min-heap.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Er de to i samme gruppe? Svaret tager næsten konstant tid – takket være to små tricks.',
      body: '**Union-find** (disjoint sets) holder styr på en opdeling af elementer i grupper:\n`find(x)` giver gruppens repræsentant, og `union(x, y)` slår to grupper sammen.\n\nHver gruppe er et træ, hvor hvert element peger på sin forælder. Roden er repræsentanten.\n\nNaivt kan træerne blive høje. To tricks:\n**Union by rank/size**: hæng altid det mindste træ under det største.\n**Path compression**: under find sættes alle besøgte knuder til at pege direkte på roden.\n\nMed begge bliver den amortiserede tid pr. operation **O(α(n))**, hvor α er den inverse Ackermann-funktion. Den er **≤ 4 for alle praktiske n**, altså reelt konstant.\n\nBrug: **Kruskals MST**, opdage om to knuder er forbundet, billedsegmentering og netværksforbindelser.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad gør path compression i union-find?',
      svar: [
        'Sletter elementer, der ikke bruges',
        'Lader alle knuder på find-vejen pege direkte på roden',
        'Sorterer elementerne',
        'Hænger det største træ under det mindste',
      ],
      rigtigt: 1,
      forklaring: 'Næste find på de knuder bliver O(1). Kombineret med union by rank giver det nær-konstant amortiseret tid.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k2',
      sporgsmal: 'Min-heap som array. Du kalder extract-min. Hvordan ser arrayet ud bagefter?',
      kode: '[1, 3, 2, 7, 4, 5]',
      svar: ['[2, 3, 5, 7, 4]', '[3, 2, 5, 7, 4]', '[2, 3, 4, 7, 5]', '[5, 3, 2, 7, 4]'],
      rigtigt: 0,
      forklaring: 'Fjern 1, flyt sidste (5) til roden: [5,3,2,7,4]. Sift down: byt med mindste barn (2) → [2,3,5,7,4]. 5 har ingen børn nu (index 2 → 5 og 6 findes ikke). Færdig.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'At bygge en heap af n usorterede elementer koster O(n log n).',
      rigtigt: 0,
      forklaring: 'Myte. Med bottom-up build-heap (sift down fra sidste forælder til roden) er det O(n), fordi de fleste knuder ligger nederst og kun skal sifte få niveauer.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar en binær heap, dens operationer og hvor prioritetskøer bruges.',
      punkter: [
        { tekst: 'Komplet binært træ med heap-egenskab (forælder ≤ børn)', ord: ['komplet', 'heap-egenskab', 'forælder', 'børn'] },
        { tekst: 'Gemmes i array: børn på 2i+1 og 2i+2', ord: ['array', '2i'] },
        { tekst: 'insert (sift up) og extract-min (sift down) i O(log n)', ord: ['sift', 'log n', 'insert', 'extract'] },
        { tekst: 'build-heap i O(n)', ord: ['build', 'o(n)'] },
        { tekst: 'Bruges i Dijkstra, Prim, scheduling og top-k', ord: ['dijkstra', 'prim', 'schedul', 'top-k'] },
      ],
    },
  ],
};
