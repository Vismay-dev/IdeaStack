import { useEffect, useRef, useContext, useState } from "react";
import AOS from 'aos';
import {useLocation} from 'react-router-dom'
import "aos/dist/aos.css";
import projectContext from "../../context/projectContext";
import axios from 'axios'
import {BsChevronDown, BsChevronUp } from 'react-icons/bs'
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

    const location = useLocation()

      const projCon = useContext(projectContext);
      const [applications, setApplications] = useState()
      const [applicants, setApplicants] = useState([])

      const [showContact, setShowContact] = useState(false)
      const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
      const [showRejectConfirm, setShowRejectConfirm] = useState(false);
      const [addedNewMember, setAddedNewMember] = useState(false);
      const [rejectedMember, setRejectedMember] = useState(false);

      const [change, setChange] = useState(false)

      useEffect(()=> {
        let applicantsTemp = [];
        for(let k = 0; k<projCon.projects.length;k++) {
            if(projCon.projects[k]._id === sessionStorage.getItem('managing')){
                setApplications(projCon.projects[k].joinRequests)
                for(let x = 0; x<projCon.projects[k].joinRequests.length;x++) {
                    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getProjUser':'http://localhost:4000/api/project/getProjUser',
                    {token:sessionStorage.getItem('token'),id:projCon.projects[k].joinRequests[x].id}).then(res=> {     
                     console.log(res.data)
                      applicantsTemp.push(res.data)
                      setApplicants(applicantsTemp)
                      
                    }).catch(err=> {
                    console.log(err.response)
                  })
                }
            }
        }
        console.log(applicants)
        
      },[change, location.pathname])


      const acceptApplicant = (app) => {
        
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/acceptApp':'http://localhost:4000/api/project/acceptApp',
        {token:sessionStorage.getItem('token'),application : app}).then(res=> {     
          setAddedNewMember(true);
          setChange(!change)
          setTimeout(()=> {
            setApplications(res.data)
            setAddedNewMember(false)
          },4500)
        }).catch(err=> {
        console.log(err.response)
       })
      
      }

      const rejectApplicant = (app) => {
        setChange(!change)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/rejectApp':'http://localhost:4000/api/project/rejectApp',
        {token:sessionStorage.getItem('token'),application : app}).then(res=> {     
          setRejectedMember(true);
          setChange(!change)
          setTimeout(()=> {
            setApplications(res.data)
            setRejectedMember(false)
          },4500)
        }).catch(err=> {
        console.log(err.response)
       })
      }





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


      <h3 class = 'text-center left-2 relative text-gray-700 mt-[1.35rem] text-2xl font-semibold'>Applications Pending ({applications&&applications.length})</h3>
    
    

    {!addedNewMember && !rejectedMember && applications && applications.length===0?
    
    <h1 class = 'text-center my-11 font-semibold text-3xl'>No <span class = 'text-orange-400'>Applications</span> Pending</h1>
    
    :
    <>
    
    <div class = 'relative left-2 w-full h-max bg-gradient-to-br my-3 mt-4 rounded-md p-3 pb-8 shadow-md from-blue-50 to-indigo-200'>

 <div class="relative rounded-lg">

{
addedNewMember?

<h3 class = 'text-center font-semibold text-3xl my-7 mt-10'>Succesfully <span class = 'text-blue-500'>Added</span> a Team Member...</h3>




:
rejectedMember?

<h3 class = 'text-center font-semibold text-3xl my-7 mt-10'>Rejecting the <span class = 'text-orange-600'>Applicant</span></h3>
:


applications && applicants && applicants.map((app,i) => {
return (

<div key = {i}>
<div class = ' mb-9 space-y-1  text-center text-md mt-2 top-4 relative'>
<h3 class = 'text-center uppercase text-blue-700 font-semibold text-sm relative bottom-2.5 mb-8'>Application No. {i+1}</h3>

<img class="object-cover w-24 shadow-md   h-24 mx-auto relative mb-[60px] mt-2 bottom-5  z-40 rounded-full sm:block" src={app.profilePic?app.profilePic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>

<h3 class = 'text-sm'><strong>Applicant Name</strong> : {applicants? app.firstName + ' ' + app.lastName :''}</h3>
<h3 class = 'text-sm'><strong>School</strong> : {applicants?app.school:''} </h3>
<h3 class = 'text-sm'><strong>Age</strong> : {applicants?app.age:''}</h3>
<h3 class = 'text-sm' ><strong>Profile</strong> : </h3>
</div>
{applications && applications[i].appStatus === 'Not Decided'?
<>
{Object.keys(applications[i]).filter(key=>key!=='id'&&key!=='projID'&&key!=='appStatus').map((q,ind)=> {


    return (
        <div key = {ind}>
            <h3 class = 'text-gray-500 mb-1 mt-5 font-semibold text-sm text-center'>{q}</h3>
            <h3 class = 'text-gray-800 text-sm text-center'>{applications[i][String(q)]}</h3>
        </div>
    )

})}

<button class = 'relative mx-auto justify-center block  text-center top-2.5 mt-5 bg-gradient-to-r rounded-md shadow-md hover:shadow-lg active:shadow-sm from-gray-400 to-gray-600 p-4 text-white text-sm  font-semibold py-1.5' onClick={()=> setShowContact(!showContact)}>Contact (Recommended before Acceptance){showContact?<BsChevronUp class = 'relative ml-1 font-semibold inline'/>:<BsChevronDown class = 'relative ml-1 font-semibold  inline'/>}</button>
<br/>
{showContact?
  <p class = 'relative text-center my-4 mb-6 font-semibold -mt-1 text-sm'> 
  Email ID: {app.email}
  </p>
:''
}

{
  showAcceptConfirm?
  <div class = 'relative text-center mt-4 mb-1'>

  Are you sure you want to accept this applicant?
  <button onClick={()=>acceptApplicant(applications[i])} class = 'bg-blue-500 shadow-md rounded-md p-1.5 px-3 left-2 hover:shadow-xl text-sm active:shadow-sm mr-1 ml-4 relative text-white font-semibold '>Yes</button>  <button onClick={()=>setShowAcceptConfirm(false)}  class = 'bg-blue-500 left-1 relative text-sm shadow-md rounded-md p-1.5 px-3 hover:shadow-xl active:shadow-sm mr-2 text-white font-semibold'>Cancel</button>
  </div>:
  showRejectConfirm?
  <div class = 'relative mt-4 mb-1 text-center'>


  Are you sure you want to reject this applicant?
  <button onClick={()=>rejectApplicant(applications[i])} class = 'bg-blue-500 shadow-md rounded-md p-1.5 px-3 left-2 hover:shadow-xl text-sm active:shadow-sm mr-1 ml-4 relative text-white font-semibold '>Yes</button>  <button onClick={()=>setShowRejectConfirm(false)} class = 'bg-blue-500 left-1 relative text-sm shadow-md rounded-md p-1.5 px-3 hover:shadow-xl active:shadow-sm mr-2 text-white font-semibold'>Cancel</button>
  </div>: 
  <div class = 'relative  mx-auto justify-center block space-x-2 text-center'>

  <button onClick = {()=> setShowAcceptConfirm(true)} class = 'bg-gradient-to-r rounded-md shadow-md hover:shadow-lg active:shadow-sm from-blue-400 to-indigo-600 p-4 text-white  font-semibold py-1.5 text-sm'>Accept</button>
<button onClick = {()=> setShowRejectConfirm(true)} class = 'bg-gradient-to-r rounded-md shadow-md hover:shadow-lg active:shadow-sm  from-red-400 to-orange-600 p-4 text-white font-semibold py-1.5 text-sm'>Reject</button>

  </div>


}
</>
:applications[i].appStatus === 'Accepted'?
<h1 class = 'text-center px-[30%] text-indigo-600 top-0.5 font-medium text-sm relative'>This applicant has been notified of his/her acceptance and will be added to the team after the acceptance has been confirmed.</h1>:''
}

</div>)



})}





</div>

<div class = 'relative mx-auto text-center  align-middle justify-center block '>

<svg xmlns="http://www.w3.org/2000/svg" class=" hover:h-12 hover:w-12 cursor-pointer hover:text-indigo-600  h-10 w-10 absolute left-16 bottom-[100%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="hover:h-12 hover:w-12 hover:text-indigo-600 cursor-pointer h-10 w-10 absolute right-16 bottom-[100%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>


</div>
               
          




</div>










</>}

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