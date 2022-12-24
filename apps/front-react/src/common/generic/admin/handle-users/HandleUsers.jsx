import React, { useEffect, useState } from "react";
import { AXIOS } from "../../../../app/axios-http";
import Spinner from "../../spinner/Spinner";

export default function HandleUsers() {
  const initialStateUsers = [];

  let [users, setUsers] = useState(initialStateUsers);
  let [isRequesting, setIsRequesting] = useState(false);

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
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={(index + 1) * 10}>
                <th scope="row">{user.id}</th>
                <td>{user.email}</td>
                <td>{user.userIdentifier}</td>
                <td>
                  {user.roles.map((role, indexRole) => {
                    return (
                      <div key={(index + 1) * 10 + indexRole + 1}>{role}</div>
                    );
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
