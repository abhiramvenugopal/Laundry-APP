const express=require("express");
const mongoose=require("mongoose");
const app=express();
const userApi=require("./api/userApi")
const productApi=require("./api/productApi")
const orderApi=require("./api/orderApi")
var bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api/v1/user",userApi);
app.use("/api/v1/product",productApi);
app.use("/api/v1/order",orderApi);



app.listen(process.env.PORT,()=>{
    console.log("server started at port : " +process.env.PORT)
})
