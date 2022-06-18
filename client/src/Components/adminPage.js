import {useEffect, useRef, useState} from 'react';
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const AdminPage = () => {

    const [projects, setProjects] = useState([])
    const location = useLocation()
    let projectsTemp = [];

   

    const [showPanel, setShowPanel] = useState(false)

    const checkInput = () => {
        if(document.getElementById('inputAdmin').value === 'xw') {
            axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjectsAdmin':'http://localhost:4000/api/user/getAllProjectsAdmin').then(res=> {
            projectsTemp = res.data
    let projectsRequested = [];
    for(let i = 0; i<projectsTemp.length;i++) {
        for(let j = 0; j<projectsTemp[i].mentorshipPackages.length;j++) {
            if(projectsTemp[i].mentorshipPackages[j].paymentPending===false && projectsTemp[i].mentorshipPackages[j].sessionScheduled===false &&  projectsTemp[i].mentorshipPackages[j].sessionRequested===true) {
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
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateLatestPendingSessionAdmin':'http://localhost:4000/api/user/updateLatestPendingSessionAdmin',{ projectID:projPackage._id, updated:{
      sessionAccepted:true,
    }}).then(res=> {
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjectsAdmin':'http://localhost:4000/api/user/getAllProjectsAdmin').then(res=> {
        projectsTemp = res.data
let projectsRequested = [];
for(let i = 0; i<projectsTemp.length;i++) {
    for(let j = 0; j<projectsTemp[i].mentorshipPackages.length;j++) {
        if(projectsTemp[i].mentorshipPackages[j].paymentPending===false && projectsTemp[i].mentorshipPackages[j].sessionScheduled===false &&  projectsTemp[i].mentorshipPackages[j].sessionRequested===true) {
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
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateLatestPendingSessionAdmin':'http://localhost:4000/api/user/updateLatestPendingSessionAdmin',{ projectID:projPackage._id, updated:{
      sessionScheduled:true,
      sessionLink:document.getElementById('linkInput').value
    }}).then(res=> {
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjectsAdmin':'http://localhost:4000/api/user/getAllProjectsAdmin').then(res=> {
        projectsTemp = res.data
let projectsRequested = [];
for(let i = 0; i<projectsTemp.length;i++) {
    for(let j = 0; j<projectsTemp[i].mentorshipPackages.length;j++) {
        if(projectsTemp[i].mentorshipPackages[j].paymentPending===false && projectsTemp[i].mentorshipPackages[j].sessionScheduled===false &&  projectsTemp[i].mentorshipPackages[j].sessionRequested===true) {
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



    let mentor= {
        name: '',
        background:'',
        pricing:[],
        strengths:[],
        role:'',
        pic:'',
        mentorshipProp:'',
        contact:[],
        availableDates:[]
    }

    const addMentor = () => {
        mentor.pic = image

        mentor.name = document.getElementById('mentorName').value
        mentor.background = document.getElementById('mentorBackground').value
        mentor.role = document.getElementById('mentorRole').value
        mentor.strengths[0] = document.getElementById('mentorStrength1').value
        mentor.strengths[1] = document.getElementById('mentorStrength2').value
        mentor.strengths[2] = document.getElementById('mentorStrength3').value
        mentor.pricing[0] = parseFloat(document.getElementById('mentorPricing').value)
        if(document.getElementById('mentorMail').value){
            mentor.contact[0] = document.getElementById('mentorMail').value
        }
        if(document.getElementById('mentorNumber').value){
            mentor.contact[1] = document.getElementById('mentorNumber').value
        }
        mentor.mentorshipProp = document.getElementById('mentorMentorshipProp').value

        if(document.getElementById('date1').value){
            mentor.availableDates[0] = document.getElementById('date1').value
        }
        if(document.getElementById('date2').value){
            mentor.availableDates[1] = document.getElementById('date2').value

        }
        if(document.getElementById('date3').value){
            mentor.availableDates[2] = document.getElementById('date3').value
        }
        if(document.getElementById('date4').value){
            mentor.availableDates[3] =  document.getElementById('date4').value
        }

     console.log(mentor)
      

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/addMentorAdmin':'http://localhost:4000/api/user/addMentorAdmin',mentor).then(res=> {
          console.log(res.data) ;
          setAddingMentor(false)
          }).catch(err=> {
                  console.log(err.response)
        })
    }


    const modifyMentor = () => {
        mentor = mentorSelected
            mentor.pic = image ? image:mentor.pic   
        mentor.name = document.getElementById('mentorNameMod').value?document.getElementById('mentorNameMod').value:mentor.name
        mentor.background = document.getElementById('mentorBackgroundMod').value?document.getElementById('mentorBackgroundMod').value:mentor.background
        mentor.role = document.getElementById('mentorRoleMod').value?document.getElementById('mentorRoleMod').value:mentor.role
        mentor.strengths[0] = document.getElementById('mentorStrength1Mod').value?document.getElementById('mentorStrength1Mod').value:mentor.strengths[0]
        mentor.strengths[1] = document.getElementById('mentorStrength2Mod').value?document.getElementById('mentorStrength2Mod').value:mentor.strengths[1]
        mentor.strengths[2] = document.getElementById('mentorStrength3Mod').value?document.getElementById('mentorStrength3Mod').value:mentor.strengths[2]
        mentor.pricing[0] = parseFloat(document.getElementById('mentorPricingMod').value?document.getElementById('mentorPricingMod').value:mentor.pricing[0])
        if(document.getElementById('mentorMailMod').value){
            mentor.contact[0] = document.getElementById('mentorMailMod').value
        }
        if(document.getElementById('mentorNumberMod').value){
            mentor.contact[1] = document.getElementById('mentorNumberMod').value
        }
        mentor.mentorshipProp = document.getElementById('mentorMentorshipPropMod').value?document.getElementById('mentorMentorshipPropMod').value:mentor.mentorshipProp

        // if(document.getElementById('date1').value){
        //     mentor.availableDates[0] = document.getElementById('date1').value
        // }
        // if(document.getElementById('date2').value){
        //     mentor.availableDates[1] = document.getElementById('date2').value

        // }
        // if(document.getElementById('date3').value){
        //     mentor.availableDates[2] = document.getElementById('date3').value
        // }
        // if(document.getElementById('date4').value){
        //     mentor.availableDates[3] =  document.getElementById('date4').value
        // }

    
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/modifyMentorAdmin':'http://localhost:4000/api/user/modifyMentorAdmin',{mentor,id:mentorSelected._id}).then(res=> {
          console.log(res.data) ;
          setDetailModifying('')
          }).catch(err=> {
                  console.log(err.response)
        })
    }


    const [addingMentor, setAddingMentor] = useState(false);
    const [image, setImage] = useState();
    let inputRef = useRef()

    const picUpload = (e) => {
        const data = new FormData();
        data.append('image',e.target.files[0]);
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/uploadPicAdmin':'http://localhost:4000/api/user/uploadPicAdmin',data).then(res=> {
            console.log(res.data) ;
            setImage(res.data)
            }).catch(err=> {
                    console.log(err.response)
          })
    }

    const showAddMentor = () => {
        setAddingMentor(true)
    }

    const [modifyingMentor, setModifyingMentor] = useState();
    const [experts, setExperts] = useState([])
    const showModifyMentor = () => {
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getMentorsAdmin':'http://localhost:4000/api/project/getMentorsAdmin',
        ).then(res => {
            setExperts(res.data)
            setModifyingMentor(true)
        }).catch(err => {
            console.log(err.response)
        })
    }


    
    const closeModifyMentor = () => {
        setModifyingMentor(false)
    }
    const closeAddMentor = () => {

        setAddingMentor(false)

    }


    const [mentorSelected, setMentorSelected] = useState()


    const [detailModifying, setDetailModifying] = useState('')
    const [dateMentor, setDateMentor] = useState({

    })

    const changeDate = (e) => {
        let mentTemp = dateMentor;
        mentTemp.availableDates[parseInt(e.target.name[4])-1] = e.target.value;
        setDateMentor(mentTemp)
    }   

    const changeDates = (e) => {
        console.log(dateMentor.availableDates)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/modifyMentorAdmin':'http://localhost:4000/api/user/modifyMentorAdmin',{mentor:dateMentor,id:mentorSelected._id}).then(res=> {
            console.log(res.data) ;
            setDetailModifying('')
            }).catch(err=> {
                    console.log(err.response)
          })

    }



    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return (
          [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-') +
          ' ' +
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(':')
        );
      } 

  
     const [chkDate, setChkDate] = useState(false)



    return (
        <>
        <div class = {`w-full  -mb-[380px] relative top-2 ${showPanel?addingMentor||detailModifying==='details'?'h-[1500px]':projects.length===0?'pt-12 h-[688px]':managing==='requests'?"h-[1050px] pt-12":'h-[720px] pt-20':'pt-20 h-[688px]'} overflow-hidden`}>
            <h1 className={`font-bold text-center text-5xl mb-3 ${addingMentor||detailModifying==='details'?'mt-14':managing===''?'mt-7':'mt-1'} relative `}>Admin Panel {projects.length===0?<p class = 'inline text-3xl underline'>- minimum UI :p</p>:''}</h1>


            {
                showPanel===true?

                managing ===  'requests'?


                <div className = 'w-full h-full  justify-center items-center'>
                 <h3 class = 'text-3xl underline font-semibold block mx-auto relative my-6 top-9  text-center'>Managing Requests</h3>

                 <div class = 'relative block mt-[80px]'>

                 {
                     projects.length>0?
    projects&&projects.map((project,i)=> {
        let mentorship = project.mentorshipPackages[0];
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
            <div class = {`bg-gray-50 rounded-md h-fit p-3 pt-5 w-11/12 mx-auto justify-center text-center shadow-xl relative ${i===currentIndex?'block':'hidden'}`}>
                <p class = 'text-lg mb-4 relative underline'><strong>Project Name:</strong> {project.name}</p>
                <p class = 'relative text-sm mb-1.5'><strong>Project Admin:</strong> {project.admin.name}</p>
                <p class ='text-sm'><strong>Mentor Name:</strong> {mentorship.name}</p>
                <p class ='text-sm'><strong>Mentor Background/Speciality:</strong> {mentorship.role}</p>
                <p class ='text-sm'><strong>Mentor Mail:</strong> {mentorship.contact[0]}</p>
                <p class = 'relative text-sm mb-5'><strong>Mentor No.:</strong> {mentorship.contact[1]}</p>
                <p class = 'relative text-md mb-5 uppercase'><strong class = 'underline'>Total Payment:</strong> {mentorship.individualTotalCost*mentorship.teamSize} AED {mentorship.isFirstFree?'(First Session Free)':''}</p>
                <p class  = 'text-md uppercase left-[1px] relative'><strong><span class = 'underline'>Status:</span></strong> {statusM}</p>


                <p class  = 'text-md uppercase left-[1px] my-6 relative'>Session <strong>{mentorship.numberOfSessions-mentorship.numberOfSessionsRemaining+1}</strong> of  <strong>{mentorship.numberOfSessions}</strong></p>


                {
                    statusM == 'Appointment Requested' ?
                    <>
                    <p class  = 'text-md uppercase underline'><strong>Requested Time: {new Date(mentorship.scheduleSelected).toDateString()+' '+new Date(mentorship.scheduleSelected).toLocaleString().substring(10)}</strong></p>

                    <button onClick = {()=>acceptDate(i)} class = ' bg-indigo-500 left-[2px]  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block  shadow-md py-2 mt-6 mb-4 text-white font-semibold '>Accept & Ask for Confirmation</button>
                    </>
:statusM == 'Confirmed Session'? 
<>
<p class  = 'text-md uppercase mt-5 left-[1px] relative'><strong>Enter Zoom Link & Confirm Session</strong></p>

<input id = 'linkInput' class = 'p-2 py-1.5 w-10/12 mb-5 mt-4 border-[1px] border-gray-600 rounded-md shadow-lg mx-auto block'></input>

<button onClick = {()=>sendLink(i)} class = ' bg-indigo-500 left-[2px]  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block  shadow-md py-2 mt-2 mb-4 text-white font-semibold '>Confirm Session</button>
</>
:statusM == 'Request Accepted, But Team Has Not Confirmed'?
<>
<p class  = 'text-lg uppercase '><strong><span class = 'underline'>Requested Time:</span></strong> {new Date(mentorship.scheduleSelected).toDateString()+' '+new Date(mentorship.scheduleSelected).toLocaleString().substring(10) + ' - ' + Date(mentorship.scheduleSelected).toLocaleString().substring(34)}</p>
<p class  = 'text-md uppercase mt-2 mb-2 left-[1px] relative'></p>
</>
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

<button onClick= {()=>setManaging('')} class  = ' mt-9 left-1 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-5 z-50'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mr-1 relative bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
</svg>
    <span class = 'inline'>GO BACK</span></button>


                </div>
                

                :managing === 'mentors'?
<>

    {!addingMentor && !modifyingMentor?

<>

<h3 class = 'text-3xl underline font-semibold block mx-auto relative my-6 top-9  text-center'>Managing Mentors</h3>

<button onClick= {()=>{setManaging('')}} class  = ' mt-24 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[250px] relative block mb-14'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mr-1 relative bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
</svg>
    <span class = 'inline'>
    Go Back</span></button>

<button onClick= {showAddMentor} class  = ' mt-8 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-3'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 relative bottom-[2px] mr-1 inline -ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>
    <span class = 'inline'>Add Mentor</span></button>
<button onClick= {showModifyMentor}  class  = ' mt-5 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[250px] relative block mb-5 z-50'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mr-1.5 relative bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
</svg>
    
    <span class = 'inline'>Modify Mentor Details</span></button>
</>

:

modifyingMentor?

mentorSelected?


detailModifying==='details'?

<div class = 'mt-10 mb-[200px] h-[800px] relative mx-auto block text-center justify-center'>
    
    <button onClick= {()=>setDetailModifying('')} class  = 'z-40 mt-20 mb-12 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block'>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        
        
        <span class = 'inline'>CANCEL</span></button>
    
        
        <p class = 'underline text-center mb-9 text-3xl'>Enter mentor details (UPDATING):</p>
        <input ref={inputRef} onChange = {picUpload} type="file" name="article_picture" style={{'display': 'none'}}/>
    
        <input class = 'p-3 mb-2 w-[30%]' name = 'name' id = 'mentorNameMod' placeholder={mentorSelected.name}></input><br/>
        <button onClick={(e)=>{e.preventDefault(); inputRef.current.click()}} class = 'font-semibold  p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md my-3 hover:cursor-pointer sm:mt-0 mt-4 hover:text-indigo-600 text-blue-600 uppercase w-[30%]'>Upload Picture</button><br/>
    
        <input class = 'p-3 mb-2 w-[30%]' name = 'role' id = 'mentorRoleMod' placeholder={mentorSelected.role}></input><br/>
        <textarea class = 'p-3 mb-2 w-[60%] h-[100px]' id = 'mentorMentorshipPropMod' name = 'mentorshipProp' placeholder={mentorSelected.mentorshipProp}></textarea><br/>
        <input class = 'p-3 mb-1 w-[30%] ' name = 'strengths' id = 'mentorStrength1Mod' placeholder={mentorSelected.strengths[0]}></input><br/>
        <input class = 'p-3 mb-1 w-[30%] ' name = 'strengths' id = 'mentorStrength2Mod' placeholder={mentorSelected.strengths[1]}></input><br/>
        <input class = 'p-3 w-[30%] ' name = 'strengths' id = 'mentorStrength3Mod' placeholder={mentorSelected.strengths[2]}></input><br/><br/>
    
        <textarea class = 'p-3 mb-2 w-[60%] h-[100px]' name = 'background' id = 'mentorBackgroundMod' placeholder={mentorSelected.background}></textarea><br/>
        <input type={'number'} class = 'p-3 mb-2 w-[30%]' name = 'pricing' id = 'mentorPricingMod' placeholder={mentorSelected.pricing}></input><br/>
 
        <h2 class = 'my-4 mb-4 text-center underline uppercase text-xl'>Optional (Based on Whether Mentor Provides):</h2>
        
        <input class = 'p-3 mb-2 w-[30%]' name = 'contact-number' id = 'mentorNumberMod' placeholder = {mentorSelected.contact[0]}></input><br/>
        <input class = 'p-3 mb-2 w-[30%]'  name = 'contact-mail' id = 'mentorMailMod' placeholder={mentorSelected.contact[1]}></input><br/>
    
        <button onClick= {modifyMentor} class  = ' mt-12 z-[70]  font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-1 '>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1.5 relative bottom-[2px] inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
</svg>
            <span class = 'inline'>
                SUBMIT</span></button>
        <button onClick= {()=>setDetailModifying('')} class  = 'z-[70] pointer-events-auto mt-3 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-5'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        
        
        <span class = 'inline'>
            CANCEL</span></button>
    
    
    </div>
    


:

detailModifying === 'dates'?


<>

<button onClick= {()=>{setDetailModifying(''); setDateMentor('');}} class  = 'z-40 mt-20 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-5'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        
        
        <span class = 'inline'>
    
    CANCEL</span></button>


<h2 class = 'my-16 mb-8 text-center underline uppercase text-xl'>Modify Required Dates:</h2>

<div class = 'relative block mx-auto z-40 pointer-events-auto mt-3 text-center justify-center'>
<input type = 'text' id="txtbox" onFocus={(e) => e.target.type = 'datetime-local'} onBlur={(e) => e.target.type = 'text'} onChange = {changeDate}  class = {`z-40 p-3 mb-2 w-[20%] mr-2 ${new Date(dateMentor.availableDates[0])<new Date()?'bg-orange-100 text-red-500':''}`} name = 'date1' id = 'date1'  placeholder = {dateMentor.availableDates[0]?formatDate(new Date(dateMentor.availableDates[0])):''} ></input>
<input type = 'text' id="txtbox" onFocus={(e) => e.target.type = 'datetime-local'} onBlur={(e) => e.target.type = 'text'} onChange = {changeDate} class = {`z-40 p-3 mb-2 w-[20%] mr-2 ${new Date(dateMentor.availableDates[1])<new Date()?'bg-orange-100 text-red-500':''}`} name = 'date2' id = 'date2' placeholder = {dateMentor.availableDates[1]?formatDate(new Date(dateMentor.availableDates[1])):''} ></input>
<input type = 'text' id="txtbox" onFocus={(e) => e.target.type = 'datetime-local'} onBlur={(e) => e.target.type = 'text'} onChange = {changeDate} class = {`z-40 p-3 mb-2 w-[20%] mr-2 ${new Date(dateMentor.availableDates[2])<new Date()?'bg-orange-100 text-red-500':''}`} name = 'date3' id = 'date3' placeholder = {dateMentor.availableDates[2]?formatDate(new Date(dateMentor.availableDates[2])):''}></input>
<input type = 'text' id="txtbox" onFocus={(e) => e.target.type = 'datetime-local'} onBlur={(e) => e.target.type = 'text'} onChange = {changeDate} class = {`z-40 p-3 mb-2 w-[20%] ${new Date(dateMentor.availableDates[3])<new Date()?'bg-orange-100 text-red-500':''}`} name = 'date4' id = 'date4' placeholder = {dateMentor.availableDates[3]?formatDate(new Date(dateMentor.availableDates[3])):''}></input><br/>
</div>

<button onClick= {()=>{changeDates()}} class  = 'z-[70]  mt-6 mb-12 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mr-1.5 relative bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
</svg>
            <span class = 'inline'>
    SUBMIT</span></button>

</>


:

<>

<button onClick={()=>setMentorSelected('')} class = 'z-40 relative mx-auto top-12 block -mb-1 bg-blue-700 p-3 text-white uppercase w-[30%] font-semibold'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        
        
        <span class = 'inline'>
    CANCEL</span></button><br/>


<h3 class = 'relative mx-auto mt-20 underline font-semibold text-2xl text-center'>{mentorSelected.name + ' (' + mentorSelected.role+') '}</h3>
<button onClick={()=>setDetailModifying('details')} class = 'relative mx-auto top-16 block -mb-1 bg-blue-700 p-3 text-white uppercase w-[30%] font-semibold'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
</svg>
    
    <span class = 'inline'>OTHER DETAILS</span></button><br/>
<button onClick={()=>{setDetailModifying('dates'); setDateMentor(mentorSelected)}} class = 'relative mx-auto top-16 block -mb-1 bg-blue-700 p-3 text-white z-40 uppercase w-[30%] font-semibold'>
    
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
    
    <span class = 'inline'>DATES {chkDate?'(Needs Rescheduling)':''}</span></button><br/>

</>


:
<>
<button onClick= {()=>{closeModifyMentor()}} class  = 'z-40 mt-20 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-5'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        
        
        <span class = 'inline'>
    CANCEL</span></button>

{
    experts&&experts.map(expert=> {
        let chk = false
        for(let x = 0; x<expert.availableDates.length;x++){
            if(new Date()>new Date(expert.availableDates[x])){
                chk = true;
            }
        }

    
        return (
            <>
            <button onClick={()=>{setMentorSelected(expert);
             if(chk){
                setChkDate(true)
            }else {
                setChkDate(false)
            }
            }} class = 'relative mx-auto top-12 block -mb-1 bg-blue-700 p-3 text-white uppercase w-[30%]'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline relative mr-1.5 bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                
                <span class = 'inline'>{expert.name} {chk?'(Needs Rescheduling)':''}</span></button><br/>
            </>
        )

    })
}


</>


:



<div class = 'mt-10 mb-[200px] h-[800px] relative mx-auto block text-center justify-center'>
    
<button onClick= {closeAddMentor} class  = 'z-40 mt-12 mb-12 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        
        
        <span class = 'inline'>
    CANCEL</span></button>

    
    <p class = 'underline text-center mb-9 text-3xl'>Enter mentor details (ADDING):</p>
    <input ref={inputRef} onChange = {picUpload} type="file" name="article_picture" style={{'display': 'none'}}/>

    <input class = 'p-3 mb-2 w-[30%]' name = 'name' id = 'mentorName' placeholder='Enter Mentor Name'></input><br/>
    <button onClick={(e)=>{e.preventDefault(); inputRef.current.click()}} class = 'font-semibold  p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md my-3 hover:cursor-pointer sm:mt-0 mt-4 hover:text-indigo-600 text-blue-600 uppercase w-[30%]'>Upload Picture</button><br/>

    <input class = 'p-3 mb-2 w-[30%]' name = 'role' id = 'mentorRole' placeholder='Enter Mentor Speciality/Role'></input><br/>
    <textarea class = 'p-3 mb-2 w-[60%] h-[100px]' id = 'mentorMentorshipProp' name = 'mentorshipProp' placeholder="Enter Mentorship Proposition (Description of how they'll help)"></textarea><br/>
    <input class = 'p-3 mb-1 w-[30%] ' name = 'strengths' id = 'mentorStrength1' placeholder="Mentor Strength 1"></input><br/>
    <input class = 'p-3 mb-1 w-[30%] ' name = 'strengths' id = 'mentorStrength2' placeholder="Mentor Strength 2"></input><br/>
    <input class = 'p-3 w-[30%] ' name = 'strengths' id = 'mentorStrength3' placeholder="Mentor Strength 3"></input><br/><br/>

    <textarea class = 'p-3 mb-2 w-[60%] h-[100px]' name = 'background' id = 'mentorBackground' placeholder="Enter Mentor Background (Career Background Info)"></textarea><br/>
    <input type={'number'} class = 'p-3 mb-2 w-[30%]' name = 'pricing' id = 'mentorPricing' placeholder='Price per session (AED)'></input><br/>
    <h2 class = 'my-4 mb-4 text-center underline uppercase text-xl'>Enter Available Dates for the Month (Atleast 1):</h2>

    <input type = 'datetime-local'  class = 'p-3 mb-2 w-[20%] mr-2' name = 'date1' id = 'date1' placeholder='Date 1 '></input>
    <input type = 'datetime-local' class = 'p-3 mb-2 w-[20%] mr-2' name = 'date2' id = 'date2' placeholder='Date 2'></input>
    <input type = 'datetime-local' class = 'p-3 mb-2 w-[20%] mr-2' name = 'date3' id = 'date3' placeholder='Date 3'></input>
    <input type = 'datetime-local' class = 'p-3 mb-2 w-[20%]' name = 'date4' id = 'date4' placeholder='Date 4'></input><br/>

    <h2 class = 'my-4 mb-4 text-center underline uppercase text-xl'>Optional (Based on Whether Mentor Provides):</h2>
    
    <input class = 'p-3 mb-2 w-[30%]' name = 'contact-number' id = 'mentorNumber' placeholder='Enter Contact Number'></input><br/>
    <input class = 'p-3 mb-2 w-[30%]'  name = 'contact-mail' id = 'mentorMail' placeholder='Enter Contact Email'></input><br/>

    <button onClick= {addMentor} class  = ' mt-12 z-[70]  font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-1'>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mr-1.5 relative bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
</svg>
            <span class = 'inline'>
        SUBMIT</span></button>
    <button onClick= {closeAddMentor} class  = 'z-[70]  mt-3 font-semibold uppercase bg-blue-700 text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-5'>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline bottom-[2px] relative mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        
        
        <span class = 'inline'>
        CANCEL</span></button>


</div>


    }



</>
                :


                <>

                <h3 class = 'text-center mx-auto block underline font-semibold text-3xl top-16 mb-6 relative'>What do you want to Manage?</h3>
                <div class = 'mx-auto relative block mt-32 gap-4'>
                        <button class = 'bg-blue-700 font-semibold uppercase text-white  p-3 shadow-md mx-auto w-[240px] relative block mb-4' onClick={()=> setManaging('mentors')}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-1.5 relative bottom-[2px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
</svg>
                            
                            <span class = 'inline'>Manage Experts/Mentors</span></button>
                        <button class = 'bg-blue-700 z-[70] font-semibold uppercase text-white  p-3 shadow-md mx-auto w-[200px] relative block mb-0' onClick={()=> setManaging('requests')}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-1.5 relative bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
</svg>
                            
                            
                            <span class = 'inline'>Manage Requests</span></button>
                </div>
                
                
                
                </>


                :<>

                <p class = 'font-semibold mt-9 text-center relative top-20'>Hi Abhay/Vismay, Enter your admin code here:</p>
                <input id = {'inputAdmin'} class = 'p-3 rounded-md shadow-md text-center mx-auto block relative top-28'></input>
                <button onClick={checkInput} class = 'p-14 py-2 z-[70]  pointer-events-auto rounded-md shadow-md hover:shadow-xl active:shadow-sm text-center mx-auto block relative top-48 uppercase font-semibold bg-indigo-600 text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 inline w-6 mr-1.5 relative bottom-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
</svg>
            <span class = 'inline'>
                    Submit</span></button>
                </>
            }
      

        </div>

        </>
    )
}

export default AdminPage