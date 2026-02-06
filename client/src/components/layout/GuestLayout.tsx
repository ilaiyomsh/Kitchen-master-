import { Outlet } from 'react-router-dom';
import { useTable } from '../../hooks/useTable';
import { useCartStore } from '../../stores/cart.store';

export function GuestLayout() {
  const { table } = useTable();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {table ? table.label : 'Loading...'}
            </h1>
            <p className="text-xs text-gray-500">Digital Menu</p>
          </div>
          {totalItems > 0 && (
            <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {totalItems}
            </div>
          )}
        </div>
      </header>
      <main className="max-w-lg mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
