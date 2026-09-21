export default {
  spor: {
    id: 't11', nr: 11, titel: 'Linux Device Drivers', kort: 'Drivers', emoji: '⚙️',
    farve: '#834D9B', gradient: 'linear-gradient(135deg, #834D9B 0%, #D04ED6 100%)',
    lektion: 'Lektion 12.1 + 13.1',
    kerne: [
      'Et kernemodul indlæses i en kørende kerne med insmod eller modprobe og har ingen beskyttelse mod sig selv.',
      'En enhed identificeres med major (hvilken driver) og minor (hvilken enhed).',
      'Driveren udfylder en file_operations-struct med open, read, write og release.',
      'Brugerens pointer må aldrig bruges direkte: brug copy_to_user og copy_from_user, som validerer og håndterer page faults.',
      'En blocking read i en driver lægger processen i en wait queue og sover, indtil et interrupt vækker den.',
      'I en interrupt handler må man ikke sove. Det tunge arbejde skubbes til en bottom half, fx en workqueue.',
    ],
    disposition: [
      'Kernel modules: module_init/exit, insmod/rmmod/modprobe, dmesg',
      'Character driver boilerplate: alloc_chrdev_region, cdev, class/device_create',
      'Major og minor numbers',
      'file_operations: open, release, read, write – copy_to_user/copy_from_user',
      'GPIO-adgang fra kernen',
      'Blocking I/O med wait queues',
      'Interrupt handling: request_irq, interrupt context, free_irq',
    ],
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Et kernemodul er kode, du skubber ind i en kørende kerne. Med kernens rettigheder.',
      body: 'Et **loadable kernel module** (.ko) kan indlæses og fjernes **mens systemet kører**, uden at genstarte eller genbygge kernen.\n\n`static int __init my_init(void) { ... return 0; }`\n`static void __exit my_exit(void) { ... }`\n`module_init(my_init); module_exit(my_exit);`\n`MODULE_LICENSE("GPL");`\n\nDet bygges med kernens build-system: `obj-m += mydrv.o` og\n`make -C /lib/modules/$(uname -r)/build M=$(PWD) modules`.\n\n**insmod** indlæser en fil. **modprobe** indlæser efter navn inkl. afhængigheder. **rmmod** fjerner, og **lsmod** lister. `printk` skriver til kernens log, som ses med **dmesg**.\n\nModulet kører i **kernel mode**. En NULL-pointer kan vælte hele maskinen, og der er ingen libc (ingen printf, ingen malloc).',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad er forskellen på insmod og modprobe?',
      svar: [
        'insmod bruges til at fjerne moduler fra kernen igen',
        'modprobe slår op efter navn og tager afhængigheder med',
        'Der er ingen forskel, det er to navne for det samme',
        'modprobe kompilerer modulet, før det bliver indlæst'
      ],
      rigtigt: 1,
      forklaring: 'modprobe bruger modules.dep til at indlæse afhængigheder først. insmod tager præcis den fil, du giver den.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Major siger hvilken driver. Minor siger hvilken enhed.',
      body: 'En enhedsfil som `/dev/mygpio0` har et **device number** (`dev_t`) med to dele:\n\n**Major**: identificerer **driveren**.\n**Minor**: identificerer den **konkrete enhed** hos driveren, fx GPIO 0, 1, 2.\n\n`ls -l /dev` viser dem som `240, 0`.\n\n**Boilerplate for en character driver** i init:\n1. `alloc_chrdev_region(&devno, 0, antal, "mygpio")` giver en fri major og minor-range.\n2. `cdev_init(&cdev, &fops)` kobler file_operations på.\n3. `cdev_add(&cdev, devno, antal)` gør driveren live.\n4. `class_create(...)` + `device_create(...)` får **udev** til at oprette `/dev`-noden (ellers `mknod`).\n\nI exit gøres det samme **i omvendt rækkefølge**: device_destroy, class_destroy, cdev_del, unregister_chrdev_region. Ved fejl midt i init skal det, der allerede er gjort, rulles tilbage.',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad identificerer major-nummeret?',
      svar: [
        'Processen, der har åbnet filen',
        'GPIO-pinnen',
        'Den konkrete enhed',
        'Driveren'
      ],
      rigtigt: 3,
      forklaring: 'Major = driver, minor = enhedsinstans. Kernen bruger major til at finde driverens file_operations.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Brugerens read() lander i din funktion. Men deres pointer må du ikke røre.',
      body: '`struct file_operations` er tabellen af funktioner, som VFS kalder:\n\n`static const struct file_operations fops = {`\n`  .owner = THIS_MODULE,`\n`  .open = my_open, .release = my_release,`\n`  .read = my_read, .write = my_write,`\n`};`\n\nNår et program kalder `read(fd, buf, n)` på `/dev/mygpio0`, går det gennem system call → VFS → **din** `my_read`:\n\n`ssize_t my_read(struct file *f, char __user *buf, size_t count, loff_t *f_pos)`\n\n`buf` er en **user space-adresse**. Den kan være ugyldig eller swappet ud, så du må **ikke** bruge memcpy. Brug `copy_to_user(buf, data, len)` og `copy_from_user(dst, buf, len)` i write. De returnerer antal bytes, der **ikke** blev kopieret.\n\nReturnér antal bytes læst/skrevet, 0 for EOF eller en negativ fejlkode (fx `-EFAULT`). Minor-nummeret findes med `iminor(file_inode(f))`.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvorfor skal en driver bruge copy_to_user i stedet for memcpy?',
      svar: [
        'Det er kun en stilregel i kernens kodningsstandard',
        'Fordi copy_to_user er hurtigere end memcpy i kernen',
        'Fordi pointeren kan være ugyldig eller swappet ud',
        'Fordi memcpy slet ikke findes inde i kernen'
      ],
      rigtigt: 2,
      forklaring: 'En ugyldig user-pointer ville ellers give en kernel oops. copy_to_user tjekker adressen og returnerer fejl i stedet.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'En blocking read i en driver er en tråd, der sover, indtil et interrupt vækker den.',
      body: '**GPIO i kernen** (klassisk integer-API):\n`gpio_request(pin, "label");`\n`gpio_direction_input(pin);` / `gpio_direction_output(pin, 0);`\n`gpio_get_value(pin);` / `gpio_set_value(pin, 1);`\n`gpio_free(pin);` i exit. (Nyere kode bruger descriptor-API\'et `gpiod_*`.)\n\n**Blocking I/O** med en **wait queue**:\n\n`static DECLARE_WAIT_QUEUE_HEAD(wq);`\n`static int flag = 0;`\n\nI read: `wait_event_interruptible(wq, flag != 0);` sover, til betingelsen er sand. Returnerer den ≠ 0, blev den afbrudt af et signal, og så returneres `-ERESTARTSYS`.\n\nI ISR\'en: `flag = 1; wake_up_interruptible(&wq);`\n\nBagefter nulstilles flag, værdien læses og kopieres til brugeren. Brugerens tråd bruger ingen CPU, mens den venter.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad gør wait_event_interruptible(wq, flag != 0)?',
      svar: [
        'Lægger processen til at sove, til flag != 0',
        'Vækker alle processer, der venter i køen wq',
        'Busy-waiter i en løkke, indtil flag bliver ændret',
        'Registrerer et nyt interrupt på wait queue-køen'
      ],
      rigtigt: 0,
      forklaring: 'Makroen tjekker betingelsen, sover og tjekker igen efter hver wake_up. Ligesom en condition variable med prædikat.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'I en interrupt handler må du ikke sove. Ikke engang lidt.',
      body: '`int irq = gpio_to_irq(pin);`\n`request_irq(irq, my_isr, IRQF_TRIGGER_RISING, "mygpio", dev);`\n\n`static irqreturn_t my_isr(int irq, void *dev_id) {`\n`  flag = 1; wake_up_interruptible(&wq);`\n`  return IRQ_HANDLED;`\n`}`\n\n`free_irq(irq, dev)` kaldes i exit.\n\nISR\'en kører i **interrupt context**: ingen proces at lægge i søvn. Derfor må den **ikke sove**:\n• ingen `copy_to_user` / `copy_from_user`\n• ingen `mutex_lock` eller `msleep`\n• ingen `kmalloc(..., GFP_KERNEL)` (brug `GFP_ATOMIC`)\n\nHold den **kort**. Tungt arbejde flyttes til en **bottom half**: tasklet, workqueue eller threaded IRQ (`request_threaded_irq`). Delte data mellem ISR og process context beskyttes med **spinlock** (`spin_lock_irqsave`).',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Hvilket kald er FORBUDT i en interrupt handler?',
      svar: [
        'gpio_get_value',
        'mutex_lock',
        'wake_up_interruptible',
        'spin_lock_irqsave'
      ],
      rigtigt: 1,
      forklaring: 'mutex_lock kan sove, hvis låsen er optaget, og det må man ikke i interrupt context. Spinlocks og wake_up er tilladt.',
    },
    {
      id: 'kode1', type: 'case', efter: 'k3',
      scenarie: 'En studerende skriver read-funktionen til sin GPIO-driver.',
      kode: 'static ssize_t my_read(struct file *f, char __user *buf,\n                       size_t len, loff_t *off) {\n  char msg[] = "1\\n";\n  memcpy(buf, msg, 2);\n  return 2;\n}',
      sporgsmal: 'Hvad er den alvorlige fejl?',
      svar: [
        'msg burde være erklæret static i funktionen',
        'memcpy til user space – brug copy_to_user',
        'len bliver aldrig brugt, så der sker intet',
        'Den returnerer ikke 0, når der er nået EOF'
      ],
      rigtigt: 1,
      forklaring: 'copy_to_user validerer adressen og håndterer page faults. Bonus: uden brug af *off og len returnerer den aldrig 0, så `cat` læser uendeligt.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k2',
      pastand: 'Major-nummeret identificerer den konkrete enhed, og minor-nummeret driveren.',
      rigtigt: 0,
      forklaring: 'Myte – det er omvendt. Major = driver, minor = enhed (instans) hos driveren.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k5',
      sporgsmal: 'Sæt forløbet for en blocking read på en knap i rækkefølge',
      trin: [
        'Brugerprogram kalder read() på /dev/mygpio0',
        'VFS kalder driverens .read',
        'Driveren kalder wait_event_interruptible og sover',
        'Knappen trykkes: GPIO-interruptet kører ISR\'en',
        'ISR\'en sætter flag og kalder wake_up_interruptible',
        'Driveren vågner, copy_to_user, og read returnerer',
      ],
      forklaring: 'copy_to_user sker i process context, efter at driveren er vækket. Aldrig i ISR\'en.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k2',
      sporgsmal: 'Forklar boilerplate-koden i init og exit for en Linux character driver.',
      punkter: [
        { tekst: 'module_init/module_exit og MODULE_LICENSE', ord: ['module_init', 'module_exit', 'license'] },
        { tekst: 'alloc_chrdev_region: major/minor', ord: ['alloc_chrdev_region', 'major', 'minor'] },
        { tekst: 'cdev_init med file_operations og cdev_add', ord: ['cdev_init', 'cdev_add', 'file_operations', 'fops'] },
        { tekst: 'class_create + device_create → /dev-node via udev', ord: ['class_create', 'device_create', 'udev', '/dev'] },
        { tekst: 'Exit i omvendt rækkefølge og fejlhåndtering', ord: ['omvendt', 'destroy', 'cdev_del', 'unregister'] },
        { tekst: 'insmod/rmmod og dmesg', ord: ['insmod', 'rmmod', 'modprobe', 'dmesg'] },
      ],
    },
    {
      id: 'f2', type: 'forklar', efter: 'k5',
      sporgsmal: 'Forklar interrupt handling i en Linux driver, inkl. hvad man må og ikke må.',
      punkter: [
        { tekst: 'gpio_to_irq og request_irq med trigger-type', ord: ['gpio_to_irq', 'request_irq', 'trigger', 'rising'] },
        { tekst: 'Handler returnerer IRQ_HANDLED', ord: ['irq_handled', 'irqreturn'] },
        { tekst: 'Interrupt context: må ikke sove', ord: ['sove', 'sleep', 'interrupt context', 'atomic'] },
        { tekst: 'Ingen copy_to_user, mutex_lock, GFP_KERNEL', ord: ['copy_to_user', 'mutex', 'gfp_kernel'] },
        { tekst: 'Kort ISR, bottom half (tasklet/workqueue/threaded)', ord: ['bottom half', 'tasklet', 'workqueue', 'threaded'] },
        { tekst: 'wake_up på wait queue, free_irq i exit', ord: ['wake_up', 'wait queue', 'free_irq'] },
      ],
    },
    {
      id: 'f3', type: 'forklar', efter: 'k4',
      sporgsmal: 'Hvordan implementerer du blocking read i en driver?',
      punkter: [
        { tekst: 'Wait queue: DECLARE_WAIT_QUEUE_HEAD', ord: ['wait queue', 'declare_wait_queue_head', 'wait_queue'] },
        { tekst: 'wait_event_interruptible med betingelse i read', ord: ['wait_event_interruptible', 'betingelse'] },
        { tekst: 'ISR sætter flag og kalder wake_up_interruptible', ord: ['wake_up', 'flag', 'isr'] },
        { tekst: 'Håndtér signal: -ERESTARTSYS', ord: ['erestartsys', 'signal'] },
        { tekst: 'copy_to_user efter opvågning', ord: ['copy_to_user'] },
      ],
    },
  ],
};
