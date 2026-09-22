// »Sådan virker appen«: en kort gennemgang af de funktioner, man ellers aldrig opdager.
//
// Hvorfor overhovedet en guide? Fordi en funktion, ingen kan finde, er det samme som
// ingen funktion. Og hvorfor står der en begrundelse ved hver? Fordi folk bruger en
// studieteknik langt mere konsekvent, når de ved, hvad den gør – ellers vælger man det,
// der føles lettest, og det er næsten altid genlæsning.
//
// Hvert punkt er bygget ens: hvad det er, et konkret eksempel, og hvorfor det virker.

export const GUIDE_VERSION = 2;

const AFSNIT = [
  {
    titel: 'Mens du scroller',
    punkter: [
      {
        emoji: '✨',
        navn: 'Uddyb',
        hvad: 'Knappen i højre side. Skriv svaret med dine egne ord – ikke afskrift.',
        eksempel: 'På kortet om mutex vs. semafor skriver du: »En mutex har en ejer. Kun den tråd, der låste, må låse op. En semafor er bare en tæller, så en anden må gerne signalere.«',
        hvorfor: 'Selvforklaring er en af de bedst dokumenterede teknikker, der findes. Den afslører præcis de huller, man ikke opdager ved at læse svaret og nikke.',
        xp: '+15 XP',
      },
      {
        emoji: '📈',
        navn: 'Mere',
        hvad: 'Siger til feedet, at du vil have flere kort fra det emne.',
        eksempel: 'Trykker du »Mere« på et kort om deadlocks, dukker der oftere deadlock-kort op resten af dagen.',
        hvorfor: 'Du ved bedre end algoritmen, hvad du skal til eksamen i på tirsdag.',
      },
      {
        emoji: '🤔',
        navn: 'Gætter / Tror det / Sikker',
        hvad: 'Sig, hvor sikker du er, når du svarer. Det er ikke bare XP.',
        eksempel: 'Rammer du rigtigt på »Gætter«, kommer kortet hurtigt igen. Rammer du på »Sikker«, går der længere tid.',
        hvorfor: 'Et heldigt gæt og en sikker viden ser ens ud udefra. Ved at sige det højt får du en ærlig plan – og et kalibreringstal i statistikken.',
      },
    ],
  },
  {
    titel: 'Hver dag',
    punkter: [
      {
        emoji: '🎯',
        navn: 'Ringen øverst til højre',
        hvad: 'Dagens mål og tre missioner. Tryk på den.',
        eksempel: '»Svar rigtigt 5 gange i træk«, »forklar ét kort højt«, »tag 3 kort i dit svageste emne«.',
        hvorfor: 'Missionerne peger altid mod det, der lærer mest – ikke mod det, der er nemmest at klikke igennem.',
      },
      {
        emoji: '⭐',
        navn: 'Milepæle',
        hvad: 'Dukker op i feedet med dine egne tal. Ingen præmier, ingen odds.',
        eksempel: '»47 koncepter du stadig kan om en uge · 12 kort mestret · 34 % eksamensparat, ▲ 9 point siden start«.',
        hvorfor: 'Feedback om din egen fremgang styrker lysten til at fortsætte. Tilfældige præmier gør typisk det modsatte på lang sigt.',
      },
      {
        emoji: '🔀',
        navn: 'Koblinger',
        hvad: 'Låses op, når du har svaret på to bestemte kort i to forskellige fag.',
        eksempel: 'Har du styr på både availability-heuristikken og CPU-cache, får du kortet om, at din hjerne bruger en cache, når det rigtige opslag er for dyrt.',
        hvorfor: 'To ting, der deler en grundidé, holder hinanden fast i hukommelsen. Det er derfor appen blander fagene i stedet for at tage ét ad gangen.',
      },
    ],
  },
  {
    titel: 'Før eksamen',
    punkter: [
      {
        emoji: '🎓',
        navn: 'Simulatoren',
        hvad: 'Under Eksamen. Træk et emne, få 8 minutter, og byg din disposition.',
        eksempel: 'Du trækker »Synkronisering«, sætter dine punkter i rækkefølge, svarer på censorspørgsmål og får en karakter plus kernen i emnet.',
        hvorfor: 'At øve under noget, der ligner presset, gør viden mere robust, når hjertet banker på dagen.',
      },
      {
        emoji: '🎯',
        navn: 'Kalibrering',
        hvad: 'Under Statistik. Viser, hvor tit »Sikker« faktisk var rigtigt.',
        eksempel: 'Står der 68 %, betyder det, at hver tredje gang du føler dig sikker, tager du fejl.',
        hvorfor: 'Overmod er den farligste tilstand før en eksamen: tror man, man kan det, holder man op med at øve.',
      },
      {
        emoji: '📤',
        navn: 'Del dine data',
        hvad: 'Nederst under Statistik. Henter en fil med, hvad du kan og ikke kan.',
        eksempel: 'Læg filen i mappen `fremskridt/` i projektet, så kan den læses igen senere og bruges til at lave nye kort om det, der driller.',
        hvorfor: 'Dine egne fejl er den bedste kilde til, hvad du mangler at øve.',
      },
    ],
  },
];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const kode = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');

export function guideHtml() {
  return `
    <div class="guide">
      <h2>Sådan får du mest ud af appen</h2>
      <p class="guide-intro">Otte ting, der er lette at overse. Hver af dem står her, fordi den er dokumenteret
      til at virke – ikke fordi den var sjov at bygge.</p>
      ${AFSNIT.map((a) => `
        <h3 class="guide-h">${esc(a.titel)}</h3>
        ${a.punkter.map((p) => `
          <section class="guide-punkt">
            <header><span class="guide-emoji">${p.emoji}</span><b>${esc(p.navn)}</b>${p.xp ? `<i>${esc(p.xp)}</i>` : ''}</header>
            <p class="guide-hvad">${kode(p.hvad)}</p>
            <p class="guide-eks"><small>Eksempel</small>${kode(p.eksempel)}</p>
            <p class="guide-hvorfor"><small>Hvorfor det virker</small>${kode(p.hvorfor)}</p>
          </section>`).join('')}`).join('')}
      <button class="primary wide" data-act="guide-luk">Godt – lad mig komme i gang</button>
    </div>`;
}
