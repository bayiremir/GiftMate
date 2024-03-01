import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';
import {FRIEND_REQUEST} from '@env';

export const fetchRequestFriend = createAsyncThunk(
  'userData/fetchRequestFriend',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(FRIEND_REQUEST, {
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

const requestFriendSlice = createSlice({
  name: 'requestFriendSlice',
  initialState: {
    requestFriendLoading: false,
    requestFriend: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRequestFriend.pending, state => {
        state.requestFriendLoading = true;
      })
      .addCase(fetchRequestFriend.fulfilled, (state, action) => {
        state.requestFriendLoading = false;
        state.requestFriend = action.payload;
      })
      .addCase(fetchRequestFriend.rejected, (state, action) => {
        state.requestFriendLoading = false;
        state.error = action.payload;
      });
  },
});

export default requestFriendSlice.reducer;
