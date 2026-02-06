import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { MenuCategoryModel } from '../models/MenuCategory.model';
import { MenuItemModel } from '../models/MenuItem.model';
import { TableModel } from '../models/Table.model';
import { OrderModel } from '../models/Order.model';
import { sampleCategories, sampleItemsByCategory, sampleTables } from './sample-data';

async function seed() {
  await connectDatabase();

  console.log('Clearing existing data...');
  await Promise.all([
    MenuCategoryModel.deleteMany({}),
    MenuItemModel.deleteMany({}),
    TableModel.deleteMany({}),
    OrderModel.deleteMany({}),
  ]);

  console.log('Seeding categories...');
  const categories = await MenuCategoryModel.insertMany(sampleCategories);

  console.log('Seeding menu items...');
  const menuItems = [];
  for (const category of categories) {
    const items = sampleItemsByCategory[category.name];
    if (items) {
      for (const item of items) {
        menuItems.push({ ...item, categoryId: category._id });
      }
    }
  }
  await MenuItemModel.insertMany(menuItems);

  console.log('Seeding tables...');
  await TableModel.insertMany(sampleTables);

  console.log('Seed completed successfully!');
  console.log(`  - ${categories.length} categories`);
  console.log(`  - ${menuItems.length} menu items`);
  console.log(`  - ${sampleTables.length} tables`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
