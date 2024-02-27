import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import registerSlice from './slices/registerSlice';
import isLoginSlice from './slices/isLoginSlice';
import profileSlice from './slices/profileSlice';
import coffeeSlice from './slices/coffeeSlice';
import cartSlice from './slices/cartSlice';
import sendGiftSlice from './slices/sendGiftSlice';
import requestFriendSlice from './slices/requestFriendSlice';

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    registerSlice: registerSlice,
    isLoginSlice: isLoginSlice,
    profileSlice: profileSlice,
    coffeeSlice: coffeeSlice,
    cartSlice: cartSlice,
    sendGiftSlice: sendGiftSlice,
    requestFriendSlice: requestFriendSlice,
  },
});
