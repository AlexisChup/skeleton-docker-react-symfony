import React, { useState } from "react";
import "./Logout.css";
import { useDispatch } from "react-redux";
import LogoutModal from "./logout-modal/LogoutModal";
import { logout } from "../../../features/auth/authSlice";
import Button from "react-bootstrap/Button";

export default function Logout(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = (isConfirmed) => {
    if (isConfirmed) {
      dispatch(logout());
    }

    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="">
      <h3>Log out</h3>
      <Button
        disabled={props.isRequesting}
        variant="danger"
        size="sm"
        onClick={handleShow}
      >
        Logout
      </Button>
      <LogoutModal handleClose={handleClose} show={show} />
    </div>
  );
}
