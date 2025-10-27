import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import { AuthContext } from "../../../context/AuthContext";

export default function TeamList({ teams, refresh }) {
  const [loadingId, setLoadingId] = useState(null);
  const { logout, refresh: refreshAuth } = useContext(AuthContext);

  const join = async (id) => {
    if (!window.confirm("¿Unirte a este equipo?")) return;
    setLoadingId(id);
    try {
      await api.post(API.TEAMS.JOIN(id));
      alert("✅ Te uniste al equipo exitosamente");
      await refresh();
      await refreshAuth();
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) alert("Solicitud inválida.");
      else if (status === 401) logout();
      else if (status === 403) alert("No tienes permisos para unirte.");
      else if (status === 409)
        alert(err.response?.data?.message || "Ya perteneces a un equipo.");
      else alert("Error interno. Intenta nuevamente.");
    } finally {
      setLoadingId(null);
    }
  };

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
            <Link to={`/teams/${t.id}`} className="team-list__name font-medium text-indigo-600">
              {t.name}
            </Link>
            <span className="team-list__members ml-2 text-sm text-gray-500">
              Miembros: {t._count?.members ?? t.members?.length ?? 0}
            </span>
          </div>

          <button
            onClick={() => join(t.id)}
            disabled={loadingId === t.id}
            className={`team-list__button px-4 py-1 rounded-md text-white ${
              loadingId === t.id
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loadingId === t.id ? "Uniéndose..." : "Unirse"}
          </button>
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
  refresh: PropTypes.func.isRequired,
};