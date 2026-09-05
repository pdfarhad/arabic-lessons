# Working Notes

## Standing decisions (dated, user's words)

- **2026-08-23 — Publish as part of finishing.** User: "github publish" (initial /learn
  request) and chose "Public repo + Pages". Repo: `arabic-lessons` on `pdfarhad`. Every
  finished unit gets built into `docs/` and pushed.
- **2026-08-30 — The public URL is pdfarhad.com/learning/arabic.** User: "please make
  sure everything is published to pdfarhad.com/learning/arabic". The personal site
  (`~/Works/personal_site/pdfarhad.github.io`, Astro on Cloudflare Workers) mounts
  `arabic-lessons@main:docs/` at build time via `scripts/sync-learning.mjs`; the
  github.io Pages URL is only the source feed. Cloudflare rebuilds on pushes to the
  *site* repo, not on course pushes, so **after every `arabic-lessons` push also run**
  `cd ~/Works/personal_site/pdfarhad.github.io && git commit --allow-empty -m "Rebuild:
  arabic course updated" && git push origin master` (the site repo's branch is
  **master**) and report the pdfarhad.com URL once it answers.
  (The automatic paths — site repo secret `CF_DEPLOY_HOOK`, course repo workflow
  `notify-site.yml` + `SITE_DISPATCH_PAT` — are not configured as of 2026-08-30.)
- **2026-09-05 — Readers' progress is saved in their browser.** User: "for outside
  visitor of my site and avid reader who wants to save the progress of their learning,
  make sure you save their progress on their client side aka browser. have a
  localstorage mechanism for it." Every page carries `assets/progress.js` (wired by
  `scripts/wire-progress.py`); one localStorage record per course, keyed by
  `COURSE_MAP.id`. This is the convention for **every** public course on pdfarhad.com,
  since they all share one origin. See learning record 0007.
- **2026-08-23 — Grammar practice format.** User chose "Builder + MCQ mix": tap-to-order
  sentence builder (assets/builder.js) plus agreement MCQs in the quiz widget.
- **2026-08-23 — No transliteration.** User reads and writes the script already. Lessons,
  flashcards and readers show fully-vocalised Arabic + English gloss + audio only.

## Workspace conventions

- **Course material**: photos of *Al-Arabiyyah Bayna Yadayk* Book 1 units land in
  `library/raw/Lesson N/`. Ingest → transcribe to `library/readable/lesson-NN.md` →
  catalog in LIBRARY.md → author the unit's artifacts.
- **Per unit, the artifact set is**: `lessons/00NN-*.html` (frames + quiz + sentence
  builder), `reading/00NN-*.html` (dialogues line-by-line, audio + reveal, closed by
  default), `vocab/00NN-flashcards.html` (flip-card deck), `assets/vocab-lNN.js` (one
  word set per chapter, dictionary-check header), `knowledge/00NN-*.md`.
- **Audio**: browser speechSynthesis, `lang="ar-SA"`, via `assets/audio.js`. Derived from
  the printed vocalised text; overrides only where print ≠ speech, noted per line.
- **Saved progress** (2026-09-05): `assets/progress.js`, plain script, wired on every
  page right after nav.js by `scripts/wire-progress.py` (idempotent; `--check`; run it
  on every new page, alongside wire-theme.py). Keeps `learn:progress:<COURSE_MAP.id>`
  in localStorage: per page id (`<body data-lesson>`) first/last visit, the last
  session's tally (n / did / ok), best ok, and done. It only *reads* the widgets' DOM:
  `data-result="ok|bad"` on `.build` (builder now stamps it; a reset keeps the miss
  count), `.gap`, `.q`, `.match .from > li`, and `data-progress="known/total"` on the
  flashcard `#deck` (known = words with a streak). Answers are not restored on reload —
  scores and done are. Renders a status bar under `.meta` (tally · best · mark as done /
  undo), on the index a summary + continue link + reset, ticks on the index list and in
  the drawer. `COURSE_MAP.id` is required (no id → no progress) and must be unique
  across the site's courses; the flashcard streaks live under
  `learn:flashcards:<course>:<deck>` for the same reason. Gated by
  `scripts/test-progress-page.html` and `test-progress-index.html` via
  `sh scripts/test-widgets.sh` (which now runs every `scripts/test-*.html`).
- **Public build**: `scripts/build-public.sh` → `docs/`, served by GitHub Pages
  (repo `pdfarhad/arabic-lessons`, site https://pdfarhad.github.io/arabic-lessons/,
  Pages source: main branch `/docs`). Rebuild docs/ and commit it whenever pages
  change. `.gitignore` keeps `library/raw/` (copyrighted book scans), `highlights/`
  and `quiz-results/` (personal learning state) out of the public repo.
  Highlighter (agent-only) is stripped; quiz stays but self-disables persistence off
  localhost (guard added in `assets/quiz.js` `record()`); flashcards/builder/audio are
  client-side and ship as-is. Footers are written deploy-agnostically.
