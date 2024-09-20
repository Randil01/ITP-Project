//import api's
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const employeeRouter = require("./routes/Employee.js");
const salaryRouter = require("./routes/Salary.js");

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL;
const connection = mongoose.connection;
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.once("open",()=>{
    console.log("MongoDB connection successful !!");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port no:${PORT}`);
})


app.use("/employee",employeeRouter);
app.use("/salary",salaryRouter);
