/**
 * Labels Service
 * CRUD operations for labels
 */

import { API } from '../config/api';
import { apiFetch } from './api.service';
import type { Label, LabelCreate } from '../types/api.types';

export const labelsService = {
  /**
   * Get all labels
   */
  list: () =>
    apiFetch<Label[]>(API.LABELS.LIST),

  /**
   * Create a new label
   */
  create: (data: LabelCreate) =>
    apiFetch<Label>(API.LABELS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Delete a label
   */
  delete: (id: string) =>
    apiFetch<void>(API.LABELS.DELETE(id), {
      method: 'DELETE',
    }),
};
