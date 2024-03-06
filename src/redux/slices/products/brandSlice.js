import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {PRODUCT} from '@env';

export const fetchBrandData = createAsyncThunk(
  'userData/fetchBrandData',
  async (brand, {rejectWithValue}) => {
    try {
      const response = await axios(
        `https://tr.fd-api.com/api/v5/vendors/${brand}?include=menus,bundles,multiple_discounts,payment_types&language_id=2&opening_type=delivery&basket_currency=TRY&latitude=40.9814619&longitude=29.0251977`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  brandData: null,
  brandDataLoading: false,
  error: null,
};

const brandSlice = createSlice({
  name: 'brandSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBrandData.pending, state => {
        state.brandDataLoading = true;
      })
      .addCase(fetchBrandData.fulfilled, (state, action) => {
        state.brandDataLoading = false;
        state.brandData = action.payload;
      })
      .addCase(fetchBrandData.rejected, (state, action) => {
        state.brandDataLoading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
