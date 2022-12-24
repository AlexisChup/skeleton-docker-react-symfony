import React, { useState } from "react";
import { toast } from "react-toastify";
import { AXIOS } from "../../../app/axios-http";
import ResetPasswordModal from "./ResetPasswordModal";
import "./Settings.css";

export default function Settings() {
  let [password, setPassword] = useState("");
  let [isRequesting, setIsRequesting] = useState(false);

  const handleResetPassword = () => {
    setIsRequesting(true);
    const id = toast.loading("Please wait...");
    AXIOS.post("/user/reset-password", { newPassword: password })
      .then((response) => {
        toast.update(id, {
          render: "Password changed successfully !",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });

        setPassword("");
      })
      .catch((err) => {
        toast.update(id, {
          render: err.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
        console.log(err);
      })
      .finally(() => setIsRequesting(false));
  };

  return (
    <div className="">
      <h3>Settings</h3>
      <div>
        <div>
          <h4>Reset Password</h4>
          <div className="from-group">
            <input
              type="password"
              name="reset-password"
              id="reset-password"
              aria-describedby="reset-password"
              placeholder="********"
              value={password}
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            />
            <small id="reset-password-help" className="form-text text-muted">
              8 characters
            </small>
          </div>
          <button
            disabled={isRequesting}
            type="submit"
            className="btn btn-warning btn-sm"
            data-toggle="modal"
            data-target="#resetPasswordModal"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="">
        <h4>Log out</h4>
        <button
          disabled={isRequesting}
          type="button"
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target="#logoutModal"
        >
          Logout
        </button>
      </div>

      <ResetPasswordModal handleResetPassword={handleResetPassword} />
    </div>
  );
}
