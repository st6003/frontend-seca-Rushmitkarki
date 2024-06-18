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

  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    if (firstName.trim() === "") {
      validationErrors.firstName = "First name is required";
      isValid = false;
    }

    if (lastName.trim() === "") {
      validationErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!email.includes("@")) {
      validationErrors.email = "Email is invalid";
      isValid = false;
    }

    if (password.trim() === "") {
      validationErrors.password = "Password is required";
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      validationErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword =
        "Password and Confirm Password do not match";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    registerUserApi(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName}</p>
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
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName}</p>
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {errors.email && <p className="text-danger">{errors.email}</p>}

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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-danger">{errors.confirmPassword}</p>
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
