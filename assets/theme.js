/* theme.js — the reader-operated theme switch for this workspace.
 * Adapted from the learn skill's components/theme.js; the theme is named
 * "fuji" (Mount Fuji at night: indigo sky, snow ink, dawn-pink accent).
 *
 *   light  the course's normal page — the DEFAULT, and what every page renders
 *          as if this script never runs or localStorage is unavailable.
 *   fuji   the palette in theme.css, reached only by pressing the button.
 *
 * Every page also carries a synchronous <head> guard (wired by
 * scripts/wire-theme.py) so the choice applies before first paint:
 *
 *   <script>try{var t=localStorage.getItem('learn:theme');
 *     if(t==='fuji')document.documentElement.setAttribute('data-theme',t)}
 *     catch(e){}</script>
 *
 * Both the guard and stored() below WHITELIST the value — a junk or stale
 * stored value leaves the page on the default. The two whitelists must agree;
 * change them together via the wiring script, never by hand across pages.
 */

const KEY = 'learn:theme';
const DEFAULT = 'light';

/* The ring: each theme names its successor. Two entries = a toggle; a third
   would cycle with no handler changes. The glyph shows the theme you would GET
   by pressing; the label carries both states. */
const FACE = {
  light: { glyph: '🗻', next: 'fuji', label: 'Theme: light. Switch to fuji night.' },
  fuji: { glyph: '☀', next: 'light', label: 'Theme: fuji night. Switch back to light.' },
};

const THEMES = Object.keys(FACE);

function stored() {
  try {
    const v = localStorage.getItem(KEY);
    return THEMES.includes(v) ? v : null;
  } catch { return null; }
}

function remember(theme) {
  try { localStorage.setItem(KEY, theme); } catch { /* not fatal */ }
}

export function currentTheme() {
  const t = document.documentElement.getAttribute('data-theme');
  return THEMES.includes(t) ? t : DEFAULT;
}

/* The default REMOVES the attribute rather than setting data-theme="light",
   so the default state is the plain unqualified stylesheet. */
export function applyTheme(theme) {
  const next = THEMES.includes(theme) ? theme : DEFAULT;
  if (next === DEFAULT) document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', next);
  return next;
}

function paint(btn, theme) {
  const face = FACE[theme] || FACE[DEFAULT];
  btn.textContent = face.glyph;
  btn.title = face.label;
  btn.setAttribute('aria-label', face.label);
  btn.dataset.theme = theme;
}

export function mountThemeToggle() {
  if (!document.body) return;
  if (document.querySelector('.theme-btn')) return;   // idempotent

  const theme = applyTheme(stored() || DEFAULT);

  const btn = document.createElement('button');
  btn.className = 'theme-btn';
  btn.type = 'button';
  paint(btn, theme);

  btn.addEventListener('click', () => {
    const next = FACE[currentTheme()].next;
    applyTheme(next);
    remember(next);
    paint(btn, next);
  });

  document.body.appendChild(btn);
}

/* Follow a switch made in another tab, so two open lessons agree. */
window.addEventListener('storage', e => {
  if (e.key !== KEY) return;
  const theme = applyTheme(stored() || DEFAULT);
  const btn = document.querySelector('.theme-btn');
  if (btn) paint(btn, theme);
});

mountThemeToggle();
