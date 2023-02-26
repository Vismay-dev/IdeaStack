import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PaymentsConsultant from "../Modals/PaymentsConsultant";
import { SiZoom, SiGooglemeet } from "react-icons/si";
import { MdPersonSearch } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";

const UpcomingMentor = (props) => {
  const [sessionScheduled, setSessionScheduled] = useState(false);
  const [consultantSelected, setConsultantSelected] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [sessionRequested, setSessionRequested] = useState(false);
  const [sessionsConfirmed, setSessionsConfirmed] = useState(false);
  const [workshop, setWorkshop] = useState({});
  const [loading, setLoading] = useState(false);
  const [scheduleSelected, setScheduleSelected] = useState(null);
  const [sessionAccepted, setSessionAccepted] = useState(false);
  const [numSesh, setNumSesh] = useState(0);
  const [availableDates, setAvailableDates] = useState([]);
  const [upcomingSesh, setUpcomingSesh] = useState({});
  const [packageCompleted, setPackageCompleted] = useState(false);

  const [sessionCompleted, setSessionCompleted] = useState(false);
  useEffect(() => {
    setLoading(true);

    if (props.workshop) {
      setConsultantSelected(true);
      let currSessionNum = 0;
      let currentTime = new Date();

      for (let i = 0; i < props.workshop.timeline.length; i++) {
        if (
          (i == 0 &&
            currentTime.getTime() <
              new Date(props.workshop.timeline[i]).getTime()) ||
          (currentTime.getTime() <
            new Date(props.workshop.timeline[i]).getTime() &&
            currentTime.getTime() >
              new Date(props.workshop.timeline[i - 1]).getTime())
        ) {
          currSessionNum = i;
        }
      }

      setNumSesh(currSessionNum + 1);
      setWorkshop(props.workshop);

      props.confirmSessions();

      if (props.workshop.paymentPending === false) {
        setPaymentComplete(true);
        setPackageCompleted(props.workshop.packageCompleted);
      }
    }

    setLoading(false);
  }, [props.workshop]);

  const setUser = useContext(userContext).setUser;
  const user = useContext(userContext).user;

  if (
    sessionsConfirmed &&
    consultantSelected &&
    !sessionCompleted &&
    (parseFloat(new Date().getHours()) -
      parseFloat(new Date(workshop.timeline[numSesh - 1]).getHours()) >
      6 ||
      (new Date() > new Date(workshop.timeline[numSesh - 1]) &&
        parseFloat(new Date().getHours()) -
          parseFloat(new Date(workshop.timeline[numSesh - 1]).getHours()) <
          6))
  ) {
    setSessionCompleted(true);
  }

  const history = useHistory();

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    let not = padTo2Digits(date.getHours()) > 12 ? "PM" : "AM";
    return (
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/") +
      "  " +
      " " +
      [
        padTo2Digits(
          date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        ),
        padTo2Digits(date.getMinutes()),
      ].join(":") +
      " " +
      not
    );
  }

  const [chkDate, setChkDate] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  const [packageFinished, setPackageFinished] = useState(false);

  return (
    <>
      {/* {showPayments && (
        <PaymentsConsultant close={() => setShowPayments(false)} />
      )} */}

      <div
        class={`rounded-md mb-8 shadow-lg bg-gradient-to-r sm:h-[380px] 
           h-[390px]
         sm:pt-0 sm:pb-0 pb-1.5 border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}
      >
        <div data-aos={"fade-up"} data-aos-once="true" class="h-28 pt-2.5 ">
          <p className="text-center uppercase top-3 mb-2 text-xl sm:px-0 px-3  sm:w-full w-[270px] mx-auto block font-semibold relative">
            Upcoming Discussion Session:
          </p>
          <br />

          {loading ? (
            <div class="relative mx-auto top-[66%] left-0.5 text-center block justify-center">
              <ClipLoader color={"#1663be"} loading={loading} size={80} />
            </div>
          ) : workshop && consultantSelected ? (
            <>
              <div class="block relative w-fit mb-2  items-center mx-auto">
                <img
                  class={`object-cover 
                    sm:mt-2 mt-3
                 w-[75px] h-[75px] mb-4 mr-2 shadow-md justify-center inline relative rounded-full `}
                  src={workshop && workshop.pics && workshop.pics[0]}
                  alt="avatar"
                />

                <img
                  class={`object-cover 
                 
                    sm:mt-2 mt-3
                    w-[75px] h-[75px] mb-4 ml-2 shadow-md justify-center inline relative rounded-full `}
                  src={workshop && workshop.pics && workshop.pics[1]}
                  alt="avatar"
                />
              </div>
              <p
                class={`text-gray-900 text-center font-semibold   relative 
                 mt-1 text-md mb-1
                `}
              >
                {workshop.title}
                <br />
                {packageCompleted
                  ? "(Sessions Completed!)"
                  : ` (Session ${numSesh} of ${workshop.timeline.length})`}
              </p>

              <p class="text-gray-700 text-center text-sm bottom-0.5  relative ">
                {workshop.role}
              </p>

              {packageCompleted ? (
                <p class="text-gray-700 text-center text-sm sm:-top-1 top-2 bottom-0.5  relative ">
                  <h1 class="font-bold text-lg mt-3 text-gray-900">
                    Mentorship Package{" "}
                    <span class="text-blue-700">Completed!</span>
                  </h1>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={`h-9 text-green-700 w-9 ${
                      packageFinished
                        ? "sm:mb-5 sm:mt-3.5 mb-4 mt-5"
                        : "sm:mb-3.5 sm:mt-2 mb-3 mt-4"
                    }   relative block mx-auto`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </p>
              ) : sessionCompleted ? (
                <>
                  {sessionFinished ? (
                    <>
                      <p class=" font-semibold text-xl text-center mt-3 right-2.5 relative underline">
                        Session Completed
                      </p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-9 text-green-700 w-9 mb-0.5 mt-3 right-1  relative block mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>

                      <p class="text-sm px-6 text-center mt-2.5">
                        For any queries, mail us at{" "}
                        <span class="underline text-blue-600">
                          ideastackapp@gmail.com.
                        </span>{" "}
                        We prioritize addressing your concerns.
                      </p>
                    </>
                  ) : (
                    <>
                      <p class=" font-semibold text-xl text-center mt-2 right-2.5 relative underline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-7 text-green-700 w-7 mb-1 relative inline right-1 mx-auto ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span class="inline">Session Completed</span>
                      </p>
                      <button
                        // onClick={finishSession}
                        class="bg-blue-700 text-white p-2 pt-1 shadow-md right-1 text-sm font-semibold xl:my-3 xl:mb-3.5 my-4   py-1.5 px-3 relative mx-auto block"
                      >
                        Okay
                      </button>
                      <p class="text-sm px-6 text-center mt-3.5">
                        For any queries, mail us at{" "}
                        <span class="underline text-blue-600">
                          ideastackapp@gmail.com.
                        </span>{" "}
                        We prioritize addressing your concerns.
                      </p>{" "}
                    </>
                  )}
                </>
              ) : (
                <>
                  <p class="mt-[14px] mb-[20px] text-md relative mx-auto justify-center text-center right-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 top-[1px] relative text-gray-600 mr-1 inline"
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
                    <span
                      class={`inline mt-4 font-semibold top-[2.5px] relative text-gray-700 text-sm ${
                        new Date().toString().substring(0, 15) ===
                        new Date(workshop.timeline[numSesh - 1])
                          .toString()
                          .substring(0, 15)
                          ? "text-blue-700 font-semibold uppercase"
                          : ""
                      }`}
                    >
                      {" "}
                      When:{" "}
                      {new Date().toString().substring(0, 15) ===
                      new Date(workshop.timeline[numSesh - 1])
                        .toString()
                        .substring(0, 15)
                        ? "Today"
                        : new Date(workshop.timeline[numSesh - 1])
                            .toString()
                            .substring(0, 15)}{" "}
                    </span>
                    <br />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 relative text-gray-600 mr-1 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span class="inline mt-4 font-semibold top-[1.5px] relative text-gray-700 text-sm">
                      {" "}
                      At:{" "}
                      {String(
                        parseInt(
                          new Date(workshop.timeline[numSesh - 1])
                            .toString()
                            .substring(16, 18)
                        ) > 12
                          ? parseInt(
                              new Date(workshop.timeline[numSesh - 1])
                                .toString()
                                .substring(16, 18)
                            ) - 12
                          : parseInt(
                              new Date(workshop.timeline[numSesh - 1])
                                .toString()
                                .substring(16, 18)
                            )
                      ) +
                        new Date(workshop.timeline[numSesh - 1])
                          .toString()
                          .substring(18, 21) +
                        String(
                          parseInt(
                            new Date(workshop.timeline[numSesh - 1])
                              .toString()
                              .substring(16, 18)
                          ) > 12
                            ? " PM "
                            : " AM "
                        ) +
                        new Date().toString().substring(34)}{" "}
                    </span>
                  </p>

                  <p class=" relative mx-auto justify-center text-center right-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-[17px] w-[17px] top-[1px] text-gray-600 relative inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <span class="inline mt-4 font-semibold relative underline text-gray-700">
                      {" "}
                      Meeting Link:{" "}
                    </span>
                  </p>

                  <h3 class="text-indigo-400 truncate text-center break-normal mt-0.5 right-1 text-ellipsis mb-1 hover:text-indigo-600 hover:underline cursor-pointer relative w-10/12 mx-auto  z-50 ">
                    {workshop.links[numSesh - 1]}
                  </h3>

                  <p class=" absolute mx-auto text-center  ml-4 -mt-[28px] right-3.5  mb-0.5">
                    <SiZoom class="inline relative  mr-1.5 text-blue-600 text-4xl" />
                    <SiGooglemeet class="inline  text-indigo-500 relative text-xl" />
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <h3 class=" text-center mx-auto mt-1 mb-2.5  text-base px-6 xl:w-full md:w-[500px] sm:w-[400px] w-[320px]">
                No <span class="text-blue-700">Industry Expert Workshops</span>{" "}
                <br />
                <span class="text-blue-700">Booked</span>...
              </h3>
              <MdPersonSearch
                onClick={() => {
                  history.push("/mentors/bookworkshops");
                }}
                class="h-24 w-24 bg-blue-700 text-white p-4 pr-[12px] rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-7 mb-5  block mx-auto"
              />

              <h1 class="  uppercase  text-base mx-auto relative block right-[8px]  py-2.5 sm:mt-3 -mt-1 -mb-4 text-black text-center font-semibold">
                Browse Industry Experts
              </h1>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-center relative mx-auto block top-[22px] text-indigo-600 bg-blue-200 border-2 border-indigo-800 rounded-full p-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 11l7-7 7 7M5 19l7-7 7 7"
                />
              </svg>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingMentor;
