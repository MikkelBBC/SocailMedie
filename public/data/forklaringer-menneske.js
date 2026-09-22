// Analogier til psykologi, psykiatri og filosofi.
//
// Mange af dem låner med vilje billeder fra teknik. Det er ikke pynt: en analogi virker,
// når den henter noget, du allerede har en sikker model af, og det har du for caches,
// køer og fejlhåndtering. Hver analogi rammer én mekanisme – ikke hele emnet.
//
// Samme format som forklaringer.js: { analogi, figur?, hvordan?, hvorfor? }.
import { box, txt, pil, svg, INK, LINE, BG } from './forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  // ================= Biases =================
  'biases-b1': {
    analogi: 'En autocorrect, der er trænet på almindelige sætninger. Den rammer rigtigt det meste af tiden og gør dig hurtigere – og så retter den »Aalborg« til »ålborg« på det dummeste tidspunkt. Fejlen er ikke tilfældig. Den følger af netop det, der gør den nyttig.',
    hvorfor: 'Derfor giver det ingen mening at »slukke« for sine biases. Man kan kun genkende de situationer, hvor genvejen er den forkerte – og bygge en procedure, der ikke bruger den.',
  },
  'biases-b2': {
    analogi: 'Som at få vist en pris, før du byder på en bil. Selv når sælgeren siger »det tal betyder ingenting«, ligger det som et udgangspunkt, og du justerer bare lidt derfra. Din hjerne gør det samme som en søgealgoritme, der starter ved det sidste sted, den kiggede.',
    hvorfor: 'Det er grunden til, at »hvad skal du have i løn?« er et magtspørgsmål. Den, der siger et tal først, har flyttet hele samtalens udgangspunkt.',
  },
  'biases-b3': {
    analogi: 'Du bruger din hjernes cache som statistik. Cachen er sorteret efter, hvad der var nemt at hente – ikke efter, hvad der er hyppigt i verden. Nyhederne skriver konstant dramatiske, sjældne hændelser ind i den, og så bliver estimatet skævt.',
    figur: {
      titel: 'Cachen er ikke et repræsentativt udsnit',
      svg: svg(170, `
        ${box(14, 24, 128, 24, 'Verden', { ...HVID, size: 11 })}
        ${box(14, 52, 128, 60, 'tusindvis af\nkedelige hændelser', { ...GROEN, size: 9 })}
        ${pil(146, 70, 176, 70, { farve: ROED })}
        ${box(180, 24, 126, 24, 'Det, du husker', { ...ROSA, size: 11 })}
        ${box(180, 52, 126, 28, 'flystyrt', { ...ROSA, size: 10 })}
        ${box(180, 84, 126, 28, 'hajangreb', { ...ROSA, size: 10 })}
        ${txt(160, 130, 'Filteret hedder: hvor let kom jeg i tanke om det?', { size: 10 })}
        ${txt(160, 152, 'Modgift: »hvor mange ud af hvor mange?«', { size: 10, farve: '#11998E' })}`),
      tekst: 'Det er samme fejl som at måle et systems typiske belastning ved kun at kigge på fejlloggen.',
    },
  },
  'biases-b4': {
    analogi: 'At teste sin kode ved kun at køre happy path. Grøn, grøn, grøn – og hypotesen »den virker« bliver aldrig udfordret. Den informative test er den, der prøver at vælte dig: tom liste, negativt tal, to tråde på én gang.',
    hvorfor: 'Det er derfor, en god unittest ikke er en, der består. Det er en, der kunne være faldet igennem.',
  },
  'biases-b5': {
    analogi: 'Kode, der kun virker på udviklerens maskine. Den kørte jo – men ingen har kørt den i et andet miljø. Replikationskrisen er psykologiens udgave af »works on my machine«, og løsningen er den samme: kør det igen, et andet sted, med flere data.',
    hvorfor: 'Derfor er det vigtigere at spørge »er det gentaget?« end »hvor berømt er studiet?«. Berømmelse er ikke et mål for, om det holder.',
  },

  // ================= Hukommelse =================
  'hukommelse-k1': {
    analogi: 'Din hjerne kører en oprydning som et cache-eviction: det, du ikke har hentet frem længe, bliver sværere at finde. Det er ikke en fejl. Et system, der husker alt lige godt, kan ikke finde noget som helst.',
    figur: {
      titel: 'Glemselskurven: stejlest lige efter',
      svg: svg(170, `
        <line x1="34" y1="130" x2="300" y2="130" stroke="${LINE}" stroke-width="1.5"/>
        <line x1="34" y1="130" x2="34" y2="22" stroke="${LINE}" stroke-width="1.5"/>
        <path d="M34,26 C60,96 110,116 300,124" fill="none" stroke="#E1306C" stroke-width="3"/>
        ${txt(46, 146, '0', { size: 9 })}
        ${txt(110, 146, '1 dag', { size: 9 })}
        ${txt(210, 146, '1 uge', { size: 9 })}
        ${txt(288, 146, '1 md.', { size: 9 })}
        ${txt(66, 16, '100 %', { size: 9 })}
        ${txt(200, 40, 'Tabet er størst det første døgn', { size: 10, farve: INK })}
        ${txt(200, 60, 'Derfor lægges gentagelsen der', { size: 10, farve: '#11998E' })}`),
      tekst: 'Hver gentagelse gør kurven fladere. Det er derfor, intervallerne i appen bliver længere og længere.',
    },
  },
  'hukommelse-k2': {
    analogi: 'Forskellen på at læse en rutevejledning og at køre ruten. Efter fem gennemlæsninger føler du dig sikker. Efter én køretur ved du faktisk, hvor man drejer. Hentning træner præcis den handling, du skal bruge – genlæsning træner kun genkendelse.',
    hvorfor: 'Det forklarer den ubehagelige pointe: den metode, der føles mest effektiv undervejs, er den, der virker dårligst bagefter.',
  },
  'hukommelse-k3': {
    analogi: 'Som at vande en plante. En liter på én gang løber ud i bunden af potten. En deciliter ti dage i træk trænger ind. Samme mængde vand, helt forskelligt resultat – fordi det er tiden imellem, der gør arbejdet.',
    figur: {
      titel: 'Samme timer, anden fordeling',
      svg: svg(170, `
        ${txt(80, 16, 'Alt på én aften', { farve: ROED, size: 11 })}
        ${box(60, 30, 40, 84, '', ROSA)}
        ${txt(80, 128, '4 timer', { size: 10 })}
        ${txt(80, 150, 'husker lidt', { size: 10, farve: ROED })}
        ${txt(240, 16, 'Fordelt', { farve: '#11998E', size: 11 })}
        ${[0, 1, 2, 3].map((i) => box(186 + i * 30, 92, 22, 22, '', GROEN)).join('')}
        ${txt(240, 128, '4 × 1 time', { size: 10 })}
        ${txt(240, 150, 'husker meget mere', { size: 10, farve: '#11998E' })}
        ${txt(160, 68, 'Pausen er ikke spildtid. Pausen ER metoden.', { size: 10, farve: INK })}`),
      tekst: 'Tommelfinger: pausen skal være ca. 10-20 % af den tid, du vil huske det. Til eksamen om 30 dage betyder det gentagelse hver 3.-6. dag.',
    },
  },
  'hukommelse-k4': {
    analogi: 'Arbejdshukommelsen er CPU-registre, ikke RAM. Der er plads til fire ting ad gangen, og alt andet skal hentes ind. **Chunking** er at pakke flere værdier i én struct: »1-9-8-9« fylder fire pladser, »1989« fylder én.',
    hvorfor: 'Derfor føles et nyt emne overvældende og et kendt emne let. Det er ikke intelligens – det er, hvor store dine chunks er blevet.',
  },
  'hukommelse-k5': {
    analogi: 'Søvn er den natlige batch-kørsel, hvor dagens data flyttes fra en hurtig, lille buffer (hippocampus) ud i det varige lager (barken). Springer du kørslen over, ligger data stadig i bufferen – og bufferen overskrives i morgen.',
    hvorfor: 'Det er derfor, en nat uden søvn før eksamen koster dobbelt: du er træt, og det, du læste, blev aldrig skrevet ordentligt ned.',
  },

  // ================= Afhængighed =================
  'afhaengighed-k1': {
    analogi: 'Dopamin er ikke belønningen. Det er en notifikation med teksten »det her var bedre end forventet – læg mærke til det«. Når systemet har lært signalet, flytter notifikationen sig fra selve gevinsten til det, der varsler den.',
    figur: {
      titel: 'Prediction error, ikke nydelse',
      svg: svg(180, `
        ${box(14, 22, 292, 22, 'Uventet belønning: stort udslag', { ...GROEN, size: 11 })}
        ${box(14, 52, 292, 22, 'Efter læring: udslag ved SIGNALET', { ...BLAA, size: 11 })}
        ${box(14, 82, 292, 22, 'Forventet belønning kommer: intet udslag', { ...HVID, size: 11 })}
        ${box(14, 112, 292, 22, 'Forventet belønning udebliver: dyk', { ...ROSA, size: 11 })}
        ${txt(160, 156, 'Signalet bærer nu hele forventningen – derfor trangen', { size: 10 })}`),
      tekst: 'Det er en fejlsignal-løkke: systemet justerer kun, når virkeligheden afviger fra forudsigelsen.',
    },
  },
  'afhaengighed-k2': {
    analogi: 'Forskellen på en kaffemaskine og en elevator. Kaffemaskinen leverer hver gang, så du trykker én gang og går. Elevatoren kommer på et uforudsigeligt tidspunkt – så du trykker igen. Og igen. Uvisheden er selve motoren.',
    hvorfor: 'Derfor er »træk ned for at opdatere« bygget, som det er. Du ved ikke, om der er noget nyt, og det er netop derfor, du gør det igen.',
  },
  'afhaengighed-k3': {
    analogi: 'Som at skrue op for højttaleren hver dag. Efter et stykke tid lyder det normale niveau som stilhed. Hjernen skruer ned for sin egen følsomhed for at holde balancen – og så skal der mere til bare for at ramme udgangspunktet.',
    hvorfor: 'Det forklarer skiftet fra »det er dejligt« til »det er nødvendigt«: udgangspunktet er flyttet, så fraværet gør ondt, længe før tilstedeværelsen giver noget.',
  },
  'afhaengighed-k4': {
    analogi: 'Handlingen flytter fra din egen kode til en event handler, der er bundet til omgivelserne. Du beslutter ikke at åbne appen – du ser hjemskærmen, og listeneren fyrer. Derfor er det lettere at fjerne triggeren end at kæmpe mod handleren.',
    hvorfor: 'Det er også den bedste forklaring på tilbagefald efter lang tids pause: koden er ikke slettet, kun listeneren var afmeldt. Det gamle miljø kan melde den til igen.',
  },
  'afhaengighed-k5': {
    analogi: 'Du kan ikke vinde over en modstander, der optimerer 24 timer i døgnet, ved at være mere disciplineret. Men du kan ændre banen: rate limiting (færre notifikationer), længere latenstid (log ud, appen væk fra hjemskærmen) og et andet default.',
    hvorfor: 'Viljestyrke er en ressource, der skal bruges hver gang. En ændret bane virker, også de dage hvor du er træt.',
  },

  // ================= Vaner =================
  'vaner-k1': {
    analogi: 'Fyrre procent af dine handlinger er cachede opslag: samme kontekst, samme svar, ingen beregning. Det føles som beslutninger, men du kiggede aldrig på alternativerne – du fik bare det, der lå i cachen.',
    hvorfor: 'Derfor virker »jeg skal tage mig sammen« så dårligt. Der er ingen beslutning at tage sig sammen om, før man har ændret det, der slår op i cachen.',
  },
  'vaner-k2': {
    analogi: 'Som at lære en genvej i et program. Den første uge må du tænke over den hver gang. Efter nogle uger sidder den i fingrene. Og hvor lang tid det tager, afhænger helt af, hvor kompliceret genvejen er – ikke af et magisk tal.',
    hvorfor: 'Den vigtigste enkeltoplysning fra Lally-studiet: en enkelt glemt dag havde ingen målbar effekt på kurven. Det er derfor, appen har streak-frys i stedet for at nulstille alt.',
  },
  'vaner-k3': {
    analogi: 'Forskellen på en variabel og en if-sætning. »Jeg vil gerne læse mere« er en hensigt, der ligger og flyder. »Når jeg har spist, tager jeg 10 kort« er en betingelse med en konkret trigger – og den bliver evalueret automatisk, når situationen opstår.',
    hvorfor: 'Effekten kommer af, at beslutningen er truffet på forhånd. I selve øjeblikket skal du ikke vælge, kun udføre.',
  },
  'vaner-k4': {
    analogi: 'Som at lægge en betalingsmur op foran noget, folk gjorde gratis. Nu er prisen blevet målestokken. Fjerner du muren igen, er den oprindelige lyst ikke automatisk tilbage – de har lært, at aktiviteten er noget, man får betaling for.',
    hvorfor: 'Det er hele grunden til, at cases og skins røg ud af denne app, og at milepælene i stedet viser dine egne tal. Informativ feedback rammer ikke den fælde.',
  },

  // ================= Social =================
  'social-k1': {
    analogi: 'Som et code review, hvor tre seniorer allerede har skrevet »ser fint ud« på en linje, du er sikker på er forkert. Du kigger en gang til. Presset er ikke, at de har ret – det er, at det koster noget at være den eneste, der siger noget.',
    hvorfor: 'Aschs vigtigste fund er ikke, at folk føjer sig. Det er, at **én** medsammensvoren, der også svarer rigtigt, fik konformiteten til at falde dramatisk. Den første, der siger det højt, gør det billigt for alle andre.',
  },
  'social-k2': {
    analogi: 'En opgave i en kø uden ejer. Ti workers ser den, og hver især antager, at en anden har taget den. Løsningen er den samme i begge verdener: tildel den til én ved navn. »Dig i den blå jakke – ring 112.«',
    hvorfor: 'Nyere forskning nuancerer billedet: videooptagelser fra rigtige gadeoptrin viser, at nogen griber ind i langt de fleste tilfælde. Effekten er reel, men den er en tendens, ikke en naturlov.',
  },
  'social-k3': {
    analogi: 'Et default-valg i en konfigurationsfil. De færreste læser dokumentationen og vælger bevidst – de tager det, der allerede står. »De fleste gør sådan her« er en default, der bliver præsenteret som information.',
    hvorfor: 'Derfor er det manipulerende at skrive »1.200 andre kigger på dette hotel lige nu«. Det er ikke en oplysning om hotellet. Det er en default, der er sat for dig.',
  },
  'social-k4': {
    analogi: 'Som en berømt benchmark, alle citerer, men ingen har kørt igen. Tallet er blevet til en sandhed gennem gentagelse, og da nogen endelig læste testopsætningen, viste det sig, at den målte noget lidt andet end antaget.',
    hvorfor: 'Pointen er ikke, at Milgram og Zimbardo var svindel. Den er, at et enkelt, dramatisk forsøg aldrig er et sikkert grundlag – uanset hvor godt det passer med den historie, vi gerne vil fortælle.',
  },

  // ================= Stress =================
  'stress-k1': {
    analogi: 'To systemer med hver sin svartid. Adrenalin er interruptet: øjeblikkeligt, kortvarigt, gør klar til handling. Kortisol via HPA-aksen er baggrundsjobbet: starter langsomt, kører længe, og skaffer brændstof til den lange version.',
    hvorfor: 'Det forklarer, hvorfor du kan være rolig i selve situationen og først mærke det bagefter. De to systemer topper på hvert sit tidspunkt.',
  },
  'stress-k2': {
    analogi: 'Data er der. Det er opslaget, der fejler. Som en database, hvor rækkerne ligger fint, men forbindelsen timer ud under belastning – og når trykket falder, virker det hele igen, præcis som det plejede.',
    hvorfor: 'Det er også derfor, »jeg kunne det i går« ikke er en undskyldning, men en præcis beskrivelse. Og hvorfor retrieval practice hjælper: du har trænet selve opslaget, ikke bare lagringen.',
  },
  'stress-k3': {
    analogi: 'Samme metrik, anden alarmregel. CPU på 80 % kan betyde »systemet er ved at dø« eller »systemet arbejder«. Signalet er det samme; tolkningen afgør, om du går i panik eller går i gang.',
    hvorfor: 'Forskellen på reappraisal og at »tænke positivt« er vigtig: du benægter ikke, at hjertet banker. Du giver den samme måling en anden og mere retvisende tolkning.',
  },
  'stress-k4': {
    analogi: 'En graf, der er blevet citeret så mange gange, at ingen længere åbner kilden. Som en Stack Overflow-kommentar fra 2011, alle kopierer – helt til den dag nogen læser dokumentationen og opdager, at funktionen aldrig har opført sig sådan.',
    hvorfor: 'Det betyder ikke, at der ikke findes en sammenhæng mellem ophidselse og præstation. Det betyder, at den pæne omvendte U ikke er bevist for mennesker i en eksamenssituation.',
  },

  // ================= Diagnoser =================
  'diagnoser-k1': {
    analogi: 'En diagnose er et error code, ikke et stack trace. »HTTP 500« fortæller dig, at noget gik galt indenfor, og at det hører til en bestemt kategori. Den fortæller dig ikke, hvilken linje der fejlede, eller hvorfor.',
    figur: {
      titel: 'Beskrivelse, ikke årsag',
      svg: svg(170, `
        ${box(14, 24, 130, 26, 'Symptomer', { ...ROSA, size: 11 })}
        ${box(14, 54, 130, 26, 'Varighed', { ...ROSA, size: 11 })}
        ${box(14, 84, 130, 26, 'Funktionstab', { ...ROSA, size: 11 })}
        ${pil(148, 68, 178, 68)}
        ${box(182, 54, 124, 30, 'Diagnose', { ...BLAA, size: 12 })}
        ${txt(244, 104, 'siger hvad, ikke hvorfor', { size: 10, farve: ROED })}
        ${box(14, 122, 292, 26, 'Nytten: fælles sprog, forskning og adgang til hjælp', { ...GROEN, size: 10 })}`),
      tekst: 'Derfor kan to personer med samme diagnose have vidt forskellige årsager – og have gavn af forskellig behandling.',
    },
  },
  'diagnoser-k2': {
    analogi: 'Som en alarmtærskel på et overvågningssystem. Belastningen er en glidende skala, men et sted skal der gå en alarm. Tærsklen er sat, hvor omkostningen ved ikke at reagere bliver for stor – den er ikke et naturligt skel i data.',
    hvorfor: 'Det forklarer både, hvorfor grænsen kan flytte sig mellem udgaver af diagnosesystemerne, og hvorfor »lidt af det samme« hos raske ikke er en mild udgave af sygdommen.',
  },
  'diagnoser-k3': {
    analogi: 'Når de samme bugs hele tiden optræder sammen på tværs af moduler, er det som regel ikke tilfældigt: der er en fælles afhængighed nedenunder. Komorbiditeten peger på, at kasserne skærer på tværs af noget mere grundlæggende.',
    hvorfor: 'Det er baggrunden for p-faktoren: en fælles underliggende sårbarhed kan vise sig som angst i ét årti og som noget andet i det næste.',
  },
  'diagnoser-k4': {
    analogi: 'Et system har en kapacitet, og belastningen varierer. Det går ned, når trafikken overstiger kapaciteten. To servere med samme trafik: den ene klarer det, den anden ikke – fordi kapaciteten er forskellig, ikke fordi trafikken var.',
    hvorfor: 'Modellen er brugbar, fordi den peger på to knapper: man kan sænke belastningen, og man kan hæve robustheden. Begge dele virker, og ingen af dem kræver, at man kender årsagen præcist.',
  },

  // ================= Angst og depression =================
  'angst-k1': {
    analogi: 'En røgalarm med tærsklen sat for lavt. Alarmen er ikke i stykker – den gør nøjagtig sit arbejde, bare ved den forkerte mængde røg. Og den er kalibreret asymmetrisk med vilje: en falsk alarm koster lidt, en overset brand koster alt.',
    hvorfor: 'Derfor virker »der er jo ikke noget at være bange for« ikke. Alarmen reagerer ikke på argumenter, den reagerer på erfaring med, hvad der faktisk skete.',
  },
  'angst-k2': {
    analogi: 'Undgåelse er som at fange en exception og swallow den. Det gør ondt lige nu, og derfor føles det klogt. Men fejlen bliver aldrig rettet, og systemet lærer: »den her sti er farlig, luk den ned«. Eksponering er at lade kaldet køre igennem og se, hvad der faktisk sker.',
    figur: {
      titel: 'Hvorfor undgåelse holder angsten i live',
      svg: svg(180, `
        ${box(90, 18, 140, 24, 'Frygtet situation', { ...HVID, size: 11 })}
        ${pil(160, 44, 160, 58, { farve: ROED })}
        ${box(90, 60, 140, 24, 'Angst stiger', { ...ROSA, size: 11 })}
        ${pil(88, 72, 50, 72, { farve: ROED })}
        ${box(14, 96, 116, 24, 'Undgå', { ...ROSA, size: 11 })}
        ${box(14, 124, 116, 24, 'Lettelse nu', { ...GUL, size: 10 })}
        ${pil(72, 94, 72, 46, { farve: ROED })}
        ${txt(72, 166, 'og forventningen står uprøvet', { size: 9, farve: ROED })}
        ${pil(232, 72, 268, 72, { farve: '#11998E' })}
        ${box(200, 96, 106, 24, 'Bliv', { ...GROEN, size: 11 })}
        ${box(200, 124, 106, 24, 'Falder selv', { ...GROEN, size: 10 })}
        ${txt(253, 166, 'og du lærer noget nyt', { size: 9, farve: '#11998E' })}`),
      tekst: 'Det virksomme er ikke at holde ud. Det er at opdage, at det, du forventede ville ske, ikke skete.',
    },
  },
  'angst-k3': {
    analogi: 'Ikke en fejlmeddelelse, men et systemwide throttle. Alt kører langsommere: søvn, appetit, koncentration, lyst. Og det mest forvirrende symptom er ikke sorg, men **anhedoni** – belønningssystemet returnerer nul på ting, der før gav noget.',
    hvorfor: 'Derfor er »tag dig sammen« et råd til det forkerte problem. Den kapacitet, rådet forudsætter, er netop det, der er skruet ned.',
  },
  'angst-k4': {
    analogi: 'To forskellige lag i stakken. Medicin ændrer på runtime-miljøet, terapi ændrer koden. Ved let til moderat depression virker begge dele nogenlunde lige godt – og det taler for at vælge ud fra, hvad der passer til personen.',
    hvorfor: 'Det vigtige for en eksamen: effekten af psykoterapi er formentlig overvurderet i litteraturen på grund af publikationsbias, og det samme gælder medicin. Begge dele virker, og begge dele virker mindre end de mest optimistiske tal siger.',
  },

  // ================= Psykose =================
  'psykose-k1': {
    analogi: 'Virkelighedstjekket er en valideringsfunktion mellem indput og konklusion. Ved psykose kører den ikke – og så bliver alt, der kommer ind, accepteret som sandt. Det er ikke dårlig dømmekraft. Det er, at det trin, der normalt siger fra, mangler.',
    hvorfor: 'Derfor er det meningsløst at argumentere nogen ud af en vrangforestilling. Argumentet skal igennem præcis den funktion, der er sat ud af spil.',
  },
  'psykose-k2': {
    analogi: 'Forestil dig, at log-niveauet bliver sat til ERROR på alt. Nummerpladen foran dig, en sang i radioen, en tilfældig sætning – alt markeres som **vigtigt**. Hjernen er en mønstersøger, og når den fodres med lutter »vigtigt«, bygger den en forklaring, der får tingene til at hænge sammen.',
    hvorfor: 'Kapurs pointe er, at vrangforestillingen ikke er det primære. Den er hjernens rimelige forsøg på at forklare en oplevelse, der virkelig føles betydningsfuld.',
  },
  'psykose-k3': {
    analogi: 'Som et bibliotek, hvor to helt forskellige bøger er endt med næsten samme titel. »Spaltet sind« betød oprindeligt spaltning mellem tanke, følelse og handling – og er blevet forvekslet med noget helt andet, der hedder dissociativ identitetsforstyrrelse.',
    hvorfor: 'Den anden myte er dyrere: mennesker med skizofreni er langt oftere ofre for vold end udøvere. Stigmaet gør, at folk venter med at søge hjælp – og ubehandlet psykose er netop det, der giver dårligere forløb.',
  },
  'psykose-k4': {
    analogi: 'Som at rette en fejl, mens den stadig er i én service, i stedet for efter den har spredt sig til hele systemet. Jo længere psykosen står ubehandlet, jo mere skal der rettes – ikke bare symptomerne, men også uddannelse, arbejde og relationer, der nåede at gå i stykker imens.',
    hvorfor: 'OPUS er et dansk eksempel på, at organiseringen af behandlingen kan have lige så stor effekt som selve behandlingen. Det er ikke et nyt lægemiddel – det er et fast team, der kommer tidligt.',
  },

  // ================= Stoicisme =================
  'stoicisme-k1': {
    analogi: 'Som at skelne mellem din egen kode og et eksternt API. Du kan ændre alt i dit eget repo. Kaldet ud i verden kan fejle, blive langsomt eller svare noget uventet – og din eneste reelle indflydelse er, hvordan du håndterer svaret.',
    figur: {
      titel: 'To bunker, én gang for alle',
      svg: svg(170, `
        ${box(14, 24, 140, 26, 'Op til mig', { ...GROEN, size: 12 })}
        ${box(14, 54, 140, 22, 'min vurdering', { ...HVID, size: 10 })}
        ${box(14, 78, 140, 22, 'mit valg', { ...HVID, size: 10 })}
        ${box(14, 102, 140, 22, 'min indsats', { ...HVID, size: 10 })}
        ${box(166, 24, 140, 26, 'Ikke op til mig', { ...ROSA, size: 12 })}
        ${box(166, 54, 140, 22, 'andres mening', { ...HVID, size: 10 })}
        ${box(166, 78, 140, 22, 'karakteren', { ...HVID, size: 10 })}
        ${box(166, 102, 140, 22, 'hvad jeg trækker', { ...HVID, size: 10 })}
        ${txt(160, 146, 'Uro opstår, når man bruger kraft på den højre bunke', { size: 10 })}`),
      tekst: 'Det er ikke ligegyldighed. Epiktet siger, du skal handle – bare ikke knytte din ro til noget, du ikke styrer.',
    },
  },
  'stoicisme-k2': {
    analogi: 'Premeditatio malorum er en pre-mortem: inden projektet går i gang, forestiller du dig, at det er gået galt, og spørger hvorfor. Det er ikke pessimisme, det er beredskab – og bagefter ser man tydeligere, hvad der faktisk er på spil.',
    hvorfor: 'Bivirkningen er den interessante: når man har forestillet sig at miste noget, holder man op med at tage det for givet. Derfor gør øvelsen folk mere taknemmelige, ikke mere ængstelige.',
  },
  'stoicisme-k3': {
    analogi: 'Hændelsen er en rå event. Dommen er din handler. To personer får det samme event – en rynket pande fra censor – og den ene handler kalder `panik()`, den anden `fortsæt()`. Eventet var identisk; koden imellem var ikke.',
    hvorfor: 'Beck og Ellis nævnte begge stoikerne som inspiration. Forskellen er, at kognitiv adfærdsterapi har testet idéen i hundredvis af kontrollerede forsøg – filosofien fik ret, men først bagefter.',
  },
  'stoicisme-k4': {
    analogi: 'Memento mori er at kende deadline. Et projekt uden slutdato bliver aldrig prioriteret; man siger ja til alt. Kender man datoen, bliver det pludselig indlysende, hvad der skal med, og hvad der kan falde ud.',
    hvorfor: 'Amor fati er den anden halvdel: når noget alligevel er sket, er det eneste brugbare spørgsmål, hvad man gør nu. Modstand mod det uafvendelige koster energi uden at ændre noget.',
  },

  // ================= Tankeværktøjer =================
  'ragekniv-k1': {
    analogi: 'Hver ekstra antagelse er en fri parameter. Med nok parametre kan du få en model til at ramme alle punkter, du allerede har set – og til at fejle på det næste. Occam er regularisering, formuleret i 1300-tallet.',
    hvorfor: 'Den præcise formulering er vigtig: ragekniven gælder **kun**, når to forklaringer passer lige godt til data. Passer den komplekse forklaring bedre, er den ikke længere den, der skal barberes væk.',
  },
  'ragekniv-k2': {
    analogi: 'Før du konkluderer, at nogen saboterer dit build, så tjek om de bare ikke har pullet. Den simple forklaring – travlhed, uvidenhed, en overset besked – har langt større prior end den onde plan.',
    hvorfor: 'Den praktiske værdi er, at hypotesen om ondskab lukker samtalen, mens hypotesen om travlhed åbner den. Og den sidste er oftest rigtig.',
  },
  'ragekniv-k3': {
    analogi: 'Chestertons hegn er den mærkelige if-sætning i legacy-kode uden kommentar. Fristelsen til at slette er stor. Men den blev skrevet af en grund, og den grund viser sig som regel klokken tre om natten en uge efter.',
    hvorfor: 'Reglen er ikke »rør aldrig noget gammelt«. Den er: find ud af hvorfor, **og så** må du gerne fjerne det. Hegnet må godt rives ned – bare ikke af den, der ikke ved, hvad det holder ude.',
  },
  'ragekniv-k4': {
    analogi: 'Steelmanning er at skrive den test, der ville få din egen løsning til at fejle, før du forsvarer den. Kan du formulere modpartens argument så godt, at de selv nikker, så ved du, hvad du diskuterer – og ikke før.',
    hvorfor: 'Det er også den hurtigste vej til at opdage, at man selv tager fejl. En stråmand kan man altid vinde over, og derfor lærer man ingenting af det.',
  },

  // ================= Eksistens =================
  'eksistens-k1': {
    analogi: 'Epikurs argument er en null-check. Der findes intet subjekt at ramme: i det øjeblik døden er der, er der ingen til at opleve den. Angsten forudsætter en oplevende, der ikke eksisterer.',
    hvorfor: 'Den almindelige indvending er værd at kende: de fleste frygter ikke selve tilstanden, men **tabet** af det, de kunne have haft. Det rammer Epikurs argument ikke – og derfor er det stadig en levende diskussion.',
  },
  'eksistens-k2': {
    analogi: 'En while(true)-løkke uden exit-betingelse. Camus siger, at det absurde ikke løses ved at bryde ud af løkken eller ved at opfinde en ydre grund. Det løses ved at blive i den med åbne øjne – og lade arbejdet inde i løkken være meningen.',
    hvorfor: 'Derfor er sætningen »man må forestille sig Sisyfos lykkelig« ikke sarkasme. Den er konklusionen: bevidstheden om, at stenen triller ned igen, er præcis det, der gør ham fri.',
  },
  'eksistens-k3': {
    analogi: 'En saks er skrevet efter et interface, der var defineret først. Mennesket kompilerer uden interface: du eksisterer, og implementeringen bliver til, mens du skriver den. Derfor findes der ingen specifikation at måle dig op imod.',
    hvorfor: 'Det er både frisættende og tungt. Sartre kalder det »dømt til frihed«: man kan ikke vælge ikke at vælge, og man kan ikke skubbe ansvaret over på en natur, man ikke selv har defineret.',
  },
  'eksistens-k4': {
    analogi: 'Et repo, hvor hver eneste linje er blevet erstattet over ti år. Samme navn, samme historik, ikke én original linje. Er det samme projekt? De fleste siger ja – og det afslører, at identiteten sad i kontinuiteten, ikke i materialet.',
    hvorfor: 'Spørgsmålet er ikke et ordkløveri. Det er præcis den samme uklarhed, der gør spørgsmål om personlig identitet – om du er den samme som for ti år siden – svære at afgøre.',
  },
  'eksistens-k5': {
    analogi: 'En adaptiv baseline, der kalibrerer sig selv. Uanset hvad du fodrer den med, justerer den nulpunktet, så det nye niveau bliver det normale. Derfor måler den ændringer godt og absolutte niveauer dårligt.',
    hvorfor: 'Den praktiske konsekvens: ting, der ændrer **hverdagen** – relationer, mening, helbred – tilpasser man sig langsommere til end ting, der ændrer **niveauet**, som løn eller ting.',
  },
};
