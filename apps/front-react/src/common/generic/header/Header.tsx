import React from "react";
import "./Header.css";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";

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
      </nav>
    </header>
  );
}
