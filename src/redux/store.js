import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import registerSlice from './slices/registerSlice';
import isLoginSlice from './slices/isLoginSlice';
import profileSlice from './slices/profileSlice';
import coffeeSlice from './slices/coffeeSlice';
import cartSlice from './slices/cartSlice';
import sendGiftSlice from './slices/sendGiftSlice';
import requestFriendSlice from './slices/requestFriendSlice';
import giftSlice from './slices/giftSlice';
import receiverGiftSlice from './slices/receiverGiftSlice';
import mySendGiftSlice from './slices/mySendGiftSlice';
import myFriendSlice from './slices/myFriendSlice';
import acceptFriendRequestSlice from './slices/acceptFriendRequestSlice';
import getMessageSlice from './slices/getMessageSlice';
import sendMessageSlice from './slices/sendMessageSlice';
import uploadPictureSlice from './slices/uploadPictureSlice';
import brandSlice from './slices/products/brandSlice';
import resturantSlice from './slices/products/resturantSlice';
import favoriteSlice from './slices/favoriteSlice';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 1000},
      serializableCheck: {warnAfter: 1000},
    }),
  reducer: {
    authSlice: authSlice,
    registerSlice: registerSlice,
    isLoginSlice: isLoginSlice,
    profileSlice: profileSlice,
    coffeeSlice: coffeeSlice,
    cartSlice: cartSlice,
    sendGiftSlice: sendGiftSlice,
    requestFriendSlice: requestFriendSlice,
    giftSlice: giftSlice,
    receiverGiftSlice: receiverGiftSlice,
    mySendGiftSlice: mySendGiftSlice,
    myFriendSlice: myFriendSlice,
    acceptFriendRequestSlice: acceptFriendRequestSlice,
    getMessageSlice: getMessageSlice,
    sendMessageSlice: sendMessageSlice,
    uploadPictureSlice: uploadPictureSlice,
    brandSlice: brandSlice,
    resturantSlice: resturantSlice,
    favoriteSlice: favoriteSlice,
  },
});
