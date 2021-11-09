const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const userModel= require("../model/user")
const bcrypt=require('bcrypt')
const jwt =require("jsonwebtoken");
const middleware=require("../util/middleware")

router.use("/newaddress",middleware)

router.post('/signin',(req,res)=>{
    const {username,password}=req.body
    console.log(req.body)
    if(!username || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    userModel.findOne({ $or: [{ email:username }, { phone: username }] })
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"user not found"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token =jwt.sign({data:savedUser._id},process.env.JWT_SECRET)
                res.json({status:"success",token:token,user:{name:savedUser.name,email:savedUser.email,phone:savedUser.phone,address:savedUser.address}})
            }
            else{
                return res.status(422).json({error:"password is wrong"})
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/register",async function(req,res){
    let reqObject={...req.body}
    console.log(reqObject)
    try {
        bcrypt.hash(reqObject.password, 10,async function(err, hash) {
            if(err){
                res.status(500).json({status:"Encryption failed"})
            }
            reqObject.password=hash
            await userModel.create(reqObject)
            res.status(200).json({
                status:"success",
                message:"register success"
            })
            
        });
    } catch (error) {
        res.status(500).json({status:"failed"})
        console.log("error",error)
        
    }
    
    
})
router.post("/newaddress",async function(req,res){
    let reqObject={...req.body}
    console.log(reqObject)
    try {
        userModel.updateOne({_id:req.user},{$push:{address:reqObject}}).then(
            (response)=>{
                userModel.findOne({_id:req.user}).then(
                    (respo)=>{
                        res.status(200).json({status:"success",address:respo.address})
                    }
                )
                
            },
            (err)=>{
                res.status(500).json({
                    status:"failed",
                    message:err
                })
            }
        )  
    } catch (error) {
        res.status(500).json({status:"failed"})
        console.log("error",error)
        
    }
    
    
})
module.exports=router