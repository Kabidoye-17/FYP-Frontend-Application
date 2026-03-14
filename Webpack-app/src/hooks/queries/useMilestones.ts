/**
 * Milestones Query Hooks
 * TanStack Query hooks for milestones CRUD
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { milestonesService } from '../../services';
import type { MilestoneCreate, MilestoneUpdate, MilestoneFilters } from '../../types/api.types';

/**
 * Query key factory for milestones
 */
export const milestoneKeys = {
  all: ['milestones'] as const,
  lists: () => [...milestoneKeys.all, 'list'] as const,
  list: (filters?: MilestoneFilters) => [...milestoneKeys.lists(), filters] as const,
  details: () => [...milestoneKeys.all, 'detail'] as const,
  detail: (id: string) => [...milestoneKeys.details(), id] as const,
};

/**
 * Fetch all milestones with optional filters
 */
export function useMilestones(filters?: MilestoneFilters) {
  return useQuery({
    queryKey: milestoneKeys.list(filters),
    queryFn: () => milestonesService.list(filters),
  });
}

/**
 * Fetch a single milestone by ID
 */
export function useMilestone(id: string) {
  return useQuery({
    queryKey: milestoneKeys.detail(id),
    queryFn: () => milestonesService.getById(id),
    enabled: !!id,
  });
}

/**
 * Create a new milestone
 */
export function useCreateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MilestoneCreate) => milestonesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.lists() });
    },
  });
}

/**
 * Update an existing milestone
 */
export function useUpdateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MilestoneUpdate }) =>
      milestonesService.update(id, data),
    onSuccess: (updatedMilestone, { id }) => {
      queryClient.setQueryData(milestoneKeys.detail(id), updatedMilestone);
      queryClient.invalidateQueries({ queryKey: milestoneKeys.lists() });
    },
  });
}

/**
 * Delete a milestone
 */
export function useDeleteMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => milestonesService.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: milestoneKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: milestoneKeys.lists() });
    },
  });
}
