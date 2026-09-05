#!/usr/bin/env python3
"""Wire the reader's saved progress (assets/progress.js) into every page — idempotent;
also the drift check.

One script tag goes on every page, right after nav.js (progress.js decorates the
drawer nav.js has just built, and must run before the practice widgets stamp their
first data-result), and one missed page is a page the reader's progress never sees.
So this script — not hand edits — owns the wiring, the same way scripts/wire-theme.py
owns the theme's. New pages run through both.

Usage: python3 scripts/wire-progress.py [--check]
  --check  verify only (exit 1 on any missing wiring); write nothing.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGE_DIRS = ("lessons", "reading", "vocab", "chapters", "exams", "reference")

def pages():
    yield ROOT / "index.html", "assets/"
    for d in PAGE_DIRS:
        for p in sorted((ROOT / d).glob("*.html")):
            yield p, "../assets/"

def wire(path, prefix, check):
    text = path.read_text(encoding="utf-8")
    nav = f'<script src="{prefix}nav.js"></script>'
    tag = f'<script src="{prefix}progress.js"></script>'
    rel = path.relative_to(ROOT)
    if tag in text:
        if not check:
            print(f"  ok    {rel}")
        return True
    if nav not in text:
        print(f"  ✗ {rel}: no nav.js script to hang progress.js on")
        return False
    if check:
        print(f"  ✗ {rel}: no progress.js")
        return False
    path.write_text(text.replace(nav, nav + "\n" + tag, 1), encoding="utf-8")
    print(f"  wired {rel}")
    return True

def main():
    check = "--check" in sys.argv
    ok = True
    for path, prefix in pages():
        ok = wire(path, prefix, check) and ok
    if check:
        print("progress wiring: " + ("all pages current" if ok else "DRIFT FOUND"))
    sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
