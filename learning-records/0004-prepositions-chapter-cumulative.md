# The prepositions chapter is cumulative, and the -i ending is taught as a shape

User (2026-08-30): "make a separate chapter on preposition usage. the chapter will grow
but now it will cover the prepositions and their usage till now the chapters are
covered. make it beginners friendly and interactive."

**Decision 1 — one growing chapter, not one per unit.** `chapters/c002-prepositions`
covers every preposition attested in the units ingested so far (Units 1–3: في، مِنْ،
إِلى، لِـ، عَلى، بِـ، مَعَ، لَدَى) and carries a *Coverage so far* ledger (§10). When a
new unit lands, the ingest step checks its transcription for new prepositions or new
uses and **appends** to c002 — new rows in the ledger, new gap-fills — rather than
starting c003. The chapter's "covers Units 1–N" line and its knowledge note move
together.

**Decision 2 — the ending after a preposition is taught as a sound, not as case.**
MISSION.md rules out i'rab theory, but the -i ending is printed on every prepositional
phrase the learner already says (في الغُرْفَةِ، في بَيْتٍ، مَعَ السَّلامَةِ). The chapter
names the shape ("after these little words the noun ends in -i"), shows the country-name
exception the book itself prints (مِنْ مِصْرَ), and stops there. Same treatment as the
ـًا object ending in Lesson 3.

**Decision 3 — interactive means the gap-fill.** Beginner-friendly practice for a
closed word class is "pick the word that fits", so the chapter introduced a reusable
component, `assets/gapfill.js` + `gapfill.css` (tap a chip into a blank, graded at
once, sentence spoken on success, worked example without JS). It joins the builder and
quiz as the workspace's third practice widget and should be reused wherever a small
closed set of words is the thing being learned.

Related: [[0003-numbers-chapter-scope]] (topic-chapter category and the beyond-the-book
rule), [[0001-mission-and-syllabus-ownership]].
