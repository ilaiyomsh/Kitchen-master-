import type { Order } from '@kitchen/shared';
import { Card } from '../ui/Card';

interface KitchenStatsProps {
  orders: Order[];
}

export function KitchenStats({ orders }: KitchenStatsProps) {
  const pending = orders.filter((o) => o.status === 'pending' || o.status === 'confirmed').length;
  const preparing = orders.filter((o) => o.status === 'preparing').length;
  const ready = orders.filter((o) => o.status === 'ready').length;

  const stats = [
    { label: 'Pending', value: pending, color: 'text-gray-700' },
    { label: 'Preparing', value: preparing, color: 'text-yellow-600' },
    { label: 'Ready', value: ready, color: 'text-green-600' },
    { label: 'Total Active', value: orders.length, color: 'text-primary-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="text-center">
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
}
