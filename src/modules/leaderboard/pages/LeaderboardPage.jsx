import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import Loader from "../../../components/Loader";
import "../../../styles/pages/_leaderboard.scss";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <table className="leaderboard__table">
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
                    width={32}
                    height={32}
                  />
                  {u.username}
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