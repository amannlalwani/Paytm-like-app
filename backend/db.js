const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.bxthaho.mongodb.net/paytm_like_app");


const userSchema= new mongoose.Schema({
    firstName:String,
    lastName:String ,
    username:String,
    password:String
})


const User = new mongoose.model("User",userSchema);


const accountSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    amount: Number    
 })
 
 const Account=new mongoose.model('Account',accountSchema);

module.exports = {User,Account}