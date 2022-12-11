import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Header from "../common/generic/header/Header";
import Home from "../common/home/Home";
import About from "../common/generic/about/About";
import Contact from "../common/generic/contact/Contact";
import Error from "../common/generic/error/Error";
import Footer from "../common/generic/footer/Footer";
import PrivacyAndCookies from "../common/generic/privacy-and-cookies/PrivacyAndCookies";
import TermOfService from "../common/generic/term-of-service/TermOfService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export class App extends Component {
  render() {
    let activeClassName = "nav-active";
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms-of-service" element={<TermOfService />} />
          <Route path="privacy-and-cookies" element={<PrivacyAndCookies />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
