// src/modules/statistics/components/PointsSummary.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * Componente presentacional que ahora usa clases semánticas
 * para permitir overrides SCSS (modo oscuro).
 */
const PointsSummary = ({ stats, className = "" }) => {
  if (!stats) return null;

  const { pointsLast7Days = 0, mostValuableActivity = null } = stats;

  return (
    <div className={`points-summary ${className}`.trim()}>
      <h2 className="points-summary__title">Resumen de puntos</h2>

      <div className="points-summary__grid">
        <div className="points-summary__item">
          <p className="points-summary__label">Puntos en los últimos 7 días</p>
          <p className="points-summary__value">{pointsLast7Days}</p>
        </div>

        <div className="points-summary__item">
          <p className="points-summary__label">Actividad más valiosa</p>
          {mostValuableActivity ? (
            <>
              <p className="points-summary__activity">{mostValuableActivity.rule}</p>
              <p className="points-summary__sub">+{mostValuableActivity.totalPoints ?? 0} puntos</p>
            </>
          ) : (
            <p className="points-summary__empty">Sin datos aún</p>
          )}
        </div>
      </div>
    </div>
  );
};

PointsSummary.propTypes = {
  stats: PropTypes.shape({
    pointsLast7Days: PropTypes.number,
    mostValuableActivity: PropTypes.shape({
      rule: PropTypes.string,
      totalPoints: PropTypes.number,
    }),
  }),
  className: PropTypes.string,
};

export default PointsSummary;