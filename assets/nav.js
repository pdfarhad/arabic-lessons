// Course navigation: a hamburger button + slide-in drawer, rendered from
// window.COURSE_MAP (defined per-workspace in assets/course-map.js).
//
// Wiring, on every lesson / reference page (index uses assets/… paths):
//   <script src="../assets/course-map.js"></script>
//   <script src="../assets/nav.js"></script>
//
// Progressive enhancement: no COURSE_MAP → no nav. Styles are self-injected
// (CSS custom properties fall back sanely without the shared stylesheet).
// Hidden in print. Honors prefers-reduced-motion.
//
// EXTRA CATEGORIES. Beside `lessons`, a course may declare `groups`: named
// collections of pages that are NOT lessons and must not be numbered among them
// — reading chapters, labs, practice decks. Each renders under its own heading
// and is its OWN prev/next sequence, so "next" from a reading chapter is the
// next reading chapter rather than lesson 14:
//
//   groups: [{ label: "Reading Chapters",
//              items: [{ n: 1, id: "…", title: "…", path: "reading/….html", min: 25 }] }]

(() => {
  const MAP = window.COURSE_MAP;
  if (!MAP || !Array.isArray(MAP.lessons)) return;

  const GROUPS = (MAP.groups || []).filter((g) => Array.isArray(g.items) && g.items.length);

  // Paths in the map are workspace-root-relative, so they must be resolved
  // against the SITE root — which is not always the domain root. A GitHub Pages
  // *project* site serves the course from /<repo>/, and counting slashes from
  // the domain root sends every link one level too high there:
  // /repo/lessons/x.html + "../../lessons/x.html" -> /lessons/x.html, a 404.
  // So locate the current page among the known paths and strip it off instead.
  // Works at the domain root, under a sub-path, and over file://.
  const known = [
    ...MAP.lessons.map((l) => l.path),
    ...GROUPS.flatMap((g) => g.items.map((i) => i.path)),
    ...(MAP.reference || []).map((r) => r.path),
    MAP.index || "index.html",
  ];
  const base = (() => {
    const p = location.pathname;
    for (const k of known) {
      if (p.endsWith("/" + k)) return p.slice(0, p.length - k.length);
    }
    if (p.endsWith("/")) return p; // directory index, e.g. /repo/
    return p.slice(0, p.lastIndexOf("/") + 1); // unknown page: its own directory
  })();
  const rel = (p) => base + p;

  const here = document.body.dataset.lesson || null;
  const isCurrent = (item) =>
    (here && item.id === here) ||
    location.pathname.endsWith("/" + item.path) ||
    location.pathname === "/" + item.path;

  const css = `
  .cnav-btn { position: fixed; top: 14px; right: 14px; z-index: 60;
    width: 42px; height: 42px; border-radius: 50%;
    border: 1px solid var(--border, #e5e0d2); background: var(--card, #faf7ee);
    color: var(--accent-ink, #0a4d92); font-size: 17px; line-height: 1;
    cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
  .cnav-btn:hover { border-color: var(--accent, #0f62b7); }
  .cnav-overlay { position: fixed; inset: 0; background: rgba(20,24,31,.28);
    z-index: 61; opacity: 0; pointer-events: none; transition: opacity .25s; }
  .cnav-drawer { position: fixed; top: 0; right: 0; height: 100%;
    width: min(330px, 88vw); z-index: 62; overflow-y: auto;
    background: var(--bg, #fffdf6); border-left: 1px solid var(--border, #e5e0d2);
    transform: translateX(102%); transition: transform .25s ease;
    font: 15px/1.5 var(--serif, Georgia, serif); color: var(--ink, #22242a);
    padding: 18px 0 28px; }
  .cnav-open .cnav-overlay { opacity: 1; pointer-events: auto; }
  .cnav-open .cnav-drawer { transform: none; }
  .cnav-drawer h2 { font-size: 1.05rem; margin: 0 18px 2px; }
  .cnav-drawer h2 a { color: inherit; text-decoration: none; }
  .cnav-drawer .cnav-sub { margin: 0 18px 14px;
    font: 500 11px var(--mono, ui-monospace, Menlo, monospace);
    color: var(--muted, #6d7178); }
  .cnav-label { font: 700 10.5px var(--mono, ui-monospace, Menlo, monospace);
    letter-spacing: .12em; text-transform: uppercase;
    color: var(--muted, #6d7178); margin: 16px 18px 6px; }
  .cnav-drawer ol, .cnav-drawer ul { list-style: none; margin: 0; padding: 0; }
  .cnav-drawer li a { display: flex; gap: 9px; align-items: baseline;
    padding: 6px 18px; color: inherit; text-decoration: none; }
  .cnav-drawer li a:hover { background: var(--code-bg, #f5f2e9); }
  .cnav-drawer li.current a { border-left: 3px solid var(--accent, #0f62b7);
    padding-left: 15px; font-weight: 700; background: var(--blue-bg, #eef4fc); }
  .cnav-n { font: 600 11px var(--mono, ui-monospace, Menlo, monospace);
    color: var(--accent-ink, #0a4d92); min-width: 1.4em; }
  .cnav-min { margin-left: auto; font: 500 10.5px var(--mono, ui-monospace, Menlo, monospace);
    color: var(--faint, #9aa0a8); }
  .cnav-next { display: flex; justify-content: space-between; gap: 8px;
    margin: 18px 18px 0; padding-top: 12px;
    border-top: 1px solid var(--border, #e5e0d2); font-size: .9em; }
  .cnav-next a { color: var(--accent-ink, #0a4d92); }
  @media print { .cnav-btn, .cnav-drawer, .cnav-overlay { display: none !important; } }
  @media (prefers-reduced-motion: reduce) {
    .cnav-overlay, .cnav-drawer { transition: none; } }`;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const esc = (s) => String(s).replace(/[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const itemLis = (items) => items.map((l) =>
    `<li class="${isCurrent(l) ? "current" : ""}"><a href="${rel(l.path)}">
      <span class="cnav-n">${l.n}</span><span>${esc(l.title)}</span>
      ${l.min ? `<span class="cnav-min">${l.min}m</span>` : ""}</a></li>`).join("");

  const lessonLis = itemLis(MAP.lessons);

  const groupLists = GROUPS.map((g) =>
    `<p class="cnav-label">${esc(g.label)}</p><ol>${itemLis(g.items)}</ol>`).join("");

  const refLis = (MAP.reference || []).map((r) =>
    `<li${location.pathname.endsWith("/" + r.path) ? ' class="current"' : ""}>
      <a href="${rel(r.path)}"><span class="cnav-n">§</span><span>${esc(r.title)}</span></a></li>`).join("");

  const extLis = (MAP.external || []).map((x) =>
    `<li><a href="${x.url}"><span class="cnav-n">↗</span><span>${esc(x.title)}</span></a></li>`).join("");

  // Prev/next runs within ONE sequence — the lessons, or the group the current
  // page belongs to. Threading a reading chapter into the lesson chain would
  // offer a "next" that changes what kind of thing you are reading.
  const seq = [MAP.lessons, ...GROUPS.map((g) => g.items)]
    .find((items) => items.some(isCurrent)) || MAP.lessons;
  const idx = seq.findIndex(isCurrent);
  const prev = idx > 0 ? seq[idx - 1] : null;
  const next = idx >= 0 && idx < seq.length - 1 ? seq[idx + 1] : null;
  const nextNav = idx < 0 ? "" : `<div class="cnav-next">
    <span>${prev ? `<a href="${rel(prev.path)}">← ${prev.n}. ${esc(prev.title)}</a>` : ""}</span>
    <span>${next ? `<a href="${rel(next.path)}">${next.n}. ${esc(next.title)} →</a>` : ""}</span></div>`;

  const overlay = document.createElement("div");
  overlay.className = "cnav-overlay";
  const drawer = document.createElement("aside");
  drawer.className = "cnav-drawer";
  drawer.setAttribute("aria-label", "course navigation");
  drawer.innerHTML = `
    <h2><a href="${rel(MAP.index || "index.html")}">${esc(MAP.title || "Course")}</a></h2>
    ${MAP.subtitle ? `<p class="cnav-sub">${esc(MAP.subtitle)}</p>` : ""}
    <p class="cnav-label">Lessons</p><ol>${lessonLis}</ol>
    ${groupLists}
    ${refLis ? `<p class="cnav-label">Reference</p><ul>${refLis}</ul>` : ""}
    ${extLis ? `<p class="cnav-label">Links</p><ul>${extLis}</ul>` : ""}
    ${nextNav}`;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cnav-btn";
  btn.setAttribute("aria-label", "open course navigation");
  btn.setAttribute("aria-expanded", "false");
  btn.textContent = "☰";

  const setOpen = (open) => {
    document.documentElement.classList.toggle("cnav-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "✕" : "☰";
    if (open) drawer.querySelector("li.current a")?.scrollIntoView({ block: "center" });
  };
  btn.addEventListener("click", () =>
    setOpen(!document.documentElement.classList.contains("cnav-open")));
  overlay.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  document.body.append(overlay, drawer, btn);
})();
