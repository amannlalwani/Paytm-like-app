import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";



function Dashboard (){
    const[user,setUser]=useState({});
    useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user",{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
    }).then(res=>{
        setUser(res.data.user)
    })
    },[])

    return <div className="p-4 flex flex-col gap-5">
       <div> <Appbar firstName={user.firstName} ></Appbar> </div>
       <div> <Balance></Balance>  </div>
       <div><Users></Users>
    </div></div> 
}

export default Dashboard