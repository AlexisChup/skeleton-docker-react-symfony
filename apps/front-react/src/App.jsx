import React, { Component } from "react";
import Product from "./components/Product";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import logo from "./logo.svg";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload ok!
        </p>
        <Product />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
