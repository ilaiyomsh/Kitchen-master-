import { OrderStatus } from '../constants/order-status';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes: string;
}

export interface Order {
  _id: string;
  tableId: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  notes: string;
  batchId: string | null;
  guestSessionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlaceOrderPayload {
  tableId: string;
  items: {
    menuItemId: string;
    quantity: number;
    notes?: string;
  }[];
  guestSessionId: string;
  notes?: string;
}
