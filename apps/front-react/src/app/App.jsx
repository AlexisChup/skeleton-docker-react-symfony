import { Component, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../common/generic/header/Header";
import Home from "../common/home/Home";
import About from "../common/generic/about/About";
import Contact from "../common/generic/contact/Contact";
import Dashboard from "../common/dashboard/Dashboard";
import Error from "../common/generic/error/Error";
import Footer from "../common/generic/footer/Footer";
import PrivacyAndCookies from "../common/generic/privacy-and-cookies/PrivacyAndCookies";
import TermOfService from "../common/generic/term-of-service/TermOfService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  let [loggedIn, setLoggedIn] = useState(null);
  function handleLogin() {
    setLoggedIn(true);
  }
  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home login={handleLogin} />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="dashboard"
          element={
            loggedIn ? (
              <Dashboard logout={handleLogout} />
            ) : (
              <Navigate to="/" state="From Dashboard" />
            )
          }
        />
        <Route path="terms-of-service" element={<TermOfService />} />
        <Route path="privacy-and-cookies" element={<PrivacyAndCookies />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}
