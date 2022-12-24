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
import Signup from "../common/generic/signup/Signup";
import Profile from "../common/generic/profile/Profile";
import Settings from "../common/generic/settings/Settings";
import HandleUsers from "../common/generic/admin/handle-users/HandleUsers";
import PrivacyAndCookies from "../common/generic/privacy-and-cookies/PrivacyAndCookies";
import TermsOfService from "../common/generic/terms-of-service/TermsOfService";
import AuthVerify from "../common/generic/auth/AuthVerify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

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
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="handle-users" element={<HandleUsers />} />
            </Route>
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="privacy-and-cookies" element={<PrivacyAndCookies />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <ToastContainer autoClose={3000} position="bottom-right" />
        </div>
        <Footer id="footer-content" />
        <AuthVerify />
      </div>
    </BrowserRouter>
  );
}
