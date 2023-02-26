import { useState } from "react";
import { MdOutlineScheduleSend } from "react-icons/md";
import AllCourseDetails from "../Modals/AllCourseDetails";

const AllMentorshipSessions = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {showDetails ? (
        <AllCourseDetails
          course={props.workshop}
          close={() => setShowDetails(false)}
        />
      ) : (
        ""
      )}
      <div
        class={`rounded-md mb-8 shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}
      >
        <div
          data-aos={"fade-up"}
          data-aos-once="true"
          data-aos-delay="300"
          class="h-28 pt-2.5 "
        >
          <p className="text-center top-2 mt-2 block text-2xl font-semibold relative">
            All Course Materials:
          </p>
          <br />

          <>
            <h3 class="font-semibold text-center mx-auto uppercase xl:mt-2 mt-3 sm:mb-3 mb-6 relative text-lg xl:px-10 px-8">
              View <span class="text-blue-700">All Tasks, Lectures & Docs</span>
            </h3>

            <svg
              onClick={() => {
                setShowDetails(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-24 w-24 bg-blue-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-[18px]  block mx-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>

            <p class="text-center sm:w-1/2 w-2/3 mx-auto justify-center font-semibold text-gray-800 mb-1.5 ">
              Click here to view details..
            </p>

            <p class="text-sm sm:text-gray-600 text-gray-800 mt-6 bg-green-50 p-2 px-3 w-[90%] border-green-700 border-dashed border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-green-700 inline mr-[5px] relative bottom-[0.9px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              All course materials (tasks, recordings & docs) have been sent to
              you by email.{" "}
            </p>
          </>
        </div>
      </div>
    </>
  );
};

export default AllMentorshipSessions;
