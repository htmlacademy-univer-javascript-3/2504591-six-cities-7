import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthorized: boolean;
};

export const ProtectedRoute = ({ isAuthorized }: PrivateRouteProps) => {
  //TODO реализовать логику для проверки авторизации пользователя и редиректа на главную страницу, если пользователь не авторизован
  // eslint-disable-next-line no-constant-condition
  if (isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
