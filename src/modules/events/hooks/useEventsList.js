import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../../../services/api';
import API from '../../../services/endpoints';
import { withRetry } from '../../../utils';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

export default function useEventsList(initialFilters = {}, initialPage = 1, limitDefault = 20) {
  const [filters, setFilters] = useState(initialFilters);
  const debouncedFilters = useDebouncedValue(filters, 300);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(limitDefault);
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(debouncedFilters).forEach(([key, val]) => {
      if (val !== '' && val !== undefined && val !== null) params.append(key, val);
    });
    params.append('page', page);
    params.append('limit', limit);
    params.append('sort', 'received_at:desc');
    return params.toString();
  }, [debouncedFilters, page, limit]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = buildQuery();
      const res = await withRetry(() => api.get(`${API.EVENTS.LIST}?${query}`), 2, 800);
      if (!mounted.current) return;
      setEvents(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      if (!mounted.current) return;
      console.error('useEventsList error', err);
      setError(err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [buildQuery]);

  useEffect(() => {
    mounted.current = true;
    fetchEvents();
    return () => {
      mounted.current = false;
    };
  }, [fetchEvents]);

  const setFilter = (name, value) => {
    setPage(1);
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = (keep = {}) => {
    setPage(1);
    setFilters({ ...keep });
  };

  return {
    filters,
    setFilter,
    resetFilters,
    events,
    page,
    setPage,
    limit,
    setLimit,
    total,
    loading,
    error,
    refresh: fetchEvents,
  };
}