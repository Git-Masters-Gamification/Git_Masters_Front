import { useEffect, useState, useRef } from 'react';
import api from '../../../services/api';
import API from '../../../services/endpoints';
import { withRetry } from '../../../utils';

export default function useDashboardData(retryAttempts = 2, retryDelay = 1000) {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const load = async () => {
      setLoading(true);
      try {
        const [dashRes, statsRes] = await Promise.all([
          withRetry(() => api.get(API.DASHBOARD), retryAttempts, retryDelay),
          withRetry(() => api.get(API.STATISTICS.ME), retryAttempts, retryDelay)
        ]);
        if (!mounted.current) return;
        setData(dashRes.data);
        setStats(statsRes.data);
      } catch (err) {
        if (!mounted.current) return;
        console.error('useDashboardData error', err);
        setError(err);
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    load();
    return () => { mounted.current = false; };
  }, [retryAttempts, retryDelay]);

  return { data, stats, loading, error };
}