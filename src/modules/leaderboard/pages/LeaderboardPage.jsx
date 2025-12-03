import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import Loader from "../../../components/Loader";
import "../../../styles/pages/_leaderboard.scss";
import { initTheme } from "../../../utils/theme"; // idempotente — seguro si App.jsx ya lo llamó

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Asegura que el tema cargado en localStorage se aplique (idempotente).
    // Esto no crea duplicados de toggle ni botones; solo garantiza la clase en <html>.
    try {
      initTheme();
    } catch {
      // No fatal — si no existe la utilidad, no rompemos la página
      // console.warn('initTheme not available');
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await api.get(API.LEADERBOARD);
        if (!mounted) return;
        setLeaders(res.data || []);
      } catch (err) {
        console.error("leaderboard error", err);
        alert("Error cargando leaderboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="leaderboard page page--leaderboard">
      <h1 className="leaderboard__title">🏆 Leaderboard Global</h1>

      {leaders.length === 0 ? (
        <p className="leaderboard__empty">No hay datos disponibles.</p>
      ) : (
        <table
          className="leaderboard__table"
          role="table"
          aria-label="Leaderboard"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Puntos</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {leaders.slice(0, 10).map((u, idx) => (
              <tr key={u.id || u.username} className="leaderboard__row">
                <td className="leaderboard__position">{idx + 1}</td>
                <td className="leaderboard__user">
                  <img
                    src={u.avatarUrl}
                    alt={u.username}
                    className="leaderboard__avatar"
                    width={36}
                    height={36}
                  />
                  <span className="leaderboard__username">{u.username}</span>
                </td>
                <td className="leaderboard__points">{u.points}</td>
                <td className="leaderboard__level">{u.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}