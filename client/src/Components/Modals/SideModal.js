import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo2.png";
import userContext from "../../context/userContext";
import ExitModal from "../Modals/ExitModal";

const SideModal = (props) => {
  const history = useHistory();
  const myRef = useRef();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (
          !myRef.current ||
          myRef.current.contains(event.target) ||
          exitModalShow
        ) {
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

  const [exitModalShow, setExitModalShow] = useState(false);

  const userCont = useContext(userContext);
  const user = userCont.user;
  const setUser = userCont.setUser;

  const showModalOut = () => {
    setExitModalShow(true);
  };

  const closeFuncOut = () => {
    setExitModalShow(false);
  };

  const closePostLog = () => {
    props.close();
  };

  return (
    <div
      class="fixed z-[200] inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {exitModalShow ? (
        <ExitModal loggedOut={closePostLog} ref={myRef} close={closeFuncOut} />
      ) : (
        ""
      )}
      <div class="items-end justify-center min-h-screen  text-center block p-0">
        {/* Background overlay, show/hide based on modal state. */}
        <div
          class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div
          data-aos={"fade-left"}
          data-aos-once="true"
          ref={myRef}
          class="bg-gradient-to-r from-blue-200 to-indigo-300 h-screen w-64 z-40  right-0 absolute"
        >
          <div class="z-50 absolute  h-fit right-0 px-8 py-8 pb-40 border-r bg-gradient-to-r from-blue-200 to-indigo-300 border-gray-600">
            <button
              onClick={props.close}
              type="button"
              class="bg-white rounded-md mb-5 p-2 absolute left-4 top-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={logo}
              className="w-40  bg-white relative mb-28  shadow-md rounded-md mt-10 mx-auto right-1 top-12 "
            />

            <div class="relative mt-10">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="w-5 h-5 bottom-4 relative text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                type="text"
                class="w-full py-2 pl-10 mb-8 pr-4  text-gray-900 bg-white border-0 shadow-md rounded-md  focus:border-blue-00  focus:ring-blue-700 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Search"
              />
            </div>

            <div class="flex flex-col justify-between flex-1 mt-6">
              <nav>
                {user.projects.length > 0 ? (
                  <>
                    <a
                      onClick={() => {
                        history.push("/myprojects");
                        props.close();
                      }}
                      class="flex items-center px-4 py-2 text-gray-700 cursor-pointer transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900"
                    >
                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span class="mx-4 font-semibold">My Projects</span>
                    </a>

                    <a
                      onClick={() => {
                        props.close();
                        history.push("/profile");
                      }}
                      class="flex items-center px-4 py-2 mt-5 text-gray-700 cursor-pointer transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900"
                    >
                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span class="mx-4 font-semibold">Profile</span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      onClick={() => {
                        props.close();
                        history.push("/profile");
                      }}
                      class="flex items-center px-4 py-2 text-gray-700  transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900 cursor-pointer"
                    >
                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span class="mx-4 font-semibold">Profile</span>
                    </a>
                    <a
                      onClick={() => {
                        history.push("/myprojects");
                        props.close();
                      }}
                      class="flex items-center px-4 py-2 mt-5 cursor-pointer text-gray-700 transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900"
                    >
                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span class="mx-4 font-semibold">My Projects</span>
                    </a>
                  </>
                )}

                <a
                  onClick={() => {
                    props.close();
                    history.push("/browse");
                  }}
                  class="flex items-center px-4 py-2 mt-5 text-gray-700  transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span class="mx-4 font-semibold">Browse Projects</span>
                </a>

                <hr class="relative mx-auto block w-10/12 mb-[67px] mt-[65px] border-t-[1.5px]  border-gray-700" />

                <a
                  onClick={() => {
                    showModalOut();
                  }}
                  class="flex items-center px-4 cursor-pointer py-2 mt-5 text-gray-700 transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <span class="mx-4 font-semibold">Log Out</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideModal;
