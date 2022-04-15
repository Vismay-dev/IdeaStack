import {useHistory} from 'react-router-dom'
import PaymentModal from '../Modals/PaymentModal';
import { useState, useEffect } from 'react';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"

const MakePayment = (props) => {

    const history = useHistory()
    const [showPaymentModal, setShowPaymentModal] = useState(false);


    const [consultant,setConsultant] = useState({})
    useEffect(()=> {
      if(props.mentorshipPackages && props.mentorshipPackages.length!==0) {
         setConsultant(props.mentorshipPackages[0])
      }
    },[props.mentorshipPackages])

    const [payment, setPayment] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getUser':
      'http://localhost:4000/api/user/getUser',{token:sessionStorage.getItem('token')}).then((res)=> {
      let idImp = res.data._id;
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/getTeam':'http://localhost:4000/api/project/getTeam',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
          for(let i=0; i<res.data.length; i++) {
            if(idImp === res.data[i].id){
              console.log(res.data[i].pendingPayments[0])
              setPayment(res.data[i].pendingPayments[0])
            }
          }  
          setLoading(false)          
          }).catch(err=> {
              console.log(err)
          })    
  })
      },[props.mentorshipPackages])
      

    return (
        <>

        {
          showPaymentModal?
          <PaymentModal close = {()=>{setShowPaymentModal(false)}} expert = {consultant}/>:
          ''
        }
    <div data-aos={"fade-up"} data-aos-once='true' data-aos-delay = '150' style = {{'backgroundImage':payment===0? 'url(https://c0.wallpaperflare.com/preview/134/372/59/abstract-background-copyspace-brainstorm.jpg)':"url(https://www.vapulus.com/en/wp-content/uploads/2021/02/challenge-accepting-online-payments-technical-issue-1024x768-1.png)"}} 
          class={`rounded-md  mb-8 bg-cover shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] bg-right border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}>
                  <div class = 'bg-gray-900 h-full z-10 bg-opacity-[.75]'>

        
        {

loading?
      <div class ='relative mx-auto top-[33%] left-0.5 text-center block justify-center'>
      <ClipLoader color={'#ffffff'} loading={loading}  size={110} />
      </div>


:
          payment===0?
          
          <>


<div class = 'h-28 pt-2.5 '>
<p className="text-center top-2 text-xl sm:px-10 px-3 xl:w-[360px] sm:w-[400px] w-[280px] mx-auto block font-semibold relative text-white">
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bottom-[1.5px] mr-0.5 relative inline text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
</svg> Individual Payment Completed</p><br/>
    
  <h3 class = 'font-semibold text-center mx-auto sm:mt-[14px] my-3 mt-4 xl:text-[18px] sm:text-[18px] text-[16px] sm:px-7 xl:px-2 px-1 xl:w-[360px] sm:w-[400px] w-[290px] right-0.5 text-white'>Awaiting Payment from <span class = 'text-slate-300'>Other Team Members. </span> Session to be Scheduled on <span class = 'text-slate-300'>Completion of Team Payment </span>...</h3>
  <button  class = 'bg-indigo-500  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2.5 xl:mt-7 mt-9 mb-1 text-white font-semibold'>Download Payment Invoice</button>
  
  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-center relative mx-auto block top-[28px] text-indigo-600 bg-blue-200 border-2 border-indigo-800 rounded-full p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
  </svg>
  
  </div>
          
          
          
          
          </>
          
          
          
          
          
          
          :
          
      
  
    <div class = 'h-28 pt-2.5 '>
    <p className="text-center top-2 text-xl sm:px-10 px-3 xl:w-[360px] sm:w-[400px] w-[280px] mx-auto block font-semibold relative text-white">
      

    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bottom-[1.5px] mr-0.5 relative inline text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>   Payment Required for Session Scheduling:</p><br/>
    
  <h3 class = 'font-semibold text-center mx-auto sm:mt-[3px] my-3 xl:text-[20px] sm:text-[18px] text-[16px] sm:px-5 px-1 xl:w-[360px] sm:w-[350px] w-[290px] rounded-lg xl:text-white xl:bg-transparent xl:p-0 p-1 bg-white text-black'>All Session costs are divided <span class = 'text-blue-700 xl:text-blue-200'> equally and affordably</span> among <span class = 'text-blue-700 xl:text-blue-200'>Team Members</span>...</h3>
  <button onClick={()=> setShowPaymentModal((true))} class = 'bg-indigo-500  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2.5 mt-7 mb-2 text-white font-semibold'>Pay Pending Amount</button>
  
  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-center relative mx-auto block top-[28px] text-indigo-600 bg-blue-200 border-2 border-indigo-800 rounded-full p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
  </svg>
  
  </div>
        }
        

        </div>
        </div>

 
</>
    )
}

export default MakePayment