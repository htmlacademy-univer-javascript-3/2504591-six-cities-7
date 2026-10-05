import { Outlet } from 'react-router-dom';

export const PublicOnlyRoute = () => (
  //TODO реализовать логику для проверки авторизации пользователя и редиректа на главную страницу c логина, если пользователь авторизован
  <Outlet />
);
