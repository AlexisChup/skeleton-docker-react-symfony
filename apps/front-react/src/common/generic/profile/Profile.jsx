import React from "react";
import "./Profile.css";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const { profile } = location.state;

  return (
    <div className="">
      <h3>Profile</h3>
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
            <th scope="row">{profile.id}</th>
            <td>{profile.email}</td>
            <td>{profile.userIdentifier}</td>
            <td>{profile.roles[0]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}