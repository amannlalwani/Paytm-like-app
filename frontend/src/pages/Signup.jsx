import { useNavigate } from 'react-router-dom'
import BottomWarning from '../components/BottomWarning'
import Button from '../components/Button'
import Heading from '../components/Heading'
import InputBox from '../components/InputBox'
import SubHeading from '../components/SubHeading'
import { useState } from 'react'
import axios from 'axios'

 function Signup({setIsLogged}){

    const[firstName,setfirstName]=useState("");
    const[lastName,setlastName]=useState("");
    const[password,setPassword]=useState("");
    const[username,setUsername]=useState("");
    const navigate=useNavigate();

    return <div className="bg-slate-300 h-full w-full flex justify-center items-center">
        <div className="bg-white h-5/6 w-1/4 z-2 rounded-lg flex flex-col items-center gap-4" >
            
           <div className='px-5 p-2 text-center '> <Heading label="Sign Up"></Heading> <SubHeading content={"Enter your information to create an account."}></SubHeading></div> 
           <div className='w-full px-6 flex flex-col gap-5'>
           <div > <InputBox onChange={(e)=>{setfirstName(e.target.value)}} type={"text"} placeholder={"John"} label={"First Name"} ></InputBox> </div>
           <div > <InputBox onChange={(e)=>{setlastName(e.target.value)}} type={"text"} placeholder={"Doe"} label={"Last Name"} ></InputBox> </div>
           <div > <InputBox onChange={(e)=>{setUsername(e.target.value)}} type={"email"} placeholder={"johndoe@example.com"} label={"Email"} ></InputBox> </div>
           <div > <InputBox onChange={(e)=>{setPassword(e.target.value)}} type={"password"} label={"Password"} ></InputBox> </div>
           <Button onClick={ async ()=>{
            const res= await  axios.post('http://localhost:3000/api/v1/user/signup',{
                firstName,
                lastName,
                username,
                password
            })
            localStorage.setItem("token",res.data.token)
            
            if(res.request.status==200){
                setIsLogged(true);
                navigate("/dashboard");
            }
            
           }} btntext={"Sign Up"} ></Button>
           <BottomWarning link={"/signin"} linkText={"Login"} text={"Already have an account?"}></BottomWarning>
           </div>
        </div>
    </div>
}

export default Signup