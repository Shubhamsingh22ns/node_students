const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Appetizers", "Main Courses", "Desserts", "Drinks"]
    },
    description: {
        type: String
    }
});

// Create a model based on the menu item schema
const Menu = mongoose.model('Menu', menuItemSchema);
module.exports = Menu;
