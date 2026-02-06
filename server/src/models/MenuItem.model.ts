import { Schema, model } from 'mongoose';

const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'MenuCategory', required: true },
    imageUrl: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

menuItemSchema.index({ categoryId: 1, sortOrder: 1 });

export const MenuItemModel = model('MenuItem', menuItemSchema);
