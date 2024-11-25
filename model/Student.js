const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true,
        enum: ["CSE", "ECE", "ME"]
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;