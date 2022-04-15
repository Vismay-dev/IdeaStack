import React, { useContext, useEffect, useRef, useState } from "react";
import projectContext from "../../context/projectContext.js";
import {Route, Switch, Redirect} from 'react-router-dom'
// components

import axios from 'axios'

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";
import CardTeam from "./Cards/CardTeam.js";

import ManageApps from "./ManageApps.js";
import Collaborate from './Collaborate.js'
import Mentorship from './Mentorship.js'
import BrowseExperts from "./BrowseExperts.js";

import AOS from 'aos';
import "aos/dist/aos.css";

import userContext from "../../context/userContext.js";

export default function ManageProject() {

  useEffect(() => {
    AOS.init({
      duration : 600
    });
  },[]);

  const myRef = useRef()

  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!myRef.current || myRef.current.contains(event.target)) {
          return;
        }
        setAllUsers([])
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
    [myRef, () => setAllUsers([])]
  );
  

  const user = useContext(userContext).user


  const projects = useContext(projectContext)
  const [date,setDate] = useState()
  const [project, setProject] = useState()
  const [latestReceived, setLatestReceived] = useState()
  const [loading, setLoading] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [text, setText] = useState('')
  const [origUsers, setOrigUsers] = useState([])

  const textFilter = (text) => {
    let arr = []
    let arrPrior = []
    let array = origUsers
    const wordFilterArr = String(text).toLowerCase().split(/(?:,| )+/) //Words to be searched for in task names
    console.log(wordFilterArr)
    for(let i = 0; i<Array(...array).length;i++) {
        arrPrior.push(0);
        var projName = (array[i]['firstName']+' '+array[i]['lastName']).toLowerCase();
        var wordsContained = projName.split(/(?:,| )+/)
        var boolean = false;
        for(let j = 0; j<wordFilterArr.length;j++) {
            for(let k = 0; k<wordsContained.length; k++){
                if(wordsContained[k].indexOf(wordFilterArr[j])>-1){
                    arrPrior[i]++
                    boolean = true;
                }
            }
        }

        if(boolean === true && !team.includes(array[i].firstName+ ' ' +array[i].lastName)) {
            arr.push(array[i])
        }        
}
arrPrior = arrPrior.filter(e=> e!==0)
        
        let x, y,tmp;
        x = y = 0;
        for(let x = 0; x<arr.length-1;x++){
            var check = false;
            for(let y = 0; y<arr.length-1-x; y++){
                if(arrPrior[y+1]>arrPrior[y]){
                    tmp = arr[y];
                    arr[y] = arr[y+1];
                    arr[y+1] = tmp;
                    check = true;
                }
            }
            if(check===false) {
                break;
            }
        }  

      
        setAllUsers(arr)
       }
  const textChangeHandler = (e) => {
    setInviteSent(false)
    setText(e.target.value)
    filterByText(e.target.value);
 }
  const filterByText = (s)=> {
    if(s!=='') {
    textFilter(s);
    }else {
     setAllUsers(origUsers)
    }
 }

 const [team, setTeam] = useState([])
 const projectsCurr = useContext(projectContext)
 const [proj, setProj] = useState('')

