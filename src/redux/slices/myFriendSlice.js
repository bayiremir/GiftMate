import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchFriends = createAsyncThunk(
  'userData/fetchFriends',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:3000/friends', {
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

const myFriendSlice = createSlice({
  name: 'myFriendSlice',
  initialState: {
    friendsContentLoading: false,
    friendsContent: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFriends.pending, state => {
        state.friendsContentLoading = true;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friendsContentLoading = false;
        state.friendsContent = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.friendsContentLoading = false;
        state.error = action.payload;
      });
  },
});

export default myFriendSlice.reducer;
