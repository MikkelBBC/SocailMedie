// Videoer fra kurset. Filerne ligger i public/video/ og afspilles direkte i feedet.
// Et videokort er ikke en prøve – men quizzen lige efter er, så man ser efter noget
// bestemt i stedet for bare at lade den køre (Mayers »signalering«).
export default [
  {
    id: 'video-hanoi', type: 'video', spor: 'dp', efter: 'dp-k1',
    titel: 'Hanois gyldne diske',
    fil: 'hanoi.mp4', plakat: 'hanoi.jpg', laengde: '7 min',
    hook: 'Rekursion forklaret med et 585 milliarder år langt puslespil.',
    punkter: [
      'De fire skridt: definér problemet, find base case, kald rekursivt, sikr fremdrift',
      'Hvorfor 64 diske tager 2⁶⁴−1 træk',
      'At det mindre problem har præcis samme form som det store',
    ],
  },
  {
    id: 'video-hanoiq', type: 'quiz', om: 'video-hanoi',
    sporgsmal: 'Hvad sikrer, at en rekursiv funktion ikke kører i ring for evigt?',
    svar: [
      'At den kalder sig selv færrest muligt gange',
      'At hvert kald kommer tættere på et base case',
      'At den altid returnerer en værdi til sidst',
      'At problemet kan deles i præcis to halvdele',
    ],
    rigtigt: 1,
    forklaring: 'Base case stopper rekursionen, men kun fremdrift sikrer, at man når derhen. Uden fremdrift løber stakken fuld.',
  },
  {
    id: 'video-hash', type: 'video', spor: 'algodat', efter: 'algodat-a2',
    titel: 'Hvordan O(1)-løftet virker',
    fil: 'hashtabeller.mp4', plakat: 'hashtabeller.jpg', laengde: '9 min',
    hook: 'Hashtabeller, kollisioner og forskellen på forventet og amortiseret tid.',
    punkter: [
      'Hvordan en nøgle bliver til en plads i et array',
      'Linear probing løser kollisioner, men laver primær klyngedannelse',
      'Forventet tid (over en fordeling) er ikke det samme som amortiseret tid (spredt over mange kald)',
    ],
  },
  {
    id: 'video-hashq', type: 'quiz', om: 'video-hash',
    sporgsmal: 'Hvad er forskellen på forventet og amortiseret køretid?',
    svar: [
      'Forventet gælder kun for hashtabeller og maps',
      'Forventet er et gennemsnit over tilfældighed',
      'Forventet er altid hurtigere end amortiseret',
      'De to ord betyder præcis det samme i praksis',
    ],
    rigtigt: 1,
    forklaring: 'Forventet tid bygger på en fordeling (fx en god hashfunktion). Amortiseret tid er en garanti over en række operationer, fx at en dyr udvidelse af et array deles ud over mange indsættelser.',
  },
  {
    id: 'video-hashq2', type: 'quiz', om: 'video-hash',
    sporgsmal: 'Hvad er primær klyngedannelse ved linear probing?',
    svar: [
      'At tabellen efterhånden bliver fyldt helt op',
      'At de optagne pladser klumper sig sammen',
      'At to nøgler får præcis samme hashværdi',
      'At nøglerne fordeler sig helt jævnt i tabellen',
    ],
    rigtigt: 1,
    forklaring: 'Når man lægger elementet på næste ledige plads, vokser klumperne: jo længere en klump er, jo større er chancen for at ramme den, og så bliver den endnu længere.',
  },
];
