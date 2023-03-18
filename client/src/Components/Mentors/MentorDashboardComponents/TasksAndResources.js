import { useState } from "react";
import { MdOutlineScheduleSend } from "react-icons/md";
import AllCourseDetails from "../../Modals/AllCourseDetails";
import UploadMentorshipFile from "../../Modals/UploadMentorshipFile";

const TasksAndResources = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const [uploadType, setUploadType] = useState("none");
  const [viewType, setViewType] = useState("none");

  return (
    <>
      {showDetails ? (
        <AllCourseDetails
          startup={props.startup}
          viewType={viewType}
          close={() => setShowDetails(false)}
        />
      ) : (
        ""
      )}

      {showUpload ? (
        <UploadMentorshipFile
          type={uploadType}
          startup={props.startup}
          close={() => setShowUpload(false)}
        />
      ) : (
        ""
      )}

      <div class="object-center  w-[90%] bg-white h-fit pb-[265px]  shadow-md rounded-md pt-4 mb-12  relative mx-auto block ">
        <p className="text-center tracking-wide top-2 mt-2 mb-6 block text-4xl font-bold relative">
          Tasks and Resources:
        </p>
        <p class="mb-1 mt-2 block text-center font-semibold text-xl">
          <img
            class="rounded-full h-8 w-8 inline mr-2 border-gray-300 border-[0.5px] "
            src={props.startup.projPic}
          ></img>
          <span class=" bg-clip-text mx-auto relative top-0.5 text-transparent from-indigo-500 to-blue-500 bg-gradient-to-br ">
            {props.startup.name}
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
              <h3 class="font-bold text-center mx-auto uppercase sm:mb-3 mb-6 -mt-2 relative text-lg xl:px-10 px-8">
                {" "}
                <span class="text-gray-700">Upload Resource for Startup</span>
              </h3>

              <svg
                onClick={() => {
                  setUploadType("generalResource");
                  setShowUpload(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-24 w-24 bg-green-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-[18px]  block mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>

              <p class="text-sm sm:text-gray-600 text-gray-800 mt-6 mb-2 w-fit bg-gray-50 p-2 px-3  border-gray-200  border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-gray-700 inline mr-[5px] relative bottom-[0.9px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                Upload relevant documents/resources to guide mentees in your
                field of expertise.{" "}
              </p>
            </>

            <hr class="my-7 mt-8 border-t-1.5 border-gray-200" />

            <>
              <h3 class="font-bold text-center mx-auto uppercase sm:mb-3 mb-6 relative text-lg xl:px-10 px-8">
                {" "}
                <span class="text-gray-700">
                  Upload a Task/Assignment Reference Doc
                </span>{" "}
              </h3>

              <i
                onClick={() => {
                  setUploadType("taskReference");
                  setShowUpload(true);
                }}
                class="fas fa-directions text-[66px] h-24 w-24 bg-green-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-[18px]  block mx-auto"
              ></i>

              <p class="text-sm sm:text-gray-600 text-gray-800 mt-6 mb-2 w-fit bg-gray-50 p-2 px-3  border-gray-200  border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-gray-700 inline mr-[5px] relative bottom-[0.9px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                Upload documents that will clarify/contextualize your
                tasks/assignments.{" "}
              </p>
            </>

            <hr class="my-7 mt-8 border-t-1.5 border-gray-200" />
            <>
              <h3 class="font-bold text-gray-700 text-center mx-auto uppercase xl:mt-5 mt-6 sm:mb-3 mb-6 relative text-lg xl:px-10 px-8">
                <span class="text-gray-700">View All Startup Documents</span> (
                {props.startup.documents.filter((doc) => doc.visibleToMentors)
                  .length +
                  props.startup.currentMentorship.materials.uploads.length}
                )
              </h3>

              <svg
                onClick={() => {
                  setViewType("startupDocs");
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
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>

              <p class="text-sm sm:text-gray-600 text-gray-800 mt-6 mb-2 w-fit bg-gray-50 p-2 px-3  border-gray-200  border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-gray-700 inline mr-[5px] relative bottom-[0.9px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                View all documents uploaded by the startup team.{" "}
              </p>
            </>

            <hr class="my-7 mt-8 border-t-1.5 border-gray-200" />
            <>
              <h3 class="font-bold text-center text-gray-700 mx-auto uppercase xl:mt-5 mt-6 sm:mb-3 mb-6 relative text-lg xl:px-10 px-8">
                <span class="text-gray-700">View Your Uploads</span> (
                {props.startup.currentMentorship.materials.otherDocs.length +
                  props.startup.currentMentorship.materials.taskRefs.length}
                )
              </h3>

              <i
                onClick={() => {
                  setViewType("mentorDocs");
                  setShowDetails(true);
                }}
                class="fas fa-upload text-[66px] h-24 w-24 bg-blue-700 text-white p-4 rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-[18px]  block mx-auto"
              ></i>

              <p class="text-sm sm:text-gray-600 text-gray-800 mt-6 mb-2 w-fit bg-gray-50 p-2 px-3  border-gray-200  border-[1px] rounded-md  sm:font-semibold font-normal leading-5  mx-auto relative block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-gray-700 inline mr-[5px] relative bottom-[0.9px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                View all of your uploads - task references & general docs.{" "}
              </p>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksAndResources;
