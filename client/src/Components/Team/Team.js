import { useEffect } from "react";
import AOS from 'aos';
import "aos/dist/aos.css";

import varshitaa from './images/varshitaa.jpg';
import abhay from './images/abhay.jpg'
import shubham from './images/shubham.jpg'

import vismay from './images/founder.jpg'

const Team = () => {

    useEffect(() => {
        AOS.init({
          duration : 1200
        });
      }, []);

    return (
        <div class="flex flex-col mx-auto relative overflow-hidden  lg:top-[40px] top-[64px] -mb-[266px] ">
            <div  class="container max-w-7xl lg:px-4 px-8  relative mx-auto">
                <div  class="flex flex-wrap justify-center text-center mb-12">
                    <div class="md:w-full w-10/12 lg:w-6/12 px-4 md:my-2.5 mb-4 -mt-2">
                        <h1 class="text-gray-900 text-4xl font-bold mb-8">
                            Meet the Team
                        </h1>

                        <p class="text-gray-700 text-lg md:mb-1 -mb-6 font-light">
                            With a passion for STEM projects, and an even stronger purpose of facilitating the modern generation's attempts at redefining the future, we've got a well-seasoned team at the helm.
                        </p>
                    </div>
                </div>


                <span class="absolute  z-0 right-0 -top-[430px]">
                        <svg
                        class = 'top-96 relative'
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

                     <span class="absolute  -z-[100000000]  lg:bottom-[400px] bottom-[350px]">
                        <svg
                        class = 'top-96 relative'
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
                     

                <div class="flex flex-wrap">
                    <div  data-aos={"fade-left"} data-aos-once='true' class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 md:mt-0 mt-4 sm:px-8 lg:px-6">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200  md:h-auto h-auto  md:w-auto w-[70%] md:mx-0 mx-auto block md:px-0 sm:px-24 px-8   data-aos-delay-100"
                                    src={vismay}/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                    Vismay Suramwar
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                    Founder
                                </div>

                                <div class="text-gray-900 font-medium md:text-sm text-base  mt-6 mb-2">
                                  "IdeaStack strives to become society's go-to instrument for accelerating and empowering the youth where its potential has not been realised. STEM has become the modern tool to development and growth, and we are here to nurture it within students. Ad Meliora."

                              
                                    </div>

                                <div className="w-full flex justify-center pt-5 pb-5 bottom-0.5 relative ">
                                        <a onClick = { 
                       () =>  { window.open('https://www.instagram.com/vismay.sur3003/','_blank')}
                                        } className="mx-5 hover:bg-orange-300 rounded-lg cursor-pointer">
                                            <div>
                                                <svg xmlns="http://ww.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                               

                                <div class="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                                    <a href="#" class="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                                        <i class="mdi mdi-linkedin text-indigo-500 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-blue-50 h-10 w-10">
                                        <i class="mdi mdi-twitter text-blue-300 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-orange-50 h-10 w-10">
                                        <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class = 'mt-5 mb-4 md:hidden border-t-2 border-dotted w-[90%] left-[5%] relative bottom-[60px] my-1.5 border-blue-700'/>

                    <div data-aos={"fade-left"} data-aos-delay = '250' data-aos-once='true' class="w-full md:w-6/12 lg:w-3/12 md:mt-0 -mt-6 mb-6 px-6 sm:px-8 lg:px-6">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto ">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all md:h-auto h-auto  md:w-auto w-[70%] md:mx-0 mx-auto block md:px-0 sm:px-24 px-8   duration-200 data-aos-delay-100"
                                    src={abhay}/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                   Abhay Nair
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                    Chief Operations Officer
                                </div>

                                <div class="text-gray-900 font-medium md:text-sm text-base   mt-6 mb-2">
                                  "STEM projects are the nexus of the modern youth's redefinition of the future. Given the immense social responsibility placed on us, we prioritize technical efficiency and operational excellence in connecting mentors with students."
                                    </div>

                                <div className="w-full flex justify-center pt-5 pb-5 bottom-0.5 relative ">
                                        <a onClick = { 
                       () =>  { window.open('https://www.instagram.com/vismay.sur3003/','_blank')}
                                        } className="mx-5 hover:bg-orange-300 rounded-lg cursor-pointer">
                                            <div>
                                                <svg xmlns="http://ww.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                                <div class="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                                    <a href="#" class="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                                        <i class="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-blue-50 h-10 w-10">
                                        <i class="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-orange-50 h-10 w-10">
                                        <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
<hr class = 'mt-5 mb-2 border-t-2 md:hidden border-dotted w-[90%] left-[5%] relative bottom-[60px] border-blue-700'/>
                    <div data-aos={"fade-left"} data-aos-once='true' data-aos-delay = '500' class="w-full md:w-6/12 lg:w-3/12 lg:mb-6 md:mb-40 -mb-36 md:mt-0 mt-44 lg:bottom-0 bottom-48 relative px-6 sm:px-8 lg:px-6">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 md:h-auto h-auto  md:w-auto w-[70%] md:mx-0 mx-auto block md:px-0 sm:px-24 px-8   data-aos-delay-100"
                                    src={shubham}/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                    Shubham Rawat
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                    Editor-in-Chief
                                </div>

                                <div class="text-gray-900 font-medium md:text-sm     mt-6 mb-2">
                                "As the Editor-In-Chief at IdeaStack, I aim to bring about a personal connect with our end-users through our communication channels to ensure a seamless experience, and to provide a minimal yet adequate glipse into who we are!"
                                    </div>

                                <div className="w-full flex justify-center pt-5 pb-5 bottom-0.5 relative ">
                                        <a onClick = { 
                       () =>  { window.open('https://www.instagram.com/vismay.sur3003/','_blank')}
                                        } className="mx-5 hover:bg-orange-300 rounded-lg cursor-pointer">
                                            <div>
                                                <svg xmlns="http://ww.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                                <div class="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                                    <a href="#" class="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                                        <i class="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-blue-50 h-10 w-10">
                                        <i class="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-orange-50 h-10 w-10">
                                        <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class = 'mt-2 md:mb-0 md:hidden  border-t-2 border-dotted w-[90%] left-[5%] relative bottom-[71px] border-blue-700'/>

                    <div data-aos={"fade-left"} data-aos-once='true' data-aos-delay = '750' class="w-full md:w-6/12 lg:w-3/12 md:mb-12 sm:mb-14 mb-12 px-6 sm:px-8 lg:top-0 -top-5 relative lg:px-6">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 lg:h-auto md:h-[400px] h-auto md:w-auto w-[70%] md:mx-0 mx-auto block md:px-0 sm:px-24 px-8   relative data-aos-delay-100"
                                    src={varshitaa}/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                Varshitaa Prasad
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                Head of Marketing
                                </div>

                                <div class="text-gray-900 font-medium md:text-sm text-base   mt-6 mb-2">
                                "Hi everyone! I am thrilled to be working as the Head of Marketing for IdeaStack! I hope to achieve great things within the organization and take its objective of facilitating STEM projects to great heights!"
                                 </div>

                                <div className="w-full flex justify-center pt-5 pb-5 bottom-0.5 relative ">
                                        <a onClick = { 
                       () =>  { window.open('https://www.instagram.com/vismay.sur3003/','_blank')}
                                        } className="mx-5 hover:bg-orange-300 rounded-lg cursor-pointer">
                                            <div>
                                                <svg xmlns="http://ww.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                                <div class="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                                    <a href="#" class="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                                        <i class="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-blue-50 h-10 w-10">
                                        <i class="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                                    </a>

                                    <a href="#" class="flex rounded-full hover:bg-orange-50 h-10 w-10">
                                        <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        <div class="relative lg:-bottom-16 md:block hidden  lg:rotate-0 rotate-[13deg]  lg:mb-8 mb-20  lg:right-0 right-4   max-h-96 lg:-mt-36 -mt-[330px] lg:mr-0 -mr-14 lg:top-0 top-14">
      <svg viewBox="0 0 1428 174" class = 'lg:right-0 relative right-14 lg:rotate-0 rotate-12' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-2.000000, 44.000000)" fill="#a79ce2" fill-rule="nonzero">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
          </g>
          <g transform="translate(-4.000000, 76.000000)" fill="#e7f5fb" fill-rule="nonzero">
            <path
              d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
            ></path>
          </g>
        </g>
      </svg>
      <svg class = 'relative bottom-3 lg:hidden lg:right-0 right-16 lg:rotate-0 rotate-[190deg]' viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-2.000000, 44.000000)" fill="#a79ce2" fill-rule="nonzero">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
          </g>
          <g transform="translate(-4.000000, 76.000000)" fill="#e7f5fb" fill-rule="nonzero">
            <path
              d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
            ></path>
          </g>
        </g>
      </svg>
      <svg class = 'relative bottom-[134px] lg:hidden' viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-2.000000, 44.000000)" fill="#a79ce2" fill-rule="nonzero">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
          </g>
          <g transform="translate(-4.000000, 76.000000)" fill="#e7f5fb" fill-rule="nonzero">
            <path
              d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
            ></path>
          </g>
        </g>
      </svg>
      <svg class = 'relative rotate-180 bottom-[134px] left-2 lg:hidden' viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-2.000000, 44.000000)" fill="#a79ce2" fill-rule="nonzero">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
          </g>
          <g transform="translate(-4.000000, 76.000000)" fill="#e7f5fb" fill-rule="nonzero">
            <path
              d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
                        </div>
    )
}

export default Team