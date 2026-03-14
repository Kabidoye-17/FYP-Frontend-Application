/**
 * Issues Service
 * CRUD operations for issues and their sub-resources (comments, attachments)
 */

import { API } from '../config/api';
import { apiFetch, buildQuery } from './api.service';
import type {
  Issue,
  IssueCreate,
  IssueUpdate,
  IssueFilters,
  Comment,
  CommentCreate,
} from '../types/api.types';

export const issuesService = {
  /**
   * Get all issues with optional filters
   */
  list: (filters?: IssueFilters) =>
    apiFetch<Issue[]>(API.ISSUES.LIST + buildQuery(filters)),

  /**
   * Get a single issue by ID
   */
  getById: (id: string) =>
    apiFetch<Issue>(API.ISSUES.DETAIL(id)),

  /**
   * Create a new issue
   */
  create: (data: IssueCreate) =>
    apiFetch<Issue>(API.ISSUES.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Update an existing issue
   */
  update: (id: string, data: IssueUpdate) =>
    apiFetch<Issue>(API.ISSUES.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Delete an issue
   */
  delete: (id: string) =>
    apiFetch<void>(API.ISSUES.DELETE(id), {
      method: 'DELETE',
    }),

  // Sub-resources

  /**
   * Get comments for an issue
   */
  getComments: (issueId: string) =>
    apiFetch<Comment[]>(API.ISSUES.COMMENTS(issueId)),

  /**
   * Add a comment to an issue
   */
  addComment: (issueId: string, data: CommentCreate) =>
    apiFetch<Comment>(API.ISSUES.COMMENTS(issueId), {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
