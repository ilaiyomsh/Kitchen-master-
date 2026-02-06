import { Schema, model } from 'mongoose';

const tableSchema = new Schema(
  {
    number: { type: Number, required: true, unique: true },
    label: { type: String, required: true },
    seats: { type: Number, default: 4 },
    status: { type: String, enum: ['available', 'occupied', 'needs_service'], default: 'available' },
    qrCodeUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TableModel = model('Table', tableSchema);
