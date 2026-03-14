/**
 * Notifications Service
 * Operations for user notifications
 */

import { API } from '../config/api';
import { apiFetch } from './api.service';
import type { Notification } from '../types/api.types';

// Add notifications endpoint to API config if not present
const NOTIFICATIONS_URL = `${API.BASE_URL}/notifications`;

export const notificationsService = {
  /**
   * Get all notifications for current user
   */
  list: () =>
    apiFetch<Notification[]>(NOTIFICATIONS_URL),

  /**
   * Mark a notification as read
   */
  markAsRead: (id: string) =>
    apiFetch<Notification>(`${NOTIFICATIONS_URL}/${id}/read`, {
      method: 'POST',
    }),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: () =>
    apiFetch<void>(`${NOTIFICATIONS_URL}/read-all`, {
      method: 'POST',
    }),

  /**
   * Delete a notification
   */
  delete: (id: string) =>
    apiFetch<void>(`${NOTIFICATIONS_URL}/${id}`, {
      method: 'DELETE',
    }),
};
