import { useContext, useEffect, useState } from "react";
import DateConfirm from "../../Modals/DateConfirm";
import MentorInstructions from "../../Modals/MentorInstructions";

import axios from "axios";
import projectContext from "../../../context/projectContext";

const Meetings = (props) => {
  const [checkPoints, setCheckPoints] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [showDatePick, setShowDatePick] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [upcomingMeeting, setUpcomingMeeting] = useState(null);
  const [datePicked, setDatePicked] = useState();
  const [weekNum, setWeekNum] = useState(1);

  const projCon = useContext(projectContext);

  const [timelineCompleted, setTimelineCompleted] = useState(false);

  useEffect(() => {
    let startingDate = new Date(props.mentor.matchedDate);
    let endingDate = new Date(props.mentor.endDate);

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
    let duration = props.mentor.duration;

    if (
      new Date() < checkPointsCopy2[0] ||
      (new Date() > checkPointsCopy2[0] && new Date() < checkPointsCopy2[1])
    ) {
      availableDatesCopy = props.mentor.timeline.week1.availableDates.filter(
        (date) => new Date(date) > new Date()
      );
      selectedDateCopy = props.mentor.timeline.week1.selectedDate;
      setWeekNum(1);
    }

    if (
      duration > 1 &&
      ((new Date() > checkPointsCopy2[1] && new Date() < checkPointsCopy2[2]) ||
        (props.mentor.timeline.week1.selectedDate &&
          new Date() > new Date(props.mentor.timeline.week1.selectedDate) &&
          new Date() < checkPointsCopy2[2]))
    ) {
      availableDatesCopy = props.mentor.timeline.week2.availableDates.filter(
        (date) => new Date(date) > new Date()
      );
      selectedDateCopy = props.mentor.timeline.week2.selectedDate;
      setWeekNum(2);
    }

    if (
      duration > 2 &&
      ((new Date() > checkPointsCopy2[2] && new Date() < checkPointsCopy2[3]) ||
        (props.mentor.timeline.week2.selectedDate &&
          new Date() > new Date(props.mentor.timeline.week2.selectedDate) &&
          new Date() < checkPointsCopy2[3]))
    ) {
      availableDatesCopy = props.mentor.timeline.week3.availableDates.filter(
        (date) => new Date(date) > new Date()
      );
      selectedDateCopy = props.mentor.timeline.week3.selectedDate;
      setWeekNum(3);
    }

    if (
      duration > 3 &&
      ((new Date() > checkPointsCopy2[3] && new Date() < checkPointsCopy2[4]) ||
        (props.mentor.timeline.week3.selectedDate &&
          new Date() > new Date(props.mentor.timeline.week3.selectedDate) &&
          new Date() < checkPointsCopy2[4]))
    ) {
      availableDatesCopy = props.mentor.timeline.week4.availableDates.filter(
        (date) => new Date(date) > new Date()
      );
      selectedDateCopy = props.mentor.timeline.week4.selectedDate;
      setWeekNum(4);
    }

    if (new Date() > checkPointsCopy2[4]) {
      setWeekNum(5);
    }

    if (
      (props.mentor.pastMeetings.length >= duration &&
        new Date(
          props.mentor.pastMeetings[props.mentor.pastMeetings.length - 1].date
        ) < new Date()) ||
      (new Date() > checkPointsCopy2[duration] && duration > 1)
    ) {
      setTimelineCompleted(true);
    }

    if (props.mentor.upcomingMeeting) {
      setUpcomingMeeting(props.mentor.upcomingMeeting);
    }

    setSelectedDate(selectedDateCopy);

    setAvailableDates(availableDatesCopy);
    setCheckPoints(checkPointsCopy);
  }, [props.mentor, projCon.project]);

  const acknowledgeMeetingCompletion = () => {
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/acknowledgeMeetingCompletion"
          : "http://localhost:4000/api/user/acknowledgeMeetingCompletion",
        {
          token: sessionStorage.getItem("token"),
          mentorId: props.mentor.mentorId,
        }
      )
      .then((res) => {
        projCon.setProject({ ...res.data, changeFlagged: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showDatePick ? (
        <DateConfirm
          datePicked={datePicked}
          mentor={props.mentor}
          close={() => setShowDatePick(false)}
          weekNum={weekNum}
        />
      ) : (
        ""
      )}

      {showInstructions ? (
        <MentorInstructions
          upcomingMeeting={upcomingMeeting}
          mentor={props.mentor}
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

          {weekNum === 5 ? (
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
                class="rounded-full w-[70px] h-[70px] mx-auto block mt-4"
                src={props.mentor.pic}
              ></img>
              <h1 class="mt-2.5 text-center font-bold text-lg">
                {props.mentor.name}
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
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      View Instructions
                    </button>
                  </>
                ) : (
                  <span class="sm:text-left text-center w-fit sm:bg-gray-200 p-2 px-3 shadow-sm sm:border-gray-400 rounded-md block mt-2 relative top-[3px] text-sm">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[18px] h-[18px] inline mr-1.5 relative bottom-[1.4px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    Mentor will provide instructions soon...
                  </span>
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
                Meeting {weekNum} of {props.mentor.duration}
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
            availableDates.map((availableDate, i) => {
              return (
                <div
                  class={`py-3.5 border-b-[1.5px] border-gray-400  ${
                    selectedDate
                      ? "bg-gray-200"
                      : `hover:border-dashed hover:border-${
                          i === 0 ? "b" : "y"
                        }-[2.5px] w-full sm: bg-indigo-100 hover:bg-yellow-100 hover:border-indigo-700`
                  } grid-cols-3 grid`}
                >
                  <span
                    class={`col-span-2 ${
                      String(new Date(selectedDate)) ===
                      String(new Date(availableDate))
                        ? "sm:px-0 px-[12px]"
                        : "sm:px-0 px-[10px]"
                    }  sm:left-0 left-[2px] text-center relative top-[4.5px] mb-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[22px] h-[22px] xl:inline lg:hidden inline mr-1 relative bottom-[1.45px]"
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
                  </span>
                  <span class="col-span-1">
                    <button
                      disabled={selectedDate != null}
                      onClick={() => {
                        setDatePicked(availableDate);
                        setShowDatePick(true);
                      }}
                      class={`${
                        String(new Date(selectedDate)) ===
                        String(new Date(availableDate))
                          ? "bg-green-100 px-2 text-green-600 right-2 relative text-xs border-green-600 border"
                          : selectedDate
                          ? "bg-gray-300 px-2.5 text-gray-500 text-xs"
                          : "bg-blue-700 px-2.5 hover:bg-blue-600 text-white text-sm hover:shadow-lg cursor-pointer"
                      }   py-2 block mx-auto rounded-md font-semibold  uppercase`}
                    >
                      {String(new Date(selectedDate)) !==
                      String(new Date(availableDate)) ? (
                        <></>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-[16px] h-[16px] sm:inline hidden mr-1 relative bottom-[1.3px]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      <span class="inline">
                        {String(new Date(selectedDate)) !==
                        String(new Date(availableDate))
                          ? "Select"
                          : "Selected"}
                      </span>
                    </button>
                  </span>
                </div>
              );
            })
          ) : (
            <p class="text-gray-500 relative top-[110px] text-center">
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
              No Dates Available
            </p>
          )}
        </div>
        <div class="bg-white rounded-md lg:block md:hidden block col-span-1 h-[400px] border-blue-700 border shadow-md">
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
