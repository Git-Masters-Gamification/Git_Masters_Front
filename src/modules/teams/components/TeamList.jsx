// src/modules/teams/components/TeamList.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function TeamList({ teams }) {
  if (!teams.length)
    return (
      <p className="team-list__empty text-gray-500 text-center">
        No hay equipos disponibles.
      </p>
    );

  return (
    <ul className="team-list space-y-3">
      {teams.map((t) => (
        <li
          key={t.id}
          className="team-list__item border p-4 rounded-lg flex justify-between items-center"
        >
          <div className="team-list__info">
            <Link
              to={`/teams/${t.id}`}
              className="team-list__name font-medium text-indigo-600 hover:underline"
            >
              {t.name}
            </Link>
            <span className="team-list__members ml-2 text-sm text-gray-500">
              Miembros: {t._count?.members ?? t.members?.length ?? 0}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

TeamList.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      members: PropTypes.array,
      _count: PropTypes.shape({
        members: PropTypes.number,
      }),
    })
  ).isRequired,
};