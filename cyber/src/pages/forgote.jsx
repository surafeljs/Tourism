import React, { useState } from "react";
<<<<<<< HEAD
import {   useNavigate } from 'react-router-dom'
import { Box,Link, Button, Container, Paper, TextField, Typography, Alert } from '@mui/material'
import {} from '@mui/icons-material'
import axios from "axios";
export const FORGOT = () => {
    const [email,setEmail]=useState("")
    const [error,setErrors]=useState([])
    const [success,setSuccess]=useState()
    const[loading,setLoading]=useState(false)

=======
import axios from "axios";
export const FORGOT = () => {
    const [email,setEmail]=useState()
    const [data,setData]=useState()
>>>>>>> e42d0562989b330980cb860c232d7c0f1a37e1f7
    const handler=async(e)=>{
       e.preventDefault();

try {
<<<<<<< HEAD
  setLoading(true)
 const res= await  axios.post("http://localhost:9000/forgote",{email},{withCredentials:true})
    if (res.data.status) {
        setSuccess( res.data.msg || "Password reset email sent successfully!")
        setErrors([])

=======
 const res= await  axios.post("http://localhost:9000/forgote",{email},{withCredentials:true})
    if (res.data.status) {
        
        // setData(res.data.status)
        console.log(res.data.msg);
>>>>>>> e42d0562989b330980cb860c232d7c0f1a37e1f7
        

      }
} catch (error) {
<<<<<<< HEAD
        setErrors(error.response.data.errors)
  setSuccess("")

}finally{
  setLoading(false)
=======
  
>>>>>>> e42d0562989b330980cb860c232d7c0f1a37e1f7
}
    }
  return (
    <>
<<<<<<< HEAD
           <Container maxWidth="xs"  sx={{
         
      mt:8,
      mb:10
           }} >
      <Paper  sx={{
           borderRadius:2,
        px:5,
        py:12
      }}  elevation={3} >
      
      <form onSubmit={handler}>
        <Typography   sx={{
          fontStyle:'normal',
          fontWeight:"bold",
          display:"flex",
          justifyContent:'center',
          alignItems:'center',
        }} variant="h4">Forgote</Typography>
        <TextField  disabled={loading} size="small" sx={{
          mt:3,
          mb:2
        }} type="email" fullWidth label="Email"autoFocus name="email" onChange={(e)=>setEmail(e.target.value)}></TextField>
         
      {
        error.map((err,index)=>(
<div key={index}>
           <Alert severity="error" variant="standard"    onClose={() => setErrors([])}>{err.msg}</Alert>

  
</div>
        ))
      }
  {success && (
                            <Alert 
                                severity="success" 
                                variant="outlined"
                                sx={{ mb: 2 }}
                                onClose={() => setSuccess("")}
                            >
                                {success}
                            </Alert>
                        )}
      <Button disabled={loading}  sx={{mt:2}} size="medium" fullWidth variant="outlined" type="submit">{loading ? <Typography>Loading . . .</Typography>:<Typography>send email</Typography>}</Button>
      
      </form>
      
      
      </Paper>
          </Container>
=======
      <form onSubmit={handler}>
        <input type="email"name="email" placeholder="Enter your email"onChange={(e)=>setEmail(e.target.value)} />
        <button type="submit">Forgot Password</button>
      </form>
>>>>>>> e42d0562989b330980cb860c232d7c0f1a37e1f7
    </>
  );
};
