// src/modules/teams/pages/TeamsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import Loader from "../../../components/Loader";
import TeamList from "../components/TeamList";
import TeamForm from "../components/TeamForm";
import { AuthContext } from "../../../context/AuthContext";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh } = useContext(AuthContext);

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

  const handleCreate = async (name) => {
    try {
      await api.post(API.TEAMS.CREATE, { name });
      await loadTeams();
      await refresh(); // 🔁 sincroniza AuthContext
      alert("Equipo creado exitosamente");
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) alert("Ya perteneces a un equipo");
      else if (status === 400) alert("Nombre del equipo requerido");
      else alert("Error creando equipo");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page page--teams teams">
      <h1 className="teams__title">Equipos</h1>

      <section className="teams__form">
        <TeamForm onCreate={handleCreate} />
      </section>

      <section className="teams__list">
        {error ? (
          <p className="teams__error">{error}</p>
        ) : (
          <TeamList teams={teams} refresh={loadTeams} />
        )}
      </section>
    </div>
  );
}