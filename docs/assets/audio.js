// audio.js — Arabic speech via the browser's speechSynthesis.
// No audio files, no CDN: survives static hosting (GitHub Pages) unchanged.
//
// Usage:
//   <button class="say" data-say="السَّلامُ عَلَيْكُم">🔊</button>  → enhanced on load
//   ArabicAudio.speak("…")            → programmatic
//   ArabicAudio.button("…")           → returns a wired <button class="say">
//
// If the browser has no Arabic voice, the first .audio-warn element on the
// page is shown (never a silent failure).

window.ArabicAudio = (() => {
  let voice = null, warned = false;

  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return null;
    return voices.find(v => /^ar[-_]SA/i.test(v.lang))
        || voices.find(v => /^ar/i.test(v.lang))
        || null;
  }

  function warnIfMissing() {
    if (voice || warned) return;
    warned = true;
    const el = document.querySelector(".audio-warn");
    if (el) el.classList.add("show");
  }

  if ("speechSynthesis" in window) {
    voice = pickVoice();
    speechSynthesis.addEventListener("voiceschanged", () => { voice = pickVoice(); });
    // voices load async in some browsers; check again once they settle
    setTimeout(() => { voice = pickVoice(); warnIfMissing(); }, 1500);
  }

  function speak(text, btn) {
    if (!("speechSynthesis" in window)) { warnIfMissing(); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA";
    if (voice) u.voice = voice; else warnIfMissing();
    u.rate = 0.85;                       // a touch slower for learners
    if (btn) {
      btn.setAttribute("data-speaking", "");
      u.onend = u.onerror = () => btn.removeAttribute("data-speaking");
    }
    speechSynthesis.speak(u);
  }

  function button(text, label) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "say";
    b.textContent = "🔊";
    b.setAttribute("aria-label", label || "play audio");
    b.addEventListener("click", () => speak(text, b));
    return b;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-say]").forEach(el => {
      el.addEventListener("click", () => speak(el.dataset.say, el));
      if (!el.textContent.trim()) el.textContent = "🔊";
    });
  });

  return { speak, button };
})();
