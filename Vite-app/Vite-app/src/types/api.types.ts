/**
 * API Types
 * TypeScript interfaces matching backend Pydantic schemas
 * All types use camelCase (transformed from snake_case by api.service.ts)
 */

// ============================================================================
// Enums (matching backend models)
// ============================================================================

export type IssueStatus = 'backlog' | 'todo' | 'in progress' | 'in review' | 'done' | 'cancelled';
export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectStatus = 'backlog' | 'planned' | 'in progress' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

export type SprintStatus = 'planning' | 'active' | 'completed' | 'cancelled';

export type MilestoneStatus = 'open' | 'in progress' | 'closed';

export type NotificationType = 'mention' | 'assignment' | 'comment' | 'status_change' | 'due_date';

export type UserRole = 'admin' | 'member' | 'viewer';

// ============================================================================
// User Types
// ============================================================================

export interface UserBrief {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  color: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreate {
  id: string;
  name: string;
  email: string;
  color?: string;
  role?: UserRole;
}

// ============================================================================
// Label Types
// ============================================================================

export interface Label {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface LabelCreate {
  name: string;
  color?: string;
}

// ============================================================================
// Comment Types
// ============================================================================

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorColor: string;
  text: string;
  createdAt: string;
}

export interface CommentCreate {
  content: string;
}

// ============================================================================
// Issue Types
// ============================================================================

export interface IssueBrief {
  id: string;
  title: string;
  status: string;
  priority: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  estimate: number | null;
  targetDate: string | null;
  projectId: string | null;
  milestoneId: string | null;
  assignees: UserBrief[];
  labels: Label[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface IssueCreate {
  title: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  projectId?: string | null;
  milestoneId?: string | null;
  assigneeIds?: string[];
  labelIds?: string[];
  estimate?: number | null;
  targetDate?: string | null;
}

export interface IssueUpdate {
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  projectId?: string | null;
  milestoneId?: string | null;
  assigneeIds?: string[];
  labelIds?: string[];
  estimate?: number | null;
  targetDate?: string | null;
}

export interface IssueFilters {
  status?: string;
  priority?: string;
  projectId?: string;
  assigneeId?: string;
}

// ============================================================================
// Project Types
// ============================================================================

export interface ProjectBrief {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  color: string;
  targetDate: string | null;
  leadId: string | null;
  lead: UserBrief | null;
  members: UserBrief[];
  memberIds: string[];
  labels: Label[];
  associatedIssues: IssueBrief[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreate {
  name: string;
  title: string;
  description?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  color?: string;
  leadId?: string | null;
  memberIds?: string[];
  labelIds?: string[];
  targetDate?: string | null;
}

export interface ProjectUpdate {
  name?: string;
  title?: string;
  description?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  color?: string;
  leadId?: string | null;
  memberIds?: string[];
  labelIds?: string[];
  targetDate?: string | null;
}

export interface ProjectFilters {
  status?: string;
  priority?: string;
  leadId?: string;
}

// ============================================================================
// Sprint Types
// ============================================================================

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  status: SprintStatus;
  startDate: string | null;
  endDate: string | null;
  capacity: number;
  issues: IssueBrief[];
  createdAt: string;
  updatedAt: string;
}

export interface SprintCreate {
  name: string;
  goal?: string;
  status?: SprintStatus;
  startDate?: string | null;
  endDate?: string | null;
  capacity?: number;
  issueIds?: string[];
}

export interface SprintUpdate {
  name?: string;
  goal?: string;
  status?: SprintStatus;
  startDate?: string | null;
  endDate?: string | null;
  capacity?: number;
  issueIds?: string[];
}

export interface SprintFilters {
  status?: string;
}

// ============================================================================
// Milestone Types
// ============================================================================

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  dueDate: string | null;
  projectId: string;
  issues: IssueBrief[];
  createdAt: string;
  updatedAt: string;
}

export interface MilestoneCreate {
  title: string;
  description?: string;
  status?: MilestoneStatus;
  dueDate?: string | null;
  projectId: string;
}

export interface MilestoneUpdate {
  title?: string;
  description?: string;
  status?: MilestoneStatus;
  dueDate?: string | null;
}

export interface MilestoneFilters {
  status?: string;
  projectId?: string;
}

// ============================================================================
// Notification Types
// ============================================================================

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string | null;
  timestamp: string;
  isRead: boolean;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface DashboardStats {
  totalIssues: number;
  completedIssues: number;
  inProgressIssues: number;
  backlogIssues: number;
  totalProjects: number;
  activeSprints: number;
  teamMembers: number;
  issuesByPriority: Record<string, number>;
  issuesByProject: Array<{ project: string; count: number }>;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export interface SprintVelocity {
  sprintName: string;
  planned: number;
  completed: number;
}

export interface VelocityData {
  sprints: SprintVelocity[];
  averageVelocity: number;
}

export interface BurndownPoint {
  date: string;
  remaining: number;
  ideal: number;
}

export interface BurndownData {
  sprintName: string;
  totalPoints: number;
  points: BurndownPoint[];
}

// ============================================================================
// Time Entry Types
// ============================================================================

export interface TimeEntry {
  id: string;
  issueId: string;
  userId: string;
  description: string;
  duration: number;
  date: string;
  createdAt: string;
}

export interface TimeEntryCreate {
  issueId: string;
  description: string;
  duration: number;
  date?: string;
}

// ============================================================================
// Calendar Event Types
// ============================================================================

export type CalendarEventType = 'issue' | 'milestone' | 'sprint' | 'meeting';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: CalendarEventType;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEventCreate {
  title: string;
  description?: string;
  date: string;
  type: CalendarEventType;
}

export interface CalendarEventUpdate {
  title?: string;
  description?: string;
  date?: string;
  type?: CalendarEventType;
}
