import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    tempUserData: null, // Temporary user data for registration
  },
  reducers: {
    // Store temporary user data during registration
    setTempUserData: (state, action) => {
      state.tempUserData = action.payload;
    },
    clearTempUserData: (state) => {
      state.tempUserData = null;
    },
    // Authentication reducers
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.tempUserData = null; // Clear temp data on successful signup
    },
    signupFailure: (state, action) => {
      state.error = action.payload;
      state.tempUserData = null; // Clear temp data on signup failure
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.tempUserData = null; // Clear temp data on logout
    },
  },
});

export const {
  setTempUserData,
  clearTempUserData,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
