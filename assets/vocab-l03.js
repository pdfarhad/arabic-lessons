// Vocabulary set — Lesson 3 (ABY Book 1, Unit 3: السَّكَن). Source of truth:
// library/readable/lesson-03.md. One set per chapter; do NOT merge with other chapters.
// Every word entered by syllabus (class scope beats frequency). Words already carded in
// Lessons 1–2 (هل، نعم، في، أين، غرفة، حمام، ما…) are not re-carded here.
// Dictionary check: DONE 2026-08-30 against en.wiktionary.org via scripts/check-vocab.py
// (see the run log in the commit). Catches recorded in `note` fields: bare حي is
// "alive" first (neighbourhood second); bare دور is "role/turn" first (floor second);
// bare آخر reads آخَر "other" OR آخِر "last"; bare كم reads كَمْ "how many" OR كُمّ
// "sleeve"; bare أي reads أَيّ "which" OR أَيْ "i.e."; سجادة is also the prayer rug.
// Bare غرف is a verb ("to scoop") before it is the plural "rooms"; Wiktionary labels the
// no-ة forms ثلاث/أربع/خمس "masculine of ثلاثة…" — the form used WITH feminine nouns
// (polarity); bare أسكن's headword is the form-IV verb "to lodge (someone)", the
// book's أَسْكُنُ is form I "I live".
// Verb cards carry the book's I/you forms (أَسْكُنُ / تَسْكُنُ) — lemmas سَكَنَ, أَرادَ,
// دَخَلَ, تَفَضَّلَ noted. Glosses unique within this set (enforced by the checker).
window.VOCAB_L03 = {
  id: "l03",
  title: "Lesson 3 — Housing",
  words: [
    // --- verbs & frames ---
    { ar: "أَسْكُنُ / تَسْكُنُ", bare: "أسكن", gloss: "I live / you live", pos: "verb", cat: "verbs", note: "lemma سَكَنَ 'to dwell'. أـ = I, تـ = you (m.) — and تـ is also 'she' (Unit 2): context decides. أَيْنَ تَسْكُنُ؟ where do you live?" },
    { ar: "أُريدُ / تُريدُ", bare: "أريد", gloss: "I want / you want", pos: "verb", cat: "verbs", note: "lemma أَرادَ. The thing wanted ends in ـًا/ـةً: أُريدُ شَقَّةً، أُريدُ سَريرًا" },
    { ar: "لَدَيْنا", bare: "لدينا", gloss: "we have", pos: "phrase", cat: "phrases", note: "لَدَى 'at/with' + نا 'us' — the shopkeeper's 'we've got…': لَدَيْنا شَقَّةٌ جَميلَة" },
    { ar: "مُشاهَدَة", bare: "مشاهدة", gloss: "viewing, seeing", pos: "noun", cat: "core", note: "أُريدُ مُشاهَدَةَ الشَّقَّةِ = I want to see the flat (lit. 'I want viewing of the flat')" },
    { ar: "اُدْخُلْ", bare: "ادخل", gloss: "come in!", pos: "verb", cat: "phrases", note: "imperative of دَخَلَ 'to enter' — said to a man" },
    { ar: "تَفَضَّلْ", bare: "تفضل", gloss: "please, go ahead", pos: "phrase", cat: "phrases", note: "the all-purpose 'here you are / after you / come in' — said when handing, inviting or admitting someone" },
    { ar: "مِنْ فَضْلِكَ", bare: "من فضلك", gloss: "please (asking)", pos: "phrase", cat: "phrases", note: "lit. 'from your favour' — أُريدُ شَقَّةً مِنْ فَضْلِكَ. To a woman: مِنْ فَضْلِكِ" },
    { ar: "شُكْراً", bare: "شكرا", gloss: "thank you", pos: "phrase", cat: "phrases" },
    { ar: "أَيَّ خِدْمَةٍ؟", bare: "خدمة", gloss: "how can I help?", pos: "phrase", cat: "phrases", note: "lit. 'which service?' — the shopkeeper's opener. خِدْمَة = service" },
    // --- question words & particles ---
    { ar: "كَمْ", bare: "كم", gloss: "how many?", pos: "question word", cat: "questions", note: "followed by a SINGULAR noun ending ـًا/ـةً: كَمْ غُرْفَةً؟ ⚠ bare كم also reads كُمّ 'sleeve'" },
    { ar: "ماذا", bare: "ماذا", gloss: "what? (before a verb)", pos: "question word", cat: "questions", note: "ماذا تُريدُ؟ what do you want? — ما (Unit 1) asks before a noun, ماذا before a verb" },
    { ar: "أَيّ", bare: "أي", gloss: "which?", pos: "question word", cat: "questions", note: "في أَيِّ دَوْرٍ؟ on which floor? ⚠ bare أي also reads أَيْ 'i.e.'" },
    { ar: "لِـ", bare: "ل", gloss: "for", pos: "preposition", cat: "core", note: "attaches to the next word: لِغُرْفَةِ النَّوْمِ. With الـ it fuses to لِلـ: لِلمَطْبَخِ" },
    { ar: "لا", bare: "لا", gloss: "no", pos: "particle", cat: "core", note: "لا، أَسْكُنُ في شَقَّةٍ" },
    { ar: "بَعْض", bare: "بعض", gloss: "some (of)", pos: "noun", cat: "core", note: "بَعْضَ الأَثاثِ = some furniture — always followed by a definite noun" },
    { ar: "شَيْء", bare: "شيء", gloss: "thing", pos: "noun", cat: "core", note: "شَيْئاً آخَرَ = something else (note the ء sits on ئ before ـًا)" },
    { ar: "آخَر", bare: "آخر", gloss: "other, another", pos: "adjective", cat: "core", note: "⚠ same bare spelling as آخِر 'last' — آخَر (fatha) is 'other'" },
    { ar: "جَميل / جَميلَة", bare: "جميل", gloss: "beautiful, nice", pos: "adjective", cat: "core", note: "follows its noun and agrees: بَيْتٌ جَميلٌ · شَقَّةٌ جَميلَة" },
    // --- housing ---
    { ar: "حَيّ", bare: "حي", gloss: "neighbourhood, quarter", pos: "noun", cat: "housing", note: "حَيُّ المَطارِ = the Airport district. ⚠ Wiktionary's first sense of bare حي is 'alive' — the district word is the same spelling" },
    { ar: "مَطار", bare: "مطار", gloss: "airport", pos: "noun", cat: "places" },
    { ar: "جامِعَة", bare: "جامعة", gloss: "university", pos: "noun", cat: "places", note: "root ج-م-ع 'gather' — same root as الجُمْعَة (Friday, the gathering day)" },
    { ar: "بَيْت", bare: "بيت", gloss: "house", pos: "noun", cat: "housing", note: "بَيْتِكَ = your house" },
    { ar: "شَقَّة", bare: "شقة", gloss: "flat, apartment", pos: "noun", cat: "housing", note: "شَقَّتِكَ = your flat (ة → ت before the suffix)" },
    { ar: "رَقْم", bare: "رقم", gloss: "number (of a house, phone…)", pos: "noun", cat: "numbers", note: "ما رَقْمُ شَقَّتِكَ؟ what's your flat number? — a label-number, not a count" },
    { ar: "دَوْر", bare: "دور", gloss: "floor, storey", pos: "noun", cat: "housing", note: "الدَّوْرُ الخامِسُ = the fifth floor. ⚠ Wiktionary's first sense is 'role, turn' — 'storey' is a later sense of the same word" },
    { ar: "باب", bare: "باب", gloss: "door", pos: "noun", cat: "housing", note: "بابُ الشَّقَّةِ = the door of the flat" },
    { ar: "غُرَف", bare: "غرف", gloss: "rooms", pos: "noun (plural)", cat: "housing", note: "plural of غُرْفَة (Unit 2) — the shape numbers 3–10 need: خَمْسُ غُرَفٍ. ⚠ bare غرف is also a verb 'to scoop' — vowels decide" },
    { ar: "غُرْفَةُ النَّوْمِ", bare: "غرفة النوم", gloss: "bedroom", pos: "phrase", cat: "housing", note: "lit. 'room of sleep' (نَوْم = sleep)" },
    { ar: "غُرْفَةُ الجُلوسِ", bare: "غرفة الجلوس", gloss: "living room", pos: "phrase", cat: "housing", note: "lit. 'room of sitting' (جُلوس = sitting)" },
    { ar: "مَطْبَخ", bare: "مطبخ", gloss: "kitchen", pos: "noun", cat: "housing", note: "root ط-ب-خ 'cook': the place of cooking (same مَـ shape as مَسْجِد)" },
    // --- furniture ---
    { ar: "أَثاث", bare: "أثاث", gloss: "furniture", pos: "noun", cat: "furniture", note: "a mass noun — بَعْضَ الأَثاثِ some furniture" },
    { ar: "سَرير", bare: "سرير", gloss: "bed", pos: "noun", cat: "furniture" },
    { ar: "سِتارَة", bare: "ستارة", gloss: "curtain", pos: "noun", cat: "furniture" },
    { ar: "أَريكَة", bare: "أريكة", gloss: "sofa, couch", pos: "noun", cat: "furniture" },
    { ar: "سَجّادَة", bare: "سجادة", gloss: "carpet, rug", pos: "noun", cat: "furniture", note: "also the prayer rug — root س-ج-د 'prostrate', like مَسْجِد" },
    { ar: "فُرْن", bare: "فرن", gloss: "oven", pos: "noun", cat: "furniture" },
    { ar: "ثَلاجَة", bare: "ثلاجة", gloss: "fridge", pos: "noun", cat: "furniture", note: "root ث-ل-ج 'snow/ice'" },
    { ar: "سَخّان", bare: "سخان", gloss: "water heater", pos: "noun", cat: "furniture", note: "root س-خ-ن 'hot'" },
    { ar: "مِرْآة", bare: "مرآة", gloss: "mirror", pos: "noun", cat: "furniture", note: "root ر-أ-ي 'see' — the seeing-tool" },
    // --- counting & ranking (taught in the Numbers chapter) ---
    { ar: "ثَلاثُ (غُرَفٍ)", bare: "ثلاث", gloss: "three (before a feminine noun)", pos: "number", cat: "numbers", note: "ثَلاثَة loses its ة when counting feminine things: ثَلاثُ غُرَفٍ. Dictionaries call this the 'masculine' form — used with she-nouns (polarity)" },
    { ar: "أَرْبَعُ (غُرَفٍ)", bare: "أربع", gloss: "four (before a feminine noun)", pos: "number", cat: "numbers", note: "أَرْبَعَة → أَرْبَعُ غُرَفٍ" },
    { ar: "خَمْسُ (غُرَفٍ)", bare: "خمس", gloss: "five (before a feminine noun)", pos: "number", cat: "numbers", note: "خَمْسَة → خَمْسُ غُرَفٍ — the book's line: في الشَّقَّةِ خَمْسُ غُرَفٍ" },
    { ar: "الأَوَّل", bare: "أول", gloss: "the first", pos: "adjective", cat: "ranking", note: "الدَّوْرُ الأَوَّلُ the first floor. Feminine: الأُولى (irregular)" },
    { ar: "الثّاني", bare: "ثاني", gloss: "the second", pos: "adjective", cat: "ranking", note: "from اِثْنان; feminine الثّانِيَة" },
    { ar: "الثّالِث", bare: "ثالث", gloss: "the third", pos: "adjective", cat: "ranking", note: "from ثَلاثَة; feminine الثّالِثَة" },
    { ar: "الرّابِع", bare: "رابع", gloss: "the fourth", pos: "adjective", cat: "ranking", note: "from أَرْبَعَة; feminine الرّابِعَة" },
    { ar: "الخامِس", bare: "خامس", gloss: "the fifth", pos: "adjective", cat: "ranking", note: "from خَمْسَة; feminine الخامِسَة" },
    // --- days of the week ---
    { ar: "السَّبْت", bare: "السبت", gloss: "Saturday", pos: "proper noun", cat: "days", note: "the first day of the Arabic week; root س-ب-ت 'rest' (cf. Sabbath)" },
    { ar: "الأَحَد", bare: "الأحد", gloss: "Sunday", pos: "proper noun", cat: "days", note: "'the one' — day 1 (أَحَد = one)" },
    { ar: "الإِثْنَيْن", bare: "الاثنين", gloss: "Monday", pos: "proper noun", cat: "days", note: "'the two' — day 2 (اِثْنان). Book spells it الإِثْنَين; dictionaries also الاِثْنَيْن" },
    { ar: "الثُّلاثاء", bare: "الثلاثاء", gloss: "Tuesday", pos: "proper noun", cat: "days", note: "'the three' — day 3 (ثَلاثَة)" },
    { ar: "الأَرْبِعاء", bare: "الأربعاء", gloss: "Wednesday", pos: "proper noun", cat: "days", note: "'the four' — day 4 (أَرْبَعَة)" },
    { ar: "الخَميس", bare: "الخميس", gloss: "Thursday", pos: "proper noun", cat: "days", note: "'the five' — day 5 (خَمْسَة)" },
    { ar: "الجُمْعَة", bare: "الجمعة", gloss: "Friday", pos: "proper noun", cat: "days", note: "'the gathering' — the congregational prayer day; root ج-م-ع like جامِعَة" }
  ]
};
