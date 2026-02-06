import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../config/api';
import type { Order } from '@kitchen/shared';

export function useGuestOrders(tableId: string, guestSessionId: string) {
  return useQuery({
    queryKey: ['orders', 'guest', tableId, guestSessionId],
    queryFn: () =>
      apiFetch<{ orders: Order[] }>(
        `/orders?tableId=${tableId}&guestSessionId=${guestSessionId}`
      ),
    enabled: !!tableId && !!guestSessionId,
    refetchInterval: 30_000,
  });
}

export function useKitchenOrders(statusFilter?: string) {
  return useQuery({
    queryKey: ['orders', 'kitchen', statusFilter],
    queryFn: () => {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      return apiFetch<{ orders: Order[] }>(`/orders/kitchen${params}`);
    },
    refetchInterval: 10_000,
  });
}
