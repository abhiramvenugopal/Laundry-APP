const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const middleware=require("../util/middleware")
const productModel=require("../model/product")


router.use("/",middleware)

router.get('/products',async function(req,res){
    try{

        let products=await productModel.find({})
        res.status(200).json({status:"success",products})
        console.log(products)
    
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
})

module.exports=router