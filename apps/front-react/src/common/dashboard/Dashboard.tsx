import React from "react";
import "./Dashboard.css";

export default function Dashboard({ logout }: { logout: any }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
