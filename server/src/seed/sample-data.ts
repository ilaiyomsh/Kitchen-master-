export const sampleCategories = [
  { name: 'Appetizers', description: 'Start your meal right', sortOrder: 1 },
  { name: 'Main Courses', description: 'Our finest dishes', sortOrder: 2 },
  { name: 'Sides', description: 'Perfect accompaniments', sortOrder: 3 },
  { name: 'Desserts', description: 'Sweet endings', sortOrder: 4 },
  { name: 'Drinks', description: 'Refreshing beverages', sortOrder: 5 },
];

export const sampleItemsByCategory: Record<string, Array<{
  name: string;
  description: string;
  price: number;
  tags: string[];
  sortOrder: number;
}>> = {
  Appetizers: [
    { name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes and basil', price: 3200, tags: ['vegetarian'], sortOrder: 1 },
    { name: 'Caesar Salad', description: 'Crisp romaine with parmesan and croutons', price: 3800, tags: ['vegetarian'], sortOrder: 2 },
    { name: 'Soup of the Day', description: 'Ask your waiter for today\'s selection', price: 2800, tags: [], sortOrder: 3 },
    { name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with dipping sauce', price: 3400, tags: ['vegetarian'], sortOrder: 4 },
  ],
  'Main Courses': [
    { name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: 8900, tags: ['gluten-free'], sortOrder: 1 },
    { name: 'Beef Tenderloin', description: '250g prime beef with red wine reduction', price: 11500, tags: ['gluten-free'], sortOrder: 2 },
    { name: 'Chicken Marsala', description: 'Pan-seared chicken with mushroom marsala sauce', price: 7200, tags: [], sortOrder: 3 },
    { name: 'Vegetable Risotto', description: 'Creamy arborio rice with seasonal vegetables', price: 6400, tags: ['vegetarian', 'gluten-free'], sortOrder: 4 },
    { name: 'Lamb Chops', description: 'Herb-crusted rack of lamb with mint sauce', price: 10500, tags: ['gluten-free'], sortOrder: 5 },
  ],
  Sides: [
    { name: 'French Fries', description: 'Crispy golden fries', price: 1800, tags: ['vegetarian'], sortOrder: 1 },
    { name: 'Mashed Potatoes', description: 'Creamy garlic mashed potatoes', price: 2000, tags: ['vegetarian', 'gluten-free'], sortOrder: 2 },
    { name: 'Grilled Vegetables', description: 'Seasonal vegetables grilled to perfection', price: 2200, tags: ['vegetarian', 'gluten-free'], sortOrder: 3 },
    { name: 'Rice Pilaf', description: 'Fluffy basmati rice with herbs', price: 1600, tags: ['vegetarian', 'gluten-free'], sortOrder: 4 },
  ],
  Desserts: [
    { name: 'Chocolate Fondant', description: 'Warm chocolate cake with a molten center', price: 4200, tags: ['vegetarian'], sortOrder: 1 },
    { name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 3800, tags: ['vegetarian'], sortOrder: 2 },
    { name: 'Fruit Sorbet', description: 'Three scoops of seasonal fruit sorbet', price: 2800, tags: ['vegetarian', 'gluten-free'], sortOrder: 3 },
    { name: 'Cheesecake', description: 'New York style with berry compote', price: 4000, tags: ['vegetarian'], sortOrder: 4 },
  ],
  Drinks: [
    { name: 'Still Water', description: 'Bottled mineral water', price: 1200, tags: [], sortOrder: 1 },
    { name: 'Sparkling Water', description: 'Bottled sparkling water', price: 1400, tags: [], sortOrder: 2 },
    { name: 'Soft Drink', description: 'Cola, Sprite, or Fanta', price: 1600, tags: [], sortOrder: 3 },
    { name: 'Fresh Juice', description: 'Orange, apple, or carrot', price: 2200, tags: ['vegetarian'], sortOrder: 4 },
    { name: 'Coffee', description: 'Espresso, cappuccino, or latte', price: 1800, tags: ['vegetarian'], sortOrder: 5 },
  ],
};

export const sampleTables = Array.from({ length: 15 }, (_, i) => ({
  number: i + 1,
  label: `Table ${i + 1}`,
  seats: i < 4 ? 2 : i < 10 ? 4 : 6,
}));
