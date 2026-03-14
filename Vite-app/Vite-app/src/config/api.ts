/**
 * API configuration and endpoints
 * Centralized API URL management
 */

// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const API = {
    BASE_URL: API_BASE_URL,

    // Auth endpoints
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        SIGNUP: `${API_BASE_URL}/auth/signup`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
        REFRESH: `${API_BASE_URL}/auth/refresh`,
        ME: `${API_BASE_URL}/auth/me`,
    },

    // Issues endpoints
    ISSUES: {
        LIST: `${API_BASE_URL}/issues`,
        DETAIL: (id: string) => `${API_BASE_URL}/issues/${id}`,
        CREATE: `${API_BASE_URL}/issues`,
        UPDATE: (id: string) => `${API_BASE_URL}/issues/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/issues/${id}`,
        COMMENTS: (id: string) => `${API_BASE_URL}/issues/${id}/comments`,
        ATTACHMENTS: (id: string) => `${API_BASE_URL}/issues/${id}/attachments`,
    },

    // Projects endpoints
    PROJECTS: {
        LIST: `${API_BASE_URL}/projects`,
        DETAIL: (id: string) => `${API_BASE_URL}/projects/${id}`,
        CREATE: `${API_BASE_URL}/projects`,
        UPDATE: (id: string) => `${API_BASE_URL}/projects/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/projects/${id}`,
        MEMBERS: (id: string) => `${API_BASE_URL}/projects/${id}/members`,
    },

    // Sprints endpoints
    SPRINTS: {
        LIST: `${API_BASE_URL}/sprints`,
        DETAIL: (id: string) => `${API_BASE_URL}/sprints/${id}`,
        CREATE: `${API_BASE_URL}/sprints`,
        UPDATE: (id: string) => `${API_BASE_URL}/sprints/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/sprints/${id}`,
        ISSUES: (id: string) => `${API_BASE_URL}/sprints/${id}/issues`,
    },

    // Milestones endpoints
    MILESTONES: {
        LIST: `${API_BASE_URL}/milestones`,
        DETAIL: (id: string) => `${API_BASE_URL}/milestones/${id}`,
        CREATE: `${API_BASE_URL}/milestones`,
        UPDATE: (id: string) => `${API_BASE_URL}/milestones/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/milestones/${id}`,
    },

    // Team endpoints
    TEAM: {
        LIST: `${API_BASE_URL}/team`,
        MEMBER: (id: string) => `${API_BASE_URL}/team/${id}`,
        INVITE: `${API_BASE_URL}/team/invite`,
    },

    // Analytics endpoints
    ANALYTICS: {
        DASHBOARD: `${API_BASE_URL}/analytics/dashboard`,
        VELOCITY: `${API_BASE_URL}/analytics/velocity`,
        BURNDOWN: (sprintId: string) => `${API_BASE_URL}/analytics/burndown/${sprintId}`,
    },

    // Labels & Tags
    LABELS: {
        LIST: `${API_BASE_URL}/labels`,
        CREATE: `${API_BASE_URL}/labels`,
        DELETE: (id: string) => `${API_BASE_URL}/labels/${id}`,
    },

    // Calendar endpoints
    CALENDAR: {
        LIST: `${API_BASE_URL}/calendar`,
        DETAIL: (id: string) => `${API_BASE_URL}/calendar/${id}`,
        CREATE: `${API_BASE_URL}/calendar`,
        UPDATE: (id: string) => `${API_BASE_URL}/calendar/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/calendar/${id}`,
    },
} as const;

// Request timeout in milliseconds
export const API_TIMEOUT = 30000;

// Retry configuration
export const RETRY_CONFIG = {
    maxRetries: 3,
    retryDelay: 1000,
    retryOn: [408, 429, 500, 502, 503, 504],
} as const;
