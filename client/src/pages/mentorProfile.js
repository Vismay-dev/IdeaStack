import { useEffect, useState, useContext, useRef } from "react";
import img from "./assets/img/team-2-800x800.jpg";
import userContext from "../../context/userContext";
import mentorAccContext from "../../context/mentorAccContext";
import axios from "axios";
import EditModal from "../Modals/EditModal";
import Tooltip from "react-power-tooltip";
import { FaProjectDiagram } from "react-icons/fa";
import { RiFileList2Fill } from "react-icons/ri";
import { GrChapterAdd } from "react-icons/gr";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

import AOS from "aos";
import "aos/dist/aos.css";

const MentorProfile = () => {
  const [showmore, setShowmore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, [showmore, loading]);

  const currentMentor = useContext(mentorAccContext);

  const [image, setImage] = useState(
    currentMentor.mentor.pic ? currentMentor.mentor.pic : null
  );
  const [showToolTip, setShowToolTip] = useState(false);
  const [showToolTip2, setShowToolTip2] = useState(false);
  const [showToolTip3, setShowToolTip3] = useState(false);
  const [modalType, setModalType] = useState("");

  const [mentor, setMentor] = useState(
    currentMentor ? currentMentor.mentor : false
  );

  const changeHandler = (e) => {
    setMentor({
      ...mentor,
      [e.target.name]: e.target.value,
    });
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const submitHandler = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateMentor" // was updateUser
          : "http://localhost:4000/api/user/updateMentor",
        { mentor, token: sessionStorage.getItem("mentorToken") }
      )
      .then((res) => {
        console.log(res.data);
        setMentor(res.data);
        currentMentor.setMentor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputRef = useRef(null);
  const dummyRef = useRef(null);

  const [picLoading, setPicLoading] = useState(false);

  const [editModalShow, setEditModalShow] = useState(false);
  const profPicUpload = (e) => {
    e.preventDefault();
    setPicLoading(true);
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("token", sessionStorage.getItem("mentorToken"));
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/uploadMentorPic" // was uploadProfPic
          : "http://localhost:4000/api/user/uploadMentorPic",
        data
      )
      .then((res) => {
        console.log(res.data);
        currentMentor.setMentor(res.data);
        setImage(res.data.pic);
        setPicLoading(false);
      })
      .catch((err) => {
        setPicLoading(false);
        console.log(err.response);
      });
  };

  const removeProfPic = (e) => {
    setPicLoading(true);
    const removedProfPic = { ...mentor, pic: "" };
    console.log(removedProfPic);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateMentor" // was updateUser
          : "http://localhost:4000/api/user/updateMentor",
        { mentor: removedProfPic, token: sessionStorage.getItem("mentorToken") }
      )
      .then((res) => {
        currentMentor.setMentor(removedProfPic);
        setPicLoading(false);
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : null);
      });
  };

  const history = useRouter();

  return (
    <div class="xl:pt-28  pt-28 -mb-72 relative  overflow-hidden bg-gradient-to-r from-gray-200 to-blue-200">
      <div ref={dummyRef}></div>
      {editModalShow ? (
        <EditModal
          type={modalType}
          close={() => {
            setEditModalShow(false);
          }}
        />
      ) : (
        ""
      )}

      <h1 class="relative mx-auto xl:-mt-12 2xl:-mb-16 xl:-mb-6 xl:py-8 xl:pt-4   lg:mb-11 md:-mt-4 md:mb-16 sm:mt-2 sm:mb-28 -mt-10 mb-44 px-4 text-center sm:text-6xl text-5xl font-semibold">
        <span class="text-blue-600">Your</span> Profile
      </h1>
      <div class="relative xl:-mt-[295px] lg:-mt-[277px] md:-mt-[270px] sm:-mt-[300px] -mt-[310px] block max-h-80">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <section className="relative block h-500-px mt-32 mb-12 ">
        <div
          className="absolute top-0 z-20 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col  min-w-0  break-words bg-gradient-to-br from-white to-gray-100 w-full lg:-mb-40 md:-mb-16  md:mt-5 lg:mt-4 sm:-mb-8 sm:mt-7 -mb-2 shadow-xl rounded-lg">
            <div className="px-6">
              <div
                data-aos={"zoom-in-up"}
                data-aos-once="true"
                className="flex flex-wrap justify-center"
              >
                <div className="lg:w-4/12 w-[270px] xl:w-3/12 xl:ml-10   px-4  lg:order-2 order-1 flex justify-center">
                  <div className="relative scale-90 rounded-r-full  p-3">
                    <input
                      ref={inputRef}
                      onChange={profPicUpload}
                      type="file"
                      name="article_picture"
                      style={{ display: "none" }}
                    />
                    {picLoading ? (
                      <div class="relative top-3 my-3 mb-7 block">
                        <ClipLoader
                          color={"#0b0bbf"}
                          loading={picLoading}
                          size={70}
                        />
                      </div>
                    ) : (
                      <img
                        class={`rounded-full -mt-16 -mb-6 lg:w-52 lg:h-52 sm:w-52 sm:h-52 h-48 w-48   object-contain border-2 border-dashed border-blue-700 bg-white  shadow-lg block ${
                          currentMentor.mentor.pic ? "" : "p-2 "
                        } relative`}
                        src={
                          currentMentor.mentor.pic
                            ? currentMentor.mentor.pic
                            : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                        }
                      />
                    )}
                    {currentMentor.mentor.pic ? (
                      <i
                        data-tip="Remove Picture"
                        onMouseOver={() => setShowToolTip2(true)}
                        onMouseLeave={() => setShowToolTip2(false)}
                        onClick={() => {
                          setShowToolTip2(false);
                          removeProfPic();
                        }}
                        className={`fas hover:cursor-pointer hover:text-orange-700  fa-trash font-semibold text-2xl absolute lg:right-0 -right-6 ${
                          picLoading
                            ? "bottom-5 -right-2"
                            : "lg:bottom-8 bottom-6 "
                        } text-red-600`}
                      >
                        <Tooltip
                          show={showToolTip2}
                          position="right"
                          fontSize="16px"
                          padding="3px 5px"
                        >
                          <span class="font-semibold text-center font-sans bottom-0.5">
                            Remove Picture
                          </span>
                        </Tooltip>
                      </i>
                    ) : (
                      ""
                    )}
                    <i
                      onMouseOver={() => setShowToolTip(true)}
                      onMouseLeave={() => setShowToolTip(false)}
                      onClick={() => {
                        setShowToolTip(false);
                        inputRef.current.click();
                      }}
                      className={`fas hover:cursor-pointer hover:text-indigo-700 text-2xl fa-camera font-semibold  ${
                        currentMentor.mentor.pic
                          ? "lg:bottom-1.5 -bottom-4 lg:right-9 right-1 absolute"
                          : "right-2 bottom-3 absolute"
                      } ${picLoading ? "mt-2" : "-mt-1"} text-gray-800`}
                    >
                      <Tooltip
                        position="bottom"
                        fontSize="16px"
                        padding="3px 5px"
                        show={showToolTip}
                        className="p-1"
                      >
                        <span class="font-semibold text-center font-sans bottom-0.5">
                          {currentMentor.mentor.pic
                            ? "Change Picture"
                            : "Upload Picture"}
                        </span>
                      </Tooltip>
                    </i>{" "}
                  </div>
                </div>
                <div className="w-full lg:w-4/12  px-4 lg:order-3 order-2 mx-auto text-center lg:mt-0 mt-7 lg:left-0 sm:left-2.5 left-1 relative lg:text-right lg:self-center">
                  <div className="py-6 px-3 lg:mt-4 mt-1 sm:mt-0">
                    <button
                      onClick={() => {
                        setModalType("mentorProfile");
                        setEditModalShow(true);
                      }}
                      className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-400 uppercase text-white font-bold hover:shadow-lg shadow-sm text-md px-3 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-24 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Edit Information
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 xl:ml-3 px-4 xl:top-1.5 lg:mt-0 -mt-[105px] lg:left-0 left-[10px] relative lg:order-1 order-2">
                  <div className="flex justify-center py-4 xl:right-7 lg:right-3 right-0 relative lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {/* {currentUser.user &&
                          currentUser.user.projects.filter(onlyUnique).length} */}{" "}
                        {mentor &&
                          mentor.currentMentees &&
                          mentor.currentMentees.length}
                      </span>
                      <span className="text-sm top-1 relative text-blueGray-400">
                        Mentee Startups
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {mentor &&
                          mentor.mentorshipRequests &&
                          mentor.mentorshipRequests.filter(
                            (request) =>
                              !mentor.currentMentees.includes(request)
                          ).length}
                      </span>
                      <span className="text-sm top-1 relative text-blueGray-400">
                        Mentorship Requests
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="sm:text-4xl text-3xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {currentMentor ? currentMentor.mentor.name : " "}
                </h3>
                <div className="text-sm leading-normal mt-6 sm:mb-2 mb-4 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-tools relative top-[1px] mr-2  sm:text-lg text-sm sm:text-gray-400 text-gray-500"></i>
                  Expertise
                  {": "}
                  <br class="sm:hidden block font-normal" />
                  {currentMentor ? currentMentor.mentor.expertise : " "}
                </div>

                <div className="text-sm border-gray-200 leading-normal mb-10 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 top-0.5 relative  sm:text-lg text-sm text-gray-400"></i>{" "}
                  {currentMentor ? currentMentor.mentor.city + ", " : " "}{" "}
                  {currentMentor ? currentMentor.mentor.country : " "}
                </div>

                <div className="mb-3 border-t-[1.5px] mt-2 sm:pt-7 pt-6 pb-4 border-gray-200 text-left  text-blueGray-600 px-4">
                  <i className="fas fa-building mr-2 left-[3px]  sm:text-lg text-base inline relative top-[1px] sm:text-teal-500 text-teal-600"></i>

                  <p class="sm:mt-2 mt-1 pb-[14px] lg:right-0 relative inline  font-medium">
                    <strong class="sm:mb-0 -mb-6 sm:inline inline">
                      {" "}
                      Organizations:
                    </strong>{" "}
                    <div class="sm:hidden block mb-4" />
                    {currentMentor &&
                      currentMentor.mentor.orgs &&
                      currentMentor.mentor.orgs.map((org, i) => {
                        return (
                          <span
                            class={` ${
                              i == 2
                                ? "sm:-mt-[14px]  inline sm:pt-[16px] pt-[24px]"
                                : "sm:mt-0 inline"
                            } mr-2`}
                          >
                            {" "}
                            {i == 6 ? (
                              <>
                                {" "}
                                <br class="sm:inline hidden" />{" "}
                              </>
                            ) : (
                              ""
                            )}
                            <div class="sm:hidden block mt-1" />{" "}
                            <span class="sm:inline hidden">
                              {i !== 0 ? " || " : ""}
                            </span>{" "}
                            <img
                              src={org.pic}
                              class="sm:w-7 sm:h-7 w-5 h-5 shadow-md ml-3 sm:mb-1 inline rounded-full"
                            ></img>{" "}
                            <span class="ml-1 lg:inline hidden">
                              {org.name}
                            </span>{" "}
                            <span class="ml-1 mr-2 sm:bottom-0 bottom-1 sm:text-base text-sm lg:hidden inline">
                              {org.name.split(" ")[0]}
                            </span>{" "}
                          </span>
                        );
                      })}
                  </p>
                </div>

                <div className="mb-3 border-t-[1.5px] mt-2 pt-7 sm:text-base text-sm border-gray-200 text-left  text-blueGray-600 px-4">
                  <i className="fas fa-user-plus mr-2 sm:text-lg text-base sm:text-indigo-500 text-indigo-600"></i>
                  <span class="sm:font-normal font-medium">
                    <strong>Mentorship Proposition:</strong>
                  </span>{" "}
                  {currentMentor ? currentMentor.mentor.mentorshipProp : " "}
                </div>
                <div className="sm:mb-5 text-left sm:text-base text-sm border-t-[1.5px] mt-8 pt-7 border-gray-200  mb-8 text-blueGray-600 px-4">
                  <i className="fas fa-backward mr-2  relative top-[1px] sm:text-lg text-base sm:text-blue-500 text-blue-600"></i>
                  <span class="">
                    <strong>Background</strong>
                  </span>
                  : {currentMentor ? currentMentor.mentor.background : " "}
                </div>
                <div className="sm:mb-5 text-left sm:text-base text-sm border-t-[1.5px] mt-8 sm:pt-7 pt-6 sm:pb-5 pb-0 border-gray-200  mb-8 text-blueGray-600 px-4">
                  <i className="fas fa-fire mr-2 relative top-[1px] sm:text-lg text-base sm:text-orange-400 text-orange-500"></i>
                  <span class="sm:font-normal font-medium">
                    <strong>Strengths</strong>
                  </span>
                  :{" "}
                  {currentMentor ? (
                    <div className="mt-4">
                      <ul
                        role="list"
                        className="pl-4 list-disc text-sm space-y-2"
                      >
                        {currentMentor.mentor &&
                          currentMentor.mentor.strengths &&
                          currentMentor.mentor.strengths.map((str) => (
                            <li key={str} className="text-gray-400">
                              <span className="text-gray-600">{str}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : (
                    " "
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="relative -mt-6 max-h-96  lg:mt-5">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default MentorProfile;
