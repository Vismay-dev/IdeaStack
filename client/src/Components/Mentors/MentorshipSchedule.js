import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

const MentorshipSchedule = (props) => {
  const history = useRouter();
  const [loading, setLoading] = useState(true);
  const [numSesh, setNumSesh] = useState(0);
  const [workshop, setWorkshop] = useState({});
  const [consultantSelected, setConsultantSelected] = useState(false);
  let num = 4;
  useEffect(() => {
    setLoading(true);

    if (props.workshop) {
      setConsultantSelected(true);

      let currSessionNum = 0;
      let currentTime = new Date();

      for (let i = 0; i < props.workshop.timeline.length; i++) {
        if (
          currentTime < props.workshop.timeline[i] &&
          (i == 0 || currentTime > props.workshop.timeline[i - 1])
        ) {
          currSessionNum = i;
        }
      }
      setNumSesh(currSessionNum + 1);
      setWorkshop(props.workshop);
    }

    setLoading(false);
  }, [props.workshop]);

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/photos/digital-cyberspace-with-particles-and-digital-data-network-high-picture-id1302189748?b=1&k=20&m=1302189748&s=170667a&w=0&h=s0o2dhTh40lrWLPt6rg54S0jCUywkr6h04rDdfStMq8=)",
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
            class={`sm:text-3xl text-2xl  ${
              num === 4
                ? "md:top-[23px] top-[23px]"
                : "sm:top-[24px] top-[26px]"
            }  text-center font-bold relative  text-white`}
          >
            Open Discussion Hours
          </h1>
          <h1
            class={`text-xl  ${
              num === 4
                ? "md:top-[37px] top-[48px]"
                : "sm:top-[31px] top-[43px]"
            } text-center font-semibold relative top-[28px] text-white`}
          >
            Course: {workshop && workshop.title}
          </h1>
          <h1
            class={`text-sm ${
              num === 4
                ? "md:top-[40px] top-[51px] block -mb-2"
                : "sm:top-[27px] top-[37px]"
            }  text-center uppercase font-semibold relative text-gray-100`}
          >
            (
            {workshop &&
              workshop.mentors &&
              workshop.mentors.map((mentor, i) => {
                return (
                  <span>
                    {mentor}
                    {mentor + i == workshop.mentors.length - 2
                      ? " & "
                      : i == workshop.mentors.length - 1
                      ? ""
                      : ", "}
                  </span>
                );
              })}
            )
          </h1>

          <ol
            id="scrollbar"
            class={`items-center w-full  mx-auto  absolute bottom-0 left-[50%] translate-x-[-50%] bg-white  ${
              num === 2
                ? "p-1.5 pt-2 px-8 sm:flex lg:pr-0.5 pr-[2px]  sm:h-fit h-[300px] overflow-y-scroll"
                : num === 1
                ? "p-1.5 pt-2 px-9 sm:flex lg:pr-[67px] pr-[68px]  sm:h-fit h-[300px] overflow-y-scroll"
                : num === 3
                ? "p-1.5 pt-2 pl-8 sm:flex pr-0  sm:h-fit h-[300px] overflow-y-scroll"
                : "p-1.5 pt-2 pb-1 sm:pl-[26px] md:pl-[10px] pl-[32px] md:h-fit h-[350px] overflow-y-scroll md:flex pr-[16px]"
            }  border-t-2 border-x-2 border-blue-300 `}
          >
            {workshop &&
              workshop.sessions &&
              workshop.sessions.map((link, i) => {
                return i === 0 ? (
                  <>
                    <li
                      class={`relative text-center p-4 ${
                        num === 4
                          ? "md:pr-0 md:-mr-[5px] px-[18px] md:mb-0 mb-5 md:mt-0 mt-0"
                          : "px-4 sm:mb-0 mb-6"
                      } `}
                    >
                      <div class="flex items-center">
                        <div
                          class={` ring-0 ring-blue-800  sm:ring-2 flex z-10 relative mx-auto ${
                            num === 1
                              ? "md:-right-[4.4%] sm:-right-[7.8%] -right-[9.3%]"
                              : num === 4
                              ? "md:right-[2%] sm:right-[0%] right-[2%] ring-0 ring-blue-800  md:ring-2"
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
                          } w-full absolute bg-blue-800 h-0.5 `}
                        ></div>
                      </div>
                      <div
                        class={`mt-4 mb-2 ${
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
                        <div class="bg-yellow-50 mt-3 px-1.5 py-2 top-1 border-x-[1px] border-dashed rounded-md border-blue-700">
                          <time class="block mb-2  text-sm leading-2   relative font-normal  text-black ">
                            <span class="font-semibold">Date:</span>{" "}
                            <span class="  font-bold">
                              {new Date(workshop.timeline[i])
                                .toString()
                                .substring(0, 15)}
                            </span>
                          </time>
                          <time class="block mb-2 mt-0.5 text-sm  top-[3px] relative font-normal leading-2 text-black ">
                            <span class="font-semibold">Time:</span>{" "}
                            <span class=" font-bold">
                              {String(
                                parseInt(
                                  new Date(workshop.timeline[i])
                                    .toString()
                                    .substring(16, 18)
                                ) > 12
                                  ? parseInt(
                                      new Date(workshop.timeline[i])
                                        .toString()
                                        .substring(16, 18)
                                    ) - 12
                                  : parseInt(
                                      new Date(workshop.timeline[i])
                                        .toString()
                                        .substring(16, 18)
                                    )
                              ) +
                                new Date(workshop.timeline[i])
                                  .toString()
                                  .substring(18, 21) +
                                String(
                                  parseInt(
                                    new Date(workshop.timeline[i])
                                      .toString()
                                      .substring(16, 18)
                                  ) > 12
                                    ? " PM "
                                    : " AM "
                                ) +
                                "(" +
                                new Date()
                                  .toString()
                                  .substring(35)
                                  .split(" ")
                                  .map((str) => str[0])
                                  .join("") +
                                ")"}
                            </span>
                          </time>
                          <p
                            class={`text-sm font-semibold mt-3 text-ellipsis ${
                              num === 4
                                ? "lg:w-[170px] md:w-[140px] sm:w-[250px] w-[200px]"
                                : num === 3
                                ? "lg:w-[200px] w-[150px]"
                                : num === 1
                                ? "md:w-[400px] w-[200px]"
                                : "w-[200px]"
                            } truncate  `}
                          >
                            <span class="text-black">Link: </span>

                            <span class=" hover:underline hover:text-indigo-800 cursor-pointer">
                              {workshop.links[i]}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <hr
                      class={`${
                        num === 4 ? "md:hidden" : "sm:hidden"
                      } block border-t-2 border-dashed border-blue-800 mb-6 -mt-2 mx-auto`}
                    />
                  </>
                ) : i === workshop.links.length - 1 ? (
                  <li
                    class={`relative text-center  ${
                      num === 4
                        ? "md:pr-0  px-[18px] md:mb-0 mb-6 md:mt-0 mt-10"
                        : "px-4 sm:mb-0 mb-6"
                    }  `}
                  >
                    <div class="flex items-center">
                      <div
                        class={` ring-0 ring-blue-800  sm:ring-2 flex z-10 relative mx-auto ${
                          num === 1
                            ? "md:-right-[4.4%] sm:-right-[7.8%] -right-[9.3%]"
                            : num === 4
                            ? "md:right-[1.2%] sm:right-[0%] right-[2%] ring-0 ring-blue-800 md:ring-2"
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
                        } absolute bg-blue-800 h-0.5 `}
                      ></div>
                    </div>
                    <div
                      class={`mt-4 mb-2 ${
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
                      <div class="bg-yellow-50 mt-3 top-1 px-1.5 py-2 border-x-[1px] border-dashed rounded-md border-blue-700">
                        <time class="block mb-2 text-sm  relative font-normal leading-2 text-black ">
                          <span class="font-semibold">Date:</span>{" "}
                          <span class="0 font-bold">
                            {new Date(workshop.timeline[i])
                              .toString()
                              .substring(0, 15)}
                          </span>
                        </time>
                        <time class="block mb-2 mt-0.5 text-sm  top-[3px] relative font-normal leading-2 text-black ">
                          <span class="font-semibold">Time:</span>{" "}
                          <span class=" font-bold">
                            {String(
                              parseInt(
                                new Date(workshop.timeline[i])
                                  .toString()
                                  .substring(16, 18)
                              ) > 12
                                ? parseInt(
                                    new Date(workshop.timeline[i])
                                      .toString()
                                      .substring(16, 18)
                                  ) - 12
                                : parseInt(
                                    new Date(workshop.timeline[i])
                                      .toString()
                                      .substring(16, 18)
                                  )
                            ) +
                              new Date(workshop.timeline[i])
                                .toString()
                                .substring(18, 21) +
                              String(
                                parseInt(
                                  new Date(workshop.timeline[i])
                                    .toString()
                                    .substring(16, 18)
                                ) > 12
                                  ? " PM "
                                  : " AM "
                              ) +
                              "(" +
                              new Date()
                                .toString()
                                .substring(35)
                                .split(" ")
                                .map((str) => str[0])
                                .join("") +
                              ")"}
                          </span>
                        </time>
                        <p
                          class={`text-sm font-semibold mt-3 text-ellipsis ${
                            num === 4
                              ? "lg:w-[170px] md:w-[140px] sm:w-[250px] w-[200px]"
                              : num === 3
                              ? "lg:w-[200px] w-[150px]"
                              : num === 1
                              ? "md:w-[400px] w-[200px]"
                              : "w-[200px]"
                          } truncate  `}
                        >
                          <span class="text-black">Link: </span>

                          <span class=" hover:underline hover:text-indigo-800 cursor-pointer">
                            {workshop.links[i]}
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                ) : (
                  <>
                    <li
                      class={`relative text-center  ${
                        num === 4
                          ? "md:pr-0  px-[18px] md:mb-0 mb-10 md:mt-0 mt-10"
                          : "px-4 sm:mb-0 mb-6"
                      }  `}
                    >
                      <div class="flex items-center">
                        <div
                          class={` ring-0 ring-blue-800  sm:ring-2 flex z-10 relative mx-auto ${
                            num === 1
                              ? "md:-right-[4.4%] sm:-right-[7.8%] -right-[9.3%]"
                              : num === 4
                              ? "md:right-[1.2%] sm:right-[0%] right-[2%] ring-0 ring-blue-800  md:ring-2"
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
                          } w-full absolute bg-blue-800 h-0.5 `}
                        ></div>
                      </div>
                      <div
                        class={`mt-4 mb-2  ${
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
                        <div class="bg-yellow-50 px-1.5 py-2 mt-3 top-1 border-x-[1px] border-dashed rounded-md border-blue-700">
                          <time class="block mb-2 text-sm relative font-normal leading-2 text-black ">
                            <span class="font-semibold">Date:</span>{" "}
                            <span class=" font-bold">
                              {new Date(workshop.timeline[i])
                                .toString()
                                .substring(0, 15)}
                            </span>
                          </time>
                          <time class="block mb-2 mt-0.5 text-sm  top-[3px] relative font-normal leading-2 text-black ">
                            <span class="font-semibold">Time:</span>{" "}
                            <span class=" font-bold">
                              {String(
                                parseInt(
                                  new Date(workshop.timeline[i])
                                    .toString()
                                    .substring(16, 18)
                                ) > 12
                                  ? parseInt(
                                      new Date(workshop.timeline[i])
                                        .toString()
                                        .substring(16, 18)
                                    ) - 12
                                  : parseInt(
                                      new Date(workshop.timeline[i])
                                        .toString()
                                        .substring(16, 18)
                                    )
                              ) +
                                new Date(workshop.timeline[i])
                                  .toString()
                                  .substring(18, 21) +
                                String(
                                  parseInt(
                                    new Date(workshop.timeline[i])
                                      .toString()
                                      .substring(16, 18)
                                  ) > 12
                                    ? " PM "
                                    : " AM "
                                ) +
                                "(" +
                                new Date()
                                  .toString()
                                  .substring(35)
                                  .split(" ")
                                  .map((str) => str[0])
                                  .join("") +
                                ")"}
                            </span>
                          </time>
                          <p
                            class={`text-sm font-semibold mt-3 text-ellipsis ${
                              num === 4
                                ? "lg:w-[170px] md:w-[140px] sm:w-[250px] w-[200px]"
                                : num === 3
                                ? "lg:w-[200px] w-[150px]"
                                : "w-[200px]"
                            } truncate  `}
                          >
                            <span class="text-black">Link: </span>

                            <span class=" hover:underline hover:text-indigo-800 cursor-pointer">
                              {workshop.links[i]}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <hr
                      class={`${
                        num === 4 ? "md:hidden" : "sm:hidden"
                      } block border-t-2 border-dashed border-blue-800 mb-6 -mt-2 mx-auto`}
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
