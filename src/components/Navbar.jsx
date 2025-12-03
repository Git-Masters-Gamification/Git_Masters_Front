import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { initTheme, toggleTheme } from '../utils/theme'; // usar toggleTheme para animación
import '../styles/components/_navbar.scss';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Inicializa el tema sin animación visual aquí
    initTheme();
    setIsDark(document.documentElement.classList.contains('theme--dark'));
    // listen to external changes (opcional)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('theme--dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  // Alternar tema oscuro/claro con el helper que aplica la animación
  const handleToggleTheme = () => {
    toggleTheme();
    // el cambio real de clase puede tardar un tick; refrescamos state con pequeña demora
    setTimeout(() => {
      setIsDark(document.documentElement.classList.contains('theme--dark'));
    }, 50);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__brand">
        <Link to="/dashboard" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          Git Masters
        </Link>
      </div>

      <button
        className="navbar__toggle"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label="Abrir menú"
      >
        <span className="sr-only">Menu</span>☰
      </button>

      <div id="primary-navigation" className={`navbar__links ${menuOpen ? 'is-open' : ''}`}>
        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <Link to="/badges" onClick={() => setMenuOpen(false)}>Badges</Link>
            <Link to="/teams" onClick={() => setMenuOpen(false)}>Teams</Link>
            <Link to="/statistics" onClick={() => setMenuOpen(false)}>Statistics</Link>

            {/* Leaderboard + Rank History (ambos visualmente iguales ahora) */}
            <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
            <Link to="/rank-history" onClick={() => setMenuOpen(false)}>Rank History</Link>

            {/* Otros (finales) */}
            <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
            <Link to="/rules-points" onClick={() => setMenuOpen(false)}>Rules/Points</Link>
            <Link to="/rankings" onClick={() => setMenuOpen(false)}>Rankings</Link>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>

      <div className="navbar__actions">
        {/* THEME TOGGLE — estructura simple con dos iconos que CSS alterna */}
        <button
          className="navbar__theme-toggle"
          onClick={handleToggleTheme}
          aria-pressed={isDark}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          <span className="icon icon--sun" aria-hidden="true">☀️</span>
          <span className="icon icon--moon" aria-hidden="true">🌙</span>
        </button>

        {user && (
          <div className="navbar__user" aria-live="polite">
            <span className="navbar__avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={`${user.username} avatar`} />
              ) : (
                <span className="avatar--initial">{user?.username?.[0]?.toUpperCase()}</span>
              )}
            </span>

            <span className="navbar__name" title={user.displayName || user.username}>
              {user.displayName || user.username}
            </span>

            <button
              onClick={handleLogout}
              className="navbar__logout"
              title="Cerrar sesión"
            >
              <span className="logout__icon" aria-hidden="true">⎋</span>
              <span className="logout__text">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}