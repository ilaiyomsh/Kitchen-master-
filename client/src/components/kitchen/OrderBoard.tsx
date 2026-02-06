import type { Order, OrderStatus } from '@kitchen/shared';
import { OrderCard } from './OrderCard';
import { useKitchenStore } from '../../stores/kitchen.store';

interface OrderBoardProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onCancel: (orderId: string) => void;
}

const columns: { title: string; statuses: OrderStatus[]; color: string }[] = [
  { title: 'Pending', statuses: ['pending', 'confirmed'], color: 'border-gray-400' },
  { title: 'Preparing', statuses: ['preparing'], color: 'border-yellow-400' },
  { title: 'Ready', statuses: ['ready'], color: 'border-green-400' },
];

export function OrderBoard({ orders, onStatusChange, onCancel }: OrderBoardProps) {
  const selectedOrderIds = useKitchenStore((s) => s.selectedOrderIds);
  const toggleOrderSelection = useKitchenStore((s) => s.toggleOrderSelection);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((col) => {
        const columnOrders = orders.filter((o) =>
          col.statuses.includes(o.status)
        );
        return (
          <div key={col.title} className={`border-t-4 ${col.color} bg-gray-50 rounded-lg p-3`}>
            <h3 className="font-bold text-gray-700 mb-3 flex items-center justify-between">
              {col.title}
              <span className="text-sm font-normal bg-white px-2 py-0.5 rounded-full">
                {columnOrders.length}
              </span>
            </h3>
            <div className="space-y-3">
              {columnOrders.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No orders</p>
              ) : (
                columnOrders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    isSelected={selectedOrderIds.includes(order._id)}
                    onToggleSelect={() => toggleOrderSelection(order._id)}
                    onStatusChange={onStatusChange}
                    onCancel={onCancel}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
