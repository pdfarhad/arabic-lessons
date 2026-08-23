// Vocabulary set — Lesson 2 (ABY Book 1, Unit 2: الأسرة). Source of truth:
// library/readable/lesson-02.md. One set per chapter; do NOT merge with other chapters.
// Every word entered by syllabus (class scope beats frequency). Words already carded in
// Lesson 1 (أخ، أخت، هذا، هذه، هو، هي…) are not re-carded here.
// Dictionary check: DONE 2026-08-23 against en.wiktionary.org via scripts/check-vocab.py —
// all 41 words verified (two lemmatisation 404s: يتوضأ → lemma توضأ "to perform ablution"
// confirmed; هيا بنا is a phrase, هيا confirmed). Catches: bare نظارة is "telescope"
// first on Wiktionary, "eyeglasses" second — vowelled نَظّارَة is the glasses word; bare
// جدة also = Jeddah; bare حمام also = pigeon (حَمام). Recorded in `note` fields.
// Glosses unique within this set (enforced by the checker). Structural checks: PASS.
window.VOCAB_L02 = {
  id: "l02",
  title: "Lesson 2 — The Family",
  words: [
    { ar: "أُسْرَة", bare: "أسرة", gloss: "family", pos: "noun", cat: "family", note: "أُسْرَتي = my family" },
    { ar: "صورَة", bare: "صورة", gloss: "picture, photo", pos: "noun", cat: "core", note: "صورَةُ أُسْرَتي = a picture of my family" },
    { ar: "والِد", bare: "والد", gloss: "father (formal, one's parent)", pos: "noun", cat: "family", note: "والِدي my father · والِدُهُ his father. Wiktionary: literally 'the one who begot' — the polite referential word; أب is the plain word" },
    { ar: "والِدَة", bare: "والدة", gloss: "mother (formal, one's parent)", pos: "noun", cat: "family" },
    { ar: "أَب", bare: "أب", gloss: "father", pos: "noun", cat: "family", note: "the plain word; the book's dialogue labels the parents الأَب / الأُمّ" },
    { ar: "أُمّ", bare: "أم", gloss: "mother", pos: "noun", cat: "family" },
    { ar: "جَدّ", bare: "جد", gloss: "grandfather", pos: "noun", cat: "family", note: "جَدِّي my grandfather · جَدُّهُ his grandfather" },
    { ar: "جَدَّة", bare: "جدة", gloss: "grandmother", pos: "noun", cat: "family", note: "⚠ bare جدة is also the city Jeddah — vowels decide" },
    { ar: "عَمّ", bare: "عم", gloss: "paternal uncle", pos: "noun", cat: "family", note: "father's brother specifically — Arabic splits uncle words (خال = maternal uncle, later)" },
    { ar: "عَمَّة", bare: "عمة", gloss: "paternal aunt", pos: "noun", cat: "family" },
    { ar: "اِبْن", bare: "ابن", gloss: "son", pos: "noun", cat: "family", note: "اِبْنُهُ = his son" },
    { ar: "اِبْنَة", bare: "ابنة", gloss: "daughter", pos: "noun", cat: "family", note: "اِبْنَتُهُ = his daughter" },
    { ar: "مُعَلِّمَة", bare: "معلمة", gloss: "teacher (feminine)", pos: "noun", cat: "people", note: "synonym of مُدَرِّسَة from Lesson 1 — the book uses both; root ع-ل-م 'know'" },
    { ar: "رَسُول", bare: "رسول", gloss: "messenger", pos: "noun", cat: "religion", note: "الرَّسُول = the Messenger ﷺ" },
    { ar: "شَجَرَة", bare: "شجرة", gloss: "tree", pos: "noun", cat: "core", note: "here: family tree" },
    { ar: "ما شاءَ الله", bare: "ما شاء الله", gloss: "mā shāʾ Allāh (admiration)", pos: "phrase", cat: "phrases", note: "said when admiring something — lit. 'what God has willed'" },
    { ar: "صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ", bare: "صلى الله عليه وسلم", gloss: "peace and blessings be upon him", pos: "phrase", cat: "phrases", note: "said after mentioning the Prophet ﷺ" },
    { ar: "اللهُ أَكْبَر", bare: "الله أكبر", gloss: "God is greatest", pos: "phrase", cat: "phrases", note: "opens the adhan; the father echoes it in the dialogue" },
    { ar: "أَذان", bare: "أذان", gloss: "call to prayer", pos: "noun", cat: "religion", note: "أَذانُ الفَجْرِ = the dawn call to prayer" },
    { ar: "فَجْر", bare: "فجر", gloss: "dawn", pos: "noun", cat: "religion" },
    { ar: "وَلَد", bare: "ولد", gloss: "boy, child", pos: "noun", cat: "people", note: "plural أَوْلاد — the dialogue's أَيْنَ الأَوْلادُ؟ 'where are the children?'" },
    { ar: "حَمّام", bare: "حمام", gloss: "bathroom", pos: "noun", cat: "places", note: "⚠ bare حمام also reads حَمام 'pigeon' — doubling of the م decides" },
    { ar: "غُرْفَة", bare: "غرفة", gloss: "room", pos: "noun", cat: "places" },
    { ar: "مُصَلَّى", bare: "مصلى", gloss: "prayer room", pos: "noun", cat: "places", note: "a prayer space at home or work — smaller than a مسجد" },
    { ar: "مَسْجِد", bare: "مسجد", gloss: "mosque", pos: "noun", cat: "places", note: "root س-ج-د 'prostrate': the place of prostration" },
    { ar: "مِعْطَف", bare: "معطف", gloss: "coat", pos: "noun", cat: "things" },
    { ar: "نَظّارَة", bare: "نظارة", gloss: "eyeglasses", pos: "noun", cat: "things", note: "singular in Arabic — one نظارة is one pair of glasses. Wiktionary lists 'telescope' as the first sense of the bare spelling; the vowelled نَظّارَة is the everyday glasses word" },
    { ar: "قُرْآن", bare: "قرآن", gloss: "Qur'an", pos: "proper noun", cat: "religion" },
    { ar: "يَقْرَأُ / تَقْرَأُ", bare: "يقرأ", gloss: "reads (he / she)", pos: "verb", cat: "verbs", note: "هُوَ يَقْرَأُ · هِيَ تَقْرَأُ — يـ marks he, تـ marks she" },
    { ar: "يُصَلِّي / تُصَلِّي", bare: "يصلي", gloss: "prays (he / she)", pos: "verb", cat: "verbs" },
    { ar: "يَتَوَضَّأُ / تَتَوَضَّأُ", bare: "يتوضأ", gloss: "performs ablution (he / she)", pos: "verb", cat: "verbs", note: "wudu — the washing before prayer" },
    { ar: "في", bare: "في", gloss: "in", pos: "preposition", cat: "core", note: "في الغُرْفَةِ = in the room" },
    { ar: "إِلى", bare: "إلى", gloss: "to, towards", pos: "preposition", cat: "core", note: "إِلى المَسْجِدِ = to the mosque" },
    { ar: "مَنْ", bare: "من", gloss: "who?", pos: "question word", cat: "questions", note: "⚠ same letters as مِنْ 'from' (Lesson 1) — fatha = who, kasra = from" },
    { ar: "يا", bare: "يا", gloss: "O… (calling someone)", pos: "particle", cat: "core", note: "يا والِدي = O my father — used before any name or title when addressing" },
    { ar: "هَيّا بِنا", bare: "هيا بنا", gloss: "let's go", pos: "phrase", cat: "phrases" },
    { ar: "سِتَّة", bare: "ستة", gloss: "six (6)", pos: "number", cat: "numbers" },
    { ar: "سَبْعَة", bare: "سبعة", gloss: "seven (7)", pos: "number", cat: "numbers" },
    { ar: "ثَمانِيَة", bare: "ثمانية", gloss: "eight (8)", pos: "number", cat: "numbers" },
    { ar: "تِسْعَة", bare: "تسعة", gloss: "nine (9)", pos: "number", cat: "numbers" },
    { ar: "عَشَرَة", bare: "عشرة", gloss: "ten (10)", pos: "number", cat: "numbers" }
  ]
};
