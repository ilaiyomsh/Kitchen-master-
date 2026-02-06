import { z } from 'zod';
import { ORDER_STATUS_VALUES } from '../constants/order-status';

export const orderItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.number().int().min(1),
  notes: z.string().optional().default(''),
});

export const placeOrderSchema = z.object({
  tableId: z.string().min(1),
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
  guestSessionId: z.string().min(1),
  notes: z.string().optional().default(''),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUS_VALUES as [string, ...string[]]),
});

export const batchOrdersSchema = z.object({
  orderIds: z.array(z.string().min(1)).min(1, 'Must provide at least one order ID'),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type BatchOrdersInput = z.infer<typeof batchOrdersSchema>;
