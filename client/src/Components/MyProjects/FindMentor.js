import { useRouter } from "next/router";

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
            <svg
              onClick={() =>
                history.push("/myprojects/manageproject/mentorship/browse")
              }
              class="h-[100px] w-24 bg-blue-700 text-white p-4 rounded-md shadow-sm active:shadow-sm hover:shadow-xl cursor-pointer my-5 mt-6  block mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  fill="#bfbfbf"
                  d="M33,47H19V43.46a3,3,0,0,1,2.41-2.94C24.66,39.87,23.2,40,28,40l2.59.52A3,3,0,0,1,33,43.46Z"
                  class="colorbfbfbf svgShape"
                />
                <path
                  fill="#bfbfbf"
                  d="M26,40a4,4,0,0,1-4-4V35a4,4,0,0,1,8,0v1A4,4,0,0,1,26,40Z"
                  class="colorbfbfbf svgShape"
                />
                <path
                  fill="#424242"
                  d="M44.78,39.54l-1.07-.22A5.55,5.55,0,0,0,45,35a5,5,0,0,0-10,0,5.49,5.49,0,0,0,1.29,4.32C35,39.58,34,39.67,33,40.83a5,5,0,0,0-3.29-1.51A5.55,5.55,0,0,0,31,35a5,5,0,0,0-10,0,5.49,5.49,0,0,0,1.29,4.32C21,39.58,20,39.67,19,40.83a5,5,0,0,0-3.29-1.51A5.55,5.55,0,0,0,17,35,5,5,0,0,0,7,35a5.49,5.49,0,0,0,1.29,4.32l-1.07.22A4,4,0,0,0,4,43.46V47a1,1,0,0,0,1,1H47a1,1,0,0,0,1-1V43.46A4,4,0,0,0,44.78,39.54ZM37,35a3,3,0,0,1,6,0v1a3,3,0,0,1-6,0ZM23,35a3,3,0,0,1,6,0v1a3,3,0,0,1-6,0ZM9,35a3,3,0,0,1,6,0v1a3,3,0,0,1-6,0ZM6,43.46a2,2,0,0,1,1.61-2L10.1,41c4.62,0,3.12-.14,6.29.5a2,2,0,0,1,1.61,2V46H6Zm14,0a2,2,0,0,1,1.61-2L24.1,41c4.62,0,3.12-.14,6.29.5a2,2,0,0,1,1.61,2V46H20ZM46,46H34V43.46a2,2,0,0,1,1.61-2L38.1,41c4.62,0,3.12-.14,6.29.5a2,2,0,0,1,1.61,2Z"
                  class="color424242 svgShape"
                />
                <path
                  fill="#0c0c12"
                  d="M16 15.46V20H0V15.46a3 3 0 0 1 2.41-2.94l1-.21a7 7 0 0 0 9.1 0l1 .21A3 3 0 0 1 16 15.46zM11.54 1.46A5 5 0 0 0 3.33 3.2C2.91 4.33 3 5.07 3 7A5 5 0 0 0 13 7C13 4.85 13.22 3.16 11.54 1.46zM11 7A3 3 0 0 1 5 7a9.58 9.58 0 0 1 .13-2.86A12.9 12.9 0 0 0 11 5.23z"
                  class="colorfc6459 svgShape"
                />
                <path
                  fill="#bfbfbf"
                  d="M27.29 24.29l-.29.3V18a3 3 0 0 0-3-3H19a1 1 0 0 0 0 2h5a1 1 0 0 1 1 1v6.59l-.29-.3a1 1 0 0 0-1.42 1.42c2.09 2.08 2.06 2.1 2.33 2.21a.92.92 0 0 0 .76 0c.25-.1.13 0 2.33-2.21a1 1 0 0 0-1.42-1.42zM13.29 24.29l-.29.3V23a1 1 0 0 0-2 0v1.59l-.29-.3a1 1 0 0 0-1.42 1.42c2.09 2.08 2.06 2.1 2.33 2.21a.92.92 0 0 0 .76 0c.25-.1.13 0 2.33-2.21a1 1 0 0 0-1.42-1.42zM42.71 24.29a1 1 0 0 0-1.42 0l-.29.3V11a5 5 0 0 0-5-5H19a1 1 0 0 0 0 2H36a3 3 0 0 1 3 3V24.59l-.29-.3a1 1 0 0 0-1.42 1.42C39.44 27.85 39.46 28 40 28s.58-.16 2.71-2.29A1 1 0 0 0 42.71 24.29z"
                  class="colorbfbfbf svgShape"
                />
              </svg>
            </svg>

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
