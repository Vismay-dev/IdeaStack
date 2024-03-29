import { useState, useEffect, useContext } from "react";
import WorkshopDetails from "../Modals/WorkshopDetails";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Dropdown from "./Dropdown";
import logo from "../Modals/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

import miscible from "../Landing/images/miscible-mono.png";
import projectContext from "../../context/projectContext";

export default function BrowseMentors() {
  const [showWorkshop, setShowWorkshop] = useState(false);
  const [workshopId, setWorkshopId] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [origWorkshops, setOrigWorkshops] = useState([]);

  const project = useContext(projectContext).project;

  const history = useHistory();

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, [workshops]);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getWorkshops"
          : "http://localhost:4000/api/user/getWorkshops",
        { token: sessionStorage.getItem("token") }
      )
      .then((res) => {
        let arr = res.data.filter(
          (expert) =>
            expert.name.toLowerCase() != "jessica avedikian" &&
            expert.name.toLowerCase() != "adi sinha"
        );
        setWorkshops(arr);
        setOrigWorkshops(arr);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, [location.pathname]);

  const textFilter = (text) => {
    let arr = [];
    let arrPrior = [];
    let array = origWorkshops;
    const wordFilterArr = String(text)
      .toLowerCase()
      .split(/(?:,| )+/); //Words to be searched for in task names
    for (let i = 0; i < Array(...array).length; i++) {
      arrPrior.push(0);
      var projName = array[i]["name"].toLowerCase();
      var wordsContained = projName.split(/(?:,| )+/);
      var boolean = false;
      for (let j = 0; j < wordFilterArr.length; j++) {
        for (let k = 0; k < wordsContained.length; k++) {
          if (wordsContained[k].indexOf(wordFilterArr[j]) > -1) {
            arrPrior[i]++;
            boolean = true;
          }
        }
      }
      if (boolean === true) {
        arr.push(array[i]);
      }
    }
    arrPrior = arrPrior.filter((e) => e !== 0);

    let x, y, tmp;
    x = y = 0;
    for (let x = 0; x < arr.length - 1; x++) {
      var check = false;
      for (let y = 0; y < arr.length - 1 - x; y++) {
        if (arrPrior[y + 1] > arrPrior[y]) {
          tmp = arr[y];
          arr[y] = arr[y + 1];
          arr[y + 1] = tmp;
          check = true;
        }
      }
      if (check === false) {
        break;
      }
    }
    setWorkshops(arr);
  };

  const [text, setText] = useState("");
  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  const filterByText = () => {
    if (text !== "") {
      textFilter(text);
    } else {
      setWorkshops(origWorkshops);
    }
  };

  const getCateg = (categ) => {
    if (categ === "All") {
      setLoading(workshops !== origWorkshops ? true : false);
      setTimeout(
        () => {
          setWorkshops(origWorkshops);
          setLoading(false);
        },
        workshops !== origWorkshops ? 1000 : 0
      );
    } else {
      let arr = [];
      for (let i = 0; i < origWorkshops.length; i++) {
        if (origWorkshops[i]["tags"].includes(categ.toLowerCase())) {
          arr.push(origWorkshops[i]);
        }
      }
      setLoading(true);
      setTimeout(() => {
        setWorkshops(arr);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      {showWorkshop ? (
        <WorkshopDetails
          close={() => setShowWorkshop(false)}
          workshops={workshops}
          id={workshopId}
        />
      ) : (
        ""
      )}
      <div class="w-full mx-auto md:pb-0 pb-1 lg:-mb-[205px] md:-mb-[195px] -mb-[225px] relative  ">
        <h2
          style={{
            backgroundImage:
              "url(https://upload.wikimedia.org/wikipedia/commons/8/81/Maxresdefault_%281%29.jpg)",
          }}
          class="text-center bg-cover z-40 bg-gradient-to-br from-cyan-400 to-cyan-600   text-gray-100 top-1   rounded-md shadow-md mb-[81px] relative"
        >
          <div class="bg-gray-900 bg-opacity-40 py-8 pb-9">
            <p class="md:text-4xl sm:text-3xl text-2xl tracking-wide md:normal-case uppercase   font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="md:h-11 sm:h-10 h-8 bottom-[4px] md:left-0.5  -ml-1 relative md:w-14 sm:w-10 w-8 sm:inline hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>{" "}
              Strategic Mentorship
            </p>
            <p class="text-base md:uppercase mt-1.5 -mb-1 px-3 left-1.5 relative font-semibold">
              Executive Advice & Founder Coaching
            </p>
          </div>
        </h2>

        <div class="flex pointer-events-auto  z-[35] px-4 -space-x-4 bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-1 pb-2 bottom-[71.5px] relative justify-center  w-full  rounded-b-lg  mx-auto">
          <div class="flex md:flex-row flex-col sm:text-base md:-ml-[75px] text-sm gap-2 items-center z-40 justify-center relative">
            <div
              onClick={() => history.push("/networks/main")}
              class="tracking-wide md:ml-10 lg:ml-0  ml-auto mr-auto cursor-pointer block text-white font-semibold sm:normal-case uppercase md:w-fit sm:w-[450px] w-[300px] text-center hover:shadow-md border-[1px] md:col-span-2 py-2 px-4 col-span-2 sm:text-base text-sm pointer-events-auto rounded-md border-gray-300  bg-blue-700 hover:bg-blue-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="relative mx-auto inline text-center text-lg mr-2 bottom-[2px] w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              Go Back
            </div>

            <div class=" border-[1px] md:col-span-4 md:ml-10 lg:ml-12 ml-auto mr-auto col-span-2 grid lg:grid-cols-6 grid-cols-4 md:w-fit sm:w-[450px] w-[300px]  sm:text-base text-sm rounded-md border-gray-300">
              <input
                type="text"
                onChange={textChangeHandler}
                class="px-4 py-2 sm:text-base text-sm lg:col-span-5 md:col-span-3 col-span-3 rounded-l-md shadow-sm border-0"
                placeholder="Search Mentor"
              />
              <button
                onClick={() => filterByText()}
                class="items-center sm:col-span-1 col-span-1 hover:shadow-lg hover:bg-blue-700 rounded-r-md active:shadow-sm shadow-sm justify-center px-4 border-l bg-blue-600"
              >
                <svg
                  class="w-6 h-6 text-gray-100 text-center mx-auto block"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </div>

            <Dropdown passCategory={getCateg} />
          </div>
        </div>

        {loading ? (
          <div class="relative mx-auto my-7 mb-9 pb-36 pt-20 sm:pl-2 md:pl-4 lg:pl-6 text-center block justify-center">
            <ClipLoader color={"#0055b3"} loading={loading} size={100} />
          </div>
        ) : workshops && workshops.length === 0 ? (
          <div className="bg-gray-50 ring-2 ring-indigo-500 w-[90%] mx-auto pl-9 mb-7 mt-2 rounded-sm relative shadow-lg">
            <div className="w-full mx-auto md:py-10 md:pt-16 py-9 pt-16 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl lg:mt-0 -ml-[32px] mt-7 font-extrabold lg:text-left text-center tracking-tight text-gray-900 sm:text-4xl">
                <span className="block lg:px-12">Oops..</span>
                <span className="block text-blue-700 px-12">
                  No Search Results Appeared.
                </span>
              </h2>
              <div className="-mt-2 lg:mx-0 mx-auto text-center block lg:flex relative justify-center py-3 lg:flex-shrink-0">
                <img
                  class="md:w-64 w-52 lg:right-11 right-5 lg:mt-0 mt-3 relative block mx-auto md:h-64 h-52"
                  src={logo}
                ></img>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              class={
                project.teamOnboarded
                  ? "hidden"
                  : " bg-transparent w-full absolute -mt-[80px] pb-[40px] h-full  backdrop-blur-md z-[33] rounded drop-shadow-lg"
              }
            >
              <h2 class="bg-white sm:w-[550px] w-[320px]    border-indigo-700 border-dashed border-2 block top-[220px] relative mx-auto px-7 pt-4 pb-5 sm:text-2xl text-lg  rounded-lg shadow-md text-center font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="sm:w-7 sm:h-7 w-6 h-6 relative bottom-[1px] inline mr-1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                  />
                </svg>
                Your team has not been onboarded
                <div
                  class={`bg-red-100 border-l-4  block mt-4 mb-1.5 border-red-500 text-red-700 p-4 pt-3 
                            `}
                  role="alert"
                >
                  <p class="sm:text-sm text-xs">
                    You may not access mentors until your listed team-members
                    have joined IdeaStack.org with the Unique Join Code (URC)
                    emailed to them. Team-members must complete registration!
                  </p>
                </div>
              </h2>
            </div>

            <button
              onClick={() => {
                history.push("/dashboard/yourmentor");
              }}
              class="block relative md:top-1.5 sm:-mt-7 -mt-9 sm:mb-[53px] mb-[47px] text-white text-sm uppercase bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-md px-4 py-2 pt-2.5  mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 inline  relative bottom-[0.2px] mr-0.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
              View <span class="sm:inline hidden">Approved</span> Mentorships
            </button>

            {project.mentorsRequested && project.mentorsRequested.length > 0 ? (
              <div
                class={`${
                  project &&
                  project.mentorsRequested.length +
                    project.mentorsMatched.length ===
                    5
                    ? "bg-orange-50 border-orange-500 text-orange-700"
                    : "bg-indigo-50 border-indigo-500 text-indigo-700"
                }  w-fit mx-auto block text-base  rounded-md border-l-4 -mt-8 mb-9 shadow-md relative left-1.5  p-4 pt-3 pb-[13px]
                            `}
                role="alert"
              >
                <p class="text-sm">
                  Your team has made{" "}
                  <strong>
                    {project.mentorsRequested.length +
                      project.mentorsMatched.length}{" "}
                  </strong>
                  mentorship request
                  {project.mentorsRequested.length +
                    project.mentorsMatched.length >
                  1
                    ? "s"
                    : ""}
                  . <br class="sm:hidden block" />{" "}
                  <strong>
                    {5 -
                      project.mentorsRequested.length -
                      project.mentorsMatched.length}
                  </strong>{" "}
                  out of <strong>5</strong> requests remaining for this month.
                </p>
              </div>
            ) : (
              ""
            )}

            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:px-12 xl:gap-x-5 gap-x-7 xl:gap-y-9 sm:gap-y-10 gap-y-12 xl:max-w-[1500px] lg:max-w-[1250px] lg:px-12 md:max-w-[740px] max-w-[500px] mx-auto -mt-2 lg:mb-0
            z-30 pointer-events-none  relative md:top-[16px] top-[0px]  md:px-1 sm:px-7 px-7"
            >
              {[...workshops].map((workshop, i) => (
                <a
                  data-aos={"fade-up"}
                  data-aos-once="true"
                  delay={`${i % 3}00`}
                  key={i}
                  onClick={() => {
                    setWorkshopId(workshop._id);
                    setShowWorkshop(true);
                  }}
                  class={`group z-20 transition ease-in-out delay-150 hover:border-b-indigo-600 hover:border-b-2 hover:rounded-b-xl  duration-600 pointer-events-auto shadow-md hover:bg-slate-200 bg-slate-50 pb-1  rounded-md cursor-pointer`}
                >
                  <div class="w-full z-20 py-5 bg-gray-800  ">
                    {workshop.orgPic ? (
                      <>
                        <span class="text-xs text-gray-50 absolute sm:right-4 right-[10px] top-2.5 font-semibold">
                          POWERED BY
                        </span>
                        <img
                          src={workshop.orgPic}
                          alt="expert"
                          class={`sm:w-[90px] w-[80px] mx-auto shadow-sm
                      rounded-[.25rem] ${
                        workshop.org == "Miscible" ? "bg-gray-800" : "bg-white"
                      }  h-auto absolute right-3 top-8   object-center object-cover`}
                        />
                      </>
                    ) : (
                      ""
                    )}

                    <img
                      src={
                        workshop.pic
                          ? workshop.pic
                          : "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8&w=1000&q=80"
                      }
                      alt="expert"
                      class={` ${
                        workshop.partnerPic && workshop.partnerPic != ""
                          ? "xl:right-0 lg:right-6 right-10 relative"
                          : ""
                      } mx-auto shadow-sm
                        rounded-full border-blue-100 border my-2 xl:h-[160px] xl:w-[160px]  lg:h-[190px] lg:w-[190px] w-[160px] h-[160px]  object-center object-cover group-hover:opacity-75`}
                    />
                  </div>
                  <h3 class="mt-4 text-xl tracking-wide sm:text-left text-center bg-gradient-to-r w-fit sm:mx-0 mx-auto block from-blue-500 to-indigo-500 text-transparent bg-clip-text px-6  lg:right-0 relative font-bold  text-gray-900">
                    {workshop.name}
                  </h3>
                  <p class="mt-2 pb-4 top-[7px] px-6 text-md sm:text-left lg:right-0 relative  text-center font-medium text-gray-700">
                    Expertise: {workshop.expertise}
                  </p>
                  <p class="mt-2 pb-[14px] text-md px-6 sm:text-left lg:right-0 relative  text-center font-medium text-gray-700">
                    <span class="sm:inline md:hidden lg:inline xl:hidden hidden ">
                      Organizations:
                    </span>{" "}
                    {workshop.orgs
                      .filter((org, i) => i < 2)
                      .map((org, i) => {
                        return (
                          <span
                            class={` ${
                              i == 2 ? "-mt-[14px] inline pt-[16px]" : "inline"
                            }`}
                          >
                            {" "}
                            {i == 2 ? (
                              <>
                                {" "}
                                <br class="inline" />{" "}
                              </>
                            ) : (
                              ""
                            )}
                            {i != 0 && i != 2 ? "& " : ""}{" "}
                            <img
                              src={org.pic}
                              class="w-7 h-7 shadow-md ml-2 mb-1 inline rounded-full"
                            ></img>{" "}
                            <span class="ml-1 inline">
                              {org.name !== "UN Women"
                                ? org.name.split(" ")[0]
                                : org.name}
                            </span>{" "}
                          </span>
                        );
                      })}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
