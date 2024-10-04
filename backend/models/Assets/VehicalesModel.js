const mongoose = require('mongoose');

const schema = mongoose.Schema;

const VehicaleAssetsSchema = new schema({
    
    Vehicale_Number:{
        type : String,
        required: true
    },
    Vehicale_Type:{
        type : String,
        required: true
    },
    RecivedDate:{
        type : Date,
        required : true
    },
    LastMaintanceDate:{
        type: Date,
        required: true
    },
    ReserveStatues:{
        type: String,
        required: true
    },
    Descrption:{
        type: String,
        required: true
     }
})

const VehicaleAssets = mongoose.model("vehicales",VehicaleAssetsSchema);
module.exports = VehicaleAssets;