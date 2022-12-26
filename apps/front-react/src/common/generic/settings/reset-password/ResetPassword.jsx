import React, { useState } from "react";
import "./ResetPassword.css";
import { toast } from "react-toastify";
import { AXIOS } from "../../../../app/axios-http";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ResetPasswordModal from "./reset-password-modal/ResetPasswordModal";

export default function ResetPassword(props) {
  const [show, setShow] = useState(false);

  const handleClose = (isConfirmed) => {
    if (isConfirmed) {
      handleResetPassword();
    }

    setShow(false);
  };
  const handleShow = () => setShow(true);

  let [password, setPassword] = useState("");

  const handleResetPassword = () => {
    props.setIsRequesting(true);
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
      .finally(() => props.setIsRequesting(false));
  };

  return (
    <div>
      <h3>Reset Password</h3>
      <Form>
        <Form.Control
          type="password"
          name="reset-password"
          id="reset-password"
          aria-describedby="reset-password"
          placeholder="********"
          value={password}
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Label id="reset-password-help" className="form-text text-muted">
          8 characters
        </Form.Label>
        <Button
          disabled={props.isRequesting}
          variant="warning"
          size="sm"
          onClick={handleShow}
        >
          Reset
        </Button>
      </Form>
      <ResetPasswordModal
        show={show}
        handleClose={handleClose}
        handleResetPassword={handleResetPassword}
      />
    </div>
  );
}
