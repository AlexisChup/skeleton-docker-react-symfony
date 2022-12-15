import React, { useEffect } from "react";
import { withRouter } from "./with-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        // protect every routes containing /dashboard
        if (props.router.location.pathname.includes("dashboard")) {
          toast.error("Token has expired. Please Log In again.");
        }

        dispatch(logout());
      }
    }
  }, [props.router.location]);

  return <></>;
};

export default withRouter(AuthVerify);
