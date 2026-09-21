# Leths super App – design og forskning

En scroll-feed som TikTok/Instagram, bygget til **mundtlig eksamen i SW3SYS**.
Hver mekanik, der gør appen svær at lægge fra sig, skal også være en mekanik,
der dokumenteret får viden til at sidde.

## 1. Hvad virker til mundtlig eksamen

| Princip | Hvad forskningen siger | Sådan er det i appen |
|---|---|---|
| **Test dig selv i stedet for at genlæse** | Practice testing slår genlæsning og alle andre sammenligninger. Effekten er størst, når øve-formatet matcher eksamensformatet (Adesope m.fl. 2017, 272 effektstørrelser) | Hvert koncept efterfølges af quiz, og mundtlige spørgsmål trænes som **🎤 Forklar højt** |
| **Producér, genkend ikke** | Til en mundtlig eksamen skal svaret produceres. Selvforklaring giver g ≈ 0,55 (Bisra m.fl. 2018) | Forklar højt med optagelse eller skrift. Tjeklisten over punkter vises først bagefter |
| **Successive relearning** | Hent korrekt frem 3 gange, og genlær over flere dage. Det har forbedret eksamensresultater i alle publicerede studier (Rawson & Dunlosky) | ⭐ »Mestret« = rigtigt på 3 forskellige dage. FSRS planlægger gentagelserne |
| **Spacing** | Spredt øvning slår massed practice (g ≈ 0,28–0,43) | FSRS-5 planlægger hvert kort. Tæt på eksamen øges andelen af gentagelser |
| **Interleaving** | Blandede emner kræver, at man vælger den rigtige viden, ligesom til eksamen, hvor emnet trækkes tilfældigt | Feedet blander emner. Simulatoren trækker tilfældigt |
| **Illusion of competence** | Genlæsning føles som læring og giver overmod. Hentning giver ærligere selvvurdering | **Parathed %** er FSRS\' forudsigelse for eksamensdagen, ikke en følelse |
| **Parsons-opgaver** | Rækkefølge-opgaver lærer lige så meget som at skrive koden, men hurtigere (Ericson m.fl.) | 🧱 Rækkefølge-kort: syscall, interrupt, I2C, driver-read … |
| **Kode-læsning** | At spore kode træner forståelse, der overføres til at skrive den | Kode-quizzer: fork×2, lambda captures, Makefile, variant/visit |
| **Gæt først** | En informationskløft aktiverer nysgerrighed og styrker hukommelsen (Gruber, PACE) | 30 % af nye koncepter starter med et gæt |
| **Hypercorrection** | Fejl, man var sikker på, huskes bedst efter feedback (Metcalfe) | Sikkerheds-væddemål: Gætter / Tror / Sikker |
| **Mindre eksamensangst** | 72 % af eleverne rapporterede mindre nervøsitet efter retrieval practice (Agarwal 2014) | Simulatoren øver selve situationen: træk emne, disposition, spørgsmål |
| **Koblinger** | Eksaminator spørger ind til relaterede emner | 6 guld-koblingskort, fx fork + paging (copy-on-write) og poll + driver wait queue |

## 2. Vanedannende, men lærende

| Mekanik | Holder dig fast | Lærer dig |
|---|---|---|
| Mystery-kiste og ×3 bonus | Variabel belønning | Overraskelse (reward prediction error) styrker hukommelsen |
| Stories-slides | Kendt Instagram-gestus | Segmentering i eget tempo |
| Streak, level, dagens mål | Loss aversion og goal gradient | Daglig spacing |
| Parathed-ring pr. emne | Samlemani: få alle 12 emner op | Viser ærligt, hvor hullerne er |
| Svageste emne-knap | Klar næste handling | Øvelsestid bruges der, hvor den gør mest gavn |
| Varme gradienter | Lyst og indbydende | Emotional design: d ≈ 0,33–0,39 på retention og transfer |
| 🎯 Dagens missioner (3 om dagen, case pr. mission, bonus-case ≥ Restricted) | Nye mål hver dag, nedtælling til nye missioner, samlemani | Missionerne peger på det, der lærer mest: sikker genkaldelse, forklar højt, svageste emne, gentagelser og simulering |
| Combo-meter og lyd | Ringen fyldes mod næste case, tonen stiger for hvert rigtigt svar, og combo'en knækker synligt | Belønner rigtige svar i træk, altså faktisk hentning og ikke hurtige gæt |
| »Tæt på«-teasers under svaret | Goal gradient: »1 rigtigt mere til næste case«, »1 kort fra en ny kobling«, »Mission 4/5« | Gør det tydeligt, at næste kort er værd at hente frem |
| Level-titler og level-case | Identitet (»Mutex-mester«) og en belønning ved hver level | Kun XP fra svar kan give en level-case, så cases aldrig udløser flere cases |
| ☀️ Dagens første svar: XP ×2 i 10 min | Grund til at åbne appen hver dag | Daglig spacing i stedet for at klemme det hele ind dagen før |
| 🖼️ Analogi, tegning og trin på de svære koncepter | Man kan overskue kortet i stedet for at give op | Analogi giver en kendt knage at hænge det nye på (Gentner), tegning + tekst huskes bedre end tekst alene (Mayer), og trin gør en usynlig proces synlig i rækkefølge |
| 🎯 »Kernen i emnet«: de 5-6 sætninger, en censor venter på | Gør et stort emne overskueligt: man kan se, hvor lidt der skal til for at være med | Hentning virker bedst, når man ved, hvad man skal hente. Kernen står i emne-arket og efter hver simulering |

