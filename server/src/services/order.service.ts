import { OrderModel } from '../models/Order.model';
import { MenuItemModel } from '../models/MenuItem.model';
import { TableModel } from '../models/Table.model';
import { v4 as uuidv4 } from 'uuid';

interface PlaceOrderInput {
  tableId: string;
  items: { menuItemId: string; quantity: number; notes?: string }[];
  guestSessionId: string;
  notes?: string;
}

export const orderService = {
  async createOrder(input: PlaceOrderInput) {
    const table = await TableModel.findById(input.tableId).lean();
    if (!table) throw new Error('Table not found');

    // Look up menu items to denormalize names/prices
    const menuItemIds = input.items.map((i: { menuItemId: string }) => i.menuItemId);
    const menuItems = await MenuItemModel.find({ _id: { $in: menuItemIds } }).lean();

    const menuItemMap = new Map(menuItems.map((mi) => [mi._id.toString(), mi]));

    const orderItems = input.items.map((item: { menuItemId: string; quantity: number; notes?: string }) => {
      const menuItem = menuItemMap.get(item.menuItemId);
      if (!menuItem) throw new Error(`Menu item not found: ${item.menuItemId}`);
      if (!menuItem.isAvailable) throw new Error(`Menu item unavailable: ${menuItem.name}`);
      return {
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        notes: item.notes || '',
      };
    });

    const totalPrice = orderItems.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    const order = new OrderModel({
      tableId: table._id,
      tableNumber: table.number,
      items: orderItems,
      totalPrice,
      notes: input.notes || '',
      guestSessionId: input.guestSessionId,
    });

    return order.save();
  },

  async getOrdersForGuest(tableId: string, guestSessionId: string) {
    return OrderModel.find({ tableId, guestSessionId })
      .sort({ createdAt: -1 })
      .lean();
  },

  async getActiveOrders(statusFilter?: string[]) {
    const filter: Record<string, unknown> = {};
    if (statusFilter && statusFilter.length > 0) {
      filter.status = { $in: statusFilter };
    } else {
      filter.status = { $nin: ['served', 'cancelled'] };
    }
    return OrderModel.find(filter).sort({ createdAt: -1 }).lean();
  },

  async updateStatus(orderId: string, status: string) {
    return OrderModel.findByIdAndUpdate(orderId, { status }, { new: true }).lean();
  },

  async cancelOrder(orderId: string) {
    return OrderModel.findByIdAndUpdate(orderId, { status: 'cancelled' }, { new: true }).lean();
  },

  async batchOrders(orderIds: string[]) {
    const batchId = uuidv4();
    await OrderModel.updateMany(
      { _id: { $in: orderIds } },
      { batchId }
    );
    const orders = await OrderModel.find({ _id: { $in: orderIds } }).lean();
    return { batchId, orders };
  },

  async getOrderById(orderId: string) {
    return OrderModel.findById(orderId).lean();
  },
};
