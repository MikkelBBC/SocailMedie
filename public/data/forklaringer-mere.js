// Flere tegninger og hverdags-sammenligninger. Samme format som forklaringer.js.
import { box, txt, pil, svg, INK, LINE, BG } from './forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  // ================= Lambdas =================
  't02-k1': {
    analogi: 'En robotstøvsuger tager imod en instruks: »gør sådan her i hvert rum«. Du giver den ikke rummene, du giver den opførslen. Det er en højereordens funktion: en funktion, der får en anden funktion som ingrediens.',
    figur: {
      titel: 'En funktion som ingrediens',
      svg: svg(180, `
        ${box(14, 20, 110, 48, 'Liste med tal', HVID)}
        ${box(14, 96, 110, 48, '', ROSA)}
        ${txt(69, 111, 'Din funktion', { size: 10 })}
        ${txt(69, 130, 'x → x * 2', { farve: INK, size: 13, fed: 800 })}
        ${pil(128, 44, 160, 64)}
        ${pil(128, 120, 160, 100)}
        ${box(164, 60, 66, 44, 'transform', { ...BLAA, size: 10 })}
        ${pil(232, 82, 252, 82)}
        ${box(254, 58, 54, 48, 'Ny liste', { ...GROEN, size: 10 })}
        ${txt(160, 164, 'transform bestemmer HVORDAN – du bestemmer HVAD', { size: 10 })}`),
      tekst: 'Algoritmen (løkken) ligger ét sted. Opførslen sender du med ind. Derfor kan den samme transform bruges til alt.',
    },
    hvorfor: 'Det er grunden til, at std::sort kan sortere hvad som helst: du sender bare reglen for »mindre end« med.',
  },

  // ================= Tråde =================
  't03-k3': {
    analogi: 'Brugertråde er opgaver på din to-do-liste. Kernetråde er de hænder, der kan arbejde. Har du ti opgaver og én hånd, går alt i stå, hvis den ene hånd venter på noget.',
    figur: {
      titel: 'Tre måder at koble tråde sammen',
      svg: svg(200, `
        ${txt(52, 12, 'Mange-til-én', { farve: ROED, size: 10 })}
        ${box(16, 24, 22, 18, '', ROSA)} ${box(42, 24, 22, 18, '', ROSA)} ${box(68, 24, 22, 18, '', ROSA)}
        ${pil(53, 46, 53, 62)}
        ${box(38, 64, 30, 20, '', BLAA)}
        ${txt(52, 100, 'Én blokerer', { size: 9, farve: ROED })}
        ${txt(52, 114, '= alle blokerer', { size: 9, farve: ROED })}
        ${txt(160, 12, 'Én-til-én', { farve: '#11998E', size: 10 })}
        ${box(124, 24, 22, 18, '', ROSA)} ${box(150, 24, 22, 18, '', ROSA)} ${box(176, 24, 22, 18, '', ROSA)}
        ${pil(135, 46, 135, 62)} ${pil(161, 46, 161, 62)} ${pil(187, 46, 187, 62)}
        ${box(124, 64, 22, 20, '', BLAA)} ${box(150, 64, 22, 20, '', BLAA)} ${box(176, 64, 22, 20, '', BLAA)}
        ${txt(160, 100, 'Ægte parallelt', { size: 9, farve: '#11998E' })}
        ${txt(160, 114, 'Linux gør det her', { size: 9, farve: '#11998E' })}
        ${txt(268, 12, 'Mange-til-mange', { size: 10 })}
        ${box(232, 24, 22, 18, '', ROSA)} ${box(258, 24, 22, 18, '', ROSA)} ${box(284, 24, 22, 18, '', ROSA)}
        ${pil(243, 46, 250, 62)} ${pil(269, 46, 262, 62)} ${pil(295, 46, 288, 62)}
        ${box(238, 64, 24, 20, '', BLAA)} ${box(276, 64, 24, 20, '', BLAA)}
        ${txt(268, 100, 'Fleksibelt', { size: 9 })}
        ${txt(268, 114, 'men kompliceret', { size: 9 })}
        ${box(16, 140, 290, 22, 'Rosa = brugertråde · blå = kernetråde', { fill: BG, size: 10 })}
        ${txt(160, 182, 'Kun kernetråde kan køre på hver sin CPU-kerne', { size: 10, farve: INK })}`),
      tekst: 'Antallet af kernetråde bestemmer, hvor meget der reelt kan køre samtidig.',
    },
    hvorfor: 'Det forklarer, hvorfor et bibliotek med »grønne tråde« kan blive langsommere end almindelige tråde, når noget blokerer.',
  },

  // ================= Synkronisering =================
  't04-k2': {
    analogi: 'Test-and-set er som at gribe efter den sidste kage og se ned i hånden bagefter: du tager og tjekker i ÉN bevægelse. Hvis du først kiggede og derefter tog, kunne en anden nå at tage den imellem.',
    figur: {
      titel: 'Én udelelig instruktion',
      svg: svg(180, `
        ${txt(80, 14, 'To skridt = hul', { farve: ROED, size: 11 })}
        ${box(14, 28, 132, 22, 'if (lås == fri)', { ...HVID, size: 10 })}
        ${txt(80, 60, '↯ afbrydelse her', { size: 10, farve: ROED })}
        ${box(14, 72, 132, 22, 'lås = taget', { ...HVID, size: 10 })}
        ${txt(80, 110, 'Begge tror,', { size: 10, farve: ROED })}
        ${txt(80, 124, 'de fik låsen', { size: 10, farve: ROED })}
        ${txt(240, 14, 'Ét skridt = sikkert', { farve: '#11998E', size: 11 })}
        ${box(174, 40, 132, 46, 'test_and_set()', { ...GROEN, size: 11 })}
        ${txt(240, 104, 'Hardwaren garanterer,', { size: 10, farve: '#11998E' })}
        ${txt(240, 118, 'at ingen kan komme', { size: 10, farve: '#11998E' })}
        ${txt(240, 132, 'imellem', { size: 10, farve: '#11998E' })}
        ${txt(160, 164, 'Alle låse bygger til sidst på sådan en instruktion', { size: 10 })}`),
      tekst: 'Atomar betyder udelelig: enten er hele operationen sket, eller også er intet sket.',
    },
    hvorfor: 'Derfor kan du ikke selv bygge en sikker lås med almindelige if-sætninger. Du skal bruge hardwarens hjælp.',
  },

  't04-k4': {
    analogi: 'En semafor er kurvene ved indgangen til et supermarked. Er der tre kurve, kan tre kunder komme ind. Den fjerde venter ved døren, til nogen afleverer en kurv. En mutex er det samme med præcis én kurv.',
    figur: {
      titel: 'Semafor: en tæller med ventende',
      svg: svg(180, `
        ${box(14, 24, 120, 60, '', { fill: BG })}
        ${txt(74, 40, 'Tilladelser: 2', { farve: INK, size: 12, fed: 800 })}
        ${box(26, 54, 28, 22, '🎫', { ...GROEN, size: 12 })}
        ${box(60, 54, 28, 22, '🎫', { ...GROEN, size: 12 })}
        ${box(94, 54, 28, 22, '', { fill: '#f1f1f1', stroke: LINE })}
        ${pil(138, 54, 162, 54, { farve: '#11998E' })}
        ${txt(150, 40, 'wait()', { size: 9, farve: '#11998E' })}
        ${box(166, 24, 140, 28, 'Tråd A arbejder', { ...GROEN, size: 11 })}
        ${box(166, 56, 140, 28, 'Tråd B arbejder', { ...GROEN, size: 11 })}
        ${box(166, 92, 140, 28, 'Tråd C venter', { ...ROSA, size: 11 })}
        ${pil(236, 124, 236, 140, { farve: ROED, stiplet: true })}
        ${txt(160, 156, 'C starter først, når A eller B kalder post()', { size: 10, farve: INK })}`),
      tekst: 'wait() trækker én fra og sover, hvis tælleren er nul. post() lægger én til og vækker en ventende.',
    },
    hvorfor: 'Derfor bruges semaforer til at styre, hvor mange der må bruge noget på én gang – fx pladser i en kø.',
  },

  't04-k5': {
    analogi: 'En condition variable er en venteværelse med et opkaldssystem. Du sætter dig kun ned, hvis der ikke er din tur. Bliver dit nummer råbt op, mens du er ude at ryge, hører du det aldrig. Derfor tjekker du altid skærmen igen, når du kommer tilbage.',
    figur: {
      titel: 'Derfor while og ikke if',
      svg: svg(190, `
        ${box(14, 20, 292, 26, 'lås mutex', { fill: BG, size: 11 })}
        ${box(14, 52, 292, 34, 'while (ikke klar)  ←  while, ikke if', { ...ROSA, farve: '#a3123f', size: 11 })}
        ${box(34, 92, 252, 26, 'cv.wait(lås)   (slipper låsen og sover)', { ...BLAA, size: 10 })}
        ${box(14, 124, 292, 26, 'gør arbejdet', { ...GROEN, size: 11 })}
        ${txt(160, 166, 'En tråd kan vågne uden grund (spurious wakeup),', { size: 10 })}
        ${txt(160, 180, 'og en anden kan nå at tage arbejdet først', { size: 10 })}`),
      tekst: 'Signalet huskes ikke. Kommer det, før du venter, er det væk. Derfor tjekker man betingelsen igen efter hver opvågning.',
    },
    hvorfor: 'Det er en klassisk eksamensfælde: skriver du if i stedet for while, virker koden i 99 ud af 100 kørsler.',
  },

  // ================= Deadlock =================
  't05-k4': {
    analogi: 'Fem personer om et rundt bord, én pind mellem hver. Alle tager pinden til venstre samtidig. Nu har alle én pind og venter på den anden. Ingen spiser, ingen giver slip.',
    figur: {
      titel: 'De spisende filosoffer',
      svg: svg(200, `
        <circle cx="160" cy="100" r="58" fill="${BG}" stroke="${LINE}" stroke-width="1.5"/>
        ${box(142, 14, 36, 28, '🧠', { ...ROSA, size: 14 })}
        ${box(238, 66, 36, 28, '🧠', { ...ROSA, size: 14 })}
        ${box(206, 150, 36, 28, '🧠', { ...ROSA, size: 14 })}
        ${box(78, 150, 36, 28, '🧠', { ...ROSA, size: 14 })}
        ${box(46, 66, 36, 28, '🧠', { ...ROSA, size: 14 })}
        <line x1="196" y1="48" x2="212" y2="36" stroke="${ROED}" stroke-width="3" stroke-linecap="round"/>
        <line x1="238" y1="124" x2="248" y2="140" stroke="${ROED}" stroke-width="3" stroke-linecap="round"/>
        <line x1="150" y1="168" x2="168" y2="168" stroke="${ROED}" stroke-width="3" stroke-linecap="round"/>
        <line x1="72" y1="124" x2="62" y2="140" stroke="${ROED}" stroke-width="3" stroke-linecap="round"/>
        <line x1="112" y1="48" x2="98" y2="36" stroke="${ROED}" stroke-width="3" stroke-linecap="round"/>
        ${txt(160, 100, 'Alle venter', { farve: ROED, size: 12, fed: 800 })}`),
      tekst: 'Alle fem holder én pind og venter på naboens. Det er cirkulær venten i sin reneste form.',
    },
    hvordan: [
      'Løsning 1: lad kun fire sidde ved bordet ad gangen (så er der altid én, der kan spise).',
      'Løsning 2: lad én filosof tage højre pind først (bryder symmetrien og dermed cirklen).',
      'Løsning 3: tag kun pindene, hvis begge er ledige (alt eller intet).',
    ],
    hvorfor: 'Det er den nemmeste måde at forklare de fire betingelser for deadlock til en eksamen – og at vise, hvordan man bryder én af dem.',
  },

  // ================= Fil-I/O =================
  't06-k1': {
    analogi: 'I Linux er alt en postkasse med et nummer. Tastaturet, en fil, en lysdiode, netværket. Du behøver ikke vide, hvad der er bagved: du skriver et brev (write) eller kigger efter post (read).',
    figur: {
      titel: 'Filbeskrivere: tal, der peger på ting',
      svg: svg(190, `
        ${box(14, 24, 110, 130, '', { fill: BG })}
        ${txt(69, 14, 'Din proces', { size: 10 })}
        ${box(26, 38, 86, 24, '0  stdin', { ...HVID, size: 11 })}
        ${box(26, 68, 86, 24, '1  stdout', { ...HVID, size: 11 })}
        ${box(26, 98, 86, 24, '2  stderr', { ...HVID, size: 11 })}
        ${box(26, 128, 86, 24, '3  ???', { ...ROSA, size: 11 })}
        ${pil(118, 140, 160, 140)}
        ${box(164, 34, 142, 26, 'Tastatur', { ...GROEN, size: 10 })}
        ${box(164, 64, 142, 26, 'Skærm', { ...GROEN, size: 10 })}
        ${box(164, 94, 142, 26, 'Fil på disken', { ...GROEN, size: 10 })}
        ${box(164, 124, 142, 26, '/dev/i2c-1 (hardware)', { ...GROEN, size: 10 })}
        ${txt(160, 176, 'Samme read() og write() til dem alle', { size: 11, farve: INK })}`),
      tekst: 'En filbeskriver er bare et tal. Kernen slår op i en tabel og ved, hvad tallet peger på.',
    },
    hvorfor: 'Derfor kan du bruge de samme fire funktioner (open, read, write, close) til både en tekstfil og en sensor.',
  },

  // ================= Køer og C++ =================
  't07-k4': {
    analogi: 'Kopiering er at fotokopiere en mappe og give kopien videre. Move er at skubbe selve mappen over bordet: du beholder en tom mappe, og den anden har indholdet. Intet blev kopieret, kun ejerskabet skiftede.',
    figur: {
      titel: 'Kopi mod move',
      svg: svg(190, `
        ${txt(80, 12, 'Kopi', { farve: ROED, size: 11 })}
        ${box(14, 26, 60, 34, 'a', { ...HVID, size: 11 })}
        ${box(90, 26, 60, 34, 'b', { ...HVID, size: 11 })}
        ${box(14, 66, 60, 26, '[data]', { ...ROSA, size: 10 })}
        ${box(90, 66, 60, 26, '[data]', { ...ROSA, size: 10 })}
        ${txt(80, 112, 'To sæt data i hukommelsen', { size: 10 })}
        ${txt(80, 128, 'Dyrt ved store ting', { size: 10, farve: ROED })}
        ${txt(240, 12, 'std::move', { farve: '#11998E', size: 11 })}
        ${box(174, 26, 60, 34, 'a', { fill: '#f1f1f1', stroke: LINE, farve: '#b0b0b0', size: 11 })}
        ${box(250, 26, 60, 34, 'b', { ...HVID, size: 11 })}
        ${box(250, 66, 60, 26, '[data]', { ...GROEN, size: 10 })}
        ${pil(206, 78, 244, 78, { farve: '#11998E' })}
        ${txt(240, 112, 'Kun pointeren flyttede sig', { size: 10 })}
        ${txt(240, 128, 'a er tom, men gyldig', { size: 10, farve: '#11998E' })}
        ${txt(160, 168, 'std::move flytter intet – den siger bare »du må stjæle mit indhold«', { size: 10, farve: INK })}`),
      tekst: 'std::move er en type-omskrivning, ikke en handling. Det er move-konstruktøren, der gør arbejdet.',
    },
    hvorfor: 'Derfor kan du sende en stor vektor gennem en kø uden at kopiere en eneste byte.',
  },

  // ================= I2C =================
  't08-k2': {
    analogi: 'I2C er en telefonkæde med to ledninger. Masteren råber en adresse ud i rummet, og kun den enhed, der hedder det, svarer »ja«. Alle andre er stille.',
    figur: {
      titel: 'En I2C-samtale',
      svg: svg(200, `
        ${box(14, 20, 292, 22, 'START', { ...ROSA, size: 10 })}
        ${box(14, 48, 292, 22, 'Adresse 0x48 + R/W-bit', { ...HVID, size: 10 })}
        ${box(14, 76, 292, 22, 'ACK fra slaven  ✓', { ...GROEN, size: 10 })}
        ${box(14, 104, 292, 22, 'Data-byte(s), hver med ACK', { ...HVID, size: 10 })}
        ${box(14, 132, 292, 22, 'STOP', { ...ROSA, size: 10 })}
        ${txt(160, 174, 'Ingen ACK = ingen enhed svarede på den adresse', { size: 10, farve: ROED })}
        ${txt(160, 190, '(tjek ledninger, adresse og pull-up-modstande)', { size: 10 })}`),
      tekst: 'Hver byte kvitteres. Derfor opdager du med det samme, om enheden overhovedet er der.',
    },
    hvorfor: 'Når i2cdetect viser et tomt gitter, er det netop det manglende ACK, du kigger på.',
  },

  // ================= Hukommelse =================
  't09-k2': {
    analogi: 'En bogreol med huller: du har plads til 10 bøger i alt, men hullerne er spredt som 3 + 4 + 3. En bog på 5 kan ikke stå nogen steder, selvom der er plads nok. Det er fragmentering.',
    figur: {
      titel: 'Ekstern fragmentering',
      svg: svg(170, `
        ${box(14, 30, 292, 40, '', { fill: BG })}
        ${box(20, 36, 50, 28, '', { ...BLAA })}
        ${box(76, 36, 34, 28, 'fri', { fill: '#fff', size: 9 })}
        ${box(116, 36, 60, 28, '', { ...BLAA })}
        ${box(182, 36, 40, 28, 'fri', { fill: '#fff', size: 9 })}
        ${box(228, 36, 44, 28, '', { ...BLAA })}
        ${box(278, 36, 22, 28, 'fri', { fill: '#fff', size: 8 })}
        ${txt(160, 88, 'Fri plads i alt: 96 – men største hul: 40', { size: 11, farve: INK })}
        ${box(60, 104, 200, 26, 'Ønske: 60 sammenhængende  →  afvist', { ...ROSA, farve: '#a3123f', size: 11 })}
        ${txt(160, 152, 'Løsningen er paging: del alt i lige store sider', { size: 10, farve: '#11998E' })}`),
      tekst: 'Fri hukommelse er ikke nok. Den skal også ligge samlet, hvis blokken skal være sammenhængende.',
    },
    hvorfor: 'Det er hele grunden til, at moderne systemer bruger sider i stedet for at give programmerne ét stort sammenhængende stykke.',
  },

  't09-k4': {
    analogi: 'Memory-mapped I/O er en lyskontakt, der er sat ind i din bogreol. Den ligner en plads i reolen, men når du lægger noget på den plads, tænder lyset i stuen. Adressen er ikke hukommelse, den er en ledning.',
    figur: {
      titel: 'En adresse, der styrer hardware',
      svg: svg(180, `
        ${box(14, 26, 120, 120, '', { fill: BG })}
        ${txt(74, 16, 'Adresserum', { size: 10 })}
        ${box(24, 38, 100, 24, '0x1000  RAM', { ...HVID, size: 10 })}
        ${box(24, 66, 100, 24, '0x1004  RAM', { ...HVID, size: 10 })}
        ${box(24, 94, 100, 24, '0x3F20  GPIO', { ...ROSA, size: 10 })}
        ${box(24, 122, 100, 20, '0x1008  RAM', { ...HVID, size: 9 })}
        ${pil(138, 106, 176, 106, { farve: '#a3123f' })}
        ${box(180, 76, 126, 60, '', GROEN)}
        ${txt(243, 96, 'Rigtig hardware', { size: 10 })}
        ${txt(243, 118, '💡 lysdioden tænder', { farve: INK, size: 11 })}
        ${txt(160, 164, '*(volatile uint32_t*)0x3F20 = 1;', { size: 11, farve: INK })}`),
      tekst: 'Derfor skal man skrive volatile: compileren må ikke optimere skrivningen væk, selvom »ingen læser variablen«.',
    },
    hvorfor: 'Glemmer du volatile, kan et helt korrekt program holde op med at virke, så snart du slår optimering til.',
  },

  // ================= C++ =================
  't10-k4': {
    analogi: 'To personer holder hinandens hånd og nægter at give slip, før den anden gør det. Ingen af dem kan gå hjem. Sådan er to shared_ptr, der peger på hinanden: tælleren rammer aldrig nul.',
    figur: {
      titel: 'Cyklus mellem shared_ptr',
      svg: svg(180, `
        ${box(20, 40, 110, 50, 'A', { ...ROSA, size: 14 })}
        ${box(190, 40, 110, 50, 'B', { ...BLAA, size: 14 })}
        ${pil(132, 56, 188, 56, { farve: '#a3123f' })}
        ${pil(188, 76, 132, 76, { farve: '#3b3f9e' })}
        ${txt(160, 44, 'shared_ptr', { size: 9 })}
        ${txt(160, 90, 'shared_ptr', { size: 9 })}
        ${txt(75, 108, 'tæller: 1', { farve: INK, size: 11 })}
        ${txt(245, 108, 'tæller: 1', { farve: INK, size: 11 })}
        ${txt(160, 136, 'Ingen af dem bliver nogensinde slettet', { size: 11, farve: ROED })}
        ${txt(160, 162, 'Fix: lad den ene vej være weak_ptr (tæller ikke med)', { size: 10, farve: '#11998E' })}`),
      tekst: 'shared_ptr tæller ejere. En cyklus betyder, at tælleren aldrig når nul, og hukommelsen bliver aldrig frigivet.',
    },
    hvorfor: 'Det er den mest almindelige måde at lække hukommelse på i moderne C++, hvor man ellers troede man var sikker.',
  },

  // ================= Drivere =================
  't11-k3': {
    analogi: 'En bruger rækker dig en adresse på en seddel og siger »læg det her«. Du er kernen og har nøgler til alle rum. Hvis du bare skriver på den adresse uden at tjekke, kan sedlen pege ind i et rum, brugeren slet ikke måtte røre.',
    figur: {
      titel: 'Derfor copy_to_user()',
      svg: svg(190, `
        ${box(14, 26, 130, 52, 'User space', { ...ROSA, size: 11 })}
        ${txt(79, 90, 'buf (kan være løgn)', { size: 9 })}
        ${box(176, 26, 130, 52, 'Kernen', { ...BLAA, size: 11 })}
        ${txt(241, 90, 'må alt', { size: 9 })}
        ${pil(150, 52, 170, 52, { farve: ROED, stiplet: true })}
        ${box(30, 116, 260, 26, 'copy_to_user(buf, data, n)', { ...GROEN, size: 11 })}
        ${txt(160, 158, 'Tjekker adressen, håndterer page faults og', { size: 10 })}
        ${txt(160, 174, 'returnerer antal bytes, der IKKE blev kopieret', { size: 10 })}`),
      tekst: 'En direkte memcpy til en brugerpointer er et sikkerhedshul og kan crashe kernen.',
    },
    hvorfor: 'Reglen er enkel: i kernen stoler man aldrig på en adresse, der kommer udefra.',
  },

  't11-k5': {
    analogi: 'En interrupt handler er brandalarmen: den skal kun tude og åbne døren. Slukningen, papirarbejdet og oprydningen sker bagefter. Står brandmanden og udfylder skemaer, mens det brænder, går det galt.',
    figur: {
      titel: 'Top half og bottom half',
      svg: svg(180, `
        ${box(14, 24, 140, 66, '', ROSA)}
        ${txt(84, 40, 'TOP HALF', { farve: '#a3123f', size: 10 })}
        ${txt(84, 58, 'Kort og hurtig', { size: 10 })}
        ${txt(84, 74, 'Må ikke sove', { size: 10, farve: ROED })}
        ${pil(158, 56, 178, 56)}
        ${box(182, 24, 124, 66, '', GROEN)}
        ${txt(244, 40, 'BOTTOM HALF', { farve: '#11998E', size: 10 })}
        ${txt(244, 58, 'Workqueue', { size: 10 })}
        ${txt(244, 74, 'Må gerne sove', { size: 10 })}
        ${box(14, 108, 292, 26, 'Forbudt i top half: kmalloc(GFP_KERNEL), mutex, copy_to_user', { fill: BG, size: 10 })}
        ${txt(160, 158, 'Der er ingen proces at lægge i seng – derfor må der ikke soves', { size: 10, farve: INK })}`),
      tekst: 'Top half kvitterer for afbrydelsen og gemmer data. Alt det tunge skubbes til bottom half.',
    },
    hvorfor: 'Sover du i en interrupt handler, låser hele systemet. Det er en af de fejl, der giver et helt dødt kort.',
  },

  // ================= Build =================
  't12-k4': {
    analogi: 'Compileren er en oversætter, der oversætter hvert kapitel for sig og efterlader huller, hvor der står »her skal der henvises til noget«. Linkeren er redaktøren, der samler kapitlerne og udfylder sidehenvisningerne.',
    figur: {
      titel: 'Fra kildekode til kørende program',
      svg: svg(200, `
        ${box(14, 16, 80, 26, 'main.c', HVID)}
        ${box(14, 50, 80, 26, 'util.c', HVID)}
        ${pil(98, 30, 118, 30)}
        ${pil(98, 64, 118, 64)}
        ${box(120, 16, 74, 60, 'compiler', { ...BLAA, size: 10 })}
        ${pil(198, 46, 218, 46)}
        ${box(222, 16, 84, 26, 'main.o', { ...ROSA, size: 10 })}
        ${box(222, 50, 84, 26, 'util.o', { ...ROSA, size: 10 })}
        ${pil(264, 82, 264, 100, { farve: '#a3123f' })}
        ${box(90, 102, 180, 30, 'linker: finder symbolerne', { ...GROEN, size: 10 })}
        ${pil(180, 136, 180, 152)}
        ${box(90, 154, 180, 28, 'program (med adresser)', { fill: BG, size: 11 })}
        ${txt(160, 194, '»undefined reference« = linkeren fandt ikke symbolet', { size: 10, farve: ROED })}`),
      tekst: 'Compileren arbejder på én fil ad gangen. Kun linkeren ser dem alle sammen.',
    },
    hvorfor: 'Det afgør, hvilken fejl du får: manglende erklæring er en compilerfejl, manglende definition er en linkerfejl.',
  },

  // ================= AlgoDat =================
  'algodat-a2': {
    analogi: 'En hashtabel er et garderobesystem, hvor dit navn afgør knagen. Som regel går det lynhurtigt. Men hvis alle i salen hedder det samme, hænger alle jakkerne på én knage, og du skal lede hele rækken igennem.',
    figur: {
      titel: 'Hashtabel: normalt og i værste fald',
      svg: svg(190, `
        ${txt(80, 12, 'Godt spredt: O(1)', { farve: '#11998E', size: 10 })}
        ${box(20, 24, 110, 20, 'plads 0 → Anna', { ...GROEN, size: 9 })}
        ${box(20, 48, 110, 20, 'plads 1 → Bo', { ...GROEN, size: 9 })}
        ${box(20, 72, 110, 20, 'plads 2 → Cem', { ...GROEN, size: 9 })}
        ${box(20, 96, 110, 20, 'plads 3 → Dina', { ...GROEN, size: 9 })}
        ${txt(80, 132, 'Ét opslag, ét hop', { size: 9 })}
        ${txt(240, 12, 'Alle kolliderer: O(n)', { farve: ROED, size: 10 })}
        ${box(180, 24, 110, 20, 'plads 0 → Anna', { ...ROSA, size: 9 })}
        ${box(192, 48, 98, 20, '→ Bo', { ...ROSA, size: 9 })}
        ${box(204, 72, 86, 20, '→ Cem', { ...ROSA, size: 9 })}
        ${box(216, 96, 74, 20, '→ Dina', { ...ROSA, size: 9 })}
        ${txt(240, 132, 'Én lang kæde at gå igennem', { size: 9 })}
        ${txt(160, 168, 'Derfor betyder hash-funktionen og load factor alt', { size: 10, farve: INK })}`),
      tekst: 'O(1) er gennemsnittet, ikke en garanti. Værste fald er stadig O(n).',
    },
    hvorfor: 'Det er derfor en dårlig hash-funktion kan gøre et hurtigt program 1000 gange langsommere uden at ændre en linje logik.',
  },

  'traeer-k2': {
    analogi: 'En heap er et turneringsskema, hvor vinderen altid står øverst. Du behøver ikke sortere alle: du skal bare vide, hvem der er bedst lige nu, og kunne finde den næste hurtigt.',
    figur: {
      titel: 'Træet, der bor i et array',
      svg: svg(190, `
        ${box(134, 16, 40, 24, '2', { ...GROEN, r: 12 })}
        ${box(74, 56, 40, 24, '4', { ...HVID, r: 12 })}
        ${box(194, 56, 40, 24, '3', { ...HVID, r: 12 })}
        ${box(34, 96, 36, 22, '9', { ...HVID, r: 11, size: 10 })}
        ${box(90, 96, 36, 22, '7', { ...HVID, r: 11, size: 10 })}
        ${box(180, 96, 36, 22, '8', { ...HVID, r: 11, size: 10 })}
        <line x1="146" y1="42" x2="104" y2="54" stroke="${LINE}" stroke-width="2"/>
        <line x1="162" y1="42" x2="204" y2="54" stroke="${LINE}" stroke-width="2"/>
        <line x1="86" y1="82" x2="60" y2="94" stroke="${LINE}" stroke-width="2"/>
        <line x1="102" y1="82" x2="110" y2="94" stroke="${LINE}" stroke-width="2"/>
        <line x1="206" y1="82" x2="200" y2="94" stroke="${LINE}" stroke-width="2"/>
        ${box(20, 136, 46, 24, '2', { fill: BG, size: 10 })}
        ${box(68, 136, 46, 24, '4', { fill: BG, size: 10 })}
        ${box(116, 136, 46, 24, '3', { fill: BG, size: 10 })}
        ${box(164, 136, 46, 24, '9', { fill: BG, size: 10 })}
        ${box(212, 136, 46, 24, '7', { fill: BG, size: 10 })}
        ${box(260, 136, 46, 24, '8', { fill: BG, size: 10 })}
        ${txt(160, 178, 'Børn til plads i: 2i+1 og 2i+2 · forælder: (i−1)/2', { size: 10, farve: INK })}`),
      tekst: 'Ingen pointere. Positionen i arrayet ER strukturen, og derfor ligger det hele tæt i cachen.',
    },
    hvorfor: 'Det er grunden til, at en heap i praksis slår et pointer-træ, selvom de har samme O-notation.',
  },

  'grafer-k3': {
    analogi: 'Dijkstra er en vandpøl, der breder sig ud i et rørsystem. Vandet når altid det nærmeste sted først. Men findes der et rør, der trækker tiden baglæns (negativ vægt), holder logikken ikke længere.',
    figur: {
      titel: 'Dijkstra tager altid den billigste hidtil',
      svg: svg(190, `
        ${box(16, 76, 42, 30, 'A', { ...GROEN, r: 15 })}
        ${box(130, 24, 42, 30, 'B', { ...HVID, r: 15 })}
        ${box(130, 124, 42, 30, 'C', { ...HVID, r: 15 })}
        ${box(250, 76, 42, 30, 'D', { ...HVID, r: 15 })}
        <line x1="58" y1="84" x2="130" y2="46" stroke="${LINE}" stroke-width="2"/>
        <line x1="58" y1="98" x2="130" y2="134" stroke="${LINE}" stroke-width="2"/>
        <line x1="172" y1="46" x2="250" y2="84" stroke="${LINE}" stroke-width="2"/>
        <line x1="172" y1="134" x2="250" y2="98" stroke="${LINE}" stroke-width="2"/>
        ${txt(92, 48, '4', { farve: INK, size: 11 })}
        ${txt(92, 124, '1', { farve: INK, size: 11 })}
        ${txt(216, 48, '1', { farve: INK, size: 11 })}
        ${txt(216, 124, '2', { farve: INK, size: 11 })}
        ${txt(160, 176, 'A→C→D = 3 slår A→B→D = 5', { size: 11, farve: INK })}`),
      tekst: 'Man vælger altid den nærmeste uudforskede knude og opdaterer naboerne. En prioritetskø holder styr på »nærmest«.',
    },
    hvorfor: 'Med negative vægte kan en knude, der allerede er afsluttet, blive billigere bagefter. Så skal du bruge Bellman-Ford i stedet.',
  },

  'dp-k4': {
    analogi: 'Grådighed er at tage det største stykke kage nu. Med danske mønter virker det altid. Med fantasimønter på 1, 3 og 4 vil grådighed give 6 = 4+1+1 (tre mønter), mens 3+3 kun er to.',
    figur: {
      titel: 'Når grådighed går galt',
      svg: svg(180, `
        ${txt(80, 14, 'Grådigt: 6 kr', { farve: ROED, size: 11 })}
        ${box(20, 30, 40, 30, '4', { ...ROSA, r: 15 })}
        ${box(66, 30, 40, 30, '1', { ...ROSA, r: 15 })}
        ${box(112, 30, 40, 30, '1', { ...ROSA, r: 15 })}
        ${txt(80, 78, '3 mønter', { size: 11, farve: ROED })}
        ${txt(240, 14, 'Bedst: 6 kr', { farve: '#11998E', size: 11 })}
        ${box(196, 30, 40, 30, '3', { ...GROEN, r: 15 })}
        ${box(242, 30, 40, 30, '3', { ...GROEN, r: 15 })}
        ${txt(240, 78, '2 mønter', { size: 11, farve: '#11998E' })}
        ${box(20, 104, 280, 26, 'Mønter: 1, 3 og 4', { fill: BG, size: 11 })}
        ${txt(160, 152, 'Grådighed virker kun, hvis det lokale valg', { size: 10 })}
        ${txt(160, 168, 'aldrig spærrer for den bedste helhed', { size: 10 })}`),
      tekst: 'Grådighed er hurtig og ofte rigtig, men skal bevises. DP prøver alle kombinationer systematisk.',
    },
    hvorfor: 'Til eksamen er spørgsmålet aldrig »er grådighed hurtigst?«, men »kan jeg bevise, at den giver det rigtige svar?«',
  },
};
