export function setDarkMode(enabled) {
  document.documentElement.classList.toggle('theme--dark', enabled);
  localStorage.setItem('theme', enabled ? 'dark' : 'light');
}

export function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') setDarkMode(true);
}