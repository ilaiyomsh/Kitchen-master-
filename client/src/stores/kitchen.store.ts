import { create } from 'zustand';

interface KitchenState {
  pin: string;
  isAuthenticated: boolean;
  filterStatus: string | null;
  filterTable: number | null;
  selectedOrderIds: string[];
  setPin: (pin: string) => void;
  setAuthenticated: (auth: boolean) => void;
  setFilterStatus: (status: string | null) => void;
  setFilterTable: (table: number | null) => void;
  toggleOrderSelection: (orderId: string) => void;
  clearSelection: () => void;
}

export const useKitchenStore = create<KitchenState>((set) => ({
  pin: '',
  isAuthenticated: false,
  filterStatus: null,
  filterTable: null,
  selectedOrderIds: [],

  setPin: (pin) => set({ pin }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setFilterStatus: (filterStatus) => set({ filterStatus }),
  setFilterTable: (filterTable) => set({ filterTable }),
  toggleOrderSelection: (orderId) =>
    set((state) => ({
      selectedOrderIds: state.selectedOrderIds.includes(orderId)
        ? state.selectedOrderIds.filter((id) => id !== orderId)
        : [...state.selectedOrderIds, orderId],
    })),
  clearSelection: () => set({ selectedOrderIds: [] }),
}));
