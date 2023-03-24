import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import projectContext from "../../context/projectContext";

import AOS from "aos";
import "aos/dist/aos.css";
import userContext from "../../context/userContext";
import mentorAccContext from "../../context/mentorAccContext";

const UploadMentorshipFile = (props) => {
  const mentor = useContext(mentorAccContext).mentor;
  const user = useContext(userContext).user;

  const [upload, setUpload] = useState({
    title: "",
    file: "",
    uploadedBy: "",
    uploaderPic: "",
    downloads: 0,
    dateOfUpload: new Date(),
  });
  useEffect(() => {
    if (user && user.firstName) {
      console.log(user);
      setUpload({
        ...upload,
        uploadedBy: user.firstName + " " + user.lastName,
        uploaderPic: user.profilePic,
      });
    }

    if (mentor && mentor.name) {
      setUpload({
        ...upload,
        uploadedBy: mentor.name,
        uploaderPic: mentor.pic,
      });
    }
  }, [mentor, user]);

  const titleHandler = (e) => {
    setUpload({
      ...upload,
      title: e.target.value,
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const myRef = useRef();

  useEffect(
    () => {
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
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [myRef, () => props.close()]
  );

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const projCon = useContext(projectContext);

  const fileUploadHandler = (e) => {
    const data = new FormData();
    setUploading(true);
    data.append("image", e.target.files[0]);
    setFile(e.target.files[0]);
    let fileCopy = e.target.files[0];
    data.append(
      "token",
      props.type === "none" || !props.type
        ? sessionStorage.getItem("token")
        : sessionStorage.getItem("mentorToken")
    );

    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/uploadPic"
          : "http://localhost:4000/api/user/uploadPic",
        data
      )
      .then((res) => {
        setUpload({
          ...upload,
          file: res.data,
          title:
            upload.title.replace(" ", "_") +
            "." +
            fileCopy.name.split(".")[fileCopy.name.split(".").length - 1],
        });
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const [error, setError] = useState(false);
  console.log(upload);

  const mentorCon = useContext(mentorAccContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (file === null) {
      setError("Not Uploaded");
    } else {
      setLoading(true);
      if (props.type === "none" || !props.type) {
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/uploadMentorshipFile"
              : "http://localhost:4000/api/user/uploadMentorshipFile",
            {
              upload,
              mentorId: props.mentor.mentorId,
              token: sessionStorage.getItem("token"),
            }
          )
          .then((res) => {
            console.log(projCon.project);
            projCon.setProject({
              ...projCon.project,
              mentorsMatched: res.data,
            });
            console.log(res.data);
            setTimeout(() => {
              setLoading(false);
              props.close();
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            setTimeout(() => {
              setLoading(false);
              props.close();
            }, 1000);
          });
      } else {
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/uploadForStartup"
              : "http://localhost:4000/api/user/uploadForStartup",
            {
              upload,
              type: props.type,
              mentorId: mentorCon.mentor._id,
              projectId: props.startup._id,
              token: sessionStorage.getItem("mentorToken"),
            }
          )
          .then((res) => {
            projCon.setProject({
              ...projCon.project,
              mentorsMatched: res.data,
            });
            console.log(res.data);
            setTimeout(() => {
              setLoading(false);
              props.close();
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            setTimeout(() => {
              setLoading(false);
              props.close();
            }, 1000);
          });
      }
    }
  };

  console.log(projCon.project);

  let inputRef = useRef();

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
          ref={myRef}
          data-aos={"fade-up"}
          data-aos-once="true"
          class="pr-6   mt-16 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 mb-32 sm:align-middle xl:w-10/12 sm:w-11/12 w-[97%]"
        >
          <div class="bg-white sm:px-4 px-2 pt-3 pb-2 sm:p-6 sm:pb-4">
            <p class="text-center text-3xl top-2 sm:left-2 left-2.5 font-bold relative">
              {props.type === "generalResource"
                ? "Upload Resource for Startup"
                : props.type === "taskReference"
                ? "Upload a Task/Assignment Reference Doc"
                : "Upload File For Mentor"}
            </p>
            <div class="lg:px-3 px-[1px] relative w-full">
              <div
                class={`bg-gradient-to-r from-blue-100 to-indigo-200 sm:pt-4 pt-1 mt-9 left-2.5 mb-2 relative rounded-md shadow-lg pb-6 ${
                  uploading ? "px-0" : "px-4"
                }  `}
              >
                <div
                  class="relative min-h-screen top-0.5 flex rounded-md items-center justify-center  py-12 px-1 sm:px-6 lg:px-8  bg-no-repeat bg-cover"
                  style={{
                    backgroundImage:
                      "url(https://pbs.twimg.com/media/EXUO20IWsAAklxl.jpg)",
                  }}
                >
                  <div class="absolute bg-black opacity-30 top-0.5 rounded-md inset-0 z-0"></div>
                  <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                    <div class="text-center">
                      <h2 class=" text-3xl font-bold text-gray-900">
                        File Upload!
                      </h2>
                      <p class="mt-2 text-sm text-gray-400">
                        Upload a file for your team to see.
                      </p>
                    </div>

                    {loading ? (
                      <div class="relative mx-auto my-8 mb-12 pb-16 pt-16  text-center block justify-center">
                        <ClipLoader
                          color={"#0b0bbf"}
                          loading={loading}
                          size={80}
                        />
                      </div>
                    ) : (
                      <form class="mt-5 space-y-3" onSubmit={submitHandler}>
                        <div class="grid grid-cols-1 space-y-2 mb-9">
                          <label class="text-sm font-bold text-gray-500 tracking-wide">
                            File Title
                          </label>
                          <input
                            max={34}
                            maxLength={34}
                            required
                            class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            type=""
                            placeholder="Ex: Background Research Doc"
                            onChange={titleHandler}
                          />
                        </div>

                        <div class="grid grid-cols-1 space-y-2 mt-3">
                          <label class="text-sm font-bold text-gray-500 tracking-wide">
                            Attach Document
                          </label>
                          <div class="flex items-center justify-center w-full">
                            {" "}
                            <label
                              class={`flex flex-col ${
                                error === "Not Uploaded" ? "border-red-400" : ""
                              } rounded-lg border-4 border-dashed w-full h-60 sm:p-10 p-10 px-3 group text-center`}
                            >
                              {uploading ? (
                                <div class="relative mx-auto my-8 mb-10 pb-3  text-center block justify-center">
                                  <ClipLoader
                                    color={"#3678D7"}
                                    loading={uploading}
                                    size={70}
                                  />
                                </div>
                              ) : (
                                <>
                                  <div class="h-full w-full text-center flex flex-col items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class={`w-10 h-10 text-blue-400 group-hover:text-blue-600  `}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      />
                                    </svg>
                                    <div
                                      class={`flex flex-auto max-h-48 w-2/5 mx-auto ${
                                        upload.file
                                          ? "-mt-16 bottom-2 relative"
                                          : "-mt-10"
                                      }`}
                                    >
                                      <img
                                        class="has-mask sm:h-36 h-28 sm:block hidden object-center"
                                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                        alt="freepik image"
                                      />
                                    </div>
                                    <p class="pointer-none  sm:text-base text-sm text-gray-500 relative sm:top-2 ">
                                      {upload.file ? (
                                        <p class="text-green-600 sm:bottom-0 bottom-5 relative font-semibold">
                                          File Succesfully Uploaded!
                                        </p>
                                      ) : (
                                        <>
                                          <span class="text-sm">
                                            Drag and drop
                                          </span>{" "}
                                          file here <br /> or{" "}
                                          <a
                                            onClick={() => inputRef.click()}
                                            class={`${
                                              error === "Not Uploaded"
                                                ? "text-red-600"
                                                : "text-blue-600"
                                            } sm:text-base text-sm cursor-pointer hover:underline`}
                                          >
                                            select a file
                                          </a>{" "}
                                          from your computer
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  <input
                                    type="file"
                                    ref={inputRef}
                                    class="hidden"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    onChange={fileUploadHandler}
                                  />
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                        <p class="text-sm text-gray-300">
                          <span>File type: doc,pdf,types of images</span>
                        </p>
                        <div>
                          <button
                            type="submit"
                            class="mt-7 mb-2 w-full flex justify-center bg-blue-600 text-gray-100 p-2  rounded-lg tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-700 shadow-lg cursor-pointer transition ease-in duration-300"
                          >
                            Upload
                          </button>
                          <button
                            onClick={props.close}
                            class=" mt-3 w-full flex justify-center bg-orange-400 text-gray-100 p-2  rounded-lg tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-500 shadow-lg cursor-pointer transition ease-in duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-3 mt-4 shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
            <button
              onClick={props.close}
              type="button"
              class="sm:-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMentorshipFile;
