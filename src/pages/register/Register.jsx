import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/api";
import "./Register.css";
import "./AuthStyles.css";

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
      phone,
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
    <div className="register-container">
      <div className="left-side">
        <h2>Welcome to the Memory Guardian</h2>
        <p>Connect with our doctors and users</p>
        <div className="illustration">
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
        <div className="company-name">Memory Guardian</div>
      </div>
      <div className="right-side">
        <h2>Register</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="separator">||</span>
                First name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="separator">||</span>
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <span className="separator">||</span>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <span className="separator">||</span>
                Phone
              </label>
              <input
                type="number"
                id="phone"
                value={phone}
                placeholder="Number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <span className="separator">||</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="form-label">
              <label htmlFor="confirmPassword">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <span className="separator">||</span>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