- **Exams** (2026-09-04, user: "ingest exam 1 folder"): the book's review-test photos land
  in `library/raw/exam N/` → transcribed to `library/readable/exam-NN.md` with the
  paper's marks per exercise and an **agent-worked answer key marked `[key]`** (the
  paper prints no key; never let the key read as the book's text) → catalogued in
  LIBRARY.md with authority "what the class tests on Units …". Exam-only rubric words
  (imperatives, category labels) are flagged at ingest and never added to a unit's word
  set. **Practice-paper page** (2026-09-04, user: "build it"): `exams/x00N-*.html`, nav
  group "Practice Papers", index section 5, own numbering. The paper is reproduced
  exercise for exercise in its own formats and printed order — matching
  (`assets/matching.js` + `.css`, the صِلْ بَيْنَ exercises), recall cards (open "add two
  words"), MCQ (odd one out, نَعَمْ / لا), gap-fill (brackets), a `.passage` block with
  one 🔊 and a closed meaning. Each `<section class="exercise" data-marks=N>` has a
  `.marks` box; `.exam-total[data-total]` is fed by `assets/exam-score.js` from the
  `data-result="ok|bad"` the widgets now stamp (quiz.js, gapfill.js, matching.js);
  **only a first-try answer earns the mark**, retries allowed. Plus a rubric strip
  (recognition) and a reveal for any new shape the paper drags in. Styles in
  `assets/exam.css`. Gates before done: `scripts/check-exam.py` (marks, keys, ids),
  `sh scripts/test-widgets.sh` (click path, headless Chrome), check-lesson. See
  learning record 0006.
- **Numbering**: lessons `0001…`; reading chapters, flashcard decks and topic
  chapters are separate categories with their own numbering (never in the lesson
  sequence).
- **Topic chapters** (added 2026-08-30, user: "make a separate chapter on numbers and
  their different forms"): cross-unit topics live in `chapters/c00N-*.html`, nav group
  "Topic Chapters", own index section, copied by build-public.sh and wired by
  wire-theme.py. Scope rule: class-page material taught in full; pattern-completing
  material shown for recognition only and tagged `<span class="beyond">beyond the
  book</span>` (style in arabic.css), marked ⟂ in the knowledge note, never drilled.
  See learning record 0003.
- **Cumulative chapters** (2026-08-30, user: "the chapter will grow"): `c002-prepositions`
  covers every preposition attested so far and carries a "Coverage so far" ledger. On
  each new unit's ingest, grep the transcription for prepositions / new uses and
  **append** to c002 (ledger row, gap-fill, knowledge note); bump its "covers Units
  1–N" line. Never start a second prepositions chapter. See learning record 0004.
- **Gap-fill practice**: `assets/gapfill.js` + `gapfill.css` — `.gap` block with
  `.task`, `.sentence` (___ marks the blank), `.options` (· separated), `.answer`,
  optional `.why`; an element `#gap-score` shows solved/total. The right widget for a
  small closed set of words (prepositions, particles, endings). Builder = word order,
  quiz = recognition/recall, gap-fill = choice.
- **Reveal scenes**: `assets/reveal.js` + `reveal.css` — beat-by-beat build-ups
  (`.reveal > .beat` with a `.beat-cap` caption each; `.reveal.stack` piles beats
  upward for "floors"). Degrades to the full scene without JS and in print. Use it
  for anything that happens in an order before reaching for prose.
- **Shared table style**: `.ref` (scrolling reference table) now lives in arabic.css,
  not per page.
- **Theme**: user-requested (2026-08-23, "just add fuji theme") — a single optional
  night theme named `fuji` (indigo/snow/dawn-pink), reader-operated toggle, light by
  default. Built from the skill's theme component: `assets/theme.css` + `assets/theme.js`
  + a synchronous head guard on every page. Wiring is owned by `scripts/wire-theme.py`
  (idempotent; `--check` mode; OLD_GUARDS migration list) — never wire by hand. Bright
  plates use `var(--panel)` (defined in arabic.css), never hardcoded #fff, so the theme
  can re-point them. New pages must be run through wire-theme.py.
- Tanwin: the book prints full tanwin in drills (مُدَرِّسٌ) but drops it in some pausal
  dialogue lines. Keep whatever the page prints; teach the pausal-form point once.
- **Lifting a "beyond the book" tag** (2026-09-02, Unit 4 attested السّادِسَة/السّابِعَة
  as clock hours): when a later unit puts a tagged form on a class page, edit the tag
  in place — narrow it to what is still unattested, cite the unit, add at most a short
  callout — and narrow the ⟂ in the knowledge note. Do not restructure the chapter or
  start a new one. See learning record 0005.
- **Time expressions** (2026-09-02): عِنْدَ / بَعْدَ live in c002 (with the grammarians'
  "semi-preposition" caveat stated once); the bare -a time ending (السّاعَةَ، يَوْمَ) is
  c002 §5 "the missing preposition". Lesson pages link there rather than re-explaining.
- **Unit 4 ingest** (2026-09-02): pages 1–4 only (three dialogues + drills; the unit
  title is not on the photos). Names are not carded (precedent from Unit 3).
- **Sentence builders, how many** (2026-09-03, user: "add more of sentence making in
  the chapters, also add similar trick in preposition chapter"): every lesson carries
  ~11 builders and each topic chapter 10–15. The first four are single lines; the rest
  are whole exchanges (question + answer) so both dialogue roles get built, and in c002
  every distractor is another preposition or a wrong ending. `builder.js` shows a
  progress line in `<span id="build-score">` (built / total; a revealed answer counts),
  mirroring the gap-fill's `#gap-score`. Builders stay inside the unit's attested
  frames; a chapter's builders may mix units.
