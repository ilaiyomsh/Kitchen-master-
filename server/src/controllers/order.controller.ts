import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/order.service';
import { sendSuccess, sendError } from '../utils/api-response';

export const orderController = {
  async placeOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.createOrder(req.body);
      sendSuccess(res, { order }, 201);
    } catch (error) {
      if (error instanceof Error) {
        return sendError(res, error.message, 400);
      }
      next(error);
    }
  },

  async getGuestOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const tableId = String(req.query.tableId || '');
      const guestSessionId = String(req.query.guestSessionId || '');
      if (!tableId || !guestSessionId) {
        return sendError(res, 'tableId and guestSessionId are required', 400);
      }
      const orders = await orderService.getOrdersForGuest(tableId, guestSessionId);
      sendSuccess(res, { orders });
    } catch (error) {
      next(error);
    }
  },

  async getKitchenOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status ? String(req.query.status) : undefined;
      const statusFilter = status ? status.split(',') : undefined;
      const orders = await orderService.getActiveOrders(statusFilter);
      sendSuccess(res, { orders });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const { status } = req.body;
      const order = await orderService.updateStatus(id, status);
      if (!order) return sendError(res, 'Order not found', 404);
      sendSuccess(res, { order });
    } catch (error) {
      next(error);
    }
  },

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const order = await orderService.cancelOrder(id);
      if (!order) return sendError(res, 'Order not found', 404);
      sendSuccess(res, { order });
    } catch (error) {
      next(error);
    }
  },

  async batchOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.batchOrders(req.body.orderIds);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
