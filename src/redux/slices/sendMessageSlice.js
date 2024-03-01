import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';
import {SEND_MESSAGE} from '@env';

export const fetchSendMessage = createAsyncThunk(
  'userData/fetchSendMessage',
  async ({receiverId, content}, {rejectWithValue}) => {
    try {
      const response = await fetch(SEND_MESSAGE, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storage.getString('userToken')}`,
        },
        body: JSON.stringify({
          sender: storage.getString('userId'),
          receiverId: receiverId,
          content: content,
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
    sendMessageLoading: false,
    sendMessage: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSendMessage.pending, state => {
        state.sendMessageLoading = true;
      })
      .addCase(fetchSendMessage.fulfilled, (state, action) => {
        state.sendMessageLoading = false;
        state.sendMessage = action.payload;
      })
      .addCase(fetchSendMessage.rejected, (state, action) => {
        state.sendMessageLoading = false;
        state.error = action.payload;
      });
  },
});

export default sendMessageSlice.reducer;
