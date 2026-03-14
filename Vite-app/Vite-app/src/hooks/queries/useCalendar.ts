/**
 * Calendar Query Hooks
 * TanStack Query hooks for calendar event operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarService } from '../../services/calendar.service';
import type { CalendarEventCreate, CalendarEventUpdate } from '../../types/api.types';

// Query key factory for calendar events
export const calendarKeys = {
  all: ['calendar'] as const,
  lists: () => [...calendarKeys.all, 'list'] as const,
  list: () => [...calendarKeys.lists()] as const,
  details: () => [...calendarKeys.all, 'detail'] as const,
  detail: (id: string) => [...calendarKeys.details(), id] as const,
};

/**
 * Fetch all calendar events
 */
export function useCalendarEvents() {
  return useQuery({
    queryKey: calendarKeys.list(),
    queryFn: () => calendarService.list(),
  });
}

/**
 * Fetch a single calendar event by ID
 */
export function useCalendarEvent(id: string) {
  return useQuery({
    queryKey: calendarKeys.detail(id),
    queryFn: () => calendarService.getById(id),
    enabled: !!id,
  });
}

/**
 * Create a new calendar event
 */
export function useCreateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CalendarEventCreate) => calendarService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: calendarKeys.lists() });
    },
  });
}

/**
 * Update a calendar event
 */
export function useUpdateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CalendarEventUpdate }) =>
      calendarService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: calendarKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: calendarKeys.lists() });
    },
  });
}

/**
 * Delete a calendar event
 */
export function useDeleteCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => calendarService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: calendarKeys.lists() });
    },
  });
}
