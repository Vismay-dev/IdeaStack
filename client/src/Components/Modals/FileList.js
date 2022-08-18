import { useContext, useEffect, useState } from "react";
import UploadFile from "./UploadFile";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import fileDownload from "js-file-download";
import ClipLoader from "react-spinners/ClipLoader";
import { returnSocket } from "../../Socket";

import userContext from "../../context/userContext";

const FileList = () => {
  const [uploading, setUploading] = useState(false);
  const [docs, setDocs] = useState([]);
  const passDocs = (docsParam) => {
    setDocs(docsParam);
  };

  useEffect(() => {
    const socket = returnSocket();
    socket.on("redistributeFiles", (data) => {
      if (
        JSON.stringify(data.id) ===
        JSON.stringify(sessionStorage.getItem("managing"))
      ) {
        setDocs(data.files);
        console.log("Changed");
      }
    });

    return () => {
      socket.off("redistributeFiles", (data) => {
        if (
          JSON.stringify(data.id) ===
          JSON.stringify(sessionStorage.getItem("managing"))
        ) {
          setDocs(data.files);
          console.log("Changed");
        }
      });
    };
  }, []);

  const [loading, setLoading] = useState(false);

  const user = useContext(userContext).user;

  useEffect(() => {
    if (!uploading) {
      setTimeout(() => {
        setLoading(true);
      }, 500);
    }
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/getDocs"
          : "http://localhost:4000/api/project/getDocs",
        {
          projectID: sessionStorage.getItem("managing"),
          token: sessionStorage.getItem("token"),
        }
      )
      .then((res) => {
        setDocs(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [uploading]);

  const downloadResource = (doc, i) => {
    const newFileArr = docs;
    newFileArr[i].downloads += 1;
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/updateDocs"
          : "http://localhost:4000/api/project/updateDocs",
        {
          projectID: sessionStorage.getItem("managing"),
          token: sessionStorage.getItem("token"),
          docs: newFileArr,
        }
      )
      .then((res) => {
        setDocs(res.data);
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

  const deleteFile = (index) => {
    const newFileArr = docs;
    newFileArr.splice(index, 1);
    console.log(newFileArr);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/updateDocs"
          : "http://localhost:4000/api/project/updateDocs",
        {
          projectID: sessionStorage.getItem("managing"),
          token: sessionStorage.getItem("token"),
          docs: newFileArr,
        }
      )
      .then((res) => {
        setDocs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="lg:px-3 px-[1px] relative w-full">
      <div
        class={`bg-gradient-to-r from-blue-100 to-indigo-200 sm:pt-4 pt-1 mt-9 left-2.5 mb-2 relative rounded-md shadow-lg pb-6 ${
          uploading ? "px-0" : "px-4"
        }  `}
      >
        {loading ? (
          <div class="relative mx-auto my-8 mb-10 pb-3 md:pt-5 pt-8 right-2  pl-4 text-center block justify-center">
            <ClipLoader color={"#0b0bbf"} loading={loading} size={70} />
          </div>
        ) : !uploading ? (
          <>
            <div class="sm:flex items-center top-3 relative justify-between">
              <button
                onClick={() => setUploading(true)}
                class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mb-3 mb-10 sm:mt-0 relative block mx-auto justify-center px-5 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p class="text-md font-medium leading-none  text-white">
                  Upload File
                </p>
              </button>
            </div>

            <p class="xl:hidden block mx-auto text-center my-5 md:text-base text-sm relative sm:px-16 px-1.5  ">
              <strong class="underline">Note:</strong> Horizontally scroll
              panels to see more details on project documents
            </p>
            <div class="mt-7 overflow-x-auto">
              <table class="w-full whitespace-nowrap space-y-2">
                {docs.length === 0 ? (
                  <p class="sm:text-3xl text-2xl font-semibold col-span-2 text-center mt-[30px] mb-[57px] right-2 mx-auto relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="sm:h-9 sm:w-9 h-7 w-7 inline text-blue-700"
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
                    <span class="top-0.5 relative">No Files Uploaded</span>
                  </p>
                ) : (
                  <tbody class="space-y-2">
                    {docs &&
                      docs.map((doc, i) => {
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

                        let dateUploaded = convertDate(doc.dateOfUpload);

                        return (
                          <tr
                            key={i}
                            tabindex="0"
                            class="focus:outline-none h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded"
                          >
                            <td>
                              <div class="ml-5">
                                <div class="rounded-sm w-5 -mr-2  h-5  flex flex-shrink-0 justify-center items-center relative">
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
                                  {doc.title}
                                </p>
                              </div>
                            </td>

                            <td class="pl-24 ">
                              {(doc && doc.isImportant) ||
                              doc.isImportant === "on" ? (
                                <div class="flex items-center text-indigo-500 font-semibold ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 top-[1px] relative"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                  </svg>
                                  <p class="text-sm leading-none text-indigo-500 ml-[5px]">
                                    Important
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                            </td>

                            <td class="pl-5">
                              <div class="flex items-center">
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
                                  {doc.downloads}
                                </p>
                              </div>
                            </td>
                            <td class="pl-5 -mr-3 relative">
                              <div class="flex items-center relative left-1 -mr-8">
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
                                onClick={() => downloadResource(doc, i)}
                                class="focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:shadow-sm focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded   xl:-mr-10 -mr-6 ml-8 hover:bg-gray-200 focus:outline-none"
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
                            <td
                              class={`pl-1`}
                              data-tip={
                                doc.uploadedBy !==
                                user.firstName + " " + user.lastName
                                  ? "Can only be deleted by: " + doc.uploadedBy
                                  : ""
                              }
                            >
                              <button
                                disabled={
                                  doc.uploadedBy !==
                                  user.firstName + " " + user.lastName
                                }
                                onClick={() => deleteFile(i)}
                                class={`py-3 px-3 ${
                                  doc.uploadedBy ===
                                  user.firstName + " " + user.lastName
                                    ? "text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200 shadow-sm hover:shadow-md active:shadow-sm"
                                    : " bg-gray-300 text-white"
                                } text-sm focus:outline-none   leading-none relative left-9 xl:mr-11 mr-16 rounded`}
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

                            <td>
                              <div
                                class="relative px-5 pt-2"
                                data-tip={"Uploaded by - " + doc.uploadedBy}
                              >
                                <button
                                  class="focus:ring-2 rounded-full -ml-7 focus:outline-none"
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
                        );
                      })}
                  </tbody>
                )}
              </table>
            </div>
          </>
        ) : (
          <>
            <UploadFile passDocs={passDocs} close={() => setUploading(false)} />
          </>
        )}
      </div>
    </div>
  );
};

export default FileList;
