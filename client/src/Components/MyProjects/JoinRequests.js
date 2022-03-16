import { useEffect, useState } from "react"
import axios from 'axios'

const JoinRequests = () => {
    const [joinRequests, setJoinRequests] = useState([])
    const [projects, setProjects] = useState()
    useEffect(()=> {
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getUser':'http://localhost:4000/api/user/getUser',
      {token: sessionStorage.getItem('token')}).then(res=> {
        setJoinRequests(res.data.joinRequests);
        let joinReqTemp = res.data.joinRequests;
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':'http://localhost:4000/api/user/getAllProjects',
      {token: sessionStorage.getItem('token')}).then(res=> {
        let projTemp = [];
        for(let i = 0; i<res.data.length;i++){

           for(let j = 0; j<joinReqTemp.length; j++) {

               if(JSON.stringify(joinReqTemp[j].projID) === JSON.stringify(res.data[j]._id)){
                   projTemp.push(res.data[j]);
               }
           }
        }

        setProjects(projTemp)
    })
      })
    },[])


    return (
        <>
                    <h1 class = 'text-gray-600 text-center mt-10 mb-10 text-5xl font-semibold'>Join Requests ({joinRequests?joinRequests.length:''}):</h1>

        <div class = {`flex gap-4 top-2.5 relative px-32 ${joinRequests && joinRequests.length === 0? '-mb-[2.5rem]':'-mb-56'}`}>

{

joinRequests? joinRequests.map((joinR,i)=> {


    return(
<div class={`rounded-lg ${joinRequests && joinRequests.length === 1 ? 'mx-auto right-0.5 relative' :''} shadow-lg bg-white max-w-sm`}>
<a href="#!">
  <img class="rounded-t-lg scale-75 -my-10" src={projects?projects[i].projPic:''} alt=""/>
</a>
<div class="p-6 border-t-[1px] border-gray-400">
  <h5 class="text-gray-900 relative bottom-1  text-xl font-medium mb-2">Join Request : {projects?projects[i].name : ''}</h5>
  <p class="text-gray-700 text-base mb-3">
    {projects?projects[i].problem: ''}
  </p>
  <h3 class = 'font-semibold tracking-wide relative top-1 text-indigo-600'>Application Status: {joinR.appStatus}</h3>
</div>
</div>

    ) 

    
    }):''}


  




</div>


        
        </>
    )
}

export default JoinRequests