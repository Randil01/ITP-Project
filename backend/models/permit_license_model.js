const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
   

    permit_type:String,
    license_type:String,
    permit_plane:String,

    

},{
    timestamps:true

})

const itemmodel=mongoose.model("Permit_license",itemchema)
module.exports = itemmodel;