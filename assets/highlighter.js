import { buildAnchor, findAnchor } from './anchor.js';

const ACTIONS = [
  { key: 'important',    label: 'Important',   group: 'state' },
  { key: 'unnecessary',  label: 'Unnecessary', group: 'state' },
  { key: 'tag',          label: 'Tag…',        group: 'state' },
  { key: 'go-deep',      label: 'Go deep',     group: 'request' },
  { key: 'make-visuals', label: 'Make visuals',group: 'request' },
  { key: 'quiz',         label: 'Quiz me',     group: 'request' },
  { key: 'confused',     label: 'Confused',    group: 'request' },
  { key: 'example',      label: 'Example',     group: 'request' },
];

const LESSON = document.body.dataset.lesson;
const ROOT = document.body;
const LS_KEY = 'learn-hl:' + LESSON;

// ---- text index: map offsets in rendered text -> DOM text nodes ----
// Skip our own injected UI (popover/legend) and non-content nodes, so the index
// reflects only the lesson text the user can actually select and anchor against.
function isSkipped(node) {
  let el = node.parentElement;
  while (el && el !== document.documentElement) {
    if (el.id === 'hl-popover' || el.id === 'hl-legend') return true;
    if (el.classList && el.classList.contains('quiz-ui')) return true; // injected quiz UI
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return true;
    el = el.parentElement;
  }
  return false;
}

