import React, { useState } from "react";
import "../styles/signin.css";
import axios  from "axios";
import {   useNavigate } from 'react-router-dom'
import { Box,Link, Button, Container, Paper, TextField, Typography } from '@mui/material'
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
    <>
     <Container maxWidth="xs"  sx={{

      mt:10,
      mb:12
     }} >
<Paper  sx={{
  
  p:8
}}  elevation={3} >

<form onSubmit={handleSubmit}>
  <Typography sx={{
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    mb:5
  }} variant="h4">signin</Typography>
  <TextField required  type="email" fullWidth label="Email" name="email" onChange={(e)=>setEmail(e.target.value)}></TextField>
  <TextField sx={{
    mt:3,
    mb:2
  }} type="password" fullWidth label="Password" name="password" onChange={(e)=>setPassword(e.target.value)}></TextField>
   

  

  {errors.map((err, index) => (
  <div  key={index} style={{display:'flex',justifyContent:"center"}}>

    <Typography variant="caption"  style={{ color: "red" }}>
    {err.msg}
  </Typography>

  </div>
))}
  {success && (
  <Typography variant="caption" style={{ color: "green", marginBottom: "10px",display:'flex',justifyContent:"center" }}>
    {success}  </Typography>
 )}
<Button fullWidth variant="outlined" type="submit">{loading ? <Typography>Loading ...</Typography> : <Typography>Signin</Typography>}</Button>
<Typography  sx={{
  mt:2
}}  variant="caption" className="flex  justify-end  gap-1">Forgote  <Link href="/forgote">Forgote</Link></Typography>
  <Typography variant="caption" className="flex  justify-end gap-1 ">Don’t have an account? <Link href="/Create">Create</Link></Typography>
</form>


</Paper>
    </Container>
    
    
    </>

  );
};

export default Signin;
