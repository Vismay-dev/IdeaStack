import axios from "axios";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState, useRef, useContext } from "react";
import CourseMaterials from "./CourseMaterials";
import CourseMaterialsMentor from "./CourseMaterialsMentor";
import mentorAccContext from "../../context/mentorAccContext";

const AllCourseDetails = (props) => {
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

  const mentorAccCon = useContext(mentorAccContext);

  const [materials, setMaterials] = useState();
  const [isTasks, setIsTasks] = useState(false);

  const [loading, setLoading] = useState();

  useEffect(() => {
    setIsTasks(props.isTasks ? props.isTasks : null);

    setLoading(true);

    let mentorship = props.startup
      ? props.startup.currentMentorship
      : props.mentor;
    let otherDocs = [];
    let arrTaskRefs = [];
    let arrUploads = [];

    setTimeout(() => {
      let materials = mentorship.materials;

      otherDocs = materials.otherDocs;
      arrTaskRefs = materials.taskRefs;
      arrUploads = materials.uploads;

      if (props.viewType) {
        let generalStartupDocs = props.startup.documents.filter(
          (doc) => doc.visibleToMentors
        );
        if (props.viewType === "startupDocs") {
          setMaterials({ arrUploads, generalStartupDocs });
        } else if (props.viewType === "mentorDocs") {
          setMaterials({ otherDocs, arrTaskRefs });
        }
      } else {
        setMaterials({ otherDocs, arrTaskRefs, arrUploads });
      }

      setLoading(false);
    }, 1000);
  }, []);
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
          class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle md:w-10/12 w-[95%]"
        >
          <div class="bg-white sm:px-4 px-1 pt-2 pb-2 sm:p-6 sm:pb-4">
            <p class="text-center md:text-3xl text-2xl  mt-2 mb-4 left-1.5 font-bold relative">
              {props.viewType === "startupDocs"
                ? "Docs Uploaded By Startup Team"
                : props.viewType === "mentorDocs"
                ? "Docs Uploaded By You"
                : "Tasks & Resources"}
            </p>
            {props.viewType && props.viewType !== "none" ? (
              <>
                <CourseMaterialsMentor
                  materials={materials}
                  viewType={props.viewType}
                  loading={loading}
                  startup={props.startup}
                  mentorId={mentorAccCon.mentor._id}
                />
              </>
            ) : (
              <>
                <CourseMaterials
                  materials={materials}
                  isTasks={isTasks}
                  loading={loading}
                  mentorId={props.mentor.mentorId}
                />
              </>
            )}
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

export default AllCourseDetails;
