import AOS from 'aos';
import "aos/dist/aos.css";
import { PaperClipIcon } from '@heroicons/react/solid'
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import {GiExitDoor} from 'react-icons/gi'
import ClipLoader from "react-spinners/ClipLoader"

const MoreDetails = (props) => {

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

    const [project, setProject] = useState([])
    const [isInTeam, setIsInTeam] = useState(false);
    const [applicationSent, setApplicationSent] = useState(false)
    const [user, setUser] = useState(false)
    const [tried, setTried] = useState(false);
    const [application, setApplication] = useState({
        
    })
   
    const [projLoading, setProjLoading] = useState(false)

    useEffect(()=> {
      setProjLoading(true)
       axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':
       'http://localhost:4000/api/user/getAllProjects',{token:sessionStorage.getItem('token')}).then((res)=> {
          setProject(res.data[props.index])
          let projectTemp = res.data[props.index]
          axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getUser':
       'http://localhost:4000/api/user/getUser',{token:sessionStorage.getItem('token')}).then((res)=> {
        setUser(res.data)
        for(let i = 0; i<projectTemp.team.length;i++) {
            let member = projectTemp.team[i]
            if(member.id === String(res.data._id)) {
                setIsInTeam(true);
            }
          setProjLoading(false)
        }

       })
       })

    },[applicationSent, tried])

    useEffect(()=> {
        if(user&&project){
            for(let i = 0; i<Array(...user.joinRequests).length; i++) {
                for(let k = 0; k<project.joinRequests.length;k++){
                  if(JSON.stringify(project.joinRequests[k]) == JSON.stringify(user.joinRequests[i]) && !(user.joinRequests[i].isInvite) ){

                        setApplicationSent(true)

                    }
                }
            }
        }
    },[user,project,tried])



    const [applying, setApplying] = useState(false);

    
    const [appLoading, setAppLoading] = useState()

    const submitHandler = e => {
        e.preventDefault();
        setAppLoading(true)
        let applicationTemp = {
            ...application,id: user._id, projID: project._id, appStatus: 'Not Decided'
         }
        setApplication(applicationTemp)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/createJoinRequest':
       'http://localhost:4000/api/user/createJoinRequest',{token:sessionStorage.getItem('token'), application:applicationTemp, projectID: project._id}).then((res)=> {
         console.log(res.data)
         setTried(true)
         setApplicationSent(true)
         setApplying(false)
         setTimeout(()=> {
            setAppLoading(false)
         },1800)
       })
       
    }

    const handleChange = (e) => {
        console.log(
            application)
        setApplication({
            ...application,
            [e.target.name]:e.target.value
        })
    }

    let date 

    if(project){
      date = new Date(project.createdAt).toDateString().substring(4)
      date = date.slice(0, 6) + "," + date.slice(6);
    }
    


