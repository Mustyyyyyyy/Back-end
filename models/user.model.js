const mongoose = require("mongoose");

let usersSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true
     },
    email: {
        type: String,
        required: true,
        unique: true,
        unique: [true, "Email already exists"],
    },
    password: { 
        type: String, 
        required: true
     },
});

module.exports = mongoose.model("Users", usersSchema);
