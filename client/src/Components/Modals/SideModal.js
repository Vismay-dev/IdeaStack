import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "./logo2.png";
import userContext from "../../context/userContext";
import ExitModal from "./ExitModal";

const SideModal = (props) => {
  const history = useHistory();
  const myRef = useRef();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const location = useLocation();

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
          class="bg-gradient-to-r from-blue-200 to-indigo-300 h-screen w-72 z-40  right-0 absolute"
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
                {/* {for now both are same case - profile first} */}
                {
                  <>
                    <a
                      onClick={() => {
                        if (!location.pathname.includes("profile")) {
                          history.push("/profile");
                        }
                        props.close();
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
                        if (!location.pathname.includes("dashboard")) {
                          history.push("/dashboard");
                        }
                        props.close();
                      }}
                      class="flex items-center px-4 py-2 mt-5 text-gray-700  transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        />
                      </svg>

                      <span class="ml-4 font-semibold">Dashboard</span>
                    </a>

                    <a
                      onClick={() => {
                          history.push("/networks/");
                        
                        props.close();
                      }}
                      class="flex items-center px-4 py-2 mt-5 cursor-pointer text-gray-700 transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                        />
                      </svg>

                      <span class="mx-4 font-semibold">Networks</span>
                    </a>
                  </>
                }

                <hr class="relative mx-auto block w-10/12 mb-[60px] mt-[58px] border-t-[1.5px]  border-gray-700" />

                <a
                  onClick={() => {
                    showModalOut();
                  }}
                  class="flex items-center px-4 cursor-pointer py-2 mt-4 text-gray-700 transition-colors duration-200 transform rounded-md  bg-white shadow-sm hover:shadow-md hover:bg-gray-200 active:shadow-md  hover:text-gray-900"
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
