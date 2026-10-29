import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouterProvider } from './app/providers';
import { offerDetails } from './mocks/offer-details';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppRouterProvider offers={offers} offerDetails={offerDetails} />
  </React.StrictMode>,
);
