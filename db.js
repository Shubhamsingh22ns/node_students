const mongoose = require("mongoose");

// Use your MongoDB connection string here
const URL = "mongodb+srv://shubhamsingh22ns:JDXwIQFTGw1NnGRz@cluster0.chzv2.mongodb.net/";

// Establish connection to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,  // Correct typo here
    useUnifiedTopology: true  // Keep this for compatibility with the new MongoDB driver
});

// Access the connection object
const db = mongoose.connection;

// Listen for successful connection
db.on("connected", () => {  // Use 'connected' event instead of 'connection'
    console.log("Connected to MongoDB");
});

// Handle any connection errors
db.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Optional: Listen for disconnection events
db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

module.exports = db;
