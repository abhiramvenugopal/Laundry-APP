const mongoose=require("mongoose")
const Schema=mongoose.Schema

const orderSchema= new Schema({
    orderid : {type:String, required:true},
    status : [
        {
            statusCode: {type:String, required:true},
		    date: {type:Date, required:true},
        }
    ],
    products : [
        {
            name : {type:String, required:true},
            quantitiy : {type:Number, required:true},
            washTypes : [ {type:String, required:true} ],
            price : {type:Number, required:true}
        }
    ],
    subtotal : {type:Number, required:true},
    pickupCharge : {type:Number, required:true},
    total : {type:Number, required:true},
    dateTime : {type:Date, required:true},
    deliveryAddress : {
        streetAddress :{type:String, required:true},
        state : {type:String, required:true},
        district : {type:String, required:true},
        pincode : {type:Number, required:true},
    },
    storeAddress : {
        location: {type:String, required:true},
        address : {type:String, required:true},
        phone : {type:Number, required:true},
        district : {type:String, required:true,default:"banglore"},
        state : {type:String, required:true,default:"karnataka"},
    }
    
})

const orderModel=mongoose.model("orders",orderSchema)

module.exports=orderModel