useEffect(()=> {
let projSelected = ''
if(sessionStorage.getItem('managing')){
  projSelected = projectsCurr.projects.filter((proj)=> {
    return proj._id === String(sessionStorage.getItem('managing'))
  })[0]      
}
let teamTemp = []

if(projSelected){
for(let i = 0; i<projSelected.team.length;i++){
  teamTemp.push(projSelected.team[i].name)
}
setTeam(teamTemp)

}


setProj(projSelected?projSelected:'')
},[sessionStorage.getItem('managing')])



  useEffect(()=> {
    setLoading(true)
    setInviteSent(false)

    axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/getAllUsers':'http://localhost:4000/api/user/getAllUsers'
        ,{token:sessionStorage.getItem('token')}).then(res=> {
          let teamArr = proj.team.map((member)=> {
           return member.id;
          })
          setOrigUsers(res.data.filter(user=> {
            return !teamArr.includes(user._id)
          }))
          setAllUsers(res.data.filter(user=> {
            return !teamArr.includes(user._id)
          }))
          setLoading(false)
        }).catch(err=> {
          setLoading(false)
        })




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

  const [inviteSent, setInviteSent] = useState(false)

  const sendInvite = () => {
      setLoading(true)
    axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/sendInvite':'http://localhost:4000/api/project/sendInvite'
    ,{token:sessionStorage.getItem('token'), user: memberSelected, projectID: sessionStorage.getItem('managing')}).then(res=> {
      setInviteSent(true)
      setLoading(false)
    }).catch(err=> {
      setLoading(false)
    })


  }
  
  const [memberSelected, setMemberSelected] = useState()

  return (
    <>
    <Switch>
<Route path = '/myprojects/manageproject/overview'>
  <>
    
<h2  class = 'text-center font-bold sm:text-5xl text-4xl text-gray-800 top-1 relative mt-11 mb-7'>
<svg xmlns="http://www.w3.org/2000/svg" class="sm:h-14 h-10 sm:bottom-[2.9px] bottom-[3.1px] relative inline sm:w-14 w-10 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
</svg> Overview
<p class = 'mt-[4px] text-xl text-center pl-3 text-gray-800  font-semibold'>View All Important Details</p>
</h2>

      <div  className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 xl:left-0 left-0.5  relative justify-center mx-auto sm:px-[60px] px-[18px] mt-[63px]  xl:gap-5 gap-9 ">


<div style = {{'backgroundImage':'url(https://upload.wikimedia.org/wikipedia/commons/8/81/Maxresdefault_%281%29.jpg)'}} data-aos={"fade-up"} data-aos-once='true' class = {`xl:col-span-3 lg:col-span-2 col-span-1 ${project&&(project.maxCap - project.team.length===0||user._id!==project.admin.id)?'hidden':'block'} bg-gradient-to-br md:h-[330px] h-[385px] mb-1.5 relative border-[1px] border-blue-700 rounded-md from-blue-50 to-indigo-200`}>
      <div class = 'bg-gradient-to-br from-blue-50 to-indigo-200 h-full lg:w-[60%] md:w-[85%] w-[100%] sm:pt-[21px] pt-[28px] relative mx-auto block'>
      
      <h3 class = 'font-semibold text-center mx-auto relative mr-1 text-2xl underline'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1 relative bottom-[2px] font-semibold text-blue-800 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
</svg><span class = 'inline'>Invite Other Users:</span></h3>
      <h3 class = 'font-semibold text-center mx-auto relative mt-1.5 text-xl'>(Remaining Team Capacity: {project&&(project.maxCap - project.team.length)})</h3>

    

      <input type="text" onChange={textChangeHandler} class={`w-[270px] relative mx-auto block ${memberSelected?'mt-7':'md:mt-9 mt-12'}  py-2   pr-4  text-gray-900 bg-white border-0 pl-4 shadow-md rounded-md  focus:border-blue-00  focus:ring-blue-700 focus:ring-opacity-40 focus:outline-none focus:ring`} placeholder="Search User"/>
      <ul ref = {myRef} class={`bg-white border border-gray-100 ${allUsers.length ===0 || text === ''?'hidden':'block'} w-[270px] mx-auto absolute mt-[3px] left-0 right-0 mr-auto ml-auto z-40 shadow-md mb-8`}>
            {
              allUsers&&allUsers.map(user=> {
                return (
<li onClick={()=>{
 setMemberSelected({
  name: user.firstName + ' ' + user.lastName,
  pic: user.profilePic,
  id: user._id
});
setText('');
}
 } class="pl-8 pr-2 py-2 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                <svg class="absolute w-4 h-4 left-2 top-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>

                <img class = 'rounded-full mr-2 h-9 w-9 inline' src={user.profilePic?user.profilePic:"https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="} ></img>
                <b class = 'relative top-[1px]'>{user.firstName}</b> <span class = 'relative top-[1px]'>{user.lastName}</span>
            </li>
                )
              })
            }
            
        </ul>
      <h3 class = {`relative mx-auto block ${memberSelected?'mt-7':'md:mt-8 mt-12'}  text-center`}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline relative bottom-[3px] mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
</svg> <p class = 'inline font-semibold'><span class = 'md:mb-0 mb-7 relative'>Member Selected:</span><br class = {`${memberSelected?'md:hidden block':'hidden'} `}/> {memberSelected?<>

  <img class = 'rounded-full mr-2.5 md:mt-0 mt-12 md:bottom-[1px] bottom-[23px] relative h-9 ml-6 w-9 inline' src={memberSelected.pic?memberSelected.pic:"https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="} ></img>
  <b class = 'relative font-semibold top-[1px]'>{memberSelected.name}</b> 

  {
    memberSelected? <button onClick={()=> setMemberSelected(null)} class = 'py-2.5 px-3 top-[0px]  shadow-sm text-sm focus:outline-none hover:shadow-lg active:shadow-sm leading-none relative left-6 text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200 xl:mr-2 sm:mr-4 mr-9 rounded'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[1px] relative mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
      <span class = 'font-semibold'>Cancel</span></button>:''
  }



</>:'None'}</p></h3>


{
  inviteSent?
  <h3 class = 'font-semibold text-green-700 text-center sm:mt-8 mt-9 relative  underline'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline relative bottom-[1.6px] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg><p class = 'inline text-black'>Successfully Invited User</p></h3>
:<button disabled={!memberSelected} onClick={sendInvite} class = {`${memberSelected?'from-indigo-300 to-indigo-500 shadow-md md:mt-[24px] mt-[10px]':" from-indigo-200 to-indigo-300 sm:mt-5 mt-7"} left-1.5  bg-gradient-to-br text-white font-semibold p-3 relative mx-auto block rounded-md pt-2.5`}>Send Invite</button>
}

</div>     
</div>


<div data-aos={"fade-up"} data-aos-once='true' class={`w-full relative lg:h-[480px] xl:h-[530px] col-span-1  `}>
<div class={`rounded-lg shadow-lg bg-gradient-to-r border-[1px] border-blue-600 lg:h-[480px] xl:h-[530px]  from-blue-50 to-indigo-100 h-fit overflow-hidden mb-0`}>
  <img
     src={project?project.projPic:''}
     alt="image"
     class="w-full h-56 object-contain py-3 -mb-3 bg-gray-50 border-b-2 border-gray-400 relative"
     />
  <div class="p-8 sm:p-9 md:px-7 md:pt-9 md:pb-10 lg:p-7 xl:py-9 xl:px-6 text-center">
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
     <p class="text-base text-body-color mt-4 lg:w-full xl:w-[300px]  md:w-[630px] md:block md:mx-auto md:justify-center md:text-center leading-relaxed mb-7">
       {project?project.problem:''}<br/>
       <p class = 'relative top-3 xl:top-7 -mb-5'><strong>Category:</strong> {project?project.category:''}<br/>
       </p>

     </p>
     
  </div>
</div>
</div>

<div data-aos={"fade-up"} data-aos-once='true'  data-aos-delay = '200' class={`w-full  relative h-fit lg:h-[480px] xl:h-[530px] col-span-1`}>
<div class={`rounded-lg shadow-lg bg-gradient-to-r  border-[1px] border-blue-600 h-fit lg:h-[480px] xl:h-[530px]  from-blue-50 to-indigo-200 overflow-hidden mb-0`}>
  <div class = 'h-40 sm:pt-1.5 xl:pb-4 pt-0'>
    <p className="text-center top-5 text-xl font-semibold relative mb-1">Applications Pending: </p><br/>
    <h1 className = 'text-center text-4xl text-blue-700 bottom-[1px] relative mb-1'>{project?project.joinRequests.length:' '}</h1>
    <p class="text-sm relative text-center bottom-[0.2px] font-light text-gray-600 sm:px-[50px] px-[25px] lg:px-[15px] ">Latest Pending Application Received On: <span class = 'text-indigo-500 font-semibold' >{latestReceived?latestReceived.date:'No Pending Applications'}</span></p>
  </div>
  <div class=" sm:pt-1.5 sm:pb-8 pt-1.5  lg:pt-2 pb-[26px] xl:h-[200px]  bg-gradient-to-r from-gray-50 to-slate-50 text-center">
  <p className="text-center top-4 text-xl font-semibold relative sm:px-[85px] px-10">Industry Mentors Appointed: </p><br/>
    <h1 className = 'text-center relative text-4xl text-blue-700'>{project?project.mentorshipPackages.length:''}</h1>
    <p class="text-sm relative text-center font-light top-1 text-gray-600 sm:px-[95px] px-[60px] lg:px-[20px] ">Upcoming Session With <span class = 'text-indigo-500 font-semibold'>Vismay Suramwar</span> On: {date?date:''}</p>     
  </div>
  <div class=" pt-2 pb-7 lg:pt-2 xl:align-middle xl:pt-4   text-center">
  <p className="text-center top-3 text-xl font-semibold relative">Documents Uploaded: </p><br/>
    <h1 className = 'text-center -top-1.5 relative text-4xl text-blue-700'>{project?project.documents.length:' '}</h1>
    <p class="text-sm relative text-center -top-0.5 font-light text-gray-600 sm:px-[96px] px-[60px] lg:px-[15px] ">Latest Document Uploaded On: {date?date:''}</p>     
  </div>
</div>
</div>

      <div data-aos={"fade-up"} data-aos-once='true' data-aos-delay = '400' className=" col-span-1 lg:left-[50%] xl:left-0 lg:relative  xl:mb-0">
          <CardTeam />
        </div>
      </div>





      <div  data-aos={"fade-up"} data-aos-once='true'  className="flex flex-wrap  sm:px-16 px-[18px] sm:right-0.5 right-[1px] relative mt-3.5 -mb-[240px]">

        <div className="w-full xl:w-8/12 mb-9 mt-2 lg:mt-3 relative xl:mb-0 xl:px-2 xl:left-0 left-[3px] ">
          <CardPageVisits />
        </div>
        <div  className="w-full xl:w-4/12 mt-3 relative xl:px-2 xl:left-0 left-[3px] ">
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
