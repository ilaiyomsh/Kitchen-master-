import { TableStatus } from '../constants/table-status';

export interface Table {
  _id: string;
  number: number;
  label: string;
  seats: number;
  status: TableStatus;
  qrCodeUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
