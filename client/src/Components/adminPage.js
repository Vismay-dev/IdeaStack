import {useEffect, useState} from 'react';
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const AdminPage = () => {

    const [projectsPaid, setProjectsPaid] = useState([])
    const location = useLocation()
    let projects = [];

   

    const [showPanel, setShowPanel] = useState(false)

    const checkInput = () => {
        if(document.getElementById('inputAdmin').value === 'TeamIdeaStackWins300305') {
            axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/getProjectsPaid':'http://localhost:4000/api/user/getProjectsPaid').then(res=> {
            projects = res.data
            console.log(projects)
            setProjectsPaid(projects);
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

 
    return (
        <>
        <div class = 'w-full h-[935px] -mb-64 top-2 overflow-hidden'>
            <h1 className="font-bold text-center text-4xl relative top-12">Admin Panel</h1>


            {
                showPanel===true?

                <div className = 'w-full h-full  justify-center items-center'>
                 

                
                    <br/>

<div class = 'flex mx-auto justify-center mt-2 '>

<svg xmlns="http://www.w3.org/2000/svg" onClick={()=> {
  setCurrentIndex(currentIndex>0?currentIndex-1:projectsPaid.length-1)
}} class=" hover:h-12 hover:w-12 block z-40 -ml-3 cursor-pointer hover:bottom-3 hover:text-indigo-600 bottom-2  h-10 w-10  relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
                    <p class = 'relative  ml-5  font-semibold'><span class = 'text-indigo-600'>Previous</span> Applicant</p>


<p class = 'relative font-semibold ml-14 mr-5'><span class = 'text-indigo-600'>Next</span> Applicant</p>
<svg onClick={()=> {
  setCurrentIndex(currentIndex<projectsPaid.length-1?currentIndex+1:0)
}} xmlns="http://www.w3.org/2000/svg" class="z-40 hover:h-12 hover:bottom-3 hover:w-12 hover:text-indigo-600 bottom-2 h-10 w-10 cursor-pointer relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>


</div>


                </div>
                

                :<>

                <p class = 'font-semibold mt-6 text-center relative top-20'>Hi Abhay/Vismay, Enter your admin code here:</p>
                <input id = {'inputAdmin'} class = 'p-3 rounded-md shadow-md text-center mx-auto block relative top-28'></input>
                <button onClick={checkInput} class = 'p-3 py-2 rounded-md shadow-md text-center mx-auto block relative top-36 bg-indigo-600 text-white'>Submit</button>
                </>
            }
      

        </div>

        </>
    )
}

export default AdminPage