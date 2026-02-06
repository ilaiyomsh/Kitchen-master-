import { Outlet, useNavigate } from 'react-router-dom';
import { useKitchenStore } from '../../stores/kitchen.store';
import { Button } from '../ui/Button';

export function KitchenLayout() {
  const navigate = useNavigate();
  const setAuthenticated = useKitchenStore((s) => s.setAuthenticated);

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/kitchen/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Kitchen Dashboard</h1>
            <p className="text-xs text-gray-500">Real-time Order Management</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
