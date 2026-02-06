import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTable } from '../hooks/useTable';
import { useGuestOrders } from '../hooks/useOrders';
import { useSocket } from '../hooks/useSocket';
import { useSocketEvent } from '../hooks/useSocketEvent';
import { getGuestSocket } from '../config/socket';
import { getSessionId } from '../utils/format';
import { OrderStatusTracker } from '../components/guest/OrderStatusTracker';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';

export function GuestOrderStatus() {
  const navigate = useNavigate();
  const { tableId } = useTable();
  const sessionId = getSessionId();
  const { data, isLoading, error } = useGuestOrders(tableId, sessionId);
  const queryClient = useQueryClient();

  const socket = getGuestSocket();
  useSocket(socket);

  // Listen for status changes and refresh orders
  const handleStatusChange = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['orders', 'guest'] });
  }, [queryClient]);

  useSocketEvent(socket, 'order:status-changed', handleStatusChange);
  useSocketEvent(socket, 'order:cancelled', handleStatusChange);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-red-500">Failed to load orders</p>
      </div>
    );
  }

  const orders = data?.orders || [];

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">My Orders</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate(`/table/${tableId}`)}>
          Back to Menu
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No orders yet</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate(`/table/${tableId}`)}
          >
            Browse Menu
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderStatusTracker key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
