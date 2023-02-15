import React from "react";

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";

import UpcomingMentor from "./UpcomingMentor.js";
import AllMentorshipSessions from "./AllMentorshipSessions.js";
import FindMentor from "./FindMentor.js";
import MakePayment from "./MakePayment.js";
import MentorshipSchedule from "./MentorshipSchedule.js";

import { Switch, Route, Redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useLocation } from "react-router-dom";
import projectContext from "../../context/projectContext";

import CancelModal from "../Modals/CancelModal";

import AOS from "aos";
import "aos/dist/aos.css";

import userContext from "../../context/userContext";

const Dashboard = () => {
  const user = useContext(userContext).user;

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  const [cancel, setCancel] = useState(false);
  const location = useLocation();

  const [workshops, setWorkshops] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getWorkshopsOngoing"
          : "http://localhost:4000/api/user/getWorkshopsOngoing",
        {
          token: sessionStorage.getItem("token"),
        }
      )
      .then((res) => {
        setWorkshops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [location.pathname]);

  const [sessionsConfirmed, setSessionsConfirmed] = useState(false);

  return (
    <>
      {cancel ? <CancelModal close={() => setCancel(false)} /> : ""}
      <h2 class="text-center bg-no-repeat bg-center bg-cover py-7 pb-[35px] font-bold  xl:px-[365px] lg:px-[250px] md:px-[150px] sm:px-[100px] sm:w-fit sm:left-0 left-[0.1px] w-full mx-auto rounded-md right-0.5 text-gray-900 top-1 mt-[17px] -mb-[55px] relative">
        <p class="md:text-[50px] sm:text-[40px] text-[32px]">
          Industry Mentorship
        </p>
        <p class="sm:text-2xl text-xl">Learn from STEM experts</p>
      </h2>

      <div
        className={`flex ${
          workshops && workshops.length > 0 ? "mt-[80px] relative" : "mt-[43px]"
        } flex-wrap xl:px-16 lg:px-14 md:px-9 sm:px-6 px-3  md:right-0.5 relative  xl:-mb-[277px] md:-mb-[250px] -mb-[240px]`}
      >
        {loading ? (
          <div className="w-full   mb-14 xl:mb-0 px-3">
            <div class="relative mx-auto my-8 mb-16 right-1 lg:py-[70px] lg:pb-[140px] py-[90px] sm:pb-[120px] pb-[100px] sm:left-0 left-1 text-center block justify-center">
              <PulseLoader
                color={"#1a52c9"}
                loading={loading}
                size={25}
                margin={10}
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className={`w-full ${
                sessionsConfirmed ? "xl:w-full" : "xl:w-4/12"
              } mb-3 xl:mb-0 px-3`}
            >
              <UpcomingMentor
                confirmSessions={() => {
                  setSessionsConfirmed(true);
                }}
                workshops={workshops}
              />
            </div>

            {sessionsConfirmed ? (
              <div class="xl:w-8/12 w-full mb-3 xl:mb-0 px-3">
                <MentorshipSchedule workshops={workshops} />
              </div>
            ) : (
              ""
            )}

            <div
              className={`w-full xl:w-${
                sessionsConfirmed === true ? "1/2 hidden" : "4/12"
              } mb-3 xl:mb-0 px-3`}
            >
              {workshops && workshops.length > 0 ? (
                <MakePayment workshops={workshops} />
              ) : (
                <FindMentor />
              )}
            </div>

            <div
              className={`w-full xl:w-${
                sessionsConfirmed === true ? "4/12" : "4/12"
              } mb-3 xl:mb-0 sm:px-3 px-1`}
            >
              <AllMentorshipSessions />
            </div>
          </>
        )}

        <div
          data-aos={"fade-up"}
          data-aos-once="true"
          className="w-full xl:w-8/12 mb-9 mt-1  px-3"
        >
          <CardPageVisits />
        </div>
        <div
          data-aos={"fade-up"}
          data-aos-once="true"
          className="w-full xl:w-4/12  mb-2 mt-5 xl:mt-1   px-3"
        >
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
