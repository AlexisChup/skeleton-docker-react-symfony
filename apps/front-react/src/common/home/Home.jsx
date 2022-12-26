import React, { useState } from "react";
import Product from "../product/Product";
import Counter from "../../features/counter/counter";
import { AXIOS } from "../../app/axios-http";
import logo from "../../assets/svg/logo.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, logout } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import "./Home.css";
import Button from "react-bootstrap/Button";

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  let [isRequesting, setRequesting] = useState(false);
  let navigate = useNavigate();

  const handleLoginTest = () => {
    const id = toast.loading("Please wait...");
    setRequesting(true);

    const loginPayload = {
      email: "admin@gmail.com",
      password: "admin",
    };

    AXIOS.post("/login_check", loginPayload)
      .then((response) => {
        toast.update(id, {
          render: "Login successfully !",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
        //get token from response
        const token = response.data.token;

        dispatch(login(token));

        //redirect user to dashboard page
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.update(id, {
          render: err.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
        console.log(err);
      })
      .finally(() => setRequesting(false));
  };

  const handleLogoutTest = () => {
    dispatch(logout());
  };

  return (
    <div className="Home">
      <img src={logo} className="Home-logo" alt="logo" />
      <p className="text-sm">
        <small>
          Edit <code>src/app/App.tsx</code> and save to reload ok!
        </small>
      </p>
      <div className="container">
        <div className="row justify-content-center">
          <div>
            <h1>Test Skeleton</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Test Auth</h2>
            {isAuthenticated ? (
              <Button
                disabled={isRequesting}
                onClick={() => {
                  handleLogoutTest();
                }}
                variant="danger"
                size="sm"
              >
                Logout
              </Button>
            ) : (
              <Button
                disabled={isRequesting}
                onClick={() => {
                  handleLoginTest();
                }}
                size="sm"
              >
                Login
              </Button>
            )}
          </div>
          <Counter />
        </div>
        <Product />
      </div>
    </div>
  );
}
