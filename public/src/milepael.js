// Milepæle: det, der kom i stedet for cases.
//
// Hvorfor ikke loot boxes? Forskningen på belønninger i læringsapps peger den anden vej:
// forventede, tingslige belønninger for en opgave, man i forvejen kan lide, svækker den
// indre motivation (overjustification-effekten). Undtagelsen er belønninger, der er
// INFORMATIVE i stedet for kontrollerende – altså dem, der fortæller dig noget sandt om,
// hvor god du er ved at blive, frem for at udlodde en tilfældig præmie.
//
// Derfor viser en milepæl rigtige tal fra din egen FSRS-tilstand: hvor mange koncepter du
// kan huske om en uge, hvor mange kort du har mestret, og hvor eksamensparat du er.
// Ingen odds, intet inventar, ingenting at samle på.

export const MILEPAEL_KILDER = {
  combo: '5 rigtige i træk',
  maal: 'Dagens mål er nået',
  perfekt: 'Perfekt runde',
  sim: 'Stærk eksamenssimulering',
  mission: 'Mission klaret',
  bonus: 'Alle dagens missioner klaret',
  level: 'Level up',
};

const TITEL = {
  combo: 'Fem i træk',
  maal: 'Dagens mål er nået',
  perfekt: 'Perfekt runde',
  sim: 'Stærk simulering',
  mission: 'Mission klaret',
  bonus: 'Alle tre missioner',
  level: 'Nyt level',
};

const EMOJI = {
  combo: '🔥', maal: '🎯', perfekt: '💯', sim: '🎓', mission: '✅', bonus: '💎', level: '⭐',
};

export const XP_FOR = {
  combo: 30, maal: 60, perfekt: 45, sim: 80, mission: 50, bonus: 120, level: 75,
};

// Korte, sande sætninger om HVORFOR det, du lige gjorde, virker.
// De roterer, så kortet ikke bliver det samme hver gang.
const INDSIGTER = [
  'Hver gang du henter noget frem fra hukommelsen, bliver sporet stærkere. Det er derfor appen tester dig i stedet for at lade dig læse.',
  'At blande emner føles sværere end at tage ét ad gangen. Det er præcis derfor, det virker bedre til eksamen.',
  'Et kort tæller først som mestret, når du har ramt det rigtigt på tre forskellige dage. Det hedder successive relearning.',
  'Gentagelserne lægges lige før, du ville have glemt det. Det er svært med vilje – og det er der, hukommelsen bygges.',
  'At forklare noget med dine egne ord afslører de huller, genlæsning skjuler.',
  'Materiale, du har trænet ved at hente det frem, holder bedre, når du bliver nervøs. Det er din forsikring mod eksamensstress.',
  'Et forkert svar, du retter med det samme, er mere værd end et rigtigt, du gættede.',
  'Små daglige sessioner slår lange maratoner ved samme samlede tid. Afstanden er selve pointen.',
];

export const indsigtFor = (n) => INDSIGTER[Math.abs(n) % INDSIGTER.length];

/**
 * Bygger indholdet til et milepælskort ud fra rigtige tal.
 *
 * @param kilde   hvad der udløste milepælen
 * @param tal     { parathed, parathedDelta, spor, om7dage, mestret, nyeIdag, svarIdag, kalibrering }
 */
export function milepaelKort(kilde, tal) {
  // Parathed er det tal, der betyder mest før en eksamen, så det står først.
  // Nuller siger ingenting på en frisk konto, så de springes over, hvis der er bedre tal.
  const kandidater = [];
  if (tal.parathed != null) {
    kandidater.push({
      n: `${Math.round(tal.parathed * 100)} %`,
      label: tal.spor ? `eksamensparat i ${tal.spor}` : 'eksamensparat',
      delta: tal.parathedDelta,
      altid: true,
    });
  }
  if (tal.om7dage) kandidater.push({ n: tal.om7dage, label: 'koncepter du stadig kan om en uge' });
  if (tal.mestret) kandidater.push({ n: tal.mestret, label: 'kort mestret på tre forskellige dage' });
  if (tal.nyeIdag) kandidater.push({ n: `+${tal.nyeIdag}`, label: tal.nyeIdag === 1 ? 'nyt kort i dag' : 'nye kort i dag' });
  if (tal.svarIdag) kandidater.push({ n: tal.svarIdag, label: 'svar i dag' });

  return {
    emoji: EMOJI[kilde] ?? '⭐',
    kicker: 'Milepæl',
    titel: TITEL[kilde] ?? 'Milepæl',
    felter: kandidater.slice(0, 3),
    kalibrering: tal.kalibrering ?? null,
    xp: XP_FOR[kilde] ?? 30,
  };
}

/**
 * Kalibrering: rammer du, når du siger »Sikker«?
 * Godt kalibreret betyder, at din fornemmelse af at kunne det passer med, om du kan det.
 * Overmod er den farligste tilstand til en eksamen, fordi man så holder op med at øve.
 */
export function kalibrering(log) {
  const sum = { gaet: { n: 0, ok: 0 }, tror: { n: 0, ok: 0 }, sikker: { n: 0, ok: 0 } };
  for (const dag of Object.values(log ?? {})) {
    for (const [k, v] of Object.entries(dag.konf ?? {})) {
      if (!sum[k]) continue;
      sum[k].n += v.n;
      sum[k].ok += v.ok;
    }
  }
  const sikker = sum.sikker;
  if (sikker.n < 10) return null;
  const pct = sikker.ok / sikker.n;
  return {
    pct,
    n: sikker.n,
    alle: sum,
    dom: pct >= 0.9 ? 'godt kalibreret' : pct >= 0.75 ? 'let overmod' : 'overmod',
    raad: pct >= 0.9
      ? 'Din fornemmelse passer med, hvad du kan. Stol på den.'
      : 'Du er mere sikker, end du er god. Brug »Tror det« oftere, og øv de kort igen.',
  };
}
