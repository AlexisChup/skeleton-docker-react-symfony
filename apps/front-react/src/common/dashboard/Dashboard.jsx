import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="settings">Settings</Link>
      <br />
      <Outlet />
      <div className="ml-2">
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
    </div>
  );
}
