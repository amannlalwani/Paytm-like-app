function Appbar({firstName}){
let initial="U";
if(firstName)    
{initial=firstName.slice(0,1);}

return <div className="flex items-baseline border-b-2 p-1 font-semibold justify-between " >
<div>Paytm-like-app</div> 
<div className="flex justify-between items-center gap-3 mr-5"> <div className="" >Hello, {firstName}</div> <div className="flex items-center justify-center bg-blue-200 rounded-full h-10  w-10">{initial.toUpperCase()}</div>  </div>
</div>


}


export default Appbar