const express = require("express");
const { links } = require("express/lib/response");
const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
const mongoose = require("mongoose");
// const userModel = require("./models/user.model");
const userRoute = require('./routes/user.route');


app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB connected")
    })
  .catch((err) =>{
    console.log("DB connection error", err)
     });

     const port = process.env.PORT || 3000;

app.use('/user', userRoute);


app.listen(port, () => {
  console.log(`server started at ${port}`);
});
