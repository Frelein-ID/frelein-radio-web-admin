"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.token = "";
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
