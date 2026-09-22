// Lille server uden afhængigheder: serverer public/ og har pladsen klar
// til API-kald. API-nøglen må ALDRIG ligge i frontend-koden, derfor går
// kald til sprogmodellen gennem her.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

try { process.loadEnvFile(); } catch {}

const PORT = Number(process.env.PORT ?? 3000);
const ROOT = join(import.meta.dirname, 'public');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

const json = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
};

async function handleApi(req, res, path) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return json(res, 501, { error: '✨ Kommer, når API-nøglen er sat op (.env)' });
  }
  // TODO: /api/uddyb    – uddyb et kort i 150-250 ord
  //       /api/spor     – foreslå spor ud fra et frø (prompts/spor-forslag.md)
  //       /api/kort     – generér kort til et valgt spor
  return json(res, 501, { error: `Endpoint ${path} er ikke implementeret endnu` });
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith('/api/')) return handleApi(req, res, url.pathname);

  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '') || 'index.html';
  const file = join(ROOT, rel);
  if (!file.startsWith(ROOT)) return json(res, 403, { error: 'Forbudt' });

  try {
    const data = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(data);
  } catch {
    json(res, 404, { error: 'Ikke fundet' });
  }
}).listen(PORT, () => console.log(`Leths super App kører på http://localhost:${PORT}`));
