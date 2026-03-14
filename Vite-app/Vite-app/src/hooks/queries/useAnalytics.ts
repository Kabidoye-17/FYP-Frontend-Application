/**
 * Analytics Query Hooks
 * TanStack Query hooks for analytics data (read-only)
 */

import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../../services';

/**
 * Query key factory for analytics
 */
export const analyticsKeys = {
  all: ['analytics'] as const,
  dashboard: () => [...analyticsKeys.all, 'dashboard'] as const,
  velocity: () => [...analyticsKeys.all, 'velocity'] as const,
  burndown: (sprintId: string) => [...analyticsKeys.all, 'burndown', sprintId] as const,
};

/**
 * Fetch dashboard statistics
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: () => analyticsService.getDashboard(),
    staleTime: 1000 * 60 * 2, // Dashboard can be slightly stale, 2 minutes
  });
}

/**
 * Fetch team velocity data
 */
export function useVelocity() {
  return useQuery({
    queryKey: analyticsKeys.velocity(),
    queryFn: () => analyticsService.getVelocity(),
    staleTime: 1000 * 60 * 5, // Velocity changes slowly, 5 minutes
  });
}

/**
 * Fetch burndown data for a specific sprint
 */
export function useBurndown(sprintId: string) {
  return useQuery({
    queryKey: analyticsKeys.burndown(sprintId),
    queryFn: () => analyticsService.getBurndown(sprintId),
    enabled: !!sprintId,
    staleTime: 1000 * 60 * 2, // Burndown updates throughout the day
  });
}
