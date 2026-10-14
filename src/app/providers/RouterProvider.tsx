import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { FavoritesPage } from '@pages/favorites';
import MainPage from '@/pages/main-page';
import { LoginPage } from '@/pages/login';
import { OfferPage } from '@pages/offer-page';
import { NotFoundPage } from '@/pages/not-found';
import type { Offer } from '@/types';

type AppRouterProviderProps = {
  offers: Offer[];
};

export const AppRouterProvider = ({ offers }: AppRouterProviderProps) => {
  const router = createBrowserRouter([
    {
      element: <PublicOnlyRoute />,
      children: [
        {
          path: '/',
          element: <MainPage offers={offers} />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/offer/:id',
          element: <OfferPage offers={offers} />,
        },
      ],
    },
    {
      element: <ProtectedRoute isAuthorized={false} />,
      children: [
        {
          path: '/favorites',
          element: (
            <FavoritesPage
              offers={offers.filter((offer) => offer.isFavorite)}
            />
          ),
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
