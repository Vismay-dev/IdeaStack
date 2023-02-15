import { useState, useEffect } from "react";
import ExpertDetails from "../Modals/ExpertDetails";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Dropdown from "./Dropdown";
import logo from "../Modals/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

import miscible from "../Landing/images/miscible-mono.png";

export default function BrowseMentors() {
  const [showExpert, setShowExpert] = useState(false);
  const [expertId, setExpertId] = useState(null);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [origExperts, setOrigExperts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, [experts]);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/getMentors"
          : "http://localhost:4000/api/project/getMentors",
        { token: sessionStorage.getItem("token") }
      )
      .then((res) => {
        setExperts(res.data);
        setOrigExperts(res.data);
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
    let array = origExperts;
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
    setExperts(arr);
  };

  const [text, setText] = useState("");
  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  const filterByText = () => {
    if (text !== "") {
      textFilter(text);
    } else {
      setExperts(origExperts);
    }
  };

  const getCateg = (categ) => {
    if (categ === "All") {
      setLoading(experts !== origExperts ? true : false);
      setTimeout(
        () => {
          setExperts(origExperts);
          setLoading(false);
        },
        experts !== origExperts ? 1000 : 0
      );
    } else {
      let arr = [];
      for (let i = 0; i < origExperts.length; i++) {
        for (let j = 0; j < origExperts[i]["fields"].length; j++) {
          if (origExperts[i]["fields"][j] === categ) {
            arr.push(origExperts[i]);
          }
        }
      }
      setLoading(true);
      setTimeout(() => {
        setExperts(arr);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      {showExpert ? (
        <ExpertDetails
          close={() => setShowExpert(false)}
          experts={experts}
          id={expertId}
        />
      ) : (
        ""
      )}
      <div class="w-full mx-auto pt-10 md:pb-0 pb-1   md:px-14 sm:px-8 px-4 lg:-mb-[205px] md:-mb-[195px] -mb-[225px] relative lg:max-w-7xl ">
        <h2
          style={{
            backgroundImage:
              "url(https://upload.wikimedia.org/wikipedia/commons/8/81/Maxresdefault_%281%29.jpg)",
          }}
          class="text-center bg-no-repeat z-40 bg-gradient-to-br from-cyan-400 to-cyan-600   text-gray-100 top-1  bg-right w-full  rounded-md shadow-md mb-[81px] relative"
        >
          <div class="bg-gray-900 bg-opacity-40 py-8 pb-9">
            <p class="md:text-4xl text-3xl   font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="md:h-11 sm:h-10 h-8 bottom-[4px] left-0.5  -ml-1 relative md:w-14 sm:w-10 w-8 sm:inline hidden"
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
              Seek Mentorship
            </p>
            <p class="md:text-2xl text-xl  mt-0.5 left-1.5 relative font-semibold">
              Book a Course, Access a Mentor
            </p>
          </div>
        </h2>

        <div class="flex pointer-events-auto z-[35] px-4 -space-x-4 bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-1 pb-2 bottom-[71.5px] relative justify-center sm:w-10/12 w-full  rounded-b-lg  mx-auto">
          <div class="grid grid-cols-6 sm:text-base text-sm gap-2 items-center z-40 justify-center relative">
            <div class=" border-2 md:col-span-4 col-span-6 grid sm:grid-cols-6 sm:text-base text-sm grid-cols-12 pointer-events-auto rounded-sm border-gray-300">
              <input
                type="text"
                onChange={textChangeHandler}
                class="px-4 py-2 sm:text-base text-sm sm:col-span-5 col-span-9 shadow-sm border-0"
                placeholder="Search Expert"
              />
              <button
                onClick={() => filterByText()}
                class="items-center sm:col-span-1 col-span-3 hover:shadow-lg hover:bg-blue-700 active:shadow-sm shadow-sm justify-center px-4 border-l bg-blue-600"
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
        ) : experts && experts.length === 0 ? (
          <div className="bg-gray-50 ring-2 ring-indigo-500 w-full pl-9 mb-7 mt-2 rounded-sm relative shadow-lg">
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
          <div class="grid grid-cols-1 z-30 pointer-events-none md:mb-8 mb-20 md:-mt-3 sm:mt-1 -mt-1 relative top-[8px] md:px-1 sm:px-7 px-7 left-[4px]   sm:gap-y-12 gap-y-14 sm:grid-cols-2 gap-x-12 lg:grid-cols-3 xl:grid-cols-4 ">
            {[...experts]
              .filter((expert) => expert.org == null)
              .map((expert, i) => (
                <a
                  data-aos={"fade-up"}
                  data-aos-once="true"
                  delay={`${i % 3}00`}
                  key={expert.id}
                  onClick={() => {
                    setShowExpert(true);
                    setExpertId(expert.id);
                  }}
                  class={`group z-20 pointer-events-auto  rounded-md cursor-pointer`}
                >
                  <div class="w-full z-20  shadow-md     overflow-hidden ">
                    <img
                      src={
                        expert.pic
                          ? expert.pic
                          : "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8&w=1000&q=80"
                      }
                      alt="expert"
                      class={`w-[270px] mx-auto shadow-xl
                     ${
                       expert && expert.org && expert.org === "UWR"
                         ? "p-4 bg-white"
                         : "p-0"
                     }
                        rounded-[.25rem]  h-[270px]   object-center object-cover group-hover:opacity-75`}
                    />
                  </div>
                  <h3 class="mt-4 text-md sm:text-left lg:right-0 relative md:-right-14 text-center text-gray-700">
                    {expert.role}
                  </h3>
                  <p class="mt-1 text-lg sm:text-left lg:right-0 relative md:-right-14 text-center font-medium text-gray-900">
                    {expert.name}
                  </p>
                </a>
              ))}
            {experts.filter((exp) => exp.org === "UWR").length > 0 ? (
              <>
                {experts.filter((exp) => exp.org !== "UWR").length === 0 ? (
                  ""
                ) : (
                  <hr class=" col-span-1 border-b-[1px] border-black border-dotted sm:col-span-2  lg:col-span-3 xl:col-span-4 w-[70%] mx-auto block mt-[12px] -mb-[4px]" />
                )}
                <h1
                  class={`mx-auto text-center my-6 ${
                    experts.filter((exp) => exp.org !== "UWR").length === 0
                      ? "-mt-4"
                      : "mt-4"
                  } block col-span-1 sm:col-span-2  lg:col-span-3 xl:col-span-4  font-semibold text-3xl`}
                >
                  <img
                    src={
                      "https://res.cloudinary.com/dp5dyhk3y/image/upload/v1663252341/IdeaStack/ybjfwajnj20mihxibyig.jpg"
                    }
                    alt=""
                    className="w-[140px] mx-auto mb-4 rounded-full bottom-1 relative"
                  />
                  <p class="block mt-3 relative top-2">
                    Build a Robotics Project with{" "}
                    <span class="text-gray-700">Unique World Robotics</span>
                  </p>
                </h1>
                {[...experts]
                  .filter((expert) => expert.org === "UWR")
                  .map((expert, i) => (
                    <a
                      data-aos={"fade-up"}
                      data-aos-once="true"
                      delay={`${i % 3}00`}
                      key={expert.id}
                      onClick={() => {
                        setShowExpert(true);
                        setExpertId(expert.id);
                      }}
                      class={`group z-20 pointer-events-auto  rounded-md cursor-pointer`}
                    >
                      <div class="w-full z-20  shadow-md     overflow-hidden ">
                        <img
                          src={
                            expert.pic
                              ? expert.pic
                              : "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8&w=1000&q=80"
                          }
                          alt="expert"
                          class={`w-[270px] mx-auto shadow-xl
                     ${
                       expert && expert.org && expert.org === "UWR"
                         ? "p-4 bg-white"
                         : "p-0"
                     }
                        rounded-[.25rem]  h-[270px]   object-center object-cover group-hover:opacity-75`}
                        />
                      </div>
                      <h3 class="mt-4 text-md sm:text-left lg:right-0 relative md:-right-14 text-center text-gray-700">
                        {expert.role}
                      </h3>
                      <p class="mt-1 text-lg sm:text-left lg:right-0 relative md:-right-14 text-center font-medium text-gray-900">
                        {expert.name}
                      </p>
                    </a>
                  ))}
              </>
            ) : (
              ""
            )}

            {experts.filter((exp) => exp.org === "MIS").length > 0 ? (
              <>
                {experts.filter((exp) => exp.org !== "MIS").length === 0 ? (
                  ""
                ) : (
                  <hr class=" col-span-1 border-b-[1px] border-black border-dotted sm:col-span-2  lg:col-span-3 xl:col-span-4 w-[70%] mx-auto block mt-[7px]" />
                )}
                <h1
                  class={`mx-auto text-center my-6 ${
                    experts.filter((exp) => exp.org !== "MIS").length === 0
                      ? "-mt-4"
                      : "mt-4"
                  } block col-span-1 sm:col-span-2  lg:col-span-3 xl:col-span-4  font-semibold text-3xl`}
                >
                  <img
                    src={miscible}
                    alt=""
                    className="w-[175px] mx-auto mb-5 -mt-1 bg-white p-2 rounded-lg bottom-1 relative"
                  />
                  <p class="block mt-3 relative top-2">
                    Subsidized Design Services from{" "}
                    <span class="text-indigo-800">Miscible</span>
                  </p>
                  <p class="block mt-1.5 relative text-base top-2">
                    Meet with Ms. Molly Patton{" "}
                    <span class="text-indigo-800">
                      {" "}
                      & Qualify for Discounts on Professional Design!
                    </span>
                  </p>
                </h1>
                {[...experts]
                  .filter((expert) => expert.org === "MIS")
                  .map((expert, i) => (
                    <a
                      data-aos={"fade-up"}
                      data-aos-once="true"
                      delay={`${i % 3}00`}
                      key={expert.id}
                      onClick={() => {
                        setShowExpert(true);
                        setExpertId(expert.id);
                      }}
                      class={`group z-20 -mt-4 -mb-3  pointer-events-auto ${"col-span-1 sm:col-span-2   lg:col-start-2 lg:col-span-1  xl:col-span-2 xl:col-start-2"} rounded-md cursor-pointer`}
                    >
                      <div class="w-full z-20  shadow-xl   bg-white  overflow-hidden ">
                        <img
                          src={
                            expert.pic
                              ? expert.pic
                              : "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8&w=1000&q=80"
                          }
                          alt="expert"
                          class={`w-[270px] mx-auto 
                     ${
                       expert && expert.org && expert.org === "MIS"
                         ? "p-4 bg-white"
                         : "p-0"
                     }
                        rounded-[.25rem]  h-[270px]   object-center object-cover group-hover:opacity-75`}
                        />
                      </div>
                      <h3 class="mt-[27px] text-lg sm:text-center lg:right-0 relative md:-right-14 text-center text-gray-700">
                        {expert.role}
                      </h3>
                      <p class="mt-1 text-xl sm:text-center lg:right-0 relative md:-right-14 text-center font-medium text-gray-900">
                        {expert.name}
                      </p>
                    </a>
                  ))}
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}
