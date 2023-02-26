import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { MdOutlineMoneyOffCsred, MdCalendarToday } from "react-icons/md";
import userContext from "../../context/userContext";
import PulseLoader from "react-spinners/PulseLoader";

const product = {
  breadcrumbs: [
    { id: 1, name: "Industry Mentorship", href: "#" },
    { id: 2, name: "Browsing Courses", href: "#" },
  ],
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const WorkshopDetails = (props) => {
  const location = useLocation();

  const user = useContext(userContext).user;
  const myRef = useRef();

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, [showConfirm]);

  const [booked, setBooked] = useState(false);

  const bookingHandler = () => {
    const id = JSON.stringify(workshop._id);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/addWorkshopBooking"
          : "http://localhost:4000/api/user/addWorkshopBooking",
        {
          token: sessionStorage.getItem("token"),
          workshopId: id,
        }
      )
      .then((res) => {
        console.log(res.data);
        setBooked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [teamSize, setTeamSize] = useState();
  const [mentorshipPackage, setMentorshipPackage] = useState({});

  const [isMentor, setIsMentor] = useState(false);
  const [isFirstFree, setIsFirstFree] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workshop, setWorkshop] = useState(false);

  const [dateOptions, setDateOptions] = useState([]);
  const [bookedWorkshops, setBookedWorkshops] = useState();

  useEffect(async () => {
    setLoading(true);

    for (let x = 0; x < props.workshops.length; x++) {
      if (JSON.stringify(props.workshops[x]._id) === JSON.stringify(props.id)) {
        setWorkshop(props.workshops[x]);
      }
    }

    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getUser"
          : "http://localhost:4000/api/user/getUser",
        { token: sessionStorage.getItem("token") }
      )
      .then((res) => {
        setBookedWorkshops(res.data.workshopsOngoing);
        console.log(res.data.workshopsOngoing.includes(workshop._id));
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  }, [props.workshops]);

  const [showMail, setShowMail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const [showError, setShowError] = useState(false);

  const history = useHistory();

  const [selectedDates, setSelectedDates] = useState(["", "", "", ""]);

  const [flagAlert, setFlagAlert] = useState();

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

        <div
          ref={myRef}
          data-aos={"fade-up"}
          data-aos-once="true"
          id="groupModal"
          class={`bg-cover inline-block align-bottom bg-white rounded-lg ${
            showConfirm ? "bg-gradient-to-br from-indigo-50 to-indigo-200" : ""
          } text-left overflow-hidden shadow-xl transform transition-all sm:my-8 lg:pb-0 pb-7 lg:px-3 ${
            showConfirm ? "px-1" : "px-5"
          } sm:mt-5 sm:align-middle xl:w-10/12 md:w-11/12 w-[97%]`}
        >
          {
            <div className="pt-6  -mb-[90px] relative">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  {product.breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center">
                        <a
                          href={breadcrumb.href}
                          className="mr-2 text-sm font-medium text-gray-900"
                        >
                          {breadcrumb.name}
                        </a>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-4 h-5 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  ))}
                  <li className="text-sm">
                    <a
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      {workshop && workshop.title}
                    </a>
                  </li>
                </ol>
              </nav>

              {loading ? (
                <div
                  class={`relative mx-auto pt-[200px] pb-[340px] text-center block justify-center`}
                >
                  <PulseLoader
                    color={"#1a52c9"}
                    loading={loading}
                    size={30}
                    margin={7}
                  />
                </div>
              ) : !showConfirm ? (
                <>
                  {/* Image gallery */}

                  <div className="col-start-2  lg:w-[400px] sm:w-[330px] sm:h-[330px] w-[270px] h-[270px] lg:h-[400px] mt-14 sm:-mb-[72px] mb-0 object-center relative mx-auto block justify-center sm:rounded-lg sm:overflow-hidden">
                    <img
                      src={workshop && workshop.coverImage}
                      alt={workshop && workshop.coverImage}
                      className="lg:w-[360px] sm:w-[300px] sm:h-[300px] w-[240px] h-[240px] relative mx-auto block shadow-md object-center object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="max-w-2xl mx-auto -pt-2 pb-14 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                      {workshop.orgPic ? (
                        <div>
                          <span class="text-xs text-gray-800 absolute right-[87px] top-[88px] font-semibold">
                            POWERED BY
                          </span>
                          <img
                            src={workshop.orgPic}
                            alt="expert"
                            class={`w-[105px] mx-auto shadow-md p-2
                      rounded-[.25rem] ${
                        workshop.org == "Miscible" ? "bg-gray-800" : "bg-white"
                      }  h-auto absolute right-[75px] top-[108px]   object-center object-cover`}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-3xl">
                        {workshop && workshop.title}
                      </h1>
                      <h2
                        className={`text-lg mt-5 relative ${
                          workshop.mentors.length > 2 ? "top-1.5" : ""
                        } right-2 -mb-3 font-extrabold tracking-tight text-gray-600`}
                      >
                        {workshop.mentors.map((name, i) => {
                          return (
                            <>
                              <span class="inline">
                                {" "}
                                {i == 2 ? (
                                  <>
                                    <br class="block" />
                                    <div class="block mb-1" />
                                  </>
                                ) : i != 0 ? (
                                  "& "
                                ) : (
                                  ""
                                )}{" "}
                                <img
                                  src={workshop.pics[i]}
                                  class="w-7 h-7 ml-2 mb-1 inline rounded-full"
                                ></img>{" "}
                                <span class="ml-1">{name}</span>{" "}
                              </span>
                            </>
                          );
                        })}
                      </h2>
                    </div>

                    {/* Options */}
                    <div className="mt-7 lg:pl-4 lg:-left-2 relative lg:mt-0 lg:-top-2 lg:row-span-3">
                      <h1 class="font-bold text-2xl mb-4">Mentors:</h1>
                      <div
                        class={`grid grid-cols-2 top-1 relative  ${
                          workshop.mentors.length > 2 ? "mb-1" : "mb-5 pt-5"
                        }`}
                      >
                        {workshop.mentors.map((mentor, i) => {
                          return (
                            <div class="col-span-1 mb-5 mx-auto">
                              <img
                                src={workshop.pics[i]}
                                class="w-16 h-16 mx-auto rounded-full"
                              ></img>
                              <p class="mt-2 text-center font-semibold">
                                {mentor}
                              </p>
                              <p class="mt-1 text-xs text-gray-700 text-center">
                                {workshop.roles[i]}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <p
                        className={`md:text-3xl text-2xl ${
                          workshop.mentors.length > 2 ? "mt-1" : ""
                        } text-gray-900`}
                      >
                        <span class="font-bold">
                          {workshop && workshop.pricing[0]
                            ? `AED ${workshop && workshop.pricing[0]}`
                            : workshop && !workshop.pricing[0]
                            ? "Free of Cost"
                            : ""}
                        </span>{" "}
                        {workshop && workshop.pricing[0]
                          ? `per session`
                          : workshop && !workshop.pricing[0]
                          ? ""
                          : ""}
                      </p>
                      {workshop &&
                      workshop.pricing[1] !== 0 &&
                      workshop.pricing[0] !== 0 &&
                      isFirstFree ? (
                        <p className="md:text-xl text-md text-gray-600">
                          First{" "}
                          {workshop.pricing[1] !== 1 ? workshop.pricing[1] : ""}{" "}
                          session{workshop.pricing[1] > 1 ? "s" : ""}{" "}
                          <span class="font-semibold">free of cost</span>
                        </p>
                      ) : (
                        ""
                      )}

                      {/* Reviews
                      <div className="mt-6">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  reviews.average > rating
                                    ? "text-gray-900"
                                    : "text-gray-200",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {reviews.average} out of 5 stars
                          </p>
                          <a
                            href={reviews.href}
                            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            {reviews.totalCount} reviews
                          </a>
                        </div>
                      </div> */}

                      <form
                        className={`${
                          workshop.mentors.length > 2
                            ? "mt-4 mb-0"
                            : "mt-6 -mb-2"
                        } `}
                      >
                        {/* Colors */}
                        <div
                          class={`${
                            workshop.mentors.length > 2 ? "" : "mb-9 block "
                          }`}
                        >
                          <h3
                            className={`text-sm ${
                              workshop.mentors.length > 2 ? "" : "pt-3 block "
                            } text-gray-900 font-medium`}
                          >
                            Contact
                          </h3>

                          <RadioGroup className="mt-4">
                            <RadioGroup.Label className="sr-only">
                              Choose a color
                            </RadioGroup.Label>
                            <div className="flex items-center -mb-2 space-x-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => {
                                  if (showPhone && !showMail) {
                                    setShowPhone(false);
                                  }
                                  setShowMail(!showMail);
                                }}
                                class="h-7 w-7 text-indigo-500 hover:text-indigo-700 hover:h-9 hover:w-9 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => {
                                  if (showMail && !showPhone) {
                                    setShowMail(false);
                                  }
                                  setShowPhone(!showPhone);
                                }}
                                class="h-7 w-7 text-indigo-500 hover:text-indigo-700 hover:h-9 hover:w-9 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            </div>
                          </RadioGroup>
                        </div>

                        <div class="mt-6 text-gray-700 lg:-mb-4 mb-2 lg:text-base text-sm font-semibold lg:text-center">
                          {showMail && workshop
                            ? workshop.mentors.map((mentor, i) => {
                                return (
                                  <p class="text-xs">
                                    <span class="inline underline font-semibold">
                                      {mentor}:
                                    </span>
                                    <span class="ml-2 inline">
                                      {workshop.contact[i][0]
                                        ? workshop.contact[i][0]
                                        : "Unavailable"}
                                    </span>
                                  </p>
                                );
                              })
                            : ""}

                          {showPhone && workshop
                            ? workshop.mentors.map((mentor, i) => {
                                return (
                                  <p class="text-xs">
                                    <span class="inline underline font-semibold">
                                      {mentor}:
                                    </span>
                                    <span class="ml-2 inline">
                                      {workshop.contact[i][1]
                                        ? workshop.contact[i][1]
                                        : "Unavailable"}
                                    </span>
                                  </p>
                                );
                              })
                            : ""}
                        </div>

                        {/* Sizes */}
                        <div
                          class={`lg:block hidden ${
                            workshop.mentors.length > 2
                              ? ""
                              : " relative top-2 block "
                          }`}
                        >
                          {!loading &&
                          isFirstFree &&
                          workshop &&
                          workshop.availableDates.length !== 0 ? (
                            <p class="text-center top-4 mt-2 text-sm relative font-semibold">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-[15px] w-[15px] inline relative bottom-[0.75px] "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>{" "}
                              Try this mentor for free - exclusive 1st session.
                            </p>
                          ) : (
                            ""
                          )}
                          {booked ||
                          (bookedWorkshops &&
                            bookedWorkshops.includes(
                              JSON.stringify(workshop._id)
                            )) ? (
                            <button
                              onClick={() => {
                                setShowConfirm(true);
                              }}
                              className={`${
                                workshop.mentors.length > 2
                                  ? "sm:mt-11 mt-6"
                                  : "sm:mt-14 mt-6 "
                              } mb-3 w-full 
                                 bg-green-600 hover:bg-green-700 hover:cursor-pointer
                             border border-transparent rounded-md py-3 px-8 flex items-center justify-center sm:text-base text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-[22px] h-[22px] mr-2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Course Booked!
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setShowConfirm(true);
                              }}
                              className={`${
                                workshop.mentors.length > 2
                                  ? "sm:mt-11 mt-6"
                                  : "sm:mt-14 mt-6 "
                              } mb-3 w-full 
                                 bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer shadow-sm hover:shadow-md
                             border border-transparent rounded-md py-3 px-8 flex items-center justify-center sm:text-base text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 mr-2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                              </svg>
                              Book Course
                            </button>
                          )}

                          <button
                            onClick={() => {}}
                            className={`mt-2  w-full 
                                bg-blue-600 hover:bg-blue-700 hover:cursor-pointer
                           ${
                             showMail || showPhone ? "mb-6" : "mb-4"
                           } border border-transparent rounded-md shadow-sm hover:shadow-md py-3 px-8 flex items-center justify-center sm:text-base text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 mr-2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                              />
                            </svg>
                            Invite Teammates
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="pb-14 pt-2 lg:pt-6 lg:pb-16 lg:col-start-1 -mb-3 lg:col-span-2 lg:border-r  lg:border-gray-200 lg:pr-8">
                      {/* Description and details */}

                      <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6 mt-5 relative">
                          <p className="lg:text-base text-sm text-gray-900">
                            {workshop && workshop.mentorshipProp}
                          </p>
                        </div>
                      </div>

                      <div className="lg:mt-10 mt-8">
                        <h3 className="text-sm font-medium text-gray-900">
                          Mentor Strengths
                        </h3>

                        <div className="mt-4">
                          <ul
                            role="list"
                            className="pl-4 list-disc text-sm space-y-2"
                          >
                            {workshop &&
                              workshop.strengths.map((str) => (
                                <li key={str} className="text-gray-400">
                                  <span className="text-gray-600">{str}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-10">
                        <h2 className="text-sm font-medium text-gray-900">
                          Background Information and Interests
                        </h2>

                        <div className="mt-4 space-y-6">
                          <p className="text-sm text-gray-600">
                            {workshop && workshop.background}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="lg:hidden block md:px-16 px-6 mb-28">
                    <button
                      onClick={() => {}}
                      disabled={!isMentor}
                      className={`mt-12 mb-4 ${
                        !isMentor
                          ? "bg-indigo-400"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } w-full  border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      Seek Mentorship - Paid
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      setConfirmBooking(false);
                    }}
                    class="text-white uppercase text-sm bg-blue-700 hover:bg-blue-800 hover:shadow-md p-3 px-6 relative top-5 mt-5 mb-2 rounded-sm font-semibold block mx-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 inline bottom-[1px] -ml-[1px] font-bold relative mr-2 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                    Go Back
                  </button>

                  <div class="border-2 border-dashed shadow-sm  w-[95%] mt-14 px-2 mx-auto block border-indigo-400">
                    <div class="mt-8">
                      <h1 class="font-bold text-3xl text-center ">
                        What does this course offer?
                      </h1>
                      <h2 class="font-semibold text-xl text-center mt-2 text-gray-700">
                        {workshop.title}
                      </h2>

                      <section class="">
                        <div class="py-8 px-4 mx-auto max-w-screen-lg sm:py-16 lg:px-6">
                          <div class="space-y-8 md:grid text-center md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                            <div>
                              <div class="flex mx-auto justify-center items-center mb-4 w-10 h-10 rounded-full bg-white  lg:h-12 lg:w-12">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-5 h-5 text-blue-700 lg:w-6 lg:h-6 "
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                  />
                                </svg>
                              </div>
                              <h3 class="mb-2 text-xl font-bold ">
                                One-on-one Mentorship
                              </h3>
                              <p class="text-gray-500 ">
                                Mentors will meet you in "Open Discussion
                                Sessions", helping you plan your projects.
                              </p>
                            </div>

                            <div>
                              <div class="flex mx-auto justify-center items-center mb-4 w-10 h-10 rounded-full bg-white  lg:h-12 lg:w-12">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-5 h-5 text-blue-700 lg:w-6 lg:h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                                  />
                                </svg>
                              </div>
                              <h3 class="mb-2 text-xl font-bold ">Resources</h3>
                              <p class="text-gray-500">
                                Access exclusive recordings and documents for
                                each week's concepts (unavailable elsewhere).
                              </p>
                            </div>
                            <div>
                              <div class="flex mx-auto justify-center items-center mb-4 w-10 h-10 rounded-full bg-white lg:h-12 lg:w-12">
                                <svg
                                  class="w-5 h-5 text-blue-700 lg:w-6 lg:h-6 "
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                                </svg>
                              </div>
                              <h3 class="mb-2 text-xl font-bold ">
                                Assignments
                              </h3>
                              <p class="text-gray-500 ">
                                Mentors will personally check your submitted
                                assignments, and provide you with custom
                                feedback .
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>

                    <h1 class="font-bold text-3xl text-center  -mb-4">
                      Open Discussions Timeline - Book Now!
                    </h1>
                    <h2 class="font-semibold text-xl text-center mt-6 text-gray-700">
                      Limited seats - book now!
                    </h2>
                    <div
                      class={`relative mx-auto gap-3   mt-[60px] mb-[110px] top-6 ${"w-[90%] lg:px-0 md:px-20 px-12"}`}
                    >
                      <ol class="items-center w-full  sm:flex">
                        {workshop.timeline.map((date, i) => {
                          return (
                            <li class="relative mb-7 mt-1 sm:mb-0">
                              <div class="flex items-center">
                                <div class="flex  z-10 justify-center ml-1 items-center w-6 h-6 bg-white rounded-full ring-0 ring-white  sm:ring-8  shrink-0">
                                  <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-blue-700 "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </div>
                                <div class="hidden sm:flex w-full relative  bg-indigo-500 h-0.5 "></div>
                              </div>
                              <div class="mt-5 mr-3 right-2 relative sm:pr-8">
                                <h3 class="text-lg font-semibold text-gray-900 ">
                                  {String(new Date(date).toDateString())}
                                </h3>

                                <p class="text-base font-normal text-gray-500 ">
                                  {workshop.sessions[i]}
                                </p>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>

                    <hr class="border-t-[0.5px] border-gray-500 mb-9 w-[50%] block mx-auto mt-4 border-dotted relative bottom-4" />

                    {booked ||
                    bookedWorkshops.includes(JSON.stringify(workshop._id)) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-12 h-12 text-green-700 bg-white rounded-full  mx-auto text-center block mb-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10 text-blue-700  mx-auto text-center block mb-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                    )}

                    {booked ||
                    bookedWorkshops.includes(JSON.stringify(workshop._id)) ? (
                      <h2 class="font-bold text-center text-lg mb-[43px] mt-3">
                        THIS COURSE HAS BEEN BOOKED!
                      </h2>
                    ) : !confirmBooking ? (
                      <>
                        <button
                          onClick={() => {
                            setConfirmBooking(true);
                          }}
                          class="text-white uppercase text-sm bg-blue-700 hover:bg-blue-800 hover:shadow-md p-3 px-6 mb-[50px] rounded-sm font-semibold block mx-auto"
                        >
                          Book Course
                        </button>
                      </>
                    ) : (
                      <>
                        <h2 class="text-center">
                          Are you sure about this booking?{" "}
                          <span class="font-bold">"{workshop.title}"</span>
                        </h2>
                        <div class="block text-center items-center -mt-[2px]  relative mx-auto mb-[19px]">
                          <button
                            onClick={() => {
                              bookingHandler();
                            }}
                            class="text-white uppercase text-sm bg-green-600 hover:bg-green-700 hover:shadow-md p-3 px-4 mb-[25px] mt-7 rounded-sm font-semibold mr-2 inline"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 mr-2 relative bottom-[1px] inline text-white"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Confirm Booking
                          </button>

                          <button
                            onClick={() => {
                              setConfirmBooking(false);
                            }}
                            class="text-white uppercase text-sm bg-red-600 hover:bg-red-700 hover:shadow-md p-3 px-4 mb-[25px] mt-7 ml-2 rounded-sm font-semibold inline"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5 mr-2 relative bottom-[1px] inline text-white"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div class="border-2 border-dashed border-indigo-400 rounded-md shadow-sm mt-8 mb-32 mx-auto block px-2 w-[95%]">
                    <section class="pb-4">
                      <div class="py-8  px-4 mx-auto max-w-screen-lg sm:py-16 sm:pt-10 lg:px-6">
                        <div class="space-y-8 md:grid text-center md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
                          <div>
                            <div class="flex mx-auto justify-center items-center mb-4 w-11 h-11 rounded-full bg-white  lg:h-12 lg:w-12">
                              <MdOutlineMoneyOffCsred class="w-6 h-6 text-green-600 lg:w-6 lg:h-6 " />
                            </div>
                            <h3 class="mb-2 text-xl font-bold ">
                              Free of Cost
                            </h3>
                          </div>
                          <div>
                            <div class="flex mx-auto justify-center items-center mb-4 w-11 h-11 rounded-full bg-white lg:h-12 lg:w-12">
                              <MdCalendarToday class="w-6 h-6 text-green-600 lg:w-6 lg:h-6 " />
                            </div>
                            <h3 class="mb-2 text-xl font-bold ">
                              Duration: 4 Weeks
                            </h3>
                          </div>
                        </div>
                      </div>

                      {booked ||
                      bookedWorkshops.includes(JSON.stringify(workshop._id)) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-12 h-12 text-green-700 bg-white rounded-full -mt-6 mx-auto text-center block mb-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-10 h-10 text-blue-700 -mt-6 mx-auto text-center block mb-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                      )}

                      {booked ||
                      bookedWorkshops.includes(JSON.stringify(workshop._id)) ? (
                        <h2 class="font-bold mb-[30px] text-lg text-center mt-3">
                          THIS COURSE HAS BEEN BOOKED!
                        </h2>
                      ) : !confirmBooking ? (
                        <>
                          <button
                            onClick={() => {
                              setConfirmBooking(true);
                            }}
                            class="text-white uppercase text-sm bg-blue-700 hover:bg-blue-800 hover:shadow-md p-3 px-6 mb-[25px] rounded-sm font-semibold block mx-auto"
                          >
                            Book Course
                          </button>
                        </>
                      ) : (
                        <>
                          <h2 class="text-center">
                            Are you sure about this booking?{" "}
                            <span class="font-bold">"{workshop.title}"</span>
                          </h2>
                          <div class="block text-center items-center  relative mx-auto ">
                            <button
                              onClick={() => {
                                bookingHandler();
                              }}
                              class="text-white uppercase text-sm bg-green-600 hover:bg-green-700 hover:shadow-md p-3 px-4 mb-[25px] mt-7 rounded-sm font-semibold mr-2 inline"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 mr-2 relative bottom-[1px] inline text-white"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Confirm Booking
                            </button>

                            <button
                              onClick={() => {
                                setConfirmBooking(false);
                              }}
                              class="text-white uppercase text-sm bg-red-600 hover:bg-red-700 hover:shadow-md p-3 px-4 mb-[25px] mt-7 ml-2 rounded-sm font-semibold inline"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 mr-2 relative bottom-[1px] inline text-white"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Cancel
                            </button>
                          </div>
                        </>
                      )}
                    </section>
                  </div>
                </>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetails;