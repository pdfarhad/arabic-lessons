// gapfill.js — tap-a-chip-into-the-gap practice (prepositions, particles, endings).
//
// Markup contract (degrades to a worked example with no JS — sentence, options and
// answer are plain markup; JS hides the answer until it is earned, print shows it):
//
//   <div class="gap" data-id="g1">
//     <p class="task">“I live in a flat.”</p>
//     <p class="sentence ar">أَسْكُنُ ___ شَقَّةٍ.</p>     <!-- ___ marks the gap -->
//     <p class="options ar">في · مِنْ · إِلى</p>            <!-- · separates chips -->
//     <p class="answer ar">في</p>
//     <p class="why">في puts you inside the place.</p>       <!-- optional, shown on solve -->
//   </div>
//
// The learner taps a chip; the gap fills and is graded at once. A correct fill is
// spoken aloud (whole sentence) and the .why line appears; after two misses a
// "show answer" button is offered. An element with id="gap-score" on the page, if
// present, shows "solved / total". Once solved, the .gap carries data-result="ok"
// (first try) or "bad" (after a miss or a reveal) for exam-score.js. Client-side
// only — identical on the static site.

(() => {
  const esc = s => String(s).replace(/[&<>"]/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const boxes = [...document.querySelectorAll(".gap")];
  const score = document.getElementById("gap-score");
  let solvedCount = 0;

  function updateScore() {
    if (score) score.textContent = `${solvedCount} / ${boxes.length} solved`;
  }

  boxes.forEach(box => {
    const sentEl = box.querySelector(".sentence");
    const optEl = box.querySelector(".options");
    const ansEl = box.querySelector(".answer");
    const whyEl = box.querySelector(".why");
    if (!sentEl || !optEl || !ansEl) return;

    const sentence = sentEl.textContent.trim().replace(/\s+/g, " ");
    const answer = ansEl.textContent.trim();
    const options = optEl.textContent.split("·").map(s => s.trim()).filter(Boolean);
    if (!sentence.includes("___") || !options.includes(answer)) return;

    sentEl.hidden = true; optEl.hidden = true; ansEl.hidden = true;
    if (whyEl) whyEl.hidden = true;

    // shuffle the chips so position never gives the answer away
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const [before, after] = sentence.split("___");
    let misses = 0, solved = false, filled = "";

    const ui = document.createElement("div");
    ui.className = "gap-ui";
    box.appendChild(ui);

    function render(status) {
      const slotClass = solved ? "ok" : (filled ? "bad" : "");
      ui.innerHTML = `
        <p class="gap-sentence ar">${esc(before)}<span class="gap-slot ${slotClass}">${
          filled ? esc(filled) : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}</span>${esc(after)}</p>
        <div class="gap-chips ar" role="group" aria-label="choices">
          ${options.map(o => `<button type="button" class="gap-chip${solved && o === answer ? " on" : ""}"
             data-w="${esc(o)}" ${solved ? "disabled" : ""}>${esc(o)}</button>`).join("")}
        </div>
        <div class="gap-controls">
          ${solved
            ? `<span class="gap-ok">✓</span>
               <button type="button" class="say gap-say" aria-label="play audio">🔊</button>`
            : `${status ? `<span class="gap-status">${esc(status)}</span>` : ""}
               ${misses >= 2 ? `<button type="button" class="gap-btn gap-reveal">show answer</button>` : ""}`}
        </div>`;
      if (whyEl) whyEl.hidden = !solved;

      ui.querySelectorAll(".gap-chip").forEach(b => b.addEventListener("click", () => pick(b.dataset.w)));
      ui.querySelector(".gap-reveal")?.addEventListener("click", () => { filled = answer; finish(true); });
      const say = ui.querySelector(".gap-say");
      say?.addEventListener("click", () => window.ArabicAudio?.speak(before + answer + after, say));
    }

    function finish(revealed) {
      solved = true; solvedCount++; updateScore();
      box.dataset.result = (!revealed && misses === 0) ? "ok" : "bad";
      render();
      window.ArabicAudio?.speak(before + answer + after);
    }

    function pick(word) {
      if (solved) return;
      filled = word;
      if (word === answer) { finish(); return; }
      misses++;
      render(misses === 1 ? "not that one — try again" : "still not it");
    }

    render();
  });

  updateScore();
})();
