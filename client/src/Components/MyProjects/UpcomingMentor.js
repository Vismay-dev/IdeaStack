import { useEffect, useState } from "react"
import axios from 'axios'
import PaymentsConsultant from '../Modals/PaymentsConsultant'
import {SiZoom, SiGooglemeet} from 'react-icons/si'
import ClipLoader from "react-spinners/ClipLoader"
import {useHistory} from 'react-router-dom'

const UpcomingMentor = props => {

    const [sessionScheduled, setSessionScheduled] = useState(false)
    const [consultantSelected, setConsultantSelected] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)
    const [sessionRequested, setSessionRequested] = useState(false)
    const [sessionConfirmed, setSessionConfirmed] = useState(false)
    const [consultant,setConsultant] = useState({})
    const [loading, setLoading] = useState(false)
    const [scheduleSelected,setScheduleSelected] = useState(null)
    const [sessionAccepted, setSessionAccepted] = useState(false)
    const [numSesh,setNumSesh] = useState(0);
    const [availableDates, setAvailableDates] = useState([])

    const [sessionCompleted, setSessionCompleted] = useState(false)
   useEffect(()=> {
    setLoading(true)



     if(props.mentorshipPackages && props.mentorshipPackages.length!==0) {
       setConsultantSelected(true);
      
       setNumSesh(props.mentorshipPackages[0].numberOfSessions-props.mentorshipPackages[0].numberOfSessionsRemaining+1)
        setConsultant(props.mentorshipPackages[0])
        
        if(props.mentorshipPackages[0].paymentPending===false) {
          setPaymentComplete(true)
         
          if(props.mentorshipPackages[0].sessionRequested){
            setSessionRequested(true)

          }
          if(props.mentorshipPackages[0].sessionScheduled) {
            setSessionScheduled(true)
        
          if(((parseFloat((new Date()).getHours())-parseFloat((new Date(props.mentorshipPackages[0].scheduleSelected)).getHours())))>6){
            setSessionCompleted(true)
          }
          
          
          }
            else if(props.mentorshipPackages[0].sessionAccepted){
              setSessionAccepted(true)
            }
            
            if(props.mentorshipPackages[0].sessionConfirmed){
              setSessionConfirmed(true)
            }
        }
     }

     setLoading(false)



   },[props.mentorshipPackages])


   if(sessionScheduled&&!sessionCompleted&&(parseFloat((new Date()).getHours())-parseFloat((new Date(props.mentorshipPackages[0].scheduleSelected)).getHours()))>6){
    setSessionCompleted(true)
  }

   const [showPayments, setShowPayments] = useState(false)
   const [sessionScheduling, setSessionScheduling] = useState(false)

   const requestSession = () => {
    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateLatestPendingSession':'http://localhost:4000/api/user/updateLatestPendingSession',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing'), updated:{
      sessionConfirmed,
      sessionScheduled,
      sessionRequested:true,
      scheduleSelected
    }}).then(res=> {
      console.log(res.data);
      setSessionScheduling(false)
      setSessionRequested(true)
}).catch(err=> {
          console.log(err);
  })  

   }


   const confirmSession = () => {
    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateLatestPendingSession':'http://localhost:4000/api/user/updateLatestPendingSession',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing'), updated:{
      sessionConfirmed:true
    }}).then(res=> {
      console.log(res.data);
      setSessionConfirmed(true)
}).catch(err=> {
          console.log(err);
  })  
   }

   const rescheduleSession = () => {
    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateLatestPendingSession':'http://localhost:4000/api/user/updateLatestPendingSession',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing'), updated:{
      sessionConfirmed:false,
      sessionRequested:false,
      sessionAccepted:false,
      sessionScheduled:false,
      scheduleSelected:''
    }}).then(res=> {
      console.log(res.data);
      setSessionConfirmed(false)
      setSessionAccepted(false)
      setSessionRequested(false)
      setScheduleSelected('')
      setSessionScheduled(false)

}).catch(err=> {
          console.log(err);
  })  
   }


   const history = useHistory()


   function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    let not = padTo2Digits(date.getHours())>12?'PM':'AM'
    return (
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear()
      ].join('/') +
      '  ' + ' ' +
      [
        padTo2Digits(date.getHours()>12?date.getHours()-12:date.getHours()),
        padTo2Digits(date.getMinutes()),
      ].join(':')
        + ' '+ not
      
    );
  } 


 const [chkDate, setChkDate] = useState(false)
const [sessionFinished, setSessionFinished] = useState(false);

