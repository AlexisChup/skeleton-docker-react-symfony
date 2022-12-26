import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { login } from "../../../features/auth/authSlice";
import { AXIOS } from "../../../app/axios-http";

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
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div>
            <h2>Login</h2>
          </div>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="login-email">Email address</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                id="login-email"
                aria-describedby="login-email-help"
                placeholder="Enter email"
                onChange={(e) => handleFormLogin("email", e.target.value)}
                value={formLogin.email}
              />
              <small id="login-email-help" className="form-text text-muted">
                user@gmail.com
              </small>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="login-password">Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                className="form-control"
                id="login-password"
                aria-describedby="login-password-help"
                placeholder="Password"
                onChange={(e) => handleFormLogin("password", e.target.value)}
                value={formLogin.password}
              />
              <small id="login-password-help" className="form-text text-muted">
                user
              </small>
            </Form.Group>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={isRequesting}
              size="sm"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
