import React, { Component } from "react";
import Product from "./components/Product";
import logo from "./logo.svg";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload ok!
          </p>
          <Product />
        </header>
      </div>
    );
  }
}

export default App;
