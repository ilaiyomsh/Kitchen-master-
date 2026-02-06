import { Router } from 'express';
import { menuController } from '../controllers/menu.controller';

const router = Router();

router.get('/', menuController.getFullMenu);
router.get('/categories', menuController.getCategories);
router.get('/items', menuController.getItemsByCategory);

export default router;
