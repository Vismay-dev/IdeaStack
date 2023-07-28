import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import founder from "../NavMenu/logo2.jpg";
import founder1 from "./founder 2.jpg";

import RegModal from "../Modals/RegModal";

import logo from "../NavMenu/logo.png";
import { useHistory } from "react-router-dom";

const WhyUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  const history = useHistory();

  return (
    <>
      <section
        data-aos={"zoom-out"}
        data-aos-once="true"
        class="sm:pt-9 pt-11 lg:pt-[30px] pb-0 lg:pb-[60px] xl:pb-[90px] -mb-[65px] overflow-hidden"
      >
        <div class="container relative mx-auto md:left-4 left-2">
          <div class="justify-between items-center mx-auto">
            <h2 class="sm:mt-2 -mt-3 xl:mb-12 px-8 lg:mb-6 -mb-3 text-3xl tracking-[0.015em] mx-auto text-center  font-bold text-gray-700 md:text-4xl">
              Compare us with alternatives
            </h2>

            <div class="flex flex-col tracking-[0.015em]  relative rounded-lg mx-auto md:w-[1024px] sm:w-[750px] w-[380px] xl:scale-100 lg:scale-90 md:scale-[.70] lg:right-0 md:right-[140px] sm:right-[60px] right-[10px]  sm:scale-[75%] scale-[90%] lg:mb-0 md:mb-3 md:mt-0 sm:mt-2 sm:mb-6 mt-8 mb-12 ">
              <div class="flex items-center h-20 px-4 ">
                <div class="w-40"></div>
                <div class="flex-grow sm:text-base text-sm sm:-right-[120px] -right-[20px] relative font-semibold text-center">
                  Accelerators
                </div>
                <div class="flex-grow   text-lg font-semibold text-center">
                  <img
                    src={logo}
                    class="sm:w-28 w-32 mr-7 ml-6 md:-right-[110px] sm:-right-[90px] -right-[3px] relative sm:bottom-1 -bottom-2"
                  ></img>
                </div>
                <div class="flex-grow text-base sm:block hidden relative md:-right-[18px] -right-[25px] font-semibold text-center">
                  Courses
                </div>
                <div class="flex-grow sm:text-base text-sm relative md:-right-2 sm:-right-3 -right-7 font-semibold text-center">
                  Consultants
                </div>
              </div>
              <div class="flex  items-center h-16 px-4 md:pl-[220px] sm:pl-[170px] pl-[210px] rounded-t-lg border-y bg-gray-100 border-gray-500">
                <div class="w-80 md:normal-case sm:uppercase normal-case md:-ml-52 sm:-ml-40 -ml-48 md:-mr-5 sm:mr-0 -mr-52 ">
                  <i class="fas fa-tags text-sm mr-2.5"></i>
                  Price
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <i class="fas fa-dollar-sign"></i>
                  <i class="fas fa-dollar-sign"></i>
                  <i class="fas fa-dollar-sign"></i>
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="justify-center sm:flex  hidden flex-grow w-4 px-4">
                  <i class="fas fa-dollar-sign"></i>
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4 sm:mr-0 -mr-6">
                  <i class="fas fa-dollar-sign"></i>
                  <i class="fas fa-dollar-sign"></i>
                  <i class="fas fa-dollar-sign"></i>
                </div>
              </div>
              <div class="flex items-center h-16 px-4 md:pl-[220px] sm:pl-[170px] pl-[210px] border-b border-gray-500">
                <div class="w-80 md:normal-case sm:uppercase normal-case md:-ml-52 sm:-ml-40 -ml-48 md:-mr-5 sm:mr-0 -mr-52 ">
                  <i class="fas fa-chess-bishop text-lg mr-3.5 ml-0.5"></i>
                  <span class="sm:inline hidden">Strategic</span> 1:1{" "}
                  <span class="md:inline hidden">mentorship &</span> advice
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class=" justify-center sm:flex hidden flex-grow w-4 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4 sm:mr-0 -mr-6">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="sm:flex hidden items-center h-16 px-4 md:pl-[220px] sm:pl-[170px] pl-[200px] border-b bg-gray-100 border-gray-500">
                <div class="w-80 md:normal-case sm:uppercase normal-case md:-ml-52 sm:-ml-40 -ml-48 md:-mr-5 sm:mr-0 -mr-40">
                  <i class="fas fa-users text-sm mr-2.5"></i>
                  Diverse <span class="sm:hidden inline">network</span>{" "}
                  <span class="sm:inline hidden">pool</span>{" "}
                  <span class="sm:inline hidden">
                    of <span class="md:inline hidden">startup</span> experts
                  </span>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class=" justify-center sm:flex hidden flex-grow w-4 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex items-center h-16 px-4 md:pl-[220px] sm:pl-[170px] pl-[210px] border-b border-gray-500">
                <div class="w-80 md:normal-case sm:uppercase normal-case md:-ml-52 sm:-ml-40 -ml-48 md:-mr-5 sm:mr-0 -mr-52 ">
                  <i class="fas fa-handshake text-sm mr-2.5"></i>
                  Community{" "}
                  <span class="md:hidden sm:inline hidden">
                    for accountability
                  </span>{" "}
                  <span class="md:inline hidden">to keep you accountable</span>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class=" justify-center sm:flex hidden flex-grow w-4 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4 sm:mr-0 -mr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex items-center h-16 px-4 md:pl-[220px] sm:pl-[170px] pl-[210px] border-b bg-gray-100 border-gray-500">
                <div class="w-80 md:normal-case sm:uppercase normal-case md:-ml-52 sm:-ml-40 -ml-48 md:-mr-5 sm:mr-0 -mr-52 ">
                  <i class="fas fa-redo text-sm mr-2.5"></i>
                  <span class="sm:inline hidden">
                    Recurring year-round
                  </span>{" "}
                  <span class="sm:hidden inline">Year-round</span>{" "}
                  <span class="sm:inline hidden">value</span>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                <div class="flex justify-center flex-grow w-4 px-4">
                  <svg
                    class="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="justify-center flex-grow  sm:flex hidden w-4 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div class="flex justify-center flex-grow w-4 px-4 sm:mr-0 -mr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="text-white sm:text-base text-sm uppercase bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg sm:px-10 md:px-[50px] px-2.5 py-2 pb-2.5 xl:mt-12 lg:mt-7 sm:-mt-4 mt-0 lg:mb-0 sm:mb-16 mb-12 mx-auto block md:w-[300px] w-[200px]  text-center"
            onClick={() => {
              history.push("signup");
            }}
          >
            GET STARTED
          </button>
        </div>
      </section>
    </>
  );
};
export default WhyUs;
