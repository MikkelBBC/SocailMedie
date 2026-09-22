// Genererer public/sw.js med en præcis liste over appens filer og en version,
// der er et hash af deres indhold: node tools/sw.mjs
//
// Listen genereres frem for at skrives i hånden, fordi den ellers stille bliver
// forkert, næste gang der kommer et fag til – og en service worker, der cacher en
// forældet liste, er værre end ingen.
//
// Kør med --tjek for kun at kontrollere, at den er opdateret (bruges i CI).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const rod = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(rod, 'public');

// Videoerne fylder 10 MB og hentes først, når man ser dem. De cachees i stedet
// under kørslen, så en video, man har set én gang, også virker offline.
const UDELAD = new Set(['sw.js', 'video']);
const ENDELSER = ['.html', '.css', '.js', '.png', '.webmanifest', '.json'];

function filer(dir = pub) {
  const ud = [];
  for (const navn of readdirSync(dir)) {
    const sti = join(dir, navn);
    if (UDELAD.has(relative(pub, sti).split(/[\\/]/)[0]) || UDELAD.has(navn)) continue;
    if (statSync(sti).isDirectory()) ud.push(...filer(sti));
    else if (ENDELSER.some((e) => navn.endsWith(e))) ud.push(sti);
  }
  return ud;
}

const liste = filer().sort();
const hash = createHash('sha256');
for (const f of liste) hash.update(readFileSync(f));
const version = hash.digest('hex').slice(0, 12);

const stier = liste.map((f) => './' + relative(pub, f).replace(/\\/g, '/'));

const sw = `// GENERERET AF tools/sw.mjs – rediger ikke i hånden.
//
// Appen skal virke i bussen. Alt, der ikke er en video, ligger i en precache,
// der udskiftes under ét, når indholdet ændrer sig: versionen nedenfor er et
// hash af filernes indhold, så en ny udgivelse altid giver et nyt cache-navn.

const VERSION = '${version}';
const SKAL = \`leths-\${VERSION}\`;         // appens filer, udskiftes samlet
const MEDIE = 'leths-medie-v1';            // videoer, hentet efterhånden
const EKSTERN = 'leths-ekstern-v1';        // skrifttyper

const FILER = ${JSON.stringify(stier, null, 2).replace(/\n/g, '\n')};

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(SKAL);
    // addAll fejler samlet, hvis bare én fil mangler. Derfor én ad gangen,
    // så en enkelt omdøbt fil ikke forhindrer hele installationen.
    await Promise.all(FILER.map((f) => c.add(f).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const navne = await caches.keys();
    await Promise.all(navne
      .filter((n) => n.startsWith('leths-') && n !== SKAL && n !== MEDIE && n !== EKSTERN)
      .map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

// Henter fra nettet og lægger i cache, men svarer med det cachede, hvis nettet svigter.
async function netMedFallback(req, cacheNavn) {
  const cache = await caches.open(cacheNavn);
  try {
    const svar = await fetch(req);
    if (svar.ok) cache.put(req, svar.clone());
    return svar;
  } catch (e) {
    const gemt = await cache.match(req);
    if (gemt) return gemt;
    throw e;
  }
}

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Sider: vis den cachede forside, hvis nettet er væk.
  if (request.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        return (await caches.match('./index.html')) ?? Response.error();
      }
    })());
    return;
  }

  // Videoer: gem den, man har set, så den også virker offline.
  if (url.pathname.includes('/video/')) {
    e.respondWith(netMedFallback(request, MEDIE));
    return;
  }

  // Skrifttyper fra Google.
  if (url.origin !== self.location.origin) {
    e.respondWith(netMedFallback(request, EKSTERN));
    return;
  }

  // Appens egne filer: cache først. De er versionerede, så de kan ikke blive forældede.
  e.respondWith((async () => {
    const gemt = await caches.match(request, { ignoreSearch: true });
    if (gemt) return gemt;
    return netMedFallback(request, SKAL);
  })());
});
`;

const maal = join(pub, 'sw.js');
if (process.argv.includes('--tjek')) {
  let nuv = '';
  try { nuv = readFileSync(maal, 'utf8'); } catch {}
  if (nuv !== sw) {
    console.error('✗ public/sw.js er ikke opdateret. Kør: node tools/sw.mjs');
    process.exit(1);
  }
  console.log(`✓ public/sw.js er opdateret (${stier.length} filer, version ${version})`);
} else {
  writeFileSync(maal, sw, 'utf8');
  console.log(`✓ public/sw.js · ${stier.length} filer · version ${version}`);
}
