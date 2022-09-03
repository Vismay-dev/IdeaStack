import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import varshitaa from "./images/varshitaa.jpg";
import abhay from "./images/abhay.jpg";
import shubham from "./images/shubham.jpg";

import vismay from "./images/founder.jpg";

const Team = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <div class="flex flex-col mx-auto relative overflow-hidden  lg:top-[40px] sm:top-[64px] top-[35px] -mb-[266px] ">
      <div class="container max-w-7xl lg:px-4 px-8  relative mx-auto">
        <div class="flex flex-wrap justify-center text-center mb-12">
          <div class="md:w-full w-10/12 lg:w-6/12 px-4 md:my-2.5 mb-4 lg:-mt-2 sm:mt-0 mt-3 ">
            <h1 class="text-gray-900 text-4xl font-bold md:mb-8 mb-10">
              Meet the Team
            </h1>

            <p class="text-gray-700 text-lg md:mb-1 -mb-6 md:mt-2 lg:mt-0 mt-4 lg:px-0 sm:px-4 px-0 font-light">
              With a passion for STEM projects, and an even stronger purpose of
              facilitating the modern generation's attempts at redefining the
              future, we've got a well-seasoned team at the helm.
            </p>
          </div>
        </div>

        <span class="absolute  z-0 right-0 -top-[430px]">
          <svg
            class="top-96 relative"
            width="134"
            height="106"
            viewBox="0 0 134 106"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="1.66667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 1.66667 104)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="104"
              r="1.66667"
              transform="rotate(-90 16.3333 104)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="104"
              r="1.66667"
              transform="rotate(-90 31 104)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 45.6667 104)"
              fill="#3056D3"
            />
            <circle
              cx="60.3334"
              cy="104"
              r="1.66667"
              transform="rotate(-90 60.3334 104)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 88.6667 104)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 117.667 104)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 74.6667 104)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="104"
              r="1.66667"
              transform="rotate(-90 103 104)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="104"
              r="1.66667"
              transform="rotate(-90 132 104)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 1.66667 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 16.3333 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 31 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 45.6667 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 60.3333 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 88.6667 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 117.667 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 74.6667 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 103 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 132 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="74.6673"
              r="1.66667"
              transform="rotate(-90 1.66667 74.6673)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 1.66667 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 16.3333 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 16.3333 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 31 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 31 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 45.6667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 45.6667 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 60.3333 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 60.3333 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 88.6667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 88.6667 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 117.667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 117.667 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 74.6667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 74.6667 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 103 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 103 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 132 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 132 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 1.66667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 1.66667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 16.3333 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 16.3333 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 31 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 31 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 45.6667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 45.6667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 60.3333 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 60.3333 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 88.6667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 88.6667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 117.667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 117.667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 74.6667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 74.6667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 103 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 103 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 132 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 132 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 1.66667 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 1.66667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 16.3333 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 16.3333 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 31 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 31 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 45.6667 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 45.6667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 60.3333 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 60.3333 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 88.6667 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 88.6667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 117.667 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 117.667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 74.6667 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 74.6667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 103 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 103 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 132 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 132 1.66683)"
              fill="#3056D3"
            />
          </svg>
        </span>

        <span class="absolute md:visible invisible  -z-[100000000]  lg:bottom-[400px] lg:left-0 left-[3px]  md:bottom-[344px] bottom-[360px]">
          <svg
            class="top-96 relative"
            width="134"
            height="106"
            viewBox="0 0 134 106"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="1.66667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 1.66667 104)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="104"
              r="1.66667"
              transform="rotate(-90 16.3333 104)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="104"
              r="1.66667"
              transform="rotate(-90 31 104)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 45.6667 104)"
              fill="#3056D3"
            />
            <circle
              cx="60.3334"
              cy="104"
              r="1.66667"
              transform="rotate(-90 60.3334 104)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 88.6667 104)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 117.667 104)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="104"
              r="1.66667"
              transform="rotate(-90 74.6667 104)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="104"
              r="1.66667"
              transform="rotate(-90 103 104)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="104"
              r="1.66667"
              transform="rotate(-90 132 104)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 1.66667 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 16.3333 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 31 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="89.3333"
              r="1.66667"
              transform="rotate(-90 45.6667 89.3333)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 60.3333 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 88.6667 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 117.667 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 74.6667 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 103 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="89.3338"
              r="1.66667"
              transform="rotate(-90 132 89.3338)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="74.6673"
              r="1.66667"
              transform="rotate(-90 1.66667 74.6673)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 1.66667 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 16.3333 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 16.3333 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 31 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 31 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 45.6667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="31.0003"
              r="1.66667"
              transform="rotate(-90 45.6667 31.0003)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 60.3333 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 60.3333 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 88.6667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 88.6667 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 117.667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 117.667 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 74.6667 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 74.6667 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 103 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 103 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="74.6668"
              r="1.66667"
              transform="rotate(-90 132 74.6668)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="30.9998"
              r="1.66667"
              transform="rotate(-90 132 30.9998)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 1.66667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 1.66667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 16.3333 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 16.3333 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 31 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 31 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 45.6667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 45.6667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 60.3333 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 60.3333 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 88.6667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 88.6667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 117.667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 117.667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 74.6667 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 74.6667 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 103 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 103 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="60.0003"
              r="1.66667"
              transform="rotate(-90 132 60.0003)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="16.3333"
              r="1.66667"
              transform="rotate(-90 132 16.3333)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 1.66667 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="1.66667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 1.66667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 16.3333 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="16.3333"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 16.3333 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 31 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="31"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 31 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="45.3333"
              r="1.66667"
              transform="rotate(-90 45.6667 45.3333)"
              fill="#3056D3"
            />
            <circle
              cx="45.6667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 45.6667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 60.3333 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="60.3333"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 60.3333 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 88.6667 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="88.6667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 88.6667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 117.667 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="117.667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 117.667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 74.6667 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="74.6667"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 74.6667 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 103 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="103"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 103 1.66683)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="45.3338"
              r="1.66667"
              transform="rotate(-90 132 45.3338)"
              fill="#3056D3"
            />
            <circle
              cx="132"
              cy="1.66683"
              r="1.66667"
              transform="rotate(-90 132 1.66683)"
              fill="#3056D3"
            />
          </svg>
        </span>

        <div className="grid md:max-w-[550px] sm:max-w-[85%] max-w-[260px] lg:max-w-[1000px] lg:mb-36 mb-[130px] md:top-0 top-6 mx-auto xl:max-w-full gap-10 md:mb-[300px]  relative sm:grid-cols-2 lg:grid-cols-4">
          <div data-aos="fade-left" data-aos-once="true" data-aos-delay="100">
            <div className="relative overflow-hidden  transition duration-300 transform rounded-md shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover p-1.5 bg-blue-700 grayscale w-full sm:h-[290px] h-[290px] md:h-64 xl:h-80"
                src={vismay}
                alt="Person"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                <p className="mb-1 text-lg xl:top-0 lg:top-4 md:top-2 top-4 relative font-bold text-gray-100">
                  Vismay Suramwar
                </p>
                <p className="mb-7 xl:top-0 lg:top-4 md:top-2 top-4 relative text-xs text-gray-100">
                  Founder
                </p>
                <p className="mb-10 text-xs font-semibold tracking-wide text-gray-200">
                  "IdeaStack strives to become society's go-to instrument for
                  accelerating and empowering the youth where its potential has
                  not been realised.{" "}
                  <p class="xl:inline hidden">
                    STEM has become the modern tool to development and growth,
                    and we are here to nurture it within students.
                  </p>{" "}
                  Ad Meliora."
                </p>
                <div className="flex xl:bottom-0 lg:bottom-5 md:bottom-3 bottom-5  relative items-center justify-center space-x-3">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/vismay-suramwar-08513718b/"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <svg
                      class="w-6 h-6 text-white fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="mailto: vismaysuramwar@gmail.com"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-once="true" data-aos-delay="200">
            <div className="relative overflow-hidden transition duration-300 transform rounded-md shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover p-1.5 bg-blue-700 grayscale w-full sm:h-[290px] h-[290px] md:h-64 xl:h-80"
                src={abhay}
                alt="Person"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                <p className="mb-1 text-lg xl:top-0 lg:top-4 md:top-3.5 top-4 relative font-bold text-gray-100">
                  Abhay Nair
                </p>
                <p className="mb-7 xl:top-0 lg:top-4 md:top-2 top-4 relative text-xs text-gray-100">
                  Head of Operations
                </p>
                <p className="mb-10 text-xs font-semibold tracking-wide text-gray-200">
                  "I believe that STEM projects are the nexus of the{" "}
                  <span class="xl:inline hidden">modern</span>
                  youth's redefinition of the future.{" "}
                  <span class="xl:inline hidden">
                    Given the immense social responsibility placed on us, we
                    prioritize technical efficiency and operational excellence
                    in connecting mentors with students.
                  </span>
                  <span class="xl:hidden inline">
                    IdeaStack has an immense social responsibility placed upon
                    it
                  </span>
                  "
                </p>
                <div className="flex  xl:bottom-0 lg:bottom-5 md:bottom-4 bottom-5  relative items-center justify-center space-x-3">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/abhaysivakumar/"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <svg
                      class="w-6 h-6 text-white fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>

                  <a
                    target="_blank"
                    href="mailto: abhaysn16@gmail.com"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-once="true" data-aos-delay="300">
            <div className="relative overflow-hidden transition duration-300 transform rounded-md shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover sm:object-center  p-1.5 bg-blue-700 grayscale w-full sm:h-[290px] h-[290px] md:h-64 xl:h-80"
                src={varshitaa}
                alt="Person"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                <p className="mb-1 text-lg xl:top-0 lg:top-4 md:top-2 top-4 relative font-bold text-gray-100">
                  Varshitaa Prasad
                </p>
                <p className="mb-7 xl:top-0 lg:top-4 md:top-2 top-4 relative text-xs text-gray-100">
                  Head of Marketing
                </p>
                <p className="mb-10 text-xs font-semibold tracking-wide text-gray-200">
                  "Hi everyone! I am thrilled to be working as the Head of
                  Marketing for IdeaStack! I hope to{" "}
                  <span class="xl:inline hidden">
                    achieve great things within the organization and{" "}
                  </span>
                  take its objective of facilitating STEM projects to great
                  heights!"
                </p>
                <div className="flex  xl:bottom-0 lg:bottom-5 md:bottom-3 bottom-5 relative  items-center justify-center space-x-3">
                  <a
                    target="_blank"
                    href="mailto: varshitaa.prasad@gmail.com "
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-once="true" data-aos-delay="400">
            <div className="relative overflow-hidden transition duration-300 transform rounded-md shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover p-1.5 bg-blue-700 grayscale w-full sm:h-[290px] h-[290px] md:h-64 xl:h-80"
                src={shubham}
                alt="Person"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 md:mt-0 -mt-[22px] hover:opacity-100">
                <p className="mb-1 text-lg xl:top-0 lg:top-2 md:top-2 top-4 relative font-bold text-gray-100">
                  Shubham Rawat
                </p>
                <p className="mb-7 xl:top-0 lg:top-2 md:top-2 top-4 relative text-xs text-gray-100">
                  Editor-in-Chief
                </p>
                <p className="mb-10 md:-top-1 xl:top-1 top-0 relative text-xs font-semibold tracking-wide text-gray-200">
                  "As the Editor-In-Chief at IdeaStack, I aim to bring about a
                  personal connect with our end-users
                  <span class="xl:inline hidden">
                    through our communication channels to ensure a seamless
                    experience,
                  </span>
                  and to provide a
                  <span class="xl:inline hidden"> minimal yet adequate</span>
                  glipse into who we are!"
                </p>
                <div className="flex items-center xl:mt-0 md:-mt-6 -mt-5 justify-center space-x-3">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/sr2005/"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <svg
                      class="w-6 h-6 text-white fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="mailto: rshubham2005@gmail.com"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative lg:-bottom-16 md:block hidden  lg:rotate-0 rotate-[13deg]  lg:mb-8 mb-20  lg:right-0 right-4   max-h-96 lg:-mt-36 -mt-[330px] lg:mr-0 -mr-14 lg:top-0 top-14">
        <svg
          viewBox="0 0 1428 174"
          class="lg:right-0 relative right-14 md:top-12  lg:top-0 lg:rotate-0 rotate-12"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#a79ce2"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#e7f5fb"
              fill-rule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
        <svg
          class="relative bottom-3  md:top-12 lg:top-0 lg:hidden lg:right-0 right-16 lg:rotate-0 rotate-[190deg]"
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#a79ce2"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#e7f5fb"
              fill-rule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
        <svg
          class="relative bottom-[134px] lg:hidden"
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#a79ce2"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#e7f5fb"
              fill-rule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
        <svg
          class="relative rotate-180  bottom-[134px] left-2 lg:hidden"
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#a79ce2"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#e7f5fb"
              fill-rule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Team;
