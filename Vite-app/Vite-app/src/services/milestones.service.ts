/**
 * Milestones Service
 * CRUD operations for milestones
 */

import { API } from '../config/api';
import { apiFetch, buildQuery } from './api.service';
import type {
  Milestone,
  MilestoneCreate,
  MilestoneUpdate,
  MilestoneFilters,
} from '../types/api.types';

export const milestonesService = {
  /**
   * Get all milestones with optional filters
   */
  list: (filters?: MilestoneFilters) =>
    apiFetch<Milestone[]>(API.MILESTONES.LIST + buildQuery(filters)),

  /**
   * Get a single milestone by ID
   */
  getById: (id: string) =>
    apiFetch<Milestone>(API.MILESTONES.DETAIL(id)),

  /**
   * Create a new milestone
   */
  create: (data: MilestoneCreate) =>
    apiFetch<Milestone>(API.MILESTONES.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Update an existing milestone
   */
  update: (id: string, data: MilestoneUpdate) =>
    apiFetch<Milestone>(API.MILESTONES.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Delete a milestone
   */
  delete: (id: string) =>
    apiFetch<void>(API.MILESTONES.DELETE(id), {
      method: 'DELETE',
    }),
};
