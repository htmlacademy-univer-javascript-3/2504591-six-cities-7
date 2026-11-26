import type { Offer } from '@/types/offer.type';
import { createReducer } from '@reduxjs/toolkit';
import { changeCityName, fetchOffers } from './action';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type AppState = {
  cityName: string;
  offers: Offer[];
  offersStatus: RequestStatus;
  offersError: string | null;
};

const initialState: AppState = {
  cityName: 'Paris',
  offers: [],
  offersStatus: 'idle',
  offersError: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCityName, (state, action) => {
    state.cityName = action.payload;
  });
  builder.addCase(fetchOffers.pending, (state) => {
    state.offersStatus = 'loading';
    state.offersError = null;
  });
  builder.addCase(fetchOffers.fulfilled, (state, action) => {
    state.offers = action.payload;
    state.offersStatus = 'succeeded';
  });
  builder.addCase(fetchOffers.rejected, (state, action) => {
    state.offersStatus = 'failed';
    state.offersError = action.error.message ?? 'Не удалось загрузить предложения.';
  });
});
