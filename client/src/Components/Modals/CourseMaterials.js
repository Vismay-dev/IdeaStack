import { useEffect, useState } from "react";

import ReactTooltip from "react-tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import fileDownload from "js-file-download";

import axios from "axios";

const CourseMaterials = (props) => {
  console.log(props.materials);
  return (
    <div class="left-2 mt-5 relative w-full">
      <div class="bg-gradient-to-r from-blue-100 to-indigo-200 pt-4 left-1.5 relative  mt-7 rounded-md shadow-lg pb-11  sm:px-7  px-3">
        <>
          <div class=" items-center top-2 mb-5 mt-2 xl:px-72 lg:px-48 md:px-24 sm:px-8 px-2  text-center  relative justify-center">
            <p class="text-sm sm:text-gray-600 text-gray-800 mb-1.5 mt-1 bg-green-50 p-2 px-3 border-green-700 border-dashed border-[1px] rounded-md  sm:font-semibold font-normal leading-5 mx-auto relative block ">
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
              All course materials (tasks & recordings) have been sent by email.
              You may also find them below.{" "}
            </p>
            <p class="text-sm sm:text-gray-600 text-gray-800 mt-3  sm:font-semibold bg-yellow-50 p-2 px-3 border-yellow-600 border-dashed border-[1px] rounded-md font-normal leading-5 mx-auto relative block ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-red-700 inline mr-[5px] relative bottom-[1px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                />
              </svg>
              Kindly follow the deadlines below & send us your completed
              assignments by email. We'll respond with your mentors' feedback.{" "}
            </p>
            <p class="xl:hidden block mx-auto text-center sm:mt-8 mt-10 sm:mb-8 mb-6 relative md:text-base text-sm sm:px-16 px-1.5  ">
              <strong class="underline">Note:</strong> Horizontally scroll
              panels to see more details on course materials
            </p>
          </div>
          <div class="mt-[54px]">
            <h1 class="mx-auto relative  block text-center font-bold text-2xl mb-1.5">
              All Recordings:
            </h1>
            <h2 class="text-sm uppercase text-center font-bold text-blue-700 mb-8">
              Click a row to Download
            </h2>

            {props.loading ? (
              <div class="relative mx-auto my-12 mb-12 pb-3 pt-1.5 text-center block justify-center">
                <ClipLoader
                  color={"#0b0bbf"}
                  loading={props.loading}
                  size={60}
                />
              </div>
            ) : props.materials && props.materials[0].length === 0 ? (
              <h1 class="relative mx-auto text-center text-xl justify-center mt-12 mb-[55px] right-[4px] block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-8 mr-2.5 w-7 text-orange-700 inline relative bottom-[1.6px]"
                >
                  <path
                    stroke-linecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <span class="font-semibold">
                  No Recordings Have Been Uploaded Yet
                </span>
              </h1>
            ) : props.loading ? (
              <div class="relative mx-auto sm:my-10 my-14 mb-12 pb-3 pt-1.5 text-center block justify-center">
                <ClipLoader
                  color={"#0b0bbf"}
                  loading={props.loading}
                  size={60}
                />
              </div>
            ) : (
              <div class="overflow-x-auto my-2 mb-[2px] pb-0 ">
                <table class=" whitespace-nowrap lg:w-full w-[1080px]  mb-12 mt-1 relative mx-auto space-y-2">
                  <tbody class="space-y-2  ">
                    {props.materials &&
                      props.materials[0].map((material, i) => {
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

                        return (
                          <tr
                            onClick={async () => {
                              await axios
                                .get(material.file, {
                                  responseType: "blob",
                                })
                                .then((res) => {
                                  fileDownload(res.data, material.name);
                                });
                            }}
                            key={i}
                            tabindex="0"
                            class="focus:outline-none  hover:cursor-pointer hover:shadow-blue-400  h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded"
                          >
                            <td>
                              <div class="ml-5 pl-[10px] -mr-20">
                                <img
                                  class="object-cover w-10 h-10 shadow-md mx-2  relative right-1 rounded-full block"
                                  src={material.uploaderPic}
                                  alt="avatar"
                                />
                              </div>
                            </td>
                            <td class="-mr-[132px] ml-[2px] top-6 block relative">
                              <div class="flex items-center pl-20">
                                <p class="text-sm font-medium hover:underline hover:text-blue-700 leading-none text-gray-700 mr-2">
                                  {material.name}
                                </p>
                              </div>
                            </td>

                            <td class=" -mr-12 relative ">
                              <div class="flex items-center relative left-4  lg:-mr-8 -mr-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="h-5 w-5 top-[1px]"
                                >
                                  <path
                                    stroke-linecap="round"
                                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                  />
                                </svg>

                                <p class="text-sm leading-none text-gray-600 ml-2">
                                  {material.purpose}
                                </p>
                              </div>
                            </td>

                            <td class=" lg:-mr-3  relative ">
                              <div class="flex items-center relative left-8  lg:-mr-8 -mr-8">
                                <span class="text-blue-700 text-sm uppercase mr-3 relative top-[0.5px] font-semibold">
                                  Watch by:
                                </span>
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
                                <p
                                  class={`text-sm leading-none ${
                                    !material.watchDue
                                      ? "text-green-700"
                                      : "text-gray-600"
                                  } ml-2`}
                                >
                                  {!material.watchDue
                                    ? "To Be Scheduled Soon"
                                    : new Date(
                                        material.watchDue
                                      ).toDateString()}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}

            <h1 class="text-center font-bold -mt-1 text-2xl mb-2">
              Tasks & Assignments:
            </h1>
            <h2 class="text-sm uppercase text-center font-bold text-blue-700 mb-8">
              Click a row to Download
            </h2>

            {props.loading ? (
              <div class="relative mx-auto sm:my-10 my-12 mb-16 pb-3 pt-1.5 text-center block justify-center">
                <ClipLoader
                  color={"#0b0bbf"}
                  loading={props.loading}
                  size={60}
                />
              </div>
            ) : props.materials && props.materials[1].length === 0 ? (
              <h1 class="relative mx-auto text-center text-xl justify-center  pb-1 mt-[52px] mb-[48px] right-[2px] block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-8 mr-1 w-8 text-green-700 inline relative bottom-[1.6px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>{" "}
                <span class="font-semibold ">
                  No Tasks Have Been Assigned Yet
                </span>
              </h1>
            ) : (
              <div class="overflow-x-auto my-2">
                <table class=" whitespace-nowrap lg:w-full w-[670px] mb-[38px]  relative mt-1  mx-auto space-y-2">
                  <tbody class="space-y-2">
                    {props.materials &&
                      props.materials[1].map((material, i) => {
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

                        return (
                          <tr
                            title="Hello This Will Have Some Value"
                            onClick={async () => {
                              await axios
                                .get(material.file, {
                                  responseType: "blob",
                                })
                                .then((res) => {
                                  fileDownload(res.data, material.name);
                                });
                            }}
                            key={i}
                            tabindex="0"
                            class="focus:outline-none hover:cursor-pointer  hover:shadow-blue-400 h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded"
                          >
                            <td>
                              <div class="ml-5 pl-[10px] -mr-20">
                                <img
                                  class="object-cover w-10 h-10 shadow-md mx-2  relative right-1 rounded-full block"
                                  src={material.uploaderPic}
                                  alt="avatar"
                                />
                              </div>
                            </td>
                            <td class="-mr-[100px] ml-[2px] top-6 block relative">
                              <div class="flex items-center pl-20">
                                <p class="text-sm font-medium hover:underline hover:text-blue-700 leading-none text-gray-700 mr-2">
                                  {material.name}
                                </p>
                              </div>
                            </td>

                            <td class=" -mr-12 relative ">
                              <div class="flex items-center relative left-4  lg:-mr-8 -mr-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="h-5 w-5 top-[1px]"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                                  />
                                </svg>

                                <p class="text-sm leading-none text-gray-600 ml-2">
                                  {material.purpose}
                                </p>
                              </div>
                            </td>

                            <td class=" lg:-mr-3  relative ">
                              <div class="flex items-center relative left-8  lg:-mr-8 -mr-8">
                                <span class="text-blue-700 text-sm uppercase mr-3 relative top-[0.5px] font-semibold">
                                  Complete & Email by:
                                </span>
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
                                <p
                                  class={`text-sm leading-none ${
                                    !material.completeDue
                                      ? "text-green-700"
                                      : "text-gray-600"
                                  } ml-2`}
                                >
                                  {!material.completeDue
                                    ? "To Be Scheduled Soon"
                                    : new Date(
                                        material.completeDue
                                      ).toDateString()}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}

            <h1 class="text-center font-bold -mt-1 text-2xl mb-2">
              Other Documents:
            </h1>
            <h2 class="text-sm uppercase text-center font-bold text-blue-700 mb-8">
              Click a row to Download
            </h2>

            {props.loading ? (
              <div class="relative mx-auto sm:my-10 my-12 mb-12 pb-3 pt-1.5 text-center block justify-center">
                <ClipLoader
                  color={"#0b0bbf"}
                  loading={props.loading}
                  size={60}
                />
              </div>
            ) : props.materials && props.materials[2].length === 0 ? (
              <h1 class="relative mx-auto text-center text-xl justify-center  pb-1 mt-[50px] right-[2px] mb-[22px] block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-8 mr-1 w-8 text-blue-700 inline relative bottom-[1.6px]"
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
                    {props.materials &&
                      props.materials[2].map((material, i) => {
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

                        return (
                          <tr
                            onClick={async () => {
                              await axios
                                .get(material.file, {
                                  responseType: "blob",
                                })
                                .then((res) => {
                                  fileDownload(res.data, material.name);
                                });
                            }}
                            key={i}
                            tabindex="0"
                            class="hover:cursor-pointer hover:shadow-xl hover:shadow-blue-400 h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded"
                          >
                            <td>
                              <div class="ml-5 pl-[10px] -mr-[84px]">
                                <img
                                  class="object-cover w-10 h-10 shadow-md mx-2  relative right-1 rounded-full block"
                                  src={material.uploaderPic}
                                  alt="avatar"
                                />
                              </div>
                            </td>
                            <td class="-mr-[132px] ml-[2px] top-6 block relative">
                              <div class="flex items-center pl-20">
                                <p class="text-sm hover:underline hover:text-blue-700 font-medium leading-none text-gray-700 mr-2">
                                  {material.name}
                                </p>
                              </div>
                            </td>

                            <td class=" -mr-12 relative ">
                              <div class="flex items-center relative left-4  lg:-mr-8 -mr-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="h-5 w-5 top-[1px]"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                  />
                                </svg>

                                <p class="text-sm leading-none text-gray-600 ml-2">
                                  {material.purpose}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default CourseMaterials;
