import { useEffect } from "react";
import AOS from 'aos';
import "aos/dist/aos.css";

const Team = () => {

    useEffect(() => {
        AOS.init({
          duration : 1200
        });
      }, []);

    return (
        <div class="flex flex-col mx-auto relative  top-[46px] -mb-[266px] ">
            <div  class="container max-w-7xl px-4  relative mx-auto">
                <div  class="flex flex-wrap justify-center text-center mb-12">
                    <div class="w-full lg:w-6/12 px-4">
                        <h1 class="text-gray-900 text-4xl font-bold mb-10">
                            Meet the Team
                        </h1>

                        <p class="text-gray-700 text-lg font-light">
                            With over 100 years of combined experience, we've got a well-seasoned team at the helm.
                        </p>
                    </div>
                </div>


                <span class="absolute  z-0 -left-24 -top-[450px]">
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

                     <span class="absolute  -z-[100000000] -right-36 bottom-[430px]">
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
                    <div  data-aos={"fade-left"} data-aos-once='true' class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 data-aos-delay-100"
                                    src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80"/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                    Vismay Suramwar
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                    Founder
                                </div>

                                <div class="text-gray-900 font-light text-base  mt-6 mb-2">
                                  XXXX

                                  XXXX
                                  XXXXX
                                  XXXXXX
                                  X
                                  XXXXXXXXXXXX XXXXXXXXXXXX
                                  XXXXXXXXXXXX

                              
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

                    <div data-aos={"fade-left"} data-aos-delay = '250' data-aos-once='true' class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 data-aos-delay-100"
                                    src="https://images.unsplash.com/photo-1634896941598-b6b500a502a7?fit=clamp&w=400&h=400&q=80"/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                   Abhay Nair
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                    Chief Operations Officer
                                </div>

                                <div class="text-gray-900 font-light  mt-6 mb-2">
                                  XXXX

                                  XXXX
                                  XXXXX
                                  XXXXXX
                                  X
                                  XXXXXXXXXXXX XXXXXXXXXXXX
                                  XXXXXXXXXXXX

                              
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

                    <div data-aos={"fade-left"} data-aos-once='true' data-aos-delay = '500' class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 data-aos-delay-100"
                                    src="https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?fit=clamp&w=400&h=400&q=80"/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                    Shubham Rawat
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                    Editor-in-Chief
                                </div>

                                <div class="text-gray-900 font-light  mt-6 mb-2">
                                  XXXX

                                  XXXX
                                  XXXXX
                                  XXXXXX
                                  X
                                  XXXXXXXXXXXX XXXXXXXXXXXX
                                  XXXXXXXXXXXX

                              
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

                    <div data-aos={"fade-left"} data-aos-once='true' data-aos-delay = '750' class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                        <div class="flex flex-col">
                            <a href="#" class="mx-auto">
                                <img class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 data-aos-delay-100"
                                    src="https://images.unsplash.com/photo-1635003913011-95971abba560?fit=clamp&w=400&h=400&q=80"/>
                            </a>

                            <div class="text-center mt-6">
                                <h1 class="text-gray-900 text-xl font-bold mb-1">
                                Varshitaa Prasad
                                </h1>

                                <div class="text-gray-700 font-light mb-2">
                                Head of Graphic Design
                                </div>

                                <div class="text-gray-900 font-light  mt-6 mb-2">
                                  XXXX

                                  XXXX
                                  XXXXX
                                  XXXXXX
                                  X
                                  XXXXXXXXXXXX XXXXXXXXXXXX
                                  XXXXXXXXXXXX

                              
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
                        </div>
    )
}

export default Team