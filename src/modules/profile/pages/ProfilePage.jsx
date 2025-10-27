// src/modules/profile/pages/ProfilePage.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useProfile from "../hooks/useProfile";
import Loader from "../../../components/Loader";
import "../../../styles/pages/_profile.scss";

export default function ProfilePage() {
  const { user, refresh } = useContext(AuthContext);
  const { profile, activity, pointsHistory, loading, error, patchProfile } = useProfile(refresh);

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (profile?.bio) setBio(profile.bio);
  }, [profile]);

  const saveBio = async () => {
    if (bio.trim().length > 300) {
      alert("La bio es demasiado larga (máx. 300 caracteres).");
      return;
    }
    try {
      await patchProfile({ bio: bio.trim() });
      setEditing(false);
    } catch (err) {
      console.error("Error guardando bio:", err);
      alert("No se pudo guardar la bio.");
    }
  };

  if (loading) return <Loader message="Cargando perfil..." />;
  if (error) return <div className="profile page page--profile"><p className="profile__oops">Error cargando perfil.</p></div>;

  // friendly safe values
  const points = profile?.points ?? 0;
  const level = profile?.level ?? 1;
  // if backend provides progress percent: prefer it
  const progressPercent = profile?.progressPercent ?? Math.min(100, Math.floor((points % 100) || 0));

  return (
    <div className="profile page page--profile">
      <header className="profile__header">
        <h1 className="profile__title">Perfil de usuario</h1>
        <p className="profile__subtitle">Tu progreso dentro de la comunidad</p>
      </header>

      <main className="profile__grid">
        {/* LEFT column: activity & history */}
        <aside className="profile__col profile__col--left">
          <section className="profile__panel">
            <h2 className="profile__panel-title">Actividad reciente</h2>
            {activity.length > 0 ? (
              <ul className="profile__list">
                {activity.map((a) => (
                  <li key={a.id} className="profile__item">
                    <span className="profile__item-action">{a.action}</span>
                    <span className="profile__item-date">{new Date(a.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="profile__empty">Sin actividad reciente.</p>
            )}
          </section>

          <section className="profile__panel">
            <h2 className="profile__panel-title">Historial de puntos</h2>
            {pointsHistory.length > 0 ? (
              <ul className="profile__list">
                {pointsHistory.map((p) => (
                  <li key={p.id} className="profile__item">
                    <span>{p.reason}</span>
                    <span className="profile__points-earned">+{p.points}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="profile__empty">Sin historial de puntos.</p>
            )}
          </section>
        </aside>

        {/* CENTER column: main card, bio, badges */}
        <section className="profile__col profile__col--center">
          <article className="profile__card">
            <div className="profile__avatar-wrap">
              <img
                src={profile?.avatarUrl || '/images/default-avatar.png'}
                alt={`${profile?.username ?? 'Usuario'} avatar`}
                className="profile__avatar"
                width={96}
                height={96}
              />
            </div>
            <div className="profile__body">
              <div className="profile__head">
                <div>
                  <p className="profile__username">{profile?.username}</p>
                  <p className="profile__email">{user?.email}</p>
                </div>
                <div className="profile__badges-inline">
                  {(profile?.badges || []).slice(0,4).map((b, i) => (
                    <img key={i} className="badge" title={b.name || 'Insignia'} src={b.iconUrl || '/images/badge-placeholder.svg'} alt={b.name || 'badge'} />
                  ))}
                </div>
              </div>

              <div className="profile__meta-row">
                <span className="meta-pill meta-xp">⚡ {points} XP</span>
                <span className="meta-pill meta-level">🏆 Nivel {level}</span>
                <span className="meta-pill">🕓 Desde {profile?.memberSince ? new Date(profile.memberSince).toLocaleDateString('es-ES') : '—'}</span>
              </div>

              <div className="xp-bar">
                <div className="xp-bar__track" aria-hidden>
                  <div className="xp-bar__fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="xp-bar__legend">
                  <span className="xp-bar__left">Nivel {level}</span>
                  <span className="xp-bar__right">{progressPercent}%</span>
                </div>
              </div>

              <div className="profile__actions center">
                <button className="btn btn--primary" onClick={() => refresh()}>
                  🔄 Actualizar datos
                </button>
                <Link to={`/badges?user=${profile?.username}`} className="btn btn--ghost">
                  🏅 Ver todas las insignias
                </Link>
              </div>
            </div>
          </article>

          <article className="profile__panel profile__panel--bio">
            <h2 className="profile__panel-title">Biografía</h2>

            {editing ? (
              <>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="profile__textarea"
                  maxLength={300}
                />
                <div className="profile__actions">
                  <button className="btn btn--primary" onClick={saveBio}>💾 Guardar</button>
                  <button className="btn btn--secondary" onClick={() => { setEditing(false); setBio(profile?.bio || ""); }}>✖ Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <p className="profile__bio-text">{profile?.bio || "Sin biografía aún."}</p>
                <div className="profile__actions">
                  <button className="btn btn--link" onClick={() => setEditing(true)}>✏️ Editar bio</button>
                </div>
              </>
            )}
          </article>
        </section>
      </main>

      <footer className="profile__footer">
        <div className="footer-left">
          <Link to={`/badges?user=${profile?.username}`} className="btn btn--link small">🏅 Ver insignias</Link>
        </div>
        <div className="footer-right">
          <button className="btn btn--danger" onClick={() => alert("Función de cerrar sesión próximamente")}>🚪 Cerrar sesión</button>
        </div>
      </footer>
    </div>
  );
}