import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage} from '../../utils/storage';
import {PROFILE_PHOTO_UPLOAD_URL} from '@env';

export const fetchProfilePhoto = createAsyncThunk(
  'userData/fetchProfilePhoto',
  async (file, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: file.uri,
        type: file.type, // veya 'image/jpeg' gibi doğrudan bir değer
        name: file.fileName || 'temp.jpg',
      });

      const response = await fetch(PROFILE_PHOTO_UPLOAD_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${storage.getString('userToken')}`,
        },
      });

      const data = await response.json();
      console.log('Server response data: ', data);

      if (!response.ok) {
        console.error('Server responded with an error: ', data);
        return rejectWithValue(data.error || 'Something went wrong');
      }
      return data;
    } catch (error) {
      console.error('Error while uploading photo: ', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

const uploadPictureSlice = createSlice({
  name: 'profilePhoto',
  initialState: {
    uploading: false,
    photoUrl: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfilePhoto.pending, state => {
        state.uploading = true;
      })
      .addCase(fetchProfilePhoto.fulfilled, (state, action) => {
        state.uploading = false;
        state.photoUrl = action.payload.photoUrl;
      })
      .addCase(fetchProfilePhoto.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export default uploadPictureSlice.reducer;