const finishSession = () => {
  axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/finishLatestSession':'http://localhost:4000/api/project/finishLatestSession',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
    console.log(res.data);
    setSessionFinished(true)
}).catch(err=> {
        console.log(err);
})  


}

    return (
        <>

        {
          showPayments && <PaymentsConsultant close = {()=>setShowPayments(false)}/>
        }

<div  class={`rounded-md mb-8 shadow-lg bg-gradient-to-r sm:h-[380px] ${paymentComplete?'h-[420px]':'h-[390px]'} sm:pt-0 sm:pb-0 pb-1.5 border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}>
  <div data-aos={"fade-up"} data-aos-once='true' class = 'h-28 pt-2.5 '>
  <p className="text-center top-2 text-xl sm:px-0 px-3  sm:w-full w-[270px] mx-auto block font-semibold relative">Upcoming Mentorship Session:</p><br/>
  
  {
    loading?
    <div class ='relative mx-auto top-[66%] left-0.5 text-center block justify-center'>
    <ClipLoader color={'#1663be'} loading={loading}  size={80} />
    </div>


:
    consultantSelected? <>
  <img class={`object-cover ${paymentComplete?'sm:-mt-0.5 mt-1':'sm:mt-4 mt-5'} ${sessionScheduling?'hidden':'block'} ${sessionAccepted?'sm:w-16 sm:h-16 w-12 h-12':'sm:w-20 sm:h-20 w-16 h-16'} sm:w-24 sm:h-24 w-20 h-20 shadow-md mx-auto justify-center relative right-1 rounded-full `} src={consultant.pic} alt="avatar"/>
<p class = {`text-gray-900 text-center font-semibold   right-1.5 relative ${sessionScheduling?'-mt-1.5 text-sm':'mt-2 text-lg'}`}>{consultant.name} {sessionScheduling?' - '+consultant.role:''} {` (Session ${numSesh} of ${consultant.numberOfSessions})`}</p>

{
  !sessionScheduling?
  <p class = 'text-gray-700 text-center text-sm bottom-0.5 right-1.5 relative '>{consultant.role}</p>:''
}


   {paymentComplete?


sessionCompleted?
<>

{sessionFinished?

<>
  <p class = ' font-semibold text-xl text-center mt-3 right-2.5 relative underline'>
Session Completed
 </p>

<svg xmlns="http://www.w3.org/2000/svg" class="h-9 text-green-700 w-9 mb-0.5 mt-3 right-1  relative block mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
</svg>


<p class = 'text-sm px-6 text-center mt-2.5'>For any queries, mail us at <span class = 'underline text-blue-600'>ideastackapp@gmail.com.</span> We prioritize addressing your concerns.</p>

</>

:
<>
<p class = ' font-semibold text-xl text-center mt-3 right-2.5 relative underline'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-7 text-green-700 w-7 mb-1 relative inline right-1 mx-auto ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
</svg>
 <span class = 'inline'>Session Completed</span>

</p>

<button onClick={finishSession} class = 'bg-blue-700 text-white p-2 pt-1 shadow-md right-1 text-sm font-semibold my-4 mb-3.5  py-1.5 px-3 relative mx-auto block'>Okay</button>

<p class = 'text-sm px-6 text-center mt-3.5'>For any queries, mail us at <span class = 'underline text-blue-600'>ideastackapp@gmail.com.</span> We prioritize addressing your concerns.</p> </>}
</>:

sessionScheduled?

<> 
     <p class = 'mt-[10px] mb-[17px] text-md relative mx-auto justify-center text-center right-2'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 top-[1px] relative text-gray-600 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg><span class = {`inline mt-4 font-semibold top-[2.5px] relative text-gray-700 text-sm ${(new Date().toString().substring(0,15))===(new Date(consultant.scheduleSelected).toString().substring(0,15))?'text-blue-700 font-semibold uppercase':''}`}> When: {(new Date().toString().substring(0,15))===(new Date(consultant.scheduleSelected).toString().substring(0,15))?'Today':new Date(consultant.scheduleSelected).toString().substring(0,15)} </span><br/>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative text-gray-600 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg><span class = 'inline mt-4 font-semibold top-[1.5px] relative text-gray-700 text-sm'> At: {String(parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18))>12?parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18))-12:parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18)))+new Date(consultant.scheduleSelected).toString().substring(18,21)+String(parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18))>12?' PM ': ' AM ')+new Date().toString().substring(34)} </span>

</p>



<p class = ' relative mx-auto justify-center text-center right-2'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] top-[1px] text-gray-600 relative inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
</svg><span class = 'inline mt-4 font-semibold relative underline text-gray-700'> Meeting Link: </span>
</p>

<h3 class = 'text-indigo-400 truncate text-center break-normal mt-0.5 right-1.5 text-ellipsis mb-1 hover:text-indigo-600 hover:underline cursor-pointer relative w-10/12 mx-auto  z-50 '>{consultant.sessionLink}</h3> 


<p class =' absolute mx-auto text-center  ml-4 right-2  mb-0.5'>
<SiZoom class = 'inline relative  mr-1.5 text-blue-600 text-4xl'/>
<SiGooglemeet class = 'inline  text-indigo-500 relative text-xl'/>

</p>


</>

:

<>

{sessionRequested&&(!sessionAccepted||sessionConfirmed)?<h1 class = 'text-center mt-3 font-medium text-gray-800'>Awaiting Session Details..</h1>
:''}
<p class ={`relative mx-auto text-center   ${sessionScheduling?'mb-2 mt-[8px]':'mb-1.5 mt-[16px]'} right-[2px] mr-2`}>
{sessionScheduling?

<>
  <SiZoom class = 'inline relative -mt-3 -mb-2 mr-3 text-blue-600 text-4xl'/>
<SiGooglemeet class = 'inline -mt-3 -mb-2  text-amber-600 relative text-xl'/>
</>

:

sessionConfirmed?

<>

<SiZoom class = 'inline relative  mr-3 mt-1 mb-1.5 text-blue-600 text-5xl'/>
<SiGooglemeet class = 'inline mt-1 mb-1.5 text-amber-600 relative text-2xl'/>
</>

:
sessionAccepted?
<>

<SiZoom class = 'inline relative -mt-4   mr-3 text-blue-600 text-5xl'/>
<SiGooglemeet class = 'inline -mt-4  text-amber-600 relative text-2xl'/>
</>
:

sessionRequested?

<>

<SiZoom class = 'inline relative  mr-3 -mt-2.5 text-blue-600 text-5xl'/>
<SiGooglemeet class = 'inline -mt-2.5 text-amber-600 relative text-2xl'/>
</>:

<>

  <SiZoom class = 'inline relative  mr-3 text-blue-600 text-5xl'/>
<SiGooglemeet class = 'inline  text-amber-600 relative text-2xl'/>
</>
}


</p>

{

  sessionAccepted && !sessionConfirmed?
<>
  <p class = 'text-center text-sm font-semibold sm:px-6 px-4 sm:w-full w-[305px] sm:-mt-1 mt-3.5 mx-auto block'>Your Session Request Has Been Accepted!</p>

<p class = '-mt-[2px] mb-[11px] text-md relative mx-auto justify-center text-center right-2'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 top-[1px] relative  mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg><span class = 'inline mt-4 font-semibold top-[2.5px] relative  text-sm'> When: {new Date(consultant.scheduleSelected).toString().substring(0,15)} </span>
<br/>
<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 top-[1px] relative mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg><span class = 'inline mt-4 font-semibold top-[2.5px] relative  text-sm'> At: {String(parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18))>12?parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18))-12:parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18)))+':'+String((new Date(consultant.scheduleSelected).toString().substring(19,21))) +  (parseInt(new Date(consultant.scheduleSelected).toString().substring(16,18))>12?' PM ':' AM ') +new Date().toString().substring(34)} </span>


</p>

<div class = 'mt-[19px] mx-auto  grid grid-cols-6 right-0.5 relative w-2/3 gap-3'>
<button onClick={rescheduleSession} class = {`px-4 col-span-3   rounded-lg  text-sm uppercase py-2 mb-1.5 relative   bg-gradient-to-br hover:from-orange-400 hover:to-orange-500 text-white font-semibold from-orange-300 to-orange-500 `}>Reschedule</button>

<button onClick={confirmSession} class = {`px-4 col-span-3   rounded-lg  text-sm uppercase py-2 mb-1.5 relative   bg-gradient-to-br hover:from-blue-400 hover:to-blue-600 text-white font-semibold from-blue-400 to-indigo-500 `}>Confirm</button>



</div>




</>

  :
  sessionConfirmed?
  <p class = 'text-center text-sm sm:px-7 px-4 sm:w-full w-[305px] sm:mt-0 mt-3.5 mx-auto block'>An online meeting link and schedule will be provided to you in 24-72 hours. Thank you for your patience... </p>
  :
  sessionRequested?
<p class = 'text-center text-sm sm:px-6 px-4 sm:w-full w-[305px] font-semibold sm:mt-0 mt-3.5 mx-auto block'>   Please wait for approval of your requested session appointment & schedule. </p>
:

  sessionScheduling?

 <>
 <h3 class = 'relative mx-auto text-center underline right-2 top-0.5 font-semibold'>Select & Request Appointment</h3>
 <div class = 'relative mx-auto overflow-scroll h-[156px] top-[11px] bg-blue-100 rounded-md w-[350px] right-0 shadow-md '>
   <h3 class = 'text-center text-sm right-0.5 top-1.5 mb-4 font-semibold relative underline'>Available Slots:</h3>
{

consultant.availableDates.filter(date=> {
  
  let available = true;

  axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/checkAvailability':'http://localhost:4000/api/project/checkAvailability',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing'),consultant:props.mentorshipPackages[0], date:props.mentorshipPackages[0].scheduleSelected}).then(res=> {
    available = res.data
}).catch(err=> {
         console.log(err);
 })
  
  return (new Date(date)>new Date()&&available)
 }).length === 0?

 <p class = 'text-sm w-[87%] text-center px-10 relative mx-auto block top-[27%] text-indigo-800 underline translate-y-[-50%]'>No Available Slots (We'll post dates here soon!)</p>

 :
  consultant.availableDates.filter(date=> {
    let available = true;
    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/checkAvailability':'http://localhost:4000/api/project/checkAvailability',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing'),consultant:props.mentorshipPackages[0], date:props.mentorshipPackages[0].scheduleSelected}).then(res=> {
      available = res.data
  }).catch(err=> {
           console.log(err);
   })
   return (new Date(date)>new Date() && available)
  }).map(date=> {

    return (
<button onClick={()=>setScheduleSelected(new Date(date))} class = {`w-11/12 h-[25px] hover:border-[1px] hover:border-solid hover:ring-1 hover:ring-black text-white active:border-solid ${scheduleSelected?'border-solid border-[1px] ring-black ring-1 border-white':''} hover:border-white rounded-lg mx-auto block text-sm pb-0.5 font-semibold  hover:font-medium mb-1.5 relative   bg-gradient-to-br from-gray-500 to-gray-600`}>{formatDate(new Date(date))}</button>
    )
  })
}

 </div>


 <div class = 'relative w-[320px]  mx-auto top-[27px] right-2.5 grid-cols-6 grid'>
 <button onClick={()=>{setSessionScheduling(false);setScheduleSelected(null)}} class = 'col-span-3 px-4 left-1  hover:from-blue-400 hover:to-blue-600 rounded-lg mx-auto block text-sm uppercase py-2 mb-1.5 relative text-white  bg-gradient-to-br from-blue-400 to-indigo-500'>Cancel</button>

 <button onClick={requestSession} disabled={scheduleSelected===null} class = {`col-span-3 px-4 right-5  rounded-lg mx-auto block text-sm uppercase py-2 mb-1.5 relative   bg-gradient-to-br  ${scheduleSelected!==null?'hover:from-blue-400 hover:to-blue-600 text-white from-blue-400 to-indigo-500':'from-blue-200 to-indigo-300 text-white '} `}>Request Session</button>
 </div>
 </>


  :

<button onClick={()=>setSessionScheduling(true)} class = 'bg-indigo-500  uppercase p-4 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[14px]  shadow-md py-2 mt-1.5 mb-2 text-white font-semibold -left-[8px]'>Schedule</button>


}

   </>
    

:



<p class = 'mt-[18px] relative mx-auto justify-center text-center  right-2.5'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 underline inline mr-0.5 top-[1px] relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
</svg><span class = 'inline mt-6 font-semibold top-[3px] text-lg relative underline'>Team Payment Pending: </span>
<button onClick={()=> {setShowPayments(true)}} class = 'bg-indigo-500  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2.5 mt-4 mb-2 text-white font-semibold left-[.8px]'>VIEW PENDING PAYMENTS</button>

</p>
}</>
:
<>
<h3 class = 'font-semibold text-center mx-auto xl:mt-2 sm:mt-2.5 mt-1.5 sm:mb-0 xl:mb-2.5 mb-1 xl:w-[360px] sm:text-2xl text-xl sm:w-full w-[310px] px-12'>No <span class = 'text-blue-700'>Industry Mentor</span> Selected...</h3>
<button onClick={()=> history.push('/myprojects/manageproject/mentorship/browse')} class = 'bg-indigo-500 p-2.5 hover:bg-indigo-500 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] xl:normal-case uppercase shadow-md py-2 xl:mt-4 mt-9 text-white font-semibold'>Find an Industry Expert</button>

<img class = 'relative w-[100px] h-[120px] mx-auto mt-[24px] shadow-lg rounded-md right-[6px]' src = {'https://d22bbllmj4tvv8.cloudfront.net/d5/c0/efaeb96d41e3a674f8d2ed576bed/what-is-mentoring1-square.jpg'}></img>

</>

}



 


  
  </div>
 
</div>
        
        </>
    )
}

export default UpcomingMentor