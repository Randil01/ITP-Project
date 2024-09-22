const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./routes/feedbackRouter');

app.use(cors()); //cors origin unblocking(cross origine resoures sharing)

app.use(express.json());

const uri =  'mongodb+srv://thenularandila2002:thenula20021101@itp.6nx69.mongodb.net/Assets_db?retryWrites=true&w=majority&appName=ITP';

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('connected to mongoDB');
    } catch (error) {
        console.log('mongoDB error: ',error);
        
    }
};

connect();

//call back function
const server = app.listen(port,host, () => {
    console.log(`Node server is listing to ${server.address().port}`) //check actually working sever?
    
});

app.use('/api',router);