import { useState } from "react";
import { MdOutlineScheduleSend } from "react-icons/md";

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
          All Course Materials:
        </p>
        <br />

        <>
          <h3 class="font-semibold text-center mx-auto xl:mt-2 mt-3 w-[300px] sm:mb-1 mb-4 top-1 relative text-xl xl:w-[320px]  px-8">
            View <span class="text-blue-700">All Tasks & Lectures</span>
          </h3>

          <MdOutlineScheduleSend class="h-24 w-24 bg-blue-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-9 mt-[39px]  block mx-auto" />

          <p class="text-center mt-3 sm:w-1/2 w-2/3 mx-auto justify-center font-semibold text-gray-800 ">
            Click here to view details..
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-10 w-10 text-center relative mx-auto block top-[17px] text-indigo-600 bg-blue-200 border-2 border-indigo-800 rounded-full p-1"
          >
            <path
              fill-rule="evenodd"
              d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
              clip-rule="evenodd"
            />
          </svg>
        </>
      </div>
    </div>
  );
};

export default AllMentorshipSessions;
