import { useState } from "react";
import { MdOutlineScheduleSend } from "react-icons/md";
import AllCourseDetails from "../../Modals/AllCourseDetails";
import UploadMentorshipFile from "../../Modals/UploadMentorshipFile";

const TasksAndResources = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const [type, setType] = useState(null);
  return (
    <>
      {showDetails ? (
        <AllCourseDetails
          mentor={props.mentor}
          isTasks={type === "tasks" ? true : false}
          close={() => setShowDetails(false)}
        />
      ) : (
        ""
      )}

      {showUpload ? (
        <UploadMentorshipFile
          mentor={props.mentor}
          close={() => setShowUpload(false)}
        />
      ) : (
        ""
      )}

      <div class="object-center  sm:w-[90%] w-[100%] bg-white h-fit md:pb-0 sm:pb-14 pb-0  shadow-md rounded-md pt-4 sm:mb-12 mb-24 right-2 relative mx-auto block ">
        <p className="text-center tracking-wide top-2 mt-2 mb-6 sm:px-3 px-6 block md:text-4xl sm:text-3xl text-2xl  font-bold relative">
          Tasks and Resources:
        </p>
        <p class="mb-1 mt-2 block text-center font-semibold sm:text-xl text-lg">
          <img
            class="rounded-full sm:h-8 sm:w-8 h-7 w-7 inline mr-2 border-gray-300 border-[0.5px] "
            src={props.mentor.pic}
          ></img>
          <span class=" bg-clip-text mx-auto text-transparent from-indigo-500 to-blue-500 bg-gradient-to-br ">
            {props.mentor.name}
          </span>
        </p>

        <hr class="mt-8 -mb-0.5  border-t-1.5 border-gray-200" />

        <div
          data-aos={"fade-up"}
          data-aos-once="true"
          data-aos-delay="300"
          class={` h-[800px]  gap-7`}
        >
          <div class="h-28 pt-2.5 ">
            <br />

            <>
              <h3 class="font-bold text-center mx-auto uppercase sm:mb-3 mb-6 -mt-2 relative sm:text-lg text-base xl:px-10 px-8">
                {" "}
                <span class="text-gray-700">Upload Document</span>
              </h3>

              <svg
                onClick={() => {
                  setShowUpload(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="sm:h-24 sm:w-24 h-20 w-20 bg-green-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-[18px]  block mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                />
              </svg>

              <p class="lg:text-sm text-xs text-center sm:text-gray-600 text-gray-800 mt-6 mb-2 md:w-fit sm:w-[80%] w-[90%] bg-gray-50 p-2 px-3  border-gray-200  border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="lg:w-5 lg:h-5 w-4 h-4 text-gray-700 inline mr-[5px] relative bottom-[0.8px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                Upload documents to complete assignments set by your mentor
                <p class="sm:inline hidden">, as mentioned in meetings.</p>{" "}
              </p>
            </>

            <hr class="my-7 mt-8 border-t-1.5 border-gray-200" />

            <>
              <h3 class="font-bold text-center mx-auto uppercase sm:mb-3 mb-6 relative sm:text-lg text-base xl:px-10 px-8">
                {" "}
                <span class="text-gray-700">
                  View Task Uploads & Reference Documents
                </span>{" "}
                (
                {props.mentor.materials.taskRefs.length +
                  props.mentor.materials.uploads.length}
                )
              </h3>

              <svg
                onClick={() => {
                  setType("tasks");
                  setShowDetails(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="sm:h-24 sm:w-24 h-20 w-20 bg-blue-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-[18px]  block mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>

              <p class="lg:text-sm text-xs text-center md:w-fit sm:w-[80%] w-[90%] sm:text-gray-600 text-gray-800 mt-6 mb-2 bg-gray-50 p-2 px-3  border-gray-200  border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="lg:w-5 lg:h-5 w-4 h-4 text-gray-700 inline mr-[5px] relative bottom-[0.9px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <p class="sm:inline hidden">
                  {" "}
                  View reference documents uploaded by your mentor to aid you in
                  completing assignments.
                </p>
                <p class="sm:hidden inline">
                  Reference documents to aid you in completing assignments.
                </p>{" "}
              </p>
            </>

            <hr class="my-7 mt-8 border-t-1.5 border-gray-200" />
            <div class="sm:shadow-none sm:bg-transparent bg-white rounded-bottom-md pb-8 shadow-md">
              <h3 class="font-bold text-center mx-auto uppercase xl:mt-5 mt-6 sm:mb-3 mb-6 relative sm:text-lg text-base xl:px-10 px-8">
                <span class="text-gray-700">View Mentor's Resources</span> (
                {props.mentor.materials.otherDocs.length})
              </h3>

              <svg
                onClick={() => {
                  setType("other");
                  setShowDetails(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="sm:h-24 sm:w-24 h-20 w-20 bg-blue-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-[18px]  block mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>

              <p class="lg:text-sm text-xs text-center md:w-fit sm:w-[80%] w-[90%] sm:text-gray-600 text-gray-800 mt-6 mb-2 bg-gray-50 p-2 px-3  border-gray-200  border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="lg:w-5 lg:h-5 w-4 h-4 text-gray-700 inline mr-[5px] relative bottom-[0.9px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                View exclusive resources/theory/recordings/links etc.
                <p class="sm:inline hidden"> provided by your mentor.</p>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksAndResources;
