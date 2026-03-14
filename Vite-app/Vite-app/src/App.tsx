import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./utils/GlobalStyles";
import * as Tooltip from "./design_system/Tooltip";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppErrorBoundary from "./components/ErrorBoundary/AppErrorBoundary";
import KeyboardShortcutsProvider from "./features/keyboard/KeyboardShortcutsProvider";
import PageSuspense from "./components/Suspense/PageSuspense";
import { ROUTE_PATTERNS } from "./config";
import { useLocalStorage } from "./hooks";

// Lazy load all page components for code splitting
// This dramatically reduces initial bundle size
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LoginAndRegisterPage = lazy(() => import("./pages/LoginAndRegisterPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

// Home sub-pages
const ViewIssuesPageTable = lazy(() => import("./Tables/ViewIssuesPage/ViewIssuesPageTable"));
const ViewProjectsPageTable = lazy(() => import("./Tables/ViewProjectsPage.tsx/ViewProjectsPageTable"));
const ViewSprintsPageTable = lazy(() => import("./Tables/ViewSprintsPage/ViewSprintsPageTable"));
const ViewMilestonesPage = lazy(() => import("./pages/ViewMilestonesPage"));
const KanbanBoardPage = lazy(() => import("./pages/KanbanBoardPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const WorkloadPage = lazy(() => import("./pages/WorkloadPage"));
const AnalyticsDashboardPage = lazy(() => import("./pages/AnalyticsDashboardPage/AnalyticsDashboardPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage/CalendarPage"));
const TeamPage = lazy(() => import("./pages/TeamPage/TeamPage"));

// Detail pages
const IssueDetailPage = lazy(() => import("./pages/IssueDetailPage/IssueDetailPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage/ProjectDetailPage"));
const SprintDetailPage = lazy(() => import("./pages/SprintDetailPage/SprintDetailPage"));

// Create a client for TanStack Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    // Use custom hook for localStorage with automatic sync
    const [defaultView] = useLocalStorage<string>("defaultHomeView", "projects");

    const getDefaultView = (): string => {
        return defaultView === "issues" ? "issues" : "projects";
    };

    return (
        <AppErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppProvider>
                        <KeyboardShortcutsProvider>
                            <GlobalStyles />
                            <Tooltip.Provider delayDuration={200}>
                                <Suspense fallback={<PageSuspense />}>
                                    <Routes>
                                        {/* Public routes */}
                                        <Route path="/" element={<LandingPage />} />
                                        <Route path="/signup" element={<SignUpPage />} />
                                        <Route path="/login" element={<LoginPage />} />
                                        <Route path="/loginandregister" element={<LoginAndRegisterPage />} />

                                        {/* Protected routes */}
                                        <Route
                                            path="/settings"
                                            element={
                                                <ProtectedRoute>
                                                    <SettingsPage />
                                                </ProtectedRoute>
                                            }
                                        />

                                        {/* Main app with nested routes - protected */}
                                        <Route
                                            path="/home"
                                            element={
                                                <ProtectedRoute>
                                                    <HomePage />
                                                </ProtectedRoute>
                                            }
                                        >
                                            <Route index element={<Navigate to={getDefaultView()} replace />} />
                                            <Route path="issues" element={<ViewIssuesPageTable />} />
                                            <Route path="projects" element={<ViewProjectsPageTable />} />
                                            <Route path="sprints" element={<ViewSprintsPageTable />} />
                                            <Route path="milestones" element={<ViewMilestonesPage />} />
                                            <Route path="kanban" element={<KanbanBoardPage />} />
                                            <Route path="roadmap" element={<RoadmapPage />} />
                                            <Route path="workload" element={<WorkloadPage />} />
                                            <Route path="analytics" element={<AnalyticsDashboardPage />} />
                                            <Route path="calendar" element={<CalendarPage />} />
                                            <Route path="team" element={<TeamPage />} />
                                        </Route>

                                        {/* Detail pages - protected */}
                                        <Route
                                            path={ROUTE_PATTERNS.ISSUE_DETAIL}
                                            element={
                                                <ProtectedRoute>
                                                    <IssueDetailPage />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path={ROUTE_PATTERNS.PROJECT_DETAIL}
                                            element={
                                                <ProtectedRoute>
                                                    <ProjectDetailPage />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path={ROUTE_PATTERNS.SPRINT_DETAIL}
                                            element={
                                                <ProtectedRoute>
                                                    <SprintDetailPage />
                                                </ProtectedRoute>
                                            }
                                        />
                                    </Routes>
                                </Suspense>
                            </Tooltip.Provider>
                        </KeyboardShortcutsProvider>
                    </AppProvider>
                </AuthProvider>
            </QueryClientProvider>
        </AppErrorBoundary>
    );
}

export default App;
