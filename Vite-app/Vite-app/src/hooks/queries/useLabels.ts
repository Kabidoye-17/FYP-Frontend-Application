/**
 * Labels Query Hooks
 * TanStack Query hooks for labels CRUD
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { labelsService } from '../../services';
import type { LabelCreate } from '../../types/api.types';

/**
 * Query key factory for labels
 */
export const labelKeys = {
  all: ['labels'] as const,
  lists: () => [...labelKeys.all, 'list'] as const,
  list: () => [...labelKeys.lists()] as const,
};

/**
 * Fetch all labels
 */
export function useLabels() {
  return useQuery({
    queryKey: labelKeys.list(),
    queryFn: () => labelsService.list(),
    staleTime: 1000 * 60 * 10, // Labels change infrequently, cache for 10 minutes
  });
}

/**
 * Create a new label
 */
export function useCreateLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LabelCreate) => labelsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: labelKeys.lists() });
    },
  });
}

/**
 * Delete a label
 */
export function useDeleteLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => labelsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: labelKeys.lists() });
    },
  });
}
