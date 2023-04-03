import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import RegModal from "../Modals/RegModal";
import axios from "axios";

const TeamOnboarding = () => {
  const location = useLocation();
  const [projectAdmin, setProjectAdmin] = useState();
  const [userName, setUserName] = useState();
  const [projectId, setProjectId] = useState();
  const [project, setProject] = useState();
  const [regModalShow, setRegModalShow] = useState(false);

  const closeFuncReg = () => {
    setRegModalShow(false);
  };

  useEffect(() => {
    const locationArray = location.pathname.split("/");
    setProjectId(locationArray[locationArray.length - 1].replace("%20", " "));
    let projIdCopy = locationArray[locationArray.length - 1].replace(
      "%20",
      " "
    );
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getProject"
          : "http://localhost:4000/api/user/getProject",
        { projId: projIdCopy }
      )
      .then((res) => {
        setProject(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setProjectAdmin(
      locationArray[locationArray.length - 2].replace("%20", " ")
    );
    setUserName(locationArray[locationArray.length - 3].replace("%20", " "));
  }, []);

  return (
    <>
      {regModalShow ? (
        <RegModal
          close={closeFuncReg}
          onboardFullName={userName}
          project={project ? project.name : ""}
        />
      ) : (
        ""
      )}{" "}
      <div className="max-w-6xl mx-auto px-4 -mb-36  sm:px-6">
        {/* Hero content */}
        <div className="pt-20 pb-12 md:pt-24 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="sm:text-5xl text-4xl md:text-6xl font-extrabold leading-tighter tracking-tighter -mt-4 mb-11">
              Welcome,{" "}
              <span className="bg-clip-text ml-3.5 text-transparent bg-gradient-to-r from-blue-500 to-indigo-400">
                {" " + (userName && userName)}
              </span>
            </h1>
            <div className="max-w-3xl  mt-4 block mx-auto">
              <p className="text-xl text-gray-600 mb-11">
                You were invited by admin{" "}
                <strong>{projectAdmin && projectAdmin}</strong> to register on
                Ideastack.org as part of your venture (
                {project ? project.name : ""}). This registration has been
                booked exclusively for you. There are limited seats available
                for IdeaStack registration, so sign-up soon!
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div>
                  <a
                    onClick={() => {
                      setRegModalShow(true);
                    }}
                    className="btn cursor-pointer text-white rounded-2xl text-sm shadow-sm hover:shadow-md tracking-wide font-bold uppercase px-4 py-3  w-full -mb-2 mt-1 sm:w-auto  bg-gradient-to-r from-blue-400 to-blue-600 hover:from-indigo-400 hover:to-indigo-600 active:bg-blue-500"
                  >
                    JOIN IDEASTACK.ORG
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div className="relative flex justify-center -mt-1.5 -mb-[140px] sm:-mb-[110px] md:-mb-[150px]">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamOnboarding;
