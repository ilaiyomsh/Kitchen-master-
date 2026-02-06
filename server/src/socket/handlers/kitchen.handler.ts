import { Namespace, Socket } from 'socket.io';
import { orderService } from '../../services/order.service';
import { ROOMS } from '../namespaces';
import { logger } from '../../utils/logger';

export function registerKitchenHandlers(
  kitchenNsp: Namespace,
  socket: Socket,
  guestNsp: Namespace
) {
  async function updateOrderStatus(orderId: string, status: string) {
    const order = await orderService.updateStatus(orderId, status);
    if (!order) throw new Error('Order not found');

    // Notify kitchen clients
    kitchenNsp.to(ROOMS.kitchen).emit('kitchen:order-updated', { order });

    // Notify the guest's table room
    guestNsp.to(ROOMS.table(order.tableId.toString())).emit('order:status-changed', {
      orderId: order._id.toString(),
      status: order.status,
      updatedAt: order.updatedAt as unknown as string,
    });

    return order;
  }

  socket.on('kitchen:confirm-order', async ({ orderId }) => {
    try {
      await updateOrderStatus(orderId, 'confirmed');
    } catch (error) {
      logger.error('Error confirming order:', error);
    }
  });

  socket.on('kitchen:start-preparing', async ({ orderId }) => {
    try {
      await updateOrderStatus(orderId, 'preparing');
    } catch (error) {
      logger.error('Error starting preparation:', error);
    }
  });

  socket.on('kitchen:mark-ready', async ({ orderId }) => {
    try {
      await updateOrderStatus(orderId, 'ready');
    } catch (error) {
      logger.error('Error marking ready:', error);
    }
  });

  socket.on('kitchen:mark-served', async ({ orderId }) => {
    try {
      await updateOrderStatus(orderId, 'served');
    } catch (error) {
      logger.error('Error marking served:', error);
    }
  });

  socket.on('kitchen:cancel-order', async ({ orderId }) => {
    try {
      const order = await orderService.cancelOrder(orderId);
      if (!order) return;

      kitchenNsp.to(ROOMS.kitchen).emit('kitchen:order-updated', { order });
      guestNsp.to(ROOMS.table(order.tableId.toString())).emit('order:cancelled', {
        orderId: order._id.toString(),
      });
    } catch (error) {
      logger.error('Error cancelling order:', error);
    }
  });

  socket.on('kitchen:batch-orders', async ({ orderIds }, callback) => {
    try {
      const result = await orderService.batchOrders(orderIds);
      // Notify kitchen clients about the batch
      for (const order of result.orders) {
        kitchenNsp.to(ROOMS.kitchen).emit('kitchen:order-updated', { order });
      }
      callback({ success: true, batchId: result.batchId });
    } catch (error) {
      logger.error('Error batching orders:', error);
      callback({ success: false });
    }
  });
}
