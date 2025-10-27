// frontend/src/modules/rankings/pages/RankingsPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import API from '../../../services/endpoints';
import Loader from '../../../components/Loader';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

export default function RankingsPage() {
  const [rankings, setRankings] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        if (debouncedSearch?.trim()) params.append('search', debouncedSearch.trim());

        const url = `${API.RULES_POINTS.LEADERBOARD}?${params.toString()}`;
        const res = await api.get(url);

        if (!mounted) return;

        if (res?.data == null) {
          setRankings([]);
          setTotal(0);
        } else if (Array.isArray(res.data)) {
          setRankings(res.data);
          setTotal(res.data.length);
        } else if (Array.isArray(res.data.items)) {
          setRankings(res.data.items);
          setTotal(res.data.total ?? res.data.items.length);
        } else {
          const maybeArr = res.data.leaderboard || res.data.results || res.data.users;
          if (Array.isArray(maybeArr)) {
            setRankings(maybeArr);
            setTotal(res.data.total ?? maybeArr.length);
          } else {
            setRankings([]);
            setTotal(0);
            console.warn('Rankings: formato de respuesta inesperado', res.data);
          }
        }
      } catch (err) {
        if (!mounted) return;
        console.error('❌ Error cargando rankings:', err);
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [page, limit, debouncedSearch]);

  const refresh = () => {
    setPage(1);
    setSearch('');
  };

  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  let content;
  if (loading && rankings.length === 0) {
    content = <Loader />;
  } else if (error) {
    content = (
      <p className="rankings__error">
        ⚠ Error al cargar rankings: {error.message}
      </p>
    );
  } else if (rankings.length === 0) {
    content = <p className="rankings__empty">No hay rankings disponibles.</p>;
  } else {
    content = (
      <div className="rankings__table-wrapper">
        <table className="rankings__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Puntos Totales</th>
              <th>Nivel</th>
              <th>Rango</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r, idx) => (
              <tr key={r.id ?? r.username ?? idx}>
                <td>{(page - 1) * limit + idx + 1}</td>
                <td>{r.username ?? r.name ?? '—'}</td>
                <td>{r.totalPoints ?? r.pointsBalance ?? 0}</td>
                <td>{r.level ?? (r.profile?.level ?? '—')}</td>
                <td>
                  {r.rank ??
                    (typeof r.rank === 'object' ? r.rank.name : r.rank) ??
                    '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="rankings page page--rankings">
      <h2 className="rankings__title">📈 Rankings</h2>

      <div className="rankings__filters">
        <input
          type="text"
          className="rankings__input"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="rankings__select"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
        <button
          className="rankings__button"
          onClick={refresh}
          disabled={loading}
        >
          🔄 Limpiar filtros
        </button>
      </div>

      {content}

      {totalPages > 1 && (
        <div className="rankings__pagination">
          <button
            className="rankings__button"
            disabled={page === 1 || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ◀ Anterior
          </button>
          <span className="rankings__page-info">
            Página {page} de {totalPages}
          </span>
          <button
            className="rankings__button"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Siguiente ▶
          </button>
          <span className="rankings__total">Total: {total}</span>
        </div>
      )}
    </div>
  );
}