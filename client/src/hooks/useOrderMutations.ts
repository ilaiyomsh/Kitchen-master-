import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../config/api';
import type { Order, PlaceOrderPayload } from '@kitchen/shared';

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlaceOrderPayload) =>
      apiFetch<{ order: Order }>('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      apiFetch<{ order: Order }>(`/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useBatchOrders() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderIds: string[]) =>
      apiFetch<{ batchId: string; orders: Order[] }>('/orders/batch', {
        method: 'POST',
        body: JSON.stringify({ orderIds }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
