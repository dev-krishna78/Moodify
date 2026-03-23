const mongoose = require("mongoose");

 const userSchema =  new mongoose.Schema({
     username:{
        type:String,
        required: [true,"Username is required"],
        unique: [true, "User name must be unique "]
     },
     email:{
        type:String,
        required: [true,"email is required"],
        unique: [true,"Email must be unique"]
     },
     password:{
        type: String,
        required: [true, "Password is required"],
        select: false
     }
 })

 const userModel = mongoose.model("users",userSchema)

 module.exports = userModel