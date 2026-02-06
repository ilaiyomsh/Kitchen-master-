import { Router } from 'express';
import { qrController } from '../controllers/qr.controller';

const router = Router();

router.get('/:tableId', qrController.generateQR);

export default router;
