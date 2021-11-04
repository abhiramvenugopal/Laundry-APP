const mongoose=require("mongoose")
const Schema=mongoose.Schema

const productSchema= new Schema([{
    productType : {type:String, required:true},
    description : {type:String, required:true},
    wash : {type:Number, required:true,default:20},
    press : {type:Number, required:true,default:15},
    fold : {type:Number, required:true,default:10},
    pack : {type:Number, required:true,default:25},
    // image: {type:String, required:true}
    
}])

const productModel=mongoose.model("products",productSchema)

module.exports=productModel
