import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../app/axios-http";
import { toast } from "react-toastify";
import { verifyValidyOfJwt } from "../../common/generic/auth/AuthVerify";

const initialState = {
  isAuthenticated: verifyValidyOfJwt(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isAuthenticated = true;
      setAuthToken(payload.payload);
      localStorage.setItem("token", payload.payload);
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
