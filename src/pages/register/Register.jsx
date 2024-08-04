import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUserApi } from "../../apis/api";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

    if (phone.trim() === "") {
      validationErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (password.trim() === "") {
      validationErrors.password = "Password is required";
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      validationErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
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

    const data = { firstName, lastName, email, phone, password };

    registerUserApi(data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.href = "/login";
        }
      })
      .catch(() => {
        toast.error("Registration failed");
      });
  };

  return (
    <div className="auth-container">
      <div className="left-side">
        <h2>Welcome to Memory Guardian</h2>
        <p>Connect with our doctors and staff</p>

        <img src="assets/images/logo.png" alt="Logo" className="logo" />
        <h1>Memory_Guardian</h1>
      </div>
      <div className="right-side">
        <div className="form-box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <i className="fas fa-user input-icon"></i>
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && (
                <p className="text-danger">{errors.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-user input-icon"></i>
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-envelope input-icon"></i>
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-phone input-icon"></i>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-lock input-icon"></i>
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-lock input-icon"></i>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}
            </div>
            <button>Register</button>
          </form>
          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
