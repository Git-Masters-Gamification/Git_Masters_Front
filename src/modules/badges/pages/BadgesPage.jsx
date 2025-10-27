// src/modules/badges/pages/BadgesPage.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "../../../styles/pages/_badges.scss";

export default function BadgesPage() {
  const [all, setAll] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [allRes, ubRes] = await Promise.all([
          api.get(API.BADGES.ALL),
          api.get(API.BADGES.USER(user.username)),
        ]);
        setAll(allRes.data || []);
        setUserBadges(ubRes.data || []);
      } catch (err) {
        console.error("badges error", err);
        setError("Error al cargar las insignias.");
      } finally {
        setLoading(false);
      }
    }
    if (user) load();
  }, [user]);

  if (loading) return <Loader />;
  if (error) return <p className="badges__error">{error}</p>;

  return (
    <main className="page page--badges badges">
      <header className="badges__header">
        <h1 className="badges__title">Insignias</h1>
        <Link to="/profile" className="badges__back">
          ← Volver al perfil
        </Link>
      </header>

      <section className="badges__section badges__section--user">
        <h2 className="badges__subtitle">Tus insignias</h2>

        {userBadges.length === 0 ? (
          <p className="badges__empty">Aún no has ganado insignias.</p>
        ) : (
          <ul className="badges__list badges__list--user">
            {userBadges.map((b) => (
              <li key={b.key} className="badges__item badges__item--user">
                <p className="badges__name">{b.name}</p>
                <p className="badges__description">{b.description}</p>
                <p className="badges__date">
                  {new Date(b.obtainedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="badges__section badges__section--all">
        <h2 className="badges__subtitle">Todas las insignias</h2>

        <ul className="badges__list badges__list--all">
          {all.map((b) => (
            <li key={b.key} className="badges__item badges__item--all">
              <p className="badges__name">{b.name}</p>
              <p className="badges__description">{b.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}