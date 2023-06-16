import React from "react";

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";

import UpcomingMentor from "./UpcomingMentor.js";
import AllMentorshipSessions from "./AllMentorshipSessions.js";
import FindMentor from "./FindMentor.js";
import MakePayment from "./MakePayment.js";
import MentorshipSchedule from "./MentorshipSchedule.js";

import MentorInfo from "./DashboardComponents/MentorInfo.js";
import Meetings from "./DashboardComponents/Meetings.js";
import TasksAndResources from "./DashboardComponents/TasksAndResources";

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
import { useHistory } from "react-router-dom";
import mentorContext from "../../context/mentorContext.js";

const Dashboard = () => {
  const user = useContext(userContext).user;
  const project = useContext(projectContext).project;
  const projCon = useContext(projectContext);
  const mentorCon = useContext(mentorContext);
  const history = useHistory();

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

  const [mentorsMatched, setMentorsMatched] = useState();
  const [mentorsRequested, setMentorsRequested] = useState();

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (project && !mentorsRequested) {
  //     setLoading(true);

  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }
  // }, [location.pathname]);

  const endMentorship = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/endMentorship"
          : "http://localhost:4000/api/user/endMentorship",
        {
          token: sessionStorage.getItem("token"),
          mentorId: mentorCon.mentors[index].mentorId,
        }
      )
      .then((res) => {
        sessionStorage.removeItem("index");
        setIndex(null);
        history.push("/dashboard/yourmentor");
        projCon.setProject({ ...res.data, changeFlagged: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const repeatMentorship = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/repeatMentorship"
          : "http://localhost:4000/api/user/repeatMentorship",
        {
          token: sessionStorage.getItem("token"),
          mentorId: mentorCon.mentors[index].mentorId,
        }
      )
      .then((res) => {
        projCon.setProject({
          ...res.data,
          changeFlagged: true,
          repeatFlagged: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (mentorCon.mentors && mentorsRequested && mentorsMatched) {
      setLoading(false);
      console.log("here1");
    }

    if (location.pathname === "/dashboard/yourmentor/mentorinfo") {
      if (projCon.project.meetingFlagged) {
        history.push("/dashboard/yourmentor/meetings");
        projCon.setProject({ ...projCon.project, meetingFlagged: false });
      }
    }

    if (
      !project.doneOnce &&
      project &&
      (!mentorCon.mentors || !mentorsRequested || !project.changeFlagged)
    ) {
      console.log("here");
      setLoading(true);

      let mentorsMatchedInput = project.mentorsMatched
        ? project.mentorsMatched
        : [];

      let mentorsMatchedCopy = [];

      for (let j = 0; j < mentorsMatchedInput.length; j++) {
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/getWorkshop"
              : "http://localhost:4000/api/user/getWorkshop",
            {
              token: sessionStorage.getItem("token"),
              workshopId: mentorsMatchedInput[j].mentorId,
            }
          )
          .then((res) => {
            mentorsMatchedCopy.push({
              ...mentorsMatchedInput[j],
              ...res.data,
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      }

      mentorCon.setMentors(mentorsMatchedCopy);

      setMentorsMatched(mentorsMatchedCopy);

      let mentorsRequestedInput = project.mentorsRequested
        ? project.mentorsRequested.filter(
            (mentor) =>
              !project.mentorsMatched
                .map((mentorObj) => mentorObj.mentorId)
                .includes(mentor)
          )
        : [];
      let mentorsRequestedCopy = [];

      for (let i = 0; i < mentorsRequestedInput.length; i++) {
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/getWorkshop"
              : "http://localhost:4000/api/user/getWorkshop",
            {
              token: sessionStorage.getItem("token"),
              workshopId: mentorsRequestedInput[i],
            }
          )
          .then((res) => {
            mentorsRequestedCopy.push(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }

      setMentorsRequested(mentorsRequestedCopy);

      setTimeout(() => {
        projCon.setProject({
          ...project,
          changeFlagged: false,
          doneOnce:
            mentorsRequestedCopy.length === 0 ||
            mentorsMatchedCopy.length === 0,
        });
        setLoading(false);
      }, 1000);
    }
  }, [location.pathname, projCon.project]);

  return (
    <>
      {cancel ? <CancelModal close={() => setCancel(false)} /> : ""}
      <h2 class="text-center bg-no-repeat bg-center bg-cover py-7 pb-[35px] font-bold  xl:px-[365px] lg:px-[250px] md:px-[150px] sm:px-[100px] sm:w-fit sm:left-0 left-[0.1px] w-full mx-auto rounded-md right-0.5 text-gray-900 sm:top-1 sm:mt-[12px] -mb-[55px] relative">
        <p class="lg:text-5xl md:text-4xl text-3xl md:mt-1 sm:mt-0 mt-3 px-6 tracking-wide">
          Mentorship
        </p>

        {!mentorCon.mentors ||
        mentorCon.mentors.length === 0 ||
        (sessionStorage.getItem("index") == null && !index) ||
        !project ? (
          <p class=" text-xl bg-gradient-to-r mt-2.5 px-5 mb-1 font-semibold text-center bg-clip-text mx-auto text-transparent from-blue-500 to-indigo-600 w-fit">
            Learn from Industry Leaders
          </p>
        ) : (
          <p
            class={`md:text-2xl sm:text-xl text-lg bg-gradient-to-r ${
              index &&
              mentorCon.mentors &&
              mentorCon.mentors[index] &&
              mentorCon.mentors[index].mentorshipCompleted === true
                ? "lg:-mt-[5px] -mt-2"
                : "lg:mt-6 -mt-2"
            }  lg:mb-1 mb-4 relative top-4 font-semibold text-center bg-clip-text mx-auto text-transparent from-blue-500 to-indigo-600 w-fit`}
          >
            {mentorCon.mentors[index]
              ? mentorCon.mentors[index].name + " X " + project.name
              : ""}
          </p>
        )}
      </h2>

      <div
        className={`flex ${
          mentorCon.mentors && mentorCon.mentors.length > 0
            ? "mt-[80px] relative"
            : "mt-[80px]"
        } flex-wrap xl:px-16 lg:px-14 md:px-9 sm:px-6 px-12  -mr-[20px] relative  xl:-mb-[277px] md:-mb-[277px] sm:-mb-[255px] -mb-[277px]`}
      >
        {loading ? (
          <div className="w-full  mb-14 xl:mb-0 px-3">
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
            {mentorCon.mentors && mentorCon.mentors.length > 0 ? (
              sessionStorage.getItem("index") == null && !index ? (
                <>
                  <p
                    data-aos={"fade-up"}
                    data-aos-once="true"
                    class="font-bold sm:text-[27px] text-[24px] -mt-4 mb-1 xl:left-10 text-gray-800"
                  >
                    Approved{" "}
                    <span class="text-blue-700"> mentorship meetings:</span> (
                    {mentorCon.mentors.length})
                  </p>
                  <br />
                  <div
                    class={` ${
                      mentorCon.mentors.length > 1
                        ? "lg:grid-cols-2 grid-cols-1 mb-10 w-full"
                        : "grid-cols-1 mb-14 w-full"
                    }  grid gap-6  mt-9 `}
                  >
                    {mentorCon.mentors.map((mentor, i) => {
                      return (
                        <div
                          key={i}
                          data-aos={"zoom-in"}
                          data-aos-once="true"
                          class={`w-full flex flex-col flex-1  px-8 sm:py-4 pt-4 pb-5 mt-1 z-40 pointer-events-auto mr-32 relative right-2
                             bg-white rounded-lg shadow-md `}
                        >
                          <div class="sm:flex items-center justify-between ">
                            <span class="text-sm block sm:w-full w-fit -mt-6 uppercase -mb-2 relative sm:top-0 top-[22px] sm:left-0 -left-2 font-light text-gray-600 ">
                              {mentor.duration == 1
                                ? "1 Meeting Only"
                                : mentor.duration + " week mentorship"}
                            </span>

                            <button
                              type="button"
                              class="text-white text-sm uppercase bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg px-2.5 py-1.5 sm:-mr-2 mx-auto block sm:mb-2 mb-[72px] sm:top-0 top-[42px] sm:w-[130px] w-[110px] sm:mt-0 mt-[10px] sm:right-0  relative text-center"
                              onClick={() => {
                                setIndex(i);
                                sessionStorage.setItem("index", i);
                              }}
                            >
                              View More
                            </button>
                          </div>

                          <img
                            src={
                              mentor.pic
                                ? mentor.pic
                                : "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8&w=1000&q=80"
                            }
                            alt="expert"
                            class={` 
                               mx-auto 
                        rounded-full border-blue-700 border-dashed border sm:mb-3 mb-6 mt-1  w-[160px] h-[160px] shadow-md  object-center object-cover`}
                          />

                          <div class="sm:mt-1 mt-3 block relative -top-0.5">
                            <a
                              href="#"
                              class="text-2xl sm:mb-0 -mb-2 relative font-bold text-gray-700 hover:text-gray-600  hover:underline"
                            >
                              {mentor.name}
                            </a>
                            <p class="mt-4 pb-1 pt-1  md:text-md text-sm text-gray-600 ">
                              {mentor.mentorshipProp}
                            </p>
                          </div>

                          <div class="flex items-center justify-between mt-2 z-[100]">
                            <div class="flex items-center relative ">
                              {mentor.orgs &&
                                mentor.orgs.map((org, i) => {
                                  return (
                                    <span>
                                      <img
                                        class="object-cover sm:inline hidden w-6 h-6 mr-2 shadow-sm rounded-full "
                                        src={
                                          org.pic
                                            ? org.pic
                                            : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                                        }
                                        alt="avatar"
                                      />
                                      <p class="font-semibold text-sm inline mr-6 text-gray-700 cursor-pointer ">
                                        {org.name}
                                      </p>

                                      {i == 4 ? (
                                        <>
                                          <br /> <div class="mb-2"></div>{" "}
                                        </>
                                      ) : i == mentor.orgs.length - 2 ? (
                                        ""
                                      ) : i == mentor.orgs.length - 1 ? (
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
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div
                    class={`mx-auto justify-center xl:left-40 lg:block hidden ${
                      index &&
                      mentorCon.mentors &&
                      mentorCon.mentors[index] &&
                      mentorCon.mentors[index].mentorshipCompleted === true
                        ? "-top-24"
                        : "-top-32"
                    } absolute text-center`}
                  >
                    <button
                      onClick={() => {
                        setIndex(null);
                        sessionStorage.removeItem("index");
                        history.push("/dashboard/yourmentor");
                      }}
                      class="w-32 p-2 sm:-mb-2 -mb-3 sm:mt-3 mt-1 rounded-md font-semibold tracking-wide shadow-md   bg-blue-700 hover:bg-blue-800 text-base hover:shadow-xl active:shadow-md text-white "
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

                  <div class="mx-auto w-full sm:-mt-12 -mt-14 sm:mb-9 mb-9 lg:right-0 right-1 lg:mr-0 mr-1 lg:hidden block  relative text-center">
                    <button
                      onClick={() => {
                        setIndex(null);
                        sessionStorage.removeItem("index");
                        history.push("/dashboard/yourmentor");
                      }}
                      class="w-[135px] px-3 py-2.5 rounded-md font-semibold tracking-wide shadow-md mt-8 mb-4   bg-blue-700 hover:bg-blue-800   sm:text-base text-sm hover:shadow-xl active:shadow-md text-white  "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="relative mx-auto inline text-center text-lg mr-2 bottom-[2px] w-4 h-4"
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
                  {(index != null &&
                    mentorCon.mentors[index] != null &&
                    mentorCon.mentors[index].mentorshipCompleted == false) ||
                  mentorCon.mentors[index].mentorshipCompleted == null ? (
                    <div class="block mx-auto text-center px-3 -mt-5 sm:right-3 right-1.5 lg:w-full w-fit relative mb-16 rounded-lg">
                      <a
                        onClick={() => {
                          history.push(
                            location.pathname.includes("mentorship")
                              ? "/mentorship/yourmentor/mentorinfo"
                              : "/dashboard/yourmentor/mentorinfo"
                          );
                        }}
                        class={` ${
                          location.pathname.includes("mentorinfo")
                            ? "bg-blue-700 text-gray-100 border-blue-700 border shadow-md"
                            : "bg-white shadow-md  text-gray-800"
                        } hover:cursor-pointer relative top-2 normal-case hover:bg-blue-700 hover:border-r-indigo-50  hover:shadow-sm hover:border-blue-700 inline-flex items-center justify-center  sm:rounded-l-lg sm:rounded-r-none  rounded-l-lg rounded-r-none border py-[10px]  lg:px-[60px] sm:px-[20px] px-[10px] text-center sm:text-base text-sm font-semibold  transition-all hover:text-gray-100 sm:py-4`}
                      >
                        <span class="pr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="sm:w-5 sm:h-5 w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </span>
                        Mentor Info
                      </a>
                      <a
                        onClick={() => {
                          history.push(
                            location.pathname.includes("mentorship")
                              ? "/mentorship/yourmentor/meetings"
                              : "/dashboard/yourmentor/meetings"
                          );
                        }}
                        class={`${
                          location.pathname.includes("meetings")
                            ? "bg-blue-700 border-blue-700 text-gray-100 border shadow-md"
                            : "bg-white shadow-md text-gray-800"
                        } hover:cursor-pointer relative top-2 normal-case hover:bg-blue-700 hover:shadow-sm hover:border-l-indigo-50 hover:border-blue-700 active:border-blue-700 inline-flex items-center justify-center  sm:rounded-l-none sm:rounded-r-none rounded-r-lg rounded-l-none  border py-[10px]  lg:px-[60px] sm:px-[20px] px-[10px]  text-center sm:text-base text-sm font-semibold  transition-all hover:text-gray-100 sm:py-4 `}
                      >
                        <span class="pr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="sm:w-5 sm:h-5 w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </span>
                        Meetings
                      </a>
                      <br class="sm:hidden block" />
                      <a
                        onClick={() => {
                          history.push(
                            location.pathname.includes("mentorship")
                              ? "/mentorship/yourmentor/tasksandresources"
                              : "/dashboard/yourmentor/tasksandresources"
                          );
                        }}
                        class={`${
                          location.pathname.includes("tasksandresources")
                            ? "bg-blue-700 border-blue-700 text-gray-100 border shadow-md"
                            : "bg-white shadow-md text-gray-800"
                        } hover:cursor-pointer relative top-2 normal-case hover:bg-blue-700 hover:shadow-sm hover:border-l-indigo-50 hover:border-blue-700 active:border-blue-700 inline-flex items-center justify-center sm:rounded-tl-none sm:rounded-bl-none sm:rounded-r-lg rounded-t-none rounded-b-lg  border py-[10px] lg:px-[60px] sm:px-[20px] px-[10px]  text-center sm:text-base text-sm font-semibold  transition-all hover:text-gray-100 sm:py-4 `}
                      >
                        <span class="pr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class=" sm:w-5 sm:h-5 w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                            />
                          </svg>
                        </span>
                        Tasks & Resources
                      </a>
                    </div>
                  ) : (
                    ""
                  )}

                  <Switch>
                    {index !== null && mentorCon.mentors.length > 0 ? (
                      mentorCon.mentors[index] &&
                      mentorCon.mentors[index].mentorshipCompleted === true ? (
                        <>
                          <Route
                            path={"/dashboard/yourmentor/mentorshipCompleted"}
                          >
                            <>
                              {mentorCon.mentors[index]
                                .repeatRequestApproved === "no" ? (
                                <div class="relative right-2.5 w-full h-fit">
                                  <h1 className="sm:text-3xl text-center w-full  mx-auto block text-2xl lg:text-4xl font-bold leading-tighter tracking-tighter mt-5 sm:mb-8  mb-6">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="you  inline mr-1.5 relative bottom-[1.5px]"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                      />
                                    </svg>
                                    Your Request for Another Meeting{" "}
                                    <span className="bg-clip-text  text-transparent bg-gradient-to-r from-orange-600 to-orange-500">
                                      Was Denied
                                    </span>
                                  </h1>
                                  <button
                                    onClick={() => {
                                      endMentorship();
                                    }}
                                    class="w-fit p-3 px-5 mt-[78px] mb-[110px] uppercase rounded-md block font-semibold tracking-wide shadow-md  mx-auto  bg-blue-700 hover:bg-blue-800 text-base hover:shadow-xl active:shadow-md text-white  "
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
                                    Okay, End Mentorship
                                  </button>
                                </div>
                              ) : mentorCon.mentors[index].repeatRequested &&
                                mentorCon.mentors[index]
                                  .repeatRequestApproved !== "yes" ? (
                                <>
                                  <div class="relative right-2.5 w-full h-fit">
                                    <h1 className="sm:text-2xl text-center w-full  mx-auto block text-1xl lg:text-3xl font-bold leading-tighter tracking-tighter md:-mt-4 sm:-mt-4 md:mb-5 sm:mb-3 -mt-3 mb-6">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-[33px] lg:h-[33px] sm:h-[27px] sm:w-[27px] w-[18px] h-[18px] inline mr-1.5 relative bottom-[1.5px]"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                                        />
                                      </svg>
                                      You Requested{" "}
                                      <span className="bg-clip-text  text-transparent bg-gradient-to-r from-green-600 to-green-500">
                                        Another Meeting
                                      </span>
                                    </h1>

                                    <h1 className="sm:text-3xl text-center mx-auto block text-2xl lg:text-4xl font-extrabold leading-tighter tracking-tighter md:-mt-4 sm:-mt-0 mb-3 -mt-4 ">
                                      Awaiting Response from{" "}
                                      <span className="bg-clip-text  text-transparent bg-gradient-to-r from-blue-500 to-indigo-400">
                                        Mentor
                                      </span>
                                    </h1>

                                    <div class="w-full text-center mx-auto lg:mt-[60px] mt-[40px] lg:mb-[83px] mb-[57px]  relative ">
                                      <i class="fas fa-clock lg:text-[135px] text-[110px] mx-auto block"></i>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div class="relative right-2.5 w-full h-fit">
                                    <h1 className="sm:text-2xl text-center w-full  mx-auto block text-1xl lg:text-3xl font-bold leading-tighter tracking-tighter md:-mt-2 sm:mt-1 sm:mb-8 -mt-3 mb-6">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-[33px] lg:h-[33px] sm:h-[28px] sm:w-[28px] w-[18px] h-[18px] inline mr-1.5 relative bottom-[1.5px]"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      Mentorship{" "}
                                      <span className="bg-clip-text  text-transparent bg-gradient-to-r from-green-600 to-green-500">
                                        Completed
                                      </span>
                                    </h1>

                                    <h1 className="sm:text-3xl text-center mx-auto block text-2xl lg:text-4xl font-extrabold leading-tighter tracking-tighter md:-mt-4 sm:-mt-0 xl:mb-3 sm:mb-2 -mb-3 -mt-4 ">
                                      How do you want to{" "}
                                      <span className="bg-clip-text  text-transparent bg-gradient-to-r from-blue-500 to-indigo-400">
                                        move forward?
                                      </span>
                                    </h1>
                                  </div>

                                  <div class="sm:h-[263px] h-fit  lg:w-full sm:w-[80%] md:w-[70%] w-[90%] mx-auto mt-[50px] lg:mb-[50px] sm:mb-[540px] mb-[50px] right-1.5 relative grid lg:grid-cols-3 grid-cols-1 xl:gap-8 gap-5">
                                    <div
                                      onClick={() => {
                                        endMentorship();
                                      }}
                                      class="tracking-wide  transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-[1.02] duration-200 cursor-pointer hover:bg-gray-200 hover:border-indigo-500 relative  bg-gray-100 text-center rounded-md shadow-md border-2 border-gray-600"
                                    >
                                      <i class="fas fa-sign-out-alt text-6xl mt-9 mb-2 mx-auto block"></i>

                                      <hr class="border-[1px] border-dashed border-gray-600 mx-auto my-2 mt-7 block w-[70%]" />

                                      <h2 class="text-xl mt-4 block font-bold">
                                        End Mentorship
                                      </h2>
                                      <h2 class="text-base lg:pb-0 pb-7 mt-3 block text-gray-600 font-semibold px-4">
                                        You do not wish to continue with this
                                        mentor.
                                      </h2>
                                    </div>

                                    <div
                                      onClick={() => {
                                        repeatMentorship();
                                      }}
                                      class="tracking-wide transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-[1.02] duration-200 cursor-pointer hover:bg-gray-200 hover:border-indigo-500 relative  bg-gray-100 text-center rounded-md shadow-md border-2 border-gray-600"
                                    >
                                      <div class="ml-4 absolute -right-2 -top-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          width="16"
                                          height="16"
                                          class="mr-1"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        Recommended
                                      </div>

                                      <i class="fas fa-redo text-6xl mt-9 mb-2 mx-auto block"></i>

                                      <hr class="border-[1px] border-dashed border-gray-600 mx-auto my-2 mt-7 block w-[70%]" />

                                      <h2 class="text-xl mt-4 block font-bold">
                                        1 more meeting
                                      </h2>
                                      <h2 class="text-base mt-3 lg:pb-0 pb-7  block text-gray-600 font-semibold px-4">
                                        You wish to sit on one more call with
                                        this mentor.
                                      </h2>
                                    </div>

                                    <div class="tracking-wide transition opacity-70 relative  bg-gray-100 text-center rounded-md shadow-md border-2 border-gray-600">
                                      <div class="ml-4 absolute -right-2 -top-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-red-700 rounded-full">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          width="16"
                                          height="16"
                                          class="mr-1"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        Coming Soon.
                                      </div>
                                      <i class="fas fa-calendar-check  text-6xl mt-9 mb-2 mx-auto block"></i>

                                      <hr class="border-[1px] border-dashed border-gray-600 mx-auto my-2 mt-7 block w-[70%]" />

                                      <h2 class="text-xl mt-4 block font-bold">
                                        4 week workshop
                                      </h2>
                                      <h2 class="text-base mt-3 lg:pb-0 pb-7 block text-gray-600 font-semibold px-4">
                                        You wish to retain this mentor for a
                                        month-long period.
                                      </h2>
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          </Route>

                          <Route path={"/dashboard/yourmentor"}>
                            <Redirect
                              to={"/dashboard/yourmentor/mentorshipCompleted"}
                            />
                          </Route>

                          <Route path={"/dashboard/yourmentor/"}>
                            <Redirect
                              to={"/dashboard/yourmentor/mentorshipCompleted"}
                            />
                          </Route>
                        </>
                      ) : (
                        <>
                          <Route
                            path={
                              location.pathname.includes("mentorship")
                                ? "/mentorship/yourmentor/mentorinfo"
                                : "/dashboard/yourmentor/mentorinfo"
                            }
                          >
                            <MentorInfo mentor={mentorCon.mentors[index]} />
                          </Route>

                          <Route
                            path={
                              location.pathname.includes("mentorship")
                                ? "/mentorship/yourmentor/meetings"
                                : "/dashboard/yourmentor/meetings"
                            }
                          >
                            <Meetings mentor={mentorCon.mentors[index]} />
                          </Route>

                          <Route
                            path={
                              location.pathname.includes("mentorship")
                                ? "/mentorship/yourmentor/tasksandresources"
                                : "/dashboard/yourmentor/tasksandresources"
                            }
                          >
                            <TasksAndResources
                              mentor={mentorCon.mentors[index]}
                            />
                          </Route>

                          <Route
                            path={
                              location.pathname.includes("mentorship")
                                ? "/mentorship/yourmentor/"
                                : "/dashboard/yourmentor/"
                            }
                          >
                            <Redirect
                              to={
                                location.pathname.includes("mentorship")
                                  ? "/mentorship/yourmentor/mentorinfo"
                                  : "/dashboard/yourmentor/mentorinfo"
                              }
                            />
                          </Route>

                          <Route
                            path={
                              location.pathname.includes("mentorship")
                                ? "/mentorship/yourmentor"
                                : "/dashboard/yourmentor"
                            }
                          >
                            <Redirect
                              to={
                                location.pathname.includes("mentorship")
                                  ? "/mentorship/yourmentor/mentorinfo"
                                  : "/dashboard/yourmentor/mentorinfo"
                              }
                            />
                          </Route>

                          {/* {sessionStorage.getItem("index") ? (
                            <Route
                              path={
                                location.pathname.includes("mentorship")
                                  ? "/mentorship/"
                                  : "/dashboard/"
                              }
                            >
                              <Redirect
                                to={
                                  location.pathname.includes("mentorship")
                                    ? "/mentorship/yourmentor/"
                                    : "/dashboard/yourmentor/"
                                }
                              />
                            </Route>
                          ) : (
                            ""
                          )} */}
                        </>
                      )
                    ) : (
                      ""
                    )}
                  </Switch>

                  {/* <div
                    className={`w-full ${
                      sessionsConfirmed ? "xl:w-full" : "xl:w-4/12"
                    } mb-3 mt-1 xl:mb-0 px-3`}
                  >
                    <p class="text-sm sm:text-gray-600 text-gray-800 -mt-3  sm:font-semibold bg-yellow-50 w-[90%] text-center mb-7 p-2  px-3 border-yellow-600 border-dashed border-[1px] rounded-md font-normal shadow-md leading-5 mx-auto relative block ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-[18px] h-[18px] font-bold text-red-700 inline mr-[2px]  relative bottom-[0.8px]"
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
                      mentor={mentorsMatched ? mentorsMatched[index] : null}
                    />
                  </div> */}

                  {/* {sessionsConfirmed ? (
                    <div class="xl:w-8/12 w-full mb-3 xl:mb-0 px-3">
                      <MentorshipSchedule
                        mentor={mentorsMatched ? mentorsMatched[index] : null}
                      />
                    </div>
                  ) : (
                    ""
                  )} */}

                  {/* <div
                    className={`w-full xl:w-${
                      sessionsConfirmed === true ? "1/2 hidden" : "4/12"
                    } mb-3 xl:mb-0 px-3`}
                  >
                    {mentorsMatched && mentorsMatched.length > 0 ? (
                      <MakePayment
                        mentor={mentorsMatched ? mentorsMatched[index] : null}
                      />
                    ) : (
                      <FindMentor />
                    )}
                  </div> */}

                  {/* <div
                    className={`w-full xl:w-${
                      sessionsConfirmed === true ? "4/12" : "4/12"
                    } mb-3 xl:mb-0 sm:px-3 px-1`}
                  >
                    <AllMentorshipSessions
                      mentor={mentorsMatched ? mentorsMatched[index] : null}
                    />
                  </div> */}

                  {/* <div
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
                  </div> */}
                </>
              )
            ) : (
              <>
                <p class="md:text-4xl sm:text-3xl text-2xl font-semibold md:col-span-3 sm:col-span-2 col-span-1 text-center mt-[60px] sm:mb-[125px] mb-[105px]  right-1 mx-auto relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 66 66"
                    class="mx-auto block  relative  w-24 mb-4 -mt-[30px] h-auto text-center"
                    viewBox="0 0 66 66"
                  >
                    <polygon
                      fill="#465C6A"
                      points="62 20.5 62 34.9 43.8 35.1 43.8 19.5 51.3 16.4"
                    />
                    <polygon
                      fill="#3B4C56"
                      points="53.3 17.1 53.3 35 62 34.9 62 20.5"
                    />
                    <rect
                      width="5.5"
                      height="4.5"
                      x="50.1"
                      y="26.1"
                      fill="#D5B79F"
                    />
                    <rect
                      width="2.9"
                      height="4.5"
                      x="50.1"
                      y="26.1"
                      fill="#C6A28A"
                    />
                    <ellipse
                      cx="53.1"
                      cy="19.3"
                      fill="#D5B79F"
                      rx="6.9"
                      ry="8.5"
                    />
                    <path
                      fill="#C6A28A"
                      d="M53.1,10.8L53.1,10.8l0,17l0,0c3.8,0,6.9-3.8,6.9-8.5S56.9,10.8,53.1,10.8z"
                    />
                    <path
                      fill="#465C6A"
                      d="M56,12.8c0,0-5.5,1.2-6.7,3.5c-1.1,2.3-0.2,4.8-1.7,5.9c0,0,0.7,2.5,1.6,4.2c0,0-1,0.9,0.3,2.1
				c0,0-1.5,0.2-2.2-0.4c0,0,1.3,2.6,2.8,2.9c0,0-2.8,0.3-4.3-3s-2.8-9.8-1.5-12.5c1.3-2.7,4.9-10.8,11.2-7.3c0,0,1.6-0.8,3.1,1.4
				s3,6,3.3,8.5s0.2,5.9-2,8.6c-2.2,2.7-5.3,4-5.3,4s2.7-2.4,3.5-3.8l-0.8-0.6c0,0,1.3-1.8,1.5-4.9C59,18.4,59.3,13.8,56,12.8z"
                    />
                    <path
                      fill="#3B4C56"
                      d="M61.9,18.1c-0.3-2.5-1.8-6.4-3.3-8.5c-1.5-2.2-3.1-1.4-3.1-1.4c-0.9-0.5-1.7-0.7-2.4-0.8v6.4
				c1.5-0.5,2.9-0.9,2.9-0.9c3.3,1,3,5.5,2.8,8.6c-0.2,3.1-1.5,4.9-1.5,4.9l0.8,0.6c-0.8,1.3-3.5,3.8-3.5,3.8s3.1-1.4,5.3-4
				C62.1,24,62.2,20.5,61.9,18.1z"
                    />
                    <path
                      fill="#C6A28A"
                      d="M65,37.7c0.1-2.4-1.6-3.9-3.5-5.3c-1.9-1.4-5.9-2.7-5.9-2.7l-2.6,0.9l-2.6-0.9c0,0-3.9,1.3-5.9,2.7
				c-1.9,1.4-3.5,2.9-3.5,5.3c0.1,2.4,0,7.8,0,7.8h11.9H65C65,45.5,64.9,40.1,65,37.7z"
                    />
                    <path
                      fill="#FAD22C"
                      d="M65,45.5H41.1c0,0,0.1-5.4,0-7.8c-0.1-2.4,1.6-3.9,3.5-5.3c0.7-0.5,1.7-1,2.7-1.4c1.3,1.8,3.4,3,5.8,3
				c2.4,0,4.5-1.2,5.8-3c1,0.4,1.9,0.9,2.7,1.4c1.9,1.4,3.5,2.9,3.5,5.3C64.9,40.1,65,45.5,65,45.5z"
                    />
                    <path
                      fill="#E0B624"
                      d="M65,37.7c0.1-2.4-1.6-3.9-3.5-5.3c-0.7-0.5-1.7-1-2.7-1.4c-1.3,1.8-3.4,3-5.8,3l0,0v11.5H65
				C65,45.5,64.9,40.1,65,37.7z"
                    />
                    <ellipse
                      cx="21.1"
                      cy="19"
                      fill="#C6A28A"
                      rx="1.9"
                      ry="1.1"
                      transform="rotate(-75.707 21.055 18.982)"
                    />
                    <ellipse
                      cx="6.1"
                      cy="19"
                      fill="#D5B79F"
                      rx="1.9"
                      ry="1.1"
                      transform="rotate(-104.293 6.09 18.983)"
                    />
                    <rect
                      width="5.8"
                      height="4.8"
                      x="10.5"
                      y="25"
                      fill="#D5B79F"
                    />
                    <rect
                      width="2.9"
                      height="4.8"
                      x="10.5"
                      y="25"
                      fill="#C6A28A"
                    />
                    <ellipse
                      cx="13.6"
                      cy="17.8"
                      fill="#D5B79F"
                      rx="7.3"
                      ry="9"
                    />
                    <path
                      fill="#C6A28A"
                      d="M13.6,8.8L13.6,8.8l0,17.9l0,0c4,0,7.3-4,7.3-9S17.6,8.8,13.6,8.8z"
                    />
                    <path
                      fill="#45BBDD"
                      d="M26.2,37.3c0.1-2.5-1.7-4.2-3.7-5.6c-2-1.4-6.2-2.9-6.2-2.9l-2.7,1l-0.2-0.2l-2.6-0.7c0,0-4.2,1.4-6.2,2.9
			c-2,1.4-3.7,3.1-3.7,5.6c0.1,2.5,0,8.2,0,8.2h12.6h12.6C26.2,45.5,26.2,39.8,26.2,37.3z"
                    />
                    <path
                      fill="#15A9CB"
                      d="M26.2,37.3c0.1-2.5-1.7-4.2-3.7-5.6c-2-1.4-6.2-2.9-6.2-2.9l-2.9,0.7l0,15.9h12.8
			C26.2,45.5,26.2,39.8,26.2,37.3z"
                    />
                    <polygon
                      fill="#E6E6E8"
                      points="14.4 29.6 12.5 29.6 11.6 31 12.5 32.5 14.4 32.5 15.3 31"
                    />
                    <polygon
                      fill="#D4D8DB"
                      points="15.3 31 14.4 29.6 13.4 29.6 13.4 32.5 14.4 32.5"
                    />
                    <polygon
                      fill="#45BBDD"
                      points="16.4 27.4 13.4 29.6 16.2 31.8 17 29.1"
                    />
                    <polygon
                      fill="#15A9CB"
                      points="10.5 27.4 13.4 29.6 10.7 31.8 9.9 29.2"
                    />
                    <polygon
                      fill="#E6E6E8"
                      points="15.2 45.5 13.4 45.5 13.4 32.5 14.4 32.5"
                    />
                    <polygon
                      fill="#D4D8DB"
                      points="13.4 45.5 11.7 45.5 12.5 32.5 13.4 32.5"
                    />
                    <path
                      fill="#465C6A"
                      d="M21.2,12.2c-0.4-3.9-1.8-4.8-4.7-5.3c-2.8-0.5-7-0.7-9.4,1.8c-2.2,2.2-0.9,9.6-0.7,11
			c0,0.1,0.1,0.2,0.3,0.2l0.1,0c0.1,0,0.2-0.1,0.2-0.2c0.1-0.7,0.5-3.3,0.6-4.4c0.1-1.2-0.1-2.2,0.9-2.3c1-0.1,3.9,2.6,9.1,0
			c0,0,1.2-0.2,1.2,1.1c0,1.3,1.4,3.4,1,5.9c0,0.2,0.1,0.3,0.3,0.3c0.1,0,0.2-0.1,0.2-0.2C20.7,19.3,21.6,15.6,21.2,12.2z"
                    />
                    <path
                      fill="#3B4C56"
                      d="M21.2,12.2c-0.4-3.9-1.8-4.8-4.7-5.3c-0.9-0.2-1.9-0.3-2.9-0.3v7.5c1.2,0,2.6-0.3,4.2-1.1
			c0,0,1.2-0.2,1.2,1.1c0,1.3,1.4,3.4,1,5.9c0,0.2,0.1,0.3,0.3,0.3c0.1,0,0.2-0.1,0.2-0.2C20.7,19.3,21.6,15.6,21.2,12.2z"
                    />
                    <g>
                      <ellipse
                        cx="41.7"
                        cy="26.2"
                        fill="#C6A28A"
                        rx="2.4"
                        ry="1.3"
                        transform="rotate(-75.707 41.686 26.203)"
                      />
                      <ellipse
                        cx="23"
                        cy="26.2"
                        fill="#D5B79F"
                        rx="2.4"
                        ry="1.3"
                        transform="rotate(-104.293 22.976 26.203)"
                      />
                      <rect
                        width="7.3"
                        height="6"
                        x="28.5"
                        y="33.8"
                        fill="#D5B79F"
                      />
                      <rect
                        width="3.6"
                        height="6"
                        x="28.5"
                        y="33.8"
                        fill="#C6A28A"
                      />
                      <ellipse
                        cx="32.4"
                        cy="24.7"
                        fill="#D5B79F"
                        rx="9.1"
                        ry="11.2"
                      />
                      <path
                        fill="#C6A28A"
                        d="M32.4,13.5L32.4,13.5l0,22.4l0,0c5,0,9.1-5,9.1-11.2S37.4,13.5,32.4,13.5z"
                      />
                      <path
                        fill="#D4D8DB"
                        d="M48.2,49.1c0.1-3.1-2.1-5.2-4.6-7c-2.5-1.8-7.7-3.6-7.7-3.6l-3.4,1.2l-0.2-0.3L29,38.6
				c0,0-5.2,1.8-7.7,3.6c-2.5,1.8-4.7,3.9-4.6,7c0.1,3.1,0,10.3,0,10.3h15.8h15.8C48.2,59.4,48.1,52.2,48.2,49.1z"
                      />
                      <path
                        fill="#E6E6E8"
                        d="M48.2,49.1c0.1-3.1-2.1-5.2-4.6-7c-2.5-1.8-7.7-3.6-7.7-3.6l-3.6,0.9l0,19.9h16
				C48.2,59.4,48.1,52.2,48.2,49.1z"
                      />
                      <path
                        fill="#D4D8DB"
                        d="M48.2,59.4h-16c0,0,0,0,0,0c3.9-10.2,4.2-18.5,4.2-20.6c0.4,0.2,1.1,0.4,1.9,0.7c1.7,0.7,3.9,1.7,5.2,2.6
				c2.5,1.8,4.7,3.9,4.6,7C48.1,52.2,48.2,59.4,48.2,59.4z"
                      />
                      <path
                        fill="#E6E6E8"
                        d="M32.1,59.4L32.1,59.4L32.1,59.4L32.1,59.4C32.1,59.3,32.1,59.3,32.1,59.4z"
                      />
                      <polygon
                        fill="#E8664A"
                        points="33.3 39.5 31 39.5 29.9 41.3 31 43.1 33.3 43.1 34.5 41.3"
                      />
                      <polygon
                        fill="#D95239"
                        points="34.5 41.3 33.3 39.5 32.2 39.5 32.2 43.1 33.3 43.1"
                      />
                      <polygon
                        fill="#B5BABE"
                        points="35.8 36.8 32.2 39.4 35.6 42.2 36.6 38.9"
                      />
                      <polygon
                        fill="#E6E6E8"
                        points="28.5 36.8 32.2 39.4 28.7 42.2 27.7 39"
                      />
                      <polygon
                        fill="#E8664A"
                        points="34.3 59.4 32.2 59.4 32.2 43.1 33.3 43.1"
                      />
                      <polygon
                        fill="#D95239"
                        points="32.2 59.4 30 59.4 31 43.1 32.2 43.1"
                      />
                      <path
                        fill="#3B4C56"
                        d="M32.1,59.4L32.1,59.4l-15.5,0c0,0,0.1-7.1,0-10.3c-0.1-3.1,2.1-5.2,4.6-7c1.3-0.9,3.3-1.8,4.9-2.5
				c0.7-0.3,1.4-0.5,1.9-0.7C28,41.2,28.3,49.4,32.1,59.4C32.1,59.3,32.1,59.3,32.1,59.4z"
                      />
                      <path
                        fill="#465C6A"
                        d="M48.2,59.4h-16c0,0,0,0,0,0c3.9-10.2,4.2-18.5,4.2-20.6c0.4,0.2,1.1,0.4,1.9,0.7c1.7,0.7,3.9,1.7,5.2,2.6
				c2.5,1.8,4.7,3.9,4.6,7C48.1,52.2,48.2,59.4,48.2,59.4z"
                      />
                      <path
                        fill="#3B4C56"
                        d="M38.1,46.7l0.7,2.3c-2.1,6.6-6.3,10.2-6.6,10.4c3.9-10.2,4.2-18.5,4.2-20.6c0-0.3,0-0.5,0-0.5l1.9,1.2v0
					l1,5.6L38.1,46.7z"
                      />
                      <path
                        fill="#465C6A"
                        d="M32.1 59.4C32.1 59.4 32.1 59.4 32.1 59.4c-.4-.4-4.1-4-6.1-10.4l.7-2.3-1.3-1.6.7-5.4 1.9-1.4c0 0 0 .2 0 .7C28 41.2 28.3 49.4 32.1 59.4 32.1 59.3 32.1 59.3 32.1 59.4zM40.8 17.4c0 0 1.6-2.1-3-4.5-4.7-2.3-10.5-.6-13 1.8-2.5 2.4-2.3 8.9-1.8 10.5.3 1.2.7 2.4.9 3 .1.2.2.3.4.3.3 0 .5-.2.4-.5-.1-1.2-.3-4.6-.1-6.1.3-1.8 2.8-4 5-3.8s5.7.6 7.7-.3c0 0 1.2 1.7 1.8 4 .5 1.8.3 5.1.2 6.3 0 .3.2.5.4.5H40c.2 0 .3-.1.4-.3C41 26.7 43.5 19.2 40.8 17.4z"
                      />
                      <path
                        fill="#3B4C56"
                        d="M40.8,17.4c0,0,1.6-2.1-3-4.5c-1.8-0.9-3.7-1.2-5.5-1.1v6.4c1.8,0.1,3.8,0.1,5.1-0.5c0,0,1.2,1.7,1.8,4
			c0.5,1.8,0.3,5.1,0.2,6.3c0,0.3,0.2,0.5,0.4,0.5H40c0.2,0,0.3-0.1,0.4-0.3C41,26.7,43.5,19.2,40.8,17.4z"
                      />
                    </g>
                  </svg>{" "}
                  <span class="-top-2 left-1.5 uppercase text-base font-bold tracking-wide   relative">
                    No Mentor Matched Yet..
                  </span>
                </p>
              </>
            )}
          </>
        )}
        {!sessionStorage.getItem("index") &&
        (loading || (mentorsRequested && mentorsRequested.length > 0)) ? (
          <div class="w-full sm:px-7 px-3">
            <hr class="border-t-[2px]  border-dashed border-indigo-600 -mt-2 mb-8 block w-[60%] mx-auto" />
            <h2 class="font-bold mx-auto text-center tracking-wide  sm:text-[32px] relative top-1 text-[28px]">
              Requested Mentors:{" "}
            </h2>
            <p class=" text-xl bg-gradient-to-r px-5 mt-3 mb-4 font-semibold text-center bg-clip-text mx-auto text-transparent from-blue-500 to-indigo-600 w-fit">
              Under Review
            </p>
            <div class="grid lg:grid-cols-2 grid-cols-1 -top-[2px]  lg:mb-12 md:mb-12 mb-12 lg:px-5 md:px-28 sm:px-14 px-0 lg:mt-12 mt-6 gap-5">
              {loading ? (
                <div className="w-full lg:col-span-2 col-span-1 mb-5 xl:-mb-9 px-3">
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
                mentorsRequested.map((mentor) => {
                  return (
                    <div class="flex col-span-1 min-w-sm rounded-md bg-white shadow-md ">
                      <div class="w-full">
                        <div class="p-6 sm:text-left text-center">
                          <span
                            class={` mx-auto w-full mt-1 mb-0.5 sm:text-left text-center`}
                          >
                            {" "}
                            <img
                              src={mentor.pic}
                              class="sm:w-8 sm:h-8 w-7 h-7 shadow-md object-cover mb-1 inline rounded-full"
                            ></img>{" "}
                            <span class="ml-2 sm:text-xl text-lg bg-clip-text mx-auto text-transparent from-gray-700 to-gray-500 bg-gradient-to-br inline font-bold">
                              {mentor.name}
                            </span>{" "}
                          </span>

                          <p class="mb-2 mt-4 sm:text-left text-center font-medium text-sm text-gray-700 ">
                            <strong>Expertise:</strong> {mentor.expertise}
                          </p>

                          <p class=" pb-[3px] text-sm sm:text-left lg:right-0 relative  text-center font-medium text-gray-700">
                            <strong>Organizations:</strong> <br />
                            {mentor &&
                              mentor.orgs &&
                              mentor.orgs.map((org, i) => {
                                return (
                                  <span
                                    class={` ${
                                      i == 2
                                        ? "-mt-[14px] inline pt-[16px]"
                                        : "inline mt-1"
                                    } relative right-1 top-3.5 pb-2.5`}
                                  >
                                    {" "}
                                    {i % 3 === 0 && i !== 0 ? (
                                      <>
                                        {" "}
                                        <br class="sm:inline hidden" />{" "}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {i % 2 === 0 && i !== 0 ? (
                                      <>
                                        {" "}
                                        <br class="sm:hidden inline" />{" "}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {i != 0 && i != 3 ? " || " : ""}{" "}
                                    <img
                                      src={org.pic}
                                      class="w-6 h-6 shadow-md ml-2 mb-1 inline rounded-full"
                                    ></img>{" "}
                                    <span class="ml-1 mr-1 lg:inline hidden">
                                      {org.name}
                                    </span>{" "}
                                    <span class="ml-1 mr-1 lg:hidden inline">
                                      {org.name.split(" ")[0]}
                                    </span>{" "}
                                  </span>
                                );
                              })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Dashboard;
