const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
   
    Last_garbage:String,
    rouly_garbage:String,
    vehcile:String,
    autoselect:String,
    

},{
    timestamps:true

})

const itemmodel=mongoose.model("Products",itemchema)
module.exports = itemmodel;