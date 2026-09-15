// Vaner og motivation – hvordan man faktisk ændrer adfærd.
export default {
  spor: {
    id: 'vaner', nr: 0, titel: 'Vaner og motivation', kort: 'Vaner', emoji: '🔁',
    farve: '#11998E', gradient: 'linear-gradient(135deg, #0BA360 0%, #3CBA92 50%, #30DD8A 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Omkring 40 % af det, du gør hver dag, er ikke noget, du beslutter.',
      body: 'Wendy Wood og kolleger lod folk skrive dagbog over, hvad de gjorde og tænkte. Omkring **40 %** af hverdagens handlinger blev udført næsten hver dag, **samme sted**, mens man tænkte på noget andet.\n\nEn **vane** er en indlært kobling mellem en **kontekst** og en **handling**: du kommer ind ad døren og lægger nøglerne samme sted, du sætter dig i bussen og tager telefonen frem.\n\nPopulærbøger beskriver det som en løkke: **signal → rutine → belønning**. Belønningen er vigtig, mens vanen dannes. Men når vanen er etableret, kan den køre videre, **selv om belønningen er væk**, fordi signalet selv udløser handlingen.\n\nDet er både problemet og muligheden: gode vaner kræver heller ikke viljestyrke, når de først sidder.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er en vane ifølge vaneforskningen?',
      svar: [
        'En handling, man har besluttet sig for mange gange',
        'En indlært, automatisk kobling mellem en kontekst og en handling',
        'En personlighedstræk',
        'Noget, der kun gælder dårlige handlinger',
      ],
      rigtigt: 1,
      forklaring: 'Konteksten udløser handlingen uden bevidst beslutning. Derfor er det så svært at ændre vaner med gode intentioner alene.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: '21 dage til en ny vane? Prøv 66. Eller 254.',
      body: 'Myten om »21 dage« stammer fra en plastikkirurg i 1960\'erne, der observerede, hvor lang tid patienter var om at vænne sig til deres nye udseende. Ikke vaner.\n\nDet bedste studie af, hvor lang tid det faktisk tager, er **Lally m.fl. (2010)**: 96 deltagere valgte en ny sund vane, fx at drikke vand til frokost, og målte hver dag, hvor automatisk den føltes.\n\nResultat: **medianen var 66 dage**, men spredningen var enorm: fra **18 til 254 dage**. Simple vaner (et glas vand) blev automatiske hurtigere end svære (50 armbøjninger).\n\nOg en god nyhed: **at springe en enkelt dag over** påvirkede ikke vanedannelsen mærkbart. Det, der tæller, er gentagelse i samme kontekst over tid, ikke perfektion.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad fandt Lally-studiet om at springe en dag over?',
      svar: [
        'Man skal starte forfra',
        'Det påvirkede ikke vanedannelsen mærkbart',
        'Det halverede effekten',
        'Det gjorde vanen stærkere',
      ],
      rigtigt: 1,
      forklaring: 'Enkelte smuttere ødelægger ikke processen. Derfor giver det mening med »streak-frys« i apps: målet er kontinuitet, ikke perfektion.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: '»Hvis X, så Y« slår »jeg vil gerne«.',
      body: '**Implementation intentions** er konkrete planer i formen: **hvis** situation X opstår, **så** gør jeg Y.\n\n»Jeg vil læse mere« bliver til »**Når** jeg har spist aftensmad, **så** tager jeg 10 kort i appen, før jeg åbner noget andet.«\n\nEn metaanalyse (Gollwitzer & Sheeran 2006) fandt en **stor effekt** (d ≈ 0,65) på at nå sine mål. Planen fungerer, fordi signalet (situationen) bliver koblet til handlingen på forhånd. Du har allerede truffet beslutningen, så der er ingen forhandling i øjeblikket.\n\nTo relaterede tricks:\n**Habit stacking**: hæng den nye vane på en eksisterende (»efter kaffen …«).\n**Temptation bundling** (Milkman 2014): kombinér noget, du bør gøre, med noget, du har lyst til. I studiet måtte folk kun høre deres yndlings-lydbog i fitnesscentret, og de trænede mere.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvilken formulering er en implementation intention?',
      svar: [
        '»Jeg vil træne mere i år«',
        '»Når jeg kommer hjem fra skole, så tager jeg løbeskoene på med det samme«',
        '»Træning er vigtigt for mig«',
        '»Jeg burde nok løbe«',
      ],
      rigtigt: 1,
      forklaring: 'Den har en konkret situation (hvis/når) og en konkret handling (så). De andre er intentioner uden trigger.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Betal et barn for at tegne, og det holder op med at tegne for sjov.',
      body: '**Indre motivation**: man gør noget, fordi det er interessant i sig selv. **Ydre motivation**: man gør det for en belønning eller for at undgå straf.\n\nI et klassisk forsøg (Lepper, Greene & Nisbett 1973) fik børn, der godt kunne lide at tegne, at vide, at de ville få et diplom for at tegne. Bagefter tegnede de **mindre** i frikvartererne end børn, der ikke havde fået belønning. Det kaldes **overjustification effect**.\n\nEn metaanalyse (Deci, Koestner & Ryan 1999) fandt, at **forventede, håndgribelige belønninger** for noget, der allerede er interessant, kan underminere den indre motivation. Men **uventede** belønninger og **positiv feedback** gør det typisk ikke.\n\n**Self-determination theory** siger, at indre motivation næres af tre ting: **autonomi** (jeg vælger), **kompetence** (jeg bliver bedre) og **samhørighed** (andre er med).',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvornår risikerer en belønning at underminere indre motivation?',
      svar: [
        'Når den er uventet',
        'Når den er forventet, håndgribelig og gives for noget, man allerede synes er sjovt',
        'Når den er verbal ros',
        'Aldrig',
      ],
      rigtigt: 1,
      forklaring: 'Aktiviteten omdefineres som »noget, jeg gør for belønningen«. Uventede belønninger og feedback om kompetence har ikke samme effekt.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Det tager 21 dage at danne en ny vane.',
      rigtigt: 0,
      forklaring: 'Myte. I Lally-studiet var medianen 66 dage med en spredning fra 18 til 254 dage, afhængigt af person og hvor svær vanen var.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'Viljestyrke er en muskel, der bliver træt, jo mere man bruger den.',
      rigtigt: 0,
      forklaring: 'Omdiskuteret og formentlig myte. »Ego depletion« kunne ikke gentages i et stort samarbejde mellem 23 laboratorier. Folk, der virker selvkontrollerede, bruger i øvrigt mest gode vaner og færre frestelser, ikke mere viljestyrke.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Du vil gerne øve til eksamen hver dag. Forklar, hvordan du bruger vaneforskningen til at få det til at ske.',
      punkter: [
        { tekst: 'Fast kontekst/signal – samme tid og sted', ord: ['kontekst', 'signal', 'samme tid', 'samme sted'] },
        { tekst: 'Implementation intention: hvis/når … så …', ord: ['hvis', 'når', 'så', 'implementation', 'plan'] },
        { tekst: 'Start småt, så det er let at gentage', ord: ['småt', 'lille', 'let', 'nem'] },
        { tekst: 'Forvent at det tager uger (median 66 dage), smuttere er OK', ord: ['66', 'uger', 'smut', 'spring over'] },
        { tekst: 'Fjern friktion for den gode vane, tilføj for den dårlige', ord: ['friktion', 'besvær'] },
        { tekst: 'Indre motivation: autonomi, kompetence, samhørighed', ord: ['autonomi', 'kompetence', 'samhørighed', 'indre'] },
      ],
    },
  ],
};
