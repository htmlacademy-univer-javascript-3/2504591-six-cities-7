import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { FavoritesPage } from '@pages/favorites';
import MainPage from '@/pages/main-page';
import { LoginPage } from '@/pages/login';
import { OfferPage } from '@pages/offer-page';
import { NotFoundPage } from '@/pages/not-found';
import { useSelector } from 'react-redux';
import { selectOffers } from '@/app/store/selector';

export const AppRouterProvider = () => {
  const offers = useSelector(selectOffers);
  const router = createBrowserRouter([
    {
      element: <PublicOnlyRoute />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/offer/:id',
          element: <OfferPage />,
        },
      ],
    },
    {
      element: <ProtectedRoute isAuthorized={false} />,
      children: [
        {
          path: '/favorites',
          element: (
            <FavoritesPage offers={offers.filter((offer) => offer.isFavorite)} />
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
