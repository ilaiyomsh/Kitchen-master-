import { useCartStore, type CartItem as CartItemType } from '../../stores/cart.store';
import { formatPrice } from '../../utils/format';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const updateNotes = useCartStore((s) => s.updateNotes);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">{item.menuItem.name}</h4>
          <span className="text-sm font-semibold">
            {formatPrice(item.menuItem.price * item.quantity)}
          </span>
        </div>
        <input
          type="text"
          placeholder="Special requests..."
          value={item.notes}
          onChange={(e) => updateNotes(item.menuItem._id, e.target.value)}
          className="mt-1 w-full text-xs text-gray-500 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-primary-400"
        />
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.menuItem._id, item.quantity - 1)}
            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
          >
            -
          </button>
          <span className="text-sm font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.menuItem._id, item.quantity + 1)}
            className="w-6 h-6 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center text-sm"
          >
            +
          </button>
          <button
            onClick={() => removeItem(item.menuItem._id)}
            className="ml-auto text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
