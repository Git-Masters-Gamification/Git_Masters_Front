// src/modules/rules-points/pages/RulesPointsPage.jsx
import React from 'react';
import useRulesPoints from '../hooks/useRulesPoints';
import RulesActivityForm from '../components/RulesActivityForm';
import Loader from '../../../components/Loader';
import '../../../styles/pages/_rules-points.scss';

export default function RulesPointsPage() {
  const { me, leaderboard, loading, error, postActivityDev } = useRulesPoints();

  if (loading) return <Loader />;
  if (error)
    return <p className="error-message">Error al cargar datos: {String(error)}</p>;

  // 🛡️ Evita errores al intentar renderizar objetos directamente
  const safeText = (val) => {
    if (val == null) return '';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  return (
    <div className="rules-points-page">
      <h1>Dashboard de Puntos</h1>

      {me && (
        <div className="user-stats">
          <h2>Mis puntos</h2>
          <p>
            <strong>Total:</strong> {safeText(me.pointsBalance ?? me.pointsTotal ?? 0)}
          </p>
          {me.rank && (
            <p>
              <strong>Ranking:</strong> #{safeText(me.rank)}
            </p>
          )}
          {me.category && (
            <p style={{ color: me.category?.color || '#555' }}>
              <strong>Categoría:</strong>{' '}
              {safeText(me.category?.name ?? me.category)}
            </p>
          )}
        </div>
      )}

      <div className="leaderboard-section">
        <h2>Leaderboard</h2>
        <ul className="leaderboard-list">
          {leaderboard.map((user, index) => (
            <li key={user.id || index}>
              <span className="rank">#{index + 1}</span>
              <span className="username">{safeText(user.username)}</span>
              <span className="points">{safeText(user.pointsBalance ?? 0)} pts</span>
              {user.category && (
                <span
                  className="category"
                  style={{
                    marginLeft: '0.5rem',
                    color:
                      typeof user.category === 'object'
                        ? user.category.color
                        : '#666',
                  }}
                >
                  {safeText(
                    typeof user.category === 'object'
                      ? user.category.name
                      : user.category
                  )}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <RulesActivityForm onSubmit={postActivityDev} />
    </div>
  );
}