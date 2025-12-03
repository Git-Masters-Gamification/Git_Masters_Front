// src/modules/statistics/components/ActivityBreakdown.jsx
import React from "react";
import PropTypes from "prop-types";

const ActivityBreakdown = ({ breakdown = [], className = "" }) => {
  if (!breakdown || breakdown.length === 0) {
    return (
      <div className={`activity-breakdown ${className} activity-breakdown--empty`.trim()}>
        <div className="activity-breakdown__empty-text">No hay desglose de actividades.</div>
      </div>
    );
  }

  return (
    <div className={`activity-breakdown ${className}`.trim()}>
      <h2 className="activity-breakdown__title">Desglose de actividades</h2>

      <ul className="activity-breakdown__list">
        {breakdown.map((item) => (
          <li key={item.type} className="activity-breakdown__item">
            <span className="activity-breakdown__type">{item.type}</span>
            <span className="activity-breakdown__count">{item.count ?? 0}</span>
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
  className: PropTypes.string,
};

export default ActivityBreakdown;