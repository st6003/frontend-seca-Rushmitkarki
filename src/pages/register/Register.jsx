import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/api";

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

  var validate = () => {
    var isValid = true;

    // validate the first name
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("EMail is required");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and Confirm password doesn't match");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate
    var isValidated = validate();
    if (!isValidated) {
      return;
    }

    // console.log(firstName, lastName, email, password, confirmPassword);

    // sendging request to api from api.js

    // Making the json object
    // haveto  same form backend
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerUserApi(data).then((res) => {
      // Received data : success, message
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });

    // const data = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   password: password,
    // };
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Register Now.. </h2>
          <form >
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your firstName"
                value={firstName}
                onChange={handleFirstName}
                required
              />
              {firstNameError && (
                <p className="text-danger">{firstNameError}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your lastName"
                value={lastName}
                onChange={handleLastName}
                required
              />
              {lastNameError && <p className="text-danger">{lastNameError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmail}
                aria-describedby="emailHelp"
                required
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={handlePassword}
                required
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder=" Confirm your Password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                required
              />
              {confirmPasswordError && (
                <p className="text-danger">{confirmPasswordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="/assets/images/logo.png"
            alt="Register"
            className="img-fluid"
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
