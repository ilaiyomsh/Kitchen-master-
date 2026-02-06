import type { Order, OrderStatus } from '@kitchen/shared';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { OrderItemList } from './OrderItemList';
import { formatPrice, timeAgo } from '../../utils/format';

interface OrderCardProps {
  order: Order;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onCancel: (orderId: string) => void;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' }
> = {
  pending: { label: 'Pending', variant: 'default' },
  confirmed: { label: 'Confirmed', variant: 'info' },
  preparing: { label: 'Preparing', variant: 'warning' },
  ready: { label: 'Ready!', variant: 'success' },
  served: { label: 'Served', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
};

function getNextAction(status: OrderStatus): { label: string; nextStatus: OrderStatus } | null {
  switch (status) {
    case 'pending':
      return { label: 'Confirm', nextStatus: 'confirmed' };
    case 'confirmed':
      return { label: 'Start Preparing', nextStatus: 'preparing' };
    case 'preparing':
      return { label: 'Mark Ready', nextStatus: 'ready' };
    case 'ready':
      return { label: 'Mark Served', nextStatus: 'served' };
    default:
      return null;
  }
}

export function OrderCard({ order, isSelected, onToggleSelect, onStatusChange, onCancel }: OrderCardProps) {
  const config = statusConfig[order.status];
  const nextAction = getNextAction(order.status);

  return (
    <Card
      className={`transition-all ${
        isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {onToggleSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="w-4 h-4 rounded border-gray-300"
            />
          )}
          <span className="font-bold text-gray-900">Table {order.tableNumber}</span>
          {order.batchId && (
            <Badge variant="info">Batched</Badge>
          )}
        </div>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>

      <div className="text-xs text-gray-500 mb-2">{timeAgo(order.createdAt)}</div>

      <OrderItemList items={order.items} />

      {order.notes && (
        <div className="mt-2 text-xs text-gray-500 bg-yellow-50 p-2 rounded">
          Note: {order.notes}
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-2 border-t">
        <span className="font-semibold">{formatPrice(order.totalPrice)}</span>
        <div className="flex gap-2">
          {order.status !== 'served' && order.status !== 'cancelled' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancel(order._id)}
            >
              Cancel
            </Button>
          )}
          {nextAction && (
            <Button
              size="sm"
              onClick={() => onStatusChange(order._id, nextAction.nextStatus)}
            >
              {nextAction.label}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
