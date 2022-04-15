import {useEffect, useState} from 'react';
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const AdminPage = () => {

    const [projects, setProjects] = useState([])
    const location = useLocation()
    let projectsTemp = [];

   

    const [showPanel, setShowPanel] = useState(false)

    const checkInput = () => {
        if(document.getElementById('inputAdmin').value === 'TeamIdeaStackWins300305') {
            axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/getAllProjectsAdmin':'http://localhost:4000/api/user/getAllProjectsAdmin').then(res=> {
            projectsTemp = res.data
    let projectsRequested = [];
    for(let i = 0; i<projectsTemp.length;i++) {
        for(let j = 0; j<projectsTemp[i].mentorshipPackages.length;j++) {
            if(projectsTemp[i].mentorshipPackages[i].paymentPending===false && projectsTemp[i].mentorshipPackages[i].sessionScheduled===false &&  projectsTemp[i].mentorshipPackages[i].sessionRequested===true) {
                projectsRequested.push(projectsTemp[i])
            }
        }
    }

    setProjects(projectsRequested);
    console.log(projectsRequested);


    
          }).catch(err=> {
                  console.log(err.response)
        })
        setShowPanel(true)
        }
    }

    const [currentIndex, setCurrentIndex] = useState(0)
    const [schedules, setSchedules] = useState([])
    const [project, setProject] = useState()
    const [mentorshipPackage, setMentorshipPackage] = useState();
    const [managing,setManaging] = useState()

    const submitSessionDetails = () => {
        let sessionDetails = {
            ...project,
            sessions: [

            ]
        }

        for(let i = 0; i<mentorshipPackage.numberOfSessions;i++) {
            sessionDetails.sessions.push(
                {
                    date:document.getElementById('date'+i).value,
                    link:document.getElementById('link'+i).value
                }   
            )
        }        

    }

    const acceptDate = (index) => {
        let projPackage = projects[index]
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/updateLatestPendingSessionAdmin':'http://localhost:4000/api/user/updateLatestPendingSessionAdmin',{ projectID:projPackage._id, updated:{
      sessionAccepted:true,
    }}).then(res=> {
      axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/getAllProjectsAdmin':'http://localhost:4000/api/user/getAllProjectsAdmin').then(res=> {
        projectsTemp = res.data
let projectsRequested = [];
for(let i = 0; i<projectsTemp.length;i++) {
    for(let j = 0; j<projectsTemp[i].mentorshipPackages.length;j++) {
        if(projectsTemp[i].mentorshipPackages[i].paymentPending===false && projectsTemp[i].mentorshipPackages[i].sessionScheduled===false &&  projectsTemp[i].mentorshipPackages[i].sessionRequested===true) {
            projectsRequested.push(projectsTemp[i])
        }
    }
}
setProjects(projectsRequested);

      }).catch(err=> {
              console.log(err.response)
    })
    }).catch(err=> {
          console.log(err);
  })  
    }


    const sendLink = (index) => {
        let projPackage = projects[index]
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/updateLatestPendingSessionAdmin':'http://localhost:4000/api/user/updateLatestPendingSessionAdmin',{ projectID:projPackage._id, updated:{
      sessionScheduled:true,
      sessionLink:document.getElementById('linkInput').value
    }}).then(res=> {
      axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/getAllProjectsAdmin':'http://localhost:4000/api/user/getAllProjectsAdmin').then(res=> {
        projectsTemp = res.data
let projectsRequested = [];
for(let i = 0; i<projectsTemp.length;i++) {
    for(let j = 0; j<projectsTemp[i].mentorshipPackages.length;j++) {
        if(projectsTemp[i].mentorshipPackages[i].paymentPending===false && projectsTemp[i].mentorshipPackages[i].sessionScheduled===false &&  projectsTemp[i].mentorshipPackages[i].sessionRequested===true) {
            projectsRequested.push(projectsTemp[i])
        }
    }
}
setProjects(projectsRequested);

      }).catch(err=> {
              console.log(err.response)
    })
    }).catch(err=> {
          console.log(err);
  })  
    }

 
    return (
        <>
        <div class = {`w-full  -mb-[400px] relative top-4 ${showPanel?projects.length===0?'pt-24 h-[688px]':"h-[800px]":'pt-10 h-[688px]'} overflow-hidden`}>
            <h1 className="font-bold text-center text-5xl mb-3 relative top-6">Admin Panel {projects.length===0?<p class = 'inline text-3xl underline'>- minimum UI :p</p>:''}</h1>


            {
                showPanel===true?

                managing ===  'requests'?


                <div className = 'w-full h-full  justify-center items-center'>
                 
                 <div class = 'relative block mt-[80px]'>
                 {
                     projects.length>0?
    projects&&projects.map((project,i)=> {
        let mentorship = project.mentorshipPackages.filter(packg=>packg.sessionScheduled===false)[0];
        let statusM

        if(mentorship.sessionConfirmed) {
            statusM = 'Confirmed Session'
        }else if(mentorship.sessionAccepted){
            statusM = 'Request Accepted, But Team Has Not Confirmed'
        }
        else if(mentorship.sessionRequested){
            statusM = 'Appointment Requested'
        }
        return (
            <div class = 'bg-gray-50 rounded-md h-fit p-3 pt-5 w-11/12 mx-auto justify-center text-center shadow-xl relative block'>
                <p class = 'text-lg mb-4 relative underline'><strong>Project Name:</strong> {project.name}</p>
                <p class = 'relative text-sm mb-1.5'><strong>Project Admin:</strong> {project.admin.name}</p>
                <p class ='text-sm'><strong>Mentor Name:</strong> {mentorship.name}</p>
                <p class ='text-sm'><strong>Mentor Background/Speciality:</strong> {mentorship.role}</p>
                <p class ='text-sm'><strong>Mentor Mail:</strong> {mentorship.contact[0]}</p>
                <p class = 'relative text-sm mb-5'><strong>Mentor No.:</strong> {mentorship.contact[1]}</p>
                <p class  = 'text-lg uppercase underline left-[1px] relative'><strong>Status: {statusM}</strong></p>

                {
                    statusM == 'Appointment Requested' ?
                    <>
                    <p class  = 'text-lg uppercase underline'><strong>Requested Time: {Date(mentorship.scheduleSelected).toLocaleString()}</strong></p>

                    <button onClick = {()=>acceptDate(i)} class = ' bg-indigo-500 left-[2px]  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block  shadow-md py-2 mt-6 mb-4 text-white font-semibold '>Accept & Ask for Confirmation</button>
                    </>
:statusM == 'Confirmed Session'? 
<>
<p class  = 'text-md uppercase mt-5 left-[1px] relative'><strong>Enter Zoom Link & Confirm Session</strong></p>

<input id = 'linkInput' class = 'p-2 py-1.5 w-10/12 mb-5 mt-4 border-[1px] border-gray-600 rounded-md shadow-lg mx-auto block'></input>

<button onClick = {()=>sendLink(i)} class = ' bg-indigo-500 left-[2px]  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block  shadow-md py-2 mt-2 mb-4 text-white font-semibold '>Confirm Session</button>
</>
:statusM == 'Request Accepted, But Team Has Not Confirmed'?
<p class  = 'text-md uppercase mt-2 mb-2 left-[1px] relative'></p>
:''
                }





            </div>
        )
    })
    :
    <h3 class = 'text-center font-semibold text-4xl mt-20 mb-4 relative block'>No <span class = 'text-indigo-600'>Session</span> Requests :(</h3>
}

</div>
                
                    <br/>



<div class = 'flex mx-auto justify-center mt-8 left-1.5 relative '>




<svg xmlns="http://www.w3.org/2000/svg" onClick={()=> {
  setCurrentIndex(currentIndex>0?currentIndex-1:projects.length-1)
}} class=" hover:h-12 hover:w-12 block z-40 -ml-3 cursor-pointer hover:bottom-3 hover:text-indigo-600 bottom-2  h-10 w-10  relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
                    <p class = 'relative  ml-5  font-semibold'><span class = 'text-indigo-600'>Previous</span> Request</p>


<p class = 'relative font-semibold ml-14 mr-5'><span class = 'text-indigo-600'>Next</span> Request</p>
<svg onClick={()=> {
  setCurrentIndex(currentIndex<projects.length-1?currentIndex+1:0)
}} xmlns="http://www.w3.org/2000/svg" class="z-40 hover:h-12 hover:bottom-3 hover:w-12 hover:text-indigo-600 bottom-2 h-10 w-10 cursor-pointer relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>


</div>


                </div>
                

                :managing === 'mentors'?



<></>
                :


                <></>


                :<>

                <p class = 'font-semibold mt-9 text-center relative top-20'>Hi Abhay/Vismay, Enter your admin code here:</p>
                <input id = {'inputAdmin'} class = 'p-3 rounded-md shadow-md text-center mx-auto block relative top-28'></input>
                <button onClick={checkInput} class = 'p-14 py-2 z-40 pointer-events-auto rounded-md shadow-md hover:shadow-xl active:shadow-sm text-center mx-auto block relative top-48 uppercase font-semibold bg-indigo-600 text-white'>Submit</button>
                </>
            }
      

        </div>

        </>
    )
}

export default AdminPage