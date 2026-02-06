import { create } from 'zustand';
import type { MenuItem } from '@kitchen/shared';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes: string;
}

interface CartState {
  items: CartItem[];
  addItem: (menuItem: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateNotes: (menuItemId: string, notes: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (menuItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.menuItem._id === menuItem._id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItem._id === menuItem._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { menuItem, quantity: 1, notes: '' }] };
    }),

  removeItem: (menuItemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.menuItem._id !== menuItemId),
    })),

  updateQuantity: (menuItemId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.menuItem._id !== menuItemId) };
      }
      return {
        items: state.items.map((i) =>
          i.menuItem._id === menuItemId ? { ...i, quantity } : i
        ),
      };
    }),

  updateNotes: (menuItemId, notes) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.menuItem._id === menuItemId ? { ...i, notes } : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
}));
