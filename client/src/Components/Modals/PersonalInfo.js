import { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import userContext from "../../context/userContext";
// import ClipLoader from "react-spinners/ClipLoader";

import { FcGoogle } from "react-icons/fc";
import { AiFillLinkedin } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";

const PersonalInfo = (props) => {
  const currentUser = useContext(userContext);

  const [studentUser, setStudentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (props.loading) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [props.loading]);

  useEffect(() => {
    console.log(props);
    if (props.userDetails !== null && props.userDetails.fullName != null) {
      setLoading(true);
      let obj = {
        firstName: props.userDetails.fullName.split(" ")[0],
        lastName: props.userDetails.fullName.split(" ")[1],
        email: props.userDetails.email,
        projId: props.userDetails.projId,
        requiredUniqueCode: props.userDetails.uniqueCode,
        role: props.userDetails.role,
        uniqueCode: 0,
      };
      setStudentUser({
        ...studentUser,
        ...obj,
        additionalMember: true,
      });
      setLoading(false);
    }
  }, [props]);

  const history = useRouter();

  const handleChange = (e) => {
    setStudentUser({
      ...studentUser,
      [e.target.name]: e.target.value,
    });
  };
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError();
    // props.isLoading();
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/register"
          : "http://localhost:4000/api/user/register",

        studentUser
      )
      .then((res) => {
        sessionStorage.setItem("token", res.data.userToken);
        currentUser.setUser(res.data.user);
        history.push("/onboarding");
        props.close();
        setLoading(false);
        // props.isNotLoading();
      })
      .catch((err) => {
        setError(
          err && err.response
            ? err.response.data
              ? err.response.data
              : err.response
            : null
        );
        setLoading(false);
        // props.isNotLoading();
      });
  };

  const completeGoogleSignUp = (tokenResponse, obj) => {
    setLoading(true);

    console.log("here");

    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/registerWithGoogle"
          : "http://localhost:4000/api/user/registerWithGoogle",
        {
          oauthObj: tokenResponse,
          ...obj,
        }
      )
      .then((res) => {
        sessionStorage.setItem("token", res.data.userToken);
        currentUser.setUser(res.data.user);
        history.push("/onboarding");
        props.close();
        setLoading(false);
        props.isNotLoading();
      })
      .catch((err) => {
        console.log(err.response);
        setError(
          err && err.response
            ? err.response.data
              ? err.response.data
              : "Error..."
            : null
        );
        setLoading(false);
      });
  };

  const [googleRequireUC, setGoogleRequireUC] = useState(false);
  const [objPassed, setObjPassed] = useState({});
  const [tokenResponsePassed, setTokenResponsePassed] = useState({});

  const googleSignUp = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setError();
      let obj = {};
      if (props.userDetails !== null && props.userDetails.fullName) {
        console.log(props.userDetails);
        setObjPassed({
          projId: props.userDetails.projId,
          requiredUniqueCode: props.userDetails.uniqueCode,
          role: props.userDetails.role,
          uniqueCode: null,
          additionalMember: true,
        });
        setTokenResponsePassed(tokenResponse);
        setGoogleRequireUC(true);
      } else {
        console.log(tokenResponse, obj);
        completeGoogleSignUp(tokenResponse, obj);
      }
    },
    onError: (error) => {
      setError("Google login failed..");
      console.log(error);
    },
  });

  return (
    <div class="mt-10 sm:mt-0 relative mx-auto block justify-center">
      <div class={`md:grid md:grid-cols-3 w-full mx-auto block md:gap-6`}>
        <div class="md:col-span-1 ">
          <div
            class={`  md:left-0  xl:bottom-5 bottom-9 ${
              googleRequireUC
                ? "xl:-mt-[145px] lg:-mt-[120px] md:-mt-[120px] sm:mt-[44px] mt-[79px] sm:px-3 px-8 "
                : "md:mt-0 sm:mt-[44px] mt-[79px] px-8 sm:px-3"
            } sm:left-3 left-4 relative mr-3`}
          >
            <h3
              class={`  ${
                loading &&
                props.userDetails != null &&
                props.userDetails.fullName
                  ? "xl:mt-[280px] md:mt-24 sm:-mt-3 -mt-10 "
                  : loading
                  ? "xl:mt-28 md:mt-24 sm:-mt-3 -mt-10 "
                  : props.userDetails != null && props.userDetails.fullName
                  ? "-mt-10 sm:-mt-4 md:mt-[170px]"
                  : "-mt-10 sm:-mt-4 md:mt-[110px]"
              } md:mb-0 mb-4 relative  md:left-0 sm:left-1.5 left-1   lg:text-3xl md:text-2xl text-3xl font-bold text-gray-900 text-center`}
            >
              Create Your Account
            </h3>
            <p class="text-sm leading-6 mt-8 text-gray-500 uppercase font-semibold text-center">
              Join The Movement
            </p>
            <p class="xl:mt-8 mt-6 md:mb-0 -mb-7 text-sm text-gray-600 xl:px-14 lg:px-6 sm:px-2 px-0.5 text-center">
              Safe and Secure.
              <br />
              <br /> We value the protection of your personal data above all
              else.
            </p>
          </div>
        </div>
        <div
          class={`mt-5 -mr-12 pr-12 ${
            googleRequireUC ? "xl:mt-3 lg:mt-6 md:mt-5" : "md:mt-0"
          } md:left-0 sm:left-1.5 left-3 relative md:col-span-2`}
        >
          <form id="regForm" onSubmit={handleSubmit}>
            <div class="shadow overflow-hidden sm:rounded-md">
              <div
                class={`px-3 sm:py-2 sm:pt-6 pt-5 pb-7 sm:pb-7 bg-gradient-to-r from-indigo-200 to-blue-200  sm:p-6`}
              >
                {loading ? (
                  <div class="relative mx-auto my-8 mb-14  mt-40 sm:pb-3 pb-0 sm:mr-0 md:mr-0.5 pt-1.5 sm:left-0  text-center sm:top-[50%] top-[65%] translate-y-[-50%] block justify-center">
                    {/* <ClipLoader color={"#0b0bbf"} loading={loading} size={70} /> */}
                  </div>
                ) : (
                  <>
                    {error !== null && error ? (
                      <p class="xl:text-center font-bold uppercase text-sm  xl:mb-6 mb-6 text-red-600">
                        <span class="black underline mr-1 text-black font-semibold">
                          Error:
                        </span>{" "}
                        {error ? error : ""}
                      </p>
                    ) : (
                      ""
                    )}

                    <div class="grid grid-cols-6 -mt-1 mb-1 gap-6">
                      {googleRequireUC ? (
                        <>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="first-name"
                              class="block text-sm font-semibold left-0.5 text-gray-700"
                            >
                              Unique Join Code <br /> (sent by email)
                            </label>
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="uniqueCode"
                              min={10000}
                              max={99999}
                              id="googleUniqueCode"
                              defaultValue={null}
                              value={studentUser.uniqueCode}
                              class="mt-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="city"
                              class="block text-sm font-semibold left-0.5 text-gray-700"
                            >
                              Your Role <br /> (in your startup)
                            </label>
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="role"
                              id="googleUserRole"
                              value={studentUser.role}
                              class="mt-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="first-name"
                              class="block text-sm font-semibold left-0.5 text-gray-700"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="firstName"
                              min={2}
                              id="first-name"
                              value={studentUser.firstName}
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="city"
                              class="block text-sm font-semibold left-0.5 text-gray-700"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="lastName"
                              id="last-name"
                              value={studentUser.lastName}
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          {props.userDetails !== null &&
                          props.userDetails.fullName ? (
                            <>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="first-name"
                                  class="block text-sm font-semibold left-0.5 text-gray-700"
                                >
                                  Unique Join Code (sent to you by email)
                                </label>
                                <input
                                  type="text"
                                  required
                                  onChange={handleChange}
                                  name="uniqueCode"
                                  min={10000}
                                  max={99999}
                                  id="first-name"
                                  value={studentUser.uniqueCode}
                                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="city"
                                  class="block text-sm font-semibold left-0.5 text-gray-700"
                                >
                                  Your Role (in your startup)
                                </label>
                                <input
                                  type="text"
                                  required
                                  onChange={handleChange}
                                  name="role"
                                  id="last-name"
                                  value={studentUser.role}
                                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </>
                          ) : (
                            ""
                          )}

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="email-address"
                              class="block text-sm font-semibold left-0.5 text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              required
                              onChange={handleChange}
                              name="email"
                              id="email-address"
                              autocomplete="email"
                              value={studentUser.email}
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 bg-white   shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="city"
                              class="block text-sm font-semibold left-0.5 text-gray-700"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              required={true}
                              onChange={handleChange}
                              name="password"
                              id="city"
                              value={studentUser.password}
                              autocomplete="password"
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div class="px-4 py-1 bg-gray-50 sm:px-6 text-center">
                {googleRequireUC ? (
                  <>
                    <button
                      onClick={() => {
                        completeGoogleSignUp(tokenResponsePassed, {
                          ...objPassed,
                          uniqueCode:
                            document.getElementById("googleUniqueCode").value,
                          role: document.getElementById("googleUserRole").value,
                        });
                      }}
                      type="button"
                      class="md:mr-2.5 mx-auto px-16 relative h-fit py-2.5 sm:w-[450px] w-full justify-center rounded-md border border-gray-300 shadow-sm bg-white text-lg font-semibold text-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  mt-3 mb-3  sm:text-md"
                    >
                      <FcGoogle class="w-6 h-6 mr-2.5 -ml-1 inline relative bottom-[1px]" />
                      Complete Registration
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      class="md:mr-2.5 mx-auto px-16 relative h-12 w-full justify-center rounded-md border border-gray-300 shadow-sm py-1 bg-white text-lg font-semibold text-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:ring-indigo-500  mt-3 mb-[13px] sm:w-auto sm:text-md"
                    >
                      Register
                    </button>
                    <br />
                    OR
                    <br />
                    <button
                      onClick={() => {
                        googleSignUp();
                      }}
                      type="button"
                      class="md:mr-2.5 mx-auto px-16 relative h-fit py-2.5 sm:w-[340px] w-full justify-center rounded-md border border-gray-300 shadow-sm bg-white text-lg font-semibold text-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  mt-3 mb-3  sm:text-md"
                    >
                      <FcGoogle class="w-6 h-6 mr-2.5 -ml-1 inline relative bottom-[1px]" />
                      Sign up with Google
                    </button>
                    {/* <br />
                <button
                  type="button"
                  class="md:mr-2.5 mx-auto px-16 relative h-12 sm:w-[340px] w-full justify-center rounded-md border border-gray-300 shadow-sm py-1 bg-white text-lg font-semibold text-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  mb-3  sm:text-md"
                >
                  <AiFillLinkedin class="w-6 h-6 mr-2.5 -ml-1 inline relative bottom-[1px]" />
                  Sign up with Linkedin
                </button> */}
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
