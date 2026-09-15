// FSRS-5 (Free Spaced Repetition Scheduler) med standardparametre.
// Modellen forudsiger, hvornår sandsynligheden for at huske et kort falder
// til DESIRED_RETENTION, og planlægger næste gentagelse dér.
// Karakterer: 1 = glemt, 2 = svært, 3 = godt, 4 = let.

const W = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575,
  0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621,
];
const DECAY = -0.5;
const FACTOR = 19 / 81;
const DAY = 86_400_000;
export const DESIRED_RETENTION = 0.9;

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

export function retrievability(state, now = Date.now()) {
  if (!state) return 0;
  const elapsed = Math.max(0, (now - state.last) / DAY);
  return Math.pow(1 + (FACTOR * elapsed) / state.S, DECAY);
}

function intervalDays(S) {
  return (S / FACTOR) * (Math.pow(DESIRED_RETENTION, 1 / DECAY) - 1);
}

const initDifficulty = (g) => clamp(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);

function nextDifficulty(D, g) {
  const damped = D + (-W[6] * (g - 3) * (10 - D)) / 9;
  return clamp(W[7] * initDifficulty(4) + (1 - W[7]) * damped, 1, 10);
}

function recallStability(D, S, R, g) {
  const hard = g === 2 ? W[15] : 1;
  const easy = g === 4 ? W[16] : 1;
  return S * (1 + Math.exp(W[8]) * (11 - D) * Math.pow(S, -W[9]) * (Math.exp(W[10] * (1 - R)) - 1) * hard * easy);
}

function forgetStability(D, S, R) {
  return Math.min(S, W[11] * Math.pow(D, -W[12]) * (Math.pow(S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R)));
}

export function review(state, grade, now = Date.now()) {
  let S, D;
  if (!state) {
    S = W[grade - 1];
    D = initDifficulty(grade);
  } else {
    const elapsed = (now - state.last) / DAY;
    if (elapsed < 1) {
      // Samme dag: FSRS-5 korttidsformel.
      S = state.S * Math.exp(W[17] * (grade - 3 + W[18]));
    } else {
      const R = retrievability(state, now);
      S = grade === 1 ? forgetStability(state.D, state.S, R) : recallStability(state.D, state.S, R, grade);
    }
    D = nextDifficulty(state.D, grade);
  }
  S = Math.max(0.1, S);

  // Glemte kort kommer tilbage om 10 minutter; resten når R rammer målet.
  const due = grade === 1 ? now + 10 * 60_000 : now + Math.max(1, Math.round(intervalDays(S))) * DAY;

  return {
    S, D, last: now, due,
    reps: (state?.reps ?? 0) + 1,
    lapses: (state?.lapses ?? 0) + (grade === 1 ? 1 : 0),
    lastGrade: grade,
  };
}
