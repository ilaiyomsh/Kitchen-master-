import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema(
  {
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    notes: { type: String, default: '' },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    tableId: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
    tableNumber: { type: Number, required: true },
    items: { type: [orderItemSchema], required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'served', 'cancelled'],
      default: 'pending',
    },
    totalPrice: { type: Number, required: true },
    notes: { type: String, default: '' },
    batchId: { type: String, default: null },
    guestSessionId: { type: String, required: true },
  },
  { timestamps: true }
);

orderSchema.index({ tableId: 1, status: 1 });
orderSchema.index({ guestSessionId: 1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ batchId: 1 });

export const OrderModel = model('Order', orderSchema);
