const express = require("express");
const app = express();
const PORT = 3000;
const Student = require("./model/Student");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const db = require("./db");
const { BatchType } = require("mongodb");

app.listen(PORT,()=>{
    console.log("Server started at PORT:",PORT)
})

app.get("/",async(req,res)=>{
    try{
        res.status(200).send("Welcome Student's");
    }catch(err){
        res.status(500).send("Something went error");
    }
})

//import router

const StudentRoutes = require("./routes/StudentRoutes");
const MenuRoutes = require("./routes/MenuRoutes");

app.use("/Menu",MenuRoutes);
app.use("/Student",StudentRoutes);
  