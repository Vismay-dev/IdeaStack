import { useEffect, useState, useMemo, useContext, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";
import Tooltip from "react-power-tooltip";
import AOS from "aos";
import "aos/dist/aos.css";

import Dropdown from "../MyProjects/Dropdown";

import {
  MdDeveloperMode,
  MdWeb,
  MdOutlineCastForEducation,
  MdHealthAndSafety,
} from "react-icons/md";
import {
  GiVintageRobot,
  GiPowerGenerator,
  GiArtificialIntelligence,
} from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { SiHiveBlockchain } from "react-icons/si";
import projectContext from "../../context/projectContext";
import { CgCodeClimate } from "react-icons/cg";
import { BsCheckAll } from "react-icons/bs";

const RequestInfo = (props) => {
  let categories = [
    {
      name: "All",
      icon: (
        <BsCheckAll class="inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]" />
      ),
      id: 0,
    },
    {
      name: "Robotics",
      icon: (
        <GiVintageRobot class="inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]" />
      ),
      id: 1,
    },
    {
      name: "Environment",
      icon: (
        <CgCodeClimate class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 10,
    },
    {
      name: "Energy",
      icon: (
        <GiPowerGenerator class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 7,
    },
    {
      name: "Web Development",
      icon: (
        <MdWeb class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 2,
    },
    {
      name: "Mobile App Development",
      icon: (
        <MdDeveloperMode class="inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]" />
      ),
      id: 3,
    },
    {
      name: "EdTech (Educational Technology)",
      icon: (
        <MdOutlineCastForEducation class="inline mr-[4px] ml-[0.5px] w-[17px] bottom-[0.85px] relative h-[17px]" />
      ),
      id: 5,
    },
    {
      name: "Healthcare",
      icon: (
        <MdHealthAndSafety class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 6,
    },
    {
      name: "AI",
      icon: (
        <GiArtificialIntelligence class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 8,
    },
    {
      name: "Blockchain",
      icon: (
        <SiHiveBlockchain class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 9,
    },
    {
      name: "Logistics (Transport and Storage of Goods)",
      icon: (
        <GrDeliver class="inline mr-[4.6px]  left-[1px] ml-[0.5px] w-[17px] bottom-[0.85px] relative h-[17px]" />
      ),
      id: 4,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const myRef = useRef();

  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!myRef.current || myRef.current.contains(event.target)) {
          return;
        }
        props.close();
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [myRef, () => props.close()]
  );

  const [error, setError] = useState("");

  return (
    <div
      class="fixed z-[100] inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal panel, show/hide based on modal state. */}

        <div
          ref={myRef}
          data-aos={"fade-up"}
          data-aos-once="true"
          class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle md:w-10/12 sm:w-11/12 w-[95%]"
        >
          <div class="bg-white px-4 pt-4 pb-2 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-center">
              <div class=" text-center w-full sm:mt-0 sm:ml-4 ml-3 sm:text-left">
                <div>
                  <form class="w-full mb-1 pt-1 pb-1">
                    <h1 class="text-4xl mx-auto block relative text-center my-2 mb-12 font-semibold">
                      Startup Details
                    </h1>

                    <div class="relative z-0 mb-7 w-full group">
                      <p
                        name="name"
                        id="floating_repeat_name"
                        class="block mt-3  relative mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        {props.startup.name}
                      </p>
                      <label
                        for="floating_repeat_name"
                        class="absolute text-sm font-semibold left-0 text-blue-700  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Project Name
                      </label>
                    </div>
                    <div class="grid xl:grid-cols-2 mt-2.5 mb-3.5 xl:gap-6">
                      <div class="relative z-0 mb-11 w-full group">
                        <p
                          placeholder="Category"
                          name="category"
                          type="select"
                          defaultValue={""}
                          class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          required={true}
                        >
                          {props.startup.category}
                        </p>
                        <label
                          for="floating_repeat_name"
                          class="absolute text-sm font-semibold left-0 text-blue-700  duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Category
                        </label>
                      </div>
                      <div class="relative z-0 mb-10 md:mt-0 -mt-4 w-full group">
                        <p
                          name="maxCap"
                          id="maxCap"
                          class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          required={true}
                        >
                          {props.startup.maxCap}
                        </p>
                        <label
                          for="maxCap"
                          class="absolute left-0  font-semibold text-sm text-blue-700 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Max. Team Capacity
                        </label>
                      </div>
                    </div>

                    <div class="relative z-0 mb-14 md:mts-0 w-full group">
                      <p
                        name="problem"
                        id="problem"
                        class="block top-3 relative  w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer h-32 p-2  rounded-md"
                      >
                        {props.startup.problem}
                      </p>
                      <label class="absolute text-sm font-semibold left-0 text-blue-700 duration-300 transform -top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  ">
                        Startup Description.
                      </label>
                    </div>

                    <div class="relative z-0 mb-10 mt-2 block w-full group">
                      <p
                        name="problem"
                        id="problem"
                        class="block top-1 relative  w-full text-sm text-gray-900 bg-transparent  appearance-none    peer p-2  rounded-md"
                      >
                        {props.startup &&
                          props.startup.team &&
                          props.startup.team.map((member, i) => {
                            console.log(member);

                            return (
                              <span
                                class={` ${
                                  i == 2
                                    ? "-mt-[14px] inline pt-[16px]"
                                    : "inline mt-1"
                                } relative right-1 text-base top-3.5 pb-2.5`}
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
                                  class="w-7 h-7 border-[1px] border-blue-700 shadow-md ml-2 mb-1 inline rounded-full"
                                ></img>{" "}
                                <span class="ml-1 mr-1 relative bottom-[0.5px] text-base inline">
                                  {member.firstName + " " + member.lastName}
                                </span>{" "}
                              </span>
                            );
                          })}
                      </p>
                      <label class="absolute text-sm font-semibold left-0 text-blue-700 duration-300 transform -top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  ">
                        Our Team
                      </label>
                    </div>

                    <div class="  mt-1 pt-1 block">
                      <div class="relative border-2 -mt-1  block w-[150px] rounded-full mx-auto  h-[150px] p-3 border-dashed  border-gray-700 z-0 mb-14  group">
                        <img
                          class=" relative w-full h-full object-contain mx-auto justify-center align-middle"
                          src={
                            props.startup.projPic ||
                            props.startup.projPic !== ""
                              ? props.startup.projPic
                              : ""
                          }
                        ></img>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        props.close();
                      }}
                      class="text-black border-2 border-gray-700 bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-lg shadow-md w-full sm:w-auto sm:px-32 mt-2 sm:mb-3 mb-6 py-2 mx-auto block text-center  "
                    >
                      close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-3 mt-4 shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
            <button
              onClick={props.close}
              type="button"
              class="sm:-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestInfo;
