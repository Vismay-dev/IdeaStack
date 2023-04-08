import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PaymentsConsultant from "../Modals/PaymentsConsultant";
import { SiZoom, SiGooglemeet } from "react-icons/si";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import userContext from "../../context/userContext";

const UpcomingMentor = (props) => {
  const [sessionScheduled, setSessionScheduled] = useState(false);
  const [consultantSelected, setConsultantSelected] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [sessionRequested, setSessionRequested] = useState(false);
  const [sessionsConfirmed, setSessionsConfirmed] = useState(false);
  const [consultant, setConsultant] = useState({});
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

    if (props.mentorshipPackages && props.mentorshipPackages.length !== 0) {
      setConsultantSelected(true);

      setNumSesh(
        props.mentorshipPackages[0].numberOfSessions -
          props.mentorshipPackages[0].numberOfSessionsRemaining +
          1
      );
      setConsultant(props.mentorshipPackages[0]);

      if (props.mentorshipPackages[0].paymentPending === false) {
        setPaymentComplete(true);

        setPackageCompleted(props.mentorshipPackages[0].packageCompleted);
        if (props.mentorshipPackages[0].sessionRequested) {
          setSessionRequested(true);
        }

        if (props.mentorshipPackages[0].sessionsConfirmed) {
          setSessionsConfirmed(true);
          let num =
            props.mentorshipPackages[0].numberOfSessions -
            props.mentorshipPackages[0].numberOfSessionsRemaining;
          setUpcomingSesh({
            date: props.mentorshipPackages[0].selectedDates[num],
            link: props.mentorshipPackages[0].sessionLinks[num],
          });
          props.confirmSessions();
        }
      }
    }

    setLoading(false);
  }, [props.mentorshipPackages]);

  const setUser = useContext(userContext).setUser;
  const user = useContext(userContext).user;
  console.log(
    parseFloat(new Date().getHours()) -
      parseFloat(new Date(upcomingSesh.date).getHours())
  );
  if (
    sessionsConfirmed &&
    !sessionCompleted &&
    (parseFloat(new Date().getHours()) -
      parseFloat(new Date(upcomingSesh.date).getHours()) >
      6 ||
      (new Date() > new Date(upcomingSesh.date) &&
        parseFloat(new Date().getHours()) -
          parseFloat(new Date(upcomingSesh.date).getHours()) <
          6))
  ) {
    setSessionCompleted(true);
  }

  const [showPayments, setShowPayments] = useState(false);
  const [sessionScheduling, setSessionScheduling] = useState(false);

  const requestSession = () => {
    //   axios
    //     .post(
    //       process.env.NODE_ENV === "production"
    //         ? "https://ideastack.herokuapp.com/api/user/updateLatestPendingSession"
    //         : "http://localhost:4000/api/user/updateLatestPendingSession",
    //       {
    //         token: sessionStorage.getItem("token"),
    //         projectID: sessionStorage.getItem("managing"),
    //         updated: {
    //           sessionsConfirmed,
    //           sessionRequested: true,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //       setSessionScheduling(false);
    //       setSessionRequested(true);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };

  const confirmSession = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateLatestPendingSession"
          : "http://localhost:4000/api/user/updateLatestPendingSession",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
          updated: {
            sessionsConfirmed: true,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSessionsConfirmed(true);
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/removeAvailableDate"
              : "http://localhost:4000/api/user/removeAvailableDate",
            {
              token: sessionStorage.getItem("token"),
              projectID: sessionStorage.getItem("managing"),
              mentorID: consultant._id,
              date: consultant.scheduleSelected,
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rescheduleSession = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateLatestPendingSession"
          : "http://localhost:4000/api/user/updateLatestPendingSession",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
          updated: {
            sessionsConfirmed: false,
            sessionRequested: false,
            sessionAccepted: false,
            sessionScheduled: false,
            scheduleSelected: "",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSessionsConfirmed(false);
        setSessionAccepted(false);
        setSessionRequested(false);
        setScheduleSelected("");
        setSessionScheduled(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const history = useRouter();

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

  const finishSession = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/finishLatestSession"
          : "http://localhost:4000/api/project/finishLatestSession",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
        }
      )
      .then((res) => {
        console.log(res.data);
        setSessionFinished(true);
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [packageFinished, setPackageFinished] = useState(false);

  const finishPackage = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/finishPackage"
          : "http://localhost:4000/api/project/finishPackage",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
        }
      )
      .then((res) => {
        console.log(res.data);
        setPackageFinished(true);
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showPayments && (
        <PaymentsConsultant close={() => setShowPayments(false)} />
      )}

      <div
        class={`rounded-md mb-8 shadow-lg bg-gradient-to-r sm:h-[380px] ${
          paymentComplete ? "h-[420px]" : "h-[390px]"
        } sm:pt-0 sm:pb-0 pb-1.5 border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}
      >
        <div data-aos={"fade-up"} data-aos-once="true" class="h-28 pt-2.5 ">
          <p className="text-center top-2 text-xl sm:px-0 px-3  sm:w-full w-[270px] mx-auto block font-semibold relative">
            Upcoming Mentorship Session:
          </p>
          <br />

          {loading ? (
            <div class="relative mx-auto top-[66%] left-0.5 text-center block justify-center">
              <ClipLoader color={"#1663be"} loading={loading} size={80} />
            </div>
          ) : consultantSelected ? (
            <>
              <img
                class={`object-cover ${
                  packageCompleted
                    ? "my-1.5 mt-0"
                    : paymentComplete
                    ? "sm:-mt-0.5 mt-1"
                    : "sm:mt-4 mt-5"
                } ${sessionScheduling ? "hidden" : "block"} ${
                  sessionAccepted
                    ? "sm:w-16 sm:h-16 w-12 h-12"
                    : "sm:w-20 sm:h-20 w-16 h-16"
                } sm:w-24 sm:h-24 w-20 h-20 shadow-md mx-auto justify-center relative rounded-full `}
                src={consultant.pic}
                alt="avatar"
              />
              <p
                class={`text-gray-900 text-center font-semibold   relative ${
                  packageCompleted
                    ? "mt-4"
                    : sessionScheduling
                    ? "-mt-1.5 text-sm"
                    : "mt-2 text-lg"
                }`}
              >
                {consultant.name}{" "}
                {sessionScheduling ? " - " + consultant.role : ""}{" "}
                {packageCompleted
                  ? "(Sessions Completed!)"
                  : ` (Session ${numSesh} of ${consultant.numberOfSessions})`}
              </p>

              {!sessionScheduling ? (
                <p class="text-gray-700 text-center text-sm bottom-0.5  relative ">
                  {consultant.role}
                </p>
              ) : (
                ""
              )}

              {paymentComplete ? (
                packageCompleted ? (
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

                    {packageFinished ? (
                      <p class="text-gray-700 font-bold underline text-center text-md uppercase sm:bottom-0.5 -bottom-2 mt-2  relative ">
                        {" "}
                        Congratulations - Check Your Mail
                      </p>
                    ) : (
                      <button
                        onClick={finishPackage}
                        class="bg-blue-700 text-white rounded-md p-2 pt-2 pb-2 shadow-md right-1 text-sm font-semibold xl:my-3 xl:mb-3.5 my-4   py-1.5 px-3 relative mx-auto block"
                      >
                        Okay - Acknowledge Completion
                      </button>
                    )}
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
                          onClick={finishSession}
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
                ) : sessionScheduled ? (
                  <>
                    <p class="mt-[10px] mb-[17px] text-md relative mx-auto justify-center text-center right-2">
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
                          new Date(upcomingSesh.date)
                            .toString()
                            .substring(0, 15)
                            ? "text-blue-700 font-semibold uppercase"
                            : ""
                        }`}
                      >
                        {" "}
                        When:{" "}
                        {new Date().toString().substring(0, 15) ===
                        new Date(upcomingSesh.date).toString().substring(0, 15)
                          ? "Today"
                          : new Date(upcomingSesh.date)
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
                            new Date(upcomingSesh.date)
                              .toString()
                              .substring(16, 18)
                          ) > 12
                            ? parseInt(
                                new Date(upcomingSesh.date)
                                  .toString()
                                  .substring(16, 18)
                              ) - 12
                            : parseInt(
                                new Date(consultant.scheduleSelected)
                                  .toString()
                                  .substring(16, 18)
                              )
                        ) +
                          new Date(consultant.scheduleSelected)
                            .toString()
                            .substring(18, 21) +
                          String(
                            parseInt(
                              new Date(consultant.scheduleSelected)
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
                      {consultant.sessionLink}
                    </h3>

                    <p class=" absolute mx-auto text-center  ml-4  right-2  mb-0.5">
                      <SiZoom class="inline relative  mr-1.5 text-blue-600 text-4xl" />
                      <SiGooglemeet class="inline  text-indigo-500 relative text-xl" />
                    </p>
                  </>
                ) : (
                  <>
                    {sessionRequested && !sessionsConfirmed ? (
                      <h1 class="text-center mt-3 font-semibold text-sm ">
                        Awaiting Session Details..
                      </h1>
                    ) : (
                      ""
                    )}
                    <p
                      class={`relative mx-auto text-center   ${
                        sessionScheduling
                          ? "mb-3 mt-[2px] -top-2"
                          : "mb-1.5 mt-[16px]"
                      } right-[2px] mr-2`}
                    >
                      {sessionScheduling ? (
                        <>
                          {/* <SiZoom class="inline relative -mt-5 -mb-1 mr-3 text-blue-600 text-4xl" />
                          <SiGooglemeet class="inline -mt-5 -mb-1  text-amber-600 relative text-xl" /> */}
                        </>
                      ) : sessionsConfirmed ? (
                        <>
                          <SiZoom class="inline relative  mr-3 -mt-4 mb-1.5 text-blue-600 text-5xl" />
                          <SiGooglemeet class="inline -mt-4 mb-1.5 text-amber-600 relative text-2xl" />
                        </>
                      ) : sessionAccepted ? (
                        <>
                          <SiZoom class="inline relative -mt-4   mr-3 text-blue-600 text-5xl" />
                          <SiGooglemeet class="inline -mt-4  text-amber-600 relative text-2xl" />
                        </>
                      ) : sessionRequested ? (
                        <>
                          <SiZoom class="inline relative  mr-3 -mt-2.5 text-blue-600 text-5xl" />
                          <SiGooglemeet class="inline -mt-2.5 text-amber-600 relative text-2xl" />
                        </>
                      ) : (
                        <>
                          {/* <SiZoom class="inline relative -mt-4  mr-3 text-blue-600 text-4xl" />
                          <SiGooglemeet class="inline -mt-4 text-amber-600 relative text-1xl" /> */}
                        </>
                      )}
                    </p>

                    {sessionsConfirmed ? (
                      <>
                        <p class="text-center text-sm underline font-bold sm:px-6 px-4 sm:w-full w-[305px] sm:-mt-3 mt-3.5 mx-auto block">
                          Upcoming Session:
                        </p>

                        <p class="-mt-[2px] mb-[11px] text-md relative mx-auto justify-center text-center right-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 top-[2px] relative  mr-0.5 inline"
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
                          <span class="inline mt-4 font-semibold top-[2.5px] relative  text-sm">
                            {" "}
                            When:{" "}
                            {new Date(upcomingSesh.date)
                              .toString()
                              .substring(0, 15)}{" "}
                          </span>
                          <br />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 top-[2.5px] relative mr-0.5 inline"
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
                          <span class="inline mt-4 font-semibold top-[2.5px] relative  text-sm">
                            {" "}
                            At:{" "}
                            {String(
                              parseInt(
                                new Date(upcomingSesh.date)
                                  .toString()
                                  .substring(16, 18)
                              ) > 12
                                ? parseInt(
                                    new Date(upcomingSesh.date)
                                      .toString()
                                      .substring(16, 18)
                                  ) - 12
                                : parseInt(
                                    new Date(upcomingSesh.date)
                                      .toString()
                                      .substring(16, 18)
                                  )
                            ) +
                              ":" +
                              String(
                                new Date(upcomingSesh.date)
                                  .toString()
                                  .substring(19, 21)
                              ) +
                              (parseInt(
                                new Date(upcomingSesh.date)
                                  .toString()
                                  .substring(16, 18)
                              ) > 12
                                ? " PM "
                                : " AM ") +
                              new Date().toString().substring(34)}{" "}
                          </span>
                          <br />{" "}
                          <p class="w-9/12 relative top-[2px] text-ellipsis truncate mx-auto block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 top-[-1px] relative  mr-0.5 inline"
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
                            <span class="inline mt-5  font-semibold w-10/12 text-ellipsis truncate  relative  text-sm">
                              {" "}
                              Link:{" "}
                              <span class="text-blue-700 cursor-pointer  truncate w-[80%] text-ellipsis  hover:text-indigo-600 hover:underline ">
                                {upcomingSesh.link}
                              </span>
                            </span>
                          </p>
                        </p>
                      </>
                    ) : sessionRequested ? (
                      <p class="text-center text-sm sm:px-6 px-4 sm:w-full w-[305px] font-semibold sm:mt-0 mt-3.5 mx-auto block">
                        {" "}
                        Please wait for the approval of your requested
                        mentorship schedule.{" "}
                      </p>
                    ) : (
                      <>
                        <div class="w-fit mx-auto block -mt-[4px]">
                          {consultant &&
                            consultant.selectedDates.map((elem, i) => {
                              return (
                                <p
                                  class={`text-left leading-[26px]  text-blue-700 ${
                                    consultant.selectedDates.length === 1
                                      ? "top-3 mb-9"
                                      : consultant.selectedDates.length === 2
                                      ? "top-1 mb-2"
                                      : consultant.selectedDates.length === 4
                                      ? "-mt-1.5"
                                      : ""
                                  } relative block right-[8px] text-sm font-bold`}
                                >
                                  {i + 1}.{" "}
                                  {new Date(elem).toDateString() +
                                    " - " +
                                    new Date(elem)
                                      .toString()
                                      .substring(16, 21)}{" "}
                                </p>
                              );
                            })}
                        </div>
                        <button
                          onClick={() => requestSession()}
                          class={`bg-indigo-500 ${
                            consultant.selectedDates.length === 2
                              ? "top-2.5"
                              : ""
                          }  uppercase p-4 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[10px]  shadow-md py-2 mt-3 mb-2 text-white font-semibold -left-[8px]`}
                        >
                          Ask for Confirmation
                        </button>
                      </>
                    )}
                  </>
                )
              ) : (
                <p class="mt-[18px] relative mx-auto justify-center text-center  right-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 underline inline mr-0.5 top-[1px] relative"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                    />
                  </svg>
                  <span class="inline mt-6 font-semibold top-[3px] text-lg relative underline">
                    Team Payment Pending:{" "}
                  </span>
                  <button
                    onClick={() => {
                      setShowPayments(true);
                    }}
                    class="bg-indigo-500  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2.5 mt-4 mb-2 text-white font-semibold left-[.8px]"
                  >
                    VIEW PENDING PAYMENTS
                  </button>
                </p>
              )}
            </>
          ) : (
            <>
              <h3 class="font-semibold text-center mx-auto xl:mt-2 sm:mt-2.5 mt-1.5 sm:mb-0 xl:mb-2.5 mb-1 xl:w-[360px] sm:text-2xl text-xl sm:w-full w-[310px] px-12">
                No <span class="text-blue-700">Industry Mentor</span>{" "}
                Selected...
              </h3>
              <button
                onClick={() =>
                  history.push("/myprojects/manageproject/mentorship/browse")
                }
                class="bg-indigo-500 p-2.5 hover:bg-indigo-500 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] xl:normal-case uppercase shadow-md py-2 xl:mt-6 xl:mb-2  sm:mt-9 mt-6 sm:mb-1 mb-3 text-white font-semibold"
              >
                Find an Industry Expert
              </button>

              <img
                class="relative w-[100px] h-[120px] mx-auto mt-[24px] shadow-lg rounded-md right-[6px]"
                src={
                  "https://d22bbllmj4tvv8.cloudfront.net/d5/c0/efaeb96d41e3a674f8d2ed576bed/what-is-mentoring1-square.jpg"
                }
              ></img>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingMentor;
