import { useContext, useEffect, useState } from "react";
import DateConfirm from "../../Modals/DateConfirm";
import MentorInstructionsSet from "../../Modals/MentorInstructionsSet";

import axios from "axios";
import projectContext from "../../../context/projectContext";

import DateTimePicker from "react-datetime-picker";
import mentorAccContext from "../../../context/mentorAccContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";

const Meetings = (props) => {
  const [checkPoints, setCheckPoints] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [showDatePick, setShowDatePick] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [upcomingMeeting, setUpcomingMeeting] = useState(null);
  const [datePicked, setDatePicked] = useState();
  const [weekNum, setWeekNum] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();

  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const projCon = useContext(projectContext);
  const mentorCon = useContext(mentorAccContext);

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const [type, setType] = useState();

  const history = useHistory();

  useEffect(() => {
    setError("");
  }, [date1, date2]);

  function add3Day(date) {
    date.setDate(date.getDate() + 3);
    return date;
  }

  const subDates = () => {
    setError("");
    if (date1.getDay() === date2.getDay()) {
      setError("datesSame");
      return;
    }
    if (
      date1.getHours() + date1.getMinutes() / 60.0 > 20 ||
      date1.getHours() + date1.getMinutes() / 60.0 < 14
    ) {
      setError("date1Range");
      return;
    } else if (
      date2.getHours() + date2.getMinutes() / 60.0 > 20 ||
      date2.getHours() + date2.getMinutes() / 60.0 < 14
    ) {
      setError("date2Range");
      return;
    }

    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/confirmMeetingSlots"
          : "http://localhost:4000/api/user/confirmMeetingSlots",
        {
          token: sessionStorage.getItem("mentorToken"),
          mentorId: mentorCon.mentor._id,
          projectId: projCon.project._id,
          week: weekNum + moveIndex,
          meetingSlots: [date1, date2],
        }
      )
      .then((res) => {
        projCon.setProject({
          ...res.data,
          changeFlagged: true,
          meetingFlagged: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [moveIndex, setMoveIndex] = useState(0);

  const moveForward = () => {
    if (moveIndex + weekNum !== 4) {
      setMoveIndex(moveIndex + 1);
    }
  };

  const moveBackward = () => {
    if (moveIndex + weekNum !== 0) {
      setError("");
      setMoveIndex(moveIndex - 1);
    }
  };

  const acknowledgeMeetingCompletion = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/acknowledgeMeetingCompletionMentor"
          : "http://localhost:4000/api/user/acknowledgeMeetingCompletionMentor",
        {
          token: sessionStorage.getItem("mentorToken"),
          mentorId: mentorCon.mentor._id,
          projectId: props.startup._id,
        }
      )
      .then((res) => {
        console.log(res.data);
        projCon.setProject({ ...res.data, changeFlagged: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [timelineCompleted, setTimelineCompleted] = useState(false);

  useEffect(() => {
    let startingDate = new Date(props.startup.currentMentorship.matchedDate);
    let endingDate = new Date(props.startup.currentMentorship.endDate);

    let checkPointsCopy = [];
    let checkPointsCopy2 = [];

    let current = new Date(startingDate);

    while (current <= endingDate) {
      if (current.getDay() === 0) {
        checkPointsCopy.push(new Date(current).toDateString().substring(4, 10));
        checkPointsCopy2.push(new Date(current));
      }
      let newDate = new Date(current.setDate(current.getDate() + 1));
      current = new Date(newDate);
    }

    let availableDatesCopy;
    let selectedDateCopy;
    let duration = props.startup.currentMentorship.duration;

    if (
      new Date() < checkPointsCopy2[0] ||
      (new Date() > checkPointsCopy2[0] && new Date() < checkPointsCopy2[1])
    ) {
      if (moveIndex === 0) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week1.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week1.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[0]));
        setMaxDate(checkPointsCopy2[1]);
      } else if (moveIndex === 1 && duration > 1) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week2.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week2.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[1]));
        setMaxDate(checkPointsCopy2[2]);
      } else if (moveIndex === 2 && duration > 2) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week3.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week3.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[2]));
        setMaxDate(checkPointsCopy2[3]);
      } else if (moveIndex === 3 && duration > 3) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week4.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week4.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[3]));
        setMaxDate(checkPointsCopy2[4]);
      }
      setWeekNum(1);
    }

    if (
      duration > 1 &&
      ((new Date() > checkPointsCopy2[1] && new Date() < checkPointsCopy2[2]) ||
        (props.startup.currentMentorship.timeline.week1.selectedDate &&
          new Date() >
            new Date(
              props.startup.currentMentorship.timeline.week1.selectedDate
            ) &&
          new Date() < checkPointsCopy2[2]))
    ) {
      if (moveIndex === 0 && duration > 1) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week2.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week2.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[1]));
        setMaxDate(checkPointsCopy2[2]);
      } else if (moveIndex === 1 && duration > 2) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week3.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week3.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[2]));
        setMaxDate(checkPointsCopy2[3]);
      } else if (moveIndex === 2 && duration > 3) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week4.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week4.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[3]));
        setMaxDate(checkPointsCopy2[4]);
      }
      setWeekNum(2);
    }

    if (
      duration > 2 &&
      ((new Date() > checkPointsCopy2[2] && new Date() < checkPointsCopy2[3]) ||
        (props.startup.currentMentorship.timeline.week2.selectedDate &&
          new Date() >
            new Date(
              props.startup.currentMentorship.timeline.week2.selectedDate
            ) &&
          new Date() < checkPointsCopy2[3]))
    ) {
      if (moveIndex === 0 && duration > 2) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week3.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week3.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[2]));
        setMaxDate(checkPointsCopy2[3]);
      } else if (moveIndex === 1 && duration > 3) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week4.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week4.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[3]));
        setMaxDate(checkPointsCopy2[4]);
      }

      setWeekNum(3);
    }

    if (
      duration > 3 &&
      ((new Date() > checkPointsCopy2[3] && new Date() < checkPointsCopy2[4]) ||
        (props.startup.currentMentorship.timeline.week3.selectedDate &&
          new Date() >
            new Date(
              props.startup.currentMentorship.timeline.week3.selectedDate
            ) &&
          new Date() < checkPointsCopy2[4]))
    ) {
      if (moveIndex === 0 && duration > 3) {
        availableDatesCopy =
          props.startup.currentMentorship.timeline.week4.availableDates;
        selectedDateCopy =
          props.startup.currentMentorship.timeline.week4.selectedDate;
        setMinDate(add3Day(checkPointsCopy2[3]));
        setMaxDate(checkPointsCopy2[4]);
      }
      setWeekNum(4);
    }

    if (duration === 4 && new Date() > checkPointsCopy2[4]) {
      setWeekNum(5);
    }

    if (props.startup.currentMentorship.upcomingMeeting) {
      setUpcomingMeeting(props.startup.currentMentorship.upcomingMeeting);
    }

    if (
      (props.startup.currentMentorship.pastMeetings.length >= duration &&
        new Date(
          props.startup.currentMentorship.pastMeetings[
            props.startup.currentMentorship.pastMeetings.length - 1
          ].date
        ) < new Date()) ||
      (new Date() > checkPointsCopy2[duration] && duration > 1)
    ) {
      setTimelineCompleted(true);
    }

    setSelectedDate(selectedDateCopy);

    setAvailableDates(availableDatesCopy);
    setCheckPoints(checkPointsCopy);
  }, [props.startup, projCon.project, moveIndex]);

  return (
    <>
      {showInstructions ? (
        <MentorInstructionsSet
          upcomingMeeting={upcomingMeeting}
          type={type}
          startup={props.startup}
          close={() => setShowInstructions(false)}
        />
      ) : (
        ""
      )}
      <div class="h-fit md:w-[100%] sm:w-[100%] w-[100%]  md:px-0 sm:px-7 px-0 mx-auto mt-1 md:mb-14 mb-11 right-1.5 relative grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <div class="bg-white rounded-md col-span-1 block h-[400px] border-blue-700 border shadow-md ">
          <p class="w-full text-xl tracking-wide bg-gray-200 border-b-1.5 py-3 text-center font-bold border-dashed border-gray-600">
            Upcoming Meeting
          </p>
          {weekNum === 5 ? (
            <>
              <p class="mx-auto block text-sm text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 border-b-2 border-blue-700 uppercase tracking-wide border-b-1.5 py-2 text-center font-bold border-dashed ">
                <>All Meetings Completed</>
              </p>
            </>
          ) : (
            <></>
          )}

          {loading ? (
            <div class=" mx-auto block w-fit text-center mt-[105px]">
              <ClipLoader color={"#0b0bbf"} loading={loading} size={90} />
            </div>
          ) : weekNum === 5 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[70px] h-[70px] left-[5px] block mx-auto  relative top-[105px] text-center   text-blue-700 rounded-full bg-indigo-200 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : upcomingMeeting && !upcomingMeeting.completed ? (
            <div>
              <img
                class="rounded-full border-[1px]  border-gray-200 w-[75px] h-[75px] p-1.5 mx-auto block mt-3.5"
                src={props.startup.projPic}
              ></img>
              <h1 class="mt-2.5 text-center font-bold text-lg">
                {props.startup.name}
              </h1>
              <h1 class="mt-[1px] text-center uppercase text-blue-700 font-bold text-xs">
                {"week " + upcomingMeeting.week + " meeting"}
              </h1>

              <hr class="border-t-[1.5px] border-gray-200 my-3 mt-[12px]" />

              <p class="block mx-auto w-fit">
                <span class="text-left w-fit  block mt-2.5 text-sm">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-[18px] h-[18px] inline mr-0.5 relative bottom-[1.5px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>{" "}
                  {new Date(upcomingMeeting.date)
                    .toDateString()
                    .substring(0, 10)}
                </span>
                <span class="text-left w-fit  block mt-1 text-sm">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-[18px] h-[18px] inline  relative bottom-[1.5px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>{" "}
                  {new Date(upcomingMeeting.date)
                    .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                    .substring(12, 17)}{" "}
                  (GST)
                </span>
              </p>
              <hr class="border-t-[1.5px] border-gray-200 my-3 mt-[12px]" />
              <p class="block mx-auto w-fit">
                <span class="text-left w-fit  block mt-1 text-sm">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class={`w-[18px] h-[18px] inline mr-2 relative ${
                      upcomingMeeting.link ? "bottom-[1px]" : "bottom-[1.4px]"
                    }`}
                  >
                    <path
                      stroke-linecap="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  {new Date() > new Date(upcomingMeeting.date) ? (
                    <h1 class="mt-[1px] text-center uppercase text-green-600 inline font-bold text-sm">
                      Meeting Complete!
                    </h1>
                  ) : upcomingMeeting.link ? (
                    <>
                      <span
                        onClick={() => {
                          window.open(upcomingMeeting.link, "_blank");
                        }}
                        class="text-ellipsis hover:text-indigo-600 text-blue-700 hover:underline cursor-pointer truncate break-normal -mb-1.5 inline-block  w-[200px]"
                      >
                        {upcomingMeeting.link}
                      </span>
                      <span
                        onClick={() => {
                          if (!navigator.clipboard) {
                            console.error("Clipboard API is not available");
                            return;
                          }

                          navigator.clipboard
                            .writeText(upcomingMeeting.link)
                            .then(() => {
                              alert(
                                "Copied zoom link: " + upcomingMeeting.link
                              );
                            });
                        }}
                        class=" cursor-pointer hover:text-indigo-700  inline-block "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-[22px] h-[22px] inline ml-6 relative bottom-[1.4px]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    "Meeting link will be provided soon..."
                  )}
                </span>
              </p>
              <hr class="border-t-[1.5px] border-gray-200 my-3 mt-[14px]" />
              <p class="block mx-auto w-fit">
                {new Date() > new Date(upcomingMeeting.date) ? (
                  <button
                    onClick={() => {
                      acknowledgeMeetingCompletion();
                    }}
                    class="bg-green-600 text-white uppercase font-bold text-xs pb-[7px] pt-[10px] px-2.5 rounded-md hover:shadow-md relative top-[6px] shadow-sm hover:bg-green-700"
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[18px] h-[18px] inline mr-1 relative bottom-[1px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Okay
                  </button>
                ) : upcomingMeeting.mentorInstructions ? (
                  <>
                    <button
                      onClick={() => {
                        setType("edit");
                        setShowInstructions(true);
                      }}
                      class="bg-blue-700 text-white uppercase font-semibold text-xs p-2 pt-[10px] px-2.5 rounded-md hover:shadow-md relative top-[6px] shadow-sm hover:bg-blue-600"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-[18px] h-[18px] inline mr-1 relative bottom-[1px]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      EDIT Instructions
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setType("create");
                      setShowInstructions(true);
                    }}
                    class="bg-blue-700 text-white uppercase font-semibold text-xs p-2 pt-[10px] px-2.5 rounded-md hover:shadow-md relative top-[6px] shadow-sm hover:bg-blue-600"
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[18px] h-[18px] inline mr-1 relative bottom-[1px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Set Instructions
                  </button>
                )}
              </p>
            </div>
          ) : (
            <p class="text-gray-500 relative top-[145px] text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[22px] h-[22px] inline mr-1.5 relative bottom-[2.5px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              No Meetings Scheduled
            </p>
          )}
        </div>

        <div class="bg-white rounded-md col-span-1 h-[400px] border-blue-700 border shadow-md ">
          <p class="w-full text-xl tracking-wide bg-gray-200 border-b-1.5 py-3 text-center font-bold border-dashed border-gray-600">
            Pick Meeting Dates
          </p>

          <p class="mx-auto block text-sm text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 border-b-2 border-blue-700 uppercase tracking-wide border-b-1.5 py-2 text-center font-bold border-dashed ">
            {weekNum === 5 ? (
              <>All Meetings Completed</>
            ) : (
              <>
                {moveIndex > 0 ? (
                  <button
                    onClick={moveBackward}
                    class={`bg-blue-700 inline xl:-left-20 lg:-left-10 md:-left-14 sm:-left-24 -left-10 -ml-7 relative hover:bg-blue-600 text-sm  text-white rounded-md px-[5px] py-[3px] uppercase  cursor-pointer hover:shadow-md shadow-sm font-semibold`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[18px] h-[18px] inline  relative  bottom-[1.8px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                      />
                    </svg>
                  </button>
                ) : (
                  ""
                )}
                Meeting {weekNum + moveIndex} of{" "}
                {props.startup.currentMentorship.duration}
              </>
            )}
          </p>
          {timelineCompleted ? (
            <p class="text-green-600 relative top-[110px] text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[22px] h-[22px] inline mr-1.5 relative bottom-[1.5px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Mentorship Completed
            </p>
          ) : weekNum === 5 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[70px] h-[70px] left-[5px] block mx-auto  relative top-[105px] text-center   text-blue-700 rounded-full bg-indigo-200 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : availableDates && availableDates.length > 0 ? (
            <>
              {availableDates.map((availableDate, i) => {
                return (
                  <div
                    class={`py-3.5  border-gray-400  ${
                      new Date(selectedDate).getTime() ===
                      new Date(availableDate).getTime()
                        ? "bg-green-200"
                        : ` w-full bg-yellow-50 `
                    }

                  ${
                    i === 0 && moveIndex + weekNum === 4
                      ? "mt-11"
                      : i === 0 && moveIndex + weekNum !== 4
                      ? "mt-5"
                      : i === 1 && moveIndex + weekNum === 4
                      ? "mb-[38px]"
                      : ""
                  }
                    
                    ${
                      i === 0 ? " border-y-[1.5px]" : "border-b-[1.5px]"
                    } grid-cols-3 grid`}
                  >
                    <span class="col-span-3 text-center relative top-[4.5px] mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={`w-[22px] h-[22px] xl:inline lg:hidden sm:inline hidden mr-1 relative ${
                          i == 1 ? "bottom-[1.75px]" : "bottom-[1.55px]"
                        }`}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>{" "}
                      {new Date(availableDate).toDateString().substring(0, 10)}
                      {", "}
                      {new Date(availableDate)
                        .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                        .substring(12, 17)}{" "}
                      (GST)
                      {new Date(selectedDate).getTime() ===
                      new Date(availableDate).getTime() ? (
                        <span class="text-sm relative bottom-[0.75px] ml-2 uppercase font-bold text-green-700">
                          (CONFIRMED)
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                );
              })}
              {props.startup.currentMentorship.duration > 1 ? (
                <p class="mx-auto block text-xs bg-gradient-to-br mt-5 from-green-500 to-green-600 text-white border-y-2 border-green-700 uppercase tracking-wide border-b-1.5 py-2 px-2 text-center font-bold border-dashed ">
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[18px] h-[18px] inline  relative bottom-[1.6px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>{" "}
                    You've already picked 2 meeting slots for week{" "}
                    {weekNum + moveIndex}.{" "}
                    {moveIndex + weekNum === 4
                      ? ""
                      : `Wish to do the same for week ${
                          weekNum + 1 + moveIndex
                        }?`}{" "}
                  </>
                </p>
              ) : (
                ""
              )}

              {!(moveIndex + weekNum === 4) &&
              props.startup.currentMentorship.duration > 1 ? (
                <button
                  onClick={moveForward}
                  class={`bg-blue-700 hover:bg-blue-600 text-sm ${
                    error ? "hidden" : "block"
                  } text-white rounded-md px-3 py-2 mt-6 uppercase  mx-auto cursor-pointer hover:shadow-md shadow-sm font-semibold`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-[18px] h-[18px] inline  relative mr-1.5 bottom-[1.7px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                    />
                  </svg>
                  YES!
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <p class="mx-auto block text-xs bg-gradient-to-br from-orange-400 to-orange-600 text-white border-b-2 border-blue-700 uppercase tracking-wide border-b-1.5 py-2 px-3 text-center font-bold border-dashed ">
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-[18px] h-[18px] inline  relative bottom-[1.4px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>{" "}
                  Pick 2 meeting slots. Your mentees will select one slot.
                </>
              </p>

              <div
                class={`w-full block shadow-md ${
                  error === "datesSame" || error === "date1Range"
                    ? "bg-orange-100 mt-7"
                    : "mt-7 mb-7 bg-gray-200"
                }  text-center py-3 justify-center mx-auto`}
              >
                <span class="font-semibold mr-2">1) </span>
                <DateTimePicker
                  maxDate={maxDate}
                  minDate={minDate}
                  maxDetail={"minute"}
                  onChange={setDate1}
                  value={date1}
                />
              </div>

              <div
                class={`w-full block shadow-md text-center mb-7 ${
                  error === "datesSame" || error === "date2Range"
                    ? "bg-orange-100"
                    : "bg-gray-200"
                }  py-3 justify-center mx-auto`}
              >
                <span class="font-semibold mr-2">2) </span>
                <DateTimePicker
                  maxDate={maxDate}
                  minDate={minDate}
                  maxDetail={"minute"}
                  onChange={setDate2}
                  value={date2}
                />
              </div>

              {moveIndex > 0 ? (
                <>
                  <div
                    class={`grid grid-cols-2 xl:gap-3 lg:gap-2 gap-3 w-fit mx-auto ${
                      error ? "hidden" : "block"
                    }`}
                  >
                    <button
                      onClick={moveBackward}
                      class={`bg-blue-700 hover:bg-blue-600 sm:text-sm text-xs   text-white rounded-md px-3 py-2 uppercase  cursor-pointer hover:shadow-md shadow-sm font-semibold`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-[18px] h-[18px] xl:inline lg:hidden sm:inline hidden relative mr-1.5 bottom-[1.8px]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                        />
                      </svg>
                      PREVIOUS WEEK
                    </button>

                    <button
                      onClick={subDates}
                      class={`bg-blue-700  hover:bg-blue-600 sm:text-sm text-xs  text-white rounded-md px-3 py-2 uppercase  cursor-pointer hover:shadow-md shadow-sm font-semibold`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-[18px] h-[18px] xl:inline lg:hidden sm:inline hidden relative mr-1.5 bottom-[1.8px]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      CONFIRM SLOTS
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={subDates}
                  class={`bg-blue-700 hover:bg-blue-600 text-sm ${
                    error ? "hidden" : "block"
                  } text-white rounded-md px-3 py-2 uppercase  mx-auto cursor-pointer hover:shadow-md shadow-sm font-semibold`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-[18px] h-[18px] inline  relative mr-1.5 bottom-[1.8px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  CONFIRM SLOTS
                </button>
              )}

              {error && error != "" ? (
                <p class="mx-auto block text-center mt-5 relative top-1 w-fit px-3 py-2 pb-[7px] bg-red-300 border-y-[2px] text-sm border-red-700 border-dashed text-black font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-[21px] h-[21px] inline  relative mr-[5px] bottom-[1.5px] "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>

                  {error === "datesSame"
                    ? "Timings/Days cannot be the same. Please select two different dates/slots."
                    : error === "date2Range"
                    ? "Timings must be between 2 PM and 8 PM; the second date slot is out of range"
                    : error === "date1Range"
                    ? "Timings must be between 2 PM and 8 PM; the first date slot is out of range"
                    : ""}
                </p>
              ) : (
                <></>
              )}
            </>
          )}
        </div>

        <div class="bg-white rounded-md lg:block md:hidden block col-span-1 h-[400px] border-blue-700 border shadow-md ">
          <p class="w-full text-xl tracking-wide bg-gray-200 border-b-1.5 py-3 text-center font-bold border-dashed border-gray-600">
            Timeline
          </p>

          <p class="text-red-500 relative top-[145px] text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[22px] h-[22px] inline mr-1.5 relative bottom-[1.5px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            Only 1 Meeting Included
          </p>

          {/* {checkPoints.length > 1 ? (
            <ol class="relative border-l border-blue-700 block -left-[19px] justify-center text-center mx-auto w-fit pt-[22px] pb-[0.1px]">
              {checkPoints
                .filter((c, i) => i != checkPoints.length - 1)
                .map((chkPoint, i) => {
                  return (
                    <li class="mb-[29px] ml-10 mx-auto">
                      <div class="absolute w-3 h-3 bg-blue-700 rounded-full mt-1.5 -left-1.5 border border-white "></div>
                      <time class="mb-1 text-sm font-bold leading-none text-blue-700 ">
                        {chkPoint} - {checkPoints[i + 1]}
                      </time>
                      <h3 class="text-lg font-semibold text-gray-900   ">
                        Week {i + 1}
                      </h3>
                    </li>
                  );
                })}
            </ol>
          ) : (
            ""
          )} */}
        </div>
      </div>

      <div class="bg-white rounded-md lg:hidden md:block hidden w-[50%] -mt-7 mb-16 mx-auto h-[400px] border-blue-700 border shadow-md ">
        <p class="w-full text-xl tracking-wide bg-gray-200 border-b-1.5 py-3 text-center font-bold border-dashed border-gray-600">
          Timeline
        </p>

        <p class="text-red-500 relative top-[145px] text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[22px] h-[22px] inline mr-1.5 relative bottom-[1.5px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          Only 1 Meeting Included
        </p>

        {/* {checkPoints.length > 1 ? (
          <ol class="relative border-l border-blue-700 block -left-[19px] justify-center text-center mx-auto w-fit pt-[22px] pb-[0.1px]">
            {checkPoints
              .filter((c, i) => i != checkPoints.length - 1)
              .map((chkPoint, i) => {
                return (
                  <li class="mb-[29px] ml-10 mx-auto">
                    <div class="absolute w-3 h-3 bg-blue-700 rounded-full mt-1.5 -left-1.5 border border-white "></div>
                    <time class="mb-1 text-sm font-bold leading-none text-blue-700 ">
                      {chkPoint} - {checkPoints[i + 1]}
                    </time>
                    <h3 class="text-lg font-semibold text-gray-900   ">
                      Week {i + 1}
                    </h3>
                  </li>
                );
              })}
          </ol>
        ) : (
          ""
        )} */}
      </div>
    </>
  );
};

export default Meetings;
