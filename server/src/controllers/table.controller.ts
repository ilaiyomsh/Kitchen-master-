import { Request, Response, NextFunction } from 'express';
import { tableService } from '../services/table.service';
import { sendSuccess, sendError } from '../utils/api-response';

export const tableController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await tableService.getAll();
      sendSuccess(res, { tables });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const table = await tableService.getById(String(req.params.id));
      if (!table) return sendError(res, 'Table not found', 404);
      sendSuccess(res, { table });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const table = await tableService.create(req.body);
      sendSuccess(res, { table }, 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const table = await tableService.update(String(req.params.id), req.body);
      if (!table) return sendError(res, 'Table not found', 404);
      sendSuccess(res, { table });
    } catch (error) {
      next(error);
    }
  },
};
