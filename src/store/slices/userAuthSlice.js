import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenicated: false,
  token: null,
};
const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUserData: (state, action) => {
      state.isAuthenicated = true;
      state.token = action.payload.token;
    },
    clearAuthUserData: (state, acion) => {
      state.isAuthenicated = false;
      state.token = null;
    },
  },
});

export const { setAuthUserData, clearAuthUserData } = userAuthSlice.actions;
export default userAuthSlice.reducer;
