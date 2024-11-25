const express = require("express");
const router = express.Router();
const Menu = require("../model/Menu");
const bodyParser = require("body-parser");

// Get all menu items
router.get("/", async (req, res) => {
    try {
        const data = await Menu.find();
        if (!data) {
            return res.status(404).json({ error: "No record found" });
        }
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

// Get a single menu item by ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Menu.findById(id);
        if (!response) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

// Add a new menu item
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        return res.status(201).json(response); // Returning the saved data
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

// Delete a menu item by ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Menu.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        return res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

// Update a menu item by ID
router.put("/:id", async (req, res) => { // Add :id in the route
    try {
        const id = req.params.id;
        const updateData = req.body;

        const response = await Menu.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        if (!response) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
