// ======================================================
// src/modules/auth/pages/Login.jsx
// Página de inicio de sesión con GitHub + soporte modo oscuro
// Mantiene AuthContext, initTheme y estructura original
// ======================================================

import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { initTheme } from "../../../utils/theme"; // Inicializa el tema según localStorage
import "../../../styles/pages/_login.scss";
import imagen from "../../../assets/imagen.png";

export default function Login() {
  const { login } = useContext(AuthContext);

  // 🧠 Inicializa el tema guardado (dark/light) al montar el componente
  useEffect(() => {
    initTheme(); // ← se asegura de aplicar el tema al cargar la página
  }, []);

  return (
    <main className="login">
      <section className="login__container">

        {/* 🧩 Logo principal */}
        <img
          src={imagen}
          alt="Logo de Git Masters"
          className="login__logo"
        />

        {/* 🏷️ Título y subtítulo */}
        <h1 className="login__title">Git Masters</h1>
        <p className="login__subtitle">
          Inicia sesión con tu cuenta de GitHub
        </p>

        {/* 🔐 Botón principal de inicio de sesión */}
        <button
          className="login__button"
          onClick={login}
          aria-label="Iniciar sesión con GitHub"
        >
          <svg
            className="login__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="22"
            height="22"
          >
            <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.85 10.94c.58.1.79-.25.79-.56v-2.02c-3.19.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.02 1.76 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.3-.52-1.5.11-3.12 0 0 .97-.31 3.18 1.18a10.8 10.8 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.62.23 2.82.11 3.12.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.77 1.08.77 2.18v3.24c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
          </svg>
          <span>Iniciar sesión con GitHub</span>
        </button>

      </section>
    </main>
  );
}
