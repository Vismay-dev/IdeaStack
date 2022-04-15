import { useEffect, useState } from "react"

import ReactTooltip from 'react-tooltip';
import ClipLoader from "react-spinners/ClipLoader"

const SessionList = (props) => {

    
    return (
        <div class="left-2 mt-5 relative w-full">
           
            <div class="bg-gradient-to-r from-blue-100 to-indigo-200 pt-4 left-1.5 relative  mt-7 rounded-md shadow-lg pb-11  sm:px-7  px-3">
                
                
             <>  
                <div class=" items-center top-2 mb-5 mt-1 xl:px-72 lg:px-48 md:px-24 sm:px-8 px-2  text-center  relative justify-center">
                        <p class="text-sm sm:text-gray-600 text-gray-800 mb-1.5 mt-1  sm:font-semibold font-normal leading-5 mx-auto relative block ">Payment for additional sessions is only enabled when the upcoming session has been conducted. </p>
                        <p class="text-sm sm:text-gray-600 text-gray-800 mt-3  sm:font-semibold font-normal leading-5 mx-auto relative block ">Payment by all members <p class = 'sm:inline hidden'>for a selected mentor</p> is required for session scheduling. </p>
                        <p class = 'xl:hidden block mx-auto text-center sm:mt-2.5 mt-4 sm:mb-10 mb-8 relative md:text-base text-sm sm:px-16 px-1.5  '><strong class = 'underline'>Note:</strong> Horizontally scroll panels to see more details on pending payments</p>

                </div>
                <div class=" mt-12">

                    <h1 class = 'mx-auto relative  block text-center font-bold text-2xl mb-8'>Upcoming Sessions:</h1>
                 

                        {


      props.loading?
      <div class ='relative mx-auto my-12 mb-12 pb-3 pt-1.5 text-center block justify-center'>
      <ClipLoader color={'#0b0bbf'} loading={props.loading}  size={60} />
      </div>
:
                                props.sessions && props.sessions[0].length!==0&& props.sessions[1].length===0?

                                <h1 class = 'relative mx-auto text-center text-xl justify-center mt-14 mb-14 right-[4px] block'>

                              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 mr-1.5 w-8 text-red-700 inline relative bottom-[1.6px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                              
                              <span class = 'font-semibold'>No Session Payment Has Been Completed</span></h1>
                                :

                                props.sessions && props.sessions[0].length===0&& props.sessions[1].length===0?

                                <h1 class = 'relative mx-auto text-center text-xl justify-center mt-14 mb-16 block'>

<svg xmlns="http://www.w3.org/2000/svg" class="h-8 mr-1.5 w-8 text-indigo-700 inline relative bottom-[1.6px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
</svg>
                           
                                
                                <span class = 'font-semibold'>No mentors selected, you're missing out!</span></h1>

:

props.loading?
<div class ='relative mx-auto sm:my-10 my-14 mb-12 pb-3 pt-1.5 text-center block justify-center'>
<ClipLoader color={'#0b0bbf'} loading={props.loading}  size={60} />
</div>
:
<div class = 'overflow-x-auto  my-2 pb-0 '>
<table class=" whitespace-nowrap  lg:w-full w-[1080px]  mb-12 mt-2 relative mx-auto space-y-2">
<tbody class = 'space-y-2  '>


                            {props.sessions&&props.sessions[1].map((session, i)=> {

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }



                                return (

                                    <tr key = {i} tabindex="0" class="focus:outline-none   h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded">
                                    <td>
                                        <div class="ml-5 -mr-20">
                    
                                            <img class="object-cover w-10 h-10 shadow-md mx-2  relative right-1 rounded-full block" src={session.pic} alt="avatar"/>

                                        </div>
                                    </td>
                                    <td class="-mr-20 ml-4 relative">
                                        <div class="flex items-center pl-20">
                                            <p class="text-sm font-medium leading-none text-gray-700 mr-2">{session.name}</p>
                                           
                                        </div>
                                    </td>

                                    <td class=" -mr-3 relative ">

                                    
                                  
                                        <div class="flex items-center relative left-4  lg:-mr-8 -mr-8">
                 

    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 top-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path d="M12 14l9-5-9-5-9 5 9 5z" />
  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
<path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
</svg>
                                            <p class="text-sm leading-none text-gray-600 ml-2">{session.role}</p>
                                        </div>
                                 
                                    
                                                                        </td>

                                                                        <td class=" lg:-mr-3  relative ">

                                    
                                  
<div class="flex items-center relative left-14 lg:-mr-8 -mr-8">


<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 top-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
    <p class={`text-sm leading-none ${!session.sessionScheduled?'text-green-700':'text-gray-600'} ml-2`}>{!session.sessionScheduled?'To Be Scheduled Soon':'datex/smonthx'}</p>
</div>


                                </td>

                                <td class="pl-5 lg:-mr-9 -mr-6 relative">
                                <h1 class = 'text-sm relative left-16'>Payment Per Member: <span class = 'font-semibold underline'>AED {session.pricing[0]/parseFloat(session.teamSize)} </span></h1>
                                    </td>

                                   
                                    <td class="pl-5 -mr-6 lg:ml-0 ml-5 relative">
                                <h1 class = 'text-sm relative left-6'>Total Payment Amount: <span class = 'font-semibold underline'>AED {session.pricing[0]} </span></h1>
                                    </td>



                       
                                </tr>

                                )

                            })
                            
                        }
                        
                        </tbody>
                    </table>
                    </div>
}




                          
                            
                       
              


                    <h1 class = 'text-center font-bold text-2xl mb-8'>Payment Pending:</h1>
                   


                            {

props.loading?
<div class ='relative mx-auto sm:my-10 my-12 mb-12 pb-3 pt-1.5 text-center block justify-center'>
<ClipLoader color={'#0b0bbf'} loading={props.loading}  size={60} />
</div>
:
                                props.sessions && props.sessions[0].length===0?

                                <h1 class = 'relative mx-auto text-center text-xl justify-center  pb-1 mt-16 right-[2px] mb-10 block'><svg xmlns="http://www.w3.org/2000/svg" class="h-8 mr-1 w-8 text-green-700 inline relative bottom-[1.6px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg> <span class = 'font-semibold '>No Sessions with Pending Payments</span></h1>
                                :
<div class = 'overflow-x-auto my-2'>
                                <table class=" whitespace-nowrap lg:w-full w-[670px]  relative mt-2  mx-auto space-y-2">
                                <tbody class = 'space-y-2'>{
                            

                            props.sessions&&props.sessions[0].map((session, i)=> {

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  


                                return (

                                    <tr key = {i} tabindex="0" class="focus:outline-none  h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded">
                                    <td>
                                        <div class="ml-5 lg:-mr-20 -mr-[72px]">
                    
                                            <img class="object-cover w-10 h-10 shadow-md mx-2   relative right-1 rounded-full block" src={session.pic} alt="avatar"/>

                                        </div>
                                    </td>
                                    <td class="lg:-mr-20 -mr-28 ml-4 relative">
                                        <div class="flex items-center pl-20">
                                            <p class="text-sm font-medium leading-none text-gray-700 mr-2">{session.name}</p>
                                           
                                        </div>
                                    </td>

                                    <td class=" -mr-3 relative ">

                                    
                                  
                                        <div class="flex items-center relative lg:left-4 left-0 -mr-8 ">
                 

    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 top-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path d="M12 14l9-5-9-5-9 5 9 5z" />
  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
<path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
</svg>
                                            <p class="text-sm leading-none text-gray-600 ml-2">{session.role}</p>
                                        </div>
                                 
                                    
                                                                        </td>

                                   
                                    <td class="pl-5 -mr-6 relative">
                                <h1 class = 'text-sm relative left-6'>Total Pending Payment Amount: <span class = 'font-semibold underline'>AED {session.pendingAmount}</span></h1>
                                    </td>



                       
                                </tr>

                                )

                            })}
                               </tbody>
                    </table>
                    </div>
                            }

                          
                            
                       
                     



                </div>
</> 
             
        </div>      

        </div> 
    )
}

export default SessionList