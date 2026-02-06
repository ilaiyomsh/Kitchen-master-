import type { MenuItem } from '@kitchen/shared';
import { useCartStore } from '../../stores/cart.store';
import { formatPrice } from '../../utils/format';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const cartItem = cartItems.find((ci) => ci.menuItem._id === item._id);
  const quantity = cartItem?.quantity || 0;

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <span className="text-primary-600 font-bold ml-2 whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
        {item.tags.length > 0 && (
          <div className="flex gap-1 mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-2 mt-2">
        {quantity > 0 ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item._id, quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="font-semibold min-w-[20px] text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, quantity + 1)}
              className="w-8 h-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        ) : (
          <Button size="sm" onClick={() => addItem(item)}>
            Add
          </Button>
        )}
      </div>
    </Card>
  );
}
