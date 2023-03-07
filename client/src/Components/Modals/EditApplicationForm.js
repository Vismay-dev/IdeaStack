import AOS from "aos";
import "aos/dist/aos.css";
import { PaperClipIcon } from "@heroicons/react/solid";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CircleLoader } from "react-awesome-loaders";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import projectContext from "../../context/projectContext";

const EditApplicationForm = (props) => {
  const projCon = useContext(projectContext);
  const location = useLocation();

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

  const [question, setQuestion] = useState();
  const [addingQ, setAddingQ] = useState(false);
  const [questions, setQuestions] = useState([]);

  const qChangeHandler = (e) => {
    setQuestion(e.target.value);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (projCon.project) {
      setQuestions(projCon.project.application);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [location.pathname, projCon]);

  const deleteQ = (i) => {
    let questionsCurrent = questions.filter((q) => q != questions[i]);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/updateQuestions"
          : "http://localhost:4000/api/project/updateQuestions",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
          questions: questionsCurrent,
        }
      )
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const addQ = () => {
    let questionsCurrent = [...questions, question];
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/updateQuestions"
          : "http://localhost:4000/api/project/updateQuestions",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
          questions: questionsCurrent,
        }
      )
      .then((res) => {
        setQuestions(res.data);
        setAddingQ(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

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
          class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle lg:w-10/12 sm:w-11/12 w-[98%]"
        >
          <div class="bg-white md:px-4 px-1 pt-2 pb-2  sm:p-6 sm:pb-4">
            <div className="bg-white shadow md:left-2 left-2.5 relative overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Applicant Form
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Questions that will be asked to applicants. Try to keep it
                  confined to absolutely necessary information.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  {loading ? (
                    <div class=" w-[220px]    top-[144px]  m-0 relative mx-auto block translate-y-[-50%] py-10  pl-1.5">
                      <CircleLoader
                        meshColor={"#6366F1"}
                        lightColor={"#E0E7FF"}
                        duration={1.5}
                        desktopSize={"64px"}
                        mobileSize={"64px"}
                      />
                    </div>
                  ) : (
                    questions.map((q, i) => {
                      return (
                        <div className="bg-gray-100 px-14 pl-7  py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-14 relative">
                          <dt className="text-sm font-medium text-gray-500">
                            Question #{i + 1}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {q}
                          </dd>
                          <svg
                            onClick={() => deleteQ(i)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="md:h-8 md:w-8 w-6 h-6 absolute right-4 top-3.5 shadow-md hover:bg-red-400 hover:shadow-lg active:shadow-md cursor-pointer bg-red-200 sm:p-1 p-[1px] rounded-full mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      );
                    })
                  )}

                  <div className="bg-white px-5 py-5 pt-9 grid md:grid-cols-3 grid-cols-4 sm:gap-4 sm:px-6">
                    {!addingQ ? (
                      <button
                        onClick={() => setAddingQ(true)}
                        class="bg-gradient-to-r hover:shadow-xl  bottom-2.5 lg:text-xl text-md lg:font-normal font-semibold uppercase text-gray-50 sm:col-start-2 md:col-start-2 lg:col-start-2 xl:col-start-2 col-start-1 md:col-span-1 sm:col-span-2 col-span-4 rounded-md p-2 pb-2.5 active:shadow-lg relative  from-blue-700 to-indigo-600 shadow-lg"
                      >
                        Add Question
                      </button>
                    ) : (
                      <>
                        <div class="md:col-span-1 sm:col-span-2 col-span-4 sm:col-start-2 md:col-start-2 lg:col-start-2 xl:col-start-2 col-start-1 sm:-mb-1 mb-4">
                          <textarea
                            onChange={qChangeHandler}
                            max={120}
                            name="desc"
                            required
                            class="w-full text-sm p-2 mx-auto relative justify-self-center shadow-lg h-28 rounded-md "
                          ></textarea>
                        </div>

                        <div class=" md:col-span-1 sm:col-span-2 col-span-4 sm:col-start-2 md:col-start-2 lg:col-start-2 xl:col-start-2 col-start-1 grid grid-cols-6 gap-3">
                          <button
                            onClick={addQ}
                            class="font-semibold p-2 col-span-3  mb-6 shadow-md relative text-center z-20 bg-gray-100 hover:bg-gray-200 sm:text-lg text-base uppercase rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 "
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => setAddingQ(false)}
                            class="font-semibold p-2 px-3 col-span-3 mb-6 shadow-md relative text-center z-20 bg-gray-100 sm:text-lg text-base hover:bg-gray-200  uppercase rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 "
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </dl>
              </div>
            </div>

            <div class="sm:flex sm:items-center">
              <div class="bg-gray-50 px-3 mt-4 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
                <button
                  onClick={props.close}
                  type="button"
                  class="md:-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditApplicationForm;
