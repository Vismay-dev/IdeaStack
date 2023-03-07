import React, { useState } from "react";

import RegModal from "../Modals/RegModal";

// import Modal from "../utils/Modal";
// import HeroImage from "../images/hero-image.png";

const SignUp = () => {
  const [regModalShow, setRegModalShow] = useState(false);
  const closeFuncReg = () => {
    setRegModalShow(false);
  };

  return (
    <>
      {regModalShow ? <RegModal close={closeFuncReg} /> : ""}{" "}
      <div class=" -mb-32 block bg-gradient-to-r from-gray-200 to-blue-200">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#DED4FF" offset="77.402%" />
                <stop stopColor="#ccc5de" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="96" />
              <circle cx="155" cy="443" r="96" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4  sm:px-6">
          {/* Hero content */}
          <div className="pt-20 pb-12 md:pt-28 md:pb-20">
            {/* Section header */}
            <div className="text-center pb-12 md:pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter -mt-4 mb-11">
                Levelling-Up Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-400">
                  Venture
                </span>
              </h1>
              <div className="max-w-3xl  mt-4 block mx-auto">
                <p className="text-xl text-gray-600 mb-11">
                  Find the region's best startup mentors, and help your team
                  learn, level-up and grow faster. Product-Market Fit? Building
                  Teams? Launching an App? Need Go-To-Market Advice?
                  Growth-Hacking? We've got it all.
                </p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div>
                    <a
                      onClick={() => setRegModalShow(true)}
                      className="btn cursor-pointer text-white rounded-2xl text-sm shadow-sm hover:shadow-md tracking-wide font-bold uppercase px-4 py-3  w-full -mb-2 mt-1 sm:w-auto  bg-gradient-to-r from-blue-400 to-blue-600 hover:from-indigo-400 hover:to-indigo-600 active:bg-blue-500"
                    >
                      Onboard Your Startup Team
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div>
              <div className="relative flex justify-center -mt-1.5 -mb-[150px]">
                <div className="flex flex-col justify-center">
                  <img
                    className="mx-auto shadow-md rounded-lg "
                    src={
                      "https://online.stanford.edu/sites/default/files/inline-images/launch-successful-startup-webinar.jpg"
                    }
                    width="600"
                    height="338"
                    alt="Hero"
                  />
                </div>
                {/* <button
                  className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // setVideoModalOpen(true);
                  }}
                  aria-controls="modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6  text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>

                  <span className="ml-2.5">Sign Up With Your Team</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
