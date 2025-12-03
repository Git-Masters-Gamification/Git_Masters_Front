// ======================================================
// src/App.jsx — Estructura principal de la aplicación
// Incluye Navbar, contenido dinámico (rutas) y Footer
// Inicializa el tema al arrancar para aplicar theme--dark si estaba guardado
// ======================================================

import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { initTheme } from "./utils/theme"; // ← inicializa tema al montar

// Estilos globales
import "./styles/components/_navbar.scss";
import "./styles/components/_footer.scss";
import "./styles/main.scss"; // asegúrate de importar el main global si no está ya

export default function App() {
  useEffect(() => {
    // Aplica el tema guardado (si existe) al arrancar la app
    initTheme();
  }, []);

  return (
    <div className="app">
      {/* 🔝 Barra de navegación */}
      <Navbar />

      {/* 🌐 Contenido principal */}
      <main className="app__content">
        <AppRoutes />
      </main>

      {/* 🔻 Pie de página */}
      <Footer />
    </div>
  );
}