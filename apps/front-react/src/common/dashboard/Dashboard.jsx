import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaWrench, FaUsers } from "react-icons/fa";
import { AXIOS } from "../../app/axios-http";
import Spinner from "../generic/spinner/Spinner";

export default function Dashboard() {
  let [isRequesting, setIsRequesting] = useState(false);
  let navigate = useNavigate();

  const initialStateProfil = {
    id: null,
    email: "",
    userIdentifier: "",
    roles: [],
  };

  let [profile, setProfile] = useState(initialStateProfil);

  useEffect(() => {
    setIsRequesting(true);
    AXIOS.get("/user/profile")
      .then((res) => {
        setProfile(res.data);
        navigate("/dashboard/profile", { state: { profile: res.data } });
      })
      .catch((e) => console.log(e))
      .finally(() => setIsRequesting(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="shadow p-3">
        <div className="d-flex flex-row">
          <div className="mr-2">
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
          <div className="mr-2">
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
          {profile.roles.includes("ROLE_ADMIN") ? (
            <div className="mr-2">
              <NavLink
                to="handle-users"
                className={({ isActive }) =>
                  isActive ? "dashboard-navlink-active" : "dashboard-navlink"
                }
              >
                <FaUsers />
                Handle Users
              </NavLink>
            </div>
          ) : null}
        </div>
        <hr className="solid" />
        {isRequesting ? <Spinner /> : <Outlet />}
      </div>
    </div>
  );
}
