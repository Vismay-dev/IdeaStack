import React, { useContext, useEffect, useState } from "react";
import projectContext from "../../context/projectContext.js";
import {Route, Switch, Redirect} from 'react-router-dom'
// components

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";
import CardTeam from "./Cards/CardTeam.js";

import ManageApps from "./ManageApps.js";
import Collaborate from './Collaborate.js'
import Mentorship from './Mentorship.js'
import BrowseExperts from "./BrowseExperts.js";

import AOS from 'aos';
import "aos/dist/aos.css";

export default function ManageProject() {

  useEffect(() => {
    AOS.init({
      duration : 600
    });
  },[]);


  const projects = useContext(projectContext)
  const [date,setDate] = useState()
  const [project, setProject] = useState()
  const [latestReceived, setLatestReceived] = useState()

  useEffect(()=> {


    let projSelected = projects.projects.filter((proj)=> {
      return proj._id === String(sessionStorage.getItem('managing'))
    })[0]
  

    if(projects.projects && projSelected){
    setProject(projSelected);

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
  

  return (
    <>
    <Switch>
<Route path = '/myprojects/manageproject/overview'>
  <>
    
<h2  class = 'text-center font-bold text-5xl text-gray-800 top-1 relative mt-11 mb-7'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-14 bottom-[2.9px] relative inline w-14 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
</svg> Overview
<p class = 'mt-[4px] text-xl text-center pl-3 text-gray-800  font-semibold'>View All Important Details</p>
</h2>

      <div  className="flex flex-wrap px-20 mt-[63px] gap-5 ">



<div data-aos={"fade-up"} data-aos-once='true' class={`w-full relative md:w-1/2 xl:w-1/3 `}>
<div class={`rounded-lg shadow-lg bg-gradient-to-r border-[1px] border-blue-600  from-blue-50 to-indigo-100 overflow-hidden mb-0`}>
  <img
     src={project?project.projPic:''}
     alt="image"
     class="w-full h-56 object-contain py-3 -mb-3 bg-gray-50 border-b-2 border-gray-400 relative"
     />
  <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
     <h3>
        <a
           href="javascript:void(0)"
           class="
           font-semibold
           text-dark text-xl
           sm:text-[22px]
           md:text-xl
           lg:text-[22px]
           xl:text-xl
           2xl:text-[22px]
           
           block
           hover:text-primary
           "
           >
        {project?project.name:''}
        </a>
        <span class="text-sm mx-auto relative font-light text-gray-600 ">{date?date:''}</span>

     </h3>
     <p class="text-base text-body-color mt-4 leading-relaxed mb-7">
       {project?project.problem:''}<br/>
       <p class = 'relative top-3 -mb-5'>Category: {project?project.category:''}<br/>
       </p>

     </p>
     
  </div>
</div>
</div>

<div data-aos={"fade-up"} data-aos-once='true'  data-aos-delay = '200' class={`w-full relative md:w-1/2 xl:w-1/3`}>
<div class={`rounded-lg shadow-lg bg-gradient-to-r  border-[1px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden mb-0`}>
  <div class = 'h-40 '>
    <p className="text-center top-5 text-xl font-semibold relative mb-1">Applications Pending: </p><br/>
    <h1 className = 'text-center text-4xl text-blue-700 bottom-[1px] relative mb-1'>{project?project.joinRequests.length:' '}</h1>
    <p class="text-sm relative text-center bottom-[0.2px] font-light text-gray-600 px-[90px] ">Latest Pending Application Received On: <span class = 'text-indigo-500 font-semibold' >{latestReceived?latestReceived.date:'No Pending Applications'}</span></p>
  </div>
  <div class=" pt-0 pb-5 bg-gradient-to-r from-gray-50 to-slate-50 text-center">
  <p className="text-center top-4 text-xl font-semibold relative px-16">Industry Mentorship Sessions Scheduled: </p><br/>
    <h1 className = 'text-center relative text-4xl text-blue-700'>1</h1>
    <p class="text-sm relative text-center font-light top-1 text-gray-600 px-[105px] ">Upcoming Session With <span class = 'text-indigo-500 font-semibold'>Vismay Suramwar</span> On: {date?date:''}</p>     
  </div>
  <div class=" pt-0 pb-4  text-center">
  <p className="text-center top-3 text-xl font-semibold relative">Documents Uploaded: </p><br/>
    <h1 className = 'text-center -top-1.5 relative text-4xl text-blue-700'>{project?project.documents.length:' '}</h1>
    <p class="text-sm relative text-center -top-0.5 font-light text-gray-600 px-[116px] ">Latest Document Uploaded On: {date?date:''}</p>     
  </div>
</div>
</div>

      <div data-aos={"fade-up"} data-aos-once='true' data-aos-delay = '400' className=" w-96 xl:mb-0">
          <CardTeam />
        </div>
      </div>
      <div  data-aos={"fade-up"} data-aos-once='true'  className="flex flex-wrap px-16 right-0.5 relative mt-3.5 -mb-[240px]">

        <div className="w-full xl:w-8/12 mb-12 mt-3 relative xl:mb-0 px-2">
          <CardPageVisits />
        </div>
        <div  className="w-full xl:w-4/12 mt-3 relative px-2">
          <CardSocialTraffic />
        </div>
      </div>
      </>
      </Route>

      <Route path = '/myprojects/manageproject/manageapps'>
        <ManageApps/>
      </Route>

      <Route path = '/myprojects/manageproject/collaborate'>
      <Collaborate/>
      </Route>

      <Route path = '/myprojects/manageproject/mentorship/browse'>
      <BrowseExperts/>
      </Route>
      

      <Route path = '/myprojects/manageproject/mentorship/'>
      <Mentorship/>
      </Route>

      

      <Route path = '/myprojects/manageproject/'>
        <Redirect to = '/myprojects/manageproject/overview'/>
      </Route>

     
     
      </Switch>
      
    </>
  );
}
