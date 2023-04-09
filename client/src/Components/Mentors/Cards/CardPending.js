import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiCash } from "react-icons/gi";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

// components

export default function CardSocialTraffic() {
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState([]);
  const location = useRouter();

  useEffect(() => {
    setCardData([]);
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getCommonCourseTeammates"
          : "http://localhost:4000/api/user/getCommonCourseTeammates",
        { token: sessionStorage.getItem("token") }
      )
      .then((res) => {
        setCardData(res.data);
        console.log(cardData);
        setLoading(false);
      });
  }, [location.pathname]);

  return (
    <>
      <div className="relative flex flex-col xl:mt-0 xl:mb-6 -mt-9 mb-10  min-w-0 break-words  h-[380px] bg-white w-full shadow-lg rounded">
        <div
          style={{
            backgroundImage:
              "url(https://www.vapulus.com/en/wp-content/uploads/2021/02/challenge-accepting-online-payments-technical-issue-1024x768-1.png)",
          }}
          className="rounded-t  bg-cover mb-0 px-1 py-3 border-0"
        >
          <div className="flex flex-wrap items-center">
            <div className="relative w-full ml-3 left-1 py-[5px]  max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blue-700 text-md text-blueGray-700">
                <GiCash class="text-xl  text-white bottom-0.5 relative inline" />{" "}
                Team Participation in Courses
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full  h-[320px] overflow-scroll">
          {/* Projects table */}
          <table className="items-center w-full ">
            {loading ? (
              <div class="relative mx-auto my-8 mb-14 bottom-8 pb-3 pt-[21%] border-t-[1px] border-gray-300 w-full text-center items-center block justify-center">
                <ClipLoader color={"#0b0bbf"} loading={loading} size={80} />
              </div>
            ) : (
              <>
                <thead class="sticky top-0  z-40 bg-white   shadow-sm  pb-1 ">
                  <tr>
                    <th className="px-10 relative mx-auto bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Course
                    </th>
                    <th className="-px-2 mx-auto relative bg-blueGray-50 text-blue-700 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Team-mate Attended
                    </th>
                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                  </tr>
                </thead>

                <tbody class=" relative">
                  {cardData &&
                    cardData.length > 0 &&
                    cardData.map((elem, i) => {
                      return (
                        <tr key={i}>
                          <th className="border-t-0 relative left-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 py-3 text-left">
                            {elem.courseName}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <img
                              src={
                                elem.teamMatePic
                                  ? elem.teamMatePic
                                  : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                              }
                              class="inline mr-3 w-[30px] rounded-full"
                            ></img>{" "}
                            <span>{elem.teamMateName}</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
