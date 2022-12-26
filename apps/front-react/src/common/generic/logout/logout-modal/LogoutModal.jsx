import React from "react";
import "./LogoutModal.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function LogoutModal(props) {
  return (
    <Modal show={props.show} onHide={() => props.handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Logout confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please confirm logout.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClose(false)}>
          Close
        </Button>
        <Button variant="warning" onClick={() => props.handleClose(true)}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
