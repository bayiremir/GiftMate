import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchGetMessage = createAsyncThunk(
  'userData/fetchGetMessage',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
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

const getMessageSlice = createSlice({
  name: 'getMessageSlice',
  initialState: {
    getMessageLoading: false,
    getMessage: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGetMessage.pending, state => {
        state.getMessageLoading = true;
      })
      .addCase(fetchGetMessage.fulfilled, (state, action) => {
        state.getMessageLoading = false;
        state.getMessage = action.payload;
      })
      .addCase(fetchGetMessage.rejected, (state, action) => {
        state.getMessageLoading = false;
        state.error = action.payload;
      });
  },
});

export default getMessageSlice.reducer;
