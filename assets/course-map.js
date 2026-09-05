// course-map.js — data for the nav drawer (assets/nav.js), the index, and the
// reader's saved progress (assets/progress.js).
// Paths are workspace-root-relative. Update together with index.html whenever
// a page is added or renamed. `id` namespaces this course's localStorage keys —
// every course on pdfarhad.com shares one origin, so it must be unique per course.
window.COURSE_MAP = {
  id: "arabic",
  title: "Arabic — Bayna Yadayk Companion",
  subtitle: "ABY Book 1 · class companion · spoken-first",
  index: "index.html",
  lessons: [
    { n: 1, id: "0001-greetings-and-introductions", title: "Greetings & Introductions",
      path: "lessons/0001-greetings-and-introductions.html", min: 20 },
    { n: 2, id: "0002-the-family", title: "The Family",
      path: "lessons/0002-the-family.html", min: 20 },
    { n: 3, id: "0003-housing", title: "Housing",
      path: "lessons/0003-housing.html", min: 20 },
    { n: 4, id: "0004-daily-life", title: "Daily Life",
      path: "lessons/0004-daily-life.html", min: 20 },
  ],
  groups: [
    { label: "Topic Chapters",
      items: [
        { n: 1, id: "c001-numbers", title: "Numbers and Their Forms",
          path: "chapters/c001-numbers.html", min: 25 },
        { n: 2, id: "c002-prepositions", title: "Prepositions — the placing words",
          path: "chapters/c002-prepositions.html", min: 30 },
      ] },
    { label: "Dialogue Readers",
      items: [
        { n: 1, id: "r001-unit-1-dialogues", title: "Unit 1 Dialogues — speak & reveal",
          path: "reading/r001-unit-1-dialogues.html", min: 15 },
        { n: 2, id: "r002-unit-2-dialogues", title: "Unit 2 Dialogues — speak & reveal",
          path: "reading/r002-unit-2-dialogues.html", min: 15 },
        { n: 3, id: "r003-unit-3-dialogues", title: "Unit 3 Dialogues — speak & reveal",
          path: "reading/r003-unit-3-dialogues.html", min: 15 },
        { n: 4, id: "r004-unit-4-dialogues", title: "Unit 4 Dialogues — speak & reveal",
          path: "reading/r004-unit-4-dialogues.html", min: 15 },
      ] },
    { label: "Practice Papers",
      items: [
        { n: 1, id: "x001-exam-1", title: "Exam 1 — the paper after Units 1–4",
          path: "exams/x001-exam-1.html", min: 35 },
      ] },
    { label: "Flashcards",
      items: [
        { n: 1, id: "v001-unit-1-flashcards", title: "Unit 1 Vocabulary Deck",
          path: "vocab/v001-unit-1-flashcards.html", min: 10 },
        { n: 2, id: "v002-unit-2-flashcards", title: "Unit 2 Vocabulary Deck",
          path: "vocab/v002-unit-2-flashcards.html", min: 10 },
        { n: 3, id: "v003-unit-3-flashcards", title: "Unit 3 Vocabulary Deck",
          path: "vocab/v003-unit-3-flashcards.html", min: 12 },
        { n: 4, id: "v004-unit-4-flashcards", title: "Unit 4 Vocabulary Deck",
          path: "vocab/v004-unit-4-flashcards.html", min: 12 },
      ] },
  ],
  reference: [
    { title: "Frames & Phrasebook (Units 1–4)", path: "reference/frames.html" },
  ],
  external: [
    { title: "GitHub repo", url: "https://github.com/pdfarhad/arabic-lessons" },
  ],
};
