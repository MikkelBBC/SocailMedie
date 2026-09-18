// Psykiatri: psykose og skizofreni.
export default {
  spor: {
    id: 'psykose', nr: 0, titel: 'Psykose og skizofreni', kort: 'Psykose', emoji: '🌀',
    farve: '#C471ED', gradient: 'linear-gradient(135deg, #12C2E9 0%, #C471ED 55%, #F64F59 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Psykose er, når hjernens virkelighedstjek holder op med at virke.',
      body: '**Psykose** betyder, at man mister kontakten til en fælles virkelighed. Det er et symptombillede, ikke én bestemt sygdom. Det kan ses ved skizofreni, men også ved svær depression, bipolar lidelse, rusmidler og visse legemlige sygdomme.\n\nSymptomerne deles ofte i tre grupper:\n\n**Positive** (noget kommer til):\n• **Hallucinationer**: at sanse noget, der ikke er der, oftest at høre stemmer.\n• **Vrangforestillinger**: faste overbevisninger, der ikke rokkes af modbevis, fx at man bliver overvåget.\n\n**Negative** (noget forsvinder): nedsat initiativ, affladet følelsesudtryk, social tilbagetrækning.\n\n**Kognitive**: problemer med opmærksomhed, arbejdshukommelse og planlægning.\n\nDe positive symptomer er de mest synlige. Men det er ofte de negative og kognitive symptomer, der betyder mest for, hvordan livet går bagefter.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvilket er et NEGATIVT symptom ved skizofreni?',
      svar: ['At høre stemmer', 'At tro man bliver overvåget', 'Nedsat initiativ og affladet følelsesudtryk', 'Hurtig tale'],
      rigtigt: 2,
      forklaring: '»Negativ« betyder, at noget mangler, ikke at det er dårligt. Hallucinationer og vrangforestillinger er positive symptomer.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Hvad nu hvis alt pludselig føltes vigtigt? Så begynder hjernen at finde mønstre, der ikke er der.',
      body: 'Antipsykotisk medicin blokerer **dopamin D2-receptorer**. Derfor har man længe haft en **dopaminhypotese**: psykose hænger sammen med for meget dopamin-aktivitet i bestemte baner.\n\nShitij Kapur gav i 2003 en elegant forklaring på, **hvordan** det kunne føre til symptomer: **aberrant salience**.\n\nDopamin signalerer ikke glæde, men **»det her er vigtigt, læg mærke til det«**. Hvis systemet fyrer tilfældigt, bliver ligegyldige ting pludselig ladet med betydning: en nummerplade, et blik, en sang i radioen.\n\nHjernen gør så det, den altid gør: den forsøger at **forklare** oplevelsen. Og forklaringen bliver en vrangforestilling. »De mange røde biler betyder, at nogen holder øje med mig.«\n\nModellen passer med, at antipsykotika ofte først gør tankerne mindre **påtrængende**, før de forsvinder. Den er ikke hele sandheden, men den bygger bro mellem biologi og oplevelse.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad betyder »aberrant salience« i Kapurs model?',
      svar: [
        'At man mister al hukommelse',
        'At ligegyldige ting fejlagtigt føles ladet med betydning, og hjernen forklarer det med vrangforestillinger',
        'At dopamin gør en glad',
        'At man har for lidt serotonin',
      ],
      rigtigt: 1,
      forklaring: 'Dopamin markerer, hvad der er vigtigt. Når markeringen går i stykker, forsøger hjernen at forklare de mærkelige oplevelser.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Skizofreni betyder ikke spaltet personlighed. Og de fleste er ikke farlige.',
      body: 'To myter holder sig stædigt.\n\n**Myte 1: spaltet personlighed.** Navnet kommer af græsk »spaltet sind«. Eugen Bleuler mente en spaltning mellem tanker, følelser og adfærd, ikke flere personligheder. Det, film kalder »split personality«, er dissociativ identitetsforstyrrelse, som er noget helt andet og sjældent.\n\n**Myte 2: farlighed.** Der er en lidt forhøjet risiko for vold ved skizofreni, især sammen med misbrug og uden behandling. Men langt de fleste bliver aldrig voldelige, og det er langt mere sandsynligt, at mennesker med skizofreni selv bliver **ofre** for vold.\n\nMyterne har konsekvenser. **Stigma** gør, at folk søger hjælp senere, og at de får sværere ved at få arbejde, bolig og venner.\n\nSkizofreni rammer omkring 1 % i løbet af livet, og debuten ligger typisk i slutningen af teenageårene eller 20\'erne.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad er mest korrekt om skizofreni og vold?',
      svar: [
        'De fleste med skizofreni er voldelige',
        'Mennesker med skizofreni er oftere ofre for vold, end de er voldsudøvere',
        'Der er ingen sammenhæng overhovedet med noget',
        'Skizofreni betyder flere personligheder, som kan være voldelige',
      ],
      rigtigt: 1,
      forklaring: 'Risikoen er lidt forhøjet, især med misbrug og uden behandling, men langt de fleste er aldrig voldelige og er i højere risiko for selv at blive udsat for vold.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Danmark har testet, hvad der sker, når man griber ind tidligt. Det hedder OPUS.',
      body: 'Jo længere en psykose står ubehandlet, jo dårligere går det typisk. Derfor startede Danmark i 1998 **OPUS**: et tilbud om **tidlig, intensiv indsats** til unge med en første psykose.\n\nOPUS kombinerer:\n• Et fast team og en fast kontaktperson.\n• **Medicin** i lavest mulige dosis.\n• **Psykoedukation** til både den unge og familien.\n• Træning i sociale færdigheder og hjælp med uddannelse og job.\n\nI det randomiserede OPUS-forsøg havde deltagerne færre symptomer og bedre funktion efter to år end dem, der fik standardbehandling. Nogle af fordelene aftog efter endt behandling, hvilket har ført til diskussioner om, hvor længe indsatsen skal vare.\n\nI dag bruges **recovery**-begrebet: bedring handler ikke kun om færre symptomer, men om at leve et meningsfuldt liv. Et betydeligt antal mennesker, der har haft en psykose, kommer sig helt eller delvist.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er kernen i OPUS?',
      svar: [
        'Indlæggelse i mindst et år',
        'Tidlig, intensiv og samlet indsats med medicin, psykoedukation, familie og sociale færdigheder',
        'Kun høje doser medicin',
        'At vente og se, om psykosen går over',
      ],
      rigtigt: 1,
      forklaring: 'OPUS samler behandlingen omkring den unge tidligt i forløbet. Forsøget viste bedre symptomer og funktion efter to år.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k3',
      pastand: 'Skizofreni betyder, at man har flere personligheder.',
      rigtigt: 0,
      forklaring: 'Myte. Skizofreni handler om psykotiske, negative og kognitive symptomer. Flere identiteter er dissociativ identitetsforstyrrelse, som er noget andet.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k1',
      pastand: 'Psykose kan også opstå ved andet end skizofreni, fx ved brug af rusmidler.',
      rigtigt: 1,
      forklaring: 'Fakta. Psykose er et symptombillede. Det ses også ved bl.a. svær depression, bipolar lidelse, rusmidler som cannabis og amfetamin, og visse legemlige sygdomme.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar, hvad psykose er, og hvordan dopamin kan hænge sammen med vrangforestillinger.',
      punkter: [
        { tekst: 'Psykose: tab af kontakt til en fælles virkelighed', ord: ['virkelighed', 'kontakt'] },
        { tekst: 'Positive symptomer: hallucinationer og vrangforestillinger', ord: ['hallucination', 'vrangforestilling', 'stemmer'] },
        { tekst: 'Negative og kognitive symptomer', ord: ['negativ', 'kognitiv', 'initiativ'] },
        { tekst: 'Antipsykotika blokerer dopamin D2-receptorer', ord: ['d2', 'antipsykot', 'blokere'] },
        { tekst: 'Aberrant salience: ligegyldige ting føles vigtige', ord: ['salience', 'vigtig', 'betydning'] },
        { tekst: 'Vrangforestillinger som forsøg på at forklare oplevelsen', ord: ['forklar', 'mening'] },
      ],
    },
  ],
};
