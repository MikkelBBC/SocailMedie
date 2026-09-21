# Dine eksporter

Her ligger de data, appen eksporterer, så de kan læses igen senere.

## Sådan gemmer du en ny

1. Åbn appen → **Statistik** → nederst: **Del dine data med Claude**.
2. Tryk **Hent som fil** (eller **Del …** på telefonen og send den til dig selv).
3. Læg filen her i mappen. Navnet indeholder datoen, fx `leths-app-data-2026-09-21.json`.
4. Commit den, hvis den skal gemmes for eftertiden:
   `git add fremskridt && git commit -m "Fremskridt 21. september"`

Filerne ligger uden for `public/`, så de bliver **ikke** lagt på den offentlige side.

## Sådan læses de

```bash
node tools/fremskridt.mjs
```

Værktøjet finder den nyeste fil, oversætter kort-id'erne til de rigtige spørgsmål
og skriver, hvad der driller. Det viser også udviklingen, hvis der ligger flere filer.

Vil du se en bestemt fil eller alle:

```bash
node tools/fremskridt.mjs fremskridt/leths-app-data-2026-09-21.json
node tools/fremskridt.mjs --alle
```

## Hvad filen indeholder

| Felt | Betydning |
|---|---|
| `kort` | `id: [antal svar, gange glemt, sidste karakter 1-4, husker nu i %]` |
| `parathed_pr_emne` | FSRS' forudsigelse pr. eksamensemne på eksamensdagen |
| `svaereste_kort` | De 15 kort, der er glemt flest gange |
| `rigtige_pr_korttype` | Træfsikkerhed fordelt på quiz, myte, forklar osv. |
| `rigtige_pr_fag` | Det samme fordelt på fag |
| `aldrig_besvaret` | Kort, der endnu ikke er dukket op |

Der er ingen personlige oplysninger i filen: kun kort-id'er og tal.
