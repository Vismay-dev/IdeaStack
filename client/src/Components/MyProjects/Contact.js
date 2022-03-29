import React from "react";
import { useEffect, useContext,useState } from "react";
import projectContext from '../../context/projectContext'
import axios from "axios";
import ReactTooltip from 'react-tooltip';

// components



const Contact = () => {

    const projectsCurr = useContext(projectContext)
    const [proj, setProj] = useState(null)

useEffect(()=> {
 let projSelected = ''
 if(sessionStorage.getItem('managing')){
     projSelected = projectsCurr.projects.filter((proj)=> {
       return proj._id === String(sessionStorage.getItem('managing'))
     })[0]      
 }
 setProj(projSelected?projSelected:'')

},[sessionStorage.getItem('managing')])

const [contacts, setContacts] = useState([])
useEffect(()=> {
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/getTeamContacts':'http://localhost:4000/api/project/getTeamContacts',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
            setContacts(res.data)
            }).catch(err=> {
                console.log(err)
            })    
},[proj, sessionStorage.getItem('managing')])

console.log(contacts)
const [showToolTip, setShowToolTip] = useState(false);

    return (
        <div style = {{'backgroundImage':'url(https://www.maxpixel.net/static/photo/1x/Paper-Desktop-Background-Notepad-Pencils-Paintbrush-3892369.jpg)'}}
        class = 'col-span-2 bg-opacity-75 row-span-2 bg-cover bg-no-repeat  bg-gradient-to-br from-blue-300 to-indigo-300 rounded-md shadow-xl'>
                 <div class = 'h-full inset-0 bg-gray-900 bg-opacity-[0.65] pt-4'>
                 
                        <h3 class = 'uppercase text-center font-semibold text-gray-100 mb-2 relative text-3xl'>Team Contacts</h3>
                        <hr class = 'mb-5 w-8/12 border-t-[0.3px] border-gray-100 mx-auto relative justify-center'></hr>

                        {
                            proj&&contacts&&contacts.map((contact,i)=> {
                                return (
                                    <>
                                    <div class={`flex items-center text-md justify-center mx-auto relative bottom-0.5  bg-gradient-to-r from-indigo-200 to-slate-100 border-b-[1px] py-2.5  border-blue-600`}>
                   <img class="hidden object-cover w-10 h-10 shadow-md mx-2 relative right-1 rounded-full sm:block" src={proj.team[i].pic?proj.team[i].pic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>
                   <a class="font-bold text-gray-700 mr-6  relative cursor-pointer ">
                   {proj?proj.team[i].name:''}{i==0?' (Admin)':''}
                   
                 <svg data-tip={contact} onMouseOver={() => setShowToolTip(true)} 
                 onMouseLeave={() => setShowToolTip(false)} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 font-semibold hover:cursor-pointer text-xl absolute top-[0.5px] -right-9  text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>

<ReactTooltip />




                   </a>
                   
                   
               </div>
                                    </>
                                )
                            })
                        }
</div>
        </div>
    )
}
export default Contact