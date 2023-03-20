import { useContext, useEffect, useState } from "react";

import ReactTooltip from "react-tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import fileDownload from "js-file-download";

import axios from "axios";
import userContext from "../../context/userContext";
import projectContext from "../../context/projectContext";

const CourseMaterials = (props) => {
  console.log(props.materials);

  const [materials, setMaterials] = useState(
    props.materials ? props.materials : []
  );

  const user = useContext(userContext).user;

  useEffect(() => {
    setMaterials(props.materials);
  }, [props.materials]);

  const deleteFile = (index, categ) => {
    const newFileArr = materials.arrUploads;
    newFileArr.splice(index, 1);
    console.log(newFileArr);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateMentorshipFiles"
          : "http://localhost:4000/api/user/updateMentorshipFiles",
        {
          token: sessionStorage.getItem("token"),
          docs: newFileArr,
          mentorId: props.mentorId,
          docCategory: "taskSubs",
        }
      )
      .then((res) => {
        projCon.setProject(res.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const projCon = useContext(projectContext);

  const downloadResource = (doc, i, categ) => {
    const newFileArr =
      categ === "otherDocs"
        ? materials.otherDocs
        : categ === "taskRefs"
        ? materials.arrTaskRefs
        : categ === "taskSubs"
        ? materials.arrUploads
        : [];
    newFileArr[i].downloads += 1;
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateMentorshipFiles"
          : "http://localhost:4000/api/user/updateMentorshipFiles",
        {
          token: sessionStorage.getItem("token"),
          docs: newFileArr,
          docCategory: categ,
          mentorId: props.mentorId,
        }
      )
      .then((res) => {
        // setMaterials(res.data[0]);
        projCon.setProject(res.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(doc.file, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, doc.title);
      });
  };

  return (
    <div class="left-2 mt-5 relative w-full">
      <div class="bg-gradient-to-r from-blue-100 to-indigo-200 pt-4 left-1.5 relative  mt-7 rounded-md shadow-lg pb-11  sm:px-7  px-3">
        <>
          <div class=" items-center top-2 mb-5 mt-2 xl:px-72 lg:px-40 md:px-6 sm:px-2 px-2  text-center  relative justify-center">
            <p class="sm:text-sm text-xs sm:text-gray-600 text-gray-800 mb-1.5 mt-1 bg-green-50 p-2 px-3 border-green-700 border-dashed border-[1px] rounded-md  sm:font-semibold font-normal leading-5 mx-auto relative block ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="sm:w-5 sm:h-5 w-4 h-4 text-green-700 inline mr-[5px] relative bottom-[0.9px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              "Task/Assignment References" are documents provided by your mentor
              to help you complete your tasks.{" "}
            </p>
            <p
              class={`sm:text-sm text-xs sm:text-gray-600 text-gray-800 mt-3  sm:font-semibold bg-yellow-50 p-2 px-3 border-yellow-600 border-dashed border-[1px] rounded-md font-normal leading-5 mx-auto relative ${
                props.isTasks ? "block" : "hidden"
              } `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="sm:w-5 sm:h-5 w-4 h-4 text-red-700 inline mr-[5px] relative bottom-[1px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                />
              </svg>
              Kindly follow the deadlines set by your mentor & upload the
              necessary documents. Your mentor will provide you with feedback.{" "}
            </p>
            <p class="lg:hidden block mx-auto text-center sm:mt-8 mt-10 sm:mb-8 mb-6 relative md:text-base sm:text-sm text-xs sm:px-6 px-1.5  ">
              <strong class="underline">Note:</strong> Horizontally scroll
              panels/rows to see more details on each document/resource
            </p>
          </div>
          <div class="mt-[54px]">
            {props.isTasks ? (
              <>
                <h1 class="text-center font-bold md:-mt-1 -mt-4 sm:text-2xl text-xl mb-2">
                  Task/Assignment References:
                </h1>
                <h2 class="sm:text-sm text-xs uppercase text-center font-bold text-blue-700 sm:mt-0 mt-3 mb-8">
                  Docs/Resources to Help You Complete Assignments
                </h2>

                {props.loading ? (
                  <div class="relative mx-auto sm:my-10 my-12 mb-16 pb-3 pt-1.5 text-center block justify-center">
                    <ClipLoader
                      color={"#0b0bbf"}
                      loading={props.loading}
                      size={60}
                    />
                  </div>
                ) : !materials.arrTaskRefs ||
                  materials.arrTaskRefs.length === 0 ? (
                  <h1 class="relative mx-auto text-center text-xl justify-center  pb-1 mt-[52px] mb-[48px] right-[2px] block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-8 mr-2 w-8 text-orange-700 inline relative bottom-[1.6px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                      />
                    </svg>{" "}
                    <span class="font-semibold ">
                      No Tasks References Have Been Uploaded
                    </span>
                  </h1>
                ) : (
                  <div class="overflow-x-auto my-2">
                    <table class=" whitespace-nowrap lg:w-full w-[670px] mb-[38px]  relative mt-1  mx-auto space-y-2">
                      <tbody class="space-y-2">
                        {materials.arrTaskRefs &&
                          materials.arrTaskRefs.map((material, i) => {
                            function convertDate(inputFormat) {
                              function pad(s) {
                                return s < 10 ? "0" + s : s;
                              }
                              var d = new Date(inputFormat);
                              return [
                                pad(d.getDate()),
                                pad(d.getMonth() + 1),
                                d.getFullYear(),
                              ].join("/");
                            }

                            let dateUploaded = convertDate(
                              material.dateOfUpload
                            );

                            return (
                              <tr
                                title="Hello This Will Have Some Value"
                                key={i}
                                tabindex="0"
                                class="focus:outline-none   hover:shadow-blue-400 h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded"
                              >
                                <td>
                                  <div class="ml-5 pl-[10px] -mr-20">
                                    <img
                                      class="object-cover w-10 h-10 shadow-md mx-2  relative right-1 rounded-full block"
                                      src={
                                        material.uploaderPic
                                          ? material.uploaderPic
                                          : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                                      }
                                      alt="avatar"
                                    />
                                  </div>
                                </td>
                                <td class="lg:-mr-[100px] -mr-[40px] ml-[50px] top-6 block relative">
                                  <div class="flex items-center lg:pl-20 pl-8">
                                    <p class="text-sm font-medium hover:underline hover:text-blue-700 leading-none text-gray-700 mr-2">
                                      {material.title}
                                    </p>
                                  </div>
                                </td>

                                <td class="pl-5">
                                  <div class="flex relative -mr-3 left-4 items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5 top-[1px]"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2">
                                      {material.downloads}
                                    </p>
                                  </div>
                                </td>

                                <td class="pl-5 -mr-3 relative">
                                  <div class="flex items-center relative xl:-left-4 left-4 -mr-10">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5 top-[1px]"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2">
                                      {dateUploaded}
                                    </p>
                                  </div>
                                </td>
                                <td class="pl-5">
                                  <button
                                    onClick={() => {
                                      downloadResource(material, i, "taskRefs");
                                    }}
                                    class="focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:shadow-sm focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded  relative left-6 xl:-mr-10 -mr-6 ml-8 hover:bg-gray-200 focus:outline-none"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-4 w-4 inline relative -mt-[2.5px] "
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                      />
                                    </svg>{" "}
                                    Download
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}

                <h1 class="text-center font-bold -mt-1 sm:text-2xl text-xl mb-2">
                  Your Uploads:
                </h1>
                <h2 class="sm:text-sm text-xs uppercase text-center font-bold text-blue-700 sm:mt-0 mt-3 mb-8">
                  Task/Assignment-Based Docs You've Uploaded
                </h2>

                {props.loading ? (
                  <div class="relative mx-auto  my-12 mb-10 pb-3 pt-1.5 text-center block justify-center">
                    <ClipLoader
                      color={"#0b0bbf"}
                      loading={props.loading}
                      size={60}
                    />
                  </div>
                ) : !materials.arrUploads ||
                  materials.arrUploads.length === 0 ? (
                  <h1 class="relative mx-auto text-center text-xl justify-center  pb-1 mt-[50px] right-[2px] mb-[22px] block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-8 mr-1 w-8 text-orange-700 inline relative bottom-[1.6px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>{" "}
                    <span class="font-semibold ">No Documents Uploaded</span>
                  </h1>
                ) : (
                  <div class="overflow-x-auto my-2">
                    <table class=" whitespace-nowrap lg:w-full w-[670px]  relative mt-1  mx-auto space-y-2">
                      <tbody class="space-y-2 ">
                        {materials &&
                          materials.arrUploads.map((material, i) => {
                            function convertDate(inputFormat) {
                              function pad(s) {
                                return s < 10 ? "0" + s : s;
                              }
                              var d = new Date(inputFormat);
                              return [
                                pad(d.getDate()),
                                pad(d.getMonth() + 1),
                                d.getFullYear(),
                              ].join("/");
                            }

                            let dateUploaded = convertDate(
                              material.dateOfUpload
                            );

                            return (
                              <tr
                                key={i}
                                tabindex="0"
                                class="focus:outline-none h-16 border bg-white hover:shadow-blue-400 border-gray-300 mb-3 relative shadow-md rounded"
                              >
                                <td>
                                  <div class="ml-5 pl-[10px] xl:-mr-12 -mr-12">
                                    <img
                                      class="object-cover w-10 h-10 shadow-md mx-2 xl:mr-2 lg:mr-5 mr-20 relative right-1 rounded-full block"
                                      src={
                                        material.uploaderPic
                                          ? material.uploaderPic
                                          : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                                      }
                                      alt="avatar"
                                    />
                                  </div>
                                </td>

                                <td>
                                  <div class="ml-5">
                                    <div class="rounded-sm w-5 xl:-mr-2 lg:mr-2 -mr-1  h-5 xl:left-9 lg:left-6 left-1 flex flex-shrink-0 justify-center items-center relative">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6 top-[0.5px] relative text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </td>

                                <td class="">
                                  <div class="flex items-center pl-5">
                                    <p class="text-sm font-medium leading-none text-gray-700 mr-2">
                                      {material.title}
                                    </p>
                                  </div>
                                </td>

                                <td class="xl:pl-5 pl-1">
                                  <div class="flex relative -mr-3 left-4 items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5 top-[1px]"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2">
                                      {material.downloads}
                                    </p>
                                  </div>
                                </td>

                                <td class="pl-5 xl:-mr-3 lg:mr-0 mr-4 relative">
                                  <div class="flex items-center relative xl:left-5 left-8 xl:-mr-10 lg:-mr-5 mr-0">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5 top-[1px]"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2">
                                      {dateUploaded}
                                    </p>
                                  </div>
                                </td>

                                <td
                                  class={`pl-1`}
                                  data-tip={
                                    material.uploadedBy !==
                                    user.firstName + " " + user.lastName
                                      ? "Can only be deleted by: " +
                                        material.uploadedBy
                                      : ""
                                  }
                                >
                                  <button
                                    disabled={
                                      material.uploadedBy !==
                                      user.firstName + " " + user.lastName
                                    }
                                    onClick={() => deleteFile(i)}
                                    class={`py-3 px-3 ${
                                      material.uploadedBy ===
                                      user.firstName + " " + user.lastName
                                        ? "text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200 shadow-sm hover:shadow-md active:shadow-sm"
                                        : " bg-gray-300 text-white"
                                    } text-sm focus:outline-none   leading-none relative left-14 lg:-mr-8 mr-0 rounded`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-4 w-4 inline relative -mt-[2.5px]"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>{" "}
                                    Delete
                                  </button>
                                </td>

                                <td class="xl:pl-5 pl-8">
                                  <button
                                    onClick={() =>
                                      downloadResource(material, i, "taskSubs")
                                    }
                                    class="focus:ring-2 focus:ring-offset-2 relative shadow-sm hover:shadow-md active:shadow-sm focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded   xl:-mr-12 lg:-mr-8 mr-2 xl:ml-8 ml-12 hover:bg-gray-200 focus:outline-none"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-4 w-4 inline relative -mt-[2.5px] "
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                      />
                                    </svg>{" "}
                                    Download
                                  </button>
                                </td>

                                <td>
                                  <div
                                    class="relative px-5 pt-2"
                                    data-tip={
                                      "Uploaded by - " + material.uploadedBy
                                    }
                                  >
                                    <button
                                      class="focus:ring-2 rounded-full xl:-ml-7 -ml-2 focus:outline-none"
                                      onclick="dropdownFunction(this)"
                                      role="button"
                                      aria-label="option"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6 relative bottom-[1.5px]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <ReactTooltip />
                                </td>
                              </tr>
                              // <tr

                              //   key={i}
                              //   tabindex="0"
                              //   class="hover:cursor-pointer hover:shadow-xl hover:shadow-blue-400 h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded"
                              // >
                              //   <td>
                              //     <div class="ml-5 pl-[10px] -mr-[84px]">
                              //       <img
                              //         class="object-cover w-10 h-10 shadow-md mx-2  relative right-1 rounded-full block"
                              //         src={material.uploaderPic}
                              //         alt="avatar"
                              //       />
                              //     </div>
                              //   </td>
                              //   <td class="-mr-[132px] ml-[2px] top-6 block relative">
                              //     <div class="flex items-center pl-20">
                              //       <p class="text-sm hover:underline hover:text-blue-700 font-medium leading-none text-gray-700 mr-2">
                              //         {material.name}
                              //       </p>
                              //     </div>
                              //   </td>

                              //   <td class=" -mr-12 relative ">
                              //     <div class="flex items-center relative left-4  lg:-mr-8 -mr-8">
                              //       <svg
                              //         xmlns="http://www.w3.org/2000/svg"
                              //         fill="none"
                              //         viewBox="0 0 24 24"
                              //         stroke-width="1.5"
                              //         stroke="currentColor"
                              //         class="h-5 w-5 top-[1px]"
                              //       >
                              //         <path
                              //           stroke-linecap="round"
                              //           stroke-linejoin="round"
                              //           d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                              //         />
                              //       </svg>

                              //       <p class="text-sm leading-none text-gray-600 ml-2">
                              //         {material.purpose}
                              //       </p>
                              //     </div>
                              //   </td>
                              // </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 class="text-center font-bold md:-mt-1 -mt-4 sm:text-2xl text-xl mb-2">
                  Resources Uploaded By Mentor:
                </h1>
                <h2 class="sm:text-sm text-xs uppercase text-center font-bold text-blue-700 sm:mt-0 mt-3 mb-8">
                  General Docs & Files For Your Reference
                </h2>

                {props.loading ? (
                  <div class="relative mx-auto my-14 mb-10 pb-3 pt-1.5 text-center block justify-center">
                    <ClipLoader
                      color={"#0b0bbf"}
                      loading={props.loading}
                      size={60}
                    />
                  </div>
                ) : !materials.otherDocs || materials.otherDocs.length === 0 ? (
                  <h1 class="relative mx-auto text-center text-xl justify-center  pb-1 mt-[52px] mb-[38px] right-[2px] block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-8 mr-2 w-8 text-orange-700 inline relative bottom-[1.6px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                      />
                    </svg>{" "}
                    <span class="font-semibold ">
                      No Resources Have Been Uploaded Yet
                    </span>
                  </h1>
                ) : (
                  <div class="overflow-x-auto my-2">
                    <table class=" whitespace-nowrap lg:w-full w-[670px] mb-[22px]  relative mt-1  mx-auto space-y-2">
                      <tbody class="space-y-2">
                        {materials.otherDocs &&
                          materials.otherDocs.map((material, i) => {
                            function convertDate(inputFormat) {
                              function pad(s) {
                                return s < 10 ? "0" + s : s;
                              }
                              var d = new Date(inputFormat);
                              return [
                                pad(d.getDate()),
                                pad(d.getMonth() + 1),
                                d.getFullYear(),
                              ].join("/");
                            }
                            let dateUploaded = convertDate(
                              material.dateOfUpload
                            );
                            return (
                              <tr
                                title="Hello This Will Have Some Value"
                                key={i}
                                tabindex="0"
                                class="focus:outline-none hover:shadow-blue-400 h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded"
                              >
                                <td>
                                  <div class="ml-5 pl-[10px] -mr-20">
                                    <img
                                      class="object-cover w-10 h-10 shadow-md mx-2  relative right-1 rounded-full block"
                                      src={
                                        material.uploaderPic
                                          ? material.uploaderPic
                                          : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                                      }
                                      alt="avatar"
                                    />
                                  </div>
                                </td>
                                <td class="xl:-mr-[100px] -mr-[60px] ml-[40px] top-6 block relative">
                                  <div class="flex items-center pl-20">
                                    <p class="text-sm font-medium hover:underline hover:text-blue-700 leading-none text-gray-700 mr-2">
                                      {material.title}
                                    </p>
                                  </div>
                                </td>

                                <td class="pl-5">
                                  <div class="flex relative -mr-3 left-4 items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5 top-[1px]"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2">
                                      {material.downloads}
                                    </p>
                                  </div>
                                </td>

                                <td class="pl-5 -mr-3 relative">
                                  <div class="flex items-center relative left-5 -mr-10">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-5 w-5 top-[1px]"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <p class="text-sm leading-none text-gray-600 ml-2">
                                      {dateUploaded}
                                    </p>
                                  </div>
                                </td>

                                <td class="pl-1">
                                  <button
                                    onClick={() => {
                                      downloadResource(
                                        material,
                                        i,
                                        "otherDocs"
                                      );
                                    }}
                                    class="focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:shadow-sm focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded  relative left-12 xl:-mr-10 -mr-6 ml-8 hover:bg-gray-200 focus:outline-none"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-4 w-4 inline relative -mt-[2.5px] "
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                      />
                                    </svg>{" "}
                                    Download
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default CourseMaterials;
