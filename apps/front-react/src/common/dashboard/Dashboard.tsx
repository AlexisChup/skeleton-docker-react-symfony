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
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
