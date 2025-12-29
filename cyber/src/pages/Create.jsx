import React, { useState, useEffect } from "react";
import "../styles/Create.css";
import axios from "axios";
import {useNavigate}from 'react-router-dom'
const Create = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const[error,seterrors]=useState([])
const[success,setsucces]=useState([])
const[loading,setloading]=useState(false)

const navigate=useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true)

      const res = await axios.post(
        "http://localhost:9000/create_Account",
        { firstname, lastname, email, password },
        { withCredentials: true }
      );
if (res.data.status) {
  setsucces(res.data.result)
  seterrors([])
  // navigate('/')
  window.location.href = '/';

}

    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
  setsucces([])

    seterrors(err.response.data.errors);
      } else {
        console.error(err.message);
      }
    }finally{
      setloading(false)
    }
  };

  return (
    <div className="signup-container">


      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>First Name</label>
        <input
          type="text"
          name="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}

        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
        
 {error.map((err, index) => (
  <div  key={index} style={{display:'flex',justifyContent:"center"}}>

    <p  style={{ color: "red" }}>
    {err.msg}
  </p>

  </div>
))}

{success && (
  <p style={{ color: "green", marginBottom: "10px",display:'flex',justifyContent:"center" }}>
    {success}
  </p>
)}

        <p className="signin-links">
          <span>
            Already have an account? <a href="/signin">Sign In</a>
          </span>
        </p><br />
        <button  type="submit">{loading ? <p>Loading ...</p>: <p>Sign Up</p>}</button>

      </form>
    </div>
  );
};

export default Create;
