import { useEffect, useState, useMemo, useContext, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";
import Tooltip from "react-power-tooltip";
import AOS from "aos";
import "aos/dist/aos.css";

import Dropdown from "../MyProjects/Dropdown";

import {
  MdDeveloperMode,
  MdWeb,
  MdOutlineCastForEducation,
  MdHealthAndSafety,
} from "react-icons/md";
import {
  GiVintageRobot,
  GiPowerGenerator,
  GiArtificialIntelligence,
} from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { SiHiveBlockchain } from "react-icons/si";
import { CgCodeClimate } from "react-icons/cg";
import { BsCheckAll } from "react-icons/bs";

const CreateProjectModal = (props) => {
  let categories = [
    {
      name: "Robotics",
      icon: (
        <GiVintageRobot class="inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]" />
      ),
      id: 1,
    },
    {
      name: "Environment",
      icon: (
        <CgCodeClimate class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 2,
    },
    {
      name: "Energy",
      icon: (
        <GiPowerGenerator class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 3,
    },
    {
      name: "Web Development",
      icon: (
        <MdWeb class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 4,
    },
    {
      name: "Mobile App Development",
      icon: (
        <MdDeveloperMode class="inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]" />
      ),
      id: 5,
    },
    {
      name: "EdTech (Educational Technology)",
      icon: (
        <MdOutlineCastForEducation class="inline mr-[4px] ml-[0.5px] w-[17px] bottom-[0.85px] relative h-[17px]" />
      ),
      id: 6,
    },
    {
      name: "Healthcare",
      icon: (
        <MdHealthAndSafety class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 7,
    },
    {
      name: "AI",
      icon: (
        <GiArtificialIntelligence class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 8,
    },
    {
      name: "Blockchain",
      icon: (
        <SiHiveBlockchain class="inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]" />
      ),
      id: 9,
    },
    {
      name: "Logistics (Transport and Storage of Goods)",
      icon: (
        <GrDeliver class="inline mr-[4.6px]  left-[1px] ml-[0.5px] w-[17px] bottom-[0.85px] relative h-[17px]" />
      ),
      id: 10,
    },
    {
      name: "Other (Unspecified Here/Combination of Field)",
      icon: (
        <BsCheckAll class="inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]" />
      ),
      id: 11,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const myRef = useRef();
  const currentUser = useContext(userContext);

  const [user, setUser] = useState(currentUser ? currentUser.user : false);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const [project, setProject] = useState({});

  const history = useHistory();

  const projPicUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("token", sessionStorage.getItem("token"));
    setImage(URL.createObjectURL(e.target.files[0]));

    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/uploadPic"
          : "http://localhost:4000/api/user/uploadPic",
        data
      )
      .then((res) => {
        console.log(res.data);
        setProject({
          ...project,
          projPic: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!myRef.current || myRef.current.contains(event.target)) {
          return;
        }
        props.close();
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [myRef, () => props.close()]
  );

  const removeProjPic = () => {
    setImage("");
    console.log(image);
  };

  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(image);

    if (image === "" || image === null) {
      setError("Please upload a project cover image");
      return;
    } else {
      setError("");
    }

    //send project data to server
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/createProject"
          : "http://localhost:4000/api/user/createProject",
        { project, token: sessionStorage.getItem("token") }
      )
      .then((res) => {
        console.log(res.data);
        let projects = currentUser.user.projects
          ? currentUser.user.projects
          : [];
        projects.push(res.data);
        currentUser.setUser({
          ...currentUser.user,
          projects: projects,
        });
        props.close();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const changeHandler = (e) => {
    console.log(e.target.name);
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      class="fixed z-[100] inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal panel, show/hide based on modal state. */}

        <div
          ref={myRef}
          data-aos={"fade-up"}
          data-aos-once="true"
          class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle md:w-10/12 sm:w-11/12 w-[95%]"
        >
          <div class="bg-white px-4 pt-4 pb-2 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-center">
              <div class=" text-center w-full sm:mt-0 sm:ml-4 ml-3 sm:text-left">
                <div>
                  <form class="w-full mt-1 pt-1" onSubmit={submitHandler}>
                    <div class="relative z-0 mb-3 w-full group">
                      <input
                        type="text"
                        name="name"
                        onChange={changeHandler}
                        id="floating_repeat_name"
                        class="block mt-3  relative mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required={true}
                        placeholder=" "
                      />
                      <label
                        for="floating_repeat_name"
                        class="absolute text-sm left-0 text-gray-500  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Project Name
                      </label>
                    </div>
                    <div class="grid xl:grid-cols-2 mb-3.5 xl:gap-6">
                      <div class="relative z-0 mb-11 w-full group">
                        <select
                          placeholder="Primary Category"
                          name="category"
                          onChange={changeHandler}
                          type="select"
                          defaultValue={""}
                          class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          required={true}
                        >
                          <option value={""} defaultChecked disabled>
                            Category
                          </option>
                          {categories.map((cat) => {
                            return (
                              <option value={cat.name}>
                                {cat.id}. {cat.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="relative z-0 mb-10 md:mt-0 -mt-4 w-full group">
                        <input
                          type="number"
                          name="maxCap"
                          onChange={changeHandler}
                          id="maxCap"
                          class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required={true}
                        />
                        <label
                          for="maxCap"
                          class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Max. Team Capacity
                        </label>
                      </div>
                    </div>

                    <div class="relative z-0 mb-10 md:mt-0 w-full group">
                      <textarea
                        type="number"
                        min={140}
                        max={200}
                        name="problem"
                        onChange={changeHandler}
                        id="problem"
                        class="block top-3 relative  w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer h-32 p-2  rounded-md"
                        placeholder=" "
                        required={true}
                      />
                      <label class="absolute text-sm left-0 text-gray-500 duration-300 transform -top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  ">
                        What Problem Are You Solving?
                      </label>
                    </div>

                    <div class="grid xl:grid-cols-2 mb-3.5 xl:gap-6">
                      <div
                        class={`relative z-0 mb-11 w-full group bg-gradient-to-br from-blue-100 rounded-sm to-indigo-300 shadow-md top-0.5 align-middle ${
                          image !== null ? "xl:p-10 pt-2 pb-16" : "p-10 px-3"
                        } `}
                      >
                        <div className="relative scale-75 p-3 ">
                          <input
                            ref={inputRef}
                            onChange={projPicUpload}
                            type="file"
                            style={{ display: "none" }}
                          />

                          <ul class="space-x-2 space-y-4 mx-auto relative mt-20 text-center ">
                            {image === "" || image === null ? (
                              <>
                                {" "}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    inputRef.current.click();
                                  }}
                                  class="font-semibold sm:text-2xl text-xl p-3 xl:mt-8 -mt-12 xl:mb-0 mb-20 shadow-md left-1  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600"
                                >
                                  Upload Project Cover Image
                                </button>
                                <br />
                              </>
                            ) : (
                              <>
                                {" "}
                                <button
                                  class="font-semibold  p-3 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-4 sm:text-2xl text-xl xl:-mt-1 -mt-64  -ml-3 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    inputRef.current.click();
                                  }}
                                >
                                  Change Image
                                </button>{" "}
                                <br />
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeProjPic();
                                  }}
                                  class="font-semibold sm:text-2xl text-xl -ml-3 p-3 xl:mb-0 mb-20 shadow-md right-2.5 relative  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600"
                                >
                                  Remove Image
                                </button>{" "}
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div class="relative border-2 h-96 p-8 border-dashed rounded-md border-gray-700 z-0 mb-10 w-full group">
                        <img
                          class=" relative w-full h-full object-contain mx-auto justify-center align-middle"
                          src={image || image !== "" ? image : ""}
                        ></img>
                      </div>
                    </div>

                    {/* <div class="grid xl:grid-cols-2 xl:gap-6">
<div class="relative z-0 mb-8 w-full group">
<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required=""/>
<label for="floating_phone" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
</div>
<div class="relative z-0 mb-8 w-full group">
<input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required=""/>
<label for="floating_company" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
</div>
</div> */}

                    {error !== "" ? (
                      <p class="text-red-500 text-center text-lg font-semibold -bottom-1 mb-12 relative">
                        {error}
                      </p>
                    ) : (
                      ""
                    )}
                    <button
                      type="submit"
                      class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-lg shadow-md w-full sm:w-auto sm:px-32 sm:mt-3 mt-1 py-2 mx-auto block text-center  "
                    >
                      Submit
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        props.close();
                      }}
                      class="text-black border-2 border-gray-700 bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-lg shadow-md w-full sm:w-auto sm:px-32 mt-2 sm:mb-3 mb-6 py-2 mx-auto block text-center  "
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-3 mt-4 shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
            <button
              onClick={props.close}
              type="button"
              class="sm:-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
