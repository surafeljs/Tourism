import React, { useState } from "react";
import "../styles/signin.css";
import axios  from "axios";
import { useNavigate } from 'react-router-dom'

const Signin = ({Token,setToken}) => {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
const[errors,seterrors]=useState([])
const[success,setsucces]=useState([])
const[loading,setloading]=useState(false)
const navigate=useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault();

try {
      setloading(true)
  const res = await axios.post(
        "http://localhost:9000/login",
        {  email, password },
        { withCredentials: true }
      );

      if (res.data.status) {
        
        
        seterrors([])
         window.location.href = '/';


      }
} catch (error) {
  if (error.response) {
    setsucces([])
    seterrors(error.response.data.errors)
        console.error("Backend error:", error.response.data.errors);
    
  }else{
    console.log(error.message);
    
  }
}finally{
  setloading(false)
}
   
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          disabled={loading}
          required
       onChange={(e)=>setEmail(e.target.value)}
        
       
        />

        <label>Password</label>
        <input
        disabled={loading}
          type="password"
          name="password"
       onChange={(e)=>setPassword(e.target.value)}
      
        />
 {errors.map((err, index) => (
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
  
  
  <span>Don’t have an account? <a href="/Create">Create</a></span>
</p><br />
        <button  type="submit">{loading ? <p>Loading ...</p>: <p>login</p>}</button>

      </form>
    </div>
  );
};

export default Signin;
