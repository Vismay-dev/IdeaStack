import { useState } from "react"

import AllSessionDetails from '../Modals/AllSessionDetails'

const AllMentorshipSessions = () => {
    const [showDetails, setShowDetails] = useState(false)
  
    return (
        <div class={`rounded-md mb-8 shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}>

            {
                showDetails ? 
                <AllSessionDetails close = {()=>setShowDetails(false)} />
                :''
            }

  <div data-aos={"fade-up"} data-aos-once='true' data-aos-delay= '300' class = 'h-28 pt-2.5 '>
  <p className="text-center top-2 text-xl font-semibold relative">Sessions (All Info):</p><br/>
  
 
<>
<h3 class = 'font-semibold text-center mx-auto xl:mt-2 mt-3 w-[300px] sm:mb-1 mb-4 top-1 relative text-2xl xl:w-[320px]  px-8'>View <span class = 'text-blue-700'>All Session</span> Details</h3>
<button onClick={()=>setShowDetails(true)} style = {{'backgroundImage':'url(https://media.istockphoto.com/photos/digital-cyberspace-with-particles-and-digital-data-network-high-picture-id1302189748?b=1&k=20&m=1302189748&s=170667a&w=0&h=s0o2dhTh40lrWLPt6rg54S0jCUywkr6h04rDdfStMq8=)'}}
 class = 'text-center p-3.5 bg-gradient-to-br from-blue-50 to-blue-300 active:shadow-sm rounded-md hover:text-violet-200 hover:ring-violet-400 hover:ring-2 hover:shadow-2xl hover:shadow-indigo-200 text-gray-100 shadow-md block justify-center sm:mt-8 mt-10 relative mx-auto hover:from-blue-100 hover:to-blue-500'>
     <svg xmlns="http://www.w3.org/2000/svg" class="h-[75px] w-[75px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
</svg>
</button>
<p class = 'text-center mt-4 sm:w-1/3 w-1/2 mx-auto justify-center font-semibold text-gray-800 '>Click here to view details..</p>
</>


</div>

</div>
    )
}

export default AllMentorshipSessions