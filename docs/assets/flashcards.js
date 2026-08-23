// flashcards.js — flip-card vocabulary deck.
//
// Page contract:
//   <script src="../assets/vocab-l01.js"></script>
//   <script>window.VOCAB_SET = window.VOCAB_L01;</script>
//   <div id="deck"></div>
//   <script src="../assets/flashcards.js"></script>
//
// Renders: direction toggle (AR→EN / EN→AR), category chips, the card
// (tap to flip; 🔊 speaks the Arabic), self-rating (Again / Got it) driving a
// lightweight two-box queue, progress meter, and a print-friendly word table
// below the deck. "Again" cards return to the queue until rated "Got it".
// Per-word streaks persist in localStorage (per-viewer convenience only; the
// deck works fine when storage is unavailable).

(() => {
  const SET = window.VOCAB_SET;
  const root = document.getElementById("deck");
  if (!SET || !root) return;

  const LS_KEY = "flashcards-" + SET.id;
  const store = (() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
    catch { return {}; }
  })();
  const save = () => { try { localStorage.setItem(LS_KEY, JSON.stringify(store)); } catch {} };

  const cats = [...new Set(SET.words.map(w => w.cat))];
  let dir = "ar-en", cat = "all", queue = [], pos = 0, flipped = false, done = 0;

  function activeWords() {
    return SET.words.filter(w => cat === "all" || w.cat === cat);
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function restart() {
    queue = shuffle(activeWords().slice());
    pos = 0; done = 0; flipped = false;
    render();
  }

  function rate(ok) {
    const w = queue[pos];
    store[w.ar] = ok ? (store[w.ar] || 0) + 1 : 0;
    save();
    if (ok) { done++; queue.splice(pos, 1); }
    else { queue.push(queue.splice(pos, 1)[0]); }        // recycle to the back
    if (pos >= queue.length) pos = 0;
    flipped = false;
    render();
  }

  const esc = s => String(s).replace(/[&<>"]/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function render() {
    const total = done + queue.length;
    const w = queue[pos];
    root.innerHTML = `
      <div class="fc-controls">
        <div class="fc-dirs">
          <button type="button" class="fc-chip ${dir === "ar-en" ? "on" : ""}" data-dir="ar-en">عربي → English</button>
          <button type="button" class="fc-chip ${dir === "en-ar" ? "on" : ""}" data-dir="en-ar">English → عربي</button>
        </div>
        <div class="fc-cats">
          <button type="button" class="fc-chip ${cat === "all" ? "on" : ""}" data-cat="all">all</button>
          ${cats.map(c => `<button type="button" class="fc-chip ${cat === c ? "on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}
        </div>
      </div>
      ${w ? `
      <div class="fc-card ${flipped ? "flipped" : ""}" role="button" tabindex="0"
           aria-label="flashcard — press to flip">
        ${dir === "ar-en" ? `
          <div class="fc-face fc-front"><span class="ar ar-big">${esc(w.ar)}</span></div>
          <div class="fc-face fc-back">
            <span class="fc-gloss">${esc(w.gloss)}</span>
            <span class="fc-pos">${esc(w.pos)}</span>
            ${w.note ? `<span class="fc-note">${esc(w.note)}</span>` : ""}
          </div>` : `
          <div class="fc-face fc-front"><span class="fc-gloss">${esc(w.gloss)}</span>
            <span class="fc-pos">${esc(w.pos)}</span></div>
          <div class="fc-face fc-back"><span class="ar ar-big">${esc(w.ar)}</span>
            ${w.note ? `<span class="fc-note">${esc(w.note)}</span>` : ""}</div>`}
      </div>
      <div class="fc-actions">
        <button type="button" class="say" id="fc-say" aria-label="play audio">🔊</button>
        ${flipped ? `
          <button type="button" class="fc-btn fc-again" id="fc-again">again ↻</button>
          <button type="button" class="fc-btn fc-good" id="fc-good">got it ✓</button>` : `
          <button type="button" class="fc-btn" id="fc-flip">show</button>`}
      </div>
      <p class="fc-progress">${done} done · ${queue.length} to go
        ${(store[w.ar] || 0) > 0 ? ` · streak ${store[w.ar]} on this card` : ""}</p>`
      : `<p class="fc-done">Deck finished — ${total} card${total === 1 ? "" : "s"} rated “got it”. 🎉</p>
         <div class="fc-actions"><button type="button" class="fc-btn" id="fc-restart">start over</button></div>`}
    `;

    root.querySelectorAll("[data-dir]").forEach(b =>
      b.addEventListener("click", () => { dir = b.dataset.dir; restart(); }));
    root.querySelectorAll("[data-cat]").forEach(b =>
      b.addEventListener("click", () => { cat = b.dataset.cat; restart(); }));

    const card = root.querySelector(".fc-card");
    const flip = () => { flipped = !flipped; render(); };
    if (card) {
      card.addEventListener("click", flip);
      card.addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      });
    }
    root.querySelector("#fc-flip")?.addEventListener("click", e => { e.stopPropagation(); flip(); });
    root.querySelector("#fc-again")?.addEventListener("click", () => rate(false));
    root.querySelector("#fc-good")?.addEventListener("click", () => rate(true));
    root.querySelector("#fc-restart")?.addEventListener("click", restart);
    const sayBtn = root.querySelector("#fc-say");
    if (sayBtn && w) sayBtn.addEventListener("click", () =>
      window.ArabicAudio.speak(w.ar.split(" / ")[0], sayBtn));
  }

  // print/reference table — rendered once, below the deck
  const table = document.getElementById("word-table");
  if (table) {
    table.innerHTML = `<table>
      <thead><tr><th>Arabic</th><th>meaning</th><th>type</th><th>notes</th></tr></thead>
      <tbody>${SET.words.map(w => `<tr>
        <td class="ar">${esc(w.ar)}</td><td>${esc(w.gloss)}</td>
        <td>${esc(w.pos)}</td><td>${w.note ? esc(w.note) : ""}</td></tr>`).join("")}
      </tbody></table>`;
  }

  restart();
})();
