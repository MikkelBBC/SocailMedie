// Business: findes der en forretning, og holder den?
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'forretning', nr: 1, titel: 'Er der en forretning i det?', kort: 'Forretning', emoji: '💡',
    farve: '#7F7FD5', gradient: 'linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Den hyppigste dødsårsag for startups er ikke dårlig kode. Det er, at ingen havde brug for det.',
      body: 'Når man spørger, hvorfor nystartede virksomheder lukker, står den samme grund øverst i undersøgelse efter undersøgelse: **no market need**. Produktet virkede fint. Der var bare ikke nogen, der havde problemet.\n\nDerfor starter man ikke med at bygge. Man starter med at **finde ud af, om problemet findes**:\n\n• Tal med 10-20 mulige kunder, **før** du bygger. Spørg om, hvad de gør i dag, ikke om de kan lide din idé.\n• Stil fortidsspørgsmål: »Hvornår havde du sidst det her problem? Hvad gjorde du?« Fremtidsspørgsmål (»ville du købe det?«) giver høflige løgne.\n• Den stærkeste validering er, at nogen **betaler** eller bruger tid, før produktet er færdigt.\n\nEn **MVP** er ikke en dårlig udgave af produktet. Det er det mindste, der kan give dig et **ærligt svar** på, om nogen vil have det.',
      analogi: 'At bygge en bro uden at tjekke, om nogen skal over floden. Broen kan være smuk og stå i 100 år, og den er stadig spild.',
      hvorfor: 'Den dyreste fejl er ikke at bygge det forkerte. Det er at bygge det forkerte i to år, før nogen siger det.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvilket spørgsmål giver det mest pålidelige svar fra en mulig kunde?',
      svar: [
        '»Ville du købe det her produkt?«',
        '»Hvad gjorde du, sidst du havde problemet?«',
        '»Synes du, idéen lyder god?«',
        '»Hvor meget ville du betale for det?«',
      ],
      rigtigt: 1,
      forklaring: 'Folk er høflige om fremtiden og præcise om fortiden. Hvad de rent faktisk gjorde sidst, siger noget om, hvor ondt problemet gør.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Koster en kunde mere at få ind, end hun lægger, er mere salg ikke løsningen.',
      body: 'To tal afgør, om forretningen hænger sammen:\n\n**CAC** (Customer Acquisition Cost): hvad det koster at skaffe én betalende kunde. Alle markedsføringskroner og salgstimer delt med antal nye kunder.\n\n**LTV** (Lifetime Value): hvad en kunde lægger, så længe hun bliver, efter fradrag af de omkostninger, der følger med salget.\n\nTommelfingerreglen i abonnementsforretninger er, at **LTV bør være mindst 3 gange CAC**, og at CAC skal være tjent hjem inden for ca. 12 måneder. Ellers æder væksten din likviditet.\n\nDet tredje tal er **churn**: hvor mange procent af kunderne, der forsvinder hver måned. 5 % om måneden lyder småt, men det betyder, at halvdelen er væk på et år, og at du skal løbe stærkt bare for at stå stille.\n\nEt hul her kan ikke fyldes med mere salg. Mere salg gør det værre, hurtigere.',
      analogi: 'En spand med hul i bunden. Churn er hullet. Hælder du hurtigere i (mere salg), spilder du bare hurtigere, hvis hullet ikke bliver lappet.',
      figur: {
        titel: 'Hænger tallene sammen?',
        svg: svg(180, `
          ${box(14, 20, 130, 34, 'CAC: 800 kr', { ...ROSA, size: 11 })}
          ${txt(79, 66, 'at få kunden ind', { size: 10 })}
          ${box(176, 20, 130, 34, 'LTV: 3.000 kr', { ...GROEN, size: 11 })}
          ${txt(241, 66, 'kunden lægger i alt', { size: 10 })}
          ${box(60, 90, 200, 30, 'Forhold: 3,75 · sundt', { ...BLAA, size: 11 })}
          ${txt(160, 140, 'Under 3 = væksten koster mere, end den giver', { size: 10, farve: ROED })}
          ${txt(160, 160, 'Churn 5 %/md = halvdelen væk på et år', { size: 10, farve: ROED })}`),
        tekst: 'Tallene skal regnes pr. kanal: annoncer kan have helt anden CAC end mund-til-mund.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad betyder det, hvis CAC er højere end LTV?',
      svar: [
        'At du tjener på hver ny kunde',
        'At hver ny kunde koster dig penge',
        'At du skal hæve prisen med det samme',
        'At markedsføringen er gratis',
      ],
      rigtigt: 1,
      forklaring: 'Så taber du penge for hver kunde, du skaffer. Vækst gør underskuddet større, ikke mindre.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Pris er ikke omkostninger plus lidt. Pris er, hvad det er værd for kunden.',
      body: 'Tre måder at sætte pris på:\n\n• **Omkostningsbaseret**: læg en margin oven på dine omkostninger. Enkelt, men det fortæller intet om, hvad kunden vil betale.\n• **Konkurrentbaseret**: læg dig omkring markedet. Sikkert, og en sikker vej til priskrig.\n• **Værdibaseret**: hvad sparer eller tjener kunden? Sparer dit værktøj en virksomhed 10 timer om måneden, er prisen forankret i de timer, ikke i din serverregning.\n\nNye virksomheder sætter næsten altid prisen **for lavt**. En lav pris signalerer lav værdi, tiltrækker de mest krævende kunder og efterlader ingen plads til rabat, support eller fejl.\n\nHusk forskellen på **pris** og **omkostning**: at sænke prisen 20 % kan kræve, at du sælger dobbelt så meget for at tjene det samme, hvis dækningsbidraget i forvejen er lille.',
      analogi: 'En brandmand tager ikke betaling for vandet. Han tager betaling for, at huset stadig står.',
      hvorfor: 'Prisen er den hurtigste knap at dreje på i en forretning: den slår direkte igennem på bundlinjen uden ekstra omkostninger.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad kendetegner værdibaseret prissætning?',
      svar: [
        'Prisen følger konkurrenternes niveau',
        'Prisen tager udgangspunkt i kundens udbytte',
        'Prisen er omkostningerne plus en fast margin',
        'Prisen sættes lavt for at få markedsandele',
      ],
      rigtigt: 1,
      forklaring: 'Man spørger, hvad løsningen er værd for kunden i sparet tid eller tjente penge, og sætter prisen som en andel af det.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'En investor køber ikke din idé. Han køber en andel af din fremtid – og du sælger kontrol.',
      body: 'Kapital kan komme flere steder fra, og de koster forskelligt:\n\n• **Egne penge og kunder** (bootstrapping): du beholder alt, men vokser i det tempo, indtjeningen tillader.\n• **Lån**: skal betales tilbage med renter, uanset hvordan det går. Du beholder ejerskabet.\n• **Investorer** (business angels, venturekapital): penge mod **ejerandele**. De skal ikke betales tilbage, men du har fået en medejer med forventninger og indflydelse.\n\nHver investeringsrunde **udvander** (diluterer) de eksisterende ejere: sælger du 20 %, ejer du bagefter 80 % af det hele. Det kan sagtens være en god handel, hvis kagen bliver mere end 25 % større.\n\nTo ting, mange opdager for sent:\n• **Værdiansættelsen** afgør, hvor meget du sælger for hver krone. En høj værdi nu kan være svær at leve op til i næste runde.\n• Investorer forventer typisk en **exit** inden for 5-10 år. Vil du bygge en livsvirksomhed, passer det dårligt sammen.',
      analogi: 'At sælge en andel af huset for at få råd til en tilbygning. Er tilbygningen god nok, er din mindre andel mere værd end hele huset var før.',
      figur: {
        titel: 'Udvanding: mindre andel, større kage',
        svg: svg(170, `
          ${box(14, 30, 130, 70, '', { fill: BG })}
          ${txt(79, 20, 'Før', { size: 10 })}
          ${box(24, 40, 110, 50, 'Dig: 100 %', { ...GROEN, size: 11 })}
          ${txt(79, 112, 'Værdi: 1 mio.', { size: 10, farve: INK })}
          ${box(176, 20, 130, 90, '', { fill: BG })}
          ${txt(241, 12, 'Efter', { size: 10 })}
          ${box(186, 30, 110, 50, 'Dig: 80 %', { ...GROEN, size: 11 })}
          ${box(186, 84, 110, 20, 'Investor: 20 %', { ...BLAA, size: 10 })}
          ${txt(241, 122, 'Værdi: 5 mio.', { size: 10, farve: INK })}
          ${txt(160, 152, '80 % af 5 mio. slår 100 % af 1 mio.', { size: 11, farve: INK })}`),
        tekst: 'Udvanding er kun et problem, hvis pengene ikke gør kagen større.',
      },
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad betyder udvanding (dilution)?',
      svar: [
        'At virksomhedens værdi falder',
        'At din ejerandel bliver mindre i procent',
        'At investoren får sine penge tilbage først',
        'At selskabet optager et lån i banken',
      ],
      rigtigt: 1,
      forklaring: 'Der udstedes nye andele til investoren, så din procentdel falder. Om det er godt afhænger af, hvor meget større værdien bliver.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: 'Har man en god nok idé, kommer kunderne af sig selv.',
      rigtigt: 0,
      forklaring: 'Myte. Distribution er ofte sværere end produktet. Mange gode produkter dør, fordi ingen opdagede dem.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k3',
      pastand: 'Den laveste pris på markedet er den sikreste måde at få kunder på.',
      rigtigt: 0,
      forklaring: 'Myte. Lav pris signalerer lav værdi, tiltrækker de mest prisfølsomme kunder og efterlader ingen margin til support og fejl.',
    },
    {
      id: 'case1', type: 'case', efter: 'k2',
      scenarie: 'Din app har 1.000 brugere, 50 kr/md i abonnement, 8 % churn om måneden og en annoncepris på 600 kr pr. ny betalende kunde.',
      sporgsmal: 'Hvad er det mest akutte problem?',
      svar: [
        'Prisen er for lav til markedet',
        'Churn: kunden bliver i snit ca. 12 måneder',
        'Der er for få brugere til at måle noget',
        'Annoncerne er for dyre til at skalere',
      ],
      rigtigt: 1,
      forklaring: '8 % churn giver en gennemsnitlig levetid på ca. 1/0,08 ≈ 12 måneder, altså ca. 600 kr i LTV mod 600 kr i CAC. Du tjener intet på en ny kunde. Lappes hullet til 4 %, fordobles LTV uden en eneste ny kunde.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar, hvordan du vil finde ud af, om der er en forretning i din idé.',
      punkter: [
        { tekst: 'Find ud af om problemet findes, før du bygger', ord: ['problem', 'kunde', 'tal med', 'valider'] },
        { tekst: 'Spørg om fortiden, ikke om fremtiden', ord: ['fortid', 'sidst', 'gjorde'] },
        { tekst: 'MVP: det mindste, der giver et ærligt svar', ord: ['mvp', 'mindste', 'test'] },
        { tekst: 'CAC mod LTV, gerne mindst 1:3', ord: ['cac', 'ltv', 'kunde koster'] },
        { tekst: 'Churn æder væksten', ord: ['churn', 'forsvinder', 'levetid'] },
        { tekst: 'Værdibaseret pris frem for omkostning plus margin', ord: ['pris', 'værdi', 'margin'] },
      ],
    },
  ],
};
