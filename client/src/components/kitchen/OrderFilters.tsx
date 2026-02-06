import { useKitchenStore } from '../../stores/kitchen.store';
import { Button } from '../ui/Button';

const statusOptions = [
  { label: 'All Active', value: null },
  { label: 'Pending', value: 'pending,confirmed' },
  { label: 'Preparing', value: 'preparing' },
  { label: 'Ready', value: 'ready' },
];

export function OrderFilters() {
  const filterStatus = useKitchenStore((s) => s.filterStatus);
  const setFilterStatus = useKitchenStore((s) => s.setFilterStatus);

  return (
    <div className="flex gap-2 flex-wrap">
      {statusOptions.map((opt) => (
        <Button
          key={opt.label}
          variant={filterStatus === opt.value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilterStatus(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
