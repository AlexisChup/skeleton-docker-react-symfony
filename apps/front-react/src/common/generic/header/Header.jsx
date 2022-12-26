import "./Header.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutModal from "../logout/logout-modal/LogoutModal";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header>
      <nav className="d-flex justify-content-between flex-row p-3 shadow mb-3">
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
          <div className="ml-2">
            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive ? "navbar-navlink-active" : "navbar-navlink"
              }
            >
              About
            </NavLink>
          </div>
          <div className="ml-2">
            <NavLink
              to="contact"
              className={({ isActive }) =>
                isActive ? "navbar-navlink-active" : "navbar-navlink"
              }
            >
              Contact
            </NavLink>
          </div>

          {isAuthenticated ? (
            <div className="ml-2">
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  isActive ? "navbar-navlink-active" : "navbar-navlink"
                }
              >
                Dashboard
              </NavLink>
            </div>
          ) : (
            <>
              <div className="ml-2">
                <NavLink
                  to="signup"
                  className={({ isActive }) =>
                    isActive ? "navbar-navlink-active" : "navbar-navlink"
                  }
                >
                  Signup
                </NavLink>
              </div>
              <div className="ml-2">
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    isActive ? "navbar-navlink-active" : "navbar-navlink"
                  }
                >
                  Login
                </NavLink>
              </div>
            </>
          )}
        </div>
      </nav>
      <LogoutModal />
    </header>
  );
}
