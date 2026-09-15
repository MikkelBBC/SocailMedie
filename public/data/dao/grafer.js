// Grafer: repræsentation, BFS, DFS, korteste veje og MST.
export default {
  spor: {
    id: 'grafer', nr: 0, titel: 'Grafer og korteste veje', kort: 'Grafer', emoji: '🕸️',
    farve: '#00B4DB', gradient: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Et vejnet, et socialt netværk og dit build-system er den samme datastruktur.',
      body: 'En **graf** G = (V, E) består af **knuder** (V) og **kanter** (E). Kanter kan være **rettede** eller urettede, og **vægtede** eller ej.\n\nTo klassiske repræsentationer:\n\n**Adjacency list**: for hver knude en liste over naboer. Hukommelse **O(V + E)**. Godt til **sparse** grafer (få kanter), hvilket er de fleste virkelige grafer.\n\n**Adjacency matrix**: V × V-tabel med 1/vægt, hvor der er en kant. Hukommelse **O(V²)**. Tjek »er der en kant u→v?« på O(1). Godt til **dense** grafer.\n\nEt socialt netværk med en milliard brugere og ca. 200 venner pr. person er ekstremt sparse. En matrix ville kræve 10¹⁸ celler.\n\nEn **DAG** (directed acyclic graph) er en rettet graf uden cykler, fx afhængigheder i en Makefile.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'En graf har 1.000.000 knuder og 5.000.000 kanter. Hvilken repræsentation?',
      svar: ['Adjacency matrix – O(1) opslag', 'Adjacency list – grafen er sparse, O(V+E) hukommelse', 'Det er ligegyldigt', 'En sorteret liste af knuder'],
      rigtigt: 1,
      forklaring: 'En matrix ville bruge 10¹² celler. Listen bruger plads proportionalt med knuder + kanter.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'BFS spreder sig som ringe i vand. DFS løber ned ad én gang, til den rammer en mur.',
      body: '**BFS** (breadth-first search) bruger en **kø**. Den besøger først alle naboer, så naboernes naboer osv. Derfor finder BFS den **korteste vej målt i antal kanter** i en uvægtet graf.\n\n**DFS** (depth-first search) bruger en **stak**, eller rekursion. Den går så dybt som muligt og backtracker. DFS registrerer **discovery**- og **finish**-tider og kan finde **cykler** (en kant tilbage til en knude, der stadig er i gang).\n\nBegge kører i **O(V + E)** med adjacency list.\n\n**Topologisk sortering** af en DAG: kør DFS og list knuderne i **faldende finish-tid**. Resultatet er en rækkefølge, hvor alle kanter peger fremad. Det er præcis det, Make gør for at finde ud af, hvad der skal bygges først.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvilken algoritme finder den korteste vej (færrest kanter) i en uvægtet graf?',
      svar: ['DFS', 'BFS', 'Topologisk sortering', 'Kruskal'],
      rigtigt: 1,
      forklaring: 'BFS besøger knuder i lag efter afstand, så første gang en knude nås, er det via færrest mulige kanter.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Dijkstra er grådig – og det virker, lige indtil en kant koster negativt.',
      body: '**Dijkstra** finder korteste veje fra én kilde i en graf med **ikke-negative vægte**.\n\nIdé: hold en **prioritetskø** af knuder efter nuværende bedste afstand. Tag altid den nærmeste ud (**grådigt valg**). Dens afstand er nu endelig. **Relax** dens kanter: kan en nabo nås billigere via den, så opdatér.\n\nMed en binær heap: **O((V + E) log V)**.\n\nHvorfor ikke negative kanter? Dijkstra antager, at når en knude er taget ud, kan ingen senere vej blive kortere. En negativ kant kan bryde det.\n\n**Bellman-Ford** relaxer alle kanter V − 1 gange: **O(V · E)**. Den er langsommere, men håndterer negative vægte og kan **opdage negative cykler** (hvor »korteste vej« ikke findes).',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvornår kan Dijkstra give et forkert resultat?',
      svar: ['Når grafen er rettet', 'Når der er kanter med negativ vægt', 'Når grafen er meget stor', 'Når der er cykler med positive vægte'],
      rigtigt: 1,
      forklaring: 'Det grådige valg forudsætter, at en vej aldrig bliver kortere ved at gå længere. Negative kanter bryder det, og så skal man bruge Bellman-Ford.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Forbind alle byer med det billigste kabel. To grådige algoritmer, samme svar.',
      body: 'Et **minimum spanning tree (MST)** i en sammenhængende, vægtet, urettet graf er en delmængde af kanter, der forbinder **alle** knuder **uden cykler** med **minimal samlet vægt**.\n\n**Kruskal**: sortér kanterne efter vægt. Tilføj den billigste kant, der **ikke laver en cyklus**. Cyklustjekket laves med **union-find**. Tid **O(E log E)**.\n\n**Prim**: start i én knude og væks træet. Tilføj hele tiden den billigste kant fra træet til en ny knude, med en **prioritetskø**. Tid **O(E log V)** med binær heap.\n\nBegge er korrekte på grund af **cut property**: for enhver opdeling af knuderne i to grupper er den billigste kant på tværs med i et MST.\n\nMST er ikke det samme som korteste veje. Træet minimerer den **samlede** pris, ikke afstanden mellem to bestemte knuder.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad bruger Kruskal til effektivt at tjekke, om en kant laver en cyklus?',
      svar: ['BFS', 'En prioritetskø', 'Union-find (disjoint sets)', 'En adjacency matrix'],
      rigtigt: 2,
      forklaring: 'Union-find holder styr på komponenter. Er begge endepunkter i samme komponent, ville kanten lave en cyklus.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k2',
      sporgsmal: 'Hvilken rækkefølge besøger BFS knuderne i, startende i A (naboer i alfabetisk orden)?',
      kode: 'A: B, C\nB: D\nC: D, E\nD: F\nE: F\nF: -',
      svar: ['A B D F C E', 'A B C D E F', 'A C E F B D', 'A B C F D E'],
      rigtigt: 1,
      forklaring: 'Lag 0: A. Lag 1: B, C. Lag 2: D (fra B), E (fra C). Lag 3: F. DFS ville give A B D F C E.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'Et minimum spanning tree giver den korteste vej mellem alle par af knuder.',
      rigtigt: 0,
      forklaring: 'Myte. MST minimerer den samlede vægt af træet. Vejen mellem to knuder i træet kan være meget længere end den korteste vej i grafen.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k3',
      sporgsmal: 'Sæt trinene i Dijkstra i rækkefølge',
      trin: [
        'Sæt afstand til kilden = 0 og alle andre = ∞',
        'Læg alle knuder i en prioritetskø efter afstand',
        'Tag knuden med mindst afstand ud – dens afstand er endelig',
        'Relax hver udgående kant: opdatér naboens afstand, hvis den bliver kortere',
        'Gentag, til køen er tom',
      ],
      forklaring: 'Det grådige skridt er trin 3. Det er kun korrekt, fordi alle vægte er ikke-negative.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar forskellen på BFS, DFS og Dijkstra – hvad bruger de, og hvad kan de?',
      punkter: [
        { tekst: 'BFS bruger en kø, korteste vej i antal kanter', ord: ['bfs', 'kø', 'queue', 'antal kanter'] },
        { tekst: 'DFS bruger stak/rekursion, cykler og topologisk sortering', ord: ['dfs', 'stak', 'rekursion', 'topologisk', 'cykl'] },
        { tekst: 'Begge O(V + E)', ord: ['v + e', 'v+e', 'lineær'] },
        { tekst: 'Dijkstra: prioritetskø, grådig, vægtede grafer', ord: ['dijkstra', 'prioritetskø', 'grådig', 'vægt'] },
        { tekst: 'Dijkstra kræver ikke-negative vægte – ellers Bellman-Ford', ord: ['negativ', 'bellman'] },
      ],
    },
  ],
};
