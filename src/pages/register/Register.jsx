import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/api";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validate = () => {
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Password and Confirm Password do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center logo-container">
          <img
            src="/assets/images/logo.png"
            alt="Register"
            className="img-fluid logo"
            height={400}
            width={400}
          />
        </div>
        <div className="col-md-6 form-container">
          <div className="card register-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-6">Register Now</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={handleFirstName}
                    required
                  />
                </div>
                {firstNameError && (
                  <p className="text-danger">{firstNameError}</p>
                )}

                <div style={{ marginBottom: "25px" }}></div>

                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={handleLastName}
                    required
                  />
                </div>
                {lastNameError && (
                  <p className="text-danger">{lastNameError}</p>
                )}

                <div style={{ marginBottom: "25px" }}></div>

                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmail}
                    required
                  />
                </div>
                {emailError && <p className="text-danger">{emailError}</p>}

                <div style={{ marginBottom: "25px" }}></div>

                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}

                <div style={{ marginBottom: "25px" }}></div>

                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    required
                  />
                </div>
                {confirmPasswordError && (
                  <p className="text-danger">{confirmPasswordError}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100 mt-3"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
