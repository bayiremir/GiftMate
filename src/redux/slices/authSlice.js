import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';
import {LOGIN} from '@env';

export const fetchAuth = createAsyncThunk(
  'userData/fetchAuth',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const response = await fetch(LOGIN, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || 'Something went wrong');
      }
      if (data.token) {
        storage.set('userToken', data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    authContentLoading: false,
    authContent: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuth.pending, state => {
        state.authContentLoading = true;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.authContentLoading = false;
        state.authContent = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.authContentLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
