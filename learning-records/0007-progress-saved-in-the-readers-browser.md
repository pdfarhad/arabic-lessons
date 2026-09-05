# A public reader's progress is saved in their own browser, never on a server

The course is public (pdfarhad.com/learning/arabic) and outside readers have no
teaching agent behind the page, so until 2026-09-05 nothing they did survived a
reload: the quiz only persisted to the learn server on localhost, the builder and
gap-fill counted within the page, and the index knew nothing. The user asked for
"outside visitor of my site and avid reader" to have their progress saved "on their
client side aka browser … a localstorage mechanism" (2026-09-05).

**Decision 1 — one record per course in localStorage, keyed `learn:progress:<course id>`.**
`assets/progress.js` keeps, per page, first and last visit, the last session's practice
tally (items, answered, right first try), the best first-try count across sessions, and a
done flag. The course id (`COURSE_MAP.id`, here `arabic`) is part of the key because every
course on pdfarhad.com is served from one origin and would otherwise share (and clobber)
each other's storage; the flashcard streaks moved under the same namespace for the same
reason, with a one-time migration from the old `flashcards-<deck>` key.

**Decision 2 — scores and completion persist; answers do not.** A returning learner gets a
fresh page to practise on, and the record remembers how they did (the bar shows "best").
Restoring every solved builder and answered quiz would have made a lesson un-repeatable
without a reset, and repetition is the point for a spoken-language course. Practice papers
keep their "reload for a clean paper" contract (learning record 0006) and simply gain a
best mark.

**Decision 3 — "done" is earned by finishing every practice item on the page, or claimed
by the reader.** Pages with practice complete themselves; readers and the reference have a
"mark as done" button. Undo is honoured for the session (no re-marking under the reader's
hands). The progress module reads the widgets' existing DOM contract (`data-result`, plus a
`data-progress` stamp on the deck and a `data-result` stamp the builder now makes) — no
widget knows the module exists, the same decoupling exam-score.js already used.

**Also decided.** The index shows the reader "n of N pages done", a continue link (most
recently visited unfinished page, else the first unfinished in course order), a note that
progress lives in this browser only, and a reset behind a confirm. The wiring is owned by
`scripts/wire-progress.py` (idempotent, `--check`), like the theme's; the behaviour is
gated by two new headless-Chrome harnesses under `scripts/test-widgets.sh`. This is the
convention for every public course on the site, not just this one.

Related: [[0006-practice-papers-as-a-category]].
