import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AXIOS } from "../../app/axios-http";
import { FaUserCircle, FaWrench } from "react-icons/fa";
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

  const fetchAllUsers = () => {};

  useEffect(() => {
    getProfil();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="shadow p-3">
        <div className="d-flex flex-row">
          <div>
            <NavLink
              to="profile"
              state={{ profile }}
              className={({ isActive }) =>
                isActive ? "dashboard-navlink-active" : "dashboard-navlink"
              }
            >
              <FaUserCircle />
              Profile
            </NavLink>
          </div>
          <div className="mx-2">
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive ? "dashboard-navlink-active" : "dashboard-navlink"
              }
            >
              <FaWrench />
              Settings
            </NavLink>
          </div>
        </div>
        <hr className="solid" />
        <Outlet />
      </div>
    </div>
  );
}
