import { useEffect, useContext, useState, useRef } from "react";
import userContext from "../../context/userContext";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
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

import { useHistory } from "react-router-dom";

const Onboarding = () => {
  const [onboardingLoader, setOnboardingLoader] = useState(false);
  const [project, setProject] = useState({});
  const currentUser = useContext(userContext);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const [userData, setUserData] = useState({
    age: null,
    city: "",
    university: "",
    country: "",
  });

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

  const [imageLoading, setImageLoading] = useState(false);
  const [team, setTeam] = useState(0);

  const projPicUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("token", sessionStorage.getItem("token"));
    setImage(URL.createObjectURL(e.target.files[0]));
    setError(null);
    setImageLoading(true);

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

        setImageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setImageLoading(false);
      });
  };

  const history = useHistory();

  const removeProjPic = () => {
    setImage(null);
    setProject({
      ...project,
      projPic: null,
    });
    console.log(image);
  };

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentUser.user.initializationStep === "sd") {
      setProgress(33);
    } else if (currentUser.user.initializationStep === "otm") {
      setProgress(66);
    }
  }, [currentUser.user]);

  console.log(team);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser.user.initializationStep === "pi") {
      let userData = {
        ...currentUser.user,
        age: document.getElementById("age").value,
        city: document.getElementById("city").value,
        university: document.getElementById("university").value,
        country: document.getElementById("country").value,
        initializationStep: "sd",
        initialized:
          currentUser.user && currentUser.user.isAdditionalMember
            ? true
            : false,
      };
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/updateUser"
            : "http://localhost:4000/api/user/updateUser",
          {
            user: userData,
            token: sessionStorage.getItem("token"),
            flagTeamOnboarding:
              currentUser.user && currentUser.user.isAdditionalMember
                ? true
                : false,
          }
        )
        .then((res) => {
          if (
            currentUser.user &&
            currentUser.user.isAdditionalMember &&
            res.data.initialized
          ) {
            history.push("/profile");
            currentUser.setUser(res.data);
          } else {
            currentUser.setUser(res.data);

            setProgress(33);
          }
          setTimeout(() => {
            setLoading(false);
          }, 1200);
        })
        .catch((err) => {
          console.log(err.response ? err.response.data : null);
          setLoading(false);
        });
    } else if (currentUser.user.initializationStep === "sd") {
      if (image === "" || image === null) {
        setError("Please upload a project cover image");
        setLoading(false);
        return;
      } else {
        setError("");
      }

      let userData = {
        ...currentUser.user,
        initializationStep: "otm",
      };

      axios
        .post(
          process.env.NODE_ENV === "production"
            ? "https://ideastack.herokuapp.com/api/user/createProject"
            : "http://localhost:4000/api/user/createProject",
          { project, token: sessionStorage.getItem("token") }
        )
        .then((res) => {
          currentUser.setUser(res.data);
          console.log(res.data);
          setProgress(66);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    } else if (currentUser.user.initializationStep === "otm") {
      let chk = true;
      if (team && team.length > 0) {
        for (let i = 0; i < team.length; i++) {
          if (String(team[i].email) === String(currentUser.user.email)) {
            setError("Do not include your own account.");
            chk = false;
            setLoading(false);
            return;
            break;
          }
        }
        for (let i = 0; i < team.length; i++) {
          if (
            String(team[i].name) ===
            String(currentUser.user.firstName + " " + currentUser.user.lastName)
          ) {
            setError("Do not include your own name.");
            chk = false;
            setLoading(false);
            return;
            break;
          }
        }
      }
      if (
        !chk &&
        team &&
        team.map((member) => member.email).includes(currentUser.user.email)
      ) {
        setLoading(false);
        return;
      } else {
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/onboardTeam"
              : "http://localhost:4000/api/user/onboardTeam",
            { team, token: sessionStorage.getItem("token") }
          )
          .then((res) => {
            setLoading(false);
            setProgress(100);
            setOnboardingLoader(true);
            setTimeout(() => {
              setOnboardingLoader(false);
              currentUser.setUser({ ...res.data, initialized: true });
            }, 2500);
          })
          .catch((err) => {
            console.log(err.response);
            setLoading(false);
          });
      }
    }
  };

  const changeHandler = (e) => {
    console.log(e.target.name);
    setError(null);
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const [seatsNum, setSeatsNum] = useState(0);
  const numChangeHandler = (e) => {
    setSeatsNum(e.target.value);
    setTeam(Array.apply(null, { length: e.target.value }));
  };

  const teamChangeHandler = (e) => {
    let teamCopy = team;

    let index = e.target.name.substring(e.target.name.length - 1);

    let obj = teamCopy[index];

    setError();

    if (obj == null) {
      obj = {
        name: "",
        email: "",
        role: "",
      };
    }

    obj[String(e.target.name.substring(0, e.target.name.length - 1))] =
      e.target.value;
    teamCopy[index] = obj;
    setTeam(teamCopy);
  };

  return (
    <>
      {currentUser.user && currentUser.user.isAdditionalMember ? (
        <div class="invisible block">- </div>
      ) : (
        <>
          <div
            class={`block mx-auto bg-gray-200 transition-all duration-300 ease-in-out delay-150 relative top-[65px] shadow-md  rounded-full  ${
              onboardingLoader
                ? "h-5 sm:w-[600px] w-[300px] top-[285px] mb-[480px] "
                : "h-2.5 sm:w-[400px] w-[250px]"
            }  `}
          >
            <div
              class={`${
                onboardingLoader ? "bg-[#36d7b7] h-5" : "bg-indigo-700 h-2.5 "
              }  rounded-full transition-[width,color] duration-600 ease-in delay-300 w-[${
                onboardingLoader ? "100" : progress
              }%]`}
            ></div>
          </div>

          <ol
            class={`${
              onboardingLoader ? "hidden" : "flex"
            } uppercase mt-[100px] -mb-[70px] items-center w-fit mx-auto p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border
       border-gray-200 rounded-lg shadow-md md:text-base  relative  md:p-4 md:px-5 md:space-x-4`}
          >
            <li
              class={`flex items-center sm:text-sm text-xs ${
                currentUser.user.initializationStep === "pi" ||
                !currentUser.user.initializationStep
                  ? "text-indigo-600 font-semibold"
                  : currentUser.user.initializationStep === "sd" ||
                    currentUser.user.initializationStep === "otm"
                  ? "text-green-800 font-semibold"
                  : ""
              } `}
            >
              <span
                class={`flex  items-center justify-center w-5 h-5 mr-2 sm:text-sm text-xs border ${
                  currentUser.user.initializationStep === "pi" ||
                  !currentUser.user.initializationStep
                    ? "border-indigo-600"
                    : currentUser.user.initializationStep === "sd" ||
                      currentUser.user.initializationStep === "otm"
                    ? "border-green-800"
                    : ""
                }  rounded-full shrink-0`}
              >
                1
              </span>
              Personal <span class="hidden md:inline-flex md:ml-1">Info</span>
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 md:ml-[16px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                ></path>
              </svg>
            </li>
            <li
              class={`flex items-center sm:text-sm text-xs ${
                currentUser.user.initializationStep === "sd"
                  ? "text-indigo-600 font-semibold"
                  : currentUser.user.initializationStep === "otm"
                  ? "text-green-800 font-semibold"
                  : ""
              }`}
            >
              <span
                class={`flex items-center justify-center w-5 h-5 mr-2 sm:text-sm text-xs border ${
                  currentUser.user.initializationStep === "sd"
                    ? "border-indigo-600"
                    : currentUser.user.initializationStep === "otm"
                    ? "border-green-800"
                    : ""
                } rounded-full shrink-0 `}
              >
                2
              </span>
              Startup <span class="hidden sm:inline-flex">/Venture</span>{" "}
              <span class="hidden md:inline-flex md:ml-1">Details</span>
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 md:ml-[16px] -mr-[1px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                ></path>
              </svg>
            </li>
            <li
              class={`flex items-center sm:text-sm text-xs ${
                currentUser.user.initializationStep === "otm"
                  ? "text-indigo-600 font-semibold"
                  : ""
              }`}
            >
              <span
                class={`flex items-center sm:text-sm text-xs justify-center w-5 h-5 mr-2  border  ${
                  currentUser.user.initializationStep === "otm"
                    ? "border-indigo-600"
                    : ""
                } rounded-full shrink-0 `}
              >
                3
              </span>
              Onboard <span class="hidden sm:inline-flex sm:ml-1">Team</span>{" "}
              <span class="hidden md:inline-flex md:ml-1"> Members</span>
            </li>
          </ol>
        </>
      )}

      {onboardingLoader ? (
        <></>
      ) : loading ? (
        <div class=" mx-auto block w-fit text-center mt-[235px] -mb-[60px]">
          <ClipLoader color={"#0b0bbf"} loading={loading} size={90} />
        </div>
      ) : (
        <form id="regForm" onSubmit={handleSubmit}>
          <>
            <div
              class={`${
                currentUser.user && currentUser.user.isAdditionalMember
                  ? "mt-[100px] grid grid-cols-6 lg:w-[800px] md:w-[600px] sm:w-[500px] w-[300px] gap-6"
                  : currentUser.user.initializationStep === "pi"
                  ? "grid grid-cols-6 mt-[140px] gap-6 lg:w-[800px] md:w-[600px] sm:w-[500px] w-[300px]"
                  : "block transform mt-[140px] transition-all sm:align-middle lg:w-[950px] w-[90%] align-bottom"
              }    mx-auto  mb-1 `}
            >
              {currentUser.user.initializationStep === "pi" ||
              !currentUser.user.initializationStep ? (
                <>
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="age"
                      class="block text-sm font-semibold left-0.5 text-gray-700"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      required
                      name="age"
                      min={17}
                      id="age"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2  py-3 shadow-md sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 mt-5 sm:mt-0 sm:col-span-3 ">
                    <label
                      for="university"
                      class="block text-sm font-semibold left-0.5 text-gray-700"
                    >
                      Institution/University
                    </label>
                    <input
                      type="text"
                      required
                      name="university"
                      id="university"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2  py-3  shadow-md sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:mt-10 mt-5 sm:col-span-3">
                    <label
                      for="city"
                      class="block text-sm font-semibold left-0.5 text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      id="city"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2  py-3 bg-white   shadow-md sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="sm:mt-10 mt-5  col-span-6 sm:col-span-3">
                    <label
                      for="city"
                      class="block text-sm font-semibold left-0.5 text-gray-700"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      required
                      name="country"
                      autocomplete="country-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2  py-3 bg-white   shadow-md sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="Afganistan">Afghanistan</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antigua & Barbuda">
                        Antigua & Barbuda
                      </option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bonaire">Bonaire</option>
                      <option value="Bosnia & Herzegovina">
                        Bosnia & Herzegovina
                      </option>
                      <option value="Botswana">Botswana</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Ter">
                        British Indian Ocean Ter
                      </option>
                      <option value="Brunei">Brunei</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Canary Islands">Canary Islands</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">
                        Central African Republic
                      </option>
                      <option value="Chad">Chad</option>
                      <option value="Channel Islands">Channel Islands</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos Island">Cocos Island</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cote DIvoire">Cote DIvoire</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Curaco">Curacao</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">
                        Dominican Republic
                      </option>
                      <option value="East Timor">East Timor</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">
                        Equatorial Guinea
                      </option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands">Falkland Islands</option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="French Southern Ter">
                        French Southern Ter
                      </option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Great Britain">Great Britain</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="India">India</option>
                      <option value="Iran">Iran</option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Isle of Man">Isle of Man</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      <option value="Korea North">Korea North</option>
                      <option value="Korea Sout">Korea South</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Laos">Laos</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libya">Libya</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macau">Macau</option>
                      <option value="Macedonia">Macedonia</option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Midway Islands">Midway Islands</option>
                      <option value="Moldova">Moldova</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Nambia">Nambia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherland Antilles">
                        Netherland Antilles
                      </option>
                      <option value="Netherlands">
                        Netherlands (Holland, Europe)
                      </option>
                      <option value="Nevis">Nevis</option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Niue">Niue</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau Island">Palau Island</option>
                      <option value="Palestine">Palestine</option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Phillipines">Philippines</option>
                      <option value="Pitcairn Island">Pitcairn Island</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Republic of Montenegro">
                        Republic of Montenegro
                      </option>
                      <option value="Republic of Serbia">
                        Republic of Serbia
                      </option>
                      <option value="Reunion">Reunion</option>
                      <option value="Romania">Romania</option>
                      <option value="Russia">Russia</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="St Barthelemy">St Barthelemy</option>
                      <option value="St Eustatius">St Eustatius</option>
                      <option value="St Helena">St Helena</option>
                      <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                      <option value="St Lucia">St Lucia</option>
                      <option value="St Maarten">St Maarten</option>
                      <option value="St Pierre & Miquelon">
                        St Pierre & Miquelon
                      </option>
                      <option value="St Vincent & Grenadines">
                        St Vincent & Grenadines
                      </option>
                      <option value="Saipan">Saipan</option>
                      <option value="Samoa">Samoa</option>
                      <option value="Samoa American">Samoa American</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome & Principe">
                        Sao Tome & Principe
                      </option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syria">Syria</option>
                      <option value="Tahiti">Tahiti</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad & Tobago">
                        Trinidad & Tobago
                      </option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Turks & Caicos Is">
                        Turks & Caicos Is
                      </option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Erimates">
                        United Arab Emirates
                      </option>
                      <option value="United States of America">
                        United States of America
                      </option>
                      <option value="Uraguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Vatican City State">
                        Vatican City State
                      </option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Virgin Islands (Brit)">
                        Virgin Islands (Brit)
                      </option>
                      <option value="Virgin Islands (USA)">
                        Virgin Islands (USA)
                      </option>
                      <option value="Wake Island">Wake Island</option>
                      <option value="Wallis & Futana Is">
                        Wallis & Futana Is
                      </option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zaire">Zaire</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                </>
              ) : currentUser.user.initializationStep === "sd" ? (
                <>
                  <div
                    class={` mx-auto block text-left ${
                      error
                        ? "border-red-500 border-[1px] bg-yellow-50"
                        : "bg-white"
                    }  px-4 mt-2 mb-0 pt-4  shadow-lg  sm:p-6 rounded-lg`}
                  >
                    <div class="sm:items-center">
                      <div class="grid xl:grid-cols-2 mb-3.5 xl:gap-6">
                        <div class=" relative mb-3 w-full group">
                          <input
                            type="text"
                            name="name"
                            id="floating_repeat_name"
                            class="block mt-3  relative mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required={true}
                            placeholder=" "
                            onChange={changeHandler}
                          />
                          <label
                            for="floating_repeat_name"
                            class="absolute text-sm left-0 text-gray-500  duration-300 transform -translate-y-6 scale-75 top-0  origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Project Name
                          </label>
                        </div>

                        <div class=" relative mb-3 w-full group">
                          <input
                            type="text"
                            name="adminRole"
                            id="floating_repeat_name"
                            class="block mt-3  relative mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required={true}
                            placeholder=" "
                            onChange={changeHandler}
                          />
                          <label
                            for="floating_repeat_name"
                            class="absolute text-sm left-0 text-gray-500  duration-300 transform -translate-y-6 scale-75 top-0  origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Your Role
                          </label>
                        </div>
                      </div>
                      <br />
                      <div class="grid xl:grid-cols-2 mb-3.5 xl:gap-6">
                        <div class="relative z-0 mb-11 w-full group">
                          <select
                            placeholder="Primary Category"
                            name="category"
                            type="select"
                            onChange={changeHandler}
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
                            id="maxCap"
                            class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={changeHandler}
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
                      <br />
                      <div class="relative z-0 mb-10 md:mt-0 w-full group">
                        <textarea
                          type="text"
                          minLength={140}
                          maxLength={190}
                          name="problem"
                          id="problem"
                          onChange={changeHandler}
                          class="block top-3 relative  w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer h-32 p-2  rounded-md"
                          placeholder=" "
                          required={true}
                        />
                        <label class="absolute text-sm left-0 text-gray-500 duration-300 transform -top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  ">
                          Startup Description (Minimum 140 Characters)
                        </label>
                      </div>
                      <br />
                      <div
                        class={`grid xl:grid-cols-2 ${
                          image !== null && image !== ""
                            ? "-mb-[70px]"
                            : "-mb-5"
                        } xl:gap-6`}
                      >
                        <div
                          class={`relative z-0 mb-11 w-full group bg-gradient-to-br ${
                            error ? "border-red-600 border-[1px]" : ""
                          } from-blue-100 rounded-sm to-indigo-300 shadow-md top-0.5 align-middle 
                           p-10 px-3
                           `}
                        >
                          <div className="relative scale-75 p-3 ">
                            <input
                              ref={inputRef}
                              onChange={projPicUpload}
                              type="file"
                              style={{ display: "none" }}
                            />

                            <ul class="space-x-2 space-y-4 mx-auto relative mt-20 text-center ">
                              {imageLoading ? (
                                <div class=" mx-auto block w-fit text-center mt-[100px]">
                                  <ClipLoader
                                    color={"#0b0bbf"}
                                    loading={imageLoading}
                                    size={90}
                                  />
                                </div>
                              ) : image === "" || image === null ? (
                                <>
                                  {" "}
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      inputRef.current.click();
                                    }}
                                    class={`font-semibold uppercase  text-xl p-3 xl:mt-8 -mt-12 xl:mb-0 mb-20 shadow-md left-1  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600`}
                                  >
                                    Upload Project Image / Logo
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
                                      setImage(null);
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
                        <div
                          class={`relative border-2 h-96 p-8 border-dashed rounded-md border-gray-700 z-0 mb-10 ${
                            error ? "border-red-600 border-[1px]" : ""
                          } w-full group`}
                        >
                          <img
                            class={`relative ${
                              !image || image === ""
                                ? "w-[200px] top-[50px] h-[200px]"
                                : "w-full h-full "
                            }  object-contain mx-auto justify-center align-middle`}
                            src={
                              image ||
                              (image !== "" &&
                                String(typeof image) !== "object")
                                ? image
                                : "http://store-images.s-microsoft.com/image/apps.38282.13733306562729316.049f2fd1-b066-4cb5-b5ef-317d282a0b02.ca5b4cd1-6cda-4b13-80af-d7d8e5ba2256"
                            }
                          ></img>
                        </div>
                      </div>
                      {error !== "" ? (
                        <p class="text-red-600 uppercase text-center text-base font-semibold -bottom-1 top-6 mb-12 relative">
                          {error}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ) : currentUser.user.initializationStep === "otm" ? (
                <>
                  <div
                    class={` mx-auto block text-left ${
                      error
                        ? "border-red-500 border-[1px] bg-yellow-50"
                        : "bg-white"
                    }  px-4 mt-2 mb-0 pt-4  shadow-lg  sm:p-6 sm:pb-6 pb-4 rounded-lg`}
                  >
                    <div
                      class={`bg-indigo-100 border-l-4 sm:text-left text-center border-indigo-500 text-indigo-700 p-4 ${
                        seatsNum !== null ? "sm:mb-10 mb-9" : "sm:mb-8 mb-7"
                      }`}
                      role="alert"
                    >
                      <p class="font-bold mb-1 sm:text-base text-sm">
                        Onboarding Your Team
                      </p>
                      <p class="sm:text-sm text-xs">
                        Enter your team-members'/cofounders' details here.{" "}
                        <br /> We'll send them an exclusive code to join your
                        startup workspace (IdeaStack Team Dashboard).
                      </p>
                    </div>

                    <div class="sm:items-center px-4">
                      <div class=" relative mb-3  w-full group">
                        <input
                          type="number"
                          name="numberOfSeats"
                          id="floating_repeat_name"
                          class={`block ${
                            seatsNum !== null ? "mt-7" : "mt-4"
                          } relative mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:mt-6 focus:ring-0 focus:border-blue-600 peer`}
                          required={true}
                          min={0}
                          placeholder=" "
                          onChange={numChangeHandler}
                        />
                        <label
                          for="floating_repeat_name"
                          class={`absolute sm:text-sm text-xs left-0 text-gray-500  duration-300 transform  scale-75 top-0  origin-[0] peer-focus:left-0 peer-focus:mt-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6 ${
                            seatsNum !== null
                              ? "-translate-y-4"
                              : "-translate-y-6"
                          } `}
                        >
                          No. of Additional Seats/Accounts You Wish to Register
                          (Team Size)
                        </label>
                      </div>
                      <br />

                      <div
                        class={`relative block z-0 ${
                          seatsNum == 0 ? "-mt-12" : "mt-0 -mb-12"
                        } w-full group`}
                      >
                        {" "}
                        {seatsNum == 0 ? (
                          ""
                        ) : (
                          <div
                            class={`flex items-center ${
                              error ? "bg-red-600" : "bg-indigo-500"
                            }  text-white text-sm font-bold px-4 py-1.5 pt-[7px]  mb-8`}
                            role="alert"
                          >
                            <svg
                              class="fill-current w-2.5 h-2.5 mr-1.5 relative bottom-[0.5px]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                            </svg>
                            <p class="text-xs uppercase">
                              Do not include your own account...
                            </p>
                          </div>
                        )}
                        {Array.apply(null, { length: seatsNum }).map(
                          (seat, i) => {
                            return (
                              <div key={i}>
                                <p class="text-xs tracking-wide font-semibold uppercase block">
                                  Team Member #{i + 1}
                                </p>
                                <div class="grid xl:grid-cols-3 mb-3.5 mt-0.5 xl:gap-6">
                                  <div class="relative z-0 mb-10 md:mt-0 -mt-4 w-full group">
                                    <input
                                      type="text"
                                      name={`name${i}`}
                                      id="name"
                                      class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0  focus:border-blue-600 peer"
                                      placeholder=" "
                                      onChange={teamChangeHandler}
                                      required={true}
                                    />
                                    <label
                                      for="maxCap"
                                      class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                      Full Name
                                    </label>
                                  </div>
                                  <div class="relative z-0 mb-10 md:mt-0 -mt-4 w-full group">
                                    <input
                                      type="text"
                                      name={`email${i}`}
                                      id="email"
                                      class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0  focus:border-blue-600 peer"
                                      placeholder=" "
                                      onChange={teamChangeHandler}
                                      required={true}
                                    />
                                    <label
                                      for="maxCap"
                                      class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                      Email ID
                                    </label>
                                  </div>
                                  <div class="relative z-0 mb-10 md:mt-0 -mt-4 w-full group">
                                    <input
                                      type="text"
                                      name={`role${i}`}
                                      id="role"
                                      class="block top-3 relative py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none   focus:ring-0 focus:border-blue-600 peer"
                                      placeholder=" "
                                      onChange={teamChangeHandler}
                                      required={true}
                                    />
                                    <label
                                      for="maxCap"
                                      class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                      Role
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                      <br />

                      {error != "" || error != null ? (
                        <p
                          class={`text-red-600 uppercase ${
                            !error ? "hidden" : ""
                          } text-center text-base font-semibold -bottom-1 top-6 mb-12 relative`}
                        >
                          {error}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>

          <button
            type="submit"
            class={`block text-base ${
              currentUser.user && currentUser.user.isAdditionalMember
                ? "-mb-[130px] mt-14"
                : currentUser.user.initializationStep === "pi"
                ? "-mb-[180px] mt-12"
                : "-mb-[190px] mt-8"
            }  px-16 h-11 relative top-7 sm:w-[400px] w-[80%] justify-center rounded-md border border-gray-300 shadow-md py-1 bg-white  font-semibold text-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:ring-indigo-500  mx-auto  sm:text-md`}
          >
            SUBMIT
          </button>
        </form>
      )}
    </>
  );
};
export default Onboarding;
