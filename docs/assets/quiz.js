import { validateQuestion, isMcqCorrect, buildAttempt } from './quiz-core.js';

const LESSON = document.body.dataset.lesson;

async function postAttempt(body) {
  const resp = await fetch('/quiz', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) throw new Error('quiz POST failed: ' + resp.status);
  return resp.json();
}

// Persist one attempt; on failure show a small inline note (no buffer, no retry).
// Off localhost (the public static site) there is no learn server: grade locally,
// skip persistence silently rather than showing a broken-looking note.
function record(qEl, ui, fields) {
  if (!/^(localhost|127\.)/.test(location.hostname)) return;
  postAttempt(buildAttempt({ lesson: LESSON, ...fields })).catch(() => {
    let note = ui.querySelector('.quiz-unsaved');
    if (!note) {
      note = document.createElement('div');
      note.className = 'quiz-unsaved';
      note.textContent = 'attempt not saved — teacher offline';
      ui.appendChild(note);
    }
    note.style.display = 'block';
  });
}

function enhanceMcq(qEl, prompt, answerIndex) {
  const ui = document.createElement('div'); ui.className = 'quiz-ui';
  qEl.appendChild(ui);
  const choices = [...qEl.querySelectorAll('.choices > li')];
  choices.forEach((li, i) => {
    li.classList.add('quiz-choice');
    li.addEventListener('click', () => {
      if (qEl.dataset.locked) return;
      qEl.dataset.locked = '1';
      const correct = isMcqCorrect(answerIndex, i);
      choices[answerIndex].classList.add('quiz-correct');
      if (!correct) li.classList.add('quiz-incorrect');
      record(qEl, ui, { question: qEl.dataset.id, type: 'mcq', prompt,
                        chosen: li.textContent.trim(), correct });
    });
  });
}

function enhanceRecall(qEl, prompt) {
  const answer = qEl.querySelector('.answer');
  const ui = document.createElement('div'); ui.className = 'quiz-ui';
  qEl.appendChild(ui);
  const show = document.createElement('button');
  show.textContent = 'Show answer';
  ui.appendChild(show);
  show.addEventListener('click', () => {
    answer.classList.add('quiz-shown');     // reveal by toggling CSS, never moving the node
    show.remove();
    for (const [label, correct] of [['✓ Got it', true], ['✗ Missed', false]]) {
      const b = document.createElement('button');
      b.className = 'quiz-rate'; b.textContent = label;
      b.addEventListener('click', () => {
        if (qEl.dataset.locked) return;
        qEl.dataset.locked = '1';
        ui.querySelectorAll('.quiz-rate').forEach((x) => { x.disabled = true; });
        record(qEl, ui, { question: qEl.dataset.id, type: 'recall', prompt,
                          chosen: null, correct });
      });
      ui.appendChild(b);
    }
  });
}

function enhance(qEl) {
  const type = qEl.dataset.type;
  const promptEl = qEl.querySelector('.prompt');
  const prompt = promptEl ? promptEl.textContent.trim() : '';
  const choiceCount = qEl.querySelectorAll('.choices > li').length;
  const hasAnswer = !!qEl.querySelector('.answer');
  const { ok, answerIndex } = validateQuestion({
    type, rawAnswer: qEl.dataset.answer, choiceCount, hasAnswer });
  if (!ok) { console.warn('learn-quiz: skipping malformed question', qEl.dataset.id); return; }
  if (type === 'mcq') enhanceMcq(qEl, prompt, answerIndex);
  else enhanceRecall(qEl, prompt);
}

if (LESSON) {
  document.querySelectorAll('.quiz .q').forEach(enhance);
}
