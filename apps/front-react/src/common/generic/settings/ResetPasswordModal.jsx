import React from "react";

export default function ResetPasswordModal(props) {
  return (
    <div
      className="modal fade"
      id="resetPasswordModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="resetPasswordModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="resetPasswordModalLabel">
              Reset Password Confirmation
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
          <div className="modal-body">Do you want to reset your password ?</div>
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
              onClick={() => props.handleResetPassword()}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
