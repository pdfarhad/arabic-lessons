// progress.js — the reader's own progress, kept in their browser (localStorage).
//
// Wired on every page, right after nav.js (scripts/wire-progress.py owns the wiring):
//   <script src="../assets/course-map.js"></script>
//   <script src="../assets/nav.js"></script>
//   <script src="../assets/progress.js"></script>
//
// What it keeps, per page (keyed by <body data-lesson>, which is the page's id in
// COURSE_MAP): first and last visit; the practice tally of the last session that had
// any — n items, did = answered, ok = right first try; the best ok across sessions; and
// a done flag, set by the reader (the button) or by finishing every practice item on
// the page. The tally is READ from the DOM contract the widgets already keep:
//   .build (with a .solution) / .gap / .q / .match .from > li   → data-result="ok|bad"
//   the flashcard deck                                          → data-progress="known/total"
// so no widget knows this file exists. Answers are NOT restored on reload — a returning
// learner gets a fresh page to practise on; the record remembers how they did.
//
// Renders: a status bar under the page's meta line (tally, best, done toggle); on the
// index a summary with a "continue" link and a reset; ticks on the index list and in
// the nav drawer. Follows changes made in another tab (storage event). Hidden in print.
//
// One key per course, learn:progress:<COURSE_MAP.id>. Every course on pdfarhad.com is
// served from ONE origin, so the id must be unique per course; no id → no progress.
// Storage that is missing or blocked leaves the page working, just without a record.

