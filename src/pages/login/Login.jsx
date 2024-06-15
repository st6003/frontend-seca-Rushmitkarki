import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim() !== "") setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim() !== "") setPasswordError("");
  };

  const validate = () => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);

          localStorage.setItem("token", res.data.token);

          const convertedData = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedData);
        }
      })
      .catch((error) => {
        toast.error("An error occurred");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center logo-container">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="img-fluid logo"
            height={400}
            width={400}
          />
        </div>
        <div className="col-md-6 form-container">
          <div className="card login-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address :
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      onChange={handleEmail}
                      required
                    />
                  </div>
                  {emailError && <p className="text-danger">{emailError}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password :
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      onChange={handlePassword}
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-danger">{passwordError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100 mt-3"
                >
                  Login
                </button>
                {/* <div className="text-center mt-3">
                  <a href="#">Forgot Password?</a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
