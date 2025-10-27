// src/modules/statistics/pages/StatisticsPage.jsx
import React from "react";
import PointsSummary from "../components/PointsSummary";
import ActivityBreakdown from "../components/ActivityBreakdown";
import useStatisticsData from "../hooks/useStatisticsData";
import Loader from "../../../components/Loader";

const StatisticsPage = () => {
  const { stats, loading, error } = useStatisticsData();

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  const { pointsLast7Days, mostValuableActivity, activityBreakdown } = stats || {};

  return (
    <div className="page page--statistics statistics p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="statistics__title text-3xl font-bold text-gray-800 text-center mb-8">
        Estadísticas personales
      </h1>

      <section className="statistics__summary">
        <PointsSummary stats={stats} />
      </section>

      <section className="statistics__breakdown">
        <ActivityBreakdown breakdown={stats?.activityBreakdown} />
      </section>

      {/* === BLOQUE DE DEBUG VISUAL === */}
      <div className="statistics__debug mt-6 bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 text-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-sky-400">
          Datos completos
        </h2>

        <div className="space-y-3">
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Puntos últimos 7 días:</p>
            <p className={`text-2xl font-bold ${pointsLast7Days >= 0 ? "text-green-400" : "text-red-400"}`}>
              {pointsLast7Days}
            </p>
          </div>

          {mostValuableActivity && (
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Actividad más valiosa:</p>
              <p className="text-lg font-semibold text-sky-300">
                {mostValuableActivity.rule}
              </p>
              <p className="text-sm text-gray-400">
                +{mostValuableActivity.totalPoints} puntos
              </p>
            </div>
          )}

          {activityBreakdown && activityBreakdown.length > 0 && (
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Desglose de actividad: </p>
              <ul className="space-y-2">
                {activityBreakdown.map((item) => (
                  <li
                    key={item.type}
                    className="flex justify-between text-gray-300 border-b border-gray-700 pb-1"
                  >
                    <span className="capitalize">{item.type}</span>
                    <span className="font-semibold">{item.count}</span>
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
