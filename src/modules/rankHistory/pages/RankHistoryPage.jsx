// ======================================================
// 🏆 RankHistoryPage.jsx
// Página: Historial de Rangos — Estilo Futurista + Gamificado
// Ubicación: src/modules/rankHistory/pages/RankHistoryPage.jsx
// ======================================================

import React, { useContext } from "react";
import { useRankHistory } from "../hooks/useRankHistory";
import RankHistoryTable from "../components/RankHistoryTable";
import { AuthContext } from "../../../context/AuthContext"; // ✅ Import del contexto de autenticación
import "../../../styles/pages/_rankHistory.scss";

export default function RankHistoryPage() {
  // ✅ Obtenemos el usuario autenticado desde el contexto global
  const { user } = useContext(AuthContext);
  const userId = user?.id; // Tomamos su ID (cuidando si aún no está cargado)

  // ✅ Pasamos el userId al hook personalizado
  const { history, loading, error } = useRankHistory(userId);

  // === ESTADOS DE CARGA Y ERROR ===
  if (loading)
    return (
      <div className="rank-history__loading text-center mt-10 text-cyan-400 animate-pulse">
        Cargando historial...
      </div>
    );

  if (error)
    return (
      <div className="rank-history__error text-red-400 text-center mt-10">
        ❌ Error al cargar el historial
      </div>
    );

  // === RENDER PRINCIPAL ===
  return (
    <section className="rank-history">
      <div className="rank-history__header">
        <h1>🏆 Historial de Rangos</h1>
        <p>Consulta cómo ha evolucionado tu nivel y rango mes a mes.</p>
      </div>

      <div className="rank-history__table-container">
        {history && history.length > 0 ? (
          <RankHistoryTable history={history} />
        ) : (
          <div className="rank-history__empty">
            No hay datos de historial de rangos todavía.
          </div>
        )}
      </div>
    </section>
  );
}