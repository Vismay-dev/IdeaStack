import { useEffect, useState } from "react"
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader"

import AOS from 'aos';
import "aos/dist/aos.css";

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

    useEffect(() => {
      AOS.init({
        duration : 600
      });
    },[]);

    const [loading, setLoading] = useState(false)

    const confirmAcceptance = (index) => {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/confirmAcceptance':'http://localhost:4000/api/project/confirmAcceptance',
      {token:sessionStorage.getItem('token'),application : joinRequests[index]}).then(res=> {     
        setJoinRequests(res.data)
        setLoading(false)
      }).catch(err=> {
      console.log(err.response.message)
      setLoading(false)
     })
    }

    const confirmRejection = (index) => {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/confirmRejection':'http://localhost:4000/api/project/confirmRejection',
      {token:sessionStorage.getItem('token'),application : joinRequests[index]}).then(res=> {     
          setJoinRequests(res.data)
          setLoading(false)
      }).catch(err=> {
      console.log(err.response.message)
      setLoading(false)
     })
    }


    return (
        <>
                <h1 class = ' text-center w-10/12 relative mx-auto   mt-5 py-4 pb-5 font-semibold text-gray-800 text-[47px]'>Join Requests ({joinRequests?joinRequests.length:''}):</h1>


        <div class = {`flex gap-4 top-2.5 relative px-32 pointer-events-auto ${joinRequests && joinRequests.length === 0? 'mb-[8rem] pb-24':'-mb-56'}`}>

{


loading?


<div class ='relative mx-auto my-8 py-[60px] pt-[110px] -mb-36 text-center block justify-center'>
   <PulseLoader color={'#1a52c9'} loading={loading}  size={35} margin={6} />
   </div>




:

joinRequests? joinRequests.map((joinR,i)=> {


    return(
<div data-aos={"fade-up"} data-aos-once='true' data-aos-delay = {`${i%3}00`} class={`rounded-lg pointer-events-auto  z-40 ${joinRequests && joinRequests.length === 1 ? 'mx-auto right-0.5 relative' :''} shadow-lg bg-white max-w-sm`}>
<a href="#!">
  <img class="rounded-t-lg scale-75 -my-10 " src={projects?projects[i].projPic:''} alt=""/>
</a>
<div class="p-6 border-t-[1px] border-gray-400 pointer-events-auto z-50">
  <h5 class="text-gray-900 relative bottom-1  text-xl font-medium mb-2">Join Request : {projects?projects[i].name : ''}</h5>
  <p class="text-gray-700 text-base mb-3">
    {projects?projects[i].problem: ''}
  </p>
  <h3 class = {`font-semibold tracking-wide relative top-1 mt-5 text-indigo-600 ${joinR.appStatus === 'Accepted'||joinR.appStatus === 'Rejected'?'text-center':''}`}>Application Status: {joinR.appStatus}</h3>

<div class = 'z-40 pointer-events-auto'>
  {joinR.appStatus === 'Accepted'? <button onClick={()=>confirmAcceptance(i)} class = 'shadow-md hover:shadow-xl z-40  cursor-pointer active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 p-3 py-2 rounded-lg text-white font-semibold'>Confirm Acceptance and Join</button>:joinR.appStatus === 'Rejected'?
  
  <button onClick={()=>confirmRejection(i)} class = 'shadow-md hover:shadow-xl cursor-pointer  z-40 active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 p-5 left-[1px] py-2 rounded-lg text-white font-semibold'>Remove Project Request</button>
  
  :''}
  </div>
</div>
</div>

    ) 

    
    }):''}


  




</div>


        
        </>
    )
}

export default JoinRequests