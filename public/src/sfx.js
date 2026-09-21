// Små lyde uden lydfiler (Web Audio) + vibration. Kan slås fra under Dagens missioner.
// Hvert rigtigt svar i træk går et trin op ad en pentatonisk skala, så en combo
// kan høres, og et brud på den kan mærkes.

let audio = null;
let muted = false;

export const setMuted = (on) => { muted = on; };

export function tone(freq, { type = 'sine', dur = 0.12, vol = 0.045, at = 0 } = {}) {
  if (muted) return;
  try {
    audio ??= new (globalThis.AudioContext || globalThis.webkitAudioContext)();
    const t = audio.currentTime + at;
    const o = audio.createOscillator();
    const g = audio.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(audio.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  } catch {}
}

const SCALE = [0, 2, 4, 7, 9];
const note = (step) => 523.25 * 2 ** ((Math.floor(step / 5) * 12 + SCALE[step % 5]) / 12);
// Browseren afviser vibration (med en konsolfejl), før brugeren har trykket på siden.
const buzz = (pattern) => { if (!muted && navigator.userActivation?.hasBeenActive !== false) navigator.vibrate?.(pattern); };

export const sfx = {
  // Almindeligt rigtigt svar: kun lyd. Vibration gemmes til fejl og milepæle,
  // ellers holder man op med at lægge mærke til den.
  correct(combo = 1) {
    const s = Math.min(Math.max(combo - 1, 0), 14);
    tone(note(s), { dur: 0.12 });
    tone(note(s + 2), { dur: 0.18, at: 0.07 });
  },
  // Noget, der er værd at mærke: 5 i træk, en klaret mission, et level.
  milepael() {
    tone(note(7), { dur: 0.14, vol: 0.05 });
    tone(note(11), { dur: 0.22, at: 0.09, vol: 0.05 });
    buzz([14, 44, 14]);
  },
  crit() {
    [5, 7, 9, 10].forEach((s, i) => tone(note(s), { dur: 0.1, at: i * 0.05, vol: 0.05 }));
  },
  wrong() {
    tone(196, { type: 'triangle', dur: 0.16, vol: 0.05 });
    tone(147, { type: 'triangle', dur: 0.24, vol: 0.05, at: 0.09 });
    buzz([25, 40, 25]);
  },
  fanfare() {
    [5, 7, 9, 10, 12].forEach((s, i) => tone(note(s), { dur: 0.22, at: i * 0.09, vol: 0.05 }));
    buzz([15, 30, 15, 30, 40]);
  },
  tick(pitch = 1) {
    tone(900 * pitch, { type: 'square', dur: 0.04, vol: 0.035 });
  },
};
