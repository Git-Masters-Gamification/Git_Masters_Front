// src/services/endpoints.js
const API = {
  AUTH: {
    GITHUB: '/auth/github',
    CALLBACK: '/auth/github/callback',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    FAILURE: '/auth/failure',
  },

  DASHBOARD: '/dashboard',

  BADGES: {
    ALL: '/badges',
    USER: (username) => `/badges/user/${username}`,
  },

  EVENTS: {
    LIST: '/events',
    ITEM: (id) => `/events/${id}`,
  },

  LEADERBOARD: '/leaderboard',

  PROFILE: {
    ME: '/profile',
    PATCH: '/profile',
    ACTIVITY: '/profile/activity',
    POINTS_HISTORY: '/profile/points-history',
  },

  // ✅ Actualizado: coincide con el backend (usa /points/)
  RULES_POINTS: {
    ACTIVITY: '/points/activity',
    ME: '/points/me',
    LEADERBOARD: '/points/leaderboard',
  },

  TEAMS: {
    LIST: '/teams',
    DETAIL: (id) => `/teams/${id}`,
    CREATE: '/teams',
    JOIN: (id) => `/teams/${id}/join`,
    LEAVE: '/teams/leave',
  },

  STATISTICS: {
    ME: '/statistics/me',
  },

  RANKINGS: {
    LIST: '/rankings',
    TEAM: (id) => `/rankings/${id}`,
  },
};

export default API;