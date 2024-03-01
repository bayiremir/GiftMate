import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';
import {PROFILE} from '@env';

export const fetchProfile = createAsyncThunk(
  'userData/fetchProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(PROFILE, {
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

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: {
    profileContentLoading: false,
    profileContent: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.profileContentLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileContentLoading = false;
        state.profileContent = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileContentLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
