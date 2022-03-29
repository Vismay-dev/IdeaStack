import React from 'react'

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";

import UpcomingMentor from './UpcomingMentor.js'
import AllMentorshipSessions from './AllMentorshipSessions.js';
import FindMentor from './FindMentor.js';
import BrowseExperts from './BrowseExperts.js';
import MakePayment from './MakePayment.js'; 

import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Mentorship = () => {

  const [mentorshipPackages, setMentorshipPackages] = useState()

  useEffect(()=> {
    axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/getMentorshipPackages':'http://localhost:4000/api/project/getMentorshipPackages',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
      setMentorshipPackages(res.data)
    }).catch(err=> {
            console.log(err)
        })  
  })



    return (
        <>
            <h2 class = 'text-center font-bold text-6xl text-gray-800 top-1 mt-8  mb-12 relative'>Industry Mentorship</h2>
           
            <div className="flex flex-wrap px-16 right-0.5 relative mt-[55px] -mb-[250px]">



<div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-3">
  <UpcomingMentor mentorshipPackages = {mentorshipPackages}/>
</div>

<div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-3">
  {
    mentorshipPackages && mentorshipPackages.length > 0 &&  mentorshipPackages[0].paymentPending ===true?
    <MakePayment/>
:<FindMentor/>
  }
</div>

<div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-3">
<AllMentorshipSessions/>

</div>

<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-3">
  <CardPageVisits />
</div>
<div className="w-full xl:w-4/12  px-3">
  <CardSocialTraffic />
</div>



</div>

        </>
    )
}

export default Mentorship