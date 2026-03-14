/**
 * Auth Service
 * Authentication operations
 */

import { API } from '../config/api';
import { apiFetch } from './api.service';
import type { User } from '../types/api.types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export const authService = {
  /**
   * Login with email and password
   */
  login: (credentials: LoginCredentials) =>
    apiFetch<AuthResponse>(API.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  /**
   * Sign up a new user
   */
  signup: (data: SignupData) =>
    apiFetch<AuthResponse>(API.AUTH.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Logout the current user
   */
  logout: () =>
    apiFetch<void>(API.AUTH.LOGOUT, {
      method: 'POST',
    }),

  /**
   * Get the current authenticated user
   */
  me: () =>
    apiFetch<User>(API.AUTH.ME),

  /**
   * Refresh the authentication token
   */
  refresh: () =>
    apiFetch<AuthResponse>(API.AUTH.REFRESH, {
      method: 'POST',
    }),
};
