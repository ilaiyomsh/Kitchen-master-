import { useState } from 'react';
import { useCartStore } from '../../stores/cart.store';
import { formatPrice } from '../../utils/format';
import { CartItem } from './CartItem';
import { OrderConfirmation } from './OrderConfirmation';
import { Button } from '../ui/Button';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  if (items.length === 0) return null;

  return (
    <>
      {/* Floating cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-lg">
        <div className="max-w-lg mx-auto px-4 py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                {totalItems}
              </span>
              <span className="font-medium text-gray-900">Your Cart</span>
            </div>
            <span className="font-bold text-primary-600">{formatPrice(totalPrice)}</span>
          </button>

          {isOpen && (
            <div className="mt-3 max-h-60 overflow-auto border-t pt-3">
              {items.map((item) => (
                <CartItem key={item.menuItem._id} item={item} />
              ))}
              <div className="flex gap-2 mt-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setShowConfirm(true)}
                >
                  Place Order - {formatPrice(totalPrice)}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order confirmation modal */}
      <OrderConfirmation
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
}
