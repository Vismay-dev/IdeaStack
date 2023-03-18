import logo from "./logo.png";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import ReactGA from "react-ga";
import MentorInfo from "../Mentors/DashboardComponents/MentorInfo";

import mentorAccContext from "../../context/mentorAccContext";

const LogModalMentor = (props) => {
  const history = useHistory();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const mentorAccCon = useContext(mentorAccContext);
  const [mentor, setMentor] = useState({
    email: "",
    uniqueCode: "",
    rememberme: true,
  });

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

  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "rememberme") {
      console.log(mentor.rememberme);
      setChecked(!checked);
    }
    setMentor({
      ...mentor,
      [e.target.name]:
        e.target.name === "rememberme" ? checked : e.target.value,
    });
  };
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError();
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/loginMentor"
          : "http://localhost:4000/api/user/loginMentor",
        mentor
      )
      .then((res) => {
        sessionStorage.setItem("mentorToken", res.data.userToken);
        mentorAccCon.setMentor(res.data.user);
        if (res.data.cookieObj) {
          console.log(res.data.cookieObj);
          localStorage.setItem("cookieID", res.data.cookieObj.id);
          localStorage.setItem("cookieExpires", res.data.cookieObj.expires);
        } else {
          localStorage.removeItem("cookieID");
          localStorage.removeItem("cookieExpires");
        }
        gaEventTracker("Logged In");
        history.push("/mentorProfile");
        props.close();
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response && err.response.data);
        setLoading(false);
      });
  };

  const useAnalyticsEventTracker = (category = "Logins") => {
    const eventTracker = (action = "Logged In", label = "Log In Modal") => {
      ReactGA.event({ category, action, label });
    };
    return eventTracker;
  };

  const gaEventTracker = useAnalyticsEventTracker("Log In");

  //create change handlers

  //create state for registration

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
          data-aos={"fade-up"}
          data-aos-once="true"
          ref={myRef}
          class="pr-6 relative top-9 inline-block align-bottom bg-white rounded-lg sm:text-left text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mb-28 mb-32 sm:align-middle sm:max-w-md sm:w-12/12 w-10/12"
        >
          <div class="bg-white px-1 pt-5 pb-2 sm:p-6 sm:px-1 sm:pb-4 w-4/4 mx-auto relative">
            <div class="sm:flex sm:left-0 left-[2px] relative sm:items-start">
              <div class=" text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div>
                  <p class="text-lg text-gray-500">
                    {/* form starts here */}
                    <div class="sm:right-1.5 relative min-h-full flex items-center justify-center py-3 pt-0 px-5 sm:px-6 lg:px-5">
                      {
                        <div class="max-w-md w-full left-1.5 relative space-y-8 sm:pb-2 pb-0 pt-4">
                          <div class="sm:px-5 px-1">
                            <img
                              class="mx-auto w-28 sm:left-0 left-[8px] -mt-6 relative"
                              src={logo}
                              alt="Workflow"
                            />

                            <h2 class="mt-0 sm:left-0 left-[2.5px]  -top-2 relative text-center md:text-4xl sm:text-3xl text-3xl font-extrabold text-gray-900">
                              Sign in to your account
                            </h2>
                          </div>

                          {loading ? (
                            <div class="relative mx-auto my-8 mb-10 sm:pb-3 pb-14 pl-2 pt-1.5 sm:left-0 left-1 text-center block justify-center">
                              <ClipLoader
                                color={"#0b0bbf"}
                                loading={loading}
                                size={70}
                              />
                            </div>
                          ) : (
                            <form
                              class="mt-24 space-y-6 pb-2 relative"
                              onSubmit={handleSubmit}
                            >
                              <input
                                class="text-md"
                                type="hidden"
                                name="remember"
                                id="remember"
                              />
                              <div class="rounded-md sm:shadow-sm relative sm:mb-0 sm:w-full w-[117%] sm:right-0 right-[6%] -mb-4 block -space-y-px ">
                                {error === "User not found" ? (
                                  <p class="text-red-500 text-center text-md relative bottom-3 mt-4 pt-3 pb-2 mb-2">
                                    Login Failed: User Not Found
                                  </p>
                                ) : error === "Incorrect Unique Code" ? (
                                  <p class="text-red-500 text-center text-md relative bottom-3 mt-4 pt-3 pb-2 mb-2">
                                    Login Failed: Incorrect Unique Code
                                  </p>
                                ) : null}

                                <div>
                                  <label for="email-address" class="sr-only">
                                    Email address
                                  </label>
                                  <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={mentor.email}
                                    required
                                    class={`appearance-none rounded-none ${
                                      error === "User not found"
                                        ? "bg-orange-100 text-orange-300 border-orange-300 border-2"
                                        : "border-gray-300"
                                    } relative block sm:w-full sm:shadow-none shadow-sm w-[86%] sm:right-0 right-[1px] mx-auto px-2 py-1 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md`}
                                    placeholder="Mentor Email address"
                                  />
                                </div>
                                <div>
                                  <label for="password" class="sr-only">
                                    Unique Code
                                  </label>
                                  <input
                                    id="password"
                                    name="uniqueCode"
                                    type="password"
                                    onChange={handleChange}
                                    value={mentor.uniqueCode}
                                    required
                                    class={`${
                                      error === "Incorrect Unique Code"
                                        ? "bg-orange-100 text-orange-300 border-orange-300 border-2"
                                        : "border-gray-300"
                                    } appearance-none rounded-none sm:shadow-none shadow-sm relative block sm:w-full w-[86%] sm:right-0 right-[1px] mx-auto px-2 mb-12 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md`}
                                    placeholder="Unique Code"
                                  />
                                </div>
                              </div>

                              <div class="flex items-center sm:-mt-0 sm:left-0 left-[14px] -mt-2 relative sm:justify-between">
                                <div class="flex items-center">
                                  <input
                                    id="rememberme"
                                    name="rememberme"
                                    onChange={handleChange}
                                    type="checkbox"
                                    class="cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                  <label
                                    for="rememberme"
                                    class="ml-2 block text-sm text-gray-900"
                                  >
                                    Remember me
                                  </label>
                                </div>
                              </div>

                              <div>
                                <button
                                  type="submit"
                                  class="mt-3 group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1.5 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                      class="h-5 w-5 text-blue-600 group-hover:text-blue-400"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  Sign in
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      }
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 pb-3.5 sm:px-6 sm:left-0 left-2 relative sm:flex sm:flex-row-reverse">
            <button
              onClick={props.close}
              type="button"
              class="mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 pb-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogModalMentor;
