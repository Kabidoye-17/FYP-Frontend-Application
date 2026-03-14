/**
 * Authentication Context
 * Manages user authentication state throughout the application
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { authService, type LoginCredentials, type SignupData } from '../services/auth.service';
import type { User } from '../types/api.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // First check localStorage for cached user
      const cachedUser = localStorage.getItem(AUTH_USER_KEY);
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (cachedUser && token) {
        // Verify token is still valid by calling /auth/me
        try {
          const user = await authService.me();
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          // Update cached user with fresh data
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } catch {
          // Token is invalid, clear storage
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authService.login(credentials);

      // Store token and user
      if (response.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      }
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));

      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authService.signup(data);

      // Store token and user
      if (response.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      }
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));

      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore logout errors - we'll clear local state anyway
    } finally {
      // Clear storage and state
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
