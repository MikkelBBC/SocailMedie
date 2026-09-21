// Lommefilosofi: stoicisme som praktisk værktøj.
export default {
  spor: {
    id: 'stoicisme', nr: 0, titel: 'Stoicisme i lommeformat', kort: 'Stoicisme', emoji: '🏛️',
    farve: '#A18CD1', gradient: 'linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Første linje i en 1.900 år gammel manual: sorter verden i to bunker.',
      body: '**Epiktet** var født slave i Romerriget og blev en af de mest indflydelsesrige stoiske lærere. Hans elev Arrian samlede hans lære i en lille håndbog, **Enchiridion**. Den starter med **kontroldikotomien**:\n\nNogle ting er **op til os**: vores vurderinger, valg, holdninger og handlinger.\nAndre ting er **ikke op til os**: vores krop, omdømme, ejendom, andres meninger og hvordan det hele ender.\n\nMeget ulykke kommer, siger Epiktet, af at behandle den anden bunke, som om den var den første. Man bekymrer sig om, hvad censor synes, i stedet for at forberede sig.\n\nModerne stoikere taler ofte om en **trikotomi**: nogle ting kan vi **delvist** påvirke. Du styrer ikke karakteren, men du styrer din indsats. Så sæt dit mål i det, du styrer: »at forberede mig så godt som muligt« i stedet for »at få 12«.\n\nDet gør dig ikke ligeglad med udfaldet. Det flytter bare din energi derhen, hvor den virker.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er ifølge Epiktet »op til os«?',
      svar: [
        'Vores vurderinger og valg',
        'Vores omdømme',
        'Hvad andre mener om os',
        'Om vi bliver syge'
      ],
      rigtigt: 0,
      forklaring: 'Kontroldikotomien: vurderinger, valg og handlinger er vores. Krop, omdømme og udfald er ikke fuldt op til os.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Stoikerne øvede sig i at forestille sig, at det hele gik galt. Det gjorde dem gladere.',
      body: '**Seneca** anbefalede **premeditatio malorum**: at man på forhånd forestiller sig de dårlige ting, der kan ske. Toget kommer ikke. Man bliver syg. Eksamen går dårligt.\n\nDet lyder som en opskrift på angst, men formålet er det modsatte:\n\n**1. Mindre chok.** Det, man har tænkt igennem, rammer ikke så hårdt. Man har allerede en plan.\n\n**2. Mere taknemmelighed.** Forestiller man sig at miste noget, man tager for givet, bliver det mere værdifuldt nu. William Irvine kalder det **negativ visualisering**.\n\nSeneca gik længere: nogle dage levede han bevidst med simpel mad og groft tøj og spurgte sig selv: »Er det dét, jeg frygtede?«\n\nForskellen på premeditatio og **grubleri** er vigtig. Grubleri kører i ring uden handling. Premeditatio er kort, konkret og ender med: »Hvad ville jeg så gøre?« Moderne psykologer kalder noget lignende en **pre-mortem**.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad adskiller premeditatio malorum fra almindelig bekymring?',
      svar: [
        'At den kun handler om andre mennesker end en selv',
        'Der er reelt ingen forskel på de to ting',
        'At den varer betydeligt længere ad gangen',
        'At den er kort, konkret og ender med en plan'
      ],
      rigtigt: 3,
      forklaring: 'Øvelsen forbereder og giver perspektiv. Grubleri kører i ring uden handling.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: '»Det er ikke tingene, der plager os, men vores domme om dem.« Moderne terapi er bygget på den sætning.',
      body: 'Epiktet skrev i Enchiridion, at mennesker ikke bliver foruroliget af **tingene selv**, men af deres **meninger** om tingene.\n\nEn censor, der rynker panden, er en ansigtsbevægelse. »Hun synes, jeg er dum, og nu dumper jeg« er en **dom**, du lægger ovenpå. Og det er dommen, der giver angsten.\n\nIdéen er ikke blevet på museum. **Albert Ellis**, der grundlagde REBT, og **Aaron Beck**, der grundlagde kognitiv terapi, nævner begge stoikerne som inspiration. Deres kerne er den samme:\n\n**Hændelse → tanke/tolkning → følelse.**\n\nNår man ændrer tolkningen, ændrer følelsen sig ofte også.\n\nDet betyder ikke, at alt er »bare i hovedet«, eller at man selv er skyld i det, man føler. Nogle ting er virkelig slemme. Men der er næsten altid et lille rum mellem det, der sker, og hvordan du fortolker det. Stoicismen er træning i at finde det rum.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvilken moderne behandlingsform er direkte inspireret af Epiktets idé om domme?',
      svar: [
        'Kognitiv adfærdsterapi og REBT',
        'Hypnose og suggestionsbehandling',
        'Elektrochokbehandling ved svær depression',
        'Psykoanalysen, som Freud grundlagde'
      ],
      rigtigt: 0,
      forklaring: 'Både Ellis og Beck nævner stoikerne. Modellen hændelse → tolkning → følelse er kernen i kognitiv terapi.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Husk, at du skal dø. Og elsk alt, der sker. To mærkelige råd, der passer sammen.',
      body: '**Memento mori**, »husk, at du skal dø«, går igen hos stoikerne. Kejser **Marcus Aurelius** skrev i sine private noter, Meditationer, at man kan forlade livet når som helst, og at man derfor skal handle og tænke ud fra det.\n\nPointen er ikke at blive dyster. Det er **prioritering**. Når tiden er begrænset, bliver det lettere at sige nej til det ligegyldige og ja til det vigtige.\n\n**Amor fati**, »kærlighed til skæbnen«, er Nietzsches formulering. Men idéen findes hos stoikerne: at ønske, at tingene sker, som de sker. Marcus Aurelius sammenligner det med en ild, der gør alt, hvad man kaster i den, til flamme og lys.\n\nKombinationen er stærk: Livet er kort (memento mori), så spild det ikke på at ønske, at virkeligheden var anderledes (amor fati). Brug det, der sker, som materiale.\n\nEn dårlig eksamen er ikke kun et nederlag. Den er også data om, hvad du skal øve.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er det praktiske formål med memento mori?',
      svar: [
        'At tro på, at der findes et liv efter døden',
        'At blive bange for døden og undgå risiko',
        'At undgå at planlægge for langt ud i fremtiden',
        'At prioritere, fordi tiden er begrænset'
      ],
      rigtigt: 3,
      forklaring: 'Bevidstheden om, at tiden er begrænset, gør det lettere at vælge det meningsfulde og droppe det ligegyldige.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k3',
      pastand: 'Stoikere forsøger at undertrykke alle følelser og være kolde.',
      rigtigt: 0,
      forklaring: 'Myte. Ordet »stoisk« i dag betyder følelsesløs, men stoikerne ville undgå ødelæggende følelser baseret på forkerte domme. Glæde, venskab og omsorg havde de høje tanker om.',
    },
    {
      id: 'case1', type: 'case', efter: 'k1',
      scenarie: 'Det er dagen før mundtlig eksamen. Mads ligger vågen og tænker: »Hvad hvis jeg trækker det emne, jeg er dårligst til, og censor er streng?«',
      sporgsmal: 'Hvad ville Epiktet råde ham til?',
      svar: [
        'At bekymre sig endnu mere, så han er klar',
        'At aflyse eksamen og tage den en anden gang',
        'At skelne: censor er ikke op til ham, søvnen er',
        'At lade som om eksamen slet ikke findes'
      ],
      rigtigt: 2,
      forklaring: 'Kontroldikotomien i praksis: flyt energien fra det, man ikke styrer (emne, censor), til det, man styrer (søvn, forberedelse, tolkning).',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar tre stoiske værktøjer, og hvordan du kunne bruge dem i din hverdag.',
      punkter: [
        { tekst: 'Kontroldikotomien: skeln mellem det, der er op til dig, og det, der ikke er', ord: ['kontrol', 'dikotomi', 'op til'] },
        { tekst: 'Sæt mål i det, du styrer (indsats frem for udfald)', ord: ['indsats', 'udfald', 'mål'] },
        { tekst: 'Premeditatio malorum / negativ visualisering', ord: ['premeditatio', 'negativ', 'visualiser', 'forestil'] },
        { tekst: 'Det er dommene om tingene, der plager os', ord: ['dom', 'tolkning', 'mening'] },
        { tekst: 'Forbindelse til kognitiv terapi', ord: ['kognitiv', 'terapi', 'beck', 'ellis'] },
        { tekst: 'Memento mori / amor fati', ord: ['memento', 'amor', 'fati', 'død'] },
      ],
    },
  ],
};
