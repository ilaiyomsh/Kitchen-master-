import { z } from 'zod';

export const createMenuCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional().default(''),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const createMenuItemSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional().default(''),
  price: z.number().int().min(0),
  categoryId: z.string().min(1),
  imageUrl: z.string().optional().default(''),
  isAvailable: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
  tags: z.array(z.string()).optional().default([]),
});

export type CreateMenuCategoryInput = z.infer<typeof createMenuCategorySchema>;
export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
