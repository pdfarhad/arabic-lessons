# Working Notes

## Standing decisions (dated, user's words)

- **2026-08-23 — Publish to GitHub Pages as part of finishing.** User: "github publish"
  (initial /learn request) and chose "Public repo + Pages". Repo: `arabic-lessons` on
  `pdfarhad`. Every finished unit gets built into `docs/` and pushed; report the URL.
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
- **Numbering**: lessons `0001…`; reading chapters and flashcard decks are separate
  categories with their own numbering (never in the lesson sequence).
- Tanwin: the book prints full tanwin in drills (مُدَرِّسٌ) but drops it in some pausal
  dialogue lines. Keep whatever the page prints; teach the pausal-form point once.
