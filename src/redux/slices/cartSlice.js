import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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
    addItem: (state, action) => {
      state.items.push(action.payload);
      storage.set('cart', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
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
