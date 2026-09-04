# Practice papers are their own category, reproduced not rebuilt, marked on the first try

The class's review test after Units 1–4 was ingested 2026-09-04 (library/readable/
exam-01.md). It is the first material in this workspace that is neither a unit nor a
text: a *paper*. The agent proposed an interactive mock of it and the user said
"build it" (2026-09-04).

**Decision 1 — a paper is a new category, `exams/x00N-*.html`, "Practice Papers".** Not a
lesson (it teaches nothing new), not a reading chapter (it is not a text), not a topic
chapter (it cuts across nothing; it *tests* everything). Own directory, own numbering,
own nav group and index section — the same rule that kept readers and decks out of the
lesson sequence (NOTES.md "Numbering").

**Decision 2 — reproduce the paper, exercise for exercise, in its own formats.** The
reading-chapter principle applied to a test: the learner is practising on the thing they
will actually meet, so the six exercises keep their printed order, wording, marks and
exercise types (join, add two, odd one out, join halves, brackets, yes/no). The one new
widget this needed, `assets/matching.js`, exists because the paper has two "join"
exercises and the course had nothing that graded a pairing. Nothing is shuffled: the
columns are as printed.

**Decision 3 — marked as you go, but only a first answer earns the mark.** The course's
widgets grade instantly and are reused unchanged in behaviour; they now stamp
`data-result="ok|bad"` on each answered item and `assets/exam-score.js` sums those into
the paper's own marks (per exercise, and the printed total of 40). A learner can keep
trying until an item is right — that is where the learning is — but a miss or a reveal
costs the mark, as the exam would. The agent had first proposed a "mark the whole
exercise" step; reusing the instant-grading widgets was the better engineering, and the
first-try rule keeps the exam honesty. Reload for a clean paper; nothing is persisted.

**Decision 4 — the paper moves nothing in the syllabus.** The he-forms (يَـ) of the Unit
3–4 verbs are on the paper for recognition only (matching, reading); the page shows the
swap in a three-beat reveal and a strip, says "recognise, keep saying I / you", and does
not drill it. The rubric imperatives (صِلْ، أَضِفْ، ضَعْ، أَكْمِلْ، اِقْرَأْ، أَجِبْ) are read,
never carded, never built with. The passage's يَوْمُ print slip stays in the text with the
🔊 saying يَوْمَ and a note — the reading-chapter rule. Learning record 0001's boundary holds.

**Also decided.** A paper needs its own gate: `scripts/check-exam.py` falsifies the
marks-per-exercise, the total, the matching keys against the printed answer line, the
gap options and the ids; `scripts/test-widgets.sh` clicks through the new widget and the
tally in real headless Chrome. Both run before a paper is called done, alongside
check-lesson.

Related: [[0001-mission-and-syllabus-ownership]], [[0005-time-words-and-the-missing-preposition]],
[[0004-prepositions-chapter-cumulative]].
