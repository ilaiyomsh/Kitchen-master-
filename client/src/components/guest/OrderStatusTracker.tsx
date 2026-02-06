import type { Order, OrderStatus } from '@kitchen/shared';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { formatPrice, timeAgo } from '../../utils/format';

interface OrderStatusTrackerProps {
  order: Order;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' }
> = {
  pending: { label: 'Pending', variant: 'default' },
  confirmed: { label: 'Confirmed', variant: 'info' },
  preparing: { label: 'Preparing', variant: 'warning' },
  ready: { label: 'Ready', variant: 'success' },
  served: { label: 'Served', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
};

export function OrderStatusTracker({ order }: OrderStatusTrackerProps) {
  const config = statusConfig[order.status];

  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">{timeAgo(order.createdAt)}</span>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>
      <div className="space-y-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span className="text-gray-500">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-medium mt-2 pt-2 border-t text-sm">
        <span>Total</span>
        <span>{formatPrice(order.totalPrice)}</span>
      </div>
    </Card>
  );
}
