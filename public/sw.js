// GENERERET AF tools/sw.mjs – rediger ikke i hånden.
//
// Appen skal virke i bussen. Alt, der ikke er en video, ligger i en precache,
// der udskiftes under ét, når indholdet ændrer sig: versionen nedenfor er et
// hash af filernes indhold, så en ny udgivelse altid giver et nyt cache-navn.

const VERSION = 'dea184d51048';
const SKAL = `leths-${VERSION}`;         // appens filer, udskiftes samlet
const MEDIE = 'leths-medie-v1';            // videoer, hentet efterhånden
const EKSTERN = 'leths-ekstern-v1';        // skrifttyper

const FILER = [
  "./data/ai/brug.js",
  "./data/ai/laering.js",
  "./data/ai/sprogmodeller.js",
  "./data/arkitektur/design.js",
  "./data/arkitektur/test.js",
  "./data/business/firma.js",
  "./data/business/forretning.js",
  "./data/dao/algodat.js",
  "./data/dao/dp.js",
  "./data/dao/grafer.js",
  "./data/dao/traeer.js",
  "./data/db/relation.js",
  "./data/db/ydelse.js",
  "./data/drift/fejl.js",
  "./data/drift/skalering.js",
  "./data/ekstra/algodat-biases-sysprog.json",
  "./data/filosofi/eksistens.js",
  "./data/filosofi/ragekniv.js",
  "./data/filosofi/stoicisme.js",
  "./data/forklaringer-menneske.js",
  "./data/forklaringer-mere.js",
  "./data/forklaringer-tek.js",
  "./data/forklaringer.js",
  "./data/index.js",
  "./data/invest/basis.js",
  "./data/invest/danskskat.js",
  "./data/psykiatri/angst.js",
  "./data/psykiatri/diagnoser.js",
  "./data/psykiatri/psykose.js",
  "./data/psykologi/afhaengighed.js",
  "./data/psykologi/biases.js",
  "./data/psykologi/hukommelse.js",
  "./data/psykologi/social.js",
  "./data/psykologi/stress.js",
  "./data/psykologi/vaner.js",
  "./data/sammenlign.js",
  "./data/sikkerhed/angreb.js",
  "./data/sikkerhed/forsvar.js",
  "./data/sw3sys/index.js",
  "./data/sw3sys/koblinger.js",
  "./data/sw3sys/spoergsmaal.js",
  "./data/sw3sys/t00-basics.js",
  "./data/sw3sys/t01-proces.js",
  "./data/sw3sys/t02-lambda.js",
  "./data/sw3sys/t03-traade.js",
  "./data/sw3sys/t04-sync.js",
  "./data/sw3sys/t05-deadlock.js",
  "./data/sw3sys/t06-fileio.js",
  "./data/sw3sys/t07-queues.js",
  "./data/sw3sys/t08-serial.js",
  "./data/sw3sys/t09-memory.js",
  "./data/sw3sys/t10-raii.js",
  "./data/sw3sys/t11-drivers.js",
  "./data/sw3sys/t12-build.js",
  "./data/tek/internet.js",
  "./data/tek/krypto.js",
  "./data/temaer.js",
  "./data/vaerktoj/fejlfind.js",
  "./data/vaerktoj/git.js",
  "./data/videoer.js",
  "./exam.css",
  "./ikon/ikon-180.png",
  "./ikon/ikon-192.png",
  "./ikon/ikon-512.png",
  "./index.html",
  "./layout.css",
  "./manifest.webmanifest",
  "./play.css",
  "./src/app.js",
  "./src/feed.js",
  "./src/fsrs.js",
  "./src/guide.js",
  "./src/icons.js",
  "./src/milepael.js",
  "./src/missions.js",
  "./src/plan.js",
  "./src/render.js",
  "./src/sfx.js",
  "./src/sidstetjek.js",
  "./src/stats.js",
  "./src/store.js",
  "./styles.css"
];

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
