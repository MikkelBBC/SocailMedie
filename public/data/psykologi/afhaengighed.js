// Sådan virker afhængighed – dopamin, forstærkning, tolerance og vaner.
export default {
  spor: {
    id: 'afhaengighed', nr: 0, titel: 'Sådan virker afhængighed', kort: 'Afhængighed', emoji: '🎰',
    farve: '#E1306C', gradient: 'linear-gradient(135deg, #F857A6 0%, #FF5858 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Dopamin er ikke lykkestoffet. Det er »det her er vigtigt, gør det igen«-stoffet.',
      body: 'I 1990\'erne målte Wolfram Schultz på dopamin-neuroner hos aber. Første gang aben fik uventet juice, fyrede neuronerne kraftigt.\n\nMen efter lidt træning skete noget interessant. Neuronerne fyrede ved **signalet**, der forudsagde juicen, og ikke længere ved selve juicen. Og udeblev juicen, faldt aktiviteten **under** normalen.\n\nDopamin koder altså en **prediction error**: »bedre end forventet«, »som forventet« eller »værre end forventet«. Det er et læringssignal, der fortæller hjernen, hvad der er værd at jagte.\n\nKent Berridge skelner mellem **wanting** (trang, drevet af dopamin) og **liking** (nydelse, drevet af andre systemer som opioider). Ved afhængighed kan trangen vokse, mens nydelsen falder.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'En abe har lært, at et lys betyder juice. Hvornår fyrer dopamin-neuronerne nu mest?',
      svar: [
        'Når aben er mæt',
        'Når lyset tændes',
        'Når juicen kommer',
        'Aldrig igen'
      ],
      rigtigt: 1,
      forklaring: 'Signalet flytter sig til det, der forudsiger belønningen. Udebliver juicen efter lyset, falder aktiviteten under normalen, og det er en negativ prediction error.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Den mest vanedannende belønning er den, du ikke ved hvornår kommer.',
      body: 'B.F. Skinner undersøgte, hvordan belønningsmønstre påvirker adfærd. Han fandt, at **variabel forstærkning** er den mest vedholdende: belønning efter et **uforudsigeligt** antal forsøg.\n\nFår en rotte mad hver gang, den trykker, stopper den hurtigt, når maden udebliver. Får den mad efter et tilfældigt antal tryk, bliver den ved og ved, også længe efter at belønningen er stoppet.\n\nDet er mekanikken i **spilleautomater**: næsten-gevinster og tilfældige udbetalinger. Og i sociale medier: træk ned for at opdatere, og der **kan** være noget nyt og spændende.\n\nForbindelsen til dopamin: når man ikke kan forudsige belønningen, er der hele tiden en prediction error at hente. Hjernen bliver ved med at »lære«, at det er værd at tjekke igen.\n\nNB: denne app bruger det samme trick med kister og bonus-XP. Forskellen er, at belønningen er koblet til at du lærer noget.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvilket belønningsmønster giver adfærd, der er sværest at slukke?',
      svar: [
        'En belønning hver eneste gang, man gør det',
        'Slet ingen belønning, kun selve handlingen',
        'En belønning efter præcis hvert tiende forsøg',
        'Belønning efter et uforudsigeligt antal gange'
      ],
      rigtigt: 3,
      forklaring: 'Variable ratio-forstærkning er mest modstandsdygtig over for extinction. Man kan ikke mærke forskel på »belønningen er stoppet« og »den kommer bare ikke endnu«.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Første gang er det for at føle sig godt. Senere er det for ikke at føle sig dårligt.',
      body: 'Gentagne, kraftige dopamin-udslag får hjernen til at **tilpasse sig**. Hjerneskanninger af mennesker med stofafhængighed viser bl.a. **færre dopamin-D2-receptorer** i striatum (Volkow m.fl.). Hjernen skruer ned for følsomheden.\n\nResultatet er **tolerance**: der skal mere til for samme effekt. Og hverdagens almindelige belønninger (mad, venner, hobbyer) føles fladere.\n\nGeorge Koob beskriver, hvordan afhængighed skifter fra **positiv forstærkning** (»det føles godt«) til **negativ forstærkning** (»det fjerner ubehaget«). Når stoffet mangler, kommer **abstinenser**: uro, tristhed, stress. Stressystemet er blevet overaktivt.\n\nDet forklarer, hvorfor mange med afhængighed fortsætter, selv om det ikke længere er sjovt.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er tolerance?',
      svar: [
        'At abstinenserne forsvinder efter noget tid',
        'At man bliver mere følsom for hver eneste gang',
        'At der skal mere til for at opnå samme effekt',
        'At man kan tåle stoffet uden at blive afhængig'
      ],
      rigtigt: 2,
      forklaring: 'Hjernen modregulerer, fx med færre receptorer. Det giver mindre effekt af samme dosis og fladere hverdagsbelønninger.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Trangen starter ikke i dig. Den starter i det, du ser.',
      body: 'I starten er brugen **målrettet**: man gør det, fordi man forventer en belønning. Med gentagelse flytter styringen sig i hjernen fra områder for målrettet adfærd til områder for **vaner** i det dorsale striatum (Everitt & Robbins). Handlingen bliver automatisk og udløses af **signaler**.\n\nSignaler er alt det, der har været koblet til brugen: et sted, et tidspunkt, en følelse, en lyd. Telefonens notifikationslyd er et perfekt eksempel. **Cue reactivity**: bare at se signalet kan give trang og øget dopamin-aktivitet.\n\nMiljøet betyder enormt meget. Blandt amerikanske soldater, der blev afhængige af heroin i Vietnam, fik kun et lille mindretal tilbagefald efter hjemkomsten (Robins 1974). Signalerne og konteksten var væk.\n\nDerfor virker det at **fjerne signaler** og **lægge friktion ind** ofte bedre end ren viljestyrke.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad fortæller Vietnam-studiet om afhængighed?',
      svar: [
        'At soldater er mere modstandsdygtige end andre',
        'At heroin ikke er så vanedannende som antaget',
        'At afhængighed næsten altid varer resten af livet',
        'At miljø og signaler betyder meget for tilbagefald'
      ],
      rigtigt: 3,
      forklaring: 'Afhængighed er ikke kun kemi. Kontekst og signaler holder vanen i gang, og når de forsvinder, bliver det lettere at stoppe.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'Du kan ikke vinde en kamp mod en app, der er designet af 1.000 ingeniører. Men du kan ændre banen.',
      body: 'Hvad virker mod uønskede vaner og afhængighed? Forskningen peger især på:\n\n**Fjern signalerne**: slå notifikationer fra, læg telefonen i et andet rum, undgå steder forbundet med vanen.\n\n**Tilføj friktion**: log ud, slet appen fra hjemskærmen, gør det besværligt. Små besvær har overraskende stor effekt.\n\n**Erstat, lad være med kun at fjerne**: en vane efterlader et tomrum. Hvilket behov dækkede den (kedsomhed, stress, socialt)? Find en anden måde at dække det.\n\n**If-then-planer**: »Hvis jeg får lyst til at scrolle, så tager jeg 5 vejrtrækninger først.«\n\nVed alvorlig afhængighed er der god evidens for behandling som kognitiv adfærdsterapi, og for nogle stoffer medicin. Det er en sygdom, der kan behandles, ikke en karakterfejl.\n\nOg bemærk: **gambling disorder** er en officiel diagnose, mens »afhængighed af sociale medier« endnu ikke er det.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvilken strategi er typisk mest effektiv mod en uønsket telefonvane?',
      svar: [
        'At fjerne signalerne og lægge friktion ind',
        'Stærkere viljestyrke og flere gode forsætter',
        'At bruge den mere, til man bliver træt af den',
        'At skamme sig over vanen, hver gang man gør det'
      ],
      rigtigt: 0,
      forklaring: 'Vaner udløses af signaler og kører på autopilot. At ændre omgivelserne virker bedre end at kæmpe mod autopiloten hver gang.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Dopamin er hjernens lykkestof.',
      rigtigt: 0,
      forklaring: 'Myte. Dopamin handler mere om forventning, motivation og læring (wanting) end om selve nydelsen (liking). Man kan have stor trang til noget, man ikke længere nyder.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'De fleste, der prøver et vanedannende stof, bliver afhængige.',
      rigtigt: 0,
      forklaring: 'Myte. For de fleste stoffer udvikler kun et mindretal af dem, der har prøvet, en afhængighed. Nikotin er blandt dem med den højeste andel. Gener, miljø, stress og hvor tidligt man starter, spiller ind.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k4',
      sporgsmal: 'Sæt udviklingen af en vane i rækkefølge',
      trin: [
        'En handling giver en uventet belønning (dopamin: prediction error)',
        'Hjernen kobler signaler og kontekst til belønningen',
        'Man gentager handlingen målrettet for at få belønningen',
        'Styringen flytter til vanesystemet – handlingen bliver automatisk',
        'Signalet alene udløser trang og handling, selv uden stor nydelse',
      ],
      forklaring: 'Fra »jeg gør det, fordi det er godt« til »jeg gør det, fordi signalet er der«.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan afhængighed opstår i hjernen.',
      punkter: [
        { tekst: 'Dopamin som prediction error-/læringssignal', ord: ['dopamin', 'prediction', 'forventning', 'lærings'] },
        { tekst: 'Wanting vs liking', ord: ['wanting', 'liking', 'trang', 'nydelse'] },
        { tekst: 'Variabel belønning er ekstra vanedannende', ord: ['variabel', 'uforudsigelig', 'spilleautomat'] },
        { tekst: 'Tolerance: hjernen tilpasser sig', ord: ['tolerance', 'receptor', 'tilpas'] },
        { tekst: 'Abstinenser og negativ forstærkning', ord: ['abstinens', 'negativ forstærkning', 'ubehag'] },
        { tekst: 'Signaler og vaner styrer adfærden', ord: ['signal', 'cue', 'vane', 'kontekst'] },
      ],
    },
  ],
};
