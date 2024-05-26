import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/api";
const Login = () => {
  // make ausestate for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // make a error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  var validate = () => {
    var isValid = true;

    // validate the first name

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
  // make a function to handel thge form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    // make a object of the data

    const data = {
      email: email,
      password: password,
    };
    // Api request

    loginUserApi(data).then((res) => {
      // Received data : success, message
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        // success-bool, message-text, token-text, user-data -json object ako xa data

        // setting token and  userdata in local storage

        localStorage.setItem("token", res.data.token);

        // setting the user data
        const convertedData = JSON.stringify(res.data.userData);

        // local storage set

        localStorage.setItem("user", convertedData);
        window.location.href = "/Homepage";
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email">Email Address: {email}</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={handleEmail}
                required
                aria-describedby="emailHelp"
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password: {password}</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                placeholder="Enter password"
                onChange={handlePassword}
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="btn btn-danger btn-block w-50 mt-5"
              onClick={handleSubmit}
            >
              Login{" "}
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="/assets/images/logo.png"
            alt="Login"
            className="img-fluid"
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
