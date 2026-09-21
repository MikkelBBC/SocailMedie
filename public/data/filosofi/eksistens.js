// Lommefilosofi: død, frihed, identitet og lykke.
export default {
  spor: {
    id: 'eksistens', nr: 0, titel: 'Livet, døden og alt det der', kort: 'Eksistens', emoji: '🌌',
    farve: '#5B247A', gradient: 'linear-gradient(135deg, #1BCEDF 0%, #5B247A 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: '»Hvor døden er, er jeg ikke. Hvor jeg er, er døden ikke.« Et 2.300 år gammelt argument mod dødsangst.',
      body: '**Epikur** (341-270 f.Kr.) ville befri mennesker fra frygt, og den største frygt var døden.\n\nHans argument i Brevet til Menoikeus:\n1. Alt godt og ondt består i **oplevelse**.\n2. Døden er **ophøret** af oplevelse.\n3. Altså er døden ikke noget ondt **for den døde**.\n\n»Døden er intet for os.« Når vi er her, er døden ikke. Når døden er her, er vi ikke.\n\nEpikuræeren **Lukrets** tilføjede **symmetri-argumentet**: Du var ikke bekymret for de milliarder af år **før** du blev født. Hvorfor så være bange for tiden **efter**?\n\nMange filosoffer har svaret igen. Thomas Nagel siger, at døden kan være ond, fordi den **fratager** os gode ting, vi ellers ville have oplevet, også selv om vi ikke er der til at savne dem.\n\nEpikur var i øvrigt ikke den festabe, »epikuræer« lyder som. Han anbefalede venner, enkel mad og ro i sindet.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er Lukrets\' symmetri-argument?',
      svar: [
        'At døden er smertefuld for både krop og sjæl',
        'At livet og døden varer nøjagtig lige længe',
        'At alle mennesker dør i nogenlunde samme alder',
        'Vi frygter ikke tiden før fødslen – hvorfor så efter?'
      ],
      rigtigt: 3,
      forklaring: 'Ikke-eksistens før fødslen og efter døden er symmetriske. Hvis den første ikke er skræmmende, hvorfor skulle den anden være det?',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Man må forestille sig Sisyfos lykkelig. Camus mente det alvorligt.',
      body: 'I græsk mytologi er **Sisyfos** dømt til at rulle en sten op ad et bjerg. Hver gang han når toppen, triller den ned igen. For evigt.\n\n**Albert Camus** brugte ham i 1942 som billede på det **absurde**: mennesket søger mening, men universet svarer ikke. Arbejde, spise, sove, arbejde. Hvorfor?\n\nCamus så tre mulige svar:\n• **Fysisk selvmord**: at give op. Det afviser han.\n• **Filosofisk selvmord**: at springe til en tro, der lover mening. Det kalder han at snyde.\n• **Oprør**: at se det absurde i øjnene og leve fuldt **alligevel**.\n\nSisyfos kender sin dom. I øjeblikket, hvor han går ned efter stenen, er han bevidst, og dermed over sin skæbne. »Kampen mod toppen er i sig selv nok til at fylde et menneskes hjerte. Man må forestille sig Sisyfos lykkelig.«\n\nNæste gang du øver de samme flashcards igen: stenen triller ned. Du ruller den op. Det er ikke meningsløst, hvis du selv vælger det.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er Camus\' svar på det absurde?',
      svar: [
        'At ignorere spørgsmålet og tænke på noget andet',
        'Oprør: at leve fuldt uden en færdig mening',
        'At give op og holde op med at lede efter mening',
        'At finde en religion, der leverer svaret'
      ],
      rigtigt: 1,
      forklaring: 'Camus afviser både at give op og at »springe« til en færdig mening. Oprøret er at leve intenst med det absurde.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'En saks er lavet til at klippe. Hvad er du lavet til? Ifølge Sartre: ingenting. Endnu.',
      body: '**Jean-Paul Sartre** sagde: **eksistensen går forud for essensen**.\n\nEn saks har en **essens** før den findes: nogen har tænkt »et redskab til at klippe« og så lavet den. Mennesker er omvendt. Vi **eksisterer** først og definerer bagefter, hvad vi er, gennem vores valg.\n\nDerfor er vi, siger Sartre, **dømt til frihed**. Selv at lade være med at vælge er et valg. Det giver **angst**: der er ingen manual, og du bærer ansvaret.\n\nMange flygter fra angsten ved at lade som om, de ikke er frie. Sartre kalder det **ond tro** (mauvaise foi). Hans eksempel er en tjener, der spiller »tjener« så perfekt, at han gør sig til en ting med en rolle, som om han ikke kunne være andet.\n\nModerne versioner: »Jeg er bare ikke en matematikperson.« »Sådan er jeg bare.«\n\nSartres modgift er ikke at alt er muligt. Du har en situation, en krop og en historie. Men inden for den er dine valg dine.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad mener Sartre med »ond tro«?',
      svar: [
        'At have en religiøs tro på noget højere',
        'At tro på noget, der viser sig at være forkert',
        'At være et ondt menneske over for andre',
        'At lade som om man ikke er fri, fx bag en rolle'
      ],
      rigtigt: 3,
      forklaring: 'Ond tro er selvbedrag om egen frihed: »sådan er jeg bare«, som om man var en ting med en fast essens.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Udskift hver planke i et skib én ad gangen. Er det stadig det samme skib? Er du?',
      body: '**Theseus\' skib** er et af filosofiens ældste tankeeksperimenter, beskrevet af Plutarch. Athenerne bevarede helten Theseus\' skib og udskiftede rådne planker, én ad gangen. Til sidst var ingen originale planker tilbage.\n\nEr det det samme skib?\n\n**Thomas Hobbes** gjorde det sværere: Hvad hvis nogen samlede alle de gamle planker og byggede et skib af dem? Hvilket af de to er så Theseus\' skib?\n\nSpørgsmålet handler om **identitet over tid**, og det handler om dig. Din krop udskifter løbende mange celler, dog ikke alle, fx de fleste nerveceller. Dine meninger, venner og minder ændrer sig. Er du den samme som som 8-årig?\n\n**John Locke** foreslog, at personlig identitet hænger sammen med **hukommelse og bevidsthed**, ikke med stof. Senere filosoffer, som Derek Parfit, har argumenteret for, at identitet måske slet ikke er et enten-eller, men et spørgsmål om grad af **sammenhæng**.\n\nDet er også et softwarespørgsmål: er det samme program, hvis hver linje er skrevet om?',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad knyttede John Locke personlig identitet til?',
      svar: [
        'Til hukommelse og bevidsthed',
        'Til kroppens stof og de samme atomer',
        'Til sjælens uforanderlige substans',
        'Til navnet og den rolle, man har'
      ],
      rigtigt: 0,
      forklaring: 'For Locke er du den samme person, så langt din bevidsthed og hukommelse rækker tilbage. Stoffet kan skifte.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'Du vinder i lotto. Et år senere? Mindre lykkelig end du tror.',
      body: '**Hedonisk tilpasning** betyder, at vi vænner os til både gode og dårlige forandringer. Den nye telefon, lønforhøjelsen, forelskelsen: glæden topper og falder så tilbage mod et **udgangspunkt**. Nogle kalder det **den hedoniske tredemølle**.\n\nI et berømt studie fra 1978 fandt **Brickman** og kolleger, at lotterivindere ikke var markant lykkeligere i hverdagen end en kontrolgruppe, og at de fik mindre glæde af små ting. Studiet var dog lille.\n\nNyere og meget større svenske data (Lindqvist, Östling og Cesarini 2020) nuancerer det: store gevinster gav en **varig** stigning i **livstilfredshed** mange år efter, men meget lidt effekt på den **daglige** stemning.\n\nSå penge betyder noget for, hvordan man vurderer sit liv, men den gode følelse af at vinde forsvinder hurtigt.\n\nDet er også grunden til, at spilleautomater og cases virker: gevinsten føles fantastisk i sekunder, tilpasningen sætter ind, og hjernen vil have **næste** hit. Oplevelser, relationer og variation tilpasser vi os langsommere til.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvad fandt de store svenske lotteristudier (Lindqvist m.fl. 2020)?',
      svar: [
        'At gevinster ikke gjorde nogen forskel overhovedet',
        'At vinderne endte med at blive mere deprimerede',
        'Varig højere livstilfredshed, men samme daglige humør',
        'At vinderne var lykkeligere hver dag resten af livet'
      ],
      rigtigt: 2,
      forklaring: 'Livsvurdering og daglig følelse er to forskellige ting. Den daglige glæde tilpasser sig, vurderingen af livet ændrede sig mere varigt.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Epikur anbefalede et liv med fest, luksus og så meget nydelse som muligt.',
      rigtigt: 0,
      forklaring: 'Myte. Epikur mente, at det gode liv var fravær af smerte og uro: venner, enkel mad, refleksion. Overdreven luksus giver mere uro, ikke mindre.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k5',
      pastand: 'Glæden ved en gevinst eller et nyt køb falder ofte tilbage mod udgangspunktet efter noget tid.',
      rigtigt: 1,
      forklaring: 'Fakta. Det er hedonisk tilpasning. Den daglige glæde tilpasser sig ofte hurtigt, også selv om livstilfredsheden kan ændre sig mere varigt ved store forandringer.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar Camus\' og Sartres svar på, hvordan man kan leve et meningsfuldt liv uden en færdig mening.',
      punkter: [
        { tekst: 'Det absurde: vi søger mening, universet svarer ikke', ord: ['absurd', 'mening', 'univers'] },
        { tekst: 'Sisyfos og oprøret: leve fuldt alligevel', ord: ['sisyfos', 'oprør', 'sten'] },
        { tekst: 'Eksistensen går forud for essensen', ord: ['eksistens', 'essens'] },
        { tekst: 'Dømt til frihed – valg og ansvar', ord: ['frihed', 'valg', 'ansvar'] },
        { tekst: 'Ond tro: at lade som om man ikke er fri', ord: ['ond tro', 'mauvaise', 'rolle', 'tjener'] },
      ],
    },
  ],
};
