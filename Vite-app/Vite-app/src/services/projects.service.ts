/**
 * Projects Service
 * CRUD operations for projects and their sub-resources
 */

import { API } from '../config/api';
import { apiFetch, buildQuery } from './api.service';
import type {
  Project,
  ProjectCreate,
  ProjectUpdate,
  ProjectFilters,
  UserBrief,
} from '../types/api.types';

export const projectsService = {
  /**
   * Get all projects with optional filters
   */
  list: (filters?: ProjectFilters) =>
    apiFetch<Project[]>(API.PROJECTS.LIST + buildQuery(filters)),

  /**
   * Get a single project by ID
   */
  getById: (id: string) =>
    apiFetch<Project>(API.PROJECTS.DETAIL(id)),

  /**
   * Create a new project
   */
  create: (data: ProjectCreate) =>
    apiFetch<Project>(API.PROJECTS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Update an existing project
   */
  update: (id: string, data: ProjectUpdate) =>
    apiFetch<Project>(API.PROJECTS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Delete a project
   */
  delete: (id: string) =>
    apiFetch<void>(API.PROJECTS.DELETE(id), {
      method: 'DELETE',
    }),

  // Sub-resources

  /**
   * Get members of a project
   */
  getMembers: (projectId: string) =>
    apiFetch<UserBrief[]>(API.PROJECTS.MEMBERS(projectId)),
};
