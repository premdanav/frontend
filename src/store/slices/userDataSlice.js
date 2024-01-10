import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
};
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUserData: (state, action) => {
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
