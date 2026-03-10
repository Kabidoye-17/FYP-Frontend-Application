/**
 * Centralized route configuration
 * Single source of truth for all application routes
 */

export const ROUTES = {
    // Public routes
    LANDING: "/",
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGIN_REGISTER: "/loginandregister",

    // Main app routes
    HOME: "/home",
    SETTINGS: "/settings",

    // Home sub-routes
    ISSUES: "/home/issues",
    PROJECTS: "/home/projects",
    SPRINTS: "/home/sprints",
    MILESTONES: "/home/milestones",
    KANBAN: "/home/kanban",
    ROADMAP: "/home/roadmap",
    WORKLOAD: "/home/workload",
    ANALYTICS: "/home/analytics",
    CALENDAR: "/home/calendar",
    TEAM: "/home/team",

    // Detail routes (functions for dynamic params)
    issueDetail: (issueId: string) => `/home/issues/${issueId}`,
    projectDetail: (projectId: string) => `/home/projects/${projectId}`,
    sprintDetail: (sprintId: string) => `/home/sprints/${sprintId}`,
} as const;

// Route path patterns for React Router
export const ROUTE_PATTERNS = {
    ISSUE_DETAIL: "/home/issues/:issueId",
    PROJECT_DETAIL: "/home/projects/:projectId",
    SPRINT_DETAIL: "/home/sprints/:sprintId",
} as const;

// Navigation items for sidebar
export const NAV_ITEMS = {
    planning: [
        { path: ROUTES.ISSUES, label: "Issues", icon: "ListChecks" },
        { path: ROUTES.PROJECTS, label: "Projects", icon: "Folder" },
        { path: ROUTES.SPRINTS, label: "Sprints", icon: "Lightning" },
        { path: ROUTES.MILESTONES, label: "Milestones", icon: "Flag" },
        { path: ROUTES.CALENDAR, label: "Calendar", icon: "Calendar" },
    ],
    views: [
        { path: ROUTES.KANBAN, label: "Kanban", icon: "Kanban" },
        { path: ROUTES.ROADMAP, label: "Roadmap", icon: "MapTrifold" },
        { path: ROUTES.WORKLOAD, label: "Workload", icon: "ChartBar" },
    ],
    insights: [
        { path: ROUTES.ANALYTICS, label: "Analytics", icon: "ChartLineUp" },
    ],
    organization: [
        { path: ROUTES.TEAM, label: "Team", icon: "Users" },
    ],
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
