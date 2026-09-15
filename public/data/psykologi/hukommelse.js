// Hukommelse og indlæring – forskningen bag selve appen.
export default {
  spor: {
    id: 'hukommelse', nr: 0, titel: 'Sådan husker hjernen', kort: 'Hukommelse', emoji: '💡',
    farve: '#7F53AC', gradient: 'linear-gradient(135deg, #647DEE 0%, #7F53AC 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Du glemmer det meste inden for et døgn. Det er ikke en fejl – det er et filter.',
      body: 'I 1880\'erne lærte Hermann Ebbinghaus lister af meningsløse stavelser og målte, hvor meget der var tilbage efter timer og dage. Resultatet blev **glemselskurven**: tabet er **stejlest lige efter** indlæringen og flader derefter ud.\n\nHan målte med **savings**: hvor meget hurtigere man lærer noget igen. Selv »glemt« viden efterlader spor, der gør genlæring hurtigere.\n\nGlemsel er ikke bare forfald. Hjernen prioriterer det, der ser ud til at blive brugt igen. Hver gang du **henter** noget frem, er det et signal om, at det er vigtigt, og kurven bliver fladere.\n\nDet er præcis det, spaced repetition udnytter: gentag lige før du glemmer, og intervallerne kan blive længere og længere.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvornår glemmer man mest ifølge glemselskurven?',
      svar: ['Jævnt over flere uger', 'Kort tid efter indlæringen', 'Først efter en måned', 'Kun når man sover'],
      rigtigt: 1,
      forklaring: 'Kurven er stejlest i begyndelsen og flader ud. Derfor er den første gentagelse vigtigst at få tidligt.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'At læse noten igen føles effektivt. At lukke den og prøve at huske ER effektivt.',
      body: 'Roediger og Karpicke (2006) samlede årtiers forskning i **testing effect**: at hente information frem fra hukommelsen styrker den mere end at studere den igen.\n\nForklaringen er, at hentning **ændrer** sporet. Det bliver lettere at finde næste gang, fordi du har øvet præcis den handling, du skal bruge.\n\nGenlæsning giver en **fluency illusion**: teksten føles bekendt, og det forveksles med at kunne den. Studerende, der genlæser, er typisk **mere selvsikre og klarer sig dårligere** end dem, der tester sig selv.\n\nEn metaanalyse af 272 effektstørrelser fandt, at practice testing slog genlæsning og alle andre sammenligninger. Effekten var størst, når øve-formatet lignede den endelige test.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor føles genlæsning mere effektivt, end det er?',
      svar: [
        'Fordi det faktisk er den bedste metode',
        'Fordi bekendthed forveksles med at kunne hente det frem (fluency illusion)',
        'Fordi det tager længere tid',
        'Fordi hukommelsen virker bedst om aftenen',
      ],
      rigtigt: 1,
      forklaring: 'Teksten foran dig føles let. Til eksamen er teksten der ikke, og det er hentningen, der skal virke.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Samme antal timer, fordelt anderledes, giver dobbelt så meget tilbage.',
      body: '**Spacing effect**: den samme mængde øvelse spredt over flere sessioner giver langt bedre langtidshukommelse end det hele på én gang (**massed practice**, altså tjapperi aftenen før).\n\nHvor stor skal pausen være? I et stort studie (Cepeda m.fl. 2008) var den bedste pause omtrent **10-20 % af den tid, man skal huske det**. Skal du huske noget om en uge, gentag efter ca. en dag. Om et år, gentag efter nogle uger.\n\n**Interleaving**: bland forskellige typer opgaver i stedet for at tage én type ad gangen. Det føles sværere og giver lavere score undervejs, men bedre resultater senere, fordi du øver at **vælge** den rigtige metode.\n\nBjork kalder den slags **desirable difficulties**: besværlighed, der gør læringen mere holdbar.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Du har eksamen om 30 dage. Omtrent hvor lang pause mellem gentagelserne gav bedst hukommelse i Cepeda-studiet?',
      svar: ['1 time', '3-6 dage', '25 dage', 'Pausen er ligegyldig'],
      rigtigt: 1,
      forklaring: '10-20 % af 30 dage er 3-6 dage. For kort pause giver tjapperi-effekten, for lang betyder at man starter forfra.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Din arbejdshukommelse har plads til omkring fire ting. Resten er tricks.',
      body: '**Arbejdshukommelsen** er det mentale skrivebord, hvor du holder og bearbejder information lige nu. Den er lille.\n\nMillers berømte »7 ± 2« (1956) er i dag justeret. Nelson Cowan (2001) argumenterer for, at kapaciteten er omkring **4 chunks**, når man forhindrer folk i at gentage og gruppere.\n\nTricket hedder **chunking**: at samle elementer til meningsfulde enheder. En skakmester ser ikke 20 brikker, men 4 kendte mønstre. En programmør læser `for (int i = 0; i < n; ++i)` som én chunk.\n\n**Cognitive load theory** (Sweller) bygger videre: læring går bedst, når unødig belastning fjernes, så pladsen bruges på det, der skal læres. Derfor virker korte kort bedre end lange tekster med alt på én gang.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvordan kan eksperter holde langt mere i hovedet end begyndere?',
      svar: [
        'De har større arbejdshukommelse',
        'De samler information i større meningsfulde chunks via viden i langtidshukommelsen',
        'De bruger kun visuel hukommelse',
        'De har lært at ignorere Millers regel',
      ],
      rigtigt: 1,
      forklaring: 'Kapaciteten er nogenlunde den samme. Eksperters chunks rummer bare meget mere, fordi langtidshukommelsen giver mønstrene.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'Den nat du ikke sover efter at have lært noget, betaler du for senere.',
      body: 'Hukommelse bliver ikke færdig i det øjeblik, du lærer. Den **konsolideres** bagefter, og **søvn** spiller en stor rolle.\n\nUnder **dyb søvn (slow-wave sleep)** genafspilles nyligt lærte mønstre, og information flyttes gradvist fra hippocampus til mere varig lagring i hjernebarken (Diekelmann & Born 2010).\n\nForsøg viser igen og igen, at en periode med søvn efter indlæring giver bedre hukommelse end samme tid vågen. Søvnmangel før indlæring gør det også sværere at lagre nyt.\n\nPraktisk betyder det, at en nat med tjapperi til kl. 4 bytter noget af morgendagens hukommelse for i aften. Kort øvning spredt over dage, med søvn imellem, arbejder **sammen** med hjernens egen konsolidering.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvad sker der med nyligt lærte ting under dyb søvn?',
      svar: [
        'De slettes for at gøre plads',
        'De genafspilles og konsolideres til mere varig hukommelse',
        'Ingenting – hukommelsen er slukket',
        'De flyttes til arbejdshukommelsen',
      ],
      rigtigt: 1,
      forklaring: 'Slow-wave sleep er forbundet med genafspilning og overførsel fra hippocampus til neocortex.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Man lærer bedst, når undervisningen passer til ens læringsstil (visuel, auditiv eller kinæstetisk).',
      rigtigt: 0,
      forklaring: 'Myte. Kontrollerede studier har ikke fundet, at det forbedrer læringen at matche undervisning til en »læringsstil«. Folk har præferencer, men de forudsiger ikke, hvad der virker. Det gør metoder som hentning og spacing.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k2',
      pastand: 'Vi husker 10 % af det, vi læser, og 90 % af det, vi underviser andre i.',
      rigtigt: 0,
      forklaring: 'Myte. »Læringspyramiden« har ingen empirisk kilde, og de runde procenttal er opfundet. At forklare for andre kan være effektivt, men ikke med de tal.',
    },
    {
      id: 'myte3', type: 'myte', efter: 'k5',
      pastand: 'Vi bruger kun 10 % af hjernen.',
      rigtigt: 0,
      forklaring: 'Myte. Hjerneskanninger viser aktivitet i stort set hele hjernen i løbet af et døgn, og skader næsten hvor som helst giver mærkbare følger.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k3',
      sporgsmal: 'Sæt en god læringsuge for et nyt emne i rækkefølge',
      trin: [
        'Dag 1: læs kort, og test dig selv med det samme',
        'Sov – konsolidering',
        'Dag 2: hent frem uden noter, ret fejl',
        'Dag 4: bland med andre emner (interleaving)',
        'Dag 7: forklar det højt uden hjælp',
      ],
      forklaring: 'Hentning tidligt, søvn imellem, voksende pauser og blanding. Det er spacing, testing og interleaving kombineret.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar de tre vigtigste forskningsbaserede læringsteknikker, og hvorfor de virker.',
      punkter: [
        { tekst: 'Retrieval practice / testing effect', ord: ['retrieval', 'hent', 'test', 'quiz'] },
        { tekst: 'Genlæsning giver fluency illusion', ord: ['genlæs', 'fluency', 'illusion', 'bekendt'] },
        { tekst: 'Spacing: spred øvning over tid', ord: ['spacing', 'spred', 'pause', 'interval'] },
        { tekst: 'Interleaving: bland opgavetyper', ord: ['interleav', 'bland'] },
        { tekst: 'Desirable difficulties: besvær kan styrke læring', ord: ['desirable', 'besvær', 'svær'] },
        { tekst: 'Søvn konsoliderer', ord: ['søvn', 'sove', 'konsolid'] },
      ],
    },
  ],
};
