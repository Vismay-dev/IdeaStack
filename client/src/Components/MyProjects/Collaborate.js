import Feed from "./Feed";
import Contact from "./Contact";
import Documents from "./Documents";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

const Collaborate = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <>
      <h2 class="text-center bg-no-repeat bg-cover bg-center font-bold   p-1 ring-offset-4 py-5 pb-4 text-gray-800 top-1  relative mt-7  w-10/12 mx-auto rounded-md ">
        <p class="sm:text-5xl text-4xl mt-1 text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="sm:h-14 sm:w-14 h-10 w-10 relative bottom-[7px] -ml-1 mr-0.5 inline"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>{" "}
          Collaborate
        </p>

        <p class="mt-[4px] text-xl text-gray-800 font-semibold">
          Chat, Upload, Contact
        </p>
      </h2>

      <div
        // data-aos={"fade-up"}
        // data-aos-once="true"
        class=" grid-cols-5 grid-rows-3 grid relative gap-6 space-y-1 top-1  lg:mt-14 sm:mt-12 mt-11 lg:-mb-[205px] md:-mb-[200px] sm:-mb-[190px] -mb-[200px] w-full h-fit xl:px-28 sm:px-12 px-7"
      >
        <Feed />
        <Documents />
        <Contact />
      </div>
    </>
  );
};

export default Collaborate;
