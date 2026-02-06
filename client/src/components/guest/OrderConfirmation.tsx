import { useState } from 'react';
import { useCartStore } from '../../stores/cart.store';
import { useTable } from '../../hooks/useTable';
import { usePlaceOrder } from '../../hooks/useOrderMutations';
import { formatPrice, getSessionId } from '../../utils/format';
import { showToast } from '../ui/Toast';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderConfirmation({ isOpen, onClose }: OrderConfirmationProps) {
  const { tableId } = useTable();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = usePlaceOrder();
  const [notes, setNotes] = useState('');

  const handlePlaceOrder = async () => {
    if (!tableId || items.length === 0) return;

    try {
      await placeOrder.mutateAsync({
        tableId,
        guestSessionId: getSessionId(),
        notes,
        items: items.map((i) => ({
          menuItemId: i.menuItem._id,
          quantity: i.quantity,
          notes: i.notes,
        })),
      });
      clearCart();
      setNotes('');
      onClose();
      showToast('Order placed successfully!', 'success');
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : 'Failed to place order',
        'error'
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Order">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.menuItem._id} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.menuItem.name}
              {item.notes && (
                <span className="text-gray-400 block text-xs">({item.notes})</span>
              )}
            </span>
            <span className="font-medium">
              {formatPrice(item.menuItem.price * item.quantity)}
            </span>
          </div>
        ))}

        <div className="border-t pt-3">
          <textarea
            placeholder="Any general notes for your order..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:border-primary-400"
            rows={2}
          />
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-3">
          <span>Total</span>
          <span className="text-primary-600">{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Back
          </Button>
          <Button
            className="flex-1"
            onClick={handlePlaceOrder}
            disabled={placeOrder.isPending}
          >
            {placeOrder.isPending ? 'Placing...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
