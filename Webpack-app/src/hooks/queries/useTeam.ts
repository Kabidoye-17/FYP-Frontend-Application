/**
 * Team Query Hooks
 * TanStack Query hooks for team members (mostly read-only)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamService } from '../../services';

/**
 * Query key factory for team
 */
export const teamKeys = {
  all: ['team'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: () => [...teamKeys.lists()] as const,
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: string) => [...teamKeys.details(), id] as const,
};

/**
 * Fetch all team members
 */
export function useTeam() {
  return useQuery({
    queryKey: teamKeys.list(),
    queryFn: () => teamService.list(),
  });
}

/**
 * Fetch a single team member by ID
 */
export function useTeamMember(id: string) {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: () => teamService.getById(id),
    enabled: !!id,
  });
}

/**
 * Invite a new team member
 */
export function useInviteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, name, role }: { email: string; name: string; role?: string }) =>
      teamService.invite(email, name, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
}
