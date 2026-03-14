/**
 * Analytics Service
 * Read-only operations for analytics data
 */

import { API } from '../config/api';
import { apiFetch } from './api.service';
import type { DashboardStats, VelocityData, BurndownData } from '../types/api.types';

export const analyticsService = {
  /**
   * Get dashboard statistics
   */
  getDashboard: () =>
    apiFetch<DashboardStats>(API.ANALYTICS.DASHBOARD),

  /**
   * Get team velocity data
   */
  getVelocity: () =>
    apiFetch<VelocityData>(API.ANALYTICS.VELOCITY),

  /**
   * Get burndown data for a specific sprint
   */
  getBurndown: (sprintId: string) =>
    apiFetch<BurndownData>(API.ANALYTICS.BURNDOWN(sprintId)),
};
