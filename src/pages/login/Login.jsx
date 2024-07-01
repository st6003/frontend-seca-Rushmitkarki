import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  forgotPasswordApi,
  loginUserApi,
  resetPasswordApi,
} from "../../apis/api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSentOtp, setIsSentOtp] = useState(false);

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

          const convertedUser = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedUser);

          if (res.data.userData.isAdmin) {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/";
          }
        }
      })
      .catch((error) => {
        toast.error("Login failed");
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (resetPassword !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    resetPasswordApi({ phone: phone, otp: otp, password: resetPassword })
      .then(() => {
        toast.success("Password reset successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (phone.trim() === "") {
      toast.warning("Please enter phone number");
      return;
    }

    forgotPasswordApi({ phone: phone })
      .then((res) => {
        toast.success(res.data.message);
        setIsSentOtp(true);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          console.log(err);
          toast.error("Something went wrong");
        }
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
                    Email Address:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleEmail}
                    required
                  />
                  {emailError && <p className="text-danger">{emailError}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={handlePassword}
                    required
                  />
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
                <div className="text-center mt-3">
                  <button
                    className="btn btn-link"
                    data-bs-toggle="modal"
                    data-bs-target="#forgotPasswordModal"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">
                Forgot Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!isSentOtp ? (
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleReset}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">
                      OTP:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="resetPassword" className="form-label">
                      New Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="resetPassword"
                      placeholder="Enter new password"
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Reset Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;