/**
 * Data Transformation Helpers
 * Utilities for transforming API data into UI-friendly formats
 */

import type { Issue, Project, Sprint } from '../types/api.types';

// ============================================================================
// Status Title Formatting
// ============================================================================

const STATUS_TITLES: Record<string, string> = {
  backlog: 'Backlog',
  todo: 'To Do',
  'in progress': 'In Progress',
  'in review': 'In Review',
  done: 'Done',
  completed: 'Completed',
  cancelled: 'Cancelled',
  planned: 'Planned',
  active: 'Active',
  planning: 'Planning',
  open: 'Open',
  closed: 'Closed',
};

export function formatStatusTitle(status: string): string {
  return STATUS_TITLES[status.toLowerCase()] || status;
}

// ============================================================================
// Issue Grouping
// ============================================================================

export interface IssueSection {
  title: string;
  issues: Array<{
    id: string;
    team: string;
    priority: string;
    status: string;
    projectName: string;
    assignee: {
      name: string;
      color: string;
    };
    createdDate: string;
  }>;
}

/**
 * Group issues by status for table display
 */
export function groupIssuesByStatus(issues: Issue[]): IssueSection[] {
  const statusOrder = ['backlog', 'todo', 'in progress', 'in review', 'done', 'completed'];
  const groups: Record<string, Issue[]> = {};

  // Initialize groups
  statusOrder.forEach((status) => (groups[status] = []));

  // Group issues
  issues.forEach((issue) => {
    const status = issue.status?.toLowerCase() || 'backlog';
    if (!groups[status]) groups[status] = [];
    groups[status].push(issue);
  });

  // Transform to sections
  return statusOrder
    .filter((status) => groups[status]?.length > 0)
    .map((status) => ({
      title: formatStatusTitle(status),
      issues: groups[status].map((issue) => ({
        id: issue.id,
        team: 'Engineering', // Default team - can be enhanced with project data
        priority: issue.priority || 'medium',
        status: issue.status || 'backlog',
        projectName: issue.projectId || 'No Project',
        assignee: issue.assignees?.[0] || { name: 'Unassigned', color: 'var(--text-secondary)' },
        createdDate: issue.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
      })),
    }));
}

// ============================================================================
// Project Grouping
// ============================================================================

export interface ProjectSection {
  title: string;
  projects: Array<{
    id: string;
    team: string;
    projectName: string;
    lead: {
      name: string;
      color: string;
    };
    priority: string;
    status: string;
  }>;
}

/**
 * Group projects by status for table display
 */
export function groupProjectsByStatus(projects: Project[]): ProjectSection[] {
  const statusOrder = ['backlog', 'planned', 'in progress', 'completed', 'cancelled'];
  const groups: Record<string, Project[]> = {};

  // Initialize groups
  statusOrder.forEach((status) => (groups[status] = []));

  // Group projects
  projects.forEach((project) => {
    const status = project.status?.toLowerCase() || 'backlog';
    if (!groups[status]) groups[status] = [];
    groups[status].push(project);
  });

  // Transform to sections
  return statusOrder
    .filter((status) => groups[status]?.length > 0)
    .map((status) => ({
      title: formatStatusTitle(status),
      projects: groups[status].map((project) => ({
        id: project.id,
        team: 'Team', // Can be enhanced with team data
        projectName: project.title || project.name,
        lead: project.lead || { name: 'No Lead', color: 'var(--text-secondary)' },
        priority: formatStatusTitle(project.priority || 'medium'),
        status: formatStatusTitle(project.status || 'backlog'),
      })),
    }));
}

// ============================================================================
// Sprint Grouping
// ============================================================================

export interface SprintSection {
  title: string;
  sprints: Array<{
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    issueCount: number;
    completedIssues: number;
    teamName: string;
  }>;
}

/**
 * Group sprints by status for table display
 */
export function groupSprintsByStatus(sprints: Sprint[]): SprintSection[] {
  const statusOrder = ['active', 'planning', 'completed', 'cancelled'];
  const groups: Record<string, Sprint[]> = {};

  // Initialize groups
  statusOrder.forEach((status) => (groups[status] = []));

  // Group sprints
  sprints.forEach((sprint) => {
    const status = sprint.status?.toLowerCase() || 'planning';
    if (!groups[status]) groups[status] = [];
    groups[status].push(sprint);
  });

  // Transform to sections
  return statusOrder
    .filter((status) => groups[status]?.length > 0)
    .map((status) => ({
      title: formatStatusTitle(status),
      sprints: groups[status].map((sprint) => ({
        id: sprint.id,
        name: sprint.name,
        status: sprint.status || 'planning',
        startDate: sprint.startDate?.split('T')[0] || '',
        endDate: sprint.endDate?.split('T')[0] || '',
        issueCount: sprint.issues?.length || 0,
        completedIssues: sprint.issues?.filter((i) => i.status === 'done' || i.status === 'completed').length || 0,
        teamName: 'Engineering', // Can be enhanced
      })),
    }));
}

// ============================================================================
// Kanban Board Helpers
// ============================================================================

export interface KanbanIssue {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: { name: string; color: string } | null;
  labels: string[];
  dueDate: string | null;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: string;
  issues: KanbanIssue[];
}

/**
 * Transform issues into Kanban columns
 */
export function transformIssuesForKanban(issues: Issue[]): KanbanColumn[] {
  const columns: KanbanColumn[] = [
    { id: 'backlog', title: 'Backlog', status: 'backlog', issues: [] },
    { id: 'todo', title: 'To Do', status: 'todo', issues: [] },
    { id: 'in-progress', title: 'In Progress', status: 'in progress', issues: [] },
    { id: 'done', title: 'Done', status: 'done', issues: [] },
  ];

  issues.forEach((issue) => {
    const status = issue.status?.toLowerCase() || 'backlog';
    const column = columns.find((c) => c.status === status);

    if (column) {
      column.issues.push({
        id: issue.id,
        title: issue.title,
        description: issue.description || '',
        priority: (issue.priority as KanbanIssue['priority']) || 'medium',
        assignee: issue.assignees?.[0] || null,
        labels: issue.labels?.map((l) => l.name) || [],
        dueDate: issue.targetDate?.split('T')[0] || null,
      });
    }
  });

  return columns;
}

// ============================================================================
// Team Member Helpers
// ============================================================================

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  color: string;
  stats: {
    assigned: number;
    completed: number;
    inProgress: number;
  };
}

/**
 * Transform users to team members with default stats
 */
export function transformUsersToTeamMembers(users: Array<{
  id: string;
  name: string;
  email: string;
  color: string;
  role: string;
}>): TeamMember[] {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: formatStatusTitle(user.role || 'member'),
    color: user.color || 'var(--plum)',
    stats: { assigned: 0, completed: 0, inProgress: 0 }, // Would need additional API call for real stats
  }));
}
