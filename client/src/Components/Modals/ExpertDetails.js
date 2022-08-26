import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import userContext from "../../context/userContext";
import PulseLoader from "react-spinners/PulseLoader";

const product = {
  breadcrumbs: [
    { id: 1, name: "Industry Mentorship", href: "#" },
    { id: 2, name: "Browsing Experts", href: "#" },
  ],

  sizes: [
    { name: 1, inStock: true },
    { name: 2, inStock: true },
    { name: 3, inStock: true },
    { name: 4, inStock: true },
  ],
  description:
    "Hey there! I hope to be able to make the entire patenting process easier for you and your project team. Sign Up for one-to-one mentorship! Id love to help out a few students via IdeaStack. Ill progress from basic patenting info to the resources you may need to undertake the patenting process. Ill also connect you to the appropriate connections to execute your projects patenting",
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ExpertDetails = (props) => {
  const location = useLocation();

  const user = useContext(userContext).user;
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

  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [numberOfSessions, setNumberOfSessions] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();

    if (numberOfSessions === 0 || numberOfSessions === null) {
      setShowError(true);
      setShowConfirm(false);
    } else {
      setShowError(false);
      finalizeMentorshipPackage();
      setShowConfirm(true);
    }
  };

  const [packageyum, setPackageyum] = useState(false);

  const [expert, setExpert] = useState();
  const [teamSize, setTeamSize] = useState();
  const [mentorshipPackage, setMentorshipPackage] = useState({});

  const [isMentor, setIsMentor] = useState(false);
  const [isFirstFree, setIsFirstFree] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dateOptions, setDateOptions] = useState([]);
  useEffect(async () => {
    setLoading(true);
    await axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/getTeamContacts"
          : "http://localhost:4000/api/project/getTeamContacts",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
        }
      )
      .then((res) => {
        setTeamSize(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/getTeam"
          : "http://localhost:4000/api/project/getTeam",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
        }
      )
      .then(async (res) => {
        if (JSON.stringify(user._id) === JSON.stringify(res.data[0].id)) {
          setIsMentor(true);
        }
        let expDummy;

        for (let i = 0; i < props.experts.length; i++) {
          if (props.experts.id === props.id) {
            let avDates = [];
            for (let z = 0; z < props.experts[i].availableDates.length; z++) {
              let available = true;
              await axios
                .post(
                  process.env.NODE_ENV === "production"
                    ? "https://ideastack.herokuapp.com/api/project/checkAvailability"
                    : "http://localhost:4000/api/project/checkAvailability",
                  {
                    token: sessionStorage.getItem("token"),
                    projectID: sessionStorage.getItem("managing"),
                    consultant: props.experts[i],
                    date: props.experts[i].availableDates[z],
                  }
                )
                .then((res) => {
                  available = res.data;
                });

              if (
                available &&
                new Date(props.experts[i].availableDates[z]) >= new Date()
              ) {
                avDates.push(props.experts[i].availableDates[z]);
              }
            }

            expDummy = {
              ...props.experts[i],
              availableDates: avDates,
            };
            setExpert(expDummy);
            setMentorshipPackage({
              ...expDummy,
              teamSize: teamSize,
              individualCostPerSession: props.experts[i].pricing[0] / teamSize,
              numberOfSessions: numberOfSessions,
            });
            await axios
              .post(
                process.env.NODE_ENV === "production"
                  ? "https://ideastack.herokuapp.com/api/project/getMentorshipPackages"
                  : "http://localhost:4000/api/project/getMentorshipPackages",
                {
                  token: sessionStorage.getItem("token"),
                  projectID: sessionStorage.getItem("managing"),
                }
              )
              .then((res) => {
                for (let k = 0; k < res.data.length; k++) {
                  if (
                    JSON.stringify(res.data[k]._id) ===
                    JSON.stringify(props.experts[i]._id)
                  ) {
                    setPackageyum(true);
                    console.log("shud be here");
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }

        await axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/project/getFirstFree"
              : "http://localhost:4000/api/project/getFirstFree",
            {
              token: sessionStorage.getItem("token"),
              projectID: sessionStorage.getItem("managing"),
              expertName: expDummy.name,
            }
          )
          .then((res) => {
            setIsFirstFree(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [props.experts]);

  const [showMail, setShowMail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const [showError, setShowError] = useState(false);

  const finalizeMentorshipPackage = async () => {
    let mentorshipPackageTemp = {
      ...mentorshipPackage,
      numberOfSessions: numberOfSessions,
      individualTotalCost: (expert.pricing[0] / teamSize) * numberOfSessions,
      individualCostPerSession: expert.pricing[0] / teamSize,
      paymentPending: true,
    };
    setMentorshipPackage(mentorshipPackageTemp);
    setDateOptions(
      await expert.availableDates.map((elem, i) => {
        console.log(i);
        return (
          <div
            key={i}
            onClick={() => {
              if (selectedDates.includes(elem)) {
                deSelectDate(i);
              } else {
                selectDate(elem, i);
              }
            }}
            class={`w-full py-4 px-3 border-y-2 rounded-md border-blue-700 hover:border-indigo-500 cursor-pointer hover:shadow-lg hover:bg-gray-200 shadow-md active:shadow-none ${
              selectedDates.includes(elem)
                ? "border-green-600 hover:border-green-700 bg-white"
                : "bg-yellow-50"
            } font-semibold text-center`}
          >
            {new Date(elem).toDateString() +
              " - " +
              new Date(elem).toString().substring(16, 21)}
          </div>
        );
      })
    );
  };

  const history = useHistory();

  const addMentorshipPackage = () => {
    if (selectedDates.filter((elem) => elem !== "").length < numberOfSessions) {
      setFlagAlert(true);
      let element = document.getElementById("groupModal");
      element.scrollIntoView(true, {
        behavior: "smooth",
      });
      setTimeout(() => {
        setFlagAlert(false);
      }, 14000);
    } else {
      let mentorshipPackageDummy = {
        ...mentorshipPackage,
        selectedDates: selectedDates.filter((elem) => elem !== ""),
      };
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/project/addMentorshipPackage"
            : "http://localhost:4000/api/project/addMentorshipPackage",
          {
            token: sessionStorage.getItem("token"),
            projectID: sessionStorage.getItem("managing"),
            mentorshipPackage: mentorshipPackageDummy,
            isFirstFree,
          }
        )
        .then((res) => {
          history.push("/myprojects/manageproject/mentorship");
          props.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, [mentorshipPackage, showConfirm]);

  const [selectedDates, setSelectedDates] = useState(["", "", "", ""]);

  const selectDate = (date, index) => {
    let selectedDatesDummy = selectedDates;
    console.log(numberOfSessions);
    if (
      selectedDatesDummy.filter((elem) => elem !== "").length < numberOfSessions
    ) {
      selectedDatesDummy[index] = date;
      setSelectedDates(selectedDatesDummy);
      setDateOptions(
        expert.availableDates
          .filter(async (date) => {
            let available = true;

            await axios
              .post(
                process.env.NODE_ENV === "production"
                  ? "https://ideastack.herokuapp.com/api/project/checkAvailability"
                  : "http://localhost:4000/api/project/checkAvailability",
                {
                  token: sessionStorage.getItem("token"),
                  projectID: sessionStorage.getItem("managing"),
                  consultant: expert,
                  date: date,
                }
              )
              .then((res) => {
                available = res.data;
              });
            return available;
          })
          .map((elem, i) => {
            console.log(selectedDates.includes(expert.availableDates[i]));
            return (
              <div
                key={i}
                onClick={() => {
                  console.log(selectedDatesDummy);
                  if (selectedDatesDummy.includes(elem)) {
                    deSelectDate(i);
                  } else {
                    selectDate(elem, i);
                  }
                }}
                class={`w-full py-4 px-3 border-y-2 rounded-md border-blue-700 hover:border-indigo-500 cursor-pointer hover:shadow-lg hover:bg-gray-200 shadow-md active:shadow-none ${
                  selectedDatesDummy.includes(elem)
                    ? "border-green-600 hover:border-green-700 bg-white"
                    : "bg-yellow-50"
                } font-semibold text-center`}
              >
                {new Date(elem).toDateString() +
                  " - " +
                  new Date(elem).toString().substring(16, 21)}
              </div>
            );
          })
      );
    } else {
      setFlagAlert(true);
      setTimeout(() => {
        setFlagAlert(false);
      }, 8000);
    }
  };

  const deSelectDate = (index) => {
    let selectedDatesDummy = selectedDates;
    selectedDatesDummy[index] = "";
    setSelectedDates(selectedDatesDummy);
    setDateOptions(
      expert.availableDates
        .filter(async (date) => {
          let available = true;

          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/project/checkAvailability"
                : "http://localhost:4000/api/project/checkAvailability",
              {
                token: sessionStorage.getItem("token"),
                projectID: sessionStorage.getItem("managing"),
                consultant: expert,
                date: date,
              }
            )
            .then((res) => {
              available = res.data;
            });
          return available;
        })
        .map((elem, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                console.log(selectedDatesDummy);
                if (selectedDatesDummy.includes(elem)) {
                  deSelectDate(i);
                } else {
                  selectDate(elem, i);
                }
              }}
              class={`w-full py-4 px-3 border-y-2 rounded-md border-blue-700 hover:border-indigo-500 cursor-pointer hover:shadow-lg hover:bg-gray-200 shadow-md active:shadow-none ${
                selectedDatesDummy.includes(elem)
                  ? "border-green-600 hover:border-green-700 bg-white"
                  : "bg-yellow-50"
              } font-semibold text-center`}
            >
              {new Date(elem).toDateString() +
                " - " +
                new Date(elem).toString().substring(16, 21)}
            </div>
          );
        })
    );
  };

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
            <div className="pt-6  -mb-[80px] relative">
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
                      {expert && expert.name}
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

                  <div className="col-start-2  lg:w-[360px] sm:w-[300px] sm:h-[300px] w-[240px] h-[240px] lg:h-[360px] mt-14 sm:-mb-4 mb-0 object-center relative mx-auto block justify-center sm:rounded-lg sm:overflow-hidden">
                    <img
                      src={expert && expert.pic}
                      alt={expert && expert.pic}
                      className="lg:w-[360px] sm:w-[300px] sm:h-[300px] w-[240px] h-[240px] relative mx-auto block shadow-md object-center object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="max-w-2xl mx-auto pt-14 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-3xl">
                        {expert && expert.name}
                      </h1>
                      <h2 className="text-xl font-extrabold tracking-tight text-gray-600">
                        {expert && expert.role}
                      </h2>
                    </div>

                    {/* Options */}
                    <div className="mt-10 lg:pl-4 lg:-left-2 relative lg:mt-0 lg:-top-2 lg:row-span-3">
                      <h2 className="sr-only">Product information</h2>
                      <p className="md:text-3xl text-2xl text-gray-900">
                        <span class="font-bold">
                          {expert && expert.pricing[0]
                            ? `AED ${expert && expert.pricing[0]}`
                            : expert && !expert.pricing[0]
                            ? "No Cost"
                            : ""}
                        </span>{" "}
                        per session
                      </p>
                      {expert &&
                      expert.pricing[1] !== 0 &&
                      expert.pricing[0] !== 0 &&
                      isFirstFree ? (
                        <p className="md:text-xl text-md text-gray-600">
                          First{" "}
                          {expert.pricing[1] !== 1 ? expert.pricing[1] : ""}{" "}
                          session{expert.pricing[1] > 1 ? "s" : ""}{" "}
                          <span class="font-semibold">free of cost</span>
                        </p>
                      ) : (
                        ""
                      )}

                      {/* Reviews */}
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
                      </div>

                      <form className="mt-12">
                        {/* Colors */}
                        <div>
                          <h3 className="text-sm text-gray-900 font-medium">
                            Contact
                          </h3>

                          <RadioGroup className="mt-4">
                            <RadioGroup.Label className="sr-only">
                              Choose a color
                            </RadioGroup.Label>
                            <div className="flex items-center space-x-3">
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

                        <div class="mt-6 text-gray-700 lg:mb-0 mb-4 lg:text-base text-sm font-semibold lg:text-center">
                          {showMail && expert
                            ? expert.contact[0] === "" ||
                              expert.contact[0] === null
                              ? "Email ID: Unavailable"
                              : "Email ID: " + expert.contact[0]
                            : ""}

                          {showPhone && expert
                            ? expert.contact[1] === "" ||
                              expert.contact[1] === null
                              ? "Phone Number: Unavailable"
                              : "Phone Number: " + expert.contact[1]
                            : ""}
                        </div>

                        {/* Sizes */}
                        <div class="lg:block hidden">
                          <div className="mt-9">
                            <div className="flex items-center justify-between">
                              <h3
                                className={` ${
                                  showError
                                    ? "text-red-600 font-semibold text-md"
                                    : "text-gray-900 text-sm font-medium"
                                } `}
                              >
                                Select no. of sessions
                              </h3>
                              <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Info
                              </a>
                            </div>

                            <RadioGroup
                              value={numberOfSessions}
                              required
                              onChange={(e) => {
                                setNumberOfSessions(e);
                              }}
                              className="mt-4"
                            >
                              <RadioGroup.Label className="sr-only">
                                Choose a size
                              </RadioGroup.Label>
                              <div className="grid gap-4 mt-6 relative grid-cols-4">
                                {product.sizes.map((size, i) => {
                                  console.log(isFirstFree, i);
                                  let seshNum = Number(size.name);
                                  return (
                                    <RadioGroup.Option
                                      onClick={() => {
                                        setNumberOfSessions(size.name);
                                      }}
                                      disabled={isFirstFree && i !== 0}
                                      key={seshNum}
                                      value={seshNum}
                                      className={({ active }) =>
                                        classNames(
                                          (isFirstFree && i !== 0) ||
                                            (expert &&
                                              expert.availableDates.length <= i)
                                            ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                                            : size.inStock
                                            ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                            : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                          active
                                            ? "ring-2 ring-indigo-500"
                                            : "",
                                          "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="p">
                                            {seshNum}
                                          </RadioGroup.Label>
                                          {size.inStock ? (
                                            <div
                                              className={classNames(
                                                active ? "border" : "border-2",
                                                checked
                                                  ? "border-indigo-500"
                                                  : "border-transparent",
                                                "absolute -inset-px rounded-md pointer-events-none"
                                              )}
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <div
                                              aria-hidden="true"
                                              className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                            >
                                              <svg
                                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                              >
                                                <line
                                                  x1={0}
                                                  y1={100}
                                                  x2={100}
                                                  y2={0}
                                                  vectorEffect="non-scaling-stroke"
                                                />
                                              </svg>
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  );
                                })}
                              </div>
                            </RadioGroup>
                          </div>

                          {showError ? (
                            <p class="text-center -mb-8 mt-8 font-semibold text-red-600 text-md">
                              Please select no. of sessions..
                            </p>
                          ) : (
                            ""
                          )}

                          {!loading && isFirstFree ? (
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

                          {!isMentor ? (
                            <p class="uppercase text-sm font-semibold text-center top-8 -mb-1 right-0.5 relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                              <span class="inline ml-1.5">
                                ADMIN ONLY FEATURE
                              </span>
                            </p>
                          ) : packageyum ? (
                            <p class="uppercase text-sm font-semibold text-center top-8 -mb-1 right-0.5 relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                              <span class="inline ml-1.5">
                                Mentor Already Selected
                              </span>
                            </p>
                          ) : expert.availableDates.length < 4 ? (
                            <p class="uppercase text-sm font-semibold text-center top-7 -mb-1 right-0.5 relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                              <span class="inline ml-1.5">
                                {expert.availableDates.length === 0
                                  ? "No"
                                  : `Only ${expert.availableDates.length}`}{" "}
                                Available Dates Remaining
                              </span>
                            </p>
                          ) : (
                            <p class="relative -mb-2"></p>
                          )}
                          <button
                            onClick={submitHandler}
                            disabled={!isMentor || packageyum}
                            className={`sm:mt-12 mt-6 mb-4 w-full ${
                              !isMentor || packageyum
                                ? "bg-indigo-400"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            } border border-transparent rounded-md py-3 px-8 flex items-center justify-center sm:text-base text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            Seek Mentorship {isFirstFree ? "- Free Trial" : ""}
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="pb-14 pt-2 lg:pt-6 lg:pb-16 lg:col-start-1 -mb-3 lg:col-span-2 lg:border-r  lg:border-gray-200 lg:pr-8">
                      {/* Description and details */}
                      <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6 mt-3 relative">
                          <p className="lg:text-base text-sm text-gray-900">
                            {expert && expert.mentorshipProp}
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
                            {expert &&
                              expert.strengths.map((str) => (
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
                            {expert && expert.background}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="lg:hidden block md:px-16 px-6 mb-28">
                    <div className="-mt-16  relative">
                      <div className="flex items-center justify-between">
                        <h3
                          className={` ${
                            showError
                              ? "text-red-600 font-semibold text-md"
                              : "text-gray-900 text-sm font-medium"
                          } `}
                        >
                          Select no. of sessions
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Info
                        </a>
                      </div>

                      <RadioGroup
                        value={numberOfSessions}
                        required
                        onChange={(e) => {
                          setNumberOfSessions(e);
                        }}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a size
                        </RadioGroup.Label>
                        <div className="grid sm:gap-4 gap-2 mt-6 relative grid-cols-4">
                          {product.sizes.map((size, i) => {
                            let seshNum = Number(size.name);
                            return (
                              <RadioGroup.Option
                                onClick={() => {
                                  setNumberOfSessions(size.name);
                                }}
                                key={seshNum}
                                value={seshNum}
                                className={({ active }) =>
                                  classNames(
                                    size.inStock ||
                                      (expert &&
                                        expert.availableDates.length > i)
                                      ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                      : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                    active ? "ring-2 ring-indigo-500" : "",
                                    "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="p">
                                      {seshNum}
                                    </RadioGroup.Label>
                                    {size.inStock ? (
                                      <div
                                        className={classNames(
                                          active ? "border" : "border-2",
                                          checked
                                            ? "border-indigo-500"
                                            : "border-transparent",
                                          "absolute -inset-px rounded-md pointer-events-none"
                                        )}
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <div
                                        aria-hidden="true"
                                        className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                      >
                                        <svg
                                          className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                          viewBox="0 0 100 100"
                                          preserveAspectRatio="none"
                                          stroke="currentColor"
                                        >
                                          <line
                                            x1={0}
                                            y1={100}
                                            x2={100}
                                            y2={0}
                                            vectorEffect="non-scaling-stroke"
                                          />
                                        </svg>
                                      </div>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            );
                          })}
                        </div>
                      </RadioGroup>
                    </div>

                    {showError ? (
                      <p class="text-center -mb-8 mt-8 font-semibold text-red-600 text-md">
                        Please select no. of sessions..
                      </p>
                    ) : (
                      ""
                    )}

                    <button
                      onClick={submitHandler}
                      disabled={!isMentor || packageyum}
                      className={`mt-12 mb-4 ${
                        !isMentor || packageyum
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
                  <h1 class="font-bold text-3xl text-center mt-10">
                    Available Dates - Book Now!
                  </h1>
                  <div
                    class={`relative mx-auto gap-3 grid grid-cols-4 mt-2 mb-2 top-6 ${"w-[88%] lg:px-0 md:px-20 px-12"}`}
                  >
                    {dateOptions}
                  </div>
                  <h2
                    class={`font-bold underline text-xl relative top-8 mt-10 block mb-3 text-center ${
                      flagAlert ? "text-red-700" : "text-blue-700"
                    } `}
                  >
                    No. of Dates Selected:{" "}
                    {selectedDates.filter((elem) => elem !== "").length +
                      "/" +
                      numberOfSessions}
                  </h2>
                  {selectedDates
                    .filter((elem) => elem !== "")
                    .map((elem) => {
                      return (
                        <h2 class="text-base font-semibold text-center block relative top-7">
                          {"->"} {new Date(elem).toDateString()}
                        </h2>
                      );
                    })}

                  <div class="grid grid-cols-2 xl:right-[5%] lg:right-[7%] my-40 mt-[110px] mb-32 lg:px-0 md:px-20 px-12 relative">
                    <div class="xl:w-11/12 sm:w-full w-[105%]  lg:-mb-0 sm:-mb-5 -mb-14  lg:left-[25%] lg:col-span-1 col-span-2 -top-5 relative block mx-auto   lg:px-2">
                      <div class="pb-6 p-10 md:pb-7  md:p-12 rounded-sm shadow-lg bg-blue-700">
                        <h2 class="sm:mb-3 mb-1.5 md:text-left text-center relative bottom-3 lg:text-4xl sm:text-3xl text-2xl lg:hidden block font-bold font-heading text-white">
                          Mentor: {expert && expert.name}{" "}
                        </h2>
                        <h2 class="mb-7 relative bottom-3 md:text-left text-center lg:text-4xl sm:text-xl text-lg lg:hidden block font-bold font-heading text-gray-200">
                          {expert && expert.role}{" "}
                        </h2>

                        <h2 class="lg:mb-8 sm:mb-10 mb-9 underline relative bottom-3 lg:text-4xl md:text-3xl md:text-left text-center sm:text-2xl text-xl font-bold font-heading text-white">
                          Total Required Payment By Team
                        </h2>
                        {isFirstFree ? (
                          <h1 class="mb-5 -mt-2 uppercase relative text-xl text-center font-semibold text-white">
                            First Session Free!
                          </h1>
                        ) : (
                          ""
                        )}
                        <div class="flex mb-8 items-center justify-between pb-5 border-b border-blue-100">
                          <span class="text-blue-50 text-md">
                            No. of Sessions
                          </span>
                          <span class="text-xl font-bold font-heading text-white">
                            {numberOfSessions}
                          </span>
                        </div>
                        <h4 class="sm:mb-2 mb-4 text-xl relative bottom-2 font-bold sm:mt-0 mt-2 font-heading text-white">
                          Pricing
                        </h4>
                        <div class="sm:flex mb-2 sm:justify-between items-center">
                          <span class="text-blue-50 text-md sm:mb-0 mb-2 sm:no-underline underline relative">
                            Individual Payment Per Session
                          </span>
                          <br class="sm:hidden block" />
                          <span class="text-lg font-bold font-heading  text-white">
                            AED{" "}
                            {isFirstFree
                              ? 0
                              : expert.pricing[0] &&
                                expert.pricing[0] / parseFloat(teamSize)}
                          </span>
                        </div>
                        <div class="sm:flex sm:mb-10 mb-7 sm:justify-between  items-center">
                          <span class="text-blue-50 text-md sm:no-underline underline">
                            Total Individual Payment
                          </span>
                          <br class="sm:hidden block" />
                          <span class="text-lg font-bold block font-heading text-white">
                            AED{" "}
                            {numberOfSessions &&
                              ((isFirstFree
                                ? numberOfSessions - 1
                                : numberOfSessions) *
                                expert.pricing[0]) /
                                parseFloat(teamSize)}
                          </span>
                        </div>
                        <div class="sm:flex mb-10 sm:justify-between items-center">
                          <span class="text-xl font-bold font-heading text-white">
                            Subtotal Cost
                          </span>
                          <br class="sm:hidden block" />
                          <span class="text-xl font-bold font-heading text-white">
                            AED{" "}
                            {expert.pricing[0] &&
                              expert.pricing[0] *
                                (isFirstFree
                                  ? numberOfSessions - 1
                                  : numberOfSessions)}
                          </span>
                        </div>
                        <div class="grid-cols-3 grid sm:w-[340px] w-full sm:mx-0 mx-auto  gap-3 lg:mt-10 mt-12 mb-4">
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="block w-full sm:py-4 py-2.5 bg-slate-300 hover:bg-slate-400 sm:col-span-1 col-span-3 border border-transparent rounded-md px-4 items-center justify-center text-base  font-bold text-gray-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => addMentorshipPackage()}
                            className="block w-full sm:py-4 py-2.5 bg-slate-300 hover:bg-slate-400 sm:col-span-2 col-span-3 border border-transparent rounded-md  px-3  items-center justify-center text-base font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Confirm & Continue
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="max-w-xs bg-cover mb-8 mt-12 xl:left-[10%] lg:left-[15%] relative h-[413px] lg:block hidden mx-auto  bg-white rounded-lg -bottom-4 shadow-lg dark:bg-gray-800">
                      <img
                        class="object-cover  h-[320px]  w-full"
                        src={expert && expert.pic}
                        alt="avatar"
                      />
                      <div class="top-[17px] transform relative  text-center">
                        <a
                          href="#"
                          class="block text-2xl font-bold text-gray-800 dark:text-white"
                        >
                          {expert && expert.name}
                        </a>
                        <span class="text-sm text-gray-700 dark:text-gray-200">
                          {expert && expert.role}
                        </span>
                      </div>
                    </div>
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

export default ExpertDetails;
