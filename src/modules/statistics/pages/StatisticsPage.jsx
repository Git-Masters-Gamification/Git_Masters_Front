import React, { useEffect } from "react";
import PointsSummary from "../components/PointsSummary";
import ActivityBreakdown from "../components/ActivityBreakdown";
import useStatisticsData from "../hooks/useStatisticsData";
import Loader from "../../../components/Loader";
import { initTheme } from "../../../utils/theme";
import "../../../styles/pages/_statistics.scss";

const StatisticsPage = () => {
  const { stats, loading, error } = useStatisticsData();

  useEffect(() => {
    try {
      initTheme();
    } catch (e) {
      console.warn("initTheme fallback (no disponible)", e);
    }
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="statistics__error text-center mt-10" role="alert">
        {error}
      </p>
    );

  const {
    pointsLast7Days = 0,
    mostValuableActivity = null,
    activityBreakdown = [],
  } = stats || {};

  return (
    <div className="page page--statistics statistics">
      <h1 className="statistics__title">Estadísticas personales</h1>

      <section className="statistics__summary">
        <PointsSummary stats={stats} className="statistics__points-summary" />
      </section>

      <section className="statistics__breakdown">
        <ActivityBreakdown
          breakdown={activityBreakdown}
          className="statistics__activity-breakdown"
        />
      </section>

      <div
        className="statistics__debug"
        aria-hidden={!!activityBreakdown?.length}
      >
        <h2>Datos completos</h2>

        <div className="statistics__debug-list">
          <div className="statistics__debug-item">
            <div className="debug-label">Puntos últimos 7 días:</div>
            <div
              className={`debug-value ${
                pointsLast7Days >= 0
                  ? "debug-value--positive"
                  : "debug-value--negative"
              }`}
            >
              {pointsLast7Days}
            </div>
          </div>

          {mostValuableActivity && (
            <div className="statistics__debug-item">
              <div className="debug-label">Actividad más valiosa:</div>
              <div className="debug-text">{mostValuableActivity.rule}</div>
              <div className="debug-sub">
                +{mostValuableActivity.totalPoints ?? 0} puntos
              </div>
            </div>
          )}

          {activityBreakdown?.length > 0 && (
            <div className="statistics__debug-item">
              <div className="debug-label">Desglose de actividad:</div>
              <ul className="debug-list">
                {activityBreakdown.map((item) => (
                  <li key={item.type} className="debug-list-item">
                    <span className="debug-item-type">{item.type}</span>
                    <span className="debug-item-count">{item.count ?? 0}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
