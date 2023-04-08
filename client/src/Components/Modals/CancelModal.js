import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import logo from "./logo.png";
import axios from "axios";

const CancelModal = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const history = useRouter();

  const myRef = useRef();

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
          <div ref={myRef} class="bg-white  px-1 pt-2 pb-2 sm:p-6 sm:pb-4 z-50">
            <div class="sm:flex sm:items-start">
              <div class=" text-center sm:mt-0 ml-4  sm:text-left">
                <div>
                  <p class="text-lg text-gray-500">
                    {/* form starts here */}
                    <div class="right-2 min-h-full flex items-center justify-center py-3 px-5 sm:px-6 lg:px-5">
                      <div class="max-w-md w-full space-y-8">
                        <div>
                          <img
                            class="mx-auto w-32 -mt-3 relative"
                            src={logo}
                            alt="Workflow"
                          />
                          <h2 class="mt-1 bottom-3 relative mb-1 text-center sm:text-3xl text-2xl font-extrabold text-gray-900">
                            Do you wish to cancel the latest booked mentorship
                            session?
                          </h2>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              axios
                                .post(
                                  process.env.NODE_ENV === "production"
                                    ? "https://ideastack.herokuapp.com/api/project/cancelLatestMentorship"
                                    : "http://localhost:4000/api/project/cancelLatestMentorship",
                                  {
                                    token: sessionStorage.getItem("token"),
                                    projectID:
                                      sessionStorage.getItem("managing"),
                                  }
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  props.close();
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            class="mt-9 mb-6 bottom-1 hover:shadow-lg group relative sm:w-4/6 w-[136px] mx-auto font-semibold flex justify-center py-1 pb-1.5 px-1 border border-transparent text-md  rounded-md text-white bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                            Yes
                          </button>
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

export default CancelModal;
