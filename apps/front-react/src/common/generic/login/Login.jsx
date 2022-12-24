import React, { useState } from "react";
import "./Login.css";
import { AXIOS } from "../../../app/axios-http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice";

export default function Login() {
  const initialFormLogin = {
    email: "",
    password: "",
  };

  let [isRequesting, setRequesting] = useState(false);
  let [formLogin, setFormLogin] = useState(initialFormLogin);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");
    setRequesting(true);
    AXIOS.post("/login_check", formLogin)
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

  const handleFormLogin = (key, value) => {
    setFormLogin({ ...formLogin, [key]: value });
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div>
          <h2>Login</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => handleFormLogin("email", e.target.value)}
                value={formLogin.email}
              />
              <small id="emailHelp" className="form-text text-muted">
                user@gmail.com
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                autoComplete="on"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => handleFormLogin("password", e.target.value)}
                value={formLogin.password}
              />
              <small id="emailHelp2" className="form-text text-muted">
                user
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
              disabled={isRequesting}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
