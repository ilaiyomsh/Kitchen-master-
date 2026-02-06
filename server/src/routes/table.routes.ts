import { Router } from 'express';
import { tableController } from '../controllers/table.controller';

const router = Router();

router.get('/', tableController.getAll);
router.get('/:id', tableController.getById);
router.post('/', tableController.create);
router.patch('/:id', tableController.update);

export default router;
