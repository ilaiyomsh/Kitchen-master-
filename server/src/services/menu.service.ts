import { MenuCategoryModel } from '../models/MenuCategory.model';
import { MenuItemModel } from '../models/MenuItem.model';

export const menuService = {
  async getFullMenu() {
    const categories = await MenuCategoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    const items = await MenuItemModel.find({ isAvailable: true }).sort({ sortOrder: 1 }).lean();

    return categories.map((cat) => ({
      ...cat,
      items: items.filter((item) => item.categoryId.toString() === cat._id.toString()),
    }));
  },

  async getCategories() {
    return MenuCategoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  },

  async getItemsByCategory(categoryId: string) {
    return MenuItemModel.find({ categoryId, isAvailable: true }).sort({ sortOrder: 1 }).lean();
  },

  async getItemById(id: string) {
    return MenuItemModel.findById(id).lean();
  },
};
