import MainContent from "./Components/MainContent";
import NavBar from "./Components/NavMenu/NavBar"
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import ClockLoader from "react-spinners/ClipLoader"
import { CircleLoader } from "react-awesome-loaders";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import userContext from './context/userContext'
import projectContext from "./context/projectContext";
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

const [projects, setProjects] = useState(user.projects)



useEffect(()=> {
  if(sessionStorage.getItem('token')!==null){
    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getUserProjects':'http://localhost:4000/api/user/getUserProjects',
    {token: sessionStorage.getItem('token')}).then(res=> {
      setProjects(res.data)
    })
  }
},[user.projects, location.pathname])
 


  return (
    <projectContext.Provider value={{projects:projects, setProjects:setProjects}}>
    <userContext.Provider value = {{user:user, setUser:setUser}}>
    <div class = {` w-screen bg-gradient-to-r from-gray-200 to-blue-200 relative z-0 ${location.pathname === '/home' || loading ? 'h-screen':' max-h-full'}` }>
                {!loading?<>
                  <NavBar loginFunc = {logIn}/>
                  <MainContent class = "-z-10"/>
                  <Footer/></>:
                
                      <div 
      class = ' w-[317px]  m-0 relative mx-auto top-[50%] translate-y-[-50%]  pl-1.5'>
                      

                      <CircleLoader
        meshColor={"#6366F1"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"90px"}
        mobileSize={"64px"}
      />
             
                  </div>

                }
    </div>
    </userContext.Provider>
    </projectContext.Provider>
  );
}

export default App;
