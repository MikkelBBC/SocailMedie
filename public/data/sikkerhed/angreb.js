// Cybersikkerhed: hvordan angreb faktisk foregår.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'angreb', nr: 0, titel: 'Sådan bliver man hacket', kort: 'Angreb', emoji: '🎣',
    farve: '#c0392b', gradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'De fleste indbrud starter ikke med kode. De starter med en besked.',
      body: 'Langt de fleste angreb begynder med et menneske, ikke med en sårbarhed. Det kaldes **social engineering**.\n\nOpskriften er den samme hver gang:\n• **Autoritet**: afsenderen ligner din bank, din chef eller PostNord.\n• **Tidspres**: »din konto lukkes om 24 timer«.\n• **En nem udvej**: ét link, og problemet forsvinder.\n\nPresset er ikke tilfældigt. Det er designet til at få dig til at handle, før du tænker.\n\nVarianterne har navne: **phishing** (bredt udsendt), **spear phishing** (målrettet dig med rigtige detaljer om dit arbejde), **smishing** (sms) og **CEO-fraud**, hvor »direktøren« beder bogholderen om en hasteoverførsel.\n\nDet mest effektive modtræk er ikke teknisk. Det er en vane: **klik aldrig på linket i beskeden**. Gå selv ind på siden, som du plejer, eller ring til et nummer, du selv har fundet.',
      analogi: 'En tyv bryder sjældent en pansret dør op. Han ringer på og siger, at han kommer fra elselskabet og skal tjekke måleren. Døren bliver lukket op indefra.',
      hvorfor: 'Derfor hjælper stærkere kryptering ikke: angrebet går uden om den, ikke igennem den.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er den bedste vane mod phishing?',
      svar: [
        'At læse afsenderadressen ekstra grundigt',
        'At gå selv ind på siden i stedet for at klikke',
        'At svare på beskeden og spørge, om den er ægte',
        'At bruge et længere og mere sikkert kodeord',
      ],
      rigtigt: 1,
      forklaring: 'Afsenderadresser kan forfalskes, og svindlere svarer gerne »ja, den er ægte«. Går du selv ind på siden, er domænet rigtigt, uanset hvad beskeden påstod.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Dit kodeord er sikkert allerede lækket. Det er derfor, genbrug er farligt.',
      body: 'Når en tjeneste bliver hacket, ender brugernavne og kodeord på lister, der handles og deles. Har du brugt det samme kodeord flere steder, prøver angriberen det bare alle vegne. Det kaldes **credential stuffing**, og det er automatiseret.\n\nDerfor gælder tre ting:\n• **Aldrig genbrug** af kodeord på tværs af tjenester.\n• En **kodeordsmanager** gør det muligt: du husker ét, den husker resten.\n• **To-faktor** stopper det meste af resten, for et lækket kodeord er så ikke nok.\n\nLængde slår krøllede tegn: en sætning som »violet-kartoffel-lampe-42« er både lettere at huske og sværere at gætte end »P@ssw0rd!«, fordi angriberens lister allerede indeholder de klassiske erstatninger.\n\nDu kan tjekke, om din mail optræder i kendte læk, på haveibeenpwned.com.',
      analogi: 'Én nøgle til hjemmet, bilen, arbejdet og sommerhuset. Mister du den ét sted, er alle døre åbne.',
      figur: {
        titel: 'Ét lækket kodeord, mange døre',
        svg: svg(180, `
          ${box(14, 20, 126, 38, 'Lækket fra webshop', { ...ROSA, size: 10 })}
          ${pil(146, 39, 176, 39, { farve: ROED })}
          ${box(180, 14, 126, 24, 'Mail ✗', { ...ROSA, size: 10 })}
          ${box(180, 42, 126, 24, 'Netbank ✗', { ...ROSA, size: 10 })}
          ${box(180, 70, 126, 24, 'Streaming ✗', { ...ROSA, size: 10 })}
          ${txt(77, 80, 'Samme kodeord', { size: 10, farve: ROED })}
          ${box(14, 110, 292, 26, 'Forskellige kodeord: kun webshoppen er ramt', { ...GROEN, size: 11 })}
          ${box(14, 142, 292, 26, 'To-faktor: kodeordet alene er ikke nok', { ...BLAA, size: 11 })}`),
        tekst: 'Automatiske robotter prøver lækkede par af mail og kodeord på hundredvis af tjenester i sekundet.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad er credential stuffing?',
      svar: [
        'At gætte et kodeord tegn for tegn',
        'At prøve lækkede kodeord på andre tjenester',
        'At fylde en formular med for mange tegn',
        'At stjæle en cookie fra en browser',
      ],
      rigtigt: 1,
      forklaring: 'Angriberen gætter ikke. Han bruger lister fra tidligere læk og regner med, at folk genbruger kodeord.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Ransomware sælger dig ikke noget. Den låser det, du allerede har.',
      body: '**Malware** er en fællesbetegnelse. De vigtigste typer:\n\n• **Ransomware** krypterer dine filer og kræver løsepenge. Moderne varianter kopierer også data ud først og truer med at offentliggøre dem, så en backup alene ikke redder dig fra afpresningen.\n• **Trojanske heste** ser nyttige ud, men åbner en bagdør.\n• **Spyware og keyloggere** optager, hvad du skriver.\n• **Botnets** bruger din maskine til angreb på andre.\n\nVejen ind er næsten altid en af tre: en vedhæftet fil, et program fra en tvivlsom kilde, eller et kendt hul i software, der ikke er opdateret.\n\nDet vigtigste forsvar mod ransomware er **backup efter 3-2-1**: tre kopier, på to slags medier, hvoraf én er offline eller uden for huset. En backup, der er tilsluttet maskinen, bliver krypteret sammen med resten.',
      analogi: 'Ransomware er en låsesmed, der skifter alle låse i dit hus, mens du er på arbejde, og så sælger dig nøglen.',
      hvorfor: 'Det er også grunden til, at »jeg har jo en backup på den eksterne harddisk, der altid sidder i« ikke er en backup.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad betyder 3-2-1-reglen for backup?',
      svar: [
        'Tre kopier, to medietyper, én uden for huset',
        'Tre kopier taget med en uges mellemrum',
        'Tre brugere skal godkende en gendannelse',
        'Backup hver tredje dag, to gange om ugen',
      ],
      rigtigt: 0,
      forklaring: 'Kopien uden for huset (eller offline) er den vigtigste: den overlever både brand og ransomware, der krypterer alt, den kan nå.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Et zero-day er sjældent. Et halvt år gammelt hul, der ikke er lappet, er reglen.',
      body: 'En **sårbarhed** er en fejl, der kan misbruges. Når den bliver offentligt kendt, får den et **CVE-nummer**, og producenten udsender en rettelse.\n\nEt **zero-day** er et hul, ingen rettelse findes til endnu. De er sjældne og dyre.\n\nI praksis sker de fleste indbrud gennem **kendte** huller, som bare ikke er blevet opdateret. Equifax-lækket i 2017 med data om 147 millioner mennesker skete gennem en sårbarhed i Apache Struts, der havde haft en rettelse i over to måneder.\n\nDerfor er kedelig vedligeholdelse det mest undervurderede sikkerhedsarbejde, der findes:\n• Opdatér styresystem, browser og biblioteker.\n• Hold styr på **afhængigheder**: dit projekt bruger måske 800 pakker, du ikke selv har skrevet.\n• Fjern det, I ikke bruger. Kode, der ikke findes, kan ikke hackes.',
      analogi: 'Det er ikke den ukendte snigmorder, der får huse til at brænde. Det er det gamle ledningsnet, ingen har fået skiftet.',
      hvorfor: 'Derfor er »kør opdateringerne« ikke en sur pligt, men det enkeltstående råd med størst effekt.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad karakteriserer et zero-day?',
      svar: [
        'At angrebet varer under et døgn',
        'At der endnu ikke findes en rettelse',
        'At det rammer nul brugere i starten',
        'At det opdages af producenten selv',
      ],
      rigtigt: 1,
      forklaring: 'Navnet peger på, at forsvareren har haft nul dage til at lappe. Langt de fleste angreb bruger dog huller, der for længst er lappet hos dem, der opdaterer.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Hackere bryder typisk ind ved at knække krypteringen.',
      rigtigt: 0,
      forklaring: 'Myte. Kryptering er i praksis umulig at bryde. Angreb går udenom: mennesket, et genbrugt kodeord eller et hul, der ikke er lappet.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k2',
      pastand: 'Et langt kodeord af almindelige ord er bedre end et kort med specialtegn.',
      rigtigt: 1,
      forklaring: 'Fakta. Længde giver flere kombinationer end krøllede erstatninger. »P@ssw0rd« står i alle ordbøger, som angribere bruger.',
    },
    {
      id: 'case1', type: 'case', efter: 'k1',
      scenarie: 'Du får en sms: »PostNord: din pakke kan ikke leveres. Betal 29 kr i told inden for 24 timer.« Linket ligner postnord-levering.dk, og siden har hængelås.',
      sporgsmal: 'Hvad er det rigtige at gøre?',
      svar: [
        'Betale, beløbet er jo lille nok til at være ægte',
        'Lade være med at klikke og selv slå pakken op',
        'Klikke, men kun kigge og ikke skrive noget',
        'Svare STOP for at blive fjernet fra listen',
      ],
      rigtigt: 1,
      forklaring: 'Hængelåsen betyder kun, at forbindelsen er krypteret, og domænet er ikke PostNords. Beløbet er lille med vilje: det er kortoplysningerne, de er ude efter. At svare bekræfter, at nummeret er aktivt.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar de mest almindelige måder, folk bliver hacket på, og hvad der hjælper.',
      punkter: [
        { tekst: 'Social engineering: autoritet, tidspres og ét nemt klik', ord: ['social', 'phishing', 'pres', 'klik'] },
        { tekst: 'Genbrugte kodeord og credential stuffing', ord: ['genbrug', 'credential', 'kodeord'] },
        { tekst: 'To-faktor og kodeordsmanager', ord: ['to-faktor', '2fa', 'manager', 'passkey'] },
        { tekst: 'Malware, især ransomware, og 3-2-1-backup', ord: ['ransomware', 'malware', 'backup', '3-2-1'] },
        { tekst: 'Kendte huller, der ikke er opdateret', ord: ['opdater', 'patch', 'cve', 'sårbarhed'] },
      ],
    },
  ],
};
