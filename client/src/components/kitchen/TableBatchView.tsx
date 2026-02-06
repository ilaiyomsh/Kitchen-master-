import type { Order, OrderStatus } from '@kitchen/shared';
import { OrderCard } from './OrderCard';
import { Button } from '../ui/Button';
import { useKitchenStore } from '../../stores/kitchen.store';

interface TableBatchViewProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onCancel: (orderId: string) => void;
  onBatch: (orderIds: string[]) => void;
}

export function TableBatchView({ orders, onStatusChange, onCancel, onBatch }: TableBatchViewProps) {
  const selectedOrderIds = useKitchenStore((s) => s.selectedOrderIds);
  const clearSelection = useKitchenStore((s) => s.clearSelection);
  const toggleOrderSelection = useKitchenStore((s) => s.toggleOrderSelection);

  // Group orders by table
  const tableGroups = orders.reduce<Record<number, Order[]>>((acc, order) => {
    const table = order.tableNumber;
    if (!acc[table]) acc[table] = [];
    acc[table].push(order);
    return acc;
  }, {});

  const sortedTableNumbers = Object.keys(tableGroups)
    .map(Number)
    .sort((a, b) => a - b);

  const handleBatchSelected = () => {
    if (selectedOrderIds.length > 1) {
      onBatch(selectedOrderIds);
      clearSelection();
    }
  };

  return (
    <div>
      {selectedOrderIds.length > 1 && (
        <div className="mb-4 flex items-center gap-3 bg-primary-50 p-3 rounded-lg">
          <span className="text-sm font-medium">
            {selectedOrderIds.length} orders selected
          </span>
          <Button size="sm" onClick={handleBatchSelected}>
            Batch Together
          </Button>
          <Button size="sm" variant="ghost" onClick={clearSelection}>
            Clear
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {sortedTableNumbers.map((tableNum) => (
          <div key={tableNum}>
            <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
              Table {tableNum}
              <span className="text-sm font-normal text-gray-500">
                ({tableGroups[tableNum].length} orders)
              </span>
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {tableGroups[tableNum].map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  isSelected={selectedOrderIds.includes(order._id)}
                  onToggleSelect={() => toggleOrderSelection(order._id)}
                  onStatusChange={onStatusChange}
                  onCancel={onCancel}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
