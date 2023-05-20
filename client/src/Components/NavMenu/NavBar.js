import {
  useState,
  useRef,
  useEffect,
  Fragment,
  useContext,
  lazy,
  Suspense,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import logo from "./logo.png";
import { Popover, Transition } from "@headlessui/react";

import AOS from "aos";
import "aos/dist/aos.css";

import React from "react";
import ReactGA from "react-ga";

import userContext from "../../context/userContext";
import mentorAccContext from "../../context/mentorAccContext";

const LogModal = lazy(() => import("../Modals/LogModal"));
const RegModal = lazy(() => import("../Modals/RegModal"));
const ExitModal = lazy(() => import("../Modals/ExitModal"));
const SideModal = lazy(() => import("../Modals/SideModal"));
const NotifModal = lazy(() => import("../Modals/NotifModal"));

const NavBar = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 650,
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [logModalShow, setLogModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);
  const [exitModalShow, setExitModalShow] = useState(false);

  const closeFuncLog = () => {
    setLogModalShow(false);
  };
  const closeFuncReg = () => {
    setRegModalShow(false);
  };
  const closeFuncOut = () => {
    setExitModalShow(false);
  };
  const closeFuncSide = () => {
    setIsSideMenuOpen(false);
  };

  const closeFuncNotif = () => {
    setIsNotifOpen(false);
  };

  const history = useHistory();

  const user = useContext(userContext).user;
  const mentor = useContext(mentorAccContext).mentor;

  const showModalLog = () => {
    if (localStorage.getItem("cookieID") !== null) {
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/checkCookie"
            : "http://localhost:4000/api/user/checkCookie",
          { cookieString: localStorage.getItem("cookieID") }
        )
        .then((res) => {
          if (res.data !== "Invalid Token" && res.data.isValid) {
            sessionStorage.setItem("token", res.data.userToken);
            props.loginFunc(res.data.user);
            ReactGA.event({
              category: "Log In",
              action: "Logged In",
              label: "Cookie Login",
            });
            history.push("/profile");
          } else {
            setLogModalShow(true);
          }
        })
        .catch((err) => {
          console.log(err.response);
          setLogModalShow(true);
        });
    } else {
      setLogModalShow(true);
    }
  };

  const showModalReg = () => {
    setRegModalShow(true);
  };
  const showModalOut = () => {
    setExitModalShow(true);
  };

  const location = useLocation();
  const [pathParams, setPathParams] = useState();

  useEffect(() => {
    const pathParamArr = [...location.pathname.split("/")];
    pathParamArr.shift();
    pathParamArr.forEach((param, i) => {
      pathParamArr[i] = param.replace("project", " Project");
      if (param === "joinrequests") {
        pathParamArr[i] = "My Join Requests";
      } else if (param === "manageapps") {
        pathParamArr[i] = "Manage Applications";
      } else if (param === "mentorinfo") {
        pathParamArr[i] = "Mentor Info";
      } else if (param === "tasksandresources") {
        pathParamArr[i] = "Tasks and Resources";
      } else if (param === "bookworkshops") {
        pathParamArr[i] = "Book Workshops";
      } else if (param === "mentorProfile") {
        pathParamArr[i] = "Mentor Profile";
      } else if (param === "startupmentorship") {
        pathParamArr[i] = "Startup Mentorship";
      } else if (param === "yourstartup") {
        pathParamArr[i] = "Mentee Startup";
      } else if (param === "startupinfo") {
        pathParamArr[i] = "Startup Info";
      } else if (
        param === "admin-operations-passcode-IdeaStackOperations300305"
      ) {
        pathParamArr[i] = "Secret Operations";
      } else if (param === "viewProfile") {
        pathParamArr[i] = "View Profile";
      } else if (param === "yourmentor") {
        pathParamArr[i] = "Your Mentor";
      }
    });

    setPathParams(pathParamArr);
    if (pathParamArr[1] !== "manage Project") {
      sessionStorage.removeItem("managing");
    }
  }, [location.pathname]);

  // const closeFuncAbout = () => {setAboutModalShow(false)}
  // const closeFuncContact = () => {setContactModalShow(false)}

  const buttonRef1 = useRef();
  const buttonRef2 = useRef();

  const myRef = useRef();

  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!myRef.current || myRef.current.contains(event.target)) {
          return;
        }
        setIsMenuOpen(false);
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

  const resources = [
    {
      name: "About Us",
      description: "What is IdeaStack? What do we do?",
      icon: BookmarkAltIcon,
      action: "about",
      doc: "about",
    },
    {
      name: "Features",
      description: "Why IdeaStack? How do we help you?",
      icon: MenuIcon,
      action: "features",
      doc: "features",
    },
    {
      name: "Partners",
      description:
        "Organizations that have recognized, supported and enabled us.",
      icon: SupportIcon,
      action: "partners",
      doc: "partners",
    },
    {
      name: "Contact",
      description: "Get in touch with us",
      icon: PhoneIcon,
      action: "contact",
      doc: "contact",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return [curtop];
    }
  }
  const callsToAction = [
    // { name: 'Our Team', href: '#', icon: UserGroupIcon , action: 'contact' },
  ];

  return (
    <div class="z-50">
      {logModalShow ? (
        <Suspense>
          <LogModal close={closeFuncLog} logFunc={props.loginFunc} />
        </Suspense>
      ) : (
        ""
      )}
      {regModalShow ? (
        <Suspense>
          <RegModal close={closeFuncReg} />
        </Suspense>
      ) : (
        ""
      )}
      {exitModalShow ? (
        <Suspense>
          <ExitModal close={closeFuncOut} />
        </Suspense>
      ) : (
        ""
      )}
      {isNotifOpen ? (
        <Suspense>
          <NotifModal close={closeFuncNotif} />{" "}
        </Suspense>
      ) : (
        ""
      )}
      {isSideMenuOpen ? (
        <Suspense>
          <SideModal close={closeFuncSide} />{" "}
        </Suspense>
      ) : (
        ""
      )}

      <div
        class={`mx-auto w-screen lg:px-20 md:px-32 px-10 shadow-lg md:h-fit ${
          sessionStorage.getItem("token") === null &&
          sessionStorage.getItem("mentorToken") === null
            ? "sm:h-[105px]"
            : "sm:h-[142px]"
        } relative sm:fixed h-[90px] bg-white  z-[80] `}
      >
        <div class="relative flex items-center justify-between">
          <a
            onClick={() => {
              if (
                !location.pathname.split("/").includes("teamonboarding") &&
                !location.pathname === "/mentor" &&
                !location.pathname === "/mentor/"
              ) {
                history.push("/");
              }
            }}
            aria-label="Company"
            title="Company"
            class={`inline-flex items-center ${
              location.pathname.split("/").includes("teamonboarding") ||
              location.pathname === "/mentor" ||
              location.pathname === "/mentor/"
                ? "mx-auto"
                : "cursor-pointer"
            } `}
          >
            <img
              data-aos={"fade-left"}
              data-aos-once="true"
              src={logo}
              className={
                location.pathname.split("/").includes("teamonboarding") ||
                location.pathname === "/mentor" ||
                location.pathname === "/mentor/"
                  ? `lg:w-40   lg:py-0 py-6 pb-8  lg:top-[41px]  top-[34px] 
                     md:w-32 w-28 sm:top-[38px]
                 relative block  mx-auto text-center -mt-16`
                  : `lg:w-40   lg:py-0 py-6 pb-8  lg:top-[41px] sm:top-[36px]  top-[34px] ${
                      sessionStorage.getItem("token") === null &&
                      sessionStorage.getItem("mentorToken") === null
                        ? "md:-left-[96px] md:w-32 w-28 sm:top-[40px]"
                        : "md:-left-[120px] sm:visible invisible  md:top-[30px] w-28 md:w-[123px] md:mb-[7px] lg:mb-0 sm:top-[30px]"
                    } xl:-left-10 lg:-left-12  -left-[10px] relative block  -mt-16 lg:top-10`
              }
            />
          </a>
          {sessionStorage.getItem("token") === null &&
          sessionStorage.getItem("mentorToken") === null ? (
            location.pathname.split("/").includes("teamonboarding") ||
            location.pathname === "/mentor" ||
            location.pathname === "/mentor/" ? (
              <></>
            ) : (
              <ul class="items-center space-x-10 py-8 top-0.5 relative  lg:flex left-2 xl:-left-[310px] lg:-left-[177px] hidden uppercase">
                <Popover.Group
                  data-aos={"fade-left"}
                  data-aos-once="true"
                  as="nav"
                  className="hidden md:flex space-x-10"
                >
                  <span
                    className={classNames(
                      `group font-semibold text-sm tracking-wide ${
                        location.pathname.includes("home")
                          ? "text-indigo-600"
                          : "text-gray-700"
                      } transition-colors cursor-pointer duration-200 hover:text-indigo-500  bg-white px-2 pr-1 py-[2px] top-[1px]  rounded-md inline-flex items-center  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
                    )}
                    onClick={() => {
                      history.push("/home");
                    }}
                  >
                    HOME
                  </span>
                  <Popover className="relative  block">
                    {({ open }) => (
                      <>
                        <Popover.Button>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-600" : "text-gray-400",
                              "-ml-[36px] relative top-[3px] mr-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel
                            ref={buttonRef1}
                            className="absolute z-20  left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0"
                          >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {resources.map((item) => (
                                  <a
                                    key={item.name}
                                    onClick={() => {
                                      history.push("/home");
                                      open = false;
                                      setTimeout(() => {
                                        window.scroll(
                                          0,
                                          findPos(
                                            document.getElementById(item.doc)
                                          ) - 70
                                        );
                                      }, 300);
                                    }}
                                    className="-m-3 p-3 flex hover:cursor-pointer items-start rounded-lg hover:bg-gray-50"
                                  >
                                    <item.icon
                                      className="flex-shrink-0 h-6 w-6 top-[1px] relative -mr-1.5 text-indigo-600"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm normal-case text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                              <div className="px-5 py-1 bg-gray-200 sm:px-8 sm:py-8">
                                <div>
                                  {callsToAction.map((item) => (
                                    <div key={item.name} className="flow-root">
                                      <a className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                                        <item.icon
                                          className="flex-shrink-0 h-6 w-6 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-3">
                                          {item.name}
                                        </span>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>

                {/* <li
                data-aos={"fade-left"}
                data-aos-once="true"
                data-aos-delay="200"
              >
                <a
                  onClick={() => {
                    history.push("/team");
                  }}
                  aria-label="About us"
                  title="About us"
                  class="font-semibold tracking-wide  right-[7px] relative text-gray-700 transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer"
                >
                  Team
                </a>
              </li> */}
                <li
                  data-aos={"fade-left"}
                  data-aos-once="true"
                  data-aos-delay="400"
                >
                  <a
                    onClick={() => {
                      history.push("/whyus");
                    }}
                    aria-label="Features"
                    title="Features"
                    class={`font-semibold text-sm tracking-wide ${
                      location.pathname.includes("whyus")
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }  right-1.5 relative transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer`}
                  >
                    Why Us
                  </a>
                </li>
              </ul>
            )
          ) : (
            <nav class="flex" aria-label="Breadcrumb">
              <ol
                class={`items-center space-x-0 absolute ${
                  sessionStorage.getItem("mentorToken")
                    ? "xl:left-[200px] lg:left-[200px] left-[70px]"
                    : "xl:left-[180px] lg:left-[180px] left-[50px]"
                } xl:mr-0 -mr-16   md:top-[74px] sm:top-[93px] lg:top-[32px] ${
                  location.pathname === "/onboarding"
                    ? "hidden"
                    : "sm:inline-flex hidden"
                } mx-auto md:right-0 right-14 md:mt-0.5 md:space-x-0 lg:space-x-3`}
              >
                <li class="inline-flex items-center">
                  <a
                    onClick={() => {
                      history.push("/");
                    }}
                    class="inline-flex items-center lg:text-md text-sm font-medium text-gray-700 hover:cursor-pointer hover:text-gray-900 "
                  >
                    <svg
                      class="relative lg:w-6 w-5 lg:h-6 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                  </a>
                </li>

                {pathParams &&
                  pathParams.map((pathParam, i) => {
                    const param =
                      pathParam.charAt(0).toUpperCase() + pathParam.slice(1);
                    const isLastParam =
                      i === pathParams.length - 1 ? true : false;
                    pathParam = pathParam.replace(" ", "");
                    if (pathParam === "MyJoinRequests") {
                      pathParam = "joinrequests";
                    } else if (pathParam === "ManageApplications") {
                      pathParam = "manageapps";
                    } else if (pathParam === "MenteeStartup") {
                      pathParam = "yourstartup";
                    } else if (pathParam === "SecretOperations") {
                      pathParam =
                        "admin-operations-passcode-IdeaStackOperations300305";
                    } else if (pathParam === "ViewProfile") {
                      pathParam = "viewProfile";
                    }
                    return (
                      <li>
                        <div class="flex items-center">
                          <svg
                            class="w-7 h-7 mt-0.5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <a
                            onClick={() => {
                              history.push(
                                location.pathname.substring(
                                  0,
                                  location.pathname.indexOf(
                                    pathParam.replace(" ", "").toLowerCase()
                                  ) +
                                    pathParam.length +
                                    1
                                )
                              );
                            }}
                            class={`lg:ml-1 ml-[2px] top-0.5 hover:cursor-pointer lg:text-md text-sm font-medium ${
                              isLastParam ? "text-gray-900" : "text-gray-500"
                            } md:ml-[1px]`}
                          >
                            {param}
                          </a>
                        </div>
                      </li>
                    );
                  })}
              </ol>

              {location.pathname === "/onboarding" ||
              location.pathname.includes("viewProfile") ? (
                ""
              ) : sessionStorage.getItem("mentorToken") ? (
                <>
                  <li
                    class="xl:block hidden text-sm relative uppercase  top-[1px] xl:ml-[300px] ml-[300px] mr-9"
                    data-aos={"fade-left"}
                    data-aos-once="true"
                    data-aos-delay="300"
                  >
                    <a
                      onClick={() => {
                        history.push("/mentorProfile");
                      }}
                      aria-label="About us"
                      title="About us"
                      class={`font-semibold tracking-wide  right-[7px] relative ${
                        location.pathname.split("/").includes("mentorProfile")
                          ? "text-indigo-700"
                          : "text-gray-700"
                      } transition-colors duration-200  hover:text-indigo-500 hover:cursor-pointer`}
                    >
                      Profile
                    </a>
                  </li>

                  <li
                    class="xl:block hidden text-sm   uppercase  top-[1px] -mr-[680px]"
                    data-aos={"fade-left"}
                    data-aos-once="true"
                    data-aos-delay="500"
                  >
                    <a
                      onClick={() => {
                        history.push("/startupmentorship");
                      }}
                      aria-label="Features"
                      title="Features"
                      class={`font-semibold tracking-wide ${
                        location.pathname
                          .split("/")
                          .includes("startupmentorship")
                          ? "text-indigo-700"
                          : "text-gray-700"
                      }   right-1.5 relative transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer`}
                    >
                      MENTORSHIP
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li
                    class="xl:block hidden text-sm relative uppercase  top-[1px] xl:ml-[190px] ml-[190px] mr-9"
                    data-aos={"fade-left"}
                    data-aos-once="true"
                    data-aos-delay="300"
                  >
                    <a
                      onClick={() => {
                        history.push("/profile");
                      }}
                      aria-label="About us"
                      title="About us"
                      class={`font-semibold tracking-wide  right-[7px] relative ${
                        location.pathname.split("/").includes("profile")
                          ? "text-indigo-700"
                          : "text-gray-700"
                      } transition-colors duration-200  hover:text-indigo-500 hover:cursor-pointer`}
                    >
                      Profile
                    </a>
                  </li>
                  <li
                    class="xl:block hidden text-sm  uppercase  top-[1px] mr-9"
                    data-aos={"fade-left"}
                    data-aos-once="true"
                    data-aos-delay="400"
                  >
                    <a
                      onClick={() => {
                        history.push("/dashboard");
                      }}
                      aria-label="Features"
                      title="Features"
                      class={`font-semibold tracking-wide ${
                        location.pathname.split("/").includes("dashboard")
                          ? "text-indigo-700"
                          : "text-gray-700"
                      }  right-1.5 relative transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer`}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li
                    class="xl:block hidden text-sm   uppercase  top-[1px] -mr-[510px]"
                    data-aos={"fade-left"}
                    data-aos-once="true"
                    data-aos-delay="500"
                  >
                    <a
                      onClick={() => {
                        history.push("/mentorship");
                      }}
                      aria-label="Features"
                      title="Features"
                      class={`font-semibold tracking-wide ${
                        location.pathname.split("/").includes("mentorship")
                          ? "text-indigo-700"
                          : "text-gray-700"
                      }   right-1.5 relative transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer`}
                    >
                      MENTORSHIP
                    </a>
                  </li>
                  {/* <li
                    class="xl:block hidden text-sm  uppercase  top-[1px] -mr-[490px]"
                    data-aos={"fade-left"}
                    data-aos-once="true"
                    data-aos-delay="400"
                  >
                    <a
                      onClick={() => {
                        history.push("/browse");
                      }}
                      aria-label="Features"
                      title="Features"
                      class={`font-semibold tracking-wide ${
                        location.pathname.split("/").includes("browse")
                          ? "text-indigo-700"
                          : "text-gray-700"
                      }   right-1.5 relative transition-colors duration-200 hover:text-indigo-500 hover:cursor-pointer`}
                    >
                      Search Projects
                    </a>
                  </li> */}
                </>
              )}
            </nav>
          )}
          <div className="flex items-center justify-end  w-0 xl:left-[280px] lg:left-[220px] md:left-[210px] sm:left-[20px] left-[80px] md:bottom-0 sm:bottom-3 bottom-2 mt-0.5 md:mt-0 ml-1 relative">
            {sessionStorage.getItem("token") === null &&
            sessionStorage.getItem("mentorToken") === null ? (
              location.pathname.split("/").includes("teamonboarding") ||
              location.pathname === "/mentor" ||
              location.pathname === "/mentor/" ? (
                <></>
              ) : (
                <>
                  <a
                    href="#"
                    onClick={showModalLog}
                    className="uppercase whitespace-nowrap text-sm xl:-left-[306px] lg:-left-[210px] relative  tracking-wide lg:block hidden font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Sign in
                  </a>
                  <a
                    onClick={() => {
                      if (location.pathname.includes("/signup")) {
                        setRegModalShow(true);
                      } else {
                        history.push("/signup");
                      }
                    }}
                    className="uppercase cursor-pointer ml-5 text-sm left-1.5 xl:-left-72 lg:-left-48 relative whitespace-nowrap inline-flex items-center justify-center lg:block hidden lg:px-3 px-2 py-2  border border-transparent rounded-md shadow-sm hover:shadow-md  tracking-wide font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-indigo-400 hover:to-indigo-600 active:bg-blue-500"
                  >
                    Sign up
                  </a>
                </>
              )
            ) : location.pathname === "/viewProfile" ? (
              <>
                <a
                  onClick={() => {
                    localStorage.removeItem("viewToken");
                    window.close();
                  }}
                  className="sm:ml-5 mx-auto whitespace-nowrap order-2 lg:left-0 sm:left-[135px]  md:left-8  lg:bottom-0 md:bottom-2.5 sm:-bottom-2  relative inline-flex uppercase items-center justify-center lg:px-3 sm:px-2 px-2.5 py-2 md:pb-2.5 sm:py-2 pt-1.5 pb-2  border border-transparent rounded-md shadow-sm text-base   font-semibold hover:cursor-pointer hover:shadow-lg  text-white bg-gradient-to-r from-blue-300 to-blue-500 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 inline mr-1.5 top-[0.03px] relative"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                  <span class="inline">GO BACK</span>
                </a>
              </>
            ) : (
              <>
                {location.pathname === "/onboarding" ? (
                  ""
                ) : (
                  <button
                    onClick={() => setIsNotifOpen(true)}
                    type="button"
                    class="relative items-center visible sm:invisible lg:p-3 p-2.5 lg:py-[11px] py-[8px] lg:bottom-0 md:bottom-2.5 sm:-bottom-[7px] -bottom-[1px] xl:-ml-16 -ml-36  xl:right-4 lg:right-[78px] md:-right-7 sm:-right-24 right-[79px]  xl:mr-4 lg:mr-4  text-sm font-medium text-center text-white bg-gradient-to-r from-blue-300 to-blue-500 sm:mr-0  hover:from-indigo-300 hover:to-indigo-500 rounded-lg shadow-sm hover:shadow-xl active:shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-700 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    <span class="sr-only">Notifications</span>
                    <div
                      class={` ${
                        (mentor && mentor.notifications == null) ||
                        (mentor &&
                          mentor.notifications &&
                          mentor.notifications.filter(
                            (notif) => notif.seen === false
                          ).length == 0) ||
                        (user && user.notifications == null) ||
                        (user &&
                          user.notifications &&
                          user.notifications.filter(
                            (notif) => notif.seen === false
                          ).length == 0)
                          ? "hidden"
                          : "inline-flex"
                      } absolute -top-2 order-2 -right-8 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900`}
                    >
                      {(user &&
                        user.notifications &&
                        user.notifications.filter(
                          (notif) => notif.seen === false
                        ).length) ||
                        (mentor &&
                          mentor.notifications &&
                          mentor.notifications.filter(
                            (notif) => notif.seen === false
                          ).length)}
                    </div>
                  </button>
                )}

                <a
                  onClick={() => {
                    showModalOut();
                  }}
                  className="-ml-[80px] text-sm whitespace-nowrap order-3 xl:left-[80px] lg:left-[50px] sm:left-[123px] -left-7 md:left-1  lg:bottom-0 md:bottom-2.5 -bottom-0.5  sm:-bottom-2   relative inline-flex uppercase items-center justify-center lg:px-3 sm:px-2 px-2.5 py-2 md:pb-2.5 sm:py-2 pt-1.5 pb-2  border border-transparent rounded-md shadow-sm hover:shadow-xl active:shadow-sm font-semibold hover:cursor-pointer text-white bg-gradient-to-r from-blue-300 to-blue-500 sm:-mr-6 -mr-5 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-500"
                >
                  Log Out
                </a>
                <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  class="py-0.5 px-1.5 xl:hidden block sm:-bottom-2 -bottom-[1px] md:bottom-2.5 lg:bottom-0  order-1 lg:ml-5 ml-2 mr-2 relative xl:left-6 lg:-left-[38px] sm:left-[40px] md:-left-[84px] -left-[117px] transition duration-200 rounded focus:outline-none focus:shadow-outline hover:from-blue-200 hover:to-indigo-300  hover:bg-gradient-to-r"
                  onClick={() => setIsSideMenuOpen(true)}
                >
                  <svg class="w-9 text-gray-600 sm:top-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                    />
                  </svg>
                </button>

                {location.pathname === "/onboarding" ? (
                  ""
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsNotifOpen(true)}
                    class="relative items-center sm:visible invisible lg:p-2.5 p-2.5 lg:py-[9px] py-[8px] lg:bottom-0 md:bottom-2.5 sm:-bottom-[7px] -bottom-[2px]  xl:right-0 lg:right-[25px] md:right-[92px] sm:-right-[35px] -right-[10px]   xl:mr-4 lg:mr-2  text-sm font-medium text-center text-white bg-gradient-to-r from-blue-300 to-blue-500 sm:mr-0  hover:from-indigo-300 hover:to-indigo-500 rounded-lg shadow-sm hover:shadow-xl active:shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-700 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    <span class="sr-only">Notifications</span>
                    <div
                      class={` ${
                        (mentor && mentor.notifications == null) ||
                        (mentor &&
                          mentor.notifications &&
                          mentor.notifications.filter(
                            (notif) => notif.seen === false
                          ).length == 0) ||
                        (user &&
                          user.notifications &&
                          user.notifications.filter(
                            (notif) => notif.seen === false
                          ).length === 0)
                          ? "hidden"
                          : "inline-flex"
                      } absolute -top-2 xl:-right-2 right-16 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900`}
                    >
                      {(user &&
                        user.notifications &&
                        user.notifications.filter(
                          (notif) => notif.seen === false
                        ).length) ||
                        (mentor && mentor.notifications == null) ||
                        (mentor &&
                          mentor.notifications &&
                          mentor.notifications.filter(
                            (notif) => notif.seen === false
                          ).length)}
                    </div>
                  </button>
                )}
              </>
            )}
          </div>

          {sessionStorage.getItem("token") === null &&
          sessionStorage.getItem("mentorToken") === null &&
          !location.pathname.includes("mentor") ? (
            <div class="lg:hidden">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                class="p-2 py-1.5 md:-mr-14 relative sm:bottom-0 bottom-2 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:from-blue-200 hover:to-indigo-300 hover:bg-gradient-to-r focus:bg-blue-400"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg
                  class={`${
                    sessionStorage.getItem("token") === null &&
                    sessionStorage.getItem("mentorToken") === null
                      ? "w-9"
                      : "w-7"
                  } text-gray-600 sm:top-2`}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div
                  data-aos="zoom-in-down"
                  data-aos-once="true"
                  class="absolute  top-0 z-50 w-screen md:-left-32 sm:-left-10 -left-10"
                >
                  <div
                    ref={myRef}
                    class="p-5 bg-white border rounded shadow-xl z-50"
                  >
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <a
                          href="/"
                          aria-label="Company"
                          title="Company"
                          class="inline-flex items-center mb-5"
                        >
                          <img
                            src={logo}
                            className="w-40 md:w-48 absolute -mt-16 top-9 sm:visible invisible "
                          />
                        </a>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          class="p-2 -mr-2 top-2 right-[2px]  relative transition before:rotate-90 hover:rotate-90 duration-300 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline -mt-10 mb-3"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg
                            class="w-6 text-gray-600 bottom-1"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <nav class="">
                      <ul class="space-y-4  relative bottom-8  sm:bottom-8">
                        <Popover.Group as="nav" className="text-center">
                          <Popover className="relative">
                            {({ open }) => (
                              <>
                                <span
                                  class={`group font-semibold text-base tracking-wide ${
                                    location.pathname.includes("home")
                                      ? "text-indigo-600"
                                      : "text-gray-700"
                                  } transition-colors duration-200 hover:text-indigo-500 cursor-pointer  bg-white px-2 pr-1 py-[2px] top-[1px]  rounded-md inline-flex items-center  focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    history.push("/home");
                                  }}
                                >
                                  Home
                                </span>
                                <Popover.Button
                                  className={classNames(
                                    "group font-semibold text-base tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-500  bg-white px-2 pr-1 py-[2px] top-[1px]  rounded-md inline-flex items-center  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                  )}
                                >
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "text-gray-600" : "text-gray-400",
                                      "-ml-[5px] top-[4px] relative mt-[4px] block h-5 w-5 group-hover:text-gray-500"
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0 translate-y-1"
                                  enterTo="opacity-100 translate-y-0"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100 translate-y-0"
                                  leaveTo="opacity-0 translate-y-1"
                                >
                                  <Popover.Panel
                                    ref={buttonRef1}
                                    className="absolute z-20  left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-[340px] sm:px-0"
                                  >
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 text-center overflow-hidden">
                                      <div className="relative grid gap-6 bg-white px-5 pt-6 pb-4 sm:gap-8 sm:p-8">
                                        {resources.map((item) => (
                                          <a
                                            key={item.name}
                                            onClick={() => {
                                              history.push("/home");
                                              setTimeout(() => {
                                                window.scroll(
                                                  0,
                                                  findPos(
                                                    document.getElementById(
                                                      item.doc
                                                    )
                                                  )
                                                );
                                              }, 100);
                                              setIsMenuOpen(false);
                                            }}
                                            className="-m-3 sm:p-3 p-3 pb-3.5 flex hover:cursor-pointer sm:-mb-3 -mb-2 items-start rounded-lg hover:bg-gray-50"
                                          >
                                            <item.icon
                                              className="flex-shrink-0 h-6 w-6 top-[1px] relative mr-1 text-indigo-600"
                                              aria-hidden="true"
                                            />
                                            <div className="ml-4 text-left">
                                              <p className="text-base font-medium text-gray-900">
                                                {item.name}
                                              </p>
                                              <p className="mt-1 text-sm text-gray-500">
                                                {item.description}
                                              </p>
                                            </div>
                                          </a>
                                        ))}
                                      </div>
                                      <div className="px-5 py-1 bg-gray-200 sm:px-8 sm:py-8">
                                        <div>
                                          {callsToAction.map((item) => (
                                            <div
                                              key={item.name}
                                              className="flow-root"
                                            >
                                              <a className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                                                <item.icon
                                                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                                                  aria-hidden="true"
                                                />
                                                <span className="ml-3">
                                                  {item.name}
                                                </span>
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        </Popover.Group>

                        <li class="text-center">
                          <a
                            onClick={() => {
                              setIsMenuOpen(false);
                              history.push("/whyus");
                            }}
                            aria-label="Product pricing"
                            title="Product pricing"
                            class={`hover:cursor-pointer font-semibold tracking-wide ${
                              location.pathname.includes("whyus")
                                ? "text-indigo-600"
                                : "text-gray-700"
                            } right-1.5 relative transition-colors duration-200  hover:text-indigo-500`}
                          >
                            Why Us
                          </a>
                        </li>
                      </ul>
                      <div className="align-middle justify-items-center justify-center mt-7 mb-3.5 bottom-[2px] mx-auto relative">
                        {sessionStorage.getItem("token") === null &&
                        sessionStorage.getItem("mentorToken") === null ? (
                          location.pathname
                            .split("/")
                            .includes("teamonboarding") ||
                          location.pathname === "/mentor" ||
                          location.pathname === "/mentor/" ? (
                            <></>
                          ) : (
                            <div class="relative mx-auto w-fit bottom-[5px]">
                              <a
                                href="#"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  showModalLog();
                                }}
                                className="uppercase items-center justify-center whitespace-nowrap px-3 mr-3 py-2 text-md tracking-wide font-semibold text-gray-700 hover:text-gray-900 "
                              >
                                Sign in
                              </a>

                              <a
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  if (location.pathname.includes("/signup")) {
                                    setRegModalShow(true);
                                  } else {
                                    history.push("/signup");
                                  }
                                }}
                                href="#"
                                className="uppercase items-center justify-center px-3 py-[9px] pb-2.5 border border-transparent rounded-md shadow-lg text-md tracking-wide font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-indigo-400 hover:to-indigo-600 active:bg-blue-500"
                              >
                                Sign up
                              </a>
                            </div>
                          )
                        ) : (
                          <div class="relative mx-auto w-fit">
                            <a
                              onClick={() => {
                                setIsMenuOpen(false);
                                sessionStorage.removeItem("token");
                                history.push("/home");
                              }}
                              className="whitespace-nowrap bottom-1 relative uppercase items-center justify-center px-3 py-2 border border-transparent rounded-sm shadow-sm text-lg  font-semibold hover:cursor-pointer  text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Log Out
                            </a>
                          </div>
                        )}
                      </div>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
