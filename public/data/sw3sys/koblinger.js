// Koblinger mellem emner. Til mundtlig eksamen er det netop dem, der
// imponerer: »det her hænger sammen med …«. De låses op, når begge sider er lært.
export default [
  {
    id: 'kob-raii-lock', type: 'kobling', kraever: ['t04-k3q', 't10-k2q'],
    hook: 'std::lock_guard er RAII for låse – og det redder dig fra deadlocks ved exceptions.',
    body: 'Lås en mutex manuelt, og kast en exception før `unlock()`: mutexen er **låst for evigt**. Den næste tråd, der prøver, hænger.\n\n`std::lock_guard<std::mutex> lk(m);` er præcis RAII (emne 10) anvendt på synkronisering (emne 4). Konstruktøren låser, destruktøren låser op, også under stack unwinding.\n\n`std::unique_lock` er den fleksible udgave, der kan låse op midlertidigt, og som condition variables kræver. `std::scoped_lock` (emne 5) låser flere mutexer uden deadlock.\n\nTil eksamen: når du forklarer mutex, så nævn RAII. Når du forklarer RAII, så nævn låse.',
  },
  {
    id: 'kob-fork-paging', type: 'kobling', kraever: ['t01-k3q', 't09-k3q'],
    hook: 'fork() er kun billig, fordi paging findes.',
    body: 'fork() (emne 1) laver en »kopi« af hele adresserummet. Med gigabytes af hukommelse ville det tage evigheder.\n\nMen med **paging** (emne 9) kopierer kernen kun **sidetabellen**. Begge processer peger på de **samme fysiske frames**, markeret **read-only**.\n\nSkriver en af dem til en side, giver MMU\'en en **page fault**. Kernen kopierer **kun den side** og opdaterer sidetabellen. Det er **copy-on-write**.\n\nKalder barnet exec() med det samme, kopieres næsten intet. Paging\'s protection-bits bliver dermed en optimering, ikke kun beskyttelse.',
  },
  {
    id: 'kob-poll-driver', type: 'kobling', kraever: ['t06-k3q', 't11-k4q'],
    hook: 'Når du kalder poll() i user space, sover du i en wait queue i en driver.',
    body: 'I emne 6 kalder du `poll()` på en GPIO og venter på en kant. Hvad sker der egentlig?\n\nKernen kalder driverens `.poll`-funktion, som registrerer dig i driverens **wait queue** (emne 11) med `poll_wait()`. Så sover din tråd.\n\nNår knappen trykkes, kører **ISR\'en** (emne 9 og 11). Den kalder `wake_up_interruptible()`, og poll returnerer med `POLLPRI`.\n\nHele kæden er: **user space poll → system call (dual-mode, emne 0) → driver wait queue → hardware interrupt → ISR → wake up → retur til user space.** At kunne tegne den kæde viser, at du forstår hele stakken.',
  },
  {
    id: 'kob-queue-cv', type: 'kobling', kraever: ['t04-k5q', 't07-k1q'],
    hook: 'En message queue er en condition variable med en std::queue omkring.',
    body: 'Emne 7\'s `MsgQueue::receive()` er ikke magi. Den er emne 4 anvendt:\n\n`std::unique_lock lk(m);`\n`cv.wait(lk, [&]{ return !q.empty(); });`\n`auto msg = std::move(q.front()); q.pop();`\n\n`send()` låser, pusher og kalder `cv.notify_one()`.\n\nBounded? Tilføj en anden condition variable til »ikke fuld«, så har du **producer-consumer**.\n\nOg ejerskabet af beskeden? `std::unique_ptr<Message>` og `std::move` (emne 7 og 10).\n\nTre eksamensemner i ti linjers kode.',
  },
  {
    id: 'kob-dualmode-driver', type: 'kobling', kraever: ['t00-k1q', 't11-k1q'],
    hook: 'Dit program crasher alene. Dit kernemodul tager hele maskinen med.',
    body: 'Et segfault i user space dræber én proces. Det er **dual-mode** og **memory protection** (emne 0 og 9), der gør arbejdet: MMU\'en fanger den ugyldige adresse, trapper til kernen, og kernen sender SIGSEGV.\n\nEt kernemodul (emne 11) kører **i kernel mode, i kernens adresserum**. Der er ingen over-instans, der kan fange fejlen. En NULL-dereference giver en **kernel oops** eller **panic**.\n\nDerfor skal driveren bruge `copy_to_user` i stedet for memcpy. User-pointeren er ikke til at stole på, og nu er det kernen selv, der ville fejle.',
  },
  {
    id: 'kob-lambda-thread', type: 'kobling', kraever: ['t02-k4q', 't03-k1q'],
    hook: 'std::thread + lambda: den farligste capture i hele kurset.',
    body: '`std::thread t([&]{ brug(x); });` er emne 2 og 3 i én linje.\n\nLambdaens closure-objekt **kopieres ind i tråden**. Captures by reference (`[&]`) kopierer kun **referencerne**. Går den oprindelige variabel ud af scope, før tråden er færdig, har du en **dangling reference** og en data race på samme tid.\n\nTommelfingerregler:\n• Tråden joines i samme scope → `[&]` er OK.\n• Tråden detaches eller lever længere → capture **by value** eller flyt ind med init capture `[p = std::move(ptr)]`.\n• Delt mutable data → synkronisering (emne 4) eller message passing (emne 7).',
  },
];
