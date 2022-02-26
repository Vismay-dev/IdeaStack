import MainContent from "./Components/MainContent";
import NavBar from "./Components/NavMenu/NavBar"
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import userContext from './context/userContext'
import axios from "axios";

function App() {

  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    },3000)
  },[])

  const location = useLocation()

  const [user, setUser] = useState({
    firstName : '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    age: 0,
    city: '',
    school: '',
    interests:[],
    projects:[]
  })

  const logIn = (userInfo) => {
    setUser(userInfo)
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')!==null){
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getUser':'http://localhost:4000/api/user/getUser',
      {token: sessionStorage.getItem('token')}).then(res=> {
        setUser(res.data)
      })
  }
},[user])
 


  return (
    <userContext.Provider value = {{user:user, setUser:setUser}}>
    <div class = {` w-screen bg-gradient-to-r from-gray-200 to-blue-200 relative z-0 ${location.pathname === '/home' || loading ? 'h-screen':'h-max'}`}>
                {!loading?<>
                  <NavBar loginFunc = {logIn}/>
                  <MainContent class = "-z-10"/>
                  <Footer/></>:
                
                  <div class = 'relative mx-auto text-center justify-center align-middle top-1/2'>
                      <div class = 'bottom-10 relative'>
                    <RiseLoader color={"#368ED7"} loading={loading} size={35} margin={3}/>
                  </div>
                  </div>

                }
    </div>
    </userContext.Provider>
  );
}

export default App;
