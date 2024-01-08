import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  role: null,
};
const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUserData: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    clearAuthUserData: (state, acion) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAuthUserData, clearAuthUserData } = userAuthSlice.actions;
export default userAuthSlice.reducer;
