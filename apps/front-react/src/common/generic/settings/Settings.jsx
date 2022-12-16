import React from "react";
import "./Settings.css";

export default function Settings() {
  return (
    <div className="">
      <h3>Settings</h3>
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
    </div>
  );
}
