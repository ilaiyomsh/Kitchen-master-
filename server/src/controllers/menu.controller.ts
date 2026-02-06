import { Request, Response, NextFunction } from 'express';
import { menuService } from '../services/menu.service';
import { sendSuccess, sendError } from '../utils/api-response';

export const menuController = {
  async getFullMenu(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await menuService.getFullMenu();
      sendSuccess(res, { categories });
    } catch (error) {
      next(error);
    }
  },

  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await menuService.getCategories();
      sendSuccess(res, { categories });
    } catch (error) {
      next(error);
    }
  },

  async getItemsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.query;
      if (!categoryId || typeof categoryId !== 'string') {
        return sendError(res, 'categoryId query parameter is required', 400);
      }
      const items = await menuService.getItemsByCategory(categoryId);
      sendSuccess(res, { items });
    } catch (error) {
      next(error);
    }
  },
};
