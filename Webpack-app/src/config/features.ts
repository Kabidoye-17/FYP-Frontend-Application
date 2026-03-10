/**
 * Feature flags configuration
 * Control feature availability across the application
 */

// Feature flags from environment or defaults (Webpack uses process.env)
export const FEATURES = {
    // Core features
    ANALYTICS_DASHBOARD: process.env.REACT_APP_FEATURE_ANALYTICS !== "false",
    CALENDAR_VIEW: process.env.REACT_APP_FEATURE_CALENDAR !== "false",
    TEAM_MANAGEMENT: process.env.REACT_APP_FEATURE_TEAM !== "false",
    ROADMAP_VIEW: process.env.REACT_APP_FEATURE_ROADMAP !== "false",
    WORKLOAD_VIEW: process.env.REACT_APP_FEATURE_WORKLOAD !== "false",

    // Experimental features
    RICH_TEXT_EDITOR: process.env.REACT_APP_FEATURE_RICH_TEXT !== "false",
    KEYBOARD_SHORTCUTS: process.env.REACT_APP_FEATURE_KEYBOARD_SHORTCUTS !== "false",
    COMMAND_PALETTE: process.env.REACT_APP_FEATURE_COMMAND_PALETTE !== "false",
    BULK_OPERATIONS: process.env.REACT_APP_FEATURE_BULK_OPS !== "false",
    IMPORT_EXPORT: process.env.REACT_APP_FEATURE_IMPORT_EXPORT !== "false",

    // Integration features
    NOTIFICATIONS: process.env.REACT_APP_FEATURE_NOTIFICATIONS !== "false",
    TIME_TRACKING: process.env.REACT_APP_FEATURE_TIME_TRACKING !== "false",
    DEPENDENCIES: process.env.REACT_APP_FEATURE_DEPENDENCIES !== "false",

    // Debug/Dev features
    DEV_TOOLS: process.env.NODE_ENV === "development",
    MOCK_API: process.env.REACT_APP_MOCK_API === "true",
} as const;

// Helper to check if a feature is enabled
export function isFeatureEnabled(feature: keyof typeof FEATURES): boolean {
    return FEATURES[feature] === true;
}

// App-wide constants
export const APP_CONFIG = {
    APP_NAME: "Project Tracker",
    VERSION: process.env.REACT_APP_VERSION || "1.0.0",
    ENVIRONMENT: process.env.NODE_ENV || "development",

    // Pagination defaults
    DEFAULT_PAGE_SIZE: 25,
    MAX_PAGE_SIZE: 100,

    // UI defaults
    SIDEBAR_WIDTH: 260,
    SIDEBAR_COLLAPSED_WIDTH: 72,
    TOAST_DURATION: 4000,
    DEBOUNCE_DELAY: 300,
    SEARCH_MIN_CHARS: 2,

    // File upload limits
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
        "text/csv",
    ],

    // Date/Time formats
    DATE_FORMAT: "MMM d, yyyy",
    TIME_FORMAT: "h:mm a",
    DATETIME_FORMAT: "MMM d, yyyy 'at' h:mm a",
} as const;

// Issue statuses with metadata
export const ISSUE_STATUSES = {
    backlog: { label: "Backlog", color: "var(--gray-400)", order: 0 },
    todo: { label: "To Do", color: "var(--blue)", order: 1 },
    "in-progress": { label: "In Progress", color: "var(--yellow)", order: 2 },
    "in-review": { label: "In Review", color: "var(--purple)", order: 3 },
    done: { label: "Done", color: "var(--success)", order: 4 },
} as const;

// Issue priorities with metadata
export const ISSUE_PRIORITIES = {
    urgent: { label: "Urgent", color: "var(--error)", icon: "Warning", order: 0 },
    high: { label: "High", color: "var(--warning)", icon: "ArrowUp", order: 1 },
    medium: { label: "Medium", color: "var(--yellow)", icon: "Minus", order: 2 },
    low: { label: "Low", color: "var(--success)", icon: "ArrowDown", order: 3 },
} as const;

export type IssueStatus = keyof typeof ISSUE_STATUSES;
export type IssuePriority = keyof typeof ISSUE_PRIORITIES;