function buildIndex() {
  const walker = document.createTreeWalker(ROOT, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      return isSkipped(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = []; let text = ''; let n;
  while ((n = walker.nextNode())) {
    if (!n.nodeValue) continue;
    nodes.push({ node: n, start: text.length, end: text.length + n.nodeValue.length });
    text += n.nodeValue;
  }
  return { text, nodes };
}

function offsetOf(idx, container, containerOffset) {
  for (const e of idx.nodes) {
    if (e.node === container) return e.start + containerOffset;
  }
  return -1;
}

// Wrap [start,end) of rendered text in <mark> elements (one per spanned text node).
function paint(idx, start, end, action, id, done) {
  const segs = [];
  for (const e of idx.nodes) {
    if (e.end <= start || e.start >= end) continue;
    segs.push({ node: e.node, s: Math.max(start, e.start) - e.start,
                e: Math.min(end, e.end) - e.start });
  }
  for (let i = segs.length - 1; i >= 0; i--) {       // last→first keeps offsets valid
    const { node, s, e } = segs[i];
    const r = document.createRange();
    r.setStart(node, s); r.setEnd(node, e);
    const mark = document.createElement('mark');
    mark.className = 'hl hl-' + action;
    mark.dataset.hlId = id;
    if (done) mark.dataset.done = '1';
    r.surroundContents(mark);
    mark.addEventListener('click', () => removeHighlight(id));
  }
}

// ---- on-page list of highlighted text ----
// The corner panel shows every highlight's actual text so the user can see and
// review what they marked without leaving the page. Kept inside #hl-legend, which
// buildIndex() skips, so these snippets never pollute the anchoring text.
const items = []; // {id, action, text, tags, orphan}
function shorten(t) {
  t = (t || '').replace(/\s+/g, ' ').trim();
  return t.length > 90 ? t.slice(0, 90) + '…' : t;
}
function markSelector(id) {
  const safe = window.CSS && CSS.escape ? CSS.escape(id) : String(id).replace(/"/g, '\\"');
  return `mark.hl[data-hl-id="${safe}"]`;
}
function scrollToMark(id) {
  const m = document.querySelector(markSelector(id));
  if (!m) return;
  m.scrollIntoView({ behavior: 'smooth', block: 'center' });
  m.classList.add('hl-flash');
  setTimeout(() => m.classList.remove('hl-flash'), 900);
}
function renderList() {
  const box = document.getElementById('hl-list');
  if (!box) return;
  box.innerHTML = '';
  if (!items.length) {
    box.className = 'hl-empty';
    box.textContent = 'Select any text in the lesson to highlight it.';
    return;
  }
  box.className = '';
  for (const it of items) {
    const row = document.createElement('div');
    row.className = 'hl-item' + (it.orphan ? ' hl-item-orphan' : '');
    const dot = document.createElement('span'); dot.className = 'hl-dot dot-' + it.action;
    const txt = document.createElement('span'); txt.className = 'hl-item-text';
    txt.textContent = shorten(it.text);
    row.appendChild(dot); row.appendChild(txt);
    if (it.tags && it.tags.length) {
      const tg = document.createElement('span'); tg.className = 'hl-item-tags';
      tg.textContent = it.tags.map((t) => '#' + t).join(' ');
      row.appendChild(tg);
    }
    if (it.orphan) {
      row.title = 'This highlight no longer matches the lesson text';
    } else {
      row.title = 'Click to jump to this highlight';
      row.addEventListener('click', () => scrollToMark(it.id));
    }
    box.appendChild(row);
  }
}
function addItem(it) { items.push(it); renderList(); }
function removeItem(id) {
  const i = items.findIndex((x) => x.id === id);
  if (i >= 0) { items.splice(i, 1); renderList(); }
}

// ---- network with localStorage resilience ----
function bufferLocal(rec) {
  const buf = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  buf.push(rec); localStorage.setItem(LS_KEY, JSON.stringify(buf));
}
function showOffline(on) { const el = document.getElementById('hl-offline');
  if (el) el.style.display = on ? 'block' : 'none'; }

async function save(rec) {
  try {
    const resp = await fetch('/highlight', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rec) });
    showOffline(false);
    return await resp.json();
  } catch (_) {
    showOffline(true);
    const local = { ...rec, id: 'local-' + Math.random().toString(36).slice(2, 10),
                    _unsynced: true };
    bufferLocal(local);
    return local;
  }
}

async function removeHighlight(id) {
  document.querySelectorAll(markSelector(id)).forEach((m) => {
    m.replaceWith(...m.childNodes);
  });
  ROOT.normalize();
  removeItem(id);
  try { await fetch('/highlight?id=' + encodeURIComponent(id), { method: 'DELETE' }); }
  catch (_) {}
}

async function flushBuffer() {
  const buf = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  if (!buf.length) return;
  const remaining = [];
  for (const rec of buf) {
    try {
      const { _unsynced, id, ...clean } = rec;
      await fetch('/highlight', { method: 'POST',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(clean) });
    } catch (_) { remaining.push(rec); }
  }
  localStorage.setItem(LS_KEY, JSON.stringify(remaining));
  showOffline(remaining.length > 0);
}

// ---- popover ----
let pending = null; // {anchor}
function buildPopover() {
  const pop = document.createElement('div'); pop.id = 'hl-popover';
  let lastGroup = null;
  for (const a of ACTIONS) {
    if (lastGroup && a.group !== lastGroup) {
      const sep = document.createElement('span'); sep.className = 'hl-sep'; pop.appendChild(sep);
    }
    lastGroup = a.group;
    const b = document.createElement('button'); b.textContent = a.label;
    b.addEventListener('mousedown', (ev) => { ev.preventDefault(); onAction(a.key); });
    pop.appendChild(b);
  }
  const input = document.createElement('input'); input.id = 'hl-tag-input';
  input.placeholder = 'tags, comma-separated — Enter'; input.style.display = 'none';
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      const tags = input.value.split(',').map((t) => t.trim()).filter(Boolean);
      commit('tag', tags); hidePopover();
    }
  });
  pop.appendChild(input);
  document.body.appendChild(pop);
  return pop;
}

function showPopover(rect) {
  const pop = document.getElementById('hl-popover');
  pop.style.display = 'flex';
  pop.style.left = window.scrollX + rect.left + 'px';
  pop.style.top = window.scrollY + rect.bottom + 6 + 'px';
}
function hidePopover() {
  const pop = document.getElementById('hl-popover');
  pop.style.display = 'none';
  document.getElementById('hl-tag-input').style.display = 'none';
  document.getElementById('hl-tag-input').value = '';
  pending = null;
}

