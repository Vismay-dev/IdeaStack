import projectContext from "../../context/projectContext.js";
import React, { useContext, useEffect, useState } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { BiEditAlt } from "react-icons/bi";
import styles from "./ManageApps.module.css";
import EditApplicationForm from "../Modals/EditApplicationForm.js";
import ViewApplications from "../Modals/ViewApplications.js";
import axios from "axios";

import AOS from "aos";
import "aos/dist/aos.css";

import userContext from "../../context/userContext";

const ManageApps = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const user = useContext(userContext).user;

  const projects = useContext(projectContext);
  const [date, setDate] = useState();
  const [project, setProject] = useState();

  const [latestAccepted, setLatestAccepted] = useState();
  const [latestReceived, setLatestReceived] = useState();

  useEffect(() => {
    let projSelected = projects.projects.filter((proj) => {
      return proj._id === String(sessionStorage.getItem("managing"));
    })[0];
    if (projects.projects && projSelected) {
      setProject(projSelected);

      if (projSelected.team.length > 1) {
        let date = projSelected.team[1].dateAdded;
        let name = projSelected.team[1].name;
        for (let x = 0; x < projSelected.team.length; x++) {
          if (projSelected.team[x].dateAdded > date) {
            date = projSelected.team[x].dateAdded;
            name = projSelected.team[x].name;
          }
        }
        setLatestAccepted({ date: date, name: name });
      }

      if (projSelected.joinRequests.length > 1) {
        let newDate = projSelected.joinRequests[1].dateReceived;
        for (let x = 0; x < projSelected.team.length; x++) {
          if (projSelected.joinRequests[x].dateReceived > newDate) {
            newDate = projSelected.joinRequests[x].dateReceived;
          }
        }
        setLatestReceived({ date: newDate });
      }

      let currdate = new Date(projSelected.createdAt)
        .toDateString()
        .substring(4);
      setDate(currdate.slice(0, 6) + "," + currdate.slice(6));
    }
  }, [projects]);

  const [acceptingApp, setAcceptingApp] = useState();

  useEffect(() => {
    setAcceptingApp(project ? project.accepting : false);
  }, [project]);

  const changeHandler = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/updateAppStatus"
          : "http://localhost:4000/api/project/updateAppStatus",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
          accepting: !acceptingApp,
        }
      )
      .then((res) => {
        setAcceptingApp(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const [showEditApp, setShowEditApp] = useState(false);
  const [showViewApp, setShowViewApp] = useState(false);
  return (
    <>
      {showEditApp ? (
        <EditApplicationForm close={() => setShowEditApp(false)} />
      ) : (
        ""
      )}
      {showViewApp ? (
        <ViewApplications close={() => setShowViewApp(false)} />
      ) : (
        ""
      )}
      <h2
        class={`text-center font-bold sm:text-5xl ${
          user && project && user._id !== project.admin.id ? "py-4" : ""
        } text-4xl sm:px-0 px-8 text-gray-800 top-1 relative sm:mt-10 mt-11 sm:-mb-2.5 -mb-4`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="md:h-10 md:w-10 h-8 w-8 mr-1 inline relative bottom-[3px]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
            clip-rule="evenodd"
          />
        </svg>{" "}
        <p class="inline">Manage Applications</p>
      </h2>

      {user && project && user._id === project.admin.id ? (
        <>
          <h1 class="sm:text-4xl text-3xl px-6 text-center sm:mt-[67px] mt-[64px]">
            <span class={!acceptingApp ? "text-blue-700" : "text-red-500"}>
              {acceptingApp ? "Pause" : "Accept"}
            </span>{" "}
            Core-Team Applications
          </h1>

          <div class="flex items-center justify-center relative w-full sm:mb-11 mb-10">
            <label for="toggleB" class="flex items-center cursor-pointer">
              {/* <!-- toggle --> */}
              <div class="relative mt-6 -mb-1">
                {/* <!-- input --> */}
                <input
                  type="checkbox"
                  checked={acceptingApp}
                  onChange={changeHandler}
                  id="toggleB"
                  class="z-30 sr-only"
                />
                {/* <!-- line --> */}
                <div
                  id={styles.bgrnd}
                  class="block bg-gray-600 sm:w-14 w-12 sm:h-8 h-7 rounded-full"
                ></div>
                {/* <!-- dot --> */}
                <div
                  id={styles.dot}
                  className="dot absolute left-1 top-1 bg-white sm:w-6 sm:h-6 w-5 h-5 rounded-full transition"
                ></div>
              </div>
            </label>
          </div>
        </>
      ) : (
        <div class="relative py-1.5"> </div>
      )}

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 xl:px-52 lg:px-24 md:px-4 sm:px-20 px-6 mt-[70px]  lg:-mb-[222px] -mb-[200px]">
        <div
          data-aos={"fade-up"}
          data-aos-once="true"
          class={`w-full relative grid-col-1`}
        >
          <div
            class={`rounded-lg shadow-lg bg-gradient-to-r  border-[1px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden mb-0`}
          >
            <div class="h-[114px] pt-2.5 pb-2">
              <p className="text-center top-3 text-xl font-semibold relative">
                Status:{" "}
              </p>
              <br />
              <p
                class={`sm:text-[27px] text-[23px] ${
                  acceptingApp ? "text-blue-700" : "text-red-500"
                } relative text-center bottom-[5px] lg:px-[50px] sm:px-[20px] px-[15px]`}
              >
                {acceptingApp
                  ? "Accepting Applications"
                  : "Not Accepting Applications"}
              </p>
            </div>
            <div
              class={`${
                !latestAccepted ? "pt-4 pb-[49px]" : "pt-2 lg:pb-8 pb-9"
              }  mt-2 bg-gradient-to-r from-gray-50 to-slate-50 text-center`}
            >
              <p className="text-center top-4 text-xl font-semibold relative px-10">
                Applications Accepted:{" "}
              </p>
              <br />
              <h1 className="text-center relative text-4xl text-blue-700">
                {project ? project.team.length - 1 : " "}
              </h1>
              <p
                class={`text-sm relative ${
                  !latestAccepted ? "top-3 " : " top-1.5"
                } text-center font-light text-gray-600 xl:px-[80px] lg:px-[70px] md:px-[60px] px-[55px]  `}
              >
                Latest Accepted Team Member:{" "}
                {latestAccepted ? (
                  <>
                    <span class="text-indigo-500 font-semibold">
                      {latestAccepted.name}
                    </span>{" "}
                    (
                    {latestAccepted.date
                      ? Date(latestAccepted.date).toString().substring(0, 15)
                      : ""}
                    )
                  </>
                ) : (
                  "--"
                )}{" "}
              </p>
            </div>
            <div class=" pt-2.5 md:pt-5 lg:pt-2.5 pb-[27px] lg:h-fit md:h-[200px] h-fit text-center">
              <p className="text-center   top-3.5 text-xl font-semibold relative mb-1">
                Applications Pending:{" "}
              </p>
              <br />
              <h1 className="text-center text-4xl text-blue-700 -top-2 relative mb-1">
                {project
                  ? project.joinRequests.filter(
                      (jR) => jR.isInvite == null || jR.isInvite == false
                    ).length
                  : " "}
              </h1>
              <p class="text-sm relative text-center bottom-1.5 font-light text-gray-600 xl:px-[60px] lg:px-[50px] md:px-[50px] px-[50px] ">
                Latest Pending Application Received On:{" "}
                <span class="text-indigo-500 font-semibold">
                  {latestReceived && latestReceived.date
                    ? latestReceived.date
                    : "No Pending Applications"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos={"fade-up"}
          data-aos-once="true"
          data-aos-delay="200"
          class={`w-full pointer-events-auto z-[65] relative grid-col-1`}
        >
          <div
            class={`rounded-lg shadow-lg bg-gradient-to-r  relative bottom-[0.7px] border-[1px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden mb-0`}
          >
            <div class="h-[235px] relative  ">
              <p className="text-center top-5 text-xl font-semibold relative">
                View Applications:{" "}
              </p>
              <br />
              <p class="text-sm relative text-center font-light bottom-0.5 text-gray-600 xl:px-[80px] lg:px-[50px] lg:mb-1.5  xl:mt-0 ">
                Have a look at join requests for{" "}
                <span class="text-indigo-500 font-semibold"> IdeaStack</span>!
              </p>
              <ImFilesEmpty
                onClick={() => setShowViewApp(true)}
                class="text-center relative mx-auto text-8xl lg:top-5 md:top-[27px] top-[30px] shadow-lg cursor-pointer hover:shadow-2xl active:shadow-lg rounded-md bg-blue-700 p-3"
              />
            </div>
            <div class=" pt-0 pb-12 bg-gradient-to-r z-[65] mt-0.5 h-fit md:h-[260px] lg:h-fit from-gray-50 to-slate-50 text-center">
              <p className="text-center top-4 text-xl font-semibold relative px-10">
                Edit Application Form:{" "}
              </p>
              <br />

              <p class="text-sm relative text-center font-light bottom-1 text-gray-600 xl:px-[50px] lg:px-[40px]  sm:px-[50px] px-[25px]   md:block  lg:w-full  ">
                This form will be submitted by applicants when requesting core
                team membership in
                <span class="text-indigo-500 font-semibold"> IdeaStack</span>
              </p>
              <BiEditAlt
                onClick={() => setShowEditApp(true)}
                class="text-center z-[75] pointer-events-auto relative mx-auto text-8xl top-5 shadow-lg cursor-pointer hover:shadow-2xl active:shadow-lg rounded-md bg-blue-700 p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageApps;
