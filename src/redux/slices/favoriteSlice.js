import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favorites: ['asd'],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        favorite => favorite === action.payload,
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        favorite => favorite !== action.payload,
      );
    },
    deleteAllFavorites: state => {
      state.favorites = [];
    },
  },
});

export const {addFavorite, removeFavorite, deleteAllFavorites} =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
