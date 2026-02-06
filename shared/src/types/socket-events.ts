import { Order, PlaceOrderPayload } from './order.types';
import { OrderStatus } from '../constants/order-status';

export interface ServerToClientEvents {
  // Guest events
  'order:placed': (data: { order: Order }) => void;
  'order:status-changed': (data: {
    orderId: string;
    status: OrderStatus;
    updatedAt: string;
  }) => void;
  'order:cancelled': (data: { orderId: string }) => void;

  // Kitchen events
  'kitchen:new-order': (data: { order: Order }) => void;
  'kitchen:order-updated': (data: { order: Order }) => void;
  'kitchen:table-call': (data: {
    tableId: string;
    tableNumber: number;
  }) => void;
}

export interface ClientToServerEvents {
  // Guest events
  'guest:join-table': (data: {
    tableId: string;
    guestSessionId: string;
  }) => void;
  'guest:place-order': (
    data: PlaceOrderPayload,
    callback: (res: { success: boolean; order?: Order; error?: string }) => void
  ) => void;
  'guest:call-waiter': (data: { tableId: string }) => void;

  // Kitchen events
  'kitchen:confirm-order': (data: { orderId: string }) => void;
  'kitchen:start-preparing': (data: { orderId: string }) => void;
  'kitchen:mark-ready': (data: { orderId: string }) => void;
  'kitchen:mark-served': (data: { orderId: string }) => void;
  'kitchen:cancel-order': (data: {
    orderId: string;
    reason?: string;
  }) => void;
  'kitchen:batch-orders': (
    data: { orderIds: string[] },
    callback: (res: { success: boolean; batchId?: string }) => void
  ) => void;
}

export interface SocketData {
  guestSessionId?: string;
  tableId?: string;
  isKitchenManager?: boolean;
}
