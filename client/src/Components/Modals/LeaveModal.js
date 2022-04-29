import AOS from 'aos';
import "aos/dist/aos.css"
import { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './logo.png'
import axios from 'axios'
import projectContext from '../../context/projectContext'
const ExitModal = (props) => {
    
    useEffect(() => {
        AOS.init({
          duration : 1000
        });
      }, []);

      const history = useHistory();

      const myRef = useRef()


useEffect(
  () => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!myRef.current || myRef.current.contains(event.target)) {
        return;
      }
      props.close();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },
  // Add ref and handler to effect dependencies
  // It's worth noting that because the passed-in handler is a new ...
  // ... function on every render that will cause this effect ...
  // ... callback/cleanup to run every render. It's not a big deal ...
  // ... but to optimize you can wrap handler in useCallback before ...
  // ... passing it into this hook.
  [myRef, () => props.close()]
);
  const projectsCon = useContext(projectContext)

    return (<div  class="fixed z-[100] inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div  class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      {/* This element is to trick the browser into centering the modal contents. */}
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
      
        {/* Modal panel, show/hide based on modal state. */}
  
      <div data-aos="fade-up" data-aos-once='true' class="pr-6 relative sm:top-2 top-12 inline-block align-bottom z-50 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 mb-36 sm:align-middle sm:max-w-lg sm:w-10/12 w-11/12">
        <div ref = {myRef} class="bg-white  px-1 pt-2 pb-2 sm:p-6 sm:pb-4 z-50">
          <div class="sm:flex sm:items-start">
            <div class=" text-center sm:mt-0 ml-4  sm:text-left">   
              <div>
                <p class="text-lg text-gray-500">
  
  
  {/* form starts here */}
                <div class="right-2 min-h-full flex items-center justify-center py-3 px-5 sm:px-6 lg:px-5">
    <div class="max-w-md w-full space-y-8">
      <div>
      <img class="mx-auto w-32 -mt-3 relative" src={logo} alt="Workflow"/>
        <h2 class="mt-1 bottom-3 relative mb-1 text-center sm:text-3xl text-2xl font-extrabold text-gray-900">
          {
              props.isRemoving?
              'Are you sure you want to remove this team-mate?':
          'Are you sure you want to leave your project team?'}
        </h2>

        {
            props.member && props.isRemoving?
            <div class = 'flex items-center my-5 mb-7 text-md justify-center'>
            <img class="hidden object-cover w-10 h-10 shadow-md mx-2 relative right-1 rounded-full sm:block" src={props.member.pic?props.member.pic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>
            <a class="font-bold text-gray-700 mr-6  relative cursor-pointer ">
                 {props.member?props.member.name:''}
            </a>
            </div>
            :''
        }
      </div>
          
  
       
  
        <div>
          <button onClick = {()=> {
              if(props.isRemoving){
                axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/removeMember':'http://localhost:4000/api/project/removeMember',{token:sessionStorage.getItem('token'), member:props.member ,projectID:sessionStorage.getItem('managing')}).then(res=> {
                    projectsCon.setProjects(res.data)
                     props.close()
                }).catch(err=> {
                        console.log(err)
                })
              }else {
                axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/leaveProject':'http://localhost:4000/api/project/leaveProject',{token:sessionStorage.getItem('token'), member:props.member ,projectID:sessionStorage.getItem('managing')}).then(res=> {
                    sessionStorage.removeItem('managing')
                    history.push('/myprojects')
                    props.close()
               }).catch(err=> {
                       console.log(err)
               })
               
              }
             
            }} class="mt-9 mb-6 bottom-1 hover:shadow-lg group relative sm:w-4/6 w-[136px] mx-auto font-semibold flex justify-center py-1 pb-1.5 px-1 border border-transparent text-md  rounded-md text-white bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
               
            </span>
            Yes, {props.isRemoving?'Remove':'Leave'}
          </button>
        </div>
    </div>
  </div>
  
  
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-100 px-4 py-3 ml-5 sm:px-6 sm:flex sm:flex-row-reverse">
          <button onClick = {props.close} type="button" class="mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>)
  }
  
export default ExitModal
