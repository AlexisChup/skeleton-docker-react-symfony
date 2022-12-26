import React, { useState, useEffect } from "react";
import "./HandleUsersModal.css";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AXIOS } from "../../../../../app/axios-http";
import Spinner from "../../../spinner/Spinner";

export default function HandleUsersModal(props) {
  let [formEditUser, setFormEditUser] = useState(null);
  let [newPassword, setNewPassword] = useState("");

  const handleFormEditUser = (key, value) => {
    if (!key.includes("ROLE")) {
      setFormEditUser({ ...formEditUser, [key]: value });
    } else {
      let copyRoles = [...formEditUser.roles];
      if (value) {
        copyRoles.push(key);
      } else {
        // Removing the specified element by value from the array
        for (let i = 0; i < copyRoles.length; i++) {
          if (copyRoles[i] === key) {
            copyRoles.splice(i, 1);
          }
        }
      }
      setFormEditUser({ ...formEditUser, roles: copyRoles });
    }
  };

  const handleEditUser = () => {
    let payload = { ...formEditUser };
    payload = {
      ...payload,
      isPasswordChanged: newPassword.length > 0,
    };

    if (payload.isPasswordChanged) {
      payload.password = newPassword;
    }

    const id = toast.loading("Please wait...");
    AXIOS.post("/admin/user/edit", payload)
      .then((response) => {
        toast.update(id, {
          render: "Edit successfully !",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
        props.handleClose(true);
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
      .finally(() => {});
  };

  useEffect(() => {
    setFormEditUser(props.userEditing);
    setNewPassword("");
  }, [props.userEditing]);

  return (
    <Modal
      show={props.show}
      onHide={() => props.handleClose(false)}
      keyboard={false}
    >
      {formEditUser ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Edit {props.userEditing.userIdentifier}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formEditUser.email}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="on"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRoles">
                <Form.Label>Roles</Form.Label>
                <Form.Check
                  disabled
                  type="switch"
                  id="switch-role-user"
                  label="Role User"
                  checked={true}
                />
                <Form.Check
                  type="switch"
                  id="switch-role-admin"
                  label="Role Admin"
                  checked={formEditUser.roles.includes("ROLE_ADMIN")}
                  onChange={(e) =>
                    handleFormEditUser("ROLE_ADMIN", e.target.checked)
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => props.handleClose(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleEditUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <Spinner />
      )}
    </Modal>
  );
}
