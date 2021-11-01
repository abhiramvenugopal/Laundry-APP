const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const userModel= require("../model/user")
const bcrypt=require('bcrypt')
const jwt =require("jsonwebtoken");


router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    userModel.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"please add email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                res.json({message:"successfully sign in"})
                const token =jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"please add email or password"})
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/register",async function(req,res){
    let reqObject={...req.body}
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
module.exports=router