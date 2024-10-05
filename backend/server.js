// Importing necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// Port configuration
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI
const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection successful");
});

// Feedback Router
const feedbackRouter = require('./routes/feedbackRouter');
app.use('/api', feedbackRouter);

// Access to vehicle.js
const vehicleRouter = require("./routes/Assets/Vehicales.js");
app.use("/Vehicles", vehicleRouter);

// Access to publicAssets.js
const assetsRouter = require("./routes/Assets/publicAssets.js");
app.use("/publicAssets", assetsRouter);

// Employee Router
const employeeRouter = require("./routes/Employee.js");
app.use("/employee", employeeRouter);

// Salary Router
const salaryRouter = require("./routes/Salary.js");
app.use("/salary", salaryRouter);

// Post Routes
const postRoutes = require('./routes/route');
app.use(postRoutes);

// Emergency Services Router
const emergencyRouter = require('./routes/emergencyRoutes');  // <-- New line added
app.use('/api', emergencyRouter);  // <-- New line added

// Vanuja
const itemRoutes = require("./routes/itemroutes");
app.use("/", itemRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log('Routes set up');
});
