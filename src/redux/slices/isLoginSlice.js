import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLogin: false,
};

const isLoginSlice = createSlice({
  name: 'isLoginSlice',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const {setIsLogin} = isLoginSlice.actions;
export default isLoginSlice.reducer;
