const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");


async function registerUser(req, res){

 const {username , email , password } = req.body 

 // check if user already exists 

 const isAlreadyRegistered = await userModel.findOne({
   $or:[
     {username: req.body.username}
         ,{email: req.body.email}
   ]
 });

 if(isAlreadyRegistered){
    return res.status(400).json({
      message: "user with this name and email already registered"}
   )
 }

 // hash password 


 const salt = await bcrypt.genSalt(10)

 const hashedPassword = await bcrypt.hash(password, salt);

 // create new user 

 const user = await userModel.create({
    username,
    email,
    password: hashedPassword
 })

 // create token 

 const token = jwt.sign({
    id: user._id,
    email:user.email
 },
 process.env.JWT_SECRET,{
   expiresIn: "3d"
 }
)

//save token 

res.cookie("token",token)


 res.status(201).json(
   {
      message: 'user registered successfully',
      user:{
         id: user._id,
         username: user.username,
         email: user.email
      }

   })

}


async function loginUser(req, res){

  const { username, email , password } = req.body 

   const user = await userModel.findOne({
      $or:[
         {username: req.body.username},
         {email: req.body.email}
   ]
   }).select("+password");


   if (!user) {
      return res.status(400).json({
         message: "Invalid credentials"
      })
   }

  const isPasswordValid =  await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
   return res.status(400).json({
      message: "Invalid credentials"
   })
  }

 const token =  jwt.sign({
   id: user._id,
   username: user.username
  },
  process.env.JWT_SECRET,
  {
   expiresIn: "3d"
  })

  
  res.cookie("token", token )

 return res.status(200).json({
   message: "user logged in successfully",
   user:{
      id:user._id,
      username: user.username,
      email: user.email
   }
  })

}


async function getUser(req,res){

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
      message: "User ferched succesfully ",
      user
    })
}

async function logoutUser(req,res){
  
   const token = req.cookies.token

   res.clearCookie("token")

   await redis.set(token,Date.now().toString())
   
   res.status(400).json({
      message: "logout sucessfully"
   })

}

module.exports = {registerUser, loginUser, getUser, logoutUser}