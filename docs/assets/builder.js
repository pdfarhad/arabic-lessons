// builder.js — tap-to-order sentence builder for grammar practice.
//
// Markup contract (degrades to a worked example with no JS — the solution is
// plain markup and only hidden once the widget takes over; print shows it):
//
//   <div class="build" data-id="b1">
//     <p class="task">Say: “This is my sister. She is a doctor.”</p>
//     <p class="solution ar">هَذِهِ أُخْتي. هِيَ طَبِيبَةٌ.</p>
//     <p class="distract ar">هَذا طَبِيبٌ</p>   <!-- optional wrong chips -->
//   </div>
//
// The learner taps Arabic word-chips into order; Check grades the sequence
// (punctuation ignored), a correct build is spoken aloud, and after two misses
// a reveal is offered. An element with id="build-score" on the page, if present,
// shows "built / total" (a revealed answer counts as built — it is a progress
// line, not a grade). Client-side only — works identically on the static site.

(() => {
  const strip = t => t.replace(/[.؟!،]/g, "");
  const esc = s => String(s).replace(/[&<>"]/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // optional progress line: <span id="build-score"></span> anywhere on the page
  const boxes = [...document.querySelectorAll(".build")].filter(b => b.querySelector(".solution"));
  const score = document.getElementById("build-score");
  let builtCount = 0;
  function updateScore() {
    if (score) score.textContent = `${builtCount} / ${boxes.length} built`;
  }

  boxes.forEach(box => {
    const solEl = box.querySelector(".solution");
    let counted = false;
    const countOnce = () => { if (!counted) { counted = true; builtCount++; updateScore(); } };
    const solutionText = solEl.textContent.trim().replace(/\s+/g, " ");
    const answer = solutionText.split(" ").map(strip).filter(Boolean);
    const distract = (box.querySelector(".distract")?.textContent.trim().split(/\s+/) || [])
      .map(strip).filter(Boolean);
    solEl.hidden = true;
    const dEl = box.querySelector(".distract");
    if (dEl) dEl.hidden = true;

    let pool = [], picked = [], misses = 0, solved = false;

    const ui = document.createElement("div");
    ui.className = "build-ui";
    box.appendChild(ui);

    function reset() {
      pool = [...answer, ...distract].map((w, i) => ({ w, i }));
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      picked = []; misses = 0; solved = false;
      render();
    }

    function render(status) {
      ui.innerHTML = `
        <div class="build-row build-answer ar" aria-label="your sentence">
          ${picked.length ? picked.map((c, k) =>
            `<button type="button" class="chip picked" data-k="${k}">${esc(c.w)}</button>`).join("")
            : `<span class="build-hint">اِبْنِ الجُمْلَة هُنا — tap the words below</span>`}
        </div>
        <div class="build-row build-pool ar" aria-label="word choices">
          ${pool.map((c, k) =>
            `<button type="button" class="chip" data-k="${k}">${esc(c.w)}</button>`).join("")}
        </div>
        <div class="build-controls">
          ${solved
            ? `<span class="build-ok">✓ ${esc(solutionText)}</span>
               <button type="button" class="say build-say" aria-label="play audio">🔊</button>`
            : `<button type="button" class="build-btn build-check">check</button>
               <button type="button" class="build-btn build-reset">reset</button>
               ${misses >= 2 ? `<button type="button" class="build-btn build-reveal">show answer</button>` : ""}
               ${status ? `<span class="build-status">${status}</span>` : ""}`}
        </div>`;

      ui.querySelectorAll(".build-pool .chip").forEach(b =>
        b.addEventListener("click", () => {
          if (solved) return;
          picked.push(pool.splice(+b.dataset.k, 1)[0]);
          render();
        }));
      ui.querySelectorAll(".build-answer .chip").forEach(b =>
        b.addEventListener("click", () => {
          if (solved) return;
          pool.push(picked.splice(+b.dataset.k, 1)[0]);
          render();
        }));
      ui.querySelector(".build-check")?.addEventListener("click", check);
      ui.querySelector(".build-reset")?.addEventListener("click", reset);
      ui.querySelector(".build-reveal")?.addEventListener("click", () => {
        solved = true; countOnce(); render();
      });
      const say = ui.querySelector(".build-say");
      say?.addEventListener("click", () => window.ArabicAudio.speak(solutionText, say));
    }

    function check() {
      const got = picked.map(c => c.w);
      if (got.length === answer.length && got.every((w, k) => w === answer[k])) {
        solved = true;
        countOnce();
        render();
        window.ArabicAudio.speak(solutionText);
      } else {
        misses++;
        const firstWrong = got.findIndex((w, k) => w !== answer[k]);
        render(got.length < answer.length
          ? "not all the words are there yet"
          : firstWrong === -1 ? "too many words — remove the extras"
          : `word ${firstWrong + 1} isn’t right — try again`);
      }
    }

    reset();
  });

  updateScore();
})();
