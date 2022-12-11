import React, { Component } from "react";
import Product from "../product/Product";
import Counter from "../../features/counter/counter";
import logo from "../../assets/svg/logo.svg";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          Edit <code>src/app/App.tsx</code> and save to reload ok!
        </p>
        <Counter />
        <Product />
      </div>
    );
  }
}
