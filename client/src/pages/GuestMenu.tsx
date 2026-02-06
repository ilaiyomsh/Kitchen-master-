import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
import { useTable } from '../hooks/useTable';
import { useSocket } from '../hooks/useSocket';
import { useSocketEvent } from '../hooks/useSocketEvent';
import { getGuestSocket } from '../config/socket';
import { getSessionId } from '../utils/format';
import { MenuCategoryList } from '../components/guest/MenuCategoryList';
import { MenuItemGrid } from '../components/guest/MenuItemGrid';
import { Cart } from '../components/guest/Cart';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import type { Order } from '@kitchen/shared';

export function GuestMenu() {
  const navigate = useNavigate();
  const { tableId } = useTable();
  const { data: menuData, isLoading, error } = useMenu();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const socket = getGuestSocket();
  useSocket(socket);

  // Join the table room
  useEffect(() => {
    if (tableId && socket.connected) {
      socket.emit('guest:join-table', { tableId, guestSessionId: getSessionId() });
    }
  }, [tableId, socket.connected, socket]);

  // Also join on connect event
  useEffect(() => {
    const onConnect = () => {
      if (tableId) {
        socket.emit('guest:join-table', { tableId, guestSessionId: getSessionId() });
      }
    };
    socket.on('connect', onConnect);
    return () => { socket.off('connect', onConnect); };
  }, [socket, tableId]);

  // Listen for order confirmations
  const handleOrderPlaced = useCallback((_data: { order: Order }) => {
    // Could show notification
  }, []);
  useSocketEvent(socket, 'order:placed', handleOrderPlaced);

  // Auto-select first category
  useEffect(() => {
    if (menuData?.categories && menuData.categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(menuData.categories[0]._id);
    }
  }, [menuData, activeCategoryId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-red-500">Failed to load menu</p>
        <p className="text-sm text-gray-500 mt-1">{error.message}</p>
      </div>
    );
  }

  const categories = menuData?.categories || [];
  const activeCategory = categories.find((c) => c._id === activeCategoryId);
  const activeItems = activeCategory?.items || [];

  return (
    <div className="pb-32">
      <MenuCategoryList
        categories={categories}
        activeId={activeCategoryId}
        onSelect={setActiveCategoryId}
      />

      {activeCategory && (
        <div className="px-4 py-2">
          <h2 className="text-lg font-bold text-gray-900">{activeCategory.name}</h2>
          {activeCategory.description && (
            <p className="text-sm text-gray-500">{activeCategory.description}</p>
          )}
        </div>
      )}

      <MenuItemGrid items={activeItems} />

      <div className="px-4 mt-6">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => navigate(`/table/${tableId}/orders`)}
        >
          View My Orders
        </Button>
      </div>

      <Cart />
    </div>
  );
}
