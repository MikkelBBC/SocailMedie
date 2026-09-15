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

**Det, vi bevidst ikke gør:** ingen passiv uendelig scroll (der kommer altid en
quiz efter 2 koncepter), ingen straf for fejl (fejl er læring), og »Dagens mål«
anbefaler at stoppe.

## 3. Eksamenssimulatoren

1. **Træk emne** (1-12, tilfældigt) med en slot-animation.
2. **2 minutters forberedelse**: skriv stikord til en disposition.
3. **Sammenlign** med modeldispositionen og sæt flueben ved det, du dækkede.
4. **Eksaminator spørger** 3 gange. Spørgsmålene vælges blandt emnets forklar-kort, dem du husker dårligst først.
5. **Resultat**: disposition %, svar %, parathed før → efter. Svarene går ind i FSRS.

## 4. Parathed

`parathed(emne)` = gennemsnit over emnets kort af FSRS-retrievability **på eksamensdagen**
(eller om 7 dage, hvis datoen ikke er sat). Kort, man aldrig har besvaret, tæller som 0.
Basics vægter halvt i totalen. Svage emner får vægt 0,6–1,8 i feedets valg af nyt stof.

## 5. Indhold

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
