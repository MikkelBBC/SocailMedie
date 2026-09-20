// Ekstra forklaring til de sværeste koncepter: en hverdags-sammenligning, en tegning
// og »sådan sker det« trin for trin. Nøglen er kortets fulde id (fx 't01-k3').
//
// Hvorfor: en analogi giver et kendt knagerække at hænge det nye på (Gentner),
// en tegning + tekst husker man bedre end tekst alene (Mayers multimedieprincip),
// og trin gør en usynlig proces synlig i rækkefølge.
//
// Tegningerne er små SVG'er. De tegnes i et 320×H-koordinatsystem og skaleres til kortet.

export const INK = '#1c1c1e';
export const MUTED = '#6e6a80';
export const LINE = '#d9d7e6';
export const BG = '#f6f5fb';

// --- små byggeklodser, så tegningerne bliver korte at skrive ---
export const box = (x, y, w, h, tekst, { fill = BG, stroke = LINE, farve = INK, size = 12, r = 10, fed = 700 } = {}) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
  ${tekst ? `<text x="${x + w / 2}" y="${y + h / 2}" fill="${farve}" font-size="${size}" font-weight="${fed}" text-anchor="middle" dominant-baseline="central">${tekst}</text>` : ''}`;
export const txt = (x, y, tekst, { farve = MUTED, size = 11, anchor = 'middle', fed = 600 } = {}) =>
  `<text x="${x}" y="${y}" fill="${farve}" font-size="${size}" font-weight="${fed}" text-anchor="${anchor}" dominant-baseline="central">${tekst}</text>`;
export const pil = (x1, y1, x2, y2, { farve = '#833AB4', stiplet = false, bred = 2 } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${farve}" stroke-width="${bred}" stroke-linecap="round" ${stiplet ? 'stroke-dasharray="5 5"' : ''} marker-end="url(#pil)"/>`;
export const svg = (h, indhold) => `<svg viewBox="0 0 320 ${h}" role="img">
  <defs><marker id="pil" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker></defs>${indhold}</svg>`;

