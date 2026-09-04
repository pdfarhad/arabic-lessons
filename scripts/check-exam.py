#!/usr/bin/env python3
"""Structural gate for practice-paper pages (exams/*.html).

A paper's claims — "this exercise is worth 6 marks", "the total is 40", "the key
matches the columns" — go stale silently the moment an item is added or a letter
is mistyped. This script can falsify them:

  1. every <section class="exercise" data-marks=N> holds exactly N gradable items
     (.q, .gap, .match .from > li) — the marks the page shows are the paper's;
  2. the marks sum to the total every .exam-total[data-total] claims;
  3. in each .match the .from keys and the .to keys are the same set with no
     repeats, and the printed .answer line lists exactly those pairs (number → letter);
  4. each .gap's answer is one of its options and its sentence carries a ___;
  5. data-ids of .q / .gap / .match are unique within the page;
  6. every mcq's data-answer is a valid 0-based index into its choices.

Usage: python3 scripts/check-exam.py [exams/*.html]    (exit 1 on any failure)
"""
import re, sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VOID = {"meta", "link", "br", "img", "input", "hr", "source"}
DIGITS = "٠١٢٣٤٥٦٧٨٩"


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent = tag, dict(attrs), parent
        self.children, self.text = [], []

    @property
    def classes(self):
        return self.attrs.get("class", "").split()

    def has(self, cls):
        return cls in self.classes

    def walk(self):
        for c in self.children:
            yield c
            yield from c.walk()

    def find(self, pred):
        return [n for n in self.walk() if pred(n)]

    def content(self):
        # text lives in TextNode children (kept in document order); self.text is
        # only a convenience mirror, so it must not be emitted here as well
        return "".join(c.content() for c in self.children)


class Tree(HTMLParser):
    def __init__(self):
        super().__init__()
        self.root = Node("#root", [], None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.text.append(data)
        # keep text in document order relative to children
        self.cur.children.append(TextNode(data))


class TextNode(Node):
    def __init__(self, data):
        super().__init__("#text", [], None)
        self.data = data

    def content(self):
        return self.data


def parse(path):
    t = Tree()
    t.feed(path.read_text(encoding="utf-8"))
    return t.root


def is_item(n):
    if n.tag == "#text":
        return False
    if n.has("q") or n.has("gap"):
        return True
    if n.tag == "li" and n.parent is not None and n.parent.has("from"):
        p = n.parent.parent
        while p is not None and not p.has("match"):
            p = p.parent
        return p is not None
    return False


def to_int(s):
    return int("".join(str(DIGITS.index(c)) if c in DIGITS else c for c in s.strip()))


def check(path):
    root = parse(path)
    problems = []
    rel = path.relative_to(ROOT)

    # 1 + 2: marks per exercise and the total
    marks_sum = 0
    for ex in root.find(lambda n: n.tag != "#text" and n.has("exercise")):
        m = ex.attrs.get("data-marks")
        if m is None:
            problems.append(f"exercise without data-marks: {ex.attrs.get('id', '?')}")
            continue
        items = ex.find(is_item)
        if len(items) != int(m):
            problems.append(f"exercise {ex.attrs.get('id', '?')}: {len(items)} items but data-marks={m}")
        marks_sum += int(m)
    totals = root.find(lambda n: n.tag != "#text" and n.has("exam-total"))
    if not totals:
        problems.append("no .exam-total element")
    for t in totals:
        claimed = t.attrs.get("data-total")
        if claimed is None or int(claimed) != marks_sum:
            problems.append(f".exam-total claims {claimed}, exercises sum to {marks_sum}")

    # 3: matching keys and printed answer line
    for box in root.find(lambda n: n.tag != "#text" and n.has("match")):
        bid = box.attrs.get("data-id", "?")
        frm = [li for ol in box.find(lambda n: n.tag == "ol" and n.has("from"))
               for li in ol.children if li.tag == "li"]
        to = [li for ol in box.find(lambda n: n.tag == "ol" and n.has("to"))
              for li in ol.children if li.tag == "li"]
        fkeys = [li.attrs.get("data-key") for li in frm]
        tkeys = [li.attrs.get("data-key") for li in to]
        if len(set(tkeys)) != len(tkeys) or None in tkeys:
            problems.append(f"match {bid}: .to keys not unique / missing: {tkeys}")
        if sorted(fkeys) != sorted(tkeys):
            problems.append(f"match {bid}: .from keys {fkeys} ≠ .to keys {tkeys}")
        ans = box.find(lambda n: n.tag != "#text" and n.has("answer"))
        if not ans:
            problems.append(f"match {bid}: no printed .answer line")
        else:
            pairs = {}
            for part in ans[0].content().split("·"):
                bits = part.split()
                if len(bits) != 2:
                    problems.append(f"match {bid}: malformed answer part '{part.strip()}'")
                    continue
                pairs[to_int(bits[0])] = bits[1]
            expect = {i + 1: k for i, k in enumerate(fkeys)}
            if pairs != expect:
                problems.append(f"match {bid}: answer line {pairs} ≠ keys {expect}")

    # 4: gaps
    for gap in root.find(lambda n: n.tag != "#text" and n.has("gap")):
        gid = gap.attrs.get("data-id", "?")
        sent = gap.find(lambda n: n.tag != "#text" and n.has("sentence"))
        opts = gap.find(lambda n: n.tag != "#text" and n.has("options"))
        ans = gap.find(lambda n: n.tag != "#text" and n.has("answer"))
        if not (sent and opts and ans):
            problems.append(f"gap {gid}: missing sentence/options/answer")
            continue
        if "___" not in sent[0].content():
            problems.append(f"gap {gid}: sentence has no ___")
        options = [o.strip() for o in opts[0].content().split("·")]
        if ans[0].content().strip() not in options:
            problems.append(f"gap {gid}: answer '{ans[0].content().strip()}' not among options {options}")

    # 5: unique ids across gradable blocks
    seen = {}
    for n in root.find(lambda n: n.tag != "#text" and (n.has("q") or n.has("gap") or n.has("match"))):
        i = n.attrs.get("data-id")
        if i is None:
            problems.append(f"{n.tag}.{'.'.join(n.classes)} without data-id")
        elif i in seen:
            problems.append(f"duplicate data-id {i}")
        seen[i] = True

    # 6: mcq answers in range
    for q in root.find(lambda n: n.tag != "#text" and n.has("q") and n.attrs.get("data-type") == "mcq"):
        lis = [li for ol in q.find(lambda n: n.tag == "ol" and n.has("choices"))
               for li in ol.children if li.tag == "li"]
        a = q.attrs.get("data-answer")
        if a is None or not a.isdigit() or int(a) >= len(lis):
            problems.append(f"mcq {q.attrs.get('data-id', '?')}: data-answer {a} out of range for {len(lis)} choices")

    status = "PASS" if not problems else "FAIL"
    print(f"{rel}: {marks_sum} marks — {status}")
    for p in problems:
        print(f"  ✗ {p}")
    return not problems


def main():
    paths = [Path(a) for a in sys.argv[1:]] or sorted((ROOT / "exams").glob("*.html"))
    if not paths:
        print("no exam pages found (exams/*.html)")
        sys.exit(1)
    ok = all([check(p.resolve()) for p in paths])
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
