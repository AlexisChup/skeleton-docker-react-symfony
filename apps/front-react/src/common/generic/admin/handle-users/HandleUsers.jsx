import React, { useEffect, useState } from "react";
import { AXIOS } from "../../../../app/axios-http";
import Spinner from "../../spinner/Spinner";
import { FaPen } from "react-icons/fa";
import HandleUsersModal from "../modal-handle-users/HandleUsersModal";
import Button from "react-bootstrap/Button";

export default function HandleUsers() {
  const initialStateUsers = [];

  let [users, setUsers] = useState(initialStateUsers);
  let [isRequesting, setIsRequesting] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = (isRefreshing) => {
    if (isRefreshing) {
      fetchAllUsers();
    }
    setShow(false);
  };
  const handleShow = (user) => {
    setUserEditing(user);
    setShow(true);
  };

  let [userEditing, setUserEditing] = useState(null);

  const fetchAllUsers = () => {
    setIsRequesting(true);
    AXIOS.get("/admin/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsRequesting(false));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="">
      <h3>HandleUsers</h3>
      {isRequesting ? (
        <Spinner />
      ) : (
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">UserIdentifier</th>
              <th scope="col">Roles</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={(index + 1) * 10}>
                <th className="align-middle" scope="row">
                  {user.id}
                </th>
                <td className="align-middle">{user.email}</td>
                <td className="align-middle">{user.userIdentifier}</td>
                <td className="align-middle">
                  {user.roles.map((role, indexRole) => {
                    return (
                      <div key={(index + 1) * 10 + indexRole + 1}>{role}</div>
                    );
                  })}
                </td>
                <td className="align-middle">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleShow(user)}
                  >
                    <FaPen />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <HandleUsersModal
        show={show}
        handleClose={handleClose}
        userEditing={userEditing}
      />
    </div>
  );
}
