const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/noteOnCloud";

const ConnectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Successfully connected to MongoDB!");
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = ConnectToMongo;