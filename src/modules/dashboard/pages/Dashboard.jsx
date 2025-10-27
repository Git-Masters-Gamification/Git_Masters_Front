// src/modules/dashboard/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useDashboardData from '../hooks/useDashboardData';
import Loader from '../../../components/Loader';
import { AuthContext } from '../../../context/AuthContext';
import '../../../styles/pages/_dashboard.scss';

export default function Dashboard() {
  const { data, stats, loading, error } = useDashboardData();
  const { logout, refresh } = useContext(AuthContext);

  // Helper para mostrar valores seguros en JSX
  const renderValue = (val, fallback = '—') => {
    if (val === null || val === undefined) return fallback;

    // Si es array, devolvemos su longitud (útil para breakdowns)
    if (Array.isArray(val)) return val.length;

    // Si es objeto, intentamos formatearlo inteligentemente
    if (typeof val === 'object') {
      // Caso específico: objeto con { rule, totalPoints }
      if ('rule' in val || 'totalPoints' in val) {
        const rule = val.rule ?? '—';
        const pts = val.totalPoints ?? 0;
        return `${rule} (${pts} pts)`;
      }
      // Fallback: stringificar (pequeño y seguro)
      try {
        return JSON.stringify(val);
      } catch {
        return fallback;
      }
    }

    // Para strings/números/booleanos devolvemos tal cual
    return val;
  };

  if (loading) return <Loader message="Cargando dashboard..." />;

  if (error) {
    if (error.response?.status === 401) logout();
    return (
      <div className="dashboard page page--dashboard">
        <h2 className="dashboard__title">Error al cargar el Dashboard</h2>
        <p className="dashboard__message">
          {error.response?.status === 404
            ? 'No encontrado'
            : 'Error interno. Intenta nuevamente.'}
        </p>
        <button
          className="dashboard__retry-btn"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard page page--dashboard">
      {/* === Encabezado === */}
      <header className="dashboard__header">
        <h2 className="dashboard__title">Dashboard</h2>
        <p className="dashboard__subtitle">Resumen general de tu cuenta</p>
      </header>

      {/* === Resumen principal === */}
      <section className="dashboard__summary">
        <div className="dashboard__item">
          Puntos totales: <strong>{renderValue(data?.pointsTotal, '—')}</strong>
        </div>
        <div className="dashboard__item">
          Posición: <strong>{renderValue(data?.rank, '—')}</strong>
        </div>
        <div className="dashboard__item">
          Insignias: <strong>{renderValue(data?.badges ?? [], 0)}</strong>
        </div>
      </section>

      {/* === Estadísticas recientes === */}
      <section className="dashboard__stats">
        <h3 className="dashboard__stats-title">Estadísticas recientes</h3>

        {stats ? (
          <div className="dashboard__stats-cards">
            <div className="dashboard__stat-card">
              <span className="dashboard__stat-label">Puntos últimos 7 días: </span>
              <span className="dashboard__stat-value neon">
                {renderValue(stats.pointsLast7Days, 0)}
              </span>
            </div>

            <div className="dashboard__stat-card">
              <span className="dashboard__stat-label">Actividad más valiosa: </span>
              <span className="dashboard__stat-value">
                {renderValue(stats.mostValuableActivity, 'N/A')}
              </span>
            </div>

            <div className="dashboard__stat-card">
              <span className="dashboard__stat-label">Actividades registradas: </span>
              <span className="dashboard__stat-value">
                {renderValue(stats.activityBreakdown ?? [], 0)}
              </span>
            </div>
          </div>
        ) : (
          <p className="dashboard__stats-empty">No hay datos disponibles.</p>
        )}
      </section>

      {/* === Navegación rápida === */}
      <nav className="dashboard__nav">
        <h3 className="dashboard__nav-title">Navegación rápida</h3>
        <ul className="dashboard__nav-list">
          <li className="dashboard__nav-item"><Link to="/profile">Ver perfil</Link></li>
          <li className="dashboard__nav-item"><Link to="/badges">Ver insignias</Link></li>
          <li className="dashboard__nav-item"><Link to="/teams">Ver equipos</Link></li>
          <li className="dashboard__nav-item"><Link to="/leaderboard">Leaderboard</Link></li>
          <li className="dashboard__nav-item"><Link to="/events">Eventos</Link></li>
        </ul>
      </nav>

      {/* === Acciones === */}
      <div className="dashboard__actions">
        <button
          onClick={() => refresh()}
          className="dashboard__refresh-btn"
        >
          🔄 Actualizar datos
        </button>
      </div>
    </div>
  );
}