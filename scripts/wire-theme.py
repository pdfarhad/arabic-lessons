#!/usr/bin/env python3
"""Wire the fuji theme into every page — idempotent; also the drift check.

Three lines go on every page and one missed page stays invisible until a reader
lands on it, so this script (not hand edits) owns the wiring:

  1. a SYNCHRONOUS <head> guard, before the stylesheets, so a stored choice
     applies before first paint (no light flash);
  2. the assets/theme.css stylesheet link (last in <head>, so it wins);
  3. the assets/theme.js module at the end of <body>.

The guard whitelists the stored value and must agree with theme.js's FACE map.
When the theme set changes, add the outgoing guard to OLD_GUARDS so wired pages
MIGRATE instead of keeping a stale contract — and never prune that list: that
is exactly when a page still carrying an old guard would stamp an attribute no
stylesheet answers.

Usage: python3 scripts/wire-theme.py [--check]
  --check  verify only (exit 1 on any missing/stale wiring); write nothing.
"""
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

GUARD = ("<script>try{var t=localStorage.getItem('learn:theme');"
         "if(t==='fuji')document.documentElement.setAttribute('data-theme',t)}"
         "catch(e){}</script>")
OLD_GUARDS = []   # outgoing guards from earlier theme sets; never prune

def pages():
    yield ROOT / "index.html", "assets/"
    for d in ("lessons", "reading", "vocab", "chapters", "exams", "reference"):
        for p in sorted((ROOT / d).glob("*.html")):
            yield p, "../assets/"

def wire(path, prefix, check):
    text = orig = path.read_text(encoding="utf-8")
    link = f'<link rel="stylesheet" href="{prefix}theme.css">'
    module = f'<script type="module" src="{prefix}theme.js"></script>'
    problems = []

    for old in OLD_GUARDS:
        if old in text:
            problems.append("stale guard")
            text = text.replace(old, GUARD)
    if GUARD not in text:
        if "learn:theme" in text:
            problems.append("unknown guard variant")
        else:
            problems.append("no guard")
            # before the first stylesheet: right after the viewport meta
            text = re.sub(r'(<meta name="viewport"[^>]*>)', r"\1\n" + GUARD,
                          text, count=1)
    if link not in text:
        problems.append("no stylesheet link")
        text = text.replace("</head>", link + "\n</head>", 1)
    if module not in text:
        problems.append("no module script")
        text = text.replace("</body>", module + "\n</body>", 1)

    rel = path.relative_to(ROOT)
    if check:
        if problems:
            print(f"  ✗ {rel}: {', '.join(problems)}")
            return False
        return True
    if text != orig:
        path.write_text(text, encoding="utf-8")
        print(f"  wired {rel} ({', '.join(problems)})")
    else:
        print(f"  ok    {rel}")
    return True

def main():
    check = "--check" in sys.argv
    ok = True
    for path, prefix in pages():
        ok = wire(path, prefix, check) and ok
    if check:
        print("theme wiring: " + ("all pages current" if ok else "DRIFT FOUND"))
        sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
