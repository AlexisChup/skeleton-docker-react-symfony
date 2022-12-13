import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../app/axios-http";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isAuthenticated = true;
      setAuthToken(payload.token);
      localStorage.setItem("token", payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      setAuthToken();
      localStorage.removeItem("token");
      toast.info("Logout successfully !");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
