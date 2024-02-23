import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import registerSlice from './slices/registerSlice';
import isLoginSlice from './slices/isLoginSlice';

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    registerSlice: registerSlice,
    isLoginSlice: isLoginSlice,
  },
});
