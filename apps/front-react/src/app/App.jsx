import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import Header from "../common/generic/header/Header";
import Footer from "../common/generic/footer/Footer";
import IndexRoutes from "../routes/IndexRoutes";
import AuthVerify from "../common/generic/auth/AuthVerify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div id="app-content">
        <Header id="header-content" />
        <IndexRoutes />
        <Footer id="footer-content" />
        <ToastContainer autoClose={3000} position="bottom-right" />
      </div>
      <AuthVerify />
    </BrowserRouter>
  );
}
