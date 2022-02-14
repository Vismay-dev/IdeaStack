import MainContent from "./Components/MainContent";
import NavBar from "./Components/NavMenu/NavBar"
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader"


function App() {

  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    },4000)
  },[])
 


  return (
    <div class = ' w-screen bg-gradient-to-r from-gray-200 to-blue-200 relative z-0 h-screen'>
                {!loading?<>
                  <NavBar/>
                  <MainContent class = "-z-10"/>
                  <Footer/></>:
                
                  <div class = 'relative mx-auto text-center justify-center align-middle top-1/2'>
                      <div class = 'bottom-10 relative'>
                    <RiseLoader color={"#368ED7"} loading={loading} size={35} margin={3}/>
                  </div>
                  </div>

                }
    </div>
  );
}

export default App;
