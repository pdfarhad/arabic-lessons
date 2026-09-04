// matching.js — join-the-two-columns practice (the paper's صِلْ بَيْنَ exercises).
//
// Markup contract (degrades to the printed exercise with no JS — both columns and
// the answer line are plain markup; JS hides the answer until it is earned, print
// shows it):
//
//   <div class="match" data-id="m1">
//     <p class="task">Join each thing to the place it is found in.</p>
//     <div class="match-cols">
//       <ol class="from ar">
//         <li data-key="ج" data-say="الفُرْنُ في المَطْبَخِ">فُرْن</li>   <!-- key = its partner's letter -->
//       </ol>
//       <ol class="to ar">
//         <li data-key="أ">غُرْفَةُ جُلوس</li>                             <!-- the letter is its label -->
//       </ol>
//     </div>
//     <p class="answer ar">١ ج · ٢ د · …</p>                              <!-- number → letter -->
//   </div>
//
// Tap an item in one column, then its partner in the other (either order). A right
// join locks the pair, colours it, stamps the partner with the item's number and
// speaks data-say (or the two words). A wrong join flashes both; the learner tries
// again, but that item's mark is lost — the paper gives no second go. Once joined,
// each .from item carries data-result="ok" (first try) or "bad", which
// exam-score.js reads. An element with id="match-score", if present, shows
// "joined / total". Client-side only — identical on the static site.

(() => {
  const DIGITS = "٠١٢٣٤٥٦٧٨٩";
  const arabicIndic = n => String(n).replace(/\d/g, d => DIGITS[d]);
  const score = document.getElementById("match-score");
  let joinedCount = 0, totalPairs = 0;
  const updateScore = () => { if (score) score.textContent = `${joinedCount} / ${totalPairs} joined`; };

  document.querySelectorAll(".match").forEach(box => {
    const from = [...box.querySelectorAll(".from > li")];
    const to = [...box.querySelectorAll(".to > li")];
    const ansEl = box.querySelector(".answer");
    const keys = to.map(li => li.dataset.key);
    const wellFormed = from.length > 0 && from.length === to.length
      && new Set(keys).size === keys.length
      && from.every(li => keys.includes(li.dataset.key));
    if (!wellFormed) return;                       // leave the printed exercise alone

    box.classList.add("match-js");
    if (ansEl) ansEl.hidden = true;
    totalPairs += from.length;
    let sel = null, left = from.length;

    const status = document.createElement("p");
    status.className = "match-status";
    box.appendChild(status);

    [...from.map(li => [li, "from"]), ...to.map(li => [li, "to"])].forEach(([li, side]) => {
      li.setAttribute("role", "button");
      li.tabIndex = 0;
      const act = () => tap(li, side);
      li.addEventListener("click", act);
      li.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); }
      });
    });

    function tap(li, side) {
      if (li.classList.contains("ok")) return;
      if (!sel || sel.side === side) {              // first pick, or re-pick on the same side
        if (sel) sel.li.classList.remove("sel");
        sel = { li, side };
        li.classList.add("sel");
        return;
      }
      const fromLi = side === "from" ? li : sel.li;
      const toLi = side === "to" ? li : sel.li;
      sel.li.classList.remove("sel");
      sel = null;
      if (fromLi.dataset.key === toLi.dataset.key) join(fromLi, toLi);
      else miss(fromLi, toLi);
    }

    function join(fromLi, toLi) {
      fromLi.classList.add("ok");
      toLi.classList.add("ok");
      toLi.dataset.pair = arabicIndic(from.indexOf(fromLi) + 1);
      fromLi.dataset.result = fromLi.dataset.misses ? "bad" : "ok";
      const say = fromLi.dataset.say || `${fromLi.textContent.trim()} ${toLi.textContent.trim()}`;
      window.ArabicAudio?.speak(say);
      joinedCount++; left--; updateScore();
      status.textContent = left ? "" : "✓ all joined";
      if (!left) box.classList.add("done");
    }

    function miss(fromLi, toLi) {
      fromLi.dataset.misses = (+fromLi.dataset.misses || 0) + 1;
      [fromLi, toLi].forEach(el => {
        el.classList.add("bad");
        setTimeout(() => el.classList.remove("bad"), 650);
      });
      status.textContent = "not a pair — try again";
    }
  });

  updateScore();
})();
