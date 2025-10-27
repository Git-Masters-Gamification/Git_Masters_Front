// ======================================================
// Footer.jsx — Pie de página global con soporte de tema
// ======================================================

import React from "react";
import "../styles/components/_footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>© {new Date().getFullYear()} <span>Git Masters</span> — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}