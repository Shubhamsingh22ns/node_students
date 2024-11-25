const express = require("express");
const app = express();
const PORT = 3000;
const Student = require("./model/Student");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const db = require("./db");
const { BatchType } = require("mongodb");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.listen(PORT,()=>{
    console.log("Server started at PORT:",PORT)
})

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
    next(); // move to the next phase
};

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    //Authentication Logic
    try{
        console.log("Credential Recive ", USERNAME, password);
        const user = await Student.find({username: USERNAME});
        if(!user){
            return done(null, false, {message: "Incorrect User"});
        }
        const isMatchPass = user.password == password ? true : false;
        if(isMatchPass){
            return done(null, user)
        }
        else{
            return done(null, false, {message: "Incorrect Password"});
        }

    }catch(err){
       return done(err);
    }
}))

//app.use(logRequest); // use for all the route


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get("/", localAuthMiddleware, function (req,res){
    res.send("Welcome Students...!");
})


//import router

const StudentRoutes = require("./routes/StudentRoutes");
const MenuRoutes = require("./routes/MenuRoutes");

app.use("/Menu",MenuRoutes);
app.use("/Student",StudentRoutes);
  