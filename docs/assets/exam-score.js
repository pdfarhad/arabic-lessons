// exam-score.js — the marks box for practice papers.
//
// Reads data-result="ok" | "bad", which the widgets stamp on each answered item
// (quiz.js on .q, gapfill.js on .gap, matching.js on .match .from > li), and shows
//   • per <section class="exercise" data-marks="6">: "k / 6" in its .marks element;
//   • in every .exam-total[data-total="40"]: the paper's running total.
// A mark is earned only by a first-try answer — the paper gives no second go.
// Nothing is persisted; reload the page for a fresh paper. Client-side only.

(() => {
  const ITEMS = ".q, .gap, .match .from > li";
  const exercises = [...document.querySelectorAll(".exercise[data-marks]")];
  const totals = [...document.querySelectorAll(".exam-total")];
  if (!exercises.length) return;

  function tally(root) {
    const items = [...root.querySelectorAll(ITEMS)];
    return {
      n: items.length,
      done: items.filter(i => i.dataset.result).length,
      ok: items.filter(i => i.dataset.result === "ok").length,
    };
  }

  function render() {
    let ok = 0, done = 0, n = 0, marks = 0;
    exercises.forEach(ex => {
      const t = tally(ex), m = +ex.dataset.marks;
      if (t.n !== m) console.warn("exam-score: item count ≠ marks", ex.id || ex, t.n, m);
      const el = ex.querySelector(".marks");
      if (el) { el.textContent = `${t.ok} / ${m}`; el.classList.toggle("marked", t.done === t.n); }
      ok += t.ok; done += t.done; n += t.n; marks += m;
    });
    totals.forEach(el => {
      const total = +el.dataset.total || marks;
      el.innerHTML = `<b>${ok}</b> / ${total}` +
        `<span class="exam-progress">${done} of ${n} answered</span>`;
      el.classList.toggle("marked", done === n);
    });
  }

  new MutationObserver(render).observe(document.body,
    { attributes: true, attributeFilter: ["data-result"], subtree: true });
  render();
})();
