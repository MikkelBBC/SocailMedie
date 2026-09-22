// »Sidste tjek«: kan du sige det, censor venter på – uden at kigge?
//
// Hvert emne har en kerne på 5-6 sætninger. Her får du kun emnets navn og skal
// sige dem højt fra hukommelsen, før du ser facit. Det er generate-then-compare:
// forsøget på at hente frem er selve læringen, også når man ikke rammer, og
// sammenligningen bagefter viser præcis, hvad der manglede.
//
// Modulet er rent: det kender ikke appens tilstand, kun de emner, det får ind.

const KLAR = {
  0: { ord: 'Det skal øves', farve: '#c0392b' },
  1: { ord: 'Halvt på plads', farve: '#c9a227' },
  2: { ord: 'Sidder', farve: '#0fae66' },
};

export function niveau(ramt, i_alt) {
  if (!i_alt) return 2;
  const a = ramt / i_alt;
  return a >= 0.8 ? 2 : a >= 0.5 ? 1 : 0;
}

export const niveauTekst = (n) => KLAR[n];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Skærm 1: emnet, uden facit. */
export function husk(emne, nr, i_alt) {
  return `
    <div class="tjek">
      <div class="tjek-top"><small>Sidste tjek · ${nr} af ${i_alt}</small></div>
      <div class="tjek-emne"><span>${emne.emoji}</span><h2>${esc(emne.titel)}</h2></div>
      <p class="tjek-opgave">Sig de <b>${emne.kerne.length}</b> ting højt, en censor venter på i det her emne.</p>
      <p class="tjek-hint">Tag den tid, du skal bruge. At lede efter det er selve øvelsen – også når du ikke finder det.</p>
      <button class="primary wide" data-act="vis">Jeg har sagt dem · vis facit</button>
      <button class="ghost wide" data-act="spring">Spring emnet over</button>
    </div>`;
}

/** Skærm 2: facit, ét punkt ad gangen at markere. */
export function facit(emne, nr, i_alt) {
  return `
    <div class="tjek">
      <div class="tjek-top"><small>Sidste tjek · ${nr} af ${i_alt}</small></div>
      <div class="tjek-emne lille"><span>${emne.emoji}</span><h2>${esc(emne.titel)}</h2></div>
      <p class="tjek-opgave">Tryk på dem, du fik sagt.</p>
      <ul class="tjek-liste">
        ${emne.kerne.map((k, i) => `<li><button data-i="${i}"><i></i><span>${esc(k)}</span></button></li>`).join('')}
      </ul>
      <button class="primary wide" data-act="naeste">Videre ›</button>
    </div>`;
}

/** Skærm 3: opgørelsen. */
export function resultat(raekker, xp) {
  const ramt = raekker.reduce((a, r) => a + r.ramt, 0);
  const i_alt = raekker.reduce((a, r) => a + r.i_alt, 0);
  const svage = raekker.filter((r) => niveau(r.ramt, r.i_alt) < 2).sort((a, b) => a.ramt / a.i_alt - b.ramt / b.i_alt);

  return `
    <div class="tjek">
      <div class="tjek-top"><small>Sidste tjek · resultat</small></div>
      <div class="tjek-score"><b>${ramt}</b><span>af ${i_alt} punkter</span></div>
      <p class="tjek-opgave">${
        ramt / i_alt >= 0.8 ? 'Du kan kernen. Brug resten af tiden på at sige det højt i hele sætninger.'
        : ramt / i_alt >= 0.5 ? 'Grundlaget er der. Hullerne nedenfor er dem, der koster point på dagen.'
        : 'Nu ved du, hvor du står. Det er bedre at opdage det i dag end i morgen.'}</p>
      <ul class="tjek-resultat">
        ${raekker.map((r) => {
          const n = niveau(r.ramt, r.i_alt);
          return `<li style="--f:${KLAR[n].farve}">
            <span>${r.emne.emoji}</span>
            <div><b>${esc(r.emne.titel)}</b><small>${KLAR[n].ord}</small></div>
            <i>${r.ramt}/${r.i_alt}</i>
          </li>`;
        }).join('')}
      </ul>
      ${svage.length ? `<button class="primary wide" data-act="traen" data-spor="${svage[0].emne.id}">Træn ${esc(svage[0].emne.kort)} nu</button>` : ''}
      <button class="ghost wide" data-act="luk">Luk${xp ? ` · +${xp} XP` : ''}</button>
    </div>`;
}
