import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    try {
      const cartItemsString = await storage.getString('cart');
      return cartItemsString ? JSON.parse(cartItemsString) : [];
    } catch (error) {
      return [];
    }
  },
);

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItem: {
      reducer(state, action) {
        state.items.push(action.payload);
        storage.set('cart', JSON.stringify(state.items));
      },
      prepare(item) {
        // Her ürüne benzersiz bir clientId atayarak hazırlayın
        return {payload: {...item, clientId: nanoid()}};
      },
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.clientId !== action.payload.clientId,
      );
      storage.set('cart', JSON.stringify(state.items));
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {addItem, removeItem} = cartSlice.actions;
export default cartSlice.reducer;
