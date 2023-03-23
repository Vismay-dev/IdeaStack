import { useState, useRef, useContext } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import projectContext from "../../context/projectContext";

const UploadFile = (props) => {
  const [upload, setUpload] = useState({
    title: "",
    isImportant: false,
    file: "",
    uploadedBy: "",
    downloads: 0,
    dateOfUpload: new Date(),
    visibleToMentors: true,
  });

  const titleHandler = (e) => {
    setUpload({
      ...upload,
      title: e.target.value,
    });
  };

  const isImportantHandler = (e) => {
    setUpload({
      ...upload,
      isImportant: e.target.value,
    });
  };

  const visibleToMentorHandler = (e) => {
    setUpload({
      ...upload,
      visibleToMentors: e.target.value,
    });
  };

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const projCon = useContext(projectContext);
  const fileUploadHandler = (e) => {
    const data = new FormData();
    setUploading(true);
    data.append("image", e.target.files[0]);
    setFile(e.target.files[0]);
    data.append("token", sessionStorage.getItem("token"));

    let fileCopy = e.target.files[0];

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (file === null) {
      setError("Not Uploaded");
    } else {
      setLoading(true);
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/project/uploadProjectFile"
            : "http://localhost:4000/api/project/uploadProjectFile",
          {
            upload,
            projectID: projCon.project._id,
            token: sessionStorage.getItem("token"),
          }
        )
        .then((res) => {
          props.passDocs(res.data);
          console.log(res.data);
          setTimeout(() => {
            setLoading(false);
            props.close();
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  let inputRef = useRef();

  return (
    <div
      class="relative min-h-screen top-0.5 flex rounded-md items-center justify-center  py-12 px-1 sm:px-6 lg:px-8  bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url(https://pbs.twimg.com/media/EXUO20IWsAAklxl.jpg)",
      }}
    >
      <div class="absolute bg-black opacity-30 top-0.5 rounded-md inset-0 z-0"></div>
      <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div class="text-center">
          <h2 class=" text-3xl font-bold text-gray-900">File Upload!</h2>
          <p class="mt-2 text-sm text-gray-400">
            Upload a file for your team to see.
          </p>
        </div>

        {loading ? (
          <div class="relative mx-auto my-8 mb-12 pb-16 pt-16  text-center block justify-center">
            <ClipLoader color={"#0b0bbf"} loading={loading} size={80} />
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

            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              class="cursor-pointer bottom-[16.5px] mt-1.5 mb-1 relative w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
              onChange={isImportantHandler}
            />
            <p class="inline ml-2 -top-[9px] text-sm font-bold text-gray-500 relative">
              Is this important?
            </p>
            <br class="block mb-5" />
            <div class="block mb-2" />
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              class="cursor-pointer bottom-[16.5px] mt-1.5 mb-1 relative w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
              onChange={visibleToMentorHandler}
              defaultChecked
            />
            <p class="inline ml-2 -top-[9px] text-sm font-bold text-gray-500 relative">
              Visible to mentors
            </p>
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
                            upload.file ? "-mt-16 bottom-2 relative" : "-mt-10"
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
                              <span class="text-sm">Drag and drop</span> file
                              here <br /> or{" "}
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
                        name="file"
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
  );
};

export default UploadFile;
