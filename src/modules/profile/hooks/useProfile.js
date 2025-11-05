// ======================================================
// 🎯 useProfile Hook — Perfil + Actividad + Historial
// (Versión compatible con sistema de niveles progresivos)
// ======================================================

import { useEffect, useState, useRef, useCallback } from 'react';
import api from '../../../services/api';
import API from '../../../services/endpoints';
import { withRetry } from '../../../utils';

export default function useProfile(refreshDependency) {
  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, aRes, phRes] = await Promise.all([
        withRetry(() => api.get(API.PROFILE.ME), 2, 800),
        withRetry(() => api.get(API.PROFILE.ACTIVITY), 2, 800),
        withRetry(() => api.get(API.PROFILE.POINTS_HISTORY), 2, 800),
      ]);

      if (!mounted.current) return;

      // ✅ Backend ya entrega: points, level, progressPercent, rank {name, color}
      setProfile(pRes.data);
      setActivity(aRes.data || []);
      setPointsHistory(phRes.data || []);
    } catch (err) {
      if (!mounted.current) return;
      console.error('useProfile load error', err);
      setError(err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    loadProfile();
    return () => { mounted.current = false; };
  }, [loadProfile, refreshDependency]);

  const patchProfile = async (changes) => {
    if (!profile) return;
    const prev = { ...profile };
    setProfile({ ...profile, ...changes });
    try {
      const res = await api.patch(API.PROFILE.PATCH, changes);
      if (res?.data) setProfile(prev => ({ ...prev, ...res.data }));
      return res.data;
    } catch (err) {
      console.error('patchProfile error', err);
      setProfile(prev);
      throw err;
    }
  };

  // ✅ Refresh usable desde cualquier página
  const refresh = async () => {
    await loadProfile();
  };

  return {
    profile,
    activity,
    pointsHistory,
    loading,
    error,
    refresh,
    patchProfile,
    setProfile,
  };
}