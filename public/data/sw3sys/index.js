// Samler SW3SYS-pakken: ét modul pr. eksamensemne + koblinger.
// Lokale id'er (k1, k1q, f2 …) får emnets id som præfiks, så de er unikke.
import t00 from './t00-basics.js';
import t01 from './t01-proces.js';
import t02 from './t02-lambda.js';
import t03 from './t03-traade.js';
import t04 from './t04-sync.js';
import t05 from './t05-deadlock.js';
import t06 from './t06-fileio.js';
import t07 from './t07-queues.js';
import t08 from './t08-serial.js';
import t09 from './t09-memory.js';
import t10 from './t10-raii.js';
import t11 from './t11-drivers.js';
import t12 from './t12-build.js';
import koblinger from './koblinger.js';
import spoergsmaal from './spoergsmaal.js';

const emner = [t00, t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12];

const prefix = (t, id) => (id ? `${t}-${id}` : id);

export default {
  navn: 'SW3SYS – mundtlig eksamen',
  // Eksaminatorspørgsmålene ligger i én fil, så de kan læses og rettes samlet.
  spor: emner.map((e) => ({ ...e.spor, spoergsmaal: spoergsmaal[e.spor.id] ?? [] })),
  kort: [
    ...emner.flatMap(({ spor, kort }) =>
      kort.map((k) => ({ ...k, id: prefix(spor.id, k.id), om: prefix(spor.id, k.om), efter: prefix(spor.id, k.efter), spor: spor.id })),
    ),
    ...koblinger.map((k) => ({ ...k, spor: 'kobling' })),
  ],
};
