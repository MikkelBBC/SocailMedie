// Laver skabelonen til et nyt fag eller et nyt spor, og skriver de linjer ud,
// der skal ind i public/data/index.js.
//
//   node tools/nyt-fag.mjs db/normalisering "Normalisering" 🧩
//   node tools/nyt-fag.mjs kvante/basis "Kvantecomputere" ⚛️ --fag kvante --fagnavn "Kvante"
//
// Første argument er stien under public/data/ uden .js. Mappen bliver oprettet.
// Er mappen et nyt fag, printes også den FAG-linje, du skal indsætte.
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import pack from '../public/data/index.js';

const rod = join(dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const flag = (navn, fald = null) => {
  const i = args.indexOf(`--${navn}`);
  return i >= 0 ? args[i + 1] : fald;
};
const frie = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
const [sti, titel, emoji = '📘'] = frie;

if (!sti || !titel) {
  console.log(`Brug: node tools/nyt-fag.mjs <mappe/fil> "<Titel>" <emoji> [--fag <id>] [--fagnavn "<Navn>"] [--kort <navn>]

Eksempel:
  node tools/nyt-fag.mjs db/normalisering "Normalisering fra 1NF til 3NF" 🧩
  node tools/nyt-fag.mjs netvaerk/tcp "TCP og UDP" 🔌 --fag netvaerk --fagnavn "Netværk"`);
  process.exit(1);
}

const sporId = basename(sti);
const fagId = flag('fag', dirname(sti) === '.' ? sporId : dirname(sti));
const fagNavn = flag('fagnavn', fagId[0].toUpperCase() + fagId.slice(1));
const kortNavn = flag('kort', titel.split(/[\s,]+/)[0]);

// Tjek for sammenstød, før der skrives noget.
if (pack.spor.some((s) => s.id === sporId)) {
  console.error(`✗ Sporet »${sporId}« findes allerede. Vælg et andet filnavn.`);
  process.exit(1);
}
const fagFindes = pack.pakker.some((p) => p.id === fagId);
const nrIFag = pack.spor.filter((s) => s.pakke === fagId).length;

// En pæn gradient, der ikke ligner de andre faggradienter for meget.
const PALET = [
  ['#2563EB', '#38BDF8'], ['#7C3AED', '#F472B6'], ['#F05133', '#FCAF45'],
  ['#0F766E', '#5EEAD4'], ['#DB2777', '#FB7185'], ['#65A30D', '#BEF264'],
  ['#EA580C', '#FDBA74'], ['#4338CA', '#A5B4FC'],
];
const [a, b] = PALET[pack.spor.length % PALET.length];

const filsti = join(rod, 'public/data', `${sti}.js`);
try {
  await access(filsti);
  console.error(`✗ ${sti}.js findes allerede.`);
  process.exit(1);
} catch {}

const skabelon = `// ${titel}
import { box, txt, pil, svg, INK, LINE, BG } from '${'../'.repeat(sti.split('/').length - 1) || './'}forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const GUL = { fill: '#fff8e1', stroke: '#f0d68a' };
const HVID = { fill: '#fff', stroke: LINE };
const ROED = '#c0392b';

export default {
  spor: {
    id: '${sporId}', nr: ${nrIFag}, titel: '${titel.replace(/'/g, "\\'")}', kort: '${kortNavn.replace(/'/g, "\\'")}', emoji: '${emoji}',
    farve: '${a}', gradient: 'linear-gradient(135deg, ${a} 0%, ${b} 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      // Hook: én sætning, der vender en forventning på hovedet. Maks. ca. 15 ord.
      hook: '',
      // Body: maks. 260 ord. Brug **fed** til begreber, \` til kode og • til punkter.
      body: '',
      // Analogi: noget fra hverdagen, der rammer præcis den ene mekanisme.
      analogi: '',
      // Figur er valgfri. Koordinatsystemet er 320 bredt; højden angives i svg(h, ...).
      // figur: {
      //   titel: '',
      //   svg: svg(180, \`
      //     \${box(14, 20, 130, 30, 'Før', { ...ROSA, size: 11 })}
      //     \${pil(150, 35, 176, 35)}
      //     \${box(180, 20, 130, 30, 'Efter', { ...GROEN, size: 11 })}
      //     \${txt(160, 90, 'Pointen på én linje', { size: 10 })}\`),
      //   tekst: '',
      // },
      // hvorfor: 'Hvad det forklarer, som man ellers undrer sig over.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: '',
      // Alle fire svar skal være nogenlunde lige lange og lige plausible.
      // Lad ikke det rigtige svar stå på samme plads hver gang.
      svar: ['', '', '', ''],
      rigtigt: 0,
      forklaring: '',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k1',
      pastand: '',
      rigtigt: 0, // 0 = myte, 1 = fakta
      forklaring: '',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k1',
      sporgsmal: 'Forklar …',
      punkter: [
        { tekst: '', ord: ['', ''] },
      ],
    },
  ],
};
`;

await mkdir(dirname(filsti), { recursive: true });
await writeFile(filsti, skabelon, 'utf8');

const variabel = sporId.replace(/[^a-zA-Z0-9]/g, '');
console.log(`✓ Skrev public/data/${sti}.js\n`);
console.log('Indsæt i public/data/index.js:\n');
console.log(`  1. blandt importerne øverst:`);
console.log(`     import ${variabel} from './${sti}.js';\n`);
if (fagFindes) {
  console.log(`  2. i FAG-tabellen, i moduler-listen for '${fagId}':`);
  console.log(`     … moduler: [… , ${variabel}] …\n`);
} else {
  console.log(`  2. som en ny linje i FAG-tabellen:`);
  console.log(`     { id: '${fagId}', navn: '${fagNavn}', emoji: '${emoji}', gradient: 'linear-gradient(135deg, ${a}, ${b} 60%, ${b})', farve: '${a}', moduler: [${variabel}] },\n`);
}
console.log('Derefter: node tools/valider.mjs');
