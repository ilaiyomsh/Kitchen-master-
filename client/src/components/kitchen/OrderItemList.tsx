import type { OrderItem } from '@kitchen/shared';
import { formatPrice } from '../../utils/format';

interface OrderItemListProps {
  items: OrderItem[];
}

export function OrderItemList({ items }: OrderItemListProps) {
  return (
    <div className="space-y-1">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between text-sm">
          <span>
            <span className="font-medium">{item.quantity}x</span> {item.name}
            {item.notes && (
              <span className="text-gray-400 block text-xs ml-5">- {item.notes}</span>
            )}
          </span>
          <span className="text-gray-500 whitespace-nowrap ml-2">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      ))}
    </div>
  );
}
