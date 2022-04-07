import React from "react";
import { useEffect, useContext,useState } from "react";
import projectContext from "../../../context/projectContext";
import {RiTeamFill} from 'react-icons/ri'

// components



export default function CardTeam() {
   const projectsCurr = useContext(projectContext)
    const [proj, setProj] = useState('')

useEffect(()=> {
 let projSelected = ''
 if(sessionStorage.getItem('managing')){
     projSelected = projectsCurr.projects.filter((proj)=> {
       return proj._id === String(sessionStorage.getItem('managing'))
     })[0]      
 }
 setProj(projSelected?projSelected:'')

},[sessionStorage.getItem('managing')])


      
  return (
    <>
      <div className="relative border-[1px] border-blue-600 h-fit lg:h-[480px] xl:h-[530px] flex flex-col min-w-0 break-words  w-full mb-4 bg-gradient-to-r from-white to-indigo-200 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 py-2 -mt-5 max-w-full flex-grow flex-1">
                
              <h3 className="font-bold ml-7 relative text-center text-black text-lg text-blueGray-700">
              <RiTeamFill class = 'text-xl top-[22.4px] left-[61px] relative'/>Team Members
              </h3>
            </div>
           
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
        <hr className="border-2-b mb-1 border-blue-600  w-full"/>

          {/* Projects table */}
          <table className="items-center w-full mb-2 h-[25.4rem]   bg-transparent border-collapse">
          

             
            <tbody class = 'overflow-scroll'>

              {proj && proj.team.map((teamMember,i) => {


return (
  <>
            <tr>
              <div class={`flex items-center text-md justify-center mx-auto relative bottom-0.5 ${i>0?'-mt-[325px] bottom-1':''} bg-gradient-to-r from-indigo-200 to-green-100 border-b-[1px] py-4 pb-5 border-blue-600`}>
                   <img class="hidden object-cover w-10 h-10 shadow-md mx-2 relative right-1 rounded-full sm:block" src={teamMember.pic?teamMember.pic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>
                   <a class="font-bold text-gray-700 mr-6  relative cursor-pointer ">
                        {proj?teamMember.name:''}{i==0?' (Admin)':''}
                   </a>
                   
                   
               </div>
                
              </tr>
     
              </>
)

    
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
