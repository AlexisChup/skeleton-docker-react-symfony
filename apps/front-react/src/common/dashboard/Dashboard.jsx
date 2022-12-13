import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({ logout }: { logout: any }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="settings">Settings</Link>
      <br />
      <Outlet />
      <button className="btn btn-danger btn-sm" onClick={logout}>
        Logout
      </button>
      <div className="ml-2">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
