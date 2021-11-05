const mongoose=require("mongoose")
const Schema=mongoose.Schema

const counter= new Schema([{
    id:{type:String,unique:true,required:true},
    count:{type:Number}    
}])

const counterModel=mongoose.model("counter",counter)

module.exports=counterModel
