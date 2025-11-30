import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("abhyaasi_admin_token");
let initialState;

if (token) {
  initialState = { isLoggedIn: true };
} else {
  initialState = { isLoggedIn: false };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
