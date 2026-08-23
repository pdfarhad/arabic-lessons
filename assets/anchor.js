// Pure text-quote anchoring (W3C annotation model). No DOM, no network — unit-testable.
const CTX = 30;

export function buildAnchor(fullText, start, end) {
  return {
    exact: fullText.slice(start, end),
    prefix: fullText.slice(Math.max(0, start - CTX), start),
    suffix: fullText.slice(end, end + CTX),
  };
}

export function findAnchor(fullText, anchor) {
  const exact = anchor.exact;
  if (!exact) return null;
  const prefix = anchor.prefix || '';
  const suffix = anchor.suffix || '';

  const uniqueFind = (needle, offsetIntoNeedle) => {
    if (!needle) return null;
    const idx = fullText.indexOf(needle);
    if (idx === -1) return null;
    if (fullText.indexOf(needle, idx + 1) !== -1) return null; // not unique
    const start = idx + offsetIntoNeedle;
    return { start, end: start + exact.length };
  };

  return (
    uniqueFind(prefix + exact + suffix, prefix.length) ||
    uniqueFind(prefix + exact, prefix.length) ||
    uniqueFind(exact + suffix, 0) ||
    uniqueFind(exact, 0)
  );
}
