import { useState, useEffect, useContext } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import AOS from "aos";

import "aos/dist/aos.css";

import AllProjects from "./AllProjects";
import CreateProject from "./CreateProject";
import JoinRequests from "./JoinRequests";
import ManageProject from "./ManageProject";

import projectContext from "../../context/projectContext";

import { FcCollapse } from "react-icons/fc";

const MyProjects = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const history = useHistory();
  const location = useLocation();
  const projectCurr = useContext(projectContext);
  const [projectCurrent, setProjectCurrent] = useState("");

  useEffect(() => {
    let projSelected = "";
    projSelected = projectCurr.project;
    setProjectCurrent(projSelected ? projSelected.name : "");
  }, []);
  const [showHeader, setShowHeader] = useState(true);

  const [prevLocation, setPrevLocation] = useState("");
  const [prevLocation2, setPrevLocation2] = useState("");

  const [bool2, setBool2] = useState(false);

  // BANNER TOGGLING EFFECT
  useEffect(() => {
    if (!bool2 && location.pathname.split("/").length - 1 === 3) {
      if (
        location.pathname.split("/").length - 1 === 3 &&
        (prevLocation2.split("/").length - 1 === 2 ||
          prevLocation.split("/").length - 1 === 2)
      ) {
        setShowHeader(true);
      } else if (
        (location.pathname !== "/myprojects/manageproject/overview" &&
          location.pathname.split("/")[2] === "manageproject") ||
        (showHeader === false &&
          prevLocation !== "/myprojects/manageproject/overview" &&
          prevLocation2.split("/").length - 1 !== 2 &&
          prevLocation.split("/").length - 1 !== 2)
      ) {
        setShowHeader(false);
        setBool2(true);
      } else {
        setShowHeader(true);
      }

      if (
        showHeader === true &&
        prevLocation !== "/myprojects/manageproject/overview"
      ) {
        setShowHeader(true);
      }
    }

    if (
      prevLocation2.split("/").length - 1 === 2 &&
      location.pathname === "/myprojects/manageproject/overview"
    ) {
      setShowHeader(true);
    }
  }, [location.pathname]);

  const [bool, setBool] = useState(false);

  // BANNER TOGGLING EFFECT
  useEffect(() => {
    if (!bool && location.pathname.split("/").length - 1 === 2) {
      if (
        (location.pathname !== "/myprojects/allprojects" &&
          location.pathname.split("/")[2] !== "manageproject") ||
        (showHeader === false && prevLocation2 !== "/myprojects/allprojects")
      ) {
        setShowHeader(false);
        setBool(true);
      } else {
        setShowHeader(true);
      }

      if (showHeader === true && prevLocation2 !== "/myprojects/allprojects") {
        setShowHeader(true);
      }
    }
  }, [location.pathname]);

  // BANNER TOGGLING EFFECT
  useEffect(() => {
    if (location.pathname === "/myprojects/manageproject/overview") {
      setPrevLocation(location.pathname);
    } else {
      setPrevLocation("");
    }
  }, [location.pathname]);

  // BANNER TOGGLING EFFECT
  useEffect(() => {
    if (location.pathname === "/myprojects/allprojects") {
      setPrevLocation2(location.pathname);
    } else {
      setPrevLocation2(location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      {/* {showHeader ? (
        <div
          data-aos={"flip-up"}
          data-aos-once="true"
          style={{
            "background-image":
              "url(https://i.pinimg.com/736x/6a/3a/9a/6a3a9aa650f610536f40bedc3e988365.jpg)",
          }}
          className="shadow-md transition-transform ease-out overflow-hidden origin-top transform  bg-center bg-cover bottom-4   block justify-center w-screen mx-auto pt-7 bg-gradient-to-r from-gray-100 to-gray-300"
        >
          <div>
            <h1 className="xl:text-7xl md:text-6xl sm:text-5xl text-[43px] sm:leading-[54px] xl:leading-[72px] md:leading-[65px] leading-10 relative text-center text-gray-100 font-extrabold pb-6 mb-1  mx-auto">
              {projectCurrent}
            </h1>
          </div>
        </div>
      ) : (
        ""
      )} */}

      <div class="flex space-x-1 overflow-hidden bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-1 pt-5 justify-center xl:w-full w-full md:pr-[125px] sm:pr-[125px] pr-[125px] rounded-b-lg mx-auto">
        <>
          <>
            <button
              onClick={() => {
                history.push("/dashboard/overview");
              }}
              class={`flex items-center h-12 relative ml-[130px] py-2 text-center text-gray-100 
        ${
          location.pathname === "/dashboard/overview"
            ? "bg-gray-800"
            : "bg-gray-500"
        } px-6  border border-b-0  border-gray-300 text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}
            >
              Overview
            </button>
            <div class="flex space-x-[3.5px]">
              <button
                onClick={() => {
                  history.push("/dashboard/yourmentor");
                }}
                class={`flex items-center h-12 py-2 text-center text-gray-100 
        ${
          location.pathname.includes("yourmentor")
            ? "bg-gray-800"
            : "bg-gray-500"
        } px-6 border border-b-0  border-gray-300 text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}
              >
                <span class="lg:inline hidden  mr-1.5">Your </span> Mentor
              </button>

              <button
                onClick={() => {
                  history.push("/dashboard/collaborate");
                }}
                class={` block items-center h-12 py-2  text-center text-gray-100 
        ${
          location.pathname === "/dashboard/collaborate"
            ? "bg-gray-800"
            : "bg-gray-500"
        } px-6 border border-b-0  border-gray-300 text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}
              >
                Collaborate
              </button>
            </div>
          </>

          {/* <button
            onClick={() => {
              setShowHeader(showHeader ? false : true);
            }}
            class={` items-center h-12 ${
              sessionStorage.getItem("managing")
                ? "left-0 xl:left-24 md:px-4 px-2"
                : "left-24 px-4"
            }  relative py-1.5  text-sm text-center text-gray-100 
        hover:from-gray-600 hover:to-gray-700 bg-gradient-to-b from-gray-500 to-gray-500 border-1    border-b-0  ${
          location.pathname === "/dashboard/mentorship"
            ? "sm:mr-0 mr-12 relative"
            : ""
        }  sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}
          >
            <FcCollapse
              class={`text-4xl -top-[1px] text-gray-200 relative ${
                !showHeader ? "rotate-180" : ""
              }`}
            />
          </button> */}
          {/* <br /> */}
          {/* <div class="sm:hidden block relative">
            <br />
            <div class="space-x-[3px] flex relative mt-8 -ml-[259px] mr-12 ">
              <button
                onClick={() => {
                  history.push("/dashboard/overview");
                }}
                class={`flex items-center h-12 py-2 ${
                  location.pathname.includes("yourmentor") ? "sm:" : ""
                } ${
                  location.pathname.includes("yourmentor") ? "hidden" : ""
                } text-sm text-center text-gray-100 
        ${
          location.pathname.includes("overview") ? "bg-gray-800" : "bg-gray-500"
        } md:px-6 px-3 hover:bg-gray-600 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}
              >
                Overview
              </button>

              <button
                onClick={() => {
                  history.push("/dashboard/yourmentor");
                }}
                class={`flex items-center h-12 py-2 ${
                  location.pathname.includes("yourmentor") ? "sm:" : ""
                } ${
                  location.pathname.includes("yourmentor") ? "hidden" : ""
                } text-sm text-center text-gray-100 
        ${
          location.pathname.includes("yourmentor")
            ? "bg-gray-800"
            : "bg-gray-500"
        } md:px-6 px-3 hover:bg-gray-600 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}
              >
                <span class="lg:inline hidden">Your</span> Mentor
              </button>

              <button
                onClick={() => {
                  history.push("/dashboard/collaborate");
                }}
                class={` block items-center h-12 py-2 ${
                  location.pathname === "/dashboard/mentorship" ? "hidden" : ""
                } text-sm text-center text-gray-100 
        ${
          location.pathname === "/dashboard/collaborate"
            ? "bg-gray-800"
            : "bg-gray-500"
        } md:px-6 px-3 border hover:bg-gray-600 border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}
              >
                Collaborate
              </button>
            </div>
          </div> */}
        </>
      </div>

      <ManageProject />
    </>
  );
};

export default MyProjects;
