import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  //TODO реализовать логику для проверки авторизации пользователя и редиректа на главную страницу, если пользователь не авторизован
  // eslint-disable-next-line no-constant-condition
  if (true) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
