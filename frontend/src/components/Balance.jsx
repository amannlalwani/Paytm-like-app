import axios from "axios";
import { useState ,useEffect} from "react"

function Balance(){
    const[balance,setBalance]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>{ setBalance(res.data.balance)})
     },[])

    return <div className="font-bold">
    Your Balance Rs {balance.toFixed(2)}
    </div>
}


export default Balance