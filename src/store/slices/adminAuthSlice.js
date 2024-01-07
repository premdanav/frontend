import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenicated: false,
  token: null,
};
const adminAuthSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    setAuthAdminData: (state, action) => {
      state.isAuthenicated = true;
      state.token = action.payload.token;
    },
    clearAuthAdminData: (state, acion) => {
      state.isAuthenicated = false;
      state.token = null;
    },
  },
});

export const { setAuthAdminData, clearAuthAdminData } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
