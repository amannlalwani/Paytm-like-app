import { useNavigate, useSearchParams } from "react-router-dom"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import { useState } from "react";
import axios from "axios";


function SendMoney(){
   const [amount,setAmount]=useState(0); 
   const [seachParams]=useSearchParams();
   const id=seachParams.get("id");
   const name=seachParams.get("name");
   const navigate=useNavigate();

    return <div className="bg-[#7f7f7f] h-full w-full flex justify-center items-center">
        <div className="bg-white h-3/5 w-1/4 z-2 rounded-lg flex flex-col items-center justify-around " >
            
           <div className='px-5 p-2 text-center '> <Heading label="Send Money"></Heading></div> 
           

             <div className='w-full px-6 flex flex-col gap-5'>

           <div className="flex  gap-2 items-center font-bold"><div className="flex items-center justify-center bg-green-300 rounded-full h-10 w-10">{name[0].toUpperCase()}</div>
                <div> {name}</div></div>     
           <div > <InputBox onChange={(e)=>{setAmount(e.target.value)}} type={"number"} placeholder={"Enter amount"} label={"Amount (in Rs)"} ></InputBox> </div>
           <button onClick={ async ()=>{
            const res=await axios.post("http://localhost:3000/api/v1/account/transfer",{"to":id,"amount":amount},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
                }
            })
            
            if(res.request.status==200){
              navigate("/dashboard");
            }
            
           }} className=" w-full font-semibold  text-white bg-green-400 hover:bg-green-600 focus:outline-none rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Initial Transfer</button>

           </div>
         
           
        </div>
    </div>
}


export default SendMoney