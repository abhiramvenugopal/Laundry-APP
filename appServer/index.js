const express=require("express");
const mongoose=require("mongoose");
const app=express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT,()=>{
    console.log("server started " +process.env.PORT)
})
