import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { validate } from '../middleware/validate';
import { placeOrderSchema, updateOrderStatusSchema, batchOrdersSchema } from '@kitchen/shared';

const router = Router();

router.post('/', validate(placeOrderSchema), orderController.placeOrder);
router.get('/', orderController.getGuestOrders);
router.get('/kitchen', orderController.getKitchenOrders);
router.patch('/:id/status', validate(updateOrderStatusSchema), orderController.updateStatus);
router.patch('/:id/cancel', orderController.cancelOrder);
router.post('/batch', validate(batchOrdersSchema), orderController.batchOrders);

export default router;
