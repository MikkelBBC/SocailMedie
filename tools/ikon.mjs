// Laver appens ikoner som PNG uden afhængigheder: node tools/ikon.mjs
//
// Motivet er tre kort i en stak på appens gradient – det samme, feedet består af.
// PNG skrives i hånden (IHDR/IDAT/IEND med CRC), fordi projektet ikke har en
// billedafhængighed, og et ikon er for lidt til at indføre en.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rod = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------- Tegning ----------

// Appens gradient, aflæst fra --ig: fra øverste venstre mod nederste højre.
const STOP = [
  [0.00, [252, 175, 69]],
  [0.45, [253, 29, 29]],
  [0.70, [225, 48, 108]],
  [1.00, [131, 58, 180]],
];

function gradient(t) {
  for (let i = 1; i < STOP.length; i++) {
    if (t <= STOP[i][0]) {
      const [t0, c0] = STOP[i - 1];
      const [t1, c1] = STOP[i];
      const f = (t - t0) / (t1 - t0);
      return c0.map((c, j) => Math.round(c + (c1[j] - c) * f));
    }
  }
  return STOP.at(-1)[1];
}

// Afrundet rektangel. Hjørnecentret findes ved at klemme punktet ind i det
// indre rektangel; afstanden dertil afgør, om punktet er indenfor.
const iRundtRekt = (x, y, rx, ry, w, h, r) => {
  if (x < rx || y < ry || x > rx + w || y > ry + h) return false;
  const cx = Math.min(Math.max(x, rx + r), rx + w - r);
  const cy = Math.min(Math.max(y, ry + r), ry + h - r);
  return Math.hypot(x - cx, y - cy) <= r;
};

// Motivet: et studiekort med to tekstlinjer, og to kort, der kigger frem bagved.
const FORM = {
  ikon: { r: 0.235 },
  bag2: { x: 0.28, y: 0.15, w: 0.44, h: 0.10, r: 0.035, hvid: 0.40 },
  bag1: { x: 0.235, y: 0.255, w: 0.53, h: 0.11, r: 0.04, hvid: 0.68 },
  kort: { x: 0.175, y: 0.375, w: 0.65, h: 0.45, r: 0.075, hvid: 1 },
  linje1: { x: 0.255, y: 0.50, w: 0.49, h: 0.055, r: 0.0275 },
  linje2: { x: 0.255, y: 0.605, w: 0.33, h: 0.055, r: 0.0275 },
  prik: { x: 0.255, y: 0.71, w: 0.075, h: 0.075, r: 0.0375 },
};

// Farven i ét punkt, eller null hvis punktet ligger uden for ikonet.
function farve(u, v, N) {
  const x = u * N;
  const y = v * N;
  if (!iRundtRekt(x, y, 0, 0, N, N, FORM.ikon.r * N)) return null;
  let [r, g, b] = gradient(Math.min(1, (u + v) / 2));
  const iForm = (f) => iRundtRekt(x, y, f.x * N, f.y * N, f.w * N, f.h * N, f.r * N);
  const blend = (mod, a) => {
    r = r + (mod[0] - r) * a;
    g = g + (mod[1] - g) * a;
    b = b + (mod[2] - b) * a;
  };
  for (const f of [FORM.bag2, FORM.bag1, FORM.kort]) if (iForm(f)) blend([255, 255, 255], f.hvid);
  // Tekstlinjerne og prikken tegnes i kortets egen gradientfarve, dæmpet ned.
  for (const f of [FORM.linje1, FORM.linje2, FORM.prik]) {
    if (iForm(f)) blend(gradient(Math.min(1, (u + v) / 2)).map((c) => c * 0.82 + 40), 0.82);
  }
  return [r, g, b];
}

// 3x3 supersampling: kanterne bliver bløde uden et grafikbibliotek.
function tegn(N) {
  const px = Buffer.alloc(N * N * 4);
  const S = 3;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < S; sy++) {
        for (let sx = 0; sx < S; sx++) {
          const c = farve((x + (sx + 0.5) / S) / N, (y + (sy + 0.5) / S) / N, N);
          if (!c) continue;
          r += c[0]; g += c[1]; b += c[2]; a++;
        }
      }
      const i = (y * N + x) * 4;
      if (!a) continue;
      px[i] = Math.round(r / a);
      px[i + 1] = Math.round(g / a);
      px[i + 2] = Math.round(b / a);
      px[i + 3] = Math.round((a / (S * S)) * 255);
    }
  }
  return px;
}

// ---------- PNG ----------

const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (const b of buf) c = t[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const krop = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(CRC(krop));
  return Buffer.concat([len, krop, crc]);
}

function png(N, px) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(N, 0);
  ihdr.writeUInt32BE(N, 4);
  ihdr[8] = 8;   // bitdybde
  ihdr[9] = 6;   // RGBA
  // Hver række indledes af en filter-byte; 0 = ingen filtrering.
  const raa = Buffer.alloc(N * (N * 4 + 1));
  for (let y = 0; y < N; y++) {
    raa[y * (N * 4 + 1)] = 0;
    px.copy(raa, y * (N * 4 + 1) + 1, y * N * 4, (y + 1) * N * 4);
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raa, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync(join(rod, 'public/ikon'), { recursive: true });
for (const N of [180, 192, 512]) {
  const fil = join(rod, 'public/ikon', `ikon-${N}.png`);
  writeFileSync(fil, png(N, tegn(N)));
  console.log(`✓ public/ikon/ikon-${N}.png`);
}
