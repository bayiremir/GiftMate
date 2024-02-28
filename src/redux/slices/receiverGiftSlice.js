import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchReceiverGifts = createAsyncThunk(
  'userData/fetchReceiverGifts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:3000/received-gifts', {
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

const receiverGiftSlice = createSlice({
  name: 'receiverGiftSlice',
  initialState: {
    receivedLoading: false,
    received: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReceiverGifts.pending, state => {
        state.receivedLoading = true;
      })
      .addCase(fetchReceiverGifts.fulfilled, (state, action) => {
        state.receivedLoading = false;
        state.received = action.payload;
      })
      .addCase(fetchReceiverGifts.rejected, (state, action) => {
        state.receivedLoading = false;
        state.error = action.payload;
      });
  },
});

export default receiverGiftSlice.reducer;
