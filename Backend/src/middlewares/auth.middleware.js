const blacklistModel = require('../models/blacklist.model')
const userModel = require('../models/user.model')
 const jwt = require("jsonwebtoken")
 const redis = require("../config/cache");
 


 async function authUser(req,res,next){
     
    const token = req.cookies.token

    if(!token){
       return res.status(401).json({
            message: "Token is not found "
        })
    }

    const isTokenBlackListed = await redis.get(token)

    if(isTokenBlackListed){
       return res.status(401).json({
            message: "Token invalid  "
        })
    }

 try{
     const decode = jwt.verify(token, process.env.JWT_SECRET)
     req.user = decode
     next()

 }
 catch(err){
    return res.status(401).json({
            message: "Token is not found "
        })
 }
}

module.exports = { authUser }