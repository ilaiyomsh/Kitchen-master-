import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useKitchenOrders } from '../hooks/useOrders';
import { useUpdateOrderStatus, useBatchOrders } from '../hooks/useOrderMutations';
import { useSocket } from '../hooks/useSocket';
import { useSocketEvent } from '../hooks/useSocketEvent';
import { getKitchenSocket } from '../config/socket';
import { useKitchenStore } from '../stores/kitchen.store';
import { playNotificationSound } from '../utils/sound';
import { showToast } from '../components/ui/Toast';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { KitchenStats } from '../components/kitchen/KitchenStats';
import { OrderFilters } from '../components/kitchen/OrderFilters';
import { OrderBoard } from '../components/kitchen/OrderBoard';
import { TableBatchView } from '../components/kitchen/TableBatchView';
import type { Order, OrderStatus } from '@kitchen/shared';

type ViewMode = 'board' | 'table';

export function KitchenDashboard() {
  const navigate = useNavigate();
  const pin = useKitchenStore((s) => s.pin);
  const isAuthenticated = useKitchenStore((s) => s.isAuthenticated);
  const filterStatus = useKitchenStore((s) => s.filterStatus);
  const [viewMode, setViewMode] = useState<ViewMode>('board');

  const queryClient = useQueryClient();
  const { data, isLoading } = useKitchenOrders(filterStatus || undefined);
  const updateStatus = useUpdateOrderStatus();
  const batchOrders = useBatchOrders();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/kitchen/login');
    }
  }, [isAuthenticated, navigate]);

  // Connect to kitchen socket
  const socket = getKitchenSocket(pin);
  useSocket(socket, isAuthenticated);

  // Listen for new orders
  const handleNewOrder = useCallback(
    (_data: { order: Order }) => {
      playNotificationSound();
      queryClient.invalidateQueries({ queryKey: ['orders', 'kitchen'] });
      showToast(`New order from Table ${_data.order.tableNumber}`, 'info');
    },
    [queryClient]
  );

  const handleOrderUpdated = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['orders', 'kitchen'] });
  }, [queryClient]);

  const handleTableCall = useCallback(
    (data: { tableId: string; tableNumber: number }) => {
      playNotificationSound();
      showToast(`Table ${data.tableNumber} is calling!`, 'info');
    },
    []
  );

  useSocketEvent(socket, 'kitchen:new-order', handleNewOrder);
  useSocketEvent(socket, 'kitchen:order-updated', handleOrderUpdated);
  useSocketEvent(socket, 'kitchen:table-call', handleTableCall);

  const handleStatusChange = useCallback(
    (orderId: string, status: OrderStatus) => {
      updateStatus.mutate(
        { orderId, status },
        {
          onError: (err) => {
            showToast(err instanceof Error ? err.message : 'Failed to update', 'error');
          },
        }
      );
    },
    [updateStatus]
  );

  const handleCancel = useCallback(
    (orderId: string) => {
      updateStatus.mutate(
        { orderId, status: 'cancelled' },
        {
          onError: (err) => {
            showToast(err instanceof Error ? err.message : 'Failed to cancel', 'error');
          },
        }
      );
    },
    [updateStatus]
  );

  const handleBatch = useCallback(
    (orderIds: string[]) => {
      batchOrders.mutate(orderIds, {
        onSuccess: () => {
          showToast('Orders batched successfully', 'success');
        },
        onError: (err) => {
          showToast(err instanceof Error ? err.message : 'Failed to batch', 'error');
        },
      });
    },
    [batchOrders]
  );

  if (!isAuthenticated) return null;

  const orders = data?.orders || [];

  return (
    <div className="space-y-4">
      <KitchenStats orders={orders} />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <OrderFilters />
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'board' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('board')}
          >
            Board View
          </Button>
          <Button
            variant={viewMode === 'table' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No active orders</p>
          <p className="text-sm mt-1">New orders will appear here in real-time</p>
        </div>
      ) : viewMode === 'board' ? (
        <OrderBoard
          orders={orders}
          onStatusChange={handleStatusChange}
          onCancel={handleCancel}
        />
      ) : (
        <TableBatchView
          orders={orders}
          onStatusChange={handleStatusChange}
          onCancel={handleCancel}
          onBatch={handleBatch}
        />
      )}
    </div>
  );
}
