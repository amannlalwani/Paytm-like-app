const JWT_SECRET = require("./config");
const jwt=require("jsonwebtoken");


function authMiddleware(req,res,next){
const tempToken=req.headers.authorization;
const token=tempToken.slice(7);

try{
const {userId}=jwt.verify(token,JWT_SECRET);

if(userId){
    req.userId=userId;
    next();
}
else{
    res.status(403).json({
        message:"Invalid Token"
    })
}}
catch{
    res.status(403).json({
        message:"Invalid Token"
    })
}

}


module.exports={authMiddleware}