#!/bin/sh
# Click-path test for matching.js / gapfill.js / exam-score.js in real headless Chrome.
# Loads scripts/test-widgets.html over file://, lets the harness click through a
# wrong join, a late join, a reverse-order join and a gap fill, then reads the JSON it
# writes into <pre id="out">. Exit 1 on any failed assertion (or no output at all).
set -eu
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME" >&2; exit 2; }
"$CHROME" --headless --disable-gpu --virtual-time-budget=3000 \
  --dump-dom "file://$PWD/scripts/test-widgets.html" 2>/dev/null \
| python3 -c '
import sys, re, json, html
m = re.search(r"<pre id=\"out\">(.*?)</pre>", sys.stdin.read(), re.S)
res = json.loads(html.unescape(m.group(1))) if m and m.group(1).strip() else {}
if not res:
    print("  ✗ harness produced no results"); sys.exit(1)
bad = 0
for k, v in res.items():
    print(("  ✓ " if v is True else "  ✗ ") + k); bad += v is not True
print(f"widgets: {len(res) - bad} / {len(res)} assertions pass")
sys.exit(1 if bad else 0)'
