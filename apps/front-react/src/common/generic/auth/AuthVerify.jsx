import React, { useEffect } from "react";
import { withRouter } from "./with-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { setAuthToken } from "../../../app/axios-http";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const verifyValidyOfJwt = () => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    const decodedJwt = parseJwt(token);
    if (decodedJwt.exp * 1000 < Date.now()) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const AuthVerify = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // verify token when user reload page
    if (verifyValidyOfJwt()) {
      setAuthToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const isTokenValid = verifyValidyOfJwt();

    if (!isTokenValid && localStorage.getItem("token")) {
      // protect every routes containing /dashboard
      if (props.router.location.pathname.includes("dashboard")) {
        toast.error("Token has expired. Please Log In again.");
      }

      dispatch(logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.router.location]);

  return <></>;
};

export default withRouter(AuthVerify);
