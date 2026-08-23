// Vocabulary set — Lesson 1 (ABY Book 1, Unit 1: التحية والتعارف). Source of truth:
// library/readable/lesson-01.md. One set per chapter; do NOT merge with other chapters.
// Every word entered by syllabus (class scope beats frequency).
// Dictionary check: DONE 2026-08-23 against en.wiktionary.org via scripts/check-vocab.py —
// all 50 words verified (باكستانية 404s as its own page; verified via باكستاني, regular
// feminine). Catches: bare مدرسة is "school" before "teacher (f.)"; bare من collapses
// مِنْ/مَنْ; bare حال is verb-first ("to change") with the noun sense alongside. All
// recorded in `note` fields. Glosses are unique strings within this set (pedagogical
// constraint, enforced by the checker). Structural checks: PASS.
window.VOCAB_L01 = {
  id: "l01",
  title: "Lesson 1 — Greetings & Introductions",
  words: [
    { ar: "السَّلامُ عَلَيْكُم", bare: "السلام عليكم", gloss: "peace be upon you (greeting)", pos: "phrase", cat: "phrases" },
    { ar: "وَعَلَيْكُمُ السَّلام", bare: "وعليكم السلام", gloss: "and upon you be peace (reply)", pos: "phrase", cat: "phrases" },
    { ar: "أَهْلاً وَسَهْلاً", bare: "أهلا وسهلا", gloss: "welcome", pos: "phrase", cat: "phrases" },
    { ar: "مَعَ السَّلامَة", bare: "مع السلامة", gloss: "goodbye (go in safety)", pos: "phrase", cat: "phrases" },
    { ar: "الحَمْدُ لله", bare: "الحمد لله", gloss: "praise be to God", pos: "phrase", cat: "phrases" },
    { ar: "بِخَيْر", bare: "بخير", gloss: "fine, well", pos: "phrase", cat: "phrases" },
    { ar: "اِسْم", bare: "اسم", gloss: "name", pos: "noun", cat: "core", note: "اِسْمي my name · اسْمُكَ your (m.) name · اسْمُكِ your (f.) name" },
    { ar: "حال", bare: "حال", gloss: "condition, state", pos: "noun", cat: "core", note: "كَيْفَ حالُكَ؟ = how are you? (lit. how is your state?)" },
    { ar: "أَنا", bare: "أنا", gloss: "I", pos: "pronoun", cat: "pronouns" },
    { ar: "أَنْتَ", bare: "أنت", gloss: "you (masculine)", pos: "pronoun", cat: "pronouns", note: "same letters as أَنْتِ — only the vowel differs; listen for the ending" },
    { ar: "أَنْتِ", bare: "أنت", gloss: "you (feminine)", pos: "pronoun", cat: "pronouns" },
    { ar: "هُوَ", bare: "هو", gloss: "he", pos: "pronoun", cat: "pronouns" },
    { ar: "هِيَ", bare: "هي", gloss: "she", pos: "pronoun", cat: "pronouns" },
    { ar: "ما", bare: "ما", gloss: "what?", pos: "question word", cat: "questions", note: "Wiktionary: ما is also the negation word — in this unit it is only the question (ما اسمك؟)" },
    { ar: "كَيْف", bare: "كيف", gloss: "how?", pos: "question word", cat: "questions" },
    { ar: "أَيْنَ", bare: "أين", gloss: "where?", pos: "question word", cat: "questions" },
    { ar: "هَلْ", bare: "هل", gloss: "(yes/no question marker)", pos: "particle", cat: "questions", note: "turns a statement into a yes/no question; has no English translation" },
    { ar: "مِنْ", bare: "من", gloss: "from", pos: "preposition", cat: "core", note: "⚠ same letters as مَنْ 'who?' (Lesson 2) — the vowel decides; this is why vocalisation matters" },
    { ar: "نَعَمْ", bare: "نعم", gloss: "yes", pos: "particle", cat: "core" },
    { ar: "جِنْسِيَّة", bare: "جنسية", gloss: "nationality", pos: "noun", cat: "core" },
    { ar: "هَذا", bare: "هذا", gloss: "this (masculine)", pos: "demonstrative", cat: "core", note: "spelled هذا but said hādhā — the alif after ه is unwritten (dagger alif)" },
    { ar: "هَذِهِ", bare: "هذه", gloss: "this (feminine)", pos: "demonstrative", cat: "core" },
    { ar: "أَخ", bare: "أخ", gloss: "brother", pos: "noun", cat: "people", note: "أَخي = my brother" },
    { ar: "أُخْت", bare: "أخت", gloss: "sister", pos: "noun", cat: "people", note: "أُخْتي = my sister" },
    { ar: "صَديق", bare: "صديق", gloss: "friend (masculine)", pos: "noun", cat: "people", note: "صَديقي = my friend" },
    { ar: "صَديقَة", bare: "صديقة", gloss: "friend (feminine)", pos: "noun", cat: "people", note: "صَديقَتي = my friend — the ة opens to ت before the suffix" },
    { ar: "طالِب", bare: "طالب", gloss: "student (masculine)", pos: "noun", cat: "professions", note: "Wiktionary: literally 'seeker (of knowledge)'" },
    { ar: "طالِبَة", bare: "طالبة", gloss: "student (feminine)", pos: "noun", cat: "professions" },
    { ar: "مُدَرِّس", bare: "مدرس", gloss: "teacher (masculine)", pos: "noun", cat: "professions", note: "from دَرَّسَ 'to teach' — same root as مَدْرَسَة (school)" },
    { ar: "مُدَرِّسَة", bare: "مدرسة", gloss: "teacher (feminine)", pos: "noun", cat: "professions", note: "⚠ bare مدرسة also reads مَدْرَسَة 'school' — vowels decide" },
    { ar: "طَبِيب", bare: "طبيب", gloss: "doctor (masculine)", pos: "noun", cat: "professions" },
    { ar: "طَبِيبَة", bare: "طبيبة", gloss: "doctor (feminine)", pos: "noun", cat: "professions" },
    { ar: "مُهَنْدِس", bare: "مهندس", gloss: "engineer (masculine)", pos: "noun", cat: "professions" },
    { ar: "باكِسْتانِيّ", bare: "باكستاني", gloss: "Pakistani (masculine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "باكِسْتانِيَّة", bare: "باكستانية", gloss: "Pakistani (feminine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "تُرْكِيّ", bare: "تركي", gloss: "Turkish (masculine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "تُرْكِيَّة", bare: "تركية", gloss: "Turkish (feminine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "مِصْرِيّ", bare: "مصري", gloss: "Egyptian (masculine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "مِصْرِيَّة", bare: "مصرية", gloss: "Egyptian (feminine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "سُورِيّ", bare: "سوري", gloss: "Syrian (masculine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "سُورِيَّة", bare: "سورية", gloss: "Syrian (feminine)", pos: "nisba adjective", cat: "nationalities" },
    { ar: "باكِسْتان", bare: "باكستان", gloss: "Pakistan", pos: "proper noun", cat: "countries" },
    { ar: "تُرْكِيا", bare: "تركيا", gloss: "Turkey", pos: "proper noun", cat: "countries" },
    { ar: "مِصْر", bare: "مصر", gloss: "Egypt", pos: "proper noun", cat: "countries" },
    { ar: "سورِيا", bare: "سوريا", gloss: "Syria", pos: "proper noun", cat: "countries" },
    { ar: "واحِد", bare: "واحد", gloss: "one (1)", pos: "number", cat: "numbers" },
    { ar: "اِثْنان", bare: "اثنان", gloss: "two (2)", pos: "number", cat: "numbers" },
    { ar: "ثَلاثَة", bare: "ثلاثة", gloss: "three (3)", pos: "number", cat: "numbers" },
    { ar: "أَرْبَعَة", bare: "أربعة", gloss: "four (4)", pos: "number", cat: "numbers" },
    { ar: "خَمْسَة", bare: "خمسة", gloss: "five (5)", pos: "number", cat: "numbers" }
  ]
};
