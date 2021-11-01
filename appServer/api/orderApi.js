const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const middleware=require("../util/middleware")
const orderModel=require("../model/order")

router.use("/",middleware)

router.post('/create',async function(req,res){
    try{

        const data={...req.body,user:req.user}
        let order=await orderModel.create(data)
        res.status(200).json({status:"success",order})
        console.log(data)
    
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
    
    
})

router.get('/orders',async function(req,res){
    try{

        let order=await orderModel.find({user:req.user})
        res.status(200).json({status:"success",order})
        console.log(order)
    
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
})

module.exports=router