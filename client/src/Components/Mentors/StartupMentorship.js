import React from "react";

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";

import UpcomingMentor from "./UpcomingMentor.js";
import AllMentorshipSessions from "./AllMentorshipSessions.js";
import FindMentor from "./FindMentor.js";
import MakePayment from "./MakePayment.js";
import MentorshipSchedule from "./MentorshipSchedule.js";

import StartupInfo from "./MentorDashboardComponents/StartupInfo.js";
import Meetings from "./MentorDashboardComponents/Meetings.js";
import TasksAndResources from "./MentorDashboardComponents/TasksAndResources";

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
import mentorAccContext from "../../context/mentorAccContext.js";

import RequestInfo from "../Modals/RequestInfo.js";

const StartupMentorship = () => {
  const mentorCon = useContext(mentorAccContext);
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

  const projCon = useContext(projectContext);

  const [currentMentees, setCurrentMentees] = useState();
  const [mentorshipRequests, setMentorshipRequests] = useState();

  const [loading, setLoading] = useState(true);

  const acceptRequest = (index) => {
    let acceptedRequests = mentorCon.mentor.acceptedRequests;
    acceptedRequests.push(mentorshipRequests.map((req) => req._id)[index]);
    let mentor = { ...mentorCon.mentor, acceptedRequests };
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateMentor" // was updateUser
          : "http://localhost:4000/api/user/updateMentor",
        { mentor, token: sessionStorage.getItem("mentorToken") }
      )
      .then((res) => {
        mentorCon.setMentor(res.data);
        effectFunc();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [showProjInfo, setShowProjInfo] = useState(false);
  const [infoShowed, setInfoShowed] = useState({});

  const showRequest = (index) => {
    setInfoShowed(mentorshipRequests[index]);
    setShowProjInfo(true);
  };

  let effectFunc = async () => {
    let currentMenteesInput = mentorCon.mentor.currentMentees
      ? mentorCon.mentor.currentMentees
      : [];
    let mentorshipRequestsInput = mentorCon.mentor.mentorshipRequests
      ? mentorCon.mentor.mentorshipRequests.filter(
          (request) => !mentorCon.mentor.currentMentees.includes(request)
        )
      : [];

    let currentMenteesCopy = [];
    let mentorshipRequestsCopy = [];

    for (let i = 0; i < currentMenteesInput.length; i++) {
      await axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/getProject"
            : "http://localhost:4000/api/user/getProject",
          {
            token: sessionStorage.getItem("mentorToken"),
            projId: currentMenteesInput[i],
          }
        )
        .then((res) => {
          let obj = res.data;
          for (let x = 0; x < obj.mentorsMatched.length; x++) {
            if (
              JSON.stringify(mentorCon.mentor._id) ==
              JSON.stringify(obj.mentorsMatched[x].mentorId)
            ) {
              obj = {
                ...obj,
                currentMentorship: obj.mentorsMatched[x],
              };
              break;
            }
          }
          currentMenteesCopy.push(obj);
          for (let k = 0; k < res.data.team.length; k++) {
            axios
              .post(
                process.env.NODE_ENV === "production"
                  ? "https://ideastack.herokuapp.com/api/user/getUserForMentor"
                  : "http://localhost:4000/api/user/getUserForMentor",
                {
                  token: sessionStorage.getItem("mentorToken"),
                  teamMember: JSON.stringify(res.data.team[k]),
                }
              )
              .then((res) => {
                currentMenteesCopy[i].team[k] = res.data;
              });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    for (let j = 0; j < mentorshipRequestsInput.length; j++) {
      await axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/getProject"
            : "http://localhost:4000/api/user/getProject",
          {
            token: sessionStorage.getItem("mentorToken"),
            projId: mentorshipRequestsInput[j],
          }
        )
        .then((res) => {
          let obj = res.data;
          for (let x = 0; x < obj.mentorsMatched.length; x++) {
            if (
              JSON.stringify(mentorCon.mentor._id) ==
              JSON.stringify(obj.mentorsMatched[x].mentorId)
            ) {
              obj = {
                ...obj,
                currentMentorship: obj.mentorsMatched[x],
              };
              break;
            }
          }
          mentorshipRequestsCopy.push(obj);
          for (let k = 0; k < res.data.team.length; k++) {
            axios
              .post(
                process.env.NODE_ENV === "production"
                  ? "https://ideastack.herokuapp.com/api/user/getUserForMentor"
                  : "http://localhost:4000/api/user/getUserForMentor",
                {
                  token: sessionStorage.getItem("mentorToken"),
                  teamMember: res.data.team[k],
                }
              )
              .then((res) => {
                mentorshipRequestsCopy[j].team[k] = res.data;
              });
          }
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    }

    setCurrentMentees(currentMenteesCopy);
    setMentorshipRequests(mentorshipRequestsCopy);
  };

  useEffect(() => {
    setLoading(true);
    effectFunc();
    setLoading(false);
  }, [location.pathname, projCon.project]); // removed mentorCon.mentor from here

  useEffect(() => {
    if ((sessionStorage.getItem("index") || index) && currentMentees) {
      projCon.setProject(currentMentees[sessionStorage.getItem("index")]);
    }
  }, [index, location.pathname]);

  return (
    <>
      {cancel ? <CancelModal close={() => setCancel(false)} /> : ""}
      {showProjInfo ? (
        <RequestInfo
          startup={infoShowed}
          close={() => setShowProjInfo(false)}
        />
      ) : (
        ""
      )}
      <h2 class="text-center bg-no-repeat bg-center bg-cover py-7 pt-20 pb-[35px] font-bold  xl:px-[365px] lg:px-[250px] md:px-[150px] sm:px-[100px] sm:w-fit sm:left-0 left-[0.1px] w-full mx-auto rounded-md right-0.5 text-gray-900 -top-2 -mb-[55px] relative">
        <p class="sm:text-5xl text-4xl tracking-wide">Startup Mentorship</p>
        {!currentMentees ||
        currentMentees.length === 0 ||
        (sessionStorage.getItem("index") == null && !index) ? (
          <p class=" text-xl bg-gradient-to-r mt-2.5 mb-1 font-semibold text-center bg-clip-text mx-auto text-transparent from-blue-500 to-indigo-600 w-fit">
            Mentor the Next Generation of Founders
          </p>
        ) : (
          <p class=" text-2xl bg-gradient-to-r mt-6 mb-1 relative top-4 font-semibold text-center bg-clip-text mx-auto text-transparent from-blue-500 to-indigo-600 w-fit">
            {currentMentees[index].name + " X " + mentorCon.mentor.name}
          </p>
        )}
      </h2>

      <div
        className={`flex ${
          currentMentees && currentMentees.length > 0
            ? "mt-[80px] relative"
            : "mt-[80px]"
        } flex-wrap xl:px-16 lg:px-14 md:px-9 sm:px-6 px-3  -mr-[20px] relative  xl:-mb-[277px] md:-mb-[250px] -mb-[240px]`}
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
            {currentMentees && currentMentees.length > 0 ? (
              sessionStorage.getItem("index") == null && !index ? (
                <>
                  <p
                    data-aos={"fade-up"}
                    data-aos-once="true"
                    class="font-bold text-[27px] -mt-3.5 mb-1 xl:left-6 text-gray-800"
                  >
                    Startup <span class="text-blue-700">You've Been </span>{" "}
                    Matched With: ({currentMentees.length})
                  </p>
                  <br />
                  <div class=" w-full gap-5 mt-9 mb-14">
                    {currentMentees &&
                      currentMentees.map((startup, i) => {
                        return (
                          <div key={i} class="w-[600px] mx-auto  z-[75] ">
                            <div
                              data-aos={"zoom-in"}
                              data-aos-once="true"
                              class={`w-full  px-8 py-4 pb-5 mt-1 z-40 pointer-events-auto mr-32 relative right-2
                             bg-white rounded-lg shadow-md `}
                            >
                              <div class="flex items-center justify-between ">
                                <span class="text-sm block -mt-6 uppercase -mb-2 font-light text-gray-600 ">
                                  {startup.currentMentorship &&
                                    startup.currentMentorship.duration +
                                      " week mentorship"}
                                </span>

                                <button
                                  type="button"
                                  class="text-white text-sm uppercase bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg px-2.5 py-1.5 -mr-2 mt-1 text-center mb-2"
                                  onClick={() => {
                                    setIndex(i);
                                    projCon.setProject(currentMentees[i]);
                                    sessionStorage.setItem("index", i);
                                    history.push(
                                      "/startupmentorship/yourstartup"
                                    );
                                  }}
                                >
                                  View More
                                </button>
                              </div>

                              <img
                                src={
                                  startup.projPic
                                    ? startup.projPic
                                    : "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8&w=1000&q=80"
                                }
                                alt="expert"
                                class={` 
                               mx-auto 
                        rounded-full border-blue-700 border-dashed border mb-3 mt-1  w-[160px] h-[160px] shadow-md  object-center object-cover`}
                              />

                              <div class="mt-1 block relative -top-0.5">
                                <a
                                  href="#"
                                  class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline"
                                >
                                  {startup.name}
                                </a>
                                <p class="mt-4  pb-2.5 pt-1  md:text-md text-sm text-gray-600 ">
                                  {startup.problem}
                                </p>
                              </div>

                              <div class="flex items-center justify-between mt-2 z-[100]">
                                <div class="flex items-center relative ">
                                  {startup.team &&
                                    startup.team.map((member, i) => {
                                      return (
                                        <span>
                                          <img
                                            class="object-cover sm:inline hidden w-6 h-6 mr-2 shadow-sm rounded-full "
                                            src={
                                              member.profilePic
                                                ? member.profilePic
                                                : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                                            }
                                            alt="avatar"
                                          />
                                          <p class="font-semibold text-sm inline mr-6 text-gray-700 cursor-pointer ">
                                            {member.name &&
                                              member.name.split(" ")[0]}
                                          </p>

                                          {i == 4 ? (
                                            <>
                                              <br /> <div class="mb-2"></div>{" "}
                                            </>
                                          ) : i == startup.team.length - 2 ? (
                                            ""
                                          ) : i == startup.team.length - 1 ? (
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
                  <div class="mx-auto justify-center block sm:left-40 -top-32 absolute text-center">
                    <button
                      onClick={() => {
                        setIndex(null);
                        sessionStorage.removeItem("index");
                        history.push("/startupmentorship");
                        projCon.setProject({});
                      }}
                      class="w-32 p-2 rounded-md font-semibold tracking-wide shadow-md mt-3  bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700  text-base hover:shadow-xl active:shadow-md text-white  uppercase "
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

                  <div class="block mx-auto text-center px-3 -mt-5 right-3 relative mb-16 rounded-lg">
                    <a
                      onClick={() => {
                        history.push(
                          "/startupmentorship/yourstartup/startupinfo"
                        );
                      }}
                      class={` ${
                        location.pathname.includes("startupinfo")
                          ? "bg-blue-700 text-gray-100 border-blue-700 border shadow-md"
                          : "bg-white shadow-md  text-gray-800"
                      } hover:cursor-pointer relative top-2 sm:normal-case uppercase hover:bg-blue-700 hover:border-r-indigo-50  hover:shadow-sm hover:border-blue-700 inline-flex items-center justify-center sm:rounded-l-lg sm:rounded-r-none rounded-t-lg border py-[10px] px-[30px] text-center text-base font-semibold  transition-all hover:text-gray-100 sm:py-4 sm:px-[60px]`}
                    >
                      <span class="pr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
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
                    <br class="sm:hidden block" />
                    <a
                      onClick={() => {
                        history.push("/startupmentorship/yourstartup/meetings");
                      }}
                      class={`${
                        location.pathname.includes("meetings")
                          ? "bg-blue-700 border-blue-700 text-gray-100 border shadow-md"
                          : "bg-white shadow-md text-gray-800"
                      } hover:cursor-pointer relative top-2 sm:normal-case uppercase hover:bg-blue-700 hover:shadow-sm hover:border-l-indigo-50 hover:border-blue-700 active:border-blue-700 inline-flex items-center justify-center  sm:rounded-l-none   border py-[10px] px-[25px] text-center text-base font-semibold  transition-all hover:text-gray-100 sm:py-4 sm:px-[60px]`}
                    >
                      <span class="pr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </span>
                      1:1 Meetings
                    </a>
                    <a
                      onClick={() => {
                        history.push(
                          "/startupmentorship/yourstartup/tasksandresources"
                        );
                      }}
                      class={`${
                        location.pathname.includes("tasksandresources")
                          ? "bg-blue-700 border-blue-700 text-gray-100 border shadow-md"
                          : "bg-white shadow-md text-gray-800"
                      } hover:cursor-pointer relative top-2 sm:normal-case uppercase hover:bg-blue-700 hover:shadow-sm hover:border-l-indigo-50 hover:border-blue-700 active:border-blue-700 inline-flex items-center justify-center sm:rounded-r-lg sm:rounded-l-none  rounded-b-lg  border py-[10px] px-[25px] text-center text-base font-semibold  transition-all hover:text-gray-100 sm:py-4 sm:px-[60px]`}
                    >
                      <span class="pr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class=" w-5 h-5"
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

                  <Switch>
                    <Route path={"/startupmentorship/yourstartup/startupinfo"}>
                      <StartupInfo startup={currentMentees[index]} />
                    </Route>

                    <Route path={"/startupmentorship/yourstartup/meetings"}>
                      <Meetings startup={currentMentees[index]} />
                    </Route>

                    <Route
                      path={"/startupmentorship/yourstartup/tasksandresources"}
                    >
                      <TasksAndResources startup={currentMentees[index]} />
                    </Route>

                    <Route path={"/startupmentorship/yourstartup/"}>
                      <Redirect
                        to={"/startupmentorship/yourstartup/startupinfo"}
                      />
                    </Route>

                    <Route path={"/startupmentorship/yourstartup"}>
                      <Redirect
                        to={"/startupmentorship/yourstartup/startupinfo"}
                      />
                    </Route>

                    {sessionStorage.getItem("index") ? (
                      <Route path={"/startupmentorship/"}>
                        <Redirect to={"/startupmentorship/yourstartup/"} />
                      </Route>
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
                <p class="smd:text-4xl sm:text-3xl text-2xl font-semibold md:col-span-3 sm:col-span-2 col-span-1 text-center mt-[70px] sm:mb-[155px] mb-[125px]  right-1 mx-auto relative">
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
                    No Startup Matched Yet..
                  </span>
                </p>
              </>
            )}
          </>
        )}
        {mentorshipRequests && mentorshipRequests.length > 0 ? (
          <div class="w-full px-7">
            <hr class="border-t-[2px]  border-dashed border-indigo-600 -mt-2 mb-8 block w-[60%] mx-auto" />
            <h2 class="font-bold mx-auto text-center tracking-wide mb-6 text-3xl">
              Mentorship Requests:{" "}
            </h2>

            <div
              class={`bg-indigo-50 w-fit mx-auto text-base shadow-md border-l-4 block mt-6 border-indigo-500 text-blue-700 p-4 pb-3 pt-3
                            `}
              role="alert"
            >
              <p class="text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 relative bottom-[1.2px] mr-1.5 inline"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                Accepted mentorship requests will be considered in mentorship
                matching!
              </p>
            </div>
            <div class="grid grid-cols-2 px-8 mb-14 mt-12 gap-3">
              {mentorshipRequests &&
                mentorshipRequests.map((startup, i) => {
                  return (
                    <div class="flex col-span-1 max-w-sm rounded-md pb-1 bg-white shadow-md ">
                      <div class="">
                        <div class="p-6 pt-5 text-center">
                          <span
                            class={` mx-auto w-full block  mb-0.5 text-center`}
                          >
                            {" "}
                            <img
                              src={startup.projPic}
                              class="w-8 h-8 -mr-[2.5px] shadow-md border-[1px] border-blue-700 mb-[5px] inline rounded-full"
                            ></img>{" "}
                            <span class="ml-2 text-xl bg-clip-text mx-auto text-transparent from-gray-700 to-gray-500 bg-gradient-to-br inline font-bold">
                              {startup.name}
                            </span>{" "}
                            {mentorCon.mentor.acceptedRequests
                              .map((r) => JSON.stringify(r))
                              .includes(JSON.stringify(startup._id)) ? (
                              <button
                                disabled
                                class="text-white text-xs left-[30%] bottom-[2px] font-semibold relative uppercase bg-gradient-to-l from-green-600 to-green-500 shadow-lg   rounded-lg px-2.5 py-[5.5px] pt-[6.5px] pb-[5.3px]   pl-[8px]  text-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-4 h-4 relative bottom-[1.2px] mr-1 inline"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                ACCEPTED
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    showRequest(i);
                                  }}
                                  class="text-white text-xs left-[15%] bottom-[2px] mr-2.5 relative uppercase bg-gradient-to-l from-indigo-600 to-indigo-500 shadow-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-700 focus:ring-1 focus:ring-blue-300 font-semibold rounded-lg px-2.5 py-[5.5px] pt-[6px] pb-[5.3px]  pl-[8px]  text-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-[16px] h-[16px] relative bottom-[1.2px] mr-1 inline"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  VIEW
                                </button>
                                <button
                                  onClick={() => {
                                    acceptRequest(i);
                                  }}
                                  class="text-white text-xs left-[15%] bottom-[2px] relative uppercase bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-1 focus:ring-blue-300 font-semibold rounded-lg px-2.5 py-1.5 pl-[8px]  text-center"
                                >
                                  ACCEPT
                                </button>
                              </>
                            )}
                          </span>

                          <p class="mb-2 mt-4 text-left font-medium text-sm text-gray-700 ">
                            <strong>Category:</strong> {startup.category}
                          </p>

                          <p class=" pb-[3px] text-sm sm:text-left lg:right-0 relative  text-center font-medium text-gray-700">
                            <strong>Team:</strong> <br />
                            {startup &&
                              startup.team &&
                              startup.team.map((member, i) => {
                                return (
                                  <span
                                    class={` ${
                                      i == 2
                                        ? "-mt-[14px] inline pt-[16px]"
                                        : "inline mt-1"
                                    } relative right-1 top-3.5 pb-2.5`}
                                  >
                                    {" "}
                                    {i == 3 ? (
                                      <>
                                        {" "}
                                        <br class="inline" />{" "}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {i != 0 && i != 3 ? " || " : ""}{" "}
                                    <img
                                      src={
                                        member.profilePic
                                          ? member.profilePic
                                          : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                                      }
                                      class="w-6 h-6 shadow-md ml-2 mb-1 inline rounded-full"
                                    ></img>{" "}
                                    <span class="ml-1 mr-1  inline">
                                      {member.name.split(" ")[0]}
                                    </span>{" "}
                                  </span>
                                );
                              })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default StartupMentorship;
