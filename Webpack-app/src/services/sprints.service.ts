/**
 * Sprints Service
 * CRUD operations for sprints
 */

import { API } from '../config/api';
import { apiFetch, buildQuery } from './api.service';
import type {
  Sprint,
  SprintCreate,
  SprintUpdate,
  SprintFilters,
  IssueBrief,
} from '../types/api.types';

export const sprintsService = {
  /**
   * Get all sprints with optional filters
   */
  list: (filters?: SprintFilters) =>
    apiFetch<Sprint[]>(API.SPRINTS.LIST + buildQuery(filters)),

  /**
   * Get a single sprint by ID
   */
  getById: (id: string) =>
    apiFetch<Sprint>(API.SPRINTS.DETAIL(id)),

  /**
   * Create a new sprint
   */
  create: (data: SprintCreate) =>
    apiFetch<Sprint>(API.SPRINTS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Update an existing sprint
   */
  update: (id: string, data: SprintUpdate) =>
    apiFetch<Sprint>(API.SPRINTS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Delete a sprint
   */
  delete: (id: string) =>
    apiFetch<void>(API.SPRINTS.DELETE(id), {
      method: 'DELETE',
    }),

  // Sub-resources

  /**
   * Get issues in a sprint
   */
  getIssues: (sprintId: string) =>
    apiFetch<IssueBrief[]>(API.SPRINTS.ISSUES(sprintId)),
};