function onAction(key) {
  if (key === 'tag') {
    const input = document.getElementById('hl-tag-input');
    input.style.display = 'block'; input.focus();
    return;
  }
  commit(key, []);
  hidePopover();
}

async function commit(action, tags) {
  if (!pending) return;
  // Capture the anchor NOW: onAction()/the tag handler call hidePopover() right
  // after commit(), which nulls `pending` during the await below. Reading
  // pending.anchor after the await would throw and the highlight would only
  // appear on the next page load. Hold a local reference instead.
  const anchor = pending.anchor;
  const rec = { lesson: LESSON, action, tags, text: anchor.exact, anchor };
  const saved = await save(rec);
  const idx = buildIndex();
  const found = findAnchor(idx.text, anchor);
  if (found) paint(idx, found.start, found.end, action, saved.id, false);
  addItem({ id: saved.id, action, text: anchor.exact, tags });
}

// ---- legend + live highlights list ----
function buildLegend() {
  const el = document.createElement('div'); el.id = 'hl-legend';
  const key = ACTIONS.map((a) =>
    `<span class="hl hl-${a.key}" style="background-clip:border-box">${a.label}</span>`).join(' · ');
  el.innerHTML =
    '<b>Highlights</b>' +
    '<div id="hl-list" class="hl-empty">Select any text in the lesson to highlight it.</div>' +
    '<details id="hl-key"><summary>colour key</summary><div class="hl-key-body">' + key + '</div></details>' +
    '<div id="hl-offline">teacher offline — will sync</div>' +
    '<div class="hl-orphans" style="display:none"></div>';
  document.body.appendChild(el);
}
function showOrphans(items) {
  const el = document.querySelector('#hl-legend .hl-orphans');
  if (!el) return;
  if (!items.length) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  el.textContent = `${items.length} highlight(s) no longer match this lesson`;
}

// ---- load + re-render ----
async function load() {
  await flushBuffer();
  let records = [];
  try { records = await (await fetch('/highlight?lesson=' + encodeURIComponent(LESSON))).json(); }
  catch (_) { showOffline(true); }
  const orphans = [];
  for (const rec of records) {
    // Rebuild the index per record: paint() splits text nodes via surroundContents,
    // so a single shared index would go stale after the first highlight is drawn.
    const idx = buildIndex();
    const found = findAnchor(idx.text, rec.anchor);
    const text = (rec.anchor && rec.anchor.exact) || rec.text || '';
    if (!found) {
      orphans.push(rec);
      addItem({ id: rec.id, action: rec.action, text, tags: rec.tags, orphan: true });
      continue;
    }
    try {
      paint(idx, found.start, found.end, rec.action, rec.id, rec.status === 'done');
      addItem({ id: rec.id, action: rec.action, text, tags: rec.tags });
    } catch (_) {
      orphans.push(rec); // a mark that can't be drawn degrades to an orphan, never aborts re-render
      addItem({ id: rec.id, action: rec.action, text, tags: rec.tags, orphan: true });
    }
  }
  showOrphans(orphans);
}

// ---- selection wiring ----
document.addEventListener('mouseup', () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  if (!ROOT.contains(range.commonAncestorContainer)) return;
  const idx = buildIndex();
  const start = offsetOf(idx, range.startContainer, range.startOffset);
  const end = offsetOf(idx, range.endContainer, range.endOffset);
  if (start < 0 || end < 0 || end <= start) return;
  pending = { anchor: buildAnchor(idx.text, start, end) };
  showPopover(range.getBoundingClientRect());
});
document.addEventListener('mousedown', (ev) => {
  const pop = document.getElementById('hl-popover');
  if (pop && pop.style.display !== 'none' && !pop.contains(ev.target)) hidePopover();
});
document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hidePopover(); });

if (LESSON) { buildPopover(); buildLegend(); load(); }
