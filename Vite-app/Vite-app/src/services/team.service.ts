/**
 * Team Service
 * Operations for team members (read-only in most cases)
 */

import { API } from '../config/api';
import { apiFetch } from './api.service';
import type { User } from '../types/api.types';

export const teamService = {
  /**
   * Get all team members
   */
  list: () =>
    apiFetch<User[]>(API.TEAM.LIST),

  /**
   * Get a single team member by ID
   */
  getById: (id: string) =>
    apiFetch<User>(API.TEAM.MEMBER(id)),

  /**
   * Invite a new team member
   */
  invite: (email: string, name: string, role?: string) =>
    apiFetch<User>(API.TEAM.INVITE, {
      method: 'POST',
      body: JSON.stringify({ email, name, role }),
    }),
};