(() => {
  const MAP = window.COURSE_MAP;
  if (!MAP || !MAP.id || !Array.isArray(MAP.lessons)) return;

  const KEY = "learn:progress:" + MAP.id;
  const HERE = document.body.dataset.lesson || null;
  const IS_INDEX = HERE === "index";
  const ITEMS = ".build, .gap, .q, .match .from > li";
  const now = () => new Date().toISOString();

  const COURSE = [...MAP.lessons,
    ...(MAP.groups || []).flatMap(g => Array.isArray(g.items) ? g.items : [])];

  // ---- storage ------------------------------------------------------------
  const empty = () => ({ v: 1, pages: {} });
  function read() {
    try {
      const r = JSON.parse(localStorage.getItem(KEY));
      return r && r.v === 1 && r.pages && typeof r.pages === "object" ? r : empty();
    } catch { return empty(); }
  }
  function write() { try { localStorage.setItem(KEY, JSON.stringify(rec)); } catch { /* keep going in memory */ } }
  let rec = read();
  let undone = false;            // the reader undid "done" this session: don't auto-mark again

  // ---- the tally ----------------------------------------------------------
  // n items on the page, did = answered, ok = right first try; `words` is the share
  // of n that came from a deck (a deck-only page counts words known, not items done)
  function tally(root) {
    let n = 0, did = 0, ok = 0, words = 0;
    root.querySelectorAll(ITEMS).forEach(el => {
      if (el.classList.contains("build") && !el.querySelector(".solution")) return;
      n++;
      if (el.dataset.result) { did++; if (el.dataset.result === "ok") ok++; }
    });
    root.querySelectorAll("[data-progress]").forEach(el => {
      const m = /^(\d+)\s*\/\s*(\d+)$/.exec(el.dataset.progress || "");
      if (m) { n += +m[2]; did += +m[1]; ok += +m[1]; words += +m[2]; }
    });
    return { n, did, ok, words };
  }

  // ---- the page record ----------------------------------------------------
  function page() { return HERE ? rec.pages[HERE] : undefined; }
  function ensure(ts = now()) {
    return rec.pages[HERE] || (rec.pages[HERE] = {
      first: ts, last: ts, n: 0, did: 0, ok: 0, best: 0, done: false });
  }

  function sync() {
    const t = tally(document.body);
    let p = page();
    if (!p) { if (t.did === 0) { render(); return; } p = ensure(); }
    p.n = t.n;
    if (t.did > 0) { p.did = t.did; p.ok = t.ok; }
    p.best = Math.max(p.best || 0, t.ok);
    if (t.n > 0 && t.did === t.n && !p.done && !undone) {
      p.done = true; p.doneBy = "practice"; p.doneAt = now();
    }
    write();
    render(t);
  }

  function markDone(flag) {
    const p = ensure();
    p.done = !!flag;
    p.doneBy = "reader";
    if (flag) p.doneAt = now(); else { delete p.doneAt; undone = true; }
    write();
    render();
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch { /* nothing to remove */ }
    rec = empty();
    render();
  }

  // ---- the summary (index) ------------------------------------------------
  const status = p => p ? (p.done ? "done" : "started") : "new";
  function summary() {
    const pages = COURSE.map(item => {
      const p = rec.pages[item.id];
      return { ...item, rec: p, status: status(p) };
    });
    const open = pages.filter(x => x.status !== "done");
    const recent = open.filter(x => x.rec && x.rec.last)
      .sort((a, b) => (a.rec.last < b.rec.last ? 1 : -1))[0];
    return { pages, done: pages.length - open.length, total: pages.length,
             next: recent || open[0] || null };
  }

  // ---- rendering ----------------------------------------------------------
  const esc = s => String(s).replace(/[&<>"]/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const day = iso => { try { return new Date(iso).toLocaleDateString(undefined,
    { day: "numeric", month: "short" }); } catch { return ""; } };
  const norm = h => String(h || "").replace(/^\.\//, "").replace(/\.html$/, "");
  const itemFor = href => COURSE.find(i => {
    const a = norm(href), b = norm(i.path);
    return a === b || a.endsWith("/" + b);
  });

  const css = `
  .lp-bar { display: flex; align-items: center; gap: var(--s-2, .75rem); flex-wrap: wrap;
    margin: var(--s-2, .75rem) 0 var(--s-4, 1.6rem);
    font: 500 12.5px/1.6 var(--mono, ui-monospace, Menlo, monospace); color: var(--muted, #6d7178); }
  .lp-bar.lp-after-meta { margin-top: calc(-1 * var(--s-4, 1.6rem)); margin-bottom: var(--s-5, 2.4rem); }
  .lp-track { flex: 0 0 110px; height: 6px; border-radius: 3px; background: var(--border, #e5e0d2); overflow: hidden; }
  .lp-fill { height: 100%; width: 0; background: var(--accent, #0f62b7); transition: width .25s; }
  .lp-bar.done .lp-fill { background: var(--green, #0a7d54); }
  .lp-bar.done .lp-text { color: var(--green, #0a7d54); }
  .lp-btn { font: inherit; font-size: 11.5px; cursor: pointer; border-radius: 999px;
    padding: .1rem .65rem; border: 1px solid var(--border, #e5e0d2);
    background: var(--card, #faf7ee); color: var(--accent-ink, #0a4d92); }
  .lp-btn:hover { border-color: var(--accent, #0f62b7); }
  .lp-summary { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--s-1, .4rem) var(--s-3, 1.1rem);
    margin: 0 0 var(--s-4, 1.6rem); padding: var(--s-2, .75rem) var(--s-3, 1.1rem);
    border: 1px solid var(--border, #e5e0d2); background: var(--card, #faf7ee); border-radius: 10px;
    font: 500 12.5px/1.6 var(--mono, ui-monospace, Menlo, monospace); color: var(--muted, #6d7178); }
  .lp-summary b { color: var(--ink, #22242a); }
  .lp-continue { margin-left: auto; color: var(--accent-ink, #0a4d92); font-weight: 700; text-decoration: none; }
  .lp-continue:hover { text-decoration: underline; }
  .lp-note { flex-basis: 100%; font-size: 11px; color: var(--faint, #9aa0a8); }
  .lp-reset { font: inherit; background: none; border: 0; padding: 0; cursor: pointer;
    color: var(--faint, #9aa0a8); text-decoration: underline; }
  .lp-tick { font: 700 11px/1.5 var(--mono, ui-monospace, Menlo, monospace); flex: none; }
  [data-lp="done"] .lp-tick { color: var(--green, #0a7d54); }
  [data-lp="started"] .lp-tick { color: var(--accent, #0f62b7); }
  @media print { .lp-bar, .lp-summary, .lp-tick { display: none !important; } }
  @media (prefers-reduced-motion: reduce) { .lp-fill { transition: none; } }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const main = document.querySelector("main") || document.body;

  // the page bar: under .meta, else under .lede, else under the h1
  let bar = null;
  function renderBar(t) {
    if (IS_INDEX || !HERE) return;
    t = t || tally(document.body);
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "lp-bar";
      bar.setAttribute("role", "status");
      const anchor = main.querySelector(".meta") || main.querySelector(".lede") || main.querySelector("h1");
      if (anchor) {
        anchor.insertAdjacentElement("afterend", bar);
        if (anchor.classList.contains("meta")) bar.classList.add("lp-after-meta");
      } else main.prepend(bar);
    }
    const p = page() || {};
    const done = !!p.done;
    const parts = [];
    if (done) parts.push(`✓ done${p.doneAt ? " " + day(p.doneAt) : ""}`);
    if (t.n > 0) {
      const deckOnly = t.words === t.n;
      parts.push(`${t.did} / ${t.n} ${deckOnly ? "words known" : "practised"}`);
      if ((p.best || 0) > 0 && !deckOnly) parts.push(`best ${p.best} / ${t.n}`);
    } else if (!done) parts.push("not marked as done yet");
    bar.classList.toggle("done", done);
    bar.innerHTML =
      (t.n > 0 ? `<div class="lp-track" aria-hidden="true"><div class="lp-fill"></div></div>` : "") +
      `<span class="lp-text">${esc(parts.join(" · "))}</span>` +
      `<button type="button" class="lp-btn">${done ? "undo" : "mark as done"}</button>`;
    const fill = bar.querySelector(".lp-fill");
    if (fill) fill.style.width = `${t.n ? Math.round(100 * t.did / t.n) : 0}%`;
    bar.querySelector(".lp-btn").addEventListener("click", () => markDone(!page()?.done));
  }

  // the index: summary + ticks on the course list
  let box = null;
  function renderIndex() {
    if (!IS_INDEX) return;
    const s = summary();
    if (!box) {
      box = document.createElement("div");
      box.className = "lp-summary";
      const anchor = main.querySelector(".lede") || main.querySelector("h1");
      if (anchor) anchor.insertAdjacentElement("afterend", box); else main.prepend(box);
    }
    const next = s.next;
    box.innerHTML =
      `<span class="lp-summary-text"><b>${s.done}</b> of ${s.total} pages done</span>` +
      (next
        ? `<a class="lp-continue" href="${esc(next.path)}">${s.done ? "Continue" : "Start"}: ${esc(next.title)} →</a>`
        : `<span class="lp-continue">All pages done ✓</span>`) +
      `<span class="lp-note">Progress is saved in this browser only · ` +
      `<button type="button" class="lp-reset">reset</button></span>`;
    box.querySelector(".lp-reset").addEventListener("click", () => {
      if (window.confirm("Clear your saved progress for this course in this browser?")) reset();
    });

    main.querySelectorAll(".course-list li").forEach(li => {
      const a = li.querySelector("a[href]");
      const item = a && itemFor(a.getAttribute("href"));
      if (!item) return;
      const x = s.pages.find(y => y.id === item.id);
      li.dataset.lp = x.status;
      tick(li, x, li.querySelector(".min"));
    });
  }

  function tick(host, x, before) {
    let el = host.querySelector(".lp-tick");
    if (x.status === "new") { if (el) el.remove(); return; }
    if (!el) {
      el = document.createElement("span");
      el.className = "lp-tick";
      if (before) before.insertAdjacentElement("beforebegin", el); else host.appendChild(el);
    }
    const p = x.rec;
    const inDrawer = host.closest(".cnav-drawer");
    el.textContent = x.status === "done" ? (inDrawer ? "✓" : "✓ done") : "◐ started";
    el.title = [
      x.status === "done" ? `done${p.doneAt ? " " + day(p.doneAt) : ""}` : `visited ${day(p.last)}`,
      p.n > 0 && p.best > 0 ? `best ${p.best} / ${p.n}` : "",
    ].filter(Boolean).join(" · ");
  }

  // ticks in the nav drawer (nav.js builds it synchronously, before this runs)
  function renderDrawer() {
    const s = summary();
    document.querySelectorAll(".cnav-drawer li").forEach(li => {
      const a = li.querySelector("a[href]");
      const item = a && itemFor(a.getAttribute("href"));
      if (!item) return;
      const x = s.pages.find(y => y.id === item.id);
      li.dataset.lp = x.status;
      if (x.status === "done") tick(a, x, a.querySelector(".cnav-min"));
      else li.querySelector(".lp-tick")?.remove();
    });
  }

  function render(t) {
    renderBar(t);
    renderIndex();
    renderDrawer();
    window.dispatchEvent(new CustomEvent("learn:progress", { detail: { key: KEY } }));
  }

  // ---- wiring -------------------------------------------------------------
  if (HERE && !IS_INDEX) {
    const ts = now();
    ensure(ts).last = ts;
    write();
  }
  render();

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => { queued = false; sync(); });
  }).observe(document.body, { attributes: true, attributeFilter: ["data-result", "data-progress"], subtree: true });

  window.addEventListener("storage", e => {
    if (e.key !== null && e.key !== KEY) return;
    rec = read();
    render();
  });

  window.LearnProgress = { key: KEY, tally, page, all: () => rec, markDone, reset, summary };
})();
