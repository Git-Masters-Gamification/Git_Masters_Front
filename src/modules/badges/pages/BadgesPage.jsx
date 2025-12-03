// src/modules/badges/pages/BadgesPage.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import API from "../../../services/endpoints";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { initTheme } from "../../../utils/theme";
import "../../../styles/pages/_badges.scss";

export default function BadgesPage() {
  const [all, setAll] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorAll, setErrorAll] = useState(null);
  const [errorUser, setErrorUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const { user } = useContext(AuthContext);

  // carga todas las insignias siempre al montar la vista
  useEffect(() => {
    initTheme();
    const loadAll = async () => {
      setLoadingAll(true);
      setErrorAll(null);
      try {
        const res = await api.get(API.BADGES.ALL);
        setAll(res.data || []);
      } catch (err) {
        console.error("Error cargando todas las insignias:", err);
        setErrorAll("No se pudieron cargar las insignias. Intenta recargar.");
      } finally {
        setLoadingAll(false);
      }
    };

    loadAll();
  }, []);

  // función reutilizable para cargar insignias de un username concreto
  const loadUserBadges = async (username) => {
    if (!username || typeof username !== "string" || username.trim() === "") {
      setErrorUser(null);
      setUserBadges([]);
      setNotFound(false);
      return;
    }

    setLoadingUser(true);
    setErrorUser(null);
    setNotFound(false);
    setUserBadges([]);
    try {
      const res = await api.get(API.BADGES.USER(username));
      setUserBadges(res.data || []);
    } catch (err) {
      console.error(`Error al cargar badges para '${username}':`, err);
      // Manejo específico del 404 (usuario no encontrado)
      if (err?.response?.status === 404) {
        setNotFound(true);
        setErrorUser(null);
        setUserBadges([]);
      } else {
        setErrorUser("Error al cargar insignias del usuario. Intenta nuevamente.");
      }
    } finally {
      setLoadingUser(false);
    }
  };

  // Cargar las insignias del usuario logueado automáticamente cuando el contexto cambie
  useEffect(() => {
    const key = user?.username || user?.id;
    if (key) {
      loadUserBadges(key);
    } else {
      // si no hay usuario, limpiamos la vista de insignias de usuario
      setUserBadges([]);
      setErrorUser(null);
      setNotFound(false);
      setLoadingUser(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // mostrar loader principal si TODAS las llamadas pendientes
  const globalLoading = loadingAll || loadingUser;

  return (
    <main className="page page--badges badges">
      <div className="badges__container">
        <header className="badges__header">
          <h1 className="badges__title">Insignias</h1>
          <div className="badges__actions">
            <Link to="/profile" className="badges__back">
              ← Volver al perfil
            </Link>
          </div>
        </header>

        {/* SECCIÓN: insignias del usuario (usa automáticamente el usuario logueado) */}
        <section className="badges__section badges__section--user">
          <h2 className="badges__subtitle">Insignias del usuario</h2>

          {globalLoading && <Loader />}

          {!globalLoading && !user && (
            <p className="badges__empty">Inicia sesión para ver tus insignias.</p>
          )}

          {!globalLoading && user && userBadges.length === 0 && !notFound && !errorUser && (
            <p className="badges__empty">No se encontraron insignias para este usuario.</p>
          )}

          {!globalLoading && notFound && (
            <p className="badges__warning">
              Usuario no encontrado. Verifica que tu usuario exista en la base de datos.
            </p>
          )}

          {errorUser && <p className="badges__error">{errorUser}</p>}

          {!globalLoading && userBadges.length > 0 && (
            <ul className="badges__list badges__list--user">
              {userBadges.map((b) => (
                <li key={b.key} className="badges__item badges__item--user">
                  <p className="badges__name">{b.name}</p>
                  <p className="badges__description">{b.description}</p>
                  {b.obtainedAt && (
                    <p className="badges__date">
                      {new Date(b.obtainedAt).toLocaleDateString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* SECCIÓN: todas las insignias */}
        <section className="badges__section badges__section--all">
          <h2 className="badges__subtitle">Todas las insignias</h2>

          {loadingAll && <p className="badges__info">Cargando todas las insignias...</p>}
          {errorAll && <p className="badges__error">{errorAll}</p>}

          {!loadingAll && !errorAll && all.length === 0 && (
            <p className="badges__empty">No hay insignias definidas en el sistema.</p>
          )}

          {!loadingAll && all.length > 0 && (
            <ul className="badges__list badges__list--all">
              {all.map((b) => (
                <li key={b.key} className="badges__item badges__item--all">
                  <p className="badges__name">{b.name}</p>
                  <p className="badges__description">{b.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
