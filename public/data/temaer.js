// Temaer på tværs af fag: koncepter, der deler en grundidé.
// Feedet bruger dem til at blande MENINGSFULDT: næste kort er gerne fra et andet spor,
// men om en lignende idé, så forskelle og ligheder bliver tydelige.
// Kort med `om`/`efter` arver temaet fra deres koncept.
export default [
  {
    id: 'caching', navn: 'Caching og hukommelse', emoji: '🗂️',
    gradient: 'linear-gradient(135deg, #36D1DC, #5B86E5)',
    ide: 'Lille og hurtig foran stor og langsom – og hvad der sker, når man ikke har det, man skal bruge.',
    koncepter: ['t00-k2', 't09-k3', 't09-k4', 'algodat-a4', 'algodat-a2', 'dp-k2', 'hukommelse-k1', 'hukommelse-k4', 'biases-b3', 'skalering-k2', 'ydelse-k1', 'design-k2'],
  },
  {
    id: 'koeer', navn: 'Køer og ventetid', emoji: '⏳',
    gradient: 'linear-gradient(135deg, #F7971E, #FFD200)',
    ide: 'Hvem kommer til først, og hvad koster det at vente?',
    koncepter: ['t01-k2', 't03-k4', 't03-k5', 't07-k1', 't07-k2', 't07-k5', 'traeer-k3', 'grafer-k2', 'grafer-k3', 'skalering-k4', 'fejl-k1', 'ydelse-k3'],
  },
  {
    id: 'konflikter', navn: 'Adgang og konflikter', emoji: '🔒',
    gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
    ide: 'Flere vil have det samme på samme tid.',
    koncepter: ['t03-k1', 't04-k1', 't04-k2', 't04-k3', 't04-k4', 't04-k5', 't05-k1', 't05-k4', 't01-k4', 'ydelse-k4', 'skalering-k3', 'forsvar-k3'],
  },
  {
    id: 'grafer', navn: 'Grafer og afhængigheder', emoji: '🕸️',
    gradient: 'linear-gradient(135deg, #00B4DB, #0083B0)',
    ide: 'Knuder, kanter og cykler – fra deadlocks til Makefiles.',
    koncepter: ['t05-k2', 't05-k3', 't12-k1', 't12-k2', 't01-k3', 'grafer-k1', 'grafer-k2', 'grafer-k4', 'traeer-k4', 'git-k1', 'git-k2', 'design-k1'],
  },
  {
    id: 'signaler', navn: 'Signaler og afbrydelser', emoji: '🔔',
    gradient: 'linear-gradient(135deg, #834D9B, #D04ED6)',
    ide: 'Noget sker udefra, og systemet skal reagere – uden at spilde kræfter på at vente.',
    koncepter: ['t09-k5', 't06-k2', 't06-k3', 't06-k4', 't11-k4', 't11-k5', 't00-k1', 'afhaengighed-k4', 'stress-k1'],
  },
  {
    id: 'ejerskab', navn: 'Ejerskab og ressourcer', emoji: '♻️',
    gradient: 'linear-gradient(135deg, #43CEA2, #185A9D)',
    ide: 'Hvem ejer hvad, og hvem rydder op?',
    koncepter: ['t10-k1', 't10-k2', 't10-k3', 't10-k4', 't10-k5', 't07-k4', 't02-k4', 't11-k3', 'git-k4', 'firma-k1', 'design-k4'],
  },
  {
    id: 'traeer', navn: 'Træer og hierarkier', emoji: '🌲',
    gradient: 'linear-gradient(135deg, #56AB2F, #A8E063)',
    ide: 'Når data har forældre og børn, bliver højden det, der koster.',
    koncepter: ['traeer-k1', 'traeer-k2', 'algodat-a5', 't01-k3', 't00-k2', 't09-k3'],
  },
  {
    id: 'algoritmedesign', navn: 'Genveje og strategier', emoji: '🧭',
    gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
    ide: 'Tommelfingerregler og grådige valg – hurtige, ofte gode, nogle gange forkerte.',
    koncepter: ['dp-k4', 'dp-k1', 'dp-k3', 'biases-b1', 'biases-b2', 'algodat-a1', 'grafer-k3', 'social-k3', 'ragekniv-k1', 'ragekniv-k2', 'ragekniv-k3', 'ailaering-k3', 'ydelse-k2', 'test-k1', 'invbasis-k4'],
  },
  {
    id: 'beloenning', navn: 'Belønning og vaner', emoji: '🎰',
    gradient: 'linear-gradient(135deg, #F857A6, #FF5858)',
    ide: 'Hvad får os til at gøre noget igen – og igen?',
    koncepter: ['afhaengighed-k1', 'afhaengighed-k2', 'afhaengighed-k3', 'afhaengighed-k5', 'vaner-k1', 'vaner-k3', 'vaner-k4', 'eksistens-k5', 'psykose-k2', 'forretning-k2', 'invbasis-k4'],
  },
  {
    id: 'laering', navn: 'Læring og pres', emoji: '🎓',
    gradient: 'linear-gradient(135deg, #F2994A, #F2C94C)',
    ide: 'Sådan husker du det – også når det gælder.',
    koncepter: ['hukommelse-k2', 'hukommelse-k3', 'hukommelse-k5', 'stress-k2', 'stress-k3', 'stress-k4', 'vaner-k2', 'social-k1', 'biases-b5', 'test-k1', 'test-k3', 'fejl-k4'],
  },
  {
    id: 'skalering', navn: 'Skalering og vækst', emoji: '📈',
    gradient: 'linear-gradient(135deg, #11998E, #38EF7D)',
    ide: 'Hvad sker der, når n bliver stor – eller når der kommer flere kerner, flere tilskuere?',
    koncepter: ['algodat-a1', 'algodat-a3', 't03-k2', 't03-k3', 'dp-k1', 'social-k2', 't09-k2', 'skalering-k1', 'invbasis-k1', 'firma-k4'],
  },
  {
    id: 'tolkning', navn: 'Tolkning former følelsen', emoji: '🪞',
    gradient: 'linear-gradient(135deg, #A18CD1, #4776E6)',
    ide: 'Det, der sker, og det, vi siger til os selv om det, er to forskellige ting.',
    koncepter: ['stoicisme-k1', 'stoicisme-k2', 'stoicisme-k3', 'stress-k3', 'angst-k1', 'angst-k2', 'angst-k4', 'diagnoser-k4', 'eksistens-k3'],
  },
  {
    id: 'mening', navn: 'Mening og identitet', emoji: '🧭',
    gradient: 'linear-gradient(135deg, #1BCEDF, #5B247A)',
    ide: 'Hvem er du, hvad er vigtigt – og hvornår er noget »det samme«?',
    koncepter: ['eksistens-k1', 'eksistens-k2', 'eksistens-k4', 'stoicisme-k4', 'diagnoser-k1', 'diagnoser-k2', 't10-k1', 'hukommelse-k1'],
  },
  {
    id: 'moenstre', navn: 'Mønstre i data', emoji: '📊',
    gradient: 'linear-gradient(135deg, #11998E, #8E54E9)',
    ide: 'At finde et mønster er ikke det samme som at forstå det – og et mønster i data kan være en fælde.',
    koncepter: ['ailaering-k1', 'ailaering-k4', 'ailaering-k5', 'biases-b1', 'biases-b4', 'algodat-a2', 'diagnoser-k3', 'ragekniv-k1', 'ydelse-k2', 'forretning-k1', 'angreb-k4'],
  },
  {
    id: 'sprog', navn: 'Sprog og betydning', emoji: '🗣️',
    gradient: 'linear-gradient(135deg, #4776E6, #F857A6)',
    ide: 'Hvordan ord bliver til noget, en maskine – eller en hjerne – kan regne med.',
    koncepter: ['sprogmodeller-k1', 'sprogmodeller-k2', 'sprogmodeller-k3', 'sprogmodeller-k5', 'hukommelse-k1', 'ragekniv-k4', 'eksistens-k4'],
  },
  {
    id: 'lag', navn: 'Lag og protokoller', emoji: '📡',
    gradient: 'linear-gradient(135deg, #00C6FF, #0072FF)',
    ide: 'Hvert lag stoler på laget under og skjuler rodet for laget over.',
    koncepter: ['internet-k1', 'internet-k3', 'internet-k4', 'krypto-k1', 't06-k1', 't08-k1', 't00-k1', 'relation-k1', 'design-k2', 'skalering-k1'],
  },
  {
    id: 'fejlhaandtering', navn: 'Når noget går galt', emoji: '🩹',
    gradient: 'linear-gradient(135deg, #DC2626, #FB923C)',
    ide: 'Fejl er normal drift. Spørgsmålet er, hvor meget der følger med ned – og hvem man leder efter bagefter.',
    koncepter: ['fejl-k1', 'fejl-k3', 'fejl-k4', 't05-k3', 'test-k3', 'ragekniv-k2', 'angreb-k3', 'forsvar-k4', 'diagnoser-k4'],
  },
  {
    id: 'tillid', navn: 'Hvem stoler du på?', emoji: '🛡️',
    gradient: 'linear-gradient(135deg, #DD2476, #8E54E9)',
    ide: 'Alt input er data, indtil nogen beslutter andet – i en database, i en sprogmodel og i en besked fra din bank.',
    koncepter: ['forsvar-k2', 'angreb-k1', 'sprogmodeller-k4', 'relation-k1', 'social-k3', 'biases-b2', 'krypto-k4'],
  },
  {
    id: 'afvejning', navn: 'Du kan ikke få det hele', emoji: '⚖️',
    gradient: 'linear-gradient(135deg, #0EA5E9, #A78BFA)',
    ide: 'Hastighed mod friskhed, sikkerhed mod brugbarhed, afkast mod risiko. Hver garanti har en pris.',
    koncepter: ['skalering-k3', 'ydelse-k1', 'invbasis-k2', 'forsvar-k1', 't03-k4', 'design-k3', 'test-k2'],
  },
];
