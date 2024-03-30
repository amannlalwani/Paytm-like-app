const express=require("express");
const jwt=require("jsonwebtoken");
const zod=require("zod");
const {User, Account}=require("../db");

const JWT_SECRET = require("../config");
const mongoose=require("mongoose");

const { authMiddleware } = require("../middleware");

const userSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(8),
    firstName:zod.string(),
    lastName:zod.string()
})

const updateSchema=zod.object({
    password:zod.string().min(8),
    firstName:zod.string(),
    lastName:zod.string()
})


const userRouter=express.Router();

userRouter.get("/",authMiddleware,async (req,res)=>{
    const userId=req.userId;
    
    const user=await User.findOne({_id:userId});

    res.json({
        user
    })

})


userRouter.post("/signup",async (req,res)=>{
  
    const body=req.body;
    const username=req.body.username;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;

    const existingUser=await User.findOne({username});

    
    if(existingUser){
        return res.status(411).json({
            
                message: "Username already taken "
            
        })
    }
   
    if(  !(userSchema.safeParse(body).success) ){
        return res.status(411).json({
            
            message: " Incorrect inputs"
        
    })
    }



    const user=await User.create({firstName,lastName,username,password});    
    const userId=user._id;
    
   const account=await Account.create({
    userId,
    amount:(Math.random()*10000 + 1)
   })

   console.log(JWT_SECRET);

   const token = jwt.sign({
    userId
}, JWT_SECRET);



    res.status(200).json({
        message: "User created successfully",
        token:token
    })

})

userRouter.post("/signin",async (req,res)=>{

    const username=req.body.username;
    const password=req.body.password;

    console.log(req.body);
    const user=await User.findOne({username});

    console.log(user);
    if((!user) || (user.password != password)){
      return res.status(411).json({
        message: "Error while logging in"
    })
    }
   
    const userId=user._id;

    const token =jwt.sign({userId:userId},JWT_SECRET);


    res.status(200).json({
         token
    })
})


userRouter.put("/",authMiddleware, async function(req,res){
 const body=req.body;
 const userId=req.userId;
 if(!(updateSchema.safeParse(body).success)){
    return res.status(411).json({
        message:"Error while updating information"
    })
 }
 else{

    const user=await User.findByIdAndUpdate(userId,body);
    if(!user){
       return  res.status(411).json({
            message:"Error while updating information"
        })
    }

    return res.status(200).json({
        message: "Updated successfully"
    })
 }
})


userRouter.get("/bulk",authMiddleware,async function (req,res){
    const filter=req.query.filter || "";
    
    const users=await User.find({
        $or:[{
        firstName:{
            $regex:filter
        }},{
        
            lastName:{
                $regex:filter
            }

        }

        ]
})

const userId=req.userId;
    



const finalUsers=users.filter(user=>{return user._id!=userId});

res.status(200).json({
    users:finalUsers.map(user=>({
  username:user.username,
  firstName:user.firstName,
  lastName:user.lastName,
  _id:user._id
}))
})

})

module.exports=userRouter;