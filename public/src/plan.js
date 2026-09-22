// »Din plan til eksamen«: konkrete handlinger, regnet ud af dine egne tal.
//
// Hvorfor en plan og ikke bare grafer? Fordi en graf fortæller dig, hvor du står,
// og en plan fortæller dig, hvad du gør nu. Implementation intentions – »når X,
// så Y« – er et af de bedst dokumenterede greb til faktisk at få gjort noget,
// og forskellen fra et godt forsæt er netop, at handlingen er konkret.
//
// Alt herinde er udledt af data, appen allerede har. Intet er gættet.

const pct = (x) => `${Math.round(x * 100)} %`;

/**
 * @param d {
 *   dageTilEksamen: number|null,
 *   emner: [{ t, r, mestret, i_alt, simuleret }],
 *   forfaldne: number,
 *   uberoerte: number,
 *   svarIdag: number,
 *   maal: number,
 *   kalibrering: null | { pct, dom },
 *   streak: number,
 * }
 */
export function lavPlan(d) {
  const { dageTilEksamen: dage, emner, forfaldne, uberoerte, svarIdag, maal } = d;
  const svage = [...emner].sort((a, b) => a.r - b.r);
  const usimulerede = emner.filter((e) => !e.simuleret);

  // Fasen afgør, hvad der giver mest. Tæt på eksamen er det for sent at lære nyt –
  // der betaler det sig at hente frem og at sove.
  const fase = dage === null ? 'ukendt' : dage <= 3 ? 'finale' : dage <= 14 ? 'skarp' : 'opbygning';

  const faser = {
    ukendt: {
      titel: 'Sæt din eksamensdato',
      hvorfor: 'Uden en dato regner appen parathed 7 dage frem, og gentagelserne lægges ikke, hvor de gør mest gavn.',
    },
    opbygning: {
      titel: `Opbygning · ${dage} dage tilbage`,
      hvorfor: 'Der er tid nok til at dække nyt stof. Prioritér bredde nu, og lad gentagelserne bygge sig op af sig selv.',
    },
    skarp: {
      titel: `Skærpning · ${dage} dage tilbage`,
      hvorfor: 'Nu skal hullerne lukkes, og du skal begynde at producere svarene højt i stedet for at genkende dem.',
    },
    finale: {
      titel: dage === 0 ? 'Eksamensdag' : `Finale · ${dage} ${dage === 1 ? 'dag' : 'dage'} tilbage`,
      hvorfor: 'Nyt stof kan ikke nå at sætte sig. Det, der stadig betaler sig, er at hente frem, at øve højt – og at sove.',
    },
  };

  const trin = [];
  const tilf = (emoji, tekst, hvorfor, handling = null) => trin.push({ emoji, tekst, hvorfor, handling });

  // 1. Forfaldne kort er altid øverst: de er lagt netop dér, hvor du er ved at glemme.
  if (forfaldne > 0) {
    tilf('🔁', `Tag dine ${forfaldne} forfaldne kort`,
      'FSRS har lagt dem lige før, du ville have glemt dem. Det er der, en gentagelse er mest værd.',
      { type: 'feed', tekst: 'Åbn feedet' });
  }

  // 2. Fasens hovedhandling.
  if (fase === 'opbygning' && uberoerte > 0) {
    tilf('🆕', `${uberoerte} kort har du aldrig set`,
      'De tæller som 0 i parathed. Nyt stof er stadig den billigste gevinst så langt fra eksamen.',
      { type: 'feed', tekst: 'Åbn feedet' });
  }
  if (fase === 'skarp' || fase === 'finale') {
    const v = svage[0];
    if (v) {
      tilf('🎯', `Start med ${v.t.emoji} ${v.t.nr}. ${v.t.titel} · ${pct(v.r)} parat`,
        'Det svageste emne er der, hvor en time flytter mest. Alt andet er allerede tættere på at sidde.',
        { type: 'spor', spor: v.t.id, tekst: 'Træn emnet' });
    }
  }

  // 3. Simulering: producere frem for genkende. Det er formatet, eksamen har.
  if (dage !== null && dage <= 21 && usimulerede.length) {
    const u = usimulerede[0];
    tilf('🎤', `Simulér ${u.t.emoji} ${u.t.nr}. ${u.t.titel}`,
      `Du har aldrig trukket det emne. ${usimulerede.length === 1 ? 'Det er det sidste, du mangler.' : `${usimulerede.length} emner mangler stadig.`} Til en mundtlig eksamen skal du kunne producere svaret, ikke genkende det.`,
      { type: 'sim', spor: u.t.id, tekst: 'Træk emnet' });
  }

  // 4. Kalibrering: overmod er den dyreste tilstand at gå til eksamen i.
  if (d.kalibrering && d.kalibrering.pct < 0.85) {
    tilf('🎲', `»Sikker« holder kun ${pct(d.kalibrering.pct)} af gangene`,
      'Du er mere sikker, end du er god. Brug »Tror det« oftere – så lægger appen de kort tættere, og du opdager hullerne i tide.',
      null);
  }

  // 5. Dagens mål.
  const mangler = Math.max(0, maal - svarIdag);
  if (mangler > 0) {
    tilf('🔥', `${mangler} svar til dagens mål`,
      'Små daglige sessioner slår lange maratoner ved samme samlede tid. Afstanden mellem gangene er selve metoden.',
      { type: 'feed', tekst: 'Åbn feedet' });
  } else {
    tilf('✅', 'Dagens mål er nået',
      'Det sidder bedst, hvis du stopper nu og kommer igen i morgen. Mere i dag giver mindre pr. minut end lidt i morgen.',
      null);
  }

  // 6. Det sidste døgn har sin egen regel.
  if (fase === 'finale') {
    tilf('😴', 'Sov nok i nat',
      'Under dyb søvn flyttes det lærte fra hippocampus til varig lagring. En nat uden søvn koster dobbelt: du er træt, og det, du læste, blev aldrig skrevet ordentligt ned.',
      null);
  }

  return {
    fase,
    titel: faser[fase].titel,
    hvorfor: faser[fase].hvorfor,
    trin: trin.slice(0, 5),
    svage: svage.slice(0, 3),
  };
}
