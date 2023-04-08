import logo from "./logo.png";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import ReactGA from "react-ga";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const LogModal = (props) => {
  const history = useRouter();
  const GOOGLEOAUTHCLIENTID =
    "1085293368367-1i2er7o64kk7mtpgdbt92bi6k8r6bjpk.apps.googleusercontent.com";

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [studentUser, setStudentUser] = useState({
    email: "",
    password: "",
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

  // const onSuccess = (res) => {
  //   console.log("SUCCESS... Current User: " + res.profileObj);
  // };

  // const onFailure = (res) => {
  //   console.log("LOGIN FAILED - res: " + res);
  //   setError("Google Login Failed...");
  // };

  const handleChange = (e) => {
    if (e.target.name === "rememberme") {
      console.log(studentUser.rememberme);
      setChecked(!checked);
    }
    setStudentUser({
      ...studentUser,
      [e.target.name]:
        e.target.name === "rememberme" ? checked : e.target.value,
    });
  };
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [forgot, setForgot] = useState(false);
  const [resetCode, setResetCode] = useState();
  const [reqCode, setReqCode] = useState();

  const [resetMail, setResetMail] = useState();
  const [resetCodeSent, setResetCodeSent] = useState(false);

  const [resetCodeValid, setResetCodeValid] = useState(false);
  const [passNew, setPassNew] = useState(false);

  const handleChangeCode = (e) => {
    setResetCode(e.target.value);
  };
  const handleChangeMailReset = (e) => {
    setResetMail(e.target.value);
  };
  const handleChangePassNew = (e) => {
    setPassNew(e.target.value);
  };

  const sendResetCode = (e) => {
    e.preventDefault();
    setError();
    setLoading(true);

    let codeTemp = parseInt(Math.random() * 1000000);
    setReqCode(codeTemp);
    setTimeout(() => {
      let codeTemp = parseInt(Math.random() * 1000000);
      setReqCode(codeTemp);
      setResetCodeSent(false);
    }, 600000);

    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/sendResetCode"
          : "http://localhost:4000/api/user/sendResetCode",
        { mail: resetMail, code: codeTemp }
      )
      .then((res) => {
        setResetCodeSent(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  const checkResetCode = (e) => {
    e.preventDefault();
    setLoading(true);
    setError();
    if (parseInt(resetCode) !== parseInt(reqCode)) {
      setError("Invalid Code");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setResetCodeValid(true);
      setResetCode("");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const [passReset, setPassReset] = useState(false);
  const resetPass = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/resetPassword"
          : "http://localhost:4000/api/user/resetPassword",
        { email: resetMail, pass: passNew }
      )
      .then((res) => {
        setPassReset(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError();
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/login"
          : "http://localhost:4000/api/user/login",
        studentUser
      )
      .then((res) => {
        sessionStorage.setItem("token", res.data.userToken);
        props.logFunc(res.data.user);
        if (res.data.cookieObj) {
          console.log(res.data.cookieObj);
          localStorage.setItem("cookieID", res.data.cookieObj.id);
          localStorage.setItem("cookieExpires", res.data.cookieObj.expires);
        } else {
          localStorage.removeItem("cookieID");
          localStorage.removeItem("cookieExpires");
        }
        gaEventTracker("Logged In");
        history.push("/profile");
        props.close();
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response && err.response.data);
        setLoading(false);
      });
  };

  console.log(error);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setLoading(true);
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/googleLogin"
            : "http://localhost:4000/api/user/googleLogin",
          {
            oauthObj: tokenResponse,
          }
        )
        .then((res) => {
          sessionStorage.setItem("token", res.data.userToken);
          props.logFunc(res.data.user);
          if (res.data.cookieObj) {
            console.log(res.data.cookieObj);
            localStorage.setItem("cookieID", res.data.cookieObj.id);
            localStorage.setItem("cookieExpires", res.data.cookieObj.expires);
          } else {
            localStorage.removeItem("cookieID");
            localStorage.removeItem("cookieExpires");
          }
          gaEventTracker("Logged In");
          history.push("/profile");
          props.close();
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response && err.response.data);
          setLoading(false);
        });
    },
    onError: (error) => {
      setError("Google login failed..");
      console.log(error);
    },
  });

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
                      {forgot ? (
                        passReset ? (
                          <div class="max-w-md w-full sm:left-3.5 left-1 relative space-y-8 sm:pb-2 pb-0 pt-4">
                            <div class="sm:px-5 px-1">
                              <img
                                class="mx-auto w-28 sm:left-0 left-[8px] -mt-6 relative"
                                src={logo}
                                alt="Workflow"
                              />

                              <h2 class="mt-0   -top-2 relative text-center md:text-3xl sm:text-2xl text-[22px] mx-5 mr-5 sm:right-2.5 right-1 relative font-extrabold text-gray-900">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-7 relative mr-0.5 inline bottom-[3px] w-7"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>{" "}
                                <span class="inline">Reset Password</span>
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
                              <form class="mt-24 space-y-6 pb-2 relative">
                                <input
                                  class="text-md"
                                  type="hidden"
                                  name="remember"
                                  id="remember"
                                />
                                <div class="rounded-md  relative sm:mb-0 sm:w-full w-[117%] sm:right-0 right-[6%] -mb-4 block -space-y-px ">
                                  <p class="text-lg text-green-700 text-center relative -mt-2 mb-4 left-1 py-3 uppercase font-semibold underline">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-6 w-6 inline relative bottom-[1px] mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                      />
                                    </svg>

                                    <span class="inline ">
                                      Password succesfully reset!
                                    </span>
                                  </p>
                                </div>

                                <div>
                                  <div class="mt-3 grid grid-cols-3 gap-4 sm:left-0 left-[3px] sm:w-1/2 w-[150px] mx-auto sm:right-0 right-[2px] justify-center py-1 pb-1.5 px-4">
                                    <button
                                      onClick={() => {
                                        setForgot(false);
                                        setResetCodeSent(false);
                                        setResetCodeValid(false);
                                      }}
                                      class="mt-3 uppercase col-span-3 group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1.5 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      Okay
                                    </button>
                                  </div>
                                </div>
                              </form>
                            )}
                          </div>
                        ) : resetCodeValid ? (
                          <div class="max-w-md w-full sm:left-3.5 left-1 relative space-y-8 sm:pb-2 pb-0 pt-4">
                            <div class="sm:px-5 px-1">
                              <img
                                class="mx-auto w-28 sm:left-0 left-[8px] -mt-6 relative"
                                src={logo}
                                alt="Workflow"
                              />

                              <h2 class="mt-0   -top-2 relative text-center md:text-3xl sm:text-2xl text-[22px] mx-5 mr-5 sm:right-2.5 right-1 relative font-extrabold text-gray-900">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-7 relative mr-0.5 inline bottom-[3px] w-7"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>{" "}
                                <span class="inline">Reset Password</span>
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
                                onSubmit={resetPass}
                              >
                                <input
                                  class="text-md"
                                  type="hidden"
                                  name="remember"
                                  id="remember"
                                />
                                <div class="rounded-md relative sm:mb-0 sm:w-full w-[117%] sm:right-0 right-[6%] -mb-4 block -space-y-px ">
                                  <div>
                                    <p class="text-sm text-gray-700 text-center relative -mt-1.5 mb-3 uppercase font-semibold underline">
                                      Enter New Password
                                    </p>

                                    <label for="reset-code" class="sr-only">
                                      Enter New Password
                                    </label>
                                    <input
                                      id="reset-code"
                                      name="reset-code"
                                      type="text"
                                      onChange={handleChangePassNew}
                                      required
                                      class={`appearance-none rounded-none border-gray-300 relative block sm:w-[90%] sm:shadow-none shadow-sm w-[86%] sm:right-0 right-[1px] mx-auto px-2 py-1 mb-3 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md`}
                                      placeholder="Enter new password"
                                    />
                                  </div>
                                </div>

                                <div class=" w-fit relative sm:left-0 left-[7px] mx-auto block">
                                  <div class="mt-2 grid grid-cols-3 gap-4 relative sm:w-full w-[175px] mx-auto  justify-center py-1 pb-1.5 sm:px-4 ">
                                    <button
                                      onClick={() => {
                                        setForgot(false);
                                        setResetCodeSent(false);
                                        setResetCodeValid(false);
                                      }}
                                      class="mt-3 sm:col-span-1 col-span-3 text-md  group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      class="sm:mt-3 -mt-1 text-md  sm:col-span-2 col-span-3 group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </form>
                            )}
                          </div>
                        ) : resetCodeSent ? (
                          <div class="max-w-md w-full sm:left-3.5 left-1 relative space-y-8 sm:pb-2 pb-0 pt-4">
                            <div class="sm:px-5 px-1">
                              <img
                                class="mx-auto w-28 sm:left-0 left-[8px] -mt-6 relative"
                                src={logo}
                                alt="Workflow"
                              />

                              <h2 class="mt-0   -top-2 relative text-center md:text-3xl sm:text-2xl text-[22px] mx-5 mr-5 sm:right-2.5 right-1 relative font-extrabold text-gray-900">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-7 relative mr-0.5 inline bottom-[3px] w-7"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>{" "}
                                <span class="inline">Reset Password</span>
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
                                onSubmit={checkResetCode}
                              >
                                <input
                                  class="text-md"
                                  type="hidden"
                                  name="remember"
                                  id="remember"
                                />
                                <div class="rounded-md relative sm:mb-0 sm:w-full w-[117%] sm:right-0 right-[6%] -mb-4 block -space-y-px ">
                                  {error === "Invalid Code" ? (
                                    <p class="text-red-500 text-center text-md relative bottom-5  pt-1  pb-2 mb-2">
                                      Failed: Invalid/Expired Reset Code
                                    </p>
                                  ) : null}

                                  <div>
                                    <p class="text-sm text-gray-700 text-center relative -mt-1.5 mb-3 uppercase font-semibold underline">
                                      A RESET CODE HAS BEEN MAILED TO YOU
                                    </p>

                                    <label for="reset-code" class="sr-only">
                                      Reset Code
                                    </label>
                                    <input
                                      id="reset-code"
                                      name="reset-code"
                                      type="number"
                                      onChange={handleChangeCode}
                                      required
                                      class={`appearance-none rounded-none border-gray-300 relative block sm:w-[90%] ${
                                        error === "Invalid Code"
                                          ? "bg-orange-100 text-orange-300 border-orange-300 border-2"
                                          : "border-gray-300"
                                      } sm:shadow-none shadow-sm w-[86%] sm:right-0 right-[1px] mx-auto px-2 py-1 mb-3 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md`}
                                      placeholder="Enter Reset Code"
                                    />
                                  </div>
                                </div>

                                <div class=" w-fit relative sm:left-0 left-[7px] mx-auto block">
                                  <div class="mt-2 grid grid-cols-3 gap-4 relative  sm:w-full w-[175px] mx-auto  justify-center py-1 pb-1.5 sm:px-4 ">
                                    <button
                                      onClick={() => setForgot(false)}
                                      type="button"
                                      class="mt-3 sm:col-span-1 col-span-3 group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      class="sm:mt-3 -mt-1  sm:col-span-2 col-span-3 group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </form>
                            )}
                          </div>
                        ) : (
                          <div class="max-w-md w-full sm:left-3.5 left-1 relative space-y-8 sm:pb-2 pb-0 pt-4">
                            <div class="sm:px-5 px-1">
                              <img
                                class="mx-auto w-28 sm:left-0 left-[8px] -mt-6 relative"
                                src={logo}
                                alt="Workflow"
                              />

                              <h2 class="mt-0   -top-2 relative text-center md:text-3xl sm:text-2xl text-[22px] mx-5 sm:mr-5 mr-1 sm:right-2.5 right-1 relative font-extrabold text-gray-900">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-7 relative mr-0.5 inline bottom-[3px] w-7"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>{" "}
                                <span class="inline">Reset Password</span>
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
                                <div class="rounded-md relative sm:mb-3 sm:w-full w-[117%] sm:right-0 right-[6%] -mb-1 block -space-y-px ">
                                  {error === "User Email ID not found" ? (
                                    <p class="text-red-500 text-center text-md relative bottom-3 mt-2 pt-3 pb-2 mb-2">
                                      Login Failed: User Mail Not Found
                                    </p>
                                  ) : null}

                                  <div>
                                    <p class="text-sm text-gray-700 text-center relative -mt-1.5 mb-3 uppercase font-semibold underline">
                                      Enter Email ID:
                                    </p>
                                    <label for="email" class="sr-only">
                                      Enter Email-ID
                                    </label>
                                    <input
                                      id="email"
                                      name="email"
                                      type="email"
                                      onChange={handleChangeMailReset}
                                      required={true}
                                      class={`appearance-none rounded-none border-gray-300 ${
                                        error === "User Email ID not found"
                                          ? "bg-orange-100 text-orange-300 border-orange-300 border-2"
                                          : "border-gray-300"
                                      } relative block sm:w-[90%] sm:shadow-none shadow-sm w-[200px] sm:right-0 right-[1px] mx-auto px-2 py-1 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md`}
                                      placeholder="Enter Registered Email"
                                    />
                                  </div>
                                </div>

                                <div class=" w-fit relative sm:left-0 left-[7px] mx-auto block">
                                  <div class="mt-2 grid grid-cols-3 gap-4 relative  sm:w-full w-[175px] mx-auto  justify-center py-1 pb-1.5 sm:px-4 ">
                                    <button
                                      onClick={() => setForgot(false)}
                                      type="button"
                                      class="mt-3 sm:col-span-1 col-span-3 group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={sendResetCode}
                                      type="button"
                                      class="sm:mt-3 -mt-1  sm:col-span-2 col-span-3 group relative sm:left-0 left-[3px] sm:w-full w-[150px] mx-auto sm:right-0 right-[2px] flex justify-center py-1 pb-1 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </form>
                            )}
                          </div>
                        )
                      ) : (
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
                                ) : error === "Incorrect password" ? (
                                  <p class="text-red-500 text-center text-md relative bottom-3 mt-4 pt-3 pb-2 mb-2">
                                    Login Failed: Incorrect Password
                                  </p>
                                ) : error === "Sign in with Google..." ? (
                                  <p class="text-red-500 text-center text-md relative bottom-3 mt-2 pt-3 pb-2 mb-2">
                                    Login Failed: Must Sign-in With Google
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
                                    value={studentUser.email}
                                    required
                                    class={`appearance-none rounded-none ${
                                      error === "User not found"
                                        ? "bg-orange-100 text-orange-300 border-orange-300 border-2"
                                        : "border-gray-300"
                                    } relative block sm:w-full sm:shadow-none shadow-sm w-[86%] sm:right-0 right-[1px] mx-auto px-2 py-1 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md`}
                                    placeholder="Email address"
                                  />
                                </div>
                                <div>
                                  <label for="password" class="sr-only">
                                    Password
                                  </label>
                                  <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={studentUser.password}
                                    required
                                    class={`${
                                      error === "Incorrect password"
                                        ? "bg-orange-100 text-orange-300 border-orange-300 border-2"
                                        : "border-gray-300"
                                    } appearance-none rounded-none sm:shadow-none shadow-sm relative block sm:w-full w-[86%] sm:right-0 right-[1px] mx-auto px-2 mb-12 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-md`}
                                    placeholder="Password"
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

                                <div class="text-sm sm:inline sm:left-0 left-[13px] ml-[3px] relative hidden">
                                  <a
                                    onClick={() => {
                                      setForgot(true);
                                    }}
                                    class="font-medium cursor-pointer text-blue-600 hover:text-blue-500"
                                  >
                                    Forgot your password?
                                  </a>
                                </div>
                              </div>

                              <div>
                                <button
                                  type="submit"
                                  class="mt-3 group relative sm:left-0 left-[3px] w-full  mx-auto sm:right-0 right-[2px] flex justify-center pt-1 pb-1.5 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

                                <div id="googleSignIn" class="">
                                  <button
                                    type="button"
                                    onClick={() => googleLogin()}
                                    class="md:mr-2.5 text-md font-medium rounded-md w-full  mx-auto px-10 relative h-fit pt-1.5 pb-1.5 justify-center border border-gray-300 shadow-sm bg-white text-lg  text-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  mt-3 mb-3  sm:text-md"
                                  >
                                    <FcGoogle class="w-6 h-6 mr-2.5 -ml-1 inline relative bottom-[1px]" />
                                    Sign in with Google
                                  </button>
                                </div>

                                <div class="text-sm sm:left-0 left-[3px] relative sm:hidden block mt-3 mb-2.5">
                                  <a
                                    onClick={() => {
                                      setForgot(true);
                                    }}
                                    class="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    Forgot your password?
                                  </a>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
                      )}
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

export default LogModal;
