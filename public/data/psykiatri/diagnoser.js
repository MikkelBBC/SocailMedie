// Psykiatri: hvad en diagnose er – og ikke er.
// Indholdet er til læring, ikke til selvdiagnose eller behandling.
export default {
  spor: {
    id: 'diagnoser', nr: 0, titel: 'Hvad er en diagnose?', kort: 'Diagnoser', emoji: '🗂️',
    farve: '#11998E', gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'En psykiatrisk diagnose er en beskrivelse. Ikke en forklaring.',
      body: 'Når en læge siger »du har en depression«, lyder det som en årsag. Men de fleste psykiatriske diagnoser er defineret ud fra **symptomer**, **varighed** og **funktionsnedsættelse**, ikke ud fra en målbar biologisk markør.\n\nDer findes to store systemer:\n• **ICD-11** fra WHO, som bruges officielt i Danmark.\n• **DSM-5** fra American Psychiatric Association, som bruges meget i forskning og i USA.\n\nBegge beskriver, hvilke kriterier der skal være opfyldt. Pointen er **reliabilitet**: to fagfolk skal kunne nå frem til den samme diagnose.\n\nDet gør diagnosen nyttig. Den åbner for behandling, forskning og fælles sprog. Men det er en fælde at sige »han er deprimeret, **fordi** han har depression«. Det er at forklare et fænomen med dets eget navn.\n\nÅrsagerne skal findes et andet sted: i gener, opvækst, belastninger, søvn, relationer og samspillet mellem dem.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er de fleste psykiatriske diagnoser primært defineret ud fra?',
      svar: ['En blodprøve eller hjerneskanning', 'Symptomer, varighed og funktionsnedsættelse', 'Personens gener', 'Hvad personen selv mener'],
      rigtigt: 1,
      forklaring: 'Der findes (endnu) ingen biologisk test for fx depression eller skizofreni. Diagnoserne er kriteriebaserede beskrivelser, som skal gøre det muligt for fagfolk at blive enige.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Alle er lidt nervøse. Ikke alle har en angstlidelse. Hvor går grænsen?',
      body: 'Mange psykiske fænomener ligger på et **kontinuum**. Tristhed, bekymring, uro og mærkelige tanker findes i hele befolkningen i større eller mindre grad.\n\nEn diagnose trækker en **streg** på kontinuummet. Stregen sættes typisk dér, hvor symptomerne er så **vedvarende** og **belastende**, at de går ud over arbejde, skole, relationer eller dagligdag.\n\nDerfor forsøger nyere modeller som **HiTOP** at beskrive psykopatologi som **dimensioner** i stedet for kasser: hvor meget af noget har du, snarere end om du har det.\n\nTo konsekvenser:\n• At være **under** stregen betyder ikke, at man ikke kan have det svært og have gavn af hjælp.\n• At være **over** stregen betyder ikke, at man er fundamentalt anderledes end andre mennesker.\n\nDet er også grunden til, at tjeklister på nettet er dårlige til selvdiagnose. De måler symptomer, men ikke hvor meget de fylder i dit liv.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad afgør typisk, om almindelige symptomer som bekymring bliver til en diagnose?',
      svar: ['Om man selv synes, man har for mange', 'Om de er vedvarende og giver betydelig funktionsnedsættelse', 'Om man er over 18 år', 'Om en ven har samme diagnose'],
      rigtigt: 1,
      forklaring: 'Kontinuum-tanken: symptomerne findes hos mange. Stregen sættes ved varighed, belastning og funktionsnedsættelse.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Har man én psykisk lidelse, er det mere sandsynligt at have to. Det fortæller noget om kasserne.',
      body: '**Komorbiditet** betyder, at flere diagnoser optræder hos den samme person. I psykiatrien er det reglen snarere end undtagelsen: angst og depression følges ofte ad, og det samme gør ADHD og misbrug.\n\nI 2014 analyserede Avshalom Caspi og kolleger data fra et stort studie, der fulgte mennesker fra fødslen i New Zealand. De fandt, at en fælles faktor kunne forklare en stor del af risikoen på tværs af mange lidelser. De kaldte den **p-faktoren**, inspireret af g-faktoren for intelligens.\n\nFortolkningen er stadig omdiskuteret. Men idéen er vigtig: måske er diagnoserne ikke skarpt adskilte sygdomme, men forskellige **udtryk** for nogle fælles sårbarheder.\n\nFor behandling betyder det, at metoder, der virker på tværs, giver mening. Et eksempel er **transdiagnostisk** kognitiv adfærdsterapi, der fokuserer på fælles mekanismer som undgåelse og grubleri.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er idéen bag »p-faktoren«?',
      svar: ['At psykiske lidelser kun skyldes gener', 'At en fælles faktor forklarer en del af risikoen på tværs af mange lidelser', 'At diagnoser er helt tilfældige', 'At p står for psykose'],
      rigtigt: 1,
      forklaring: 'Ligesom g-faktoren i intelligens beskriver p en fælles dimension af sårbarhed, der viser sig som forskellige diagnoser.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'To personer oplever det samme. Den ene bliver syg. Stress-sårbarhedsmodellen forklarer hvorfor.',
      body: 'Zubin og Spring foreslog i 1977 **stress-sårbarhedsmodellen**. Den er stadig en af de mest brugte måder at tænke om psykisk sygdom på.\n\nIdéen er enkel: alle har en **sårbarhed**, og alle udsættes for **belastninger**. Sygdom opstår, når belastningen overstiger det, man kan bære.\n\n• Sårbarhed kan være gener, tidlige traumer, personlighed eller en tidligere episode.\n• Belastning kan være tab, konflikter, eksamen, søvnmangel eller rusmidler.\n\nModellen hænger sammen med den **biopsykosociale** tilgang: biologi, psyke og sociale forhold spiller sammen, og ingen af dem er hele forklaringen.\n\nDen er også **håbefuld**. Man kan ikke ændre sine gener, men man kan ofte sænke belastningen og øge sine ressourcer: søvn, støtte, behandling, færre rusmidler. Så flytter man sig længere væk fra tærsklen.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad siger stress-sårbarhedsmodellen?',
      svar: [
        'At kun svage mennesker bliver psykisk syge',
        'At sygdom opstår, når belastning overstiger det, ens sårbarhed kan bære',
        'At psykisk sygdom kun skyldes stress',
        'At sårbarhed ikke kan påvirkes af noget',
      ],
      rigtigt: 1,
      forklaring: 'Både sårbarhed og belastning tæller. Man kan ikke ændre alt, men man kan påvirke belastning og ressourcer.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'En diagnose forklarer, hvorfor man har symptomerne.',
      rigtigt: 0,
      forklaring: 'Myte. Diagnosen er en kriteriebaseret beskrivelse af et mønster af symptomer. At sige, at symptomerne skyldes diagnosen, er cirkulært.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'Det er almindeligt at opfylde kriterierne for mere end én psykisk lidelse.',
      rigtigt: 1,
      forklaring: 'Fakta. Komorbiditet er meget almindelig, fx angst sammen med depression. Det er en af grundene til interessen for fælles faktorer og transdiagnostisk behandling.',
    },
    {
      id: 'case1', type: 'case', efter: 'k2',
      scenarie: 'Sara har fundet en test på nettet og scorer højt på »ADHD-træk«. Hun glemmer ting og keder sig til forelæsninger, men klarer studiet fint og har det godt socialt.',
      sporgsmal: 'Hvad er den bedste vurdering?',
      svar: [
        'Hun har ADHD, testen viser det',
        'Træk findes på et kontinuum; uden betydelig funktionsnedsættelse er en diagnose ikke oplagt',
        'Nettests er lige så gode som en udredning',
        'Hun kan ikke have det svært, fordi hun klarer sig godt',
      ],
      rigtigt: 1,
      forklaring: 'Symptomtjeklister måler træk, ikke hvor meget de fylder i livet. En udredning ser på varighed, sammenhæng og funktion. Og selv under stregen kan man godt have gavn af strategier.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar, hvad en psykiatrisk diagnose er, og hvordan man kan tænke om, hvorfor nogen bliver syge.',
      punkter: [
        { tekst: 'Diagnoser er kriteriebaserede beskrivelser (ICD-11 / DSM-5)', ord: ['kriteri', 'icd', 'dsm', 'beskriv'] },
        { tekst: 'De forklarer ikke årsagen i sig selv', ord: ['årsag', 'forklar', 'cirkul'] },
        { tekst: 'Symptomer ligger på et kontinuum', ord: ['kontinuum', 'dimension', 'grad'] },
        { tekst: 'Grænsen sættes ved funktionsnedsættelse og varighed', ord: ['funktion', 'varighed', 'belast'] },
        { tekst: 'Stress-sårbarhedsmodellen: belastning mod sårbarhed', ord: ['sårbar', 'stress', 'belastning'] },
        { tekst: 'Biologi, psyke og sociale forhold spiller sammen', ord: ['biopsykosocial', 'biolog', 'social'] },
      ],
    },
  ],
};
