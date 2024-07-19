import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi, forgotPasswordApi, resetPasswordApi } from "../../apis/api";
import "./Login.css";
import "./AuthStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSentOtp, setIsSentOtp] = useState(false);

  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      validationErrors.email = "Email is empty or invalid";
      isValid = false;
    }

    if (password.trim() === "") {
      validationErrors.password = "Password is required";
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

    const data = { email, password };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.href = res.data.userData.isAdmin ? "/admin/dashboard" : "/";
        }
      })
      .catch(() => {
        toast.error("Login failed");
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (phone.trim() === "") {
      toast.warning("Please enter phone number");
      return;
    }

    forgotPasswordApi({ phone })
      .then((res) => {
        toast.success(res.data.message);
        setIsSentOtp(true);
      })
      .catch((err) => {
        toast.error(err.response?.data.message || "Something went wrong");
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (resetPassword !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    resetPasswordApi({ phone, otp, password: resetPassword })
      .then(() => {
        toast.success("Password reset successfully");
      })
      .catch((err) => {
        toast.error(err.response?.data.message || "Reset failed");
      });
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <h2>Welcome to the Memory Guardian</h2>
        <p>Connect with our doctors and users</p>
        <div className="illustration">
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
        <div className="company-name">Memory Guardian</div>
      </div>
      <div className="right-side">
        <h2>Login</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
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
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <button
            className="forgot-password-btn"
            onClick={() => document.getElementById('forgotPasswordModal').style.display = 'block'}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div id="forgotPasswordModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => document.getElementById('forgotPasswordModal').style.display = 'none'}>&times;</span>
          <h2>Forgot Password</h2>
          {!isSentOtp ? (
            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label htmlFor="phone">
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  <span className="separator">||</span>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  placeholder="Enter phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="send-otp-btn">Send OTP</button>
            </form>
          ) : (
            <form onSubmit={handleReset}>
              <div className="form-group">
                <label htmlFor="otp">OTP</label>
                <input
                  type="number"
                  id="otp"
                  value={otp}
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="resetPassword">New Password</label>
                <input
                  type="password"
                  id="resetPassword"
                  value={resetPassword}
                  placeholder="Enter new password"
                  onChange={(e) => setResetPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm new password"
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
  );
};

export default Login;