import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchAcceptFriend = createAsyncThunk(
  'userData/fetchAcceptFriend',
  async ({friendId}, {rejectWithValue}) => {
    try {
      const response = await fetch(
        'http://localhost:3000/accept-friend-request',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storage.getString('userToken')}`,
          },
          body: JSON.stringify({
            friendId: friendId,
          }),
        },
      );
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

const acceptFriendRequestSlice = createSlice({
  name: 'acceptFriendRequestSlice',
  initialState: {
    acceptFriendsLoading: false,
    acceptFriends: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAcceptFriend.pending, state => {
        state.acceptFriendsLoading = true;
      })
      .addCase(fetchAcceptFriend.fulfilled, (state, action) => {
        state.acceptFriendsLoading = false;
        state.acceptFriends = action.payload;
      })
      .addCase(fetchAcceptFriend.rejected, (state, action) => {
        state.acceptFriendsLoading = false;
        state.error = action.payload;
      });
  },
});

export default acceptFriendRequestSlice.reducer;
