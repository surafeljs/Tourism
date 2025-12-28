const express = require('express')
const router = require('./router')
const app =express()
app.use(router)

require('dotenv').config()
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`http://hocalhost/${PORT}`);
})