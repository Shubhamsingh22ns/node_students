const express = require("express");
const router = express.Router();
const Student = require("../model/Student");
const bodyParser = require("body-parser");

router.post("/",async(req,res)=>{
    try{
        const data = req.body;
        const newStudent = new Student(data);
        const response = await newStudent.save();
        console.log("Data saved..")
        res.status(200).json(response);
    }catch(err){
        console.log("Something went wroung...")
        res.status(500).json({error:"Something went wroung"});
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await Student.find();
        if (data.length === 0) {
        return res.status(200).json({ message: "No students found" });
      }
      res.status(200).json(data);
    } catch (err) {
      console.error("Error retrieving students:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

router.get("/:branch", async(req,res)=>{
    try{
        const branchtyp = req.params.branch;
        if(branchtyp == "CSE" || branchtyp == "ME" || branchtyp == "ECE" ){
            const data = await Student.find({branch:branchtyp});
            res.status(200).json(data);
        }
        else{
            res.status(500).json({error:"Invalid Branch"});
        }   
    }catch(err){
        res.status(500).json({error:"Something wen wroung while data featching"});
    }
  })
router.put("/:id",async(req,res)=>{
    try{
        const student_id = req.params.id;
        const updatedStudentData = req.body;

        const response = await Student.findByIdAndUpdate(student_id,updatedStudentData,{
            new:true,
            runValidators:true
        })

        if(!response){
            res.status(404).json({error:"Student not found"});
        }

        console.log("Data Updated Successfully...");
        res.status(200).json(response);

    }catch(err){
        console.log("Somthing wents wroung");
        res.status(500).json({error:"Somthing wents wroung"})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const student_id = req.params.id;
        const response = await Student.findByIdAndDelete(student_id);

        if(!response){
            res.status(404).json({error:"Student not found"});
        }

        console.log("Data Deleted Successfully...");
        return res.status(200).json({message:"Data Deleted Successfully.."});

    }catch(err){
        console.log("Somthing wents wroung");
        return res.status(500).json({error:"Somthing wents wroung"})
    }
})

module.exports = router;