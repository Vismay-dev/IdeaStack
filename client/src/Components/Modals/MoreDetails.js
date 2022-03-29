import AOS from 'aos';
import "aos/dist/aos.css";
import { PaperClipIcon } from '@heroicons/react/solid'
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import {GiExitDoor} from 'react-icons/gi'

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
   

    useEffect(()=> {
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
        }

       })
       })

    },[applicationSent, tried])

    useEffect(()=> {
        if(user&&project){
            for(let i = 0; i<Array(...user.joinRequests).length; i++) {
                for(let k = 0; k<project.joinRequests.length;k++){
                  if(JSON.stringify(project.joinRequests[k]) == JSON.stringify(user.joinRequests[i])){

                        setApplicationSent(true)

                    }
                }
            }
        }
    },[user,project,tried])



    const [applying, setApplying] = useState(false);

    


    const submitHandler = e => {
        e.preventDefault();
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



return (

    <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      {/* This element is to trick the browser into centering the modal contents. */}
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
      
        {/* Modal panel, show/hide based on modal state. */}
  
      <div ref = {myRef} data-aos={"fade-up"}  data-aos-once='true' class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle w-10/12">
      {  !applying?
        <div  class="bg-white px-4 pt-2 pb-2 sm:p-6 sm:pb-4">
         

        <div className="bg-white shadow overflow-hidden left-2 relative sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-medium text-gray-900">Project Details - {project?project.name:''}</h3>
      </div>


       









      <div className="border-t border-gray-200">
        <dl>
        </dl>
      </div>
    </div>


    <div class = 'grid grid-cols-2 h-[510px] mx-auto relative left-2 mt-10 mb-6 gap-5 '>
        <div class = 'bg-gradient-to-br from-blue-50 to-indigo-100 rounded-sm shadow-md'>
       
    
    <div class={`w-full px-8 py-1 mt-1 mr-4 h-full bg-transparent  `}>

    <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 ">{project?project.date:''}</span>
    </div>

    <div class="mt-2">
        <a href="#" class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline">{project?project.name:''}</a>
        <p class="mt-4 -mb-4 relative text-gray-600 ">
             {project.problem}
        </p>
    </div>

    <><br/>
   

    <img class="mt-7 mb-11 border-2 py-5 rounded-sm bg-white  object-contain w-72 shadow-lg mx-auto relative h-56" src = {project.projPic}></img></>


    
    <div class="flex items-center justify-between mt-1">
         <div class="flex items-center relative bottom-0.5">
            <img class="hidden object-cover w-10 h-10 mx-2  rounded-full sm:block" src={project.admin?project.admin.pic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>
            <a class="font-bold text-gray-700 cursor-pointer relative left-1 ">
                 {project.admin?project.admin.name:''} (Project Admin)
            </a>
        </div>
        
    </div>
</div></div>

        
        
        <div class = 'bg-gradient-to-br px-8 py-7 text-center from-indigo-100 to-blue-50 rounded-sm shadow-md'>

        <h3 class = 'mb-3 mt-6 tracking-wide'><strong>Category</strong>: {project.category?project.category:''}</h3>
        <h3 class = 'mb-3 tracking-wide'><strong>Maximum Team Capacity</strong>: {project.maxCap?project.maxCap:''}</h3>
        <h3 class = 'tracking-wide'><strong>No. of Members</strong>:</h3>

        <button disabled = {project?!project.accepting || isInTeam || applicationSent:true} class = {`${project.accepting && !isInTeam && !applicationSent?'hover:bg-blue-700 bg-blue-600 hover:shadow-xl active:shadow-sm':'hover:bg-blue-300 bg-blue-300 hover:shadow-sm active:shadow-sm'} shadow-sm p-3 rounded-sm text-md uppercase text-white font-medium tracking-wide px-5 mt-[90px] `}onClick = {()=> setApplying(true)}>Apply - Send a Join Request</button>
        
       {isInTeam? <div class =' mt-[95px] -mb-[95px] text-red-700 relative'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
</svg><span>You are already a part of this team!</span>
</div>
:''}

        {project? applicationSent?   
        
        <div class =' mt-[100px] text-green-700 relative'>    
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg><span>Your Application Has Been Sent!</span>
        </div>
        
        :  
        
        project.accepting?<div class =' mt-[100px] text-green-700 relative'>    
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg><span>Accepting Applications</span>
        </div>
        
        :


        <div class =' mt-[100px] text-orange-600 relative'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative inline mr-2 bottom-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg><span>Not Accepting Applications</span></div>
        
        :''}

</div>



        </div>


          <div class="sm:flex sm:items-center">
  
        <div class="bg-gray-50 px-3 mt-4 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
        
          <button onClick = {props.close} type="button" class="-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
            Close
          </button>
          
        </div>
      </div>
        </div>:



<div  class="bg-white px-4 pt-2 pb-2 sm:p-6 sm:pb-4">
         

<div className="bg-white shadow overflow-hidden left-2 relative sm:rounded-lg">
<div className="px-4 py-5 sm:px-6">
<h3 className="text-xl leading-6 font-medium text-gray-900">Application - {project?project.name:''}</h3>


</div>


<div className="border-t border-gray-200">
<dl>
</dl>
</div>

</div>

<div class  = 'mx-auto justify-center block left-2 relative text-center'>
<GiExitDoor class = 'relative mx-auto text-center text-3xl mt-6'/>
<button onClick={() => setApplying(false)} class = 'w-28 p-1.5 rounded-md font-medium tracking-wide shadow-md mt-3 bg-blue-400 hover:bg-blue-600 text-sm hover:shadow-xl active:shadow-md text-white  uppercase '>
Go Back</button>
</div>


<div class = 'pb-6 top-1 p-2 shadow-md relative mx-auto block justify-center left-2 bg-gradient-to-br from-blue-50 to-indigo-200 w-full mt-4 mb-4 rounded-md'>
        <h4 class = 'text-gray-600 text-center w-64 mx-auto relative top-2 text-sm'>Note: your profile details will be sent along with this application</h4>
        
        <form onSubmit={submitHandler}>
            {project?
            <div class = 'relative mt-11'>
            {project.application.map((question,index)=> {


                return(
                <div key = {index} class = 'relative mb-6'>
                <label htmlFor="about" className="block text-md mb-1 relative text-center font-medium text-gray-700">
                  {question}
                </label>
                <div className="mt-1">
                  <textarea
                  onChange={handleChange}
                    name={question}
                    rows={5}
                    className="  focus:ring-indigo-500 focus:border-indigo-500 mt-3 p-2 block w-6/12 mx-auto sm:text-sm border border-gray-300 rounded-md shadow-md"
                    placeholder="Type here..."
                    defaultValue={''}
                  />
                </div>
              
              </div>)
            })
        } </div>:''}
           
        <button type = 'submit' class = 'bg-gradient-to-r mt-12 mb-2 tracking-wide hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl active:shadow-sm from-blue-400 to-indigo-400 text-white uppercase text-lg px-16 py-2 rounded-md font-medium relative mx-auto block shadow-md'>Submit</button>
        </form>
</div>


  <div class="sm:flex sm:items-center">

<div class="bg-gray-50 px-3 mt-4 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">

  <button onClick = {props.close} type="button" class="-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
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