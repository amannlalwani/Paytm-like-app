import { useEffect, useState } from "react"
import Button from "./Button"
import Heading from "./Heading"
import axios from "axios"
import { useNavigate } from "react-router-dom";



function Users(){
 
    const[users,setUsers]=useState([]);
    const[filter,setFilter]=useState("");

    const navigate=useNavigate();
    
useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
        headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
    }).then(res=>{ setUsers(res.data.users)})
 },[filter])

    return <div>
        <div className="font-bold text-xl">Users</div>
        <input onChange={(e)=>{setFilter(e.target.value)}} className="text-black font-normal block border-solid border-2 border-[#a2a8b4] rounded py-1 w-full px-2 mt-1" type="text"  placeholder="Seacrh users..."/>
         <div className="mt-4">
        {users.map(user=>{
            return <div className="flex justify-between p-2"> 
            <div className="flex justify-between gap-2 items-center">
                <div className="flex items-center justify-center bg-blue-200 rounded-full h-10 w-10">{(user.firstName.slice(0,1)).toUpperCase()}</div>
                <div> {user.firstName} {user.lastName}</div>
            </div>
            <Button onClick={()=>{
             navigate("/send?id="+ user._id + "&name=" + user.firstName)
            }} btntext={"Send Money"}></Button>
            </div>
        })}
         
        </div>

    </div>
}


export default Users