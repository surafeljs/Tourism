import React, { useState } from "react";
import "../styles/signin.css";
import axios  from "axios";
<<<<<<< HEAD
import {   useNavigate } from 'react-router-dom'
import { Box,Link, Button, Container, Paper, TextField, Typography, Alert,  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions, } from '@mui/material'
import {} from '@mui/icons-material'
const Signin = () => {
  const [email, setEmail] = useState();
const [open, setOpen] = useState(false);

=======
import { useNavigate } from 'react-router-dom'

const Signin = ({Token,setToken}) => {
  const [email, setEmail] = useState();
>>>>>>> e42d0562989b330980cb860c232d7c0f1a37e1f7

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
<<<<<<< HEAD
    <>



     <Container maxWidth="xs"  sx={{
mt:8,
mb:10
     }} >
<Paper  sx={{
     borderRadius:2,
  px:5,
  py:12
}}  elevation={3} >

<form onSubmit={handleSubmit}>
  <Typography   sx={{
    fontStyle:'normal',
    fontWeight:"bold",
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    mb:5
  }} variant="h4">Login</Typography>
  <TextField disabled={loading} size="small" required  type="email" autoFocus fullWidth label="Email" name="email" onChange={(e)=>setEmail(e.target.value)}></TextField>
  <TextField disabled={loading} size="small" sx={{
    mt:3,
    mb:0.5
  }} type="password" fullWidth label="Password" name="password" onChange={(e)=>setPassword(e.target.value)}></TextField>
   

  

  {errors.map((err, index) => (
  <div  key={index} style={{display:'flex',justifyContent:"center" ,marginTop:8}}>

    <Alert severity="error" variant="standard" onClose={()=>seterrors([])} >
    {err.msg}
  </Alert>

  </div>
))}
 
<Button sx={{mt:2}} disabled={loading} size="medium" fullWidth variant="outlined" type="submit">{loading ? <Typography >Loading ...</Typography> : <Typography>Signin</Typography>}</Button>

</form>
 {success && (
  <Typography  variant="standard" style={{ color: "green", marginBottom: "10px",display:'flex',justifyContent:"center" }}>
    {success}  </Typography>
 )}
 <Typography sx={{fontSize:11, mt:2 ,textDecoration:'none'}} variant="caption" className="flex  justify-end  gap-1 items-center">Forgote  <Link href="/forgote" >forgote</Link></Typography>
  <Typography sx={{
  mb:1,

  fontSize:11 ,textDecoration:'none'
}}   variant="caption" className="flex  justify-end gap-1 ">Don’t have an account? <Link  sx={{}} href="/Create">Create</Link></Typography>

</Paper>
    </Container>
    
    
    </>

=======
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
  
  <span>forgote <a href="/forgote">forgote</a></span>
  <span>Don’t have an account? <a href="/Create">Create</a></span>
</p><br />
        <button  type="submit">{loading ? <p>Loading ...</p>: <p>login</p>}</button>

      </form>
    </div>
>>>>>>> e42d0562989b330980cb860c232d7c0f1a37e1f7
  );
};

export default Signin;
