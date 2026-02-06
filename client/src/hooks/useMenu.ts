import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../config/api';
import type { MenuCategoryWithItems } from '@kitchen/shared';

export function useMenu() {
  return useQuery({
    queryKey: ['menu'],
    queryFn: () => apiFetch<{ categories: MenuCategoryWithItems[] }>('/menu'),
  });
}
