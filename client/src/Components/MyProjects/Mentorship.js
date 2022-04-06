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

import AOS from 'aos';
import "aos/dist/aos.css";

const Mentorship = () => {

  useEffect(() => {
    AOS.init({
      duration : 600
    });
  },[]);


  const location = useLocation()
  const projCon = useContext(projectContext)

  const [mentorshipPackages, setMentorshipPackages] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true)
    axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/getMentorshipPackages':'http://localhost:4000/api/project/getMentorshipPackages',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
      setMentorshipPackages(res.data)
      setLoading(false)
    }).catch(err=> {
            console.log(err)
            setLoading(false)
        })  
  },[location.pathname])



    return (
        <>
            <h2 style = {{'backgroundImage':'url(https://www.venafi.com/themes/venafi/images/redesign/blog-detail/blog_detail.jpg)'}} class = 'text-center bg-no-repeat bg-center bg-cover py-9 pb-[54px] font-bold shadow-lg w-fit px-[365px] mx-auto rounded-md right-0.5 text-gray-100 top-1 mt-10  mb-[72px] relative'><p class = 'text-[50px]'>Industry Mentorship</p>
            <p class = 'text-2xl'>Learn from STEM experts</p>
            </h2>
           
            <div className="flex flex-wrap px-16 right-0.5 relative mt-[55px] -mb-[250px]">



{

  loading?

  <div className="w-full  mb-16 xl:mb-0 px-3">



  <div class ='relative mx-auto my-8 mb-16 right-1 py-[55px] pb-[120px] text-center block justify-center'>
   <PulseLoader color={'#1a52c9'} loading={loading}  size={35} margin={10} />
   </div>


   </div>


  :
  <>
<div  className="w-full xl:w-4/12 mb-12 xl:mb-0 px-3">
  <UpcomingMentor mentorshipPackages = {mentorshipPackages}/>
</div>

<div   className="w-full xl:w-4/12 mb-12 xl:mb-0 px-3">
  {
    mentorshipPackages && mentorshipPackages.length > 0 &&  mentorshipPackages[0].paymentPending ===true?
    <MakePayment  mentorshipPackages = {mentorshipPackages} />
:<FindMentor/>
  }
</div>

<div  className="w-full xl:w-4/12 mb-12 xl:mb-0 px-3">
<AllMentorshipSessions/>

</div>

</>


}

<div data-aos={"fade-up"} data-aos-once='true'  className="w-full xl:w-8/12 mb-2 mt-3  px-3">
  <CardPageVisits />
</div>
<div data-aos={"fade-up"} data-aos-once='true' className="w-full xl:w-4/12  mb-2 mt-3   px-3">
  <CardSocialTraffic />
</div>



</div>

        </>
    )
}

export default Mentorship