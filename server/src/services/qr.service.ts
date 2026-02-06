import QRCode from 'qrcode';
import { env } from '../config/env';

export const qrService = {
  getTableUrl(tableId: string): string {
    return `${env.APP_BASE_URL}/table/${tableId}`;
  },

  async generatePNG(tableId: string): Promise<Buffer> {
    const url = this.getTableUrl(tableId);
    return QRCode.toBuffer(url, { type: 'png', width: 400, margin: 2 });
  },

  async generateSVG(tableId: string): Promise<string> {
    const url = this.getTableUrl(tableId);
    return QRCode.toString(url, { type: 'svg' });
  },

  async generateDataURL(tableId: string): Promise<string> {
    const url = this.getTableUrl(tableId);
    return QRCode.toDataURL(url, { width: 400, margin: 2 });
  },
};
