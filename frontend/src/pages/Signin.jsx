import BottomWarning from '../components/BottomWarning'
import Button from '../components/Button'
import Heading from '../components/Heading'
import InputBox from '../components/InputBox'
import SubHeading from '../components/SubHeading'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

 function Signin({setIsLogged}){
    const[password,setPassword]=useState("");
    const[username,setUsername]=useState("");
    const navigate=useNavigate();


    return <div className="bg-slate-300 h-full w-full flex justify-center items-center">
        <div className="bg-white h-3/5 w-1/4 z-2 rounded-lg flex flex-col items-center gap-4" >
            
           <div className='px-5 p-2 text-center '> <Heading label="Sign In"></Heading> <SubHeading content={"Enter your credentials to access your account."}></SubHeading></div> 
           <div className='w-full px-6 flex flex-col gap-5'>
           <div > <InputBox  onChange={(e)=>{setUsername(e.target.value)}} type={"email"} placeholder={"johndoe@example.com"} label={"Email"} ></InputBox> </div>
           <div > <InputBox  onChange={(e)=>{setPassword(e.target.value)}} type={"password"} label={"Password"} ></InputBox> </div>
           <Button onClick={ async ()=>{
            const res= await  axios.post('http://localhost:3000/api/v1/user/signin',{
                username,
                password
            })
            localStorage.setItem("token",res.data.token)
            
            if(res.request.status==200){
                setIsLogged(true);
                navigate("/dashboard");
            }
            
           }} btntext={"Sign Up"} ></Button>
           <BottomWarning link={"/signup"} linkText={"Sign Up"} text={"Don't have an account?"}></BottomWarning>
           </div>
        </div>
    </div>
}

export default Signin