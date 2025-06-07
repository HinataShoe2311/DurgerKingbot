import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id: ""
};

const userDetailsSlice = createSlice({
  name: "TelegramUserData",
  initialState,
  reducers: {
    setInitData(state, action) {
      state.user_id = action.payload; 
    },
  },
});

export const { setInitData } = userDetailsSlice.actions;

export default userDetailsSlice;
