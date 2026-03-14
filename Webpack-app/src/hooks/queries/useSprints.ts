/**
 * Sprints Query Hooks
 * TanStack Query hooks for sprints CRUD
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sprintsService } from '../../services';
import type { SprintCreate, SprintUpdate, SprintFilters } from '../../types/api.types';

/**
 * Query key factory for sprints
 */
export const sprintKeys = {
  all: ['sprints'] as const,
  lists: () => [...sprintKeys.all, 'list'] as const,
  list: (filters?: SprintFilters) => [...sprintKeys.lists(), filters] as const,
  details: () => [...sprintKeys.all, 'detail'] as const,
  detail: (id: string) => [...sprintKeys.details(), id] as const,
  issues: (sprintId: string) => [...sprintKeys.detail(sprintId), 'issues'] as const,
};

/**
 * Fetch all sprints with optional filters
 */
export function useSprints(filters?: SprintFilters) {
  return useQuery({
    queryKey: sprintKeys.list(filters),
    queryFn: () => sprintsService.list(filters),
  });
}

/**
 * Fetch a single sprint by ID
 */
export function useSprint(id: string) {
  return useQuery({
    queryKey: sprintKeys.detail(id),
    queryFn: () => sprintsService.getById(id),
    enabled: !!id,
  });
}

/**
 * Fetch issues in a sprint
 */
export function useSprintIssues(sprintId: string) {
  return useQuery({
    queryKey: sprintKeys.issues(sprintId),
    queryFn: () => sprintsService.getIssues(sprintId),
    enabled: !!sprintId,
  });
}

/**
 * Create a new sprint
 */
export function useCreateSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SprintCreate) => sprintsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sprintKeys.lists() });
    },
  });
}

/**
 * Update an existing sprint
 */
export function useUpdateSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SprintUpdate }) =>
      sprintsService.update(id, data),
    onSuccess: (updatedSprint, { id }) => {
      queryClient.setQueryData(sprintKeys.detail(id), updatedSprint);
      queryClient.invalidateQueries({ queryKey: sprintKeys.lists() });
    },
  });
}

/**
 * Delete a sprint
 */
export function useDeleteSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sprintsService.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: sprintKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: sprintKeys.lists() });
    },
  });
}
