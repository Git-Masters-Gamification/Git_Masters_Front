import React from "react";
import PropTypes from "prop-types";

const PointsSummary = ({ stats }) => {
  if (!stats) return null;

  const { pointsLast7Days = 0, mostValuableActivity } = stats;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Resumen de puntos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Puntos en los últimos 7 días</p>
          <p className="text-3xl font-bold text-indigo-600">{pointsLast7Days}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Actividad más valiosa</p>
          {mostValuableActivity ? (
            <>
              <p className="text-lg font-semibold">
                {mostValuableActivity.rule}
              </p>
              <p className="text-sm text-gray-600">
                +{mostValuableActivity.totalPoints ?? 0} puntos
              </p>
            </>
          ) : (
            <p className="text-gray-400 italic">Sin datos aún</p>
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
};

export default PointsSummary;