import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
};
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUserData: (state, action) => {
      state.username = null;
      state.email = null;
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
