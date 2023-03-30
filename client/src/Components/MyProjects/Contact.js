import React from "react";
import { useEffect, useContext, useState } from "react";
import projectContext from "../../context/projectContext";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import AOS from "aos";
import "aos/dist/aos.css";

// components

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const projectCurr = useContext(projectContext);
  const [proj, setProj] = useState(null);

  useEffect(() => {
    let projSelected = "";
    projSelected = projectCurr.project;

    setProj(projSelected ? projSelected : "");
  }, [projectCurr]);

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/getTeamContacts"
          : "http://localhost:4000/api/project/getTeamContacts",
        {
          token: sessionStorage.getItem("token"),
          projectID: projectCurr.project._id,
        }
      )
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div
      data-aos={"fade-up"}
      data-aos-once="true"
      style={{
        backgroundImage:
          "url(https://www.mysupplychaingroup.com/wp-content/uploads/2015/11/Business-team-world-map-background.png)",
      }}
      class="lg:col-span-2 col-span-5 lg:mt-0 mt-4 lg:mb-0 -mb-9 relative lg:top-0 top-1  block bg-opacity-75 row-span-2 bg-cover lg:h-full min-h-[400px] h-fit bg-no-repeat  bg-gradient-to-br from-blue-300 to-indigo-300 rounded-md shadow-xl"
    >
      <div class="inset-0 bg-gray-900 lg:h-full min-h-[400px] h-fit lg:pb-0 pb-9 bg-opacity-[0.65] pt-4">
        <h3 class="uppercase text-center font-semibold text-gray-100 relative text-3xl">
          Team Contacts
        </h3>
        <hr class="mb-5 w-8/12 border-t-[0.3px] border-gray-100 mx-auto mt-2 relative justify-center"></hr>

        {loading ? (
          <div class="relative mx-auto my-8 mb-10 pb-3 pt-[65px] left-1 text-center block justify-center">
            <ClipLoader color={"#f0f2f7"} loading={loading} size={120} />
          </div>
        ) : (
          proj &&
          contacts &&
          contacts.map((contact, i) => {
            return (
              <>
                <div
                  class={`flex items-center lg:top-0 top-1 text-md justify-center mx-auto relative   bg-gradient-to-r from-indigo-300 to-blue-200 border-b-[1px] py-2.5   border-blue-600`}
                >
                  <img
                    class="hidden object-cover w-10 h-10 shadow-md mx-2 relative right-1 rounded-full sm:block"
                    src={
                      projectCurr.project &&
                      projectCurr.project.team[i] &&
                      projectCurr.project.team[i].profilePic
                        ? projectCurr.project.team[i].profilePic
                        : proj.team[i] && proj.team[i].pic
                        ? proj.team[i].pic
                        : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                    }
                    alt="avatar"
                  />
                  <a class="font-bold text-gray-700 mr-6  relative cursor-pointer ">
                    {proj ? proj.team[i].name : ""}
                    {i == 0 ? " (Admin)" : ""}

                    <svg
                      data-tip={contact}
                      onClick={() => {
                        window.open("mailto:" + contact);
                      }}
                      onMouseOver={() => setShowToolTip(true)}
                      onMouseLeave={() => setShowToolTip(false)}
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 font-semibold hover:cursor-pointer text-xl absolute top-[0.5px] -right-9  text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <ReactTooltip />
                  </a>
                </div>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Contact;
