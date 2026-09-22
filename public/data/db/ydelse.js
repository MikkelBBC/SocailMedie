// Databaser: hvorfor det er langsomt, og hvad transaktioner egentlig lover.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'ydelse', nr: 1, titel: 'Indeks, planer og transaktioner', kort: 'DB-ydelse', emoji: '⚡',
    farve: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED 0%, #F472B6 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Et indeks er bogens stikordsregister. Derfor virker det kun forfra.',
      body: 'Uden indeks må databasen læse **hver eneste række** for at finde dine. Det kaldes en **full table scan** og koster tid i forhold til tabellens størrelse.\n\nEt indeks er en sorteret struktur, typisk et **B-træ**, som databasen kan slå op i i O(log n). Ved en million rækker er det cirka 20 trin i stedet for en million.\n\nPrisen betales ved skrivning: hver `INSERT`, `UPDATE` og `DELETE` skal også opdatere indekset. Et indeks pr. kolonne »for en sikkerheds skyld« gør skrivninger mærkbart langsommere uden at hjælpe læsninger.\n\nTo ting, der overrasker:\n• **Sammensat indeks** på `(land, by)` hjælper søgninger på `land` og på `land + by`, men **ikke** på `by` alene. Ligesom et register sorteret efter efternavn er ubrugeligt, hvis du kun kender fornavnet.\n• Pakker du kolonnen ind i en funktion – `WHERE lower(mail) = ...` – kan indekset på `mail` ikke bruges. Databasen har jo ikke sorteret efter `lower(mail)`.',
      analogi: 'Bagerst i en lærebog står stikordsregistret sorteret alfabetisk. Det er derfor, du kan slå »mutex« op på to sekunder – og derfor du ikke kan bruge det til at finde »alle ord, der ender på -ex«.',
      figur: {
        titel: 'Scan mod opslag',
        svg: svg(180, `
          ${txt(80, 14, 'Uden indeks', { farve: ROED, size: 11 })}
          ${[0, 1, 2, 3, 4, 5].map((i) => box(14 + (i % 3) * 44, 26 + Math.floor(i / 3) * 26, 40, 22, '', { ...ROSA })).join('')}
          ${txt(80, 100, '1.000.000 rækker læses', { size: 10, farve: ROED })}
          ${txt(240, 14, 'Med B-træ', { farve: '#11998E', size: 11 })}
          ${box(212, 26, 56, 22, 'rod', { ...GROEN, size: 10 })}
          ${pil(228, 50, 206, 66)}
          ${pil(252, 50, 274, 66)}
          ${box(180, 68, 52, 22, '', GROEN)}
          ${box(248, 68, 52, 22, '', GROEN)}
          ${txt(240, 106, 'ca. 20 trin', { size: 10, farve: '#11998E' })}
          ${box(14, 124, 292, 24, 'Prisen: hver skrivning skal opdatere indekset', { ...GUL, size: 11 })}
          ${txt(160, 168, 'Indeks på (land, by) hjælper ikke en søgning på by alene', { size: 10 })}`),
        tekst: 'Et indeks flytter arbejde fra læsning til skrivning. Det er en handel, ikke en gratis gevinst.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvilken søgning kan et sammensat indeks på (land, by) IKKE hjælpe?',
      svar: [
        'En sortering af resultatet efter land',
        'En søgning på by alene uden land',
        'En søgning på land alene i tabellen',
        'En søgning på både land og by samtidig',
      ],
      rigtigt: 1,
      forklaring: 'Indekset er sorteret efter land først. Kender du ikke landet, er der ingen vej ind – som et register sorteret efter efternavn, når du kun kender fornavnet.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'EXPLAIN er det eneste sted, gætteri bliver til viden.',
      body: 'Databasen oversætter din SQL til en **query-plan**: den konkrete rækkefølge af scans, opslag og joins. Planen vælges af en **cost-based optimizer** ud fra statistik om, hvor mange rækker der findes, og hvordan værdierne fordeler sig.\n\n`EXPLAIN ANALYZE <din query>` viser planen **og** hvad der faktisk skete. Tre ting at kigge efter:\n\n• **Seq Scan** på en stor tabel, hvor du forventede et indeksopslag.\n• Stor forskel på `rows=` (gættet) og `actual rows=` (virkeligheden). Så er statistikken forældet, og planen bygger på et forkert grundlag.\n• Et **Nested Loop** over mange rækker, hvor en hash join ville være billigere.\n\nDet er vigtigt at forstå, at optimeringen er et **gæt** baseret på statistik. Derfor kan den samme query få en ny plan i morgen, fordi data har ændret sig – og derfor bliver noget pludselig langsomt uden at nogen har rørt koden.\n\nAt læse en plan er en af de færdigheder, der betaler sig hurtigst: du holder op med at gætte på, hvorfor noget er langsomt.',
      analogi: 'GPS\'en vælger rute ud fra et kort over, hvor der plejer at være trafik. Er kortet gammelt, kører du ad en vej, der har været lukket i et halvt år – og bilen har ikke gjort noget forkert.',
      hvorfor: 'Derfor starter fejlsøgning af en langsom query altid med EXPLAIN, ikke med at tilføje indekser og håbe.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad betyder det, hvis EXPLAIN ANALYZE viser rows=10 men actual rows=90000?',
      svar: [
        'At forespørgslen har fundet for mange rækker',
        'At databasen har kørt forespørgslen to gange',
        'At statistikken er forældet, så planen er valgt forkert',
        'At der mangler en WHERE-betingelse i forespørgslen',
      ],
      rigtigt: 2,
      forklaring: 'Optimizeren valgte plan ud fra et gæt på 10 rækker. Når der er 90.000, er en nested loop pludselig katastrofal. Løsningen begynder med at opdatere statistikken (ANALYZE).',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'N+1: den fejl, der gør 1 forespørgsel til 1.001 – og som aldrig ses i udvikling.',
      body: 'Du henter 1.000 ordrer. Så løber koden dem igennem og henter kundens navn for hver. Det er **1 + 1.000** forespørgsler.\n\nLokalt tager hver forespørgsel 0,2 ms, så det hele er 200 ms, og ingen opdager det. I produktion med 5 ms netværkslatens er det **5 sekunder**.\n\nDet er næsten altid en ORM, der gør det, fordi `ordre.kunde.navn` ser ud som et opslag i hukommelsen, men er en tur til databasen.\n\nTre udveje:\n• **Eager loading**: bed ORM\'en om at hente kunderne med (`include`, `JOIN FETCH`, `select_related`).\n• **Ét join** i stedet for løkken.\n• **Batch**: hent alle kunder i én `WHERE id IN (...)`.\n\nOpdages det ved at tælle forespørgsler pr. request. Mange rammeværk kan logge tallet – og en grænse på »maks. 20 queries pr. request« i testmiljøet fanger fejlen, inden brugerne gør.\n\nDen generelle lektie: latens lægges sammen. Ét kald, der er 50 gange for langsomt, er mindre farligt end 1.000 kald, der hver er fine.',
      analogi: 'At gå i Bilka og køre hjem efter hver eneste vare på sedlen. Hver tur er kort. Det er antallet af ture, der ødelægger dagen.',
      figur: {
        titel: '1 + N ture',
        svg: svg(180, `
          ${txt(80, 14, 'N+1', { farve: ROED, size: 12 })}
          ${box(14, 26, 130, 22, 'hent 1.000 ordrer', { ...ROSA, size: 10 })}
          ${[0, 1, 2].map((i) => box(30, 54 + i * 22, 114, 18, `hent kunde ${i + 1}`, { ...ROSA, size: 9 })).join('')}
          ${txt(80, 132, '…1.000 gange', { size: 10, farve: ROED })}
          ${txt(80, 152, '5 ms × 1000 = 5 sek', { size: 11, farve: ROED })}
          ${txt(240, 14, 'Ét join', { farve: '#11998E', size: 12 })}
          ${box(176, 26, 130, 22, 'hent ordrer', { ...GROEN, size: 10 })}
          ${box(176, 52, 130, 22, 'JOIN kunde', { ...GROEN, size: 10 })}
          ${txt(240, 152, '5 ms i alt', { size: 11, farve: '#11998E' })}`),
        tekst: 'Forskellen er ikke databasens hastighed. Det er antallet af gange, man spørger.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvorfor opdages et N+1-problem sjældent i udvikling?',
      svar: [
        'Fordi latensen lokalt er så lav, at 1.000 kald føles hurtigt',
        'Fordi udviklingsdatabasen har et bedre indeks sat op',
        'Fordi testdata typisk har flere rækker end produktion',
        'Fordi ORM\'en slår funktionen fra uden for produktion',
      ],
      rigtigt: 0,
      forklaring: 'Lokalt er databasen på samme maskine. I produktion koster hvert kald netværkslatens, og så lægges de 1.000 ture sammen til sekunder.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'En transaktion lover fire ting. Isolation er den, alle tror, de får – og sjældent har.',
      body: 'En **transaktion** er en gruppe operationer, der enten lykkes helt eller slet ikke. **ACID**:\n\n• **Atomicity**: alt eller intet. Går det galt midtvejs, rulles det hele tilbage.\n• **Consistency**: reglerne (nøgler, constraints) holder før og efter.\n• **Isolation**: samtidige transaktioner forstyrrer ikke hinanden.\n• **Durability**: når der er committet, overlever det et strømsvigt.\n\nIsolation findes i **niveauer**, fordi fuld isolation er dyr:\n\n• **Read committed** (standard i PostgreSQL): du ser aldrig data, andre ikke har committet. Men to læsninger i samme transaktion kan give forskellige svar (**non-repeatable read**).\n• **Repeatable read**: samme række giver samme svar hele transaktionen igennem.\n• **Serializable**: resultatet svarer til, at transaktionerne kørte én ad gangen. Dyrest, og kan afvise din transaktion, så du må prøve igen.\n\nDerfor er »tjek om der er plads, og indsæt så« usikkert på standardniveauet: en anden kan nå at indsætte imellem de to trin. Skal reglen holde, hører den i databasen som en **constraint**, eller også skal rækken låses.',
      analogi: 'En bankoverførsel: pengene må aldrig være trukket det ene sted uden at være sat ind det andet. Enten begge dele, eller ingen af dem – også hvis strømmen går præcis derimellem.',
      figur: {
        titel: 'Hullet mellem tjek og indsæt',
        svg: svg(180, `
          ${box(14, 22, 136, 22, 'Transaktion A', { ...BLAA, size: 11 })}
          ${box(14, 48, 136, 22, 'tjek: 9 pladser', { ...HVID, size: 10 })}
          ${box(14, 96, 136, 22, 'indsæt nr. 10', { ...HVID, size: 10 })}
          ${box(170, 22, 136, 22, 'Transaktion B', { ...GROEN, size: 11 })}
          ${box(170, 48, 136, 22, 'tjek: 9 pladser', { ...HVID, size: 10 })}
          ${box(170, 96, 136, 22, 'indsæt nr. 10', { ...HVID, size: 10 })}
          ${txt(160, 84, 'begge ser 9 – ingen af dem ser den anden', { size: 10, farve: ROED })}
          ${box(14, 126, 292, 24, 'Resultat: 11 pladser brugt ud af 10', { ...ROSA, size: 11 })}
          ${txt(160, 168, 'Fix: en constraint i databasen, eller en lås på rækken', { size: 10 })}`),
        tekst: 'Det er samme fejl som en race condition mellem tråde – bare med rækker i stedet for variabler.',
      },
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad garanterer isolationsniveauet »read committed«?',
      svar: [
        'At du aldrig ser data, andre ikke har committet',
        'At transaktionerne reelt kører én ad gangen',
        'At ingen andre kan skrive, mens du læser',
        'At to læsninger i samme transaktion giver samme svar',
      ],
      rigtigt: 0,
      forklaring: 'Det er hele løftet – og ikke mere end det. Læser du den samme række to gange, kan svaret godt nå at ændre sig imellem.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Flere indekser gør altid databasen hurtigere.',
      rigtigt: 0,
      forklaring: 'Myte. Læsninger bliver hurtigere, men hver skrivning skal opdatere alle indekser. Ubrugte indekser er ren udgift – og de fylder også på disken.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k4',
      pastand: 'Når en transaktion er committet, er data sikre, selv hvis strømmen går et sekund efter.',
      rigtigt: 1,
      forklaring: 'Fakta. Det er præcis, hvad durability betyder: ændringen er skrevet til en log på disken, før databasen siger ja.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k2',
      sporgsmal: 'Sæt fejlsøgningen af en langsom forespørgsel i rækkefølge',
      trin: [
        'Mål: hvilken forespørgsel er faktisk den langsomme?',
        'Kør EXPLAIN ANALYZE og læs planen',
        'Sammenlign gættede rækker med de faktiske',
        'Ret årsagen: statistik, indeks eller selve forespørgslen',
        'Mål igen, og se om det hjalp',
      ],
      forklaring: 'Rækkefølgen er pointen: de fleste starter med at tilføje et indeks. Så ved man bagefter hverken, om det hjalp, eller hvorfor.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar, hvorfor en database kan være langsom, og hvad du gør ved det.',
      punkter: [
        { tekst: 'Uden indeks: full table scan', ord: ['indeks', 'scan', 'b-træ'] },
        { tekst: 'Indeks koster ved skrivning, og virker kun forfra', ord: ['skriv', 'sammensat', 'rækkefølge'] },
        { tekst: 'EXPLAIN viser planen og de faktiske rækker', ord: ['explain', 'plan', 'statistik'] },
        { tekst: 'N+1: mange små kald i stedet for ét', ord: ['n+1', 'orm', 'join', 'batch'] },
        { tekst: 'Transaktioner: ACID og isolationsniveauer', ord: ['acid', 'transaktion', 'isolation'] },
        { tekst: 'Mål før og efter, i stedet for at gætte', ord: ['mål', 'måling', 'benchmark'] },
      ],
    },
  ],
};
