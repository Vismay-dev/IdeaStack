import React from 'react'

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";

import UpcomingMentor from './UpcomingMentor.js'
import AllMentorshipSessions from './AllMentorshipSessions.js';
import FindMentor from './FindMentor.js';
import BrowseExperts from './BrowseExperts.js';
import MakePayment from './MakePayment.js'; 

import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader"
import { useLocation } from 'react-router-dom';
import projectContext from '../../context/projectContext'

import CancelModal from '../Modals/CancelModal'

import AOS from 'aos';
import "aos/dist/aos.css";

import userContext from "../../context/userContext";


const Mentorship = () => {

  const user = useContext(userContext).user

  useEffect(() => {
    AOS.init({
      duration : 600
    });
  },[]);

  const [cancel,setCancel] = useState(false)
  const location = useLocation()
  const projCon = useContext(projectContext)

  const [mentorshipPackages, setMentorshipPackages] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true)
    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getMentorshipPackages':'http://localhost:4000/api/project/getMentorshipPackages',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
      setMentorshipPackages(res.data)
      setLoading(false)
    }).catch(err=> {
            console.log(err)
            setLoading(false)
        })  
  },[location.pathname])

  const [isMentor, setIsMentor] = useState(false)
  useEffect(()=> {

    axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getTeam':'http://localhost:4000/api/project/getTeam',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
      if(JSON.stringify(user._id) === JSON.stringify(res.data[0].id)){
        setIsMentor(true)
      }})


},[])


    return (
        <>

        {
          cancel?
          <CancelModal close = {()=>setCancel(false)}/>:''
        }
            <h2 style = {{'backgroundImage':'url(https://www.venafi.com/themes/venafi/images/redesign/blog-detail/blog_detail.jpg)'}}
     class = 'text-center bg-no-repeat bg-center bg-cover py-9 pb-[54px] font-bold shadow-lg xl:px-[365px] lg:px-[250px] md:px-[150px] sm:px-[100px] sm:w-fit sm:left-0 left-[0.1px] w-full mx-auto rounded-md right-0.5 text-gray-100 top-1 mt-10  mb-[67px] relative'><p class = 'md:text-[50px] sm:text-[40px] text-[32px]'>Industry Mentorship</p>
            <p class = 'sm:text-2xl text-xl'>Learn from STEM experts</p>
            </h2>

            {
               mentorshipPackages && mentorshipPackages.length > 0 &&  mentorshipPackages[mentorshipPackages.length-1].paymentPending ===true?
              <>
            <p class = {` ${isMentor?' top-2':' -mt-7 top-[5px] -mb-[27px]'}  -mt-6  px-6 relative text-center `} ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline relative mr-1 bottom-[1.35px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
 <span class = {'inline'}>Payments are only processed after all members have paid</span></p>
    {    isMentor?   <button onClick={()=>setCancel(true)} class = 'uppercase bg-gradient-to-tr bottom-3  from-orange-600 to-orange-300 hover:from-orange-600 hover:to-orange-400 hover:shadow-xl active:shadow-sm text-white font-semibold mt-3 shadow-md relative top-5 w-1/2 mx-auto block mb-10 p-3 px-3 rounded-md'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1.5 relative bottom-[1.3px] inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg><span class = 'inline'>Cancel Latest Mentor Booking (Admin Only)</span> </button> :'' }
</>:''}
           
            <div className={`flex ${    mentorshipPackages && mentorshipPackages.length > 0 &&  mentorshipPackages[mentorshipPackages.length-1].paymentPending ===true?
            'mt-[80px] relative':'mt-[43px]'} flex-wrap xl:px-16 lg:px-14 md:px-9 sm:px-6 px-3  md:right-0.5 relative  xl:-mb-[277px] md:-mb-[250px] -mb-[240px]`}>

      

{

  loading?

  <div className="w-full   mb-14 xl:mb-0 px-3">



  <div class ='relative mx-auto my-8 mb-16 right-1 lg:py-[70px] lg:pb-[140px] py-[90px] sm:pb-[120px] pb-[100px] sm:left-0 left-1 text-center block justify-center'>
   <PulseLoader color={'#1a52c9'} loading={loading}  size={25} margin={10} />
   </div>


   </div>


  :
  <>
<div   className="w-full xl:w-4/12 mb-3 xl:mb-0 px-3">
  <UpcomingMentor mentorshipPackages = {mentorshipPackages}/>
</div>

<div    className="w-full xl:w-4/12 mb-3 xl:mb-0 px-3">
  {
    mentorshipPackages && mentorshipPackages.length > 0 &&  mentorshipPackages[mentorshipPackages.length-1].paymentPending ===true?
    <MakePayment  mentorshipPackages = {mentorshipPackages} />
:<FindMentor/>
  }
</div>

<div  className="w-full xl:w-4/12 mb-3 xl:mb-0 sm:px-3 px-1">
<AllMentorshipSessions/>

</div>

</>


}

<div data-aos={"fade-up"} data-aos-once='true'  className="w-full xl:w-8/12 mb-9 mt-1  px-3">
  <CardPageVisits />
</div>
<div data-aos={"fade-up"} data-aos-once='true' className="w-full xl:w-4/12  mb-2 mt-5 xl:mt-1   px-3">
  <CardSocialTraffic />
</div>



</div>

        </>
    )
}

export default Mentorship