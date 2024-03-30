import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './pages/Signup'
import Signin from './pages/Signin';
import Appbar from './components/Appbar'
import Balance from './components/Balance';
import Users from './components/Users';
import SendMoney from './pages/SendMoney';
import Dashboard from './pages/Dashboard';
import { useEffect ,useState} from 'react';
import axios from 'axios';


function App() {

  const[isLogged,setIsLogged]=useState(false);
    useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user",{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
    }).then(res=>{
        if(res.request.status==200){
          setIsLogged(true);
        }
    })
    },[])

  return <div className='h-screen'>


     <BrowserRouter>
     <Routes>
     <Route path='/' element={isLogged?<Dashboard ></Dashboard>:<Signin setIsLogged={setIsLogged}></Signin>}>
     </Route>
     <Route path='/signup' element={isLogged?<Dashboard ></Dashboard>:<Signup setIsLogged={setIsLogged} ></Signup>}>
     </Route>
    <Route path='/signin' element={isLogged?<Dashboard ></Dashboard>:<Signin setIsLogged={setIsLogged}></Signin>}>
    </Route>
   <Route path='/dashboard' element={isLogged?<Dashboard ></Dashboard>:<Signin setIsLogged={setIsLogged}></Signin>}>
    </Route>
    <Route path='/send' element={isLogged?<SendMoney ></SendMoney>:<Signin setIsLogged={setIsLogged}></Signin>}>
   </Route>
    

  </Routes>
    </BrowserRouter>
   </div>
}

export default App
