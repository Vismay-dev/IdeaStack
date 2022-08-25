import { useState, useContext, useEffect } from "react";
import CreateProjectModal from "../Modals/CreateModal";
import projectContext from "../../context/projectContext";
import { useHistory } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import userContext from "../../context/userContext";

const CreateProject = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const projectCon = useContext(projectContext);
  const user = useContext(userContext).user;
  const [showMore, setShowMore] = useState([false, null]);

  const readMore = (index) => {
    if (showMore[0] === false) {
      setShowMore([true, index]);
    } else if (showMore[0] === true && showMore[1] !== index) {
      setShowMore([true, index]);
    } else {
      setShowMore([false, null]);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, [showMore]);

  const history = useHistory();

  return (
    <div class="block mr-10">
      {showCreateModal ? (
        <CreateProjectModal
          close={() => {
            setShowCreateModal(false);
          }}
        />
      ) : (
        ""
      )}

      <h1 class=" text-center w-10/12 relative mx-auto lg:mt-5 mt-5 py-4 lg:pb-5 pb-5 font-bold text-gray-800 md:text-[47px] text-[38px]">
        Projects <span class="text-blue-700">Created</span> (
        {user &&
          projectCon.projects &&
          projectCon.projects.filter((proj) => user._id === proj.admin.id)
            .length}
        )
      </h1>

      <div class="grid grid-cols-2 gap-4 align-middle content-center -mb-4 mt-[22px] md:px-[20px]   lg:px-[120px] sm:px-[70px] px-[19px]  sm:-mr-4 relative">
        {user &&
        projectCon.projects &&
        projectCon.projects.filter((proj) => user._id === proj.admin.id)
          .length === 0 ? (
          <>
            <p
              class={`sm:text-4xl text-3xl font-semibold col-span-2 text-center mt-[20px] ${
                projectCon.projects.filter((proj) => user._id === proj.admin.id)
                  .length === 0
                  ? "mb-12 "
                  : "mb-24 "
              } right-1 mx-auto relative`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 64 64"
                viewBox="0 0 64 64"
                class="mx-auto block  relative  w-32 h-auto text-center"
              >
                <polyline
                  fill="#f4f8f8"
                  points="34.51 27.985 34.51 15.995 57.51 15.995 57.51 47.995 34.51 47.995"
                />
                <polygon
                  fill="#dbe7f6"
                  points="34.51 45.442 34.51 47.995 57.51 47.995 57.51 22.442"
                />
                <polygon
                  fill="#dbe7f6"
                  points="50.51 47.995 50.51 37.995 53.51 35.995 53.51 15.995 57.51 15.995 57.51 47.995"
                />
                <polygon
                  fill="#b4cbea"
                  points="53.51 26.442 53.51 35.995 50.51 37.995 50.51 47.995 57.51 47.995 57.51 22.442"
                />
                <path
                  fill="#79a1d5"
                  d="M16.99,48.005c1.381,0,2.5-1.119,2.5-2.5v-7.5v-2.5c0-1.381,1.119-2.5,2.5-2.5h2.5h17.5    c1.381,0,2.5,1.119,2.5,2.5v10c0,1.381-1.119,2.5-2.5,2.5H16.99z"
                />
                <path
                  fill="#b4cbea"
                  d="M41.99,27.985l-11.5,0.004v5l11.5-0.004c1.381,0,2.5,1.119,2.5,2.5v-5    C44.49,29.104,43.37,27.985,41.99,27.985z"
                />
                <path
                  fill="#dbe7f6"
                  d="M43.757,28.717c-0.452-0.452-1.077-0.732-1.767-0.732l-11.5,0.004v5l8.998-0.003L43.757,28.717z"
                />
                <path
                  fill="#b4cbea"
                  d="M24.49,33.005h-2.5c-1.381,0-2.5,1.119-2.5,2.5v2.5v7.5c0,1.381-1.119,2.5-2.5,2.5h7.479l15-15H24.49z"
                />
                <path
                  fill="#dbe7f6"
                  d="M7.49,17.989L7.49,17.989c1.657,0,3,1.343,3,3v4.006h-6v-4.006C4.49,19.332,5.833,17.989,7.49,17.989z"
                />
                <path
                  fill="#f4f8f8"
                  d="M10.49,24.995v20h9l0,0v-6.99v-2.5c0-1.381,1.119-2.5,2.5-2.5h2.5h6v-8.349v-3.667c0-1.657-1.343-3-3-3    h-1.333H7.49c1.657,0,3,1.343,3,3v3V24.995z"
                />
                <path
                  fill="#dbe7f6"
                  d="M29.61,18.867l-19.12,19.12v7.008h9l0,0v-6.99v-2.5v0c0-1.381,1.119-2.5,2.5-2.5h0h2.5h6v-8.349v-3.667    C30.49,20.16,30.153,19.41,29.61,18.867z"
                />
                <path
                  fill="#b4cbea"
                  d="M4.49,24.995h6v-4.006c0-0.583-0.173-1.122-0.461-1.583L4.49,24.945V24.995z"
                />
                <rect
                  width="2"
                  height="3"
                  x="57.51"
                  y="17.989"
                  fill="#dbe7f6"
                />
                <rect
                  width="2"
                  height="3"
                  x="57.51"
                  y="22.989"
                  fill="#b4cbea"
                />
                <rect
                  width="2"
                  height="3"
                  x="57.51"
                  y="27.989"
                  fill="#79a1d5"
                />
                <rect
                  width="8"
                  height="3"
                  x="41.51"
                  y="19.995"
                  fill="#dbe7f6"
                />
                <path
                  fill="#dbe7f6"
                  d="M19.49,44.995L19.49,44.995l-4.99,0V45.5c0,1.378,1.117,2.495,2.495,2.495c1.378,0,2.495-1.117,2.495-2.495    v-2.016c0,0,0,0,0-0.001V44.995z"
                />
                <path
                  fill="#437abe"
                  d="M10.489,25.495h-6c-0.276,0-0.5-0.224-0.5-0.5v-4.006c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5v4.006    C10.989,25.271,10.766,25.495,10.489,25.495z M4.989,24.495h5v-3.506c0-1.378-1.121-2.5-2.5-2.5s-2.5,1.122-2.5,2.5V24.495z"
                />
                <path
                  fill="#437abe"
                  d="M19.489 45.495h-9c-.276 0-.5-.224-.5-.5V23.989c0-.276.224-.5.5-.5s.5.224.5.5v20.506h8.5c.276 0 .5.224.5.5S19.766 45.495 19.489 45.495zM30.489 33.505c-.276 0-.5-.224-.5-.5V20.989c0-1.378-1.121-2.5-2.5-2.5h-20c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h20c1.93 0 3.5 1.57 3.5 3.5v12.016C30.989 33.281 30.766 33.505 30.489 33.505zM57.511 48.495h-23c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h22.5v-31h-22v11.49c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-11.99c0-.276.224-.5.5-.5h23c.276 0 .5.224.5.5v32C58.011 48.271 57.787 48.495 57.511 48.495z"
                />
                <path
                  fill="#437abe"
                  d="M50.511 48.495c-.276 0-.5-.224-.5-.5v-10c0-.167.084-.323.223-.416l2.777-1.852V15.995c0-.276.224-.5.5-.5s.5.224.5.5v20c0 .167-.084.323-.223.416l-2.777 1.852v9.732C51.011 48.271 50.787 48.495 50.511 48.495zM59.511 21.489h-2c-.276 0-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5h2c.276 0 .5.224.5.5v3C60.011 21.266 59.787 21.489 59.511 21.489zM58.011 20.489h1v-2h-1V20.489zM59.511 26.489h-2c-.276 0-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5h2c.276 0 .5.224.5.5v3C60.011 26.266 59.787 26.489 59.511 26.489zM58.011 25.489h1v-2h-1V25.489zM59.511 31.489h-2c-.276 0-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5h2c.276 0 .5.224.5.5v3C60.011 31.266 59.787 31.489 59.511 31.489zM58.011 30.489h1v-2h-1V30.489zM16.989 48.485c-1.654 0-3-1.346-3-3v-.49h1v.49c0 1.103.897 2 2 2V48.485zM44.989 38.985h-1v-8.5c0-1.103-.897-2-2-2h-11.25v-1h11.25c1.654 0 3 1.346 3 3V38.985z"
                />
                <path
                  fill="#437abe"
                  d="M41.989,48.505h-25v-1c1.103,0,2-0.897,2-2v-10c0-1.654,1.346-3,3-3h20c1.654,0,3,1.346,3,3v10    C44.989,47.159,43.644,48.505,41.989,48.505z M19.224,47.505h22.766c1.103,0,2-0.897,2-2v-10c0-1.103-0.897-2-2-2h-20    c-1.103,0-2,0.897-2,2v10C19.989,46.272,19.699,46.974,19.224,47.505z"
                />
                <path
                  fill="#437abe"
                  d="M24.489 21.489h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5S24.766 21.489 24.489 21.489zM27.489 24.489h-14c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h14c.276 0 .5.224.5.5S27.766 24.489 27.489 24.489zM27.489 27.489h-14c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h14c.276 0 .5.224.5.5S27.766 27.489 27.489 27.489zM27.489 30.489h-14c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h14c.276 0 .5.224.5.5S27.766 30.489 27.489 30.489zM21.489 33.489h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5S21.766 33.489 21.489 33.489zM19.489 36.489h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5S19.766 36.489 19.489 36.489zM19.489 39.489h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5S19.766 39.489 19.489 39.489zM19.489 42.489h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5S19.766 42.489 19.489 42.489zM49.511 23.495h-8c-.276 0-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5h8c.276 0 .5.224.5.5v3C50.011 23.271 49.787 23.495 49.511 23.495zM42.011 22.495h7v-2h-7V22.495z"
                />
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
              <span class="top-0.5 relative">No Projects Created</span>
            </p>
          </>
        ) : (
          user &&
          projectCon.projects &&
          projectCon.projects
            .filter((proj) => user._id === proj.admin.id)
            .map((proj, i) => {
              let date = new Date(proj.createdAt).toDateString().substring(4);
              date = date.slice(0, 6) + "," + date.slice(6);

              return (i + 1) % 2 === 1 &&
                i === projectCon.projects.length - 1 ? (
                <div key={i} class="col-span-2 xl:px-64 lg:px-32 px-6">
                  <div
                    data-aos={"zoom-in"}
                    data-aos-once="true"
                    class={`w-full px-8  py-4 mt-1 mr-32 relative right-1.5 ${
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
                          history.push("/myprojects/manageproject");
                          sessionStorage.setItem("managing", proj._id);
                        }}
                      >
                        Manage
                      </button>
                    </div>

                    <div class="mt-2   ">
                      <a
                        href="#"
                        class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline"
                      >
                        {proj.name}
                      </a>
                      <p class="mt-4 xl:pb-1 pb-2  md:text-md text-sm text-gray-600 relative ">
                        {proj.problem}
                      </p>
                    </div>

                    {showMore[0] && showMore[1] == i ? (
                      <>
                        <br />
                        <h3>Category: {proj.category ? proj.category : ""}</h3>
                        <h3>
                          Maximum Team Capacity:{" "}
                          {proj.maxCap ? proj.maxCap : ""}
                        </h3>
                        <h3>No. of Members:</h3>

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
                        class="text-blue-600 z-[75] hover:cursor-pointer sm:bottom-0 bottom-[2px] relative  hover:underline"
                      >
                        View{" "}
                        {showMore[0] && showMore[1] === i ? "less" : "more"}
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
                        <a class="font-bold text-gray-700 cursor-pointer ">
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
                      <p class="mt-4 xl:pb-1 pb-2  md:text-md text-sm text-gray-600 ">
                        {proj.problem}
                      </p>
                    </div>

                    {showMore[0] && showMore[1] == i ? (
                      <>
                        <br />
                        <h3>Category: {proj.category ? proj.category : ""}</h3>
                        <h3>
                          Maximum Team Capacity:{" "}
                          {proj.maxCap ? proj.maxCap : ""}
                        </h3>
                        <h3>No. of Members:</h3>

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
                        class="text-blue-600 z-[75] hover:cursor-pointer sm:bottom-0 bottom-[2px] relative  hover:underline"
                      >
                        View{" "}
                        {showMore[0] && showMore[1] === i ? "less" : "more"}
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
                        <a class="font-bold text-gray-700 cursor-pointer ">
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

      <button
        onClick={() => setShowCreateModal(true)}
        class={`mt-4 ${
          projectCon.projects.length > 0
            ? "lg:-mb-[152px] xl:-mb-[149px] -mb-[145px] lg:top-[70px] top-[65px]"
            : "md:-mb-[3.9rem] sm:-mb-[2.9rem] -mb-[2.5rem] top-36 "
        } sm:left-[15px] z-[65] pointer-events-auto  bg-gradient-to-r  from-blue-600 to-blue-800 sm:w-5/12 w-7/12 rounded-md shadow-lg hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-400 active:shadow-sm p-2 pb-2.5  text-gray-50 font-semibold md:text-2xl sm:text-xl text-lg mx-auto text-center block justify-center relative`}
      >
        Create Project
      </button>
    </div>
  );
};

export default CreateProject;
