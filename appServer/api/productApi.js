const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const middleware=require("../util/middleware")
const productModel=require("../model/product");

// productModel.collection.insertMany([
//     {
//         productType :"Shirt",
//         description : "abcdefghijklmnopqrstu",
//         wash : 20,
//         press : 15,
//         fold : 10,
//         pack : 25,

//     },
//     {
//         productType :"T Shirt",
//         description : "abcdefghijklmnopqrstu",
//         wash : 20,
//         press : 15,
//         fold : 10,
//         pack : 25,
        
        
//     },
//     {
//         productType :"Trousers",
//         description : "abcdefghijklmnopqrstu",
//         wash : 20,
//         press : 15,
//         fold : 10,
//         pack : 25,
        
        
//     },
//     {
//         productType :"Jeans",
//         description : "abcdefghijklmnopqrstu",
//         wash : 20,
//         press : 15,
//         fold : 10,
//         pack : 25,
        
        
//     },
//     {
//         productType :"Boxers",
//         description : "abcdefghijklmnopqrstu",
//         wash : 20,
//         press : 15,
//         fold : 10,
//         pack : 25,
        
//     },
//     {
//         productType :"Joggers",
//         description : "abcdefghijklmnopqrstu",
//         wash : 20,
//         press : 15,
//         fold : 10,
//         pack : 25,
        
        
//     },
//     {
//         productType :"Others",
//         description : "abcdefghijklmnopqrstu",
//         wash : 20,
//         press : 15,
//         fold : 10,
//         pack : 25,
        
//     },
// ]).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });

// router.use("/",middleware)

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