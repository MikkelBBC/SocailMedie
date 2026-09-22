// Analogier til de tekniske koncepter, der manglede en.
//
// Reglen for en god analogi her: den skal ramme den ene mekanisme, kortet handler om,
// og den skal kunne brydes. Derfor står der ofte, hvor sammenligningen holder op –
// en analogi, man tror på for længe, bliver selv en misforståelse.
//
// Samme format som forklaringer.js: { analogi, figur?, hvordan?, hvorfor? }.
import { box, txt, pil, svg, INK, LINE, BG } from './forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  // ================= Basics =================
  't00-k3': {
    analogi: 'Tænk på en kontorbygning med tre slags nøglekort: dit eget, afdelingens og gæstens. For hvert rum står der på en lille tavle, hvad hver af de tre må: kigge ind (r), rykke rundt på møblerne (w) og gå ind ad døren (x). `-rwxr-x---` er bare den tavle skrevet ned i ni felter.',
    figur: {
      titel: 'Ni ja/nej-felter',
      svg: svg(180, `
        ${txt(160, 14, '- rwx r-x ---', { farve: INK, size: 22, fed: 800 })}
        ${box(60, 34, 66, 26, 'ejer', { ...GROEN, size: 11 })}
        ${box(134, 34, 66, 26, 'gruppe', { ...BLAA, size: 11 })}
        ${box(208, 34, 66, 26, 'andre', { ...ROSA, size: 11 })}
        ${txt(93, 78, 'rwx = 7', { size: 11 })}
        ${txt(167, 78, 'r-x = 5', { size: 11 })}
        ${txt(241, 78, '--- = 0', { size: 11 })}
        ${box(104, 96, 112, 30, '750', { ...GUL, size: 20 })}
        ${txt(160, 146, 'r=4  w=2  x=1  ·  læg tallene sammen pr. klasse', { size: 10 })}
        ${txt(160, 166, 'På en mappe betyder x »må gå ind i«, ikke »må køre«', { size: 10, farve: ROED })}`),
      tekst: 'Oktaltallet er ikke en kode, man skal lære udenad. Det er de tre grupper lagt sammen hver for sig.',
    },
    hvorfor: 'Det er den hyppigste årsag til »Permission denied« på en Pi: ikke at filen mangler r, men at en mappe på vejen mangler x, så du slet ikke kan gå derind.',
  },

  // ================= Processer =================
  't01-k2': {
    analogi: 'En kok på et travlt køkken er sjældent i gang med at skære. Han venter på, at ovnen siger bip, at opvaskeren bliver fri, eller at tjeneren kommer med en ordre. **Running** er de sekunder, kniven faktisk rører maden. **Waiting** er ovnen. **Ready** er at stå klar med hænderne på bordet, mens en anden bruger komfuret.',
    hvorfor: 'Det forklarer, hvorfor en maskine med 4 kerner sagtens kan køre 300 processer: de fleste sover og venter på noget, der er millioner af gange langsommere end CPU\'en.',
  },

  // ================= Lambdas =================
  't02-k2': {
    analogi: 'En almindelig funktion er en seddel med en instruks. En functor er en **person** med den instruks i hovedet – og et notesblok i lommen. Sender du personen ud i verden, husker hun stadig, at grænsen var 18. Sedlen kan ikke huske noget.',
    hvorfor: 'Det er derfor, en functor ofte er hurtigere end en funktionspointer: compileren ved præcis, hvilken person den har med at gøre, og kan skrive instruksen direkte ind på stedet i stedet for at slå op i en pointer under kørslen.',
  },
  't02-k3': {
    analogi: 'Du skriver en huskeseddel på bagsiden af en kuvert. Compileren tager sedlen, laver en ordentlig formular ud af den, giver formularen et navn, ingen andre nogensinde ser, og arkiverer den. Lambdaen er din kuvert. Closure-typen er formularen. Objektet er den udfyldte kopi.',
    hvorfor: 'Derfor har to lambdaer, der ser fuldstændig ens ud, **forskellige typer**. Compileren lavede to formularer. Det er også derfor, du skal bruge `auto` eller `std::function` for at gemme en.',
  },
  't02-k4': {
    analogi: 'Du sender et postkort hjem fra ferie. `[x]` er at skrive tallet ned på kortet: det står der, uanset hvad der sker derhjemme. `[&x]` er at skrive »se på tavlen i køkkenet«. Kommer kortet frem, efter nogen har revet køkkenet ned, peger beskeden på ingenting. Det er en dangling reference.',
    hvorfor: 'Den fælde rammer især tråde: lambdaen med `[&]` sendes af sted, funktionen, den blev lavet i, returnerer, dens lokale variabler forsvinder – og tråden læser dem bagefter. Fanger du by value, findes problemet ikke.',
  },

  // ================= Tråde og scheduling =================
  't03-k4': {
    analogi: 'Kassen i Netto. **FCFS** er én kø: står der en med en fyldt vogn forrest, venter alle med én liter mælk bag ham (convoy effect). **SJF** er en kasse, hvor personalet kigger i kurvene og lukker de hurtigste frem – det giver kortest ventetid i gennemsnit, men kræver, at man kan **se** ind i kurvene. **Round Robin** er, at alle får lov til at scanne tre varer, og så må man stille sig bagerst igen.',
    hvorfor: 'Pointen ved SJF er, at det er beviseligt optimalt for gennemsnitlig ventetid – og alligevel ubrugeligt i ren form, fordi ingen kender næste CPU-burst. Derfor **gætter** systemet med et eksponentielt gennemsnit af de foregående.',
  },
  't03-k5': {
    analogi: 'Nice-værdier er kolleger, der deler et mødelokale efter en fordelingsnøgle: nice 19 er ham, der altid siger »tag du bare min tid«. Real-time-prioriteter er en brandalarm. Når den går, stopper mødet – uanset hvor vigtigt det var, og uanset hvor længe alarmen så har lokalet.',
    hvorfor: 'Det er derfor, en løbsk `SCHED_FIFO`-tråd kan fryse hele maskinen: der findes ingen retfærdighed på det niveau. CFS/EEVDF deler tiden; real-time tager den.',
  },

  // ================= Deadlock =================
  't05-k2': {
    analogi: 'Tegn hvem der venter på hvem, med pile. Hvis du kan følge pilene rundt og ende, hvor du startede, venter alle i en ring, og ingen af dem kan komme videre. Kan du ikke lukke ringen, er der altid mindst én, der kan komme i gang – og når han bliver færdig, slipper han sit fri til den næste.',
    figur: {
      titel: 'Cyklus = ingen kan komme videre',
      svg: svg(180, `
        ${txt(80, 14, 'Cyklus (deadlock)', { farve: ROED, size: 11 })}
        <circle cx="42" cy="56" r="17" fill="#fff" stroke="${LINE}" stroke-width="1.5"/>
        ${txt(42, 60, 'T1', { farve: INK, size: 11 })}
        ${box(102, 42, 30, 28, 'R2', { ...ROSA, size: 10 })}
        <circle cx="42" cy="120" r="17" fill="#fff" stroke="${LINE}" stroke-width="1.5"/>
        ${txt(42, 124, 'T2', { farve: INK, size: 11 })}
        ${box(102, 106, 30, 28, 'R1', { ...ROSA, size: 10 })}
        ${pil(60, 52, 100, 52, { farve: ROED })}
        ${pil(102, 124, 62, 124, { farve: ROED })}
        ${pil(117, 74, 117, 104, { farve: ROED })}
        ${pil(30, 104, 30, 74, { farve: ROED })}
        ${txt(240, 14, 'Ingen cyklus', { farve: '#11998E', size: 11 })}
        <circle cx="205" cy="56" r="17" fill="#fff" stroke="${LINE}" stroke-width="1.5"/>
        ${txt(205, 60, 'T1', { farve: INK, size: 11 })}
        ${box(262, 42, 30, 28, 'R2', { ...GROEN, size: 10 })}
        <circle cx="205" cy="120" r="17" fill="#fff" stroke="${LINE}" stroke-width="1.5"/>
        ${txt(205, 124, 'T2', { farve: INK, size: 11 })}
        ${box(262, 106, 30, 28, 'R1', { ...GROEN, size: 10 })}
        ${pil(223, 52, 260, 52, { farve: '#11998E' })}
        ${pil(260, 124, 225, 124, { farve: '#11998E' })}
        ${txt(160, 166, 'Én instans pr. type: cyklus betyder altid deadlock', { size: 10 })}`),
      tekst: 'Med flere instanser af samme ressourcetype er en cyklus kun en mistanke. Så skal du kigge videre.',
    },
  },
  't05-k3': {
    analogi: 'Fire måder at undgå sammenstød i et lyskryds. **Prevention** er at bygge krydset om, så to biler fysisk ikke kan mødes. **Avoidance** er en vagt, der kender alles rute og kun lukker en bil ind, hvis der stadig findes en vej ud for alle. **Detection** er en kamera, der opdager proppen bagefter og beder én om at bakke. **Ignorance** er at lade være og regne med, at folk selv finder ud af det – hvilket er præcis, hvad Linux og Windows gør.',
    hvorfor: 'At de store styresystemer vælger strudsealgoritmen er ikke sjusk. Avoidance kræver, at hver proces oplyser sit maksimale behov på forhånd, og det ved næsten ingen program på forhånd.',
  },

  // ================= File I/O og GPIO =================
  't06-k3': {
    analogi: 'Du venter på pakker fra ti forskellige firmaer. Uden `poll` går du ud til postkassen igen og igen hele dagen (busy waiting) og bruger al din tid på ingenting. Med `poll` sætter du dig ned og siger: »Vækket mig, når der kommer noget i **en af** de ti kasser – eller om senest en time.«',
    hvorfor: 'Det er forskellen på 100 % CPU-forbrug og 0 %. Programmet sover i kernen, indtil der faktisk er noget at lave, og det er fundamentet under alt event-drevet I/O.',
  },
  't06-k4': {
    analogi: 'Level-triggered er en dørklokke, der bliver ved med at ringe, så længe fingeren holdes nede. Edge-triggered er en, der giver ét pling i det øjeblik, fingeren rører knappen. Vil du vide, om nogen **står** ved døren, skal du bruge den første. Vil du **tælle** besøgende, skal du bruge den anden.',
    hvorfor: 'Det forklarer også den klassiske sysfs-fælde: du skal læse `value` én gang, **før** du poller. Ellers står der stadig en gammel hændelse og venter, og dit første `poll` vender tilbage med det samme uden at der er sket noget nyt.',
  },

  // ================= Køer og beskeder =================
  't07-k2': {
    analogi: 'To kontorer kan dele ét skrivebord, hvor begge roder i de samme papirer – så skal de hele tiden aftale, hvem der må røre hvad. Eller de kan have hvert sit skrivebord og sende hinanden sedler gennem én postkasse. Postkassen er det eneste sted, der skal holdes styr på, og det sted er lavet rigtigt én gang.',
    hvorfor: 'Det er hele idéen bag aktørmodellen og Go\'s kanaler. Antallet af steder, hvor en race condition kan opstå, falder fra »overalt hvor data deles« til »inde i køen«.',
  },
  't07-k3': {
    analogi: 'En struct er en blanket, hvor **alle** felter skal udfyldes: navn **og** adresse **og** cpr. En variant er afkrydsningsfeltet »jeg rejser med: ☐ bil ☐ tog ☐ fly« – præcis ét kryds, aldrig nul, aldrig to. `std::visit` er sagsbehandleren, der er tvunget til at have et svar klar for hver af de tre muligheder.',
    hvorfor: 'Gevinsten er, at compileren fanger de manglende tilfælde. Tilføjer du en fjerde beskedtype, bliver din `visit` en compilerfejl i stedet for en besked, der bare bliver tabt på gulvet under kørslen.',
  },
  't07-k5': {
    analogi: 'En radiostation sender på en frekvens. Den ved ikke, hvem der har tændt, og den er ligeglad. Lytterne stiller ind på det, de gerne vil høre. Skal der komme en lytter mere til, skal studiet ikke laves om.',
    hvorfor: 'Løs kobling er ikke et pænt ord: det er forskellen på at kunne tilføje en logger til dit system uden at røre en eneste afsender, og at skulle finde og ændre alle ti steder, der sender.',
  },

  // ================= Serielle busser =================
  't08-k1': {
    analogi: 'I2C er en telefonkæde på landet med to ledninger: alle er koblet på den samme linje. Man må kun **trække** linjen ned (aldrig skubbe den op), og en fjeder trækker den tilbage op igen – derfor kan to, der taler samtidig, ikke brænde hinanden af. Hver deltager har et nummer, og masteren råber nummeret op, før han taler.',
    hvorfor: 'Open-drain er ikke en detalje for elektrikere. Det er netop dét, der gør det ufarligt at hænge mange enheder på de samme to ledninger, og derfor at I2C klarer sig med to ben på chippen.',
  },
  't08-k3': {
    analogi: 'Det er som at bestille på en restaurant, hvor du først siger tjenerens navn én gang (`ioctl I2C_SLAVE`), og bagefter bare kan sige »det sædvanlige« igen og igen. Adressen sidder i filbeskrivelsen, ikke i hver besked.',
    hvorfor: 'Forskellen mellem `write` + `read` og `I2C_RDWR` er, om du rejser dig fra bordet imellem. Nogle sensorer glemmer, hvad du spurgte om, hvis der kommer et STOP – de kræver repeated START.',
  },
  't08-k4': {
    analogi: 'Hvis I2C er en telefonkæde, er SPI et rør mellem to kontorer med én snor til hver retning – og en kontakt, du fysisk vipper, for at vælge hvilket kontor du taler med. Ingen navne, ingen adresser: du peger. Til gengæld er der heller ingen, der siger »modtaget«.',
    hvorfor: 'Det er derfor, SPI er hurtigere og samtidig mere skrøbeligt: der er ingen kvittering. Sidder ledningen løst, opdager du det ikke – du får bare nuller eller 0xFF tilbage, som om det var data.',
  },
  't08-k5': {
    analogi: 'Full duplex er som et rør med to båndoptagere: i det øjeblik du sender dine bytes af sted, kommer der lige så mange bytes den anden vej. Derfor skal `tx` og `rx` være lige lange – også når du kun er interesseret i den ene retning og bare sender nuller for at få hjulet til at dreje.',
    hvorfor: 'Det forklarer den bit, alle falder over med en IMU: for at **læse** et register skal den højeste bit i adressen være 1. Du sender et ønske ud samtidig med, at svaret kommer ind.',
  },

  // ================= Hukommelse =================
  't09-k3': {
    analogi: 'Prøv at fylde en flyttekasse med møbler i alle mulige størrelser: der bliver huller overalt, og det næste møbel passer aldrig i hullerne (ekstern fragmentering). Paging siger: skil alting ad i ens LEGO-klodser. Så passer hver klods i hvert hul. Prisen er, at den sidste klods sjældent er helt fuld (intern fragmentering).',
    figur: {
      titel: 'Ens klodser passer altid',
      svg: svg(180, `
        ${txt(80, 14, 'Uens blokke', { farve: ROED, size: 11 })}
        ${box(14, 26, 130, 22, 'A', { ...ROSA, size: 10 })}
        ${box(14, 52, 130, 12, '', { fill: '#f2f0ec' })}
        ${box(14, 68, 130, 34, 'B', { ...ROSA, size: 10 })}
        ${box(14, 106, 130, 10, '', { fill: '#f2f0ec' })}
        ${box(14, 120, 130, 26, 'C', { ...ROSA, size: 10 })}
        ${txt(80, 164, 'huller, intet passer', { size: 10, farve: ROED })}
        ${txt(240, 14, 'Ens sider', { farve: '#11998E', size: 11 })}
        ${[0, 1, 2, 3, 4].map((i) => box(176, 26 + i * 24, 130, 20, `side ${i}`, { ...GROEN, size: 9 })).join('')}
        ${txt(240, 164, 'hver side passer i hver frame', { size: 10, farve: '#11998E' })}`),
      tekst: 'Med 4 KB sider er offset de nederste 12 bits af adressen. Resten er sidenummeret, som slås op i sidetabellen.',
    },
    hvorfor: 'Adressen deles ikke ved at dividere, men ved at skære bits over. Det er derfor, sidestørrelser altid er en potens af 2: så er opdelingen gratis i hardware.',
  },

  // ================= RAII og ejerskab =================
  't10-k2': {
    analogi: 'En garderobe på et diskotek. Du afleverer jakken og får et nummer (konstruktøren). Når du forlader lokalet – uanset om du går selv, bliver smidt ud, eller der går brandalarm (exception) – kommer du forbi garderoben. Der findes ingen udgang uden om den.',
    hvorfor: 'Det er hele svaret på, hvorfor C++ ikke har `finally`. Oprydningen ligger i typen i stedet for i hvert eneste kaldested, så den kan ikke glemmes ét sted ud af tredive.',
  },
  't10-k3': {
    analogi: 'Én husnøgle, ingen kopimaskine. Du kan **give** nøglen videre (`std::move`), og så har du den ikke længere. Du kan ikke lave en kopi, for så var der to, der troede, de bestemte over huset – og to, der begge ville låse af til sidst.',
    hvorfor: 'At kopikonstruktøren er **slettet**, er ikke en begrænsning, men beviset: hvis koden compiler, findes der højst én ejer. Double free kan ikke opstå.',
  },
  't10-k5': {
    analogi: 'Signaturen er en kontrakt skrevet på døren. `Widget&` betyder »jeg låner den og giver den tilbage«. `unique_ptr<Widget>` by value betyder »du afleverer den til mig, og jeg smider den ud, når jeg er færdig«. `unique_ptr<Widget>&` betyder »jeg må lægge noget **andet** i din lomme«.',
    hvorfor: 'Derfor er `std::move` på kaldestedet ikke støj, men dokumentation: læseren kan se på linjen, at ejerskabet skifter hænder her – uden at slå funktionen op.',
  },

  // ================= Drivere =================
  't11-k1': {
    analogi: 'En almindelig app er en gæst i huset: går der noget galt, bliver hun vist ud. Et kernemodul er en håndværker, du har givet nøgle til el-tavlen. Han kan reparere ting, ingen andre kan komme til – og han kan slukke for hele huset ved et uheld.',
    hvorfor: 'Det er derfor, en segfault i en app giver en fejlmeddelelse, mens den samme fejl i et modul giver en kernel panic. Der er ingen over kernen til at fange faldet.',
  },
  't11-k2': {
    analogi: 'Et telefonnummer med retningsnummer og abonnentnummer. **Major** er retningsnummeret: hvilken central (driver) skal have opkaldet. **Minor** er abonnenten: hvilken af centralens enheder – GPIO 0, 1 eller 2.',
    hvorfor: 'Det forklarer, hvorfor én driver kan betjene 32 enheder med samme kode: den får minor-nummeret med ind i `open` og bruger det som indeks.',
  },
  't11-k4': {
    analogi: 'En natportner. I stedet for at gå runder hele natten (polling) lægger han sig til at sove ved siden af en snor, der hænger ned fra dørklokken. Interruptet hiver i snoren, portneren vågner, gør sit, og lægger sig igen. Han bruger ingen energi imellem.',
    hvorfor: 'Derfor betyder `wait_event_interruptible`, at læsekaldet fra user space bare ser ud som et langsomt `read`. Hele kompleksiteten med at sove og blive vækket ligger i driveren, ikke i programmet.',
  },

  // ================= Build =================
  't12-k1': {
    analogi: 'En kagefabrik, hvor du ændrer opskriften på cremen. Et dumt system bager alt om fra bunden. Et klogt system kender kæden – creme → lagkage → kagebord – og bager kun det, der faktisk indeholder creme.',
    hvorfor: 'Derfor er en forkert afhængighed farligere end en langsom build: hvis systemet ikke **ved**, at din header indgår i en .cpp, springer den over, og du fejlsøger på en binær, der indeholder gammel kode.',
  },
  't12-k3': {
    analogi: 'CMake er ikke kokken. CMake er ham, der læser din menu og skriver den rigtige arbejdsseddel til det køkken, du står i – gasblus i Linux, induktion i Windows. Du beskriver retten én gang; han oversætter til stedet.',
    hvorfor: 'Det er hele pointen med `target_link_libraries(... PUBLIC ...)`: du beskriver **forholdet** mellem målene, og CMake regner selv de konkrete flag ud til den generator, du bruger.',
  },

  // ================= Algoritmer og datastrukturer =================
  'algodat-a3': {
    analogi: 'En reol, der er fyldt op. Du køber en dobbelt så stor, flytter alle bøgerne over og har derefter plads til lige så mange nye, som du allerede havde. Flytningen er hårdt arbejde, men næste flytning ligger dobbelt så langt ude i fremtiden – og den næste igen dobbelt så langt.',
    figur: {
      titel: 'Derfor bliver fordobling gratis i gennemsnit',
      svg: svg(170, `
        <line x1="24" y1="120" x2="306" y2="120" stroke="${LINE}" stroke-width="1.5"/>
        ${[[36, 8], [60, 12], [104, 20], [188, 36]].map(([x, h]) => box(x, 120 - h, 14, h, '', ROSA)).join('')}
        ${txt(43, 134, '1', { size: 9 })}
        ${txt(67, 134, '2', { size: 9 })}
        ${txt(111, 134, '4', { size: 9 })}
        ${txt(195, 134, '8', { size: 9 })}
        ${txt(160, 152, 'kopieringer: 1 + 2 + 4 + 8 + … < 2n for n indsættelser', { size: 10 })}
        ${txt(160, 18, 'Toppene bliver højere – men de kommer meget sjældnere', { size: 10 })}
        ${box(206, 40, 100, 30, 'amortiseret O(1)', { ...GROEN, size: 11 })}`),
      tekst: 'Havde man i stedet udvidet med en fast mængde, ville toppene komme lige så tit hele vejen, og summen ville blive O(n²).',
    },
    hvorfor: 'Det er forskellen på **worst case** og **amortiseret**: den enkelte append kan tage lang tid, men ingen serie af appends kan være langsom i gennemsnit. Det er en garanti om summen, ikke om det enkelte kald.',
  },
  'algodat-a4': {
    analogi: 'En linked list er en skattejagt: hver seddel fortæller kun, hvor den næste ligger, og sedlerne er spredt ud over hele byen. Et array er en side i en bog. At rykke tyve linjer ned på siden går stærkt, fordi alt ligger under fingeren. Skattejagten koster en køretur pr. seddel.',
    hvorfor: 'Lærebogens O(1) tæller antal operationer, ikke hvad en operation koster. Et cache-miss er omkring 100 gange dyrere end et hit, og derfor taber den »hurtigere« datastruktur i praksis, indtil elementerne bliver rigtig store.',
  },
  'algodat-a5': {
    analogi: 'Du deler en bunke prøver i to efter et midtertal. Rammer du nogenlunde midten, halveres bunken hver gang, og du er færdig på ingen tid. Vælger du altid det mindste tal som skillelinje, får du en bunke med nul og en bunke med resten – og så har du i virkeligheden bare taget én ad gangen.',
    hvorfor: 'Det er en generel lektie om algoritmer: den gennemsnitlige køretid er ikke en garanti. Derfor bruger rigtige implementeringer median-of-three eller en tilfældig pivot – ikke for at blive hurtigere, men for at gøre det katastrofale tilfælde usandsynligt.',
  },
  'traeer-k3': {
    analogi: 'Skadestuens venteværelse. Man bliver ikke behandlet efter, hvornår man kom ind, men efter hvor slemt det er. Nye patienter kan springe forbi, og personalet skal hele tiden kunne svare på ét spørgsmål: hvem er værst lige nu?',
    hvorfor: 'Når du kan genkende det spørgsmål, kan du genkende datastrukturen. Dijkstra, en OS-scheduler, Huffman-kodning og en event-simulering stiller alle nøjagtig det samme spørgsmål igen og igen.',
  },
  'traeer-k4': {
    analogi: 'Hver vennegruppe har en talsmand. »Er I to i samme gruppe?« bliver til »har I samme talsmand?«. **Union by size** er, at den lille gruppe slår sig sammen under den stores talsmand, ikke omvendt. **Path compression** er, at alle, du spurgte undervejs, får talsmandens nummer skrevet direkte i telefonen, så næste opslag er ét kald.',
    hvorfor: 'De to tricks hver for sig er gode. Sammen giver de en køretid, der vokser så langsomt (inverse Ackermann), at den i praksis er en konstant under 5 for enhver datamængde, der kan være i et univers.',
  },
  'grafer-k1': {
    analogi: 'Tænk på et selskab, hvor du skal notere, hvem der kender hvem. **Adjacency list** er, at hver gæst har en lille seddel med navnene på dem, hun kender. **Adjacency matrix** er et kæmpe skema med alle gæster både ned og hen, hvor du sætter kryds. Skemaet er hurtigt at slå op i, men bruger plads til alle de par, der aldrig har mødt hinanden.',
    hvorfor: 'Næsten alle virkelige grafer er sparse: du kender måske 300 mennesker ud af 8 milliarder. Derfor er listen standardvalget, og matricen kun til små eller meget tætte grafer.',
  },
  'grafer-k4': {
    analogi: 'Du skal forbinde alle huse i en landsby med vandrør og vil bruge mindst muligt rør. **Kruskal** lægger alle mulige rørstykker på bordet, sorterer efter længde, og tager det korteste, der forbinder to områder, som ikke allerede hænger sammen. **Prim** starter ved ét hus og vokser nettet udad ved altid at tilføje det korteste rør ud til et hus, der endnu ikke er koblet på.',
    hvorfor: 'At to så forskellige fremgangsmåder ender med samme samlede længde er ikke tilfældigt. Det følger af cut-egenskaben: den letteste kant over enhver deling af graven er altid med i et MST.',
  },
  'dp-k1': {
    analogi: 'En chef deler et projekt ud til tre medarbejdere, som hver får en tredjedel – og som gør det samme med deres del. Master-sætningen spørger kun om én ting: bruges der mest tid **oppe i toppen** på at dele ud og samle sammen, eller **nederst** af de mange små? Den tungeste ende bestemmer prisen.',
    hvorfor: 'Derfor behøver du ikke at rulle rekursionen ud. Du sammenligner arbejdet pr. niveau, f(n), med antallet af blade, n^(log_b a), og læser svaret af.',
  },
  'dp-k3': {
    analogi: 'De tre problemer er den samme sudoku med forskellige tal. Du fylder et skema ud, hvor hver celle kun må kigge på celler, du allerede har udfyldt. Er den regel på plads, er rækkefølgen givet, og svaret står i det sidste felt.',
    hvorfor: 'Det er derfor, de fire spørgsmål er værd at lære udenad: hvad betyder en celle, hvordan følger den af mindre celler, hvad er bunden, og i hvilken rækkefølge fyldes der. Kan du svare på dem, har du løst opgaven, før du skriver en linje kode.',
  },

  // ================= Investering =================
  'invdk-k3': {
    analogi: 'Det er som fartbøder med to takster. Kører du 5 km/t for hurtigt, betaler du den lave takst for de 5. Kører du 40 for hurtigt, betaler du stadig den lave takst for de første 5 – den høje gælder kun for resten. Hele beløbet hopper ikke op, bare fordi du passerer grænsen.',
    hvorfor: 'Den misforståelse koster folk penge: mange tror, at de »ryger i 42 %«, og sælger derfor for lidt. I virkeligheden er det kun kronerne over grænsen, der rammes.',
  },
};
