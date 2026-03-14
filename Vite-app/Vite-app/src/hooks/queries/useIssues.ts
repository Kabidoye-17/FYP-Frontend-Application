/**
 * Issues Query Hooks
 * TanStack Query hooks for issues CRUD and sub-resources
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { issuesService } from '../../services';
import type { IssueCreate, IssueUpdate, IssueFilters } from '../../types/api.types';

/**
 * Query key factory for issues
 * Provides type-safe, hierarchical keys for cache management
 */
export const issueKeys = {
  all: ['issues'] as const,
  lists: () => [...issueKeys.all, 'list'] as const,
  list: (filters?: IssueFilters) => [...issueKeys.lists(), filters] as const,
  details: () => [...issueKeys.all, 'detail'] as const,
  detail: (id: string) => [...issueKeys.details(), id] as const,
  comments: (issueId: string) => [...issueKeys.detail(issueId), 'comments'] as const,
};

/**
 * Fetch all issues with optional filters
 */
export function useIssues(filters?: IssueFilters) {
  return useQuery({
    queryKey: issueKeys.list(filters),
    queryFn: () => issuesService.list(filters),
  });
}

/**
 * Fetch a single issue by ID
 */
export function useIssue(id: string) {
  return useQuery({
    queryKey: issueKeys.detail(id),
    queryFn: () => issuesService.getById(id),
    enabled: !!id,
  });
}

/**
 * Fetch comments for an issue
 */
export function useIssueComments(issueId: string) {
  return useQuery({
    queryKey: issueKeys.comments(issueId),
    queryFn: () => issuesService.getComments(issueId),
    enabled: !!issueId,
  });
}

/**
 * Create a new issue
 */
export function useCreateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IssueCreate) => issuesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: issueKeys.lists() });
    },
  });
}

/**
 * Update an existing issue
 */
export function useUpdateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IssueUpdate }) =>
      issuesService.update(id, data),
    onSuccess: (updatedIssue, { id }) => {
      // Update the individual issue cache
      queryClient.setQueryData(issueKeys.detail(id), updatedIssue);
      // Invalidate lists to reflect changes
      queryClient.invalidateQueries({ queryKey: issueKeys.lists() });
    },
  });
}

/**
 * Delete an issue
 */
export function useDeleteIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => issuesService.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: issueKeys.detail(id) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: issueKeys.lists() });
    },
  });
}

/**
 * Add a comment to an issue
 */
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ issueId, content }: { issueId: string; content: string }) =>
      issuesService.addComment(issueId, { content }),
    onSuccess: (_, { issueId }) => {
      // Invalidate comments for this issue
      queryClient.invalidateQueries({ queryKey: issueKeys.comments(issueId) });
      // Also invalidate the issue detail to get updated comment count
      queryClient.invalidateQueries({ queryKey: issueKeys.detail(issueId) });
    },
  });
}
