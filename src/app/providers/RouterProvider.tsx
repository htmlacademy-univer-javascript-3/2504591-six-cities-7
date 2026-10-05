import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { FavoritesPage } from '@pages/favorites';
import MainPage from '@/pages/main-page';
import { LoginPage } from '@/pages/login';
import { OfferPage } from '@pages/offer-page';
import { NotFoundPage } from '@/pages/not-found';

const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: '/',
        element: <MainPage offerCount={5} />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/offers/:id',
        element: <OfferPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const AppRouterProvider = () => <RouterProvider router={router} />;
