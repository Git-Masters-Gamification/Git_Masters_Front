import React from 'react';
import { Link } from 'react-router-dom';
import useEventsList from '../hooks/useEventsList';
import Loader from '../../../components/Loader';
import '../../../styles/pages/_events.scss';

export default function EventsPage() {
  const {
    filters,
    setFilter,
    events,
    page,
    setPage,
    limit,
    setLimit,
    total,
    loading,
    error,
    refresh,
  } = useEventsList();

  const totalPages = Math.ceil(total / limit);

  if (loading && events.length === 0) return <Loader />;
  if (error) return <p className="events__error">⚠ Error al cargar eventos: {error.message}</p>;

  return (
    <div className="events page page--events">
      <h2 className="events__title">Eventos</h2>

      {/* 🔍 Filtros */}
      <div className="events__filters">
        <input name="user" placeholder="Usuario" value={filters.user || ''} onChange={(e) => setFilter('user', e.target.value)} />
        <input name="repo" placeholder="Repositorio" value={filters.repo || ''} onChange={(e) => setFilter('repo', e.target.value)} />
        <input name="type" placeholder="Tipo" value={filters.type || ''} onChange={(e) => setFilter('type', e.target.value)} />
        <input name="action" placeholder="Acción" value={filters.action || ''} onChange={(e) => setFilter('action', e.target.value)} />
        <input name="since" type="date" value={filters.since || ''} onChange={(e) => setFilter('since', e.target.value)} />
        <input name="until" type="date" value={filters.until || ''} onChange={(e) => setFilter('until', e.target.value)} />
        <select name="processed" value={filters.processed || ''} onChange={(e) => setFilter('processed', e.target.value)}>
          <option value="">Procesado?</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* 📊 Tabla */}
      <div className="events__table-wrapper">
        <table className="events__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Acción</th>
              <th>Repo</th>
              <th>Usuario</th>
              <th>Commits</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((ev) => (
                <tr key={ev.id}>
                  <td>
                    <Link to={`/events/${ev.id}`} className="events__link-id">{ev.id}</Link>
                  </td>
                  <td>{ev.event_type}</td>
                  <td>{ev.action}</td>
                  <td>{ev.repo_full_name}</td>
                  <td>{ev.sender_login}</td>
                  <td>{ev.commits_count}</td>
                  <td>{new Date(ev.received_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No se encontraron eventos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Paginación */}
      <div className="events__pagination">
        <button disabled={page <= 1 || loading} onClick={() => setPage(page - 1)}>◀ Prev</button>
        <span>Página {page} / {totalPages || 1}</span>
        <button disabled={page >= totalPages || loading} onClick={() => setPage(page + 1)}>Next ▶</button>

        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>

        <button onClick={refresh} disabled={loading}>🔄 Recargar</button>

        <span className="events__total">Total: {total}</span>
      </div>
    </div>
  );
}