import type { MenuCategory } from '@kitchen/shared';

interface MenuCategoryListProps {
  categories: MenuCategory[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function MenuCategoryList({ categories, activeId, onSelect }: MenuCategoryListProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 px-4 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeId === cat._id
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
