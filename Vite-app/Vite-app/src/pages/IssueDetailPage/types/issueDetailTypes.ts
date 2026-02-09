import type { StatusLevel, PriorityLevel } from "../../../utils/issueIconMaps";
import type { User } from "../../../utils/assigneeData";
import type { Label } from "../../../utils/labelData";
import type { Project } from "../../../utils/projectData";

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorColor: string;
  text: string;
  createdAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: StatusLevel;
  priority: PriorityLevel;
  assignees: string[];
  projectId: string | null;
  labels: string[];
  targetDate: Date | null;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IssueDetailFormData {
  title: string;
  description: string;
  status: StatusLevel;
  priority: PriorityLevel;
  assignees: string[];
  projectId: string | null;
  labels: string[];
  targetDate: Date | null;
}

export type { StatusLevel, PriorityLevel, User, Label, Project };
