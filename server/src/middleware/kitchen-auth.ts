import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { sendError } from '../utils/api-response';

export function kitchenAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-kitchen-pin'] as string;
  if (token === env.KITCHEN_PIN) {
    next();
  } else {
    sendError(res, 'Unauthorized', 401);
  }
}
