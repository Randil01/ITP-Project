const mongoose = require('mongoose');

const schema = mongoose.Schema;

const publicAssestSchme = new schema({

    Assets_Type:{
        type : String,
        required: true
    },
    RecivedDate:{
        type : Date,
        required: true
    },
    ReserveStatues:{
        type : String,
        required: true
    },
    RecivaedTimePeriod:{
        type : Date,
        required: true
    },
    maintanceCost:{
        type : String,
        required: true
    },
    Description:{
        type : String,
        required: true
    },
})

const publicAssets = mongoose.model("publicAssets",publicAssestSchme);
module.exports = publicAssets;