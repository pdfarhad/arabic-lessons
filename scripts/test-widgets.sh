#!/bin/sh
# Click-path tests for the client-side widgets in real headless Chrome.
# Every scripts/test-*.html is a harness: it loads the widgets over file://, drives
# them (clicks, data-result stamps), and writes its assertions as JSON into
# <pre id="out">. Exit 1 on any failed assertion (or a harness with no output).
#   test-widgets.html         matching.js / gapfill.js / exam-score.js
#   test-progress-page.html   progress.js on a page with practice
#   test-progress-index.html  progress.js on the course index
set -eu
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME" >&2; exit 2; }
status=0
for harness in scripts/test-*.html; do
  echo "$harness"
  "$CHROME" --headless --disable-gpu --virtual-time-budget=3000 \
    --dump-dom "file://$PWD/$harness" 2>/dev/null \
  | python3 -c '
import sys, re, json, html
m = re.search(r"<pre id=\"out\">(.*?)</pre>", sys.stdin.read(), re.S)
res = json.loads(html.unescape(m.group(1))) if m and m.group(1).strip() else {}
if not res:
    print("  ✗ harness produced no results"); sys.exit(1)
bad = 0
for k, v in res.items():
    print(("  ✓ " if v is True else "  ✗ ") + k + ("" if v in (True, False) else f"  ({v})")); bad += v is not True
print(f"  {len(res) - bad} / {len(res)} assertions pass")
sys.exit(1 if bad else 0)' || status=1
done
[ "$status" -eq 0 ] && echo "widgets: all harnesses pass" || echo "widgets: FAILURES" >&2
exit $status