**Sådan føles det rart at bruge** (ud fra almindelige anbefalinger for
mikrointeraktioner): ét sæt animationstider i hele appen (110 ms til tryk,
200 ms til skift, 320 ms til noget, der fejres) med samme fjeder-kurve, fordi
under 100 ms ikke opfattes og over 300 ms føles langsomt. Det rigtige svar
kvitterer med et hak, der tegner sig selv. Vibration er reserveret til fejl og
milepæle: vibrerer man ved hvert eneste rigtige svar, holder man op med at
mærke det. Alt respekterer `prefers-reduced-motion`.

**Fjernet igen:** casinoet (lykkehjul, skrabelod, indsatser og mønter). Det trak
opmærksomheden væk fra det, appen er til. Tilbage er kun mystery-casen, som
udløses af rigtige svar i træk.

**Det, vi bevidst ikke gør:** ingen passiv uendelig scroll (der kommer altid en
quiz efter 2 koncepter), ingen straf for fejl (fejl er læring), og »Dagens mål«
anbefaler at stoppe.

## 3. Ærlige spørgsmål

Et multiple choice-spørgsmål må ikke kunne løses uden viden. To mønstre er
farlige, fordi de sniger sig ind af sig selv:

| Fælde | Hvorfor den opstår | Sådan holdes den ude |
|---|---|---|
| Det rigtige svar er længst | Forfatteren pakker alle forbeholdene ind i det rigtige svar | `node tools/svarlaengde.mjs` måler forskellen. Validatoren fejler, hvis det rigtige svar er mindst 12 tegn og 25 % længere end de andre |
| Det rigtige svar står samme sted | Man skriver det rigtige først og finder på distraktorer bagefter | Svarene er blandet deterministisk. Validatoren fejler, hvis en plads har over 40 % af de rigtige svar |

Distraktorerne skal desuden være **plausible**: en distraktor, ingen kan vælge,
gør spørgsmålet til et 3-valg forklædt som et 4-valg.

## 4. Eksamenssimulatoren

1. **Træk emne** (1-12, tilfældigt) med en slot-animation.
2. **2 minutters forberedelse**: skriv stikord til en disposition.
3. **Sammenlign** med modeldispositionen og sæt flueben ved det, du dækkede.
4. **Eksaminator spørger** 3 gange. Spørgsmålene vælges blandt emnets forklar-kort, dem du husker dårligst først.
5. **Resultat**: disposition %, svar %, parathed før → efter. Svarene går ind i FSRS.

## 5. Parathed

`parathed(emne)` = gennemsnit over emnets kort af FSRS-retrievability **på eksamensdagen**
(eller om 7 dage, hvis datoen ikke er sat). Kort, man aldrig har besvaret, tæller som 0.
Basics vægter halvt i totalen. Svage emner får vægt 0,6–1,8 i feedets valg af nyt stof.

## 6. Fagene

SW3SYS er eksamensfaget. Resten er der, fordi blandet træning (interleaving)
virker bedre end at læse ét emne ad gangen, og fordi koblinger på tværs gør
begge sider lettere at huske: AI og teknologi hænger direkte sammen med
operativsystemer, algoritmer og psykologi.

## 7. Indhold

`public/data/sw3sys/` – ét modul pr. emne (t00 basics + t01-t12) plus koblinger.
205 kort: 58 koncepter, 72 quizzer (inkl. kode), 38 forklar-højt, 13 myter,
10 rækkefølge, 8 cases, 6 koblinger. Hvert emne har en modeldisposition.

Tjek indholdet med `node tools/valider.mjs` og feed-mixet med `node tools/simuler-feed.mjs`.

⚠️ Indholdet er skrevet ud fra kursusbeskrivelsen og standardlitteratur
(Silberschatz, Linux-dokumentation, C++-standarden), ikke ud fra jeres egne slides.
Tjek detaljer mod lektionerne, især øvelsesspecifikke ting.

## Kilder

- Practice testing, metaanalyse: https://journals.sagepub.com/doi/abs/10.3102/0034654316689306
- Successive relearning: https://link.springer.com/article/10.1007/s10648-013-9240-4 · https://journals.sagepub.com/doi/full/10.1177/09637214221100484
- Selvforklaring: https://link.springer.com/article/10.1007/s10648-018-9434-x
- Spacing og retrieval, matematik: https://link.springer.com/article/10.1007/s10648-025-10035-1
- Illusion of competence: https://link.springer.com/article/10.3758/BF03193244
- Parsons problems: https://dl.acm.org/doi/10.1145/3141880.3141895
- Retrieval practice og eksamensangst: https://theeffortfuleducator.com/2019/05/14/retrieval-practices-impact-on-test-anxiety-and-stress/
- FSRS: https://faqs.ankiweb.net/what-spaced-repetition-algorithm
- Nysgerrighed/PACE: https://pubmed.ncbi.nlm.nih.gov/31706791/
- Hypercorrection: https://link.springer.com/article/10.3758/s13423-011-0173-y
- Reward prediction error: https://www.nature.com/articles/s41562-019-0597-3
- Gamification, metaanalyse: https://eric.ed.gov/?id=EJ1245270
- Segmentering: https://link.springer.com/article/10.1007/s10648-018-9456-4
- Emotional design: https://www.sciencedirect.com/science/article/abs/pii/S1747938X18302148
- Short-form video og opmærksomhed: https://pubmed.ncbi.nlm.nih.gov/41231585/
