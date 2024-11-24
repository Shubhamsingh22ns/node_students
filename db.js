const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/Student";

mongoose.connect(URL);

const db = mongoose.connection;

db.on("connection",()=>{
    console.log("Coneected");
})

module.exports = db;