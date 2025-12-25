import React, { useState } from "react";
import "../styles/Create.css";

const Create = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",

    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your signup logic here (API call, validation, etc.)
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>First Name</label>
        <input
          type="text"
          name="username"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

<label>Last Name</label>
        <input
          type="text"
          name="username"
          value={formData.lastname}
          onChange={handleChange}
          required
        />

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

  <span>Allready account created? <a href="/signin">Sign In</a></span>
  <br />
  <br />
</p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Create;
