import PersonalInfo from "./PersonalInfo";
import Stepper from "./Stepper";

import AOS from "aos";
import "aos/dist/aos.css";

import axios from "axios";

import { useEffect, useState, useRef } from "react";

const RegModal = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, [loading]);

  const myRef = useRef();

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (props.onboardFullName && props.project) {
      setLoading(true);
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/getProjectMember"
            : "http://localhost:4000/api/user/getProjectMember",
          {
            projectName: props.project,
            memberName: props.onboardFullName,
          }
        )
        .then((res) => {
          console.log(res.data);
          setLoading(false);

          setUserDetails(res.data);
        });
    }
  }, []);

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

  console.log(loading);

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
          class={`pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle lg:w-10/12 ${
            loading ? "md:w-11/12" : "sm:w-11/12"
          } md:w-11/12 w-[98%]`}
        >
          <div class="bg-white px-1 pt-2 pb-2 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class=" text-center sm:mt-0 md:ml-4 mx-auto sm:text-left">
                <div>
                  <p class="text-lg  text-gray-500 pt-5">
                    <PersonalInfo
                      isLoading={() => setLoading(true)}
                      isNotLoading={() => setLoading(false)}
                      close={props.close}
                      userDetails={userDetails}
                    />
                  </p>
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

export default RegModal;
