// Social påvirkning og gruppeadfærd – og hvad der har holdt ved kritisk efterprøvning.
export default {
  spor: {
    id: 'social', nr: 0, titel: 'Social påvirkning', kort: 'Social', emoji: '👥',
    farve: '#4776E6', gradient: 'linear-gradient(135deg, #36D1DC 0%, #5B86E5 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Stregen er tydeligvis kortere. Men alle de andre siger, den er længst.',
      body: 'Solomon Asch satte i 1950\'erne en forsøgsperson ind i en gruppe af skuespillere. Opgaven var nem: hvilken af tre streger er lige så lang som referencestregen?\n\nPå de kritiske forsøg svarede alle skuespillerne **forkert med vilje**. Hvad gjorde den rigtige deltager?\n\nOmkring **en tredjedel** af svarene på de kritiske forsøg fulgte gruppen. Omkring **tre ud af fire** deltagere gik med gruppen mindst én gang. Men det betyder også, at de fleste svar var **selvstændige**.\n\nDen vigtigste detalje: hvis bare **én anden** i gruppen svarede rigtigt, faldt konformiteten drastisk. Man behøver ikke et flertal på sin side, bare ikke at stå alene.\n\nPsykologer skelner mellem **normativ** påvirkning (for at passe ind) og **informativ** påvirkning (fordi man tror, de andre ved bedre).',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad skete der med konformiteten i Asch-forsøget, når én anden i gruppen svarede rigtigt?',
      svar: ['Den steg', 'Den faldt drastisk', 'Den var uændret', 'Deltageren gik ud af forsøget'],
      rigtigt: 1,
      forklaring: 'En enkelt allieret bryder enstemmigheden. Det er en af de mest robuste pointer fra forsøgene.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Jo flere der ser en ulykke, jo mindre hjælper hver enkelt. Men måske ikke, som du tror.',
      body: 'Darley og Latané (1968) lod deltagere høre en anden studerende få et anfald over en intercom. Var deltageren **alene**, hjalp langt de fleste hurtigt. Troede de, at **fire andre** også hørte det, hjalp færre, og de var langsommere.\n\nForklaringen er **diffusion of responsibility**: »nogen andre gør nok noget«. Plus **pluralistisk ignorance**: alle kigger på hinanden, ingen reagerer, og så tolker man, at det nok ikke er alvorligt.\n\nMen nuancen er vigtig:\n• En metaanalyse (Fischer m.fl. 2011) fandt, at effekten er **svagere i farlige nødsituationer**.\n• Et studie af overvågningsvideoer fra rigtige konflikter i tre lande (Philpot m.fl. 2020) fandt, at mindst én person greb ind i **ca. 9 ud af 10** tilfælde, og sandsynligheden steg med antallet af tilskuere.\n\nPraktisk råd, hvis du har brug for hjælp: peg på én bestemt person. »Du i den blå jakke, ring 112.«',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad fandt studiet af overvågningsvideoer fra rigtige offentlige konflikter?',
      svar: [
        'Ingen greb ind, når der var mange tilskuere',
        'Mindst én greb ind i langt de fleste tilfælde, og oftere jo flere tilskuere',
        'Kun politiet greb ind',
        'Tilskuereffekten var dobbelt så stærk som i laboratoriet',
      ],
      rigtigt: 1,
      forklaring: 'Den enkelte hjælper måske mindre i en stor gruppe, men chancen for at nogen hjælper stiger. Laboratoriefund skal efterprøves i virkeligheden.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: '»De fleste gæster genbruger deres håndklæde« slog »Red miljøet«.',
      body: '**Social proof**: når vi er usikre, ser vi på, hvad andre gør. Robert Cialdini har vist det i mange feltforsøg.\n\nI et hotelforsøg (Goldstein, Cialdini & Griskevicius 2008) testede man skilte om genbrug af håndklæder:\n• Standardbudskab om miljøet: ca. **35 %** genbrugte.\n• »De fleste gæster genbruger deres håndklæder«: ca. **44 %**.\n• »De fleste gæster, der har boet **på dette værelse**, genbruger«: ca. **49 %**.\n\nJo mere lighed med dem, man sammenlignes med, jo stærkere effekt.\n\nFælden: en kampagne som »Alt for mange smider affald i naturen!« fortæller også, at **det er normalt** at smide affald. **Deskriptive normer** (hvad folk gør) kan modarbejde **injunktive normer** (hvad folk bør).\n\nSociale medier er social proof på steroider: likes, visninger og »trending« fortæller dig, hvad der er værd at se.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvilket hotelskilt gav mest genbrug af håndklæder?',
      svar: [
        '»Hjælp med at redde miljøet«',
        '»De fleste gæster genbruger deres håndklæder«',
        '»De fleste gæster på dette værelse genbruger deres håndklæder«',
        'Ingen forskel',
      ],
      rigtigt: 2,
      forklaring: 'Normen fra de mest lignende andre (samme værelse) virkede stærkest. Social proof vokser med lighed.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Psykologiens mest berømte eksperimenter er mere komplicerede, end lærebøgerne fortæller.',
      body: '**Milgram (1963)**: 65 % af deltagerne fortsatte til det højeste »stød« på 450 V, når en autoritet bad dem om det. En delvis gentagelse i 2009 (Burger) fandt lignende lydighed op til 150 V. Men arkivstudier (Gina Perry) viser, at en del deltagere tvivlede på, at stødene var ægte, og at instruktionerne varierede.\n\n**Stanford Prison Experiment (1971)**: fortolkningen var, at almindelige mennesker spontant bliver grusomme i en vagtrolle. Men optagelser og arkiver viser, at **vagterne blev coachet** til at være hårde, og at deltagerne vidste, hvad der forventedes. Det var aldrig et kontrolleret eksperiment. I **BBC Prison Study** (Reicher & Haslam) opstod der ikke spontant tyranni.\n\nLektien er ikke, at situationer er ligegyldige. Situationer påvirker os stærkt. Men **hvem der leder, hvad der forventes, og om man identificerer sig med gruppen**, betyder mere end rollen alene.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad er den største kritik af Stanford Prison Experiment?',
      svar: [
        'Der var for mange deltagere',
        'Vagterne blev coachet og vidste, hvad der forventedes – så grusomheden var ikke spontan',
        'Det blev lavet i Europa',
        'Det varede for længe',
      ],
      rigtigt: 1,
      forklaring: 'Arkivmaterialet viser, at forsøgslederne opfordrede vagterne til hårdhed. Det gør den klassiske konklusion om spontan ondskab tvivlsom.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'I en stor menneskemængde er det usandsynligt, at nogen hjælper en person i nød.',
      rigtigt: 0,
      forklaring: 'Myte. Hver enkelt føler måske mindre ansvar, men i rigtige konfliktsituationer greb mindst én ind i langt de fleste tilfælde, og flere tilskuere øgede chancen.',
    },
    {
      id: 'myte2', type: 'myte', efter: 'k4',
      pastand: 'Stanford Prison Experiment beviste, at almindelige mennesker automatisk bliver onde, når de får magt.',
      rigtigt: 0,
      forklaring: 'Myte. Vagterne blev coachet, og det var ikke et kontrolleret eksperiment. Senere forskning peger på ledelse og gruppeidentifikation frem for automatiske rolleeffekter.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k3',
      sporgsmal: 'Forklar tre former for social påvirkning med et klassisk studie til hver – og hvad kritikken er.',
      punkter: [
        { tekst: 'Konformitet: Asch-stregforsøget', ord: ['asch', 'konform', 'streg'] },
        { tekst: 'En allieret reducerer konformitet', ord: ['allieret', 'én anden', 'en anden'] },
        { tekst: 'Tilskuereffekt: Darley & Latané, diffusion of responsibility', ord: ['tilskuer', 'bystander', 'diffusion', 'darley'] },
        { tekst: 'Nuance: rigtige konflikter – nogen hjælper oftest', ord: ['video', 'virkelig', 'nuance', 'philpot'] },
        { tekst: 'Social proof: Cialdini og hotelhåndklæder', ord: ['social proof', 'cialdini', 'håndklæde', 'norm'] },
        { tekst: 'Milgram/Stanford og kritikken af dem', ord: ['milgram', 'stanford', 'kritik', 'coach'] },
      ],
    },
  ],
};
