import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="d-flex justify-content-between flex-row p-3 shadow">
        <div className="ml-3">
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? "navbar-navlink-active" : "navbar-navlink"
            }
          >
            Home
          </NavLink>
        </div>
        <div className="d-flex flex-row">
          <div>
            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive ? "navbar-navlink-active" : "navbar-navlink"
              }
            >
              About
            </NavLink>
          </div>
          <div className="mx-5">
            <NavLink
              to="contact"
              className={({ isActive }) =>
                isActive ? "navbar-navlink-active" : "navbar-navlink"
              }
            >
              Contact
            </NavLink>
          </div>
          <div className="mr-3">
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive ? "navbar-navlink-active" : "navbar-navlink"
              }
            >
              Dashboard
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
