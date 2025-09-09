require("dotenv").config();
console.log("DEBUG => URI =", process.env.URI);

const express = require("express");
const { links } = require("express/lib/response");
const app = express();
const ejs = require("ejs");
// const dotenv = require("dotenv");
app.set("view engine", "ejs");
const mongoose = require("mongoose");
const userRoute = require('./routes/user.route');
// dotenv.config();
const URI = process.env.URI



app.use(express.urlencoded({ extended: true }));


mongoose.connect(URI)
  .then(() => {
    console.log("MongoDB connected")
    })
  .catch((err) =>{
    console.log("DB connection error", err)
     });



let allUsers = [];


app.use('/user', userRoute);



const port = process.env.port || 3220;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
