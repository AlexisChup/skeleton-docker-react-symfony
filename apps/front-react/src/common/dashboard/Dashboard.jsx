import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { AXIOS } from "../../app/axios-http";
import "./Dashboard.css";

export default function Dashboard() {
  const initialStateProfil = {
    id: null,
    email: "",
    userIdentifier: "",
    roles: [],
  };

  let [profile, setProfile] = useState(initialStateProfil);

  const getProfil = () => {
    AXIOS.get("/user/profile")
      .then((res) => setProfile(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getProfil();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
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
      <div className="">
        <h3>Log out</h3>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Logout
        </button>
      </div>
      <Link to="settings">Settings</Link>
      <Outlet />
    </div>
  );
}
