const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const middleware=require("../util/middleware")
const orderModel=require("../model/order")
const counterModel=require("../model/counter")

 router.use("/",middleware)

router.post('/cancel',async function(req,res){
    try{
        orderModel.updateOne({_id:req.body.id,user:req.user},{$set:{active:false}}).then(
            (response)=>{
                res.status(200).json({status:"success",response})
            },
            (err)=>{
                res.status(500).json({
                    status:"failed",
                    message:err
                })
            }
        )        
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
    
    
})

router.post('/create',async function(req,res){
    try{
        let count
        await counterModel.updateOne({id:"counter"},{$inc:{count:1}})
        counterModel.findOne({}).then(
            async (response)=>{
                count=response.count
                const data={...req.body,user:req.user,dateTime:new Date(),orderId:("ORD"+count)}
                let order=await orderModel.create(data)
                res.status(200).json({status:"success",order})
            },
            (err)=>{
                res.status(500).json({
                    status:"failed",
                    message:err
                })
            }
        )
        

        
    
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