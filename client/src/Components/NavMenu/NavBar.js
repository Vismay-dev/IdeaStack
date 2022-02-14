import {useState} from 'react'
import LogModal from '../Authentication/LogModal'
import RegModal from '../Authentication/RegModal';
import logo from './logo.png'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logModalShow, setLogModalShow] = useState(false)
  const [regModalShow, setRegModalShow] = useState(false)

  const closeFuncLog = () => {setLogModalShow(false)}
  const closeFuncReg = () => {setRegModalShow(false)}




  return (
   <div class = 'z-50'> 

              {
                logModalShow?
                <LogModal close = {closeFuncLog}/>
                 :''
              }
              {
                regModalShow?
                <RegModal close = {closeFuncReg}/>
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
            <img src = {logo} className="w-40 relative -mt-16 top-10 "/>
            
        </a>
        <ul class=" flex items-center space-x-16 py-8 top-0.5 relative  lg:flex xl:left-0 lg:left-44 lg:-right-4 -ml-4 hidden uppercase">
        <li>
            <a
              onClick={()=> {window.scrollTo({
                top:710,
                left:0,
                behavior:'smooth'
              })}}
              aria-label="About us"
              title="About us"
              class="font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              About us
            </a>
          </li>
          <li>
            <a
               onClick={()=> {window.scrollTo({
                top:1450,
                left:0,
                behavior:'smooth'
              })}}
              aria-label="Features"
              title="Features"
              class="font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              Features
            </a>
          </li>
          <li>
            <a
                onClick={()=> {window.scrollTo({
                  top:2100,
                  left:0,
                  behavior:'smooth'
                })}}
              aria-label="About us"
              title="About us"
              class="font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              Partners
            </a>
          </li>
          <li>
            <a
              
               onClick={()=> {window.scrollTo({
                 top:2800,
                 left:0,
                 behavior:'smooth'
               })}}
              aria-label="About us"
              title="About us"
              class=" mr-48 font-semibold tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
            >
              Contact
            </a>
          </li>

         
        </ul>
        {/* <ul class="flex items-center hidden space-x-6 lg:flex">
        <li class = "transform transition duration-300 hover:scale-110">
            <a
              href="#"
              class="inline-flex items-center justify-center h-11 px-5 hover:scale-110 text-lg font-medium tracking-wide text-white rounded shadow-md bg-blue-500 hover:bg-blue-600 hover:ring-4 hover:ring-white 
              focus:shadow-outline focus:outline-none"
              aria-label="Log In"
              title="Log In"
              onClick = {()=> {
                setLogModalShow(true)
              }}
            >
              Log In
            </a>
          </li>
          <li class = "transform transition duration-300 hover:scale-110">
            <a
              href="#"
              class="inline-flex items-center justify-center h-11 px-5 text-lg font-medium tracking-wide text-white rounded shadow-md bg-blue-500 hover:bg-blue-600 hover:ring-4 hover:ring-white
              focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
              onClick = {()=> {
                setRegModalShow(true)
              }}
            > 
              Sign up
            </a>
          </li>
        </ul> */}
        <div class="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-blue-500 focus:bg-blue-500"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg class="w-6 text-gray-600 sm:top-2" viewBox="0 0 24 24">
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
                </nav>
              </div>
            </div>
             
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default NavBar 
