import { useState } from "react"

const AllMentorshipSessions = () => {

    const [sessionScheduled, setSessionScheduled] = useState(false)
    const [consultantSelected, setConsultantSelected] = useState(false)

    return (
        <div class={`rounded-md mb-8 shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}>
  <div class = 'h-28 pt-2.5 '>
  <p className="text-center top-2 text-xl font-semibold relative">Sessions Held So Far:</p><br/>
  
 
<>
<h3 class = 'font-semibold text-center mx-auto mt-1 text-2xl px-24'>View <span class = 'text-blue-700'>All Session</span> Details</h3>
<button style = {{'backgroundImage':'url(https://media.istockphoto.com/photos/digital-cyberspace-with-particles-and-digital-data-network-high-picture-id1302189748?b=1&k=20&m=1302189748&s=170667a&w=0&h=s0o2dhTh40lrWLPt6rg54S0jCUywkr6h04rDdfStMq8=)'}}
 class = 'text-center p-3 bg-gradient-to-br from-blue-50 to-blue-300 active:shadow-sm rounded-md hover:text-violet-200 hover:ring-violet-400 hover:ring-2 hover:shadow-xl hover:shadow-indigo-200 text-gray-100 shadow-md block justify-center mt-10 relative mx-auto hover:from-blue-100 hover:to-blue-500'>
     <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg></button>
<p class = 'text-center mt-4 font-semibold text-gray-800 '>Click here to view details..</p>
</>


</div>

</div>
    )
}

export default AllMentorshipSessions