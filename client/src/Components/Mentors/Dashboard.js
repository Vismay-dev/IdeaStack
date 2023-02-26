import React from "react";

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";

import UpcomingMentor from "./UpcomingMentor.js";
import AllMentorshipSessions from "./AllMentorshipSessions.js";
import FindMentor from "./FindMentor.js";
import MakePayment from "./MakePayment.js";
import MentorshipSchedule from "./MentorshipSchedule.js";

import { GiExitDoor } from "react-icons/gi";

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

  const [index, setIndex] = useState(
    sessionStorage.getItem("index") ? sessionStorage.getItem("index") : null
  );

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
      <h2 class="text-center bg-no-repeat bg-center bg-cover py-7 pb-[35px] font-bold  xl:px-[365px] lg:px-[250px] md:px-[150px] sm:px-[100px] sm:w-fit sm:left-0 left-[0.1px] w-full mx-auto rounded-md right-0.5 text-gray-900 top-1 mt-[12px] -mb-[55px] relative">
        <p class="md:text-[50px] sm:text-[40px] text-[32px]">
          Industry Mentorship
        </p>
        <p class="sm:text-2xl text-xl">Learn from STEM experts</p>
      </h2>

      <div
        className={`flex ${
          workshops && workshops.length > 0 ? "mt-[80px] relative" : "mt-[80px]"
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
            {workshops.length > 0 ? (
              index == null ? (
                <>
                  <p
                    data-aos={"fade-up"}
                    data-aos-once="true"
                    class="font-bold text-[27px] text-gray-800"
                  >
                    Ongoing <span class="text-blue-700">Courses </span> You've
                    Booked: ({workshops.length})
                  </p>
                  <br />
                  <div class="grid w-full grid-cols-2 px-4 gap-5 mt-9 mb-14">
                    {workshops.map((workshop, i) => {
                      return (
                        <div key={i} class="col-span-1  z-[75] ">
                          <div
                            data-aos={"zoom-in"}
                            data-aos-once="true"
                            class={`w-full  px-8 py-4 mt-1 z-40 pointer-events-auto mr-32 relative right-1.5 
                             bg-white rounded-lg shadow-md `}
                          >
                            <div class="flex items-center justify-between ">
                              <span class="text-sm block -mt-6 uppercase -mb-2 font-light text-gray-600 ">
                                {workshop.duration + " weeks"}
                              </span>

                              <button
                                type="button"
                                class="text-white bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg px-3.5 py-1.5 -mr-2 mt-1 text-md text-center mb-2"
                                onClick={() => {
                                  setIndex(i);
                                  sessionStorage.setItem("index", i);
                                }}
                              >
                                View Dashboard
                              </button>
                            </div>

                            <div class="-mt-2 relative -top-0.5">
                              <a
                                href="#"
                                class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline"
                              >
                                {workshop.title}
                              </a>
                              <p class="mt-4 pb-1 pt-1  md:text-md text-sm text-gray-600 ">
                                {workshop.mentorshipProp}
                              </p>
                            </div>

                            <div class="flex items-center justify-between mt-4 z-[75]">
                              <div class="flex items-center relative bottom-0.5">
                                {workshop.mentors &&
                                  workshop.mentors.map((mentor, i) => {
                                    return (
                                      <span>
                                        <img
                                          class="object-cover sm:inline hidden w-7 h-7 mr-2 rounded-full "
                                          src={
                                            workshop.pics[i]
                                              ? workshop.pics[i]
                                              : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                                          }
                                          alt="avatar"
                                        />
                                        <p class="font-semibold text-sm inline mr-6 text-gray-700 cursor-pointer ">
                                          {mentor}
                                        </p>

                                        {i == 2 ? (
                                          <>
                                            <br /> <div class="mb-2"></div>{" "}
                                          </>
                                        ) : mentor + i ==
                                          workshop.mentors.length - 2 ? (
                                          " & "
                                        ) : i == workshop.mentors.length - 1 ? (
                                          ""
                                        ) : (
                                          ""
                                        )}
                                      </span>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div class="mx-auto justify-center block sm:left-36 -top-28 absolute text-center">
                    <button
                      onClick={() => setIndex(null)}
                      class="w-32 p-2 rounded-md font-semibold tracking-wide shadow-md mt-3  bg-blue-700 hover:bg-blue-800  text-base hover:shadow-xl active:shadow-md text-white  uppercase "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="relative mx-auto inline text-center text-lg mr-2 bottom-[2px] w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                        />
                      </svg>
                      Go Back
                    </button>
                  </div>

                  <div
                    className={`w-full ${
                      sessionsConfirmed ? "xl:w-full" : "xl:w-4/12"
                    } mb-3 mt-1 xl:mb-0 px-3`}
                  >
                    <p class="text-base sm:text-gray-600 text-gray-800 -mt-3  sm:font-semibold bg-yellow-50 w-[90%] text-center mb-7 p-2  px-3 border-yellow-600 border-dashed border-[1px] rounded-md font-normal shadow-md leading-5 mx-auto relative block ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-red-700 inline mr-[4px]  relative bottom-[0.6px]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                        />
                      </svg>
                      <strong> Open discussion sessions </strong> allow you to
                      connect with course mentors and ask them for{" "}
                      <strong>
                        advice (on your project) or clarify your doubts
                      </strong>
                      . It is recommended that you{" "}
                      <strong> watch the week's course recording </strong>
                      before you attend an open discussion session.{" "}
                    </p>
                    <UpcomingMentor
                      confirmSessions={() => {
                        setSessionsConfirmed(true);
                      }}
                      workshop={workshops ? workshops[index] : null}
                    />
                  </div>

                  {sessionsConfirmed ? (
                    <div class="xl:w-8/12 w-full mb-3 xl:mb-0 px-3">
                      <MentorshipSchedule
                        workshop={workshops ? workshops[index] : null}
                      />
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
                      <MakePayment
                        workshop={workshops ? workshops[index] : null}
                      />
                    ) : (
                      <FindMentor />
                    )}
                  </div>

                  <div
                    className={`w-full xl:w-${
                      sessionsConfirmed === true ? "4/12" : "4/12"
                    } mb-3 xl:mb-0 sm:px-3 px-1`}
                  >
                    <AllMentorshipSessions
                      workshop={workshops ? workshops[index] : null}
                    />
                  </div>

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
                </>
              )
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
