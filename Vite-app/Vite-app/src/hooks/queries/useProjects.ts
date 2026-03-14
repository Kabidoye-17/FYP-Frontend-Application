/**
 * Projects Query Hooks
 * TanStack Query hooks for projects CRUD and sub-resources
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '../../services';
import type { ProjectCreate, ProjectUpdate, ProjectFilters } from '../../types/api.types';

/**
 * Query key factory for projects
 */
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: ProjectFilters) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  members: (projectId: string) => [...projectKeys.detail(projectId), 'members'] as const,
};

/**
 * Fetch all projects with optional filters
 */
export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: projectKeys.list(filters),
    queryFn: () => projectsService.list(filters),
  });
}

/**
 * Fetch a single project by ID
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsService.getById(id),
    enabled: !!id,
  });
}

/**
 * Fetch members of a project
 */
export function useProjectMembers(projectId: string) {
  return useQuery({
    queryKey: projectKeys.members(projectId),
    queryFn: () => projectsService.getMembers(projectId),
    enabled: !!projectId,
  });
}

/**
 * Create a new project
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectCreate) => projectsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

/**
 * Update an existing project
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectUpdate }) =>
      projectsService.update(id, data),
    onSuccess: (updatedProject, { id }) => {
      queryClient.setQueryData(projectKeys.detail(id), updatedProject);
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

/**
 * Delete a project
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsService.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: projectKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
