import projectContext from "../../context/projectContext";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const AllProjects = () => {
  const projectCon = useContext(projectContext);

  const [showMore, setShowMore] = useState([false, null]);

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, [showMore]);

  const readMore = (index) => {
    if (showMore[0] === false) {
      setShowMore([true, index]);
    } else if (showMore[0] === true && showMore[1] !== index) {
      setShowMore([true, index]);
    } else {
      setShowMore([false, null]);
    }
  };

  const history = useHistory();

  return (
    <>
      <h1 class=" text-center w-10/12 relative mx-auto   lg:mt-6 mt-5 py-4 pb-5  font-bold text-gray-800 md:text-[47px] sm:text-[38px] text-[33px]">
        All <span class="text-blue-700">Projects</span> (
        {projectCon.projects.length})
      </h1>

      <div
        class={`grid grid-cols-2 gap-4 align-middle content-center ${
          projectCon.projects.length === 0
            ? "-mb-[106px]"
            : "-mb-[205px] top-2 relative"
        } mt-6 pb-3 md:px-[20px]    lg:px-[120px] sm:px-[70px] px-[19px]  sm:left-1.5 left-1`}
      >
        {projectCon.projects.length === 0 ? (
          <p class="sm:text-4xl text-3xl font-semibold col-span-2 text-center mt-[63px] -mb-3.2 right-1 mx-auto relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              class="mx-auto block  relative  w-28 mb-8 h-auto text-center"
            >
              <g data-name="Stationery-Office Supplies-Planning-Management-Business">
                <path
                  fill="#e6e7e8"
                  d="M54 11v46a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h32v6a2.006 2.006 0 0 0 2 2Z"
                />
                <path
                  fill="#ee8700"
                  d="m10 42-7-7v26h26Zm0 15H7V44.66l3 3L19.34 57Z"
                />
                <path
                  fill="#d8d7da"
                  d="M54 49v8H34l-3-2h-2a2.006 2.006 0 0 1-2-2 2.015 2.015 0 0 1 2-2h2l3-2Z"
                />
                <path fill="#ffa733" d="M52 47h3v8h-3z" />
                <path fill="#e6e7e8" d="M57 47a4 4 0 0 1 0 8h-2v-8Z" />
                <path
                  fill="#787680"
                  d="M29 49v4h-2a2.006 2.006 0 0 1-2-2 2.015 2.015 0 0 1 2-2Z"
                />
                <path fill="#898890" d="M33 51v4h-1l-3-2v-4l3-2h1v4z" />
                <path fill="#d8d7da" d="M27 37h27v8H27z" />
                <path fill="#1e81ce" d="M25 35h36v8H25z" />
                <path fill="#ffa733" d="M16 19h12v12H16z" />
                <path fill="#bcbec0" d="M54 11h-6a2.006 2.006 0 0 1-2-2V3Z" />
                <path fill="#00b39d" d="M33 51h19v4H33z" />
                <path fill="#00ccb3" d="M33 47h19v4H33z" />
                <path
                  fill="#c6c5ca"
                  d="M15 8h2v2h-2zM19 8h6v2h-6zM15 12h10v2H15z"
                />
                <path
                  fill="#1a6fb0"
                  d="M42 38h2v5h-2zM54 38h2v5h-2zM46 40h2v3h-2zM50 40h2v3h-2zM30 38h2v5h-2zM38 40h2v3h-2zM34 40h2v3h-2z"
                />
                <path
                  fill="#c6c5ca"
                  d="M31 18h8v2h-8zM41 18h8v2h-8zM31 22h8v2h-8zM41 22h8v2h-8zM31 26h8v2h-8zM41 26h8v2h-8zM31 30h8v2h-8zM41 30h8v2h-8zM15 34h6v2h-6zM15 38h6v2h-6zM15 42h6v2h-6z"
                />
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="sm:h-9 sm:w-9 h-8 w-8 inline text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>{" "}
            <span class="top-0.5 relative">No Projects</span>
          </p>
        ) : (
          projectCon.projects &&
          projectCon.projects.map((proj, i) => {
            let date = new Date(proj.createdAt).toDateString().substring(4);
            date = date.slice(0, 6) + "," + date.slice(6);
            return (i + 1) % 2 === 1 && i === projectCon.projects.length - 1 ? (
              <div key={i} class="col-span-2 xl:px-64 z-[75] lg:px-32 px-6">
                <div
                  data-aos={"zoom-in"}
                  data-aos-once="true"
                  class={`w-full  px-8 py-4 mt-1 z-40 pointer-events-auto mr-32 relative right-1.5 ${
                    showMore[0] === true && showMore[i] !== i ? "" : "h-full"
                  } bg-white rounded-lg shadow-md `}
                >
                  <div class="flex items-center justify-between ">
                    <span class="text-sm font-light text-gray-600 ">
                      {date}
                    </span>

                    <button
                      type="button"
                      class="text-white bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3.5 py-1.5 -mr-2 mt-1 pt-1 text-md text-center mb-2"
                      onClick={() => {
                        history.push("/myprojects/manageproject/");
                        sessionStorage.setItem("managing", proj._id);
                      }}
                    >
                      Manage
                    </button>
                  </div>

                  <div class="mt-2">
                    <a
                      href="#"
                      class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline"
                    >
                      {proj.name}
                    </a>
                    <p class="mt-4 pb-2 pt-1  md:text-md text-sm text-gray-600 ">
                      {proj.problem}
                    </p>
                  </div>

                  {showMore[0] && showMore[1] == i ? (
                    <>
                      <br />
                      <h3 class="md:text-md text-sm md:mt-0 -mt-3 md:font-normal font-semibold">
                        Category: {proj.category ? proj.category : ""}
                      </h3>
                      <h3 class="md:text-md text-sm md:font-normal font-semibold">
                        Maximum Team Capacity: {proj.maxCap ? proj.maxCap : ""}
                      </h3>
                      <h3 class="md:text-md text-sm md:mb-0 mb-6 md:pb-0 pb-1 md:font-normal font-semibold">
                        No. of Members: {proj.team ? proj.team.length : ""}
                      </h3>

                      <img
                        class="mt-6 mb-9 border-2 py-5 rounded-sm  object-contain w-72 shadow-lg mx-auto relative h-56"
                        src={proj.projPic}
                      ></img>
                    </>
                  ) : (
                    ""
                  )}

                  <div class="flex items-center justify-between mt-4 z-[75]">
                    <a
                      onClick={() => readMore(i)}
                      class="text-blue-600 z-[75]  sm:bottom-0 bottom-[2px] relative  hover:cursor-pointer hover:underline"
                    >
                      View {showMore[0] && showMore[1] === i ? "less" : "more"}
                    </a>
                    <div class="flex items-center relative bottom-0.5">
                      <img
                        class="hidden object-cover w-10 h-10 mx-2 rounded-full sm:block"
                        src={
                          proj.admin.pic
                            ? proj.admin.pic
                            : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                        }
                        alt="avatar"
                      />
                      <a
                        onClick={() => {
                          localStorage.setItem("viewToken", proj.admin.id);
                          window.open(
                            process.env.NODE_ENV === "production"
                              ? "https://ideastack.org/viewProfile"
                              : "http://localhost:3000/viewProfile",
                            "_blank"
                          );
                        }}
                        class="font-bold text-gray-700 cursor-pointer "
                      >
                        {proj.admin.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div class="md:col-span-1 col-span-2" key={i}>
                <div
                  class={`w-full px-8 py-4 mt-1 mr-4 ${
                    showMore[0] === true && showMore[i] !== i ? "" : "h-full"
                  } bg-white rounded-lg shadow-md `}
                >
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-light text-gray-600 ">
                      {date}
                    </span>

                    <button
                      type="button"
                      class="text-white bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3.5 py-1.5 -mr-2 mt-1 pt-1 text-md text-center mb-2"
                      onClick={() => {
                        history.push("/myprojects/manageproject/");
                        sessionStorage.setItem("managing", proj._id);
                      }}
                    >
                      Manage
                    </button>
                  </div>

                  <div class="mt-1">
                    <a
                      href="#"
                      class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline"
                    >
                      {proj.name}
                    </a>
                    <p class="mt-4 pb-2 pt-1  md:text-md text-sm text-gray-600 ">
                      {proj.problem}
                    </p>
                  </div>

                  {showMore[0] && showMore[1] == i ? (
                    <>
                      <br />
                      <h3 class="md:text-md text-sm md:mt-0 -mt-3 md:font-normal font-semibold">
                        Category: {proj.category ? proj.category : ""}
                      </h3>
                      <h3 class="md:text-md text-sm md:font-normal font-semibold">
                        Maximum Team Capacity: {proj.maxCap ? proj.maxCap : ""}
                      </h3>
                      <h3 class="md:text-md text-sm md:mb-0 mb-6 md:pb-0 pb-1 md:font-normal font-semibold">
                        No. of Members: {proj.team ? proj.team.length : ""}
                      </h3>

                      <img
                        class="mt-6 mb-9 border-2 py-5 rounded-sm  object-contain w-72 shadow-lg mx-auto relative h-56"
                        src={proj.projPic}
                      ></img>
                    </>
                  ) : (
                    ""
                  )}

                  <div class="flex items-center justify-between z-[75] mt-4">
                    <a
                      onClick={() => readMore(i)}
                      class="text-blue-600 z-[75] hover:cursor-pointer sm:bottom-0 bottom-[2px] relative  hover:underline"
                    >
                      View {showMore[0] && showMore[1] === i ? "less" : "more"}
                    </a>
                    <div class="flex items-center relative bottom-0.5">
                      <img
                        class="hidden object-cover w-10 h-10 mx-2 rounded-full sm:block"
                        src={
                          proj.admin.pic
                            ? proj.admin.pic
                            : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                        }
                        alt="avatar"
                      />
                      <a
                        onClick={() => {
                          localStorage.setItem("viewToken", proj.admin.id);
                          window.open(
                            process.env.NODE_ENV === "production"
                              ? "https://ideastack.org/viewProfile"
                              : "http://localhost:3000/viewProfile",
                            "_blank"
                          );
                        }}
                        class="font-bold text-gray-700 cursor-pointer "
                      >
                        {proj.admin.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default AllProjects;
