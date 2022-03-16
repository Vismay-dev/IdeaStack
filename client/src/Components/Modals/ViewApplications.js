import { useEffect, useRef, useContext, useState } from "react";
import AOS from 'aos';
import "aos/dist/aos.css";
import projectContext from "../../context/projectContext";
import axios from 'axios'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const ViewApplications = (props) => {
    useEffect(() => {
        AOS.init({
          duration : 1000
        });
      }, []);
    
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

      const projCon = useContext(projectContext);
      const [applications, setApplications] = useState()
      const [applicants, setApplicants] = useState([])
      const [questions, setQuestions] = useState([])
      useEffect(()=> {
        let applicantsTemp = [];
        for(let k = 0; k<projCon.projects.length;k++) {
            if(projCon.projects[k]._id === sessionStorage.getItem('managing')){
                setApplications(projCon.projects[k].joinRequests)
                setQuestions(projCon.projects[k].application)
                for(let x = 0; x<projCon.projects[k].joinRequests.length;x++) {
                    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getProjUser':'http://localhost:4000/api/project/getProjUser',
                    {token:sessionStorage.getItem('token'),id:projCon.projects[k].joinRequests[x].id}).then(res=> {     
                     applicantsTemp.push(res.data)
                    }).catch(err=> {
                    console.log(err.response)
                  })
                }
            }
        }
        setApplicants(applicantsTemp)
      },[])





    return (
        <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay, show/hide based on modal state. */}
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
          {/* This element is to trick the browser into centering the modal contents. */}
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
          
            {/* Modal panel, show/hide based on modal state. */}
      
          <div ref = {myRef} data-aos={"fade-up"}  data-aos-once='true' class="pr-6 inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle w-10/12">
            <div  class="bg-white px-4 pt-2 pb-2 sm:p-6 sm:pb-4">
             
    
            <div className="bg-white shadow relative left-2  sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">View Applications</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Please review applications as well as applicant profiles before including them in your team.</p>
      </div>




      </div>


      <h3 class = 'text-center left-2 relative text-gray-700 mt-5 text-2xl font-semibold'>Applications Received ({applications&&applications.length})</h3>
    
    
    <div class = 'relative left-2 w-full bg-gradient-to-br my-3 mt-4 rounded-md p-3 pb-16 shadow-md from-blue-50 to-indigo-200'>

 <div class="relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">

{applications && applicants && applicants.map((app,i) => {
return (

<div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0" data-carousel-item="active">
<div class = ' mb-6 space-y-1  text-center text-md mt-4 relative'>
<h3 class = 'text-center uppercase text-blue-700 font-semibold text-sm relative mb-9'>Application No. {i+1}</h3>

<img class="object-cover w-20 h-20 mx-auto relative mb-12 bottom-4  z-40 rounded-full sm:block" src={app.profilePic?app.profilePic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>

<h3><strong>Applicant Name</strong> : {applicants? app.firstName + ' ' + app.lastName :''}</h3>
<h3><strong>School</strong> : {applicants?app.school:''} </h3>
<h3><strong>Age</strong> : {applicants?app.age:''}</h3>
<h3><strong>Profile</strong> : </h3>
</div>

{questions.map(q=> {


    return (
        <>
            <h3 class = 'text-gray-600 mb-1 font-semibold text-lg text-center'>{q}</h3>
            <h3 class = 'text-gray-800 text-md text-center'>{applications[i][String(q)]}</h3>
        </>
    )

})}

</div>)



})}





</div>

<div class = 'relative mx-auto text-center mb-4 align-middle justify-center block '>

<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 absolute left-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 absolute right-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>


</div>
               
            




</div>












    </div>
    
    
    
    
    
    
    
    
    
    
    
    
              <div class="sm:flex sm:items-center">
      
            <div class="bg-gray-50 px-3 mt-4 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
            
              <button onClick = {props.close} type="button" class="-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
                Close
              </button>
              
            </div>
          </div>
        </div>
      </div>
    
      </div>
    
    
    
    
    )
}

export default ViewApplications