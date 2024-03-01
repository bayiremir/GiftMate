import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';
import {PURCHASE} from '@env';

export const fetchSendGift = createAsyncThunk(
  'userData/fetchSendGift',
  async ({productName, giftReceiverId, amount}, {rejectWithValue}) => {
    try {
      const response = await fetch(PURCHASE, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storage.getString('userToken')}`,
        },
        body: JSON.stringify({
          productName,
          giftReceiverId,
          amount,
        }),
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

const sendGiftSlice = createSlice({
  name: 'sendGiftSlice',
  initialState: {
    giftContentLoading: false,
    giftContent: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSendGift.pending, state => {
        state.giftContentLoading = true;
      })
      .addCase(fetchSendGift.fulfilled, (state, action) => {
        state.giftContentLoading = false;
        state.giftContent = action.payload;
      })
      .addCase(fetchSendGift.rejected, (state, action) => {
        state.giftContentLoading = false;
        state.error = action.payload;
      });
  },
});

export default sendGiftSlice.reducer;
