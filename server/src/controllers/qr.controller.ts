import { Request, Response, NextFunction } from 'express';
import { qrService } from '../services/qr.service';
import { sendSuccess } from '../utils/api-response';

export const qrController = {
  async generateQR(req: Request, res: Response, next: NextFunction) {
    try {
      const tableId = String(req.params.tableId);
      const format = req.query.format ? String(req.query.format) : undefined;

      if (format === 'svg') {
        const svg = await qrService.generateSVG(tableId);
        res.type('image/svg+xml').send(svg);
      } else if (format === 'dataurl') {
        const dataUrl = await qrService.generateDataURL(tableId);
        sendSuccess(res, { dataUrl });
      } else {
        const buffer = await qrService.generatePNG(tableId);
        res.type('image/png').send(buffer);
      }
    } catch (error) {
      next(error);
    }
  },
};
