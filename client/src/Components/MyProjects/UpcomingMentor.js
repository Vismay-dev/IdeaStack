import { useEffect, useState } from "react"
import axios from 'axios'
import PaymentsConsultant from '../Modals/PaymentsConsultant'
import {SiZoom, SiGooglemeet} from 'react-icons/si'

const UpcomingMentor = props => {

    const [sessionScheduled, setSessionScheduled] = useState(false)
    const [consultantSelected, setConsultantSelected] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)

    const [consultant,setConsultant] = useState({})
   useEffect(()=> {
     if(props.mentorshipPackages && props.mentorshipPackages.length!==0) {
       setConsultantSelected(true);
        setConsultant(props.mentorshipPackages[0])
        if(props.mentorshipPackages[0].paymentPending===false) {
          setPaymentComplete(true)

        
        }
     }

   },[props.mentorshipPackages])

   const [showPayments, setShowPayments] = useState(false)


    return (
        <>

        {
          showPayments && <PaymentsConsultant close = {()=>setShowPayments(false)}/>
        }

<div class={`rounded-md mb-8 shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}>
  <div class = 'h-28 pt-2.5 '>
  <p className="text-center top-2 text-xl font-semibold relative">Upcoming Mentorship Session:</p><br/>
  
  {
    consultantSelected? <>
  <img class={`hidden object-cover ${paymentComplete?'-mt-0.5':'mt-4'} w-24 h-24 shadow-md mx-auto justify-center relative right-1 rounded-full sm:block`} src={consultant.pic} alt="avatar"/>
<p class = 'text-gray-900 text-center font-semibold text-lg right-1.5 relative mt-2'>{consultant.name}</p>
<p class = 'text-gray-700 text-center text-sm bottom-0.5 right-1.5 relative '>{consultant.role}</p>



   {paymentComplete?


   

     !sessionScheduled?
     <> 
     <p class = 'mt-[10px] text-md relative mx-auto justify-center text-center right-2'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 top-[1px] relative text-gray-600 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg><span class = 'inline mt-4 font-semibold top-[2.5px] relative text-gray-700 text-md'> When: {new Date().toString().substring(0,15)} </span>
</p>



<p class = 'mt-1 relative mx-auto justify-center text-center right-2'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] top-[1px] text-gray-600 relative inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
</svg><span class = 'inline mt-6 font-semibold top-[2.5px] relative text-gray-700'> Meeting Link: </span>
</p>

<h3 class = 'text-indigo-400 truncate text-center break-normal mt-2 text-ellipsis mb-1 hover:text-indigo-600 hover:underline cursor-pointer relative w-10/12 mx-auto left-1 z-50 '>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h3> 


<p class =' relative mx-auto text-center mt-2 mb-0.5'>
<SiZoom class = 'inline relative  mr-3 text-blue-600 text-5xl'/>
<SiGooglemeet class = 'inline  text-indigo-500 relative text-2xl'/>

</p>


</>
:

<>

<h1 class = 'text-center mt-3 font-medium text-gray-800'>Awaiting Session Details..</h1>

<p class =' relative mx-auto text-center mt-2.5 mb-0.5'>
<SiZoom class = 'inline relative  mr-3 text-blue-600 text-5xl'/>
<SiGooglemeet class = 'inline  text-amber-600 relative text-2xl'/>

</p>

<p class = 'text-center text-sm px-6'>An online meeting link and schedule will be provided to you in 24-72 hours. Thank you for your patience... </p>

   </>
    

:



<p class = 'mt-[18px] relative mx-auto justify-center text-center  right-2'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 underline inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
</svg><span class = 'inline mt-6 font-semibold top-[3px] text-xl relative underline'> Payment Pending: </span>
<button onClick={()=> {setShowPayments(true)}} class = 'bg-indigo-500  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2.5 mt-4 mb-2 text-white font-semibold left-[.8px]'>VIEW PENDING PAYMENTS</button>

</p>
}</>
:
<>
<h3 class = 'font-semibold text-center mx-auto -mt-1.5 mb-2.5 text-2xl px-12'>No <span class = 'text-blue-700'>Industry Mentor</span> Selected...</h3>
<button class = 'bg-indigo-500 p-2.5 hover:bg-indigo-500 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2 mt-5 text-white font-semibold'>Find an Industry Expert</button>

<img class = 'relative scale-[.35] -mt-[113px] shadow-lg rounded-md right-[6px]' src = {'https://d22bbllmj4tvv8.cloudfront.net/d5/c0/efaeb96d41e3a674f8d2ed576bed/what-is-mentoring1-square.jpg'}></img>

</>

}



 


  
  </div>
 
</div>
        
        </>
    )
}

export default UpcomingMentor