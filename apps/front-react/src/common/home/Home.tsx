import React, { Component } from "react";
import Product from "../product/Product";
import Counter from "../../features/counter/counter";
import logo from "../../assets/svg/logo.svg";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home({ login }: { login: any }) {
  let navigate = useNavigate();
  return (
    <div className="Home">
      <img src={logo} className="Home-logo" alt="logo" />
      <p className="text-sm">
        <small>
          Edit <code>src/app/App.tsx</code> and save to reload ok!
        </small>
      </p>
      <div className="row justify-center align-content-center">
        <div className="col">
          <h2>Test Auth</h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              login();
              navigate("/dashboard");
            }}
          >
            Login
          </button>
        </div>
      </div>
      <Counter />
      <Product />
    </div>
  );
}
