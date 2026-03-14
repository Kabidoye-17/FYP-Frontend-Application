/**
 * Query Hooks Barrel Export
 * Central export point for all TanStack Query hooks
 */

// Auth
export {
  authKeys,
  useCurrentUser,
  useLogin,
  useSignup,
  useLogout,
} from './useAuth';

// Issues
export {
  issueKeys,
  useIssues,
  useIssue,
  useIssueComments,
  useCreateIssue,
  useUpdateIssue,
  useDeleteIssue,
  useAddComment,
} from './useIssues';

// Projects
export {
  projectKeys,
  useProjects,
  useProject,
  useProjectMembers,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from './useProjects';

// Sprints
export {
  sprintKeys,
  useSprints,
  useSprint,
  useSprintIssues,
  useCreateSprint,
  useUpdateSprint,
  useDeleteSprint,
} from './useSprints';

// Milestones
export {
  milestoneKeys,
  useMilestones,
  useMilestone,
  useCreateMilestone,
  useUpdateMilestone,
  useDeleteMilestone,
} from './useMilestones';

// Team
export {
  teamKeys,
  useTeam,
  useTeamMember,
  useInviteTeamMember,
} from './useTeam';

// Labels
export {
  labelKeys,
  useLabels,
  useCreateLabel,
  useDeleteLabel,
} from './useLabels';

// Analytics
export {
  analyticsKeys,
  useDashboardStats,
  useVelocity,
  useBurndown,
} from './useAnalytics';

// Notifications
export {
  notificationKeys,
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from './useNotifications';

// Calendar
export {
  calendarKeys,
  useCalendarEvents,
  useCalendarEvent,
  useCreateCalendarEvent,
  useUpdateCalendarEvent,
  useDeleteCalendarEvent,
} from './useCalendar';
