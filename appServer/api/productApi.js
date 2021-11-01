const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const middleware=require("../util/middleware")


router.use("/",middleware)


module.exports=router