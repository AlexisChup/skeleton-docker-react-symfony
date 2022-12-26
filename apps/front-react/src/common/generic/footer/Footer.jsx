/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="Footer d-flex justify-content-center">
      <div>
        <span>Copyright © 2022</span>
        <NavLink
          to="terms-of-service"
          className={({ isActive }) =>
            isActive ? "navbar-navlink-active" : "navbar-navlink"
          }
        >
          {" "}
          - Terms of Service -{" "}
        </NavLink>
        <NavLink
          to="privacy-and-cookies"
          className={({ isActive }) =>
            isActive ? "navbar-navlink-active" : "navbar-navlink"
          }
        >
          Privacy and Cookies
        </NavLink>
      </div>
    </footer>
  );
}
