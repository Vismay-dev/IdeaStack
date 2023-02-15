import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import userContext from "../../../context/userContext";

// components

export default function CardPageVisits() {
  const [mentorshipDetails, setMentorshipDetails] = useState();
  const [loading, setLoading] = useState(true);
  const user = useContext(userContext).user;
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getMentorshipPackages"
          : "http://localhost:4000/api/user/getMentorshipPackages",
        {
          token: sessionStorage.getItem("token"),
          projectID: sessionStorage.getItem("managing"),
        }
      )
      .then((res) => {
        setMentorshipDetails(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white  h-[380px]  w-full mb-6 shadow-lg rounded">
        <div
          style={{
            backgroundImage:
              "url(https://media.istockphoto.com/photos/digital-cyberspace-with-particles-and-digital-data-network-high-picture-id1302189748?b=1&k=20&m=1302189748&s=170667a&w=0&h=s0o2dhTh40lrWLPt6rg54S0jCUywkr6h04rDdfStMq8=)",
          }}
          className="rounded-t px-4 py-3 border-0"
        >
          <div className="flex flex-wrap  items-center">
            <div className="relative sm:w-full px-2  py-1.5 flex-grow flex-1">
              <h3 className="font-semibold text-base text-white">
                <FaChalkboardTeacher class="text-xl mr-1 bottom-0.5 relative inline" />{" "}
                Discussion Sessions - Info
              </h3>
            </div>
            {/* <div className="relative w-full px-2 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-sm shadow-md top-0.5 relative font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className="block w-full  h-[320px] overflow-scroll pb-0 ">
          {/* Projects table */}
          <table className="items-center  w-full bg-white border-collapse">
            <thead class="sticky top-0  z-40 bg-white   shadow-sm  pb-1 ">
              <tr>
                <th className="px-6 bg-white lg:pr-6 md:pr-8 pr-7 relative align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Course
                </th>
                <th className="align-middle lg:pr-4 md:pr-6 pr-5 relative bg-white border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  No. of Sessions Held
                </th>
                <th className="text-blue-700 lg:pr-6 md:pr-8 pr-7 relative bg-white align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Sessions Attended
                </th>
                <th className="align-middle lg:mr-0 md:pr-4 pr-7 relative bg-white  border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Minutes Attended
                </th>
              </tr>
            </thead>

            {loading ? (
              <div class="absolute text-center sm:top-[60%] top-[60%] ml-auto mr-auto left-0 sm:right-6 right-2.5 translate-y-[-50%] align-middle">
                <ClipLoader color={"#0b0bbf"} loading={loading} size={60} />
              </div>
            ) : mentorshipDetails && mentorshipDetails.length > 0 ? (
              <tbody class="z-30">
                {mentorshipDetails.map((mentor) => {
                  return (
                    <tr class="relative top-[3px]">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4  text-left">
                        {mentor.name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap  p-4">
                        {mentor.sessionsHeld}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {mentor.paymentPending}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <i
                          className={`fas ${
                            mentor.paymentPending === 0
                              ? "fa-arrow-up text-emerald-500"
                              : mentor.paymentMade > mentor.paymentPending
                              ? "fa-arrow-right text-yellow-600"
                              : "fa-arrow-down text-red-500"
                          }  mr-4`}
                        ></i>
                        {Number(mentor.paymentMade)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <h3 class="absolute sm:text-2xl text-xl text-center sm:top-[55%] top-[57.5%] ml-auto mr-auto left-0 sm:right-6 right-2.5 translate-y-[-50%] align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class=" sm:w-7 sm:h-7 w-6 h-6 md:top-1 top-[1px] relative inline text-indigo-600 underline "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>{" "}
                <p class="inline relative ml-0.5 top-[6px] underline font-semibold">
                  No Sessions Conducted..
                </p>
              </h3>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
