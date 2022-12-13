import React, { useState } from "react";
import "./Login.css";
import { AXIOS } from "../../../app/axios-http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice";

export default function Login() {
  let [isRequesting, setRequesting] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //reqres registered sample user
    const loginPayload = {
      email: "user@gmail.com",
      password: "user",
    };

    const id = toast.loading("Please wait...");

    setRequesting(true);
    AXIOS.post("/login_check", loginPayload)
      .then((response) => {
        toast.update(id, {
          render: "All is good",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
        console.log("RESPONSE : ", JSON.stringify(response.data));
        //get token from response
        const token = response.data.token;
        console.log("TOKEN : ", token);

        dispatch(login(token));

        //redirect user to home page
        navigate("/");
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
              />
              <small id="emailHelp" className="form-text text-muted">
                user@gmail.com
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
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
