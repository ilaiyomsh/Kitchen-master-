import { Namespace, Socket } from 'socket.io';
import { orderService } from '../../services/order.service';
import { placeOrderSchema } from '@kitchen/shared';
import { ROOMS } from '../namespaces';
import { logger } from '../../utils/logger';

export function registerOrderHandlers(
  guestNsp: Namespace,
  socket: Socket,
  kitchenNsp: Namespace
) {
  socket.on('guest:place-order', async (data, callback) => {
    try {
      const parsed = placeOrderSchema.parse(data);
      const order = await orderService.createOrder(parsed);
      const orderObj = order.toJSON();

      // Notify the guest's table room
      guestNsp.to(ROOMS.table(parsed.tableId)).emit('order:placed', { order: orderObj });

      // Notify kitchen
      kitchenNsp.to(ROOMS.kitchen).emit('kitchen:new-order', { order: orderObj });

      callback({ success: true, order: orderObj });
    } catch (error) {
      logger.error('Error placing order via socket:', error);
      callback({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to place order',
      });
    }
  });

  socket.on('guest:call-waiter', async (data) => {
    try {
      const { tableId } = data;
      // Look up table number for display
      const { tableService } = await import('../../services/table.service');
      const table = await tableService.getById(tableId);
      if (table) {
        kitchenNsp.to(ROOMS.kitchen).emit('kitchen:table-call', {
          tableId,
          tableNumber: table.number,
        });
      }
    } catch (error) {
      logger.error('Error handling call waiter:', error);
    }
  });
}
