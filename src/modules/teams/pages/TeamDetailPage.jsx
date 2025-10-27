import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import TeamMembers from "../components/TeamMembers";
import Loader from "../../../components/Loader";

export default function TeamDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await api.get(API.TEAMS.DETAIL(id));
        if (!mounted) return;
        setTeam(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          alert("Equipo no encontrado");
          navigate("/teams");
        } else {
          alert("Error al cargar el equipo");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  const leave = async () => {
    if (!confirm("¿Seguro que quieres salir del equipo?")) return;
    try {
      await api.post(API.TEAMS.LEAVE);
      alert("Has salido del equipo");
      navigate("/teams");
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) alert("No perteneces a ningún equipo");
      else alert("Error al abandonar el equipo");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page page--team-detail team-detail p-8 max-w-3xl mx-auto space-y-4">
      <h1 className="team-detail__title text-3xl font-bold text-gray-800">{team?.name}</h1>
      <TeamMembers members={team?.members || []} />
      <div className="team-detail__actions flex gap-4 mt-4">
        <button
          className="team-detail__leave bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={leave}
        >
          Abandonar equipo
        </button>
        <button
          className="team-detail__back border px-4 py-2 rounded-lg"
          onClick={() => navigate("/teams")}
        >
          Volver a equipos
        </button>
      </div>
    </div>
  );
}