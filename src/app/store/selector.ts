import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

export const selectCity = (state: RootState) => state.cityName;
export const selectOffers = (state: RootState) => state.offers;
export const selectOffersStatus = (state: RootState) => state.offersStatus;
export const selectOffersError = (state: RootState) => state.offersError;

export const selectCityOffers = createSelector(
  [selectCity, selectOffers],
  (city, offers) => offers.filter((offer) => offer.city.name === city),
);
