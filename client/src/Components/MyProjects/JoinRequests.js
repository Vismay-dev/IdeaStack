import { useEffect, useState } from "react"
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader"

import AOS from 'aos';
import "aos/dist/aos.css";

const JoinRequests = () => {
    const [joinRequests, setJoinRequests] = useState([])
    const [projects, setProjects] = useState()
    useEffect(()=> {
      setLoading(true)
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
        setLoading(false)
    })
      })
    },[])

   

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

    useEffect(() => {
      AOS.init({
        duration : 600
      });
    },[loading]);

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
                <h1 class = ' text-center w-10/12 relative mx-auto md:mb-0 -mb-3   md:mt-6 mt-4 py-4 pb-[10px] underline font-semibold text-gray-800 md:text-[47px] text-[38px] '>Join Requests ({joinRequests?joinRequests.length:''})</h1>


        <div class = {`grid ${joinRequests && joinRequests.length === 1 ? 'lg:grid-cols-3 grid-cols-4':'md:grid-cols-3 sm:grid-cols-2 grid-cols-1'} xl:px-24 lg:px-16 pt-[54px] sm:px-10  px-[60px]   pointer-events-auto ${joinRequests && joinRequests.length === 0? 'mb-[8rem] pb-24':'md:-mb-[13.5rem] -mb-[12rem]'}`}>

{


loading?


<div class ='relative mx-auto  py-[60px] col-start-2 pt-[74px] mb-24 text-center block justify-center'>
   <PulseLoader color={'#1a52c9'} loading={loading}  size={30} margin={6} />
   </div>




:

joinRequests? joinRequests.map((joinR,i)=> {


    return(
<div data-aos={"fade-up"} data-aos-once='true' class={`rounded-lg col-span-1 pointer-events-auto ${joinRequests && joinRequests.length === 1 ? 'md:col-start-2 lg:col-start-2 sm:col-start-2  col-start-1 lg:col-span-1 sm:col-span-2 col-span-4 relative' :''} shadow-lg bg-white `}>
<a href="#!">
  <img class="rounded-t-lg scale-75 -my-10 " src={projects?projects[i].projPic:''} alt=""/>
</a>
<div class="p-6 border-t-[1px] border-gray-400 text-center sm:text-left pointer-events-auto z-50">
  <h5 class="text-gray-900 relative bottom-1  text-xl font-medium mb-2">Join Request : {projects?projects[i].name : ''}</h5>
  <p class="text-gray-700 lg:text-base text-sm mb-3 mt-1.5">
    {projects?projects[i].problem: ''}
  </p>
  <h3 class = {`font-semibold tracking-wide relative top-1 lg:text-base text-sm lg:mt-5 mt-3 lg:mb-0 mb-[1px]  text-indigo-600 ${joinR.appStatus === 'Accepted'||joinR.appStatus === 'Rejected'?'text-center':''}`}>Application Status: {joinRequests[i].appStatus}</h3>

<div class = 'z-40 lg:text-base text-sm pointer-events-auto'>
  {joinR.appStatus === 'Accepted'? <button onClick={()=>confirmAcceptance(i)} class = 'shadow-md lg:text-base text-sm hover:shadow-xl z-40  cursor-pointer active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 p-3 py-2 rounded-lg text-white font-semibold'>Confirm Acceptance and Join</button>:joinR.appStatus === 'Rejected'?
  
  <button onClick={()=>confirmRejection(i)} class = 'shadow-md hover:shadow-xl cursor-pointer lg:text-base text-sm  z-40 active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 p-5 left-[1px] py-2 rounded-lg text-white font-semibold'>Remove Project Request</button>
  
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