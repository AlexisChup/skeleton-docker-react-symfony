import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  let activeClassName: string = "nav-active";
  return (
    <header>
      <nav>
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          About
        </NavLink>
        <NavLink
          to="contact"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Contact
        </NavLink>
        <NavLink to="dashboard">Dashboard</NavLink>
      </nav>
    </header>
  );
}
