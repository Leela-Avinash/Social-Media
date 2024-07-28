// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignUp: true,
  credentials: {
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
    identifier: "", 
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthForm: (state) => {
      state.isSignUp = !state.isSignUp;
      state.credentials = { ...initialState.credentials };
    },
    updateCredentials: (state, action) => {
      const { name, value } = action.payload;
      state.credentials[name] = value;
    },
    resetCredentials: (state) => {
      state.credentials = { ...initialState.credentials };
    }
  },
});

export const { toggleAuthForm, updateCredentials, resetCredentials } = authSlice.actions;

export default authSlice.reducer;
