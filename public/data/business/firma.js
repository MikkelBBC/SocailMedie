// Business: sådan starter man et firma i Danmark.
// Tal og satser er fra 2026 og ændrer sig – tjek altid virk.dk og skat.dk.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'firma', nr: 0, titel: 'Start et firma i Danmark', kort: 'Firma', emoji: '🏗️',
    farve: '#F2994A', gradient: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Et CVR-nummer tager 15 minutter. Valget af selskabsform er det, der betyder noget.',
      body: 'Du registrerer virksomheden på **virk.dk** og får et **CVR-nummer**. Det er gratis for en enkeltmandsvirksomhed. Det svære er valget før:\n\n**Enkeltmandsvirksomhed**: ingen startkapital, enkel bogføring, og du og firmaet er juridisk **samme person**. Går det galt, hæfter du **personligt** med alt, du ejer.\n\n**ApS (anpartsselskab)**: et selskab med sin egen økonomi. Kapitalkravet er **20.000 kr** (halveret i 2025), som skal indbetales ved stiftelsen. Du hæfter som udgangspunkt **kun med selskabets penge**.\n\n**A/S**: som ApS, men med 400.000 kr i kapital, bestyrelse og flere formelle krav. Bruges typisk, når der skal investorer ind.\n\nTommelfingerregel: har du en risiko for at blive mødt med et krav, der er større end du kan betale, er begrænset hæftelse pengene værd.',
      analogi: 'Enkeltmandsvirksomhed er at låne din egen bil ud i eget navn. Et ApS er at lægge bilen i et selskab: går det galt, står selskabet for skaden, ikke din opsparing.',
      figur: {
        titel: 'Hæftelsen er den store forskel',
        svg: svg(180, `
          ${box(14, 20, 132, 30, 'Enkeltmand', { ...ROSA, size: 11 })}
          ${box(14, 56, 132, 74, '', { fill: BG })}
          ${txt(80, 74, 'Du = firmaet', { size: 10 })}
          ${txt(80, 96, 'Gæld rammer', { size: 10, farve: ROED })}
          ${txt(80, 114, 'din opsparing', { size: 10, farve: ROED })}
          ${box(174, 20, 132, 30, 'ApS · 20.000 kr', { ...GROEN, size: 11 })}
          ${box(174, 56, 132, 74, '', { fill: BG })}
          ${txt(240, 74, 'Selskabet er', { size: 10 })}
          ${txt(240, 92, 'sin egen »person«', { size: 10 })}
          ${txt(240, 114, 'Du hæfter med kapitalen', { size: 9, farve: '#11998E' })}
          ${txt(160, 158, 'Undtagelse: banken beder tit om personlig kaution', { size: 10, farve: INK })}`),
        tekst: 'Begrænset hæftelse gælder ikke, hvis du selv skriver under på en personlig garanti – det gør banker og udlejere ofte til nye selskaber.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er den vigtigste forskel på enkeltmandsvirksomhed og ApS?',
      svar: [
        'ApS betaler ikke moms af sit salg',
        'Ved et ApS hæfter du ikke personligt',
        'Enkeltmandsvirksomhed må ikke have ansatte',
        'Et ApS behøver ikke føre regnskab',
      ],
      rigtigt: 1,
      forklaring: 'Hæftelsen er kernen. Moms, regnskab og ansatte gælder begge former, men i en enkeltmandsvirksomhed er firmaets gæld også din.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Momsen er ikke dine penge. Du opkræver dem for staten.',
      body: '**Moms** i Danmark er **25 %**, som lægges oven på din pris til private. Sælger du for 10.000 kr plus moms, opkræver du 12.500 kr, og de 2.500 kr skal videre til Skattestyrelsen.\n\nDu skal momsregistreres, når din omsætning overstiger **50.000 kr** på 12 måneder. Til gengæld må du **trække købsmomsen fra**: køber du en computer til 10.000 kr plus moms, får du de 2.500 kr tilbage.\n\nDu afregner forskellen (salgsmoms minus købsmoms), typisk hvert halve år eller kvartal, alt efter størrelse.\n\nDen klassiske begynderfejl er at se momsen på kontoen som omsætning og bruge den. Læg den til side med det samme, gerne på en separat konto.\n\nOg husk **bogføringspligten**: alle bilag skal gemmes i **5 år**, og regnskabet skal kunne følges fra bilag til bogføring.',
      analogi: 'Momsen er som en garderobeafgift, du opkræver på vegne af huset. Den ligger i din kasse, men den har aldrig været din.',
      hvorfor: 'De fleste nye virksomheder, der kommer i problemer med Skat, gør det her: ikke ved svindel, men ved at have brugt momsen.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvornår skal du momsregistreres i Danmark?',
      svar: [
        'Fra den allerførste krone, du omsætter for',
        'Når omsætningen passerer 50.000 kr på 12 måneder',
        'Først den dag, du ansætter den første medarbejder',
        'Kun hvis du sælger dine varer eller ydelser til udlandet',
      ],
      rigtigt: 1,
      forklaring: 'Under grænsen er det frivilligt. Er man registreret, kan man til gengæld trække købsmomsen fra, hvilket kan betale sig ved store indkøb.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Overskud i et selskab beskattes to gange. Det er ikke en fejl, men det skal man vide.',
      body: 'Et **ApS betaler 22 % i selskabsskat** af overskuddet. Vil du have pengene ud til dig selv, sker det på to måder:\n\n• **Løn**: trækkes fra i selskabets overskud, men beskattes som almindelig indkomst hos dig.\n• **Udbytte**: udbetales af det, der er tilbage efter selskabsskat, og beskattes som **aktieindkomst** hos dig: 27 % op til ca. 79.400 kr (2026) og 42 % derover.\n\nI en **enkeltmandsvirksomhed** er der ingen adskillelse: overskuddet er din personlige indkomst, og du betaler **B-skat** i rater i løbet af året ud fra en forskudsopgørelse, du selv anslår.\n\nAnslår du for lavt, får du en stor restskat. Anslår du for højt, har du lånt staten penge rentefrit. Ret forskudsopgørelsen, når virkeligheden ændrer sig.\n\nTallene her er fra 2026 og reguleres hvert år: tjek skat.dk, før du regner på noget vigtigt.',
      analogi: 'Selskabet er en spand med hul i bunden: 22 % løber fra, før pengene når ned til dig, og når de rammer din hånd, bliver der taget lidt igen.',
      figur: {
        titel: 'Fra overskud til din konto',
        svg: svg(190, `
          ${box(76, 14, 168, 30, 'Overskud i selskabet', { ...BLAA, size: 11 })}
          ${pil(160, 48, 160, 64)}
          ${box(76, 66, 168, 28, '− 22 % selskabsskat', { ...ROSA, size: 11 })}
          ${pil(160, 98, 160, 114)}
          ${box(76, 116, 168, 28, 'Udbytte til dig', { ...GROEN, size: 11 })}
          ${pil(160, 148, 160, 162)}
          ${txt(160, 176, '− 27 % / 42 % aktieindkomst', { size: 11, farve: INK })}`),
        tekst: 'Løn er et alternativ: den trækkes fra før selskabsskatten, men beskattes som personlig indkomst.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er selskabsskatten for et ApS i Danmark?',
      svar: ['15 %', '22 %', '27 %', '42 %'],
      rigtigt: 1,
      forklaring: '22 % af overskuddet. 27 og 42 % er satserne for aktieindkomst, altså det du betaler, når overskuddet udbetales som udbytte.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Firmaet dør sjældent af manglende overskud. Det dør af manglende penge på kontoen.',
      body: '**Overskud og likviditet er ikke det samme.** Du kan have solgt for 500.000 kr og stadig gå konkurs, hvis kunderne betaler om 90 dage, mens lønnen skal ud på fredag.\n\nDe tre tal, enhver ejer bør kende:\n• **Likviditet**: hvad der står på kontoen lige nu.\n• **Runway**: hvor mange måneder pengene rækker med det nuværende forbrug.\n• **Dækningsbidrag**: salgspris minus de omkostninger, der følger med salget. Er det negativt, gør mere salg det værre.\n\nTre praktiske vaner, der redder mange:\n1. **Fakturér med det samme**, og sæt korte betalingsfrister.\n2. Læg **moms og skat** væk på en separat konto samme dag, de kommer ind.\n3. Hold **private og firmaets penge adskilt**. I et ApS er det et krav, ikke en anbefaling.\n\nEn kassekredit er ikke en løsning på et forretningsproblem. Den køber tid, og tid koster renter.',
      analogi: 'Et badekar: overskud er, hvor meget der løber ind over et år. Likviditet er, hvor meget vand der er i karret lige nu. Man kan drukne i det ene og tørste i det andet.',
      hvorfor: 'Det er svaret på »hvorfor gik det galt?« i de fleste konkurser blandt små virksomheder.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvorfor kan en virksomhed med overskud alligevel gå konkurs?',
      svar: [
        'Fordi overskud altid beskattes for hårdt',
        'Fordi pengene kommer ind senere, end de skal ud',
        'Fordi moms ikke kan trækkes fra',
        'Fordi et overskud kun er på papiret i et ApS',
      ],
      rigtigt: 1,
      forklaring: 'Regninger skal betales, når de forfalder. Lange betalingsfrister til kunderne kan dræne kontoen, selvom regnskabet ser fint ud.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Momsen, du opkræver, er en del af din omsætning.',
      rigtigt: 0,
      forklaring: 'Myte. Du opkræver den for staten og skal aflevere den igen. Sæt den til side samme dag, den kommer ind.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k1',
      pastand: 'Med et ApS kan du aldrig komme til at hæfte personligt.',
      rigtigt: 0,
      forklaring: 'Myte. Banker, udlejere og leverandører beder ofte nye selskaber om personlig kaution. Ledelsen kan også hæfte ved grov forsømmelse.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k2',
      sporgsmal: 'Sæt trinnene i at starte en lille virksomhed i rækkefølge',
      trin: [
        'Vælg selskabsform ud fra risiko og behov for kapital',
        'Registrér på virk.dk og få et CVR-nummer',
        'Opret en erhvervskonto, adskilt fra privatøkonomien',
        'Momsregistrér, når omsætningen nærmer sig 50.000 kr',
        'Sæt bogføring op, og gem alle bilag i 5 år',
      ],
      forklaring: 'Rækkefølgen er vigtig: selskabsformen bestemmer, hvad du registrerer, og erhvervskontoen skal være der, før pengene begynder at løbe ind.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvad man skal have styr på for at starte en virksomhed i Danmark.',
      punkter: [
        { tekst: 'Selskabsform og hæftelse: enkeltmand mod ApS', ord: ['enkeltmand', 'aps', 'hæfte'] },
        { tekst: 'ApS kræver 20.000 kr i kapital', ord: ['20.000', 'kapital'] },
        { tekst: 'CVR via virk.dk og adskilt erhvervskonto', ord: ['cvr', 'virk', 'konto'] },
        { tekst: 'Moms 25 %, registrering over 50.000 kr', ord: ['moms', '25', '50.000'] },
        { tekst: 'Selskabsskat 22 %, udbytte som aktieindkomst', ord: ['22', 'selskabsskat', 'udbytte'] },
        { tekst: 'Bogføring og bilag gemmes i 5 år', ord: ['bogfør', 'bilag', '5 år'] },
        { tekst: 'Likviditet er ikke det samme som overskud', ord: ['likviditet', 'overskud', 'runway'] },
      ],
    },
  ],
};
