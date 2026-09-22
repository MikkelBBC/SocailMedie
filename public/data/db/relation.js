// Databaser: den relationelle model, som alt andet hviler på.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'relation', nr: 0, titel: 'Tabeller, nøgler og joins', kort: 'Relationer', emoji: '🗄️',
    farve: '#2563EB', gradient: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'En tabel er ikke et regneark. Rækkerne har ingen rækkefølge.',
      body: 'Den relationelle model bygger på **mængder**, ikke lister. En tabel er en mængde af rækker, og en mængde har ingen indbygget orden.\n\nDerfor:\n• Uden `ORDER BY` er rækkefølgen **udefineret**. Den kan se stabil ud i årevis og så skifte, fordi databasen valgte en anden plan.\n• »Den første række« findes ikke. Der findes kun »den første efter denne sortering«.\n\nHver række identificeres af en **primærnøgle**: en eller flere kolonner, der er unikke og aldrig NULL. Den er rækkens navn, ikke dens plads.\n\nEn **fremmednøgle** i en anden tabel peger på den primærnøgle. Det er dét, der holder data sammen, og databasen håndhæver det: du kan ikke oprette en ordre til et kundenummer, der ikke findes.\n\nAt lade databasen håndhæve reglen er ikke dobbeltarbejde oven i din kode. Det er det eneste sted, reglen gælder, uanset hvilken app der skriver.',
      analogi: 'En tabel er en kasse med nummererede kort, ikke en stak. Vil du have dem i en bestemt orden, må du selv sige, hvordan der skal sorteres – ellers hælder databasen dem bare ud, som det nu passer den bedst.',
      figur: {
        titel: 'Fremmednøgle: en pil, databasen håndhæver',
        svg: svg(180, `
          ${box(14, 20, 130, 22, 'kunde', { ...BLAA, size: 11 })}
          ${box(14, 44, 130, 20, 'id (PK)  ·  navn', { ...HVID, size: 9 })}
          ${box(14, 66, 130, 20, '1  ·  Mikkel', { ...HVID, size: 9 })}
          ${box(14, 88, 130, 20, '2  ·  Sara', { ...HVID, size: 9 })}
          ${box(176, 20, 130, 22, 'ordre', { ...GROEN, size: 11 })}
          ${box(176, 44, 130, 20, 'id  ·  kunde_id (FK)', { ...HVID, size: 9 })}
          ${box(176, 66, 130, 20, '10  ·  1', { ...HVID, size: 9 })}
          ${box(176, 88, 130, 20, '11  ·  1', { ...HVID, size: 9 })}
          ${pil(176, 76, 146, 76, { farve: '#2563EB' })}
          ${box(14, 122, 292, 24, 'kunde_id = 99 afvises: kunden findes ikke', { ...ROSA, size: 11 })}
          ${txt(160, 166, 'Reglen gælder, uanset hvilken app der skriver', { size: 10 })}`),
        tekst: 'Uden fremmednøglen kan du få ordrer, der peger på ingenting. Det opdager man typisk et halvt år senere.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad gælder for rækkefølgen af rækker i en SQL-tabel?',
      svar: [
        'Den følger altid primærnøglen i stigende orden',
        'Den bestemmes af den kolonne, der har et indeks',
        'Den er udefineret, medmindre du skriver ORDER BY',
        'Den er den rækkefølge, rækkerne blev indsat i',
      ],
      rigtigt: 2,
      forklaring: 'En tabel er en mængde. Ser rækkefølgen stabil ud, er det et tilfælde, som en ny query-plan kan lave om på når som helst.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Et JOIN er ikke »sæt tabellerne ved siden af hinanden«. Det er et filter på alle kombinationer.',
      body: 'Tænk et JOIN i to trin:\n\n**1.** Dan alle kombinationer af rækker fra de to tabeller (det kartesiske produkt).\n**2.** Behold kun dem, hvor betingelsen er sand.\n\nDatabasen gør det selvfølgelig ikke bogstaveligt – den bruger indekser – men det er den **betydning**, resultatet har.\n\nDe fire, du skal kende:\n• **INNER JOIN**: kun rækker, der matcher i begge.\n• **LEFT JOIN**: alle fra venstre, plus match fra højre. Intet match giver **NULL** i højre kolonner.\n• **RIGHT JOIN**: samme den anden vej.\n• **FULL OUTER JOIN**: alt fra begge sider.\n\nDen klassiske fælde: et LEFT JOIN med en betingelse på højre tabel i `WHERE` bliver til et INNER JOIN, fordi NULL ikke opfylder betingelsen. Skal betingelsen gælde selve joinet, hører den til i `ON`.\n\nOg husk: matcher én venstre-række tre højre-rækker, får du **tre** rækker. Et JOIN kan gøre resultatet større.',
      analogi: 'To lister: gæster og deres jakker i garderoben. INNER JOIN er dem, der både er kommet og har afleveret en jakke. LEFT JOIN er alle gæster – og dem uden jakke får bare en tom rubrik.',
      hvorfor: 'Det forklarer, hvorfor en rapport pludselig viser 4.000 kroner for meget: et join har ganget rækkerne op, og så er der talt dobbelt.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad sker der med et LEFT JOIN, hvis du filtrerer på højre tabel i WHERE?',
      svar: [
        'Det opfører sig i praksis som et INNER JOIN',
        'Det bliver automatisk til et FULL OUTER JOIN',
        'Det virker som før, bare med færre kolonner',
        'Databasen giver en fejl om manglende betingelse',
      ],
      rigtigt: 0,
      forklaring: 'Rækkerne uden match har NULL i højre kolonner, og NULL opfylder ikke betingelsen. De ryger ud, og så er venstre-siden ikke komplet længere. Betingelsen hører til i ON.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'NULL er ikke nul, ikke tom tekst og ikke falsk. NULL betyder »vi ved det ikke«.',
      body: 'NULL er fraværet af en værdi, og det ødelægger den almindelige logik på tre måder:\n\n• `NULL = NULL` er **ikke sandt**. Det er ukendt. Derfor findes `IS NULL`.\n• Al regning med NULL giver NULL: `løn + NULL` er NULL.\n• I en `WHERE` tæller kun det, der er **sandt**. Ukendt ryger ud sammen med falsk. Derfor overser `WHERE status <> \'lukket\'` alle rækker, hvor status er NULL.\n\nAggregater opfører sig anderledes igen: `COUNT(*)` tæller alle rækker, mens `COUNT(kolonne)` **springer NULL over**. `AVG` regner også kun på de kendte værdier, hvilket enten er lige det, du ville, eller en stille fejl.\n\nDerfor er `NOT NULL` på en kolonne ikke pedanteri. Hver kolonne, der må være NULL, er en gren, din kode skal håndtere resten af projektets levetid.',
      analogi: 'Et spørgeskema, hvor et felt står tomt. Du ved ikke, om personen tjener 0 kr eller bare ikke svarede. Alt, du regner ud af det felt, arver den uvished.',
      figur: {
        titel: 'Tre udfald, ikke to',
        svg: svg(170, `
          ${box(14, 24, 90, 40, 'SAND', { ...GROEN, size: 13 })}
          ${box(112, 24, 90, 40, 'FALSK', { ...ROSA, size: 13 })}
          ${box(210, 24, 96, 40, 'UKENDT', { ...GUL, size: 13 })}
          ${txt(160, 84, 'WHERE beholder kun SAND', { size: 11, farve: INK })}
          ${pil(59, 68, 59, 96, { farve: '#11998E' })}
          ${box(14, 100, 90, 26, 'med', { ...GROEN, size: 11 })}
          ${box(112, 100, 194, 26, 'ude – også det ukendte', { ...ROSA, size: 11 })}
          ${txt(160, 152, 'Derfor overser status-filteret alle NULL-rækker', { size: 10, farve: ROED })}`),
        tekst: 'SQL har tre sandhedsværdier, ikke to. Det er den enkeltfejl, der koster flest timers fejlsøgning.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad giver `WHERE status <> \'lukket\'`, hvis status er NULL?',
      svar: [
        'Rækken falder ud, fordi udtrykket er ukendt',
        'Rækken kommer med, da NULL ikke er »lukket«',
        'Databasen giver en fejl om sammenligning med NULL',
        'Rækken kommer med, men uden værdi i status',
      ],
      rigtigt: 0,
      forklaring: 'Sammenligning med NULL giver ukendt, ikke sandt. WHERE beholder kun det sande. Vil du have dem med, skal der stå `OR status IS NULL`.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Normalisering er én regel gentaget: hver kendsgerning skal stå præcis ét sted.',
      body: 'Skriver du kundens adresse ind på hver ordre, har du den samme kendsgerning 400 steder. Flytter kunden, skal du rette 400 rækker – og du glemmer nogle. Det er en **opdateringsanomali**.\n\nDe tre første normalformer er den samme idé i tre trin:\n• **1NF**: ingen lister i en celle. `"rød,blå,grøn"` skal være tre rækker.\n• **2NF**: ingen kolonne må afhænge af kun en **del** af en sammensat nøgle.\n• **3NF**: ingen kolonne må afhænge af en **anden almindelig kolonne**. Står der både `postnr` og `by`, følger byen af postnummeret, og så hører den til i en tabel over postnumre.\n\nDen praktiske tommelfinger: **3NF som udgangspunkt**, og afvig kun bevidst.\n\n**Denormalisering** er at duplikere med vilje for at slippe for et dyrt join. Det er et gyldigt valg, når man har målt, at joinet faktisk er problemet, og når man har en plan for at holde kopierne i sync. Uden begge dele er det bare rod.',
      analogi: 'At skrive sin adresse i hver eneste kontrakt i stedet for ét sted i folkeregistret. Det går fint, indtil man flytter.',
      hvorfor: 'Normalisering handler ikke om at spare plads. Den handler om, at der kun findes ét sted, hvor sandheden kan blive forkert.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er hovedformålet med normalisering?',
      svar: [
        'At spare plads på disken i store tabeller',
        'At gøre forespørgsler hurtigere at udføre',
        'At undgå at skulle bruge fremmednøgler',
        'At hver kendsgerning kun findes ét sted',
      ],
      rigtigt: 3,
      forklaring: 'Står den samme oplysning flere steder, kan de komme til at modsige hinanden. Normalisering gør typisk læsning lidt langsommere, fordi der skal joines mere – det er prisen for at data ikke kan blive selvmodsigende.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'En tabel uden ORDER BY giver rækkerne i den rækkefølge, de blev indsat.',
      rigtigt: 0,
      forklaring: 'Myte. Det kan se sådan ud i lang tid, men der er ingen garanti. En ny query-plan eller et nyt indeks kan ændre det fra den ene dag til den anden.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'COUNT(*) og COUNT(kolonne) giver altid det samme tal.',
      rigtigt: 0,
      forklaring: 'Myte. `COUNT(*)` tæller rækker. `COUNT(kolonne)` springer NULL over. Er der 10 rækker, hvoraf 3 har NULL, giver de 10 og 7.',
    },
    {
      id: 'case1', type: 'case', efter: 'k2',
      scenarie: 'En rapport over omsætning pr. kunde viser pludselig det dobbelte. Forespørgslen joiner kunde, ordre og ordrelinje og lægger `ordre.beloeb` sammen.',
      sporgsmal: 'Hvad er den mest sandsynlige årsag?',
      svar: [
        'SUM tæller NULL-værdier med som nuller i summen',
        'Joinet til ordrelinje ganger hver ordre op pr. linje',
        'Der mangler et indeks, så rækkerne læses to gange',
        'Beløbene er blevet gemt to gange i ordretabellen',
      ],
      rigtigt: 1,
      forklaring: 'Har en ordre to linjer, optræder ordrerækken to gange efter joinet, og så lægges beløbet sammen to gange. Enten summeres linjernes egne beløb, eller også aggregeres ordrerne før joinet.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar den relationelle models grundbegreber.',
      punkter: [
        { tekst: 'Tabel = mængde af rækker, uden rækkefølge', ord: ['mængde', 'rækkefølge', 'order by'] },
        { tekst: 'Primærnøgle identificerer rækken entydigt', ord: ['primærnøgle', 'pk', 'unik'] },
        { tekst: 'Fremmednøgle peger på en primærnøgle og håndhæves', ord: ['fremmednøgle', 'fk', 'reference'] },
        { tekst: 'JOIN filtrerer kombinationer, og kan gange rækker op', ord: ['join', 'kombination', 'inner', 'left'] },
        { tekst: 'NULL er ukendt: tre sandhedsværdier', ord: ['null', 'ukendt', 'is null'] },
        { tekst: 'Normalisering: én kendsgerning ét sted', ord: ['normalis', '3nf', 'anomali'] },
      ],
    },
  ],
};
