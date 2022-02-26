import {useState, useRef, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import LogModal from '../Modals/LogModal'
import RegModal from '../Modals/RegModal';
import ExitModal from '../Modals/ExitModal';
import SideModal from '../Modals/SideModal';

import logo from './logo.png'


import AOS from 'aos';
import "aos/dist/aos.css";



const NavBar = (props) => {
  useEffect(() => {
    AOS.init({
      duration : 650
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [logModalShow, setLogModalShow] = useState(false)
  const [regModalShow, setRegModalShow] = useState(false)
  const [exitModalShow, setExitModalShow] = useState(false)


  const closeFuncLog = () => {setLogModalShow(false)}
  const closeFuncReg = () => {setRegModalShow(false)}
  const closeFuncOut = () => {setExitModalShow(false)}
  const closeFuncSide = () => {setIsSideMenuOpen(false)}


  const history = useHistory()

  const showModalLog = ()=> {
      setLogModalShow(true);}
  const showModalReg = ()=> {
      setRegModalShow(true);}
      const showModalOut = ()=> {
        setExitModalShow(true);}
   
      
    

      const location = useLocation();
      const [pathParams, setPathParams] = useState()
      useEffect(()=> {
          const pathParamArr = [...location.pathname.split('/')]
          pathParamArr.shift()
          setPathParams(pathParamArr)
      },[pathParams, location.pathname])


      // const closeFuncAbout = () => {setAboutModalShow(false)}
      // const closeFuncContact = () => {setContactModalShow(false)}

      const buttonRef1 = useRef();
      const buttonRef2 = useRef();





  return (
   <div class = 'z-50'> 

              {
                logModalShow?
                <LogModal close = {closeFuncLog} logFunc = {props.loginFunc}/>
                 :''
              }
              {
                regModalShow?
                <RegModal close = {closeFuncReg}/>
                 :''
              }
               {
                exitModalShow?
                <ExitModal close = {closeFuncOut}/>
                 :''
              }

                {
                isSideMenuOpen?
                <SideModal close = {closeFuncSide}/>
                 :''
              }



    <div class="mx-auto w-screen lg:px-20 md:px-32 px-10 shadow-lg bg-white relative ">
      <div class="relative flex items-center justify-between">
        <a
          href="/"
          aria-label="Company"
          title="Company"
          class="inline-flex items-center"
        >
            <img data-aos={"fade-left"} data-aos-once='true' src = {logo} className="w-40 -left-10 relative -mt-16 top-10 "/>
            
        </a>
        {sessionStorage.getItem('token')===null?
        <ul class="items-center space-x-10 py-8 top-0.5 relative  lg:flex left-8 hidden uppercase">
        <li data-aos={"fade-left"} data-aos-once='true'>
            <a
            
              href='#about'
              aria-label="About us"
              title="About us"
              class="font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              About us
            </a>
          </li>
          <li data-aos={"fade-left"} data-aos-once='true' data-aos-delay='200'>
            <a
                           href='#features'

              aria-label="Features"
              title="Features"
              class="font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              Features
            </a>
          </li>
          <li data-aos={"fade-left"} data-aos-once='true' data-aos-delay='400'>
            <a
                href='#partners'
              aria-label="About us"
              title="About us"
              class="font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              Partners
            </a>
          </li>
          <li data-aos={"fade-left"} data-aos-once='true' data-aos-delay='600'>
            <a
              
               href='#contact'
              aria-label="About us"
              title="About us"
              class=" mr-20 font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              Contact
            </a>
          </li> 
        </ul>
        :
        <nav class="flex" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 ml-5 md:space-x-3">


    <li class="inline-flex items-center">
      <a class="inline-flex items-center text-md font-medium text-gray-700 hover:text-gray-900 ">
        <svg class="relative w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
      </a>
    </li>

    {
        pathParams&&pathParams.map((pathParam, i)=> {

          const param = pathParam.charAt(0).toUpperCase() + pathParam.slice(1)
          const isLastParam = i === pathParams.length-1?true:false
          return(

            <li>
              <div class="flex items-center">
                <svg class="w-7 h-7 mt-0.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <a class={`ml-1 top-0.5 text-md font-medium ${isLastParam?'text-gray-900':'text-gray-500'} md:ml-2`}>{param}</a>
              </div>
            </li>)
        })
    }
    


  </ol>
</nav>
        }
        <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0 left-6 mt-1 ml-1 relative">
            {sessionStorage.getItem('token')===null?<>
            <a  href="#" onClick = {showModalLog} className="uppercase whitespace-nowrap text-md tracking-wide font-semibold text-gray-700 hover:text-gray-900">
              Sign in
            </a>
            <a 
            onClick = {showModalReg}
              href="#"
              className="uppercase ml-5 whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-md tracking-wide font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-indigo-400 hover:to-indigo-600 active:bg-blue-500"
            >
              Sign up
            </a></>:<>
            <a
              onClick={()=> {
                showModalOut()
              }}
              className="ml-5 whitespace-nowrap inline-flex uppercase items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-md  font-semibold hover:cursor-pointer  text-white bg-gradient-to-r from-blue-300 to-blue-500 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-500"
            >
            Log Out
            </a>
             <button
             aria-label="Open Menu"
             title="Open Menu"
             class="py-0.5 px-1.5 ml-5 mr-2 relative left-3 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:from-blue-200 hover:to-indigo-300 hover:bg-gradient-to-r"
             onClick={() => setIsSideMenuOpen(true)}
           >
             <svg class="w-9 text-gray-600 sm:top-2" viewBox="0 0 24 24">
               <path
                 fill="currentColor"
                 d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
               />
               <path
                 fill="currentColor"
                 d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
               />
               <path
                 fill="currentColor"
                 d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
               />
             </svg>
           </button>
           </>
          }</div>
       
       
       
       {sessionStorage.getItem('token')===null?
       <div class="lg:hidden">
       <button
         aria-label="Open Menu"
         title="Open Menu"
         class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:from-blue-200 hover:to-indigo-300 hover:bg-gradient-to-r focus:bg-blue-400"
         onClick={() => setIsMenuOpen(true)}
       >
         <svg class="w-7 text-gray-600 sm:top-2" viewBox="0 0 24 24">
           <path
             fill="currentColor"
             d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
           />
           <path
             fill="currentColor"
             d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
           />
           <path
             fill="currentColor"
             d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
           />
         </svg>
       </button>
       {isMenuOpen && (
         <div class="absolute top-0 z-50 w-screen md:-left-32 sm:-left-10 -left-10">
           <div class="p-5 bg-white border rounded shadow-xl z-50">
             <div class="flex items-center justify-between mb-4">
               <div>
                 <a
                   href="/"
                   aria-label="Company"
                   title="Company"
                   class="inline-flex items-center mb-5"
                 >
                
                   <img src = {logo} className="w-40 md:w-48 absolute -mt-16 top-9 sm:visible invisible "/>

                 </a>
               </div>
               <div>
                 <button
                   aria-label="Close Menu"
                   title="Close Menu"
                   class="p-2 -mr-2 bottom-6 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline -mt-10 mb-3"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   <svg class="w-6 text-gray-600 bottom-1" viewBox="0 0 24 24">
                     <path
                       fill="currentColor"
                       d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                     />
                   </svg>
                 </button>
               </div>
             </div>
             <nav>
               
               <ul class="space-y-4 relative bottom-6 sm:bottom-2">
               <li class = "text-center">
                   <a
                     onClick={()=> {
                       setIsMenuOpen(false)
                       window.scrollTo({
                       top:710,
                       left:0,
                       behavior:'smooth'
                     })}}
                     aria-label="About us"
                     title="About us"
                     class="hover:cursor-pointer font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500"
                   >
                     About us
                   </a>
                 </li>
                 <li class = "text-center">
                   <a
                        onClick={()=> {
                         setIsMenuOpen(false)
                          window.scrollTo({
                         top:1450,
                         left:0,
                         behavior:'smooth'
                       })}}
                     aria-label="Our product"
                     title="Our product"
                     class="hover:cursor-pointer font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500"
                   >
                     Features
                   </a>
                 </li>
                 <li class = "text-center">
                   <a
                     onClick={()=> {
                       setIsMenuOpen(false)
                       window.scrollTo({
                       top:2100,
                       left:0,
                       behavior:'smooth'
                     })}}
                     aria-label="Product pricing"
                     title="Product pricing"
                     class="hover:cursor-pointer font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500"
                   >
                     Partners
                   </a>
                 </li>
                 <li class = "text-center">
                   <a
                      onClick={()=> {
                       setIsMenuOpen(false)
                        window.scrollTo({
                       top:2800,
                       left:0,
                       behavior:'smooth'
                     })}}
                     aria-label="Product pricing"
                     title="Product pricing"
                     class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
                   >
                     Contact
                   </a>
                 </li>
               
                 
               </ul>
               <div className="align-middle justify-items-center justify-center mt-8 mb-2 mx-auto relative">
         {sessionStorage.getItem('token')===null?<div class = 'relative mx-auto w-fit'>
         <a  href="#" onClick = {()=> {
           setIsMenuOpen(false)
           showModalLog()}} className="uppercase items-center justify-center px-3 mr-3 py-2 border border-transparent rounded-sm shadow-lg text-lg tracking-wide font-semibold text-white bg-blue-600 hover:bg-blue-700">
           Sign in
         </a>
         <a 
         onClick = {() => {setIsMenuOpen(false); showModalReg()}}
           href="#"
           className="uppercase items-center justify-center px-3 py-2 border border-transparent rounded-sm shadow-lg text-lg tracking-wide font-semibold text-white bg-blue-600 hover:bg-blue-700"
         >
           Sign up
         </a></div>:
         <div  class = 'relative mx-auto w-fit'>
         <a
           onClick={()=> {
             setIsMenuOpen(false)
             sessionStorage.removeItem('token')
             history.push('/home')
           }}
           className="whitespace-nowrap bottom-1 relative uppercase items-center justify-center px-3 py-2 border border-transparent rounded-sm shadow-sm text-lg  font-semibold hover:cursor-pointer  text-white bg-blue-600 hover:bg-blue-700"
         >
         Log Out
         </a>
        </div>
       }</div>
             </nav>
           </div>
         </div>
          
       )}
     </div>
      :
      <div>


      </div>
      } 
      </div>
    </div>
    </div>
  );
};

export default NavBar 
