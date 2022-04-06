import projectContext from "../../context/projectContext.js";
import React, { useContext, useEffect, useState } from "react";
import {ImFilesEmpty} from 'react-icons/im'
import {BiEditAlt} from 'react-icons/bi'
import styles from './ManageApps.module.css'
import EditApplicationForm from "../Modals/EditApplicationForm.js";
import ViewApplications from "../Modals/ViewApplications.js";
import axios from "axios";

import AOS from 'aos';
import "aos/dist/aos.css";

const ManageApps = () => {


  useEffect(() => {
    AOS.init({
      duration : 1000
    });
  },[]);


    const projects = useContext(projectContext)
  const [date,setDate] = useState()
  const [project, setProject] = useState()

  const [latestAccepted, setLatestAccepted] = useState();
  const [latestReceived, setLatestReceived] = useState();

  useEffect(()=> {
    let projSelected = projects.projects.filter((proj)=> {
      return proj._id === String(sessionStorage.getItem('managing'))
    })[0]
    if(projects.projects && projSelected){
    setProject(projSelected);

    if(projSelected.team.length>1) {
      let date = projSelected.team[1].dateAdded
      let name = projSelected.team[1].name
      for(let x = 0; x<projSelected.team.length;x++) {
        if(projSelected.team[x].dateAdded>date) {
          date = projSelected.team[x].dateAdded
          name = projSelected.team[x].name
        }
      }
      setLatestAccepted({date:date, name: name});
    }

    if(projSelected.joinRequests.length>1) {
      let date = projSelected.joinRequests[1].dateReceived
      for(let x = 0; x<projSelected.team.length;x++) {
        if(projSelected.joinRequests[x].dateReceived>date) {
          date = projSelected.joinRequests[x].dateReceived
        }
      }
      setLatestReceived({date:date});
    }
   

    let currdate = new Date(projSelected.createdAt).toDateString().substring(4)
  setDate(currdate.slice(0, 6) + "," + currdate.slice(6))
    }
  },[projects])
  

  const [acceptingApp, setAcceptingApp] = useState() 

  useEffect(() => {
    setAcceptingApp(project?project.accepting:false)
  },[project])

  const changeHandler = () => {
    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/updateAppStatus':'http://localhost:4000/api/project/updateAppStatus',
         {token:sessionStorage.getItem('token'),projectID:sessionStorage.getItem('managing'), accepting: !acceptingApp}).then(res=> {     
            setAcceptingApp(res.data)
        }).catch(err=> {
            console.log(err.response)
        })
  }

  const [showEditApp, setShowEditApp] = useState(false);
  const [showViewApp, setShowViewApp] = useState(false);
    return (
        <>
        {
            showEditApp?
            <EditApplicationForm close = {()=> setShowEditApp(false)}/>
            :''
        }
        {
            showViewApp?
            <ViewApplications close = {()=> setShowViewApp(false)}/>
            :''
        }
<h2 class = 'text-center font-bold text-5xl text-gray-800 top-1 relative mt-10 -mb-2.5'>Manage Applications</h2>
    <h1 class = 'text-4xl text-center mt-[67px]'><span class = {!acceptingApp?'text-blue-700':'text-red-500'}>{acceptingApp?'Pause':'Accept'}</span> Core-Team Applications</h1>

    <div class="flex items-center justify-center relative w-full mb-11">
  
  <label for="toggleB" class="flex items-center cursor-pointer">
    {/* <!-- toggle --> */}
    <div class="relative mt-6 -mb-1">
      {/* <!-- input --> */}
      <input type= 'checkbox' checked={acceptingApp} onChange={changeHandler} id='toggleB' class="z-30 sr-only"/>
      {/* <!-- line --> */}
      <div id = {styles.bgrnd} class="block bg-gray-600 w-14 h-8 rounded-full"></div>
      {/* <!-- dot --> */}
      <div id= {styles.dot} className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
    </div>
  
  </label>

</div>








<div  className="grid grid-cols-2 gap-8 px-52 mt-[70px]  -mb-[222px]">

<div data-aos={"fade-up"} data-aos-once='true' class={`w-full relative grid-col-1`}>
<div class={`rounded-lg shadow-lg bg-gradient-to-r  border-[1px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden mb-0`}>
  <div class = 'h-28 pt-2.5'>
  <p className="text-center top-3 text-xl font-semibold relative">Status: </p><br/>
    <p class={`text-3xl ${acceptingApp?'text-blue-700':'text-red-500'} relative text-center bottom-1.5 px-[50px]`}>{acceptingApp?'Accepting Applications':'Not Accepting Applications'}</p>     
  </div>
  <div class={`${!latestAccepted?'pt-4 pb-[41px]':'pt-2 pb-7'}  mt-2 bg-gradient-to-r from-gray-50 to-slate-50 text-center`}>
  <p className="text-center top-4 text-xl font-semibold relative px-10">Applications Accepted: </p><br/>
    <h1 className = 'text-center relative text-4xl text-blue-700'>{project?project.team.length-1:' '}</h1>
    <p class={`text-sm relative ${!latestAccepted?'top-3 ':' top-1.5'} text-center font-light text-gray-600 px-[105px]  `}>Latest Accepted Team Member: {latestAccepted?<><span class = 'text-indigo-500 font-semibold'>{latestAccepted.name}</span> ({latestAccepted.date?Date(latestAccepted.date).toString().substring(0,15):''})</>:'--'} </p>    
  
  </div>
  <div class=" pt-2 pb-4  text-center">
  <p className="text-center top-3.5 text-xl font-semibold relative mb-1">Applications Pending: </p><br/>
    <h1 className = 'text-center text-4xl text-blue-700 -top-2 relative mb-1'>{project?project.joinRequests.length:' '}</h1>
    <p class="text-sm relative text-center bottom-1.5 font-light text-gray-600 px-[100px] ">Latest Pending Application Received On: <span class = 'text-indigo-500 font-semibold' >{latestReceived?latestReceived.date:'No Pending Applications'}</span></p>
  </div>
</div>
</div>




<div data-aos={"fade-up"} data-aos-once='true' data-aos-delay = '200' class={`w-full pointer-events-auto z-40 relative grid-col-1`}>
<div class={`rounded-lg shadow-lg bg-gradient-to-r  relative bottom-[0.7px] border-[1px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden mb-0`}>
  <div class = 'h-[215px] relative  '>
  <p className="text-center top-5 text-xl font-semibold relative">View Applications: </p><br/>
  <p class="text-sm relative text-center font-light bottom-0.5 text-gray-600 px-[80px] ">Have a look at join requests for <span class = 'text-indigo-500 font-semibold'> IdeaStack</span>!</p>     
  <ImFilesEmpty onClick = {
        () => setShowViewApp(true)
    } class = 'text-center relative mx-auto text-8xl top-5 shadow-lg cursor-pointer hover:shadow-2xl active:shadow-lg rounded-md bg-blue-700 p-3'/>

  </div>
  <div class=" pt-0 pb-12 bg-gradient-to-r mt-0.5 from-gray-50 to-slate-50 text-center">
  <p className="text-center top-4 text-xl font-semibold relative px-10">Edit Application Form: </p><br/>
    
    <p class="text-sm relative text-center font-light bottom-1 text-gray-600 px-[80px] ">This form will be submitted by applicants when requesting core team membership in<span class = 'text-indigo-500 font-semibold'> IdeaStack</span></p>     
    <BiEditAlt onClick = {
        () => setShowEditApp(true)
    } class = 'text-center z-30 relative mx-auto text-8xl top-5 shadow-lg cursor-pointer hover:shadow-2xl active:shadow-lg rounded-md bg-blue-700 p-2'/>

 
 
  </div>
 
</div>
</div>

</div>
        </>
    )
}

export default ManageApps