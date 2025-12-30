import React, { useState } from "react";
import {   useNavigate } from 'react-router-dom'
import { Box,Link, Button, Container, Paper, TextField, Typography, Alert } from '@mui/material'
import {} from '@mui/icons-material'
import axios from "axios";
export const FORGOT = () => {
    const [email,setEmail]=useState()
    const [error,setErrors]=useState([])
    const [success,setSuccess]=useState()
    const[loading,setLoading]=useState(false)

    const handler=async(e)=>{
       e.preventDefault();

try {
  setLoading(true)
 const res= await  axios.post("http://localhost:9000/forgote",{email},{withCredentials:true})
    if (res.data.status) {
        setErrors(null)
        setSuccess(res.data.msg)
        console.log(res.data.msg);
        

      }
} catch (error) {
  setSuccess(null)
        setErrors(error.response.data.errors)
}finally{
  setLoading(false)
}
    }
  return (
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
           <Alert severity="error" variant="standard">{err.msg}</Alert>

  
</div>
        ))
      }
     {success && <Alert severity="success" variant="standard">{success}</Alert>}
      <Button disabled={loading}  sx={{mt:2}} size="medium" fullWidth variant="outlined" type="submit">{loading ? <Typography>Loading . . .</Typography>:<Typography>send email</Typography>}</Button>
      
      </form>
      
      
      </Paper>
          </Container>
    </>
  );
};
