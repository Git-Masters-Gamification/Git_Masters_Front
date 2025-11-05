/* Theme utilities
 * - setDarkMode(enabled): aplica el tema oscuro / claro y sincroniza data-theme
 * - toggleTheme(): alterna el tema y dispara la animación "transitioning"
 * - initTheme(): inicializa según localStorage o prefers-color-scheme
 *
 * Nota: respeta prefers-reduced-motion.
 *
 * IMPORTANTE: TRANSITION_MS está sincronizado con --theme-transition-duration en CSS (0.55s -> 550ms)
 */

const TRANSITION_MS = 550; // ms — sincronizado con CSS (--theme-transition-duration: 0.55s)

export function setDarkMode(enabled) {
  const html = document.documentElement;

  // Mantener compatibilidad con la clase histórica
  html.classList.toggle('theme--dark', enabled);

  // Atributo data-theme para compatibilidad con variables CSS (tu _variables.scss usa [data-theme])
  html.setAttribute('data-theme', enabled ? 'dark' : 'light');

  // Guardar preferencia
  try {
    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  } catch (e) {
    // Si localStorage no está disponible, no rompemos la app
    // (por ejemplo en entornos con bloqueo de cookies)
    // eslint-disable-next-line no-console
    console.warn('No se pudo guardar la preferencia de tema en localStorage.', e);
  }
}

/* Alterna el tema y agrega una clase temporal para disparar el "flash" visual.
   Respeta prefers-reduced-motion: si el usuario pidió reducir movimiento,
   no añade la clase de transición (evita el overlay animado). */
export function toggleTheme() {
  const html = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Añadimos la clase temporal solo si el usuario no pidió reducir movimiento
  if (!prefersReduced) {
    html.classList.add('theme--transitioning');
  }

  const willBeDark = !html.classList.contains('theme--dark');
  setDarkMode(willBeDark);

  // removemos la clase temporal después del tiempo de la animación
  if (!prefersReduced) {
    window.setTimeout(() => {
      html.classList.remove('theme--transitioning');
    }, TRANSITION_MS);
  }
}

/* Inicializa el tema al cargar la app:
   - primero revisa localStorage
   - sino, usa prefers-color-scheme
   - aplica theme class/attribute sin animación (no se dispara overlay)
*/
export function initTheme() {
  const html = document.documentElement;
  let saved = null;

  try {
    saved = localStorage.getItem('theme');
  } catch (e) {
    // localStorage puede fallar en algunos entornos; ignorar si sucede
    // eslint-disable-next-line no-console
    console.warn('No se pudo leer theme de localStorage.', e);
  }

  if (saved === 'dark') {
    html.classList.add('theme--dark');
    html.setAttribute('data-theme', 'dark');
    return;
  }

  if (saved === 'light') {
    html.classList.remove('theme--dark');
    html.setAttribute('data-theme', 'light');
    return;
  }

  // si no hay guardado, respetar preferencia del sistema (fallback)
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.classList.toggle('theme--dark', prefersDark);
  html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}