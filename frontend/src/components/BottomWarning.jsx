import { useNavigate } from "react-router-dom";



export default function BottomWarning({text,link,linkText}){
    const navigate=useNavigate();
    return <div className="text-black text-center">
       <span className="font-semibold">{text}</span>  <button className=" text-center underline decoration-black font-medium cursor-pointer" onClick={()=> {   navigate(link)}} >{linkText}</button>
    </div>
}