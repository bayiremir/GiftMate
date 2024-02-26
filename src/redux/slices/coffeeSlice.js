// homeScreenSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCoffee = createAsyncThunk(
  'homeScreen/fetchCoffee',
  async () => {
    const response = await axios.get('https://fake-coffee-api.vercel.app/api');
    return response.data;
  },
);

const initialState = {
  coffeeDataLoading: true,
  coffeeData: null,
};

const coffeeSlice = createSlice({
  name: 'coffeeSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCoffee.pending, state => {
      state.coffeeDataLoading = true;
    });
    builder.addCase(fetchCoffee.rejected, (state, action) => {
      state.coffeeData = action.payload;
      state.coffeeDataLoading = false;
    });
    builder.addCase(fetchCoffee.fulfilled, (state, action) => {
      state.coffeeData = action.payload;
      state.coffeeDataLoading = false;
    });
  },
});

export default coffeeSlice.reducer;
