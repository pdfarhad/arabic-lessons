// Vocabulary set — Lesson 4 (ABY Book 1, Unit 4: الحَياةُ اليَوْمِيَّة). Source of truth:
// library/readable/lesson-04.md. One set per chapter; do NOT merge with other chapters.
// Every word entered by syllabus (class scope beats frequency). Words already carded in
// Lessons 1–3 (فجر، قرآن، مسجد، مصلى، غرفة، مطبخ، حمام، طبيب، مهندس، عم، بيت، أم، أب،
// جد، جدة، في، إلى، لا، ماذا، أين، هل، أنا، أنت، يا…) are not re-carded here; لا + verb
// ("don't") is taught in the lesson on the existing لا card.
// Dictionary check: DONE 2026-09-02 against en.wiktionary.org via scripts/check-vocab.py
// (run log in the commit). Catches recorded in `note` fields: bare أصلي is the adjective
// أَصْلِيّ "original" before the verb أُصَلّي; bare عند's first sense is "near, at the
// house of" and it is also the other "have" word (عِنْدي) — the book uses only the
// time sense; bare بعد also reads بُعْد "distance"; bare عمل is the verb "to work"
// before the noun; bare ذهب (inside أذهب) is "gold" first; مدرسة "school" is spelt
// like مُدَرِّسَة "female teacher" (Unit 1); ساعة is "hour" first, then "clock, watch";
// الجمعة carries two readings (جُمُعَة / جُمْعَة) and here names the prayer, not the day;
// bare ثانية is "a second (of time)" before "second (f.)"; كتاب is listed as the verbal
// noun "writing" before "book"; the bare I-forms أنام / أقرأ / أذهب resolve to form-IV
// headwords (put to sleep / make read / make disappear) — the book's are form I, as
// with أسكن in Lesson 3. Inflected forms (أكوي، تكنسين) have no headword of their own
// on Wiktionary — expected; the lemma is in the note. Clock ordinals 3–7 are looked
// up by their masculine base (ثالث…سابع), 1–2 by the feminine (واحدة، ثانية).
// Verb cards carry the book's I/you forms (أَسْتَيْقِظُ / تَسْتَيْقِظُ) — lemmas noted.
// Glosses unique within this set (enforced by the checker).
window.VOCAB_L04 = {
  id: "l04",
  title: "Lesson 4 — Daily Life",
  words: [
    // --- verbs: the day, I / you ---
    { ar: "أَسْتَيْقِظُ / تَسْتَيْقِظُ", bare: "أستيقظ", gloss: "I wake up / you wake up", pos: "verb", cat: "verbs", note: "lemma اِسْتَيْقَظَ. مَتى تَسْتَيْقِظُ؟ — أَسْتَيْقِظُ عِنْدَ الفَجْرِ" },
    { ar: "أُصَلّي / تُصَلّي", bare: "أصلي", gloss: "I pray / you pray", pos: "verb", cat: "verbs", note: "Unit 2 had يُصَلّي / تُصَلّي (he / she); now the I-form. Ends in ي, so no ـُ to hear. ⚠ bare أصلي also reads أَصْلِيّ 'original'" },
    { ar: "أَنامُ / تَنامُ", bare: "أنام", gloss: "I sleep / you sleep", pos: "verb", cat: "verbs", note: "lemma نامَ. لا أَنامُ بَعْدَ الصَّلاةِ — I don't sleep after the prayer. ⚠ Wiktionary's headword أَنامَ is form IV 'to put to sleep'; the book's أَنامُ is form I 'I sleep'" },
    { ar: "تَفْعَلُ / تَفْعَلينَ", bare: "تفعل", gloss: "you (m.) do / you (f.) do", pos: "verb", cat: "verbs", note: "lemma فَعَلَ. Only the question is in the unit: ماذا تَفْعَلُ؟ to a man, ماذا تَفْعَلينَ؟ to a woman" },
    { ar: "أَقْرَأُ / تَقْرَأُ", bare: "أقرأ", gloss: "I read / you read", pos: "verb", cat: "verbs", note: "Unit 2's يَقْرَأُ, now I / you. أَقْرَأُ القُرْآنَ · أَقْرَأُ صَحيفَةً أَو كِتاباً. ⚠ Wiktionary's headword أَقْرَأَ is form IV 'to make someone read'; the book's أَقْرَأُ is form I" },
    { ar: "أَذْهَبُ / تَذْهَبُ", bare: "أذهب", gloss: "I go / you go", pos: "verb", cat: "verbs", note: "lemma ذَهَبَ. أَذْهَبُ إِلى المَدْرَسَةِ — إِلى for the destination. ⚠ Wiktionary's headword أَذْهَبَ is form IV 'to make disappear'; the book's أَذْهَبُ is form I 'I go'. Bare ذهب is also 'gold'" },
    { ar: "أَكْنُسُ / تَكْنُسُ", bare: "كنس", gloss: "I sweep / you sweep", pos: "verb", cat: "verbs", note: "lemma كَنَسَ. سَأَكْنُسُ غُرْفَةَ الجُلوسِ" },
    { ar: "أَغْسِلُ / تَغْسِلُ", bare: "أغسل", gloss: "I wash / you wash", pos: "verb", cat: "verbs", note: "lemma غَسَلَ. أَغْسِلُ المَلابِسَ · أَغْسِلُ الأَطْباقَ" },
    { ar: "أَكْوي", bare: "أكوي", gloss: "I iron", pos: "verb", cat: "verbs", note: "lemma كَوى 'to iron' (also 'to cauterise'). سَأَكْوي المَلابِسَ — ends in ي like أُصَلّي" },
    { ar: "أُشاهِدُ / تُشاهِدُ", bare: "أشاهد", gloss: "I watch / you watch", pos: "verb", cat: "verbs", note: "lemma شاهَدَ — the verb behind Unit 3's مُشاهَدَة 'viewing'. أُشاهِدُ التِّلْفازَ" },
    { ar: "تَكْنُسينَ · تُشاهِدينَ", bare: "تكنسين", gloss: "you (f.) sweep · you (f.) watch", pos: "verb", cat: "verbs", note: "the ـينَ ending makes any you-form feminine: تَكْنُسُ → تَكْنُسينَ، تُشاهِدُ → تُشاهِدينَ (drills 3–4)" },
    { ar: "سَـ", bare: "س", gloss: "will (future prefix)", pos: "prefix", cat: "verbs", note: "glued to the front of the verb: سَأَكْنُسُ I will sweep · سَتَفْعَلينَ you (f.) will do" },
    // --- question words & particles ---
    { ar: "مَتى", bare: "متى", gloss: "when?", pos: "question word", cat: "questions", note: "مَتى تَسْتَيْقِظُ؟ — answered with a time: عِنْدَ الفَجْرِ، السّاعَةَ السّابِعَةَ، مُبَكِّراً" },
    { ar: "أَو", bare: "أو", gloss: "or", pos: "particle", cat: "core", note: "صَحيفَةً أَو كِتاباً — a newspaper or a book" },
    { ar: "أَيْضاً", bare: "أيضا", gloss: "also, too", pos: "adverb", cat: "core", note: "goes at the end: أُصَلّي في المَسْجِدِ الكَبيرِ أَيْضاً" },
    { ar: "كَبير", bare: "كبير", gloss: "big, great", pos: "adjective", cat: "core", note: "المَسْجِدُ الكَبيرُ the big (grand) mosque — after a noun with الـ the adjective takes الـ too. Feminine كَبيرَة" },
    // --- time ---
    { ar: "عِنْدَ", bare: "عند", gloss: "at (the time of)", pos: "preposition", cat: "time", note: "عِنْدَ الفَجْرِ at dawn. ⚠ Wiktionary's first sense is 'near, at the house of', and عِنْدي is the other 'I have' — the book uses only the time sense so far" },
    { ar: "بَعْدَ", bare: "بعد", gloss: "after", pos: "preposition", cat: "time", note: "بَعْدَ الصَّلاةِ after the prayer. ⚠ bare بعد is the verb بَعُدَ 'to be far' first, then بُعْد 'distance'" },
    { ar: "السّاعَة", bare: "ساعة", gloss: "the hour, o'clock", pos: "noun", cat: "time", note: "أَذْهَبُ السّاعَةَ السّابِعَةَ I go at seven — no 'at': the ـَ ending does it. Also 'clock, watch'" },
    { ar: "يَوْم", bare: "يوم", gloss: "day", pos: "noun", cat: "time", note: "يَوْمُ العُطْلَةِ the day off · يَوْمَ العُطْلَةِ on the day off (the ـَ ending = 'on')" },
    { ar: "العُطْلَة", bare: "عطلة", gloss: "holiday, day off", pos: "noun", cat: "time", note: "هَذا يَوْمُ العُطْلَةِ — this is the day off" },
    { ar: "العَمَل", bare: "عمل", gloss: "work", pos: "noun", cat: "time", note: "هَذا يَوْمُ العَمَلِ — a work day. ⚠ bare عمل is also the verb عَمِلَ 'to work'" },
    { ar: "الصَّباح", bare: "صباح", gloss: "morning", pos: "noun", cat: "time", note: "في الصَّباحِ in the morning — في for a part of the day" },
    { ar: "الصَّلاة", bare: "صلاة", gloss: "prayer", pos: "noun", cat: "time", note: "بَعْدَ الصَّلاةِ after the prayer. Root ص-ل-و, like يُصَلّي and مُصَلّى" },
    { ar: "الجُمُعَة", bare: "الجمعة", gloss: "the Friday prayer", pos: "noun", cat: "time", note: "أُصَلّي الجُمُعَةَ = I pray Friday (prayer) — the day's name standing for its prayer. Printed الجُمُعَة here, الجُمْعَة in Unit 3; Wiktionary lists both" },
    { ar: "مُبَكِّراً", bare: "مبكرا", gloss: "early", pos: "adverb", cat: "time", note: "أَسْتَيْقِظُ مُبَكِّراً — the ـًا ending turns it into 'early' (how)" },
    { ar: "مُتَأَخِّراً", bare: "متأخرا", gloss: "late", pos: "adverb", cat: "time", note: "أَسْتَيْقِظُ مُتَأَخِّراً — I wake up late" },
    // --- places & things ---
    { ar: "المَدْرَسَة", bare: "مدرسة", gloss: "school", pos: "noun", cat: "places", note: "أَذْهَبُ إِلى المَدْرَسَةِ. ⚠ unvowelled it is identical to مُدَرِّسَة 'female teacher' (Unit 1) — the vowels decide" },
    { ar: "السَّيّارَة", bare: "سيارة", gloss: "car", pos: "noun", cat: "things", note: "بِالسَّيّارَةِ by car — بِـ for the means of transport" },
    { ar: "الحافِلَة", bare: "حافلة", gloss: "bus", pos: "noun", cat: "things", note: "بِالحافِلَةِ by bus" },
    { ar: "المَلابِس", bare: "ملابس", gloss: "clothes", pos: "noun (plural)", cat: "things", note: "أَغْسِلُ المَلابِسَ · أَكْوي المَلابِسَ" },
    { ar: "الأَطْباق", bare: "أطباق", gloss: "dishes, plates", pos: "noun (plural)", cat: "things", note: "plural of طَبَق; أَغْسِلُ الأَطْباقَ" },
    { ar: "التِّلْفاز", bare: "تلفاز", gloss: "television", pos: "noun", cat: "things", note: "أُشاهِدُ التِّلْفازَ" },
    { ar: "صَحيفَة", bare: "صحيفة", gloss: "newspaper", pos: "noun", cat: "things", note: "أَقْرَأُ صَحيفَةً — the ـةً ending on the thing read" },
    { ar: "كِتاب", bare: "كتاب", gloss: "book", pos: "noun", cat: "things", note: "كِتاباً with the ـًا ending after أَقْرَأُ. ⚠ Wiktionary lists كِتاب first as the verbal noun 'writing'; 'book' is the everyday sense" },
    // --- the clock (السّاعَة + feminine ranking word) ---
    { ar: "السّاعَةُ الواحِدَة", bare: "واحدة", gloss: "one o'clock", pos: "phrase", cat: "clock", note: "السّاعَة is a she-noun, so 'one' wears its ة" },
    { ar: "السّاعَةُ الثّانِيَة", bare: "ثانية", gloss: "two o'clock", pos: "phrase", cat: "clock", note: "feminine of الثّاني (Unit 3). ⚠ ثانِيَة on its own is also 'a second' of time" },
    { ar: "السّاعَةُ الثّالِثَة", bare: "ثالث", gloss: "three o'clock", pos: "phrase", cat: "clock", note: "feminine of الثّالِث" },
    { ar: "السّاعَةُ الرّابِعَة", bare: "رابع", gloss: "four o'clock", pos: "phrase", cat: "clock", note: "feminine of الرّابِع" },
    { ar: "السّاعَةُ الخامِسَة", bare: "خامس", gloss: "five o'clock", pos: "phrase", cat: "clock", note: "feminine of الخامِس" },
    { ar: "السّاعَةُ السّادِسَة", bare: "سادس", gloss: "six o'clock", pos: "phrase", cat: "clock", note: "new ranking word: سادِس 'sixth' (not from سِتَّة — an older root)" },
    { ar: "السّاعَةُ السّابِعَة", bare: "سابع", gloss: "seven o'clock", pos: "phrase", cat: "clock", note: "new ranking word: سابِع 'seventh' from سَبْعَة. أَذْهَبُ السّاعَةَ السّابِعَةَ" }
  ]
};
