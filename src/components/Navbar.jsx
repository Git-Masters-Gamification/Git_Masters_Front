import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { setDarkMode } from '../utils/theme'; // 🌓 Importamos función para alternar tema
import '../styles/components/_navbar.scss';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); // 🌙 Estado para saber el tema activo

  // Al montar el componente, sincroniza el estado con localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  // Alternar tema oscuro/claro
  const handleToggleTheme = () => {
    const newThemeState = !isDark;
    setIsDark(newThemeState);
    setDarkMode(newThemeState); // Actualiza clase HTML + localStorage
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/dashboard" className="navbar__logo">
          Git Masters
        </Link>
      </div>

      <button className="navbar__toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar__links ${menuOpen ? 'is-open' : ''}`}>
        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <Link to="/badges" onClick={() => setMenuOpen(false)}>Badges</Link>
            <Link to="/teams" onClick={() => setMenuOpen(false)}>Teams</Link>
            <Link to="/statistics" onClick={() => setMenuOpen(false)}>Statistics</Link>
            <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
            <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
            <Link to="/rules-points" onClick={() => setMenuOpen(false)}>Rules/Points</Link>
            <Link to="/rankings" onClick={() => setMenuOpen(false)}>Rankings</Link>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>

      <div className="navbar__actions">
        {/* 🌗 Botón para alternar tema */}
        <button
          className="navbar__theme-toggle"
          onClick={handleToggleTheme}
          title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {user && (
          <div className="navbar__user">
            <span className="navbar__avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" />
              ) : (
                user?.username?.[0]?.toUpperCase()
              )}
            </span>
            <span className="navbar__name">
              {user.displayName || user.username}
            </span>
            <button onClick={handleLogout} className="navbar__logout">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}