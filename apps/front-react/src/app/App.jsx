import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../common/generic/header/Header";
import Home from "../common/home/Home";
import About from "../common/generic/about/About";
import Contact from "../common/generic/contact/Contact";
import Dashboard from "../common/dashboard/Dashboard";
import Error from "../common/generic/error/Error";
import Footer from "../common/generic/footer/Footer";
import Login from "../common/generic/login/Login";
import PrivacyAndCookies from "../common/generic/privacy-and-cookies/PrivacyAndCookies";
import TermOfService from "../common/generic/term-of-service/TermOfService";
import AuthVerify from "../common/generic/auth/AuthVerify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <BrowserRouter>
      <div id="app-content">
        <Header id="header-content" />
        <div id="body-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" state="From Dashboard" />
                )
              }
            >
              <Route
                path="settings"
                element={<p>This is the nested Settings route</p>}
              />
            </Route>
            <Route path="terms-of-service" element={<TermOfService />} />
            <Route path="privacy-and-cookies" element={<PrivacyAndCookies />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <ToastContainer autoClose={3000} />
        </div>
        <Footer id="footer-content" />
        <AuthVerify />
      </div>
    </BrowserRouter>
  );
}

function Signup() {
  return (
    <div>
      <h2>Signup</h2>
    </div>
  );
}
