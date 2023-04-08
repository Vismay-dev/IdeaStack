import { useEffect, useState, useMemo, useContext, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import userContext from "../../context/userContext";
import ClipLoader from "react-spinners/ClipLoader";
import mentorAccContext from "../../context/mentorAccContext";

const EditMentorInfo = (props) => {
  const currentMentor = useContext(mentorAccContext);

  const [mentor, setMentor] = useState(
    currentMentor ? currentMentor.mentor : false
  );
  const [image, setImage] = useState(
    currentMentor.mentor.pic ? currentMentor.mentor.pic : null
  );
  const inputRef = useRef(null);

  const history = useRouter();

  const handleChange = (e) => {
    if (e.target.name.includes("strength")) {
      let strengthsCopy = mentor.strengths;
      strengthsCopy[
        Number(e.target.name.substring(e.target.name.length - 1)) - 1
      ] = e.target.value;
      setMentor({
        ...mentor,
        strengths: strengthsCopy,
      });
    } else {
      setMentor({
        ...mentor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (mentor.mentorshipProp.split(" ").length < 50) {
      setError("mentorshipProp");
      setLoading(false);
      return;
    } else if (mentor.background.split(" ").length < 30) {
      setError("background");
      setLoading(false);
      return;
    }

    console.log(mentor.strengths);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateMentor"
          : "http://localhost:4000/api/user/updateMentor",
        { mentor, token: sessionStorage.getItem("mentorToken") }
      )
      .then((res) => {
        currentMentor.setMentor(res.data);
        setTimeout(() => {
          setLoading(false);
          props.close();
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : null);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const [picLoading, setPicLoading] = useState(false);
  const profPicUpload = (e) => {
    e.preventDefault();
    setPicLoading(true);
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("token", sessionStorage.getItem("mentorToken"));
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/uploadMentorPic"
          : "http://localhost:4000/api/user/uploadMentorPic",
        data
      )
      .then((res) => {
        console.log(res.data);
        currentMentor.setMentor(res.data);
        setImage(res.data.pic);
        setPicLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPicLoading(false);
      });
  };

  const removeProfPic = (e) => {
    const removedProfPic = { ...mentor, pic: "" };
    console.log(removedProfPic);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateMentor"
          : "http://localhost:4000/api/user/updateMentor",
        { mentor: removedProfPic, token: sessionStorage.getItem("mentorToken") }
      )
      .then((res) => {
        currentMentor.setMentor(res.data);
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : null);
      });
  };

  return (
    <div class="md:mt-10 mt-3 md:mb-0 mb-4 md:w-11/12 w-12/12 md:left-0 sm:left-1 left-3 relative bg-gray-50 shadow-lg mx-auto sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-3">
          <form id="regForm">
            <div class="shadow overflow-hidden sm:rounded-md">
              <h1 class="text-blue-600 md:text-4xl sm:text-3xl text-2xl mb-4 top-2 relative font-semibold text-center">
                Edit <span class="text-black">Your Profile</span>
              </h1>
              <div class="px-3 py-2 bg-gradient-to-r from-blue-200 to-indigo-300 sm:p-6 p-9">
                <div className="relative scale-75 rounded-r-full p-3">
                  {picLoading ? (
                    <div class="relative mx-auto my-8 mb-10 pb-3 pt-1.5 bottom-6 text-center block justify-center">
                      <ClipLoader
                        color={"#0b0bbf"}
                        loading={picLoading}
                        size={70}
                      />
                    </div>
                  ) : (
                    <img
                      class={`rounded-full -mt-12 mx-auto shadow-lg w-64 ${
                        currentMentor.mentor.pic ? "" : "p-2"
                      } relative`}
                      src={
                        currentMentor.mentor.pic
                          ? currentMentor.mentor.pic
                          : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                      }
                    />
                  )}
                  <input
                    ref={inputRef}
                    onChange={profPicUpload}
                    type="file"
                    name="article_picture"
                    style={{ display: "none" }}
                  />

                  <ul class="space-x-2 mx-auto relative mt-10 text-center">
                    {currentMentor.mentor.pic ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeProfPic();
                        }}
                        class="font-semibold  p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md hover:cursor-pointer sm:mb-0 mb-5 sm:mt-0 mt-3 relative  hover:text-indigo-600 text-blue-600"
                      >
                        Remove Picture
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          inputRef.current.click();
                        }}
                        class="font-semibold  p-2 shadow-md left-1  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md hover:cursor-pointer sm:mt-0 mt-4 hover:text-indigo-600 text-blue-600"
                      >
                        Upload Picture
                      </button>
                    )}
                    {currentMentor.mentor.pic ? (
                      <button
                        class="font-semibold  p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-4 rounded-md hover:cursor-pointer hover:text-indigo-600 sm:right-0 right-1 sm:mb-0 -mb-9 relative text-blue-600"
                        onClick={(e) => {
                          e.preventDefault();
                          inputRef.current.click();
                        }}
                      >
                        Change Picture
                      </button>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>

                {loading ? (
                  <div class="relative mx-auto my-14 mb-16 pb-3 pt-1.5 bottom-6 text-center block justify-center">
                    <ClipLoader color={"#0b0bbf"} loading={loading} size={90} />
                  </div>
                ) : (
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3  relative">
                      <label
                        for="first-name"
                        class="block text-sm font-semibold left-0.5 text-gray-700"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="name"
                        min={2}
                        id="first-name"
                        placeholder={
                          currentMentor ? currentMentor.mentor.name : ""
                        }
                        value={mentor ? mentor.name : ""}
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="email-address"
                        class="block text-sm font-semibold left-0.5 text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="email"
                        id="email-address"
                        placeholder={
                          currentMentor ? currentMentor.mentor.email : ""
                        }
                        value={mentor ? mentor.email : ""}
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 bg-white   shadow-md sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="country"
                        class="block text-sm font-semibold left-0.5 relative text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        // defaultChecked={
                        //   currentMentor ? currentMentor.mentor.country : ""
                        // }
                        // defaultValue={
                        //   currentMentor ? currentMentor.mentor.country : ""
                        // }
                        value={mentor ? mentor.country : ""}
                        onChange={handleChange}
                        name="country"
                        class="mt-1 block w-full py-2 px-3 border text-black border-gray-300 bg-white rounded-md p-2   shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
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
                        <option value="Falkland Islands">
                          Falkland Islands
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
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
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
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
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
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

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="city"
                        class="block text-sm font-semibold left-0.5 text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        value={mentor ? mentor.city : ""}
                        onChange={handleChange}
                        placeholder={
                          currentMentor ? currentMentor.mentor.city : ""
                        }
                        name="city"
                        id="city"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-8  mt-1  lg:col-span-6">
                      <label
                        for="city"
                        class={`block text-sm font-semibold left-0.5 text-gray-700`}
                      >
                        Mentorship Proposition{" "}
                        <span
                          class={
                            error === "mentorshipProp"
                              ? "text-red-700"
                              : "text-gray-700"
                          }
                        >
                          (Min 50 Words)
                        </span>
                      </label>
                      <textarea
                        name="mentorshipProp"
                        value={mentor ? mentor.mentorshipProp : ""}
                        placeholder={
                          currentMentor.mentor.mentorshipProp
                            ? currentMentor.mentor.mentorshipProp
                            : "Add Mentorship Proposition - How Do You Help Startup Teams? (Minimum 50 Words)"
                        }
                        onChange={handleChange}
                        class={`mt-1 h-32 ${
                          error === "mentorshipProp"
                            ? "ring-orange-500 border-orange-500 bg-orange-100"
                            : "focus:ring-indigo-500 focus:border-indigo-500"
                        }  block w-full p-2  shadow-md text-sm text-black border-gray-300 rounded-md`}
                      ></textarea>
                    </div>

                    <div class="col-span-6 sm:col-span-8  lg:col-span-6">
                      <label
                        for="city"
                        class={`block text-sm font-semibold left-0.5 
                          text-gray-700
                        `}
                      >
                        Career Background{" "}
                        <span
                          class={
                            error === "background"
                              ? "text-red-700"
                              : "text-gray-700"
                          }
                        >
                          (Min 30 Words)
                        </span>
                      </label>
                      <textarea
                        name="background"
                        value={mentor ? mentor.background : ""}
                        placeholder={
                          currentMentor.mentor.background
                            ? currentMentor.mentor.background
                            : "Add Career Background - What Career Journey Has Led You Here? (Minimum 30 Words)"
                        }
                        onChange={handleChange}
                        class={`mt-1 h-32 ${
                          error === "background"
                            ? "ring-orange-500 border-orange-500 bg-orange-100"
                            : "focus:ring-indigo-500 focus:border-indigo-500"
                        }  block w-full p-2  shadow-md text-sm text-black border-gray-300 rounded-md`}
                      ></textarea>
                    </div>
                    <div class="col-span-6 sm:col-span-2 mb-3  relative">
                      <label
                        for="first-name"
                        class="block text-sm font-semibold left-0.5 text-gray-700"
                      >
                        Strength 1
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="strength1"
                        min={2}
                        id="first-name"
                        placeholder={
                          currentMentor ? currentMentor.mentor.strengths[0] : ""
                        }
                        value={mentor ? mentor.strengths[0] : ""}
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2   shadow-md text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-2 mb-3">
                      <label
                        for="email-address"
                        class="block text-sm font-semibold left-0.5 text-gray-700"
                      >
                        Strength 2
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="strength2"
                        id="email-address"
                        placeholder={
                          currentMentor ? currentMentor.mentor.strengths[1] : ""
                        }
                        value={mentor ? mentor.strengths[1] : ""}
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 bg-white   shadow-md text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-2 mb-3">
                      <label
                        for="email-address"
                        class="block text-sm font-semibold left-0.5 text-gray-700"
                      >
                        Strength 3
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="strength3"
                        id="email-address"
                        placeholder={
                          currentMentor ? currentMentor.mentor.strengths[2] : ""
                        }
                        value={mentor ? mentor.strengths[2] : ""}
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 bg-white   shadow-md text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div class="px-4 py-1 bg-gray-50 sm:px-6 text-center">
                <button
                  onClick={handleSubmit}
                  class=" mx-auto sm:px-16 px-6 relative h-12 w-full justify-center rounded-md border border-gray-300 shadow-sm py-1 bg-white text-lg font-semibold text-gray-700 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  mt-3 mb-3 sm:w-auto sm:text-md"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMentorInfo;
