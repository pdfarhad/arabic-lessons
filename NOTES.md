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
- **Public build**: `scripts/build-public.sh` → `docs/`, served by GitHub Pages
  (repo `pdfarhad/arabic-lessons`, site https://pdfarhad.github.io/arabic-lessons/,
  Pages source: main branch `/docs`). Rebuild docs/ and commit it whenever pages
  change. `.gitignore` keeps `library/raw/` (copyrighted book scans), `highlights/`
  and `quiz-results/` (personal learning state) out of the public repo.
  Highlighter (agent-only) is stripped; quiz stays but self-disables persistence off
  localhost (guard added in `assets/quiz.js` `record()`); flashcards/builder/audio are
  client-side and ship as-is. Footers are written deploy-agnostically.
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
