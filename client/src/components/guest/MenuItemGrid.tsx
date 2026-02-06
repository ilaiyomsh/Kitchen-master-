import type { MenuItem } from '@kitchen/shared';
import { MenuItemCard } from './MenuItemCard';

interface MenuItemGridProps {
  items: MenuItem[];
}

export function MenuItemGrid({ items }: MenuItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No items available in this category.
      </div>
    );
  }

  return (
    <div className="grid gap-3 px-4">
      {items.map((item) => (
        <MenuItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
