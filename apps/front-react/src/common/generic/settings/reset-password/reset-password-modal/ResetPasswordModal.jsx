import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ResetPasswordModal(props) {
  return (
    <Modal show={props.show} onHide={() => props.handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to reset your password ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.handleClose(true)}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
