import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResturantData = createAsyncThunk(
  'userData/fetchResturantData',
  async () => {
    const response = await axios.get(
      'http://localhost:3000/public/resturant.json',
    );
    return response.data;
  },
);

const initialState = {
  resturantData: null,
  resturantDataLoading: true,
  error: null,
};

const resturantSlice = createSlice({
  name: 'resturantSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchResturantData.pending, state => {
        state.resturantDataLoading = true;
      })
      .addCase(fetchResturantData.fulfilled, (state, action) => {
        state.resturantDataLoading = false;
        state.resturantData = action.payload;
      })
      .addCase(fetchResturantData.rejected, (state, action) => {
        state.resturantDataLoading = false;
        state.error = action.payload;
      });
  },
});

export default resturantSlice.reducer;
