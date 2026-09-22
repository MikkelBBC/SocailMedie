// Investering: de mekanismer, der afgør resultatet.
// Undervisning, ikke rådgivning. Tal er fra 2026 og ændrer sig.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'invbasis', nr: 0, titel: 'Renters rente og risiko', kort: 'Invest-basis', emoji: '📈',
    farve: '#11998E', gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Renters rente er ikke en linje. Det er en kurve, der næsten ingenting laver i starten.',
      body: 'Sætter du 1.000 kr til 7 % om året, har du 1.070 kr efter et år. Året efter tjener du også renter af de 70 kr. Det er **renters rente**.\n\nEffekten er kedelig i starten og voldsom til sidst. Med 7 % om året **fordobles** beløbet cirka hvert 10. år, fordi 72 delt med 7 er cirka 10 (**72-reglen**).\n\n• 1.000 kr i 10 år: ca. 2.000 kr\n• I 20 år: ca. 4.000 kr\n• I 30 år: ca. 7.600 kr\n\nDen sidste fordobling giver mere end alle de tidligere tilsammen. Derfor er **tid** den vigtigste enkeltfaktor, og derfor gør det ondt at starte sent.\n\nDen anden side af samme mønt: **inflation** æder værdien med samme slags kurve. 2 % inflation halverer købekraften på ca. 35 år. Derfor er »sikre« penge under hovedpuden ikke sikre: de taber langsomt.',
      analogi: 'En sneboldsom triller ned ad bakken. De første meter sker der næsten ingenting. Det sidste stykke vokser den mere end på hele turen indtil da.',
      figur: {
        titel: '72-reglen: hvor tit fordobles pengene?',
        svg: svg(180, `
          <line x1="34" y1="140" x2="300" y2="140" stroke="${LINE}" stroke-width="1.5"/>
          <line x1="34" y1="140" x2="34" y2="20" stroke="${LINE}" stroke-width="1.5"/>
          <path d="M34,136 C120,130 200,100 300,24" fill="none" stroke="#11998E" stroke-width="3"/>
          ${txt(70, 158, '10 år', { size: 10 })}
          ${txt(160, 158, '20 år', { size: 10 })}
          ${txt(255, 158, '30 år', { size: 10 })}
          ${txt(78, 120, '2×', { farve: INK, size: 11 })}
          ${txt(168, 92, '4×', { farve: INK, size: 11 })}
          ${txt(262, 40, '8×', { farve: INK, size: 12 })}
          ${txt(160, 12, '72 ÷ rente = år pr. fordobling', { size: 10, farve: '#11998E' })}`),
        tekst: 'Ved 7 % om året fordobles beløbet ca. hvert tiende år. Ved 3 % tager det 24 år.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvor lang tid tager det cirka at fordoble pengene ved 6 % om året?',
      svar: ['Ca. 6 år', 'Ca. 12 år', 'Ca. 20 år', 'Ca. 30 år'],
      rigtigt: 1,
      forklaring: '72-reglen: 72 divideret med 6 er 12 år. Reglen er en god tilnærmelse ved renter mellem cirka 4 og 12 %.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Højere forventet afkast kommer aldrig gratis. Det kommer med større udsving.',
      body: '**Risiko** i investering betyder ikke »chancen for at det går galt«. Det betyder **udsving**: hvor meget værdien svinger op og ned undervejs.\n\nSammenhængen er ubrydelig: vil du have et højere forventet afkast, må du acceptere større udsving. Et aktiemarked kan falde 30-50 % i en krise og være år om at komme tilbage. Obligationer svinger mindre og giver typisk mindre.\n\nDerfor er **tidshorisonten** afgørende. Penge, du skal bruge om et år, hører ikke til i aktier, uanset hvor godt det går lige nu. Penge, du først skal bruge om 20 år, kan bære et fald undervejs.\n\nOg der er forskel på to slags risiko:\n• **Markedsrisiko**: hele markedet falder. Den kan man ikke fjerne.\n• **Selskabsrisiko**: netop dit selskab går ned. Den kan man fjerne næsten gratis ved at sprede sig.\n\nDet er derfor, man ikke får betaling for at satse alt på ét selskab: den ekstra risiko kunne man have undgået.',
      analogi: 'Et fly og en cykel kommer begge frem. Flyet er hurtigere, men du kan ikke sætte af undervejs. Skal du kun ned om hjørnet i morgen, er flyet det forkerte valg.',
      hvorfor: 'Det er svaret på »hvor skal mine penge stå?«: det afhænger af, hvornår du skal bruge dem, ikke af hvad der er steget mest i år.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvilken risiko kan du fjerne ved at sprede dine investeringer?',
      svar: [
        'Markedsrisikoen, altså at alt falder',
        'Selskabsrisikoen, altså at ét selskab går ned',
        'Inflationsrisikoen over lange perioder',
        'Renterisikoen på obligationer',
      ],
      rigtigt: 1,
      forklaring: 'Spredning fjerner risikoen ved det enkelte selskab. Falder hele markedet, hjælper spredning ikke, og derfor er det den risiko, man får betaling for at bære.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: '1 % i årlige omkostninger lyder småt. Over 30 år koster det cirka en fjerdedel af formuen.',
      body: 'Omkostninger trækkes fra hvert år, og de rammer også alt det afkast, pengene **ellers ville have genereret** bagefter.\n\nEt eksempel: 100.000 kr, 7 % om året i 30 år.\n• Uden omkostninger: ca. 761.000 kr\n• Med 1 % i årlige omkostninger (altså 6 %): ca. 574.000 kr\n\nForskellen er ca. 187.000 kr, altså omkring en fjerdedel, for noget der lød som »kun 1 %«.\n\nI Danmark finder du tallet som **ÅOP** (årlige omkostninger i procent) for investeringsforeninger, og **TER/OCF** for ETF\'er. Dertil kommer **kurtage** (handelsomkostning) og **spread**.\n\nDet er derfor, brede **indeksfonde** har vundet så meget terræn: de forsøger ikke at slå markedet, de følger det billigt. Over 15-20 år klarer et stort flertal af aktivt forvaltede fonde sig **dårligere** end deres indeks efter omkostninger.\n\nOmkostninger er i øvrigt den eneste faktor, du kender med sikkerhed på forhånd. Afkastet er et gæt.',
      analogi: 'Et lille hul i benzintanken. På en køretur mærker du det ikke. På en rejse tværs gennem Europa bruger du en ekstra tankfuld på ingenting.',
      figur: {
        titel: '1 % over 30 år',
        svg: svg(170, `
          <line x1="34" y1="130" x2="300" y2="130" stroke="${LINE}" stroke-width="1.5"/>
          ${box(60, 34, 80, 96, '', GROEN)}
          ${txt(100, 24, '761.000', { farve: INK, size: 11 })}
          ${txt(100, 146, 'uden gebyr', { size: 10 })}
          ${box(190, 58, 80, 72, '', ROSA)}
          ${txt(230, 48, '574.000', { farve: INK, size: 11 })}
          ${txt(230, 146, 'med 1 % om året', { size: 10 })}
          ${txt(160, 12, '100.000 kr · 7 % · 30 år', { size: 10 })}`),
        tekst: 'Gebyret æder ikke kun 1 % om året. Det æder også alt det, den procent kunne have vokset til.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvorfor betyder 1 % i årlige omkostninger så meget over 30 år?',
      svar: [
        'Fordi gebyret bliver reguleret op med inflationen hvert år',
        'Fordi det også koster alt det afkast, pengene ville have givet',
        'Fordi gebyrer bliver beskattet hårdere end selve afkastet',
        'Fordi procenten altid trækkes af hele det oprindelige indskud',
      ],
      rigtigt: 1,
      forklaring: 'Det er renters rente den forkerte vej: hver krone i gebyr er også en krone, der aldrig kommer til at vokse.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'De fleste taber ikke på markedet. De taber på deres egne beslutninger i markedet.',
      body: 'Undersøgelser af investorers faktiske afkast finder gang på gang et **adfærdsgab**: den gennemsnitlige investor får mindre ud af en fond, end fonden selv giver. Grunden er timing: man køber, når det er gået godt længe, og sælger, når det gør ondt.\n\nDe tre klassiske fælder:\n• **FOMO**: man køber det, der er steget mest, altså dyrest.\n• **Tabsaversion**: et tab på 1.000 kr gør cirka dobbelt så ondt, som en gevinst på 1.000 kr er rar. Derfor sælger man i bunden.\n• **Survivorship bias**: man hører om dem, der ramte rigtigt, aldrig om de mange, der ramte forkert med samme strategi.\n\nModgiften er at fjerne beslutningen fra øjeblikket:\n• **Fast månedlig opsparing** (dollar cost averaging) køber automatisk mere, når det er billigt.\n• En **skriftlig plan** for, hvad du gør, hvis det falder 30 %, lavet mens det ikke falder.\n• Kig sjældnere. Jo oftere man tjekker, jo flere røde dage ser man, og jo mere handler man.',
      analogi: 'At springe mellem køer i supermarkedet. Hver gang skifter du til den, der lige nu ser hurtigst ud, og hver gang ender du bagerst.',
      hvorfor: 'Det hænger direkte sammen med biases-sporet: tabsaversion og availability er de samme mekanismer, bare med penge på spil.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er fordelen ved fast månedlig opsparing (dollar cost averaging)?',
      svar: [
        'Den garanterer et højere afkast end engangsindskud',
        'Den fjerner beslutningen om timing fra øjeblikket',
        'Den betyder, at man aldrig taber penge',
        'Den giver lavere skat af afkastet',
      ],
      rigtigt: 1,
      forklaring: 'Man køber automatisk flere andele, når kursen er lav. Den store gevinst er adfærdsmæssig: man undgår at skulle beslutte sig, netop når det føles værst.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k3',
      pastand: 'En dyr, aktivt forvaltet fond slår typisk et billigt indeks over 15-20 år.',
      rigtigt: 0,
      forklaring: 'Myte. Et stort flertal af aktive fonde klarer sig dårligere end deres indeks efter omkostninger over lange perioder. Enkelte gør det bedre, men det er svært at udpege dem på forhånd.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k2',
      pastand: 'Kontanter er den sikreste måde at opbevare værdi på i mange år.',
      rigtigt: 0,
      forklaring: 'Myte. Kontanter svinger ikke, men inflationen æder købekraften støt. Ved 2 % inflation er halvdelen væk på ca. 35 år.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar de fire ting, der afgør resultatet af en langsigtet opsparing.',
      punkter: [
        { tekst: 'Tid: renters rente vokser eksponentielt', ord: ['tid', 'renters rente', '72'] },
        { tekst: 'Risiko og tidshorisont hænger sammen', ord: ['risiko', 'udsving', 'horisont'] },
        { tekst: 'Spredning fjerner selskabsrisikoen', ord: ['spred', 'diversif', 'selskabsrisiko'] },
        { tekst: 'Omkostninger trækker fra hvert eneste år', ord: ['omkostning', 'åop', 'gebyr'] },
        { tekst: 'Egen adfærd: FOMO, tabsaversion, timing', ord: ['adfærd', 'fomo', 'tabsaversion', 'timing'] },
      ],
    },
  ],
};
