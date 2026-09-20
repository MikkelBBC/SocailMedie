// Teknologi: hvad der sker, fra du trykker enter, til siden er der.
import { box, txt, pil, svg, INK, LINE, BG } from '../forklaringer.js';

const ROSA = { fill: '#ffe9f1', stroke: '#f7b8d0' };
const BLAA = { fill: '#eef1ff', stroke: '#c5cdf7' };
const GROEN = { fill: '#e8faf1', stroke: '#b6e8cd' };
const HVID = { fill: '#fff' };
const ROED = '#c0392b';

export default {
  spor: {
    id: 'internet', nr: 0, titel: 'Internettet bag skærmen', kort: 'Internet', emoji: '🌍',
    farve: '#0072FF', gradient: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
  },
  kort: [
    {
      id: 'k1', type: 'koncept', orden: 1,
      hook: 'Der går ingen ledning fra din telefon til YouTube. Din video kommer i små pakker ad forskellige veje.',
      body: 'Internettet sender **pakker**. En video, en besked eller et billede hakkes i små stykker, og hvert stykke får en konvolut med afsender- og modtager-**IP-adresse**.\n\nHver pakke finder sin egen vej. En **router** kigger kun på modtageradressen og sender pakken videre til den nabo, der ser ud til at være tættest på målet. Ingen router kender hele vejen.\n\nDet betyder, at pakker kan:\n• komme frem i **forkert rækkefølge**,\n• blive **væk** undervejs,\n• tage **forskellige ruter** for den samme video.\n\nDet lyder som et rod, men det er netop styrken. Falder en forbindelse ud, finder pakkerne bare en anden vej. Netværket er robust, fordi ingen enkelt maskine har ansvaret for helheden.\n\nAt sætte stykkerne rigtigt sammen igen er ikke IP\'s job. Det er TCP\'s.',
      analogi: 'Du sender en bog til en ven ved at rive den i 300 sider, lægge hver side i sin egen konvolut og smide dem i postkassen. Postvæsenet finder selv vejen, og din ven sætter dem i rækkefølge efter sidetallet.',
      figur: {
        titel: 'Pakker finder hver sin vej',
        svg: svg(180, `
          ${box(10, 66, 66, 40, 'Dig', { ...GROEN, size: 11 })}
          ${box(244, 66, 66, 40, 'Server', { ...GROEN, size: 11 })}
          ${box(112, 20, 44, 26, 'R', { ...BLAA, size: 10 })}
          ${box(180, 40, 44, 26, 'R', { ...BLAA, size: 10 })}
          ${box(112, 112, 44, 26, 'R', { ...BLAA, size: 10 })}
          ${box(180, 128, 44, 26, 'R', { ...BLAA, size: 10 })}
          ${pil(78, 78, 110, 40)}
          ${pil(158, 33, 178, 48)}
          ${pil(226, 53, 244, 74)}
          ${pil(78, 96, 110, 122, { farve: '#11998E' })}
          ${pil(158, 128, 178, 138, { farve: '#11998E' })}
          ${pil(226, 138, 246, 102, { farve: '#11998E' })}
          ${txt(160, 170, 'Samme fil, to pakker, to ruter', { size: 11, farve: INK })}`),
        tekst: 'Routerne kender kun næste skridt. Det er derfor internettet overlever, at dele af det går ned.',
      },
    },
    {
      id: 'k1q', type: 'quiz', om: 'k1',
      sporgsmal: 'Hvad kigger en router på, når den sender en pakke videre?',
      svar: [
        'Hele indholdet af pakken',
        'Modtagerens IP-adresse og sin egen tabel over næste skridt',
        'Afsenderens adgangskode',
        'Hvor stor pakken er',
      ],
      rigtigt: 1,
      forklaring: 'Routeren kender ikke hele ruten. Den sender bare videre mod den nabo, der ifølge tabellen er tættest på målet.',
    },
    {
      id: 'k2', type: 'koncept', orden: 2,
      hook: 'Du skriver et navn. Computeren skal bruge et nummer. DNS er oversætteren.',
      body: 'Maskiner finder hinanden med tal som 142.250.74.46, ikke navne. **DNS** er internettets telefonbog, der oversætter et domænenavn til en IP-adresse.\n\nOpslaget går i trin:\n1. Har din computer eller browser svaret i sin **cache**, er vi færdige med det samme.\n2. Ellers spørger den en **resolver**, typisk hos dit internetselskab.\n3. Resolveren spørger en **rodserver**: »hvem ved noget om .dk?«\n4. Så spørger den .dk-serveren: »hvem ved noget om dr.dk?«\n5. Til sidst svarer dr.dk\'s egen navneserver med IP-adressen.\n\nSvaret gemmes undervejs med en udløbstid (**TTL**). Derfor tager det et stykke tid, før en flyttet hjemmeside er flyttet for alle.\n\nDNS er også et yndet angrebspunkt. Kan nogen svare falsk på et opslag, kan de sende dig til deres egen server, selvom du skrev det rigtige navn. Det er en af grundene til, at HTTPS og certifikater findes.',
      analogi: 'Du kender navnet på en person, men ikke nummeret. Du ringer til oplysningen. De spørger videre opad, til nogen kender svaret, og du får nummeret tilbage.',
      figur: {
        titel: 'Et DNS-opslag',
        svg: svg(200, `
          ${box(14, 16, 130, 26, 'Din browser', { ...HVID, size: 11 })}
          ${pil(79, 46, 79, 62)}
          ${box(14, 64, 130, 26, 'Cache? Nej', { ...ROSA, size: 10 })}
          ${pil(79, 94, 79, 110)}
          ${box(14, 112, 130, 26, 'Resolver', { ...BLAA, size: 11 })}
          ${pil(148, 125, 176, 40)}
          ${box(180, 26, 126, 26, 'Rodserver → .dk', { ...GROEN, size: 10 })}
          ${box(180, 62, 126, 26, '.dk → dr.dk', { ...GROEN, size: 10 })}
          ${box(180, 98, 126, 26, 'dr.dk → 13.32.x.x', { ...GROEN, size: 10 })}
          ${pil(180, 138, 148, 138)}
          ${box(14, 150, 292, 26, 'Svar: IP-adressen (gemmes indtil TTL udløber)', { fill: BG, size: 10 })}`),
        tekst: 'Hvert trin kender kun næste trin. Svaret caches, så det næste opslag er øjeblikkeligt.',
      },
    },
    {
      id: 'k2q', type: 'quiz', om: 'k2',
      sporgsmal: 'Hvorfor kan en flyttet hjemmeside stadig være »det gamle sted« for nogle brugere?',
      svar: [
        'Fordi routere er langsomme',
        'Fordi det gamle DNS-svar stadig ligger i caches, indtil TTL udløber',
        'Fordi HTTPS blokerer flytninger',
        'Fordi IP-adresser ikke kan ændres',
      ],
      rigtigt: 1,
      forklaring: 'DNS-svar caches med en udløbstid. Derfor sætter man ofte TTL lavt før en planlagt flytning.',
    },
    {
      id: 'k3', type: 'koncept', orden: 3,
      hook: 'TCP ringer op og tjekker alt. UDP råber bare ud i rummet. Begge dele er rigtige.',
      body: 'Når pakkerne er fremme, skal nogen tage ansvar for, om de kom frem i rigtig rækkefølge. Det er transportlagets opgave, og der er to hovedmåder.\n\n**TCP** laver en forbindelse først (det berømte trevejs-håndtryk: SYN, SYN-ACK, ACK). Derefter nummereres alle pakker, modtageren kvitterer, og det, der mangler, sendes igen. TCP styrer også farten, så nettet ikke drukner.\n\n**UDP** har ingen forbindelse og ingen kvittering. Pakken sendes, og hvad der sker, sker.\n\nValget handler om, hvad der gør mest ondt: at vente eller at miste lidt.\n• Hjemmesider, filer og mails: **TCP**. En manglende byte i en fil er ikke i orden.\n• Live video, spil og opkald: typisk **UDP**. Et tabt billede i en video er bedre end en samtale, der hakker, fordi den venter på noget gammelt.',
      analogi: 'TCP er anbefalet post med kvittering. UDP er at råbe over hækken til naboen: hurtigt, og du ved ikke sikkert, om beskeden blev hørt.',
      figur: {
        titel: 'TCP mod UDP',
        svg: svg(190, `
          ${txt(80, 12, 'TCP', { farve: '#3b3f9e', size: 12 })}
          ${box(14, 24, 132, 22, 'SYN →', { ...BLAA, size: 10 })}
          ${box(14, 50, 132, 22, '← SYN-ACK', { ...BLAA, size: 10 })}
          ${box(14, 76, 132, 22, 'ACK →', { ...BLAA, size: 10 })}
          ${box(14, 102, 132, 22, 'data + kvittering', { ...GROEN, size: 10 })}
          ${txt(80, 142, 'Kommer altid frem', { size: 10 })}
          ${txt(80, 158, 'i rigtig rækkefølge', { size: 10 })}
          ${txt(240, 12, 'UDP', { farve: '#a3123f', size: 12 })}
          ${box(174, 24, 132, 22, 'data →', { ...ROSA, size: 10 })}
          ${box(174, 50, 132, 22, 'data →', { ...ROSA, size: 10 })}
          ${box(174, 76, 132, 22, 'data → (tabt)', { fill: '#f1f1f1', stroke: LINE, farve: '#b0b0b0', size: 10 })}
          ${box(174, 102, 132, 22, 'data →', { ...ROSA, size: 10 })}
          ${txt(240, 142, 'Ingen ventetid', { size: 10 })}
          ${txt(240, 158, 'Noget kan mangle', { size: 10 })}`),
        tekst: 'TCP bruger tid på at være sikker. UDP bruger tiden på at være fremme nu.',
      },
    },
    {
      id: 'k3q', type: 'quiz', om: 'k3',
      sporgsmal: 'Hvorfor bruger live video og online spil typisk UDP?',
      svar: [
        'UDP er krypteret',
        'Det er bedre at miste et enkelt billede end at vente på en gensendelse',
        'UDP kan sende større pakker',
        'TCP virker ikke på mobilnet',
      ],
      rigtigt: 1,
      forklaring: 'Gammel data har ingen værdi i realtid. Forsinkelse gør mere skade end et tabt billede.',
    },
    {
      id: 'k4', type: 'koncept', orden: 4,
      hook: 'Hængelåsen betyder ikke »denne side er god«. Den betyder »ingen andre kan læse med«.',
      body: '**HTTPS** er HTTP inde i en krypteret tunnel (TLS). Tre ting sker, før den første byte af siden bliver sendt:\n\n1. **Identitet**: serveren sender sit **certifikat**, underskrevet af en certifikatmyndighed, som din browser i forvejen stoler på. Din browser tjekker underskriften og navnet.\n2. **Nøgleudveksling**: de to parter bliver enige om en fælles hemmelig nøgle, uden at nogen, der lytter med, kan regne den ud.\n3. **Kryptering**: resten af samtalen krypteres med den nøgle.\n\nDerfor kan caféens wifi se, at du besøger dr.dk, men ikke hvilken artikel du læser eller hvad du skriver.\n\nDen almindeligste misforståelse er, at hængelåsen betyder, at siden er til at stole på. Enhver kan få et gyldigt certifikat til sit eget domæne, også svindlere. Hængelåsen siger noget om **forbindelsen**, ikke om **afsenderens hensigter**. Kig på navnet i adresselinjen, ikke på låsen.',
      analogi: 'Et forseglet brev fra et notarbekræftet kontor. Du ved, at brevet ikke er blevet læst undervejs, og at det kommer fra den adresse, der står på det. Du ved ikke, om indholdet er ærligt.',
      hvorfor: 'Det er derfor phishing-sider også har hængelås: de har bare et certifikat til deres eget, næsten-rigtige domænenavn.',
    },
    {
      id: 'k4q', type: 'quiz', om: 'k4',
      sporgsmal: 'Hvad garanterer hængelåsen i browseren?',
      svar: [
        'At hjemmesiden er troværdig',
        'At forbindelsen er krypteret, og at domænet matcher certifikatet',
        'At siden ikke indeholder virus',
        'At ejeren er registreret i Danmark',
      ],
      rigtigt: 1,
      forklaring: 'Den siger noget om forbindelsen og navnet, ikke om indholdet eller hensigten bag siden.',
    },
    {
      id: 'myte1', type: 'myte', efter: 'k4',
      pastand: 'Hængelåsen ved siden af adressen betyder, at siden er sikker at handle på.',
      rigtigt: 0,
      forklaring: 'Myte. Den betyder krypteret forbindelse til det domæne, der står i adresselinjen. En svindelside kan sagtens have hængelås.',
    },
    {
      id: 'seq1', type: 'raekkefolge', efter: 'k2',
      sporgsmal: 'Sæt trinnene i rækkefølge, fra du trykker enter, til siden vises',
      trin: [
        'Browseren slår domænet op i DNS og får en IP-adresse',
        'TCP-forbindelsen sættes op med et trevejs-håndtryk',
        'TLS: certifikat tjekkes, og en fælles nøgle aftales',
        'HTTP-forespørgslen sendes krypteret',
        'Serveren svarer, og browseren tegner siden',
      ],
      forklaring: 'Navn til adresse, forbindelse, kryptering, forespørgsel, svar. Det sker typisk på under et halvt sekund.',
    },
    {
      id: 'f1', type: 'forklar', efter: 'k4',
      sporgsmal: 'Forklar, hvad der sker, fra du skriver dr.dk og trykker enter.',
      punkter: [
        { tekst: 'DNS oversætter navnet til en IP-adresse', ord: ['dns', 'navn', 'ip'] },
        { tekst: 'Data sendes i pakker, routere finder vejen', ord: ['pakke', 'router', 'vej'] },
        { tekst: 'TCP sætter forbindelsen op og sikrer rækkefølgen', ord: ['tcp', 'håndtryk', 'rækkefølge'] },
        { tekst: 'TLS: certifikat og fælles nøgle', ord: ['tls', 'certifikat', 'nøgle', 'https'] },
        { tekst: 'Serveren svarer med HTML, som browseren tegner', ord: ['svar', 'html', 'tegner'] },
      ],
    },
  ],
};
