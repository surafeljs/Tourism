import React, { useState } from "react";
import "../styles/signin.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in data:", formData);
    // Add your sign-in logic here (API call, validation, etc.)
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
<p className="signin-links">
  <a href="/forgot-password">Forgot Password?</a>
  <br />
  <span>Don’t have an account? <a href="/Create">Create</a></span>
</p><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Signin;
