export default {
  spor: {
    id: 't08', nr: 8, titel: 'Linux User Space Serial I/O', kort: 'Serial', emoji: '🔌',
    farve: '#00B09B', gradient: 'linear-gradient(135deg, #00B09B 0%, #96C93D 100%)',
    lektion: 'Lektion 8.2 + 11.2',
    kerne: [
      'I2C bruger to ledninger (SDA og SCL) og adresserer enhederne med 7 bit.',
      'Linjerne er open-drain: enhederne kan kun trække lav, så der skal pull-up-modstande til.',
      'Hver overførsel er START, adresse + R/W, ACK, data med ACK, STOP. Manglende ACK betyder ingen enhed.',
      'Fra user space er en I2C-bus en fil: åbn /dev/i2c-1, sæt adressen med ioctl(I2C_SLAVE), og brug read/write.',
      'SPI er hurtigere: fire ledninger, ingen adresser, og slaven vælges ved at trække chip select lav.',
      'SPI sender og modtager samtidig (full duplex) via en ioctl med en spi_ioc_transfer-struct.',
    ],
    disposition: [
      'I2C: arkitektur (SDA, SCL, pull-ups, adresser, multi-master)',
      'I2C-protokol: START, adresse + R/W, ACK, repeated START, STOP',
      'i2c-dev: /dev/i2c-1, ioctl I2C_SLAVE, read/write, i2cdetect',
      'OLED-eksempel (SSD1306 på 0x3C, control byte)',
      'SPI: SCLK, MOSI, MISO, CS – full duplex, ingen adresser',
      'spidev: modes, speed, SPI_IOC_MESSAGE med spi_ioc_transfer',
      'BMI160-eksempel og sammenligning I2C vs SPI',
    ],
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'To ledninger, hundrede enheder. I2C er bussernes minimalist.',
      body: '**I2C** bruger to ledninger: **SDA** (data) og **SCL** (clock). Begge er **open-drain**: enheder kan kun trække linjen **lav**, og **pull-up-modstande** trækker den høj.\n\nDet gør **flere mastere og mange slaves** på samme bus mulige uden kortslutning.\n\nHver slave har en **7-bit adresse** (fx 0x3C). Hastigheder: 100 kbit/s (standard), 400 kbit/s (fast), op til 3,4 Mbit/s.\n\nMasteren styrer clocken. **Clock stretching**: en slave kan holde SCL lav for at bede om mere tid.\n\nFordele: få ben og adressering. Ulemper: langsommere end SPI, og kapacitet i ledningerne begrænser længde og antal enheder.',
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvorfor skal I2C-bussen have pull-up-modstande?',
      svar: [
        'For at filtrere støj fra de lange ledninger væk',
        'For at bestemme, hvilken adresse slaven svarer på',
        'Fordi linjerne er open-drain og kun kan trække lav',
        'For at begrænse strømmen til de tilsluttede slaves'
      ],
      rigtigt: 2,
      forklaring: 'Open-drain betyder, at ingen enhed driver linjen aktivt høj. Det gør multi-master og ACK muligt uden kortslutning.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Hver I2C-samtale starter med at ringe til en adresse og vente på »ja«.',
      body: '**START**: SDA går lav, **mens SCL er høj**.\n\n**Adresse + R/W**: 7 adressebits + 1 bit (0 = write, 1 = read).\n\n**ACK**: slaven trækker SDA lav i 9. clockpuls. Svarer ingen, er det **NACK**.\n\n**Data**: 8 bits ad gangen, hver efterfulgt af ACK/NACK. Data må kun skifte, mens SCL er lav.\n\n**STOP**: SDA går høj, mens SCL er høj.\n\nAt **læse et register** på en sensor:\n1. START, adresse+W, **registeradresse**\n2. **Repeated START** (uden STOP, så ingen anden master tager bussen)\n3. adresse+R, slaven sender data, master svarer **NACK** på sidste byte\n4. STOP',
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvad kendetegner en START-betingelse på I2C?',
      svar: [
        'Masteren sender 0x00',
        'SDA går høj, mens SCL er høj',
        'SCL går lav, mens SDA er høj',
        'SDA går lav, mens SCL er høj'
      ],
      rigtigt: 3,
      forklaring: 'Normalt skifter SDA kun, når SCL er lav. Skift mens SCL er høj er specielle: høj→lav = START, lav→høj = STOP.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'Fra user space er en I2C-bus bare en fil, en ioctl og nogle bytes.',
      body: 'Linux\' **i2c-dev**-modul giver `/dev/i2c-N` (på RPi typisk `/dev/i2c-1`).\n\n`int fd = open("/dev/i2c-1", O_RDWR);`\n`ioctl(fd, I2C_SLAVE, 0x3C); // vælg slave`\n`write(fd, buf, n);  // START, adr+W, data, STOP`\n`read(fd, buf, n);   // START, adr+R, data, STOP`\n\nSeparate write og read giver **STOP** imellem. Kræver sensoren **repeated START**, bruges `ioctl(fd, I2C_RDWR, &data)` med en række `struct i2c_msg` eller SMBus-hjælpere som `i2c_smbus_read_byte_data`.\n\nVærktøjer: `i2cdetect -y 1` scanner bussen, `i2cget`/`i2cset` læser og skriver registre.\n\n**OLED (SSD1306, 0x3C)**: første byte er en **control byte**. `0x00` betyder, at resten er kommandoer (fx `0xAF` = display on), og `0x40` betyder pixeldata.',
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvad gør ioctl(fd, I2C_SLAVE, 0x48) på /dev/i2c-1?',
      svar: [
        'Sætter adressen, som read og write skal bruge',
        'Scanner bussen igennem for en enhed på 0x48',
        'Gør fd non-blocking, så read ikke kan blokere',
        'Sender byten 0x48 ud på bussen med det samme'
      ],
      rigtigt: 0,
      forklaring: 'Der sendes intet på bussen. Kernen husker blot adressen til de næste transaktioner på fd\'en.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'SPI er I2C\'s hurtige fætter: flere ledninger, ingen adresser, ingen pardon.',
      body: '**SPI** bruger fire signaler: **SCLK** (clock fra master), **MOSI** (master out, slave in), **MISO** (master in, slave out) og **CS/SS** (chip select, **aktiv lav**, én pr. slave).\n\nEgenskaber:\n• **Én master**, mange slaves.\n• **Ingen adresser**: slaven vælges ved at trække dens CS lav.\n• **Full duplex**: der sendes og modtages samtidig på MOSI/MISO.\n• **Ingen ACK**: masteren ved ikke, om slaven hørte noget.\n• Høj hastighed (MHz) og push-pull-drivere.\n\n**SPI mode 0-3** bestemmes af **CPOL** (clockens hvileniveau) og **CPHA** (sample på første eller anden kant). Master og slave skal være enige.\n\nPrisen for hastigheden er flere ben: 3 + én CS pr. enhed.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvordan vælger en SPI-master, hvilken slave den taler med?',
      svar: [
        'Med en 7-bit adresse først i overførslen',
        'Med den SPI mode, der vælges inden overførslen',
        'Ved at trække slavens chip select (CS) lav',
        'Slaven melder sig selv ved at svare med et ACK'
      ],
      rigtigt: 2,
      forklaring: 'SPI har ingen adressering. Hver slave har sin egen CS-linje.',
    },
    {
      id: 'k5', type: 'koncept', orden: 5,
      hook: 'Én ioctl, én struct og både send og modtag på samme tid.',
      body: '**spidev** giver `/dev/spidevB.C`, fx `/dev/spidev0.0` for bus 0 og chip select 0.\n\nKonfiguration med ioctl:\n`SPI_IOC_WR_MODE` (mode 0-3)\n`SPI_IOC_WR_BITS_PER_WORD` (typisk 8)\n`SPI_IOC_WR_MAX_SPEED_HZ`\n\nEn **full-duplex transfer**:\n`struct spi_ioc_transfer tr = {};`\n`tr.tx_buf = (unsigned long)tx;`\n`tr.rx_buf = (unsigned long)rx;`\n`tr.len = 2;`\n`ioctl(fd, SPI_IOC_MESSAGE(1), &tr);`\n\n**BMI160 (IMU)**: for at **læse** et register sætter man **bit 7** i registeradressen: `tx[0] = 0x80 | reg`. Den anden byte er dummy, mens svaret kommer i `rx[1]`. Register `0x00` (CHIP_ID) skal returnere **0xD1**, et godt første sanity-tjek.',
    },
    {
      id: 'k5q', type: 'quiz', om: 'k5',
      sporgsmal: 'Du vil læse CHIP_ID (register 0x00) fra en BMI160 over SPI. Hvad sender du som første byte?',
      svar: [
        '0x7F',
        '0x00',
        '0xD1',
        '0x80'
      ],
      rigtigt: 3,
      forklaring: 'Bit 7 = 1 betyder læs. 0x80 | 0x00 = 0x80. Svaret (0xD1) kommer i næste byte af rx-bufferen.',
    },
    {
      id: 'kode1', type: 'quiz', efter: 'k3',
      sporgsmal: 'Hvad gør koden?',
      kode: 'int fd = open("/dev/i2c-1", O_RDWR);\nioctl(fd, I2C_SLAVE, 0x3C);\nuint8_t cmd[] = {0x00, 0xAF};\nwrite(fd, cmd, 2);',
      svar: [
        'Skriver pixeldata 0xAF til skærmens hukommelse',
        'Læser to bytes fra register 0xAF på enheden',
        'Sender kommandoen 0xAF (display on) til displayet',
        'Sætter slaveadressen på bussen til værdien 0xAF'
      ],
      rigtigt: 2,
      forklaring: 'Control byte 0x00 betyder kommando. 0xAF er SSD1306\'s »display on«. Med 0x40 ville resten være pixeldata.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'SPI bruger adresser ligesom I2C til at vælge enheden.',
      rigtigt: 0,
      forklaring: 'Myte. SPI vælger slave med chip select-linjen. Adresser, du ser i SPI-kode (fx BMI160), er registre inde i den valgte enhed.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k2',
      sporgsmal: 'Sæt et I2C register-read i rækkefølge',
      trin: [
        'START',
        'Slaveadresse + W, slave ACK',
        'Registeradresse, slave ACK',
        'Repeated START',
        'Slaveadresse + R, slave ACK',
        'Slave sender data, master NACK',
        'STOP',
      ],
      forklaring: 'Repeated START skifter retning uden at slippe bussen. Masterens NACK fortæller slaven, at den ikke vil have flere bytes.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k4',
      sporgsmal: 'Sammenlign I2C og SPI – arkitektur og protokol.',
      punkter: [
        { tekst: 'I2C: SDA + SCL, open-drain med pull-ups', ord: ['sda', 'scl', 'open-drain', 'pull-up'] },
        { tekst: 'I2C: 7-bit adresser, ACK, multi-master', ord: ['adresse', 'ack', 'multi-master'] },
        { tekst: 'SPI: SCLK, MOSI, MISO, CS pr. slave', ord: ['mosi', 'miso', 'sclk', 'chip select', 'cs'] },
        { tekst: 'SPI: full duplex, ingen adresser, ingen ACK, hurtigere', ord: ['full duplex', 'hurtig', 'ingen ack'] },
        { tekst: 'Trade-off: ben/ledninger vs hastighed', ord: ['ben', 'ledning', 'trade'] },
      ],
    },
    {
      id: 'f2', type: 'forklar', efter: 'k3',
      sporgsmal: 'Hvordan kommunikerer du med en I2C-enhed fra user space i Linux?',
      punkter: [
        { tekst: 'open("/dev/i2c-1")', ord: ['/dev/i2c', 'open'] },
        { tekst: 'ioctl(fd, I2C_SLAVE, adresse)', ord: ['i2c_slave', 'ioctl'] },
        { tekst: 'write for at sende, read for at modtage', ord: ['write', 'read'] },
        { tekst: 'I2C_RDWR / SMBus til repeated start', ord: ['i2c_rdwr', 'smbus', 'repeated'] },
        { tekst: 'i2cdetect til at finde enheden', ord: ['i2cdetect', 'i2cget', 'i2cset'] },
        { tekst: 'Eksempel: OLED på 0x3C med control byte', ord: ['oled', '0x3c', 'control byte', 'ssd1306'] },
      ],
    },
    {
      id: 'f3', type: 'forklar', efter: 'k5',
      sporgsmal: 'Forklar spidev-interfacet med BMI160 som eksempel.',
      punkter: [
        { tekst: '/dev/spidev0.0 (bus og chip select)', ord: ['spidev'] },
        { tekst: 'Konfiguration: mode, bits per word, max speed via ioctl', ord: ['mode', 'speed', 'bits_per_word', 'cpol', 'cpha'] },
        { tekst: 'struct spi_ioc_transfer med tx_buf, rx_buf, len', ord: ['spi_ioc_transfer', 'tx_buf', 'rx_buf'] },
        { tekst: 'ioctl SPI_IOC_MESSAGE – full duplex', ord: ['spi_ioc_message', 'full duplex'] },
        { tekst: 'BMI160: bit 7 = læs, CHIP_ID = 0xD1', ord: ['0x80', 'bit 7', 'chip_id', '0xd1', 'bmi160'] },
      ],
    },
  ],
};
