import React from "react";
import PropTypes from "prop-types";

const ActivityBreakdown = ({ breakdown }) => {
  if (!breakdown || breakdown.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center text-gray-500">
        No hay desglose de actividades.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Desglose de actividades
      </h2>

      <ul className="divide-y divide-gray-200">
        {breakdown.map((item) => (
          <li key={item.type} className="flex justify-between py-3">
            <span className="capitalize text-gray-700">{item.type}</span>
            <span className="font-semibold text-gray-900">{item.count ?? 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

ActivityBreakdown.propTypes = {
  breakdown: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
};

export default ActivityBreakdown;