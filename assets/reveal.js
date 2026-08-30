// reveal.js — beat-by-beat reveal player for build-up scenes.
//
// Markup contract (degrades to the full scene with no JS and in print — every
// beat and every caption is plain markup; JS only hides the beats that have
// not been reached yet):
//
//   <div class="reveal" data-autoplay="2400">      <!-- ms per beat, optional -->
//     <div class="beat">
//       …any HTML for this beat…
//       <p class="beat-cap">caption for this beat</p>
//     </div>
//     <div class="beat">…</div>
//   </div>
//
// Beats accumulate: reaching beat 3 shows beats 1–3 (the current one marked
// .now, earlier ones .past). Controls: ‹ › step, ▶ autoplay, "show all".
// Honours prefers-reduced-motion (no entrance animation). Client-side only —
// identical on the static site.

(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".reveal").forEach(box => {
    const beats = [...box.querySelectorAll(":scope > .beat")];
    if (beats.length < 2) return;
    const delay = +box.dataset.autoplay || 2400;
    let i = 0, timer = null;

    const ctl = document.createElement("div");
    ctl.className = "reveal-controls";
    ctl.innerHTML =
      `<button type="button" data-act="prev" aria-label="previous beat">‹</button>` +
      `<button type="button" data-act="play" aria-label="play">▶</button>` +
      `<button type="button" data-act="next" aria-label="next beat">›</button>` +
      `<span class="reveal-pos" aria-live="polite"></span>` +
      `<button type="button" data-act="all" class="reveal-all">show all</button>`;
    box.appendChild(ctl);
    box.classList.add("reveal-js");
    const playBtn = ctl.querySelector('[data-act="play"]');
    const pos = ctl.querySelector(".reveal-pos");

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      playBtn.textContent = "▶";
      playBtn.setAttribute("aria-label", "play");
    }
    function show(n, animate) {
      i = Math.max(0, Math.min(beats.length - 1, n));
      beats.forEach((b, k) => {
        b.hidden = k > i;
        b.classList.toggle("now", k === i);
        b.classList.toggle("past", k < i);
        b.classList.remove("enter");
      });
      if (animate && !reduced) {
        void beats[i].offsetWidth;            // restart the entrance animation
        beats[i].classList.add("enter");
      }
      pos.textContent = `${i + 1} / ${beats.length}`;
      if (i === beats.length - 1) stop();
    }
    function play() {
      if (i === beats.length - 1) show(0, true);
      playBtn.textContent = "❚❚";
      playBtn.setAttribute("aria-label", "pause");
      timer = setInterval(() => {
        if (i < beats.length - 1) show(i + 1, true); else stop();
      }, delay);
    }

    ctl.addEventListener("click", e => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (!act) return;
      if (act === "prev") { stop(); show(i - 1, true); }
      else if (act === "next") { stop(); show(i + 1, true); }
      else if (act === "play") { timer ? stop() : play(); }
      else if (act === "all") { stop(); show(beats.length - 1, false); }
    });

    show(0, false);
  });
})();
