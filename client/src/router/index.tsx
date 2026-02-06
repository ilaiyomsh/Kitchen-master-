import { createBrowserRouter } from 'react-router-dom';
import { GuestLayout } from '../components/layout/GuestLayout';
import { KitchenLayout } from '../components/layout/KitchenLayout';
import { GuestMenu } from '../pages/GuestMenu';
import { GuestOrderStatus } from '../pages/GuestOrderStatus';
import { KitchenLogin } from '../pages/KitchenLogin';
import { KitchenDashboard } from '../pages/KitchenDashboard';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/table/:tableId',
    element: <GuestLayout />,
    children: [
      { index: true, element: <GuestMenu /> },
      { path: 'orders', element: <GuestOrderStatus /> },
    ],
  },
  {
    path: '/kitchen/login',
    element: <KitchenLogin />,
  },
  {
    path: '/kitchen',
    element: <KitchenLayout />,
    children: [
      { index: true, element: <KitchenDashboard /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
