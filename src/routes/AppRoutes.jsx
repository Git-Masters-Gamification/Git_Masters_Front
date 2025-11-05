// src/routes/AppRoutes.jsx
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader';

// Public pages
const Login = React.lazy(() => import('../modules/auth/pages/Login'));
const AuthCallback = React.lazy(() => import('../modules/auth/pages/AuthCallback'));

// Protected / feature pages (lazy)
const Dashboard = React.lazy(() => import('../modules/dashboard/pages/Dashboard'));
const ProfilePage = React.lazy(() => import('../modules/profile/pages/ProfilePage'));
const BadgesPage = React.lazy(() => import('../modules/badges/pages/BadgesPage'));
const TeamsPage = React.lazy(() => import('../modules/teams/pages/TeamsPage'));
const TeamDetailPage = React.lazy(() => import('../modules/teams/pages/TeamDetailPage'));
const StatisticsPage = React.lazy(() => import('../modules/statistics/pages/StatisticsPage'));
const LeaderboardPage = React.lazy(() => import('../modules/leaderboard/pages/LeaderboardPage'));
const EventsPage = React.lazy(() => import('../modules/events/pages/EventsPage'));
const EventDetailPage = React.lazy(() => import('../modules/events/pages/EventDetailPage'));
const RulesPointsPage = React.lazy(() => import('../modules/rules-points/pages/RulesPointsPage'));
const RankingsPage = React.lazy(() => import('../modules/rankings/pages/RankingsPage'));

// ✅ Nuevo módulo — RankHistory
const RankHistoryPage = React.lazy(() => import('../modules/rankHistory/pages/RankHistoryPage'));

// Simple 404 component inline
function NotFound() {
  return <div style={{ padding: 24 }}>404 — Página no encontrada</div>;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader message="Cargando..." />}>
      <Routes>
        {/* root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/badges"
          element={
            <ProtectedRoute>
              <BadgesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <TeamsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams/:id"
          element={
            <ProtectedRoute>
              <TeamDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <StatisticsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rules-points"
          element={
            <ProtectedRoute>
              <RulesPointsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rankings"
          element={
            <ProtectedRoute>
              <RankingsPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Nueva ruta protegida — Historial de Rangos */}
        <Route
          path="/rank-history"
          element={
            <ProtectedRoute>
              <RankHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}