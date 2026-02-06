import { Router } from 'express';
import menuRoutes from './menu.routes';
import orderRoutes from './order.routes';
import tableRoutes from './table.routes';
import qrRoutes from './qr.routes';

const router = Router();

router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/tables', tableRoutes);
router.use('/qr', qrRoutes);

export default router;
