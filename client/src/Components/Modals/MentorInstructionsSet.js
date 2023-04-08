import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import logo from "./logo.png";
import axios from "axios";
import projectContext from "../../context/projectContext";
import mentorAccContext from "../../context/mentorAccContext";

const MentorInstructionsSet = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const history = useRouter();

  const myRef = useRef();

  const projCon = useContext(projectContext);
  const mentorCon = useContext(mentorAccContext);

  const [instructions, setInstructions] = useState(
    props.upcomingMeeting.mentorInstructions
  );

  const [edited, setEdited] = useState(false);
  const updateInstructions = () => {
    setEdited(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateInstructions"
          : "http://localhost:4000/api/user/updateInstructions",
        {
          token: sessionStorage.getItem("mentorToken"),
          mentorId: mentorCon.mentor._id,
          projectId: props.startup._id,
          instructions: instructions,
        }
      )
      .then((res) => {
        projCon.setProject(res.data);
        setTimeout(() => {
          setEdited(false);
          props.close();
        }, 800);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
  }, [myRef, () => props.close()]);

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
          data-aos="fade-up"
          data-aos-once="true"
          class="pr-6 relative sm:top-2 top-12 inline-block align-bottom z-50 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 mb-36 sm:align-middle sm:max-w-lg sm:w-10/12 w-11/12"
        >
          <div
            ref={myRef}
            class="bg-white w-full px-1 pt-2 pb-2 sm:p-6 sm:pb-4 z-50"
          >
            <div class="sm:flex sm:items-center w-full">
              <div class=" text-center sm:mt-0 block mx-auto w-full sm:text-left">
                <div>
                  <p class="text-lg  text-gray-500">
                    {/* form starts here */}
                    <div class="sm:right-0 -right-2 min-h-full relative items-center justify-center py-3 px-5 sm:px-6 lg:px-5">
                      <div class="w-full  space-y-8">
                        <div class="w-full  mx-auto block ">
                          <h1 class="sm:-mt-2.5 mt-1.5 text-center mb-6 text-black font-bold text-2xl">
                            {props.type === "create"
                              ? "Set Instructions"
                              : "Edit Instructions"}
                          </h1>
                          <img
                            class="rounded-full w-[75px] border-[1px] border-gray-200 p-1 h-[75px] mx-auto block"
                            src={props.startup.projPic}
                          ></img>
                          <h1 class="mt-2.5  text-center font-bold text-lg">
                            {props.startup.name}
                          </h1>
                          <h2 class="  relative mb-1 mt-4 text-center text-base font-extrabold text-gray-900">
                            Mentor Instructions
                          </h2>
                          <h1 class="mt-[1px] mb-1 text-center uppercase text-blue-700 font-bold text-xs">
                            {props.upcomingMeeting
                              ? "week " +
                                props.upcomingMeeting.week +
                                " meeting"
                              : ""}
                          </h1>

                          <div role="alert" class="sm:px-12 px-4">
                            <textarea
                              value={instructions}
                              onChange={(e) => {
                                e.preventDefault();
                                setInstructions(e.target.value);
                              }}
                              placeholder={
                                "Enter Meeting Instructions for Mentees..."
                              }
                              class="text-sm block mt-6 mx-auto w-full  h-[140px] mb-1.5 border-indigo-500 border-2 rounded-md text-gray-900 p-3 pt-2 "
                            ></textarea>

                            <button
                              onClick={() => {
                                updateInstructions();
                              }}
                              disabled={edited}
                              class={`w-full mt-5 shadow-sm hover:shadow-lg font-semibold block rounded-md ${
                                edited
                                  ? "bg-green-600 "
                                  : "bg-blue-700 hover:bg-blue-600"
                              }  text-white text-sm uppercase px-3 py-2`}
                            >
                              {edited ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-[18px] h-[18px] inline mr-1 relative bottom-[1px]"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              ) : (
                                ""
                              )}{" "}
                              {edited
                                ? "EDITED"
                                : props.type === "create"
                                ? "SUBMIT"
                                : "EDIT"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 px-4 py-3 ml-5 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={props.close}
              type="button"
              class="mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorInstructionsSet;
