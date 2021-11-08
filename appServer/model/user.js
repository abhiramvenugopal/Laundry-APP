const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema= new Schema({
    name : {type:String, required:true},
    email:{type:String, required:true,unique:true},
    phone :{type :String, required:true,unique:true},
    address: [
        {
            addressType:{type:String,default:"Home"},
            streetAddress :{type:String, required:true},
            state :{type:String, required:true},
            district :{type:String, required:true},
            pincode :{type:Number, required:true},
        }
    ],
    password:{type :String, required:true}
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel


    