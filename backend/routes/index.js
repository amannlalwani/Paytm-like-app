const express=require("express");
const userRouter=require("./userRouter");
const accountRouter = require("./accountrouter");

const rootRouter=express.Router();

rootRouter.use("/user",userRouter);
rootRouter.use("/account",accountRouter);


module.exports=rootRouter;