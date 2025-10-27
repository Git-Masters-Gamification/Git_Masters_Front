import React, { useState, useEffect } from 'react';
import { setDarkMode } from '../utils/theme.js';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'dark';
    setDark(saved);
  }, []);

  const toggle = () => {
    setDarkMode(!dark);
    setDark(!dark);
  };

  return (
    <button onClick={toggle} style={{
      background: 'var(--color-brand-primary)',
      color: 'var(--color-ui-surface)',
      border: 'none',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      cursor: 'pointer'
    }}>
      {dark ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
    </button>
  );
}