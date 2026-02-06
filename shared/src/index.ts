// Types
export type { MenuCategory, MenuItem, MenuCategoryWithItems } from './types/menu.types';
export type { Table } from './types/table.types';
export type { Order, OrderItem, PlaceOrderPayload } from './types/order.types';
export type {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
} from './types/socket-events';

// Constants
export { ORDER_STATUS, ORDER_STATUS_VALUES } from './constants/order-status';
export type { OrderStatus } from './constants/order-status';
export { TABLE_STATUS, TABLE_STATUS_VALUES } from './constants/table-status';
export type { TableStatus } from './constants/table-status';

// Validation schemas
export {
  placeOrderSchema,
  orderItemSchema,
  updateOrderStatusSchema,
  batchOrdersSchema,
} from './validation/order.schema';
export type {
  PlaceOrderInput,
  UpdateOrderStatusInput,
  BatchOrdersInput,
} from './validation/order.schema';
export {
  createMenuCategorySchema,
  createMenuItemSchema,
} from './validation/menu.schema';
export type {
  CreateMenuCategoryInput,
  CreateMenuItemInput,
} from './validation/menu.schema';
