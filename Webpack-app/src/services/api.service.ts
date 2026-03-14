/**
 * Base API Service
 * Provides fetch wrapper with error handling and snake_case to camelCase transformation
 */

import { API_TIMEOUT } from '../config/api';

/**
 * Custom API error class with status code and response data
 */
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Transform snake_case keys to camelCase recursively
 * Handles arrays, nested objects, and primitive values
 */
function transformResponse<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(transformResponse) as T;
  }
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[camelKey] = transformResponse((obj as Record<string, unknown>)[key]);
      return acc;
    }, {} as Record<string, unknown>) as T;
  }
  return obj;
}

/**
 * Transform camelCase keys to snake_case for request bodies
 */
function transformRequest<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(transformRequest) as T;
  }
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      acc[snakeKey] = transformRequest((obj as Record<string, unknown>)[key]);
      return acc;
    }, {} as Record<string, unknown>) as T;
  }
  return obj;
}

/**
 * Main fetch wrapper with error handling and automatic transformation
 */
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    // Transform request body if present
    let body = options.body;
    if (body && typeof body === 'string') {
      try {
        const parsed = JSON.parse(body);
        body = JSON.stringify(transformRequest(parsed));
      } catch {
        // Body is not JSON, leave as-is
      }
    }

    const response = await fetch(url, {
      ...options,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.detail || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    // Handle empty responses (e.g., 204 No Content)
    const text = await response.text();
    if (!text) {
      return undefined as T;
    }

    const data = JSON.parse(text);
    return transformResponse(data);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408);
      }
      throw new ApiError(error.message, 0);
    }

    throw new ApiError('Unknown error', 0);
  }
}

/**
 * Build query string from filter object
 * Converts camelCase keys to snake_case and handles undefined values
 */
export function buildQuery(filters?: object): string {
  if (!filters) return '';

  const params = new URLSearchParams();

  Object.entries(filters as Record<string, unknown>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Convert camelCase to snake_case for query params
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      params.append(snakeKey, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}
