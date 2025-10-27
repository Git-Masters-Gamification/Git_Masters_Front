// src/modules/rules-points/hooks/useRulesPoints.js
import { useEffect, useState, useRef, useCallback } from 'react';
import api from '../../../services/api';
import API from '../../../services/endpoints';
import { withRetry } from '../../../utils';

export default function useRulesPoints() {
  const [me, setMe] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, lbRes] = await Promise.all([
        withRetry(() => api.get(API.RULES_POINTS.ME), 2, 800),
        withRetry(() => api.get(API.RULES_POINTS.LEADERBOARD), 2, 800),
      ]);
      if (!mounted.current) return;
      setMe(meRes.data || {});
      setLeaderboard(Array.isArray(lbRes.data) ? lbRes.data : []);
    } catch (err) {
      console.error('❌ useRulesPoints error:', err);
      if (mounted.current) setError(err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    loadData();
    return () => {
      mounted.current = false;
    };
  }, [loadData]);

  const postActivityDev = async (payload) => {
    if (!import.meta.env.DEV) {
      throw new Error('Solo disponible en modo desarrollo.');
    }
    const res = await api.post(API.RULES_POINTS.ACTIVITY, payload);
    await loadData();
    return res.data;
  };

  const refresh = async () => {
    await loadData();
  };

  return {
    me,
    leaderboard,
    loading,
    error,
    postActivityDev,
    refresh,
  };
}