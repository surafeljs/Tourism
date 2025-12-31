import React, { useState } from "react";
import axios from "axios";
export const FORGOT = () => {
    const [email,setEmail]=useState()
    const [data,setData]=useState()
    const handler=async(e)=>{
       e.preventDefault();

try {
 const res= await  axios.post("http://localhost:9000/forgote",{email},{withCredentials:true})
    if (res.data.status) {
        
        // setData(res.data.status)
        console.log(res.data.msg);
        

      }
} catch (error) {
  
}
    }
  return (
    <>
      <form onSubmit={handler}>
        <input type="email"name="email" placeholder="Enter your email"onChange={(e)=>setEmail(e.target.value)} />
        <button type="submit">Forgot Password</button>
      </form>
    </>
  );
};
