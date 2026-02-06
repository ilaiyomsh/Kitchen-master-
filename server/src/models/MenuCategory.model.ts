import { Schema, model } from 'mongoose';

const menuCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

menuCategorySchema.index({ sortOrder: 1 });

export const MenuCategoryModel = model('MenuCategory', menuCategorySchema);
