#!/bin/sh
# Build the public static site into docs/ (served by GitHub Pages).
#
# The public build differs from the local workspace in one way: the highlighter
# is an agent-only feature (its actions POST to the learn server and reach the
# teaching agent), so its wiring and files are stripped. The quiz stays — it
# grades client-side and skips persistence off localhost (guard in quiz.js).
# Flashcards, sentence builder and audio are fully client-side and ship as-is.
set -eu
cd "$(dirname "$0")/.."

rm -rf docs
mkdir -p docs
cp index.html docs/
cp -R lessons reading vocab chapters reference assets docs/
touch docs/.nojekyll

# strip agent-only highlighter wiring from every page
find docs -name '*.html' -exec sed -i '' \
  -e '/assets\/highlighter\.css/d' \
  -e '/assets\/highlighter\.js/d' {} +

# and its files (anchor.js is the highlighter's dependency)
rm -f docs/assets/highlighter.css docs/assets/highlighter.js docs/assets/anchor.js

# sanity: no leftover references, no raw .md links
if grep -rn 'highlighter' docs --include='*.html' >/dev/null 2>&1; then
  echo "FAIL: highlighter reference survived in docs/" >&2; exit 1
fi
if grep -rnE 'href="[^"]*\.md"' docs --include='*.html' >/dev/null 2>&1; then
  echo "FAIL: raw .md link in docs/" >&2; exit 1
fi
echo "public build → docs/ ($(find docs -name '*.html' | wc -l | tr -d ' ') pages)"
