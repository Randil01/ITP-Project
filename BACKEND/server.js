//import api's
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

//port access to host
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connection sucessfull");
})

//acesss to vehicle.js
//localhost:8070/vehicles
const vehicleRouter = require("./routes/Assets/Vehicales.js");
app.use("/Vehicles",vehicleRouter);

const assetsRouter = require("./routes/Assets/publicAssets.js")
app.use("/publicAssets",assetsRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port no:${PORT}`);
    console.log('Routes set up');
})