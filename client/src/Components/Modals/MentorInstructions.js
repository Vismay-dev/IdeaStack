import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo.png";
import axios from "axios";
import projectContext from "../../context/projectContext";

const MentorInstructions = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const history = useHistory();

  const myRef = useRef();

  const projCon = useContext(projectContext);

  useEffect(() => {
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
  }, [myRef, () => props.close()]);

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
          data-aos="fade-up"
          data-aos-once="true"
          class="pr-6 relative sm:top-2 top-12 inline-block align-bottom z-50 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 mb-36 sm:align-middle sm:max-w-lg sm:w-10/12 w-11/12"
        >
          <div
            ref={myRef}
            class="bg-white w-full  px-1 pt-2 pb-2 sm:p-6 sm:pb-4 z-50"
          >
            <div class="sm:flex w-full sm:items-start">
              <div class=" text-center px-12 w-full sm:mt-0 ml-4  sm:text-left">
                <div>
                  <p class="text-lg text-gray-500">
                    {/* form starts here */}
                    <div class="right-2 min-h-full flex items-center justify-center py-3 px-2 sm:px-6 lg:px-5">
                      <div class="max-w-md w-full space-y-8">
                        <div>
                          <img
                            class="rounded-full w-[70px] h-[70px] mx-auto block mt-2"
                            src={props.mentor.pic}
                          ></img>
                          <h1 class="mt-2.5 text-center font-bold text-lg">
                            {props.mentor.name}
                          </h1>
                          <h2 class="relative mb-1 mt-3 text-center text-base font-extrabold text-gray-900">
                            Mentor Instructions
                          </h2>
                          <h1 class="mt-[1px] md:mb-1 mb-2 text-center uppercase text-blue-700 font-bold text-xs">
                            {"week " + props.upcomingMeeting.week + " meeting"}
                          </h1>

                          <div
                            class={`bg-indigo-100 w-fit mx-auto border-l-4 block mt-5 border-indigo-500 text-blue-700 p-4 pt-3 
                            `}
                            role="alert"
                          >
                            <p class="text-sm">
                              "{props.upcomingMeeting.mentorInstructions}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 px-4 py-3 ml-5 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={props.close}
              type="button"
              class="mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorInstructions;