return (

    <div class="fixed z-[85] inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      {/* This element is to trick the browser into centering the modal contents. */}
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
      
        {/* Modal panel, show/hide based on modal state. */}
  
      <div ref = {myRef} data-aos={"fade-up"}  data-aos-once='true' class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle sm:w-10/12 w-11/12">
      {  !applying && !appLoading?
        <div  class="bg-white px-4 pt-4 pb-6 sm:p-6 sm:pb-4">
         

        <div className="bg-white shadow  overflow-hidden left-2 sm:mb-0 mb-8 relative sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-medium text-gray-900">Project Details - {project?project.name:''}</h3>
      </div>


       









      <div className="border-t border-gray-200">
        <dl>
        </dl>
      </div>
    </div>


    <div class = {`grid grid-cols-2 xl:h-[510px] h-[1020px] mx-auto relative left-2 sm:mt-10 mt-5 ${isInTeam?'mb-9':'mb-6'} gap-5`}>
        <div class = 'bg-gradient-to-br xl:col-span-1 col-span-2 xl:pb-4 sm:pb-0 pb-5 from-blue-50 to-indigo-100 rounded-sm shadow-md'>
       
    {

projLoading?
<div class ='relative mx-auto my-44 xl:top-7 top-5 mb-10 pb-3  text-center block justify-center'>
<ClipLoader color={'#0b0bbf'} loading={projLoading}  size={70} />
</div>
:

<div class={`w-full sm:px-8 px-4 sm:pt-1 pt-11 py-1 mt-1 mr-4 h-full bg-transparent  `}>

<div class="flex items-center sm:justify-left justify-center">
    <span class="text-sm top-2  relative mx-auto font-light text-gray-600 ">{project?date:''}</span>
</div>

<div class="mt-2 sm:text-left text-center">
    <a href="#" class="sm:text-2xl text-xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline">{project?project.name:''}</a>
    <p class="sn:mt-4 mt-6 -mb-4 text-md  relative text-gray-600 ">
         {project.problem}
    </p>
</div>

<><br/>


<img class="md:mt-8 sm:mt-7 mt-5 md:mb-9 mb-11 border-2 py-5 rounded-sm bg-white  object-contain md:w-72 sm:w-64 w-48 h-40  sm:h-52 shadow-lg mx-auto relative md:h-56" src = {project.projPic}></img></>



<div class="flex items-center  md:justify-between justify-center sm:mr-0 mr-2 sm:mb-0 sm:pb-0 pb-3 -mb-4 relative">
     
     <div class="md:flex block items-center relative bottom-0.5">
        <img class="object-cover sm:w-10 sm:h-10 w-6 h-6 mx-2  rounded-full md:block sm:inline  hidden" src={project.admin?project.admin.pic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>
        <a class="font-bold text-gray-700 cursor-pointer inline sm:text-md text-sm mx-auto text-center relative left-1 ">
             {project.admin?project.admin.name:''} - Project Admin
        </a><br class = 'md:hidden block'/>
        <p onClick={()=> {
          localStorage.setItem('viewToken',project.admin.id);
          window.open(process.env.NODE_ENV ==='production'?'https://ideastack.org/viewProfile':'http://localhost:3000/viewProfile', '_blank')
        }} class = 'text-blue-700 w-fit text-center mx-auto md:inline block hover:underline md:ml-3 sm:ml-[50%] ml-[27%] relative text-sm font-semibold hover:text-blue-800 cursor-pointer'> ( <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-[1px] inline relative bottom-[2px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd" />
</svg><span class = 'inline'>View Profile</span>)</p>
    </div>
    
</div>
</div>
    }
    </div>

        
        
        <div class = 'bg-gradient-to-br sm:px-8 px-2 py-7 xl:col-span-1 col-span-2 text-center from-indigo-100 to-blue-50  rounded-sm shadow-md'>
       { projLoading?
<div class ='relative mx-auto my-44 mb-10 pb-3 xl:top-0 top-2.5  text-center block justify-center'>
<ClipLoader color={'#0b0bbf'} loading={projLoading}  size={70} />
</div>
:
<>
        <h3 class = 'mb-3 xl:mt-12 mt-7 sm:text-md text-sm tracking-wide'><strong>Category</strong>:<br class = 'sm:hidden block'/> {project.category?project.category:''}</h3>
        <h3 class = 'mb-3 tracking-wide sm:text-md text-sm '><strong>Maximum Team Capacity</strong>:<br class = 'sm:hidden block'/>  {project.maxCap?project.maxCap:''}</h3>
        <h3 class = 'tracking-wide sm:text-md text-sm '><strong>No. of Members</strong>:<br class = 'sm:hidden block'/> {project.team?project.team.length:''} </h3>

        <button disabled = {project?!project.accepting || isInTeam || applicationSent:true} class = {`${project.accepting && !isInTeam && !applicationSent?'hover:bg-blue-700 bg-blue-600 hover:shadow-xl active:shadow-sm':'hover:bg-blue-300 bg-blue-300 hover:shadow-sm active:shadow-sm'} shadow-sm sm:p-3 p-2 rounded-sm sm:text-md text-sm uppercase text-white sm:font-medium font-semibold tracking-wide sm:px-5 px-2.5 xl:mt-[87px] sm:mt-[75px] sm:top-0 top-5 mt-[60px] `}onClick = {()=> setApplying(true)}>Apply - Send a Join Request</button>
        
       {isInTeam? <div class =' sm:mt-[95px] mt-[77px] -mb-[95px] text-red-700 relative'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
</svg><span class = 'sm:text-md text-sm'>You are already a part of this team!</span>
</div>

:''}

        {project? applicationSent?   
        
        <div class =' mt-[100px] text-green-700 relative'>    
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg><span>Your Application Has Been Sent!</span>
        </div>
        
        :  
        
        project.accepting?<div class =' sm:mt-[100px] mt-[80px] sm:top-0 sm:mb-0 mb-4 top-5 text-green-700 relative'>    
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg><span class = 'sm:text-md  text-sm'>Accepting Applications</span>
        </div>
        
        :


        <div class =' sm:mt-[100px] mt-[80px] sm:top-0 top-5 sm:mb-0 mb-3 text-orange-600 relative'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg><span class = 'sm:text-md text-sm'>Not Accepting Applications</span></div>
        
        :''}
       </> }
</div>



        </div>


          <div class="sm:flex sm:items-center">
  
        <div class="bg-gray-50 px-3 mt-4 sm:top-0 top-8 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:mb-0 mb-6 sm:flex sm:flex-row-reverse ">
        
          <button onClick = {props.close} type="button" class="sm:-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2  bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
            Close
          </button>
          
        </div>
      </div>
        </div>:



<div  class="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-4">
         

<div className="bg-white shadow overflow-hidden  sm:left-2 left-3  relative sm:rounded-lg">
<div className="px-4 py-5 sm:px-6 ">
<h3 className="text-xl leading-6 font-medium text-gray-900">Application - {project?project.name:''}</h3>


</div>


<div className="border-t border-gray-200">
<dl>
</dl>
</div>

</div>

<div class  = 'mx-auto justify-center block sm:left-2 left-3 relative text-center'>
<GiExitDoor class = 'relative mx-auto text-center text-3xl mt-6'/>
<button onClick={() => setApplying(false)} class = 'w-28 p-1.5 rounded-md font-medium tracking-wide shadow-md mt-3  bg-blue-400 hover:bg-blue-600  text-sm hover:shadow-xl active:shadow-md text-white  uppercase '>
Go Back</button>
</div>


<div class = 'sm:pb-6 top-1 sm:p-2 px-4 pb-6 shadow-md relative mx-auto block justify-center sm:left-2 left-3 bg-gradient-to-br from-blue-50 to-indigo-200 w-full sm:mt-4 mt-7  sm:mb-4 mb-8 rounded-md'>
        <h4 class = 'text-gray-600 text-center sm:w-64 w-[203px] mx-auto relative top-2 text-sm'>Note: your profile details will be sent along with this application</h4>
        
        <form onSubmit={submitHandler}>
            {


appLoading?
            
<div class ='relative mx-auto translate-y-[-50%] pt-28 top-16 pb-4  text-center block justify-center'>
<ClipLoader color={'#0b0bbf'} loading={appLoading}  size={70} />
</div>
            
          :  
            project?
            <div class = 'relative mt-11'>
            {project.application.map((question,index)=> {


                return(
                <div key = {index} class = 'relative mb-7'>
                <label htmlFor="about" className="block text-md mb-1 relative text-center font-medium text-gray-700">
                  {question}
                </label>
                <div className="mt-1">
                  <textarea
                  onChange={handleChange}
                    name={question}
                    rows={5}
                    className="  focus:ring-indigo-500 focus:border-indigo-500 mt-3 p-2 block xl:w-6/12 lg:w-8/12 sm:w-10/12 w-full mx-auto sm:text-sm border border-gray-300 rounded-md shadow-md"
                    placeholder="Type here..."
                    defaultValue={''}
                  />
                </div>
              
              </div>)
            })
        } </div>:''}
           
        {!appLoading?<button type = 'submit' class = 'bg-gradient-to-r mt-12 mb-2 tracking-wide hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl active:shadow-sm from-blue-400 to-indigo-400 text-white uppercase text-lg px-16 py-2 rounded-md font-medium relative mx-auto block shadow-md'>Submit</button>:''}
        </form>
</div>


  <div class="sm:flex sm:items-center">

<div class="bg-gray-50 px-3 mt-4 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">

  <button onClick = {props.close} type="button" class="sm:-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
    Close
  </button>
  
</div>
</div>
</div>
}
  </div>

  </div></div>






  )
}

export default MoreDetails