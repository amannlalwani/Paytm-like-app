const express=require("express");
const {authMiddleware}=require("../middleware");
const { Account, User } = require("../db");
const zod=require("zod");
const { default: mongoose } = require("mongoose");
const accountRouter=express.Router();

accountRouter.get("/balance",authMiddleware ,async (req,res)=>{
const account=await Account.findOne({userId:req.userId});
console.log(account);
if(account){
    return res.status(200).json({
        balance:account.amount
    })
}

else{
   return res.status(411).json({
    message:"error"
  })
}

})


accountRouter.post("/transfer",authMiddleware ,async (req,res)=>{
  
    const transferSchema=zod.object({
        to:zod.string(),
        amount:zod.string(),
    })

   const session=await mongoose.startSession();

    await session.startTransaction();

    const body=req.body;
    
   const {success} = transferSchema.safeParse(body);
   if(!success){
    await session.abortTransaction();
    return res.status(400).json(
        {
            message: "Invalid credentials"
        }
    )
   }
   const amount=parseFloat(req.body.amount);

  const fromAccount=await Account.findOne({
    userId:req.userId
  });
  
  console.log(fromAccount);
  if(amount > fromAccount.amount){
    await session.abortTransaction();
    return res.status(400).json({
        message: "Insufficient balance"
       })
  }

  const toAccount=await Account.findOne({
    userId:req.body.to
  })


  if(!toAccount ){
   await session.abortTransaction(); 
   return res.status(400).json({
    message: "Invalid account"
   })
  }


  await Account.updateOne({userId:req.userId},{$inc:{amount:-amount}});
  await Account.updateOne({userId:req.body.to},{$inc:{amount:amount}});
  
  await session.commitTransaction();

  res.status(200).json({
    message:"Transfer successful"
  })
})



module.exports=accountRouter;