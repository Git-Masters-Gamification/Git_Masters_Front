// ======================================================
// App.jsx — Estructura principal de la aplicación
// Incluye Navbar, contenido dinámico (rutas) y Footer
// ======================================================

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

// Estilos globales
import "./styles/components/_navbar.scss";
import "./styles/components/_footer.scss";

export default function App() {
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