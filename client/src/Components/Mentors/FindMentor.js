import { useRouter } from "next/router";
import { MdPersonSearch } from "react-icons/md";

const FindMentor = () => {
  const history = useRouter();

  return (
    <>
      <div
        class={`rounded-md  mb-8 bg-cover shadow-lg bg-gray-50 h-[380px] border-[0.005px] border-blue-600   overflow-hidden`}
      >
        <div
          data-aos={"fade-up"}
          data-aos-once="true"
          data-aos-delay="150"
          class=" h-full z-10 "
        >
          <div class="h-28 pt-2.5 ">
            <p className="text-center top-2 text-xl font-semibold relative">
              Find an Industry Mentor:
            </p>
            <br />

            <h3 class=" text-center mx-auto mt-1 mb-2.5  text-base px-6 xl:w-full md:w-[500px] sm:w-[400px] w-[320px]">
              Browse Available{" "}
              <span class="text-blue-700">Industry Experts</span> and Seek{" "}
              <span class="text-blue-700">Mentorship</span>...
            </h3>
            <MdPersonSearch
              onClick={() => {
                history.push("/mentors/bookworkshops");
              }}
              class="h-24 w-24 bg-blue-700 text-white p-4 pr-[12px] rounded-md shadow-md active:shadow-sm hover:shadow-xl cursor-pointer my-7 mb-5  block mx-auto"
            />

            <h1 class="  uppercase  text-base mx-auto relative block right-[8px]  py-2.5 sm:mt-3 -mt-1 -mb-4 text-black text-center font-semibold">
              Browse Industry Experts
            </h1>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-center relative mx-auto block top-[22px] text-indigo-600 bg-blue-200 border-2 border-indigo-800 rounded-full p-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindMentor;
