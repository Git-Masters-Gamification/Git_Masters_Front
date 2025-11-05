// src/modules/teams/pages/TeamsPage.jsx
import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import Loader from "../../../components/Loader";
import TeamList from "../components/TeamList";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(API.TEAMS.LIST);
      setTeams(res.data || []);
    } catch (err) {
      console.error("GET /teams error", err);
      setError("No se pudieron cargar los equipos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page page--teams teams">
      <h1 className="teams__title text-2xl font-bold mb-4">Equipos</h1>

      {error ? (
        <p className="teams__error text-red-500">{error}</p>
      ) : (
        <TeamList teams={teams} refresh={loadTeams} />
      )}
    </div>
  );
}