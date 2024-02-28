import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchMySendGift = createAsyncThunk(
  'userData/fetchMySendGift',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:3000/sent-gifts', {
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

const mySendGiftSlice = createSlice({
  name: 'mySendGiftSlice',
  initialState: {
    mySendGiftLoading: false,
    mySendGift: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMySendGift.pending, state => {
        state.mySendGiftLoading = true;
      })
      .addCase(fetchMySendGift.fulfilled, (state, action) => {
        state.mySendGiftLoading = false;
        state.mySendGift = action.payload;
      })
      .addCase(fetchMySendGift.rejected, (state, action) => {
        state.mySendGiftLoading = false;
        state.error = action.payload;
      });
  },
});

export default mySendGiftSlice.reducer;
