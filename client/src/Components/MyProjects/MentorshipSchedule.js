import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const MentorshipSchedule = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [numSesh, setNumSesh] = useState(0);
  const [consultant, setConsultant] = useState({});
  const [consultantSelected, setConsultantSelected] = useState(false);
  let num = 4;
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
      num = props.mentorshipPackages[0].numberOfSessions;
    }

    console.log(props.mentorshipPackages[0]);
    setLoading(false);
  }, [props.mentorshipPackages]);

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://media.npr.org/assets/img/2019/10/25/mentorship-ask2_web-site-copy-2_slide-6ad6e1e9ed44aec13bd2e825e9f6c52c4ffb7cc4.png)",
        }}
        class={`rounded-md  mb-8 bg-cover relative shadow-lg bg-gradient-to-r ${
          num === 4 ? "md:h-[380px] h-[460px]" : "sm:h-[380px] h-[460px]"
        } border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}
      >
        <div
          data-aos={"zoom-in"}
          data-aos-once="true"
          data-aos-delay="150"
          class="bg-gray-800 h-full w-full z-10 justify-center justify-items-center   items-center bg-opacity-60"
        >
          <h1
            class={`sm:text-3xl text-2xl underline ${
              num === 4 ? "md:top-4 top-5" : "sm:top-4 top-5"
            }  text-center font-bold relative  text-white`}
          >
            Mentorship Schedule
          </h1>
          <h1
            class={`text-xl  ${
              num === 4
                ? "md:top-[29px] top-[41px]"
                : "sm:top-[29px] top-[41px]"
            } text-center font-semibold relative top-[28px] text-white`}
          >
            Mentor: {consultant.name}
          </h1>
          <h1
            class={`text-xl ${
              num === 4
                ? "md:top-[26px] top-[36px]"
                : "sm:top-[26px] top-[36px]"
            }  text-center font-semibold relative  text-white`}
          >
            {consultant.role}
          </h1>

          <ol
            id="scrollbar"
            class={`items-center bg-gradient-to-b w-fit  mx-auto  absolute bottom-0 left-[50%] translate-x-[-50%] from-gray-400 to-gray-500  ${
              num === 2
                ? "p-1.5 pt-2 px-8 sm:flex lg:pr-0.5 pr-[2px]  sm:h-fit h-[300px] overflow-y-scroll"
                : num === 1
                ? "p-1.5 pt-2 px-9 sm:flex lg:pr-[67px] pr-[68px]  sm:h-fit h-[300px] overflow-y-scroll"
                : num === 3
                ? "p-1.5 pt-2 pl-8 sm:flex pr-0  sm:h-fit h-[300px] overflow-y-scroll"
                : "p-1.5 pt-2 sm:pl-[26px] md:pl-[22px] pl-[32px] md:h-fit h-[300px] overflow-y-scroll md:flex pr-[22px]"
            } rounded-t-md border-t-2 border-x-2 border-blue-300 `}
          >
            {props.mentorshipPackages[0] &&
              props.mentorshipPackages[0].sessionLinks &&
              props.mentorshipPackages[0].sessionLinks.map((link, i) => {
                return i === 0 ? (
                  <>
                    <li
                      class={`relative text-center p-4 ${
                        num === 4
                          ? "md:pr-0 px-4 md:mb-0 mb-5 md:mt-0 mt-0"
                          : "px-4 sm:mb-0 mb-6"
                      } `}
                    >
                      <div class="flex items-center">
                        <div
                          class={` ring-0 ring-white  sm:ring-8 flex z-10 relative mb-2 mx-auto ${
                            num === 1
                              ? "md:-right-[4.4%] sm:-right-[7.8%] -right-[9.3%]"
                              : num === 4
                              ? "md:right-[2%] sm:right-[0%] right-[2%] ring-0 ring-white  md:ring-8"
                              : "sm:right-[7%] right-[5.5%]"
                          } justify-center items-center w-6 h-6 bg-blue-200 rounded-full  shrink-0`}
                        >
                          <svg
                            aria-hidden="true"
                            class="w-3 h-3 text-blue-600 "
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
                        <div
                          class={`hidden ${
                            num === 4 ? "md:flex" : "sm:flex"
                          } w-full absolute bg-gray-200 h-0.5 `}
                        ></div>
                      </div>
                      <div
                        class={`mt-4 ${
                          num == 4
                            ? "md:pr-0"
                            : num === 3
                            ? "lg:pr-8 pr-2"
                            : "sm:pr-8"
                        } ${
                          num === 1
                            ? "relative right-[-14%]"
                            : num === 4
                            ? "relative  right-[3%]"
                            : "relative sm:right-0 right-[5.5%]"
                        }`}
                      >
                        <h3 class="text-lg font-semibold mt-3 block text-gray-900 ">
                          Session {i + 1}
                        </h3>
                        <time class="block mb-2 mt-3 text-sm leading-2  top-1 relative font-normal  text-white ">
                          Date:{" "}
                          <span class="text-blue-300  font-bold">
                            {new Date(
                              props.mentorshipPackages[0].selectedDates[i]
                            )
                              .toString()
                              .substring(0, 15)}
                          </span>
                        </time>
                        <time class="block mb-2 mt-3 text-sm  top-1 relative font-normal leading-2 text-white ">
                          Time:{" "}
                          <span class="text-blue-300 font-bold">
                            {String(
                              parseInt(
                                new Date(
                                  props.mentorshipPackages[0].selectedDates[i]
                                )
                                  .toString()
                                  .substring(16, 18)
                              ) > 12
                                ? parseInt(
                                    new Date(
                                      props.mentorshipPackages[0].selectedDates[
                                        i
                                      ]
                                    )
                                      .toString()
                                      .substring(16, 18)
                                  ) - 12
                                : parseInt(
                                    new Date(
                                      props.mentorshipPackages[0].selectedDates[
                                        i
                                      ]
                                    )
                                      .toString()
                                      .substring(16, 18)
                                  )
                            ) +
                              new Date(
                                props.mentorshipPackages[0].selectedDates[i]
                              )
                                .toString()
                                .substring(18, 21) +
                              String(
                                parseInt(
                                  new Date(
                                    props.mentorshipPackages[0].selectedDates[i]
                                  )
                                    .toString()
                                    .substring(16, 18)
                                ) > 12
                                  ? " PM "
                                  : " AM "
                              ) +
                              new Date().toString().substring(34)}
                          </span>
                        </time>
                        <p
                          class={`text-base font-semibold mt-3 text-ellipsis ${
                            num === 4
                              ? "lg:w-[170px] md:w-[140px] sm:w-[250px] w-[200px]"
                              : num === 3
                              ? "lg:w-[200px] w-[150px]"
                              : num === 1
                              ? "md:w-[400px] w-[200px]"
                              : "w-[200px]"
                          } truncate text-blue-300 `}
                        >
                          <span class="text-white">Link: </span>

                          <span class="text-blue-300 hover:underline font-bold hover:text-indigo-200 cursor-pointer">
                            {link}
                          </span>
                        </p>
                      </div>
                    </li>
                    <hr
                      class={`${
                        num === 4 ? "md:hidden" : "sm:hidden"
                      } block border-t-2 border-dashed border-gray-200 mb-6 -mt-2 mx-auto`}
                    />
                  </>
                ) : i ===
                  props.mentorshipPackages[0].sessionLinks.length - 1 ? (
                  <li
                    class={`relative text-center  ${
                      num === 4
                        ? "md:pr-0 px-4 md:mb-0 mb-6 md:mt-0 mt-10"
                        : "px-4 sm:mb-0 mb-6"
                    }  `}
                  >
                    <div class="flex items-center">
                      <div
                        class={` ring-0 ring-white  sm:ring-8 flex z-10 relative mb-2 mx-auto ${
                          num === 1
                            ? "md:-right-[4.4%] sm:-right-[7.8%] -right-[9.3%]"
                            : num === 4
                            ? "md:right-[1.2%] sm:right-[0%] right-[2%] ring-0 ring-white  md:ring-8"
                            : "sm:right-[7%] right-[5.5%]"
                        } justify-center items-center w-6 h-6 bg-blue-200 rounded-full  shrink-0`}
                      >
                        <svg
                          aria-hidden="true"
                          class="w-3 h-3 text-blue-600 "
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
                      <div
                        class={`hidden  ${
                          num === 4 ? "w-[83%] md:flex" : "w-[75%] sm:flex"
                        } absolute bg-gray-200 h-0.5 `}
                      ></div>
                    </div>
                    <div
                      class={`mt-4 ${
                        num == 4
                          ? "md:pr-0"
                          : num === 3
                          ? "lg:pr-8 pr-2"
                          : "sm:pr-8"
                      } ${
                        num === 1
                          ? "relative right-[-14%]"
                          : num === 4
                          ? "relative sm:right-0 right-[3%]"
                          : "relative sm:right-0 right-[5.5%]"
                      }`}
                    >
                      <h3 class="text-lg font-semibold mt-3 block text-gray-900 ">
                        Session {i + 1}
                      </h3>
                      <time class="block mb-2 mt-3 text-sm  top-1 relative font-normal leading-2 text-white ">
                        Date:{" "}
                        <span class="text-blue-300 font-bold">
                          {new Date(
                            props.mentorshipPackages[0].selectedDates[i]
                          )
                            .toString()
                            .substring(0, 15)}
                        </span>
                      </time>
                      <time class="block mb-2 mt-3 text-sm  top-1 relative font-normal leading-2 text-white ">
                        Time:{" "}
                        <span class="text-blue-300 font-bold">
                          {String(
                            parseInt(
                              new Date(
                                props.mentorshipPackages[0].selectedDates[i]
                              )
                                .toString()
                                .substring(16, 18)
                            ) > 12
                              ? parseInt(
                                  new Date(
                                    props.mentorshipPackages[0].selectedDates[i]
                                  )
                                    .toString()
                                    .substring(16, 18)
                                ) - 12
                              : parseInt(
                                  new Date(
                                    props.mentorshipPackages[0].selectedDates[i]
                                  )
                                    .toString()
                                    .substring(16, 18)
                                )
                          ) +
                            new Date(
                              props.mentorshipPackages[0].selectedDates[i]
                            )
                              .toString()
                              .substring(18, 21) +
                            String(
                              parseInt(
                                new Date(
                                  props.mentorshipPackages[0].selectedDates[i]
                                )
                                  .toString()
                                  .substring(16, 18)
                              ) > 12
                                ? " PM "
                                : " AM "
                            ) +
                            new Date().toString().substring(34)}
                        </span>
                      </time>
                      <p
                        class={`text-base font-semibold mt-3 text-ellipsis ${
                          num === 4
                            ? "lg:w-[170px] md:w-[140px] sm:w-[250px] w-[200px]"
                            : num === 3
                            ? "lg:w-[200px] w-[150px]"
                            : num === 1
                            ? "md:w-[400px] w-[200px]"
                            : "w-[200px]"
                        } truncate text-blue-300 `}
                      >
                        <span class="text-white">Link: </span>

                        <span class="text-blue-300 hover:underline font-bold hover:text-indigo-200 cursor-pointer">
                          {link}
                        </span>
                      </p>
                    </div>
                  </li>
                ) : (
                  <>
                    <li
                      class={`relative text-center  ${
                        num === 4
                          ? "md:pr-0 px-4 md:mb-0 mb-10 md:mt-0 mt-10"
                          : "px-4 sm:mb-0 mb-6"
                      }  `}
                    >
                      <div class="flex items-center">
                        <div
                          class={` ring-0 ring-white  sm:ring-8 flex z-10 relative mb-2 mx-auto ${
                            num === 1
                              ? "md:-right-[4.4%] sm:-right-[7.8%] -right-[9.3%]"
                              : num === 4
                              ? "md:right-[1.2%] sm:right-[0%] right-[2%] ring-0 ring-white  md:ring-8"
                              : "sm:right-[7%] right-[5.5%]"
                          } justify-center items-center w-6 h-6 bg-blue-200 rounded-full  shrink-0`}
                        >
                          <svg
                            aria-hidden="true"
                            class="w-3 h-3 text-blue-600 "
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
                        <div
                          class={`hidden  ${
                            num === 4 ? "md:flex" : "sm:flex"
                          } w-full absolute bg-gray-200 h-0.5 `}
                        ></div>
                      </div>
                      <div
                        class={`mt-4 ${
                          num == 4
                            ? "md:pr-0"
                            : num === 3
                            ? "lg:pr-8 pr-2"
                            : "sm:pr-8"
                        } ${
                          num === 1
                            ? "relative right-[-14%]"
                            : num === 4
                            ? "relative sm:right-0 right-[3%]"
                            : "relative sm:right-0 right-[5.5%]"
                        }`}
                      >
                        <h3 class="text-lg font-semibold mt-3 block text-gray-900 ">
                          Session {i + 1}
                        </h3>
                        <time class="block mb-2 mt-3 text-sm  top-1 relative font-normal leading-2 text-white ">
                          Date:{" "}
                          <span class="text-blue-300 font-bold">
                            {new Date(
                              props.mentorshipPackages[0].selectedDates[i]
                            )
                              .toString()
                              .substring(0, 15)}
                          </span>
                        </time>
                        <time class="block mb-2 mt-3 text-sm  top-1 relative font-normal leading-2 text-white ">
                          Time:{" "}
                          <span class="text-blue-300 font-bold">
                            {String(
                              parseInt(
                                new Date(
                                  props.mentorshipPackages[0].selectedDates[i]
                                )
                                  .toString()
                                  .substring(16, 18)
                              ) > 12
                                ? parseInt(
                                    new Date(
                                      props.mentorshipPackages[0].selectedDates[
                                        i
                                      ]
                                    )
                                      .toString()
                                      .substring(16, 18)
                                  ) - 12
                                : parseInt(
                                    new Date(
                                      props.mentorshipPackages[0].selectedDates[
                                        i
                                      ]
                                    )
                                      .toString()
                                      .substring(16, 18)
                                  )
                            ) +
                              new Date(
                                props.mentorshipPackages[0].selectedDates[i]
                              )
                                .toString()
                                .substring(18, 21) +
                              String(
                                parseInt(
                                  new Date(
                                    props.mentorshipPackages[0].selectedDates[i]
                                  )
                                    .toString()
                                    .substring(16, 18)
                                ) > 12
                                  ? " PM "
                                  : " AM "
                              ) +
                              new Date().toString().substring(34)}
                          </span>
                        </time>
                        <p
                          class={`text-base font-semibold mt-3 text-ellipsis ${
                            num === 4
                              ? "lg:w-[170px] md:w-[140px] sm:w-[250px] w-[200px]"
                              : num === 3
                              ? "lg:w-[200px] w-[150px]"
                              : "w-[200px]"
                          } truncate text-blue-300 `}
                        >
                          <span class="text-white">Link: </span>

                          <span class="text-blue-300 hover:underline font-bold hover:text-indigo-200 cursor-pointer">
                            {link}
                          </span>
                        </p>
                      </div>
                    </li>
                    <hr
                      class={`${
                        num === 4 ? "md:hidden" : "sm:hidden"
                      } block border-t-2 border-dashed border-gray-200 mb-6 -mt-2 mx-auto`}
                    />
                  </>
                );
              })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default MentorshipSchedule;
