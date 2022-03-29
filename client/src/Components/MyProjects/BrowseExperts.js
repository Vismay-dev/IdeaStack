import { useState, useEffect } from "react";
import ExpertDetails from "../Modals/ExpertDetails";
import axios from 'axios'
  
  export default function BrowseExperts() {

      const [showExpert, setShowExpert] = useState(false);
      const [expertId, setExpertId] = useState(null)
      const [experts, setExperts] = useState([])

      useEffect(()=> {
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getMentors':'http://localhost:4000/api/project/getMentors',
        {token:sessionStorage.getItem('token')}).then(res => {
            setExperts(res.data)
        }).catch(err => {
            console.log(err.response)
        })
    })

    return (
        <>

        {
            showExpert ? <ExpertDetails close = {()=>setShowExpert(false)} experts = {experts} id = {expertId}/> : ''
        }
        <div class="max-w-2xl mx-auto pt-9  px-14 -mb-56 relative lg:max-w-7xl ">
            <h2 class = 'text-center font-bold text-6xl text-gray-800 top-1  mb-[74px] relative'>Seek Mentorship</h2>
  
          <div class="grid grid-cols-1  gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 ">
            {experts.map((expert) => (
              <a key={expert.id} onClick={()=> {setShowExpert(true); setExpertId(expert.id)}} class={`group  rounded-md cursor-pointer`}>
                <div class="w-full bg-gray-200 ring-2 ring-blue-600  shadow-md rounded-lg overflow-hidden xl:aspect-w-6 xl:aspect-h-7">
                  <img
                    src={expert.pic}
                    alt="expert"
                    class="w-full   h-full  object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 class="mt-4 text-md text-gray-700">{expert.role}</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">{expert.name}</p>
              </a>
            ))}
          </div>
        </div>
        </>
    )
  }