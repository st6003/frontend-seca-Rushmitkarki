import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  forgotPasswordApi,
  loginUserApi,
  resetPasswordApi,
} from "../../apis/api";
import "./Auth.css"; // Use the same CSS file as the register component

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
          localStorage.setItem("user", JSON.stringify(res.data.user));

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
    <div className="auth-container">
      <div className="left-side">
        <h1> Memory_Guardian</h1>
        <p>-----------------------  </p>
        <img src="assets/images/logo.png" alt="Logo" className="logo" />
        <h2>Welcome to Memory Guardian</h2>
        <p>Connect with our doctors and staff</p>
        <p>-----------------------------------------</p>

      </div>
      <div className="right-side">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <i className="fas fa-envelope input-icon"></i>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmail}
                required
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-lock input-icon"></i>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePassword}
                required
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="auth-link">
             <button className="forgot-password-btn" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Forgot Password?</button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">Forgot Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {!isSentOtp ? (
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-phone input-icon"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="send-otp-btn">Send OTP</button>
                </form>
              ) : (
                <form onSubmit={handleReset}>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-key input-icon"></i>
                      OTP
                    </label>
                    <input
                      type="number"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-lock input-icon"></i>
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-lock input-icon"></i>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="reset-password-btn">Reset Password</button>
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
