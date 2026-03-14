/**
 * Calendar Service
 * Calendar event CRUD operations
 */

import { API } from '../config/api';
import { apiFetch } from './api.service';
import type { CalendarEvent, CalendarEventCreate, CalendarEventUpdate } from '../types/api.types';

export const calendarService = {
  /**
   * List all calendar events
   */
  list: () =>
    apiFetch<CalendarEvent[]>(API.CALENDAR.LIST),

  /**
   * Get a calendar event by ID
   */
  getById: (id: string) =>
    apiFetch<CalendarEvent>(API.CALENDAR.DETAIL(id)),

  /**
   * Create a new calendar event
   */
  create: (data: CalendarEventCreate) =>
    apiFetch<CalendarEvent>(API.CALENDAR.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Update a calendar event
   */
  update: (id: string, data: CalendarEventUpdate) =>
    apiFetch<CalendarEvent>(API.CALENDAR.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Delete a calendar event
   */
  delete: (id: string) =>
    apiFetch<void>(API.CALENDAR.DELETE(id), {
      method: 'DELETE',
    }),
};
