import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo.png";

const ExitModal = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const history = useHistory();

  const myRef = useRef();

  const continueSesh = () => {};

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
          class="pr-5 relative sm:top-2 top-12 inline-block align-bottom z-50 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 mb-36 sm:align-middle sm:max-w-lg sm:w-10/12 w-11/12"
        >
          <div ref={myRef} class="bg-white  px-1 pt-2 pb-2 sm:p-6 sm:pb-4 z-50">
            <div class="sm:flex sm:items-start">
              <div class=" text-center  sm:mt-0 ml-8  sm:text-left">
                <div>
                  <p class="text-lg text-gray-500">
                    {/* form starts here */}
                    <div class=" min-h-full  sm:left-2 relative  sm:ml-1 lg:ml-2 flex items-center justify-center py-3 px-5 sm:px-6 lg:px-5">
                      <div class="max-w-md w-full space-y-8">
                        <div>
                          <img
                            class="mx-auto w-32 -mt-3 relative"
                            src={logo}
                            alt="Workflow"
                          />
                          <h2 class="mt-1 bottom-3 relative mb-1 text-center sm:text-4xl text-3xl font-extrabold text-gray-900">
                            Session Expired
                          </h2>
                          <h2 class="mt-2 bottom-3 relative mb-1 text-center sm:text-3xl text-2xl font-extrabold text-blue-700">
                            You will be logged out.
                          </h2>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              if (sessionStorage.getItem("token")) {
                                sessionStorage.removeItem("token");
                                history.push("/home");
                                localStorage.removeItem("cookieID");
                                props.close();
                                if (props.loggedOut) {
                                  props.loggedOut();
                                }
                              } else if (
                                sessionStorage.getItem("mentorToken")
                              ) {
                                sessionStorage.removeItem("mentorToken");
                                history.push("/mentor");
                                localStorage.removeItem("cookieID");
                                props.close();
                                if (props.loggedOut) {
                                  props.loggedOut();
                                }
                              }
                            }}
                            class="mt-9 mb-6 bottom-1 hover:shadow-lg group relative sm:w-4/6 w-[136px] mx-auto font-semibold flex justify-center py-1 pb-1.5 px-1 border border-transparent text-md  rounded-md text-white bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                            Okay, log out
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
            {/* <button
              
              type="button"
              class="mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              No, Logout
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
