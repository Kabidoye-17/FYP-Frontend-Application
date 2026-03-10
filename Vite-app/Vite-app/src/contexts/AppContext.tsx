import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { ActivityItem } from "../features/activity/ActivityFeed";
import type { Notification } from "../panels/NotificationPanel";
import type { FilterCondition, SavedView } from "../features/filters/FilterBar";

interface TimeLog {
    issueId: string;
    entries: {
        id: string;
        description: string;
        duration: number;
        date: string;
        userId: string;
    }[];
}

interface AppState {
    // Notifications
    notifications: Notification[];
    unreadNotificationCount: number;
    // Activity
    activities: ActivityItem[];
    // Time Tracking
    timeLogs: Record<string, TimeLog>;
    // Filters
    globalFilters: FilterCondition[];
    savedViews: SavedView[];
    // UI State
    isNotificationPanelOpen: boolean;
    isTimeLogPanelOpen: boolean;
    activeIssueId: string | null;
}

interface AppContextValue extends AppState {
    // Notification actions
    addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void;
    markNotificationRead: (id: string) => void;
    markAllNotificationsRead: () => void;
    dismissNotification: (id: string) => void;

    // Activity actions
    logActivity: (activity: Omit<ActivityItem, "id" | "timestamp">) => void;

    // Time tracking actions
    logTime: (issueId: string, description: string, duration: number) => void;
    getTimeLogsForIssue: (issueId: string) => TimeLog | undefined;
    getTotalTimeForIssue: (issueId: string) => number;

    // Filter actions
    setGlobalFilters: (filters: FilterCondition[]) => void;
    saveView: (name: string, filters: FilterCondition[]) => void;
    loadView: (view: SavedView) => void;

    // UI actions
    openNotificationPanel: () => void;
    closeNotificationPanel: () => void;
    openTimeLogPanel: (issueId: string) => void;
    closeTimeLogPanel: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const initialNotifications: Notification[] = [
    {
        id: "1",
        type: "mention",
        title: "You were mentioned",
        description: "@johndoe mentioned you in 'Dashboard redesign'",
        timestamp: new Date().toISOString(),
        isRead: false,
    },
    {
        id: "2",
        type: "assignment",
        title: "New assignment",
        description: "You were assigned to 'Fix login redirect bug'",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: false,
    },
];

const initialActivities: ActivityItem[] = [
    {
        id: "1",
        type: "completed",
        user: { name: "John Doe", color: "var(--plum)" },
        target: "Implement OAuth2 login flow",
        targetType: "issue",
        timestamp: new Date().toISOString(),
    },
    {
        id: "2",
        type: "commented",
        user: { name: "Jane Smith", color: "var(--tan)" },
        target: "Dashboard performance optimization",
        targetType: "issue",
        details: "Great progress! Let's review the caching strategy.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
];

const initialSavedViews: SavedView[] = [
    {
        id: "1",
        name: "My Issues",
        filters: [{ id: "f1", field: "assignee", operator: "equals", value: "me" }],
        isDefault: true,
    },
    {
        id: "2",
        name: "High Priority",
        filters: [{ id: "f2", field: "priority", operator: "equals", value: "high" }],
    },
];

export function AppProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
    const [timeLogs, setTimeLogs] = useState<Record<string, TimeLog>>({});
    const [globalFilters, setGlobalFilters] = useState<FilterCondition[]>([]);
    const [savedViews, setSavedViews] = useState<SavedView[]>(initialSavedViews);
    const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
    const [isTimeLogPanelOpen, setIsTimeLogPanelOpen] = useState(false);
    const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

    // Notification actions
    const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp">) => {
        const newNotification: Notification = {
            ...notification,
            id: String(Date.now()),
            timestamp: new Date().toISOString(),
        };
        setNotifications((prev) => [newNotification, ...prev]);
    }, []);

    const markNotificationRead = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    }, []);

    const markAllNotificationsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }, []);

    const dismissNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    // Activity actions
    const logActivity = useCallback((activity: Omit<ActivityItem, "id" | "timestamp">) => {
        const newActivity: ActivityItem = {
            ...activity,
            id: String(Date.now()),
            timestamp: new Date().toISOString(),
        };
        setActivities((prev) => [newActivity, ...prev]);

        // Auto-generate notification for certain activity types
        if (activity.type === "assigned" || activity.type === "mentioned" || activity.type === "commented") {
            addNotification({
                type: activity.type === "assigned" ? "assignment" :
                      activity.type === "mentioned" ? "mention" : "comment",
                title: activity.type === "assigned" ? "New assignment" :
                       activity.type === "mentioned" ? "You were mentioned" : "New comment",
                description: `${activity.user.name} ${activity.type} on '${activity.target}'`,
                isRead: false,
            });
        }
    }, [addNotification]);

    // Time tracking actions
    const logTime = useCallback((issueId: string, description: string, duration: number) => {
        const entry = {
            id: String(Date.now()),
            description,
            duration,
            date: new Date().toISOString().split("T")[0],
            userId: "current-user",
        };

        setTimeLogs((prev) => ({
            ...prev,
            [issueId]: {
                issueId,
                entries: [...(prev[issueId]?.entries || []), entry],
            },
        }));

        // Log activity for time tracking
        logActivity({
            type: "updated",
            user: { name: "You", color: "var(--plum)" },
            target: `Issue #${issueId}`,
            targetType: "issue",
            details: `Logged ${Math.floor(duration / 60)}h ${duration % 60}m`,
        });
    }, [logActivity]);

    const getTimeLogsForIssue = useCallback((issueId: string) => {
        return timeLogs[issueId];
    }, [timeLogs]);

    const getTotalTimeForIssue = useCallback((issueId: string) => {
        const logs = timeLogs[issueId];
        if (!logs) return 0;
        return logs.entries.reduce((sum, entry) => sum + entry.duration, 0);
    }, [timeLogs]);

    // Filter actions
    const saveView = useCallback((name: string, filters: FilterCondition[]) => {
        const newView: SavedView = {
            id: String(Date.now()),
            name,
            filters: [...filters],
        };
        setSavedViews((prev) => [...prev, newView]);
    }, []);

    const loadView = useCallback((view: SavedView) => {
        setGlobalFilters(view.filters);
    }, []);

    // UI actions
    const openNotificationPanel = useCallback(() => {
        setIsNotificationPanelOpen(true);
    }, []);

    const closeNotificationPanel = useCallback(() => {
        setIsNotificationPanelOpen(false);
    }, []);

    const openTimeLogPanel = useCallback((issueId: string) => {
        setActiveIssueId(issueId);
        setIsTimeLogPanelOpen(true);
    }, []);

    const closeTimeLogPanel = useCallback(() => {
        setIsTimeLogPanelOpen(false);
        setActiveIssueId(null);
    }, []);

    const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

    const value: AppContextValue = {
        notifications,
        unreadNotificationCount,
        activities,
        timeLogs,
        globalFilters,
        savedViews,
        isNotificationPanelOpen,
        isTimeLogPanelOpen,
        activeIssueId,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        dismissNotification,
        logActivity,
        logTime,
        getTimeLogsForIssue,
        getTotalTimeForIssue,
        setGlobalFilters,
        saveView,
        loadView,
        openNotificationPanel,
        closeNotificationPanel,
        openTimeLogPanel,
        closeTimeLogPanel,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
