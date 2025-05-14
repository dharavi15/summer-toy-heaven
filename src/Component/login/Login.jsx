import React, { useState } from "react";
import "./Login.css";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import Joi from "joi";
import useCartStore from "../../data/cartStore";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const setLoginStatus = useCartStore((state) => state.setLoginStatus);

  const schema = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "Username required"
    }),
    password: Joi.string().min(5).required().messages({
      "string.empty": "Password required",
      "string.min": "Password must have minimum 5 characters"
    })
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(credentials);
    if (error) {
      setError(error.details[0].message);
      setSuccess("");
      return;
    }

    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      setLoginStatus(true); // ✅ Zustand
      setError("");
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/menu");
      }, 1500);
    } else {
      setError("Wrong username or password.");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Requires Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Requires Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
