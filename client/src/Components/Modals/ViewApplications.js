import { useEffect, useRef, useContext, useState } from "react";
import AOS from 'aos';
import {useLocation} from 'react-router-dom'
import "aos/dist/aos.css";
import projectContext from "../../context/projectContext";
import axios from 'axios'
import {BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { CircleLoader } from "react-awesome-loaders";
import BeatLoader from "react-spinners/BeatLoader";

const ViewApplications = (props) => {
  const [currentI, setCurrentI] = useState(0)

    useEffect(() => {
        AOS.init({
          duration : 1000
        });
      }, [currentI]);
    
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
      const [loading, setLoading] = useState(false)

      useEffect(()=> {
        setLoading(true)
        let applicantsTemp = [];
        for(let k = 0; k<projCon.projects.length;k++) {
            if(projCon.projects[k]._id === sessionStorage.getItem('managing')){
                setApplications(projCon.projects[k].joinRequests.filter(jR=>jR.isInvite!==true))
                for(let x = 0; x<projCon.projects[k].joinRequests.filter(jR=>jR.isInvite!==true).length;x++) {
                    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getProjUser':'http://localhost:4000/api/project/getProjUser',
                    {token:sessionStorage.getItem('token'),id:projCon.projects[k].joinRequests[x].id}).then(res=> {     
                      applicantsTemp.push(res.data)
                      setApplicants(applicantsTemp)
                    }).catch(err=> {
                    console.log(err.response)
                  })
                }
            }
        }
        setTimeout(()=> {
          setLoading(false)
        },1800)
      },[change, location.pathname])


      const acceptApplicant = (app) => {
        
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/acceptApp':'http://localhost:4000/api/project/acceptApp',
        {token:sessionStorage.getItem('token'),application : app}).then(res=> {     
          setAddedNewMember(true);
          setChange(!change)
          setTimeout(()=> {
            setApplications(res.data.filter(jR=>jR.isInvite!==true))
            setAddedNewMember(false)
          },4000)
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
            setApplications(res.data.filter(jR=>jR.isInvite!==true))
            setRejectedMember(false)
          },4000)
        }).catch(err=> {
        console.log(err.response)
       })
      }



      const openProfile = (id) => {
        localStorage.setItem('viewToken', id)
        window.open(process.env.NODE_ENV ==='production'?'https://ideastack.org/viewProfile':'http://localhost:3000/viewProfile', '_blank')
      }

     


    return (
        <div class="fixed z-[100] inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay, show/hide based on modal state. */}
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
          {/* This element is to trick the browser into centering the modal contents. */}
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
          
            {/* Modal panel, show/hide based on modal state. */}
      
          <div ref = {myRef} data-aos={"fade-up"}  data-aos-once='true' class="pr-6 inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle md:w-10/12 w-[97.5%]">
            <div  class="bg-white md:px-4 px-1 pt-2 pb-2 sm:p-6 sm:pb-4">
             
    
            <div className="bg-white shadow relative left-2  sm:rounded-lg">
            <div className="lg:px-4 py-5 sm:px-1 px-4" >
        <h3 className="text-lg leading-6 font-medium text-gray-900">View Applications</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Please review applications as well as applicant profiles before including them in your team.</p>
      </div>




      </div>


      <h3 class = 'text-center left-2 relative text-gray-700 mt-[1.35rem] text-2xl font-semibold'>Applications Pending ({applications&&applications.length})</h3>
    
    

    {

      loading && !addedNewMember && !rejectedMember?


      <div 
      class = ' w-[220px]  top-[144px]  m-0 relative mx-auto block translate-y-[-50%] py-10  pl-1.5'>
                      

                      <CircleLoader
        meshColor={"#6366F1"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"64px"}
        mobileSize={"64px"}
      />
             
                  </div>



      :

  
    
    
    
    
    
    !addedNewMember && !rejectedMember && applications && applications.length===0?
    
    <h1 class = 'text-center my-20 mb-24 font-semibold text-4xl'>No <span class = 'text-orange-400'>Applications</span> Pending</h1>
    
    :
    <>
    
    <div class = 'relative left-3 w-full h-max bg-gradient-to-br my-3 mt-4 rounded-md p-3 pb-8 shadow-md sm:px-16 px-7 from-blue-50 to-indigo-200'>

 <div class="relative rounded-lg">

{
addedNewMember?
<>
<h3 class = 'text-center font-semibold text-3xl my-9 mt-8'><span class = 'text-black'>Sending the Applicant</span> - Team Acceptance...</h3>
<div class ='relative mx-auto pb-4 left-1.5 mt-3  pt-1.5 text-center block justify-center'>
<BeatLoader color={'#6366F1'} loading={true} margin = {6}  size={20} />
</div>
</>

:
rejectedMember?
<>
<h3 class = 'text-center font-semibold text-3xl my-9 mt-8'>Rejecting the <span class = 'text-orange-600'>Applicant</span></h3>
<div class ='relative mx-auto pb-5 left-1.5 mt-3  pt-1.5 text-center block justify-center'>
<BeatLoader color={'#FFA500'} loading={true} margin = {6}  size={20} />
</div>
</>
:


applications && applicants && applicants.map((app,i) => {
  

return (

<div data-aos={"zoom-in-up"}  data-aos-once='true' key = {i} class = {i===currentI?'block':'hidden'}>


<div class = 'relative mx-auto z-40 text-center top-[210px]  align-middle justify-center block '>
<p class = 'absolute  sm:bottom-[15px] -top-[80px] xl:text-md text-sm xl:left-0 sm:-left-9 -left-4 font-semibold'><span class = 'text-indigo-600'>Previous</span> <span class = 'hidden sm:inline'>Applicant</span></p>
<svg xmlns="http://www.w3.org/2000/svg" onClick={()=> {
  setCurrentI(currentI>0?currentI-1:applicants.length-1)
}} class=" sm:hover:h-12 hover:h-9 sm:hover:w-12 hover:w-9 cursor-pointer hover:text-indigo-600  sm:h-10 sm:w-10 h-7 w-7 absolute lg:left-2 sm:-left-9 -left-4 sm:bottom-[100%] md:top-0 -top-[120px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>

<p class = 'absolute  sm:bottom-[15px]  -top-[80px] xl:text-md text-sm xl:right-0 sm:-right-9 -right-4 font-semibold'><span class = 'text-indigo-600'>Next</span> <span class = 'hidden sm:inline'>Applicant</span></p>
<svg onClick={()=> {
  setCurrentI(currentI<applicants.length-1?currentI+1:0)
}} xmlns="http://www.w3.org/2000/svg" class="sm:hover:h-12 hover:h-9 sm:hover:w-12 hover:w-9 hover:text-indigo-600 cursor-pointer sm:h-10 sm:w-10 h-7 w-7 absolute lg:right-2 sm:-right-9 -right-4 sm:bottom-[100%] md:top-0 -top-[120px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>


</div>
<div class = ' mb-16 space-y-1   text-center text-md mt-2 top-4 relative'>
<h3 class = 'text-center uppercase text-blue-700 font-semibold text-sm relative bottom-2.5 mb-10'>Application No. {i+1}</h3>

<img class="object-cover w-24 shadow-md   h-24 mx-auto relative mb-[60px] sm:mt-12 mt-8 bottom-5  z-40 rounded-full sm:block" src={app.profilePic?app.profilePic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>

<h3 class = 'text-sm'><strong>Applicant Name</strong> : {applicants? app.firstName + ' ' + app.lastName :''}</h3>
<h3 class = 'text-sm'><strong>School</strong> : {applicants?app.school:''} </h3>
<h3 class = 'text-sm'><strong>Age</strong> : {applicants?app.age:''}</h3>
<h3 class = 'text-sm mt-6 pt-4 relative' ><strong>Profile</strong> : <p onClick={()=>openProfile(app._id)} class = 'text-blue-500 underline hover:text-blue-700 inline cursor-pointer'>  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-[1px] inline relative bottom-[2px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd" />
</svg><span class = 'inline' >Click Here</span></p> </h3>
</div>
{applications && applications[i] !==null && applications[i].appStatus === 'Not Decided'?
<>
{Object.keys(applications[i]).filter(key=>key!=='id'&&key!=='projID'&&key!=='appStatus').map((q,ind)=> {


    return (
        <div key = {ind}>
            <h3 class = 'text-gray-500 mb-1 mt-5 font-semibold text-sm text-center'>{q==='dateReceived'?'Date Received:' :q}</h3>
            <h3 class = 'text-gray-800 text-sm text-center relative mx-auto'>{q==='dateReceived'?new Date(applications[i][q]).toDateString():applications[i][String(q)]}</h3>
        </div>
    )

})}

<button class = 'relative mx-auto justify-center block  text-center top-2.5 mt-12 bg-gradient-to-r rounded-md shadow-md hover:shadow-lg active:shadow-sm from-gray-400 to-gray-600 p-4 text-white text-sm  font-semibold py-1.5' onClick={()=> setShowContact(!showContact)}>Contact  (Recommended <br class = 'lg:hidden block' /> before Acceptance){showContact?<BsChevronUp class = 'relative ml-1 font-semibold inline'/>:<BsChevronDown class = 'relative ml-1 font-semibold  inline'/>}</button>
<br/>
{showContact?
  <p class = 'relative text-center my-4 mb-6 font-semibold -mt-1 text-sm'> 
  Email ID: {app.email}
  </p>
:''
}

{
  showAcceptConfirm?
  <div class = 'relative text-center mt-4 xl:top-0 md:top-16 top-4 xl:mb-1 mb-12'>

  Are you sure you want to accept this applicant?<br class = 'md:hidden block'/>
  <button onClick={()=>acceptApplicant(applications[i])} class = 'bg-blue-500 shadow-md rounded-md p-1.5 px-3 md:mt-0 mt-2 left-2 hover:shadow-xl text-sm active:shadow-sm mr-1 ml-4 relative text-white font-semibold '>Yes</button>  <button onClick={()=>setShowAcceptConfirm(false)}  class = 'bg-blue-500 left-1 relative text-sm shadow-md rounded-md p-1.5 px-3 hover:shadow-xl active:shadow-sm mr-2 text-white font-semibold'>Cancel</button>
  </div>:
  showRejectConfirm?
  <div class = 'relative mt-4 xl:mb-1 mb-12 xl:top-0 md:top-16 top-4 text-center'>


  Are you sure you want to reject this applicant?<br class = 'md:hidden block'/>
  <button onClick={()=>rejectApplicant(applications[i])} class = 'bg-blue-500 shadow-md rounded-md p-1.5 px-3 left-2 hover:shadow-xl text-sm active:shadow-sm mr-1 ml-4 relative text-white font-semibold '>Yes</button>  <button onClick={()=>setShowRejectConfirm(false)} class = 'bg-blue-500 left-1 relative text-sm shadow-md rounded-md p-1.5 px-3 hover:shadow-xl active:shadow-sm mr-2 text-white font-semibold'>Cancel</button>
  </div>: 
  <div class = 'relative  mx-auto justify-center block space-x-2 text-center'>

  <button onClick = {()=> setShowAcceptConfirm(true)} class = 'bg-gradient-to-r rounded-md shadow-md hover:shadow-lg active:shadow-sm from-blue-400 to-indigo-600 p-4 text-white  font-semibold py-1.5 text-sm'>Accept</button>
<button onClick = {()=> setShowRejectConfirm(true)} class = 'bg-gradient-to-r rounded-md shadow-md hover:shadow-lg active:shadow-sm  from-red-500 to-orange-600 p-4 text-white font-semibold py-1.5 text-sm'>Reject</button>

  </div>


}

<div class = 'relative mx-auto text-center bottom-4 md:mt-0 mt-36  align-middle justify-center block '>

<p class = 'absolute  bottom-[55px] lg:-left-4 sm:-left-12 -left-4 xl:text-md text-sm  font-semibold'><span class = 'text-indigo-600'>Previous</span> Applicant</p>

<svg xmlns="http://www.w3.org/2000/svg" onClick={()=> {
  setCurrentI(currentI>0?currentI-1:applicants.length-1)
}} class=" hover:h-12 hover:w-12 cursor-pointer hover:text-indigo-600  h-10 w-10 absolute lg:left-16 sm:-left-10 -left-2 bottom-[105%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>

<p class = 'absolute  bottom-[55px] xl:text-md text-sm lg:right-0 sm:-right-10 -right-2 font-semibold'><span class = 'text-indigo-600'>Next</span> Applicant</p>

<svg onClick={()=> {
  setCurrentI(currentI<applicants.length-1?currentI+1:0)
}} xmlns="http://www.w3.org/2000/svg" class="hover:h-12 hover:w-12 hover:text-indigo-600 cursor-pointer h-10 w-10 absolute lg:right-16 sm:-right-10 -right-2 bottom-[105%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>


</div>
</>
:applications[i].appStatus === 'Accepted'?
<h1 class = 'text-center px-[30%] text-indigo-600 top-0.5 font-medium text-sm relative'>This applicant has been notified of his/her acceptance and will be added to the team after the acceptance has been confirmed.</h1>:''
}



</div>)



})}





</div>


               
          




</div>










</>}

    </div>
    
    
    
    
    
    
    
    
    
    
    
    
              <div class="sm:flex sm:items-center">
      
            <div class="bg-gray-50 px-3 mt-4 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
            
              <button onClick = {props.close} type="button" class="sm:-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
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