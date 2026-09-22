// Investering i Danmark: konti, skat og faldgruber.
// Undervisning, ikke rådgivning. Satserne er 2026-tal og ændres hvert år.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'invdk', nr: 1, titel: 'Skat og konti i Danmark', kort: 'Invest-DK', emoji: '🇩🇰',
    farve: '#0F766E', gradient: 'linear-gradient(135deg, #0F766E 0%, #5EEAD4 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Samme investering kan beskattes på to helt forskellige måder. Forskellen hedder realisation eller lager.',
      body: 'Det er den vigtigste sondring i dansk investeringsskat.\n\n**Realisationsbeskatning**: du betaler først skat, når du **sælger**. Indtil da vokser hele beløbet videre, også den del du senere skal aflevere. Det giver en slags rentefri udskydelse, som over mange år er værd en del.\n\n**Lagerbeskatning**: du betaler hvert år skat af **årets værdistigning**, også selvom du ikke har solgt noget. Falder værdien, kan tabet modregnes.\n\nEksempel: en aktie, der er steget 50.000 kr, koster dig ingen skat i år, hvis du ikke sælger. Ligger den samme stigning i et lagerbeskattet produkt, skal der betales nu.\n\nTommelfinger: enkeltaktier og aktiebaserede investeringsforeninger, der udbetaler udbytte, er typisk realisation. Aktiesparekontoen og de fleste ETF\'er er lager.\n\nDet gør ikke lagerbeskatning dårlig. Det betyder bare, at du skal have kontanter til skatten, selvom du ikke har solgt.',
      analogi: 'Realisation er at betale for hele restaurantbesøget, når du går. Lager er at betale for hver ret, i det øjeblik den kommer ind på bordet.',
      figur: {
        titel: 'Hvornår betaler du?',
        svg: svg(180, `
          ${box(14, 16, 140, 30, 'Realisation', { ...GROEN, size: 12 })}
          ${box(14, 52, 140, 24, 'År 1: 0 kr', { ...HVID, size: 10 })}
          ${box(14, 80, 140, 24, 'År 2: 0 kr', { ...HVID, size: 10 })}
          ${box(14, 108, 140, 30, 'Ved salg: alt på én gang', { ...GROEN, size: 10 })}
          ${box(166, 16, 140, 30, 'Lager', { ...BLAA, size: 12 })}
          ${box(166, 52, 140, 24, 'År 1: af stigningen', { ...HVID, size: 10 })}
          ${box(166, 80, 140, 24, 'År 2: af stigningen', { ...HVID, size: 10 })}
          ${box(166, 108, 140, 30, 'Ved salg: kun resten', { ...BLAA, size: 10 })}
          ${txt(160, 158, 'Samme afkast, forskelligt tidspunkt', { size: 10 })}`),
        tekst: 'Udskydelsen er selv en gevinst: pengene til skatten arbejder for dig i mellemtiden.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er lagerbeskatning?',
      svar: [
        'Skat af årets værdistigning, også uden salg',
        'Skat kun når papiret bliver solgt',
        'Skat af udbytte, men ikke af kursgevinst',
        'En fast årlig afgift af hele depotets værdi',
      ],
      rigtigt: 0,
      forklaring: 'Værdien gøres op ved årets udgang. Er den steget, beskattes stigningen nu, selvom du intet har solgt. Er den faldet, kan tabet modregnes.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Aktiesparekontoen har en lavere sats end almindelig aktieindkomst. Til gengæld er der et loft.',
      body: '**Aktiesparekontoen (ASK)** er en særlig konto til aktier og aktiebaserede fonde:\n\n• Satsen er **17 %**, mod 27/42 % på almindelig aktieindkomst.\n• Den er **lagerbeskattet**: der gøres op hvert år.\n• Der er et **loft** for, hvor meget du må indbetale: 174.200 kr i 2026. Loftet gælder indskuddet, ikke værdien, så kontoen må gerne vokse ud over det.\n• Tab kan fremføres og modregnes i senere års gevinster på kontoen.\n• Skatten opkræves automatisk af banken, og du får én konto per person.\n\nUden for ASK beskattes **aktieindkomst** i to trin: **27 %** op til 79.400 kr om året, og **42 %** af det, der ligger over. Beløbsgrænsen er dobbelt for ægtefæller.\n\nDen praktiske konsekvens: for de første par hundrede tusinde er ASK typisk billigere i skat, og derfor er den ofte det sted, man starter.\n\nDette er generel undervisning, ikke rådgivning. Tjek altid de aktuelle satser på skat.dk, for de justeres hvert år.',
      analogi: 'En rabatordning med et indkøbsloft: billigere pris per vare, men du må kun lægge et vist beløb i kurven om året.',
      hvorfor: 'Skatten er en af de få faktorer, du kan påvirke på forhånd. Afkastet kan du ikke.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad gælder for en aktiesparekonto i 2026?',
      svar: [
        '27 % i skat og intet loft for indbetaling',
        '17 % i skat, lagerbeskattet, med loft for indskud',
        '42 % i skat, men først når du sælger',
        'Skattefri indtil kontoen passerer en million',
      ],
      rigtigt: 1,
      forklaring: 'Satsen er 17 %, der gøres op hvert år uanset salg, og loftet på indskud er 174.200 kr i 2026. Loftet gælder det indbetalte, ikke værdien.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: '27 % eller 42 %? Det afhænger af, hvor meget aktieindkomst du har på ét år.',
      body: '**Aktieindkomst** er udbytte plus gevinst ved salg af aktier. I 2026 beskattes den med:\n\n• **27 %** af de første 79.400 kr\n• **42 %** af alt over\n\nGrænsen gælder per person per år, og ægtefæller kan dele den, så de tilsammen har det dobbelte i 27 %-spændet.\n\nDet har en direkte konsekvens: sælger du alt på én gang, ryger en stor del op i 42 %-spændet. Fordeler du salget over flere år, bliver mere beskattet med 27 %. Det er ikke et smuthul, det er sådan progressionen virker.\n\n**Tab** på aktier kan ikke fratrækkes i lønnen. De modregnes i anden aktieindkomst og kan fremføres til senere år. Derfor er et tab ikke helt tabt, men det er bundet til aktiekassen.\n\nAlt dette gælder frie midler. På en ASK er satsen i stedet 17 %, og i et selskab beskattes gevinster som selskabets indkomst.\n\nSatserne og beløbsgrænserne reguleres hvert år. Slå dem op, i stedet for at huske dem.',
      figur: {
        titel: 'To trin på aktieindkomst (2026)',
        svg: svg(170, `
          <line x1="34" y1="132" x2="306" y2="132" stroke="${LINE}" stroke-width="1.5"/>
          ${box(44, 78, 110, 54, '27 %', { ...GROEN, size: 15 })}
          ${box(166, 30, 110, 102, '42 %', { ...ROSA, size: 15 })}
          ${txt(99, 150, 'op til 79.400 kr', { size: 10 })}
          ${txt(221, 150, 'over 79.400 kr', { size: 10 })}
          ${txt(170, 16, 'Grænsen er per person per år', { size: 10 })}`),
        tekst: 'Kun beløbet over grænsen rammes af den høje sats. De første 79.400 kr beskattes altid med 27 %.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Du har 120.000 kr i aktieindkomst i 2026. Hvordan beskattes den?',
      svar: [
        'Det hele med 42 %, fordi grænsen er passeret',
        'De første 79.400 kr med 27 %, resten med 42 %',
        'Det hele med 27 %, da det er under en halv million',
        'Det hele med 17 %, som på en aktiesparekonto',
      ],
      rigtigt: 1,
      forklaring: 'Progressionen rammer kun det overskydende. 79.400 kr beskattes med 27 %, og de resterende ca. 40.600 kr med 42 %.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Kryptoen, aktien og obligationen kan se ens ud på skærmen. Skattemæssigt er de tre forskellige verdener.',
      body: 'Produkttypen bestemmer beskatningen, og de tre vigtigste kasser er:\n\n• **Aktieindkomst**: aktier og aktiebaserede investeringsforeninger. 27/42 %.\n• **Kapitalindkomst**: obligationer, obligationsbaserede fonde og visse strukturerede produkter. Beskattes sammen med renter.\n• **Anden personlig indkomst**: krypto behandles typisk som **spekulation**, hvor gevinst beskattes som personlig indkomst, mens tab kun kan fratrækkes i begrænset omfang. Det er en asymmetri, der overrasker mange.\n\nDerfor er spørgsmålet »hvad er det juridisk for et produkt?« vigtigere end »hvad står der på grafen?«. To fonde med næsten samme indhold kan have forskellig skattemæssig kasse afhængigt af, om de er registreret som aktiebaserede.\n\nSKAT offentliggør en liste over, hvordan de enkelte investeringsselskaber er klassificeret. Det er værd at slå op **inden** køb, for klassifikationen kan du ikke selv ændre bagefter.\n\nOg igen: det her er undervisningsstof til en eksamen om systemer og begreber, ikke rådgivning om, hvad du skal købe.',
      analogi: 'Tre pakker i samme indpakning. Tolden afhænger af, hvad der står på fragtbrevet, ikke af hvordan pakken føles.',
      hvorfor: 'Det forklarer, hvorfor to næsten identiske fonde kan give forskelligt afkast efter skat.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad afgør, hvordan en investering beskattes?',
      svar: [
        'Hvor længe du har ejet den',
        'Hvilken juridisk produkttype den er',
        'Hvilken bank du handler igennem',
        'Om du har tjent eller tabt penge',
      ],
      rigtigt: 1,
      forklaring: 'Aktie, obligation og krypto falder i tre forskellige skattekasser. Ejertid ændrer ikke kassen i dansk aktiebeskatning.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Loftet på aktiesparekontoen betyder, at kontoen aldrig må være værd mere end beløbet.',
      rigtigt: 0,
      forklaring: 'Myte. Loftet gælder, hvor meget du må **indbetale**. Værdien må gerne vokse langt ud over loftet.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'Tab på aktier kan trækkes fra i din løn.',
      rigtigt: 0,
      forklaring: 'Myte. Tab modregnes i anden aktieindkomst og kan fremføres til senere år, men de rører ikke lønindkomsten.',
    },
    {
      id: 'case1', type: 'case', efter: 'k3',
      scenarie: 'Du har aktier med 160.000 kr i urealiseret gevinst i frie midler. Du skal bruge pengene om halvandet år og overvejer at sælge alt nu eller dele salget over to kalenderår.',
      sporgsmal: 'Hvad er den skattemæssige forskel?',
      svar: [
        'Ingen, satsen er den samme uanset hvornår',
        'Deling giver mere gevinst i 27 %-spændet',
        'Salg på én gang giver lavere sats i alt',
        'Deling udløser lagerbeskatning i stedet',
      ],
      rigtigt: 1,
      forklaring: '79.400 kr-grænsen gælder per kalenderår. Deles salget, falder mere ind under 27 % i stedet for 42 %. Det er progression, ikke et smuthul, og det forudsætter naturligvis, at du tør beholde papirerne et år mere.',
    },
    {
      id: 'sammen1', type: 'sammenlign', efter: 'k2',
      a: { navn: 'Aktiesparekonto', emoji: '🏦' }, b: { navn: 'Frit depot', emoji: '📈' },
      udsagn: [
        { tekst: 'Satsen er 17 %', svar: 'a' },
        { tekst: 'Der er et loft for, hvor meget du må indbetale', svar: 'a' },
        { tekst: 'Enkeltaktier beskattes først ved salg', svar: 'b' },
        { tekst: '27 % op til grænsen, derefter 42 %', svar: 'b' },
        { tekst: 'Tab kan fremføres til senere år', svar: 'begge' },
        { tekst: 'Obligationer må ligge der', svar: 'b' },
      ],
      forklaring: 'ASK har lavere sats, men loft og årlig opgørelse. Det frie depot har ingen loft og kan udskyde skatten på enkeltaktier, men til en højere sats.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar, hvordan investeringsafkast beskattes i Danmark.',
      punkter: [
        { tekst: 'Realisation ved salg vs. lager hvert år', ord: ['realisation', 'lager', 'salg'] },
        { tekst: 'Aktieindkomst: 27 % op til grænsen, derefter 42 %', ord: ['27', '42', 'aktieindkomst'] },
        { tekst: 'Aktiesparekonto: 17 %, lager, loft på indskud', ord: ['aktiesparekonto', 'ask', '17'] },
        { tekst: 'Produkttypen bestemmer kassen: aktie, kapital, spekulation', ord: ['produkt', 'obligation', 'krypto', 'kapitalindkomst'] },
        { tekst: 'Tab modregnes i aktieindkomst, ikke i løn', ord: ['tab', 'modregn', 'fremfør'] },
      ],
    },
  ],
};
