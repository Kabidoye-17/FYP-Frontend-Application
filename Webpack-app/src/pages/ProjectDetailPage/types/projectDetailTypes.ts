import type { StatusLevel, PriorityLevel } from "../../../utils/issueIconMaps";
import type { User } from "../../../utils/assigneeData";
import type { Label } from "../../../utils/labelData";

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorColor: string;
  text: string;
  createdAt: Date;
}

export interface AssociatedIssue {
  id: string;
  title: string;
  status: StatusLevel;
  priority: PriorityLevel;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: StatusLevel;
  priority: PriorityLevel;
  leadId: string | null;
  memberIds: string[];
  labels: string[];
  targetDate: Date | null;
  associatedIssues: AssociatedIssue[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDetailFormData {
  title: string;
  description: string;
  status: StatusLevel;
  priority: PriorityLevel;
  leadId: string | null;
  memberIds: string[];
  labels: string[];
  targetDate: Date | null;
}

export type { StatusLevel, PriorityLevel, User, Label };
