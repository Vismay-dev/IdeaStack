import { useState } from "react";

import AllSessionDetails from "../Modals/AllSessionDetails";

const AllMentorshipSessions = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      class={`rounded-md mb-8 shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}
    >
      {showDetails ? (
        <AllSessionDetails close={() => setShowDetails(false)} />
      ) : (
        ""
      )}

      <div
        data-aos={"fade-up"}
        data-aos-once="true"
        data-aos-delay="300"
        class="h-28 pt-2.5 "
      >
        <p className="text-center top-2 text-xl font-semibold relative">
          Sessions (All Info):
        </p>
        <br />

        <>
          <h3 class="font-semibold text-center mx-auto xl:mt-2 mt-3 w-[300px] sm:mb-1 mb-4 top-1 relative text-2xl xl:w-[320px]  px-8">
            View <span class="text-blue-700">All Session</span> Details
          </h3>

          <svg
            onClick={() => setShowDetails(true)}
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 w-24 bg-blue-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-7  block mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          <p class="text-center mt-4 sm:w-1/3 w-1/2 mx-auto justify-center font-semibold text-gray-800 ">
            Click here to view details..
          </p>
        </>
      </div>
    </div>
  );
};

export default AllMentorshipSessions;
