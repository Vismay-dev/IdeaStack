import React, { useContext, useEffect, useRef, useState } from "react";
import projectContext from "../../context/projectContext.js";
import { Route, Switch, Redirect, useRouter } from "next/router";
// components

import axios from "axios";

import CardPageVisits from "./Cards/CardConsultant.js";
import CardSocialTraffic from "./Cards/CardPending.js";
import CardTeam from "./Cards/CardTeam.js";

import ManageApps from "./ManageApps.js";
import Dashboard from "../Mentors/Dashboard.js";
import Collaborate from "./Collaborate.js";
import Mentorship from "./Mentorship.js";
import BrowseExperts from "./BrowseExperts.js";

import EditProjModal from "../Modals/EditProjModal";
import LeaveModal from "../Modals/LeaveModal.js";

import AOS from "aos";
import "aos/dist/aos.css";

import userContext from "../../context/userContext.js";

export default function ManageProject() {
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  const myRef = useRef();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!myRef.current || myRef.current.contains(event.target)) {
        return;
      }
      setTimeout(() => {
        setAllUsers([]);
      }, 100);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [myRef, () => setAllUsers([])]);

  const user = useContext(userContext).user;

  const projectCurr = useContext(projectContext);
  const [date, setDate] = useState();
  const [project, setProject] = useState();
  const [latestReceived, setLatestReceived] = useState();
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [text, setText] = useState("");
  const [origUsers, setOrigUsers] = useState([]);

  const textFilter = (text) => {
    let arr = [];
    let arrPrior = [];
    let array = origUsers;
    const wordFilterArr = [String(text)]; //Words to be searched for in task names
    for (let i = 0; i < Array(...array).length; i++) {
      arrPrior.push(0);
      var projName = (
        array[i]["firstName"] +
        " " +
        array[i]["lastName"]
      ).toLowerCase();
      var wordsContained = [projName];
      var boolean = false;
      for (let j = 0; j < wordFilterArr.length; j++) {
        for (let k = 0; k < wordsContained.length; k++) {
          if (wordsContained[k].indexOf(wordFilterArr[j]) > -1) {
            arrPrior[i]++;
            boolean = true;
          }
        }
      }

      if (
        boolean === true &&
        !team.includes(array[i].firstName + " " + array[i].lastName)
      ) {
        arr.push(array[i]);
      }
    }
    arrPrior = arrPrior.filter((e) => e !== 0);

    let x, y, tmp;
    x = y = 0;
    for (let x = 0; x < arr.length - 1; x++) {
      var check = false;
      for (let y = 0; y < arr.length - 1 - x; y++) {
        if (arrPrior[y + 1] > arrPrior[y]) {
          tmp = arr[y];
          arr[y] = arr[y + 1];
          arr[y + 1] = tmp;
          check = true;
        }
      }
      if (check === false) {
        break;
      }
    }

    console.log(arr);
    setAllUsers(arr);
  };
  const textChangeHandler = (e) => {
    setInviteSent(false);
    setText(e.target.value);
    filterByText(e.target.value);
  };

  const location = useRouter();

  const filterByText = (s) => {
    setAllUsers(origUsers);
    if (s !== "") {
      textFilter(s);
    } else {
      setAllUsers(origUsers);
    }
  };

  const [team, setTeam] = useState([]);
  const [proj, setProj] = useState("");

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let projSelected = projectCurr.project;
    let teamTemp = [];
    if (projSelected.team) {
      for (let i = 0; i < projSelected.team.length; i++) {
        teamTemp.push(projSelected.team[i].name);
      }
      setTeam(teamTemp);
    }

    setProj(projSelected);
    setProject(projSelected);
  }, [projectCurr.project, editing]);

  const [mentorDate, setMentorDate] = useState();
  const [dateOfUpload, setDateOfUpload] = useState();

  const [matchedMentor, setMatchedMentor] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getAllUsers"
          : "http://localhost:4000/api/user/getAllUsers",
        { token: sessionStorage.getItem("token") }
      )
      .then((res) => {
        let teamArr = proj.team.map((member) => {
          return member.id;
        });

        setOrigUsers(
          res.data.filter((user) => {
            return !teamArr.includes(user._id);
          })
        );

        let projSelected = proj;

        setProject(projSelected);
        if (
          projectCurr.project &&
          projectCurr.project.mentorsMatched &&
          projectCurr.project.mentorsMatched[0]
        ) {
          axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getWorkshop"
                : "http://localhost:4000/api/user/getWorkshop",
              {
                token: sessionStorage.getItem("token"),
                workshopId: projectCurr.project.mentorsMatched[0].mentorId,
              }
            )
            .then((res) => {
              setMatchedMentor({
                ...res.data,
                ...projectCurr.project.mentorsMatched[0],
              });
            })
            .catch((err) => {
              console.log(err.response);
              setLoading(false);
            });
        }

        // if (projSelected.joinRequests && projSelected.joinRequests.length > 1) {
        //   let dateNew3 = projSelected.joinRequests[0].dateReceived;
        //   for (let x = 0; x < projSelected.team.length; x++) {
        //     if (projSelected.joinRequests[x].dateReceived > dateNew3) {
        //       dateNew3 = projSelected.joinRequests[x].dateReceived;
        //     }
        //   }
        //   setLatestReceived({ date: dateNew3 });
        // }

        // if (
        //   projSelected.mentorshipPackages &&
        //   projSelected.mentorshipPackages.length > 0
        // ) {
        //   if (projSelected.mentorshipPackages[0].scheduleSelected)
        //     var dateNew2 = projSelected.mentorshipPackages[0].scheduleSelected;
        //   for (let x = 0; x < projSelected.mentorshipPackages.length; x++) {
        //     if (
        //       projSelected.mentorshipPackages[x].scheduleSelected > dateNew2
        //     ) {
        //       dateNew2 = projSelected.mentorshipPackages[x].scheduleSelected;
        //     }
        //   }
        //   setMentorDate({ date: dateNew2 });
        // }

        // if (projSelected.joinRequests && projSelected.joinRequests.length > 0) {
        //   let dateNew1 = new Date(projSelected.joinRequests[0].dateReceived);
        //   for (let x = 0; x < projSelected.joinRequests.length; x++) {
        //     if (
        //       new Date(projSelected.joinRequests[x].dateReceived) > dateNew1
        //     ) {
        //       dateNew1 = projSelected.joinRequests[x].dateReceived;
        //     }
        //   }
        //   setLatestReceived({ date: dateNew1 });
        // }

        if (projSelected.documents && projSelected.documents.length > 0) {
          let dateNew = new Date(projSelected.documents[0].dateOfUpload);
          for (let x = 0; x < projSelected.documents.length; x++) {
            if (new Date(projSelected.documents[x].dateOfUpload) > dateNew) {
              dateNew = projSelected.documents[x].dateOfUpload;
            }
          }
          setDateOfUpload({ date: dateNew });
        }

        let currdate = new Date(projSelected.createdAt)
          .toDateString()
          .substring(4);
        setDate(currdate.slice(0, 6) + "," + currdate.slice(6));

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [location.pathname, projectCurr.project]);

  const [inviteSent, setInviteSent] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const sendInvite = () => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/sendInvite"
          : "http://localhost:4000/api/project/sendInvite",
        {
          token: sessionStorage.getItem("token"),
          user: memberSelected,
          projectID: sessionStorage.getItem("managing"),
        }
      )
      .then((res) => {
        setInviteSent(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const [memberSelected, setMemberSelected] = useState();
  const inputRef = useRef();
  const [showRemove, setShowRemove] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});

  const remover = (member) => {
    setCurrentProfile(member);
    setShowLeave(true);
    setShowRemove(true);
  };

  return (
    <>
      <Switch>
        <Route path="/dashboard/overview">
          <>
            {editing ? (
              <EditProjModal
                close={() => setEditing(false)}
                changeProj={(data) => {
                  setProject(data);
                  setProj(data);
                }}
              />
            ) : (
              ""
            )}

            {showLeave ? (
              <LeaveModal
                isRemoving={showRemove}
                member={currentProfile}
                close={() => setShowLeave(false)}
              />
            ) : (
              ""
            )}

            <h2
              class={`text-center tracking-wide font-bold sm:text-5xl text-4xl  text-gray-800 top-1 relative  mt-12 
               
                   mb-4
               `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="sm:h-12 sm:w-12 w-10 h-10 sm:bottom-[3.2px] bottom-[3.1px] relative inline text-gray-800  font-bold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>{" "}
              Overview
              <p class="mt-[4px] text-xl text-center pl-3 bg-gradient-to-r bg-clip-text text-transparent from-blue-500 to-indigo-600 w-fit block mx-auto font-semibold">
                View All Important Details
              </p>
            </h2>

            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 xl:left-0 left-0.5  relative justify-center mx-auto lg:px-[60px]  md:px-[160px] sm:px-[70px] px-[30px] lg:mt-[63px] mt-[45px] mb-2  xl:gap-5 gap-9 ">
              <div
                data-aos={"fade-up"}
                data-aos-once="true"
                class={`w-full relative lg:h-[520px] mt-1 xl:h-[530px] col-span-1  `}
              >
                <div
                  class={`rounded-lg shadow-lg bg-gradient-to-r border-[1px] border-blue-600 lg:h-[520px] xl:top-0 lg:-top-[3px] relative xl:h-[530px]  from-blue-50 to-indigo-100 h-fit overflow-hidden mb-0`}
                >
                  <img
                    src={
                      project && projectCurr ? projectCurr.project.projPic : ""
                    }
                    alt="image"
                    class="w-full h-56 object-contain py-3 -mb-3 bg-gray-50 border-b-2 border-gray-400 relative"
                  />
                  <div class="p-8 sm:p-9 md:px-7 md:pt-9 md:pb-10 lg:p-7 xl:py-9 xl:px-6 text-center">
                    {projectCurr.project &&
                    projectCurr.project.admin &&
                    user._id !== projectCurr.project.admin.id ? (
                      ""
                    ) : (
                      <button
                        onClick={() => setEditing(true)}
                        class="relative xl:-top-1 sm:left-0 sm:top-0 -top-3  -left-6 flex justify-start -mb-[34px] rounded-md shadow-md hover:shadow-xl active:shadow-sm  font-semibold text-white bg-blue-600 hover:bg-blue-700 sm:text-base text-sm p-1 sm:px-3 px-2"
                      >
                        EDIT
                      </button>
                    )}

                    <h3>
                      <a
                        href="javascript:void(0)"
                        class="
           font-semibold
           text-dark text-xl
           sm:text-[22px]
           md:text-xl
           lg:text-[22px]
           xl:text-xl
           2xl:text-[22px] cursor-default
           
           block
           hover:text-primary
           "
                      >
                        {projectCurr.project ? projectCurr.project.name : ""}
                      </a>
                      <span class="text-sm mx-auto relative font-light text-gray-600 ">
                        {date ? date : ""}
                      </span>
                    </h3>
                    <p class="text-base text-body-color mt-7 lg:w-full xl:full overflow-hidden text-ellipsis h-fit  md:w-full  md:block md:mx-auto md:justify-center md:text-center leading-relaxed ">
                      {projectCurr.project ? projectCurr.project.problem : ""}
                      <br />
                    </p>
                    <p class="relative top-3 xl:top-7 mb-7">
                      <strong>Category:</strong>{" "}
                      {projectCurr.project ? projectCurr.project.category : ""}
                      <br />
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-aos={"fade-up"}
                data-aos-once="true"
                data-aos-delay="200"
                class={`w-full  relative h-fit lg:h-[480px] xl:h-[530px] col-span-1`}
              >
                <div
                  class={`rounded-lg shadow-lg bg-gradient-to-r  border-[1px] border-blue-600 h-fit lg:h-[520px] xl:h-[530px]  from-blue-50 to-indigo-200 overflow-hidden mb-0`}
                >
                  <div class="xl:h-[174px] lg:h-[168px]  sm:h-[170px] h-[165px] sm:pt-1.5 xl:pb-7 pt-0">
                    <p className="text-center top-4 text-xl font-semibold relative mb-1">
                      Workshops Attended:{" "}
                    </p>
                    <br />
                    <h1 className="text-center text-4xl text-blue-700 bottom-[1px] relative mb-[9px] mt-[9px]">
                      0
                    </h1>
                    <p class="text-sm relative text-center bottom-[0.2px] top-2.5 font-semibold text-indigo-500 sm:px-[50px] px-[25px] lg:px-[40px] ">
                      (Workshop Events - Coming Soon!)
                    </p>
                  </div>
                  <div class=" sm:pt-0.5 lg:pb-10 pb-10   pt-0  lg:pt-0.5 xl:pt-1  xl:h-[187px] h-fit  bg-gradient-to-r from-gray-50 to-slate-50 text-center">
                    <p className="text-center top-4 text-xl font-semibold relative sm:px-[85px] px-10">
                      Mentors Matched:{" "}
                    </p>
                    <br />
                    <h1
                      className={`text-center ${
                        matchedMentor &&
                        matchedMentor.upcomingMeeting &&
                        !matchedMentor.upcomingMeeting.completed
                          ? "mb-[9px] mt-[9px]"
                          : "mb-[10px] mt-[18px]"
                      } relative text-4xl text-blue-700`}
                    >
                      {project && project.mentorsMatched
                        ? project.mentorsMatched.length
                        : ""}
                    </h1>
                    <p class="text-sm relative text-center font-light top-2 text-gray-600 sm:px-[95px] px-[60px] lg:px-[20px] ">
                      {matchedMentor &&
                      matchedMentor.upcomingMeeting &&
                      !matchedMentor.upcomingMeeting.completed ? (
                        <p>
                          Upcoming Session With{" "}
                          <span class="text-indigo-500 font-semibold">
                            {matchedMentor.name}
                          </span>{" "}
                          On: <br />
                          <span class="text-indigo-500 font-semibold">
                            {new Date(
                              matchedMentor.upcomingMeeting.date
                            ).toDateString()}
                          </span>
                        </p>
                      ) : (
                        <span class="text-indigo-500 font-semibold relative top-2">
                          No Upcoming Session
                        </span>
                      )}
                    </p>
                  </div>
                  <div class=" pt-2 pb-7 lg:pt-2 xl:align-middle xl:pt-2   text-center">
                    <p className="text-center top-2.5 text-xl font-semibold relative">
                      Documents Uploaded:{" "}
                    </p>
                    <br />
                    <h1 className="text-center -top-1.5 xl:mt-2.5 mt-1.5 mb-1.5 relative text-4xl text-blue-700">
                      {project && project.documents
                        ? project.documents.length
                        : " "}
                    </h1>
                    <p class="text-sm relative text-center top-1.5 font-light text-gray-600 sm:px-[96px] px-[60px] lg:px-[40px] ">
                      {!dateOfUpload ? "" : "Latest Document Uploaded On:"}{" "}
                      <span class="text-indigo-500 font-semibold">
                        {dateOfUpload
                          ? new Date(dateOfUpload.date)
                              .toDateString()
                              .substring(0, 10)
                          : "No Document Uploaded"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-aos={"fade-up"}
                data-aos-once="true"
                data-aos-delay="400"
                className=" col-span-1 lg:left-[50%] xl:left-0 lg:relative  xl:mb-0"
              >
                <CardTeam triggerRemover={remover} />
              </div>
            </div>

            <div className="flex flex-wrap  sm:px-16 px-[18px] sm:right-0.5 right-[1px] relative mt-3.5 -mb-[240px]"></div>
          </>
        </Route>

        <Route path="/dashboard/yourmentor">
          <Dashboard />
        </Route>

        <Route path="/dashboard/collaborate">
          <Collaborate />
        </Route>

        <Route path="/dashboard/mentorship">
          <BrowseExperts />
        </Route>

        {/* <Route path="/dashboard/manageproject/mentorship">
          <Mentorship />
        </Route> */}

        <Route path="/dashboard/">
          <Redirect to="/dashboard/overview" />
        </Route>
      </Switch>
    </>
  );
}
