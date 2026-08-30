#!/usr/bin/env python3
"""Coverage check: every flashcard word must occur in its unit's transcription.

The claim "this deck is exactly the unit's vocabulary" goes stale silently the
moment a card is added by hand — this script can falsify it. For each
assets/vocab-lNN.js word, the bare form must appear in
library/readable/lesson-NN.md (diacritics stripped). A bare form ending in ة
also matches its suffixed shape (ة→ت: صديقة → صديقتي). Words attested only in
a derived form are declared in ALT below — an entry here is a reviewed
decision, not a fallback.
"""
import re, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ALT = {"ولد": "أولاد",         # singular carded, only the plural is printed
       "شيء": "شيئا"}          # ء becomes ئ before the ـًا ending (شَيْئاً)

def strip_marks(s):
    s = unicodedata.normalize("NFD", s)
    return "".join(c for c in s if not unicodedata.combining(c) and c != "ٰ")

def main():
    failures = 0
    for js in sorted(ROOT.glob("assets/vocab-l*.js")):
        n = re.search(r"l(\d+)", js.name).group(1)
        src = ROOT / f"library/readable/lesson-{n}.md"
        text = strip_marks(src.read_text(encoding="utf-8"))
        words = re.findall(r'bare:\s*"([^"]+)"', js.read_text(encoding="utf-8"))
        missing = []
        for w in words:
            probes = [w, ALT.get(w, w)]
            if w.endswith("ة"):
                probes.append(w[:-1] + "ت")
            # normalise probes the same way as the text (NFD folds أ/إ/آ into
            # bare alif + combining marks, which strip_marks removes)
            if not any(strip_marks(p) in text for p in probes):
                missing.append(w)
        status = "PASS" if not missing else "FAIL"
        print(f"{js.name} vs lesson-{n}.md: {len(words)} words — {status}")
        for w in missing:
            print(f"  ✗ not found in transcription: {w}")
        failures += len(missing)
    sys.exit(1 if failures else 0)

if __name__ == "__main__":
    main()
