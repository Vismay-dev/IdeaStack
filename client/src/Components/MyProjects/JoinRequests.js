import { useEffect, useState } from "react"
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader"

import AOS from 'aos';
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";

const JoinRequests = () => {
    const [joinRequests, setJoinRequests] = useState([])
    const [projects1, setProjects1] = useState()
    const [projects2, setProjects2] = useState()


    useEffect(()=> {
      setLoading(true)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getUser':'http://localhost:4000/api/user/getUser',
     
        {token: sessionStorage.getItem('token')}).then(res=> {
        setJoinRequests(res.data.joinRequests);
        let joinReqTemp = res.data.joinRequests;
        let arr1T = [];
        let arr2T =[];
        for(let i =0; i<joinReqTemp.length;i++){
          if(!joinReqTemp[i].isInvite){
            arr1T.push(joinReqTemp[i])
            setArr1(arr1T)
          }else {
            arr2T.push(joinReqTemp[i])
            setArr2(arr2T)
          }
        }

        setArr2(arr2T)
        setArr1(arr1T)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':'http://localhost:4000/api/user/getAllProjects',
      {token: sessionStorage.getItem('token')}).then(res=> {
        let projTemp1 = [];
        let projTemp2 = [];

        for(let i = 0; i<res.data.length;i++){

           for(let j = 0; j<arr1T.length; j++) {

               if(JSON.stringify(arr1T[j].projID) === JSON.stringify(res.data[i]._id)){
                   projTemp1.push(res.data[i]);
               }
           }

           for(let j = 0; j<arr2T.length; j++) {

            if(JSON.stringify(arr2T[j].projID) === JSON.stringify(res.data[i]._id)){
                projTemp2.push(res.data[i]);
            }
        }



        }

        setProjects1(projTemp1)
        setProjects2(projTemp2)

    })

      })
      setLoading(false)

    },[])

   

    const [loading, setLoading] = useState(false)
    const [arr1, setArr1] = useState([])
    const [arr2, setArr2] = useState([])
    const history = useHistory()

    const confirmAcceptance = (index) => {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/confirmAcceptance':'http://localhost:4000/api/project/confirmAcceptance',
      {token:sessionStorage.getItem('token'),application : arr1[index]}).then(res=> {     
        setJoinRequests(res.data)
        let joinReqTemp = res.data;
        let arr1T = [];
        let arr2T =[];
        for(let i =0; i<joinReqTemp.length;i++){
          if(!joinReqTemp[i].isInvite){
            arr1T.push(joinReqTemp[i])
            setArr1(arr1T)
          }else {
            arr2T.push(joinReqTemp[i])
            setArr2(arr2T)
          }
        }
        setArr2(arr2T)
        setArr1(arr1T)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':'http://localhost:4000/api/user/getAllProjects',
      {token: sessionStorage.getItem('token')}).then(res=> {
        let projTemp1 = [];
        let projTemp2 = [];

        for(let i = 0; i<res.data.length;i++){

           for(let j = 0; j<arr1T.length; j++) {

               if(JSON.stringify(arr1T[j].projID) === JSON.stringify(res.data[i]._id)){
                   projTemp1.push(res.data[i]);
               }
           }

           for(let j = 0; j<arr2T.length; j++) {

            if(JSON.stringify(arr2T[j].projID) === JSON.stringify(res.data[i]._id)){
                projTemp2.push(res.data[i]);
            }
        }



        }

        setProjects1(projTemp1)
        setProjects2(projTemp2)
        setLoading(false)

    })
        history.push('/myprojects/allprojects')
        setLoading(false)

      }).catch(err=> {
      console.log(err.response)
      setLoading(false)
     })
    }

    const confirmInvite = (index) => {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/confirmAcceptance':'http://localhost:4000/api/project/confirmAcceptance',
      {token:sessionStorage.getItem('token'),application : arr2[index]}).then(res=> {     
        setJoinRequests(res.data)
        let joinReqTemp = res.data;
        let arr1T = [];
        let arr2T =[];
        for(let i =0; i<joinReqTemp.length;i++){
          if(!joinReqTemp[i].isInvite){
            arr1T.push(joinReqTemp[i])
            setArr1(arr1T)
          }else {
            arr2T.push(joinReqTemp[i])
            setArr2(arr2T)
          }
        }
        setArr2(arr2T)
        setArr1(arr1T)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':'http://localhost:4000/api/user/getAllProjects',
      {token: sessionStorage.getItem('token')}).then(res=> {
        let projTemp1 = [];
        let projTemp2 = [];

        for(let i = 0; i<res.data.length;i++){

           for(let j = 0; j<arr1T.length; j++) {

               if(JSON.stringify(arr1T[j].projID) === JSON.stringify(res.data[i]._id)){
                   projTemp1.push(res.data[i]);
               }
           }

           for(let j = 0; j<arr2T.length; j++) {

            if(JSON.stringify(arr2T[j].projID) === JSON.stringify(res.data[i]._id)){
                projTemp2.push(res.data[i]);
            }
        }



        }

        setProjects1(projTemp1)
        setProjects2(projTemp2)
        setLoading(false)

    })
        history.push('/myprojects/allprojects')
        setLoading(false)
      }).catch(err=> {
      console.log(err.response)
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
      {token:sessionStorage.getItem('token'),application : arr1[index]}).then(res=> {     
        setJoinRequests(res.data)
        let joinReqTemp = res.data;
        let arr1T = [];
        let arr2T =[];
        for(let i =0; i<joinReqTemp.length;i++){
          if(!joinReqTemp[i].isInvite){
            arr1T.push(joinReqTemp[i])
            setArr1(arr1T)
          }else {
            arr2T.push(joinReqTemp[i])
            setArr2(arr2T)
          }
        }
        setArr2(arr2T)
        setArr1(arr1T)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':'http://localhost:4000/api/user/getAllProjects',
      {token: sessionStorage.getItem('token')}).then(res=> {
        let projTemp1 = [];
        let projTemp2 = [];

        for(let i = 0; i<res.data.length;i++){

           for(let j = 0; j<arr1T.length; j++) {

               if(JSON.stringify(arr1T[j].projID) === JSON.stringify(res.data[i]._id)){
                   projTemp1.push(res.data[i]);
               }
           }

           for(let j = 0; j<arr2T.length; j++) {

            if(JSON.stringify(arr2T[j].projID) === JSON.stringify(res.data[i]._id)){
                projTemp2.push(res.data[i]);
            }
        }



        }

        setProjects1(projTemp1)
        setProjects2(projTemp2)
        setLoading(false)

    })
          setLoading(false)
      }).catch(err=> {
      console.log(err.response)
      setLoading(false)
     })
    }

    const confirmRejectionInvite = (index,num) => {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/confirmRejectionInvite':'http://localhost:4000/api/project/confirmRejectionInvite',
      {token:sessionStorage.getItem('token'),application : num==1?arr1[index]:arr2[index]}).then(res=> {     
        setJoinRequests(res.data)
        let joinReqTemp = res.data;
        console.log(joinReqTemp)
        let arr1T = [];
        let arr2T =[];
        for(let i =0; i<joinReqTemp.length;i++){
          if(!joinReqTemp[i].isInvite){
            arr1T.push(joinReqTemp[i])
            setArr1(arr1T)
          }else {
            arr2T.push(joinReqTemp[i])
            setArr2(arr2T)
          }
        }
        setArr2(arr2T)
        setArr1(arr1T)
       axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':'http://localhost:4000/api/user/getAllProjects',
      {token: sessionStorage.getItem('token')}).then(res=> {
        let projTemp1 = [];
        let projTemp2 = [];
        setArr2(arr2T)
        setArr1(arr1T)



        for(let i = 0; i<res.data.length;i++){

           for(let j = 0; j<arr1T.length; j++) {

               if(JSON.stringify(arr1T[j].projID) === JSON.stringify(res.data[i]._id)){
                   projTemp1.push(res.data[i]);
               }
           }

           for(let j = 0; j<arr2T.length; j++) {

            if(JSON.stringify(arr2T[j].projID) === JSON.stringify(res.data[i]._id)){
                projTemp2.push(res.data[i]);
            }
        }



        }

        setProjects1(projTemp1)
        setProjects2(projTemp2)
        setArr1(arr1T)
        setArr2(arr2T)
        setLoading(false)

    })
          setLoading(false)
      }).catch(err=> {
      console.log(err)
      setLoading(false)
     })
    }



    return (
        <>
                <h1 class = ' text-center w-10/12 relative mx-auto md:mb-0 -mb-3   md:mt-6 mt-4 py-4 pb-[10px] underline font-semibold text-gray-800 md:text-[47px] text-[38px] '>Join Requests ({arr1?arr1.length:''})</h1>


        <div class = {`grid ${arr1 && arr1.length === 1 ? 'lg:grid-cols-3 grid-cols-4':'md:grid-cols-3 sm:grid-cols-2 grid-cols-1'} gap-6 xl:px-24 lg:px-16 pt-[54px] sm:px-10  px-[60px]   pointer-events-auto ${arr1 && arr1.length === 0 || loading ? 'mb-[6.35rem] sm:mb-[8rem] pb-24': 'md:mb-[4rem] mb-[3rem]'}`}>
{
loading?

 <div class ={`relative mx-auto  py-[40px] -mb-28 ${arr1  && arr1.length === 1 ?'lg:col-span-3 col-span-4':' md:col-span-3 sm:col-span-2 col-span-1'} pt-[75px] text-center block justify-center`}>
   <PulseLoader color={'#1a52c9'} loading={loading}  size={20} margin={7} />
   </div> 
:

arr1?

arr1.length===0?


<p class = 'smd:text-4xl sm:text-3xl text-2xl font-semibold md:col-span-3 sm:col-span-2 col-span-1 text-center mt-[50px] sm:-mb-80 -mb-[360px] right-1 mx-auto relative'><svg xmlns="http://www.w3.org/2000/svg" class="md:h-10 sm:h-8 h-6 w-6 md:w-10 sm:w-8  inline text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
</svg> <span class = 'top-0.5 relative'>No Requests Sent</span></p>




:
<>

{projects1&&arr1&&arr1.map((joinR,i)=> {


    return(
<div data-aos={"fade-up"} data-aos-once='true' class={`rounded-lg col-span-1 -mt-1 z-40 pointer-events-auto ${arr1 && arr1.length === 1 ? 'md:col-start-2 lg:col-start-2 sm:col-start-2  col-start-1 lg:col-span-1 sm:col-span-2 col-span-4 relative' :''} shadow-lg bg-white `}>
<a href="#!">
  <img class="rounded-t-lg scale-75 -my-5 " src={projects1[i]?projects1[i].projPic:''} alt=""/>
</a>
<div class="p-6 border-t-[1px] border-gray-400 text-center sm:text-left pointer-events-auto z-50">
  <h5 class="text-gray-900 relative bottom-1  text-xl font-medium mb-2">Join Request : {projects1?projects1[i].name : ''}</h5>
  <p class="text-gray-700 lg:text-base text-sm mb-3 mt-1.5">
    {projects1[i]?projects1[i].problem: ''}
  </p>
  <h3 class = {`font-semibold tracking-wide relative top-1 lg:text-base text-sm lg:mt-5 mt-3 lg:mb-0 mb-[1px]  text-indigo-600 ${joinR.appStatus === 'Accepted'||joinR.appStatus === 'Rejected'?'text-center':''}`}>Application Status: {arr1[i].appStatus}</h3>

<div class = 'z-40  lg:text-base text-sm pointer-events-auto'>
  {joinR.appStatus === 'Accepted'? 

<div class = 'relative mt-6 mb-1 mx-auto   grid grid-cols-2 gap-2'>
<button onClick={()=>confirmRejectionInvite(i,1)} class = 'shadow-md text-sm hover:shadow-xl z-40  cursor-pointer active:shadow-sm  text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500  p-3 py-2 pt-1.5 rounded-lg text-white font-semibold'>Cancel Request</button>
<button onClick={()=>confirmAcceptance(i)} class = 'shadow-md text-sm hover:shadow-xl z-40  cursor-pointer active:shadow-sm  text-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 p-3 py-2 rounded-lg text-white font-semibold'>Confirm Acceptance and Join</button>
</div>

  
  
  :joinR.appStatus === 'Rejected'?
  
  <button onClick={()=>confirmRejection(i)} class = 'shadow-md hover:shadow-xl cursor-pointer lg:text-base text-sm  z-40 active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 p-5 left-[1px] py-2 rounded-lg text-white font-semibold'>Remove</button>
  
  :''}
  </div>
</div>
</div>

    ) 
    })}
    
    </>

    :''}
</div>



<h1 class = ' text-center w-10/12 relative mx-auto md:mb-0 -mb-3   md:mt-6 mt-4 py-4 pb-[10px] underline font-semibold text-gray-800 md:text-[47px] text-[38px] '>Invites ({arr2?arr2.length:''})</h1>


<div class = {`grid ${arr2 && arr2.length === 1 ? 'lg:grid-cols-3 grid-cols-4':'md:grid-cols-3 sm:grid-cols-2 grid-cols-1'} gap-6 xl:px-24 lg:px-16  sm:px-10  px-[60px]   pointer-events-auto ${arr2 && arr2.length === 0 || loading? 'sm:mb-[5rem] mb-[3rem] sm:pb-10 pb-6 sm:pt-[54px] pt-[46px]':'md:-mb-[13.5rem] -mb-[12rem] pt-[54px]'}`}>

{


loading?

 <div class ={`relative mx-auto  -mb-56 ${arr2  && arr2.length === 1 ?'lg:col-span-3 col-span-4':' md:col-span-3 sm:col-span-2 col-span-1'} pt-[80px] pb-[90px] text-center block justify-center`}>
   <PulseLoader color={'#1a52c9'} loading={loading}  size={20} margin={7} />
   </div> 

:

arr2?

arr2.length===0?


<p class = 'smd:text-4xl sm:text-3xl text-2xl font-semibold md:col-span-3 sm:col-span-2 col-span-1 text-center mt-[70px] -mb-[400px] right-1 mx-auto relative'><svg xmlns="http://www.w3.org/2000/svg" class="md:h-10 sm:h-8 h-6 w-6 md:w-10 sm:w-8  inline text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
</svg> <span class = 'top-0.5 relative'>No Invites Received</span></p>




:
<>

{projects2&&arr2&&arr2.map((joinR,i)=> {

return(
<div data-aos={"fade-up"} data-aos-once='true' class={`rounded-lg col-span-1 -mt-1 z-40 pointer-events-auto ${arr2 && arr2.length === 1 ? 'md:col-start-2 lg:col-start-2 sm:col-start-2  col-start-1 lg:col-span-1 sm:col-span-2 col-span-4 relative' :''} shadow-lg bg-white `}>
<a href="#!">
<img class="rounded-t-lg scale-75 -my-5 " src={projects2[i]?projects2[i].projPic:''} alt=""/>
</a>
<div class="p-6 border-t-[1px] border-gray-400 text-center sm:text-left pointer-events-auto z-50">
<h5 class="text-gray-900 relative bottom-1 mt-1  text-xl font-medium mb-2">Invite : {projects2[i]?projects2[i].name : ''}</h5>
<p class="text-gray-700 lg:text-base text-sm mb-1 mt-1.5">
{projects2[i]?projects2[i].problem: ''}
</p>
<p class="text-gray-700 text-sm mb-3 mt-2.5">
Admin Name: {projects2[i]?projects2[i].admin.name: ''}<br/>
View profile:   <p onClick={()=> {
          localStorage.setItem('viewToken',projects2[i].admin.id);
          window.open(process.env.NODE_ENV ==='production'?'https://ideastack.org/viewProfile':'http://localhost:3000/viewProfile', '_blank')
        }} class = 'text-blue-700 w-fit text-center mx-auto md:inline block hover:underline relative text-sm font-semibold hover:text-blue-800 cursor-pointer'> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-[4px] inline relative bottom-[2px]" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd" />
</svg><span class = 'inline'>Click Here</span></p>
</p>
<h3 class = {`font-semibold tracking-wide relative top-1 lg:text-base text-sm lg:mt-5 mt-3 lg:mb-0 mb-[1px]  text-indigo-600 ${joinR.appStatus === 'Invited'||joinR.appStatus === 'Rejected'?'text-center':''}`}>Status: {arr2[i].appStatus}</h3>

<div class = 'z-40  lg:text-base text-sm pointer-events-auto'>
{joinR.appStatus === 'Invited'? 

<div class = 'relative mt-6 mb-1 mx-auto   grid grid-cols-2 gap-2'>
<button onClick={()=>confirmRejectionInvite(i,2)} class = 'shadow-md text-sm hover:shadow-xl z-40  cursor-pointer active:shadow-sm  text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500  p-3 py-2 pt-1.5 rounded-lg text-white font-semibold'>Cancel Request</button>
<button onClick={()=>confirmInvite(i)} class = 'shadow-md text-sm hover:shadow-xl z-40  cursor-pointer active:shadow-sm  text-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 p-3 py-2 rounded-lg text-white font-semibold'>Confirm Invite and Join</button>
</div>

:joinR.appStatus === 'Rejected'?



<button onClick={()=>confirmRejection(i)} class = 'shadow-md hover:shadow-xl cursor-pointer lg:text-base text-sm  z-40 active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 p-5 left-[1px] py-2 rounded-lg text-white font-semibold'>Remove Project Request</button>

:''}
</div>
</div>
</div>

) 



})}
    
    </>

    :''}
</div>


        
        </>
    )
}

export default JoinRequests




