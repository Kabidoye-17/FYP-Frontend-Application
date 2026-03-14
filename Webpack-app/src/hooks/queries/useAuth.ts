/**
 * Auth Query Hooks
 * TanStack Query hooks for authentication
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, type LoginCredentials, type SignupData } from '../../services/auth.service';

/**
 * Query key factory for auth
 */
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

/**
 * Get current authenticated user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authService.me(),
    staleTime: Infinity, // User doesn't change during session
    retry: false, // Don't retry auth failures
  });
}

/**
 * Login mutation
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Set the user in cache after successful login
      queryClient.setQueryData(authKeys.me(), data.user);
    },
  });
}

/**
 * Signup mutation
 */
export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data.user);
    },
  });
}

/**
 * Logout mutation
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });
}
