import React from "react";
import { useEffect, useContext, useState } from "react";
import projectContext from "../../../context/projectContext";
import { RiTeamFill } from "react-icons/ri";
import LeaveModal from "../../Modals/LeaveModal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import userContext from "../../../context/userContext";

export default function CardTeam(props) {
  const projectCurr = useContext(projectContext);
  const [proj, setProj] = useState("");
  const user = useContext(userContext).user;

  const location = useLocation();

  // useEffect(() => {
  //   if (sessionStorage.getItem("token") !== null) {
  //     axios
  //       .post(
  //         process.env.NODE_ENV === "production"
  //           ? "https://ideastack.herokuapp.com/api/user/getProject"
  //           : "http://localhost:4000/api/user/getProject",
  //         { projId: user.projectId, token: sessionStorage.getItem("token") }
  //       )
  //       .then((res) => {
  //         projectCurr.setProject(res.data);
  //         let projSelected = res.data;
  //         setProj(projSelected ? projSelected : "");
  //       });
  //   }
  // }, []);

  return (
    <>
      <div className="relative border-[1px] border-blue-600 min-h-[460px] h-fit lg:h-[480px] xl:h-[530px] flex flex-col min-w-0 break-words  w-full lg:mb-4 mb-0 bg-gradient-to-r from-white to-indigo-200 shadow-lg rounded-md">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 py-2 -mt-5 max-w-full flex-grow flex-1">
              <h3 className="font-bold relative text-center top-2 my-2 mb-[9px] text-black text-lg text-blueGray-700">
                <p>
                  <RiTeamFill class="text-xl inline bottom-[3px] mr-0.5  relative" />{" "}
                  Team Members{" "}
                </p>
                <p class="text-gray-700 text-sm left-1 top-[1.5px] relative font-medium">
                  (Maximum Capacity : {projectCurr.project.maxCap})
                </p>
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <hr className="border-2-b mb-1 border-blue-600  w-full" />

          {/* Projects table */}
          <table className="items-center w-full mb-2 sm:h-[14.4rem] h-[11.6rem]   bg-transparent border-collapse">
            <tbody class="overflow-scroll">
              {projectCurr.project &&
                projectCurr.project.team &&
                projectCurr.project.team.map((teamMember, i) => {
                  return (
                    <>
                      <tr
                        class={`block relative ${
                          projectCurr.project.team.length === 2 && i === 1
                            ? ""
                            : ""
                        }`}
                      >
                        <div
                          class={`flex items-center text-md justify-center mx-auto relative bottom-1 my-0  bg-gradient-to-r from-indigo-200 to-green-100 border-b-[1px] py-4 pb-5 border-blue-600`}
                        >
                          <img
                            onClick={() => {
                              console.log(teamMember);
                              localStorage.setItem(
                                "viewToken",
                                teamMember.email
                              );
                              if (
                                teamMember.onboarded &&
                                teamMember.email !== user.email
                              ) {
                                window.open(
                                  process.env.NODE_ENV === "production"
                                    ? "https://ideastack.org/viewProfile"
                                    : "http://localhost:3000/viewProfile",
                                  "_blank"
                                );
                              }
                            }}
                            class={`hidden ${
                              teamMember.onboarded &&
                              teamMember.email !== user.email
                                ? "cursor-pointer"
                                : ""
                            } object-cover w-10 h-10 shadow-md mx-2 relative right-1 rounded-full sm:block`}
                            src={
                              teamMember.profilePic
                                ? teamMember.profilePic
                                : teamMember.pic
                                ? teamMember.pic
                                : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                            }
                            alt="avatar"
                          />
                          <a
                            onClick={() => {
                              console.log(teamMember);
                              localStorage.setItem(
                                "viewToken",
                                teamMember.email
                              );
                              if (
                                teamMember.onboarded &&
                                teamMember.email !== user.email
                              ) {
                                window.open(
                                  process.env.NODE_ENV === "production"
                                    ? "https://ideastack.org/viewProfile"
                                    : "http://localhost:3000/viewProfile",
                                  "_blank"
                                );
                              }
                            }}
                            class={`font-bold text-gray-700 mr-6  relative ${
                              teamMember.onboarded &&
                              teamMember.email !== user.email
                                ? "cursor-pointer"
                                : ""
                            }`}
                          >
                            {projectCurr.project ? teamMember.name : ""}
                            {i == 0 ? " (Admin)" : ""}
                          </a>
                          {/* {i !== 0 &&
                          JSON.stringify(user._id) ===
                            JSON.stringify(proj.admin.id) ? (
                            <svg
                              onClick={() => {
                                props.triggerRemover(teamMember);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-7 w-7 cursor-pointer bg-red-600 rounded-full shadow-sm hover:shadow-lg p-1 right-4 absolute text-white inline  "
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                              />
                            </svg>
                          ) : (
                            ""
                          )} */}
                        </div>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
