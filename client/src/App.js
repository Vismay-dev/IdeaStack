import { useEffect, useState, lazy, Suspense } from "react";

import ClockLoader from "react-spinners/ClipLoader";
import { CircleLoader } from "react-awesome-loaders";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import userContext from "./context/userContext";
import projectContext from "./context/projectContext";
import mentorContext from "./context/mentorContext";
import mentorAccContext from "./context/mentorAccContext";

import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import ReactGA from "react-ga";

// const NavBar = lazy(() => import("./Components/NavMenu/NavBar"));
// const Notifications = lazy(() =>
//   import("../src/Components/Notifications/Notifications")
// );
// const MainContent = lazy(() => import("./Components/MainContent"));
// const Footer = lazy(() => import("./Components/Footer/Footer"));

import MainContent from "./Components/MainContent";
import NavBar from "./Components/NavMenu/NavBar";
import Footer from "./Components/Footer/Footer";
import Notifications from "../src/Components/Notifications/Notifications";

import AOS from "aos";
import "aos/dist/aos.css";

import logo from "./Components/NavMenu/logo.png";

const TRACKING_ID = "UA-226293861-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1100,
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const location = useLocation();

  const loadFunc = () => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setShowLogo(true);
      setTimeout(() => {
        setLoading(false);
        setShowLogo(false);
      }, 1250);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadFunc();
    }, 1500);
  }, []);

  const [mentors, setMentors] = useState();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    age: 0,
    city: "",
    school: "",
    interests: [],
    projects: [],
  });

  const logIn = (userInfo) => {
    setUser(userInfo);
  };

  useEffect(() => {
    if (
      !location.pathname.includes("startupmentorship") &&
      !location.pathname.includes("yourmentor")
    ) {
      sessionStorage.removeItem("index");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/getUser"
            : "http://localhost:4000/api/user/getUser",
          { token: sessionStorage.getItem("token") }
        )
        .then((res) => {
          setUser(res.data);
        });
    }
  }, [location.pathname]);

  const GOOGLEOAUTHCLIENTID =
    "1085293368367-1i2er7o64kk7mtpgdbt92bi6k8r6bjpk.apps.googleusercontent.com";

  const [project, setProject] = useState(user.projects);

  useEffect(() => {
    if (
      location.pathname !==
      "/admin-operations-passcode-IdeaStackOperations300305"
    )
      ReactGA.pageview(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/getProject"
            : "http://localhost:4000/api/user/getProject",
          { projId: user.projectId, token: sessionStorage.getItem("token") }
        )
        .then(async (res) => {
          let projCopy = res.data;
          let teamCopy = [];
          for (let i = 0; i < res.data.team.length; i++) {
            await axios
              .post(
                process.env.NODE_ENV === "production"
                  ? "https://ideastack.herokuapp.com/api/user/getUserByMail"
                  : "http://localhost:4000/api/user/getUserByMail",
                {
                  email: res.data.team[i].email,
                  token: sessionStorage.getItem("token"),
                }
              )
              .then((res) => {
                teamCopy.push({ ...res.data, ...projCopy.team[i] });
              });
          }
          setProject({
            ...projCopy,
            team: teamCopy,
          });
        });
    }
  }, [location.pathname, user]);

  const [mentor, setMentor] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem("mentorToken") !== null) {
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/getMentor"
            : "http://localhost:4000/api/user/getMentor",
          {
            token: sessionStorage.getItem("mentorToken"),
          }
        )
        .then((res) => {
          console.log(res.data);
          setMentor(res.data);
        });
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLEOAUTHCLIENTID}>
      <mentorAccContext.Provider
        value={{ mentor: mentor, setMentor: setMentor }}
      >
        <mentorContext.Provider
          value={{ mentors: mentors, setMentors: setMentors }}
        >
          <projectContext.Provider
            value={{ project: project, setProject: setProject }}
          >
            <userContext.Provider value={{ user: user, setUser: setUser }}>
              <div
                class={` w-screen bg-gradient-to-r from-gray-200 to-blue-200 relative z-0 ${
                  location.pathname === "/home" || loading
                    ? " h-screen"
                    : " max-h-full"
                }`}
              >
                <>
                  {!loading ? (
                    <>
                      <NavBar loginFunc={logIn} />
                      <Notifications user={user} />
                      <MainContent class="-z-10" />
                      <Footer />
                    </>
                  ) : (
                    <div class=" w-[217px] animate-fade  m-0 relative mx-auto sm:top-[48%] top-[45%] translate-y-[-50%]  sm:pl-3 pl-2">
                      {showLogo ? (
                        <img
                          data-aos={"fade"}
                          data-aos-once="true"
                          src={logo}
                          className="sm:w-40 w-36 md:w-48 md:right-0 sm:right-4 right-8 shadow-md rounded-md bg-white px-2 absolute -top-3 -mt-[60px]"
                        />
                      ) : (
                        <CircleLoader
                          meshColor={"#6366F1"}
                          lightColor={"#E0E7FF"}
                          duration={1.5}
                          desktopSize={"60px"}
                          mobileSize={"60px"}
                        />
                      )}
                    </div>
                  )}
                  {/* <Suspense>
                    <Suspense>
                      <NavBar loginFunc={logIn} />
                    </Suspense>
                    <Suspense>
                      <Notifications user={user} />
                    </Suspense>
                    <Suspense>
                      <MainContent class="-z-10" />
                    </Suspense>
                    <Suspense>
                      <Footer />
                    </Suspense>
                  </Suspense> */}
                </>
              </div>
            </userContext.Provider>
          </projectContext.Provider>
        </mentorContext.Provider>
      </mentorAccContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
