#!/usr/bin/env python3
"""Vocabulary checker for the Arabic workspace.

For every word in assets/vocab-l*.js:
  1. structural checks: unique `ar` and unique `gloss` within each set (pedagogical
     constraint: two cards may never share a translation string);
  2. dictionary check: query en.wiktionary.org's REST definition API for the bare
     (undiacritised) form and report whether an Arabic entry exists, plus its first
     definitions, so glosses can be verified against a real lexical database.

Usage: python3 scripts/check-vocab.py [--offline] [outfile.json]
"""
import json, re, sys, time, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = "https://en.wiktionary.org/api/rest_v1/page/definition/{}"

def parse_set(path):
    text = path.read_text(encoding="utf-8")
    words = []
    for m in re.finditer(r'\{\s*ar:\s*"([^"]+)",\s*bare:\s*"([^"]+)",\s*gloss:\s*"([^"]+)"', text):
        words.append({"ar": m.group(1), "bare": m.group(2), "gloss": m.group(3)})
    set_id = re.search(r'id:\s*"([^"]+)"', text).group(1)
    return set_id, words

def structural(set_id, words, problems):
    seen_ar, seen_gloss = {}, {}
    for w in words:
        if w["ar"] in seen_ar:
            problems.append(f"[{set_id}] duplicate ar: {w['ar']}")
        if w["gloss"] in seen_gloss:
            problems.append(f"[{set_id}] duplicate gloss: '{w['gloss']}' ({seen_gloss[w['gloss']]} vs {w['ar']})")
        seen_ar[w["ar"]] = True
        seen_gloss[w["gloss"]] = w["ar"]

def strip_defn(html):
    return re.sub(r"<[^>]+>", "", html).strip()

def lookup(bare):
    url = API.format(urllib.parse.quote(bare.replace(" ", "_")))
    req = urllib.request.Request(url, headers={"User-Agent": "learn-workspace-vocab-check"})
    data = None
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=15) as r:
                data = json.load(r)
            break
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 3:
                time.sleep(10 * (attempt + 1))
                continue
            return {"status": "error", "detail": f"HTTP {e.code}"}
        except Exception as e:
            return {"status": "error", "detail": str(e)[:80]}
    entries = []
    for groups in data.values():          # keyed by language code; Arabic = "ar"
        for group in groups:
            if group.get("language") == "Arabic":
                for d in group.get("definitions", [])[:4]:
                    t = strip_defn(d.get("definition", ""))
                    if t:
                        entries.append(f"{group.get('partOfSpeech','?')}: {t[:120]}")
    if entries:
        return {"status": "ok", "defs": entries[:6]}
    return {"status": "no-arabic-entry"}

def main():
    offline = "--offline" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    out_path = Path(args[0]) if args else None
    problems, report = [], {}
    seen_bare = {}
    for path in sorted(ROOT.glob("assets/vocab-l*.js")):
        set_id, words = parse_set(path)
        structural(set_id, words, problems)
        print(f"{set_id}: {len(words)} words ({path.name})")
        for w in words:
            key = w["bare"]
            if not offline:
                if key not in seen_bare:
                    seen_bare[key] = lookup(key)
                    time.sleep(1.0)
                res = seen_bare[key]
                report[f"{set_id}/{w['ar']}"] = {"bare": key, "gloss": w["gloss"], **res}
                tag = {"ok": "  ", "no-arabic-entry": "??", "error": "!!"}[res["status"]]
                first = res.get("defs", [res.get("detail", "")])[0] if res.get("defs") or res.get("detail") else ""
                print(f"  {tag} {key:<22} {w['gloss'][:38]:<40} {first[:70]}")
    print("\nStructural problems:" if problems else "\nStructural checks: all passed")
    for p in problems:
        print("  ✗", p)
    if out_path:
        out_path.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"report → {out_path}")
    sys.exit(1 if problems else 0)

if __name__ == "__main__":
    main()
