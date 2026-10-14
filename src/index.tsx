import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouterProvider } from './app/providers';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppRouterProvider offers={offers} />
  </React.StrictMode>,
);
