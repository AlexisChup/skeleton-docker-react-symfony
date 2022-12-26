import React from "react";
import "./Profile.css";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const { profile } = location.state;

  return (
    <div className="">
      <h2>Profile</h2>
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
          <tr>
            <th className="align-middle" scope="row">
              {profile.id}
            </th>
            <td className="align-middle">{profile.email}</td>
            <td className="align-middle">{profile.userIdentifier}</td>
            <td className="align-middle">
              {profile.roles.map((role, indexRole) => {
                return <div key={indexRole}>{role}</div>;
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
