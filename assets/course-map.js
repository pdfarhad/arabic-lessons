// course-map.js — data for the nav drawer (assets/nav.js) and index.
// Paths are workspace-root-relative. Update together with index.html whenever
// a page is added or renamed.
window.COURSE_MAP = {
  title: "Arabic — Bayna Yadayk Companion",
  subtitle: "ABY Book 1 · class companion · spoken-first",
  index: "index.html",
  lessons: [
    { n: 1, id: "0001-greetings-and-introductions", title: "Greetings & Introductions",
      path: "lessons/0001-greetings-and-introductions.html", min: 20 },
    { n: 2, id: "0002-the-family", title: "The Family",
      path: "lessons/0002-the-family.html", min: 20 },
  ],
  groups: [
    { label: "Dialogue Readers",
      items: [
        { n: 1, id: "r001-unit-1-dialogues", title: "Unit 1 Dialogues — speak & reveal",
          path: "reading/r001-unit-1-dialogues.html", min: 15 },
        { n: 2, id: "r002-unit-2-dialogues", title: "Unit 2 Dialogues — speak & reveal",
          path: "reading/r002-unit-2-dialogues.html", min: 15 },
      ] },
    { label: "Flashcards",
      items: [
        { n: 1, id: "v001-unit-1-flashcards", title: "Unit 1 Vocabulary Deck",
          path: "vocab/v001-unit-1-flashcards.html", min: 10 },
        { n: 2, id: "v002-unit-2-flashcards", title: "Unit 2 Vocabulary Deck",
          path: "vocab/v002-unit-2-flashcards.html", min: 10 },
      ] },
  ],
  reference: [
    { title: "Frames & Phrasebook (Units 1–2)", path: "reference/frames.html" },
  ],
  external: [
    { title: "GitHub repo", url: "https://github.com/pdfarhad/arabic-lessons" },
  ],
};