export default {
  // ================= SW3SYS: basics =================
  't00-k1': {
    analogi: 'Dit program er en gæst på et hotel. Det må ikke selv gå ud i køkkenet og tænde komfuret. Det ringer til receptionen (kernen) og beder om mad. Receptionen tjekker, om du må, og ordner resten.',
    figur: {
      titel: 'Vejen fra dit program til hardwaren',
      svg: svg(200, `
        ${box(20, 10, 280, 46, 'Dit program (user space)', { fill: '#fff' })}
        ${pil(160, 58, 160, 76)}
        ${txt(230, 67, 'read(), write() …')}
        ${box(20, 78, 280, 40, 'Systemkald = døren ind', { fill: '#ffe9f1', stroke: '#f7b8d0', farve: '#a3123f' })}
        ${pil(160, 120, 160, 138)}
        ${box(20, 140, 280, 46, 'Kernen (kernel space): må alt', { fill: '#eef1ff', stroke: '#c5cdf7', farve: '#3b3f9e' })}`),
      tekst: 'Alt, dit program vil have fra hardwaren, går gennem et systemkald. Det er den eneste dør ind til kernen.',
    },
    hvordan: [
      'Dit program kalder fx read().',
      'CPU\'en skifter til kernemode gennem en trap (en slags kontrolleret afbrydelse).',
      'Kernen tjekker: må du læse den fil?',
      'Kernen taler med hardwaren og henter data.',
      'CPU\'en skifter tilbage til user mode, og read() returnerer.',
    ],
    hvorfor: 'Uden den dør kunne ét dårligt program slette andres hukommelse eller styre din harddisk direkte.',
  },

  't00-k2': {
    analogi: 'Tænk på dit skrivebord. Det, du bruger lige nu, ligger foran dig (registre). Lidt længere væk står en reol (RAM). Kælderen har alt det gamle (disken). Jo længere væk, jo mere kan der være, og jo længere tid tager det at hente.',
    figur: {
      titel: 'Hukommelsespyramiden',
      svg: svg(200, `
        ${box(110, 8, 100, 28, 'Registre', { fill: '#ffd8e4', stroke: '#f7b8d0' })}
        ${txt(292, 22, '< 1 ns', { anchor: 'end' })}
        ${box(90, 42, 140, 28, 'L1 / L2 cache', { fill: '#ffe9f1', stroke: '#f7b8d0' })}
        ${txt(292, 56, '~ 1-10 ns', { anchor: 'end' })}
        ${box(60, 76, 200, 30, 'RAM', { fill: '#eef1ff', stroke: '#c5cdf7' })}
        ${txt(292, 91, '~ 100 ns', { anchor: 'end' })}
        ${box(30, 112, 260, 34, 'SSD / disk', { fill: '#e8faf1', stroke: '#b6e8cd' })}
        ${txt(292, 129, '~ 100 000 ns', { anchor: 'end' })}
        ${txt(160, 168, 'Lille og lynhurtig øverst · stor og langsom nederst', { size: 11 })}
        ${txt(160, 186, 'Cache = at flytte det, du bruger tit, opad', { size: 11, farve: '#a3123f' })}`),
      tekst: 'Prisen betaler du i tid. Derfor gemmer computeren det, du bruger tit, så højt oppe som muligt.',
    },
    hvorfor: 'Det forklarer, hvorfor den samme kode kan være 100 gange langsommere, hvis den hopper tilfældigt rundt i hukommelsen.',
  },

  // ================= Processer =================
  't01-k1': {
    analogi: 'En kogebog er ikke et måltid. Programmet er opskriften på disken. Processen er kokken, der har opskriften i hånden, en gryde i gang og en halv løg skåret. To kokke kan lave den samme opskrift samtidig, hver med deres eget bord.',
    figur: {
      titel: 'Hvad en proces består af',
      svg: svg(190, `
        ${box(14, 10, 130, 36, 'Program (fil)', { fill: '#fff' })}
        ${pil(80, 48, 80, 66)}
        ${txt(80, 58, 'startes', { anchor: 'start', size: 10 })}
        ${box(14, 68, 130, 110, '', { fill: BG })}
        ${txt(79, 84, 'PROCES', { farve: '#a3123f', size: 11 })}
        ${box(24, 96, 110, 22, 'Kode + data', { fill: '#fff', size: 11 })}
        ${box(24, 122, 110, 22, 'Heap (malloc)', { fill: '#fff', size: 11 })}
        ${box(24, 148, 110, 22, 'Stak + registre', { fill: '#fff', size: 11 })}
        ${box(170, 68, 136, 110, '', { fill: BG })}
        ${txt(238, 84, 'PCB HOS KERNEN', { farve: '#3b3f9e', size: 10 })}
        ${txt(238, 106, 'PID · tilstand', { size: 11 })}
        ${txt(238, 126, 'program counter', { size: 11 })}
        ${txt(238, 146, 'åbne filer', { size: 11 })}
        ${txt(238, 166, 'hukommelseskort', { size: 11 })}`),
      tekst: 'Processen er programmet PLUS alt det, kernen skal huske om det, mens det kører.',
    },
    hvorfor: 'Derfor kan du åbne den samme browser to gange. Samme program, to processer, hver med sin egen tilstand.',
  },

  't01-k3': {
    analogi: 'Forestil dig en kopimaskine, du selv træder ind i. Ud kommer der to af dig, med samme tøj og samme hukommelse. Den eneste forskel er en seddel i hånden: originalen får barnets nummer, kopien får et 0. Sedlen er det eneste, I kan bruge til at se, hvem der er hvem.',
    figur: {
      titel: 'fork(): ét kald, to svar',
      svg: svg(190, `
        ${box(100, 8, 120, 32, 'Forælder kalder fork()', { fill: '#fff', size: 11 })}
        ${pil(140, 42, 80, 72)}
        ${pil(180, 42, 240, 72)}
        ${box(14, 74, 132, 58, '', { fill: '#eef1ff', stroke: '#c5cdf7' })}
        ${txt(80, 92, 'Forælder', { farve: '#3b3f9e' })}
        ${txt(80, 112, 'fork() = 1234', { farve: INK, size: 12, fed: 800 })}
        ${box(174, 74, 132, 58, '', { fill: '#ffe9f1', stroke: '#f7b8d0' })}
        ${txt(240, 92, 'Barn (PID 1234)', { farve: '#a3123f' })}
        ${txt(240, 112, 'fork() = 0', { farve: INK, size: 12, fed: 800 })}
        ${txt(160, 152, 'Samme kode kører videre begge steder', { size: 11 })}
        ${txt(160, 172, 'if (pid == 0) { … } vælger, hvem der gør hvad', { size: 11, farve: '#a3123f' })}`),
      tekst: 'Begge processer fortsætter på linjen EFTER fork(). Returværdien er det eneste, der adskiller dem.',
    },
    hvordan: [
      'Du kalder fork().',
      'Kernen laver en kopi af processen: samme kode, samme variabler, ny PID.',
      'Begge processer fortsætter fra samme sted.',
      'Barnet får 0 tilbage, forælderen får barnets PID.',
      'Typisk kalder barnet exec() og bliver til et helt andet program.',
    ],
    hvorfor: 'Sådan starter din shell alle programmer: fork() for at lave en ny proces, exec() for at fylde den med fx ls.',
  },

  't01-k4': {
    analogi: 'To naboer i hver sin lejlighed kan ikke råbe gennem væggen. De kan lægge en seddel i en fælles postkasse (pipe), eller aftale at dele et rum i kælderen, som begge har nøgle til (shared memory).',
    figur: {
      titel: 'To måder at snakke sammen på',
      svg: svg(200, `
        ${txt(160, 12, 'PIPE: beskeder i en kø', { farve: '#3b3f9e', size: 11 })}
        ${box(14, 24, 96, 40, 'Proces A', { fill: '#fff', size: 11 })}
        ${box(122, 30, 76, 28, 'pipe', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${box(210, 24, 96, 40, 'Proces B', { fill: '#fff', size: 11 })}
        ${pil(112, 44, 120, 44)}
        ${pil(200, 44, 208, 44)}
        ${txt(160, 84, 'Kernen kopierer data. Sikkert, men langsommere.', { size: 10 })}
        ${txt(160, 112, 'SHARED MEMORY: fælles rum', { farve: '#a3123f', size: 11 })}
        ${box(14, 124, 96, 40, 'Proces A', { fill: '#fff', size: 11 })}
        ${box(210, 124, 96, 40, 'Proces B', { fill: '#fff', size: 11 })}
        ${box(118, 124, 84, 40, 'samme RAM', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${pil(112, 144, 116, 144)}
        ${pil(208, 144, 204, 144)}
        ${txt(160, 184, 'Ingen kopiering = hurtigst, men I skal selv låse', { size: 10 })}`),
      tekst: 'Pipe er som at sende en seddel. Shared memory er som at dele et bord: hurtigt, men I kan komme til at skrive oven i hinanden.',
    },
    hvorfor: 'Valget er altid det samme afvejning: sikkerhed og enkelhed mod hastighed.',
  },

  // ================= Tråde =================
  't03-k1': {
    analogi: 'En proces er en lejlighed. Tråde er personer, der bor i den samme lejlighed: fælles køkken og køleskab (heap), men hver sin seng (stak). To lejligheder kan ikke rode i hinandens køleskab. To beboere kan.',
    figur: {
      titel: 'Hvad tråde deler, og hvad de ikke deler',
      svg: svg(190, `
        ${box(14, 14, 292, 160, '', { fill: BG })}
        ${txt(160, 30, 'ÉN PROCES', { farve: '#a3123f', size: 11 })}
        ${box(30, 42, 260, 30, 'Kode · globale data · heap  =  FÆLLES', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 11 })}
        ${box(30, 84, 80, 74, '', { fill: '#fff' })}
        ${txt(70, 100, 'Tråd 1', { farve: INK })}
        ${txt(70, 122, 'egen stak', { size: 10 })}
        ${txt(70, 140, 'egne registre', { size: 10 })}
        ${box(120, 84, 80, 74, '', { fill: '#fff' })}
        ${txt(160, 100, 'Tråd 2', { farve: INK })}
        ${txt(160, 122, 'egen stak', { size: 10 })}
        ${txt(160, 140, 'egne registre', { size: 10 })}
        ${box(210, 84, 80, 74, '', { fill: '#fff' })}
        ${txt(250, 100, 'Tråd 3', { farve: INK })}
        ${txt(250, 122, 'egen stak', { size: 10 })}
        ${txt(250, 140, 'egne registre', { size: 10 })}`),
      tekst: 'Fælles heap er både styrken (hurtig deling) og faren (de kan ødelægge hinandens data).',
    },
    hvorfor: 'Det er hele grunden til, at du skal bruge mutex mellem tråde, men ikke mellem processer.',
  },

  't03-k2': {
    analogi: 'Fire personer maler et hus hurtigere end én. Men hvis der kun er én stige til gavlen, og gavlen tager en time, bliver I aldrig færdige på under en time – uanset hvor mange I er.',
    figur: {
      titel: 'Amdahls lov: den serielle del sætter loftet',
      svg: svg(180, `
        ${txt(160, 12, 'Program: 20 % kan ikke deles op', { size: 11 })}
        ${txt(30, 40, '1 kerne', { anchor: 'start', size: 11, farve: INK })}
        ${box(100, 28, 40, 24, '', { fill: '#ff8fa6', stroke: '#f7b8d0', r: 5 })}
        ${box(140, 28, 160, 24, '', { fill: '#c5cdf7', stroke: '#c5cdf7', r: 5 })}
        ${txt(30, 82, '4 kerner', { anchor: 'start', size: 11, farve: INK })}
        ${box(100, 70, 40, 24, '', { fill: '#ff8fa6', stroke: '#f7b8d0', r: 5 })}
        ${box(140, 70, 40, 24, '', { fill: '#c5cdf7', stroke: '#c5cdf7', r: 5 })}
        ${txt(30, 124, '∞ kerner', { anchor: 'start', size: 11, farve: INK })}
        ${box(100, 112, 40, 24, '', { fill: '#ff8fa6', stroke: '#f7b8d0', r: 5 })}
        ${txt(160, 156, 'Rød = den serielle del. Den bliver aldrig kortere.', { size: 10, farve: '#a3123f' })}
        ${txt(160, 172, 'Maks. speedup her: 5×, uanset antal kerner', { size: 10 })}`),
      tekst: 'Speedup = 1 / (s + (1−s)/n). Med s = 20 % kan du højst blive 5 gange hurtigere.',
    },
    hvorfor: 'Derfor er det vigtigste spørgsmål ikke »hvor mange tråde?«, men »hvor stor er den del, der ikke kan deles op?«',
  },

  // ================= Synkronisering =================
  't04-k1': {
    analogi: 'To personer ser på den samme tavle, hvor der står 5. Begge læser 5, begge lægger 1 til i hovedet og skriver 6. To tællinger, men tavlen gik kun op med 1. Ingen gjorde noget forkert – de så bare på tavlen samtidig.',
    figur: {
      titel: 'Race condition: counter++ er tre skridt',
      svg: svg(200, `
        ${txt(80, 14, 'Tråd A', { farve: '#a3123f' })}
        ${txt(240, 14, 'Tråd B', { farve: '#3b3f9e' })}
        ${txt(160, 36, 'counter = 5', { farve: INK, size: 12, fed: 800 })}
        ${box(20, 52, 120, 26, 'læser 5', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 11 })}
        ${box(180, 78, 120, 26, 'læser 5', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${box(20, 104, 120, 26, 'regner 5+1', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 11 })}
        ${box(180, 130, 120, 26, 'regner 5+1', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${box(20, 156, 120, 26, 'skriver 6', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 11 })}
        ${box(180, 156, 120, 26, 'skriver 6', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${txt(160, 194, 'To plus-ét gav 6, ikke 7', { farve: '#a3123f', size: 11 })}`),
      tekst: 'Tiden løber nedad. Fordi B læser, før A har skrevet, forsvinder den ene optælling.',
    },
    hvordan: [
      'counter++ bliver i virkeligheden til: læs, læg til, skriv.',
      'Operativsystemet kan afbryde tråden mellem to af de skridt.',
      'Den anden tråd når at læse den gamle værdi.',
      'Begge skriver det samme tal tilbage, og en optælling er væk.',
    ],
    hvorfor: 'Fejlen sker kun nogle gange, og næsten aldrig når du debugger. Derfor skal man kende mønstret i stedet for at lede efter den.',
  },

  't04-k3': {
    analogi: 'En mutex er nøglen til et toilet på en café. Der er kun én nøgle. Vil du ind, skal du hente nøglen, og du skal huske at aflevere den. Glemmer én person at bruge nøglen og bare går ind, hjælper låsen ingenting.',
    figur: {
      titel: 'Mutex: kun én ad gangen',
      svg: svg(180, `
        ${box(14, 20, 90, 40, 'Tråd A', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 11 })}
        ${pil(106, 40, 126, 40)}
        ${box(128, 14, 64, 52, '🔒', { fill: '#fff', size: 22 })}
        ${txt(160, 80, 'mutex', { size: 10 })}
        ${pil(194, 40, 214, 40)}
        ${box(216, 20, 90, 40, 'Delt data', { fill: BG, size: 11 })}
        ${box(14, 104, 90, 40, 'Tråd B', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${pil(106, 124, 126, 124, { farve: '#c0392b', stiplet: true })}
        ${txt(196, 124, 'venter, til A låser op', { anchor: 'start', size: 10, farve: '#c0392b' })}
        ${txt(160, 166, 'Låsen virker kun, hvis ALLE kodestier bruger den', { size: 10, farve: '#a3123f' })}`),
      tekst: 'En mutex er en aftale mellem tråde, ikke et hegn om dataene.',
    },
    hvorfor: 'Derfor er reglen: lås omkring alle steder, der rører den samme variabel, også den lille if-sætning du glemte.',
  },

  // ================= Deadlock =================
  't05-k1': {
    analogi: 'To personer skal bruge både saks og lim. Den ene tager saksen, den anden tager limen. Nu venter begge på den anden, og ingen af dem giver slip. De kan stå der for evigt.',
    figur: {
      titel: 'Deadlock er en cirkel',
      svg: svg(190, `
        ${box(20, 30, 110, 44, 'Proces A', { fill: '#ffe9f1', stroke: '#f7b8d0' })}
        ${box(190, 30, 110, 44, 'Proces B', { fill: '#eef1ff', stroke: '#c5cdf7' })}
        ${box(20, 120, 110, 40, 'Saks', { fill: '#fff', size: 11 })}
        ${box(190, 120, 110, 40, 'Lim', { fill: '#fff', size: 11 })}
        ${pil(70, 118, 70, 78, { farve: '#11998E' })}
        ${txt(52, 100, 'har', { anchor: 'end', size: 10, farve: '#11998E' })}
        ${pil(245, 118, 245, 78, { farve: '#11998E' })}
        ${txt(266, 100, 'har', { anchor: 'start', size: 10, farve: '#11998E' })}
        ${pil(130, 52, 186, 130, { farve: '#c0392b', stiplet: true })}
        ${pil(190, 60, 132, 138, { farve: '#c0392b', stiplet: true })}
        ${txt(160, 180, 'Rød stiplet = venter på. Cirkel = deadlock', { size: 10, farve: '#c0392b' })}`),
      tekst: 'Tegn hvem der HAR hvad, og hvem der VENTER på hvad. Er der en cirkel, står programmet stille.',
    },
    hvordan: [
      'Alle fire skal gælde samtidig: gensidig udelukkelse, hold-og-vent, ingen fratagelse og cirkulær venten.',
      'Bryd bare én af dem, og deadlock kan ikke ske.',
      'Den nemmeste at bryde: tag altid låsene i den samme rækkefølge (fx altid saks før lim).',
    ],
    hvorfor: 'I en eksamen er »tegn ressourcegrafen og find cyklussen« det hurtigste svar, du kan give.',
  },

  // ================= Fil-I/O =================
  't06-k2': {
    analogi: 'Blocking er at stå i kø ved kassen: du laver ingenting, men du mister heller ikke din plads. Non-blocking er at spørge »er det min tur?« hvert tiende sekund og lave noget andet imens – men du bruger energi på at spørge.',
    figur: {
      titel: 'Blocking, non-blocking og poll()',
      svg: svg(210, `
        ${txt(160, 12, 'BLOCKING: tråden sover, CPU er fri', { farve: '#3b3f9e', size: 11 })}
        ${box(20, 24, 170, 24, 'read() … zzz …', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${box(192, 24, 108, 24, 'data!', { fill: '#e8faf1', stroke: '#b6e8cd', size: 11 })}
        ${txt(160, 68, 'NON-BLOCKING: spørger igen og igen', { farve: '#a3123f', size: 11 })}
        ${box(20, 80, 52, 24, 'EAGAIN', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(76, 80, 52, 24, 'EAGAIN', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(132, 80, 52, 24, 'EAGAIN', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(188, 80, 52, 24, 'EAGAIN', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(244, 80, 56, 24, 'data!', { fill: '#e8faf1', stroke: '#b6e8cd', size: 10 })}
        ${txt(160, 118, 'CPU brændt af på at spørge', { size: 10, farve: '#c0392b' })}
        ${txt(160, 142, 'POLL: sov på ti ting på én gang', { farve: '#11998E', size: 11 })}
        ${box(20, 154, 80, 24, 'fd 3', { fill: '#fff', size: 10 })}
        ${box(104, 154, 80, 24, 'fd 4', { fill: '#fff', size: 10 })}
        ${box(188, 154, 80, 24, 'fd 5', { fill: '#fff', size: 10 })}
        ${txt(160, 194, 'poll() vækker dig, når EN af dem er klar', { size: 10 })}`),
      tekst: 'Samme mål, tre måder at vente på. Kun poll() både sparer CPU og kan vente på flere ting.',
    },
    hvorfor: 'Det er svaret på »hvordan læser jeg fra tastatur og sensor samtidig uden at bruge 100 % CPU?«',
  },

  // ================= Køer =================
  't07-k1': {
    analogi: 'En bager laver boller hurtigere, end kunderne kan spise dem. Uden en hylde til at lægge dem på, må bageren stoppe hver gang. Køen er hylden: den jævner forskellen i tempo ud.',
    figur: {
      titel: 'Producer, kø, consumer',
      svg: svg(170, `
        ${box(10, 44, 78, 48, 'Producer', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 11 })}
        ${pil(90, 68, 106, 68)}
        ${box(108, 40, 104, 56, '', { fill: BG })}
        ${box(116, 52, 26, 32, '', { fill: '#fff', r: 5 })}
        ${box(146, 52, 26, 32, '', { fill: '#fff', r: 5 })}
        ${box(176, 52, 26, 32, '', { fill: '#fff', r: 5 })}
        ${txt(160, 110, 'kø med plads til N', { size: 10 })}
        ${pil(214, 68, 230, 68)}
        ${box(232, 44, 78, 48, 'Consumer', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${txt(160, 20, 'Hurtig                                    Langsom', { size: 10 })}
        ${txt(160, 136, 'Kø fuld → producer venter', { size: 10, farve: '#a3123f' })}
        ${txt(160, 154, 'Kø tom → consumer venter', { size: 10, farve: '#3b3f9e' })}`),
      tekst: 'Køen gør, at de to sider ikke skal køre i samme tempo. De skal bare i gennemsnit følges ad.',
    },
    hvorfor: 'Er producer i gennemsnit hurtigere end consumer, hjælper ingen kø: den bliver bare ved med at være fuld.',
  },

  // ================= Hukommelse =================
  't09-k1': {
    analogi: 'Alle huse på vejen har nummer 1 hos sig selv, men postbuddet kender de rigtige adresser. Dit program siger »adresse 0«, og en tabel oversætter det til, hvor det i virkeligheden ligger i RAM.',
    figur: {
      titel: 'Virtuel adresse → fysisk adresse',
      svg: svg(190, `
        ${box(10, 26, 92, 130, '', { fill: '#ffe9f1', stroke: '#f7b8d0' })}
        ${txt(56, 16, 'Dit program ser', { size: 10 })}
        ${txt(56, 46, 'side 0', { farve: INK, size: 11 })}
        ${txt(56, 76, 'side 1', { farve: INK, size: 11 })}
        ${txt(56, 106, 'side 2', { farve: INK, size: 11 })}
        ${txt(56, 136, 'side 3', { farve: INK, size: 11 })}
        ${box(118, 56, 84, 70, 'Sidetabel', { fill: '#fff', size: 11 })}
        ${pil(104, 76, 116, 88)}
        ${pil(204, 88, 216, 60, { farve: '#11998E' })}
        ${box(218, 26, 92, 130, '', { fill: '#e8faf1', stroke: '#b6e8cd' })}
        ${txt(264, 16, 'RAM i virkeligheden', { size: 10 })}
        ${txt(264, 46, 'ramme 7', { farve: INK, size: 11 })}
        ${txt(264, 76, 'ramme 2', { farve: INK, size: 11 })}
        ${txt(264, 106, 'på disk', { farve: MUTED, size: 11 })}
        ${txt(264, 136, 'ramme 9', { farve: INK, size: 11 })}
        ${txt(160, 176, 'Siderne behøver ikke ligge i rækkefølge – eller i RAM', { size: 10 })}`),
      tekst: 'Programmet ser en pæn, sammenhængende række. Virkeligheden er spredt ud, og noget ligger måske på disken.',
    },
    hvordan: [
      'Programmet bruger en virtuel adresse.',
      'MMU\'en (hardware) slår op i sidetabellen.',
      'Er siden i RAM, får du den fysiske adresse med det samme.',
      'Er den ikke, sker der en page fault: kernen henter siden fra disken.',
    ],
    hvorfor: 'Det er derfor to programmer begge kan »bruge adresse 0« uden at ødelægge noget for hinanden.',
  },

  't09-k5': {
    analogi: 'Polling er at åbne hoveddøren hvert tiende sekund for at se, om gæsten er kommet. Interrupt er en dørklokke: du laver noget andet, og gæsten ringer selv på.',
    figur: {
      titel: 'Polling mod interrupt',
      svg: svg(190, `
        ${txt(160, 12, 'POLLING', { farve: '#a3123f', size: 11 })}
        ${box(14, 24, 44, 24, 'tjek', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(62, 24, 44, 24, 'tjek', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(110, 24, 44, 24, 'tjek', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(158, 24, 44, 24, 'tjek', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(206, 24, 44, 24, 'tjek', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 10 })}
        ${box(254, 24, 52, 24, 'data!', { fill: '#e8faf1', stroke: '#b6e8cd', size: 10 })}
        ${txt(160, 62, 'CPU bruges på at spørge, også når der intet er', { size: 10 })}
        ${txt(160, 94, 'INTERRUPT', { farve: '#11998E', size: 11 })}
        ${box(14, 106, 236, 24, 'CPU laver noget helt andet', { fill: '#eef1ff', stroke: '#c5cdf7', size: 11 })}
        ${box(254, 106, 52, 24, '🔔', { fill: '#e8faf1', stroke: '#b6e8cd', size: 14 })}
        ${pil(280, 132, 280, 148, { farve: '#11998E' })}
        ${txt(160, 160, 'Enheden ringer på, når den er klar', { size: 10, farve: '#11998E' })}
        ${txt(160, 180, 'Handleren skal være kort: gem data, væk tråden, færdig', { size: 10 })}`),
      tekst: 'Interrupt koster kun tid, når der faktisk sker noget. Polling koster hele tiden.',
    },
    hvorfor: 'Derfor bruger rigtige drivere interrupt og lader en sovende tråd blive vækket i stedet for at brænde CPU af.',
  },

  // ================= C++ / RAII =================
  't10-k1': {
    analogi: 'RAII er som at leje en cykel med et depositum, der automatisk betales tilbage, når du forlader butikken – også hvis du løber skrigende ud, fordi der er brand. Med new/delete skal du selv huske at aflevere cyklen på vej ud.',
    figur: {
      titel: 'Hvad der sker, når der kastes en exception',
      svg: svg(200, `
        ${txt(80, 14, 'new / delete', { farve: '#a3123f', size: 11 })}
        ${box(14, 26, 132, 24, 'p = new Data()', { fill: '#fff', size: 10 })}
        ${box(14, 54, 132, 24, 'noget går galt', { fill: '#ffe0e0', stroke: '#f5b5b5', size: 10 })}
        ${box(14, 82, 132, 24, 'delete p;', { fill: '#f1f1f1', stroke: LINE, farve: '#b0b0b0', size: 10 })}
        ${txt(80, 122, 'Hoppes over!', { farve: '#c0392b', size: 11 })}
        ${txt(80, 140, 'Hukommelsen', { farve: '#c0392b', size: 11 })}
        ${txt(80, 156, 'er lækket', { farve: '#c0392b', size: 11 })}
        ${txt(240, 14, 'RAII', { farve: '#11998E', size: 11 })}
        ${box(174, 26, 132, 24, 'Data d;  (på stakken)', { fill: '#fff', size: 10 })}
        ${box(174, 54, 132, 24, 'noget går galt', { fill: '#ffe0e0', stroke: '#f5b5b5', size: 10 })}
        ${box(174, 82, 132, 24, '~Data() kører', { fill: '#e8faf1', stroke: '#b6e8cd', size: 10 })}
        ${txt(240, 122, 'Destruktoren kører', { farve: '#11998E', size: 11 })}
        ${txt(240, 140, 'ALTID, når scope', { farve: '#11998E', size: 11 })}
        ${txt(240, 156, 'forlades', { farve: '#11998E', size: 11 })}
        ${txt(160, 188, 'Samme princip for filer, låse og sockets', { size: 10 })}`),
      tekst: 'Stack unwinding: på vej ud af en exception kører C++ destruktoren på alt, der lå på stakken.',
    },
    hvorfor: 'Det er derfor svaret på »hvordan undgår man memory leaks i C++?« er: lad være med at skrive delete selv.',
  },

  // ================= Build =================
  't12-k2': {
    analogi: 'Make er en doven håndværker med et ur. Han kigger på, hvornår hver ting sidst blev lavet. Er tegningen nyere end møblet, laver han møblet om. Ellers holder han fri.',
    figur: {
      titel: 'Make sammenligner tidsstempler',
      svg: svg(190, `
        ${box(12, 18, 86, 34, 'main.c', { fill: '#fff', size: 11 })}
        ${txt(55, 62, '10:05', { farve: '#c0392b', size: 10 })}
        ${box(118, 18, 86, 34, 'util.c', { fill: '#fff', size: 11 })}
        ${txt(161, 62, '09:00', { size: 10 })}
        ${pil(55, 76, 55, 94)}
        ${pil(161, 76, 161, 94)}
        ${box(12, 96, 86, 32, 'main.o', { fill: '#ffe9f1', stroke: '#f7b8d0', size: 11 })}
        ${txt(55, 138, '09:30 – for gammel!', { farve: '#c0392b', size: 10, anchor: 'start' })}
        ${box(118, 96, 86, 32, 'util.o', { fill: BG, size: 11 })}
        ${pil(98, 112, 116, 112, { farve: '#ccc' })}
        ${box(226, 96, 80, 32, 'program', { fill: BG, size: 11 })}
        ${pil(206, 112, 222, 112)}
        ${txt(160, 170, 'Kun main.o og programmet bygges om', { size: 11, farve: '#a3123f' })}`),
      tekst: 'Reglen er: er målet ældre end noget, det afhænger af, skal målet laves om.',
    },
    hvorfor: 'Derfor giver en glemt header i afhængighederne de klassiske fejl, hvor »den bruger en gammel version af min kode«.',
  },

  // ================= AlgoDat =================
  'algodat-a1': {
    analogi: 'To måder at finde et navn i telefonbogen: bladre fra side ét (langsomt, men virker på en lille bog), eller slå op på midten igen og igen. For ti navne er der ingen forskel. For ti millioner er der al forskel.',
    figur: {
      titel: 'Hvordan arbejdet vokser med n',
      svg: svg(200, `
        <line x1="40" y1="160" x2="300" y2="160" stroke="${LINE}" stroke-width="1.5"/>
        <line x1="40" y1="160" x2="40" y2="20" stroke="${LINE}" stroke-width="1.5"/>
        ${txt(22, 90, 'tid', { size: 10 })}
        ${txt(170, 182, 'n (antal data)', { size: 10 })}
        <path d="M40,158 C120,150 200,120 300,30" fill="none" stroke="#E1306C" stroke-width="2.5"/>
        <path d="M40,158 C120,140 220,128 300,118" fill="none" stroke="#5851DB" stroke-width="2.5"/>
        <path d="M40,158 L300,150" fill="none" stroke="#11998E" stroke-width="2.5"/>
        ${txt(292, 22, 'O(n²)', { farve: '#E1306C', anchor: 'end', size: 11 })}
        ${txt(292, 110, 'O(n log n)', { farve: '#5851DB', anchor: 'end', size: 11 })}
        ${txt(292, 140, 'O(log n)', { farve: '#11998E', anchor: 'end', size: 11 })}`),
      tekst: 'Kurverne siger intet om små n. De siger, hvad der sker, når n bliver stor.',
    },
    hvorfor: 'Derfor kan en »langsom« O(n²) sagtens være det rigtige valg til 20 elementer – og en katastrofe til 20.000.',
  },

  'traeer-k1': {
    analogi: 'Et søgetræ er et spørgeskema: større eller mindre? Hvert spørgsmål halverer bunken. Men hvis du indsætter tallene i sorteret rækkefølge, bliver træet til en lang snor, og så stiller du ét spørgsmål pr. element.',
    figur: {
      titel: 'Balanceret træ mod snor',
      svg: svg(200, `
        ${txt(80, 12, 'Balanceret: O(log n)', { farve: '#11998E', size: 11 })}
        ${box(58, 24, 44, 24, '8', { fill: '#e8faf1', stroke: '#b6e8cd', r: 12 })}
        ${box(20, 66, 40, 24, '4', { fill: '#fff', r: 12 })}
        ${box(100, 66, 40, 24, '12', { fill: '#fff', r: 12 })}
        <line x1="70" y1="50" x2="46" y2="64" stroke="${LINE}" stroke-width="2"/>
        <line x1="90" y1="50" x2="114" y2="64" stroke="${LINE}" stroke-width="2"/>
        ${box(6, 108, 32, 22, '2', { fill: '#fff', r: 11, size: 10 })}
        ${box(44, 108, 32, 22, '6', { fill: '#fff', r: 11, size: 10 })}
        ${box(84, 108, 32, 22, '10', { fill: '#fff', r: 11, size: 10 })}
        ${box(122, 108, 32, 22, '14', { fill: '#fff', r: 11, size: 10 })}
        <line x1="32" y1="92" x2="24" y2="106" stroke="${LINE}" stroke-width="2"/>
        <line x1="48" y1="92" x2="58" y2="106" stroke="${LINE}" stroke-width="2"/>
        <line x1="112" y1="92" x2="102" y2="106" stroke="${LINE}" stroke-width="2"/>
        <line x1="128" y1="92" x2="136" y2="106" stroke="${LINE}" stroke-width="2"/>
        ${txt(80, 150, 'Højde 3 til 7 tal', { size: 10 })}
        ${txt(240, 12, 'Sorteret input: O(n)', { farve: '#c0392b', size: 11 })}
        ${box(180, 24, 36, 22, '2', { fill: '#ffe9f1', stroke: '#f7b8d0', r: 11, size: 10 })}
        ${box(202, 50, 36, 22, '4', { fill: '#ffe9f1', stroke: '#f7b8d0', r: 11, size: 10 })}
        ${box(224, 76, 36, 22, '6', { fill: '#ffe9f1', stroke: '#f7b8d0', r: 11, size: 10 })}
        ${box(246, 102, 36, 22, '8', { fill: '#ffe9f1', stroke: '#f7b8d0', r: 11, size: 10 })}
        ${box(268, 128, 36, 22, '10', { fill: '#ffe9f1', stroke: '#f7b8d0', r: 11, size: 10 })}
        ${txt(240, 170, 'Det er bare en linked list', { size: 10, farve: '#c0392b' })}`),
      tekst: 'Samme kode, samme data – kun rækkefølgen af indsættelser er forskellig.',
    },
    hvorfor: 'Derfor findes AVL- og rød-sorte træer: de retter træet op undervejs, så snoren aldrig opstår.',
  },

  'grafer-k2': {
    analogi: 'BFS er en dråbe i vandet: ringene breder sig jævnt ud til alt, der er ét skridt væk, så to skridt væk. DFS er en person i en labyrint, der altid går fremad, til vejen stopper, og så går tilbage til sidste sidevej.',
    figur: {
      titel: 'BFS i ringe, DFS i dybden',
      svg: svg(190, `
        ${txt(80, 12, 'BFS (kø)', { farve: '#3b3f9e', size: 11 })}
        <circle cx="80" cy="60" r="34" fill="none" stroke="#c5cdf7" stroke-width="1.5" stroke-dasharray="4 4"/>
        <circle cx="80" cy="60" r="56" fill="none" stroke="#c5cdf7" stroke-width="1.5" stroke-dasharray="4 4"/>
        ${box(66, 48, 28, 24, 'A', { fill: '#eef1ff', stroke: '#c5cdf7', r: 12, size: 11 })}
        ${box(28, 40, 26, 22, 'B', { fill: '#fff', r: 11, size: 10 })}
        ${box(104, 38, 26, 22, 'C', { fill: '#fff', r: 11, size: 10 })}
        ${box(64, 96, 26, 22, 'D', { fill: '#fff', r: 11, size: 10 })}
        ${box(18, 106, 26, 22, 'E', { fill: '#fff', r: 11, size: 10 })}
        ${txt(80, 150, 'Alle naboer først', { size: 10 })}
        ${txt(80, 168, 'Giver korteste vej i skridt', { size: 10, farve: '#3b3f9e' })}
        ${txt(240, 12, 'DFS (stak)', { farve: '#a3123f', size: 11 })}
        ${box(226, 30, 28, 24, 'A', { fill: '#ffe9f1', stroke: '#f7b8d0', r: 12, size: 11 })}
        ${box(200, 62, 26, 22, 'B', { fill: '#fff', r: 11, size: 10 })}
        ${box(186, 96, 26, 22, 'D', { fill: '#fff', r: 11, size: 10 })}
        ${box(258, 62, 26, 22, 'C', { fill: '#fff', r: 11, size: 10 })}
        ${pil(234, 56, 218, 60, { farve: '#E1306C' })}
        ${pil(208, 86, 202, 94, { farve: '#E1306C' })}
        ${pil(250, 56, 266, 60, { farve: '#E1306C', stiplet: true })}
        ${txt(240, 150, 'Helt i bund, så tilbage', { size: 10 })}
        ${txt(240, 168, 'Bruges til cykler og topologisk sort', { size: 10, farve: '#a3123f' })}`),
      tekst: 'Forskellen er kun én ting: om du tager fra en kø (først ind, først ud) eller en stak (sidst ind, først ud).',
    },
    hvorfor: 'BFS finder færrest skridt. DFS finder cykler og rækkefølger. Vælg efter, hvad du skal bruge.',
  },

  'dp-k2': {
    analogi: 'Du regner 7+5 i hovedet. Hvis nogen spørger igen ti sekunder senere, regner du det så forfra? Memoisering er at skrive svaret på en seddel, første gang du regner det.',
    figur: {
      titel: 'Fibonacci uden og med memo',
      svg: svg(200, `
        ${txt(80, 12, 'Naiv rekursion', { farve: '#c0392b', size: 11 })}
        ${box(60, 24, 40, 22, 'f(5)', { fill: '#fff', r: 11, size: 10 })}
        ${box(24, 56, 40, 22, 'f(4)', { fill: '#fff', r: 11, size: 10 })}
        ${box(96, 56, 40, 22, 'f(3)', { fill: '#ffe0e0', stroke: '#f5b5b5', r: 11, size: 10 })}
        ${box(4, 90, 36, 22, 'f(3)', { fill: '#ffe0e0', stroke: '#f5b5b5', r: 11, size: 10 })}
        ${box(46, 90, 36, 22, 'f(2)', { fill: '#ffe0e0', stroke: '#f5b5b5', r: 11, size: 10 })}
        ${box(92, 90, 36, 22, 'f(2)', { fill: '#ffe0e0', stroke: '#f5b5b5', r: 11, size: 10 })}
        ${box(134, 90, 36, 22, 'f(1)', { fill: '#fff', r: 11, size: 10 })}
        <line x1="72" y1="48" x2="52" y2="54" stroke="${LINE}" stroke-width="1.5"/>
        <line x1="90" y1="48" x2="110" y2="54" stroke="${LINE}" stroke-width="1.5"/>
        <line x1="36" y1="80" x2="26" y2="88" stroke="${LINE}" stroke-width="1.5"/>
        <line x1="52" y1="80" x2="62" y2="88" stroke="${LINE}" stroke-width="1.5"/>
        <line x1="108" y1="80" x2="104" y2="88" stroke="${LINE}" stroke-width="1.5"/>
        <line x1="124" y1="80" x2="148" y2="88" stroke="${LINE}" stroke-width="1.5"/>
        ${txt(80, 132, 'Rød = regnet før', { farve: '#c0392b', size: 10 })}
        ${txt(80, 150, 'Træet fordobles: O(2ⁿ)', { size: 10 })}
        ${txt(240, 12, 'Med memo', { farve: '#11998E', size: 11 })}
        ${box(186, 30, 108, 22, 'f(1) = 1', { fill: '#e8faf1', stroke: '#b6e8cd', size: 10 })}
        ${box(186, 56, 108, 22, 'f(2) = 1', { fill: '#e8faf1', stroke: '#b6e8cd', size: 10 })}
        ${box(186, 82, 108, 22, 'f(3) = 2', { fill: '#e8faf1', stroke: '#b6e8cd', size: 10 })}
        ${box(186, 108, 108, 22, 'f(4) = 3', { fill: '#e8faf1', stroke: '#b6e8cd', size: 10 })}
        ${txt(240, 150, 'Hvert tal regnes én gang: O(n)', { size: 10, farve: '#11998E' })}
        ${txt(160, 186, 'Samme svar. 46.000 udregninger blev til 5.', { size: 11, farve: INK })}`),
      tekst: 'Overlappende delproblemer betyder, at det samme spørgsmål stilles igen og igen. Gem svaret.',
    },
    hvordan: [
      'Skriv den naive rekursive løsning først.',
      'Se efter, om de samme argumenter går igen (overlappende delproblemer).',
      'Læg et map eller array ind: har jeg regnet det før, så returnér svaret.',
      'Vend eventuelt til en løkke nedefra og op, så du undgår dyb rekursion.',
    ],
    hvorfor: 'Det er hele forskellen mellem en løsning, der tager 40 sekunder, og en, der tager 40 mikrosekunder.',
  },
};
