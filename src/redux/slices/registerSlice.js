import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';

export const fetchRegister = createAsyncThunk(
  'userData/fetchRegister',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
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

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState: {
    registerContentLoading: false,
    registerContent: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegister.pending, state => {
        state.registerContentLoading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.registerContentLoading = false;
        state.registerContent = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.registerContentLoading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
