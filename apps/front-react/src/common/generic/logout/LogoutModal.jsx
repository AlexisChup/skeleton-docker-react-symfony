import React from "react";
import "./LogoutModal.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const handleLogoutModal = () => {
    dispatch(logout());
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Logout Confirmation
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Do you want to logout ?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => handleLogoutModal()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
