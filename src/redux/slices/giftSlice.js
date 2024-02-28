import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchInventory = createAsyncThunk(
  'userData/fetchInventory',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:3000/get-inventory', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storage.getString('userToken')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

const giftSlice = createSlice({
  name: 'giftSlice',
  initialState: {
    inventoryLoading: false,
    inventory: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInventory.pending, state => {
        state.inventoryLoading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.inventoryLoading = false;
        state.inventory = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.inventoryLoading = false;
        state.error = action.payload;
      });
  },
});

export default giftSlice.reducer;
