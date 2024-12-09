import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/ApiSlice';

export const store = configureStore({
  reducer: {
    // Add the API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Add the API middleware to enable caching and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
