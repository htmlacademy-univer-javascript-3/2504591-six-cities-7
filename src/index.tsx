import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouterProvider } from './app/providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppRouterProvider />
  </React.StrictMode>,
);
