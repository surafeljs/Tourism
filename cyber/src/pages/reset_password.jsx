import React, { useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
export const RESET = () => {
    const [password,setPassword]=useState()
const[comfirm,setComfirmPassword]=useState()
const {id}=useParams()

    const [data,setData]=useState()

    const handler=async(e)=>{
       e.preventDefault();

try {
 const res= await  axios.post(`http://localhost:9000/reset_password/${id}`,{password},{withCredentials:true})
    if (res.data.status) {
        
        // setData(res.data.status)
        console.log(res.data.msg);
        

      }
} catch (error) {
 if (error.response) {
  console.log(error.response.data.errors);
} else {
  console.log(error.message);
}
  
}
    }
  return (
    <>
      <form onSubmit={handler}>
        <input  type="password"name="password" placeholder="New password"onChange={(e)=>setPassword(e.target.value)} />
        <input type="password"name="password" placeholder=" comfirm"onChange={(e)=>setComfirmPassword(e.target.value)} />


        <button type="submit">Reset</button>
      </form>
    </>
  );
};
