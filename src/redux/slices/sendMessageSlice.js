import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchSendMessage = createAsyncThunk(
  'userData/fetchSendMessage',
  async ({receiverId, message}, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:3000/purchase', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storage.getString('userToken')}`,
        },
        body: JSON.stringify({
          receiverId,
          message,
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

const sendMessageSlice = createSlice({
  name: 'sendMessageSlice',
  initialState: {
    messageLoading: false,
    message: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSendMessage.pending, state => {
        state.messageLoading = true;
      })
      .addCase(fetchSendMessage.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.message = action.payload;
      })
      .addCase(fetchSendMessage.rejected, (state, action) => {
        state.messageLoading = false;
        state.error = action.payload;
      });
  },
});

export default sendMessageSlice.reducer;
